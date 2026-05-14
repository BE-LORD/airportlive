# V3 TOUR & TRAVELS — FULL FINAL MD SPEC PACK
## SONA CORRIDOR / AIRPORT LIVE
### Version 2.0 — Final Rebuild Spec

> Use this document as the master source. Split each `FILE:` section into its own `.md` file before pasting into Cursor, Claude, Windsurf, Codex, or any coding agent.

---

# FILE: 00_READ_ME_FIRST.md

## Project Identity

**Project:** V3 Tour & Travels — SONA CORRIDOR  
**Connected Platform:** Airport Live  
**Website:** airportlive.in  
**Service:** Premium airport transfer and Punjab road travel  
**Location:** Ludhiana · Chandigarh · Delhi NCR · Punjab airport routes  
**Primary Vehicle:** Toyota Innova Crysta  
**Phone / WhatsApp:** 9888000510  
**WhatsApp Link:** https://wa.me/919888000510  
**Email:** book@airportlive.in  
**Tagline:** WHERE LUXURY MEETS COMFORT  
**Experience Claim:** 20+ years  
**Fleet Claim:** 100+ fleet

## Final Creative Direction

**Name:** SONA CORRIDOR  
**World:** Warm editorial luxury with cinematic Punjab road energy  
**Core Feeling:** “This is not a cab service. This is a prepared arrival.”

The website must feel like Punjab’s golden road turned into a premium scroll experience. It should not look like a local taxi site, tour package template, generic airport transfer landing page, or blue/yellow travel brand.

## Final Build Rule

The previous basic build is rejected. Preserve only useful business content and contact logic. Rebuild visual language, scroll choreography, section composition, and conversion flow from this spec.

## Hard Anti-Patterns

Do not use:

- generic card-grid hero
- centered headline over stock car image
- blue travel theme
- purple gradient
- Bootstrap-like navbar
- fake luxury gold on black
- placeholder photos or placeholder copy
- visible text like “replace image later”
- random fade-in animations
- heavy 3D that kills mobile performance
- testimonial carousel
- public pricing tables unless manually approved
- claims like “guaranteed lowest price”
- Inter, Roboto, Arial, or system-ui as display font

## Build Priority

1. Mobile booking confidence
2. Premium trust in first 3 seconds
3. Smooth 60fps scroll
4. Route clarity
5. Fleet confidence
6. WhatsApp and call conversion
7. SEO and local discoverability
8. Cinematic polish

## Files in This Pack

1. `00_READ_ME_FIRST.md`
2. `01_PRD.md`
3. `02_TRD.md`
4. `03_DESIGN_SYSTEM.md`
5. `04_ARCHITECTURE.md`
6. `05_ANIMATION_SPEC.md`
7. `06_CONTENT_BRIEF.md`
8. `07_MIDJOURNEY_PROMPTS.md`
9. `08_KLING_VIDEO_PROMPTS.md`
10. `09_SPLINE_3D_DIRECTION.md`
11. `10_IMAGE_ASSET_LIST.md`
12. `11_SEO_ANALYTICS_QA.md`
13. `12_MASTER_BUILD_COMMAND.md`

---

# FILE: 01_PRD.md

# Product Requirements Document
## V3 Tour & Travels — SONA CORRIDOR

## 1. Product Vision

V3 Tour & Travels is not trying to look like another taxi provider. The website must reposition the brand as a premium airport transfer experience across Ludhiana, Chandigarh, Delhi NCR, and Punjab airport routes.

The visitor must understand three things instantly:

1. The car will be ready.
2. The ride will feel clean, prepared, and professional.
3. Booking is effortless through WhatsApp or call.

The website is a single-page cinematic journey. The road between Ludhiana, Chandigarh, and Delhi NCR becomes the visual metaphor: a golden corridor of trust, reliability, and arrival.

## 2. Business Goals

### Primary Goal

Drive WhatsApp booking inquiries from mobile users.

### Secondary Goals

- Increase perceived brand value beyond Ola, Uber, InDrive, and local cab operators.
- Build trust among business travelers, NRIs, premium families, wedding clients, and corporate bookers.
- Make Airport Live and V3 Tour & Travels feel connected and credible.
- Reduce hesitation by making routes, process, vehicle type, phone number, and response path obvious.

## 3. Conversion Goals

### Primary Conversion

Tap WhatsApp CTA:

`https://wa.me/919888000510`

### Secondary Conversion

Tap call CTA:

`tel:+919888000510`

### Tertiary Conversion

Submit inquiry form with:

- pickup city
- drop city
- date
- time
- flight number if available
- passenger count
- luggage count
- preferred contact mode

## 4. Target Audience

### Primary Audience — Business Traveler

**Age:** 32–55  
**Profile:** Entrepreneurs, executives, consultants, industrial visitors, senior managers  
**Mindset:** Tired, time-sensitive, does not want uncertainty after landing  
**Device:** Mobile first  
**Trigger:** Airport pickup, early morning departure, reliable intercity transfer  
**Decision Driver:** Trust, punctuality, vehicle comfort, phone accessibility

Internal thought:

> “I do not want to negotiate after landing. I want the car already arranged.”

### Secondary Audience — NRI / Premium Family

**Profile:** Families visiting Punjab for weddings, events, or family stays  
**Mindset:** Comparing local cab services, wants comfort and safety  
**Device:** Desktop and mobile  
**Decision Driver:** Clean vehicle, space, familiar service, easy WhatsApp coordination

Internal thought:

> “We are travelling with family and luggage. I need someone dependable.”

### Tertiary Audience — Corporate Client

**Profile:** Companies booking airport pickup for executives or guests  
**Mindset:** Needs repeatable, professional, invoice-friendly travel partner  
**Device:** Desktop  
**Decision Driver:** Reliability, experience, fleet size, clean communication

Internal thought:

> “This should feel organized enough for my company guests.”

## 5. Emotional Journey

### 0–10% Scroll — Prepared Arrival

Visitor feels that V3 is already waiting before they even ask.

### 10–25% Scroll — Route Confidence

The golden route line draws from Ludhiana to Chandigarh and Delhi NCR. The visitor sees that this corridor is V3’s territory.

### 25–45% Scroll — Fleet Trust

Toyota Innova Crysta becomes the hero object. The site shows comfort, cabin, luggage, and chauffeur etiquette.

### 45–60% Scroll — Journey Calm

Scroll-scrubbed road/cabin visuals make the visitor feel the ride before booking it.

### 60–75% Scroll — Proof and Process

The visitor sees how simple booking is and why V3 is safer than random cab options.

### 75–90% Scroll — Direct Inquiry

The site asks for the minimum useful details and makes WhatsApp the easiest next step.

### 90–100% Scroll — Final Assurance

Footer and final CTA repeat phone, WhatsApp, email, and service region.

## 6. Page Type

Single-page scroll narrative with strong conversion sections.

### Required Sections

1. Preloader
2. Navigation
3. Hero
4. Route Visualization
5. Fleet Showcase
6. Journey Scrub / Road Feel
7. Why V3 / Trust Layer
8. Booking Process
9. Route Inquiry Clarity
10. Testimonials / Trust Quotes
11. FAQ
12. Final CTA
13. Footer
14. Mobile Sticky WhatsApp Bar

## 7. Public Pricing Decision

Do not show fixed pricing by default.

Reason:

- airport transfer pricing may change by time, route, vehicle, fuel, tolls, special requests, or availability
- quote-based WhatsApp inquiry allows personal confirmation
- public pricing can create operational risk

Instead use:

> “Share your route. We confirm availability and fare personally.”

## 8. Must-Have Features

- WhatsApp CTA visible in hero
- Sticky mobile WhatsApp + call bar
- Click-to-call phone number
- Route map animation
- Fleet showcase focused on Innova Crysta
- Inquiry form that prepares a WhatsApp message
- FAQ
- Local SEO metadata
- LocalBusiness / TaxiService structured data
- Accessible navigation
- Reduced-motion fallback
- Mobile performance optimization

## 9. Success Metrics

Track:

- WhatsApp clicks
- call clicks
- inquiry form starts
- inquiry form submissions
- scroll depth
- route card clicks
- FAQ opens
- mobile sticky CTA clicks

## 10. Quality Acceptance Criteria

The final website must pass these checks:

- It does not look like a template.
- It does not have placeholder content.
- It feels premium in first 3 seconds.
- Phone number and WhatsApp are visible without hunting.
- Mobile booking path is obvious.
- Route clarity is immediate.
- Fleet feels clean and trustworthy.
- Animations support the story, not decoration.
- Page remains smooth on mid-range Android devices.

---

# FILE: 02_TRD.md

# Technical Requirements Document
## V3 Tour & Travels — SONA CORRIDOR

## 1. Recommended Stack

```txt
Framework: Next.js 14+ App Router
Language: TypeScript
Styling: Tailwind CSS + CSS Modules
Animation: GSAP 3 + ScrollTrigger
Smooth Scroll: Lenis
3D / Canvas: React Three Fiber + Drei + Three.js, only where justified
Motion: Framer Motion only for simple page/nav transitions if needed
Forms: React Hook Form + Zod
Icons: Lucide React
Images: next/image
Deployment: Vercel
Analytics: Vercel Analytics + GA4
CMS: Not required for MVP, structure CMS-ready
```

## 2. MVP Stack Discipline

Do not install a library just because the old spec mentioned it. The final MVP should be lean.

### Must Use

- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis
- next/image
- Lucide React

### Optional

- React Three Fiber for lightweight hero particles / route depth
- Drei for camera helpers and environment utilities
- Sanity later for testimonials, routes, fleet, blog

### Avoid in MVP

- Babylon.js
- A-Frame
- PlayCanvas
- Barba.js with Next App Router
- AOS
- heavy Spline embed if it blocks performance
- testimonial carousel packages

## 3. Performance Targets

### Mobile

- Lighthouse Performance: 85+
- Largest Contentful Paint: under 2.8s on 4G
- Total Blocking Time: under 200ms
- CLS: under 0.05
- Tap targets: minimum 48px
- Sticky mobile CTA always usable

### Desktop

- Lighthouse Performance: 90+
- Smooth scroll at 60fps on common laptops
- No layout shifts after fonts load

## 4. Core Web Vitals Strategy

### Fonts

Use maximum 2 main font families plus mono accent.

Recommended:

- Display: Cormorant Garamond or Playfair Display
- Body: Satoshi or DM Sans
- Mono: JetBrains Mono

Use `next/font` where possible. Use `display: swap`.

### Images

- Use WebP / AVIF
- Use `next/image`
- Define width and height
- Hero video must have poster fallback
- Below-fold images lazy load
- No unoptimized 4K uploads

### Videos

- Use compressed MP4 or WebM
- Hero video max 8–10 seconds loop
- Mobile poster first, play video only if connection and device allow
- Use `preload="metadata"`
- Do not autoplay heavy videos on low-power devices

### Animation

Animate only:

- transform
- opacity
- clip-path sparingly
- SVG stroke dashoffset

Avoid animating:

- width
- height
- top
- left
- margin
- padding
- box-shadow in scroll loops

## 5. Folder Structure

```txt
v3-sona-corridor/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── fleet/
│   │   ├── routes/
│   │   ├── textures/
│   │   └── og/
│   ├── videos/
│   │   ├── hero/
│   │   └── journey/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       └── inquiry/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileBookingBar.tsx
│   │   ├── sections/
│   │   │   ├── Preloader.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── RouteCorridor.tsx
│   │   │   ├── FleetShowcase.tsx
│   │   │   ├── JourneyScrub.tsx
│   │   │   ├── TrustLayer.tsx
│   │   │   ├── BookingProcess.tsx
│   │   │   ├── InquirySection.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── ui/
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── SectionLabel.tsx
│   │   │   ├── RouteBadge.tsx
│   │   │   ├── TrustPill.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── RevealText.tsx
│   │   └── three/
│   │       ├── HeroParticles.tsx
│   │       └── ReducedMotionFallback.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── analytics.ts
│   │   ├── whatsapp.ts
│   │   ├── schema.ts
│   │   └── motion.ts
│   ├── hooks/
│   │   ├── useLenis.ts
│   │   ├── useIsTouch.ts
│   │   └── usePrefersReducedMotion.ts
│   └── styles/
│       ├── tokens.css
│       └── animations.css
```

## 6. Constants File

Create `src/lib/constants.ts`:

```ts
export const BUSINESS = {
  name: "V3 Tour & Travels",
  platform: "Airport Live",
  tagline: "WHERE LUXURY MEETS COMFORT",
  phoneDisplay: "9888000510",
  phoneTel: "+919888000510",
  whatsappNumber: "919888000510",
  whatsappUrl: "https://wa.me/919888000510",
  email: "book@airportlive.in",
  website: "airportlive.in",
  websiteUrl: "https://airportlive.in",
  experience: "20+ years",
  fleet: "100+ fleet",
  location: "Ludhiana, Punjab",
  routes: ["Ludhiana", "Chandigarh", "Delhi NCR", "Punjab airport routes"],
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi V3 Tour & Travels, I want to book a premium airport transfer. Please share availability.";
```

## 7. WhatsApp Helper

Create `src/lib/whatsapp.ts`:

```ts
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE } from "./constants";

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function createInquiryMessage(data: {
  pickup?: string;
  drop?: string;
  date?: string;
  time?: string;
  flight?: string;
  passengers?: string;
  luggage?: string;
  name?: string;
}) {
  return [
    "Hi V3 Tour & Travels, I want to book a premium airport transfer.",
    `Pickup: ${data.pickup || ""}`,
    `Drop: ${data.drop || ""}`,
    `Date: ${data.date || ""}`,
    `Time: ${data.time || ""}`,
    `Flight: ${data.flight || ""}`,
    `Passengers: ${data.passengers || ""}`,
    `Luggage: ${data.luggage || ""}`,
    `Name: ${data.name || ""}`,
  ].join("\n");
}
```

## 8. Structured Data

Implement JSON-LD in `layout.tsx` or `schema.ts`.

Use:

- LocalBusiness
- TaxiService
- Service
- FAQPage

Avoid fake reviews unless real approved reviews are supplied.

## 9. Accessibility Requirements

- Semantic landmarks: header, main, section, footer
- Button labels must describe action
- Links have accessible names
- Keyboard focus states visible
- Reduced motion respected
- Color contrast AA minimum
- No hover-only information
- Sticky CTA does not cover form fields on mobile

## 10. Security and Forms

- Do not expose secrets
- Validate form with Zod
- Rate-limit if API route sends email later
- MVP can redirect to WhatsApp instead of storing data
- Do not collect unnecessary personal data

---

# FILE: 03_DESIGN_SYSTEM.md

# Design System
## SONA CORRIDOR — Warm Editorial Luxury

## 1. Design Philosophy

Sona Corridor turns Punjab’s airport road movement into a premium brand world. It is warm, calm, prepared, and quietly cinematic.

The website should feel like:

- morning light on a clean highway
- a pearl-white Innova waiting outside arrivals
- warm cream paper with deep saffron marks
- a premium hospitality brand, not a taxi app
- a cinematic editorial spread, not a service template

## 2. Visual Keywords

- Warm
- Cinematic
- Editorial
- Prepared
- Trustworthy
- Spacious
- Punjabi but not loud
- Premium but not fake luxury
- Light-mode with contrast moments

## 3. Color Tokens

```css
:root {
  --bg-primary: #F6F1E7;
  --bg-surface: #EDE6D6;
  --bg-card: #FDFAF3;
  --bg-dark: #1A1208;
  --bg-indigo: #1E2B4A;

  --text-primary: #1A1208;
  --text-secondary: #5C4733;
  --text-muted: #A08B72;
  --text-on-dark: #F6F1E7;
  --text-gold: #C8780A;

  --gold-deep: #C8780A;
  --gold-bright: #F0B429;
  --gold-pale: #F5D485;
  --saffron: #E8943A;

  --indigo-deep: #1E2B4A;
  --indigo-mid: #2D3E6A;

  --border-subtle: rgba(26, 18, 8, 0.08);
  --border-gold: rgba(200, 120, 10, 0.32);
  --glow-gold: rgba(240, 180, 41, 0.24);
  --shadow-soft: rgba(26, 18, 8, 0.08);
  --shadow-deep: rgba(26, 18, 8, 0.18);
}
```

## 4. Color Usage Rules

### Cream Background

Use for the main brand world. It should feel like textured paper, not plain beige.

### Deep Saffron Gold

Use for:

- route line
- CTAs
- highlights
- small labels
- map nodes
- hover accents

Never use gold for full backgrounds unless muted.

### Midnight Indigo

Use for contrast sections:

- testimonials
- final CTA
- trust quote
- late-scroll emotional peak

### Warm Black

Use for:

- primary text
- high-contrast hero overlays
- CTA background
- footer

Avoid pure black.

## 5. Typography

### Primary Display

**Cormorant Garamond** or **Playfair Display**

Use for:

- hero headline
- section titles
- quote moments
- large route city names

Treatment:

- oversized
- tight leading
- italic contrast words
- negative tracking only for large display

### Body Font

**Satoshi**, **DM Sans**, or **General Sans**

Use for:

- body copy
- navigation
- forms
- FAQ

Treatment:

- clean and readable
- no corporate stiffness
- line-height 1.5–1.7

### Mono Accent

**JetBrains Mono**

Use for:

- route distances
- timestamps
- section labels
- tiny airport labels
- technical trust tags

## 6. Type Scale

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--display-sm: clamp(2.4rem, 6vw, 5rem);
--display-md: clamp(4rem, 10vw, 9rem);
--display-lg: clamp(5.6rem, 15vw, 13rem);
```

## 7. Composition Rules

- Use asymmetry.
- Avoid equal card grids as primary storytelling.
- Treat route line as a visual protagonist.
- Use overlap: labels over visuals, text crossing route lines, sticky chapter markers.
- Use negative space generously.
- One visual memory per section.
- Every section must have a clear emotional job.

## 8. UI Components

### CTA Button

Primary:

- rounded-full
- dark warm black background
- cream text
- gold glow on hover
- icon arrow
- magnetic effect desktop only

Secondary:

- cream background
- subtle border
- gold hover line

### Cards

Cards are allowed only when they feel editorial.

Rules:

- large radius
- warm paper surface
- thin border
- no generic icon grid
- each card must contain a real trust point or useful route detail

### Form Inputs

- large touch targets
- rounded 20–28px
- warm cream surface
- gold focus ring
- labels always visible
- no placeholder-only labels

### Sticky Mobile Booking Bar

- fixed bottom
- two buttons: WhatsApp and Call
- safe-area padding
- high contrast
- always accessible

## 9. Texture

Use subtle paper grain. Never use heavy noise that affects readability.

Recommended:

```css
.paper-grain::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url('/images/textures/grain.svg');
  mix-blend-mode: multiply;
}
```

## 10. Motion Design Language

Motion should feel like:

- road drawing forward
- morning light passing across surfaces
- car cabin settling into comfort
- type arriving like title cards
- map labels appearing like airport boards

Default eases:

```txt
Entry: power3.out
Transitions: power2.inOut
Pinned scrub: none / linear
Magnetic return: elastic.out(1, 0.5)
Text reveal: power3.out
```

## 11. Desktop vs Mobile

### Desktop

- custom cursor allowed
- magnetic buttons allowed
- route line can have deeper parallax
- fleet horizontal pin allowed
- richer video scrub allowed

### Mobile

- no custom cursor
- no magnetic hover
- simplified route animation
- sticky CTA always visible
- horizontal fleet becomes swipe cards or vertical stacked editorial panels
- video uses poster fallback when needed

---

# FILE: 04_ARCHITECTURE.md

# Architecture
## V3 Tour & Travels — SONA CORRIDOR

## 1. Page Architecture

Single-page scroll experience:

```txt
App Layout
└── Home Page
    ├── Preloader
    ├── Navbar
    ├── Hero
    ├── RouteCorridor
    ├── FleetShowcase
    ├── JourneyScrub
    ├── TrustLayer
    ├── BookingProcess
    ├── InquirySection
    ├── Testimonials
    ├── FAQ
    ├── FinalCTA
    ├── Footer
    └── MobileBookingBar
```

## 2. Component Responsibilities

### Preloader

Purpose: brand entry, not loading spinner.

Elements:

- V3 logo text
- Tour & Travels label
- gold line
- cream wipe reveal

### Navbar

Purpose: trust and navigation.

Elements:

- V3 Tour & Travels logo
- route links
- phone number
- WhatsApp button
- mobile drawer

Behavior:

- transparent on hero
- cream blur after scroll
- compact on mobile

### Hero

Purpose: immediate premium positioning.

Elements:

- eyebrow: Ludhiana · Chandigarh · Delhi NCR
- headline: ARRIVE LIKE YOU WERE EXPECTED.
- subheadline
- WhatsApp CTA
- call CTA
- cinematic road/car visual
- trust chips: 20+ years, 100+ fleet, 24/7

### RouteCorridor

Purpose: make the road visible.

Elements:

- custom SVG map line
- city nodes
- distance/time labels
- route cards
- CTA to inquiry

### FleetShowcase

Purpose: make Innova Crysta feel like a premium object.

Elements:

- exterior
- cabin
- luggage
- chauffeur
- cleanliness
- comfort details

Desktop behavior:

- pinned horizontal scroll

Mobile behavior:

- stacked editorial panels

### JourneyScrub

Purpose: turn scrolling into the feeling of travel.

Elements:

- scroll-scrubbed road/cabin video
- overlay chapter copy
- route progress labels

Fallback:

- static image sequence or poster with parallax

### TrustLayer

Purpose: prove V3 is operationally credible.

Elements:

- 20+ years experience
- 100+ fleet
- professional chauffeurs
- airport focused
- WhatsApp-first coordination
- clean vehicle promise

### BookingProcess

Purpose: reduce mental effort.

Steps:

1. Share route
2. Confirm car and timing
3. Ride prepared

### InquirySection

Purpose: convert.

Elements:

- form
- direct WhatsApp button
- call button
- message preview

### Testimonials

Purpose: social proof without fake carousel.

Use only approved real testimonials. If not available, use non-review trust statements instead.

### FAQ

Purpose: answer booking objections.

### FinalCTA

Purpose: emotional close.

Headline:

> Your arrival deserves a plan.

CTA:

> Book on WhatsApp

### Footer

Purpose: final trust and local SEO.

Include:

- V3 Tour & Travels
- Premium Airport Transfers by Airport Live
- phone
- email
- website
- routes
- service areas

## 3. Data Architecture

Create `src/lib/data.ts`:

```ts
export const routes = [
  {
    id: "ludhiana-chandigarh",
    from: "Ludhiana",
    to: "Chandigarh Airport",
    distance: "≈95 km",
    duration: "~90 min",
    useCases: ["Business departures", "Family pickup", "Early morning flights"],
  },
  {
    id: "ludhiana-delhi",
    from: "Ludhiana",
    to: "Delhi NCR",
    distance: "≈310 km",
    duration: "~3.5 hrs",
    useCases: ["NRI arrival", "Corporate travel", "Wedding movement"],
  },
  {
    id: "chandigarh-delhi",
    from: "Chandigarh",
    to: "Delhi NCR",
    distance: "≈265 km",
    duration: "~3 hrs",
    useCases: ["Airport transfer", "Executive travel", "Premium family route"],
  },
];

export const fleetMoments = [
  "Exterior presence",
  "Clean cabin",
  "Luggage comfort",
  "Professional chauffeur",
];
```

## 4. Animation Architecture

Each animated section should own its animation inside a client component.

Rules:

- Use `useGSAP` from `@gsap/react`
- Scope selectors with ref
- Kill ScrollTriggers on unmount
- Disable complex sequences on reduced motion
- Use `ScrollTrigger.refresh()` after images/video load

## 5. Responsive Architecture

### Breakpoints

```txt
360px: smallest Android baseline
390px: modern iPhone baseline
768px: tablet
1024px: laptop
1440px: desktop
```

### Mobile Priority

The mobile user should be able to:

1. understand the brand
2. see route coverage
3. call or WhatsApp
4. submit inquiry

within 30 seconds.

## 6. Content Source Strategy

MVP hardcodes content in data files. Later, Sanity CMS can manage:

- routes
- fleet images
- testimonials
- FAQs
- blog/local SEO pages
- service area landing pages

## 7. Future Pages

Phase 2 may add:

- `/routes/ludhiana-to-chandigarh-airport`
- `/routes/ludhiana-to-delhi-airport`
- `/fleet/innova-crysta`
- `/corporate-travel`
- `/airport-transfer-ludhiana`
- `/about`

---

# FILE: 05_ANIMATION_SPEC.md

# Animation Specification
## V3 Tour & Travels — SONA CORRIDOR

## 1. Global Motion Rules

Every animation must serve one of these purposes:

1. Make the route feel alive
2. Make the brand feel premium
3. Reduce booking hesitation
4. Direct attention to WhatsApp/call
5. Create a cinematic sense of arrival

Avoid random fade-ins.

## 2. Timing Standards

```txt
Micro interactions: 150–300ms
Section reveal: 600–900ms
Hero title reveal: 1200–1800ms
Preloader: 2200–2800ms
Pinned route sequence: 1800–3200ms scroll range
Fleet horizontal scrub: 2500–4000px desktop scroll range
Page/nav transition: 500–900ms
```

## 3. Easing

```txt
Primary entry: power3.out
Soft entry: power2.out
Transition: power2.inOut
Route draw: none or power1.inOut
Magnetic return: elastic.out(1, 0.5)
Exit: power2.in
```

## 4. Preloader

### Feel

A quiet brand entry, like a car door closing before the journey starts.

### Sequence

```txt
0ms: warm black screen
180ms: V3 appears, opacity 0→1, scale .92→1
700ms: TOUR & TRAVELS appears, letter spacing wide
1100ms: gold rule draws from center
1600ms: logo fades upward
1900ms: cream wipe reveals page
2400ms: hero animation starts
```

### Mobile

Max duration 1800ms. Do not delay booking CTA too long.

## 5. Hero Animation

### Elements

- background road/video
- route glow
- eyebrow
- headline words
- subheadline
- CTA buttons
- trust chips
- car/road visual

### Sequence

```txt
0.0s: background road/video fades in
0.2s: gold route glow slides diagonally through hero
0.4s: eyebrow rises 18px → 0, opacity 0→1
0.6s: ARRIVE chars reveal from y 90, rotationX -70
0.9s: LIKE YOU WERE reveals with italic word emphasis
1.2s: EXPECTED reveals slightly slower
1.5s: subheadline fades and rises
1.7s: CTA appears with small scale .96→1
1.9s: trust chips stagger in
2.1s: scroll indicator appears
```

### Scroll Behavior

From scroll 0–20%:

- hero background moves slower
- headline moves slightly upward
- road glow moves diagonally
- car visual parallax shifts

### Mobile

- character reveal becomes word reveal
- no heavy 3D
- CTA appears within first viewport

## 6. Route Corridor Animation

### Feel

The golden corridor is being drawn for the visitor.

### Trigger

Start when RouteCorridor top hits 70% viewport.

### Sequence

```txt
0.0s: section label fades in
0.2s: map background appears with soft scale
0.4s: Ludhiana node appears
0.6s–1.8s: gold route SVG path draws
1.0s: Chandigarh node appears
1.6s: Delhi NCR node appears
1.8s: route cards stagger upward
2.2s: CTA appears
```

### SVG Path

Use stroke dasharray / stroke dashoffset.

### Scroll Scrub Option

On desktop, route path progress can be tied to scroll progress:

```txt
start: top 70%
end: bottom 35%
scrub: 1
```

### Mobile

Auto-draw route once. Do not pin.

## 7. Fleet Showcase Animation

### Desktop

Pinned horizontal scroll.

### Panels

1. Exterior
2. Cabin
3. Luggage
4. Chauffeur

### Trigger

Start when section top reaches top.

### Behavior

- section pins
- panels translate horizontally
- car silhouette/image remains sticky as anchor
- each panel headline masks upward
- gold progress line fills

### Mobile

No pin. Stack panels vertically with gentle reveal.

## 8. Journey Scrub Animation

### Purpose

Make the visitor feel the ride.

### Desktop

- pin video section
- scrub video currentTime based on scroll progress
- overlay copy changes at 25%, 50%, 75%

### Copy Beats

1. “Pickup confirmed.”
2. “Cabin stays quiet.”
3. “The road becomes simple.”
4. “You arrive prepared.”

### Fallback

If video unavailable, use 4 image panels with parallax.

## 9. Trust Layer Animation

### Purpose

Make trust feel earned, not shouted.

### Sequence

- large number counters reveal only once
- trust statements appear as airport-board rows
- icons draw in with stroke animation

### Numbers

Do not animate fake precision. Use:

- 20+
- 100+
- 24/7

## 10. Booking Process Animation

### Behavior

Three steps appear as connected route stops.

1. Share route
2. Confirm timing
3. Ride prepared

Gold line connects each step as user scrolls.

## 11. Inquiry Form Motion

### Entry

- form container slides 24px up
- input fields stagger 60ms
- WhatsApp preview card appears after fields

### Interaction

- focus ring gold
- CTA has magnetic desktop effect
- submit generates WhatsApp deep link

## 12. FAQ Animation

- accordion opens with height auto animation
- icon rotates 45 degrees
- duration 260ms
- ease power2.out

## 13. Final CTA Animation

### Feel

The journey resolves.

### Sequence

- indigo/dark background fades in
- headline reveals line by line
- gold line passes behind text
- WhatsApp button arrives last
- footer details fade in after CTA

## 14. Custom Cursor

Desktop only.

Behavior:

- small gold dot
- soft follower ring
- expands on links/buttons
- hides on touch devices

## 15. Reduced Motion

When `prefers-reduced-motion: reduce`:

- disable pinned scrub
- disable magnetic effects
- disable custom cursor
- show content instantly with small opacity transition
- video not scroll-scrubbed

---

# FILE: 06_CONTENT_BRIEF.md

# Content Brief
## V3 Tour & Travels — SONA CORRIDOR

## 1. Voice

V3 speaks like a five-star hotel concierge, not a taxi vendor.

Tone:

- quietly confident
- precise
- warm
- direct
- visual
- trust-first
- no empty hype

Avoid:

- “best taxi service”
- “affordable luxury”
- “customer satisfaction is our priority”
- “we provide top class service”
- “book now and enjoy”

Use:

- “Your flight lands. Your car is already waiting.”
- “Book once. We handle the road.”
- “Ludhiana, Chandigarh, Delhi NCR — prepared before pickup.”

## 2. Primary CTA Language

### Action-focused

Book Your Transfer

### Benefit-focused

Arrive Without Waiting

### Urgency-focused

Check Availability Now

## 3. Hero Copy

### Eyebrow

```txt
LUDHIANA · CHANDIGARH · DELHI NCR
```

### Headline

```txt
ARRIVE
LIKE YOU WERE
EXPECTED.
```

### Subheadline

```txt
Premium airport transfers across Punjab. Toyota Innova Crysta, professional chauffeurs, and one-tap booking with V3 Tour & Travels.
```

### CTA

```txt
Book Your Transfer
```

### Secondary CTA

```txt
Call 9888000510
```

### Trust Chips

```txt
20+ years experience
100+ fleet
24/7 airport movement
Airport Live connected
```

## 4. Route Corridor Copy

### Chapter Label

```txt
Chapter I · The Road
```

### Headline

```txt
Three cities. One trusted road.
```

### Body

```txt
From Ludhiana to Chandigarh and Delhi NCR, V3 turns airport movement into a prepared corridor — clear timing, clean vehicles, and direct coordination before pickup.
```

### Route Labels

```txt
LUDHIANA
The starting point.

CHANDIGARH
The city beautiful.

DELHI NCR
The destination corridor.
```

### Route Details

```txt
LDH → CHD  ≈ 95 km  ·  ~90 min
LDH → DEL  ≈ 310 km ·  ~3.5 hrs
CHD → DEL  ≈ 265 km ·  ~3 hrs
```

### CTA

```txt
Share Your Route
```

## 5. Fleet Showcase Copy

### Chapter Label

```txt
Chapter II · The Fleet
```

### Headline

```txt
The car says it first.
```

### Body

```txt
A clean Toyota Innova Crysta does more than move people. It sets the tone for the arrival — calm cabin, planned luggage, professional handover, and the comfort expected from a premium airport transfer.
```

### Panel 1 — Exterior

```txt
Pearl-white presence.
Not taxi clutter.
```

Body:

```txt
The pickup moment matters. The vehicle should feel prepared before the door opens.
```

### Panel 2 — Cabin

```txt
Cool cabin.
Quiet road.
```

Body:

```txt
For tired flyers, comfort begins with silence, space, and no negotiation after landing.
```

### Panel 3 — Luggage

```txt
Family bags planned.
Not adjusted later.
```

Body:

```txt
Airport travel often means suitcases, wedding bags, business cases, and family movement. The route is planned around real travel, not ideal conditions.
```

### Panel 4 — Chauffeur

```txt
Professional pickup etiquette.
```

Body:

```txt
Direct contact, clear timing, airport awareness, and calm coordination from first message to final drop.
```

## 6. Journey Scrub Copy

### Headline

```txt
The road should feel handled.
```

### Beat 1

```txt
Pickup confirmed before you move.
```

### Beat 2

```txt
The cabin stays calm after the airport rush.
```

### Beat 3

```txt
Punjab passes quietly outside the glass.
```

### Beat 4

```txt
You arrive without chasing the car.
```

## 7. Trust Layer Copy

### Headline

```txt
Trust is built before pickup.
```

### Body

```txt
V3 Tour & Travels is designed for people who do not want airport uncertainty — business travelers, NRIs, families, corporate guests, and anyone who values a prepared ride over a random booking.
```

### Trust Points

```txt
20+ years of travel experience
100+ fleet network
Toyota Innova Crysta focus
Professional chauffeurs
WhatsApp-first coordination
Airport route understanding
Clean premium vehicles
Connected with Airport Live
```

## 8. Booking Process Copy

### Headline

```txt
Book once. We handle the road.
```

### Step 1

```txt
Share your route.
Pickup, drop, date, time, passengers, luggage, and flight details if available.
```

### Step 2

```txt
We confirm personally.
Availability, timing, vehicle, and fare are confirmed clearly before travel.
```

### Step 3

```txt
Your car arrives prepared.
Clean vehicle, professional chauffeur, and direct contact until drop.
```

## 9. Inquiry Section Copy

### Headline

```txt
Tell us the route. We’ll confirm the ride.
```

### Body

```txt
Send the details on WhatsApp or call directly. For airport transfers, include flight time so the pickup can be planned properly.
```

### Form Labels

```txt
Pickup city
Drop location
Travel date
Travel time
Flight number optional
Passengers
Luggage
Your name
Phone number
```

### Form CTA

```txt
Send Inquiry on WhatsApp
```

## 10. Testimonials / Trust Statements

If real reviews are not available, do not fake them.

Use this section title:

```txt
Quiet service is remembered.
```

Trust statement options:

```txt
For airport transfers, the best moment is when nothing feels uncertain.
```

```txt
A prepared car, a clean cabin, and a reachable driver — that is the difference people remember.
```

```txt
From business guests to family arrivals, V3 is built around one promise: the road should already be handled.
```

## 11. FAQ Copy

### FAQ 1

**Question:** How do I book a V3 airport transfer?  
**Answer:** Tap WhatsApp, share pickup, drop, date, time, passengers, luggage, and flight details if available. The team confirms personally.

### FAQ 2

**Question:** Which routes do you cover?  
**Answer:** Core routes include Ludhiana, Chandigarh, Delhi NCR, Punjab airport transfers, and intercity premium road travel.

### FAQ 3

**Question:** What vehicle do you provide?  
**Answer:** The fleet focus is Toyota Innova Crysta and premium clean vehicles with professional chauffeurs.

### FAQ 4

**Question:** Do you show fixed prices online?  
**Answer:** Fares are confirmed personally based on route, timing, vehicle, luggage, and availability.

### FAQ 5

**Question:** Can I call directly instead of WhatsApp?  
**Answer:** Yes. Call 9888000510 for immediate booking support.

## 12. Final CTA Copy

### Headline

```txt
Your arrival deserves a plan.
```

### Body

```txt
Book V3 Tour & Travels for premium airport transfers across Ludhiana, Chandigarh, Delhi NCR, and Punjab road routes.
```

### CTA

```txt
Book on WhatsApp
```

## 13. Footer Copy

```txt
V3 Tour & Travels
Premium Airport Transfers by Airport Live
Ludhiana · Chandigarh · Delhi NCR
Phone / WhatsApp: 9888000510
Email: book@airportlive.in
Website: airportlive.in
WHERE LUXURY MEETS COMFORT
```

---

# FILE: 07_MIDJOURNEY_PROMPTS.md

# Midjourney / AI Image Prompts
## V3 Tour & Travels — SONA CORRIDOR

## Usage Rules

- Generate 4 variations for each prompt.
- Pick the most realistic result.
- Avoid plastic AI look.
- Color grade warm.
- Add subtle film grain.
- Export WebP and AVIF.
- Never show fake text, fake logos, or unreadable license plates.

## 1. Hero Background — Desktop

```txt
Cinematic wide aerial view of a six-lane Indian expressway cutting through golden wheat fields of Punjab at early morning sunrise, single pearl white Toyota Innova Crysta driving away from camera in center lane, warm amber light, soft morning mist near fields, telephoto compression, premium automotive editorial photography, calm road, luxury airport transfer mood, subtle film grain, saffron and cream sky, realistic Indian highway environment, no text, no logos, no watermark --ar 21:9 --v 6.1 --style raw --q 2
```

Negative:

```txt
no traffic jam, no extra cars, no people, no fake text, no ugly signs, no cold blue tones, no overexposure, no cartoon, no plastic AI car, no unrealistic wheels, no distorted vehicle
```

## 2. Hero Background — Mobile

```txt
Vertical cinematic shot of pearl white Toyota Innova Crysta on empty Punjab expressway at golden sunrise, viewed from slightly above and behind, golden wheat fields on both sides, warm amber reflection on vehicle roof, soft mist, calm premium travel atmosphere, editorial automotive photography, realistic India, film grain, no text, no logos --ar 9:16 --v 6.1 --style raw --q 2
```

## 3. Innova Exterior — Fleet Panel

```txt
Toyota Innova Crysta pearl white full exterior 3/4 front view, parked on clean empty road near Punjab wheat field during golden hour, warm sunlight on body lines, premium automotive campaign photography, low camera angle, shallow depth of field, realistic reflections, luxury airport transfer brand mood, no text, no logos, no people --ar 16:9 --v 6.1 --style raw --q 2
```

## 4. Innova Cabin — Fleet Panel

```txt
Premium clean Toyota Innova Crysta interior cabin, beige and black leather seats, soft warm morning light through windows, calm quiet luxury travel mood, airport transfer comfort, realistic automotive interior photography, no people, no visible brand text, no clutter, no screen text, subtle film grain --ar 16:9 --v 6.1 --style raw --q 2
```

## 5. Luggage Moment

```txt
Open rear boot of Toyota Innova Crysta with neatly arranged premium travel luggage, warm golden hour light, clean vehicle interior, airport transfer readiness, realistic editorial photography, Punjab travel context, no people, no text, no logos, calm premium mood --ar 16:9 --v 6.1 --style raw --q 2
```

## 6. Chauffeur Detail

```txt
Professional chauffeur hand opening rear door of pearl white Toyota Innova Crysta, only hand and sleeve visible, premium airport pickup moment, warm sunrise light, shallow depth of field, clean road background, luxury hospitality mood, realistic cinematic photography, no face, no text, no logo --ar 16:9 --v 6.1 --style raw --q 2
```

## 7. Route Map Background Texture

```txt
Abstract editorial map texture inspired by Punjab road corridors, warm cream paper background, deep saffron gold line work, subtle topographic contours, minimal luxury travel brand design, no readable text, no actual map labels, premium print texture, soft grain --ar 16:9 --v 6.1 --style raw --q 2
```

## 8. Testimonial / Trust Background

```txt
Midnight indigo premium editorial background with subtle golden road light streak, abstract cinematic travel atmosphere, soft grain, luxury airport transfer brand, minimal, no text, no objects, deep warm shadows --ar 16:9 --v 6.1 --style raw --q 2
```

## 9. Final CTA Background

```txt
Cinematic night highway outside airport terminal atmosphere, warm golden lane lights, soft bokeh, dark indigo sky, premium arrival mood, no people, no readable signs, no logos, editorial luxury travel photography, subtle film grain --ar 16:9 --v 6.1 --style raw --q 2
```

---

# FILE: 08_KLING_VIDEO_PROMPTS.md

# Kling / AI Video Prompts
## V3 Tour & Travels — SONA CORRIDOR

## Export Requirements

- 8–10 seconds for hero loop
- 5–8 seconds for ambient loops
- 1080p minimum, 4K preferred then compressed
- H.264 MP4 + WebM if possible
- No text, no fake signs, no people faces unless approved
- Warm cinematic grade
- Poster frame exported for every video

## 1. Hero Road Loop

```json
{
  "scene": "A single pearl white Toyota Innova Crysta drives smoothly on an empty six-lane Indian expressway through golden wheat fields in Punjab at early morning sunrise. Soft mist rests near the road edges. Warm amber light reflects on the car roof. The road feels calm, prepared, and premium.",
  "camera": "Slow aerial push-in from above and behind at a 45-degree angle. Camera movement is smooth and cinematic. The car stays centered in lane.",
  "lighting": "Golden hour sunrise, warm saffron sky, soft shadows, gentle highlights on vehicle.",
  "mood": "Prepared arrival, calm luxury, airport transfer confidence.",
  "duration": "10s seamless loop",
  "style": "Cinematic 4K, ARRI Alexa feel, 24fps, realistic automotive editorial, subtle film grain",
  "negative": "no traffic, no pedestrians, no trucks, no readable signs, no cold blue tones, no overexposed sky, no shaky camera, no fast cuts, no distorted car"
}
```

## 2. Dashboard POV Journey Scrub

```json
{
  "scene": "First-person dashboard view from inside a Toyota Innova Crysta driving on a smooth Punjab expressway. Leather dashboard visible at bottom edge. The road is centered and calm. The environment moves from golden wheat fields to planned city road trees to wider Delhi NCR highway atmosphere.",
  "camera": "Fixed dashboard-mounted camera, smooth forward motion, no cuts, no jerks.",
  "lighting": "Warm morning light gradually becoming brighter day light.",
  "mood": "Calm after airport rush, road handled, premium comfort.",
  "duration": "10s continuous shot for scroll scrub",
  "style": "Realistic cinematic interior driving footage, 24fps, subtle film grain",
  "negative": "no visible speedometer text, no GPS text, no camera reflection, no heavy traffic, no sudden turns, no braking, no people faces"
}
```

## 3. Exterior Car Hero Detail

```json
{
  "scene": "Pearl white Toyota Innova Crysta parked on an empty premium road at golden hour, headlights softly glowing, wheat field background blurred, warm air and subtle dust particles visible in light.",
  "camera": "Slow low-angle dolly from front three-quarter to side profile.",
  "lighting": "Warm sunset/sunrise highlights with soft shadows.",
  "mood": "Premium vehicle presence, quiet confidence.",
  "duration": "6s loop",
  "style": "Luxury automotive campaign, cinematic 4K, realistic, warm film grain",
  "negative": "no text, no logos, no extra cars, no people, no warped vehicle shape, no fake reflections"
}
```

## 4. Chauffeur Door Moment

```json
{
  "scene": "Professional chauffeur opens the rear passenger door of a clean pearl white Toyota Innova Crysta. Only the chauffeur hand and formal sleeve are visible. The moment feels like a hotel arrival service.",
  "camera": "Slow close-up push toward the opening door, shallow depth of field.",
  "lighting": "Warm morning light, soft highlights on car surface.",
  "mood": "Hospitality, readiness, arrival comfort.",
  "duration": "5s loop",
  "style": "Premium service campaign, realistic cinematic footage",
  "negative": "no face, no logo, no text, no crowd, no distorted hands, no jerky movement"
}
```

## 5. Abstract Route Line Transition

```json
{
  "scene": "A glowing saffron-gold line draws across a warm cream paper map texture, moving like a road from one city point to another. Small light particles trail softly behind the line.",
  "camera": "Top-down editorial map view, very slow push in.",
  "lighting": "Warm paper surface, soft golden glow.",
  "mood": "Punjab corridor, premium route clarity, cinematic map reveal.",
  "duration": "6s seamless loop",
  "style": "Abstract premium motion graphic, clean, editorial, not techy",
  "negative": "no readable text, no actual map labels, no neon cyberpunk, no clutter, no cheap glowing effect"
}
```

---

# FILE: 09_SPLINE_3D_DIRECTION.md

# Spline / 3D Direction
## V3 Tour & Travels — SONA CORRIDOR

## 1. Role of 3D

3D must support brand memory, not become a gimmick.

Primary 3D idea:

> A premium abstract V3 route object: a golden road ribbon floating over a warm paper terrain, with subtle car silhouette movement.

Do not use a heavy full detailed car model in MVP unless optimized.

## 2. Recommended 3D Object

### Object Name

`Sona Route Ribbon`

### Description

A thin saffron-gold road ribbon bends through space like the Ludhiana → Chandigarh → Delhi corridor. It floats above a warm cream plane with soft shadows. Small node markers glow at route points.

### Visual Components

- warm cream base plane
- golden curved road ribbon
- 3 route nodes
- tiny abstract car capsule
- soft indigo horizon
- subtle particle dust

## 3. Materials

### Road Ribbon

```txt
Material: satin metallic gold
Color: #C8780A
Roughness: 0.38
Metalness: 0.35
Glow: subtle, not neon
```

### Base Plane

```txt
Material: matte paper
Color: #F6F1E7
Texture: subtle grain/bump
Roughness: 0.88
```

### Route Nodes

```txt
Material: luminous gold glass
Color: #F0B429
Emission: low-medium
```

### Car Capsule

```txt
Material: pearl white automotive paint
Color: #FDF7EA
Roughness: 0.22
Metalness: 0.28
```

## 4. Animation

### Idle

- road ribbon floats vertically by 4–6px
- car capsule moves slowly 5% along path then loops back subtly
- nodes pulse every 3 seconds
- camera drifts slightly left/right based on mouse movement

### Scroll Link

Optional desktop only:

- route object rotates 8–12 degrees as hero scrolls
- camera pulls upward during transition to route section

### Mobile

Use static rendered poster or simplified CSS/SVG route. Do not load full 3D unless performance permits.

## 5. Lighting

- large warm area light from top left
- soft indigo fill from right
- low-intensity gold rim light
- ambient occlusion enabled
- shadows soft

## 6. Export Requirements

- Use compressed assets
- Avoid huge geometry
- No texture above 2K
- Draco compression if exported as GLB
- Test under 3MB if possible
- Provide poster fallback

## 7. Implementation Options

### Option A — Spline Embed

Fastest. Use only if load is acceptable.

### Option B — R3F Rebuild

Recommended for performance control. Build route ribbon using curve geometry in Three.js / React Three Fiber.

### Option C — SVG/CSS Fallback

Required for mobile and reduced-motion.

---

# FILE: 10_IMAGE_ASSET_LIST.md

# Image Asset List
## V3 Tour & Travels — SONA CORRIDOR

## 1. Required Assets

| Asset | Use | Size | Format | Priority |
|---|---|---:|---|---|
| Hero road desktop | Hero background | 2400×1100 | AVIF/WebP | Critical |
| Hero road mobile | Mobile hero | 1080×1920 | AVIF/WebP | Critical |
| Innova exterior | Fleet panel | 1800×1200 | AVIF/WebP | Critical |
| Innova cabin | Fleet panel | 1800×1200 | AVIF/WebP | Critical |
| Luggage/boot | Fleet panel | 1800×1200 | AVIF/WebP | High |
| Chauffeur door | Fleet panel | 1800×1200 | AVIF/WebP | High |
| Route paper texture | Route section | 1800×1200 | WebP/SVG | High |
| Indigo trust background | Testimonials/final CTA | 1800×1200 | WebP | Medium |
| OG image | WhatsApp/social preview | 1200×630 | PNG/WebP | Critical |
| Grain texture | Global | 512×512 | SVG/PNG | Medium |

## 2. Video Assets

| Asset | Use | Duration | Format | Priority |
|---|---|---:|---|---|
| Hero road loop | Hero desktop | 8–10s | MP4/WebM | High |
| Dashboard POV | Journey scrub | 10s | MP4/WebM | Medium |
| Door open loop | Fleet/chauffeur | 5s | MP4/WebM | Medium |
| Route line abstract | Route transition | 6s | MP4/WebM | Optional |

## 3. Fallback Rules

If real photos are not ready:

- Use AI-generated cinematic images from prompt pack.
- Never show placeholders.
- Never write “image coming soon.”
- Use abstract route/road visuals until real fleet photos exist.

## 4. Real Shoot Direction

If Ajay shoots real vehicle assets, capture:

### Exterior

- front 3/4 low angle
- side profile with road line
- rear 3/4 with golden light
- headlights on at dusk

### Interior

- second-row seats
- dashboard POV
- AC vents / clean cabin details
- door opening moment

### Operational

- luggage loading
- chauffeur hand opening door
- phone with WhatsApp booking message
- airport pickup board without fake text

## 5. Naming Convention

```txt
hero-road-desktop.avif
hero-road-mobile.avif
fleet-innova-exterior.avif
fleet-innova-cabin.avif
fleet-luggage.avif
fleet-chauffeur-door.avif
route-paper-texture.webp
trust-indigo-bg.webp
og-v3-airport-live.png
texture-grain.svg
```

---

# FILE: 11_SEO_ANALYTICS_QA.md

# SEO, Analytics, and QA
## V3 Tour & Travels — SONA CORRIDOR

## 1. SEO Positioning

Primary keywords:

- airport transfer Ludhiana
- Ludhiana to Chandigarh airport taxi
- Ludhiana to Delhi airport taxi
- premium taxi service Ludhiana
- Innova Crysta taxi Ludhiana
- Punjab airport transfer
- Chandigarh to Delhi taxi
- V3 Tour & Travels
- Airport Live

Use keywords naturally. Do not stuff.

## 2. Metadata

### Title

```txt
V3 Tour & Travels | Premium Airport Transfers in Ludhiana, Chandigarh & Delhi NCR
```

### Description

```txt
Book premium airport transfers with V3 Tour & Travels by Airport Live. Toyota Innova Crysta, professional chauffeurs, and trusted Punjab routes across Ludhiana, Chandigarh and Delhi NCR. Call or WhatsApp 9888000510.
```

### OG Title

```txt
V3 Tour & Travels — Arrive Like You Were Expected
```

### OG Description

```txt
Premium airport transfers across Ludhiana, Chandigarh, Delhi NCR and Punjab road routes. Book on WhatsApp: 9888000510.
```

## 3. Schema

Implement:

- LocalBusiness
- TaxiService
- Service
- FAQPage
- Organization

Business data:

```json
{
  "name": "V3 Tour & Travels",
  "alternateName": "Airport Live",
  "telephone": "+919888000510",
  "email": "book@airportlive.in",
  "url": "https://airportlive.in",
  "areaServed": ["Ludhiana", "Chandigarh", "Delhi NCR", "Punjab"],
  "serviceType": "Premium airport transfer service"
}
```

## 4. Analytics Events

Track:

```txt
whatsapp_hero_click
whatsapp_sticky_click
call_nav_click
call_sticky_click
route_card_click
inquiry_form_start
inquiry_whatsapp_submit
faq_open
final_cta_click
scroll_25
scroll_50
scroll_75
scroll_90
```

## 5. QA Checklist

### Content

- No placeholder text
- No fake reviews
- Correct phone number everywhere: 9888000510
- Correct WhatsApp link everywhere: https://wa.me/919888000510
- Correct email everywhere: book@airportlive.in
- Correct website everywhere: airportlive.in
- Tagline appears correctly: WHERE LUXURY MEETS COMFORT

### Visual

- Hero feels premium in first viewport
- Route animation is visible
- Fleet does not look like generic cards
- Colors match Sona Corridor palette
- Typography has strong hierarchy
- No stock-looking cheap images

### Mobile

Test widths:

- 360px
- 390px
- 414px
- 768px

Check:

- sticky CTA visible
- buttons 48px minimum
- form not blocked by sticky CTA
- text does not overflow
- route map legible
- no horizontal scroll bugs

### Performance

- No layout-triggering scroll animations
- No huge uncompressed images
- Three.js disabled or simplified on mobile
- ScrollTrigger killed on unmount
- Videos have poster images
- Font loading does not shift layout

### Accessibility

- Keyboard navigation works
- Focus states visible
- Alt text meaningful
- Form labels visible
- Accordions accessible
- Reduced motion works

### Deployment

- Vercel build passes
- sitemap generated
- robots generated
- metadata correct
- OG image renders
- no console errors
- no hydration mismatch

---

# FILE: 12_MASTER_BUILD_COMMAND.md

# Master Build Command
## Paste into Cursor / Claude / Windsurf / Codex

```txt
You are rebuilding the V3 Tour & Travels website from the FULL FINAL MD SPEC PACK.

Read all files first:

1. 00_READ_ME_FIRST.md
2. 01_PRD.md
3. 02_TRD.md
4. 03_DESIGN_SYSTEM.md
5. 04_ARCHITECTURE.md
6. 05_ANIMATION_SPEC.md
7. 06_CONTENT_BRIEF.md
8. 07_MIDJOURNEY_PROMPTS.md
9. 08_KLING_VIDEO_PROMPTS.md
10. 09_SPLINE_3D_DIRECTION.md
11. 10_IMAGE_ASSET_LIST.md
12. 11_SEO_ANALYTICS_QA.md

Important:
The previous live build was too basic. Do not preserve its visual system. Preserve only useful business content and contact details.

Hard business facts:
- Business Name: V3 Tour & Travels
- Platform: Airport Live
- Website: airportlive.in
- Phone / WhatsApp: 9888000510
- WhatsApp URL: https://wa.me/919888000510
- Tel: tel:+919888000510
- Email: book@airportlive.in
- Tagline: WHERE LUXURY MEETS COMFORT
- Experience: 20+ years
- Fleet: 100+ fleet
- Core routes: Ludhiana, Chandigarh, Delhi NCR, Punjab airport routes
- Fleet focus: Toyota Innova Crysta

Build stack:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis
- next/image
- Lucide React
- React Hook Form + Zod if form is built
- Optional React Three Fiber only if lightweight and performant

Creative direction:
SONA CORRIDOR — warm editorial luxury, cream paper, deep saffron gold, midnight indigo contrast, cinematic route storytelling.

Do not use:
- template layout
- generic card-grid hero
- placeholder images or placeholder text
- fake testimonials
- public pricing table unless explicitly approved
- heavy 3D that breaks mobile performance
- Inter/Roboto/Arial as display font
- random fade animations

Build order:

Phase 1 — Foundation
1. Create Next.js project structure.
2. Add constants.ts with exact business data.
3. Add global design tokens.
4. Add font setup.
5. Add Lenis provider.
6. Add analytics helper.

Phase 2 — Core Layout
1. Navbar
2. Footer
3. MobileBookingBar
4. MagneticButton
5. RevealText
6. SectionLabel

Phase 3 — Hero
1. Cinematic hero with ARRIVE LIKE YOU WERE EXPECTED.
2. WhatsApp CTA and call CTA.
3. Trust chips.
4. Route glow / road visual.
5. Mobile-first layout.

Phase 4 — Route Corridor
1. SVG route animation Ludhiana → Chandigarh → Delhi NCR.
2. Route cards with distance/time.
3. Scroll-triggered path draw desktop.
4. One-time auto draw mobile.

Phase 5 — Fleet Showcase
1. Toyota Innova Crysta editorial showcase.
2. Exterior, cabin, luggage, chauffeur panels.
3. Desktop horizontal pin.
4. Mobile stacked panels.
5. No placeholders.

Phase 6 — Journey + Trust
1. Journey scrub video or image fallback.
2. Trust layer with 20+, 100+, 24/7.
3. Booking process as 3 connected steps.

Phase 7 — Conversion
1. Inquiry form.
2. WhatsApp message generation.
3. FAQ.
4. Final CTA.
5. Sticky mobile CTA.

Phase 8 — SEO + QA
1. Metadata.
2. JSON-LD schema.
3. Sitemap and robots.
4. OG image.
5. Accessibility pass.
6. Performance pass.
7. Mobile test at 360px, 390px, 414px, 768px.

Implementation rules:
- All animations must be complete and cleaned up.
- Use transform and opacity, not layout animation.
- Respect prefers-reduced-motion.
- Disable custom cursor and magnetic effects on touch devices.
- Do not leave TODO comments in final code.
- Do not show unfinished components.
- Do not invent fake reviews.
- Do not invent fixed prices.

Before writing code, output:
1. final component tree
2. package list
3. exact files to create
4. build phases
5. risk notes

Then start building phase by phase.
```

---

# END OF SPEC PACK

