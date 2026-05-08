/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";

import { fail, ok } from '@/lib/util/reponseUtil';
import { BasicInformation, BasicInformationResponse } from '@/lib/generated/api/customHookAPI/graphql';
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

  const basicInformationFindUnique = useQuery<
    { BasicInformationFindUnique: BasicInformationResponse },
    { id: string }
  >(BasicInformationFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })


  const defaultValues = {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    fullName: "",
    gender: "",
    userId: "",
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && basicInformationFindUnique.data?.BasicInformationFindUnique.data) {
      const data = basicInformationFindUnique.data.BasicInformationFindUnique.data;
      form.reset({
        id: data.id,
        firstName: data.firstName ? data.firstName : "",
        middleName: data.middleName ? data.middleName : "",
        lastName: data.lastName ? data.lastName : "",
        suffix: data.suffix ? data.suffix : "",
        fullName: data.fullName ? data.fullName : "",
        gender: data.gender ? data.gender : "",
        userId: data.userId ? data.userId : "",
      });
    }
  }, [basicInformationFindUnique.data, props.actionType, form]);



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
    const modelData = data as unknown as BasicInformation;

    const payload = {
      ...(isEditMode ? { id: props.rowId || modelData.id } : {}),
      data: {
        firstName: modelData.firstName,
        middleName: modelData.middleName,
        lastName: modelData.lastName,
        suffix: modelData.suffix,
        fullName: modelData.fullName,
        gender: modelData.gender,
        userId: modelData.userId ? modelData.userId : null,
      },
      currentUserId: session?.data?.user?.id,
    }

    // Check the payload.data to ensure all required fields are present and valid before making the API call
    if (!payload.data.firstName || !payload.data.lastName) {
      toast.error({
        message: "Validation Error",
        description: "First Name and Last Name are required.",
      })
      return fail("VALIDATION_ERROR", "First Name and Last Name are required.")
    }
    if (!payload.data.userId) {
      toast.error({
        message: "Validation Error",
        description: "Account Name is required.",
      });
      return fail("VALIDATION_ERROR", "Account Name is required.")
    }

    switch (props.actionType) {
      case 'edit':
        await executeUpdate({
          variables: payload
        })
        return ok("SUCCESS_UPDATE_BASIC_INFORMATION",
          `Successfully updated ${tableName}: ${modelData.fullName}`,
          payload
        );
      case "duplicate":
        await executeCreate({
          variables: payload
        })
        return ok("SUCCESS_DUPLICATE_BASIC_INFORMATION",
          `Successfully duplicated ${tableName}: ${modelData.fullName}`,
          payload
        );
      default:
        await executeCreate({
          variables: payload
        })
        return ok("SUCCESS_CREATE_BASIC_INFORMATION",
          `Successfully created ${tableName}: ${modelData.fullName}`,
          payload
        );
    }
  };


  // Watch the firstName, middleName, lastName, and suffix fields to dynamically update the fullName field
  const firstName = form.watch("firstName");
  const middleName = form.watch("middleName");
  const lastName = form.watch("lastName");
  const suffix = form.watch("suffix");

  React.useEffect(() => {
    const fullName = [firstName, middleName, lastName, suffix].filter(Boolean).join(" ");
    form.setValue("fullName", fullName);
  }, [firstName, middleName, lastName, suffix, form.setValue]);

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
            <div className='grid grid-cols-1 gap-4'>
              <CustomTextInput
                name="firstName"
                control={form.control}
                label="First Name"
                placeholder="Please enter first name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="middleName"
                control={form.control}
                label="Middle Name"
                placeholder="Please enter middle name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="lastName"
                control={form.control}
                label="Last Name"
                placeholder="Please enter last name"
                inputProps={{ disabled: isViewMode }}
              />

              <CustomStaticSelectInput
                name="suffix"
                control={form.control}
                label="Suffix"
                options={[
                  { label: "Junior", value: "Jr." },
                  { label: "Senior", value: "Sr." },
                  { label: "The Second", value: "II." },
                  { label: "The Third", value: "III." },
                ]}
                placeholder="Select suffix"
                disabled={isViewMode}
              />

              <CustomTextInput
                name="fullName"
                control={form.control}
                label="Full Name"
                placeholder="Please enter full name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomStaticSelectInput
                name="gender"
                control={form.control}
                label="Gender"
                options={[
                  { label: "Male", value: "Male." },
                  { label: "Female", value: "Female." },
                  { label: "Other", value: "Other." },
                ]}
                placeholder="Select gender"
                disabled={isViewMode}
              />

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
                placeholder="Search account name..."
                searchPlaceholder="Search account name..."
                emptySelectedMessage="Account name already selected."
                emptyMessage="No account name found."
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
