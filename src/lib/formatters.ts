import type { Locale } from '@/i18n/routing';

/**
 * ElaraBase formatting utilities.
 *
 * Design decisions:
 *  - We deliberately use Western digits (0-9) in both locales for prices,
 *    quantities, phone numbers, and order numbers. Reason: research from
 *    Saudi/Gulf ecommerce (Noon, Salla, Amazon.sa, IKEA SA) shows users
 *    overwhelmingly prefer Western digits in checkout flows, and Western
 *    digits avoid an entire class of i18n bugs (sorting, mixed-numeral
 *    strings, OCR/copy-paste, OTP inputs). To force Western numerals even
 *    in Arabic we tag the locale with the `-u-nu-latn` Unicode extension.
 *  - Currency: in Arabic we render "250 ر.س"; in English "SAR 250". This
 *    matches local convention and what Saudi customers expect on receipts.
 *  - All functions accept a `Locale` and never read it from a global —
 *    that keeps them pure and safe for both RSC and client components.
 */

type FmtLocale = Locale | (string & {}); // allow downstream BCP-47 tags

const ARABIC_BCP47 = 'ar-SA-u-nu-latn'; // Saudi Arabic, Latin (Western) digits
const ENGLISH_BCP47 = 'en-SA';          // English with SA regional conventions

function bcp47(locale: FmtLocale): string {
  if (locale === 'ar') return ARABIC_BCP47;
  if (locale === 'en') return ENGLISH_BCP47;
  return locale;
}

/* ---------------- Currency ---------------- */

/**
 * Format a SAR amount.
 *
 * `formatPrice(250, 'ar') → "250.00 ر.س"`
 * `formatPrice(250, 'en') → "SAR 250.00"`
 *
 * Pass `{ withFractionDigits: false }` for clean catalog cards where the
 * `.00` is visual noise.
 */
export function formatPrice(
  amount: number,
  locale: FmtLocale,
  options: { withFractionDigits?: boolean } = {}
): string {
  const { withFractionDigits = true } = options;
  const fmt = new Intl.NumberFormat(bcp47(locale), {
    style: 'currency',
    currency: 'SAR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: withFractionDigits ? 2 : 0,
    maximumFractionDigits: withFractionDigits ? 2 : 0
  });
  return fmt.format(amount);
}

/**
 * For places where you need the number and the symbol independently
 * (e.g. styled price components where the symbol is smaller).
 */
export function formatPriceParts(
  amount: number,
  locale: FmtLocale
): { value: string; currency: string; raw: Intl.NumberFormatPart[] } {
  const fmt = new Intl.NumberFormat(bcp47(locale), {
    style: 'currency',
    currency: 'SAR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const parts = fmt.formatToParts(amount);
  const currency = parts.find((p) => p.type === 'currency')?.value ?? 'SAR';
  const value = parts
    .filter((p) => p.type !== 'currency' && p.type !== 'literal')
    .map((p) => p.value)
    .join('')
    .trim();
  return { value, currency, raw: parts };
}

/* ---------------- Numbers ---------------- */

export function formatNumber(value: number, locale: FmtLocale): string {
  return new Intl.NumberFormat(bcp47(locale)).format(value);
}

export function formatInteger(value: number, locale: FmtLocale): string {
  return new Intl.NumberFormat(bcp47(locale), {
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(
  ratio: number,
  locale: FmtLocale,
  fractionDigits = 0
): string {
  return new Intl.NumberFormat(bcp47(locale), {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(ratio);
}

/* ---------------- Dates ---------------- */

export type DateStyle = 'short' | 'medium' | 'long' | 'full';

export function formatDate(
  date: Date | string | number,
  locale: FmtLocale,
  style: DateStyle = 'medium'
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(bcp47(locale), { dateStyle: style }).format(d);
}

export function formatDateTime(
  date: Date | string | number,
  locale: FmtLocale
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(bcp47(locale), {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(d);
}

export function formatRelativeTime(
  date: Date | string | number,
  locale: FmtLocale,
  now: Date = new Date()
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const diffSeconds = Math.round((d.getTime() - now.getTime()) / 1000);

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1]
  ];

  const rtf = new Intl.RelativeTimeFormat(bcp47(locale), { numeric: 'auto' });
  for (const [unit, secs] of units) {
    if (Math.abs(diffSeconds) >= secs || unit === 'second') {
      return rtf.format(Math.round(diffSeconds / secs), unit);
    }
  }
  return rtf.format(0, 'second');
}

/* ---------------- Phone numbers ---------------- */

/**
 * Saudi mobile phone formatting. Accepts:
 *   05XXXXXXXX, 9665XXXXXXXX, +9665XXXXXXXX
 *
 * Renders English as "+966 5X XXX XXXX" and Arabic as "‎+966 5X XXX XXXX‎"
 * (wrapped in LRM marks so the leading "+" doesn't visually flip in RTL).
 */
export function formatSaudiPhone(raw: string, locale: FmtLocale): string {
  const digits = raw.replace(/\D/g, '');
  let local = digits;
  if (digits.startsWith('966')) local = digits.slice(3);
  else if (digits.startsWith('0')) local = digits.slice(1);

  if (local.length !== 9) return raw; // not a valid SA mobile — return as-is

  const [a, b, c, d, e, f, g, h, i] = local.split('');
  const grouped = `+966 ${a}${b} ${c}${d}${e} ${f}${g}${h}${i}`;

  // Wrap with LRM so direction stays stable inside Arabic paragraphs.
  return locale === 'ar' ? `\u200E${grouped}\u200E` : grouped;
}

/* ---------------- Order numbers ---------------- */

/**
 * Customer-facing order number. Format: ELB-YYMM-XXXXXX
 *
 * Always rendered with Western digits and bracketed by LRM marks for RTL
 * safety. Pass the database id or a sequential number; padded to 6.
 */
export function formatOrderNumber(seq: number, createdAt: Date = new Date()): string {
  const yy = String(createdAt.getFullYear()).slice(-2);
  const mm = String(createdAt.getMonth() + 1).padStart(2, '0');
  const padded = String(seq).padStart(6, '0');
  return `\u200EELB-${yy}${mm}-${padded}\u200E`;
}

/* ---------------- Lists ---------------- */

export function formatList(
  items: string[],
  locale: FmtLocale,
  type: 'conjunction' | 'disjunction' = 'conjunction'
): string {
  return new Intl.ListFormat(bcp47(locale), { type, style: 'long' }).format(items);
}

/* ---------------- Quantity / pluralization ---------------- */

/**
 * Pick the right plural-form key for the current locale.
 * Returns one of: 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'.
 * Arabic uses all six categories — never hardcode "X items".
 */
export function selectPlural(count: number, locale: FmtLocale): Intl.LDMLPluralRule {
  return new Intl.PluralRules(bcp47(locale)).select(count);
}
