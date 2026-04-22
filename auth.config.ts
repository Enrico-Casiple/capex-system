import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { client } from './app/_context/GraphQLClient/client';
import LoginSchema from './app/auth/_forms/schema/Login';
import { UserFindFirst } from './lib/api/gql/User.gql';
import { Query, UserFindFirstInput } from './lib/generated/api/customHookAPI/graphql';

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
        if (!parsed.success) return null; // ← silently reject invalid/undefined calls

        const { account } = parsed.data;
        const findUserByEmail = await client.query<
          { UserFindFirst: Query['UserFindFirst'] },
          {
            input: UserFindFirstInput;
          }
        >({
          query: UserFindFirst,
          variables: {
            input: {
              where: {
                OR: [{ email: { equals: account } }, { userName: { equals: account } }],
              },
            },
          },
        });

        if (findUserByEmail.data?.UserFindFirst?.data) {
          return {
            id: findUserByEmail.data.UserFindFirst.data.id,
            name: findUserByEmail.data.UserFindFirst.data.name,
            email: findUserByEmail.data.UserFindFirst.data.email,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
