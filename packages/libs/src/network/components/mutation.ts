import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useReactQueryPolicy } from './PolicyContext';

export type MutationParam<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Parameters<typeof useMutation<TData, AxiosError<TError>, TVariables, TContext>>;

export function useSDMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(...[options, queryClient]: MutationParam<TData, TError, TVariables, TContext>) {
  const { mutationPolicy } = useReactQueryPolicy();

  return useMutation<TData, AxiosError<TError>, TVariables, TContext>(
    {
      ...options,
      retry: (_, error) => {
        const retryOption = typeof options.retry === 'function' ? options.retry(_, error) : true;
        const retryPolicy =
          typeof mutationPolicy?.policies?.retryCondition === 'undefined'
            ? false
            : mutationPolicy?.policies?.retryCondition?.(_, error);
        return retryOption && retryPolicy;
      },
    },
    queryClient
  );
}
