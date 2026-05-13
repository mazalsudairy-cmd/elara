'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import {
  usePathname,
  useRouter,
  locales,
  localeLabel,
  type Locale
} from '@/i18n/routing';

function normalizeRouteParams(
  params: ReturnType<typeof useParams>
): Record<string, string> {
  const out: Record<string, string> = {};
  if (params == null || typeof params !== 'object') return out;
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    out[key] = Array.isArray(value) ? String(value[0] ?? '') : String(value);
  }
  return out;
}

interface LanguageSwitcherProps {
  /**
   * Visual variant.
   *  - 'inline': two-pill toggle (AR | EN). Best for headers.
   *  - 'menu':   list of links. Best for mobile slide-out menus and footers.
   */
  variant?: 'inline' | 'menu';
  className?: string;
  /** Called after switching, e.g. to close a mobile drawer. */
  onSwitched?: (next: Locale) => void;
}

/**
 * LanguageSwitcher
 *
 * - Preserves the current pathname AND dynamic route params on switch
 *   (e.g. /en/products/[slug] → /ar/منتج/[slug]).
 * - Uses `router.replace` (not `push`) so the language switch does not
 *   pollute browser history.
 * - Marks itself busy via `useTransition`, disabling controls during the
 *   client navigation so users can't double-fire.
 * - Fully keyboard-accessible. Communicates current state with
 *   `aria-pressed` (inline) or `aria-current` (menu).
 */
export function LanguageSwitcher({
  variant = 'inline',
  className,
  onSwitched
}: LanguageSwitcherProps): React.JSX.Element {
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('common');
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale): void => {
    if (next === activeLocale) return;
    startTransition(() => {
      const normalized = normalizeRouteParams(params);
      const hasParams = Object.keys(normalized).length > 0;
      // Typed routes can't express every dynamic pathname at compile time; the
      // object shape is correct at runtime for next-intl's router.
      if (hasParams) {
        router.replace(
          { pathname, params: normalized } as Parameters<
            typeof router.replace
          >[0],
          { locale: next, scroll: false }
        );
      } else {
        router.replace(pathname, { locale: next, scroll: false });
      }
      onSwitched?.(next);
    });
  };

  if (variant === 'menu') {
    return (
      <ul
        role="list"
        className={className}
        aria-label={t('languageSwitcher.label')}
      >
        {locales.map((loc) => {
          const isActive = loc === activeLocale;
          return (
            <li key={loc}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                disabled={isPending || isActive}
                aria-current={isActive ? 'true' : undefined}
                lang={loc}
                dir={loc === 'ar' ? 'rtl' : 'ltr'}
                className={[
                  'flex w-full items-center justify-between',
                  'px-4 py-3 text-base',
                  'border-b border-[var(--color-line)] last:border-b-0',
                  isActive
                    ? 'text-[var(--color-ink)] font-medium'
                    : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
                ].join(' ')}
              >
                <span>{localeLabel[loc]}</span>
                {isActive ? (
                  <span aria-hidden className="text-[var(--color-accent)]">•</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  // Default: inline pill toggle
  return (
    <div
      role="group"
      aria-label={t('languageSwitcher.label')}
      aria-busy={isPending || undefined}
      className={[
        'inline-flex items-center gap-px rounded-full',
        'border border-[var(--color-line-strong)] bg-[var(--color-surface)]',
        'p-0.5 text-sm',
        className ?? ''
      ].join(' ')}
    >
      {locales.map((loc) => {
        const isActive = loc === activeLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending || isActive}
            aria-pressed={isActive}
            lang={loc}
            dir={loc === 'ar' ? 'rtl' : 'ltr'}
            className={[
              'rounded-full px-3 py-1.5 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
              isActive
                ? 'bg-[var(--color-ink)] text-[var(--color-surface)]'
                : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
            ].join(' ')}
          >
            {loc === 'ar' ? 'العربية' : 'EN'}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
