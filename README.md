# ElaraBase

> Premium bilingual (Arabic-first / English) ecommerce storefront — built on
> Next.js 15 App Router, Tailwind v4, next-intl, and TypeScript strict.
>
> This repository ships two full specification documents and a working
> bilingual scaffold. The scaffold renders the home page in both locales
> with correct RTL, fonts, and metadata out of the box.

## What's in here

### Specification (read these first)
- **[`docs/00-product-spec.md`](./docs/00-product-spec.md)** — 17-section
  product, UX, and architecture specification. Brand strategy, design system,
  full sitemap, page-by-page wireframes, UX flows, technical stack, database
  schema, API surface, auth architecture, security spec, content/copy
  strategy, conversion strategy, admin operations, SEO plan, performance &
  accessibility, build roadmap, plus appendices on common mistakes,
  non-negotiables, MVP scope, and the architecture summary.

- **[`docs/01-bilingual-spec.md`](./docs/01-bilingual-spec.md)** — 15-section
  bilingual implementation specification. Locale routing, folder structure,
  translation namespaces, Tailwind RTL config, font loading, layout, language
  switcher, 14 RTL/LTR component patterns, bilingual database strategies,
  bilingual admin workflow, hreflang + SEO, currency/number/date formatting,
  middleware, a 35-item QA checklist, the top 10 RTL bugs, and the
  recommended build order.

### Code deliverables

| # | File                                                | Purpose                                  |
|---|-----------------------------------------------------|------------------------------------------|
| 1 | [`messages/ar.json`](./messages/ar.json)            | Arabic translations, all namespaces      |
| 2 | [`messages/en.json`](./messages/en.json)            | English translations, all namespaces     |
| 3 | [`src/i18n/routing.ts`](./src/i18n/routing.ts)      | Locale + pathname routing                |
| 4 | [`src/i18n/request.ts`](./src/i18n/request.ts)      | next-intl server config                  |
| 5 | [`src/middleware.ts`](./src/middleware.ts)          | Locale detection + cookie hardening      |
| 6 | [`src/lib/fonts.ts`](./src/lib/fonts.ts)            | IBM Plex Sans Arabic + Satoshi loading   |
| 7 | [`src/app/[locale]/layout.tsx`](./src/app/[locale]/layout.tsx) | Root layout, metadata, hreflang |
| 8 | [`src/components/LanguageSwitcher.tsx`](./src/components/LanguageSwitcher.tsx) | Header + menu switcher |
| 9 | [`src/hooks/useDirection.ts`](./src/hooks/useDirection.ts)    | Client direction helper        |
| 10| [`src/lib/formatters.ts`](./src/lib/formatters.ts)  | SAR / dates / numbers / phone / orders   |

Supporting:
- `global.d.ts` — typed messages for next-intl.
- `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`.
- `src/styles/globals.css` — design tokens via Tailwind v4 `@theme`.
- `src/app/[locale]/page.tsx`, `not-found.tsx` — minimal screens so the app boots end-to-end.
- `.env.example` — every env var Phase 1 will need (plus reserved OTP keys).

## Quick start

```bash
# 1) install
npm install

# 2) (optional) drop Satoshi woff2 files under public/fonts/satoshi/
#    OR swap localFont() for next/font/google `Inter` in src/lib/fonts.ts

# 3) copy env
cp .env.example .env.local

# 4) dev server
npm run dev
```

Then open:
- http://localhost:3000/ar — primary locale, RTL
- http://localhost:3000/en — secondary locale, LTR

## Stack at a glance

| Concern             | Choice                                    |
|---------------------|-------------------------------------------|
| Framework           | Next.js 15 (App Router) + TypeScript strict |
| Styling             | Tailwind v4 (logical utilities only)      |
| i18n                | next-intl 3.x — RSC native, typed         |
| Default locale      | Arabic (`ar`), RTL                        |
| Secondary locale    | English (`en`), LTR                       |
| URL strategy        | `/ar/...` and `/en/...` (always prefixed) |
| Database (planned)  | PostgreSQL 16 via Prisma                  |
| Payments (planned)  | Moyasar (mada/Visa/MC/Apple Pay) + COD    |
| Auth (Phase 1)      | Email + password, server-backed sessions  |
| OTP                 | Reserved hooks; ships in Phase 3          |

## Conventions

- **Logical Tailwind utilities only.** Never `pl-/pr-/ml-/mr-`; always `ps-/pe-/ms-/me-`. Same for `start-/end-`, `text-start/text-end`, `rounded-s-/rounded-e-`, `border-s/border-e`. See `docs/01-bilingual-spec.md` §4.
- **All numbers in Western digits.** Both locales. Achieved via `ar-SA-u-nu-latn` in `src/lib/formatters.ts`.
- **Server-side direction only.** `dir` is set on `<html>` from the URL segment — never in `useEffect`.
- **One accent color.** `--color-accent` (bronze). No second accent.
- **No emojis in product UI.** Keep the brand quiet.
- **Bilingual or it doesn't ship.** Admin publish is blocked until both AR and EN are filled.

## Roadmap

- **Phase 1 — Foundation (now):** bilingual scaffold + storefront + core auth + cart/checkout + admin CRUD + RBAC + audit logs.
- **Phase 2:** carrier integration, SMS, abandoned cart, encrypted PII, internal analytics.
- **Phase 3:** OTP step-up (slots into the auth state machine reserved in Phase 1).
- **Phase 4:** multi-currency, loyalty, gift cards, editorial CMS, dark mode.

Full breakdown in [`docs/00-product-spec.md`](./docs/00-product-spec.md) §16.

## License & ownership

Proprietary — ElaraBase. All rights reserved.
