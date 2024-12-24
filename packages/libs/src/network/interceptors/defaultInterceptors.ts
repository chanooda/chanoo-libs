/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  InterceptorOnRejectedFunction,
  RequestInterceptorOnFulfilledFunction,
  ResponseInterceptorOnFulfilledFunction,
} from '../../types';

export const defaultInterceptorOnRejected: InterceptorOnRejectedFunction = (error) =>
  Promise.reject(error);

export const defaultResponseInterceptorOnFulfilled: ResponseInterceptorOnFulfilledFunction = (
  response
) => response;
export const defaultRequestInterceptorOnFulfilled: RequestInterceptorOnFulfilledFunction = (
  config
) => config;
