import { createContext, useContext } from 'react';
import { ReactQueryPolicy } from 'types/network';
import type { ChildrenProps } from 'types/props';
import { AuthorizationError, NetworkError } from '../errors';
import { REFRESHING } from '../interceptors';

export type Policies = {
  infiniteQueryPolicy?: ReactQueryPolicy;
  mutationPolicy?: ReactQueryPolicy;
  queryPolicy?: ReactQueryPolicy;
};

const retryCondition = (_: unknown, error: unknown) =>
  error instanceof AuthorizationError && error.message === REFRESHING;
const throwOnErrorCondition = (error: unknown) => error instanceof NetworkError;

export const defaultInfiniteQueryPolicy = new ReactQueryPolicy({
  retryCondition,
  throwOnErrorCondition,
});
export const defaultMutationPolicy = new ReactQueryPolicy({
  retryCondition,
});
export const defaultQueryPolicy = new ReactQueryPolicy({
  retryCondition,
  throwOnErrorCondition,
});

const defaultPolicy = {
  infiniteQueryPolicy: defaultInfiniteQueryPolicy,
  mutationPolicy: defaultMutationPolicy,
  queryPolicy: defaultQueryPolicy,
};

const ReactQueryPolicyContext = createContext<Policies>(defaultPolicy);

export const ReactQueryPolicyProvider = (props: ChildrenProps & Policies) => {
  const { children, ...policies } = props;
  return (
    <ReactQueryPolicyContext.Provider value={{ ...policies }}>
      {children}
    </ReactQueryPolicyContext.Provider>
  );
};

export const useReactQueryPolicy = () => {
  const policy = useContext(ReactQueryPolicyContext);
  return policy;
};
