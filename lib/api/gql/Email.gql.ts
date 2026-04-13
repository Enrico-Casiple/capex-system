import { gql } from '@apollo/client';
export const EmailFragment = gql`
fragment EmailFragment on Email {
  id
  from
  to
  cc
  bcc
  subject
  htmlContent
  textContent
  status
  messageId
  error
  userId
  emailType
  relatedId
  metadata
  sentAt
  openedAt
  clickedAt
  isActive
  createdAt
  updatedAt
}
`;

export const EmailFindAllWithCursor = gql`
  query EmailFindAllWithCursor($cursorInput: EmailCursorPaginationInput!) {
    EmailFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...EmailFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${EmailFragment}
`;

export const EmailFindAll = gql`
  query EmailFindAll($paginationInput: EmailPageInput!) {
    EmailFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...EmailFragment }
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
  ${EmailFragment}
`;

export const EmailCount = gql`
  query EmailCount($input: EmailCountInput!) {
    EmailCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const EmailFindUnique = gql`
  query EmailFindUnique($id: String!) {
    EmailFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailFindBy = gql`
  query EmailFindBy($input: EmailFindByInput!) {
    EmailFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailFindFirst = gql`
  query EmailFindFirst($input: EmailFindFirstInput!) {
    EmailFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailExportCsv = gql`
  query EmailExportCsv($input: EmailCsvExportInput!) {
    EmailExportCsv(input: $input) {
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


export const EmailCreate = gql`
  mutation EmailCreate($data: EmailCreateInput!, $currentUserId: String) {
    EmailCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailCreateMany = gql`
  mutation EmailCreateMany($data: [EmailCreateInput!]!, $currentUserId: String) {
    EmailCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailUpdate = gql`
  mutation EmailUpdate($id: String!, $data: EmailUpdateInput!, $currentUserId: String) {
    EmailUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailUpdateMany = gql`
  mutation EmailUpdateMany($data: [EmailUpdateInput!]!, $currentUserId: String) {
    EmailUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailArchive = gql`
  mutation EmailArchive($id: String!, $currentUserId: String) {
    EmailArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailArchiveMany = gql`
  mutation EmailArchiveMany($ids: [String!]!, $currentUserId: String) {
    EmailArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailRestore = gql`
  mutation EmailRestore($id: String!, $currentUserId: String) {
    EmailRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailRestoreMany = gql`
  mutation EmailRestoreMany($ids: [String!]!, $currentUserId: String) {
    EmailRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...EmailFragment }
    }
  }
  ${EmailFragment}
`;

export const EmailRemove = gql`
  mutation EmailRemove($id: String!, $currentUserId: String) {
    EmailRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const EmailRemoveMany = gql`
  mutation EmailRemoveMany($ids: [String!]!, $currentUserId: String) {
    EmailRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const EmailSubscription = gql`
  subscription EmailSubscription {
    EmailSubscription { ...EmailFragment }
  }
  ${EmailFragment}
`;