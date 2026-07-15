# Image Integration Plan

> Phase gate: this plan is documentation only. Do not edit section components, copy assets, or create new media data files until the mapping in `docs/APPROVED_IMAGE_MANIFEST.md` is approved.

## Safety Check Summary

- Active app path: `C:\Users\pr7n8\OneDrive\Desktop\all website\windsurf v3\v3-website`
- Workspace root `package.json`: TypeScript-only shell package with `npm run build` as `tsc`.
- Active website `package.json`: Next.js `16.2.6`, React `19.2.4`, TypeScript strict mode enabled.
- App Router: yes. Homepage is `src/app/page.tsx`; layouts and route folders live under `src/app/`.
- Styling: Tailwind utility classes and global CSS in `src/app/globals.css`.
- Image handling today:
  - `src/components/sections/Hero.tsx` uses `next/image` with a remote Unsplash hero image and `priority`.
  - `src/components/sections/Services.tsx` uses CSS `backgroundImage` remote Unsplash URLs.
  - `src/components/sections/WhyChooseUs.tsx` and `src/components/sections/Gallery.tsx` use raw `<img>` with remote Unsplash URLs.
  - `src/components/sections/FleetShowcase.tsx` and `src/components/sections/RouteCorridor.tsx` use abstract gradients/placeholders.
  - `next.config.ts` still allows Unsplash and Wikimedia remote images and includes those hosts in CSP.
- Existing media utilities:
  - No `src/components/media/ResponsiveImage.tsx` exists.
  - No `src/data/airportlive-media.ts` exists.
  - `public/media/` exists but is untracked and currently has placeholder folders/manifest from an earlier media inventory.
- Motion libraries already installed: Framer Motion, GSAP, Embla, Three.js, React Three Fiber.
- Dependency decision: no dependency install is needed for this image integration. Use existing `next/image` and current Framer Motion/CSS patterns.
- Git safety:
  - `v3-website` currently has untracked `docs/MEDIA_INVENTORY.md` and `public/media/`.
  - Do not overwrite those files without checking them first.
  - This phase adds only `docs/APPROVED_IMAGE_MANIFEST.md` and `docs/IMAGE_INTEGRATION_PLAN.md`.

## Homepage Section Order Found

Current `src/app/page.tsx` order:

1. `Header`
2. `Hero`
3. `TrustStrip`
4. `Services`
5. `RouteCorridor`
6. `FleetShowcase`
7. `BookingFlow`
8. `WhyChooseUs`
9. `Gallery`
10. `Testimonials`
11. `FAQ`
12. `InquirySection`
13. `Footer`

Approved future order change:

- Insert `JourneyStory` after `Services` and before `RouteCorridor`.
- Keep all conversion flows, phone number, email, WhatsApp links, route names, service names, SEO text, FAQ, and form logic intact.

## Integration Table

| Component name | Discovered file path | Current visual issue | Image to integrate | Target final path | Alt text | Loading behavior | Mobile behavior | Performance risk | Fallback behavior | Implementation status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Media folders | `public/media/` | Existing folder is partial and untracked; requested `journey`, `cta`, and `unused` folders are absent. | Approved WebP pack only | `public/media/{hero,services,fleet,proof,routes,journey,gallery,cta,og,unused}/` | Not applicable | Not applicable | Not applicable | Low, filesystem only | Keep existing `README.md` and `media-manifest.json`; create only missing folders after approval | Not started, awaiting mapping approval |
| Central media data | `src/data/airportlive-media.ts` | No typed central image map exists; image paths are scattered inside components. | All approved mapped assets except unused/missing | Exact public path strings from manifest | All alts from manifest | Hero priority only; all below-fold images lazy | Sizes values follow section layout and mobile width | Low if typed data uses string literals and no `any` | Missing XL6 interior omitted or marked unavailable in typed data | Not started, awaiting mapping approval |
| Responsive image component | `src/components/media/ResponsiveImage.tsx` | No reusable local `next/image` wrapper exists; current code mixes `next/image`, raw `<img>`, and CSS backgrounds. | Not a specific asset | Not applicable | Required `alt` prop | Supports `priority`, `sizes`, `fill`, `width`, `height` | Parent must provide stable aspect ratio for `fill` | Low if wrapper stays thin and avoids new runtime logic | Pass through className; use stable placeholder background in parent | Not started, awaiting mapping approval |
| Hero | `src/components/sections/Hero.tsx` | Remote stock image drives LCP and generic taxi/luxury feel; current Ken Burns loop can conflict with requested calm reveal. | `grok-b6ae43e3-6a09-4fd3-8a60-ebc19353a064_Zawa.webp` | `public/media/hero/airportlive-mobile-hero-poster.webp` | Professional AirportLive chauffeur with premium cab ready for airport transfer in Punjab | `priority`, eager, `sizes="100vw"`, only priority image on page | Use dark overlay plus bottom gradient; keep subject lower/center; test 360px quote form usability | High because hero is LCP and has form/CTA above fold | Keep current dark background color; if image missing, render form and content on static dark background | Not started, awaiting mapping approval |
| Header / nav hero timing | `src/components/layout/Header.tsx` | Header currently renders independently before hero; requested 1.0s to 1.2s nav fade may touch shared layout. | None | None | Not applicable | Not applicable | Must not block nav usability | Medium if header animation causes hydration mismatch or CLS | Prefer leaving header stable if animation risk is high | Not started, awaiting mapping approval |
| Signature Services | `src/components/sections/Services.tsx` | Six cards use CSS `backgroundImage` with remote Unsplash URLs, bypassing `next/image` optimization. | Service images from manifest | `public/media/services/*` | Service-specific alts from manifest | Lazy via `next/image`; no service images marked priority | Preserve card tap behavior; make hover-only description readable on touch or always available enough | Medium because replacing CSS backgrounds affects parallax and card layering | Card keeps dark gradient and background color if image missing | Not started, awaiting mapping approval |
| JourneyStory | `src/components/sections/JourneyStory.tsx` and `src/app/page.tsx` | Section does not exist; current journey proof is only abstract booking flow. | Booking, driver assigned, luggage loading, cabin comfort, airport arrival images | `public/media/journey/*` plus `public/media/proof/airportlive-luggage-loading.webp` | Journey alts from manifest | Lazy, `sizes="(max-width: 768px) 88vw, 420px"` | Mobile stacked cards or horizontal snap; no scroll trap; CTA uses existing WhatsApp link helper | Medium due new section height and mobile scroll length | If a journey image is missing, show dark placeholder card with text still visible | Not started, awaiting mapping approval |
| Route Corridor | `src/components/sections/RouteCorridor.tsx` | Route rows use gradient placeholders; no real corridor proof. | `grok-e039cd3d-3ad2-45b2-96bf-df79c53a39b2_Zawa.webp` | `public/media/routes/airportlive-ludhiana-delhi-airport-route.webp` | Premium taxi on Ludhiana to Delhi Airport route | Lazy because below services/journey | Use only for featured Ludhiana to Delhi Airport route; keep remaining route rows gradient/line based | Medium because full-height route rows can create large image decode work | Featured route falls back to existing gradient if image missing | Not started, awaiting mapping approval |
| Fleet Showcase | `src/components/sections/FleetShowcase.tsx` | Fleet cards use abstract gradients and decorative circles instead of real vehicle proof. | Fleet exterior/interior/luggage images from manifest | `public/media/fleet/*` | Fleet alts from manifest | Lazy fleet cards; detail images load only when visible/practical | Preserve swipe carousel and WhatsApp CTA; keep cards compact on 360px | Medium-high because carousel can load many images if not gated | Keep gradient visual for any missing vehicle detail; XL6 interior explicitly unavailable | Not started, awaiting mapping approval |
| Vehicle detail behavior | `src/components/sections/FleetShowcase.tsx` or new child under `src/components/sections/` | Current expanded card only reveals text features; no image detail sheet. | Interior/luggage images | `public/media/fleet/*` | Fleet detail alts | Lazy, avoid preloading all detail images above fold | If implemented, bottom sheet must have sticky WhatsApp CTA, reachable close button, no scroll trap | High if new sheet adds interaction complexity | Safer first pass can keep existing expanded card and add image slots only; document sheet as later enhancement | Not started, awaiting mapping approval |
| Booking Flow | `src/components/sections/BookingFlow.tsx` | Existing section is icon/process based and should remain stable. | None in first image pass; JourneyStory covers visual process | None | Not applicable | Not applicable | Preserve Start Booking and Call CTAs | Low | No change planned | Not started, no component edit planned |
| Trust / Legacy | `src/components/sections/WhyChooseUs.tsx` | Uses raw remote Unsplash image and generic chauffeur/cab proof. | `grok-54c83ee2-a845-4cda-9793-e6ddcca58d62_Zawa.webp` | `public/media/proof/airportlive-driver-portrait.webp` | AirportLive chauffeur standing beside premium cab for safe Punjab airport transfer | Lazy, proof image | Keep aspect ratio stable and text beside it readable; no hover-only requirement | Low-medium due replacing raw `<img>` with `next/image` | Fallback to dark image container and keep trust copy visible | Not started, awaiting mapping approval |
| Visual Proof Gallery | `src/components/sections/Gallery.tsx` | Current section is called Visual Stories and uses four remote stock images; gallery has raw `<img>` and DOM mutation fallback. | Clean interior, airport pickup proof, luggage loading, fleet lineup, family travel, group transport | `public/media/gallery/*`, `public/media/proof/airportlive-luggage-loading.webp`, `public/media/fleet/airportlive-fleet-lineup.webp` | Gallery alts from manifest | Lazy, `sizes="(max-width: 768px) 46vw, (max-width: 1200px) 25vw, 320px"` | Mobile 2-column grid or horizontal snap; no clipped labels; Book Now CTA stays | Medium because six images can increase below-fold weight if sizes are wrong | Keep text and labels HTML; image card placeholder if file missing | Not started, awaiting mapping approval |
| Final CTA on homepage | `src/components/sections/InquirySection.tsx` | "Ready for Takeoff?" section has no real image proof/background. | `grok-029235f3-3ac4-4d60-bd48-51a0c2ba223f_Zawa.webp` | `public/media/cta/airportlive-ready-for-takeoff-poster.webp` | Premium AirportLive cab ready for next airport transfer | Lazy where practical; no global preload | Background overlay must keep buttons high contrast and touch targets clear | Low-medium because image is below fold | Existing solid dark CTA remains if image missing | Not started, awaiting mapping approval |
| Alternate FinalCTA component | `src/components/sections/FinalCTA.tsx` | Component exists but homepage currently uses `InquirySection`; changing both may create inconsistent CTA behavior. | Same CTA image only if this component is later used | `public/media/cta/airportlive-ready-for-takeoff-poster.webp` | Premium AirportLive cab ready for next airport transfer | Lazy | Keep call/WhatsApp/email actions intact if activated | Low if left untouched | No change unless component is in active route | Not started, no homepage edit unless approved |
| Footer/layout | `src/components/layout/Footer.tsx` | Footer has no requested image dependency; contains phone/email/WhatsApp conversion links. | None | None | Not applicable | Not applicable | Preserve contact info and route links | Low | No change planned | Not started, no component edit planned |
| Homepage metadata / OG | `src/lib/homepage-metadata.ts` | Existing OG image may be separate from new media library; optimized pack has no 1200x630 OG crop. | None approved for OG | Keep existing OG until a proper crop exists | Not applicable | Not applicable | Social preview should not use portrait image | Medium if a 9:16 image is forced into OG | Leave current metadata unchanged | Not started, no edit planned |
| CSP / remote allowlist cleanup | `next.config.ts` | Remote image hosts remain needed while non-home pages still reference Unsplash/Wikimedia. | None | None | Not applicable | Not applicable | Not applicable | Medium if removed before all routes are migrated | Keep remote allowlist until all page-level remote references are replaced | Not started, defer until after homepage integration QA |

## Asset Copy And Rename Plan After Approval

1. Create only missing folders: `public/media/journey/`, `public/media/cta/`, and `public/media/unused/`.
2. Copy approved source WebP files from `airportlive_webp_optimized_q78` into the final paths listed in the manifest.
3. Do not copy the `missing` XL6/SUV interior path.
4. Keep unused reserve images under `public/media/unused/`.
5. Do not alter existing `public/media/README.md` or `public/media/media-manifest.json` unless a later cleanup phase explicitly approves it.

## Implementation Plan After Mapping Approval

1. Create `src/data/airportlive-media.ts` with strict typed image objects and no `any`.
2. Create `src/components/media/ResponsiveImage.tsx` unless an equivalent appears before implementation.
3. Replace only homepage section image surfaces listed above.
4. Insert `JourneyStory` after `Services` and before `RouteCorridor`.
5. Keep all text content in HTML, including H1, service names, route names, route details, FAQ, CTA text, phone, email, and booking copy.
6. Preserve WhatsApp/call/email helpers from `src/lib/links.ts` and business constants from `src/lib/constants.ts`.
7. Run QA after integration and create `docs/IMAGE_INTEGRATION_QA.md`.
8. Run `npm run build`, `npm run lint`, and `npm test` from `v3-website` after code changes.

## Open Risks Before Approval

- The requested project framing mentions Next.js 14, but the discovered app is Next.js `16.2.6`. Future code changes should check current Next docs in `node_modules/next/dist/docs/` before modifying Next-specific APIs.
- `public/media/` and `docs/MEDIA_INVENTORY.md` are already untracked. Treat them as user/existing work and avoid broad cleanup.
- `airportlive-xl6-suv-interior.webp` is missing from the optimized pack.
- Some final paths intentionally reuse a source image:
  - `grok-e1a16ca4-6d30-4a41-ac61-d06ea4afb2c1_Zawa.webp` for Event Transport and Tempo Traveller exterior.
  - `grok-4c3fc70e-fed4-4306-a27b-ee2e4eb586db_Zawa.webp` for Premium Sedan interior and Clean Interior gallery proof.
- Homepage is not the only source of remote stock images. Route pages, fleet page, contact page, airport taxi page, dynamic slug page, constants, preloader, and global CSS still contain remote media references. Those are outside this first homepage image integration scope unless approved separately.

## Approval Gate

Implementation should not begin until the manifest mapping is approved or corrected. Once approved, the next phase can copy/rename images, add the typed media data file and responsive image component, then integrate section-by-section with QA.
