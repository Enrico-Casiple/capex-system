import { gql } from '@apollo/client';

export const UserRoleFragment = gql`
  fragment UserRoleFragment on UserRole {
    id
    userId
    roleId
    scopeTypeId
    scopeValues
    conditionOverrides
    assignedById
    expiresAt
    isActive
    createdAt
    updatedAt
    role {
      id
      name
      rolePermissions {
        permission {
          action
          createdAt
          description
          displayOrder
          id
          isActive
          isAdmin
          isGlobal
          module
          name
          resource
          updatedAt
        }
      }
    }
  }
`;