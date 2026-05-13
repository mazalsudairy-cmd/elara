import type ar from './messages/ar.json';

/**
 * Typed translation keys for next-intl.
 *
 * The Arabic file is the single source of truth for the message shape —
 * if a key exists in `ar.json` but not in `en.json`, the build will fail.
 * (Update both files together; that's also enforced by admin UX in the
 * product/category editors.)
 */
type Messages = typeof ar;

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
    Locale: 'ar' | 'en';
  }
}

export {};
