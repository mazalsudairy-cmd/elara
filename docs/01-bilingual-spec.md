# ElaraBase — Bilingual System Specification (AR + EN)

> Companion to `00-product-spec.md`. This doc focuses **only** on the
> bilingual implementation — locales, RTL, fonts, formatting, SEO, QA.
>
> Primary locale: **Arabic (`ar`)** — RTL, default. Secondary locale:
> **English (`en`)** — LTR.
>
> All 10 code deliverables referenced here exist in this repository:
>
> 1. `messages/ar.json`
> 2. `messages/en.json`
> 3. `src/i18n/routing.ts`
> 4. `src/i18n/request.ts`
> 5. `src/middleware.ts`
> 6. `src/lib/fonts.ts`
> 7. `src/app/[locale]/layout.tsx`
> 8. `src/components/LanguageSwitcher.tsx`
> 9. `src/hooks/useDirection.ts`
> 10. `src/lib/formatters.ts`

---

## 1. Technical stack for i18n

### Why next-intl
- **App Router native.** `next-intl` integrates with RSC, Server Actions, and middleware out of the box; no client-only bolt-ons.
- **Typed messages.** Once we declare `Messages` in `global.d.ts`, every `useTranslations('common')` call is type-checked against `messages/ar.json`. Misspellings fail at build.
- **Localized pathnames.** Routes can have per-locale slugs (`/en/products/[slug]` ↔ `/ar/منتج/[slug]`) without a custom router.
- **Server-rendered.** Both the message catalog and the locale resolution happen on the server, so the first HTML response is already in the right language and direction — **no FOUC, no RTL flash**.
- **Tree-shakeable.** Each locale's JSON is its own chunk; we never ship Arabic strings to English visitors.

### Locale routing
- URL strategy: **`localePrefix: 'always'`** — every route lives under `/ar/...` or `/en/...`. We pick this over `'as-needed'` for three reasons:
  1. Cleaner analytics segmentation.
  2. Unambiguous hreflang implementation.
  3. Easier external linking ("share this Arabic page" always works).
- Localized pathnames defined in `src/i18n/routing.ts`. For dynamic segments we keep the same param name (`[slug]`, `[id]`) in both locales.
- Default locale (`ar`) is used when:
  - The cookie is absent.
  - `Accept-Language` doesn't prefer English.

### Avoiding hydration RTL mismatches
The classic bug: server renders `<html dir="ltr">` and the client flips to `rtl` after mount, causing a one-frame "RTL flash" and a hydration warning.

Our defense:
1. **`dir` is set inside the `<html>` tag server-side** in `app/[locale]/layout.tsx` — it is part of the streamed HTML, not a client effect.
2. **`lang` is also set server-side**, derived from the same route segment.
3. We do not gate `dir` on a client-side hook (no `useEffect(() => setDir(...))` anywhere).
4. **`suppressHydrationWarning`** is applied on the `<html>` element only — and only for the legitimate case where a future theme toggle changes `color-scheme`.
5. Fonts are loaded via `next/font` with stable variable names — both Arabic and English fonts are attached on every render via CSS variables, and the active family is selected via `html[lang^='ar']` / `html[lang^='en']` in `globals.css`. There is no class-swap involved that could differ between server and client.

### Persistence
- Locale preference is stored in **`NEXT_LOCALE` cookie** for 1 year.
- The middleware (see §13) re-sets this cookie with hardened attributes on every request so the user's choice survives across devices logged into the same browser profile.
- The `LanguageSwitcher` component does a **`router.replace`** with the same canonical pathname + params — it does not full-reload the page, and it does not push history (so the back button never bounces between locales).

---

## 2. Complete folder structure

```
elara site/
├── messages/
│   ├── ar.json
│   └── en.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── not-found.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   └── LanguageSwitcher.tsx
│   ├── hooks/
│   │   └── useDirection.ts
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── fonts.ts
│   │   └── formatters.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── docs/
│   ├── 00-product-spec.md
│   └── 01-bilingual-spec.md
├── public/
│   └── fonts/
│       └── satoshi/
│           ├── Satoshi-Variable.woff2
│           └── Satoshi-VariableItalic.woff2
├── .env.example
├── .gitignore
├── global.d.ts                ← types for next-intl Messages + Locale
├── next.config.ts             ← createNextIntlPlugin('./src/i18n/request.ts')
├── package.json
├── postcss.config.mjs         ← @tailwindcss/postcss
├── tailwind.config.ts
└── tsconfig.json              ← paths: { "@/*": ["./src/*"] }
```

Conventions:
- Everything user-facing under `src/`.
- `messages/` lives at the **repo root**, not under `src/`. This avoids `next-intl` re-importing the JSON through the bundler more than once and keeps message files easy to lint as plain data.
- The `[locale]` segment is the only locale-aware folder; never reach for `usePathname()` in a server component to detect locale — read `params.locale` instead.

---

## 3. Complete translation files

Namespaces and full content are in the deliverable files. Quick reference:

| Namespace      | Purpose                                              | Files                       |
|----------------|------------------------------------------------------|-----------------------------|
| `common`       | Brand, tagline, currency, generic actions, time strings | `messages/{ar,en}.json`  |
| `nav`          | Primary nav, utility nav, footer, mobile menu        | same                        |
| `home`         | Hero, reassurance, sections                          | same                        |
| `shop`         | Listing, filters, sort, results                      | same                        |
| `product`      | PDP labels, stock, tabs, related                     | same                        |
| `cart`         | Cart page, items, summary, reassurance               | same                        |
| `checkout`     | 4 steps, success                                     | same                        |
| `account`      | Tabs and subpages                                    | same                        |
| `auth`         | Login, signup, forgot, reset, verify, OTP placeholder | same                        |
| `admin`        | Nav, overview, orders, products, customers, discounts | same                       |
| `errors`       | Generic, network, 404, 500, session, form            | same                        |
| `success`      | Toast/inline confirmations                           | same                        |
| `validation`   | Per-field validation messages                        | same                        |
| `seo`          | Per-page title/description templates                 | same                        |

Arabic phrasing rules baked into the files:
- `سلة التسوق` — never `عربة التسوق`.
- `تسجيل الدخول` — never just `دخول`.
- `إنشاء حساب` — never just `تسجيل`.
- `إتمام الشراء` for checkout.
- `إضافة إلى السلة` for add-to-cart.
- Currency: `250 ر.س` in Arabic, `SAR 250` in English.

Both files use the same key shape — verified by `global.d.ts` (Arabic is the source of truth; building with a missing English key fails `tsc`).

---

## 4. Tailwind RTL config

### Logical properties — the contract
We use **logical properties only**. The mental model is "start" / "end" instead of "left" / "right":

| Physical (forbidden) | Logical (required)        | Meaning in LTR | Meaning in RTL |
|----------------------|---------------------------|----------------|----------------|
| `pl-4`               | `ps-4`                    | padding-left   | padding-right  |
| `pr-4`               | `pe-4`                    | padding-right  | padding-left   |
| `ml-2`               | `ms-2`                    | margin-left    | margin-right   |
| `mr-2`               | `me-2`                    | margin-right   | margin-left    |
| `left-0`             | `start-0`                 | left:0         | right:0        |
| `right-0`            | `end-0`                   | right:0        | left:0         |
| `text-left`          | `text-start`              | text-align:left | text-align:right |
| `text-right`         | `text-end`                | text-align:right | text-align:left |
| `border-l`           | `border-s`                | border-left    | border-right   |
| `border-r`           | `border-e`                | border-right   | border-left    |
| `rounded-l-md`       | `rounded-s-md`            | start-rounded  | start-rounded  |
| `rounded-r-md`       | `rounded-e-md`            | end-rounded    | end-rounded    |

Tailwind v4 ships these utilities natively — no plugin needed.

### Mirroring icons in RTL
Some icons must mirror (chevrons, back arrows, directional sliders); some must not (brand mark, payment logos, ID badges). We solve this with a CSS class:

```css
/* In src/styles/globals.css */
[dir='rtl'] .flip-on-rtl { transform: scaleX(-1); }
```

Usage:

```tsx
<ChevronRight className="h-4 w-4 flip-on-rtl" aria-hidden />
```

ESLint rule (recommended; configure once eslint is added):

```jsonc
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/\\b(pl|pr|ml|mr|left|right|text-left|text-right)-/]",
        "message": "Use logical Tailwind utilities (ps-/pe-/ms-/me-/start-/end-/text-start/text-end)."
      }
    ]
  }
}
```

### tailwind.config.ts
Tailwind v4 reads design tokens from CSS (`@theme` in `globals.css`). The config file (`tailwind.config.ts`) is intentionally minimal — only content paths plus a couple of editor hints. See the file in the repo for the live version.

### Tip: a `dir` attribute-selector variant
If you ever need a variant inside JSX, Tailwind v4 supports arbitrary variants:

```tsx
<button className="[dir='rtl']:flip-on-rtl">…</button>
```

But prefer the `flip-on-rtl` semantic class — it documents intent.

---

## 5. Font loading

Implementation: `src/lib/fonts.ts`. Highlights:

- **Arabic**: `IBM_Plex_Sans_Arabic` via `next/font/google`. Weights 400/500/600/700.
- **English**: `Satoshi` via `next/font/local`. Place the variable woff2 files under `public/fonts/satoshi/`. Until they're added you can swap to `Inter` from `next/font/google` without changing any CSS — the variable `--font-elara-en` continues to work.
- `display: 'swap'` everywhere → no FOIT.
- `preload: true` for both → the active locale's font ships in the initial response.
- Fallback stacks chosen for Saudi/Gulf devices (`Segoe UI Arabic`, `Tahoma`, system).
- `adjustFontFallback: 'Arial'` on the English font reduces CLS when Satoshi swaps in.

Both font variables are always attached to `<html>` (`--font-elara-ar`, `--font-elara-en`). The active family is selected in `globals.css`:

```css
html[lang^='ar'] body { font-family: var(--font-sans-ar); }
html[lang^='en'] body { font-family: var(--font-sans-en); }
```

No flash, no double-mount on language switch.

---

## 6. Complete layout file

`src/app/[locale]/layout.tsx` is the single place where:
- `lang` and `dir` are set authoritatively (server-rendered into the HTML stream).
- The Next.js metadata API generates per-locale OG/Twitter/canonical/hreflang.
- The `NextIntlClientProvider` wraps the tree with messages.
- The skip-to-content link is rendered for keyboard users.

Notes:
- `generateStaticParams` returns one entry per locale so each locale's HTML is pre-rendered at build time when route data permits.
- `setRequestLocale(locale)` is called inside the layout so deep server components can `useTranslations()` and remain statically renderable.
- `alternates.languages` maps to `/ar` and `/en` plus an `x-default` pointing to the default locale — required for correct hreflang.

---

## 7. Language switcher component

See `src/components/LanguageSwitcher.tsx`. Two variants:
- **`inline`** — pill toggle for the header. `aria-pressed` reflects state, `aria-busy` on the group during navigation.
- **`menu`** — list of links for mobile drawers and the footer. `aria-current` reflects state.

Behavior:
- Uses `next-intl`'s typed `useRouter().replace({ pathname, params }, { locale: next })` — preserves dynamic params and the canonical pathname.
- `router.replace` instead of `push` → switching languages doesn't pollute history.
- `scroll: false` → no jump on switch.
- Disabled while `useTransition` is pending → no double-fire.
- Works in both directions: button order follows logical start/end; the active pill renders consistently in either layout.

---

## 8. RTL / LTR component snippets

Reusable patterns for the 14 components called out. All use logical utilities. RTL behavior is automatic when `dir="rtl"` is on `<html>`.

### 8.1 Nav header

```tsx
<header className="sticky top-0 z-40 bg-[var(--color-canvas)]/85 backdrop-blur border-b border-[var(--color-line)]">
  <div className="container-base flex h-16 items-center justify-between">
    <a href={`/${locale}`} className="font-semibold tracking-tight text-lg">
      {t('brandFull')}
    </a>
    <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-ink-soft)]">
      <Link href="/shop">{tNav('primary.shop')}</Link>
      <Link href="/collections">{tNav('primary.collections')}</Link>
      <Link href="/about">{tNav('primary.about')}</Link>
    </nav>
    <div className="flex items-center gap-3">
      <button aria-label={tNav('utility.search')} className="p-2"><SearchIcon className="h-5 w-5" /></button>
      <Link href="/wishlist" aria-label={tNav('utility.wishlist')} className="p-2"><HeartIcon className="h-5 w-5" /></Link>
      <Link href="/cart" aria-label={tNav('utility.cart')} className="p-2 relative">
        <BagIcon className="h-5 w-5" />
        <span className="absolute -top-1 -end-1 rounded-full bg-[var(--color-accent)] text-[10px] text-white px-1.5">
          {cartCount}
        </span>
      </Link>
      <LanguageSwitcher />
    </div>
  </div>
</header>
```

Note `-end-1` instead of `-right-1`.

### 8.2 Product card

```tsx
<article className="group">
  <a href={`/${locale}/products/${product.slug}`} className="block">
    <div className="relative aspect-[4/5] md:aspect-square overflow-hidden bg-[var(--color-surface-2)]">
      <Image src={product.image} alt={product.altText} fill sizes="(max-width:768px) 50vw, 25vw" />
      {product.isNew && (
        <span className="absolute top-3 start-3 rounded-xs bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] px-2 py-0.5 text-[11px]">
          {t('labels.newBadge')}
        </span>
      )}
    </div>
    <div className="mt-3 ps-1 pe-1">
      <h3 className="text-sm font-medium">{product.name}</h3>
      <p className="mt-1 tabular-nums text-sm text-[var(--color-ink-soft)]">{price}</p>
    </div>
  </a>
</article>
```

### 8.3 Cart row

```tsx
<li className="flex items-start gap-4 py-5 border-b border-[var(--color-line)]">
  <Image src={item.image} alt="" width={88} height={88} className="rounded-sm bg-[var(--color-surface-2)]" />
  <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-sm font-medium truncate">{item.name}</h3>
      <p className="tabular-nums text-sm">{lineTotal}</p>
    </div>
    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">{t('item.size', { value: item.size })} · {t('item.color', { value: item.color })}</p>
    <div className="mt-3 flex items-center gap-3">
      <QuantityStepper qty={item.qty} />
      <button className="btn-ghost text-xs">{t('item.remove')}</button>
    </div>
  </div>
</li>
```

### 8.4 Checkout steps

```tsx
<ol className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
  {steps.map((step, i) => (
    <li key={step.id} className="flex items-center gap-2">
      <span className={`grid h-6 w-6 place-items-center rounded-full ${i <= active ? 'bg-[var(--color-ink)] text-white' : 'bg-[var(--color-surface-2)]'}`}>
        {i + 1}
      </span>
      <span className={i === active ? 'text-[var(--color-ink)]' : ''}>{t(`steps.${step.id}`)}</span>
      {i < steps.length - 1 && (
        <ChevronEnd className="h-3 w-3 mx-1 flip-on-rtl text-[var(--color-line-strong)]" />
      )}
    </li>
  ))}
</ol>
```

`ChevronEnd` is a `>`-shaped icon. `flip-on-rtl` mirrors it to point in the logical end direction.

### 8.5 Form input

```tsx
<div>
  <label htmlFor="email" className="block text-sm font-medium">
    {t('contact.email')} <span className="text-[var(--color-accent)]">•</span>
  </label>
  <input
    id="email"
    type="email"
    autoComplete="email"
    inputMode="email"
    dir="ltr"          {/* email is always LTR even in Arabic UI */}
    aria-invalid={hasError || undefined}
    aria-describedby={hasError ? 'email-error' : undefined}
    className="input mt-2"
  />
  {hasError && (
    <p id="email-error" className="mt-1 text-xs text-[var(--color-danger)]">
      {tErrors('validation.email')}
    </p>
  )}
</div>
```

Notice the `dir="ltr"` override on the email input — emails are intrinsically LTR; forcing LTR keeps the cursor and caret behaving correctly inside an Arabic page.

### 8.6 Error message

```tsx
<div role="alert" className="rounded-sm border border-[var(--color-danger)]/40 bg-[var(--color-danger-soft)] p-3 text-sm text-[var(--color-danger)]">
  <p className="font-medium">{tErrors('form.title')}</p>
  <p className="mt-1 text-[var(--color-ink-soft)]">{tErrors('form.subtitle')}</p>
</div>
```

### 8.7 Toast

```tsx
<div
  role="status"
  aria-live="polite"
  className="fixed bottom-6 start-6 max-w-sm rounded-md bg-[var(--color-ink)] text-white px-4 py-3 shadow-md"
>
  {tSuccess('addedToCart')}
</div>
```

`start-6` positions the toast at the right in Arabic, left in English.

### 8.8 Breadcrumb

```tsx
<nav aria-label={t('breadcrumb')} className="text-sm text-[var(--color-ink-muted)]">
  <ol className="flex items-center gap-2">
    {items.map((item, i) => (
      <li key={item.href} className="flex items-center gap-2">
        {i > 0 && <span aria-hidden className="flip-on-rtl">›</span>}
        {i === items.length - 1 ? (
          <span aria-current="page" className="text-[var(--color-ink)]">{item.label}</span>
        ) : (
          <Link href={item.href}>{item.label}</Link>
        )}
      </li>
    ))}
  </ol>
</nav>
```

### 8.9 Pagination

```tsx
<nav aria-label={t('pagination')} className="flex items-center justify-between gap-3 text-sm">
  <button disabled={page === 1} className="btn-ghost">
    <ArrowEnd className="h-4 w-4 flip-on-rtl" />
    {t('actions.previous')}
  </button>
  <ol className="flex items-center gap-1">
    {pages.map((p) => (
      <li key={p}>
        <button aria-current={p === page ? 'page' : undefined} className={p === page ? 'underline underline-offset-4' : ''}>{p}</button>
      </li>
    ))}
  </ol>
  <button disabled={page === total} className="btn-ghost">
    {t('actions.next')}
    <ArrowStart className="h-4 w-4 flip-on-rtl" />
  </button>
</nav>
```

### 8.10 Dropdown

```tsx
<div className="relative">
  <button className="inline-flex items-center gap-2 text-sm">
    {selectedLabel}
    <ChevronDown className="h-4 w-4" />
  </button>
  <ul className="absolute z-20 mt-2 end-0 min-w-[14rem] rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] shadow-md">
    {/* `end-0` aligns the menu to the logical end (right in LTR, left in RTL) */}
    {options.map((opt) => (
      <li key={opt.value}>
        <button className="w-full text-start ps-4 pe-3 py-2 hover:bg-[var(--color-surface-2)]">
          {opt.label}
        </button>
      </li>
    ))}
  </ul>
</div>
```

### 8.11 SAR price display

```tsx
import { formatPriceParts } from '@/lib/formatters';

function Price({ amount, locale, compareAt }: { amount: number; locale: 'ar' | 'en'; compareAt?: number }) {
  const { value, currency } = formatPriceParts(amount, locale);
  return (
    <span className="inline-flex items-baseline gap-1 tabular-nums">
      {compareAt != null && (
        <span className="text-[var(--color-ink-muted)] line-through me-2">
          {formatPriceParts(compareAt, locale).value}
        </span>
      )}
      <span className="font-medium">{value}</span>
      <span className="text-xs text-[var(--color-ink-muted)]">{currency}</span>
    </span>
  );
}
```

This renders `250.00 ر.س` in Arabic and `SAR 250.00` in English. The number always reads left-to-right thanks to `tabular-nums` and our `-u-nu-latn` locale tag.

### 8.12 Star rating

```tsx
<div className="inline-flex items-center gap-0.5" aria-label={t('product.rating')}>
  {[1,2,3,4,5].map((i) => (
    <Star key={i} filled={i <= Math.round(rating)} className="h-4 w-4" aria-hidden />
  ))}
  <span className="ms-2 text-xs text-[var(--color-ink-muted)] tabular-nums">
    {rating.toFixed(1)} · {t('product.labels.reviewsCount', { count })}
  </span>
</div>
```

Stars are mirror-symmetric — they don't get `flip-on-rtl`.

### 8.13 Back arrow button

```tsx
<button onClick={() => router.back()} className="btn-ghost">
  <ArrowEnd className="h-4 w-4 flip-on-rtl" aria-hidden />
  {t('actions.back')}
</button>
```

The arrow icon points in the page's reading direction's "back" — left in LTR, right in RTL — via `flip-on-rtl`.

### 8.14 Search input

```tsx
<form role="search" className="relative">
  <label htmlFor="q" className="sr-only">{t('utility.search')}</label>
  <SearchIcon className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-[var(--color-ink-muted)]" aria-hidden />
  <input
    id="q"
    name="q"
    type="search"
    enterKeyHint="search"
    placeholder={t('utility.searchPlaceholder')}
    className="input ps-9 pe-3"
    aria-controls="search-suggestions"
  />
</form>
```

`start-3` and `ps-9` (logical) place the magnifier on the logical start side in either direction.

---

## 9. Bilingual database design

Three strategies to store bilingual content. We evaluate, then recommend.

### Strategy A — Separate columns (`name_ar`, `name_en`, ...)

```prisma
model Product {
  id          String  @id @default(uuid())
  slug        String  @unique
  nameAr      String
  nameEn      String
  descAr      String?
  descEn      String?
  status      String
  createdAt   DateTime @default(now())
}
```

- **Pros**: simple to query, easy to index per language, type-safe in Prisma.
- **Cons**: schema grows linearly with each new locale. Every translatable field has to be added in two places. Adding a third language means a migration on every product table.
- **Best for**: small, static fields that will *never* need additional locales (e.g. status enums you've manually localized).

### Strategy B — JSON column (`name jsonb`)

```prisma
model Product {
  id          String  @id @default(uuid())
  slug        String  @unique
  name        Json
  description Json?
  status      String
  createdAt   DateTime @default(now())
}
```

Where `name` is `{ "ar": "بنطال كتّان", "en": "Linen trouser" }`.

- **Pros**: one column per translatable field regardless of how many locales. Backfill-friendly. Adding a third locale is a backfill, not a migration. Works well with our existing `messages/*.json` shape.
- **Cons**: queries on a single locale need `name->>'ar'`. Indexing requires expression indexes per locale. ORMs need extra type help.

### Strategy C — Translation table (`product_translations`)

```prisma
model Product {
  id           String                @id @default(uuid())
  slug         String                @unique
  status       String
  createdAt    DateTime              @default(now())
  translations ProductTranslation[]
}

model ProductTranslation {
  id          String  @id @default(uuid())
  productId   String
  locale      String  @db.VarChar(5)
  name        String
  description String?

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([productId, locale])
  @@index([locale])
}
```

- **Pros**: classic CMS pattern; scales to many locales; partial translations are easy.
- **Cons**: every read joins a second table; harder to enforce "both languages required to publish" at the DB level; more code for every query.

### Recommendation for ElaraBase

**Strategy B (JSONB)** for `products`, `categories`, `collections`, `notifications.title/body`, `seo_meta`. Reasons:

1. Catalog is small-to-medium (≤ ~5k SKUs) — JSONB performance is fine.
2. Workflow is admin-driven with **both languages required before publish**; the DB-level check is a one-liner per column.
3. Adding Khaleeji dialect or another locale later is a backfill, not a schema migration.
4. Mirrors our `messages/*.json` shape, which keeps mental models consistent.

Add a database-level constraint to keep the JSON honest:

```sql
ALTER TABLE products
  ADD CONSTRAINT product_name_bilingual_chk
  CHECK (jsonb_typeof(name->'ar') = 'string'
     AND jsonb_typeof(name->'en') = 'string'
     AND length(name->>'ar') > 0
     AND length(name->>'en') > 0);
```

Index per locale where needed:

```sql
CREATE INDEX products_name_ar_trgm ON products USING gin ((name->>'ar') gin_trgm_ops);
CREATE INDEX products_name_en_trgm ON products USING gin ((name->>'en') gin_trgm_ops);
```

For *non-content* localized strings (like product status display, shipping method names admin types in once), still use the JSON shape so the front end has a single way to read translations.

For very long-form CMS bodies that need per-locale revisions, escalate to **Strategy C** in a later phase — but in MVP, JSONB is the right trade.

---

## 10. Bilingual admin

### Side-by-side editor

Admin product / category / collection forms render Arabic and English in two columns side by side. Pattern:

```tsx
<div className="grid gap-6 md:grid-cols-2">
  <Field name="nameAr" label="الاسم (العربية)" lang="ar" dir="rtl" required />
  <Field name="nameEn" label="Name (English)" lang="en" dir="ltr" required />
</div>
```

- Each `Field` sets its own `lang` and `dir` so the input behaves correctly *regardless* of the admin's interface language.
- The admin can be using the English UI but still type Arabic into the Arabic input — the input is locked LTR/RTL by its own attribute.
- Field-level validators check both columns are non-empty before `Publish` enables.

### Validate both languages filled

Server-side schema (Zod):

```ts
const Bilingual = z.object({
  ar: z.string().min(1, 'required'),
  en: z.string().min(1, 'required')
});

const ProductInput = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: Bilingual,
  description: Bilingual,
  // ...
});
```

UI-side, the "Publish" button is disabled until both languages pass min-length on every required field. The "Save draft" button is always enabled — drafts can be incomplete.

### Preview per language without switching admin locale

The product editor has a preview pane (top-right) with two tabs: **AR preview** / **EN preview**. Each tab renders the storefront PDP layout using the row currently being edited, in the corresponding locale and direction — without changing the admin's own language.

Implementation:

```tsx
<PreviewPane>
  <Tabs defaultValue="ar">
    <Tab value="ar">
      <PreviewFrame locale="ar" dir="rtl" data={form.values} />
    </Tab>
    <Tab value="en">
      <PreviewFrame locale="en" dir="ltr" data={form.values} />
    </Tab>
  </Tabs>
</PreviewPane>
```

`<PreviewFrame>` is a server component rendered inside an iframe so its `dir`/`lang` are isolated from the admin chrome.

---

## 11. Bilingual SEO

### URL structure
- `/ar/shop` and `/en/shop`. Default locale: `ar`.
- Localized slugs per route, defined in `src/i18n/routing.ts`.

### Hreflang implementation

In `app/[locale]/layout.tsx`, the `generateMetadata` returns:

```ts
alternates: {
  canonical: `${SITE_URL}/${locale}`,
  languages: {
    ar: `${SITE_URL}/ar`,
    en: `${SITE_URL}/en`,
    'x-default': `${SITE_URL}/${routing.defaultLocale}`
  }
}
```

For dynamic pages (PDPs, categories), each page's `generateMetadata` builds language alternates using the per-locale slug from the DB:

```ts
alternates: {
  canonical: `${SITE_URL}/${locale}/products/${product.slug[locale]}`,
  languages: {
    ar: `${SITE_URL}/ar/منتج/${product.slug.ar}`,
    en: `${SITE_URL}/en/products/${product.slug.en}`,
    'x-default': `${SITE_URL}/ar/منتج/${product.slug.ar}`
  }
}
```

### Separate meta per locale
Each route generates title + description in the active locale via `getTranslations({ locale, namespace: 'seo' })`. The `seo.titleTemplate` in each JSON ensures brand suffix is locale-natural.

### Sitemap
`/sitemap.xml` (built from `app/sitemap.ts`) emits one URL per page per locale, with `xhtml:link` alternates per the [Google specification](https://developers.google.com/search/docs/specialty/international/localized-versions):

```xml
<url>
  <loc>https://elarabase.com/en/products/linen-trouser</loc>
  <xhtml:link rel="alternate" hreflang="ar" href="https://elarabase.com/ar/%D9%85%D9%86%D8%AA%D8%AC/bnt-ktn"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://elarabase.com/en/products/linen-trouser"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://elarabase.com/ar/%D9%85%D9%86%D8%AA%D8%AC/bnt-ktn"/>
</url>
```

### JSON-LD structured data
Per-locale `Product` JSON-LD on PDPs:

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name[locale],
  description: product.description[locale],
  brand: { '@type': 'Brand', name: 'ElaraBase' },
  image: product.images.map(i => i.url),
  sku: product.sku,
  inLanguage: locale === 'ar' ? 'ar-SA' : 'en-SA',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'SAR',
    price: (product.priceCents / 100).toFixed(2),
    availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    url: `${SITE_URL}/${locale}/products/${product.slug[locale]}`
  }
};
```

Inject via `<script type="application/ld+json">` in the page server component.

---

## 12. Currency and number formatting

### SAR rendering
- **Arabic**: `250.00 ر.س` — produced by `Intl.NumberFormat('ar-SA-u-nu-latn', { style: 'currency', currency: 'SAR', currencyDisplay: 'narrowSymbol' })`.
- **English**: `SAR 250.00` — `Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', currencyDisplay: 'narrowSymbol' })`.

### Digits — Western vs Arabic-Indic
We use **Western digits (0–9)** in both locales. Reasoning:

1. **Localized digit usage in Saudi ecommerce is divided**, but every major Saudi platform (Noon, Salla, Amazon.sa, IKEA SA) renders prices and IDs in Western digits, including in their Arabic UI. Customer expectation is overwhelmingly Western digits for money.
2. **Mixed strings** (e.g. an order number inside an Arabic paragraph) read more cleanly with Western digits — the eye doesn't switch numeral systems mid-sentence.
3. **OCR, copy-paste, accessibility, and price comparison tools** all assume Western digits.
4. **Phone keyboards** default to Western digit pads even on Arabic keyboards.

We force this via the BCP-47 Unicode extension `-u-nu-latn` on the Arabic locale. See `src/lib/formatters.ts`:

```ts
const ARABIC_BCP47 = 'ar-SA-u-nu-latn';
```

If, later, you decide to render Arabic-Indic digits for *long-form editorial* content only (e.g. "صدر في عام ٢٠٢٦"), do it at the content layer, never in prices.

### Complete utility functions
See `src/lib/formatters.ts`. Surface:

| Function                                | Purpose                                                          |
|-----------------------------------------|------------------------------------------------------------------|
| `formatPrice(amount, locale, options?)` | SAR currency string.                                             |
| `formatPriceParts(amount, locale)`      | `{ value, currency, raw }` for styled price components.          |
| `formatNumber(value, locale)`           | Generic number, locale-aware grouping.                           |
| `formatInteger(value, locale)`          | Whole numbers (qty, counts).                                     |
| `formatPercent(ratio, locale, digits?)` | `25%`. Default 0 fraction digits.                                |
| `formatDate(date, locale, style?)`      | `12 May 2026` / `12 مايو 2026`.                                  |
| `formatDateTime(date, locale)`          | Combined date + time.                                            |
| `formatRelativeTime(date, locale, now?)`| "3 days ago" / "منذ ٣ أيام" — uses `Intl.RelativeTimeFormat`.     |
| `formatSaudiPhone(raw, locale)`         | `+966 5X XXX XXXX`, wrapped in LRM in Arabic paragraphs.         |
| `formatOrderNumber(seq, createdAt?)`    | `ELB-YYMM-XXXXXX`, wrapped in LRM.                               |
| `formatList(items, locale, type?)`      | Locale-aware "and/or" lists.                                     |
| `selectPlural(count, locale)`           | Picks an `Intl.LDMLPluralRule` — supports Arabic's 6 categories. |

Why these matter for Arabic specifically:
- Arabic has **six plural forms** (zero, one, two, few, many, other). Never hardcode "X items" → use ICU MessageFormat through `next-intl`'s `t()` with `{count}` and message-side `{count, plural, ...}` selectors.
- **LRM marks** prevent the leading `+` of phone numbers and the `-` in IDs from flipping into the wrong position when surrounded by Arabic text.

---

## 13. Middleware

See `src/middleware.ts`. Behavior:

1. **Detects `Accept-Language`** via `next-intl`'s `createMiddleware`. With no cookie present:
   - If the browser strongly prefers `en`, redirect to `/en`.
   - Otherwise fall back to `ar` (our default).
2. **Persists the choice** in `NEXT_LOCALE` cookie with hardened attributes:
   - `Path=/`, `Max-Age=31536000`, `SameSite=Lax`, `Secure` in production, `HttpOnly=false` (the switcher reads it client-side).
3. **Adds debug headers** `x-pathname` and `x-locale` for downstream RSC components.
4. **Does NOT** route `/api/*`, `/_next/*`, `/_vercel/*`, or static assets — the `matcher` excludes them so middleware never intercepts API calls or images.

The matcher pattern is intentionally **permissive** for HTML routes and **restrictive** for assets:

```ts
matcher: [
  '/((?!api|_next|_vercel|trpc|.*\\..*).*)',
  '/'
]
```

Common pitfalls this avoids:
- Re-routing `favicon.ico` (would 404 or loop).
- Re-routing `*.webmanifest`, `*.xml`, `*.txt` (the `\\..*` exclusion).
- Re-routing `/api/webhooks/payments/moyasar` and breaking provider callbacks.

---

## 14. Bilingual QA checklist

### 30+ items
1. [ ] Homepage renders in Arabic by default with `dir="rtl"` on `<html>`.
2. [ ] Switching to English does not full-reload; URL changes to `/en/...`.
3. [ ] Browser back button does not bounce locale (we used `router.replace`).
4. [ ] No FOUC: the initial HTML response has the correct `lang`, `dir`, and font.
5. [ ] Refreshing on `/ar/...` preserves Arabic; refreshing on `/en/...` preserves English.
6. [ ] Hard reload with `Accept-Language: ar-SA,en-US;q=0.5` lands on `/ar`.
7. [ ] Hard reload with `Accept-Language: en-US,ar-SA;q=0.5` and no cookie lands on `/en`.
8. [ ] `NEXT_LOCALE` cookie is set with `Max-Age=31536000`, `SameSite=Lax`, `Secure` in prod.
9. [ ] All product pages have hreflang `ar`, `en`, `x-default`.
10. [ ] Sitemap contains both locale versions for every page.
11. [ ] `next/image` `alt` text exists and is localized.
12. [ ] No physical Tailwind utilities (`pl-/pr-/ml-/mr-/left-/right-`) in the codebase.
13. [ ] Chevrons and back arrows mirror in Arabic via `flip-on-rtl`.
14. [ ] Brand wordmark, payment logos, and ID numbers do **not** mirror.
15. [ ] Form inputs of intrinsically-LTR data (email, phone, card #) have `dir="ltr"` even in Arabic.
16. [ ] Mobile drawer opens from the start side in both locales.
17. [ ] Side cart enters from the start side; close button is at the logical end.
18. [ ] Pagination "Next" arrow points to the logical end direction in both locales.
19. [ ] Prices render `250.00 ر.س` in Arabic and `SAR 250.00` in English.
20. [ ] All numbers use Western digits (0–9) in both locales.
21. [ ] Dates render with locale-appropriate month names (`12 May 2026` vs `12 مايو 2026`).
22. [ ] Phone numbers stay LTR inside Arabic paragraphs (LRM-wrapped).
23. [ ] Order numbers (`ELB-YYMM-XXXXXX`) stay LTR inside Arabic paragraphs.
24. [ ] Plural-sensitive strings (item count, review count) use ICU MessageFormat — not concatenation.
25. [ ] Validation error messages exist in both languages and match the same keys.
26. [ ] Checkout step indicator reads in the correct direction; "next step" chevron mirrors.
27. [ ] Admin product editor: Publish button stays disabled until both AR and EN are non-empty.
28. [ ] Admin preview tab renders the storefront layout in the chosen locale without changing admin UI language.
29. [ ] Search input placeholder is localized; search results page is locale-prefixed.
30. [ ] 404 page renders in the user's locale with the correct direction.
31. [ ] 500 error page renders bilingually (fallback dual-language) when locale resolution fails.
32. [ ] Email templates (verification, order confirmation) exist per locale.
33. [ ] OG images per locale.
34. [ ] LCP < 2.0s on a real mobile device in Arabic.
35. [ ] CLS < 0.05 on the homepage during font swap.

### Top 10 RTL bugs developers miss
1. **Physical paddings/margins.** `pl-4` looks fine in English but blows up in Arabic. Use logical utilities everywhere.
2. **Icons that should flip aren't flipping.** Chevrons, back arrows, sliders need `flip-on-rtl`. Verify by toggling the locale switcher.
3. **Icons that shouldn't flip ARE flipping.** Brand mark, payment logos, profile avatars. Don't blanket-flip all icons.
4. **Hardcoded "Right" / "Left" copy.** "Click the arrow on the right" makes no sense after mirroring. Use "next" / "previous" in copy.
5. **`text-left` instead of `text-start`.** Long-form editorial paragraphs end up left-aligned in Arabic, which looks like a bug.
6. **Forms with `dir` inherited from the page.** Email/phone fields type backwards in Arabic. Force `dir="ltr"` on intrinsically-LTR fields.
7. **Mixed bidi text without LRM.** An order number `ELB-2605-000123` inside Arabic looks like `123-000-2605-ELB` because the `-` flips. Wrap with `\u200E`.
8. **Animations that always slide from the right.** A toast hardcoded to enter from the right looks wrong in Arabic; slide from the *start*.
9. **Slider with logical start at index 0.** Carousel "previous" maps to the start direction; in RTL that means slide right-to-left.
10. **Hydration mismatch from client-side `dir` flips.** Set `dir` server-side on `<html>` only; never via `useEffect`.

---

## 15. Build order

Recommended sequence for implementing bilingual from day 1:

1. **Decide locale strategy first** — `localePrefix: 'always'`, default `ar`, supported `ar/en`. Lock this in `src/i18n/routing.ts` before any feature work.
2. **Wire next-intl** — `next.config.ts` plugin, `request.ts`, `middleware.ts`, `[locale]/layout.tsx`. Get a placeholder home page rendering in both languages.
3. **Lock down direction** — verify no client-side direction switching anywhere. Add the eslint rule against physical utilities.
4. **Add font loading** — `src/lib/fonts.ts`, preload, fallback stacks. Verify no CLS on font swap.
5. **Build the design tokens + globals.css** — locale-aware font families, base typography, hairlines.
6. **Translation files skeleton** — `messages/ar.json` and `messages/en.json` with all namespaces present, even if values are placeholders. Adding new keys later is cheap; restructuring isn't.
7. **Language switcher** — verify it preserves URLs, doesn't push history, doesn't full-reload.
8. **Formatting utilities** — `src/lib/formatters.ts`. Use them everywhere a number/date/price is rendered. Forbid raw `Intl.*` calls in components.
9. **Primitive components** — header, footer, product card, cart row, form input. Build these once with logical utilities; every later component inherits the pattern.
10. **Page templates** — home, shop, PDP, cart, checkout, account, admin shell. Use the primitives.
11. **SEO layer** — `generateMetadata` per page, hreflang, sitemap.
12. **QA pass per locale** — run the checklist above. Real device testing in Arabic on iPhone (Safari) and a Galaxy A-series.
13. **Then start integrating data** — Prisma, payments, fulfillment, admin CRUD.

The principle: get bilingual *infrastructure* and *primitives* right before any business feature is implemented. Retrofitting RTL onto a 50-page LTR-first app is brutal; doing it upfront is invisible to the rest of the team.

---

## Appendix — File index for the 10 deliverables

| # | Deliverable                            | Path                                            |
|---|----------------------------------------|-------------------------------------------------|
| 1 | Arabic messages (all namespaces)       | `messages/ar.json`                              |
| 2 | English messages (all namespaces)      | `messages/en.json`                              |
| 3 | next-intl routing                      | `src/i18n/routing.ts`                           |
| 4 | next-intl request config               | `src/i18n/request.ts`                           |
| 5 | Middleware                             | `src/middleware.ts`                             |
| 6 | Font loader                            | `src/lib/fonts.ts`                              |
| 7 | Locale-aware root layout               | `src/app/[locale]/layout.tsx`                   |
| 8 | Language switcher                      | `src/components/LanguageSwitcher.tsx`           |
| 9 | Direction hook                         | `src/hooks/useDirection.ts`                     |
| 10| Formatters (SAR, dates, numbers, etc.) | `src/lib/formatters.ts`                         |

Supporting files shipped alongside:
- `global.d.ts` — typed messages for `next-intl`.
- `next.config.ts` — `createNextIntlPlugin('./src/i18n/request.ts')`.
- `tailwind.config.ts` + `src/styles/globals.css` — design tokens + locale-aware typography.
- `src/app/[locale]/page.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/not-found.tsx` — minimal pages so the project boots end-to-end.
- `package.json`, `tsconfig.json`, `postcss.config.mjs`, `.env.example`, `.gitignore`.
