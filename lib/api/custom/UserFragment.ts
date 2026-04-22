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
