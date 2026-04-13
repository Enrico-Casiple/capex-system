import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import useToast from '@/app/_hooks/useToast';
import { PlusIcon } from 'lucide-react';
import ArrayMethod, { MODEL_NAME_OPTIONS } from './ArrayMethod';
import { useSession } from 'next-auth/react';

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



export interface Condition {
  modelName: string;
  group: string;
  codeKey: string;
  code: string;
  codeLabel: string;
  value: {
    stringValue: string;
  };
}

export interface RoleFormValues {
  name: string;
  description: string;
  roleType: string;
  isDefault: boolean;
  conditions: Condition[];
}



const Method = ({ rowId, actionType, popupType, setOpen }: MethodProps) => {
  const toast = useToast();
  const session = useSession()
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
  const [permissionOverrides, setPermissionOverrides] = useState<string[] | null>(null);
  const selectedPermissions = permissionOverrides ?? permissionIds;
  const setSelectedPermissions = (value: string[] | ((prev: string[]) => string[])) => {
    setPermissionOverrides((prev) =>
      typeof value === 'function' ? value(prev ?? permissionIds) : value,
    );
  };

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
      conditions: [{
        modelName: 'RolePermission',
        group: 'RolePermissionsScopeView',
        codeKey: '',
        code: '',
        codeLabel: '',
        value: {
           stringValue: '',
        }
      }], // You can populate this based on your actual data structure
    }),
    [role?.RoleFindUnique?.data?.description, role?.RoleFindUnique?.data?.isDefault, role?.RoleFindUnique?.data?.name, role?.RoleFindUnique?.data?.roleType],
  );

  const form = useForm<RoleFormValues>({ defaultValues });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'conditions',
  })

  const addField = () => {
    const newField = {
      modelName: 'RolePermission',
      group: 'RolePermissionsScopeView',
      codeKey: '',
      code: '',
      codeLabel: '',
      value: {
          stringValue: '',
      }
    }
    const optionLength = MODEL_NAME_OPTIONS.length;
    if(fieldArray.fields.length < optionLength) {
      fieldArray.append(newField);
    } else {
      return toast.error({
        message: 'You have reached the maximum number of fields',
        description: `You can only add up to ${optionLength} fields.`,
      })
    }
    
  }

  const removeField = (index: number) => {
    // Remain the first field if it's the only one left to prevent having an empty state
    if (fieldArray.fields.length === 1) {
      fieldArray.update(0, {
        modelName: 'RolePermission',
        group: 'RolePermissionsScopeView',
        codeKey: '',
        code: '',
        codeLabel: '',
        value: {
           stringValue: '',
        }
      });
    } else {
      fieldArray.remove(index);
    }
  }

  // Fix useEffect — form is stable so safe to include
  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);



  const handleToSubmit = async (data: RoleFormValues) => {
    const rolePermissions = selectedPermissions.map((permId) => ({
      create: {
        permissionId: permId,
        isActive: true,
        scopeValues: data.conditions.map((cond) => cond.value.stringValue).filter(Boolean),
        conditions: data.conditions.map((cond) => ({
          create: {
            code: cond.code,
            codeKey: cond.codeKey,
            codeLabel: cond.codeLabel,
            group: cond.group,
            modelName: cond.modelName,
          }
        }))
      }
    })); // You can populate this based on your actual data structure
    const payload = {
      data: {
        name: data.name,
        description: data.description,
        roleType: data.roleType,
        isDefault: data.isDefault,
        isActive: true,
        rolePermissions: rolePermissions
      },
      currentUserId: session.data?.user?.id // TODO: Get from auth context
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

  if (loadingRole && loadingPermissionData && loadingRolePermissions && popupType === 'drawer') {
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
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-3">
              <div className="col-span-1">
                <Controller
                  name="isDefault"
                  control={form.control}
                  render={({ field }) => {
                    const checkedState: React.ComponentProps<typeof Checkbox>['checked'] =
                      field.value ?? undefined;

                    return (
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="isDefault" className="text-sm cursor-pointer">
                          Auto-assign to new users
                        </Label>
                        <Checkbox
                          id="isDefault"
                          checked={checkedState}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="col-span-4">
                <CustomTextInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter role name"
                  inputProps={{
                    required: true
                  }}
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

            {/* Scope for View */}
             <div className='flex justify-between items-center'>
                <Label className='text-sm'>Scope for View</Label>
                <Button variant={'default'} onClick={() => addField()}>
                  <PlusIcon className='size-4' />
                  Add new condition
                </Button>
              </div>
            <ArrayMethod 
              form={form} 
              fieldArray={fieldArray}
              addField={addField}
              removeField={removeField}
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
