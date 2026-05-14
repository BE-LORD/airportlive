# V3 Tour & Travels / Airport Live — Full A–Z Premium Website Redesign Blueprint

**Business:** V3 Tour and Travels / Airport Live  
**Website:** airportlive.in  
**Contact:** Phone / WhatsApp: 9888000510 · Email: book@airportlive.in  
**Core positioning:** Premium taxi, airport routes, luxury comfort, reliable bookings, 100+ fleet, 20+ years experience  
**Primary tagline:** WHERE LUXURY MEETS COMFORT  

---

## 0. Final Design Direction

Build a **premium airport taxi + luxury travel booking website** that feels like a high-end travel-tech brand, not a generic cab website.

The new design should combine:

1. **Luxury hospitality polish** — calm, premium, editorial, high trust.
2. **Travel-tech clarity** — fast booking, clear routes, instant WhatsApp/call CTA.
3. **Cinematic motion** — smooth transitions, scroll reveals, vehicle-focused hero.
4. **Conversion-first UX** — every page should guide users toward booking.
5. **No AI-looking visuals** — avoid generic glossy fake cars, random 3D clutter, plastic gradients, weak typography, and template-like sections.

The website should feel like:  
**“A premium airport transfer brand with the trust of a 20+ year travel business and the smoothness of a modern luxury tech platform.”**

---

## 1. Research-Informed Creative Direction

### What premium Framer / Awwwards-style websites commonly do well

Use these as design principles:

- **Framer-style landing pages:** strong hero clarity, focused CTA, polished responsiveness, clean layouts, and high-conversion section sequencing.
- **Awwwards luxury sites:** editorial typography, immersive imagery, whitespace, refined motion, and detail-rich art direction.
- **Premium travel sites:** emotional storytelling, route/location confidence, human service reassurance, and booking convenience.
- **Motion-heavy sites:** motion should guide attention, not distract from the booking flow.
- **Transport booking websites:** users must understand service, price/request flow, route coverage, trust, and contact options quickly.

### Avoid

- Too much black and yellow taxi cliché.
- Random gradients with no premium identity.
- Hero sections with unreadable text over busy images.
- Generic “book now” cards with no route context.
- Low-quality AI vehicle images.
- Overdesigned motion that slows mobile users.
- Fake luxury: gold everywhere, excessive shine, unrealistic car renders.

---

## 2. Brand Personality

### Brand Keywords

Premium, reliable, punctual, comfortable, airport-ready, experienced, calm, clean, luxury, professional, trusted.

### Brand Voice

- Confident but not loud.
- Premium but not arrogant.
- Simple, direct, trust-building.
- English-first with optional local friendliness where needed.

### Example Copy Tone

Bad:
> Best taxi service. Book now. Cheap rates.

Better:
> Premium airport transfers, planned around comfort, timing, and reliability.

Best:
> From airport pickup to long-route travel, V3 Tour and Travels delivers refined comfort with 20+ years of trusted experience.

---

## 3. Color System

### Primary Theme: Light Luxury With Black Accents

Use a clean bright base with premium dark contrast.

| Token | Hex | Use |
|---|---:|---|
| `--bg-main` | `#F8F7F3` | Main warm-white background |
| `--bg-soft` | `#EFEEE8` | Alternating section background |
| `--surface` | `#FFFFFF` | Cards, booking panels |
| `--ink` | `#101010` | Main text |
| `--ink-soft` | `#343434` | Secondary headings |
| `--muted` | `#6F6B63` | Paragraph text |
| `--line` | `#DEDBD2` | Borders/dividers |
| `--luxury-gold` | `#B88A44` | Small premium accent only |
| `--deep-charcoal` | `#171717` | Header/footer/hero contrast |
| `--airport-blue` | `#233A5E` | Route/map/airport visual detail |
| `--success` | `#1F7A4D` | Booking confirmation/availability |
| `--warning` | `#A85E20` | Limited use for alerts |

### Color Rules

- 70% warm white / light neutral
- 20% black / charcoal
- 7% muted blue / airport map feel
- 3% gold accent only
- Do not make the site black-yellow.
- Gold is for thin lines, labels, icon highlights, not huge backgrounds.
- Buttons should mostly be black/charcoal with premium hover states.

---

## 4. Typography System

### Font Pairing Option A — Premium Editorial

- Headings: **Playfair Display**, **Cormorant Garamond**, or **Canela-style serif**
- Body/UI: **Inter**, **Manrope**, or **Satoshi**

### Font Pairing Option B — Modern Luxury Tech

- Headings: **Satoshi**, **Neue Haas Grotesk-style**, or **Inter Display**
- Body/UI: **Inter** or **Manrope**

### Recommended Final

Use **Satoshi / Inter style** for modern travel-tech clarity, with small editorial serif accents in hero and testimonial sections.

### Type Scale

| Purpose | Desktop | Mobile |
|---|---:|---:|
| Hero headline | 72–96px | 42–52px |
| Section heading | 44–64px | 32–40px |
| Card heading | 24–32px | 21–26px |
| Body large | 18–20px | 16–18px |
| Body normal | 16px | 15–16px |
| Caption/label | 12–14px | 12px |

### Typography Rules

- Use tight, luxury-grade line-height for headings: `0.92–1.08`.
- Use readable body line-height: `1.55–1.75`.
- Avoid huge paragraphs.
- Use short, high-impact section intros.
- Use uppercase micro-labels sparingly with letter spacing.

---

## 5. Spacing, Layout, Grid

### Global Layout

- Max container width: `1200–1320px`
- Section padding desktop: `96–140px`
- Section padding mobile: `56–80px`
- Card radius: `20–32px`
- Button radius: `999px` or `14px` depending component
- Grid gap: `24–40px`
- Mobile gap: `16–24px`

### Grid Rules

- Hero: 12-column grid.
- Booking card: right side on desktop, below headline on mobile.
- Services: 3-column desktop, 1-column mobile.
- Fleet: 2 or 3-column modular cards.
- Gallery: editorial masonry but controlled.
- Footer: 4-column desktop, stacked mobile.

### White Space Rule

Premium does not mean empty. It means **controlled breathing room**.

Each section should have:
- One clear job.
- One dominant visual idea.
- One main CTA or next action.
- No clutter.

---

## 6. Motion Design System

### Motion Philosophy

Motion should feel like a luxury vehicle ride: smooth, controlled, stable.

### Global Motion Tokens

| Token | Value |
|---|---:|
| Fast hover | `160ms` |
| Standard UI transition | `240ms` |
| Section reveal | `700–900ms` |
| Hero entrance | `900–1200ms` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Reduced motion | Always supported |

### Motion Effects

1. **Hero entrance**
   - Headline fades up.
   - Vehicle image/card slowly slides in.
   - Booking panel appears after a small delay.
   - Background route lines animate subtly.

2. **Scroll reveal**
   - Cards fade from `y: 24px` to `0`.
   - Avoid excessive scale animations.

3. **CTA hover**
   - Button moves up 1–2px.
   - Inner shine or arrow slide.
   - No cartoon bounce.

4. **Service cards**
   - Border glows subtly on hover.
   - Icon shifts 2px.
   - Background changes from white to soft warm grey.

5. **Fleet cards**
   - Image parallax 4–6%.
   - Content stays stable.

6. **Route section**
   - Map line draws on scroll.
   - Airport pins pulse very subtly.

7. **Testimonials**
   - Smooth horizontal drag or fade.
   - No fast carousel.

8. **Mobile**
   - Reduce motion by 40–60%.
   - Disable heavy parallax.
   - Keep CTAs sticky.

---

## 7. Visual Asset Direction

### Hero Visual

Best options:

1. **Premium real car photo on clean airport/studio background**
2. **Black XL6 / luxury SUV front-angle image**
3. **Airport terminal driveway cinematic shot**
4. **Subtle 3D car only if extremely realistic**

### Hero Background

- Warm white to light gray gradient.
- Soft airport route-map linework.
- Subtle noise texture.
- Shadow under car, not floating.
- No fake neon city unless specifically used for night premium direction.

### Image Style

- Realistic daylight.
- Clean reflections.
- No distorted vehicles.
- No fake number plates.
- No random driver faces.
- No over-saturated gold.
- Use professional depth-of-field.

### Gallery Style

Include:
- Airport pickup moments.
- Premium car interiors.
- Family travel comfort.
- Corporate travel.
- Long-route scenic travel.
- Chauffeur professionalism.
- Night airport pickup.

---

## 8. Full Sitemap

### Primary Pages

1. Home
2. Airport Taxi
3. Outstation Tours
4. Fleet
5. Routes
6. About
7. Gallery
8. Contact
9. Booking / Quote
10. Privacy Policy
11. Terms & Conditions

### Optional Advanced Pages

12. Corporate Travel
13. Wedding / Event Transport
14. Chandigarh Airport Taxi
15. Delhi Airport Taxi
16. Amritsar Airport Taxi
17. One-way Taxi
18. Round Trip Taxi
19. Blog / Travel Guides
20. FAQ

---

## 9. Home Page Full Section Blueprint

### Section 1 — Premium Hero

Goal: Instant trust + booking action.

Content:
- Micro-label: `PREMIUM AIRPORT TRANSFERS & TRAVEL`
- Headline: `Where Luxury Meets Comfort`
- Subheadline: `Reliable airport routes, premium taxi service, and comfortable long-route travel backed by 20+ years of experience.`
- Trust row: `100+ Fleet` · `20+ Years Experience` · `Airport Routes` · `24/7 Booking Support`
- CTA 1: `Book on WhatsApp`
- CTA 2: `Get Fare Quote`
- CTA 3: `Call 9888000510`
- Right/center visual: premium black car / airport driveway / floating booking card.
- Booking mini-form: pickup, drop, date, time, passengers, trip type.

Design:
- Large editorial hero.
- Booking panel in glass/white card.
- Route-map line background.
- Sticky quick CTA on mobile.

---

### Section 2 — Trust Strip

Show confidence quickly.

Items:
- 20+ Years Experience
- 100+ Fleet Network
- Airport Pickup & Drop
- Clean Comfortable Rides
- Professional Drivers
- WhatsApp Booking

Design:
- Horizontal premium strip.
- Small icons.
- Thin dividers.
- Avoid noisy badges.

---

### Section 3 — Signature Services

Cards:
1. Airport Pickup & Drop
2. Outstation Taxi
3. Corporate Travel
4. Family Tours
5. Wedding/Event Transport
6. Local City Rides

Each card:
- Icon
- Short title
- 2-line benefit copy
- “Explore” link
- Optional route/fleet hint

---

### Section 4 — Airport Routes Highlight

Purpose: Rank and convert for airport-specific searches.

Layout:
- Left: narrative copy
- Right: route cards/map UI

Example route cards:
- Chandigarh Airport Transfers
- Delhi Airport Transfers
- Amritsar Airport Transfers
- Ludhiana / Jalandhar / Patiala routes
- Custom pickup/drop routes

CTA:
- `Check Availability`
- `Ask Fare on WhatsApp`

---

### Section 5 — Fleet Experience

Title:
> Choose comfort for every journey.

Fleet cards:
- Premium Sedan
- SUV / XL6
- Luxury / Executive
- Traveller / Group Vehicle

Each card:
- Passenger capacity
- Luggage hint
- Best use
- CTA

Design:
- Realistic vehicle photos.
- Clean product-card layout.
- Avoid fake showroom render look.

---

### Section 6 — Booking Flow

Show simple 3-step flow:

1. Share pickup & drop
2. Confirm vehicle & fare
3. Enjoy a comfortable ride

Design:
- Timeline cards.
- Animated line draw.
- Strong CTA after step 3.

---

### Section 7 — Why V3 Tour and Travels

Content pillars:
- 20+ years experience
- Reliable timing
- Clean vehicles
- Professional drivers
- Airport route understanding
- Easy WhatsApp support

Design:
- Editorial split section.
- One strong image.
- One stats panel.
- One founder/business story paragraph.

---

### Section 8 — Experience Gallery

Grid:
- Airport exterior
- Car interior
- Luggage assistance
- Family travel
- Premium night pickup
- Long-route scenic travel

Motion:
- Slight parallax.
- Image reveal mask.
- Hover caption.

---

### Section 9 — Testimonials

Cards:
- Customer name
- Route/trip type
- Short quote
- Rating
- Date optional

Copy style:
> Smooth airport pickup, clean car, and professional driver. The booking was quick and stress-free.

---

### Section 10 — FAQ

Important FAQs:
- How do I book?
- Do you provide airport pickup?
- Can I book on WhatsApp?
- Are fares fixed?
- Do you provide outstation taxi?
- What vehicle options are available?
- Do you operate at night?
- How early should I book?

---

### Section 11 — Final CTA

Headline:
> Ready for a comfortable airport ride?

CTA:
- `Book on WhatsApp`
- `Call Now`
- `Get Fare Quote`

Design:
- Premium dark charcoal block.
- Warm gold accent line.
- Clear contact details.

---

### Section 12 — Footer

Include:
- Logo
- Tagline
- Phone/WhatsApp
- Email
- Website
- Services
- Routes
- Social links
- Legal links

---

## 10. Airport Taxi Page Blueprint

### Goal

This page should be SEO + conversion focused.

### Sections

1. Airport Taxi Hero
2. Pickup/Drop booking form
3. Popular airport routes
4. Vehicle options
5. Why book airport taxi with V3
6. Timing/punctuality reassurance
7. WhatsApp quote CTA
8. FAQs
9. Final CTA

### SEO Keywords

Use naturally:
- airport taxi service
- airport pickup and drop
- Chandigarh airport taxi
- Delhi airport taxi
- airport cab booking
- premium airport transfer
- reliable taxi service
- luxury airport taxi

---

## 11. Routes Page Blueprint

### Route Card Design

Each route card:
- From city
- To airport/city
- Approx trip type
- Best vehicle option
- WhatsApp CTA
- “Get fare” button

### Route Page Structure

- Search/filter input
- Popular routes first
- Airport routes
- Outstation routes
- Custom route CTA

---

## 12. Fleet Page Blueprint

### Fleet Cards

Each vehicle card:
- Vehicle category
- Best for
- Seats
- Luggage
- Comfort level
- Available for airport/outstation
- CTA

### Vehicle Categories

- Sedan
- Premium Sedan
- SUV / XL6
- Executive SUV
- Tempo Traveller
- Custom fleet on request

---

## 13. About Page Blueprint

### Story Structure

1. Brand intro
2. 20+ years experience
3. Premium comfort promise
4. Service values
5. Fleet and route reliability
6. Founder/team trust
7. CTA

### Copy Direction

Make the about page human, not corporate. It should explain why customers can trust the brand.

---

## 14. Contact / Booking Page Blueprint

### Must Include

- Phone / WhatsApp: 9888000510
- Email: book@airportlive.in
- Website: airportlive.in
- Booking form
- WhatsApp CTA
- Call CTA
- Business inquiry option
- Map/location if available
- Response expectation: “Quick confirmation on WhatsApp/call”

### Booking Form Fields

- Name
- Phone
- Pickup location
- Drop location
- Date
- Time
- Trip type
- Vehicle preference
- Passenger count
- Luggage count
- Message

---

## 15. Component System

### Global Components

- Header
- Mobile menu
- Footer
- Button
- CTA pill
- Booking form
- Route card
- Fleet card
- Service card
- Testimonial card
- FAQ accordion
- Stats row
- Gallery card
- Floating WhatsApp button
- Sticky mobile booking bar
- Section label
- Split content section
- Dark CTA block

### Header

Desktop:
- Logo left
- Nav center/right
- CTA right: `Book Now`

Mobile:
- Logo
- Hamburger
- Sticky bottom CTA bar preferred

Header behavior:
- Transparent on top of hero.
- Solid warm-white on scroll.
- Slight blur background.

### Buttons

Primary:
- Black background
- White text
- Arrow icon
- Premium hover lift

Secondary:
- White background
- Black border
- Black text

WhatsApp:
- Use green only enough to identify WhatsApp.
- Keep premium shape.

### Cards

- White background
- 1px subtle border
- Soft shadow
- 24px radius
- Good padding
- No generic heavy drop shadows

---

## 16. Interaction Details

### Booking CTA Rules

Every major page must have:
- Above-fold CTA
- Mid-page CTA
- Final CTA
- Sticky mobile CTA

### WhatsApp Link Format

Use:
`https://wa.me/919888000510?text=Hi%20V3%20Tour%20and%20Travels%2C%20I%20want%20to%20book%20a%20ride.`

### Call Link

Use:
`tel:+919888000510`

### Email Link

Use:
`mailto:book@airportlive.in`

---

## 17. Copywriting System

### Hero Copy Options

Option 1:
> Where Luxury Meets Comfort  
> Premium airport transfers and comfortable taxi rides backed by 20+ years of trusted travel experience.

Option 2:
> Premium Airport Rides, Planned Around You  
> From airport pickup to outstation travel, enjoy clean vehicles, professional drivers, and smooth booking support.

Option 3:
> Travel Comfort That Feels Effortless  
> Reliable airport routes, premium vehicles, and easy WhatsApp booking with V3 Tour and Travels.

### Service Card Copy

Airport Pickup & Drop:
> Smooth airport transfers with punctual pickup, luggage-friendly vehicles, and quick WhatsApp booking.

Outstation Taxi:
> Comfortable long-route travel for family, business, and personal journeys.

Corporate Travel:
> Professional travel support for business meetings, airport transfers, and executive movement.

Family Tours:
> Spacious, clean vehicles for relaxed family travel and planned trips.

---

## 18. SEO Structure

### Page Titles

Home:
`V3 Tour and Travels | Premium Airport Taxi & Travel Service`

Airport Taxi:
`Airport Taxi Service | Premium Pickup & Drop | V3 Tour and Travels`

Fleet:
`Premium Taxi Fleet | Sedan, SUV & Group Travel Vehicles`

Routes:
`Airport & Outstation Taxi Routes | V3 Tour and Travels`

Contact:
`Book Taxi Online | V3 Tour and Travels`

### Meta Description Example

`Book premium airport taxi and outstation rides with V3 Tour and Travels. 20+ years experience, 100+ fleet network, easy WhatsApp booking, and comfortable rides.`

### Schema Suggestions

Add:
- LocalBusiness schema
- TaxiService schema
- FAQ schema
- Breadcrumb schema
- Organization schema
- Review schema if verified reviews exist

---

## 19. Accessibility Targets

- Minimum text contrast: WCAG AA
- Body text at least 15–16px
- Buttons at least 44px height on mobile
- Keyboard navigable header/menu/forms
- Visible focus states
- Proper labels for booking form
- Alt text for all images
- Reduced motion support
- No text embedded inside important images
- Avoid autoplay audio
- Hero motion must not block reading

---

## 20. Performance Targets

### Core Targets

- Lighthouse Performance: 90+
- Accessibility: 95+
- SEO: 95+
- Best Practices: 95+
- LCP under 2.5s
- CLS under 0.1
- INP under 200ms

### Performance Rules

- Optimize all images.
- Use WebP/AVIF.
- Lazy-load gallery/fleet images.
- Avoid heavy 3D on mobile.
- Use CSS gradients instead of giant background images when possible.
- Use route-based code splitting.
- Keep hero video optional and compressed.
- Do not load too many animation libraries.

---

## 21. Mobile Design Rules

Mobile is critical.

### Mobile Must-Haves

- Sticky bottom bar:
  - WhatsApp
  - Call
  - Book
- Booking form simple and step-based.
- Header should not cover content.
- Hero text must be readable.
- Avoid tiny serif text.
- Service cards full-width.
- Route cards easy to tap.
- FAQs touch-friendly.
- Footer contact info visible and tappable.

---

## 22. No-AI-Look Design Rules

Strictly avoid:

- Fake 3D car with unrealistic reflections.
- Plastic glossy UI cards everywhere.
- Overdone golden gradients.
- Random abstract blobs.
- Unnatural people images.
- Text spelling mistakes in generated visuals.
- Overcrowded hero.
- Low-quality stock photos.
- Inconsistent icon style.
- Too many fonts.
- Generic template sections.

Use instead:

- Realistic vehicles.
- Editorial photography.
- Clean UI.
- Controlled motion.
- Sharp typography.
- Real business details.
- Premium whitespace.
- Consistent spacing.

---

## 23. AI Image Prompt Direction for Website Assets

### Hero Car Image Prompt

Create an ultra-realistic premium website hero image for V3 Tour and Travels, featuring a clean black premium SUV / XL6-style vehicle parked near a modern airport drop-off zone in soft daylight. The scene should feel luxury, calm, professional, and realistic. Warm-white modern background, subtle airport architecture, clean reflections, realistic tires and shadows, no fake number plate, no text on image, no people in focus, no exaggerated glossy AI look. Composition should leave empty space on the left for website headline and booking CTA. High-end commercial automotive photography, natural lighting, 35mm lens, premium travel brand aesthetic, 16:9 wide hero format.

### Airport Pickup Scene Prompt

Ultra-realistic premium airport pickup scene for a luxury taxi travel brand. A clean black SUV waits at an airport arrivals zone with luggage area visible, professional chauffeur style but no identifiable face, soft daylight, premium hospitality feel, realistic reflections, elegant composition, warm neutral color grading, no text, no AI artifacts, no distorted car details, cinematic but natural.

### Fleet Card Image Prompt

Ultra-realistic isolated premium vehicle photo for a luxury taxi website fleet card. Clean black SUV / sedan, three-quarter front view, soft studio daylight, warm white background, realistic shadow under vehicle, no text, no logo, no fake reflections, no AI distortion, high-end automotive catalog photography.

---

## 24. Full Redesign Implementation Prompt

Copy and paste this into your website/code/design agent:

```md
You are a world-class multidisciplinary product team: award-winning UI/UX designer, Framer expert, frontend engineer, conversion strategist, SEO architect, motion designer, accessibility specialist, performance engineer, luxury brand director, and senior product manager.

Your task is to completely redesign the V3 Tour and Travels / Airport Live website into a premium, high-converting, modern travel-tech and luxury airport taxi platform.

BUSINESS DETAILS:
- Brand: V3 Tour and Travels / Airport Live
- Website: airportlive.in
- Phone / WhatsApp: 9888000510
- Email: book@airportlive.in
- Tagline: WHERE LUXURY MEETS COMFORT
- Positioning: Premium taxi service, airport routes, reliable booking, luxury comfort rides
- Trust stats: 100+ fleet, 20+ years experience
- Main services: airport pickup/drop, outstation taxi, tours, corporate travel, family travel, premium fleet booking

CORE GOAL:
Transform the full website from top to bottom into a premium, conversion-focused, Framer/Awwwards-inspired experience. The design must look expensive, clean, real, modern, and trustworthy. It must not look like an AI-generated template.

DESIGN STYLE:
Use a bright luxury light theme with black/charcoal accents, warm-white backgrounds, subtle gold highlights, airport-blue map accents, editorial whitespace, premium typography, smooth motion, and realistic vehicle/travel imagery.

COLOR SYSTEM:
- Main background: #F8F7F3
- Soft background: #EFEEE8
- Surface: #FFFFFF
- Main text: #101010
- Secondary text: #343434
- Muted text: #6F6B63
- Border: #DEDBD2
- Accent gold: #B88A44
- Deep charcoal: #171717
- Airport blue: #233A5E
Do not create a black-yellow taxi theme. Use gold only as a subtle luxury accent.

TYPOGRAPHY:
Use a premium modern sans-serif system such as Satoshi/Inter/Manrope style. Headings should be strong, elegant, and readable. Use optional editorial serif accents only in hero/testimonial areas. Typography must feel luxury but not decorative.

FULL WEBSITE STRUCTURE:
Create or redesign these pages:
1. Home
2. Airport Taxi
3. Outstation Tours
4. Fleet
5. Routes
6. About
7. Gallery
8. Contact / Booking
9. FAQ
10. Privacy Policy
11. Terms & Conditions

HOME PAGE SECTIONS:
1. Premium hero with headline, vehicle visual, booking card, WhatsApp CTA, call CTA, and trust stats.
2. Trust strip with 20+ years, 100+ fleet, airport routes, comfort rides.
3. Signature services cards.
4. Airport routes section with route-map visual.
5. Fleet experience section.
6. Simple 3-step booking flow.
7. Why V3 Tour and Travels section.
8. Gallery / experience section.
9. Testimonials.
10. FAQ.
11. Final dark premium CTA.
12. Footer.

HERO REQUIREMENTS:
Headline: WHERE LUXURY MEETS COMFORT
Subheadline: Premium airport transfers and comfortable taxi rides backed by 20+ years of trusted travel experience.
CTA buttons:
- Book on WhatsApp
- Get Fare Quote
- Call 9888000510
Include trust stats:
- 100+ Fleet
- 20+ Years Experience
- Airport Routes
- Easy WhatsApp Booking

BOOKING FORM:
Fields:
- Name
- Phone
- Pickup location
- Drop location
- Date
- Time
- Trip type
- Vehicle preference
- Passengers
- Luggage
- Message
Include WhatsApp fallback and call fallback.

MOTION:
Use smooth luxury motion, not flashy animation.
- Hero fade-up and slow visual entrance
- Section reveal on scroll
- Subtle card hover lift
- Route-line draw animation
- Gallery reveal mask
- Sticky mobile CTA
- Respect prefers-reduced-motion
Use durations between 160ms and 1200ms with premium easing cubic-bezier(0.22, 1, 0.36, 1).

MOBILE:
Mobile must be excellent. Add sticky bottom CTA with WhatsApp, Call, and Book. Keep hero readable. Simplify booking form into steps if needed. Avoid heavy parallax on mobile.

SEO:
Optimize for:
- airport taxi service
- airport pickup and drop
- premium airport taxi
- outstation taxi
- luxury taxi service
- V3 Tour and Travels
- Airport Live
Add LocalBusiness, TaxiService, FAQ, Organization, and Breadcrumb schema where applicable.

PERFORMANCE:
Target Lighthouse 90+ performance, 95+ accessibility, 95+ SEO, 95+ best practices. Optimize images, use WebP/AVIF, lazy load gallery, avoid heavy 3D on mobile, keep animations efficient.

ACCESSIBILITY:
WCAG AA contrast, keyboard navigation, visible focus states, form labels, alt text, reduced motion, tappable mobile buttons, no important text inside images.

STRICT QUALITY RULES:
- No spelling mistakes.
- No fake-looking AI images.
- No generic template design.
- No excessive gold.
- No black-yellow taxi cliché.
- No cluttered hero.
- No unreadable image overlays.
- No slow mobile performance.
- Every section must have a clear conversion or trust purpose.

DELIVERABLES:
1. Full redesigned page layouts.
2. Design system tokens.
3. Component system.
4. Responsive behavior.
5. Motion specs.
6. SEO metadata.
7. Final copywriting.
8. Implementation-ready frontend structure.
9. QA checklist.
10. Clear before/after improvement summary.

Work step by step. First audit the existing website. Then create the new design system. Then redesign page by page. Then implement responsive components. Then add motion. Then optimize SEO/performance/accessibility. Then run final QA.
```

---

## 25. Developer Implementation Checklist

### Before Design

- Audit existing pages.
- Check all current CTAs.
- Collect real business details.
- Collect real vehicle images if available.
- Decide final font.
- Confirm route list.
- Confirm service list.

### During Design

- Build tokens first.
- Build components second.
- Build pages third.
- Add motion after layout is stable.
- Add SEO metadata.
- Add schema.
- Optimize mobile.
- Test booking/WhatsApp links.

### Final QA

- Check spelling.
- Check phone number.
- Check email.
- Check website.
- Check WhatsApp link.
- Check mobile sticky CTA.
- Check form validation.
- Check all nav links.
- Check image quality.
- Check Lighthouse.
- Check console errors.
- Check broken links.
- Check SEO tags.
- Check accessibility labels.

---

## 26. Final Homepage Wireframe Order

1. Header  
2. Hero + booking card  
3. Trust stats strip  
4. Services  
5. Airport routes  
6. Fleet cards  
7. Booking flow  
8. Why choose us  
9. Gallery  
10. Testimonials  
11. FAQ  
12. Final CTA  
13. Footer  

---

## 27. Final Notes

This redesign should feel premium because it is disciplined:

- Fewer colors.
- Better typography.
- Better spacing.
- Realistic visuals.
- Clear booking action.
- Strong trust proof.
- Smooth motion.
- Mobile-first conversion.
- Real business identity.

The website should not only look beautiful. It should make a customer feel:

> “This taxi/travel service is trusted, premium, easy to book, and safe for airport or long-route travel.”
