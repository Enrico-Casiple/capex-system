import React, { useMemo, useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { UserFormValues } from '../Method';
import { Layers } from 'lucide-react';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { modelGQL } from '@/lib/api/crud.gql';

type UserRoleCreateProps = {
  isViewMode: boolean;
  form: UseFormReturn<UserFormValues>;
}

const UserRoleCreate = ({ isViewMode, form }: UserRoleCreateProps) => {
  // Memoize modelAPI
  const modelAPI = useMemo(() => modelGQL, []);

  // Memoize callbacks
  const mapOption = useCallback((data: unknown) => {
    const d = data as { id?: string; name?: string };
    return { label: d.name ?? "", value: d.id ?? "" };
  }, []);

  const mapDefaultOption = useCallback((data: unknown) => {
    const d = data as { data?: { id?: string; name?: string } };
    if (!d?.data) return null;
    return { label: d.data.name ?? "", value: d.data.id ?? "" };
  }, []);

  const cursorVariables = useCallback(
    (search: string, cursor: string | null, take: number) => ({
      cursorInput: {
        cursor,
        isActive: true,
        take,
        filter: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
      },
    }),
    []
  );

  const uniqueVariables = useCallback((id: string) => ({ id }), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">
            User Role Configuration
          </h3>
          <p className="text-xs text-muted-foreground">
            Configure the user role of the workflow template, including its name, description, and global applicability.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <CustomSingleSelectInput
              name={`userRoles.${0}.roleId`}
              control={form.control}
              label="Role"
              findAllWithCursorGQL={modelAPI.RoleGQL.findAllWithCursor}
              disabled={isViewMode}
              findUniqueGQL={modelAPI.RoleGQL.findUnique}
              defaultValueId={""}
              placeholder="Search role..."
              searchPlaceholder="Search role..."
              emptySelectedMessage="Role already selected."
              emptyMessage="No role found."
              cursorVariables={cursorVariables}
              uniqueVariables={uniqueVariables}
              mapOption={mapOption}
              mapDefaultOption={mapDefaultOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserRoleCreate);