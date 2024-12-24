import type { AxiosError } from 'axios';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { Interceptor } from '../../types';
import { defaultInterceptorOnRejected } from './defaultInterceptors';

export class DuplicateRequestInterceptor implements Interceptor {
  private requests;
  constructor() {
    this.requests = new Set<string>();
  }

  private _requestInterceptorOnFulfilled = async (config: InternalAxiosRequestConfig<unknown>) => {
    if (!config.url) return config;

    const controller = new AbortController();
    const copyConfig: InternalAxiosRequestConfig<unknown> = {
      ...config,
      signal: controller.signal,
    };
    const recordedRequest = this.requests.has(config.url);

    if (recordedRequest) {
      controller.abort();
      return copyConfig;
    }

    this.requests.add(config.url);

    return config;
  };

  private _requestInterceptorOnRejected = defaultInterceptorOnRejected;

  private _responseInterceptorOnFulfilled = async (response: AxiosResponse<unknown, unknown>) => {
    this.requests.delete(response?.config?.url || '');
    return response;
  };

  private _responseInterceptorOnRejected = (error: AxiosError<unknown>) => {
    this.requests.delete(error.config?.url || '');

    if (axios.isCancel(error)) return new Promise(() => {});
    return Promise.reject(error);
  };

  get requestInterceptorOnFulfilled() {
    return this._requestInterceptorOnFulfilled;
  }

  get requestInterceptorOnRejected() {
    return this._requestInterceptorOnRejected;
  }

  get responseInterceptorOnFulfilled() {
    return this._responseInterceptorOnFulfilled;
  }

  get responseInterceptorOnRejected() {
    return this._responseInterceptorOnRejected;
  }
}
