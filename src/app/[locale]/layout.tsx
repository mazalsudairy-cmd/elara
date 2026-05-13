import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, localeDirection, type Locale } from '@/i18n/routing';
import { getFontClassName } from '@/lib/fonts';
import '@/styles/globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elarabase.com';
const SITE_NAME = 'ElaraBase';

/**
 * Pre-generate one HTML shell per locale at build time so every
 * locale-prefixed route renders statically when possible.
 */
export function generateStaticParams(): Array<{ locale: Locale }> {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Build full locale-aware <head> metadata: title, description, OG, Twitter,
 * canonical and hreflang alternates.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'seo' });

  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('home.title'),
      template: t('titleTemplate')
    },
    description: t('home.description'),
    applicationName: SITE_NAME,
    keywords: t('keywords').split(',').map((s) => s.trim()),
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_SA' : 'en_SA',
      alternateLocale: locale === 'ar' ? 'en_SA' : 'ar_SA',
      title: t('home.title'),
      description: t('home.description'),
      images: [
        {
          url: `${SITE_URL}/og/${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: t('home.title')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: [`${SITE_URL}/og/${locale}.jpg`]
    },
    alternates: {
      canonical: url,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/${routing.defaultLocale}`
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
    },
    formatDetection: { telephone: false, email: false, address: false }
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F4' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0E0C' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required so child server components can use translations + remain static.
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = localeDirection[locale];
  const fontClass = getFontClassName(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontClass}
      // suppressHydrationWarning is safe here: the only attribute that can
      // legitimately differ between server and client is the future
      // color-scheme toggle. Direction and lang are set authoritatively
      // server-side, so there is no FOUC and no RTL flash.
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-[var(--color-canvas)] text-[var(--color-ink)] antialiased">
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Riyadh"
        >
          {/* Skip link — keyboard-only users land on main content fast */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-surface)]"
          >
            {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
          </a>
          <div id="root" data-locale={locale} data-dir={dir}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
