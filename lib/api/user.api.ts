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

export const UserFindAllSubscription = gql`
  subscription UserSubscription {
    UserSubscription {
      createdAt
      email
      emailVerified
      id
      image
      isActive
      isTwoFactorAuthEnabled
      name
      otpCode
      password
      updatedAt
      userName
    }
  }
`;
