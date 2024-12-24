import { QueryClientProvider, type QueryClientProviderProps } from '@tanstack/react-query';
import {
  type Policies,
  ReactQueryPolicyProvider,
  defaultInfiniteQueryPolicy,
  defaultMutationPolicy,
  defaultQueryPolicy,
} from '.';

export const SDQueryProvider = (props: QueryClientProviderProps & { policies?: Policies }) => {
  const { policies, client, children } = props;
  return (
    <ReactQueryPolicyProvider
      {...{
        infiniteQueryPolicy: policies?.infiniteQueryPolicy ?? defaultInfiniteQueryPolicy,
        mutationPolicy: policies?.mutationPolicy ?? defaultMutationPolicy,
        queryPolicy: policies?.queryPolicy ?? defaultQueryPolicy,
      }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ReactQueryPolicyProvider>
  );
};
