# Electrical Compatibility Quiz

## Overview
Create a multi-step quiz at `/electrical-compatibility-quiz` that helps visitors check if their home can support the Anywhere Sauna, with photo/video upload submission via Web3Forms. Update the homepage CTA to link here. Add a success page.

## Routes
- `/electrical-compatibility-quiz` — quiz flow (single page, internal step state)
- `/electrical-assessment-submitted` — post-submit success page

## Files to create
1. **`src/pages/ElectricalCompatibilityQuiz.tsx`** — full quiz UI (steps 1–4)
2. **`src/pages/ElectricalAssessmentSubmitted.tsx`** — success page (step 5)
3. **`src/assets/outlet-3prong.jpg`** — generated photo of a standard NA 3-prong outlet (Step 2)
4. **`public/panel-example.jpg`** — copy of the uploaded electrical panel image (Step 3)

## Files to edit
- **`src/components/Hero.tsx`** — change the secondary outline CTA to **"Take the Electrical Compatibility Quiz"** linking to `/electrical-compatibility-quiz`, keep the existing outlined pill styling, **remove** the "Consultation fee is credited…" subtext below it.
- **`src/App.tsx`** — register the two new routes.
- **`src/lib/seoData.ts`** — SEO entries for both new pages.
- **`src/routes.ts`**, **`public/sitemap.xml`**, **`scripts/prerender.mjs`** — include `/electrical-compatibility-quiz` for prerender/sitemap (success page excluded from sitemap).

## Quiz flow / state
Single component with `step` state (1–5) + an `answers` object mirrored to `sessionStorage` so Back restores prior choices.

```
step 1: intro card → "Start Assessment"
step 2: Q1 — 3-prong outlet within 50 ft? [Yes | No | Not Sure]
   - Yes        → step 3
   - No/NotSure → inline result: "You May Still Have Options"
                  Primary: Book Consultation — $129 (calendar, new tab)
                  Secondary: Back to Assessment
step 3: Q2 — Is that outlet on a 20-amp circuit? [Yes | No | Not Sure]
   - Includes "Need Help Checking?" callout card with consultation CTA
   - Yes        → step 4
   - No/NotSure → inline result: "Let's Take a Closer Look"
                  Primary: Book Consultation
                  Secondary: Back to Assessment
step 4: contact info + Web3Forms Advanced File Upload → submit
step 5: success page at /electrical-assessment-submitted
```

Each step: progress bar (`step/4`), back arrow (except step 1), branded heading, large pill buttons.

## Web3Forms (Step 4)
- Access key: `02180c68-7a47-43d5-9a5a-38b9e1d73d59`
- Inject `https://web3forms.com/client/script.js` once via `useEffect`.
- `<form action="https://api.web3forms.com/submit" method="POST">` — **no** `enctype="multipart/form-data"` (Advanced Upload handles files separately).
- Hidden inputs: `access_key`, `subject` ("New Electrical Compatibility Assessment"), `from_name`, `redirect` = absolute URL to `/electrical-assessment-submitted`, plus hidden `question_1_answer`, `question_2_answer`, `submitted_at` (set on submit).
- Visible required fields: First Name, Last Name, Email, Phone.
- File input:
  `<input type="file" name="attachments" multiple accept="image/*,video/*" data-advanced="true" data-max-files="10" data-max-file-size="25MB" />`
- Helper list of the 3 required photos + optional walkthrough video.

## Success page
Header/Footer, centered card with green check:
- Headline + body per spec.
- Primary CTA: "Book Electrical Compatibility Consultation" → calendar link.
- Secondary CTA: "Explore Anywhere Sauna" → `/`.
- Tertiary text link: "View FAQ" → `/#faq`.

## Design
- Tokens only: Cedar accent, soft sand bg, Clash Grotesk headings, Inter body (≤600 weight).
- Cards: `bg-card border border-border rounded-2xl p-6 md:p-10 max-w-xl mx-auto`.
- Progress: thin `h-1.5` track, `bg-accent` fill, animated width.
- Answer buttons: full-width pill `h-14`; Yes = accent-filled, No/Not Sure = outlined.
- Use `CheckCircle2` (lucide) green check icons for reassurance bullets.

## Calendar link
`https://calendar.app.google/Q9nw6fTEBMnyNbDf8` used for every "Book Consultation" CTA in the quiz and success page (new tab, `rel="noopener noreferrer"`).
