import { gql } from '@apollo/client';

export const UserFindAll = gql`
  query UserFindAll($paginationInput: UserPageInput!) {
    UserFindAll(paginationInput: $paginationInput) {
      active
      allCount
      code
      data {
        id
      }
      inActive
      isSuccess
      message
      pageinfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageSize
        totalCount
        totalPages
      }
    }
  }
`;
