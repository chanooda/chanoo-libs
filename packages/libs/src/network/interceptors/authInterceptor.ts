import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import type { Interceptor, TokenRepository } from '../../types';
import { AuthorizationError } from '../errors/authorizationError';
import {
  defaultInterceptorOnRejected,
  defaultResponseInterceptorOnFulfilled,
} from './defaultInterceptors';

export const TOKEN_NOT_EXIST = 'token_not_exist';
export const REFRESHING = 'refreshing';

export abstract class AuthInterceptorTemplate implements Interceptor {
  private isRefreshing = false;
  protected requestTimetable: Record<string, Date | undefined> = {};
  /**
   * response interceptor에서 auth와 관련된 에러가 아닌 에러를 throw하거나 전처리를 위해 사용하는 함수입니다.
   * auth와 관련 없는 에러는 함수 내부에서 throw 합니다.
   *
   * @param error
   * @param tokenRepository
   */
  protected abstract handleNonAuthError(error: unknown, tokenRepository: TokenRepository): void;
  /**
   * response interceptor에서 refresh 요청을 보내는 로직을 구현하기 위해 사용하는 함수입니다.
   * @param httpClient
   * @param refreshTokenUrl
   */
  protected abstract requestAccessToken(
    httpClient: AxiosInstance,
    refreshTokenUrl: string
  ): Promise<{ accessToken: string }>;
  /**
   * refresh 요청에서 에러가 발생했을 때 어떻게 처리할 지 결정하는 함수입니다.
   * 이 함수에서 아무 작업도 하지 않으면 기본적으로 refresh 요청을 순차적으로 3번 보낸 후에 로그아웃 처리를 합니다.
   * @param error
   * @returns 'STOP' | 'ONGOING' refresh 요청을 계속 보낼지 말지 결정합니다. STOP의 경우 refresh 요청 보내기를 중지하고 빈 문자열을 return 하여 토큰을 제거 합니다.
   */
  protected abstract handleRefreshExpireError(error: unknown): 'STOP' | 'ONGOING';

  constructor(
    protected tokenRepository: TokenRepository,
    protected refreshTokenUrl: string
  ) {}

  /**
   * 리프레시 토큰 요청이 가능한지 확인합니다.
   *
   * @returns {boolean} 리프레시 토큰 요청 가능 여부
   *   - true: 요청 가능
   *   - false: 요청 불가능
   *
   * @description
   * 기본 동작은 다음 조건 중 하나라도 만족하면 true를 반환합니다:
   * 1. 해당 URL에 대한 이전 요청 기록이 없는 경우
   * 2. 마지막 요청으로부터 15초 이상 경과한 경우
   * override를 통해 자식 클래스에서 새로운 조건을 추가할 수 있습니다.
   */
  protected isAvailableRefreshRequest() {
    const defaultRule =
      this.requestTimetable[this.refreshTokenUrl] === undefined
        ? true
        : dayjs().diff(dayjs(this.requestTimetable[this.refreshTokenUrl]), 'seconds') > 15;

    return defaultRule;
  }

  protected recordRefreshTokenRequestTime() {
    this.requestTimetable[this.refreshTokenUrl] = dayjs().toDate();
  }

  protected removeRefreshTokenRequestTime() {
    this.requestTimetable[this.refreshTokenUrl] = undefined;
  }

  private _requestInterceptorOnFulfilled = async (config: InternalAxiosRequestConfig<unknown>) => {
    const accessToken = (await this.tokenRepository.getToken()) || '';
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

    // refresh API 중복 요청 방지
    if (config.url === this.refreshTokenUrl) {
      const flag = this.isAvailableRefreshRequest();
      if (!flag) return Promise.reject(new AuthorizationError(REFRESHING));
      this.recordRefreshTokenRequestTime();
      return config;
    }

    return config;
  };

  private _responseInterceptorOnRejected = async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    // 토큰이 없을 경우 refresh 진행 x
    const token = await this.tokenRepository.getToken();
    if (!token) return Promise.reject(error);

    try {
      this.handleNonAuthError(error, this.tokenRepository);
    } catch (e) {
      return Promise.reject(e);
    }

    // 토큰 관련 에러코드가 내려온 경우 accessToken 재발급 후에 react-query에서 retry로 재요청을 보낸다.
    if (this.isRefreshing) return Promise.reject(new AuthorizationError(REFRESHING, error));

    this.isRefreshing = true;
    const accessToken = await this.requestRefreshToken(error.config?.baseURL || '');
    if (!accessToken) {
      this.clearAccessToken();
      return Promise.reject(new AuthorizationError(TOKEN_NOT_EXIST, error));
    }
    this.tokenRepository.saveToken(accessToken);
    this.isRefreshing = false;

    return Promise.reject(new AuthorizationError(REFRESHING, error));
  };

  private async requestRefreshToken(baseURL: string) {
    let errorCount = 0;

    const refreshAxios = axios.create({
      baseURL,
      withCredentials: true,
    });
    refreshAxios.interceptors.request.use(this.requestInterceptorOnFulfilled);

    const refresh: () => Promise<string> = async () => {
      if (errorCount >= 3) {
        return '';
      }

      try {
        const { accessToken } = await this.requestAccessToken(refreshAxios, this.refreshTokenUrl);
        return accessToken;
      } catch (e) {
        const result = this.handleRefreshExpireError(e);
        if (result === 'STOP') return '';

        errorCount++;
        this.removeRefreshTokenRequestTime();
        return await refresh();
      }
    };

    return await refresh();
  }

  private clearAccessToken() {
    this.tokenRepository.saveToken('');
  }

  get requestInterceptorOnFulfilled() {
    return this._requestInterceptorOnFulfilled;
  }

  get requestInterceptorOnRejected() {
    return defaultInterceptorOnRejected;
  }

  get responseInterceptorOnFulfilled() {
    return defaultResponseInterceptorOnFulfilled;
  }

  get responseInterceptorOnRejected() {
    return this._responseInterceptorOnRejected;
  }
}
