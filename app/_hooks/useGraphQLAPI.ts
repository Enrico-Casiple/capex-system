import { OperationVariables } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';

const useLazyGraphQLAPI = <TData, TVariables extends OperationVariables>(
  queryGQL: DocumentNode,
  options?: useLazyQuery.Options<NoInfer<TData>, NoInfer<TVariables>>
) => {
  const [execute, { called, loading, data, error }] = useLazyQuery<TData, TVariables>(
    queryGQL,
    options
  );

  return { execute, called, loading, data, error };
};

const useQueryGraphQLAPI = <TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  queryGQL: DocumentNode,
  options: useQuery.Options<NoInfer<TData>, NoInfer<TVariables>> & {
        returnPartialData: true;
  }
) => {
  const { loading, data, error, refetch, networkStatus } = useQuery<TData, TVariables>(
    queryGQL,
    options
  );
  return { loading, data, error, refetch, networkStatus };
};

export { useLazyGraphQLAPI, useQueryGraphQLAPI };
