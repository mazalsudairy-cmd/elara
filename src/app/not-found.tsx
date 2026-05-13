import Link from 'next/link';
import { routing } from '@/i18n/routing';

/**
 * Top-level 404 — used when the URL doesn't match any locale segment.
 * We send the visitor to the default locale's home page.
 */
export default function RootNotFound(): React.JSX.Element {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1>الصفحة غير موجودة</h1>
        <p style={{ marginTop: '0.5rem' }}>Page not found</p>
        <p style={{ marginTop: '2rem' }}>
          <Link href={`/${routing.defaultLocale}`}>العودة للرئيسية / Back home</Link>
        </p>
      </body>
    </html>
  );
}
