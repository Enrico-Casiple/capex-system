import { gql } from '@apollo/client';
export const BasicInformationFragment = gql`
fragment BasicInformationFragment on BasicInformation {
  id
  firstName
  middleName
  lastName
  suffix
  fullName
  birthDate
  gender
  phoneNumber
  address
  city
  province
  country
  userId
  isActive
  createdAt
  updatedAt
}
`;

export const BasicInformationFindAllWithCursor = gql`
  query BasicInformationFindAllWithCursor($cursorInput: BasicInformationCursorPaginationInput!) {
    BasicInformationFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationFindAll = gql`
  query BasicInformationFindAll($paginationInput: BasicInformationPageInput!) {
    BasicInformationFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
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
  ${BasicInformationFragment}
`;

export const BasicInformationCount = gql`
  query BasicInformationCount($input: BasicInformationCountInput!) {
    BasicInformationCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const BasicInformationFindUnique = gql`
  query BasicInformationFindUnique($id: String!) {
    BasicInformationFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationFindBy = gql`
  query BasicInformationFindBy($input: BasicInformationFindByInput!) {
    BasicInformationFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationFindFirst = gql`
  query BasicInformationFindFirst($input: BasicInformationFindFirstInput!) {
    BasicInformationFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationCreate = gql`
  mutation BasicInformationCreate($data: BasicInformationCreateInput!, $currentUserId: String) {
    BasicInformationCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationCreateMany = gql`
  mutation BasicInformationCreateMany($data: [BasicInformationCreateInput!]!, $currentUserId: String) {
    BasicInformationCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationUpdate = gql`
  mutation BasicInformationUpdate($id: String!, $data: BasicInformationUpdateInput!, $currentUserId: String) {
    BasicInformationUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationUpdateMany = gql`
  mutation BasicInformationUpdateMany($data: [BasicInformationUpdateInput!]!, $currentUserId: String) {
    BasicInformationUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationArchive = gql`
  mutation BasicInformationArchive($id: String!, $currentUserId: String) {
    BasicInformationArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationArchiveMany = gql`
  mutation BasicInformationArchiveMany($ids: [String!]!, $currentUserId: String) {
    BasicInformationArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationRestore = gql`
  mutation BasicInformationRestore($id: String!, $currentUserId: String) {
    BasicInformationRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationRestoreMany = gql`
  mutation BasicInformationRestoreMany($ids: [String!]!, $currentUserId: String) {
    BasicInformationRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...BasicInformationFragment }
    }
  }
  ${BasicInformationFragment}
`;

export const BasicInformationRemove = gql`
  mutation BasicInformationRemove($id: String!, $currentUserId: String) {
    BasicInformationRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const BasicInformationRemoveMany = gql`
  mutation BasicInformationRemoveMany($ids: [String!]!, $currentUserId: String) {
    BasicInformationRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const BasicInformationSubscription = gql`
  subscription BasicInformationSubscription {
    BasicInformationSubscription { ...BasicInformationFragment }
  }
  ${BasicInformationFragment}
`;