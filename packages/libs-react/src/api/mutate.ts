import type {
  DefaultError,
  MutateOptions as _MutateOptions,
  UseMutationOptions as _UseMutationOptions,
} from '@tanstack/react-query';
import { useMutation as _useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

export type UseMutationOptions<TData, TError, TVariables, TContext> = _UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext
>;
export type MutateOptions<TData, TError, TVariables, TContext> =
  | _MutateOptions<TData, TError, TVariables, TContext>
  | undefined;

export const useMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { mutate: _mutate, ...rest } = _useMutation(options);
  const isMutatingRef = useRef(false);

  const mutate = (
    data: TVariables,
    mutateOptions?: MutateOptions<TData, TError, TVariables, TContext>
  ) => {
    if (isMutatingRef.current) return;
    isMutatingRef.current = true;

    _mutate(data, {
      ...mutateOptions,
      onSettled: (data, error, variables, context) => {
        isMutatingRef.current = false;
        if (mutateOptions?.onSettled) mutateOptions?.onSettled(data, error, variables, context);
      },
    });
  };

  return { ...rest, mutate };
};
