import { gql } from '@apollo/client';

export const StatusFragment = gql`
fragment StatusFragment on Status {
  id
  name
  modelNameType
  isActive
  createdAt
  updatedAt
}
`;

export const StatusFindAllWithCursor = gql`
  query StatusFindAllWithCursor($cursorInput: StatusCursorPaginationInput!) {
    StatusFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...StatusFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${StatusFragment}
`;

export const StatusFindAll = gql`
  query StatusFindAll($paginationInput: StatusPageInput!) {
    StatusFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...StatusFragment }
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
  ${StatusFragment}
`;

export const StatusFindUnique = gql`
  query StatusFindUnique($id: String!) {
    StatusFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusFindBy = gql`
  query StatusFindBy($input: StatusFindByInput!) {
    StatusFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusFindFirst = gql`
  query StatusFindFirst($input: StatusFindFirstInput!) {
    StatusFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusCreate = gql`
  mutation StatusCreate($data: StatusCreateInput!, $currentUserId: String) {
    StatusCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusCreateMany = gql`
  mutation StatusCreateMany($data: [StatusCreateInput!]!, $currentUserId: String) {
    StatusCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusUpdate = gql`
  mutation StatusUpdate($id: String!, $data: StatusUpdateInput!, $currentUserId: String) {
    StatusUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusUpdateMany = gql`
  mutation StatusUpdateMany($data: [StatusUpdateInput!]!, $currentUserId: String) {
    StatusUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusArchive = gql`
  mutation StatusArchive($id: String!, $currentUserId: String) {
    StatusArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusArchiveMany = gql`
  mutation StatusArchiveMany($ids: [String!]!, $currentUserId: String) {
    StatusArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRestore = gql`
  mutation StatusRestore($id: String!, $currentUserId: String) {
    StatusRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRestoreMany = gql`
  mutation StatusRestoreMany($ids: [String!]!, $currentUserId: String) {
    StatusRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRemove = gql`
  mutation StatusRemove($id: String!, $currentUserId: String) {
    StatusRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const StatusRemoveMany = gql`
  mutation StatusRemoveMany($ids: [String!]!, $currentUserId: String) {
    StatusRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const StatusSubscription = gql`
  subscription StatusSubscription {
    StatusSubscription { id }
  }
`;