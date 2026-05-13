import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Placeholder home page — proves the i18n pipeline end-to-end.
 * Replace with the full marketing homepage once the storefront components
 * are built (see docs/00-product-spec.md §4 for the wireframe).
 */
export default async function HomePage({ params }: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  return (
    <main id="main" className="container-base py-16 md:py-24">
      <header className="flex items-center justify-between hairline-0">
        <p className="text-sm tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">
          {tCommon('brandFull')}
        </p>
        <LanguageSwitcher />
      </header>

      <section className="mt-24 max-w-2xl">
        <p className="text-sm tracking-[0.18em] uppercase text-[var(--color-accent)]">
          {t('hero.eyebrow')}
        </p>
        <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-balance">
          {t('hero.title')}
        </h1>
        <p className="mt-6 text-lg text-[var(--color-ink-soft)] text-pretty">
          {t('hero.subtitle')}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/shop" className="btn-primary">
            {t('hero.primaryCta')}
          </Link>
          <Link href="/about" className="btn-secondary">
            {t('hero.secondaryCta')}
          </Link>
        </div>
      </section>
    </main>
  );
}
