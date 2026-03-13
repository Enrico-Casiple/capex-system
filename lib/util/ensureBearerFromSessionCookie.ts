/**
 * Extracts the 'authjs.session-token' from cookies and sets it as a Bearer token
 * in the Authorization header if not already set.
 */
export const ensureBearerFromSessionCookie = (request: Request): string | null => {
  // Get cookies from the request
  const cookieHeader =
    typeof request.headers.get === 'function'
      ? request.headers.get('cookie')
      : (request.headers as unknown as Record<string, string | string[] | undefined>).cookie;

  // Extract authjs.session-token from cookies
  let sessionToken: string | null = null;
  if (cookieHeader) {
    const cookieString = Array.isArray(cookieHeader) ? cookieHeader.join('; ') : cookieHeader;
    const match = cookieString.match(/(^|;\s*)authjs\.session-token=([^;]*)/);
    sessionToken = match ? decodeURIComponent(match[2]) : null;
  }

  // const decoded = await decode({
  //   token: cookie || '', // Use the cookie value for decoding, fallback to empty string if not available
  //   secret: process.env.AUTH_SECRET || '',
  //   salt: 'authjs.session-token', // Use the session cookie name as salt
  // }); // Decode the cookie to verify it works

  // console.log('🔍 Decoded cookie payload in Yoga context:', decoded);

  // If Authorization header is not set, set it from the cookie
  if (
    sessionToken &&
    typeof request.headers.get === 'function' &&
    !request.headers.get('authorization')
  ) {
    (request.headers as unknown as Record<string, string>)['authorization'] =
      `Bearer ${sessionToken}`;
  }

  return sessionToken;
};
