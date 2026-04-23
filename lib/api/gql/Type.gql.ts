import { gql } from '@apollo/client';
export const TypeFragment = gql`
fragment TypeFragment on Type {
  id
  name
  description
  modelNameType
  isActive
  createdAt
  updatedAt
}
`;

export const TypeFindAllWithCursor = gql`
  query TypeFindAllWithCursor($cursorInput: TypeCursorPaginationInput!) {
    TypeFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...TypeFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${TypeFragment}
`;

export const TypeFindAll = gql`
  query TypeFindAll($paginationInput: TypePageInput!) {
    TypeFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...TypeFragment }
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
  ${TypeFragment}
`;

export const TypeCount = gql`
  query TypeCount($input: TypeCountInput!) {
    TypeCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const TypeFindUnique = gql`
  query TypeFindUnique($id: String!) {
    TypeFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeFindBy = gql`
  query TypeFindBy($input: TypeFindByInput!) {
    TypeFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeFindFirst = gql`
  query TypeFindFirst($input: TypeFindFirstInput!) {
    TypeFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeExportCsv = gql`
  query TypeExportCsv($input: TypeCsvExportInput!) {
    TypeExportCsv(input: $input) {
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

export const TypeGroupBy = gql`
  query TypeGroupBy($input: TypeGroupByInput!) {
    TypeGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const TypeCreate = gql`
  mutation TypeCreate($data: TypeCreateInput!, $currentUserId: String) {
    TypeCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeCreateMany = gql`
  mutation TypeCreateMany($data: [TypeCreateInput!]!, $currentUserId: String) {
    TypeCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeUpdate = gql`
  mutation TypeUpdate($id: String!, $data: TypeUpdateInput!, $currentUserId: String) {
    TypeUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeUpdateMany = gql`
  mutation TypeUpdateMany($data: [TypeUpdateInput!]!, $currentUserId: String) {
    TypeUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeArchive = gql`
  mutation TypeArchive($id: String!, $currentUserId: String) {
    TypeArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeArchiveMany = gql`
  mutation TypeArchiveMany($ids: [String!]!, $currentUserId: String) {
    TypeArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeRestore = gql`
  mutation TypeRestore($id: String!, $currentUserId: String) {
    TypeRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeRestoreMany = gql`
  mutation TypeRestoreMany($ids: [String!]!, $currentUserId: String) {
    TypeRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...TypeFragment }
    }
  }
  ${TypeFragment}
`;

export const TypeRemove = gql`
  mutation TypeRemove($id: String!, $currentUserId: String) {
    TypeRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const TypeRemoveMany = gql`
  mutation TypeRemoveMany($ids: [String!]!, $currentUserId: String) {
    TypeRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const TypeSubscription = gql`
  subscription TypeSubscription {
    TypeSubscription { ...TypeFragment }
  }
  ${TypeFragment}
`;