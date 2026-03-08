import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        account: {},
        password: {},
        otpCode: {},
      },
      authorize: async (credentials) => {
        const { account, password, otpCode } = credentials as {
          account: string;
          password: string;
          otpCode: string;
        };
        if (account === 'admin' && password === 'admin' && otpCode === '123456') {
          return { id: '1', name: 'Admin User', email: 'admin@essi.ph' };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
