import axios, { AxiosError } from 'axios';
import type { Interceptor } from '../../types';
import { NetworkError } from '../errors';
import {
  defaultInterceptorOnRejected,
  defaultRequestInterceptorOnFulfilled,
  defaultResponseInterceptorOnFulfilled,
} from './defaultInterceptors';

export abstract class ErrorInterceptorTemplate implements Interceptor {
  protected abstract handleError(error: AxiosError): void;

  private _responseInterceptorOnRejected = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      // 네트워크 에러
      if (!e.request || e.message === AxiosError.ERR_NETWORK || e.message === 'Network Error') {
        return Promise.reject(new NetworkError(e.message, e));
      }

      try {
        this.handleError(e);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(e);
  };

  public get responseInterceptorOnRejected() {
    return this._responseInterceptorOnRejected;
  }

  get requestInterceptorOnFulfilled() {
    return defaultRequestInterceptorOnFulfilled;
  }
  get requestInterceptorOnRejected() {
    return defaultInterceptorOnRejected;
  }
  get responseInterceptorOnFulfilled() {
    return defaultResponseInterceptorOnFulfilled;
  }
}
