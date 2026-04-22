import { ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { DocumentNode } from 'graphql';
import React from 'react';
import { useListContext } from '../_context/ListContext/ListProvider';
import useToast from './useToast';

interface MutationActionsProps {
  mutationGQL: DocumentNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  successDescription: string;
  errorMessage: string;
  errorDescription: string;
  options?: Omit<useMutation.Result, 'onCompleted' | 'onError'>;
}

const useMutationActions = (props: MutationActionsProps) => {
  const toast = useToast();
  const {returnQuery, modelName} = useListContext(); // Access ListContext to get any necessary data or functions for the mutation actions, if needed in the future

  const formatErrorDetails = (error: ErrorLike) => {
    const messages = [
      ...(error.message ? [error.message] : []),
      ...(error.name ? [error.name] : []),
      ...(error.stack ? [error.stack] : []),
    ].slice(0, 5);

    return messages.length ? messages.join('\n') : props.errorDescription;
  };

  const [execute, { loading: executing }] = useMutation(props.mutationGQL, {
    ...props.options,
    onCompleted(data) {
      console.log('Mutation completed successfully with data:', data);
      const createManyKey = `${modelName}CreateMany` as keyof typeof data;
      const result = data?.[createManyKey] as { isSuccess?: boolean; code?: string; message?: string } | undefined;
      if (result?.isSuccess) {
        props.setOpen?.(false);
        returnQuery.refetch();
        toast.success({
          message: props.successMessage,
          description: props.successDescription,
        });
        return;
      }
      toast.error({
        message: result?.code || 'Unexpected response',
        description: result?.message || 'The operation did not complete as expected.',
      });
    },
    onError(error) {
      props.setOpen?.(false);
      returnQuery.refetch();
      toast.error({
        message: props.errorMessage,
        description: formatErrorDetails(error),
      });
    }
  });

  return {
    execute,
    executing,
  }
}

export default useMutationActions
