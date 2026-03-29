import { gql } from '@apollo/client';

export const CompanyFragment = gql`
fragment CompanyFragment on Company {
  id
  name
  acronym
  description
  groupOfCompanyId
  locationsid
  conctactNumber
  email
  logo
  createdAt
  updatedAt
}
`;

export const CompanyFindAllWithCursor = gql`
  query CompanyFindAllWithCursor($cursorInput: CompanyCursorPaginationInput!) {
    CompanyFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${CompanyFragment}
`;

export const CompanyFindAll = gql`
  query CompanyFindAll($paginationInput: CompanyPageInput!) {
    CompanyFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
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
  ${CompanyFragment}
`;

export const CompanyFindUnique = gql`
  query CompanyFindUnique($id: String!) {
    CompanyFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyFindBy = gql`
  query CompanyFindBy($input: CompanyFindByInput!) {
    CompanyFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyFindFirst = gql`
  query CompanyFindFirst($input: CompanyFindFirstInput!) {
    CompanyFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyCreate = gql`
  mutation CompanyCreate($data: CompanyCreateInput!, $currentUserId: String) {
    CompanyCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyCreateMany = gql`
  mutation CompanyCreateMany($data: [CompanyCreateInput!]!, $currentUserId: String) {
    CompanyCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyUpdate = gql`
  mutation CompanyUpdate($id: String!, $data: CompanyUpdateInput!, $currentUserId: String) {
    CompanyUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyUpdateMany = gql`
  mutation CompanyUpdateMany($data: [CompanyUpdateInput!]!, $currentUserId: String) {
    CompanyUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyArchive = gql`
  mutation CompanyArchive($id: String!, $currentUserId: String) {
    CompanyArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyArchiveMany = gql`
  mutation CompanyArchiveMany($ids: [String!]!, $currentUserId: String) {
    CompanyArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyRestore = gql`
  mutation CompanyRestore($id: String!, $currentUserId: String) {
    CompanyRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyRestoreMany = gql`
  mutation CompanyRestoreMany($ids: [String!]!, $currentUserId: String) {
    CompanyRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...CompanyFragment }
    }
  }
  ${CompanyFragment}
`;

export const CompanyRemove = gql`
  mutation CompanyRemove($id: String!, $currentUserId: String) {
    CompanyRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const CompanyRemoveMany = gql`
  mutation CompanyRemoveMany($ids: [String!]!, $currentUserId: String) {
    CompanyRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const CompanySubscription = gql`
  subscription CompanySubscription {
    CompanySubscription { id }
  }
`;