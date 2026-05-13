import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import { isAppLocale } from './locale-utils';

/**
 * Server-side request configuration for next-intl.
 *
 * - Resolves the active locale from the URL segment.
 * - Loads the matching messages JSON.
 * - Configures Intl defaults so dates, numbers, and currency formatting
 *   stay consistent across the app (overridable per call site).
 *
 * Messages are imported lazily so each locale lands in its own chunk and
 * the bundle stays lean.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isAppLocale(requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: 'Asia/Riyadh',
    now: new Date(),
    formats: {
      dateTime: {
        short: { day: '2-digit', month: '2-digit', year: 'numeric' },
        medium: { day: 'numeric', month: 'short', year: 'numeric' },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          weekday: 'long'
        },
        time: { hour: '2-digit', minute: '2-digit' }
      },
      number: {
        sar: {
          style: 'currency',
          currency: 'SAR',
          currencyDisplay: 'narrowSymbol',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        },
        percent: {
          style: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 1
        },
        integer: { maximumFractionDigits: 0 }
      }
    },
    onError(error) {
      // Don't crash the page on a single missing key; log it server-side.
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[i18n]', error.message);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter(Boolean).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        return path;
      }
      return `[${path}]`;
    }
  };
});
