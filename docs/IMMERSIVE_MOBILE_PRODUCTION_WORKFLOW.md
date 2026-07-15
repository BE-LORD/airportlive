# AirportLive Immersive Mobile Production Workflow

Purpose: a practical workflow for turning the current AirportLive site into a mobile-first immersive, premium, 3D interactive experience without breaking speed, SEO, booking conversion, or maintainability.

This is the build plan after the media strategy in `docs/IMMERSIVE_MOBILE_MEDIA_PLAN.md`.

## Core Principle

Do not add effects first. Build the experience in layers:

1. Real proof media
2. Fast responsive delivery
3. Motion system
4. Scroll story
5. 3D interaction
6. SEO and conversion validation

The site should feel expensive because it is clear, fast, useful, and cinematic. Not because every section is overloaded.

## Current Starting Point

Current homepage order:

1. Header
2. Hero
3. TrustStrip
4. Services
5. RouteCorridor
6. FleetShowcase
7. BookingFlow
8. WhyChooseUs
9. Gallery
10. Testimonials
11. FAQ
12. InquirySection
13. Footer

Useful existing files:
- `src/components/sections/Hero.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/RouteCorridor.tsx`
- `src/components/sections/FleetShowcase.tsx`
- `src/components/sections/JourneyScrub.tsx`
- `src/components/sections/Gallery.tsx`
- `src/components/effects/VideoScrub.tsx`
- `src/components/effects/RouteVisualization3D.tsx`
- `src/hooks/useDeviceTier.ts`
- `src/hooks/useMediaPerformance.ts`
- `src/lib/three/feature-gating.ts`

## Target Experience

Mobile users should land on the page and feel:

1. "This is premium."
2. "This looks real."
3. "They handle airport rides professionally."
4. "I can book quickly."
5. "The route and vehicle are clear."

Every media decision must support one of those feelings.

## Phase 0: Asset Audit And Cleanup

Goal: know every current asset dependency before adding new media.

Tasks:
- Create a central media inventory file.
- List every remote Unsplash URL.
- Decide which assets stay temporary and which must be replaced.
- Move final media into `public/media`.
- Add naming rules.

Recommended folder structure:

```txt
public/
  media/
    hero/
      airportlive-mobile-hero-loop.mp4
      airportlive-mobile-hero-poster.webp
      airportlive-desktop-hero-poster.webp
    fleet/
      innova-crysta-exterior.webp
      innova-crysta-interior.webp
      sedan-exterior.webp
      suv-exterior.webp
      tempo-traveller-exterior.webp
      luxury-executive.webp
    routes/
      ludhiana-delhi-airport-poster.webp
      chandigarh-delhi-airport-poster.webp
      jalandhar-delhi-airport-poster.webp
      ludhiana-delhi-mobile-loop.mp4
    proof/
      driver-portrait.webp
      luggage-loading.webp
      airport-pickup.webp
      family-travel.webp
    gallery/
      visual-proof-01.webp
      visual-proof-02.webp
      visual-proof-03.webp
      airport-pickup-tile.mp4
```

Acceptance checklist:
- No final section depends on remote stock images.
- Every image has mobile dimensions.
- Every video has poster fallback.
- Every file has meaningful name.

## Phase 1: Media System Foundation

Goal: create reusable media components before replacing section media.

Build components:

### `ResponsiveImage`

Purpose:
- local images
- known dimensions
- alt text
- loading priority control
- mobile/desktop source support

Props:
- `src`
- `mobileSrc`
- `alt`
- `priority`
- `className`
- `sizes`

### `AmbientVideo`

Purpose:
- muted background video
- poster-first render
- lazy load
- reduced-motion fallback
- low-device fallback

Props:
- `src`
- `poster`
- `mobileSrc`
- `mobilePoster`
- `className`
- `priority`
- `disableOnLowTier`

Rules:
- Always `muted`
- Always `playsInline`
- Usually `loop`
- No autoplay until allowed by device and viewport
- Hide video if `prefers-reduced-motion`

### `ScrollScrubVideo`

Purpose:
- upgrade current `VideoScrub`
- use only in story sections

Requirements:
- poster fallback
- lazy metadata load
- no blocking main thread
- touch-friendly scroll length

### `DeviceMediaGate`

Purpose:
- decide image vs video vs 3D

Inputs:
- device tier
- reduced motion
- network quality if available
- battery/data saver if available

Outputs:
- `canUseVideo`
- `canUse3D`
- `canUseScrollScrub`

Acceptance checklist:
- Low-end mobile gets images, not 3D.
- Reduced motion users get static media.
- Hero text and booking form render before video starts.

## Phase 2: Hero Upgrade

Goal: replace stock hero image with cinematic mobile-first proof.

Implementation:
- Replace current `next/image` stock hero background in `Hero.tsx`.
- Use `AmbientVideo` for mobile-capable devices.
- Use poster image as immediate background.
- Keep existing overlay, headline, CTA, trust row, and quote form.

Hero visual direction:
- 9:16 video
- premium car, driver, luggage, airport or highway
- darker left/top area for readable text
- no fast cuts
- no distracting camera shake

Mobile layout rules:
- Booking form must stay usable.
- CTA buttons must remain above fold where possible.
- Do not place bright video detail behind small text.
- Text contrast must pass.

Acceptance checklist:
- Mobile first paint shows poster and text.
- Video starts smoothly after paint.
- No layout shift.
- No horizontal overflow.
- Booking form still works.
- Lighthouse SEO remains 100.

## Phase 3: Services Bento Upgrade

Goal: make services feel cinematic without making the page heavy.

Implementation:
- Keep six-card bento.
- Replace stock URLs with local proof media.
- Only `Airport Pickup & Drop` gets video.
- Other cards use optimized images.

Suggested mapping:
- Airport Pickup & Drop: `airport-pickup-loop.mp4`
- Outstation Taxi: `punjab-highway.webp`
- Corporate Travel: `executive-pickup.webp`
- Family Tours: `family-luggage.webp`
- Event Transport: `event-fleet.webp`
- Local City Rides: `city-premium-cab.webp`

Interaction:
- On mobile, cards should reveal content without hover dependency.
- Tap should navigate, not require hover.
- Keep card height stable.

Acceptance checklist:
- All cards load poster/images lazily except first visible card.
- Text remains readable.
- No video plays before viewport.
- Mobile tap target is clear.

## Phase 4: Journey Story Section

Goal: add an immersive scroll bridge between services and routes.

Recommended insertion point:
- After `Services`
- Before `RouteCorridor`

Use existing:
- `src/components/sections/JourneyScrub.tsx`
- `src/components/effects/VideoScrub.tsx`

Story beats:

1. Pickup confirmed
   - Visual: phone confirmation / driver ready

2. Luggage handled
   - Visual: luggage loaded into clean vehicle

3. Calm highway cabin
   - Visual: interior, seat comfort, road passing

4. Airport arrival
   - Visual: terminal drop, car door, luggage out

Mobile behavior:
- Avoid extremely long pinned sections.
- Use 4 short panels or one scroll-scrub video.
- Provide static fallback for low-tier devices.

Best build option:
- Start with image-based scroll story.
- Upgrade to video scrub after assets are ready.

Acceptance checklist:
- No scroll trap feeling on mobile.
- Section can be skipped naturally.
- Reduced-motion fallback shows stacked story cards.
- Scroll performance stays smooth.

## Phase 5: Route Corridor 3D Upgrade

Goal: make route selection feel premium and spatial.

Use existing:
- `src/components/effects/RouteVisualization3D.tsx`

Recommended implementation:
- Add a route stage above or inside `RouteCorridor`.
- Animate route line based on scroll progress.
- Show city markers:
  - Ludhiana
  - Chandigarh
  - Jalandhar
  - Patiala
  - Delhi Airport
  - Chandigarh Airport

Mobile 3D behavior:
- Use 3D only for high-tier devices.
- Mid-tier gets SVG/canvas route line.
- Low-tier gets static route card with poster image.

Interaction:
- User swipes or scrolls through routes.
- Route line changes based on selected route.
- CTA remains easy: "Request Fare Quote".

Acceptance checklist:
- Route section still works with 3D disabled.
- WebGL failure does not break page.
- No blank canvas.
- No long main-thread stalls.
- Every route CTA works.

## Phase 6: Fleet Showcase Upgrade

Goal: show real cars and make vehicle selection tactile.

Implementation:
- Replace gradient placeholders in `FleetShowcase.tsx` with local vehicle images.
- Add image carousel or media stack per vehicle.
- Add a full-screen mobile detail sheet for expanded vehicle view.

Best first flagship:
- Innova Crysta

Innova detail experience:
- Exterior image
- Interior image
- Luggage image
- Optional 4-second comfort loop
- Seat/luggage specs
- Sticky WhatsApp CTA

Future 3D:
- Add lightweight stylized vehicle orbit only after real images are in place.
- Do not start with photorealistic heavy 3D.

Acceptance checklist:
- Swipe remains smooth.
- Cards do not jump height.
- Images do not crop important vehicle details.
- WhatsApp CTA remains visible.

## Phase 7: Visual Proof Gallery

Goal: turn gallery into trust proof, not decoration.

Implementation:
- Rename mental model from "Visual Stories" to "Visual Proof".
- Use real photos.
- Add labels:
  - Clean interiors
  - Airport pickup
  - Luggage space
  - Professional driver
  - Family travel
  - Group transport

Media mix:
- 5 image tiles
- 1 video tile max

Acceptance checklist:
- No stock-looking images.
- Every image has useful alt text.
- Gallery loads below fold only.
- Video tile has poster.

## Phase 8: Trust And Conversion Polish

Goal: keep premium experience from hurting booking.

Areas:
- Hero form
- BookingFlow
- Mobile sticky CTA
- WhatsApp links
- Contact page

Rules:
- No heavy media inside form.
- Use tiny vehicle thumbnails only.
- Show route summary clearly.
- Keep buttons large enough for thumbs.
- Keep WhatsApp CTA persistent but not intrusive.

Acceptance checklist:
- Form works on 360px width.
- User can complete quote flow without scrolling confusion.
- Buttons do not overlap bottom browser UI.
- WhatsApp messages include route/vehicle/time details.

## Phase 9: SEO Media Layer

Goal: make media help ranking and preview quality.

Tasks:
- Add route-specific OpenGraph images.
- Add image alt text for every proof image.
- Add `VideoObject` schema only for real branded videos.
- Add `ImageObject` where useful for primary service pages.
- Keep all important page copy in HTML.
- Generate sitemap stays clean.

OpenGraph targets:
- Home: hero poster
- Airport taxi: airport pickup poster
- Fleet: fleet lineup poster
- Route pages: route-specific poster

Acceptance checklist:
- Lighthouse SEO 100.
- Canonical URLs are correct.
- No duplicate titles.
- OG image resolves.
- Meta descriptions remain unique.

## Phase 10: QA Workflow

Run this after every immersive phase.

### Mobile Visual QA

Viewports:
- 360 x 740
- 390 x 844
- 414 x 896
- 430 x 932

Checks:
- No horizontal overflow.
- No text clipped.
- No button overlap.
- Video does not hide text.
- Header/menu works.
- Sticky CTA works.
- Booking flow works.
- Gallery does not jank.
- Route 3D fallback works.

### Performance QA

Commands:

```powershell
npm run build
npm exec lighthouse -- https://airportlive.in/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$env:TEMP\airportlive-lighthouse.json" --chrome-flags="--headless --no-sandbox"
```

Targets:
- SEO: 100
- Accessibility: 95+
- Best Practices: 95+
- Performance: optimize by device, but never ignore regressions

Core Web Vitals targets:
- LCP under 2.5s on good mobile connection
- CLS under 0.1
- INP under 200ms

### Interaction QA

Test:
- Hero WhatsApp CTA
- Hero call CTA
- Quote form all 4 steps
- Fleet choose buttons
- Route fare quote buttons
- Mobile menu open/close
- Contact form if present

### Media Failure QA

Simulate:
- Video fails
- Image fails
- WebGL not supported
- Reduced motion
- Low-tier device

Expected:
- Poster appears
- Static image appears
- Text remains readable
- CTA remains usable

## Implementation Order

Best order for productivity:

1. Build media components
2. Add real hero poster/video
3. Replace service and gallery stock images
4. Replace fleet gradients with real images
5. Add JourneyScrub visual story
6. Add RouteVisualization3D fallback-safe
7. Add fleet detail sheet
8. Add route page media variants
9. Add SEO media schema
10. Full mobile QA and polish

## Branching Workflow

Recommended branches:

```txt
codex/media-system
codex/hero-video-upgrade
codex/fleet-proof-media
codex/journey-scroll-story
codex/route-3d-experience
codex/mobile-immersive-polish
```

Each branch should:
- build successfully
- pass mobile smoke test
- avoid unrelated refactors
- include before/after screenshots

## Asset Production Workflow

### Step 1: Script The Shots

Write 1-line purpose for every asset.

Example:
- Hero video: "Show premium AirportLive ride from booking confidence to car readiness."
- Innova image: "Prove spacious premium family airport transfer."

### Step 2: Shoot Mobile First

Use:
- vertical 9:16 for hero and story
- horizontal 16:9 for page hero fallback
- square 1:1 for gallery
- 4:5 for vehicle cards

### Step 3: Edit For UI

Rules:
- Leave negative space for text.
- Avoid bright detail behind white text.
- Avoid fast cuts.
- Keep motion smooth.
- Color grade consistent with black, platinum, muted blue, warm gold.

### Step 4: Export

Images:
- WebP or AVIF
- mobile width: 800 to 1200px
- desktop width: 1600 to 2200px

Video:
- MP4 H.264 for compatibility
- 720p mobile for background loops
- 1080p only when needed
- muted
- no audio track if possible

### Step 5: Compress

Target:
- hero mobile video under 1.5 MB
- service card video under 900 KB
- route loop under 1.2 MB
- gallery image under 100 KB
- hero poster under 180 KB

### Step 6: Add To Repo

Put files under:
- `public/media/...`

Do not keep final production assets as random root files.

### Step 7: Wire With Fallbacks

Every video:
- poster
- static fallback
- reduced-motion fallback
- low-device fallback

Every image:
- alt text
- dimensions or stable aspect ratio
- lazy loading unless above fold

## Developer Implementation Notes

### Hero

Replace the current `Image` background block with:
- poster image layer
- `AmbientVideo` layer when allowed
- overlay layer
- existing content unchanged

### Services

Change `SERVICES.image` to:

```ts
media: {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}
```

### Fleet

Change `visual` placeholder to:

```ts
media: {
  exterior: string;
  interior?: string;
  luggage?: string;
  video?: string;
  poster?: string;
}
```

### Routes

Change route data to support:

```ts
media: {
  poster: string;
  video?: string;
  points?: Array<{ label: string; position: [number, number, number] }>;
}
```

### Gallery

Change `GALLERY_IMAGES` to `GALLERY_ITEMS`:

```ts
{
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  label: string;
}
```

## Risk Register

### Risk: Site becomes slow

Prevention:
- poster-first video
- lazy load below fold
- device tier gating
- compress aggressively

### Risk: 3D breaks mobile

Prevention:
- dynamic import
- feature detection
- SVG fallback
- never block route content

### Risk: Visuals hurt conversion

Prevention:
- keep booking form simple
- keep CTAs visible
- test tap paths after each phase

### Risk: Stock visuals reduce trust

Prevention:
- replace with real AirportLive proof media
- use stock only as temporary placeholders

### Risk: SEO drops

Prevention:
- keep text in HTML
- maintain canonical/meta
- test Lighthouse SEO
- add alt text and OG images

## Definition Of Done

The immersive version is done when:

- Mobile homepage feels cinematic within first 3 seconds.
- Hero has real branded media.
- Fleet has real vehicle proof.
- Route section has interactive route storytelling or polished fallback.
- Booking remains fast and easy.
- No mobile horizontal overflow.
- No console errors.
- No failed media requests.
- SEO score remains 100.
- Performance remains acceptable on real mobile constraints.
- Reduced motion and low-tier devices still get a complete experience.

## Final Recommendation

Build the immersive site in this order:

1. Real media proof
2. Hero video
3. Fleet images
4. Journey story
5. Route 3D
6. Fleet detail interaction
7. SEO media polish
8. Full mobile QA

The biggest visual win will come from replacing generic stock with real AirportLive cinematic proof. The biggest "agency-level" win will come from a controlled hero video plus a 3D route corridor. The biggest business win will come from keeping booking simple while the site around it feels premium.

