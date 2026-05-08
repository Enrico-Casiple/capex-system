import { Query, UserRolePageInput } from '@/lib/generated/api/customHookAPI/graphql';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';
import { UserRoleFindAll } from '@/lib/api/gql/UserRole.gql';
import { useMemo, useCallback } from 'react';

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
    // Add cache policy to prevent unnecessary fetches
    fetchPolicy: 'cache-first',
  });

  // Extract all rolePermissions from all roles assigned to the current user
  const rolePermissions = useMemo(
    () =>
      userRoleData?.UserRoleFindAll?.data
        ?.flatMap((userRole) => userRole.role?.rolePermissions ?? [])
        .filter(Boolean) ?? [],
    [userRoleData?.UserRoleFindAll?.data],
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

  // Memoize the can function to prevent recreation
  const can = useCallback(
    (module: PermissionInput, action: PermissionInput): boolean => {
      if (isGlobalAdmin) return true;

      const moduleList = normalizeToArray(module);
      // const resourceList = normalizeToArray(resource);
      const actionList = normalizeToArray(action);

      // Filter to only keep modules/resources/actions that user has permission for
      const allowedModules = moduleList.filter(m =>
        permissions.some(p => p.module === m || p.module === '*')
      );
      // const allowedResources = resourceList.filter(r =>
      //   permissions.some(p => p.resource === r || p.resource === '*')
      // );
      const allowedActions = actionList.filter(a =>
        permissions.some(p => p.action === a || p.action === '*')
      );

      // Validate filtered inputs - reject empty arrays
      if (allowedModules.length === 0 || allowedActions.length === 0) {
        return false;
      }

      // Check if ALL filtered items have a matching permission
      return permissions.some(
        (permission) =>
          permission.module &&
          allowedModules.includes(permission.module) &&
          // permission.resource &&
          // allowedResources.includes(permission.resource) &&
          permission.action &&
          allowedActions.includes(permission.action),
      );
    },
    [isGlobalAdmin, permissions],
  );

  return { permissions, rolePermissions, isGlobalAdmin, can, loading };
};

export default useUserRolePermission;