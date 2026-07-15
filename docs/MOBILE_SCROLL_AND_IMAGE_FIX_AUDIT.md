# Mobile Scroll And Image Fix Audit

## Scope

Homepage mobile QA and targeted fixes for AirportLive.in / V3 Tour & Travels after image integration.

Primary viewports:

- 360 x 740
- 390 x 844
- 414 x 896
- 430 x 932

## Issues Found And Fixed

| Section | Viewport | Exact Symptom | Suspected CSS / Component Cause | Fix Applied | Status |
| --- | --- | --- | --- | --- | --- |
| JourneyStory | 360, 390, 414, 430 | Finger scrolling over the WhatsApp booking / journey cards could feel stuck or trapped. Diagonal mobile gestures were intercepted by the card row. | Mobile layout used a nested horizontal scroller: `flex`, `overflow-x-auto`, `snap-x`, `snap-start`, and `min-w-[82vw]`. | Replaced mobile carousel with normal document-flow grid: `grid grid-cols-1`, `overflow-visible`, `touch-pan-y`, `overscroll-auto`, `min-w-0`, full-width stacked cards. | Fixed |
| JourneyStory | 360, 390, 414, 430 | Journey cards were visually large for a mobile story section. | Mobile image frame used `aspect-[4/5]`, making cards taller than needed. | Mobile image frame changed to `aspect-[16/10]`; desktop keeps `md:aspect-[4/5]`. Cards now remain around 335-379px tall across target widths. | Fixed |
| JourneyStory | 360, 390, 414, 430 | Driver-assigned crop could sit too high on mobile. | `journeyMedia.driverAssigned.objectPosition` was `center center`. | Changed to `center bottom` per approved crop rules. | Fixed |
| Services | 360, 390, 414, 430 | Service descriptions depended on hover, so mobile users saw less context and some cards felt too dark/empty. | Description used `opacity-0 translate-y-4 group-hover:*`; tags were absolutely positioned for all viewports. | Descriptions are visible on mobile; hover reveal is limited to `md+`. Tags are in normal flow on mobile and absolute only at `md+`. | Fixed |
| Services | 360, 390, 414, 430 | Service images looked overly dark and some subjects were hard to read. | Image opacity and overlay were too aggressive on mobile. | Mobile image opacity increased and grayscale reduced; overlay middle stop lightened while desktop hover behavior remains. | Fixed |
| Hero | 360, 390, 414, 430 | Hero image subject was too hidden behind the dark overlay. | Mobile overlay and bottom gradient were too dark after image integration. | Reduced mobile overlay from heavier black to a softer dark treatment while keeping text readable. | Fixed |
| Fleet | 360, 390, 414, 430 | Fleet card CTA could sit behind the fixed mobile call/WhatsApp bar. | `MobileStickyCTA` only checked the first matching interactive zone with `querySelector`, so it never reached `#fleet`. | Sticky CTA now scans all interactive zones and hides over `#fleet`; fleet section also has extra mobile bottom padding. | Fixed |
| Fleet | 360, 390, 414, 430 | Vehicle cards felt tall on mobile. | Fleet media frame was fixed at 260px on all viewports. | Mobile frame reduced to 220px; desktop remains 260px. | Fixed |
| Final CTA | 360, 390, 414, 430 | Final CTA buttons could be obscured by the fixed mobile call/WhatsApp bar. | Final CTA had no unique interactive-zone marker and sticky CTA did not detect it. | Added `id="final-cta"` and included it in sticky CTA hide zones. | Fixed |
| Visual Proof | 360, 390, 414, 430 | Needed confirmation that gallery does not create nested scroll behavior. | Gallery uses a normal grid, not a scroller; bottom fixed CTA could overlap late-section content. | Kept grid, added more mobile bottom padding. | Fixed |

## Risky Class Audit

Searched for:

- `overflow-hidden`
- `h-screen`
- `min-h-screen`
- `sticky`
- `snap-y`
- `snap-mandatory`
- `snap-x`
- `overflow-x-auto`
- `touch-none`
- `overscroll-contain`
- `fixed`
- `pointer-events-none`
- `pointer-events-auto`

Findings:

- `JourneyStory` was the only homepage image-integration section using `snap-x` and `overflow-x-auto` in a way that could trap mobile gestures.
- `FleetShowcase` still intentionally uses the existing carousel, but vertical touch-drag was tested and continues to move the page.
- `Gallery` uses a normal grid and does not create a nested scroll trap.
- `Hero`, `RouteCorridor`, `Gallery`, `FleetShowcase`, and CTA sections still use `overflow-hidden` only for visual clipping/background control, not body/page scroll locking.
- `MobileStickyCTA` is fixed by design; it now hides over primary interactive sections so it does not block key CTAs.

## Root Cause

The manual scroll issue was caused by nested horizontal mobile scrolling in `JourneyStory`, not by the page/body itself. The combination of `overflow-x-auto`, `snap-x`, and wide flex children meant real finger gestures inside the image-card strip could be claimed by the inner scroller instead of continuing the page's normal vertical scroll.

## Files Fixed

- `src/components/sections/JourneyStory.tsx`
- `src/data/airportlive-media.ts`
- `src/components/sections/Services.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/FleetShowcase.tsx`
- `src/components/sections/Gallery.tsx`
- `src/components/sections/InquirySection.tsx`
- `src/components/layout/MobileStickyCTA.tsx`

