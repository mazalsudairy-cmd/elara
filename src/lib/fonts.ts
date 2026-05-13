import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import localFont from 'next/font/local';
import type { Locale } from '@/i18n/routing';

/**
 * Arabic — IBM Plex Sans Arabic via Google Fonts (next/font/google).
 *
 * Notes:
 *  - Weights chosen to cover body text (400), emphasis (500), UI (600), and
 *    display headings (700). Avoid 100/200/300 in Arabic — they render thin
 *    on Saudi/Gulf Arabic glyphs.
 *  - `display: 'swap'` ensures text is visible immediately; users never see
 *    a FOIT (blank gap) on slow connections.
 *  - We expose the font via a CSS variable so the design tokens in
 *    globals.css can compose it into the locale-aware stack.
 */
export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-elara-ar',
  display: 'swap',
  preload: true,
  fallback: [
    'Noto Naskh Arabic',
    'Segoe UI Arabic',
    'Tahoma',
    'system-ui',
    'sans-serif'
  ]
});

/**
 * English — Satoshi via next/font/local.
 *
 * Place the woff2 files under `public/fonts/satoshi/`. The Satoshi family
 * is distributed by Fontshare; download the variable file(s) and drop them
 * in. We declare both variable and static fallback weights so the build
 * works even if a single weight is missing, and so we never fall back to
 * the browser default during render.
 *
 * If you don't yet have Satoshi locally, swap this for `Inter` from
 * `next/font/google` to keep the build green — but `--font-elara-en` will
 * still resolve correctly in CSS.
 */
export const englishFont = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi/Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal'
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic'
    }
  ],
  variable: '--font-elara-en',
  display: 'swap',
  preload: true,
  fallback: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  // Adjusting metrics avoids cumulative layout shift when Satoshi swaps in.
  adjustFontFallback: 'Arial'
});

/**
 * Compose the className that should be set on <html> for the active locale.
 *
 * We always attach BOTH variables (so language-switch doesn't require a
 * full document re-mount), then apply the active family at the body level
 * via the `html[lang^='ar']` / `html[lang^='en']` selectors in globals.css.
 */
export function getFontClassName(locale: Locale): string {
  void locale; // both variables are always attached; selector picks the right one
  return `${arabicFont.variable} ${englishFont.variable}`;
}
