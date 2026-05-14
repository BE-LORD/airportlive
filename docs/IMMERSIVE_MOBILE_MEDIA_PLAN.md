# AirportLive Immersive Mobile Media Plan

Purpose: turn AirportLive into a premium, mobile-first, agency-level travel experience using the right mix of images, video, 3D, scroll interaction, and performance discipline.

This document maps:
- where images exist today
- where new images should be added
- where video is better than image
- where 3D or scroll-scrub interaction can create the biggest premium effect
- what assets need to be produced before implementation

## North Star

The site should feel like a cinematic airport transfer concierge, not a normal taxi website.

On mobile, the user should feel:
- the ride is premium
- the car is clean and real
- the driver is professional
- the airport route is handled
- booking is instant and low-stress

The experience should be immersive, but it must still be fast. Mobile users will often be on 4G or 5G while traveling, so the design must use smart media loading, short looping videos, poster images, and feature gating.

## Current Media Inventory

### 1. Home Hero

File: `src/components/sections/Hero.tsx`

Current media:
- Remote Unsplash image:
  - `https://images.unsplash.com/photo-1449965408869-eaa3f722e40d`
- Used through `next/image`
- Full-bleed background behind headline and quote form
- Slow Ken Burns zoom/pan animation

Current role:
- First emotional impression
- Premium travel mood
- Supports booking form

Problem:
- It is generic stock-style imagery.
- It does not prove AirportLive/V3 authenticity.
- It does not show actual fleet, driver, airport pickup, luggage, or Punjab/NRI route context.

Best future upgrade:
- Replace with a short mobile-optimized hero video.
- Keep a high-quality poster image fallback.
- Use a real AirportLive vehicle or a custom cinematic shoot, not stock.

Recommended asset:
- `public/media/hero/airportlive-mobile-hero-loop.mp4`
- `public/media/hero/airportlive-mobile-hero-poster.webp`
- Duration: 6 to 10 seconds
- Format: vertical 9:16 and cropped safe for 390px wide screens
- Content: premium car door closing, driver ready, airport lights, luggage placed, subtle highway motion

Use video here because:
- Hero needs instant emotion.
- Video can show trust faster than text.
- A moving car/interior/driver sequence creates high-end agency feel.

Mobile rule:
- Autoplay muted, loop, playsInline.
- Load poster immediately.
- Load video only after first paint or when connection is not slow.
- Disable video for reduced motion and low-end devices.

## Existing Page Hero Backgrounds

These are currently static background images via Tailwind arbitrary background-image classes.

### Contact Page Hero

File: `src/app/contact/page.tsx`

Current image:
- `photo-1449965408869-eaa3f722e40d`

Best upgrade:
- Use a still image, not video.
- This page is conversion-focused. Motion should not distract from calling or filling a form.

Recommended image:
- Driver holding phone with WhatsApp booking screen
- Dispatch/booking desk mood
- Clean premium car outside office/hotel/airport

Use image here because:
- The user wants contact clarity.
- Fast load matters more than cinematic motion.

### Fleet Page Hero

File: `src/app/fleet/page.tsx`

Current image:
- `photo-1502877338535-766e1452684a`

Best upgrade:
- Use either a static fleet lineup image or a very short side-pan video.

Recommended:
- For mobile hero: 4-second video pan across Innova/Sedan/SUV lineup.
- For fallback: sharp WebP fleet lineup.

Use video if:
- Real fleet footage is available and optimized.

Use image if:
- Fleet photos are staged and premium enough.

### Airport Taxi Page Hero

File: `src/app/airport-taxi/page.tsx`

Current image:
- `photo-1549317661-bd32c8ce0db2`

Best upgrade:
- Use video for the airport pickup moment.

Recommended video:
- Terminal pickup board, luggage, driver greeting, car leaving airport lane.
- 5 to 8 seconds.

Use video here because:
- Airport pickup/drop is the core service.
- Motion communicates punctuality and confidence.

### SEO Route Pages Hero

File: `src/app/[slug]/page.tsx`

Current image:
- `photo-1449965408869-eaa3f722e40d`

Best upgrade:
- Use dynamic route-specific poster images first.
- Add route-specific video only for top money pages.

Top pages for video:
- `/ludhiana-to-delhi-airport-taxi`
- `/delhi-airport-to-ludhiana-taxi`
- `/chandigarh-to-delhi-airport-taxi`
- `/amritsar-airport-taxi`

Use image for long-tail pages because:
- There may be many pSEO pages.
- Video on every route page is expensive and unnecessary.

Use video for top routes because:
- Those pages can become premium landing pages.
- They are likely highest-intent SEO traffic.

## Home Services Bento

File: `src/components/sections/Services.tsx`

Current images:
- Airport Pickup & Drop: plane wing image
- Outstation Taxi: road image
- Corporate Travel: office image
- Family Tours: car road image
- Event Transport: wedding image
- Local City Rides: car image

Current role:
- Service category mood cards
- Uses parallax background image
- Works well visually, but still stock-like

Best future upgrade:
- Keep images for most cards.
- Use micro-video only for the primary service card.

Recommended per card:

| Service | Current media type | Best future media | Why |
|---|---:|---:|---|
| Airport Pickup & Drop | Stock image | Short video loop | Highest-value service, should feel alive |
| Outstation Taxi | Stock image | Cinematic road image | Image is enough, route content carries story |
| Corporate Travel | Stock image | Premium business pickup image | Keep calm and professional |
| Family Tours | Stock image | Warm family luggage image | Trust and comfort matter more than motion |
| Event Transport | Stock image | Short event convoy image or image | Use video only if real wedding fleet footage exists |
| Local City Rides | Stock image | Clean car interior image | Keep lightweight |

Recommended hero card upgrade:
- Convert Airport Pickup & Drop card into a muted 4-second video loop.
- Add a static poster and gradient overlay.
- Use video only when the card enters viewport.

## Route Corridor

File: `src/components/sections/RouteCorridor.tsx`

Current media:
- Gradient visuals, no real images after the recent stability fix.

Current role:
- Large route storytelling section
- Each route has a full-height cinematic row

Best future upgrade:
- This is the best place for 3D and scroll interaction.
- Use 3D route line, animated map corridor, highway video fragments, and route markers.

Recommended structure:
1. Route header: "Mastering the Corridor"
2. Sticky mobile route stage
3. Scroll progress draws route line
4. Floating city markers appear
5. Airport terminal icon lands at the end
6. CTA appears after route story completes

Use 3D here because:
- Routes are abstract.
- A 3D line/map makes distance and confidence feel tangible.
- The repo already has `src/components/effects/RouteVisualization3D.tsx`.

Use video sparingly:
- Add tiny ambient highway clips behind only top routes.
- Do not autoplay separate videos for every route row at once.

Recommended asset:
- Route poster images:
  - `public/media/routes/ludhiana-delhi-poster.webp`
  - `public/media/routes/chandigarh-delhi-poster.webp`
  - `public/media/routes/jalandhar-delhi-poster.webp`
- Optional top-route video:
  - `public/media/routes/ludhiana-delhi-mobile-loop.mp4`

## Fleet Showcase

File: `src/components/sections/FleetShowcase.tsx`

Current media:
- Gradient visual placeholders
- No live car images
- Vehicles are described by data fields

Current role:
- Swipe carousel for choosing a ride

Best future upgrade:
- Replace gradient blocks with real vehicle media.
- Use 3D/interactive only for one flagship vehicle card first.

Recommended per vehicle:

| Vehicle | Best media | Notes |
|---|---|---|
| Premium Sedan | Static image | Side/front 3-quarter view, clean background |
| Innova Crysta | Video or 3D model | Main premium car. Best candidate for immersive interaction |
| XL6 / SUV | Static image | Show family/luggage capacity |
| Tempo Traveller | Static image plus interior detail | Group seating matters |
| Luxury / Executive | Static image or slow video | Use only if real luxury vehicle footage exists |

Best interaction:
- Swipe carousel stays.
- Vehicle card opens into full-screen mobile "vehicle detail sheet".
- Detail sheet has:
  - 360-ish drag orbit for high-end devices
  - image carousel fallback
  - seats/luggage/comfort chips
  - WhatsApp CTA sticky bottom

Use video for:
- Innova Crysta interior comfort
- Driver opening door
- Luggage loading

Use image for:
- Fleet comparison cards
- SEO and performance-safe fallback

## Booking Flow

File: `src/components/sections/BookingFlow.tsx`
Hero inline form: `src/components/sections/Hero.tsx`

Current media:
- No image or video
- Form-first interaction

Best future upgrade:
- Do not add heavy media inside the form.
- Add subtle animated route preview beside/behind form only if it does not slow input.

Recommended:
- Step 1 Route: tiny animated route line between pickup/drop
- Step 2 Timing: subtle day/night ambience icon
- Step 3 Vehicle: selected vehicle thumbnail
- Step 4 Confirm: WhatsApp preview card

Use image here only for vehicle thumbnail.
Use video here rarely.

Reason:
- Booking is the money flow.
- Any heavy animation that delays typing or tapping is bad.

## Why Choose Us

File: `src/components/sections/WhyChooseUs.tsx`

Current image:
- `photo-1549317661-bd32c8ce0db2`
- Driver/car supportive image

Best future upgrade:
- Use real driver portrait or real chauffeur near clean vehicle.

Use image here because:
- Trust sections need authenticity.
- A clear portrait beats a video loop.

Recommended image:
- Driver in clean uniform beside car
- Friendly, professional, not overly staged
- Vertical crop for mobile

## Gallery

File: `src/components/sections/Gallery.tsx`

Current images:
- Highway car
- Clean sedan exterior
- Chauffeur near SUV
- Multi-passenger vehicle

Best future upgrade:
- Convert gallery into "Visual Proof" instead of generic image grid.

Recommended sections:
- Vehicle exterior
- Vehicle interior
- Luggage space
- Driver professionalism
- Airport pickup
- Family/group travel

Use mostly images here.
Use one video tile only:
- a 6-second "airport pickup in motion" tile

Reason:
- Gallery should let users inspect proof.
- Too much video reduces clarity and speed.

## Testimonials

File: `src/components/sections/Testimonials.tsx`

Current media:
- No photos

Best future upgrade:
- Do not add random customer stock photos.
- Add route badges, WhatsApp-style proof cards, or blurred review screenshots only if real and approved.

Use image only if:
- real customer review screenshots are available and privacy-safe.

Use video only if:
- real customer testimonial clips exist.

## Trust Strip And Stats

Files:
- `src/components/sections/TrustStrip.tsx`
- `src/components/sections/TrustLayer.tsx`

Current media:
- Mostly text/icons

Best future upgrade:
- Keep lightweight.
- Add tiny animated icons or micro 3D badges, not photos.

Use no video here.

## Footer

File: `src/components/layout/Footer.tsx`

Current media:
- Gradient background only

Best future upgrade:
- Keep simple.
- Add mini route map line or airport code pattern if needed.

Use no video here.

## Existing 3D And Video Foundations

The repo already contains useful building blocks:

### RouteVisualization3D

File: `src/components/effects/RouteVisualization3D.tsx`

Best use:
- Route corridor
- Top SEO route pages
- Booking form route preview

Needs improvement before production:
- Dynamic import with SSR disabled
- Better mobile viewport sizing
- Touch-safe camera behavior
- Reduced-motion fallback
- WebGL failure fallback
- Pixel ratio cap

### VideoScrub

File: `src/components/effects/VideoScrub.tsx`

Best use:
- Journey story section
- Top route landing pages
- Airport pickup process

Needs improvement before production:
- Support mobile poster-first load
- Use `IntersectionObserver`
- Avoid loading video until near viewport
- Add connection/device gating
- Add poster fallback when video fails

### JourneyScrub

File: `src/components/sections/JourneyScrub.tsx`

Best use:
- Add between Services and RouteCorridor.
- It can become the main scroll-story bridge:
  - Pickup confirmed
  - Driver en route
  - Calm highway ride
  - Airport drop

Needs improvement before production:
- Add visual layer behind text
- Reduce pinned scroll length on mobile
- Provide non-pinned fallback for low-end devices

## Final Recommended Mobile Homepage Flow

1. Hero cinematic video
   - Real car/driver/airport mood
   - Booking form visible immediately

2. Trust strip
   - Fast text proof
   - No heavy media

3. Services bento
   - One video card for airport transfer
   - Images for other cards

4. Journey scrub
   - Scroll-synced story
   - Video or animated still layers

5. Route corridor
   - 3D route line
   - Top route cards
   - WhatsApp quote CTAs

6. Fleet showcase
   - Real vehicle media
   - Swipe carousel
   - Innova featured with video/3D detail

7. Booking flow
   - Lightweight, no heavy background video
   - Vehicle thumbnails and route preview only

8. Why Choose Us
   - Real driver image
   - Trust proof

9. Visual Proof gallery
   - Real fleet/driver/airport/luggage photos
   - One video tile max

10. Testimonials
   - Text first
   - Real review proof if available

11. FAQ and final inquiry
   - No heavy media
   - Conversion clarity

## Media Priority List

### Phase 1: Must Have

These will create the biggest quality jump.

1. Hero mobile video and poster
2. Real fleet images for FleetShowcase
3. Real driver/trust image for WhyChooseUs
4. Airport pickup/drop service card video or image
5. Route posters for top routes

### Phase 2: Strong Upgrade

1. JourneyScrub with scroll-synced visuals
2. RouteVisualization3D inside RouteCorridor
3. Vehicle detail sheet with image carousel
4. Gallery rebuilt as Visual Proof

### Phase 3: Awwwards-Level Polish

1. Mobile 3D route environment
2. Lightweight 3D Innova or stylized vehicle silhouette
3. Scroll-scrub airport journey video
4. Haptic-like touch transitions through motion
5. Smart media quality based on device tier

## Image Shot List

Create these photos first:

1. Hero poster
   - Premium car at airport/night or early morning
   - Driver visible
   - Space for text overlay

2. Fleet lineup
   - Sedan, Innova, SUV, Tempo Traveller
   - Clean, consistent angle

3. Innova exterior
   - 3-quarter front angle
   - Premium lighting

4. Innova interior
   - Captain seats, AC, legroom

5. Luggage loading
   - Shows airport usefulness

6. Driver portrait
   - Professional, friendly, uniform or neat attire

7. Airport pickup proof
   - Terminal/luggage/driver greeting

8. Highway route mood
   - Punjab to Delhi corridor
   - Sunrise/evening road

9. Family travel
   - Luggage and family comfort, not fake stock posing

10. Group/event transport
   - Tempo Traveller or multiple vehicles

## Video Shot List

Create these short videos:

1. Hero loop
   - 6 to 10 seconds
   - Vertical 9:16
   - Muted
   - Car, driver, luggage, airport/highway mood

2. Airport pickup loop
   - 4 to 6 seconds
   - Driver opens door or luggage placed in boot

3. Innova comfort loop
   - 4 to 6 seconds
   - Interior, seats, calm cabin

4. Route motion loop
   - 5 to 8 seconds
   - Highway, road signs, airport road

5. Journey scrub source video
   - 12 to 18 seconds
   - Designed for scroll scrubbing
   - Beats: pickup, highway, cabin, arrival

## 3D Asset Ideas

Use 3D only where it adds meaning.

Best 3D targets:
- Route line from city to airport
- Airport terminal marker
- Minimal vehicle silhouette
- Luggage/car comfort micro scene

Avoid:
- Heavy full 3D city maps
- Large photorealistic car model on first load
- 3D in every section

Mobile 3D rule:
- Max one major 3D scene per page.
- Everything else should be CSS, canvas-light, or static fallback.

## Performance Rules

For mobile, every media idea must pass these rules:

1. First screen must show meaningful content fast.
2. Hero video must never block text or form.
3. Every video needs a poster.
4. Every decorative video must be muted, playsInline, loop, and no controls.
5. Use WebP/AVIF for images.
6. Use MP4/H.264 or WebM only after compatibility check.
7. Lazy-load below-fold media.
8. Use `prefers-reduced-motion` fallback.
9. Disable 3D/video on low-tier devices.
10. Keep total initial media under control.

Suggested budgets:
- Initial HTML/CSS/JS should stay lean.
- Hero poster under 180 KB.
- Hero video under 1.5 MB mobile.
- Below-fold video chunks under 2 MB each.
- Gallery images under 100 KB each mobile.

## SEO Rules For Media

Images and video should help SEO, not hide content.

Rules:
- Keep H1 and main copy as HTML text.
- Do not put important text inside images or video.
- Use descriptive alt text for real images.
- Use route-specific filenames.
- Add video schema only for real hosted videos worth indexing.
- Add image dimensions to avoid layout shift.
- Keep canonical URLs clean.

Recommended filenames:
- `airportlive-ludhiana-delhi-airport-taxi-hero.webp`
- `airportlive-innova-crysta-premium-cab.webp`
- `airportlive-delhi-airport-pickup-driver.webp`
- `airportlive-punjab-airport-transfer-video.mp4`

## Best Image Vs Video Decisions

Use video when:
- motion proves service quality
- the moment is emotional
- the action is easy to understand in 3 to 8 seconds
- it is above the fold or a major story beat

Use image when:
- user needs to inspect details
- the section is trust/proof heavy
- the section is below fold and informational
- loading speed matters more than mood

Use 3D when:
- the concept is abstract
- user interaction makes it more memorable
- it can be feature-gated cleanly

For AirportLive:
- Hero: video
- Services: mixed, one video max
- Routes: 3D plus poster/video for top routes
- Fleet: images first, video/3D for Innova detail
- Booking: mostly no media
- Why Choose Us: real image
- Gallery: images with one video tile
- Testimonials: no stock media
