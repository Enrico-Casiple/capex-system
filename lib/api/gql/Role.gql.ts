import { gql } from '@apollo/client';
export const RoleFragment = gql`
fragment RoleFragment on Role {
  id
  name
  description
  roleType
  isDefault
  parentRoleId
  isActive
  createdAt
  updatedAt
}
`;

export const RoleFindAllWithCursor = gql`
  query RoleFindAllWithCursor($cursorInput: RoleCursorPaginationInput!) {
    RoleFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...RoleFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${RoleFragment}
`;

export const RoleFindAll = gql`
  query RoleFindAll($paginationInput: RolePageInput!) {
    RoleFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...RoleFragment }
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
  ${RoleFragment}
`;

export const RoleCount = gql`
  query RoleCount($input: RoleCountInput!) {
    RoleCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const RoleFindUnique = gql`
  query RoleFindUnique($id: String!) {
    RoleFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleFindBy = gql`
  query RoleFindBy($input: RoleFindByInput!) {
    RoleFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleFindFirst = gql`
  query RoleFindFirst($input: RoleFindFirstInput!) {
    RoleFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleExportCsv = gql`
  query RoleExportCsv($input: RoleCsvExportInput!) {
    RoleExportCsv(input: $input) {
      code
      data {
        csv
        excelBase64
        excelFileName
        excelMimeType
        fileName
        mimeType
        rowCount
      }
      isSuccess
      message
    }
  }
`;


export const RoleCreate = gql`
  mutation RoleCreate($data: RoleCreateInput!, $currentUserId: String) {
    RoleCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleCreateMany = gql`
  mutation RoleCreateMany($data: [RoleCreateInput!]!, $currentUserId: String) {
    RoleCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleUpdate = gql`
  mutation RoleUpdate($id: String!, $data: RoleUpdateInput!, $currentUserId: String) {
    RoleUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleUpdateMany = gql`
  mutation RoleUpdateMany($data: [RoleUpdateInput!]!, $currentUserId: String) {
    RoleUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleArchive = gql`
  mutation RoleArchive($id: String!, $currentUserId: String) {
    RoleArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleArchiveMany = gql`
  mutation RoleArchiveMany($ids: [String!]!, $currentUserId: String) {
    RoleArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleRestore = gql`
  mutation RoleRestore($id: String!, $currentUserId: String) {
    RoleRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleRestoreMany = gql`
  mutation RoleRestoreMany($ids: [String!]!, $currentUserId: String) {
    RoleRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...RoleFragment }
    }
  }
  ${RoleFragment}
`;

export const RoleRemove = gql`
  mutation RoleRemove($id: String!, $currentUserId: String) {
    RoleRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const RoleRemoveMany = gql`
  mutation RoleRemoveMany($ids: [String!]!, $currentUserId: String) {
    RoleRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const RoleSubscription = gql`
  subscription RoleSubscription {
    RoleSubscription { ...RoleFragment }
  }
  ${RoleFragment}
`;