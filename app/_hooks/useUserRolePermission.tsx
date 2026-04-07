import { PermissionPageInput, Query, RolePermissionPageInput, UserRolePageInput } from '@/lib/generated/api/customHookAPI/graphql'
import { useQuery } from '@apollo/client/react'
import { useSession } from 'next-auth/react'
import { UserRoleFindAll } from '@/lib/api/gql/UserRole.gql'
import { RolePermissionFindAll } from '@/lib/api/gql/RolePermission.gql'
import { PermissionFindAll } from '@/lib/api/gql/Permission.gql'
import { useMemo } from 'react'

type UserRolePermissionProps = {
  module: string[]
  resource: string[]
  action: string[]
}

const useUserRolePermission = (props: UserRolePermissionProps) => {
  const session = useSession()
  const currentUser = session.data?.user?.id

  // Find UserRole First
  const {data: userRoleData, loading: userRoleLoading} = useQuery<Pick<Query, "UserRoleFindAll">, {paginationInput: UserRolePageInput}>(UserRoleFindAll, {
   variables: {
      paginationInput: {
        isActive: true,
        pageSize: 1,
        currentPage: 1,
        filter: {
          userId: currentUser || '',
        }
      }
   },
   skip: !currentUser // Skip if no user found
  })

  // Find All RolePermission with roleId from UserRoleFindAll
  const {data: rolePermissionData, loading: rolePermissionLoading} = useQuery<Pick<Query, 'RolePermissionFindAll'>, {paginationInput: RolePermissionPageInput}>(RolePermissionFindAll, {
   variables: {
      paginationInput: {
        isActive: true,
        pageSize: 1,
        currentPage: 1,
        filter: {
          roleId: { in: userRoleData?.UserRoleFindAll?.data?.map(userRole => userRole.roleId) || [] }
        }
      }
   },
  })

  // Find All Permission with resource and action from RolePermissionFindAll
  const {data: permissionData, loading: permissionLoading} = useQuery<Pick<Query, "PermissionFindAll">, {paginationInput: PermissionPageInput}>(PermissionFindAll, {
   variables: {
      paginationInput: {
        isActive: true,
        pageSize: 1,
        currentPage: 1,
        filter: {
          AND: [
            { id: { in: rolePermissionData?.RolePermissionFindAll?.data?.map(rolePermission => rolePermission.permissionId) } },
            { module: { in: props.module } },
            { resource: { in: props.resource } },
            { action: { in: props.action } }
          ]
        }
      }
   },
  })

  const permissions = useMemo(() => permissionData?.PermissionFindAll?.data || [], [permissionData]);

  const loading = userRoleLoading || rolePermissionLoading || permissionLoading;

  // Check if it a globalAdmin 
  const isGlobalAdmin = permissions.find(permission => permission.isGlobal && permission.isAdmin)

  const hasPermission = useMemo(() => {

    if(!rolePermissionData?.RolePermissionFindAll?.data?.length) return false // if no rolePermission found, return false
    if(isGlobalAdmin) return true // if global admin, return true directly
    if (!props.module.length && !props.resource.length && !props.action.length) return false; // if no permission, return false

    // Check if there is any permission that matches the module, resource and action
    return  permissions.some(permission => {
      const moduleMatch = permission.module && props.module.includes(permission.module);
      const resourceMatch = permission.resource && props.resource.includes(permission.resource);
      const actionMatch = permission.action && props.action.includes(permission.action);
      
      return moduleMatch && resourceMatch && actionMatch;
    });
  }, [isGlobalAdmin, permissions, props.module, props.resource, props.action, rolePermissionData]);

  // make a can function to check permission more easily
  const can = (module: string, resource: string, action: string) => {
    if(isGlobalAdmin) return true // if global admin, return true directly
    return permissions.some(permission => {
      const moduleMatch = permission.module === module;
      const resourceMatch = permission.resource === resource;
      const actionMatch = permission.action === action;

      return moduleMatch && resourceMatch && actionMatch;
    });
  }
    

  return { hasPermission, loading, can  };
}

export default useUserRolePermission