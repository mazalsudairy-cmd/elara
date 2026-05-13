import { routing, type Locale } from './routing';

const LOCALE_SET = new Set<string>(routing.locales);

/**
 * Locale type guard (replaces `hasLocale` from `next-intl` here).
 * Next.js `optimizePackageImports: ['next-intl']` can strip `hasLocale` from
 * the optimized barrel and break production builds — keep checks local.
 */
export function isAppLocale(
  locale: string | undefined | null
): locale is Locale {
  return locale != null && LOCALE_SET.has(locale);
}
