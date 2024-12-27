import type { QueryKey } from '@tanstack/react-query';
import { useQuery as _useQuery } from '@tanstack/react-query';

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Parameters<typeof _useQuery<TQueryFnData, TError, TData, TQueryKey>>[0];

export const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  return _useQuery({
    ...options,
    throwOnError(_error, _query) {
      if (_error) {
        console.error(_error);
        return true;
      }

      if (options.throwOnError) {
        return typeof options.throwOnError === 'function'
          ? options.throwOnError(_error, _query)
          : options.throwOnError;
      }

      return false;
    },
  });
};
