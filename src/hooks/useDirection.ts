'use client';

import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { localeDirection, type Locale } from '@/i18n/routing';

export type Direction = 'rtl' | 'ltr';

export interface UseDirectionResult {
  /** Active locale, narrowed to the project union. */
  locale: Locale;
  /** Active document direction. */
  dir: Direction;
  /** Convenience boolean for conditional JSX. */
  isRTL: boolean;
  /** The opposite direction — handy for sliding panels / mirrored animations. */
  oppositeDir: Direction;
  /**
   * Returns the logical-side keyword to use for a given physical side.
   *
   *   side('start')  → 'right' in RTL, 'left' in LTR
   *   side('end')    → 'left'  in RTL, 'right' in LTR
   *
   * Useful when you have to interop with libraries that only accept
   * physical sides (e.g. a tooltip lib that wants `placement: 'right'`).
   */
  side: (logical: 'start' | 'end') => 'left' | 'right';
}

/**
 * Read the current locale + direction in a client component.
 *
 * Server components should read direction directly from
 * `localeDirection[locale]` in their props/params — that's faster and
 * avoids unnecessary client boundaries.
 */
export function useDirection(): UseDirectionResult {
  const locale = useLocale() as Locale;

  return useMemo<UseDirectionResult>(() => {
    const dir = localeDirection[locale];
    const isRTL = dir === 'rtl';
    return {
      locale,
      dir,
      isRTL,
      oppositeDir: isRTL ? 'ltr' : 'rtl',
      side: (logical) => {
        if (logical === 'start') return isRTL ? 'right' : 'left';
        return isRTL ? 'left' : 'right';
      }
    };
  }, [locale]);
}
