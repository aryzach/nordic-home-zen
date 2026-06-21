## Goal

Turn `/specs` into a premium ecommerce product page styled like NorthUp Core — clean, restrained typography, conversion-focused, Shopify-feel. Keep all existing spec content and organization untouched; only restyle it and wrap it inside a fuller product-page layout.

## Page structure (top to bottom)

1. **Product hero** — two-column desktop, stacked mobile
   - Left: large primary product image + thumbnail strip (reusing the 3 `about-sauna-*.jpeg` photos + outlet image already on the page). Active thumbnail outlined.
   - Right (sticky on desktop): product title "Anywhere Sauna", price ($X, pulled from existing pricing if available — otherwise I'll ask), icon benefit list (4 short rows: standard outlet, 2-person, ~194°F, indoor/outdoor), two stacked black CTAs ("Reserve Yours" → reservation flow, "Book Free Electrical Consultation" → consult flow), and a single FAQ-style accordion row ("Will this work in my home?") that links to the FAQ page.
   - 60–80px gap between columns.

2. **Feature sections** (2–3 large image + text rows, alternating)
   - "Works on a standard outlet" — eyebrow + heading + 2 short paragraphs + inline CTA.
   - "Built for indoor or outdoor use" — image right, text left.
   - "Real steam, not infrared" — image left, text right.
   - Source images from existing assets; no new generation.

3. **Specs section** — existing `AboutTheSauna` spec data (Overview + 7 More Specs groups) preserved verbatim. Only the visual styling changes:
   - Montserrat throughout, labels 14px/700, values 14px/400, color `#1c1d1d`.
   - Section heading 28px desktop / ~22px mobile, weight 700, line-height 1.2.
   - Alternating light gray (`#f5f5f5`) row backgrounds, borders `#e8e8e1`, near-0 radius, no shadows, no colored accent card.
   - Same grouped layout (Overview always visible, rest in an accordion as today).

4. **FAQ teaser** — 4–5 top questions in NorthUp-style accordion (plus icon left, bold question, subtle border rows, max-w ~960px), with a "See all FAQs" link to `/faq`.

5. **Final contact CTA** — simple beige (`#f3e2d0`) band with one heading + one black CTA.

## Design tokens applied locally to this page

- Font: Montserrat sans (already global).
- Body 14px / 400 / 1.6 / 0.025em / `#1c1d1d`.
- Headings 700 / 1.2 / 0 letter-spacing. Product title 22→28px. Section heads 22→28px.
- Eyebrows: uppercase, 12–13px, 700, 0.18em tracking.
- Buttons: full-width, `#111` bg, white text, square, 16px/700, 11×20 padding, 10px mb, subtle arrow shift on hover.
- Surfaces: `#fff` page, `#f5f5f5` alt rows, `#f3e2d0` accent band, `#e8e8e1` borders.
- Section padding: 60px desk / 40px mobile. Container max 1280px, 40/20px gutters.

## Files

- `src/pages/Specs.tsx` — rebuild as composition: `<ProductHero />`, `<ProductFeatures />`, `<AboutTheSauna />` (restyled), `<ProductFAQTeaser />`, `<ContactCTA />`.
- `src/components/product/ProductHero.tsx` — new.
- `src/components/product/ProductFeatures.tsx` — new.
- `src/components/product/ProductFAQTeaser.tsx` — new (reuses first 5 entries from existing FAQ data; I'll lift the array into a shared `src/data/faqs.ts`).
- `src/components/product/ContactCTA.tsx` — new.
- `src/components/AboutTheSauna.tsx` — restyle only (spec content untouched): replace card/accent classes with the new neutral/alt-row styling; keep Overview + More Specs accordion structure.
- `src/data/faqs.ts` — new shared FAQ data; `src/components/FAQ.tsx` updated to import from it (no behavior change).

No global CSS or Tailwind config changes — all styling stays scoped to this page so the rest of the site is unaffected.

## Open questions before I build

1. **Price** to show in the buy box — what number should I display, and should the primary CTA route to `/reservation-payment-or-schedule-call` (the existing reservation flow)?
2. **Hero gallery images** — OK to reuse the existing `about-sauna-1/2/3.jpeg` as the gallery, with the outlet photo as the 4th thumbnail? Or do you have a dedicated hero product photo you want as the primary image?
3. **Feature section images** — reuse existing assets from the home page (placement gallery, hero, etc.), or skip images and use a tighter text-led layout for now?
