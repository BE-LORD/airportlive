# Image Integration QA

## Scope

Image integration pass for the AirportLive.in / V3 Tour & Travels homepage after approval of `docs/APPROVED_IMAGE_MANIFEST.md` and `docs/IMAGE_INTEGRATION_PLAN.md`.

## Corrections Applied

- `airportlive-xl6-suv-interior.webp` was not created or copied.
- XL6 / SUV exposes exterior media only; no interior tab/thumb is rendered for the missing image.
- Header/nav was not animated in this phase.
- Homepage OG image was left unchanged because no approved 1200 x 630 OG crop exists.
- Route poster is used only once, on the featured Ludhiana to Delhi Airport corridor, with dark overlay/crop and route text kept as HTML.
- Same-source reuse is documented below.

## Same-Source Reuse

- `grok-e1a16ca4-6d30-4a41-ac61-d06ea4afb2c1_Zawa.webp` maps to Event Transport and Tempo Traveller exterior.
- `grok-4c3fc70e-fed4-4306-a27b-ee2e4eb586db_Zawa.webp` maps to Premium Sedan interior and Clean Interior gallery proof.

## Automated Mobile Results

Tested viewports:

| Viewport | Result | Notes |
| --- | --- | --- |
| 360 x 740 | PASS | No horizontal overflow, no console errors, no failed image/script/style/font requests. |
| 390 x 844 | PASS | No horizontal overflow, no console errors, no failed image/script/style/font requests. |
| 414 x 896 | PASS | No horizontal overflow, no console errors, no failed image/script/style/font requests. |
| 430 x 932 | PASS | No horizontal overflow, no console errors, no failed image/script/style/font requests. |

Measured checks:

- Broken rendered images: 0
- Rendered image elements after full-page scroll: 29
- Featured route poster occurrences: 1
- `airportlive-xl6-suv-interior` occurrences: 0
- Route text present as HTML: yes (`Ludhiana`, `Delhi Airport (DEL)`, `310 km`, `5.5h`)
- Hero WhatsApp CTA: `https://wa.me/919888000510?...`
- Hero call CTA: `tel:+919888000510`
- Primary CTA heights: 44px or greater
- Hero quote step controls: 44px touch area after adjustment
- Reduced motion: headline, WhatsApp CTA, and booking form visible without staged reveal delay

## Checklist

| Check | Result | Notes |
| --- | --- | --- |
| Hero first-second reveal | PASS | Header remains stable/visible per correction; hero content and form are hidden during the initial dark image reveal. |
| Hero image looks premium | PASS | Local approved hero WebP renders with dark overlay and bottom gradient. |
| Hero text readable | PASS | Verified after reveal at all requested mobile widths. |
| Fare quote form usable | PASS | Form remains visible/reachable; quote step buttons now have 44px touch area. |
| WhatsApp CTA works | PASS | Existing WhatsApp URL preserved and verified in rendered DOM. |
| Call CTA works | PASS | Existing phone link preserved as `tel:+919888000510`. |
| Service cards crop correctly | PASS | Approved service images render as lazy card visuals with dark gradients. |
| Service text readable | PASS | Service names and tags remain HTML over overlays. |
| Route CTA visible | PASS | Request Fare Quote remains visible on corridor cards. |
| Fleet cards work | PASS | Exterior media replaces abstract visuals where approved media exists. |
| Fleet images not cut badly | PASS | Mobile cards preserve vehicle subject; XL6 has exterior only. |
| Vehicle detail works if implemented | PASS | Existing expandable detail behavior preserved; interior/luggage thumbs render only when media exists. |
| JourneyStory not too long | PASS | Mobile horizontal snap cards added after Services. |
| Visual Proof gallery works | PASS | Visual Stories direction changed to Visual Proof with approved proof/gallery images. |
| Final CTA readable | PASS | CTA background uses approved poster with dark overlay; copy remains HTML. |
| Floating WhatsApp not blocking key buttons | PASS | Primary hero, route, journey, and final CTA controls remain reachable. |
| No horizontal overflow | PASS | Verified on all requested mobile widths. |
| No clipped text | PASS | No clipped critical text observed in mobile visual pass. |
| No broken images | PASS | 0 broken images after scrolling through the page. |
| No console errors | PASS | 0 browser console errors during mobile QA. |
| Reduced motion works | PASS | Static content is visible immediately under `prefers-reduced-motion: reduce`. |

## Command Verification

| Command | Result | Output Summary |
| --- | --- | --- |
| `npm test -- --run` | PASS | 13 test files passed, 201 tests passed. |
| `npm run build` | PASS | Next.js 16.2.6 production build compiled, TypeScript passed, 24 static pages generated. |
| `npm run lint` | PASS | Exit 0; 46 warnings remain in pre-existing audit/layout/data files. |

## Remaining Issues

- Existing lint warnings remain outside this image integration scope.
- Existing build warning remains: using edge runtime on a page disables static generation for that page.
- No approved 1200 x 630 OG image exists, so homepage OG image remains unchanged.

