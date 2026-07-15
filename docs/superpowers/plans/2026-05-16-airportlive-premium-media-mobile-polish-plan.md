# AirportLive Premium Media Mobile Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make AirportLive.in compact, premium, real-fleet-based, stock-image-free, mobile-safe, and fully QA-ready.

**Architecture:** Centralize all approved media in `src/data/airportlive-media.ts`, render it through `ResponsiveImage`, and keep page/section components thin. Fix visual issues by section, with screenshot-driven QA at 320-430px mobile and desktop widths.

**Tech Stack:** Next.js App Router, React, Tailwind utilities, `next/image`, Framer Motion, Vitest, ESLint, in-app Browser QA.

---

## Evidence Summary

- Screenshot 1: Contact hero uses generic steering/driver stock-style visual, headline split looks awkward, no direct CTA visible above fold.
- Screenshot 2: Luxury / Executive fleet card is a blank gradient card, no real vehicle proof, and WhatsApp floating button overlaps content/CTA area.
- Screenshot 3: Fleet hero uses a generic blue BMW-style image, not AirportLive/V3 proof.
- Screenshot 4: Airport Taxi mobile hero uses a generic vintage/foreign-looking car image and huge text over the vehicle.
- Screenshot 5: Preloader/intro looks nearly blank; brand is too dark and oversized.
- Screenshot 6: Final CTA text is clipped on mobile; heading and paragraph exceed viewport/container.
- Screenshot 7: Gallery mobile grid is too tight; labels are squeezed at the bottom.
- Screenshot 8: Why Choose Us cards are cramped; description text is hidden/cut on mobile.
- Screenshot 9: Routes CTA area is too close to the bottom/mobile sticky zone.
- Screenshot 10: Journey Proof layout has strong image proof but needs controlled spacing so it does not feel like a disconnected oversized card.

## Blocking Input

- The requested car/fleet ZIP was not found in the message or likely local folders (`airportlive`, Desktop root, Downloads, Screenshots). Before implementation, place the ZIP in the repo root or provide the exact path.
- Until ZIP assets are reviewed, use only existing approved `public/media/**/*.webp` assets and reject weak/generic images.

## File Map

- Modify: `src/data/airportlive-media.ts` central media registry.
- Modify: `src/components/media/ResponsiveImage.tsx` image wrapper.
- Create/Modify: `src/components/routes/RouteCard.tsx` compact route cards.
- Modify: `src/components/sections/RouteCorridor.tsx` route media usage and homepage compact layout.
- Modify: `src/components/sections/FleetShowcase.tsx` carousel and Luxury special request.
- Modify: `src/components/sections/Gallery.tsx` mobile grid/labels.
- Modify: `src/components/sections/WhyChooseUs.tsx` mobile columns/descriptions.
- Modify: `src/components/sections/InquirySection.tsx` final CTA clipping.
- Modify: `src/components/sections/Hero.tsx` booking form labels/helper.
- Modify: `src/components/layout/Header.tsx` mobile header safety.
- Modify: `src/app/fleet/page.tsx`, `src/app/contact/page.tsx`, `src/app/airport-taxi/page.tsx`, `src/app/[slug]/page.tsx` local heroes.
- Modify: `next.config.ts` remove Unsplash once no active code uses it.
- Add docs: `docs/AIRPORTLIVE_FINAL_QA_TODO.md`, `docs/AIRPORTLIVE_IMAGE_ASSIGNMENT_MAP.md`, `_assets-review/README.md`.

---

## Phase 0: Asset Intake And Audit

- [ ] Put the uploaded ZIP in the repo root or provide its absolute path.
- [ ] Extract into `_assets-review/raw/`.
- [ ] Create buckets:
  - `_assets-review/use-now/`
  - `_assets-review/use-after-crop/`
  - `_assets-review/background-only/`
  - `_assets-review/reject/`
- [ ] Sort images by rules:
  - Use now: real car/fleet, AirportLive/V3 proof, clean composition, no blur, no weird AI artifacts.
  - Use after crop: good image but needs plate blur, mobile crop, contrast, or overlay.
  - Background only: mood is useful but proof is weak.
  - Reject: red bus, irrelevant stock vibe, wrong country/city, fake-looking AI, bad logo distortion, blurry/low-res.
- [ ] Save selected image list in `_assets-review/README.md`.
- [ ] Commit:

```bash
git add _assets-review
git commit -m "docs: audit airportlive fleet media assets"
```

## Phase 1: Media Registry Contract

- [ ] Add/verify tests in `src/data/airportlive-media.test.ts`:

```ts
expect(pageHeroMedia.airportTaxi.src).toBe("/media/pages/airportlive-airport-taxi-hero.webp");
expect(Object.keys(routeMedia)).toEqual([
  "ludhianaDelhiAirport",
  "chandigarhDelhiAirport",
  "jalandharDelhiAirport",
  "patialaDelhiAirport",
  "ludhianaChandigarhAirport",
]);
```

- [ ] Run red test:

```bash
npm test -- --run src/data/airportlive-media.test.ts
```

- [ ] Update `AirportLiveImage`:

```ts
export type AirportLiveImage = {
  src: string;
  mobileSrc?: string;
  alt: string;
  section: string;
  priority?: boolean;
  sizes: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
};
```

- [ ] Add `pageHeroMedia` for `airportTaxi`, `fleet`, `contact`.
- [ ] Add five `routeMedia` objects with local `/media/routes/airportlive-route-*.webp`.
- [ ] Keep only genuine `fleetMedia` vehicles; no fake XL6/luxury interiors.
- [ ] Run green test:

```bash
npm test -- --run src/data/airportlive-media.test.ts
```

## Phase 2: Responsive Image Wrapper

- [ ] Add/verify test in `src/components/media/ResponsiveImage.test.tsx`:

```tsx
<ResponsiveImage
  src="/media/fleet/airportlive-fleet-lineup.webp"
  mobileSrc="/media/fleet/airportlive-fleet-lineup-mobile.webp"
  alt="AirportLive premium fleet lineup"
  fill
  sizes="100vw"
  objectFit="contain"
  objectPosition="center center"
  mobileObjectPosition="center bottom"
/>
```

- [ ] Expected assertions:
  - output contains `object-contain`
  - output does not leak `mobileSrc`
  - output does not leak `mobileObjectPosition`
- [ ] Implement `objectFit?: "cover" | "contain"`.
- [ ] Ensure every `fill` parent has `relative` plus fixed height/aspect ratio.
- [ ] Run:

```bash
npm test -- --run src/components/media/ResponsiveImage.test.tsx
```

## Phase 3: Replace Stock Page Heroes

- [ ] In `src/app/fleet/page.tsx`, remove remote/CSS hero background and use:

```tsx
<ResponsiveImage {...pageHeroMedia.fleet} fill className="opacity-60" />
```

- [ ] In `src/app/contact/page.tsx`, use `pageHeroMedia.contact`, add direct CTA row:

```tsx
<a href={getWhatsAppLink("Hi V3 Tour & Travels, I need booking assistance.")}>WhatsApp Now</a>
<a href={getPhoneLink()}>Call 9888000510</a>
```

- [ ] In `src/app/airport-taxi/page.tsx`, use `pageHeroMedia.airportTaxi`, clamp the H1, and add trust pills.
- [ ] In `src/app/[slug]/page.tsx`, remove the stock hero and choose `airportTaxi` for route pages and `contact` for service pages.
- [ ] Verify:

```bash
rg "images\\.unsplash|bg-\\[url\\('https://images\\.unsplash" src next.config.ts
```

Expected: no active app refs.

## Phase 4: Route Section Rebuild

- [x] Create `src/components/routes/RouteCard.tsx` with route image, tag, route title, desc, time, distance, quote CTA.
- [x] Export typed `ROUTES` and `Route` from `RouteCorridor.tsx`.
- [x] Add `mediaKey` to every route.
- [x] Homepage compact variant: show max 4 image cards plus "See all routes".
- [x] `/routes` desktop: immersive rows may stay, but must use route images.
- [x] `/routes` mobile: use `RouteCard` grid.
- [x] Add route test:

```ts
expect(html).toContain("data-route-corridor-variant=\"compact\"");
expect(html).toContain("airportlive-route-ludhiana-delhi");
expect(html).toContain("See all routes");
```

- [x] Run:

```bash
npm test -- --run src/components/sections/RouteCorridor.test.tsx
```

## Phase 5: Fleet Fix

- [x] In `FleetShowcase.tsx`, set carousel slide:
```tsx
slideClassName="flex-[0_0_86vw] sm:flex-[0_0_420px] lg:flex-[0_0_420px]"
```

- [x] Set card image height:
```tsx
className="relative h-[190px] overflow-hidden md:h-[260px]"
```

- [x] Add CTA clearance:
```tsx
className="px-5 pb-24 md:px-7 md:pb-7"
```

- [x] Remove Luxury / Executive from image carousel unless a real Fortuner/Mercedes/Fortuner-equivalent image exists.
- [x] Add special-request CTA card after carousel.

## Phase 6: Mobile Clipping Fixes

- [x] `InquirySection.tsx`: clamp heading and reduce paragraph spacing.
- [x] `Gallery.tsx`: mobile `grid-cols-2`, label `text-[9px] leading-tight tracking-[0.12em]`.
- [x] `WhyChooseUs.tsx`: `grid-cols-1 sm:grid-cols-2`, keep `line-clamp-2` descriptions visible.
- [x] `Header.tsx`: mobile menu contrast `bg-[#0A0A0A]/55`, logo `text-[1.45rem]`.
- [x] `MotionButton.tsx`: base `min-h-12`.
- [x] `Hero.tsx`: booking steps should read `Route`, `Date & Time`, `Vehicle`, `Contact`; date optional with helper text.

## Phase 7: Performance And Preload Rules

- [x] Only true above-fold hero image per page gets `priority/preload`.
- [x] Below-fold route/fleet/gallery images stay lazy.
- [x] If console warns about route/fleet images as LCP after direct anchor/scroll loads, do not blindly set all to eager; inspect whether route page mobile starts with route cards above fold.
- [x] Consider rendering desktop immersive route rows only on `md+` with CSS and defer mobile duplicates where possible.
- [x] Remove Unsplash from `next.config.ts` remote patterns and CSP only after code scan is clean.

## Phase 8: QA Matrix

- [x] Run unit tests:

```bash
npm test -- --run
```

- [x] Run lint:

```bash
npm run lint
```

- [x] Run build:

```bash
npm run build
```

- [x] Browser QA at:
  - `320x700`
  - `360x800`
  - `375x812`
  - `390x844`
  - `414x896`
  - `430x932`
  - `768x1024`
  - `1024x768`
  - `1440x900`
  - `1920x1080`
- [x] Required pass criteria:
  - no horizontal overflow
  - no broken images
  - no active Unsplash refs
  - mobile menu opens/closes
  - booking form moves Route -> Date & Time
  - route cards show images
  - gallery is 2 columns on mobile
  - Why Choose Us is 1 column on smallest phones
  - final CTA text is not clipped
  - floating WhatsApp/mobile sticky CTA does not cover important CTAs

## Phase 9: Commit Sequence

- [x] Commit media registry and image wrapper:

```bash
git add src/data/airportlive-media.ts src/data/airportlive-media.test.ts src/components/media/ResponsiveImage.tsx src/components/media/ResponsiveImage.test.tsx
git commit -m "feat: centralize airportlive media registry"
```

- [x] Commit page hero replacements:

```bash
git add src/app/fleet/page.tsx src/app/contact/page.tsx src/app/airport-taxi/page.tsx src/app/[slug]/page.tsx next.config.ts public/media/pages
git commit -m "fix: replace stock page heroes with local airportlive media"
```

- [x] Commit route rebuild:

```bash
git add src/components/routes/RouteCard.tsx src/components/sections/RouteCorridor.tsx public/media/routes
git commit -m "feat: add image-backed route cards"
```

- [x] Commit mobile polish:

```bash
git add src/components/sections/FleetShowcase.tsx src/components/sections/Gallery.tsx src/components/sections/WhyChooseUs.tsx src/components/sections/InquirySection.tsx src/components/layout/Header.tsx src/components/motion/MotionButton.tsx src/components/sections/Hero.tsx
git commit -m "fix: polish mobile clipping and CTA spacing"
```

## Final Acceptance

- [x] No stock/Unsplash hero image remains.
- [x] Only selected strong real fleet images are used.
- [x] Weak/irrelevant images are documented as rejected.
- [x] Route cards use images everywhere.
- [x] Luxury / Executive is either real-image-backed or special request only.
- [x] No mobile text clipping.
- [x] No CTA overlap by WhatsApp/sticky controls.
- [x] Tests, lint, and build pass.
- [x] Browser QA screenshots/metrics are recorded in a QA doc.
