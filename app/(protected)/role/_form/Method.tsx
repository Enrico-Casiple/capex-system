import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { RoleCreateInputSchema } from '@/lib/generated/zod/prisma-zod-types';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import CustomStaticSelectInput from '../../../../components/Forms/Inputs/CustomStaticSelectInput';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@apollo/client/react';
import { PermissionFindAll } from '@/lib/api/gql/Permission.gql';
import { useEffect, useMemo, useState } from 'react';
import PermissionSelector from '../_components/PermissionSelector';
import {
  PermissionPageInput,
  Query,
  RolePermissionPageInput,
} from '@/lib/generated/api/customHookAPI/graphql';
import CustomButton from '@/components/Forms/Inputs/CustomButton';
import { Spinner } from '@/app/_context/ListContext/ListProvider';
import { RoleFindUnique } from '@/lib/api/gql/Role.gql';
import { RolePermissionFindAll } from '@/lib/api/gql/RolePermission.gql';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

// ─── Define options once ────────────────────────────────────
const ROLE_TYPE_OPTIONS = [
  { label: 'System', value: 'SYSTEM' },
  { label: 'Custom', value: 'CUSTOM' },
  { label: 'Template', value: 'TEMPLATE' },
];

const Method = ({ rowId, actionType, popupType, setOpen }: MethodProps) => {
  const { data: role, loading: loadingRole } = useQuery<
    Pick<Query, 'RoleFindUnique'>,
    { id: string }
  >(RoleFindUnique, {
    variables: { id: rowId ?? '' },
    skip: !rowId || actionType === 'none',
  });

  const { data: rolePermissionsData, loading: loadingRolePermissions } = useQuery<
    Pick<Query, 'RolePermissionFindAll'>,
    { paginationInput: RolePermissionPageInput }
  >(RolePermissionFindAll, {
    variables: {
      paginationInput: {
        currentPage: 1,
        filter: {
          roleId: rowId ?? '',
        },
        isActive: true,
        pageSize: 1,
        search: null,
      },
    },
  });

  // Map All the Permissions of the role to an array of permission ids
  const permissionIds = useMemo(
    () =>
      rolePermissionsData?.RolePermissionFindAll?.data
        ?.map((rp) => rp.permissionId)
        .filter((id): id is string => !!id) ?? [],
    [rolePermissionsData],
  );

  // Render All the Permission with Checkbox, if the permission id is in the selectedIds, then check the checkbox
  // When checkbox is checked, add the permission id to the selectedIds, when unchecked, remove it from selectedIds
  const { data: permissionsData, loading: loadingPermissionData } = useQuery<
    Pick<Query, 'PermissionFindAll'>,
    { paginationInput: PermissionPageInput }
  >(PermissionFindAll, {
    variables: {
      paginationInput: {
        currentPage: 1,
        filter: null,
        isActive: true,
        pageSize: 1,
        search: null,
      },
    },
  });
  // inside Method component, replace the PermissionSelector usage:
  const permissions = useMemo(
    () => permissionsData?.PermissionFindAll?.data ?? [],
    [permissionsData],
  );
  const defaultValues = useMemo(
    () => ({
      name: role?.RoleFindUnique?.data?.name ?? '',
      description: role?.RoleFindUnique?.data?.description ?? '',
      roleType: role?.RoleFindUnique?.data?.roleType ?? 'CUSTOM',
      isDefault: role?.RoleFindUnique?.data?.isDefault ?? false,
    }),
    [role],
  );

  const [permissionOverrides, setPermissionOverrides] = useState<string[] | null>(null);

  const selectedPermissions = permissionOverrides ?? permissionIds;
  const setSelectedPermissions = (value: string[] | ((prev: string[]) => string[])) => {
    setPermissionOverrides((prev) =>
      typeof value === 'function' ? value(prev ?? permissionIds) : value,
    );
  };

  const form = useForm({ defaultValues });

  // Fix useEffect — form is stable so safe to include
  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const handleToSubmit = async (data: z.infer<typeof RoleCreateInputSchema>) => {
    const payload = {
      ...data,
      rolePermissions: {
        create: selectedPermissions.map((permId) => ({
          permissionId: permId,
          isActive: true,
        })),
      },
    };

    console.log('Payload:', payload);

    // TODO: Call your mutation here

    return {
      isSuccess: true,
      message: 'Role created successfully',
      code: `ROLE_${actionType?.toUpperCase() || 'CREATE'}`,
      data: payload, // You can return the created role data here if needed
    };
  };

  if (loadingRole && loadingPermissionData && loadingRolePermissions) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="-mt-8">
      <FormTemplate
        title=""
        description=""
        isHaveBorder={false}
        form={form}
        handleToSubmit={handleToSubmit}
        isFullWidth={true}
      >
        <div className="grid grid-cols-1 gap-3">
          <div>
            <CustomButton
              name="Submit"
              loading={false}
              type={'submit'}
              isSolo={false}
              inputPropsCancel={{ onClick: () => setOpen?.(false) }}
            />
          </div>
          {/* <pre>{JSON.stringify(permissionIds, null, 2)}</pre> */}
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-3">
              <div className="col-span-1">
                <Controller
                  name="isDefault"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="isDefault" className="text-sm cursor-pointer">
                        Auto-assign to new users
                      </Label>
                      <Checkbox
                        id="isDefault"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="col-span-4">
                <CustomTextInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter role name"
                />
              </div>
              <div className="col-span-2">
                <CustomStaticSelectInput
                  name="roleType"
                  control={form.control} // ← cast to simple type
                  label="Type"
                  options={ROLE_TYPE_OPTIONS}
                  placeholder="Select role type"
                />
              </div>
            </div>
            <CustomTextAreaInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter role description"
            />
          </div>
          <PermissionSelector
            permissions={permissions}
            selectedIds={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        </div>
      </FormTemplate>
    </div>
  );
};

export default Method;
