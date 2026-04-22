import { gql } from '@apollo/client';
export const AuditLogFragment = gql`
fragment AuditLogFragment on AuditLog {
  id
  modelId
  modelName
  action
  actionTypeId
  timestamp
  actorId
  oldDetails
  newDetails
  parentId
  isActive
  createdAt
  updatedAt
}
`;

export const AuditLogFindAllWithCursor = gql`
  query AuditLogFindAllWithCursor($cursorInput: AuditLogCursorPaginationInput!) {
    AuditLogFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindAll = gql`
  query AuditLogFindAll($paginationInput: AuditLogPageInput!) {
    AuditLogFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
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
  ${AuditLogFragment}
`;

export const AuditLogCount = gql`
  query AuditLogCount($input: AuditLogCountInput!) {
    AuditLogCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const AuditLogFindUnique = gql`
  query AuditLogFindUnique($id: String!) {
    AuditLogFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindBy = gql`
  query AuditLogFindBy($input: AuditLogFindByInput!) {
    AuditLogFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindFirst = gql`
  query AuditLogFindFirst($input: AuditLogFindFirstInput!) {
    AuditLogFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogExportCsv = gql`
  query AuditLogExportCsv($input: AuditLogCsvExportInput!) {
    AuditLogExportCsv(input: $input) {
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


export const AuditLogCreate = gql`
  mutation AuditLogCreate($data: Json!, $currentUserId: String) {
    AuditLogCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogCreateMany = gql`
  mutation AuditLogCreateMany($data: [Json!]!, $currentUserId: String) {
    AuditLogCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogUpdate = gql`
  mutation AuditLogUpdate($id: String!, $data: Json!, $currentUserId: String) {
    AuditLogUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogUpdateMany = gql`
  mutation AuditLogUpdateMany($data: [Json!]!, $currentUserId: String) {
    AuditLogUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogArchive = gql`
  mutation AuditLogArchive($id: String!, $currentUserId: String) {
    AuditLogArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogArchiveMany = gql`
  mutation AuditLogArchiveMany($ids: [String!]!, $currentUserId: String) {
    AuditLogArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRestore = gql`
  mutation AuditLogRestore($id: String!, $currentUserId: String) {
    AuditLogRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRestoreMany = gql`
  mutation AuditLogRestoreMany($ids: [String!]!, $currentUserId: String) {
    AuditLogRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRemove = gql`
  mutation AuditLogRemove($id: String!, $currentUserId: String) {
    AuditLogRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const AuditLogRemoveMany = gql`
  mutation AuditLogRemoveMany($ids: [String!]!, $currentUserId: String) {
    AuditLogRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const AuditLogSubscription = gql`
  subscription AuditLogSubscription {
    AuditLogSubscription { ...AuditLogFragment }
  }
  ${AuditLogFragment}
`;