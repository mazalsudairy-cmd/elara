import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

/**
 * ElaraBase middleware.
 *
 * Responsibilities:
 *  1. Locale detection + routing via next-intl (handles `/`, `/ar`, `/en`,
 *     persisted `NEXT_LOCALE` cookie, and Accept-Language fallback to `ar`).
 *  2. Locale preference cookie hardening (1-year, SameSite=Lax, secure in
 *     production) so the user's choice survives across sessions and
 *     devices logged into the same browser.
 *  3. Adds `x-pathname` and `x-locale` headers so server components and
 *     RSC tooling can read the resolved URL/locale without re-parsing.
 *
 * The `matcher` explicitly excludes `/api`, `/_next`, static files, and
 * common image/font extensions so we never re-route asset requests.
 */
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  // Mirror the URL pathname into a header for downstream RSC use.
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Promote next-intl's NEXT_LOCALE cookie to a stable, long-lived cookie
  // (next-intl writes it with default options; we re-set it with hardened
  // attributes so the user's preference persists for a year).
  const nextLocale =
    response.cookies.get('NEXT_LOCALE')?.value ??
    request.cookies.get('NEXT_LOCALE')?.value;

  if (nextLocale && routing.locales.includes(nextLocale as never)) {
    response.cookies.set('NEXT_LOCALE', nextLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false // readable on the client for the language switcher
    });
    response.headers.set('x-locale', nextLocale);
  }

  return response;
}

export const config = {
  /**
   * Matcher explanation:
   *  - Excludes anything in /api, /_next, /_vercel, /trpc
   *  - Excludes files containing a "." in the last path segment
   *    (covers .png, .jpg, .svg, .webp, .ico, .txt, .xml, .json, etc.)
   *  - Always runs on the root "/" so locale detection can take place.
   */
  matcher: [
    '/((?!api|_next|_vercel|trpc|.*\\..*).*)',
    '/'
  ]
};
