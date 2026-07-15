# Mobile Scroll And Image Fix QA

## Scope

Homepage mobile QA for the AirportLive.in / V3 Tour & Travels image integration polish pass.

Test target:

- Local Next.js app at `http://127.0.0.1:3000`
- Homepage sections: Hero, Services, JourneyStory, Route Corridor, Fleet, Trust / Legacy, Visual Proof, Final CTA
- No new images, no video phase, no business detail changes

## Manual Touch Scroll Results

Real mobile-like touch events were dispatched over the JourneyStory image cards using Chrome DevTools Protocol touch input. This specifically tests the failure mode missed by the earlier automated QA: a finger drag starting on the WhatsApp booking / journey image cards.

| Viewport | Result | Scroll trap fixed | Journey slow drag | Journey fast flick | Route-to-Journey upward scroll | Fleet scroll | Console errors | Broken images |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 360 x 740 | Pass | Yes | Page moved 333px | Page moved 399px | Pass | Pass | 0 | 0 |
| 390 x 844 | Pass | Yes | Page moved 382px | Page moved 458px | Pass | Pass | 0 | 0 |
| 414 x 896 | Pass | Yes | Page moved 406px | Page moved 487px | Pass | Pass | 0 | 0 |
| 430 x 932 | Pass | Yes | Page moved 423px | Page moved 507px | Pass | Pass | 0 | 0 |

## JourneyStory Verification

| Check | Result |
| --- | --- |
| Mobile layout is vertical stacked cards | Pass |
| No mobile `overflow-x-auto` | Pass |
| No mobile `snap-x` / `snap-start` | Pass |
| No mobile wide flex cards | Pass |
| `touch-action: pan-y` present on card grid | Pass |
| Section continues into Route Corridor | Pass |
| Scroll back upward from Route Corridor works | Pass |
| CTA remains reachable | Pass |

Measured JourneyStory card sizing:

| Viewport | Card height | Image height |
| --- | --- |
| 360 x 740 | 335px | 204px |
| 390 x 844 | 354px | 223px |
| 414 x 896 | 369px | 238px |
| 430 x 932 | 379px | 248px |

## Section QA

| Section | Result | Notes |
| --- | --- | --- |
| Hero | Pass | Overlay was lightened so the approved hero image is less crushed while the headline, CTAs, and form stay readable. Header/nav was not animated. |
| Services | Pass | Mobile descriptions are visible without hover. Cards keep consistent mobile height and brighter image treatment. |
| JourneyStory | Pass | Mobile nested horizontal carousel was removed. Normal vertical page scroll works on real touch-like gestures. |
| Route Corridor | Pass | Route names and route details remain HTML. Poster remains supportive with dark crop/overlay. |
| Fleet | Pass | Cards are shorter on mobile. Existing carousel does not trap vertical scroll. XL6/SUV missing interior remains unavailable; no broken tab/image was introduced. |
| Trust / Legacy | Pass | Driver portrait crop uses approved object-position data. |
| Visual Proof | Pass | Gallery remains a normal grid and does not create a nested scroll trap. |
| Final CTA | Pass | Buttons are readable and no longer sit behind the fixed mobile CTA bar. |

## CTA Checks

| CTA | Result |
| --- | --- |
| Plan My Airport Ride | Pass |
| WhatsApp CTA | Pass |
| Call CTA | Pass |
| Fleet Choose CTA | Pass |
| Final CTA buttons | Pass |

The fixed bottom mobile CTA now hides over primary interactive zones: booking form, inquiry form, fleet, and final CTA.

## Image Crop Checks

| Image group | Result | Notes |
| --- | --- | --- |
| Hero | Pass | `center bottom` keeps car/chauffeur subject anchored on mobile. |
| Services | Pass | Per-image `objectPosition` values are applied; mobile overlay is less aggressive. |
| Journey | Pass | Driver assigned image now uses `center bottom`; booking, luggage, cabin, and arrival crops are stable. |
| Fleet | Pass | Exterior cards show the vehicle more clearly with reduced mobile frame height. |
| Gallery / Proof | Pass | Grid images remain stable and lazy loaded. |
| CTA | Pass | Final CTA uses `center bottom` with readable overlay. |

## Same-Source Reuse

Same-source reuse remains intentionally allowed for this first pass where the approved pack does not include a distinct image for every possible visual slot. No new images were generated and no unapproved external stock assets were introduced.

## Remaining Issues

- No approved `1200 x 630` OG crop exists, so homepage OG image remains unchanged.
- `airportive.in` appears to be a typo/domain mismatch; live verification should use `airportlive.in`.
- Final visual confidence should still include a real phone check after production deployment because mobile browser chrome and network timing can slightly change perceived spacing.
