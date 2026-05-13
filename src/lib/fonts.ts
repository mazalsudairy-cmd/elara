import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import type { Locale } from '@/i18n/routing';

/**
 * Arabic — IBM Plex Sans Arabic via Google Fonts.
 *
 * English — Inter via Google Fonts (ships with Next.js, no binary files in repo).
 * You can swap Inter for Satoshi later via `next/font/local` once the woff2
 * files are committed under `public/fonts/satoshi/`.
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

export const englishFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-elara-en',
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  adjustFontFallback: true
});

export function getFontClassName(locale: Locale): string {
  void locale;
  return `${arabicFont.variable} ${englishFont.variable}`;
}
