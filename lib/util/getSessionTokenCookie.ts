/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';

export const getSessionTokenCookie = (): string | null => {
  const match = document.cookie.match(/(^|;\s*)authjs\.session-token=([^;]*)/);
  console.log(
    '🔍 Extracted session token from cookies:',
    match ? decodeURIComponent(match[2]) : null,
  );
  return match ? decodeURIComponent(match[2]) : null;
};

export const getSessionFromRequest = async (request: any) => {
  const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  return session?.user || null;
};

export const getSessionUser = async (request: Request) => {
  if (!request) return null;
  try {
    const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    return (session?.user as Session) || null;
  } catch (err) {
    console.warn('getToken failed in context:', err);
    return null;
  }
};

// function parseSessionFromRequest(request: IncomingMessage) {
//   try {
//     // Try to extract from authorization header first (preferred for JWT)
//     const authHeader = request.headers.authorization || '';
//     if (authHeader.startsWith('Bearer ')) {
//       const token = authHeader.slice(7);

//       // Verify and decode JWT
//       const secret = process.env.NEXTAUTH_SECRET || 'HelloWorld';
//       const decoded = jwt.verify(token, secret) as Record<string, unknown>;

//       return decoded;
//     }

//     // Fallback: try to extract session from cookies
//     const cookies = request.headers.cookie || '';
//     const sessionCookie = cookies.split(';').find((cookie) => cookie.trim().startsWith('session='));

//     if (sessionCookie) {
//       const sessionValue = sessionCookie.split('=')[1];
//       return JSON.parse(decodeURIComponent(sessionValue));
//     }

//     // Return null if no session found
//     return null;
//   } catch (error) {
//     console.warn('Failed to parse session from request:', error);
//     return null;
//   }
// }
