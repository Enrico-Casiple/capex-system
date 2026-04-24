/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";
import useToast from '@/app/_hooks/useToast';
import { useFieldArray, useForm } from 'react-hook-form';
import { ok } from '@/lib/util/reponseUtil';
import { WorkFlowTemplate, WorkFlowTemplateResponse } from '@/lib/generated/api/customHookAPI/graphql';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput';
import CustomCheckbox from '@/components/Forms/Inputs/CustomCheckbox';
import { Layers, Info, Globe, Trash2, PackagePlus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { workFlowTemplate } from '../../_config/workTemplate.config';
import { useQuery } from '@apollo/client/react';
import { WorkFlowTemplateFindUnique } from '@/lib/api/gql/WorkFlowTemplate.gql';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const modelAPI = modelGQL;

const Method = (props: MethodProps) => {
  const { model } = useListContext();
  const session = useSession();
  const toast = useToast();

  const workFlowTemplateFindUnique = useQuery<
    { WorkFlowTemplateFindUnique: WorkFlowTemplateResponse },
    { id: string }
  >(WorkFlowTemplateFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })

  const defaultValues = {
    name: '',
    description: '',
    isGlobal: false,
    version: 1,
    scope: [{
      companyId: "",
      departmentId: "",
      positionId: "",
      jobLevelId: "",
    }]
  };

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && workFlowTemplateFindUnique.data?.WorkFlowTemplateFindUnique.data) {
      const data = workFlowTemplateFindUnique.data.WorkFlowTemplateFindUnique.data;
      form.reset({
        name: data.name ?? '',
        description: data.description ?? '',
        isGlobal: data.isGlobal ?? false,
        version: data.version ?? 1,
        scope: data.scope?.map(scope => ({
          companyId: scope.companyId ?? "",
          departmentId: scope.departmentId ?? "",
          positionId: scope.positionId ?? "",
          jobLevelId: scope.jobLevelId ?? "",
        })) ?? [{
          companyId: "",
          departmentId: "",
          positionId: "",
          jobLevelId: "",
        }],
      });
    }
  }, [workFlowTemplateFindUnique.data, props.actionType, form]);

  const scopeFieldArray = useFieldArray({
    control: form.control,
    name: "scope"
  })
  const handleToAddScope = () => {
    scopeFieldArray.append({
      companyId: "",
      departmentId: "",
      positionId: "",
      jobLevelId: "",
    })
  }

  const handleToRemoveScope = (index: number) => {
    // Remain one but i clcik delete all the field are reset to default value
    if (scopeFieldArray.fields.length === 1) {
      scopeFieldArray.update(0, {
        companyId: "",
        departmentId: "",
        positionId: "",
        jobLevelId: "",
      })
    } else {
      scopeFieldArray.remove(index);
    }
  }

  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI[model].create,
    setOpen: props.setOpen,
    successMessage: 'Create Workflow Template Successfully',
    successDescription: `The workflow template has been created successfully.`,
    errorMessage: 'Create Workflow Template Failed',
    errorDescription: `There was an error creating the workflow template. Please try again.`,
  });

  const handleToSubmit = async (data: unknown) => {
    const modelData = data as unknown as WorkFlowTemplate;

    // Remove all scope fields that have empty values
    const filteredScope = modelData.scope?.filter(scope =>
      scope.companyId || scope.departmentId || scope.positionId || scope.jobLevelId
    ) ?? [];

    // Map filtered scope to create format - remove empty strings
    const scopeData = filteredScope.length > 0
      ? {
        create: filteredScope.map(scope => ({
          companyId: scope.companyId ? scope.companyId : null,
          departmentId: scope.departmentId ? scope.departmentId : null,
          positionId: scope.positionId ? scope.positionId : null,
          jobLevelId: scope.jobLevelId ? scope.jobLevelId : null,
        }))
      }
      : null;

    switch (props.actionType) {
      case 'edit':
        return ok("SUCCESS_UPDATE_WORKFLOW_TEMPLATE",
          `Successfully updated workflow template: ${modelData.name}`,
          filteredScope
        );
      case "duplicate":
        await executeCreate({
          variables: {
            data: {
              name: modelData.name,
              description: modelData.description,
              isGlobal: modelData.isGlobal,
              version: modelData.version,
              scope: form.watch("isGlobal") ? null : scopeData
            },
            currentUserId: session?.data?.user?.id,
          }
        })
        return ok("SUCCESS_DUPLICATE_WORKFLOW_TEMPLATE",
          `Successfully duplicated workflow template: ${modelData.name}`,
          filteredScope
        );
      default:
        await executeCreate({
          variables: {
            data: {
              name: modelData.name,
              description: modelData.description,
              isGlobal: modelData.isGlobal,
              version: modelData.version,
              scope: form.watch("isGlobal") ? null : scopeData
            },
            currentUserId: session?.data?.user?.id,
          }
        })
        return ok("SUCCESS_CREATE_WORKFLOW_TEMPLATE",
          `Successfully created workflow template: ${modelData.name}`,
          filteredScope
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
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Workflow Configuration</h3>
                <p className="text-xs text-muted-foreground">Define the properties for this system template.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/* Template Name & Global Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-9">
                  <CustomTextInput
                    name="name"
                    control={form.control}
                    label="Template Name"
                    placeholder="e.g., Standard Approval Process"
                  />
                </div>
                <div className="">
                  <CustomCheckbox
                    label="Global Template"
                    name="isGlobal"
                    control={form.control}
                    inputProps={{
                      style: {
                        width: '20px',
                        height: '20px'
                      }
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <CustomTextAreaInput
                  name="description"
                  control={form.control}
                  label="Description"
                  placeholder="Describe the purpose and steps of this workflow..."
                />
              </div>

              {/* Header section with Icon */}
              {
                form.watch("isGlobal") ? null : (
                  <div>
                    <div className='flex  items-center justify-between gap-3 pb-2 border-b group'>
                      <div className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Scope (Who's the view)</h3>
                          <p className="text-xs text-muted-foreground">
                            Define the scope of this workflow template. This helps the system auto-assign templates based on user attributes.
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="default"
                          type="button"
                          size="sm"
                          onClick={handleToAddScope}
                          className="gap-1.5"
                          title="Add new item"
                        >
                          <PackagePlus className="h-4 w-4" />
                          <span className="hidden sm:inline">Add Scope</span>
                        </Button>
                      </div>

                    </div>

                    {
                      scopeFieldArray.fields.map((field, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 items-end space-y-4">
                          <CustomSingleSelectInput
                            name={`scope.${index}.companyId`}
                            control={form.control}
                            label={`Company`}
                            findAllWithCursorGQL={modelAPI.CompanyGQL.findAllWithCursor}
                            findUniqueGQL={modelAPI.CompanyGQL.findUnique}
                            defaultValueId={""}
                            placeholder={`Search company...`}
                            searchPlaceholder={`Search company...`}
                            emptySelectedMessage={`Company already selected.`}
                            emptyMessage={`No company found.`}
                            cursorVariables={(search, cursor, take) => ({
                              cursorInput: {
                                cursor,
                                isActive: true,
                                take,
                                filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
                              },
                            })}
                            uniqueVariables={(id) => ({ id })}
                            mapOption={(data: unknown) => {
                              const d = data as { id?: string; name?: string; userName?: string; email?: string };
                              return {
                                label: d.name ?? d.userName ?? d.email ?? '',
                                value: d.id ?? '',
                              };
                            }}
                            mapDefaultOption={(data: unknown) => {
                              const d = data as {
                                data?: { id?: string; name?: string; userName?: string; email?: string };
                              };
                              if (!d?.data) return null;
                              return {
                                label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                                value: d.data.id ?? '',
                              };
                            }}
                          />
                          <CustomSingleSelectInput
                            name={`scope.${index}.departmentId`}
                            control={form.control}
                            label={`Department`}
                            findAllWithCursorGQL={modelAPI.DepartmentGQL.findAllWithCursor}
                            findUniqueGQL={modelAPI.DepartmentGQL.findUnique}
                            defaultValueId={field.departmentId ?? ""}
                            disabled={!form.watch(`scope.${index}.companyId`)}
                            placeholder={`Search department...`}
                            searchPlaceholder={`Search department...`}
                            emptySelectedMessage={`Department already selected.`}
                            emptyMessage={`No department found.`}
                            cursorVariables={(search, cursor, take) => {
                              const selectedCompanyId = form.watch(`scope.${index}.companyId`);
                              return {
                                cursorInput: {
                                  cursor,
                                  isActive: true,
                                  take,
                                  filter: {
                                    ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                                    ...(selectedCompanyId ? { companyId: selectedCompanyId } : {}),
                                  },
                                },
                              }
                            }}
                            uniqueVariables={(id) => ({ id })}
                            mapOption={(data: unknown) => {
                              const d = data as { id?: string; name?: string; userName?: string; email?: string };
                              return {
                                label: d.name ?? d.userName ?? d.email ?? '',
                                value: d.id ?? '',
                              };
                            }}
                            mapDefaultOption={(data: unknown) => {
                              const d = data as {
                                data?: { id?: string; name?: string; userName?: string; email?: string };
                              };
                              if (!d?.data) return null;
                              return {
                                label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                                value: d.data.id ?? '',
                              };
                            }}
                          />
                          <CustomSingleSelectInput
                            name={`scope.${index}.positionId`}
                            control={form.control}
                            label={`Position`}
                            findAllWithCursorGQL={modelAPI.PositionGQL.findAllWithCursor}
                            findUniqueGQL={modelAPI.PositionGQL.findUnique}
                            defaultValueId={field.positionId ?? ""}
                            disabled={!form.watch(`scope.${index}.companyId`)}
                            placeholder={`Search position...`}
                            searchPlaceholder={`Search position...`}
                            emptySelectedMessage={`Position already selected.`}
                            emptyMessage={`No position found.`}
                            cursorVariables={(search, cursor, take) => {
                              const selectedCompanyId = form.watch(`scope.${index}.companyId`);
                              return {
                                cursorInput: {
                                  cursor,
                                  isActive: true,
                                  take,
                                  filter: {
                                    ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                                    ...(selectedCompanyId ? { companyId: selectedCompanyId } : {}),
                                  },
                                },
                              }
                            }}
                            uniqueVariables={(id) => ({ id })}
                            mapOption={(data: unknown) => {
                              const d = data as { id?: string; name?: string; userName?: string; email?: string };
                              return {
                                label: d.name ?? d.userName ?? d.email ?? '',
                                value: d.id ?? '',
                              };
                            }}
                            mapDefaultOption={(data: unknown) => {
                              const d = data as {
                                data?: { id?: string; name?: string; userName?: string; email?: string };
                              };
                              if (!d?.data) return null;
                              return {
                                label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                                value: d.data.id ?? '',
                              };
                            }}
                          />
                          <CustomSingleSelectInput
                            name={`scope.${index}.jobLevelId`}
                            control={form.control}
                            label={`Job Level`}
                            findAllWithCursorGQL={modelAPI.JobLevelGQL.findAllWithCursor}
                            findUniqueGQL={modelAPI.JobLevelGQL.findUnique}
                            defaultValueId={field.jobLevelId ?? ""}
                            disabled={!form.watch(`scope.${index}.companyId`)}
                            placeholder={`Search joblevel...`}
                            searchPlaceholder={`Search joblevel...`}
                            emptySelectedMessage={`Job Level already selected.`}
                            emptyMessage={`No joblevel found.`}
                            cursorVariables={(search, cursor, take) => {
                              const selectedCompanyId = form.watch(`scope.${index}.companyId`);
                              return {
                                cursorInput: {
                                  cursor,
                                  isActive: true,
                                  take,
                                  filter: {
                                    ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                                    ...(selectedCompanyId ? { companyId: selectedCompanyId } : {}),
                                  },
                                },
                              }
                            }}
                            uniqueVariables={(id) => ({ id })}
                            mapOption={(data: unknown) => {
                              const d = data as { id?: string; name?: string; };
                              return {
                                label: d.name ?? '',
                                value: d.id ?? '',
                              };
                            }}
                            mapDefaultOption={(data: unknown) => {
                              const d = data as {
                                data?: { id?: string; name?: string; };
                              };
                              if (!d?.data) return null;
                              return {
                                label: d.data.name ?? '',
                                value: d.data.id ?? '',
                              };
                            }}
                          />

                          <div>
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              disabled={scopeFieldArray.fields.length === 1}
                              onClick={() => handleToRemoveScope(index)}
                              className="text-red-500 hover:bg-red-100/50 focus:bg-red-100/50 disabled:text-red-300 disabled:hover:bg-transparent"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }


              {/* Versioning Footer */}
              < div className="pt-4 mt-2 border-t bg-slate-50/50 -mx-6 px-6 py-4 rounded-b-xl" >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Info className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <CustomNumberInput
                      name="version"
                      control={form.control}
                      label={`System Version Control`}
                      inputProps={{
                        disabled: true,
                        className: "bg-white/50 border-slate-200 font-mono text-xs"
                      }}
                      placeholder="Auto-generated version"
                    />
                    <p className="mt-1.5 text-[10px] text-slate-500 italic">
                      The current revision is <span className="font-bold text-slate-700">{defaultValues.version}</span>. Versions are automatically incremented upon system deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        {/* Action Buttons - Fixed at Bottom */}
        <div className='flex gap-3 justify-end bg-background border-t pt-4'>
          <Button variant='outline' disabled={executingCreate}
            className={`px-8 ${executingCreate ? 'cursor-not-allowed' : ''}`}
          >Cancel</Button>
          <Button type='submit' className='px-8'>
            {
              executingCreate ? 'Submit...' : 'Submit'
            }
          </Button>
        </div>
      </div>
    </FormTemplate>
  );
};

export default Method;