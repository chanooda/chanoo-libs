import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useReactQueryPolicy } from './PolicyContext';

export type QueryParam<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> = Parameters<
  typeof useQuery<TQueryFnData, AxiosError<TError>, TData>
>;

export function useSDQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  ...[options, queryClient]: QueryParam<TQueryFnData, TError, TData>
) {
  const { queryKey, ...rest } = options;
  const { queryPolicy } = useReactQueryPolicy();

  return useQuery<TQueryFnData, AxiosError<TError>, TData>(
    {
      ...rest,
      queryFn: options.queryFn,
      queryKey: queryKey,
      retry: (_, error) => {
        const retryOption = typeof options.retry === 'function' ? options.retry(_, error) : true;
        const retryPolicy =
          typeof queryPolicy?.policies?.retryCondition === 'undefined'
            ? false
            : queryPolicy?.policies?.retryCondition?.(_, error);

        return retryPolicy && retryOption;
      },
      throwOnError: (error, query) => {
        if (typeof queryPolicy?.policies?.throwOnErrorCondition !== 'undefined') {
          return queryPolicy.policies.throwOnErrorCondition(error);
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
