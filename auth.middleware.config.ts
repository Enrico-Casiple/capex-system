import type { NextAuthConfig } from 'next-auth';

// Middleware only needs this to verify the JWT session token
export default {
  providers: [],
  secret: process.env.AUTH_SECRET, // ✅ must match your auth.ts secret
} satisfies NextAuthConfig;
