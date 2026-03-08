import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { prisma } from './lib/prisma/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
});
