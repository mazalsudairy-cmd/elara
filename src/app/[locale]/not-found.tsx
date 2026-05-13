import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound(): Promise<React.JSX.Element> {
  const t = await getTranslations('errors.notFound');
  return (
    <main id="main" className="container-base min-h-[60dvh] grid place-items-center py-24">
      <div className="text-center max-w-md">
        <p className="text-sm tracking-[0.18em] uppercase text-[var(--color-ink-muted)]">404</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <p className="mt-4 text-[var(--color-ink-soft)]">{t('subtitle')}</p>
        <div className="mt-8">
          <Link href="/" className="btn-primary">
            {t('cta')}
          </Link>
        </div>
      </div>
    </main>
  );
}
