/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";

import { fail, ok } from '@/lib/util/reponseUtil';
import { WorkInformation, WorkInformationResponse } from '@/lib/generated/api/customHookAPI/graphql';
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
import { MODEL_DISPLAY_NAMES } from '@/generated/model-names';
import { useForm } from 'react-hook-form';
import { WorkInformationFindUnique } from '@/lib/api/gql/WorkInformation.gql';
import { generateEmployeeNumberForWork } from '@/lib/util/generateOtpCode';

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

  const workInformationFindUnique = useQuery<
    { WorkInformationFindUnique: WorkInformationResponse },
    { id: string }
  >(WorkInformationFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })


  const defaultValues = {
    id: "",
    employeeNumber: "",
    employeeId: "",
    groupOfCompanyId: "",
    companyId: "",
    departmentId: "",
    positionId: "",
    jobLevelId: "",
    employmentTypeId: "",
    employmentStatusId: "",
    reportingManagerId: "",
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && workInformationFindUnique.data?.WorkInformationFindUnique.data) {
      const data = workInformationFindUnique.data.WorkInformationFindUnique.data;
      form.reset({
        id: data.id,
        employeeNumber: data.employeeNumber ? data.employeeNumber : "",
        employeeId: data.employeeId ? data.employeeId : "",
        groupOfCompanyId: data.groupOfCompanyId ? data.groupOfCompanyId : "",
        companyId: data.companyId ? data.companyId : "",
        departmentId: data.departmentId ? data.departmentId : "",
        positionId: data.positionId ? data.positionId : "",
        jobLevelId: data.jobLevelId ? data.jobLevelId : "",
        employmentTypeId: data.employmentTypeId ? data.employmentTypeId : "",
        employmentStatusId: data.employmentStatusId ? data.employmentStatusId : "",
        reportingManagerId: data.reportingManagerId ? data.reportingManagerId : "",
      });
    }
  }, [workInformationFindUnique.data, props.actionType, form]);



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
    const modelData = data as unknown as WorkInformation;

    const payload = {
      ...(isEditMode ? { id: props.rowId || modelData.id } : {}),
      data: {
        employeeNumber: modelData.employeeNumber ? modelData.employeeNumber : null,
        employeeId: modelData.employeeId ? modelData.employeeId : null,
        groupOfCompanyId: modelData.groupOfCompanyId ? modelData.groupOfCompanyId : null,
        companyId: modelData.companyId ? modelData.companyId : null,
        departmentId: modelData.departmentId ? modelData.departmentId : null,
        positionId: modelData.positionId ? modelData.positionId : null,
        jobLevelId: modelData.jobLevelId ? modelData.jobLevelId : null,
        employmentTypeId: modelData.employmentTypeId ? modelData.employmentTypeId : null,
        employmentStatusId: modelData.employmentStatusId ? modelData.employmentStatusId : null,
        reportingManagerId: modelData.reportingManagerId ? modelData.reportingManagerId : null,
      },
      currentUserId: session?.data?.user?.id,
    }


    if (!modelData.employeeId) {
      toast.error({
        message: "Validation Error",
        description: "Basic Infomation Name is required.",
      });
      return fail("VALIDATION_ERROR", "Basic Infomation Name is required.")
    }

    switch (props.actionType) {
      case 'edit':
        await executeUpdate({
          variables: payload
        })
        return ok("SUCCESS_UPDATE_BASIC_INFORMATION",
          `Successfully updated ${tableName}: ${modelData.employeeNumber}`,
          payload
        );
      case "duplicate":
        await executeCreate({
          variables: payload
        })
        return ok("SUCCESS_DUPLICATE_BASIC_INFORMATION",
          `Successfully duplicated ${tableName}: ${modelData.employeeNumber}`,
          payload
        );
      default:
        await executeCreate({
          variables: payload
        })
        return ok("SUCCESS_CREATE_BASIC_INFORMATION",
          `Successfully created ${tableName}: ${modelData.employeeNumber}`,
          payload
        );
    }
  };

  const employeeId = form.watch('employeeId');

  useEffect(() => {
    if (props.actionType !== 'none') return;
    if (!employeeId) {
      form.setValue('employeeNumber', '');
      return;
    }

    let cancelled = false;

    const run = async () => {
      const nextNumber = await generateEmployeeNumberForWork();
      if (!cancelled && nextNumber) {
        form.setValue('employeeNumber', nextNumber, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [employeeId, props.actionType, form]);


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
                name="employeeNumber"
                control={form.control}
                label="Employee Number"
                placeholder="Auto generated employee number"
                inputProps={{ disabled: true }}
              />
              <CustomSingleSelectInput
                name={`employeeId`}
                control={form.control}
                label="Basic Information Name"
                findAllWithCursorGQL={
                  modelAPI.BasicInformationGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.BasicInformationGQL.findUnique}
                defaultValueId={form.watch("employeeId") ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? {
                        fullName: {
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
                    fullName?: string;
                  };
                  return {
                    label: d.fullName ?? "",
                    value: d.id ?? "",
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: {
                      id?: string;
                      fullName?: string;
                    };
                  };
                  if (!d?.data) return null;
                  return {
                    label:
                      d.data.fullName ??
                      "",
                    value: d.data.id ?? "",
                  };
                }}
              />
              <CustomSingleSelectInput
                name={`groupOfCompanyId`}
                control={form.control}
                label="Group of Company Name"
                findAllWithCursorGQL={
                  modelAPI.GroupOfCompanyGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.GroupOfCompanyGQL.findUnique}
                defaultValueId={form.watch("groupOfCompanyId") ?? undefined}
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
                name={`companyId`}
                control={form.control}
                label="Company Name"
                findAllWithCursorGQL={
                  modelAPI.CompanyGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.CompanyGQL.findUnique}
                defaultValueId={form.watch("companyId") ?? undefined}
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
                name={`departmentId`}
                control={form.control}
                label="Department Name"
                findAllWithCursorGQL={
                  modelAPI.DepartmentGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.DepartmentGQL.findUnique}
                defaultValueId={form.watch("departmentId") ?? undefined}
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
                name={`positionId`}
                control={form.control}
                label="Position Name"
                findAllWithCursorGQL={
                  modelAPI.PositionGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.PositionGQL.findUnique}
                defaultValueId={form.watch("positionId") ?? undefined}
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
                name={`jobLevelId`}
                control={form.control}
                label="Job Level Name"
                findAllWithCursorGQL={
                  modelAPI.JobLevelGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.JobLevelGQL.findUnique}
                defaultValueId={form.watch("jobLevelId") ?? undefined}
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
                name={`employmentTypeId`}
                control={form.control}
                label="Type Name"
                findAllWithCursorGQL={
                  modelAPI.TypeGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.TypeGQL.findUnique}
                defaultValueId={form.watch("employmentTypeId") ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: {
                      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
                      modelNameType: { contains: `${modelName}Type`, mode: "insensitive" }
                    }
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
                name={`employmentStatusId`}
                control={form.control}
                label="Status Name"
                findAllWithCursorGQL={
                  modelAPI.StatusGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.StatusGQL.findUnique}
                defaultValueId={form.watch("employmentStatusId") ?? undefined}
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
                    filter: {
                      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
                      modelNameType: { contains: `${modelName}Status`, mode: "insensitive" }
                    }
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
                name={`reportingManagerId`}
                control={form.control}
                label="Repoting Manager Name"
                findAllWithCursorGQL={
                  modelAPI.BasicInformationGQL.findAllWithCursor
                }
                findUniqueGQL={modelAPI.BasicInformationGQL.findUnique}
                defaultValueId={form.watch("reportingManagerId") ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? {
                        fullName: {
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
                    fullName?: string;
                  };
                  return {
                    label: d.fullName ?? "",
                    value: d.id ?? "",
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: {
                      id?: string;
                      fullName?: string;
                    };
                  };
                  if (!d?.data) return null;
                  return {
                    label:
                      d.data.fullName ??
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
