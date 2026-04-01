import { gql } from '@apollo/client';

export const LocationFragment = gql`
fragment LocationFragment on Location {
  id
  name
  description
  isActive
  createdAt
  updatedAt
}
`;

export const LocationFindAllWithCursor = gql`
  query LocationFindAllWithCursor($cursorInput: LocationCursorPaginationInput!) {
    LocationFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...LocationFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${LocationFragment}
`;

export const LocationFindAll = gql`
  query LocationFindAll($paginationInput: LocationPageInput!) {
    LocationFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...LocationFragment }
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
  ${LocationFragment}
`;

export const LocationCount = gql`
  query LocationCount($input: LocationCountInput!) {
    LocationCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const LocationFindUnique = gql`
  query LocationFindUnique($id: String!) {
    LocationFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationFindBy = gql`
  query LocationFindBy($input: LocationFindByInput!) {
    LocationFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationFindFirst = gql`
  query LocationFindFirst($input: LocationFindFirstInput!) {
    LocationFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationCreate = gql`
  mutation LocationCreate($data: LocationCreateInput!, $currentUserId: String) {
    LocationCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationCreateMany = gql`
  mutation LocationCreateMany($data: [LocationCreateInput!]!, $currentUserId: String) {
    LocationCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationUpdate = gql`
  mutation LocationUpdate($id: String!, $data: LocationUpdateInput!, $currentUserId: String) {
    LocationUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationUpdateMany = gql`
  mutation LocationUpdateMany($data: [LocationUpdateInput!]!, $currentUserId: String) {
    LocationUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationArchive = gql`
  mutation LocationArchive($id: String!, $currentUserId: String) {
    LocationArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationArchiveMany = gql`
  mutation LocationArchiveMany($ids: [String!]!, $currentUserId: String) {
    LocationArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationRestore = gql`
  mutation LocationRestore($id: String!, $currentUserId: String) {
    LocationRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationRestoreMany = gql`
  mutation LocationRestoreMany($ids: [String!]!, $currentUserId: String) {
    LocationRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...LocationFragment }
    }
  }
  ${LocationFragment}
`;

export const LocationRemove = gql`
  mutation LocationRemove($id: String!, $currentUserId: String) {
    LocationRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const LocationRemoveMany = gql`
  mutation LocationRemoveMany($ids: [String!]!, $currentUserId: String) {
    LocationRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const LocationSubscription = gql`
  subscription LocationSubscription {
    LocationSubscription { id }
  }
`;