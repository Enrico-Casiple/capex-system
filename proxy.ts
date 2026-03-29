import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import authMiddlewareConfig from './auth.middleware.config';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_HOME_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from './routes';

const { auth: proxy } = NextAuth(authMiddlewareConfig);

// ─── Logger ───────────────────────────────────────────────────────────────────

type LogLevel = 'INFO' | 'WARN' | 'REDIRECT' | 'API';

const getIP = (request: NextRequest): string => {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
};

const log = (level: LogLevel, path: string, ip: string, user: string, detail?: string) => {
  const icons: Record<LogLevel, string> = {
    INFO: '📍',
    WARN: '⚠️ ',
    REDIRECT: '↩️ ',
    API: '🔌',
  };
  const time = new Date().toISOString();
  console.log(
    `[${time}] ${icons[level]} [${level}] [IP: ${ip}] [User: ${user}] ${path}${detail ? ` → ${detail}` : ''}`,
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const addSecurityHeaders = (response: NextResponse): NextResponse => {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
};

const redirectTo = (
  url: string,
  base: URL,
  from: string,
  reason: string,
  ip: string,
  user: string,
): NextResponse => {
  log('REDIRECT', from, ip, user, `${url} (${reason})`);
  return addSecurityHeaders(NextResponse.redirect(new URL(url, base)));
};

// ─── Middleware ───────────────────────────────────────────────────────────────

export default proxy(async (request: NextRequest) => {
  const { nextUrl, method } = request;
  const session = await auth();
  const isLogged = !!session;
  const path = nextUrl.pathname;
  const ip = getIP(request);
  const user = session?.user?.email ?? (isLogged ? 'authenticated' : 'guest');
  const isApi = path.startsWith('/api');

  if (isApi) {
    log('API', path, ip, user, `${method} | logged=${isLogged}`);
  } else {
    log('INFO', path, ip, user, `logged=${isLogged}`);
  }

  const isExpired = session?.expires ? new Date(session.expires) < new Date() : false;
  if (isExpired) {
    log('WARN', path, ip, user, 'session expired');
    return redirectTo(
      `${DEFAULT_LOGIN_REDIRECT}?reason=expired`,
      nextUrl,
      path,
      'session expired',
      ip,
      user,
    );
  }

  const isApiAuthRoute = path.startsWith(apiAuthPrefix) || path.startsWith('/api/graphql');
  const isPublicRoute = publicRoutes.includes(path) || path.startsWith('/evaluator/forms/');
  const isAuthRoute = authRoutes.includes(path) || path.startsWith('/auth/setup/');

  if (isApiAuthRoute && !isAuthRoute) {
    return addSecurityHeaders(NextResponse.next());
  }

  if (path === '/') {
    return redirectTo(
      isLogged ? DEFAULT_HOME_REDIRECT : DEFAULT_LOGIN_REDIRECT,
      nextUrl,
      path,
      isLogged ? 'logged in → home' : 'not logged in → login',
      ip,
      user,
    );
  }

  if (isAuthRoute) {
    if (isLogged)
      return redirectTo(DEFAULT_HOME_REDIRECT, nextUrl, path, 'already logged in', ip, user);
    return addSecurityHeaders(NextResponse.next());
  }

  if (!isLogged && !isPublicRoute) {
    return redirectTo(
      `${DEFAULT_LOGIN_REDIRECT}?callbackUrl=${encodeURIComponent(path)}`,
      nextUrl,
      path,
      'unauthenticated',
      ip,
      user,
    );
  }

  return addSecurityHeaders(NextResponse.next());
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
