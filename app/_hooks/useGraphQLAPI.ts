import { OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';

type QueryOperation<OperationType extends OperationVariables> = {
  query: DocumentNode;
  operation?: OperationType;
};

// type GraphQLAPIConfig<OperationInputType extends OperationVariables> = {
//   operations: Record<string, QueryOperation<OperationInputType>>;
// };

export const useGraphQLAPI = <
  OperationResponseName,
  OperationInputType extends OperationVariables,
>({
  query,
  operation,
}: QueryOperation<OperationInputType>) => {
  const options = operation ? { variables: operation } : {};

  const findAll = useQuery<OperationResponseName, OperationInputType>(
    query,
    options as useQuery.Options<NoInfer<OperationResponseName>, NoInfer<OperationInputType>>,
  );

  const findOne = useQuery<OperationResponseName, OperationInputType>(
    query,
    options as useQuery.Options<NoInfer<OperationResponseName>, NoInfer<OperationInputType>>,
  );

  return { findAll, findOne };
};
