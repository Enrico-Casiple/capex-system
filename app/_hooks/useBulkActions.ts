/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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
  options?: any;
}

const useMutationActions = (props: MutationActionsProps) => {
  const toast = useToast();
  const { returnQuery } = useListContext();

  const formatErrorDetails = (error: ErrorLike) => {
    return error.message || props.errorDescription;
  };

  const [execute, { loading: executing }] = useMutation(props.mutationGQL, {
    ...props.options,
    onCompleted(data) {
      // 1. Get the first key of the data object (the mutation name)
      const mutationKey = Object.keys(data || {})[0];
      const result = data?.[mutationKey as keyof typeof data] as { isSuccess?: boolean; code?: string; message?: string } | undefined;

      // 2. Check for success (supports your standard GQL response structure)
      if (result?.isSuccess || result?.code === "SUCCESS" || data) {
        props.setOpen?.(false);

        // Use optional chaining in case returnQuery isn't initialized yet
        returnQuery?.refetch();

        toast.success({
          message: props.successMessage,
          description: props.successDescription,
        });
        return;
      }

      // 3. Handle cases where GQL returns a 200 but the internal business logic failed
      toast.error({
        message: result?.code || 'Operation Failed',
        description: result?.message || 'The server returned an unsuccessful status.',
      });
    },
    onError(error) {
      // It's usually safer not to close the modal on error so the user doesn't lose their inputs
      // props.setOpen?.(false);

      toast.error({
        message: props.errorMessage,
        description: formatErrorDetails(error),
      });
    }
  });

  return {
    execute,
    executing,
  };
};

export default useMutationActions;
