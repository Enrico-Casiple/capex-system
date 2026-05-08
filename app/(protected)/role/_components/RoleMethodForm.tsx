'use client';

import dynamic from 'next/dynamic';
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { Spinner } from '@/app/_component/Spinner';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useToast from '@/app/_hooks/useToast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DrawerClose } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MODEL_DISPLAY_NAMES } from '@/generated/model-names';
import { PermissionFindAll } from '@/lib/api/gql/Permission.gql';
import { RoleFindUnique } from '@/lib/api/gql/Role.gql';
import { RolePermissionFindAll } from '@/lib/api/gql/RolePermission.gql';
import {
  PermissionPageInput,
  Query,
  RolePermissionPageInput,
  RoleResponse,
} from '@/lib/generated/api/customHookAPI/graphql';
import { useQuery } from '@apollo/client/react';
import { Layers, PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { modelGQL } from '@/lib/api/crud.gql';
import { MODEL_NAME_OPTIONS } from '@/app/(protected)/role/_form/ArrayMethod';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import { ok } from '@/lib/util/reponseUtil';

const PermissionSelector = dynamic(
  () => import('@/app/(protected)/role/_components/PermissionSelector'),
  { ssr: false, loading: () => <Spinner /> },
);

const ArrayMethod = dynamic(
  () => import('@/app/(protected)/role/_form/ArrayMethod'),
  { ssr: false, loading: () => <Spinner /> },
);



type RoleMethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

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

const modelAPI = modelGQL;

const RoleMethodForm = ({ rowId, actionType, popupType, setOpen }: RoleMethodProps) => {
  const { model, modelName } = useListContext();
  const session = useSession();
  const toast = useToast();
  const tableName = MODEL_DISPLAY_NAMES[modelName as keyof typeof MODEL_DISPLAY_NAMES]?.toLowerCase();

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

  const permissionIds = useMemo(
    () =>
      rolePermissionsData?.RolePermissionFindAll?.data
        ?.map((rp) => rp.permissionId)
        .filter((id): id is string => !!id) ?? [],
    [rolePermissionsData],
  );

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
      conditions: [
        {
          modelName: 'RolePermission',
          group: 'RolePermissionsScopeView',
          codeKey: '',
          code: '',
          codeLabel: '',
          value: {
            stringValue: '',
          },
        },
      ],
    }),
    [
      role?.RoleFindUnique?.data?.description,
      role?.RoleFindUnique?.data?.isDefault,
      role?.RoleFindUnique?.data?.name,
      role?.RoleFindUnique?.data?.roleType,
    ],
  );

  const form = useForm<RoleFormValues>({ defaultValues });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'conditions',
  });

  const addField = () => {
    const newField = {
      modelName: 'RolePermission',
      group: 'RolePermissionsScopeView',
      codeKey: '',
      code: '',
      codeLabel: '',
      value: {
        stringValue: '',
      },
    };

    const optionLength = MODEL_NAME_OPTIONS.length;

    if (fieldArray.fields.length < optionLength) {
      fieldArray.append(newField);
    } else {
      toast.error({
        message: 'You have reached the maximum number of fields',
        description: `You can only add up to ${optionLength} fields.`,
      });
    }
  };

  const removeField = (index: number) => {
    if (fieldArray.fields.length === 1) {
      fieldArray.update(0, {
        modelName: 'RolePermission',
        group: 'RolePermissionsScopeView',
        codeKey: '',
        code: '',
        codeLabel: '',
        value: {
          stringValue: '',
        },
      });
    } else {
      fieldArray.remove(index);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI[model].create,
    setOpen: setOpen,
    successMessage: `Create ${tableName} Successfully`,
    successDescription: `The ${tableName} has been created successfully.`,
    errorMessage: `Create ${tableName} Failed`,
    errorDescription: `There was an error creating the ${tableName}. Please try again.`,
  });

  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: setOpen,
    successMessage: `Update ${tableName} Successfully`,
    successDescription: `The ${tableName} has been updated successfully.`,
    errorMessage: `Update ${tableName} Failed`,
    errorDescription: `There was an error updating the ${tableName}. Please try again.`,
  });

  const isViewMode = actionType === 'view';
  const isEditMode = actionType === 'edit';

  const handleToSubmit = async (data: RoleFormValues) => {


    const rolePermissions =
      isEditMode
        ? selectedPermissions.length > 0
          ? {
            deleteMany: {},
            create: selectedPermissions.map((permission) => ({
              permissionId: permission,
              isActive: true,
              scopeValues: data.conditions
                .map((cond) => cond.value.stringValue)
                .filter(Boolean),
              conditions: {
                create: data.conditions.map((cond) => ({
                  code: cond.code,
                  codeKey: cond.codeKey,
                  codeLabel: cond.codeLabel,
                  group: cond.group,
                  modelName: cond.modelName,
                })),
              },
            })),
          }
          : { deleteMany: {} }
        : selectedPermissions.length > 0
          ? {
            create: selectedPermissions.map((permission) => ({
              permissionId: permission,
              isActive: true,
              scopeValues: data.conditions
                .map((cond) => cond.value.stringValue)
                .filter(Boolean),
              conditions: {
                create: data.conditions.map((cond) => ({
                  code: cond.code,
                  codeKey: cond.codeKey,
                  codeLabel: cond.codeLabel,
                  group: cond.group,
                  modelName: cond.modelName,
                })),
              },
            })),
          }
          : undefined;

    const payload = {
      ...(isEditMode ? { id: rowId } : {}),
      data: {
        name: data.name,
        description: data.description,
        roleType: data.roleType,
        isDefault: data.isDefault,
        isActive: true,
        ...(rolePermissions ? { rolePermissions } : {}),
      },
      currentUserId: session.data?.user?.id,
    };

    switch (actionType) {
      case 'edit':
        await executeUpdate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              RoleUpdate: RoleResponse
            }

            if (!result.RoleUpdate.isSuccess) {
              toast.error({
                message: result.RoleUpdate.code || `Failed to update ${tableName}`,
                description: result.RoleUpdate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })
            return setOpen?.(false)
          }
        })
        return ok("SUCCESS_UPDATE_ROLE",
          `Successfully updated ${tableName}: ${data.name}`,
          payload
        );
      case "duplicate":
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              RoleCreate: RoleResponse
            }

            if (!result.RoleCreate.isSuccess) {
              toast.error({
                message: result.RoleCreate.code || `Failed to update ${tableName}`,
                description: result.RoleCreate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })

            return setOpen?.(false)
          }
        })
        return ok("SUCCESS_DUPLICATE_ROLE",
          `Successfully duplicated ${tableName}: ${data.name}`,
          payload
        );
      default:
        await executeCreate({
          variables: payload,
          onCompleted: (data) => {
            const result = data as unknown as {
              RoleCreate: RoleResponse
            }

            if (!result.RoleCreate.isSuccess) {
              toast.error({
                message: result.RoleCreate.code || `Failed to update ${tableName}`,
                description: result.RoleCreate.message || `There was an error updating the ${tableName}. Please try again.`,
              })
              return
            }

            toast.success({
              message: `Successfully updated ${tableName}`,
              description: `The ${tableName} has been updated successfully.`,
            })

            return setOpen?.(false)
          }
        })

        return ok("SUCCESS_CREATE_ROLE",
          `Successfully created ${tableName}: ${data.name}`,
          payload
        );
    }
  };

  if (loadingRole && loadingPermissionData && loadingRolePermissions && popupType === 'drawer') {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        <Spinner />
      </div>
    );
  }

  return (
    <FormTemplate
      title=""
      description=""
      form={form}
      handleToSubmit={handleToSubmit}
      isHaveBorder={false}
      isFullWidth={true}
    >
      <div className="flex flex-col gap-6 -mt-5 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-210px)]">
          <div className="space-y-6">
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

            <div className="grid grid-cols-1 gap-4">
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
                            disabled={isViewMode}
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
                    inputProps={{ required: true, disabled: isViewMode }}
                  />
                </div>

                <div className="col-span-2">
                  <CustomStaticSelectInput
                    name="roleType"
                    control={form.control}
                    label="Type"
                    options={ROLE_TYPE_OPTIONS}
                    placeholder="Select role type"
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <CustomTextAreaInput
                control={form.control}
                name="description"
                label="Description"
                placeholder="Enter role description"
                inputProps={{ disabled: isViewMode }}
              />

              <div
                className={`flex items-center justify-between ${fieldArray.fields.length === 0 || isViewMode ? 'hidden' : ''
                  }`}
              >
                <Label className="text-sm">Scope for View</Label>
                <Button variant="default" type="button" onClick={addField}>
                  <PlusIcon className="size-4" />
                  Add new condition
                </Button>
              </div>

              <ArrayMethod
                form={form}
                fieldArray={fieldArray}
                addField={addField}
                removeField={removeField}
                isViewMode={isViewMode}
              />

              <PermissionSelector
                permissions={permissions}
                selectedIds={selectedPermissions}
                setSelectedPermissions={setSelectedPermissions}
                isViewMode={isViewMode}
              />
            </div>
          </div>
        </ScrollArea>

        {actionType === 'view' ? null : (
          <div className="flex gap-3 justify-end bg-background border-t pt-4">
            <DrawerClose asChild>
              <Button
                variant="outline"
                disabled={executingCreate || executingUpdate}
                className="px-8"
                type="button"
              >
                {executingCreate || executingUpdate ? 'Canceling...' : 'Cancel'}
              </Button>
            </DrawerClose>

            <Button
              type="submit"
              className="px-8"
              disabled={executingCreate || executingUpdate}
            >
              {executingCreate || executingUpdate ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        )}
      </div>
    </FormTemplate>
  );
};

export default RoleMethodForm;