import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { UserFormValues } from '../Method';
import { Layers } from 'lucide-react';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { modelGQL } from '@/lib/api/crud.gql';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';

type WorkInformationCreateProps = {
  isViewMode: boolean;
  form: UseFormReturn<UserFormValues>;
}

const modelAPI = modelGQL;

const WorkInformationCreate = ({
  isViewMode,
  form,
}: WorkInformationCreateProps) => {


  return (
    <div className="space-y-6">
      {/* Header section with Icon */}
      <div className="flex items-center gap-3 pb-2 border-b">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Work Information Configuration</h3>
          <p className="text-xs text-muted-foreground">
            Configure the work information of the workflow template, including its name, description, and global applicability.
          </p>
        </div>
      </div>
      {/* Form section with Icon */}
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-3'>
            <CustomTextInput
              name={`basicInformations.workInformations.${0}.employeeNumber`}
              control={form.control}
              label="Employee Number"
              inputProps={{ disabled: true }}
              placeholder="Please enter employee number"
            />
          </div>
          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.groupOfCompanyId`}
              control={form.control}
              label="Group of Company"
              findAllWithCursorGQL={
                modelAPI.GroupOfCompanyGQL.findAllWithCursor
              }
              findUniqueGQL={modelAPI.GroupOfCompanyGQL.findUnique}
              defaultValueId={""}
              disabled={isViewMode}
              placeholder="Search group of company..."
              searchPlaceholder="Search group of company..."
              emptySelectedMessage="Group of Company already selected."
              emptyMessage="No categroup of companygory found."
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
          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.companyId`}
              control={form.control}
              label="Company"
              findAllWithCursorGQL={
                modelAPI.CompanyGQL.findAllWithCursor
              }
              disabled={isViewMode}
              findUniqueGQL={modelAPI.CompanyGQL.findUnique}
              defaultValueId={""}
              placeholder="Search company..."
              searchPlaceholder="Search company..."
              emptySelectedMessage="Company already selected."
              emptyMessage="No company found."
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

          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.departmentId`}
              control={form.control}
              label="Department"
              findAllWithCursorGQL={
                modelAPI.DepartmentGQL.findAllWithCursor
              }
              disabled={isViewMode}
              findUniqueGQL={modelAPI.DepartmentGQL.findUnique}
              defaultValueId={""}
              placeholder="Search department..."
              searchPlaceholder="Search department..."
              emptySelectedMessage="Department already selected."
              emptyMessage="No department found."
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
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.positionId`}
              control={form.control}
              label="Position"
              findAllWithCursorGQL={
                modelAPI.PositionGQL.findAllWithCursor
              }
              disabled={isViewMode}
              findUniqueGQL={modelAPI.PositionGQL.findUnique}
              defaultValueId={""}
              placeholder="Search position..."
              searchPlaceholder="Search position..."
              emptySelectedMessage="Position already selected."
              emptyMessage="No position found."
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
          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.jobLevelId`}
              control={form.control}
              label="Job Level"
              findAllWithCursorGQL={
                modelAPI.JobLevelGQL.findAllWithCursor
              }
              disabled={isViewMode}
              findUniqueGQL={modelAPI.JobLevelGQL.findUnique}
              defaultValueId={""}
              placeholder="Search job level ..."
              searchPlaceholder="Search job level..."
              emptySelectedMessage="Job Level already selected."
              emptyMessage="No job level found."
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

          <div>
            <CustomSingleSelectInput
              name={`basicInformations.workInformations.${0}.reportingManagerId`}
              control={form.control}
              label="Reporting Manager"
              findAllWithCursorGQL={
                modelAPI.BasicInformationGQL.findAllWithCursor
              }
              disabled={isViewMode}
              findUniqueGQL={modelAPI.BasicInformationGQL.findUnique}
              defaultValueId={""}
              placeholder="Search reporting manager..."
              searchPlaceholder="Search reporting manager..."
              emptySelectedMessage="Reporting Manager already selected."
              emptyMessage="No reporting manager found."
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
      </div>
    </div>
  )
}

export default WorkInformationCreate