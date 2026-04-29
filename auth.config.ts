import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { client } from './app/_context/GraphQLClient/client';
import LoginSchema from './app/auth/_forms/schema/Login';
import { UserFindFirst } from './lib/api/gql/User.gql';
import { Query, UserFindFirstInput, UserResponse } from './lib/generated/api/customHookAPI/graphql';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        account: {},
        password: {},
        otp: {},
      },
authorize: async (credentials) => {
  const parsed = LoginSchema.safeParse(credentials);
  if (!parsed.success) return null;

  const { account } = parsed.data;
  const response = await client.query<
    { UserFindFirst: UserResponse },
    { input: UserFindFirstInput; }
  >({
    query: UserFindFirst,
    variables: {
      input: {
        where: {
          OR: [
            { userName: account },
            { email: account }
          ]
        }
      }
    },
  });

  console.log('Apollo response:', JSON.stringify(response, null, 2));

  // Check for errors first
  if (response.error && response.error.message ) {
    console.error('GraphQL errors:', response.error);
    return null;
  }

  const userResponse = response.data?.UserFindFirst;
  
  if (userResponse?.isSuccess && userResponse?.data) {
    const user = userResponse.data;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  return null;
},
    }),
  ],
} satisfies NextAuthConfig;
