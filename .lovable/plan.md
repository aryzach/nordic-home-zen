
## Plan: Refine /sauna-electrical-fit-consultation page

All changes are in `src/pages/ElectricChecklist.tsx`.

### 1. Typography cohesion
Standardize the page on the global heading scale (h1/h2/h3 from `tailwind.config.ts`) and remove ad-hoc `text-4xl/5xl`, `text-3xl/4xl`, `text-2xl`, `text-xl`, `text-lg` overrides.

- H1 "Electrical Compatibility Consultation" → rely on default h1 (drop `text-4xl md:text-5xl`).
- All section H2s ("What's Covered", "How It Works", "Pricing", "Common Outcomes", "Ready to see what's possible?") → rely on default h2 (drop `text-3xl md:text-4xl`).
- Card titles ("$109 consultation fee", "Consultation Fee: $109", step titles, covered titles) → use h3 default (drop `text-xl`, `text-2xl`).
- Body paragraphs → single size using default `p` (18px). Drop `text-xl`, `text-lg` variants on intro/subhead.

### 2. Copy changes
- Subhead under H1:
  - From: "In a 30-minute video consultation, we'll review your goals, assess your space and electrical setup, and walk through the sauna options available to you."
  - To: "In a 30-minute video consultation, we'll review your goals, assess your space and electrical setup, and walk through sauna options that are compatible with your space and sauna dreams."
- Consultation-fee card body (hero) AND pricing-section body:
  - From: "If you move forward with a sauna purchase or rental, the full consultation fee is credited toward your order."
  - To: "If you decide on purchasing the Anywhere Sauna, the full consultation fee is credited toward your order."
- Step 2 body:
  - From: "FaceTime, Zoom, or Google Meet."
  - To: "Joining the call on FaceTime or Google Meet on your phone is preferred, as we'll be moving around your home."

### 3. Layout/spacing
- Center the hero CTA: wrap `<BookButton>` in a centered container (e.g. `flex justify-center`) and drop `w-full md:w-auto`.
- Reduce space below hero CTA: change hero section padding from `py-16 md:py-24` to `pt-16 md:pt-24 pb-8 md:pb-10`.
- Reduce space above "What's Covered": change that section padding from `py-16` to `pt-8 md:pt-10 pb-16`.
- Reduce space below "The goal is clarity…": change Common Outcomes section padding from `py-16` to `pt-16 pb-8 md:pb-10`.
- Reduce space above "Ready to see what's possible?": change final CTA section from `py-16 md:py-24` to `pt-8 md:pt-10 pb-16 md:pb-24`.

### 4. Content removal
- Remove "Ready to rent a sauna immediately" from the `outcomes` array (keep the other 4).

### Out of scope
No changes to other pages, routes, nav, or components.
