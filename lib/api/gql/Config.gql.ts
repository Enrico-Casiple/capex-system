import { gql } from '@apollo/client';
export const ConfigFragment = gql`
fragment ConfigFragment on Config {
  id
  modelName
  group
  codeKey
  code
  codeLabel
  value
  modelId
  sortOrder
  isActive
  createdAt
  updatedAt
}
`;

export const ConfigFindAllWithCursor = gql`
  query ConfigFindAllWithCursor($cursorInput: ConfigCursorPaginationInput!) {
    ConfigFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${ConfigFragment}
`;

export const ConfigFindAll = gql`
  query ConfigFindAll($paginationInput: ConfigPageInput!) {
    ConfigFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
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
  ${ConfigFragment}
`;

export const ConfigCount = gql`
  query ConfigCount($input: ConfigCountInput!) {
    ConfigCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const ConfigFindUnique = gql`
  query ConfigFindUnique($id: String!) {
    ConfigFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigFindBy = gql`
  query ConfigFindBy($input: ConfigFindByInput!) {
    ConfigFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigFindFirst = gql`
  query ConfigFindFirst($input: ConfigFindFirstInput!) {
    ConfigFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigExportCsv = gql`
  query ConfigExportCsv($input: ConfigCsvExportInput!) {
    ConfigExportCsv(input: $input) {
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

export const ConfigGroupBy = gql`
  query ConfigGroupBy($input: ConfigGroupByInput!) {
    ConfigGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const ConfigCreate = gql`
  mutation ConfigCreate($data: ConfigCreateInput!, $currentUserId: String) {
    ConfigCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigCreateMany = gql`
  mutation ConfigCreateMany($data: [ConfigCreateInput!]!, $currentUserId: String) {
    ConfigCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigUpdate = gql`
  mutation ConfigUpdate($id: String!, $data: ConfigUpdateInput!, $currentUserId: String) {
    ConfigUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigUpdateMany = gql`
  mutation ConfigUpdateMany($data: [ConfigUpdateInput!]!, $currentUserId: String) {
    ConfigUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigArchive = gql`
  mutation ConfigArchive($id: String!, $currentUserId: String) {
    ConfigArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigArchiveMany = gql`
  mutation ConfigArchiveMany($ids: [String!]!, $currentUserId: String) {
    ConfigArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigRestore = gql`
  mutation ConfigRestore($id: String!, $currentUserId: String) {
    ConfigRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigRestoreMany = gql`
  mutation ConfigRestoreMany($ids: [String!]!, $currentUserId: String) {
    ConfigRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ConfigFragment }
    }
  }
  ${ConfigFragment}
`;

export const ConfigRemove = gql`
  mutation ConfigRemove($id: String!, $currentUserId: String) {
    ConfigRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const ConfigRemoveMany = gql`
  mutation ConfigRemoveMany($ids: [String!]!, $currentUserId: String) {
    ConfigRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const ConfigSubscription = gql`
  subscription ConfigSubscription {
    ConfigSubscription { ...ConfigFragment }
  }
  ${ConfigFragment}
`;