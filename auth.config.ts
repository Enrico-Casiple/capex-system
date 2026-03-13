import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from './lib/pothos/Model/Custom/Model/User/user.service';

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
        const { account, password, otp } = credentials as {
          account: string;
          password: string;
          otp: string;
        };
        const logins = await login({ account, password, otp: otp || null });
        if (logins) {
          return {
            id: logins?.data?.id,
            name: logins?.data?.name,
            email: logins?.data?.email,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
