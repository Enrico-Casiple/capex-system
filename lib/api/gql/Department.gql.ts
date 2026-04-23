import { gql } from '@apollo/client';
export const DepartmentFragment = gql`
fragment DepartmentFragment on Department {
  id
  name
  acronym
  description
  companyId
  scopeTypeId
  isActive
  createdAt
  updatedAt
}
`;

export const DepartmentFindAllWithCursor = gql`
  query DepartmentFindAllWithCursor($cursorInput: DepartmentCursorPaginationInput!) {
    DepartmentFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentFindAll = gql`
  query DepartmentFindAll($paginationInput: DepartmentPageInput!) {
    DepartmentFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
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
  ${DepartmentFragment}
`;

export const DepartmentCount = gql`
  query DepartmentCount($input: DepartmentCountInput!) {
    DepartmentCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const DepartmentFindUnique = gql`
  query DepartmentFindUnique($id: String!) {
    DepartmentFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentFindBy = gql`
  query DepartmentFindBy($input: DepartmentFindByInput!) {
    DepartmentFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentFindFirst = gql`
  query DepartmentFindFirst($input: DepartmentFindFirstInput!) {
    DepartmentFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentExportCsv = gql`
  query DepartmentExportCsv($input: DepartmentCsvExportInput!) {
    DepartmentExportCsv(input: $input) {
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

export const DepartmentGroupBy = gql`
  query DepartmentGroupBy($input: DepartmentGroupByInput!) {
    DepartmentGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const DepartmentCreate = gql`
  mutation DepartmentCreate($data: DepartmentCreateInput!, $currentUserId: String) {
    DepartmentCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentCreateMany = gql`
  mutation DepartmentCreateMany($data: [DepartmentCreateInput!]!, $currentUserId: String) {
    DepartmentCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentUpdate = gql`
  mutation DepartmentUpdate($id: String!, $data: DepartmentUpdateInput!, $currentUserId: String) {
    DepartmentUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentUpdateMany = gql`
  mutation DepartmentUpdateMany($data: [DepartmentUpdateInput!]!, $currentUserId: String) {
    DepartmentUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentArchive = gql`
  mutation DepartmentArchive($id: String!, $currentUserId: String) {
    DepartmentArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentArchiveMany = gql`
  mutation DepartmentArchiveMany($ids: [String!]!, $currentUserId: String) {
    DepartmentArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentRestore = gql`
  mutation DepartmentRestore($id: String!, $currentUserId: String) {
    DepartmentRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentRestoreMany = gql`
  mutation DepartmentRestoreMany($ids: [String!]!, $currentUserId: String) {
    DepartmentRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...DepartmentFragment }
    }
  }
  ${DepartmentFragment}
`;

export const DepartmentRemove = gql`
  mutation DepartmentRemove($id: String!, $currentUserId: String) {
    DepartmentRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const DepartmentRemoveMany = gql`
  mutation DepartmentRemoveMany($ids: [String!]!, $currentUserId: String) {
    DepartmentRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const DepartmentSubscription = gql`
  subscription DepartmentSubscription {
    DepartmentSubscription { ...DepartmentFragment }
  }
  ${DepartmentFragment}
`;