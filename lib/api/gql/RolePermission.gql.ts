import { gql } from '@apollo/client';

export const RolePermissionFragment = gql`
fragment RolePermissionFragment on RolePermission {
  id
  roleId
  permissionId
  scopeTypeId
  scopeValues
  conditions
  isActive
  createdAt
  updatedAt
}
`;

export const RolePermissionFindAllWithCursor = gql`
  query RolePermissionFindAllWithCursor($cursorInput: RolePermissionCursorPaginationInput!) {
    RolePermissionFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionFindAll = gql`
  query RolePermissionFindAll($paginationInput: RolePermissionPageInput!) {
    RolePermissionFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
      allCount
      active
      inActive
      pageinfo {
        hasNextPage
        hasPreviousPage
        pageSize
        currentPage
        totalPages
        totalCount
      }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionCount = gql`
  query RolePermissionCount($input: RolePermissionCountInput!) {
    RolePermissionCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const RolePermissionFindUnique = gql`
  query RolePermissionFindUnique($id: String!) {
    RolePermissionFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionFindBy = gql`
  query RolePermissionFindBy($input: RolePermissionFindByInput!) {
    RolePermissionFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionFindFirst = gql`
  query RolePermissionFindFirst($input: RolePermissionFindFirstInput!) {
    RolePermissionFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionCreate = gql`
  mutation RolePermissionCreate($data: RolePermissionCreateInput!, $currentUserId: String) {
    RolePermissionCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionCreateMany = gql`
  mutation RolePermissionCreateMany($data: [RolePermissionCreateInput!]!, $currentUserId: String) {
    RolePermissionCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionUpdate = gql`
  mutation RolePermissionUpdate($id: String!, $data: RolePermissionUpdateInput!, $currentUserId: String) {
    RolePermissionUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionUpdateMany = gql`
  mutation RolePermissionUpdateMany($data: [RolePermissionUpdateInput!]!, $currentUserId: String) {
    RolePermissionUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionArchive = gql`
  mutation RolePermissionArchive($id: String!, $currentUserId: String) {
    RolePermissionArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionArchiveMany = gql`
  mutation RolePermissionArchiveMany($ids: [String!]!, $currentUserId: String) {
    RolePermissionArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionRestore = gql`
  mutation RolePermissionRestore($id: String!, $currentUserId: String) {
    RolePermissionRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionRestoreMany = gql`
  mutation RolePermissionRestoreMany($ids: [String!]!, $currentUserId: String) {
    RolePermissionRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RolePermissionFragment }
    }
  }
  ${RolePermissionFragment}
`;

export const RolePermissionRemove = gql`
  mutation RolePermissionRemove($id: String!, $currentUserId: String) {
    RolePermissionRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const RolePermissionRemoveMany = gql`
  mutation RolePermissionRemoveMany($ids: [String!]!, $currentUserId: String) {
    RolePermissionRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const RolePermissionSubscription = gql`
  subscription RolePermissionSubscription {
    RolePermissionSubscription { ...RolePermissionFragment }
  }
  ${RolePermissionFragment}
`;