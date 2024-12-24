/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { Interceptor } from '../types';
import type {
  AuthInterceptorTemplate,
  DuplicateRequestInterceptor,
  ErrorInterceptorTemplate,
} from './interceptors';

export interface HttpClientParams {
  baseURL?: string;
  customConfig?: AxiosRequestConfig;
  interceptors: [
    AuthInterceptorTemplate,
    ErrorInterceptorTemplate,
    DuplicateRequestInterceptor?,
    ...(Interceptor | undefined)[],
  ];
}

export class HttpClient {
  private static instance: null | HttpClient = null;
  private readonly httpClient: AxiosInstance;

  /**
   * HttpClient 클래스의 정적 메서드로, 기존 HttpClient 인스턴스의 AxiosInstance를 반환하거나,
   * 새로운 인스턴스를 생성하여 반환합니다.
   * @param params {HttpClientParams} - 선택적 매개변수 객체로, 다음과 같은 속성을 포함합니다:
   *   - baseURL {string} - 요청을 보낼 기본 URL. 설정하지 않으면 기본값이 사용됩니다.
   *   - customConfig {AxiosRequestConfig} - Axios 요청 설정을 사용자 정의할 수 있는 객체.
   *   - interceptors {[AuthInterceptorTemplate, ErrorInterceptorTemplate, ...(Interceptor | undefined)[]]} -
   *     요청과 응답에 추가할 인터셉터 배열. AuthInterceptor와 ErrorInterceptor는 필수입니다.
   * @returns {AxiosInstance} - 기존 HttpClient 인스턴스의 AxiosInstance 또는 새로 생성된 AxiosInstance.
   * @throws {Error} - params가 제공되지 않은 경우 에러를 발생시킵니다.
   */
  static getInstance(params?: HttpClientParams) {
    if (this.instance !== null) return this.instance.httpClient;

    if (!params)
      throw Error(
        'Failed to create HttpClient instance. token repository or refreshTokenUrl is required.'
      );

    const { customConfig, baseURL, interceptors } = params;

    this.instance = new HttpClient(interceptors, customConfig, baseURL);
    return this.instance.httpClient;
  }

  /**
   * HttpClient 클래스의 정적 메서드로 새 HttpClient 인스턴스를 생성합니다. (최대한 안쓰는 걸로)
   * @param customConfig {AxiosRequestConfig} - Axios 요청 설정을 사용자 정의하기 위한 선택적 설정 객체.
   * @param baseURL {string} - HttpClient가 요청을 보낼 기본 URL. 선택적입니다.
   * @returns {HttpClient} - 새 HttpClient 인스턴스를 반환합니다.
   */
  static createInstance(params: HttpClientParams) {
    const { customConfig, baseURL, interceptors } = params;
    return new HttpClient(interceptors, customConfig, baseURL).httpClient;
  }

  // 생성자
  private constructor(
    interceptors: HttpClientParams['interceptors'],
    customConfig?: AxiosRequestConfig,
    baseURL?: string
  ) {
    this.httpClient = axios.create({
      baseURL: baseURL,
      withCredentials: true,
      ...(customConfig && { ...customConfig }),
    });

    // 사용자 커스텀 interceptor 적용
    interceptors.forEach((interceptor) => {
      if (!interceptor) return;

      this.httpClient.interceptors.request.use(
        interceptor?.requestInterceptorOnFulfilled,
        interceptor?.requestInterceptorOnRejected
      );

      this.httpClient.interceptors.response.use(
        interceptor?.responseInterceptorOnFulfilled,
        interceptor?.responseInterceptorOnRejected
      );
    });
  }
}
