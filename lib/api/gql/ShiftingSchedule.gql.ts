import { gql } from '@apollo/client';
export const ShiftingScheduleFragment = gql`
fragment ShiftingScheduleFragment on ShiftingSchedule {
  id
  name
  description
  startTime
  endTime
  lunchStart
  lunchEnd
  breakStart
  breakEnd
  workDays
  restDays
  workInformationId
  createdAt
  updatedAt
}
`;

export const ShiftingScheduleFindAllWithCursor = gql`
  query ShiftingScheduleFindAllWithCursor($cursorInput: ShiftingScheduleCursorPaginationInput!) {
    ShiftingScheduleFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleFindAll = gql`
  query ShiftingScheduleFindAll($paginationInput: ShiftingSchedulePageInput!) {
    ShiftingScheduleFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
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
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleCount = gql`
  query ShiftingScheduleCount($input: ShiftingScheduleCountInput!) {
    ShiftingScheduleCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const ShiftingScheduleFindUnique = gql`
  query ShiftingScheduleFindUnique($id: String!) {
    ShiftingScheduleFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleFindBy = gql`
  query ShiftingScheduleFindBy($input: ShiftingScheduleFindByInput!) {
    ShiftingScheduleFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleFindFirst = gql`
  query ShiftingScheduleFindFirst($input: ShiftingScheduleFindFirstInput!) {
    ShiftingScheduleFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleExportCsv = gql`
  query ShiftingScheduleExportCsv($input: ShiftingScheduleCsvExportInput!) {
    ShiftingScheduleExportCsv(input: $input) {
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

export const ShiftingScheduleGroupBy = gql`
  query ShiftingScheduleGroupBy($input: ShiftingScheduleGroupByInput!) {
    ShiftingScheduleGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const ShiftingScheduleCreate = gql`
  mutation ShiftingScheduleCreate($data: ShiftingScheduleCreateInput!, $currentUserId: String) {
    ShiftingScheduleCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleCreateMany = gql`
  mutation ShiftingScheduleCreateMany($data: [ShiftingScheduleCreateInput!]!, $currentUserId: String) {
    ShiftingScheduleCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleUpdate = gql`
  mutation ShiftingScheduleUpdate($id: String!, $data: ShiftingScheduleUpdateInput!, $currentUserId: String) {
    ShiftingScheduleUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleUpdateMany = gql`
  mutation ShiftingScheduleUpdateMany($data: [ShiftingScheduleUpdateInput!]!, $currentUserId: String) {
    ShiftingScheduleUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleArchive = gql`
  mutation ShiftingScheduleArchive($id: String!, $currentUserId: String) {
    ShiftingScheduleArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleArchiveMany = gql`
  mutation ShiftingScheduleArchiveMany($ids: [String!]!, $currentUserId: String) {
    ShiftingScheduleArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleRestore = gql`
  mutation ShiftingScheduleRestore($id: String!, $currentUserId: String) {
    ShiftingScheduleRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleRestoreMany = gql`
  mutation ShiftingScheduleRestoreMany($ids: [String!]!, $currentUserId: String) {
    ShiftingScheduleRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...ShiftingScheduleFragment }
    }
  }
  ${ShiftingScheduleFragment}
`;

export const ShiftingScheduleRemove = gql`
  mutation ShiftingScheduleRemove($id: String!, $currentUserId: String) {
    ShiftingScheduleRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const ShiftingScheduleRemoveMany = gql`
  mutation ShiftingScheduleRemoveMany($ids: [String!]!, $currentUserId: String) {
    ShiftingScheduleRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const ShiftingScheduleSubscription = gql`
  subscription ShiftingScheduleSubscription {
    ShiftingScheduleSubscription { ...ShiftingScheduleFragment }
  }
  ${ShiftingScheduleFragment}
`;