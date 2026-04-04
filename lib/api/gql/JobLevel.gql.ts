import { gql } from '@apollo/client';

export const JobLevelFragment = gql`
fragment JobLevelFragment on JobLevel {
  id
  name
  description
  acronym
  jobcodeTypeId
  companyId
  isActive
  createdAt
  updatedAt
}
`;

export const JobLevelFindAllWithCursor = gql`
  query JobLevelFindAllWithCursor($cursorInput: JobLevelCursorPaginationInput!) {
    JobLevelFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelFindAll = gql`
  query JobLevelFindAll($paginationInput: JobLevelPageInput!) {
    JobLevelFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
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
  ${JobLevelFragment}
`;

export const JobLevelCount = gql`
  query JobLevelCount($input: JobLevelCountInput!) {
    JobLevelCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const JobLevelFindUnique = gql`
  query JobLevelFindUnique($id: String!) {
    JobLevelFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelFindBy = gql`
  query JobLevelFindBy($input: JobLevelFindByInput!) {
    JobLevelFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelFindFirst = gql`
  query JobLevelFindFirst($input: JobLevelFindFirstInput!) {
    JobLevelFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelCreate = gql`
  mutation JobLevelCreate($data: JobLevelCreateInput!, $currentUserId: String) {
    JobLevelCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelCreateMany = gql`
  mutation JobLevelCreateMany($data: [JobLevelCreateInput!]!, $currentUserId: String) {
    JobLevelCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelUpdate = gql`
  mutation JobLevelUpdate($id: String!, $data: JobLevelUpdateInput!, $currentUserId: String) {
    JobLevelUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelUpdateMany = gql`
  mutation JobLevelUpdateMany($data: [JobLevelUpdateInput!]!, $currentUserId: String) {
    JobLevelUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelArchive = gql`
  mutation JobLevelArchive($id: String!, $currentUserId: String) {
    JobLevelArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelArchiveMany = gql`
  mutation JobLevelArchiveMany($ids: [String!]!, $currentUserId: String) {
    JobLevelArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelRestore = gql`
  mutation JobLevelRestore($id: String!, $currentUserId: String) {
    JobLevelRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelRestoreMany = gql`
  mutation JobLevelRestoreMany($ids: [String!]!, $currentUserId: String) {
    JobLevelRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...JobLevelFragment }
    }
  }
  ${JobLevelFragment}
`;

export const JobLevelRemove = gql`
  mutation JobLevelRemove($id: String!, $currentUserId: String) {
    JobLevelRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const JobLevelRemoveMany = gql`
  mutation JobLevelRemoveMany($ids: [String!]!, $currentUserId: String) {
    JobLevelRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const JobLevelSubscription = gql`
  subscription JobLevelSubscription {
    JobLevelSubscription { ...JobLevelFragment }
  }
  ${JobLevelFragment}
`;