import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next.js 15.5+: typed routes live here — never use `experimental.typedRoutes`.
  // Off: next-intl localized pathnames + dynamic segments are easier without strict href typing.
  typedRoutes: false,
  // Do not use `optimizePackageImports: ['next-intl']` — Next 15.5's barrel
  // optimizer omits `hasLocale` and breaks `next build` on Vercel.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add the CDN/object-storage host you ship images from, e.g.:
      // { protocol: 'https', hostname: 'cdn.elarabase.com' }
    ],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
