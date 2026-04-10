import { gql } from '@apollo/client';
export const GroupOfCompanyFragment = gql`
fragment GroupOfCompanyFragment on GroupOfCompany {
  id
  name
  acronym
  description
  industryTypeId
  headquartersId
  isActive
  createdAt
  updatedAt
}
`;

export const GroupOfCompanyFindAllWithCursor = gql`
  query GroupOfCompanyFindAllWithCursor($cursorInput: GroupOfCompanyCursorPaginationInput!) {
    GroupOfCompanyFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyFindAll = gql`
  query GroupOfCompanyFindAll($paginationInput: GroupOfCompanyPageInput!) {
    GroupOfCompanyFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
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
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyCount = gql`
  query GroupOfCompanyCount($input: GroupOfCompanyCountInput!) {
    GroupOfCompanyCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const GroupOfCompanyFindUnique = gql`
  query GroupOfCompanyFindUnique($id: String!) {
    GroupOfCompanyFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyFindBy = gql`
  query GroupOfCompanyFindBy($input: GroupOfCompanyFindByInput!) {
    GroupOfCompanyFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyFindFirst = gql`
  query GroupOfCompanyFindFirst($input: GroupOfCompanyFindFirstInput!) {
    GroupOfCompanyFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyCreate = gql`
  mutation GroupOfCompanyCreate($data: GroupOfCompanyCreateInput!, $currentUserId: String) {
    GroupOfCompanyCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyCreateMany = gql`
  mutation GroupOfCompanyCreateMany($data: [GroupOfCompanyCreateInput!]!, $currentUserId: String) {
    GroupOfCompanyCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyUpdate = gql`
  mutation GroupOfCompanyUpdate($id: String!, $data: GroupOfCompanyUpdateInput!, $currentUserId: String) {
    GroupOfCompanyUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyUpdateMany = gql`
  mutation GroupOfCompanyUpdateMany($data: [GroupOfCompanyUpdateInput!]!, $currentUserId: String) {
    GroupOfCompanyUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyArchive = gql`
  mutation GroupOfCompanyArchive($id: String!, $currentUserId: String) {
    GroupOfCompanyArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyArchiveMany = gql`
  mutation GroupOfCompanyArchiveMany($ids: [String!]!, $currentUserId: String) {
    GroupOfCompanyArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyRestore = gql`
  mutation GroupOfCompanyRestore($id: String!, $currentUserId: String) {
    GroupOfCompanyRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyRestoreMany = gql`
  mutation GroupOfCompanyRestoreMany($ids: [String!]!, $currentUserId: String) {
    GroupOfCompanyRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...GroupOfCompanyFragment }
    }
  }
  ${GroupOfCompanyFragment}
`;

export const GroupOfCompanyRemove = gql`
  mutation GroupOfCompanyRemove($id: String!, $currentUserId: String) {
    GroupOfCompanyRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const GroupOfCompanyRemoveMany = gql`
  mutation GroupOfCompanyRemoveMany($ids: [String!]!, $currentUserId: String) {
    GroupOfCompanyRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const GroupOfCompanySubscription = gql`
  subscription GroupOfCompanySubscription {
    GroupOfCompanySubscription { ...GroupOfCompanyFragment }
  }
  ${GroupOfCompanyFragment}
`;