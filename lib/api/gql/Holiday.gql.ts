import { gql } from '@apollo/client';

export const HolidayFragment = gql`
fragment HolidayFragment on Holiday {
  id
  name
  date
  isRecurring
  description
  createdAt
  updatedAt
}
`;

export const HolidayFindAllWithCursor = gql`
  query HolidayFindAllWithCursor($cursorInput: HolidayCursorPaginationInput!) {
    HolidayFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${HolidayFragment}
`;

export const HolidayFindAll = gql`
  query HolidayFindAll($paginationInput: HolidayPageInput!) {
    HolidayFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
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
  ${HolidayFragment}
`;

export const HolidayFindUnique = gql`
  query HolidayFindUnique($id: String!) {
    HolidayFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayFindBy = gql`
  query HolidayFindBy($input: HolidayFindByInput!) {
    HolidayFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayFindFirst = gql`
  query HolidayFindFirst($input: HolidayFindFirstInput!) {
    HolidayFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayCreate = gql`
  mutation HolidayCreate($data: HolidayCreateInput!, $currentUserId: String) {
    HolidayCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayCreateMany = gql`
  mutation HolidayCreateMany($data: [HolidayCreateInput!]!, $currentUserId: String) {
    HolidayCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayUpdate = gql`
  mutation HolidayUpdate($id: String!, $data: HolidayUpdateInput!, $currentUserId: String) {
    HolidayUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayUpdateMany = gql`
  mutation HolidayUpdateMany($data: [HolidayUpdateInput!]!, $currentUserId: String) {
    HolidayUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayArchive = gql`
  mutation HolidayArchive($id: String!, $currentUserId: String) {
    HolidayArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayArchiveMany = gql`
  mutation HolidayArchiveMany($ids: [String!]!, $currentUserId: String) {
    HolidayArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayRestore = gql`
  mutation HolidayRestore($id: String!, $currentUserId: String) {
    HolidayRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayRestoreMany = gql`
  mutation HolidayRestoreMany($ids: [String!]!, $currentUserId: String) {
    HolidayRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...HolidayFragment }
    }
  }
  ${HolidayFragment}
`;

export const HolidayRemove = gql`
  mutation HolidayRemove($id: String!, $currentUserId: String) {
    HolidayRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const HolidayRemoveMany = gql`
  mutation HolidayRemoveMany($ids: [String!]!, $currentUserId: String) {
    HolidayRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const HolidaySubscription = gql`
  subscription HolidaySubscription {
    HolidaySubscription { id }
  }
`;