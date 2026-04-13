import { gql } from '@apollo/client';
export const EmailOTPFragment = gql`
fragment EmailOTPFragment on EmailOTP {
  id
  email
  code
  purpose
  isUsed
  usedAt
  expiresAt
  userId
  attempts
  maxAttempts
  isActive
  createdAt
  updatedAt
}
`;

export const EmailOTPFindAllWithCursor = gql`
  query EmailOTPFindAllWithCursor($cursorInput: EmailOTPCursorPaginationInput!) {
    EmailOTPFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPFindAll = gql`
  query EmailOTPFindAll($paginationInput: EmailOTPPageInput!) {
    EmailOTPFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
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
  ${EmailOTPFragment}
`;

export const EmailOTPCount = gql`
  query EmailOTPCount($input: EmailOTPCountInput!) {
    EmailOTPCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const EmailOTPFindUnique = gql`
  query EmailOTPFindUnique($id: String!) {
    EmailOTPFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPFindBy = gql`
  query EmailOTPFindBy($input: EmailOTPFindByInput!) {
    EmailOTPFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPFindFirst = gql`
  query EmailOTPFindFirst($input: EmailOTPFindFirstInput!) {
    EmailOTPFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPExportCsv = gql`
  query EmailOTPExportCsv($input: EmailOTPCsvExportInput!) {
    EmailOTPExportCsv(input: $input) {
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


export const EmailOTPCreate = gql`
  mutation EmailOTPCreate($data: EmailOTPCreateInput!, $currentUserId: String) {
    EmailOTPCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPCreateMany = gql`
  mutation EmailOTPCreateMany($data: [EmailOTPCreateInput!]!, $currentUserId: String) {
    EmailOTPCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPUpdate = gql`
  mutation EmailOTPUpdate($id: String!, $data: EmailOTPUpdateInput!, $currentUserId: String) {
    EmailOTPUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPUpdateMany = gql`
  mutation EmailOTPUpdateMany($data: [EmailOTPUpdateInput!]!, $currentUserId: String) {
    EmailOTPUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPArchive = gql`
  mutation EmailOTPArchive($id: String!, $currentUserId: String) {
    EmailOTPArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPArchiveMany = gql`
  mutation EmailOTPArchiveMany($ids: [String!]!, $currentUserId: String) {
    EmailOTPArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPRestore = gql`
  mutation EmailOTPRestore($id: String!, $currentUserId: String) {
    EmailOTPRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPRestoreMany = gql`
  mutation EmailOTPRestoreMany($ids: [String!]!, $currentUserId: String) {
    EmailOTPRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailOTPFragment }
    }
  }
  ${EmailOTPFragment}
`;

export const EmailOTPRemove = gql`
  mutation EmailOTPRemove($id: String!, $currentUserId: String) {
    EmailOTPRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const EmailOTPRemoveMany = gql`
  mutation EmailOTPRemoveMany($ids: [String!]!, $currentUserId: String) {
    EmailOTPRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const EmailOTPSubscription = gql`
  subscription EmailOTPSubscription {
    EmailOTPSubscription { ...EmailOTPFragment }
  }
  ${EmailOTPFragment}
`;