/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";

import { fail, ok } from '@/lib/util/reponseUtil';
import { BasicInformation, BasicInformationResponse, Permission, PermissionResponse } from '@/lib/generated/api/customHookAPI/graphql';
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

  const permissionFindUnique = useQuery<
    { PermissionFindUnique: PermissionResponse },
    { id: string }
  >(PermissionFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })


  const defaultValues = {
    id: "",
    name: "",
    description: "",
    module: "",
    resource: "",
    action: "",
    displayOrder: 0,
    isGlobal: false,
    isAdmin: false,
    globalLimit: 0,
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && permissionFindUnique.data?.PermissionFindUnique.data) {
      const data = permissionFindUnique.data.PermissionFindUnique.data;
      form.reset({
        id: data.id,
        name: data.name ?? "",
        description: data.description ?? "",
        module: data.module ?? "",
        resource: data.resource ?? "",
        action: data.action ?? "",
        displayOrder: Number(data.displayOrder) ?? 0,
        isGlobal: Boolean(data.isGlobal) ?? false,
        isAdmin: Boolean(data.isAdmin) ?? false,
        globalLimit: Number(data.globalLimit) ?? 0,
      });
    }
  }, [permissionFindUnique.data, props.actionType, form]);



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
    const modelData = data as unknown as Permission;

    const payload = {
      ...(isEditMode ? { id: props.rowId || modelData.id } : {}),
      data: {
        name: modelData.name ? String(modelData.name) : undefined,
        description: modelData.description ? String(modelData.description) : undefined,
        module: modelData.module ? String(modelData.module) : undefined,
        resource: modelData.resource ? String(modelData.resource) : undefined,
        action: modelData.action ? String(modelData.action) : undefined,
        displayOrder: modelData.displayOrder ? Number(modelData.displayOrder) : undefined,
        isGlobal: modelData.isGlobal ? Boolean(modelData.isGlobal) : undefined,
        isAdmin: modelData.isAdmin ? Boolean(modelData.isAdmin) : undefined,
        globalLimit: modelData.globalLimit ? Number(modelData.globalLimit) : undefined,
      },
      currentUserId: session?.data?.user?.id,
    }



    switch (props.actionType) {
      case 'edit':
        await executeUpdate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              PermissionUpdate: PermissionResponse
            }

            if (!result.PermissionUpdate.isSuccess) {
              toast.error({
                message: result.PermissionUpdate.code || `Failed to update ${tableName}`,
                description: result.PermissionUpdate.message || `There was an error updating the ${tableName}. Please try again.`,
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
          `Successfully updated ${tableName}: ${modelData.name}`,
          payload
        );
      case "duplicate":
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              PermissionCreate: PermissionResponse
            }

            if (!result.PermissionCreate.isSuccess) {
              toast.error({
                message: result.PermissionCreate.code || `Failed to update ${tableName}`,
                description: result.PermissionCreate.message || `There was an error updating the ${tableName}. Please try again.`,
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
          `Successfully duplicated ${tableName}: ${modelData.name}`,
          payload
        );
      default:
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              PermissionCreate: PermissionResponse
            }

            if (!result.PermissionCreate.isSuccess) {
              toast.error({
                message: result.PermissionCreate.code || `Failed to update ${tableName}`,
                description: result.PermissionCreate.message || `There was an error updating the ${tableName}. Please try again.`,
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
          `Successfully created ${tableName}: ${modelData.name}`,
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
              <div className='grid grid-cols-2 gap-4'>
                <CustomCheckbox
                  name="isAdmin"
                  control={form.control}
                  label="Is Admin"
                  inputProps={{
                    disabled: isViewMode,
                    style: {
                      cursor: isViewMode ? 'not-allowed' : 'pointer',
                      width: '20px',
                      height: '20px',
                    }
                  }}
                />
                <CustomCheckbox
                  name="isGlobal"
                  control={form.control}
                  label="Is Global"
                  inputProps={{
                    disabled: isViewMode,
                    style: {
                      cursor: isViewMode ? 'not-allowed' : 'pointer',
                      width: '20px',
                      height: '20px',
                    }
                  }}
                />
              </div>
              <CustomTextInput
                name="name"
                control={form.control}
                label="Role Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="description"
                control={form.control}
                label="Role description"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="module"
                control={form.control}
                label="Role Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="resource"
                control={form.control}
                label="Resource Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="action"
                control={form.control}
                label="Action Name"
                inputProps={{ disabled: isViewMode }}
              />

              <CustomNumberInput
                name="displayOrder"
                control={form.control}
                label="Order"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="globalLimit"
                control={form.control}
                label="Global Limit"
                inputProps={{ disabled: isViewMode }}
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
