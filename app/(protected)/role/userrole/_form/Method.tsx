/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";

import { fail, ok } from '@/lib/util/reponseUtil';
import { BasicInformation, BasicInformationResponse, Permission, UserRole, UserRoleResponse } from '@/lib/generated/api/customHookAPI/graphql';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { Layers, } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { useQuery } from '@apollo/client/react';
import { DrawerClose } from '@/components/ui/drawer';
import useToast from '@/app/_hooks/useToast';
import { BasicInformationFindUnique } from '@/lib/api/gql/BasicInformation.gql';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import { MODEL_DISPLAY_NAMES } from '@/generated/model-names';
import { useForm } from 'react-hook-form';
import { PermissionFindUnique } from '@/lib/api/gql/Permission.gql';
import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput';
import CustomCheckbox from '@/components/Forms/Inputs/CustomCheckbox';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import { UserRoleFindUnique } from '@/lib/api/gql/UserRole.gql';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const modelAPI = modelGQL;

const Method = (props: MethodProps) => {
  const { model, modelName } = useListContext();
  const session = useSession();
  const toast = useToast();
  const tableName = MODEL_DISPLAY_NAMES[modelName as keyof typeof MODEL_DISPLAY_NAMES]?.toLowerCase();

  const userRoleFindUnique = useQuery<
    { UserRoleFindUnique: UserRoleResponse },
    { id: string }
  >(UserRoleFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })


  const defaultValues = {
    id: "",
    userId: "",
    roleId: "",
    assignedById: session.data?.user?.id || "",
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && userRoleFindUnique.data?.UserRoleFindUnique.data) {
      const data = userRoleFindUnique.data.UserRoleFindUnique.data;
      form.reset({
        id: data.id,
        userId: data.userId ? String(data.userId) : "",
        roleId: data.roleId ? String(data.roleId) : "",
        assignedById: data.assignedById ? String(data.assignedById) : "",
      });
    }
  }, [userRoleFindUnique.data, props.actionType, form]);



  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI[model].create,
    setOpen: props.setOpen,
    successMessage: `Create ${tableName} Successfully`,
    successDescription: `The ${tableName} has been created successfully.`,
    errorMessage: `Create ${tableName} Failed`,
    errorDescription: `There was an error creating the ${tableName}. Please try again.`,
  });


  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: props.setOpen,
    successMessage: `Update ${tableName} Successfully`,
    successDescription: `The ${tableName} has been updated successfully.`,
    errorMessage: `Update ${tableName} Failed`,
    errorDescription: `There was an error updating the ${tableName}. Please try again.`,
  });

  const isViewMode = props.actionType === "view";
  const isEditMode = props.actionType === "edit";

  const handleToSubmit = async (data: unknown) => {
    const modelData = data as unknown as UserRole;

    const payload = {
      ...(isEditMode ? { id: props.rowId || modelData.id } : {}),
      data: {
        userId: modelData.userId ? String(modelData.userId) : null,
        roleId: modelData.roleId ? String(modelData.roleId) : null,
        assignedById: modelData.assignedById ? String(modelData.assignedById) : null,
      },
      currentUserId: session?.data?.user?.id,
    }



    switch (props.actionType) {
      case 'edit':
        await executeUpdate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              UserRoleUpdate: UserRoleResponse
            }

            if (!result.UserRoleUpdate.isSuccess) {
              toast.error({
                message: result.UserRoleUpdate.code || `Failed to update ${tableName}`,
                description: result.UserRoleUpdate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })
            return props.setOpen?.(false)
          }
        })
        return ok(`SUCCESS_UPDATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
          `Successfully updated ${tableName}: ${modelData.role?.name}`,
          payload
        );
      case "duplicate":
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              UserRoleCreate: UserRoleResponse
            }

            if (!result.UserRoleCreate.isSuccess) {
              toast.error({
                message: result.UserRoleCreate.code || `Failed to update ${tableName}`,
                description: result.UserRoleCreate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })

            return props.setOpen?.(false)
          }
        })
        return ok(`SUCCESS_DUPLICATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
          `Successfully duplicated ${tableName}: ${modelData.role?.name}`,
          payload
        );
      default:
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              UserRoleCreate: UserRoleResponse
            }

            if (!result.UserRoleCreate.isSuccess) {
              toast.error({
                message: result.UserRoleCreate.code || `Failed to update ${tableName}`,
                description: result.UserRoleCreate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })

            return props.setOpen?.(false)
          }
        })

        return ok(`SUCCESS_CREATE_${tableName.toUpperCase().replace(/\s+/g, '_')}`,
          `Successfully created ${tableName}: ${modelData.role?.name}`,
          payload
        );
    }
  };



  return (
    <FormTemplate
      title=""
      description=""
      form={form}
      handleToSubmit={handleToSubmit}
      isHaveBorder={false}
      isFullWidth={true}
    >
      <div className='flex flex-col gap-6 -mt-5 overflow-hidden'>
        {/* {JSON.stringify(workFlowTemplateFindUnique.data?.WorkFlowTemplateFindUnique.data, null, 2)} */}
        <ScrollArea className='h-[calc(100vh-210px)]'>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">
                  {tableName} Configuration
                </h3>
                <p className="text-xs text-muted-foreground">
                  Configure the {tableName} details and settings here.
                </p>
              </div>
            </div>
            {/* Form section with Icon */}
            {/* Form section with Icon */}
            <div className='grid grid-cols-1 gap-4'>
              <CustomSingleSelectInput
                name={`userId`}
                control={form.control}
                label="Account Name"
                findAllWithCursorGQL={
                  modelAPI.UserGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.UserGQL.findUnique}
                defaultValueId={form.watch("userId") ?? undefined}
                disabled={isViewMode}

                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: unknown) => {
                  const d = data as {
                    id?: string;
                    name?: string;
                  };
                  return {
                    label: d.name ?? "",
                    value: d.id ?? "",
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: {
                      id?: string;
                      name?: string;
                    };
                  };
                  if (!d?.data) return null;
                  return {
                    label:
                      d.data.name ??
                      "",
                    value: d.data.id ?? "",
                  };
                }}
              />
              <CustomSingleSelectInput
                name={`roleId`}
                control={form.control}
                label="Role Name"
                findAllWithCursorGQL={
                  modelAPI.RoleGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.RoleGQL.findUnique}
                defaultValueId={form.watch("roleId") ?? undefined}
                disabled={isViewMode}

                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: unknown) => {
                  const d = data as {
                    id?: string;
                    name?: string;
                  };
                  return {
                    label: d.name ?? "",
                    value: d.id ?? "",
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: {
                      id?: string;
                      name?: string;
                    };
                  };
                  if (!d?.data) return null;
                  return {
                    label:
                      d.data.name ??
                      "",
                    value: d.data.id ?? "",
                  };
                }}
              />
              <CustomSingleSelectInput
                name={`assignedById`}
                control={form.control}
                label="Assign Name"
                findAllWithCursorGQL={
                  modelAPI.UserGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.UserGQL.findUnique}
                defaultValueId={form.watch("assignedById") ?? undefined}
                disabled={isViewMode}

                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: unknown) => {
                  const d = data as {
                    id?: string;
                    name?: string;
                  };
                  return {
                    label: d.name ?? "",
                    value: d.id ?? "",
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: {
                      id?: string;
                      name?: string;
                    };
                  };
                  if (!d?.data) return null;
                  return {
                    label:
                      d.data.name ??
                      "",
                    value: d.data.id ?? "",
                  };
                }}
              />

            </div>
          </div>
        </ScrollArea>
        {/* Action Buttons - Fixed at Bottom */}
        {
          props.actionType === "view" ? null : (

            <div className='flex gap-3 justify-end bg-background border-t pt-4'>
              <DrawerClose asChild>
                <Button
                  variant='outline'
                  disabled={executingCreate || executingUpdate}
                  className={`px-8 ${(executingCreate || executingUpdate) ? 'cursor-not-allowed' : ''}`}
                  type='button'
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button type='submit'
                className={`px-8 ${(executingCreate || executingUpdate) ? 'cursor-not-allowed' : ''}`}
                disabled={executingCreate || executingUpdate}

              >
                {
                  (executingCreate || executingUpdate) ? 'Submit...' : 'Submit'
                }
              </Button>
            </div>
          )
        }
      </div>
    </FormTemplate>
  );
};

export default Method;
