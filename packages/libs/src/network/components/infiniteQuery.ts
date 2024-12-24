import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useReactQueryPolicy } from './PolicyContext';

export type InfiniteQueryParam<
  TQueryFnData = unknown,
  TError = unknown,
  TPageParam = unknown,
> = Parameters<
  typeof useInfiniteQuery<
    TQueryFnData,
    AxiosError<TError>,
    InfiniteData<TQueryFnData, TPageParam>,
    unknown[],
    TPageParam
  >
>;

export function useSDInfiniteQuery<TQueryFnData = unknown, TError = unknown, TPageParam = unknown>(
  ...[options, queryClient]: InfiniteQueryParam<TQueryFnData, TError, TPageParam>
) {
  const { infiniteQueryPolicy } = useReactQueryPolicy();

  return useInfiniteQuery<
    TQueryFnData,
    AxiosError<TError>,
    InfiniteData<TQueryFnData, unknown>,
    unknown[],
    TPageParam
  >(
    {
      ...options,
      retry: (_, error) => {
        const retryOption = typeof options.retry === 'function' ? options.retry(_, error) : false;
        const retryPolicy = infiniteQueryPolicy?.policies?.retryCondition?.(_, error) || false;

        return retryOption && retryPolicy;
      },
      throwOnError: (error, query) => {
        if (typeof infiniteQueryPolicy?.policies?.throwOnErrorCondition !== 'undefined') {
          return infiniteQueryPolicy.policies.throwOnErrorCondition(error);
        }

        if (options.throwOnError) {
          if (typeof options.throwOnError === 'function') return options.throwOnError(error, query);
          else return options.throwOnError;
        }

        return false;
      },
    },
    queryClient
  );
}
