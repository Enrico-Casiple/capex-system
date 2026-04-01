import { gql } from '@apollo/client';

export const UserFragment = gql`
fragment UserFragment on User {
  id
  name
  email
  password
  userName
  emailVerified
  image
  isTwoFactorAuthEnabled
  otpCode
  isActive
  createdAt
  updatedAt
}
`;

export const UserFindAllWithCursor = gql`
  query UserFindAllWithCursor($cursorInput: UserCursorPaginationInput!) {
    UserFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...UserFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${UserFragment}
`;

export const UserFindAll = gql`
  query UserFindAll($paginationInput: UserPageInput!) {
    UserFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...UserFragment }
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
  ${UserFragment}
`;

export const UserCount = gql`
  query UserCount($input: UserCountInput!) {
    UserCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const UserFindUnique = gql`
  query UserFindUnique($id: String!) {
    UserFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserFindBy = gql`
  query UserFindBy($input: UserFindByInput!) {
    UserFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserFindFirst = gql`
  query UserFindFirst($input: UserFindFirstInput!) {
    UserFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserCreate = gql`
  mutation UserCreate($data: UserCreateInput!, $currentUserId: String) {
    UserCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserCreateMany = gql`
  mutation UserCreateMany($data: [UserCreateInput!]!, $currentUserId: String) {
    UserCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserUpdate = gql`
  mutation UserUpdate($id: String!, $data: UserUpdateInput!, $currentUserId: String) {
    UserUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserUpdateMany = gql`
  mutation UserUpdateMany($data: [UserUpdateInput!]!, $currentUserId: String) {
    UserUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserArchive = gql`
  mutation UserArchive($id: String!, $currentUserId: String) {
    UserArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserArchiveMany = gql`
  mutation UserArchiveMany($ids: [String!]!, $currentUserId: String) {
    UserArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRestore = gql`
  mutation UserRestore($id: String!, $currentUserId: String) {
    UserRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRestoreMany = gql`
  mutation UserRestoreMany($ids: [String!]!, $currentUserId: String) {
    UserRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRemove = gql`
  mutation UserRemove($id: String!, $currentUserId: String) {
    UserRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserRemoveMany = gql`
  mutation UserRemoveMany($ids: [String!]!, $currentUserId: String) {
    UserRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserSubscription = gql`
  subscription UserSubscription {
    UserSubscription { id }
  }
`;