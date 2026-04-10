import { Query, UserRolePageInput } from '@/lib/generated/api/customHookAPI/graphql';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';
import { UserRoleFindAll } from '@/lib/api/gql/UserRole.gql';
import { useMemo } from 'react';

type PermissionInput = string | string[];

const normalizeToArray = (value: PermissionInput): string[] =>
  Array.isArray(value) ? value : [value];

const useUserRolePermission = () => {
  const session = useSession();
  const currentUserId = session.data?.user?.id;
  const sessionLoading = session.status === 'loading';

  const { data: userRoleData, loading: userRoleLoading } = useQuery<
    Pick<Query, 'UserRoleFindAll'>,
    { paginationInput: UserRolePageInput }
  >(UserRoleFindAll, {
    variables: {
      paginationInput: {
        isActive: true,
        pageSize: 1,
        currentPage: 1,
        filter: { userId: currentUserId || '' },
      },
    },
    skip: !currentUserId || sessionLoading,
  });

  // Extract all rolePermissions from all roles assigned to the current user
  const rolePermissions = useMemo(
    () =>
      userRoleData?.UserRoleFindAll?.data
        ?.flatMap((userRole) => userRole.role?.rolePermissions ?? [])
        .filter(Boolean) ?? [],
    [userRoleData],
  );

  // Extract the actual permission details from each rolePermission
  const permissions = useMemo(
    () =>
      rolePermissions
        .map((rolePermission) => rolePermission.permission)
        .filter(
          (permission): permission is NonNullable<typeof permission> =>
            permission !== null && permission !== undefined,
        ),
    [rolePermissions],
  );

  const loading = sessionLoading || userRoleLoading;

  // A global admin has isGlobal and isAdmin both true — they bypass all permission checks
  const isGlobalAdmin = useMemo(
    () => permissions.some((permission) => permission.isGlobal && permission.isAdmin),
    [permissions],
  );

  // Check if the current user has a specific permission
  const can = useMemo(
    () =>
      (module: PermissionInput, resource: PermissionInput, action: PermissionInput): boolean => {
        const moduleList = normalizeToArray(module);
        const resourceList = normalizeToArray(resource);
        const actionList = normalizeToArray(action);

        if (isGlobalAdmin) return true;

        return permissions.some(
          (permission) =>
            permission.module &&
            moduleList.includes(permission.module) &&
            permission.resource &&
            resourceList.includes(permission.resource) &&
            permission.action &&
            actionList.includes(permission.action),
        );
      },
    [isGlobalAdmin, permissions],
  );

  // Get the scope (which records the user is allowed to see) for a specific permission
  // const getScope = useMemo(
  //   () => (module: string, resource: string, action: string) => {
  //     const matchedPermission = permissions.find(
  //       (permission) =>
  //         permission.module === module &&
  //         permission.resource === resource &&
  //         permission.action === action,
  //     );

  //     if (!matchedPermission) return null;

  //     const matchedRolePermission = rolePermissions.find(
  //       (rolePermission) => rolePermission.permissionId === matchedPermission.id,
  //     );

  //     return {
  //       scopeTypeId: matchedRolePermission?.scopeTypeId ?? null,
  //       scopeValues: matchedRolePermission?.scopeValues ?? [],
  //     };
  //   },
  //   [permissions, rolePermissions],
  // );

  return { permissions, rolePermissions, isGlobalAdmin, can, loading };
};

export default useUserRolePermission;
