import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Locale + routing definition for ElaraBase.
 *
 * - Arabic ("ar") is the default and primary locale (RTL).
 * - English ("en") is the secondary locale (LTR).
 * - We use the `as-needed` prefix strategy so the default locale's URLs
 *   stay clean for sharing (e.g. /shop instead of /ar/shop), while
 *   English routes are always explicit (/en/shop). If you instead want
 *   strict `/ar/...` and `/en/...` everywhere (recommended for SEO clarity
 *   in a bilingual market), change `localePrefix` to `'always'`.
 *
 * The `pathnames` map gives us localized, SEO-friendly URL slugs per
 * locale while keeping a single canonical key in the codebase.
 */
export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr'
};

export const localeLabel: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English'
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // 'always' guarantees /ar/* and /en/* — best for hreflang + analytics.
  // Switch to 'as-needed' if you want bare paths for the default locale.
  localePrefix: 'always',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/shop': {
      ar: '/التسوق',
      en: '/shop'
    },
    '/new-arrivals': {
      ar: '/وصل-حديثا',
      en: '/new-arrivals'
    },
    '/best-sellers': {
      ar: '/الأكثر-مبيعا',
      en: '/best-sellers'
    },
    '/collections/[slug]': {
      ar: '/المجموعات/[slug]',
      en: '/collections/[slug]'
    },
    '/categories/[slug]': {
      ar: '/الفئات/[slug]',
      en: '/categories/[slug]'
    },
    '/products/[slug]': {
      ar: '/منتج/[slug]',
      en: '/products/[slug]'
    },
    '/search': {
      ar: '/بحث',
      en: '/search'
    },
    '/cart': {
      ar: '/السلة',
      en: '/cart'
    },
    '/checkout': {
      ar: '/إتمام-الشراء',
      en: '/checkout'
    },
    '/checkout/success': {
      ar: '/إتمام-الشراء/تم',
      en: '/checkout/success'
    },
    '/orders/track': {
      ar: '/تتبع-الطلب',
      en: '/orders/track'
    },
    '/wishlist': {
      ar: '/المفضلة',
      en: '/wishlist'
    },
    '/about': {
      ar: '/عن-إلارا',
      en: '/about'
    },
    '/contact': {
      ar: '/تواصل-معنا',
      en: '/contact'
    },
    '/faq': {
      ar: '/الأسئلة-الشائعة',
      en: '/faq'
    },
    '/policies/shipping': {
      ar: '/السياسات/الشحن',
      en: '/policies/shipping'
    },
    '/policies/returns': {
      ar: '/السياسات/الاسترجاع',
      en: '/policies/returns'
    },
    '/policies/privacy': {
      ar: '/السياسات/الخصوصية',
      en: '/policies/privacy'
    },
    '/policies/terms': {
      ar: '/السياسات/الشروط',
      en: '/policies/terms'
    },
    '/auth/login': {
      ar: '/حساب/تسجيل-الدخول',
      en: '/auth/login'
    },
    '/auth/signup': {
      ar: '/حساب/إنشاء-حساب',
      en: '/auth/signup'
    },
    '/auth/forgot-password': {
      ar: '/حساب/استعادة-كلمة-المرور',
      en: '/auth/forgot-password'
    },
    '/auth/reset-password': {
      ar: '/حساب/إعادة-تعيين-كلمة-المرور',
      en: '/auth/reset-password'
    },
    '/auth/verify-email': {
      ar: '/حساب/تأكيد-البريد',
      en: '/auth/verify-email'
    },
    '/account': {
      ar: '/حسابي',
      en: '/account'
    },
    '/account/orders': {
      ar: '/حسابي/طلباتي',
      en: '/account/orders'
    },
    '/account/orders/[id]': {
      ar: '/حسابي/طلباتي/[id]',
      en: '/account/orders/[id]'
    },
    '/account/addresses': {
      ar: '/حسابي/العناوين',
      en: '/account/addresses'
    },
    '/account/wishlist': {
      ar: '/حسابي/المفضلة',
      en: '/account/wishlist'
    },
    '/account/returns': {
      ar: '/حسابي/الاسترجاع',
      en: '/account/returns'
    },
    '/account/notifications': {
      ar: '/حسابي/الإشعارات',
      en: '/account/notifications'
    },
    '/account/security': {
      ar: '/حسابي/الأمان',
      en: '/account/security'
    },
    '/account/sessions': {
      ar: '/حسابي/الأجهزة',
      en: '/account/sessions'
    }
  }
});

/**
 * Typed navigation helpers — always use these instead of next/link
 * or next/navigation directly when crossing locale boundaries.
 *
 *   import { Link, useRouter, usePathname, redirect } from '@/i18n/routing';
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
