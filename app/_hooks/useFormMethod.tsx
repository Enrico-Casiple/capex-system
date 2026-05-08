import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@apollo/client/react';
import { DocumentNode } from 'graphql';
import { fail, ok } from '@/lib/util/reponseUtil';

import useMutationActions from '@/app/_hooks/useBulkActions';
import useToast from '@/app/_hooks/useToast';
import { modelGQL } from '@/lib/api/crud.gql';
import { MODEL_DISPLAY_NAMES } from '@/generated/model-names';
import { ActionType } from '@/app/_component/Row/Action';

type ModelKey = keyof typeof modelGQL;

interface UseFormMethodConfig<T extends FieldValues> {
  rowId?: string | null;
  actionType?: ActionType;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  model: ModelKey;
  modelName: string;
  findUniqueGQL: DocumentNode;
  defaultValues: DefaultValues<T>;
  findUniqueQueryKey?: string;
  createResponseKey?: string;
  updateResponseKey?: string;

  // Transform RHF model -> Prisma input (supports nested createMany/updateMany/deleteMany)
  transformData?: (
    data: T,
    ctx: { isEditMode: boolean; actionType?: ActionType },
  ) => Record<string, unknown>;

  // Full variables override if needed
  buildVariables?: (args: {
    data: T;
    rowId?: string | null;
    isEditMode: boolean;
    currentUserId?: string;
    actionType?: ActionType;
  }) => Record<string, unknown>;

  // Optional label builder for success text
  getSuccessLabel?: (data: T) => string;
}

interface UseFormMethodReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  isViewMode: boolean;
  isEditMode: boolean;
  executingCreate: boolean;
  executingUpdate: boolean;
  handleToSubmit: (data: T) => Promise<ReturnType<typeof ok> | ReturnType<typeof fail>>;
  tableName: string;
}

export const useFormMethod = <T extends FieldValues>({
  rowId,
  actionType,
  setOpen,
  model,
  modelName,
  findUniqueGQL,
  defaultValues,
  findUniqueQueryKey,
  createResponseKey,
  updateResponseKey,
  transformData,
  buildVariables,
  getSuccessLabel,
}: UseFormMethodConfig<T>): UseFormMethodReturn<T> => {
  const session = useSession();
  const toast = useToast();

  const displayName =
    MODEL_DISPLAY_NAMES[modelName as keyof typeof MODEL_DISPLAY_NAMES] ?? modelName;
  const tableName = String(displayName).toLowerCase();

  const selectedModelAPI = modelGQL[model];

  const findUnique = useQuery(findUniqueGQL, {
    variables: { id: rowId ?? '' },
    skip: !rowId || actionType === 'none',
  });

  const form = useForm<T>({ defaultValues });

  useEffect(() => {
    if (actionType === 'none' || !findUnique.data) return;

    const queryKey = findUniqueQueryKey ?? `${String(model)}FindUnique`;
    const source = findUnique.data as Record<string, { data?: Partial<T> }>;
    const entity = source?.[queryKey]?.data;

    if (entity) {
      form.reset({ ...defaultValues, ...entity } as DefaultValues<T>);
    }
  }, [actionType, findUnique.data, findUniqueQueryKey, model, form, defaultValues]);

  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: selectedModelAPI.create,
    setOpen,
    successMessage: `Create ${tableName} Successfully`,
    successDescription: `The ${tableName} has been created successfully.`,
    errorMessage: `Create ${tableName} Failed`,
    errorDescription: `There was an error creating the ${tableName}. Please try again.`,
  });

  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: selectedModelAPI.update,
    setOpen,
    successMessage: `Update ${tableName} Successfully`,
    successDescription: `The ${tableName} has been updated successfully.`,
    errorMessage: `Update ${tableName} Failed`,
    errorDescription: `There was an error updating the ${tableName}. Please try again.`,
  });

  const isViewMode = actionType === 'view';
  const isEditMode = actionType === 'edit';

  const buildFailResult = (action: string, message: string) =>
    fail(`FAILED_${action}_${tableName.toUpperCase().replace(/\s+/g, '_')}`, message);

  const handleResponse = (result: unknown, resultKey: string): boolean => {
    const res = (result as Record<string, any>)?.[resultKey];
    if (!res?.isSuccess) {
      toast.error({
        message: res?.code || `Failed to process ${tableName}`,
        description:
          res?.message || `There was an error processing the ${tableName}. Please try again.`,
      });
      return false;
    }

    toast.success({
      message: `Successfully processed ${tableName}`,
      description: `The ${tableName} has been processed successfully.`,
    });
    setOpen?.(false);
    return true;
  };

  const handleToSubmit = async (
    data: T,
  ): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> => {
    try {
      const modelData = data;
      const currentUserId = session?.data?.user?.id;

      const transformed =
        transformData?.(modelData, { isEditMode, actionType }) ??
        (modelData as unknown as Record<string, unknown>);

      const fallbackPayload: Record<string, unknown> = {
        ...(isEditMode ? { id: rowId ?? (modelData as any).id } : {}),
        data: transformed,
        currentUserId,
      };

      const variables =
        buildVariables?.({
          data: modelData,
          rowId,
          isEditMode,
          currentUserId,
          actionType,
        }) ?? fallbackPayload;

      const label = getSuccessLabel?.(modelData) ?? String((modelData as any)?.name ?? '');

      if (actionType === 'edit') {
        let success = false;
        await executeUpdate({
          variables,
          onCompleted: (result) => {
            const key = updateResponseKey ?? `${String(model)}Update`;
            success = handleResponse(result, key);
          },
        });

        return success
          ? ok(
            `SUCCESS_UPDATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
            `Successfully updated ${tableName}${label ? `: ${label}` : ''}`,
            variables,
          )
          : buildFailResult('UPDATE', `Failed to update ${tableName}${label ? `: ${label}` : ''}`);
      }

      if (actionType === 'duplicate') {
        let success = false;
        await executeCreate({
          variables,
          onCompleted: (result) => {
            const key = createResponseKey ?? `${String(model)}Create`;
            success = handleResponse(result, key);
          },
        });

        return success
          ? ok(
            `SUCCESS_DUPLICATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
            `Successfully duplicated ${tableName}${label ? `: ${label}` : ''}`,
            variables,
          )
          : buildFailResult(
            'DUPLICATE',
            `Failed to duplicate ${tableName}${label ? `: ${label}` : ''}`,
          );
      }

      if (actionType === 'none' || !actionType) {
        let success = false;
        await executeCreate({
          variables,
          onCompleted: (result) => {
            const key = createResponseKey ?? `${String(model)}Create`;
            success = handleResponse(result, key);
          },
        });

        return success
          ? ok(
            `SUCCESS_CREATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
            `Successfully created ${tableName}${label ? `: ${label}` : ''}`,
            variables,
          )
          : buildFailResult('CREATE', `Failed to create ${tableName}${label ? `: ${label}` : ''}`);
      }

      return buildFailResult('SUBMIT', `Unsupported action for ${tableName}`);
    } catch (error: any) {
      const message = error?.message || `Unexpected error while processing ${tableName}`;
      return fail(`FAILED_EXCEPTION_${tableName.toUpperCase().replace(/\s+/g, '_')}`, message);
    }
  };

  return {
    form,
    isViewMode,
    isEditMode,
    executingCreate,
    executingUpdate,
    handleToSubmit,
    tableName,
  };
};