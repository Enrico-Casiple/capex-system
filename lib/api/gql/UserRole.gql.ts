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
}
`;

export const UserRoleFindAllWithCursor = gql`
  query UserRoleFindAllWithCursor($cursorInput: UserRoleCursorPaginationInput!) {
    UserRoleFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleFindAll = gql`
  query UserRoleFindAll($paginationInput: UserRolePageInput!) {
    UserRoleFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
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
  ${UserRoleFragment}
`;

export const UserRoleCount = gql`
  query UserRoleCount($input: UserRoleCountInput!) {
    UserRoleCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const UserRoleFindUnique = gql`
  query UserRoleFindUnique($id: String!) {
    UserRoleFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleFindBy = gql`
  query UserRoleFindBy($input: UserRoleFindByInput!) {
    UserRoleFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleFindFirst = gql`
  query UserRoleFindFirst($input: UserRoleFindFirstInput!) {
    UserRoleFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleCreate = gql`
  mutation UserRoleCreate($data: UserRoleCreateInput!, $currentUserId: String) {
    UserRoleCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleCreateMany = gql`
  mutation UserRoleCreateMany($data: [UserRoleCreateInput!]!, $currentUserId: String) {
    UserRoleCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleUpdate = gql`
  mutation UserRoleUpdate($id: String!, $data: UserRoleUpdateInput!, $currentUserId: String) {
    UserRoleUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleUpdateMany = gql`
  mutation UserRoleUpdateMany($data: [UserRoleUpdateInput!]!, $currentUserId: String) {
    UserRoleUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleArchive = gql`
  mutation UserRoleArchive($id: String!, $currentUserId: String) {
    UserRoleArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleArchiveMany = gql`
  mutation UserRoleArchiveMany($ids: [String!]!, $currentUserId: String) {
    UserRoleArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleRestore = gql`
  mutation UserRoleRestore($id: String!, $currentUserId: String) {
    UserRoleRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleRestoreMany = gql`
  mutation UserRoleRestoreMany($ids: [String!]!, $currentUserId: String) {
    UserRoleRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserRoleFragment }
    }
  }
  ${UserRoleFragment}
`;

export const UserRoleRemove = gql`
  mutation UserRoleRemove($id: String!, $currentUserId: String) {
    UserRoleRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserRoleRemoveMany = gql`
  mutation UserRoleRemoveMany($ids: [String!]!, $currentUserId: String) {
    UserRoleRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserRoleSubscription = gql`
  subscription UserRoleSubscription {
    UserRoleSubscription { id }
  }
`;