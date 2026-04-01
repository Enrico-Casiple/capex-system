import { gql } from '@apollo/client';

export const PermissionFragment = gql`
fragment PermissionFragment on Permission {
  id
  name
  description
  module
  resource
  action
  displayOrder
  isGlobal
  isAdmin
  isActive
  createdAt
  updatedAt
}
`;

export const PermissionFindAllWithCursor = gql`
  query PermissionFindAllWithCursor($cursorInput: PermissionCursorPaginationInput!) {
    PermissionFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${PermissionFragment}
`;

export const PermissionFindAll = gql`
  query PermissionFindAll($paginationInput: PermissionPageInput!) {
    PermissionFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
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
  ${PermissionFragment}
`;

export const PermissionCount = gql`
  query PermissionCount($input: PermissionCountInput!) {
    PermissionCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const PermissionFindUnique = gql`
  query PermissionFindUnique($id: String!) {
    PermissionFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionFindBy = gql`
  query PermissionFindBy($input: PermissionFindByInput!) {
    PermissionFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionFindFirst = gql`
  query PermissionFindFirst($input: PermissionFindFirstInput!) {
    PermissionFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionCreate = gql`
  mutation PermissionCreate($data: PermissionCreateInput!, $currentUserId: String) {
    PermissionCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionCreateMany = gql`
  mutation PermissionCreateMany($data: [PermissionCreateInput!]!, $currentUserId: String) {
    PermissionCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionUpdate = gql`
  mutation PermissionUpdate($id: String!, $data: PermissionUpdateInput!, $currentUserId: String) {
    PermissionUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionUpdateMany = gql`
  mutation PermissionUpdateMany($data: [PermissionUpdateInput!]!, $currentUserId: String) {
    PermissionUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionArchive = gql`
  mutation PermissionArchive($id: String!, $currentUserId: String) {
    PermissionArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionArchiveMany = gql`
  mutation PermissionArchiveMany($ids: [String!]!, $currentUserId: String) {
    PermissionArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionRestore = gql`
  mutation PermissionRestore($id: String!, $currentUserId: String) {
    PermissionRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionRestoreMany = gql`
  mutation PermissionRestoreMany($ids: [String!]!, $currentUserId: String) {
    PermissionRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PermissionFragment }
    }
  }
  ${PermissionFragment}
`;

export const PermissionRemove = gql`
  mutation PermissionRemove($id: String!, $currentUserId: String) {
    PermissionRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const PermissionRemoveMany = gql`
  mutation PermissionRemoveMany($ids: [String!]!, $currentUserId: String) {
    PermissionRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const PermissionSubscription = gql`
  subscription PermissionSubscription {
    PermissionSubscription { id }
  }
`;