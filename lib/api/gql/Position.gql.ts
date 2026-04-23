import { gql } from '@apollo/client';
export const PositionFragment = gql`
fragment PositionFragment on Position {
  id
  name
  acronym
  description
  isActive
  createdAt
  updatedAt
  scopeTypeId
}
`;

export const PositionFindAllWithCursor = gql`
  query PositionFindAllWithCursor($cursorInput: PositionCursorPaginationInput!) {
    PositionFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...PositionFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${PositionFragment}
`;

export const PositionFindAll = gql`
  query PositionFindAll($paginationInput: PositionPageInput!) {
    PositionFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...PositionFragment }
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
  ${PositionFragment}
`;

export const PositionCount = gql`
  query PositionCount($input: PositionCountInput!) {
    PositionCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const PositionFindUnique = gql`
  query PositionFindUnique($id: String!) {
    PositionFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionFindBy = gql`
  query PositionFindBy($input: PositionFindByInput!) {
    PositionFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionFindFirst = gql`
  query PositionFindFirst($input: PositionFindFirstInput!) {
    PositionFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionExportCsv = gql`
  query PositionExportCsv($input: PositionCsvExportInput!) {
    PositionExportCsv(input: $input) {
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

export const PositionGroupBy = gql`
  query PositionGroupBy($input: PositionGroupByInput!) {
    PositionGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const PositionCreate = gql`
  mutation PositionCreate($data: PositionCreateInput!, $currentUserId: String) {
    PositionCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionCreateMany = gql`
  mutation PositionCreateMany($data: [PositionCreateInput!]!, $currentUserId: String) {
    PositionCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionUpdate = gql`
  mutation PositionUpdate($id: String!, $data: PositionUpdateInput!, $currentUserId: String) {
    PositionUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionUpdateMany = gql`
  mutation PositionUpdateMany($data: [PositionUpdateInput!]!, $currentUserId: String) {
    PositionUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionArchive = gql`
  mutation PositionArchive($id: String!, $currentUserId: String) {
    PositionArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionArchiveMany = gql`
  mutation PositionArchiveMany($ids: [String!]!, $currentUserId: String) {
    PositionArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionRestore = gql`
  mutation PositionRestore($id: String!, $currentUserId: String) {
    PositionRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionRestoreMany = gql`
  mutation PositionRestoreMany($ids: [String!]!, $currentUserId: String) {
    PositionRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...PositionFragment }
    }
  }
  ${PositionFragment}
`;

export const PositionRemove = gql`
  mutation PositionRemove($id: String!, $currentUserId: String) {
    PositionRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const PositionRemoveMany = gql`
  mutation PositionRemoveMany($ids: [String!]!, $currentUserId: String) {
    PositionRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const PositionSubscription = gql`
  subscription PositionSubscription {
    PositionSubscription { ...PositionFragment }
  }
  ${PositionFragment}
`;