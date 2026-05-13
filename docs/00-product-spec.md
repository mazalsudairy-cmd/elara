# ElaraBase — Product, UX & Architecture Specification

> Single source of truth for the rebuild. Hand this document to design,
> frontend, backend, and ops; every later doc inherits from it.
>
> **Brand**: ElaraBase &nbsp;|&nbsp; **Market**: Saudi Arabia first, GCC next
> &nbsp;|&nbsp; **Locales**: Arabic (primary, RTL), English (secondary, LTR)
> &nbsp;|&nbsp; **Currency**: SAR (VAT 15%)

---

## 1. Brand strategy

### 1.1 Brand personality
- **Quiet, not loud.** ElaraBase speaks like a confident maître d', not a megaphone.
- **Composed.** Decisions feel pre-considered: copy, photo, layout — nothing is improvised.
- **Tactile.** The brand obsesses over material, weight, finish, the way light falls on a fabric.
- **Trustworthy without being corporate.** Warm enough to feel human, exact enough to feel professional.
- **Bilingual-native.** Arabic and English share the same restraint; neither feels translated.

### 1.2 Tone of voice
- Short sentences. Full stops. No emoji.
- Speaks to *one* customer, not "you all".
- Names materials before benefits ("Brushed Egyptian cotton" before "soft to touch").
- Avoids exclamation marks, ALL-CAPS, and adverbs ("really", "very", "totally").
- Arabic copy is in clean Modern Standard Arabic with Gulf-natural phrasing (`سلة التسوق`, `تسجيل الدخول`, `إتمام الشراء`). No transliteration of English brand jargon.
- English copy reads as if written, not auto-localized. No "shop our amazing collection".

### 1.3 Customer perception goal
After 90 seconds on the site, a first-time visitor should think, in this order:
1. *"This brand has taste."*
2. *"This feels well-built — not a template."*
3. *"I trust this checkout."*
4. *"I want to come back to read more, even if I don't buy today."*

### 1.4 Emotional direction
Calm. Slightly elevated. A little aspirational — never intimidating. The site should feel like walking into a small concept store with hardwood floors at 11am on a Tuesday: bright, quiet, no music, no salesperson hovering.

### 1.5 What makes ElaraBase feel different
- **Restraint as a feature.** One accent color, one type family per locale, real spacing.
- **Editorial pace.** Hero → category curation → one piece in focus → reassurance. Not a Black-Friday wall.
- **Arabic that is first-class.** Not a mirrored English site — a real Arabic typographic system, with Arabic numerals where culturally expected (in body copy) and Western digits where they perform better (prices, OTP, IDs).
- **Honest trust signals.** Concrete shipping windows, named return policy, a real "ships from Riyadh" label — not vague reassurance badges.
- **No dark patterns.** No fake timers, no "27 people are viewing this", no auto-added insurance.

### 1.6 Positioning statement
> For Saudi customers who care how things are made, ElaraBase is a curated bilingual storefront that treats every piece — and every detail of the experience — as if it will be kept.

### 1.7 Visual identity direction
- **Mood**: warm bone backgrounds, deep ink text, generous whitespace, photography over illustration, hairline borders instead of card shadows.
- **Photography**: even daylight, neutral surfaces, single hero piece per shot. Avoid lifestyle clutter; avoid stock-looking models. Use product-on-surface and product-in-hand variants.
- **Motion**: minimal. 150–250 ms ease-out transitions. No parallax, no scroll-jacking.
- **No-no list**: purple/blue AI gradients, glass-morphism, neon glows, full-bleed video heroes with looped music, "Get started" SaaS hero, three-column "Why choose us" sections, badge mountains.

### 1.8 Recommended color logic
| Role                    | Token                         | Hex        | Use                                                                 |
|-------------------------|-------------------------------|------------|---------------------------------------------------------------------|
| Canvas (page bg)        | `--color-canvas`              | `#FAF8F4`  | Default background — warm bone, never pure white                    |
| Surface (cards)         | `--color-surface`             | `#FFFFFF`  | Product cards, sheets, modals                                       |
| Surface 2 (alt rows)    | `--color-surface-2`           | `#F2EDE4`  | Hover rows, alt sections                                            |
| Ink (primary text)      | `--color-ink`                 | `#0F0E0C`  | Body, headings                                                      |
| Ink soft                | `--color-ink-soft`            | `#2A2724`  | Secondary text, captions on dark areas                              |
| Ink muted               | `--color-ink-muted`           | `#6B655E`  | Tertiary captions, placeholder text                                 |
| Hairline                | `--color-line`                | `#E7E2DA`  | 1px dividers                                                        |
| Hairline strong         | `--color-line-strong`         | `#D6CFC3`  | Inputs, table borders                                               |
| **Accent (only one)**   | `--color-accent`              | `#8C6A3A`  | Restrained bronze — links, focus rings, eyebrow text, badges        |
| Accent strong           | `--color-accent-strong`       | `#6F5128`  | Hover for accent CTA                                                |
| Accent soft             | `--color-accent-soft`         | `#EFE5D3`  | Subtle tint behind selected chips                                   |
| Success / Warning / Danger / Info | semantic tokens     | low-chroma | Form states, order status — never decorative                        |

**Rules**
- One accent only. Bronze. Never a second color.
- Status colors are low-chroma; they only appear inside status pills, validation rows, and toasts.
- No gradients in primary surfaces. A single very subtle 5% vertical gradient is acceptable in the hero, optional.

### 1.9 Recommended typography pairing
| Locale | Body / UI                 | Display headings           | Fallback                       |
|--------|---------------------------|----------------------------|--------------------------------|
| Arabic | **IBM Plex Sans Arabic** (400/500/600/700) | IBM Plex Sans Arabic 600 (display = same family, tighter line-height) | Noto Naskh Arabic → Segoe UI Arabic → Tahoma |
| English| **Satoshi** variable (300–900) | Satoshi 600              | Inter → system-ui              |

- Never use stretched/condensed weights.
- Arabic line-height = 1.7 body, 1.25 headings (Arabic glyphs need room).
- English line-height = 1.5 body, 1.1 display.
- Numerals: Western digits site-wide for prices, totals, order IDs, phone, OTP. Force this with the BCP-47 tag `ar-SA-u-nu-latn` (see `src/lib/formatters.ts`).

### 1.10 Logo direction ideas
ElaraBase's mark should be:
- **Wordmark-first.** "ELARA" set in a custom-spaced display cut; "BASE" smaller, in tracking, sitting below or beside.
- **Bilingual lockup.** A second lockup pairs "ELARA" with "إلارا" in Arabic with matching x-height. Both lockups must coexist for split-language touchpoints (invoices, emails).
- **Three concepts to test**
  1. *Quiet serif.* Slightly contrasted serif, very tight letterspacing, near-flush to baseline. Reads like a small gallery.
  2. *Engraved sans.* Modern sans with a single tiny serif-like incised cut on the "E" — a near-invisible craft cue.
  3. *Bilingual ligature.* Latin "ELARA" and Arabic "إلارا" share a single underline rule that ties them visually; works as a horizontal lockup in English contexts, vertical in Arabic.
- **Monogram.** A compact "E" mark for favicon and app icon — geometric, no flourish.
- **What to avoid.** Crowns, leaves, scripts, gradient marks, generic luxury serifs (Didot, Bodoni straight from Adobe), and any AI-suggested "Le ___" lockup.

---

## 2. Design system

### 2.1 Color roles
See §1.8. Every component references the tokens above — never raw hex.

### 2.2 Background / surface hierarchy
1. **Canvas** (`#FAF8F4`) — page level.
2. **Surface** (`#FFFFFF`) — content cards, modals, sticky bars.
3. **Surface 2** (`#F2EDE4`) — alt section background, hover row, table zebra.
4. **Inverse** (`#0F0E0C`) — navbar at scroll, footer, "ink" sections used sparingly for editorial pieces.

A page should not stack more than 3 surfaces visually. If you find yourself needing a 4th, restructure.

### 2.3 Text hierarchy
| Style          | Size                | Weight | Use                                  |
|----------------|---------------------|--------|--------------------------------------|
| Display XL     | clamp(2.5rem,6vw,4.25rem) | 600 | Homepage hero, About hero            |
| Display L      | 3rem (48px)         | 600    | Section headers on landing pages     |
| H1             | 2.25rem (36px)      | 600    | Product names, page titles           |
| H2             | 1.875rem (30px)     | 600    | Sub-sections                         |
| H3             | 1.5rem (24px)       | 600    | Card titles, dialog titles           |
| H4             | 1.25rem (20px)      | 500    | Filter group titles                  |
| Body L         | 1.125rem (18px)     | 400    | Hero subtitle, editorial             |
| Body           | 1rem (16px)         | 400    | Default                              |
| Body S         | 0.875rem (14px)     | 400    | Captions, helper text                |
| Eyebrow        | 0.75rem (12px), tracking 0.18em, uppercase | 500 | Above hero headings, section eyebrows |
| Mono / numbers | tabular-nums        | 500    | Prices, totals                       |

### 2.4 Spacing scale
Tailwind v4 default (`--spacing: 0.25rem`). We use this scale everywhere:
`0, 1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96), 32 (128)`.

**Rhythm rules**
- Section vertical padding: `py-16 md:py-24`.
- Card internal padding: `p-5 md:p-6`.
- Form field gap: `space-y-4`.
- Inline icon-to-text gap: `gap-2`.
- Never use arbitrary px values inside components. If you need a non-scale value, justify it in code review.

### 2.5 Border radius logic
| Token            | Value | Use                                       |
|------------------|-------|-------------------------------------------|
| `--radius-xs`    | 2px   | Hairline tags, badges                     |
| `--radius-sm`    | 4px   | Buttons, inputs, primary CTA              |
| `--radius-md`    | 8px   | Cards, dropdowns                          |
| `--radius-lg`    | 12px  | Modals on desktop                         |
| `--radius-xl`    | 16px  | Bottom sheets on mobile                   |
| `--radius-2xl`   | 24px  | Hero media frames (used sparingly)        |
| `--radius-full`  | 9999  | Pills, avatar                             |

Premium rule: prefer smaller radii. Anything ≥16px feels app-like and softens the brand.

### 2.6 Shadow logic
- Default: **no shadow**. Premium ecommerce uses hairlines.
- `shadow-sm` only for sticky elements (sticky header at scroll, sticky add-to-cart bar on mobile).
- `shadow-md` only for floating menus and dropdowns.
- `shadow-lg` only for modals.
- No glow shadows. No colored shadows.

### 2.7 Card styles
- **Product card**: 1:1 image (4:5 on mobile), no background fill, hairline only on hover, name on line 2 with tabular price below. No "Add to cart" button on the card by default — the card opens the PDP. On mobile, a long-press "Quick add" sheet is acceptable later (Phase 2).
- **Editorial card**: full-bleed photo, eyebrow + title overlaid bottom-left with a 60% scrim gradient (the only acceptable gradient).
- **Order card** (in account): hairline border, status pill top-right, items thumbnails left, totals right; collapses to stacked on mobile.

### 2.8 Buttons
| Variant       | Height | Style                                                                                  | Use                                    |
|---------------|--------|----------------------------------------------------------------------------------------|----------------------------------------|
| Primary       | 48px   | `bg-ink text-surface`, radius-sm, weight 500, hover → `bg-ink-soft`                     | Place order, Sign in, primary CTA      |
| Secondary     | 48px   | 1px hairline-strong border, transparent bg, hover → border-ink + surface-2              | "Continue shopping", "Edit"            |
| Ghost         | 40px   | Text only with optional leading icon; underline on hover                                | Inline actions ("Apply", "Show more")  |
| Destructive   | 48px   | `bg-danger text-surface`                                                                | Delete account, cancel order (admin)   |
| Icon-only     | 40×40  | Square, radius-sm, transparent, hover → surface-2                                       | Wishlist heart, share                  |

**Touch targets**: all interactive elements ≥44×44 px on mobile.

### 2.9 Badges
- Pill shape, height 22 px, font 12 px, weight 500.
- Variants:
  - **Neutral** (default): surface-2 bg, ink text.
  - **Accent**: accent-soft bg, accent-strong text. Used for "New", "Editor's pick".
  - **Success/Warning/Danger**: low-chroma variants for status pills.
- Never combine more than 1 badge per product card.

### 2.10 Forms
- Inputs are 48 px tall, hairline-strong border, radius-sm, surface bg.
- Label sits **above** the input, weight 500, 14 px. Never inline-only "placeholder as label".
- Helper text sits below at 13 px, ink-muted color.
- Error state: border + ring in `--color-danger`, error message inline beneath, with an inline-start icon. `aria-invalid="true"`, `aria-describedby` pointing at the error.
- Required indication: a small "•" in `--color-accent` after the label, plus `aria-required`.
- Bilingual field pairs (admin): Arabic on the visual *start* side for both locales, English alongside; both required to publish.

### 2.11 Navigation
- **Desktop header**: 72 px tall, sticky-on-scroll-up only (not always sticky). Logo center on the home route, start-aligned everywhere else. Primary links at start, utility (search/account/wishlist/cart) at end. Language switcher in utility cluster.
- **Mobile header**: 56 px, logo center, hamburger at start, cart at end. Drawer opens from the start side.
- **Mega menu** (desktop): only on "Shop" — one column of categories, one column of collections, one editorial tile. No four-column dumps.
- **Breadcrumbs**: text-only, hairline separator. Don't show on the homepage.
- **Footer**: 4 columns desktop, accordion on mobile. VAT/CR/return policy links always visible (KSA compliance).

### 2.12 RTL / LTR behavior rules
- The HTML `dir` attribute is set authoritatively server-side in `app/[locale]/layout.tsx`. Never flip direction client-side.
- Use **logical Tailwind utilities only**: `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `text-start`, `text-end`, `rounded-s-`, `rounded-e-`, `border-s`, `border-e`.
- Icons that imply direction (chevron, arrow, back, forward) get a `flip-on-rtl` class — see globals.css.
- Brand marks, payment logos, ID numbers, and currency symbols do *not* flip.
- Bidirectional text inside Arabic paragraphs (e.g. order numbers, phone numbers) gets wrapped in LRM marks (`\u200E`) — see `formatOrderNumber`, `formatSaudiPhone`.
- Animations slide from the *logical* start to end. A mobile drawer always opens from the start side (right in Arabic, left in English).
- Form layouts: labels stay on top regardless of direction. Multi-column forms always stack mobile-first.

### 2.13 Dark mode policy
- **Phase 1**: light mode only. No half-built dark theme — premium brands ship light first.
- Token system already supports a `dark` variant (CSS custom-property swap). Add in Phase 4 once palette is validated against product photography.

### 2.14 Image treatment
- Aspect ratios standardized: **1:1** product card, **4:5** PDP gallery default, **3:2** editorial, **21:9** hero.
- Default `next/image` with `formats: ['avif','webp']`, lazy below the fold, eager only for above-the-fold hero.
- Photography color treatment: warm white balance, +2 contrast, no aggressive sharpening. Background must match the canvas family — no pure white cutouts dropped on `#FAF8F4`.
- Alt text rules in §14.

### 2.15 Product grid behavior
- Mobile: 2 columns, 4 px gutter (premium tight grid).
- Tablet: 3 columns, 12 px gutter.
- Desktop: 4 columns, 16 px gutter; 5 columns on `>=1440px` only for "Shop all".
- Card hover (desktop): swap to second image with a 200 ms cross-fade. No zoom, no shadow.
- Infinite scroll is forbidden in Phase 1 — use load-more or pagination so users can return to a position. Better for analytics and accessibility.

### 2.16 Trust elements
- Free shipping / 14-day returns / Arabic support / Secure checkout — surfaced as a *single* row in three places: homepage, cart, checkout footer. Same row, same icons, same copy. Do not invent new variants.
- Payment logos (mada, Visa, Mastercard, Apple Pay) appear once in the footer and once at checkout.
- "Ships from Riyadh, KSA" appears on the PDP under shipping info.

---

## 3. Full sitemap

### A. Public store

```
/
├── /shop                                  → all products, filters + sort
│   ├── /shop?category=…                   → category filter view (query-driven)
│   ├── /categories/[slug]                 → SEO landing per category
│   ├── /collections/[slug]                → curated collection
│   ├── /new-arrivals
│   ├── /best-sellers
│   └── /search?q=…                        → search results
├── /products/[slug]                       → product detail
│   └── /products/[slug]/reviews           → all reviews for that product (canonicalised)
├── /wishlist                              → guest wishlist via localStorage; merged on login
├── /cart                                  → cart review
├── /checkout
│   ├── /checkout                          → 4-step flow (contact / shipping / payment / review)
│   └── /checkout/success                  → confirmation (token-guarded)
├── /orders/track                          → public tracking by order # + email
├── /about                                 → brand story, materials, founders
├── /contact                               → contact form + WhatsApp + email
├── /faq
├── /policies/shipping
├── /policies/returns
├── /policies/privacy
├── /policies/terms
└── /sitemap.xml, /robots.txt              → generated
```

### B. Customer account area

```
/account
├── /account                               → overview dashboard
├── /account/orders                        → list (filter by status)
│   └── /account/orders/[id]               → order detail (+ tracking events)
├── /account/addresses                     → list, add, edit, set default
├── /account/wishlist                      → saved products
├── /account/returns                       → list of return requests
│   └── /account/returns/[id]              → return request detail
├── /account/notifications                 → channel + topic preferences
├── /account/security                      → password, future 2FA placeholder
├── /account/sessions                      → active devices (placeholder Phase 1, fully wired Phase 2)
└── /account/profile                       → name, phone, language preference

Auth:
/auth/signup
/auth/login
/auth/forgot-password
/auth/reset-password?token=…
/auth/verify-email?token=…
/auth/otp (Phase 3 placeholder — route reserved but disabled in Phase 1)
```

### C. Admin dashboard

```
/admin
├── /admin                                 → overview KPIs
├── /admin/orders                          → list with filters/search
│   ├── /admin/orders/[id]                 → detail + actions
│   └── /admin/orders/[id]/fulfill         → step-by-step pack/ship workflow
├── /admin/products
│   ├── /admin/products/new
│   ├── /admin/products/[id]               → bilingual editor
│   └── /admin/products/[id]/variants      → variant matrix
├── /admin/categories
│   └── /admin/categories/[id]
├── /admin/collections
│   └── /admin/collections/[id]
├── /admin/inventory                       → stock adjustments + low-stock report
├── /admin/customers
│   └── /admin/customers/[id]              → 360° view: orders, addresses, notes, lifetime value
├── /admin/discounts
│   └── /admin/discounts/[id]
├── /admin/reviews                         → moderation queue
├── /admin/banners                         → homepage banners CRUD
├── /admin/homepage                        → drag-order sections shown on the storefront
├── /admin/settings
│   ├── /admin/settings/store              → name, VAT/CR, contact, currencies
│   ├── /admin/settings/shipping           → zones, methods, thresholds
│   ├── /admin/settings/tax                → VAT rules
│   ├── /admin/settings/payments           → providers, mada/COD toggles
│   └── /admin/settings/otp                → reserved placeholder for Phase 3
├── /admin/staff                           → users + role assignment
├── /admin/roles                           → roles + permissions
├── /admin/audit                           → audit trail viewer
└── /admin/emails                          → email templates per locale
```

---

## 4. Page-by-page wireframe specification

Format per page: **Order of sections (top → bottom) · what each contains · first impression · primary CTA · secondary CTA · trust signals · conversion objective · mobile behavior · empty/error/edge states.**

### 4.1 Homepage `/`

1. **Header** — logo, primary nav, search icon, language switch, account, wishlist, cart.
2. **Hero** — full-bleed editorial photo (21:9 desktop, 4:5 mobile). Eyebrow ("New season") · headline · subtitle · primary CTA ("Shop the collection") · secondary CTA ("Discover the story"). One image, one piece. Never a carousel by default.
3. **Reassurance row** — 4 icons + label pairs: free shipping, 14-day returns, Arabic support, secure checkout.
4. **Category curation** — 4 large rectangular cards (3 on tablet, 2 on mobile) with a single product image as the category cue, name overlaid bottom-start. Tap → `/categories/[slug]`.
5. **Editorial split** — single image left, paragraph right with "About Elara" CTA. (RTL: image start-side automatically becomes right.)
6. **New arrivals** — 4-up product grid, "View all" CTA in row header.
7. **Best sellers** — 4-up product grid.
8. **Editorial / Journal** — 2 articles (photo + title + read time). Optional in MVP.
9. **Trust panel** — short paragraph: "Made for KSA. Ships from Riyadh in 24–48h." With customer-care contact options.
10. **Footer** — newsletter input (no full-page popup), nav, legal links, VAT/CR, payments row.

- **First impression**: typography + hero photo. Less than 5 distinct UI elements visible above the fold.
- **Primary CTA**: "Shop the collection".
- **Secondary CTA**: "Discover the story".
- **Trust signals**: reassurance row in #3; payment logos in footer.
- **Conversion objective**: get the user into `/shop`, with `/about` as the alternative.
- **Mobile**: hero becomes 4:5; categories become 2-up; product grids 2-up.
- **Empty / edge**: if a section has no curated content, the section is hidden entirely. Never show a placeholder "No items".

### 4.2 Shop `/shop`

1. **Header + breadcrumbs** ("Shop").
2. **Title block** — title, short subtitle, result count.
3. **Sort + filter bar** — sort dropdown end-side; filter button start-side (opens drawer on mobile, sidebar on desktop).
4. **Product grid** — 2/3/4/5 columns by breakpoint.
5. **Pagination** (or load more — choose one and keep it).
6. **Footer**.

- **First impression**: clean grid, not a wall of badges.
- **Primary CTA**: implicit — open a PDP.
- **Secondary CTA**: open filters.
- **Trust**: reassurance row above footer.
- **Mobile**: filters/sort live in a sticky bottom bar.
- **Empty state**: "No products match your filters" + "Clear filters" button. Show 4 best-selling fallbacks below.
- **Error state**: inline retry with the last known good results cached.

### 4.3 Category `/categories/[slug]`
Same layout as Shop, with:
1. A small **collection hero** (4:1 ratio) at the top: image + 1-line category intro.
2. Sticky sub-filters specific to that category (e.g. size buckets).

### 4.4 Product detail `/products/[slug]`

1. **Breadcrumbs**.
2. **Two-column layout (desktop)**: gallery start-side (60%), info panel end-side (40%). Mobile: gallery on top, info below.
3. **Gallery** — vertical thumbnail rail (desktop) or swipeable carousel (mobile). 4–6 photos, includes 1 lifestyle and 1 detail shot.
4. **Info panel**:
   - Product name (H1)
   - Price (with compare-at strikethrough when discounted)
   - Star rating + review count (links to reviews tab)
   - Short summary (1–2 lines)
   - Color swatches (selected state visible, name labeled below)
   - Size picker (radio chips); "Size guide" link
   - Quantity stepper
   - **Add to cart** (primary, full width on mobile)
   - **Buy now** (secondary)
   - Wishlist icon-button (state persists for guests via localStorage)
   - Stock messaging: "In stock" / "Only N left" / "Out of stock — Notify me"
   - Trust mini-row: free shipping above 250 / 14-day returns / secure payment.
   - Tabs / accordion: Description, Details & material, Shipping & returns, Reviews.
5. **Related products** — "You may also like" 4-up grid.
6. **Recently viewed** — 4-up.
7. **Footer**.

- **First impression**: hero photo + name + price + ATC. Visible above the fold on desktop and on mobile (sticky add-to-cart bar appears when the user scrolls past the natural ATC button).
- **Primary CTA**: Add to cart.
- **Secondary CTA**: Buy now.
- **Trust**: Inline strip + reviews + shipping accordion.
- **Conversion objective**: Add to cart.
- **Mobile**: sticky ATC bar with price + button; gallery is 4:5 carousel.
- **Empty / edge states**:
  - Out of stock variant: ATC swaps for "Notify me", capture email.
  - Missing reviews: hide the reviews tab title from accordion; show "Be the first to review".
  - Discontinued product: serve 410 page with "Browse similar" suggestions.

### 4.5 Cart `/cart`

1. **Title** ("Your cart") + item count.
2. **Two-column layout** (desktop): items list start-side, sticky summary end-side. Stacked on mobile.
3. **Items** — image (1:1), name, variant attributes, quantity stepper, price, remove (×).
4. **Promo code** — input + apply button below items.
5. **Summary** — subtotal, shipping ("Calculated at checkout" or "Free"), VAT (15%), discount, total. Tabular numerals.
6. **Reassurance row** — free shipping threshold meter ("Add SAR 38 for free shipping"), returns, support.
7. **Checkout CTA** — primary, full width on mobile.

- **Primary CTA**: Checkout.
- **Secondary CTA**: Continue shopping.
- **Empty state**: title + paragraph + "Browse the shop" CTA + 4 best-selling fallbacks.
- **Error states**: variant became unavailable → inline warning per row with "Remove" or "Choose another size"; price/availability mismatch → soft refresh with a banner.

### 4.6 Checkout `/checkout`

Four steps, one page; URL hash or query-step pattern. Progress indicator across the top, never hidden.

1. **Contact** — email + phone. Guest by default. "Have an account? Sign in" inline link.
2. **Shipping** — name, address fields (KSA-friendly: country / city / district / street / building / postal / additional number / notes). Save-for-later checkbox if logged in. Shipping method radio with price.
3. **Payment** — card / mada / Apple Pay / COD (with the COD fee disclosed). Billing-same-as-shipping default on.
4. **Review** — items, addresses, payment summary, terms + privacy consent. "Place order" CTA.

Right column (desktop): sticky summary mirroring `/cart`. On mobile, summary collapses into an accordion at the top.

- **Primary CTA**: Place order.
- **Trust signals**: lock icon next to "Secure checkout", payment logos, "We never store card numbers", policy links inline.
- **Empty/edge states**: empty cart → redirect to `/cart`. Payment failure → inline non-destructive error retaining all entered data.

### 4.7 Auth pages

- **Login**: email, password, remember-me checkbox, forgot-password link, primary "Sign in", "Create an account" link, "Continue as guest" link (only from checkout flows).
- **Signup**: first + last name, email, phone, password (with strength helper), marketing opt-in (off by default), terms acknowledgment (must check). Submits to email verification screen.
- **Forgot password**: email input + "Send the link". Always shows the same success copy (anti-enumeration).
- **Reset password**: new + confirm password, strength helper, submit. Handles expired-token state with a "Request a new link" CTA.
- **Verify email**: shows "We sent a link to …" with "Resend" rate-limited to 1/60 s + 5/hour.

All auth screens are single-column, max-width 400 px, vertically centered on desktop. No marketing illustrations.

### 4.8 Account dashboard `/account`

Sidebar nav (start-side) + content. Mobile: tabs collapse to a top bar with horizontal scroll.

- **Overview** — greeting, last 3 orders, saved-addresses summary, wishlist count, "Manage" CTAs.
- **Orders** — table with status pills; row click → order detail.
- **Order detail** — items, timeline (Placed → Confirmed → Packed → Shipped → Delivered), shipping address, payment summary, "Track" link, "Request return".

### 4.9 Admin dashboard `/admin`

KPI tiles row → recent orders → low-stock alerts → top products.

### 4.10 Admin order management

- List view: filter chips by status, search by # or customer, bulk actions.
- Detail view: order header (number, customer, total, status, payment), items table, shipping address, customer notes, internal notes, action bar (Mark packed / shipped / delivered / cancel / refund), timeline (audit), print invoice + label.

### 4.11 Admin product management

Bilingual editor with side-by-side Arabic + English fields. Tabs: Info, Media, Variants, Inventory, SEO. Save-as-draft and Publish (Publish disabled if either language is incomplete).

---

## 5. UX flows

### 5.1 First-time visitor browsing
1. User lands on `/` from an ad or a referral.
2. Middleware reads `Accept-Language`; with no `NEXT_LOCALE` cookie, defaults to `ar`. The cookie is then set for 1 year.
3. Hero loads with no layout shift (server-rendered, fonts preloaded via `next/font`).
4. User scrolls → reassurance row → categories → editorial → grids.
5. User taps a category card → `/categories/[slug]`.
6. **Reassurance moments**: visible shipping threshold and return policy in the homepage row.
7. **Failure**: if a section's API call fails, render the section with the last-known-good cache or hide it; never show a spinner for >500 ms above the fold.

### 5.2 Product discovery
1. User opens `/shop` (or via search).
2. Applies filter "Size: M" + "Color: Sand" + sort "Best selling".
3. URL updates with shareable query string (no hash-only state).
4. Grid renders with skeletons during initial paint (≤300 ms).
5. **Validation**: filter combos that yield zero results show an inline "No matches" banner and offer "Clear one filter at a time".
6. User clicks card → product detail loads with the chosen color pre-selected (read from URL).

### 5.3 Add to cart
1. User selects size + color on PDP.
2. **Validation**: if size/color not chosen, "Add to cart" remains disabled with a microcopy beneath ("Select size to continue").
3. Tap ATC → optimistic UI: cart badge increments, side-cart sheet opens from the start side, item appears at the top.
4. Server confirms stock; if a race condition makes the item unavailable, revert with a non-blocking toast and remove the line.
5. Side-cart shows subtotal, free-shipping threshold meter, "View cart" + "Checkout" CTAs.

### 5.4 Guest checkout
1. From cart → "Checkout" → `/checkout`.
2. Step 1 contact: email + phone validated client-side and server-side.
3. Step 2 shipping: country pre-locked to "السعودية / Saudi Arabia" for now; postal code mask 5 digits; "additional number" field accepts 4 digits.
4. Step 3 payment: card form uses provider's hosted fields (Moyasar/Tap). The site never sees raw PAN.
5. Step 4 review: terms checkbox required.
6. On submit → loading state with "Processing your order…" copy → success screen.
7. **Failure**: payment declined → inline error with provider's localized reason; cart not cleared; no double-submit possible (button disabled + idempotency key).
8. Success page offers "Create an account using this email" — pre-fills first name, last name, phone, address.

### 5.5 Logged-in checkout
- Same flow as guest, but contact pre-filled from profile, addresses listed for selection.
- Order is associated with the user; loyalty / next-order-discount hooks fire here (Phase 4).

### 5.6 Account signup
1. `/auth/signup`.
2. Server validates email uniqueness with anti-enumeration: always returns the same success copy regardless of whether the email is taken.
3. Account created in `pending_verification` state.
4. Verification email sent (Resend / Postmark).
5. Until verified, the user can browse and check out as a guest but cannot use account-only features (wishlist sync, order history filters).

### 5.7 Login
1. `/auth/login`.
2. After 5 failed attempts in 15 min, lock to 1 attempt per 5 min until cool-off (server-side; never reveal "wrong password" vs "no such user").
3. On success, set HTTP-only `__Host-session` cookie, redirect to `?next=` or `/account`.

### 5.8 Forgot password
1. `/auth/forgot-password` → user enters email.
2. Always show success copy. If the email exists, send a single-use token with 30-min TTL.
3. `/auth/reset-password?token=…` opens; expired/used → "Request a new link".
4. On success, all existing sessions for this user are revoked.

### 5.9 Post-purchase order tracking
1. Confirmation email contains the order number + tracking link.
2. Guest tracking: `/orders/track` accepts order # + email (anti-enumeration: same response regardless of match).
3. Logged-in tracking: `/account/orders/[id]` shows the full timeline with carrier events.
4. SMS update at "Shipped" (Phase 2 — placeholder routes already exist).

### 5.10 Return request
1. From an order detail, user clicks "Request return".
2. Choose items + reason + optional photos.
3. Server creates a `return_request` row, status `requested`.
4. Admin sees it in `/admin/returns`. On approval, return is `approved`; refund is processed and `refund` row is created.
5. Customer receives email at each transition.

### 5.11 Wishlist behavior
- **Guest**: localStorage list of product IDs.
- **On login**: merge guest list into the server-backed wishlist (dedupe).
- **Across devices**: any logged-in device sees the same wishlist.
- **Out-of-stock items** show with a strikethrough and a "Notify me" pill.

### 5.12 Out-of-stock flow
- PDP swaps ATC for "Notify me", capturing email.
- A `back_in_stock_subscriptions` row links variant + email.
- When inventory transitions from 0 → ≥1, a batched email job notifies subscribers (max 1 per variant per email per 7 days).

### 5.13 Admin order fulfillment
1. Order arrives → status `pending`.
2. Admin reviews, marks `confirmed` (auto-decrements inventory).
3. Picks + packs in `/admin/orders/[id]/fulfill` (checklist UI).
4. Prints invoice + carrier label.
5. Marks `packed` → `shipped` (enters tracking number).
6. Carrier webhook (Phase 2) automates `delivered`.

### 5.14 Admin product creation
1. `/admin/products/new`.
2. Bilingual side-by-side form: Arabic on the start side, English alongside.
3. Add at least 3 photos, choose category, set price, set inventory (or define variants).
4. SEO tab pre-fills meta title with product name + brand template; admin can override per locale.
5. Save as draft any time. Publish requires Arabic + English completeness.

---

## 6. Technical architecture

### 6.1 Recommended stack

| Layer            | Choice                                  | Why                                                                                                          |
|------------------|-----------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Framework        | **Next.js 15 (App Router) + TS strict** | RSC for fast, SEO-friendly pages; mature i18n via next-intl; great DX; deploys anywhere.                     |
| Styling          | **Tailwind v4** + CSS tokens            | Logical-property utilities (`ps-/pe-`) are first-class — perfect for RTL.                                    |
| i18n             | **next-intl 3.x**                       | RSC-native, typed messages, localized pathnames, designed for App Router.                                    |
| DB               | **PostgreSQL 16** (Neon, Supabase, RDS) | Relational integrity for orders/inventory/refunds; JSONB where helpful.                                      |
| ORM              | **Prisma**                              | Excellent DX, migrations, generated types, mature transaction support. (Drizzle is a fine alternative if you prefer SQL-first.) |
| Auth             | **Auth.js (NextAuth) v5** with custom credentials provider, or hand-rolled cookie sessions backed by Postgres | Phase-1 only needs email/password + verification. We avoid SaaS lock-in so OTP can be added cleanly later.    |
| Mail             | **Resend** (or Postmark)                | High deliverability, simple templating, both work well from KSA.                                             |
| Object storage   | **S3-compatible** (AWS S3, Cloudflare R2)| Cheap, durable, CDN-friendly.                                                                                |
| Image CDN        | **Next/Image + Cloudflare or Vercel**   | Built-in AVIF/WebP, on-demand resizes.                                                                       |
| Payments         | **Moyasar** or **Tap** (KSA local + mada + Apple Pay + cards); abstraction layer over both. | Local-first, mada support, Arabic UIs in their hosted forms. Stripe is OK if mada is added separately.       |
| Search           | Phase 1: Postgres full-text + trigrams. Phase 2: **Meilisearch** or **Algolia**. | Start simple; upgrade when catalog > ~3k SKUs.                                                                |
| Background jobs  | **Inngest** or **Trigger.dev**          | Email batches, back-in-stock notifications, abandoned-cart, refund webhooks.                                  |
| Logs/metrics     | Vercel + **Axiom** or Datadog           | Centralized, queryable.                                                                                       |
| Error tracking   | **Sentry**                              | Source maps on the server + client.                                                                          |
| CI               | GitHub Actions                          | Build + typecheck + lint + tests on PR.                                                                       |
| Hosting          | **Vercel** (or AWS/Cloudflare Pages)    | First-class Next.js support; edge for middleware.                                                            |

### 6.2 How the layers interact

```
Browser ─┬─→ Edge Middleware (locale + cookie + rate-limit headers)
         └─→ Next.js (RSC + Server Actions + Route Handlers)
                 │
                 ├─→ Auth (sessions in DB; cookies on edge)
                 ├─→ Prisma → PostgreSQL
                 ├─→ S3 (signed uploads from admin)
                 ├─→ Payments provider (webhooks → Route Handler)
                 ├─→ Mail provider
                 └─→ Background queue (Inngest)
```

### 6.3 Server-side vs client-side

| Server-side (RSC / Server Actions)                                   | Client components                                                |
|----------------------------------------------------------------------|------------------------------------------------------------------|
| Product catalog rendering, PDP HTML, category pages, SEO metadata    | Add-to-cart button, color/size pickers, qty stepper              |
| Cart reads from `cookies()`/session; cart mutations as Server Actions| Side-cart drawer animation                                       |
| Checkout step navigation, address autocomplete results               | Card-form iframe wrapper (provider supplies the hosted field)    |
| All admin pages                                                      | Filter chips state (URL-synced)                                  |
| Auth flows (Server Actions)                                          | Toasts, modals                                                   |

**Rule**: data that affects SEO or first paint is server-rendered; only interaction-driven state is client.

### 6.4 Bilingual routing / content
- **Locale-prefixed URLs** (`/ar/...`, `/en/...`) using `next-intl` with `localePrefix: 'always'`. This is recommended for analytics + hreflang clarity in a bilingual market.
- **Localized pathnames** (e.g. `/en/products/[slug]` ↔ `/ar/منتج/[slug]`) defined in `src/i18n/routing.ts`.
- **Content**: every product/category/collection has Arabic + English fields stored in JSONB (see §7) and validated as a unit.
- **Persistence**: a `NEXT_LOCALE` cookie remembers the user's preference for 1 year. The middleware respects it.

### 6.5 Scalability principles
- All product reads can be served from the edge (ISR with on-demand revalidation when admin publishes).
- Inventory mutations and cart state are dynamic, never cached.
- Image transforms via the CDN cache.
- Search graduates from PG → Meili/Algolia at ~3k SKUs without touching the front end (search service is an interface).
- Payments are abstracted behind `PaymentProvider` so swapping Moyasar ↔ Tap ↔ Stripe is a single-file change.

---

## 7. Database design

> Conventions: `snake_case`, `id uuid` primary keys (default `gen_random_uuid()`), `created_at` and `updated_at` `timestamptz` defaulting to `now()`, soft-delete via `deleted_at timestamptz null` where applicable.

### users
- **Purpose**: a person who can authenticate.
- **Columns**: `id`, `email citext unique not null`, `email_verified_at timestamptz null`, `password_hash text not null`, `phone text null`, `phone_verified_at timestamptz null`, `locale text default 'ar'`, `marketing_opt_in bool default false`, `status text default 'active'` (`active`, `pending_verification`, `locked`, `disabled`), `last_login_at`, `created_at`, `updated_at`.
- **Indexes**: unique on `email`, btree on `phone`.
- **Constraints**: `status in (...)`, `email` lowercase via `citext`.
- **Deletion**: soft-delete (`deleted_at`). Hard-delete only via privacy request workflow.

### profiles
- One-to-one with `users`. Holds non-auth attributes.
- `id`, `user_id fk`, `first_name`, `last_name`, `avatar_url`, `default_address_id fk(addresses) null`, timestamps.

### sessions
- Server-backed sessions (HTTP-only cookie holds the session id only).
- `id uuid pk`, `user_id fk`, `created_at`, `last_seen_at`, `expires_at`, `ip inet`, `user_agent text`, `revoked_at null`.
- Index `(user_id, expires_at)`.

### addresses
- `id`, `user_id fk null` (null allowed for guest checkout snapshot), `full_name`, `phone`, `country_code char(2) default 'SA'`, `city`, `district`, `street`, `building_number`, `postal_code`, `additional_number`, `notes`, `is_default bool default false`, timestamps.
- Index `(user_id, is_default)`.

### products
- `id`, `slug citext unique`, `status text` (`draft`/`active`/`archived`), `name jsonb not null` (`{ar:'',en:''}`), `description jsonb`, `short_description jsonb`, `category_id fk`, `default_variant_id fk null`, `seo_meta jsonb`, `published_at`, timestamps, `deleted_at`.
- Indexes: GIN on `name`, btree on `category_id`, partial `(status='active')`.
- Constraint: a `check (jsonb_typeof(name->'ar')='string' AND jsonb_typeof(name->'en')='string')` guarantees bilingual integrity.

### product_media
- `id`, `product_id fk`, `variant_id fk null`, `url text`, `width int`, `height int`, `alt jsonb`, `position int`, `kind text` (`image`/`video`), timestamps.
- Index `(product_id, position)`.

### product_variants
- `id`, `product_id fk`, `sku citext unique`, `barcode null`, `price_cents int not null`, `compare_at_price_cents int null`, `cost_cents int null`, `weight_grams int null`, `position int`, timestamps, `deleted_at`.
- Index `(product_id, position)`.

### variant_options
- `id`, `variant_id fk`, `name text` (`size`, `color`), `value text`, `meta jsonb` (e.g. hex for color swatch).
- Composite unique `(variant_id, name)`.

### categories
- `id`, `slug citext unique`, `parent_id fk null`, `name jsonb`, `description jsonb`, `image_url`, `position int`, `seo_meta jsonb`, timestamps, `deleted_at`.

### collections
- `id`, `slug citext unique`, `title jsonb`, `description jsonb`, `hero_url`, `is_published bool`, `published_at`, timestamps, `deleted_at`.

### collection_items
- Join table. `id`, `collection_id fk`, `product_id fk`, `position int`. Unique `(collection_id, product_id)`.

### inventory
- One row per variant. `variant_id fk pk`, `quantity int not null check (quantity >= 0)`, `reserved_quantity int not null default 0 check (reserved_quantity >= 0)`, `restock_threshold int default 3`, `updated_at`.
- Inventory mutations are wrapped in transactions (`SELECT … FOR UPDATE`).

### inventory_movements
- Audit trail of stock changes. `id`, `variant_id fk`, `delta int`, `reason text` (`order_reserved`, `order_committed`, `manual_adjust`, `return_restocked`), `actor_id null`, `note`, `created_at`.

### carts
- `id`, `user_id fk null`, `anon_token text null` (for guest carts), `currency char(3) default 'SAR'`, `status text` (`active`, `converted`, `abandoned`), `expires_at`, timestamps.
- Index `(user_id)`, `(anon_token)`.

### cart_items
- `id`, `cart_id fk`, `variant_id fk`, `quantity int check >=1`, `unit_price_cents int`, `meta jsonb`, timestamps.
- Unique `(cart_id, variant_id)`.

### orders
- `id`, `number text unique` (formatted ELB-YYMM-XXXXXX), `user_id fk null`, `email citext not null`, `phone text`, `currency char(3) default 'SAR'`, `subtotal_cents int`, `discount_cents int`, `shipping_cents int`, `vat_cents int`, `total_cents int`, `status text` (see §13), `payment_status text`, `fulfillment_status text`, `shipping_address_id fk`, `billing_address_id fk`, `placed_at`, `confirmed_at`, `packed_at`, `shipped_at`, `delivered_at`, `cancelled_at`, `notes`, timestamps.
- Indexes: `(user_id, placed_at desc)`, `(status)`, `(placed_at desc)`.

### order_items
- `id`, `order_id fk`, `variant_id fk`, `product_snapshot jsonb` (frozen at order time), `quantity int`, `unit_price_cents`, `total_cents`.

### payments
- `id`, `order_id fk`, `provider text` (`moyasar`, `tap`, `cod`), `provider_intent_id text`, `provider_charge_id text`, `status text` (`initiated`, `authorized`, `captured`, `failed`, `refunded`, `partially_refunded`), `amount_cents`, `currency`, `raw jsonb` (provider payload), timestamps.
- Index `(order_id)`, `(provider, provider_charge_id)`.

### refunds
- `id`, `order_id fk`, `payment_id fk`, `amount_cents`, `reason`, `status` (`pending`, `succeeded`, `failed`), `processed_at`, timestamps.

### discount_codes
- `id`, `code citext unique`, `type` (`percent`/`fixed`/`free_shipping`), `value_cents int`, `value_percent decimal(5,2) null`, `min_subtotal_cents int null`, `starts_at`, `ends_at`, `usage_limit int null`, `per_customer_limit int null`, `applies_to jsonb` (`all`/categories/products), `is_active bool`, timestamps.

### discount_redemptions
- Junction. `id`, `discount_id fk`, `user_id fk null`, `order_id fk`, `redeemed_at`.

### reviews
- `id`, `product_id fk`, `user_id fk`, `order_item_id fk null` (proof-of-purchase), `rating int check 1..5`, `title text`, `body text`, `status` (`pending`/`published`/`rejected`), `created_at`.
- Constraint: only one review per `(user_id, product_id)`.

### wishlists
- `id`, `user_id fk`, `created_at`. (Allow named wishlists later — Phase 4.)

### wishlist_items
- `id`, `wishlist_id fk`, `product_id fk`, `created_at`. Unique `(wishlist_id, product_id)`.

### notifications
- `id`, `user_id fk`, `type text`, `title jsonb`, `body jsonb`, `link`, `read_at null`, `created_at`.

### notification_preferences
- `user_id pk fk`, `email_order_updates bool default true`, `email_promotions bool default false`, `sms_order_updates bool default true`, ... etc.

### admin_users
- Could share `users` with a flag, but for clarity keep a separate row: `id`, `user_id fk unique`, `is_owner bool`, timestamps. Owners can never be deleted.

### roles
- `id`, `name text unique` (`owner`, `manager`, `fulfillment`, `support`), `description`.

### permissions
- `id`, `key text unique` (e.g. `orders:read`, `orders:write`, `products:write`, `discounts:write`, `staff:write`, `audit:read`).

### role_permissions
- Join. `(role_id, permission_id)`.

### admin_role_assignments
- `(admin_user_id, role_id)` join.

### audit_logs
- `id`, `actor_type text` (`admin`/`system`/`customer`), `actor_id null`, `action text`, `entity_type text`, `entity_id text`, `before jsonb`, `after jsonb`, `ip`, `user_agent`, `created_at`.
- Index `(entity_type, entity_id)`, `(actor_id, created_at desc)`.

### email_events
- `id`, `to_email`, `template text`, `subject`, `payload jsonb`, `provider_message_id`, `status` (`queued`/`sent`/`delivered`/`bounced`/`complained`), `sent_at`, `created_at`.

### return_requests
- `id`, `order_id fk`, `user_id fk`, `status text` (`requested`/`approved`/`rejected`/`received`/`refunded`), `reason text`, `notes text`, timestamps.

### return_request_items
- `id`, `return_request_id fk`, `order_item_id fk`, `quantity int`.

### future_otp_events  *(reserved placeholder for Phase 3)*
- `id`, `user_id fk`, `channel text` (`sms`/`email`/`whatsapp`), `purpose text` (`signup`, `login`, `password_reset`, `step_up`), `hashed_code text`, `expires_at`, `consumed_at null`, `attempts int default 0`, `ip`, `user_agent`, `created_at`.
- Even though OTP is Phase 3, this table is created in Phase 1 migrations (empty). No runtime code uses it yet — but the schema is ready, and audit logs can already reference it.

### Status enums (string constraints)
- `orders.status`: `pending` → `confirmed` → `packed` → `shipped` → `delivered` ; plus `cancelled`, `returned`.
- `orders.payment_status`: `unpaid`, `authorized`, `paid`, `partially_refunded`, `refunded`, `failed`.
- `orders.fulfillment_status`: `unfulfilled`, `partial`, `fulfilled`.
- `return_requests.status`: `requested`, `approved`, `rejected`, `received`, `refunded`.
- `users.status`: `pending_verification`, `active`, `locked`, `disabled`.

---

## 8. API & backend planning

We mix **Server Actions** (mutations from forms) and **Route Handlers** (`/api/*`) for webhooks + provider integrations. Endpoints below are logical groupings.

### auth (public)
| Action                | Auth         | Validation                                                     | Failure modes                            |
|-----------------------|--------------|----------------------------------------------------------------|------------------------------------------|
| `signup`              | none         | email format, password strength, terms acknowledged            | `email_taken_but_dont_disclose`          |
| `login`               | none         | email, password                                                | invalid creds (uniform), locked          |
| `logout`              | session      | —                                                              | —                                        |
| `forgotPassword`      | none         | email format                                                   | always uniform success                   |
| `resetPassword`       | none + token | token, password                                                | expired/invalid token                    |
| `verifyEmail`         | none + token | token                                                          | expired/invalid                          |
| `resendVerification`  | session      | rate-limited                                                   | too many requests                        |

### catalog (public)
| Action                                  | Notes                                          |
|-----------------------------------------|------------------------------------------------|
| `getProductsList(filters, sort, page)`  | Cached + ISR; filters validated against allowed values. |
| `getProductBySlug(slug)`                | 404 if not active; revalidate-on-publish.      |
| `getCategoryBySlug(slug)`               | —                                              |
| `getCollectionBySlug(slug)`             | —                                              |
| `searchProducts(q)`                     | Phase 1: PG trigram; sanitized input.          |

### cart (public, session-bound)
| Action            | Validation                                                  | Failure modes                              |
|-------------------|--------------------------------------------------------------|--------------------------------------------|
| `getCart`         | anonymous cart by cookie token; logged-in cart by user_id    | —                                          |
| `addItem`         | variantId exists, in stock, quantity within reserved limits  | out_of_stock, variant_not_found            |
| `updateQuantity`  | qty 1..50                                                    | out_of_stock                               |
| `removeItem`      | item belongs to cart                                         | not_found                                  |
| `applyPromo`      | code active, not consumed beyond limits, min subtotal met    | invalid_promo, already_applied, expired    |
| `removePromo`     | —                                                            | —                                          |

### checkout (public + session-bound)
| Action            | Notes                                                       |
|-------------------|-------------------------------------------------------------|
| `setContact`      | email + phone validated; stored in cart metadata.           |
| `setShippingAddress` | KSA address validation.                                  |
| `setShippingMethod`  | only methods defined in admin settings.                 |
| `selectPayment`      | provider initialized; intent created.                   |
| `placeOrder`         | server transaction: reserve inventory → create order → call provider capture → finalize. Idempotency key required. |

### orders (customer, requires session)
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `listMyOrders`    | filterable by status; paginated.               |
| `getMyOrder(id)`  | ownership check.                               |
| `requestReturn`   | per-order eligibility (within 14 days, delivered status). |
| `trackOrderPublic(orderNumber, email)` | rate-limited, anti-enumeration.   |

### account
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `getProfile`      | session required.                              |
| `updateProfile`   | name/phone/locale.                             |
| `changePassword`  | requires current password; revokes other sessions. |
| `manageAddresses` | CRUD + setDefault.                             |
| `updateNotificationPrefs` | per channel/topic.                     |
| `listSessions`    | shows other devices.                           |
| `revokeSession(id)`| revokes one session.                          |

### wishlist
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `getWishlist`     | guest: localStorage on client; logged-in: server.|
| `addToWishlist`   | dedupe.                                        |
| `removeFromWishlist` | —                                          |
| `mergeGuestWishlist` | called on login.                            |

### reviews
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `submitReview`    | requires session + proof-of-purchase order_item; rate-limited.|
| `listProductReviews(productId)`| public; only `status='published'`.|

### admin/products (admin auth + `products:write`)
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `listProducts`    | filters by status, search.                     |
| `createProduct`   | bilingual integrity check.                     |
| `updateProduct(id)`| audit log entry.                              |
| `publishProduct(id)`| both languages required.                     |
| `archiveProduct(id)`| —                                            |
| `manageVariants(productId)`| add/update/delete variant + inventory.|
| `uploadMedia(productId)` | signed S3 URL.                          |

### admin/orders (admin auth + `orders:write`)
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `listOrders`      | filters, search.                               |
| `updateOrderStatus` | state-machine validated transitions.         |
| `refundOrder`     | full or partial; creates refund via provider.  |
| `addInternalNote` | not visible to customer.                       |

### admin/customers
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `listCustomers`   | search by name/email/phone.                    |
| `getCustomer(id)` | 360°.                                          |
| `lockAccount(id)` | sets `status='locked'`; revokes sessions.      |

### admin/settings
| Action            | Notes                                          |
|-------------------|------------------------------------------------|
| `updateStore`     | requires `settings:write`.                     |
| `updateShipping`  | zones + rules.                                 |
| `updateOtpSettings` *(reserved Phase 3)* | persisted but unused. |

### Webhooks (Route Handlers)
- `/api/webhooks/payments/moyasar` — verifies signature; updates `payments`, `orders.payment_status`.
- `/api/webhooks/email/resend` — bounce/complaint events update `email_events`.
- `/api/webhooks/shipping/[carrier]` — Phase 2.

### Cross-cutting validation
- All inputs validated server-side using **Zod** schemas; no implicit trust of client payloads.
- All Server Actions wrap in a `try/catch` that returns a typed `Result<T>` and a localized error code that the client maps to messages.

---

## 9. Auth architecture for Phase 1

### Account states
- `pending_verification` — created but email not yet verified.
- `active` — verified, can use all customer features.
- `locked` — temporary lock after too many failed logins or admin action.
- `disabled` — permanent (user-requested deletion or admin enforcement).

### Session lifecycle
- Server-backed sessions table (see schema).
- Cookie name: `__Host-elara_session` (uppercase HOST prefix, no Domain attribute, Path=/, Secure, HttpOnly, SameSite=Lax).
- Cookie value: opaque session id only — no user data.
- Lifetime: 30 days rolling (extended on each request); hard cap 90 days.
- Server-side revocation supported (admin lock, password change, "Sign out all devices").

### Password reset
1. Generate cryptographically secure token (32 random bytes, base64url).
2. Store **hashed** token in `password_reset_tokens(token_hash, user_id, expires_at, consumed_at null)`.
3. Email link `…/auth/reset-password?token=…` valid for 30 minutes.
4. Single-use: marked `consumed_at` immediately on use.
5. On success, all sessions for the user are revoked.

### Rate limiting
- Login: 5/min per IP+email, 20/hour per IP.
- Forgot password: 1/min per email, 5/hour per IP.
- Email verify resend: 1/60 s per user, 5/hour.
- All limits enforced at the edge (middleware or a dedicated `Upstash Ratelimit` integration).

### Anti-enumeration
- Login: same error message regardless of "no such email" vs "wrong password".
- Forgot password: always show "If that email is on file…".
- Signup: never reveal email-already-exists; instead send a "we noticed you tried to sign up — sign in or reset password" email to the existing user.

### Future OTP integration point
We design auth so OTP slots in without rewriting:
- `auth.authenticate(email, password)` returns `{ status: 'ok', session }` *or* `{ status: 'requires_step_up', challengeId }` — Phase 1 always returns `'ok'`; Phase 3 will return `'requires_step_up'` when account/policy requires OTP.
- A reserved `future_otp_events` table (see §7) is already migrated.
- `/auth/otp` route is reserved; Phase 1 returns 404 by feature-flag.
- Server config has an unused `OTP_PROVIDER` env (`.env.example`).
- Audit log already has the action vocabulary (`otp_sent`, `otp_verified`, `otp_failed`).

---

## 10. Security specification

### Password hashing
- **Argon2id** (preferred). Parameters: `memory=64 MiB, iterations=3, parallelism=2`. Bcrypt (cost 12) is acceptable on environments without Argon2.
- Never log raw or hashed passwords.

### Session strategy
- See §9. Server-backed; opaque cookie; rolling expiration; revocable.

### Cookie strategy
- `__Host-elara_session`: HttpOnly, Secure, SameSite=Lax, Path=/, no Domain.
- `NEXT_LOCALE`: not HttpOnly (the language switcher reads it), SameSite=Lax, Secure in prod, 1-year.
- Cart cookie for guests: `__Host-elara_cart`: HttpOnly, Secure, SameSite=Lax, signed (HMAC) so the value can be trusted on the server.
- No third-party cookies. No analytics until consent is captured (PDPL/GDPR-aware).

### CSRF protection
- Mutations go through Server Actions, which Next.js protects with same-origin checks.
- Route Handlers under `/api/*` that perform mutations require an `x-elara-csrf` token issued per-session and tied to the cookie (double-submit pattern), unless they are webhooks (which use HMAC signature verification).

### XSS prevention
- React's default escaping + strict CSP:
  ```
  Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'nonce-…' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://cdn.elarabase.com https://images.unsplash.com;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://api.moyasar.com;
    frame-src https://api.moyasar.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  ```
- All user-generated content (reviews, names) is escaped on render and stripped of HTML on input.
- `dangerouslySetInnerHTML` only inside an audited, sanitized component (e.g. CMS body) using `isomorphic-dompurify`.

### SQL injection
- Prisma parametrizes everything. `prisma.$queryRawUnsafe` is forbidden by lint rule.

### Input validation
- Every Server Action and Route Handler validates with Zod.
- Maximum body size 1 MB for most endpoints; 10 MB only for `uploadMedia`.

### File upload validation
- Direct-to-S3 with **presigned POST** policies pinned to:
  - Content-Type whitelist: `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `video/mp4`.
  - Max size 10 MB image / 30 MB video.
  - Path prefix per `product_id`.
- Server runs a post-upload virus scan (ClamAV in a background job) and rejects on positive.
- File extensions never trusted; MIME and magic-bytes both checked.

### Admin authorization
- Permission strings (`orders:read`, `products:write`, …) checked by a `requirePermission` server util on every admin Server Action.
- Roles bundle permissions (`owner`, `manager`, `fulfillment`, `support`).
- The owner role cannot be removed.
- All admin actions on customer data, orders, refunds, and staff write to `audit_logs`.

### Logging sensitive actions
- Authentication events (success/failure, password reset, email verify, session revoke).
- Order state transitions, refunds, address changes by staff on behalf of customer.
- Permission changes, role assignments.

### Audit trails
- See `audit_logs` schema. 365-day retention by default; longer for finance-related events. Logs are append-only in the application layer (no UPDATE/DELETE).

### Abuse & rate limiting
- IP-based and identity-based (email/user_id) layered limits at the edge.
- WAF rules (Cloudflare or Vercel Firewall) for common bot signatures.

### Backup strategy
- DB: PITR-enabled managed Postgres with daily snapshots + 7-day point-in-time recovery; weekly off-region backups, 90-day retention.
- Object storage: cross-region replication for product media.
- Quarterly restore drill, documented.

### Rollback strategy
- DB migrations are forward-only; destructive migrations require a two-step deploy (add new column → backfill → switch reads → drop old column in a later release).
- App releases are deployed via Vercel atomic deploys; rollback = re-promote previous deployment.
- Feature flags (e.g. `payments_provider`, `otp_enabled`) ship with toggles so we can disable a buggy code path without redeploying.

### Secrets management
- `.env.local` for dev; never committed.
- Production secrets via Vercel/Cloud provider's secret store, not env files in CI logs.
- Rotated every 90 days; immediate rotation on staff offboarding.

### PII handling
- PII fields: email, phone, addresses, IP.
- Encrypted at rest by the DB provider; sensitive columns (e.g. phone) optionally encrypted at the app layer with a per-row envelope key (Phase 2).
- Right-to-erasure: a soft-delete + scheduled hard-delete job that removes PII while keeping anonymized order rows for finance.
- Saudi PDPL alignment: privacy policy describes purpose, retention, third-party processors.

### Fraud-prevention basics
- Disposable-email blocklist on signup.
- Velocity checks: max N orders per email/phone per hour.
- Address consistency: shipping country must match the user's locked country settings (Phase 1: KSA only).
- COD threshold (e.g. max SAR 1,500) configurable per zone.
- Chargeback retention of payment provider event IDs.

### Secure future OTP expansion points
- All OTPs are stored hashed (Argon2id) with `expires_at` and `attempts`.
- 6-digit codes, 5-minute TTL, max 5 verification attempts before invalidation.
- Codes never sent to insecure channels; SMS provider TLS-only.
- Step-up flow (re-verify OTP for sensitive actions: changing email, large refunds) ships with Phase 3.
- The `future_otp_events` table is in place from Phase 1 to lock the schema shape early.

---

## 11. Content & copy strategy

### Homepage headlines
- **AR**: short, evocative, declarative. e.g. "قطعٌ تختار البقاء" — never imperative ("اشترِ الآن").
- **EN**: same intent, slightly poetic. "Pieces that choose to stay." Never "Shop the best!! 🌟".

### Product naming
- Pattern: `<Material> <Form> <Name>` (e.g. `Linen Wide-Leg Trouser — Sand`).
- Arabic mirrors: `<اللون> <الاسم> <الخامة>` (e.g. `بنطال واسع — كتّان رملي`).
- Avoid trend words ("must-have", "essential", "core").

### Product description structure
1. **1-line hook** (italic eyebrow): the *idea* of the piece.
2. **Materials**: real % composition, country of origin.
3. **Fit / dimensions**: bullet list.
4. **Care**: bullet list.
5. **Why we made it**: 2–3 sentences in brand voice.
6. **What it pairs with**: 2 product references (CMS-linked).

### Collection intros
- 2–4 sentences max. Lead with the *why* of the collection, not the *what*.
- Example: "Late summer in Riyadh. A small set of pieces in unbleached cotton and oat linen — light enough for evenings, structured enough to wear back to a meeting."

### Cart reassurance copy
- "Your items are reserved while you check out."
- "Free shipping in KSA on orders above SAR 250."
- "Need help? Reply to your confirmation email — a person reads it."

### Checkout trust copy
- Above the card form: "We don't store your card number. Payments are processed by mada / Moyasar over an encrypted connection."
- Near terms: "By placing your order, you agree to our terms and privacy policy."
- On success: "Thank you for choosing Elara. Your confirmation is on the way."

### Empty states
- **Cart**: "Your cart is empty. Browse the shop and pick a few favorites."
- **Wishlist**: "No saved pieces yet."
- **Orders**: "No orders here yet — you haven't placed one."
- **Search**: "No results for '<term>'. Try fewer words, or browse new arrivals."

### Error messages
- Lead with what happened, then what to do.
- Bad: "Error 500." Good: "We couldn't process your payment. No charge was made — please try again or use a different card."
- Always offer an action.

### Account messages
- Welcome: "Welcome to Elara, <name>. Your account is ready."
- Verified: "Email confirmed. Thank you."
- Password reset success: "Password updated. All other devices are now signed out."

### Out-of-stock messaging
- PDP: "Sold out — we'll let you know when it's back. <Notify me>"
- Cart: inline strikethrough + "This item is no longer available."
- Listing: subtle "Sold out" pill on the card; don't remove the card (it preserves SEO depth).

### Bilingual consistency rules
- Equivalent meaning, not literal translation.
- Length parity within 25%. If AR is dramatically longer/shorter, reword.
- Both versions reviewed by a native speaker before publish; admin UI blocks publish until both filled.
- Numerals: Western digits across the board.
- Dates: dd MMM yyyy in both locales (e.g. `12 May 2026` / `12 مايو 2026`).
- Phone numbers: `+966 5X XXX XXXX`, wrapped in LRM in Arabic paragraphs (see formatters).

---

## 12. Conversion strategy

### Homepage structure
- One CTA per fold. Hero → primary "Shop the collection".
- Reassurance row in fold #2 — trust before product.
- Category curation before "all products" — easier choice.

### Product page hierarchy
- Above the fold (desktop): hero image, name, price, color, size, ATC. That's it.
- Below: gallery cont., trust strip, description tabs, related products.

### Imagery
- 1 hero image, 1 lifestyle, 1 detail, 1 on-body (or on-surface), 1 packaging or material macro. Five images, well-shot, beats fifteen mediocre ones.

### Social proof
- Star rating visible in PDP info panel, near name.
- Reviews include name initial + verified-buyer badge.
- Avoid testimonials carousels on the homepage; let the product speak.

### Scarcity — used honestly only
- "Only N left" appears when actual inventory ≤ 5.
- No fake timers. No "X people are viewing this". These erode trust.

### Stock messaging
- Always show real status: "In stock", "Only N left", "Sold out — Notify me".
- Configurable threshold per category in admin.

### Shipping reassurance
- Threshold meter in the cart and side-cart.
- Estimated delivery range on the PDP based on city (Phase 2 — Phase 1 shows the default range).

### Return reassurance
- "14-day exchange or return" with a real link to the policy from PDP, cart, checkout footer.

### Checkout clarity
- Single page, 4 visible steps.
- All taxes and shipping shown — no surprises on the last step.
- "Edit" links on review step keep the form data intact.

### Post-purchase communication
- Order confirmation email (immediate).
- Shipping confirmation email + SMS (Phase 2).
- Delivery confirmation email + "Review your order" 5 days after delivery.

### Account convenience
- Saved addresses, fast reorder, easy return request, downloadable invoices.

---

## 13. Admin & operations logic

### Order statuses (state machine)
```
pending → confirmed → packed → shipped → delivered
                                         ↘ returned
   ↘ cancelled (allowed from pending/confirmed only)
```
- `pending` is the initial state when payment is captured but inventory isn't yet committed (rare with synchronous capture — most orders move directly to `confirmed`).
- `cancelled` from `confirmed` triggers automatic inventory return + refund initiation.
- `delivered → returned` runs through `return_requests`.

### Payment statuses
`unpaid → authorized → paid → partially_refunded → refunded`, plus `failed`.

### Fulfillment statuses
`unfulfilled → partial → fulfilled`. Partial fulfillment supports backorders.

### Return statuses
`requested → approved | rejected → received → refunded`.

### Refund statuses
`pending → succeeded | failed`. Always wrapped in a provider call; admin cannot mark `succeeded` manually unless an offline refund is recorded with a reason note.

### Inventory update rules
- Reservation on `addItem` (soft hold, expires with cart 24h).
- Commit on `placeOrder` (decrement quantity, increment reserved → committed).
- Release on `cancel` or expired cart.
- Restock on `return.received`.
- All movements logged in `inventory_movements`.

### Coupon logic
- Stack rules: one promotional code per order by default; free-shipping codes stack with one product discount only when admin explicitly allows.
- Codes can target categories, products, or the entire cart.
- Per-customer limit enforced via `discount_redemptions.user_id`.
- Codes are case-insensitive on lookup (`citext`).

### Review moderation
- Reviews start `pending`.
- Auto-publish if the customer has at least 1 prior delivered order with that variant AND text passes a profanity/spam filter (Phase 2; Phase 1 = always pending).
- Moderation queue in `/admin/reviews`.

### Manual admin interventions
- Edit order before `packed`: change quantity, change shipping address, change shipping method.
- After `shipped`: only add internal notes + initiate refund. The order line items become immutable.

### Audit logging
- See §10. Mandatory for: order status changes, refunds, role/permission changes, address/customer edits by staff, product publishing, discount creation.

### Staff permission boundaries
- `owner`: everything; cannot be removed.
- `manager`: catalog + orders + customers + discounts + reviews; cannot edit roles/permissions or remove other admins.
- `fulfillment`: orders + inventory read/write; product read only.
- `support`: customers + orders read; refunds within a configurable cap.

---

## 14. SEO & metadata planning

### Multilingual URLs
- `/ar/...` and `/en/...` always prefixed.
- Localized slugs per route (e.g. `/ar/منتج/<slug-ar>` ↔ `/en/products/<slug-en>`).
- One canonical per locale; cross-locale via hreflang.

### Title / meta structure
- Title template: `%s | ElaraBase` (EN) / `%s | إلارا بيس` (AR).
- Product titles: `<Product Name> — ElaraBase`.
- Category: `<Category> — Shop ElaraBase`.
- Descriptions: 120–155 chars; include 1 differentiator.

### Product schema markup
- `Product` JSON-LD: name (per locale), description, brand `ElaraBase`, sku, mpn, image array, offers (priceCurrency `SAR`, price, availability, url, priceValidUntil).
- `AggregateRating` when reviews ≥ 3.
- Reviews as `Review` items.

### Collection schema
- `ItemList` listing the products on category/collection pages.

### Open Graph
- Per-locale `<meta property="og:locale">` (`ar_SA` / `en_SA`).
- `og:image` 1200×630 with brand wordmark + product photo, generated per page (a static `og-image` route can render dynamic OG).

### Canonical rules
- One canonical per page per locale (no cross-locale canonicals).
- Search results, sort/filter combinations: `noindex` to avoid duplicate content.
- Faceted URLs use rel="canonical" to the base category URL.

### Index / noindex rules
- Indexed: `/`, `/shop`, `/categories/*`, `/collections/*`, `/products/*`, `/about`, `/contact`, `/faq`, policy pages.
- Noindex: `/cart`, `/checkout`, `/checkout/success`, all `/account/*`, all `/admin/*`, search results, password reset, OTP placeholder.

### Internal linking
- Breadcrumbs everywhere except home.
- Related products + "Complete the look" on PDP.
- Categories nav in mega menu.
- Editorial articles link out to relevant products.

### Image alt text
- AR alt: `<اللون> <الاسم> <الفئة> — إلارا بيس`.
- EN alt: `<Color> <Name> <Category> — ElaraBase`.
- Decorative images: empty alt (`alt=""`), never invented descriptions.
- Editorial photos: human-written, sentence-long alt that describes the scene.

---

## 15. Performance & quality requirements

### Mobile performance targets
- **LCP** ≤ 2.0 s on a Moto G4-class device on 4G (KSA reference).
- **INP** ≤ 200 ms.
- **CLS** < 0.05. Reserved heights for hero, images via `next/image`.

### Image optimization
- `next/image` with AVIF + WebP; `sizes` explicitly set per breakpoint.
- Largest image weighs ≤ 90 KB at the rendered breakpoint.
- Hero image preloaded (`priority`).

### Lazy loading
- Below-the-fold images lazy by default.
- Heavy interactive widgets (rich-text editor, payment SDK iframe) are dynamically imported.

### Caching
- Static pages: ISR with on-demand revalidation triggered by admin publish.
- Product list cached on the edge; PDP cached per variant for 60 s, revalidated on inventory write.
- API: short Cache-Control for catalog reads, no-store for cart/account/admin.

### Route loading behavior
- Use Next.js route-level `loading.tsx` with skeletons for slow segments (catalog, search).
- Never block first paint on non-essential data (reviews, related products).

### Skeleton states
- Skeleton mirrors final layout's dimensions; no spinners that move while the page measures.

### Empty states
- See §11 — every list/grid has a custom empty state.

### Accessibility
- WCAG 2.2 AA at minimum.
- All interactive controls reachable by keyboard.
- Focus order matches visual order in both LTR and RTL.
- ARIA: labels on icon-only buttons, `aria-live="polite"` for cart updates, `aria-current` for nav.

### Keyboard support
- ATC focusable, Enter submits.
- Mega menu and side cart use focus trapping.
- Esc closes overlays.

### Color contrast
- Body text ≥ 7:1 vs canvas (ink/canvas passes AAA).
- Muted text ≥ 4.5:1 vs surface.
- Accent on canvas verified manually for AA in both states.

### Responsive behavior
- Mobile-first; explicit breakpoints `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440`.
- No horizontal scroll on any viewport ≥ 320 px wide.

### QA checklist (excerpt)
- [ ] Layout looks identical in AR and EN with locale-swap test.
- [ ] No `pl-/pr-/ml-/mr-` utilities in component code.
- [ ] Skeletons match final layout dimensions.
- [ ] All forms recover entered data on validation error.
- [ ] Submit buttons disable while pending.
- [ ] Pages don't render translation keys (`common.actions.addToCart`) anywhere.
- [ ] All images have `width`/`height`.
- [ ] `lighthouse` score ≥ 90 on mobile for homepage + PDP.
- [ ] Real device tested on iPhone (Safari), Android Chrome, Galaxy A-series.

### Launch checklist
- [ ] DNS, SSL, HSTS preload.
- [ ] robots.txt + sitemap.xml.
- [ ] hreflang verified.
- [ ] Order email previews approved in both locales.
- [ ] Real card test transaction (sandbox + production) per payment provider.
- [ ] Tax/VAT receipt format approved with accounting.
- [ ] Backup + restore drill performed.
- [ ] Customer-care SOPs written.
- [ ] Owner can place a test order end-to-end on a real phone in Arabic.

---

## 16. Build roadmap

### Phase 1 — Storefront foundation (MVP)
**Must-have**
- Bilingual i18n pipeline (this doc's code deliverables).
- Public storefront: home, shop, category, collection, product, cart, checkout (card + COD), success, policy pages, contact.
- Account: signup, login, forgot/reset password, email verification, profile, addresses, orders list/detail, wishlist (server-backed), notifications preferences.
- Admin: products CRUD (bilingual), categories, collections, inventory, orders list/detail + state changes, customers list/detail, discounts, reviews moderation, settings (store/shipping/tax/payments), staff + RBAC, audit logs.
- Email transactional: signup verification, password reset, order confirmation, order shipped (template), return request.
- Payments: Moyasar (mada + Visa/MC + Apple Pay) + COD.
- Search: Postgres full-text + trigrams.
- Performance + SEO baseline.

**Optional**
- Editorial / Journal CMS section.
- Apple Pay sheet on PDP "Buy now".

**Risks**
- Bilingual content workflow drift — mitigated by admin enforcing both languages before publish.
- VAT receipt format — get accounting sign-off before launch.

**Dependencies**
- Payment provider sandbox approved.
- Real product photography (≥10 SKUs shot before launch).

### Phase 2 — Operational improvements
- Carrier integration (SMSA, Aramex) with auto status updates.
- SMS notifications (transactional only).
- Back-in-stock subscribers fully wired.
- Abandoned-cart email (24h, 72h).
- Internal analytics dashboard.
- Returns label printing.
- App-layer encryption for sensitive PII (`addresses.phone`).

### Phase 3 — OTP integration
- Plug into the `auth.authenticate` step-up flow.
- SMS OTP for: login when policy requires (e.g. new device), checkout for COD orders ≥ threshold, sensitive actions (change email, refund > cap for support staff).
- Email OTP fallback.
- `future_otp_events` table becomes active.
- Admin settings page becomes operational.

### Phase 4 — Growth features
- Multi-currency (AED, USD) using base SAR.
- Loyalty (points + tiers).
- Gift cards.
- Affiliate / referral program.
- Recommendation engine (catalog-based, no personal data dependency).
- Editorial CMS (Sanity or Payload).
- Dark mode.

---

## 17. Final output quality rules — recap

- Be **specific**: real tokens, real values, real names.
- Be **production-minded**: every choice must survive a code review.
- Be **structured**: same shape across docs.
- Be **implementation-ready**: pick robustness over shortcuts.

---

## Appendices

### A. Top mistakes to avoid when rebuilding
1. Using physical Tailwind utilities (`pl-`, `mr-`). Always logical.
2. Letting the admin publish a product with one language missing.
3. Caching `/cart`, `/checkout`, `/account/*` at the edge.
4. Storing card numbers anywhere — even masked. Use the provider's hosted fields.
5. Reading direction from the client (causes FOUC). Set `dir` server-side from `params.locale`.
6. Building "anti-enumeration" half-heartedly (different error copy or response time leaks signal).
7. Bolting on RTL after the fact. Build bilingual from day 1 (this doc).
8. Pretending COD has no fraud cost. Add a fee and a max-order cap.
9. Letting "loading.tsx" show a spinner over an empty page. Use skeletons.
10. Trusting client input. Re-validate on the server with Zod for every action.
11. One color accent rule violated. Don't.
12. Fake scarcity / fake timers. Don't.
13. Indexing search / filter / sort URLs. Set `noindex`.
14. Forgetting locale-aware OG images and hreflang.
15. Not modeling `inventory_movements`. You'll regret it the first time stock goes negative.

### B. Non-negotiable requirements
- Bilingual: full Arabic RTL parity; both languages required for product publish.
- KSA-compliant invoices with VAT 15% line and stored CR/VAT numbers.
- HTTPS everywhere; HSTS preload.
- Argon2id passwords; server-backed sessions.
- Real audit logs for admin actions.
- No PII in client-side localStorage beyond wishlist IDs.
- Anti-enumeration on all auth flows.
- WCAG 2.2 AA.
- LCP ≤ 2.0s on mobile.

### C. Recommended MVP scope
- Homepage, Shop, Category, Collection, Product, Cart, Checkout (card + COD), Success, Track-by-email, About, Contact, FAQ, Policies.
- Customer: signup, login, forgot, reset, verify, profile, addresses, orders list+detail, wishlist, notifications prefs, security (change password).
- Admin: products + variants + media + inventory, categories, collections, orders (with state machine + refunds), customers (read + lock), discounts, reviews moderation, settings (store + shipping + tax + payments), staff + roles, audit logs, email templates.
- Payments: Moyasar (mada/Visa/MC/Apple Pay) + COD.

### D. Recommended stack summary
- **Next.js 15 App Router · TypeScript strict · Tailwind v4 · next-intl · Prisma · PostgreSQL 16 · Argon2id + server sessions · Resend · S3-compatible storage · Moyasar · Inngest · Sentry · Vercel**

### E. Final architecture summary
A Next.js 15 + Tailwind v4 storefront with bilingual-by-construction routing through next-intl, backed by PostgreSQL via Prisma, with server-backed sessions and Argon2id password hashing. Catalog content is bilingual JSONB validated for completeness before publish. Payments are abstracted behind a provider interface (Moyasar in Phase 1). Inventory mutations are transactional with full movement audit. Admin actions audit-log to an append-only table with RBAC. Auth is designed with an explicit step-up extension point so OTP slots in during Phase 3 without changes to the rest of the system. Performance budgets, SEO, accessibility, and security expectations are codified above and enforced through CI and code review.
