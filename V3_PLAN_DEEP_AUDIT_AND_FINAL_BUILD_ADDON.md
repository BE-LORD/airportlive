# V3 SONA CORRIDOR — Deep Plan Audit + Final Build Addon

## Verdict
The uploaded Production Build Plan is the correct direction for actually building the V3 Tour & Travels / Airport Live website. It is more practical than the original 15-tool master build because it keeps the premium SONA CORRIDOR experience but removes unnecessary MVP bloat.

**Final rating:** 8.8/10 as uploaded. 9.7/10 after applying the fixes below.

---

## What the Plan Gets Right

### 1. Correct MVP discipline
The plan correctly reduces the build from a “15 tools showcase” into a production-safe stack:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis
- Three.js only for lightweight particles
- next/image
- Lucide React

This is the right move because the website’s target users are mostly mobile-first travel customers, not people judging how many experimental libraries are installed.

### 2. Correct business data lock
The plan correctly creates `src/lib/constants.ts` as the single source of truth for:
- Phone: `9888000510`
- WhatsApp: `919888000510`
- Email: `book@airportlive.in`
- Website: `airportlive.in`
- Tagline: `WHERE LUXURY MEETS COMFORT`
- Experience: `20+`
- Fleet: `100+`

This prevents the common AI-agent mistake of leaving `+91 XXXXX XXXXX` or old placeholder contacts in the site.

### 3. Correct removal of pricing, if this is the final decision
The older SONA CORRIDOR files included a pricing section. The new plan removes all fares, rupee values, and pricing references. This is a major strategic change, but it is valid if the business wants quotation-based booking instead of public fixed-price positioning.

### 4. Strong mobile-first conversion layer
The sticky mobile booking bar with WhatsApp + Call is essential. The original PRD says most bookings will originate from mobile, so the sticky CTA is not optional.

### 5. Stronger trust and legal safety
Marking testimonials as placeholders in code comments only is the correct move. Do not display “verified” unless those testimonials are real and approved.

---

## Main Conflicts With Previous Files

### Conflict 1 — Pricing Section Removed
**Previous spec direction:** Routes & Pricing was part of the emotional scroll journey.

**New plan direction:** No pricing section, no rupees, no fares, no published rates.

**Final decision:** Keep the new plan. Replace the old “Routes & Pricing” act with:

> ROUTES & INQUIRY CLARITY
> Pick your route. Send your details. We confirm personally.

Do not use phrases like “Fixed price guaranteed” unless the business truly wants to commit to fixed fares publicly.

### Conflict 2 — 9-section vs 10-section flow
The current plan says it will preserve 9-section page flow, but the older PRD lists 10 homepage items including footer. The new tree includes: Preloader, Hero, RouteMap, FleetShowcase, JourneyScrub, HowItWorks, Testimonials, BookingInquiry, FAQ, FinalCTA, Footer.

**Fix:** Call it a “10-part single-page journey plus footer” instead of forcing 9 sections.

### Conflict 3 — Anime.js removed from RouteMap
Older files assigned Anime.js to route path drawing. The new plan uses GSAP for SVG route drawing.

**Final decision:** Keep GSAP only. GSAP can animate SVG strokeDashoffset cleanly, and removing Anime.js reduces dependency bloat.

### Conflict 4 — Spline removed from MVP
Older files planned a Spline 3D V3 logo in the Hero. The new plan removes Spline from MVP.

**Final decision:** Good for performance. Add Spline only as Phase 2 optional enhancement if the desktop Lighthouse score stays healthy.

### Conflict 5 — Mailto form may feel less premium
The plan uses a zero-backend `mailto:` form. This is simple, but many users do not have an email client configured, especially on desktop.

**Recommended fix:** Keep mailto as fallback, but make WhatsApp the primary submission path. Add a `buildBookingMessage(formData)` utility that sends the inquiry directly to WhatsApp. Add EmailJS, Formspree, Resend, or a Next.js API route later.

---

## Add These Missing Production Files

Add these files to the plan:

```txt
src/lib/booking.ts
src/lib/device.ts
src/lib/metadata.ts
src/lib/schema.ts
src/hooks/useIsTouchDevice.ts
src/hooks/usePrefersReducedMotion.ts
src/hooks/useDeviceTier.ts
src/components/ui/CopyBookingFormat.tsx
src/components/ui/TrustBar.tsx
src/components/ui/ResponsiveImage.tsx
src/components/sections/Services.tsx
src/components/sections/CorporateTravel.tsx
src/data/services.ts
src/data/business.ts
src/data/seoKeywords.ts
```

### Why these files matter
- `booking.ts` centralizes WhatsApp, call, email, and form message generation.
- `device.ts` prevents heavy animations on low-end devices.
- `schema.ts` keeps LocalBusiness JSON-LD clean and reusable.
- `Services.tsx` makes the website not look like only one route or one car.
- `CorporateTravel.tsx` supports B2B customers and airport/live travel inquiries.

---

## Final Website Section Order

Use this final order:

1. Preloader — first visit only, max 2.8 seconds
2. Navbar — transparent to cream glass on scroll
3. Hero — ARRIVE LIKE YOU WERE EXPECTED
4. RouteMap — gold SONA corridor line animation
5. Services — airport transfers, intercity rides, corporate travel, wedding/family travel
6. FleetShowcase — exterior, interior, luggage, chauffeur, airport readiness
7. JourneyScrub — desktop scroll-scrub video, mobile poster/short loop
8. HowItWorks — message, confirm, travel
9. Testimonials — real only; otherwise use neutral trust statements
10. BookingInquiry — WhatsApp-first form + email fallback
11. FAQ — compact, SEO-friendly
12. FinalCTA — Ready When You Are
13. Footer — full contact + routes + legal

---

## Must-Add Copy Rules

### Replace public pricing language
Avoid:
- Fixed price guaranteed
- No meter anxiety
- What we quote is what you pay
- From ₹____
- All prices include toll, GST, driver

Use:
- “Share your route. We confirm the best option directly.”
- “Every booking is confirmed personally.”
- “No confusion after you message us.”
- “Tell us your pickup, drop, timing, and flight number.”

### Tone lock
Use the original V3 voice:
- Quietly confident
- Precise
- Warm
- Visual
- No cheap superlatives
- No generic corporate language

### Hero copy final
```txt
ARRIVE
LIKE YOU WERE
EXPECTED.

Premium airport transfers across Ludhiana, Chandigarh and Delhi NCR.
Professional chauffeurs. Clean cars. 24/7 WhatsApp booking.
```

### Final CTA final
```txt
READY WHEN YOU ARE
Your next journey starts with one message.

Send your pickup, drop, date, time and flight number.
We’ll confirm the rest.
```

---

## Final Tech Rules For Antigravity/Codex

### Dependency rules
Install only:
```bash
npm install gsap @gsap/react lenis three lucide-react clsx tailwind-merge
```

Add later only if needed:
```bash
npm install framer-motion
npm install @react-three/fiber @react-three/drei
npm install resend zod react-hook-form
```

Do not install in MVP:
```bash
@babylonjs/core
@babylonjs/react
aframe
playcanvas
@barba/core
aos
sweetalert2
@splinetool/react-spline
```

### Animation rules
- Every GSAP animation must use `gsap.context()`.
- Every ScrollTrigger must be killed/cleaned on unmount.
- Use dynamic import for `HeroParticles`.
- Disable magnetic hover on touch devices.
- Disable custom cursor on mobile and tablets.
- Respect `prefers-reduced-motion`.
- Do not autoplay heavy video on mobile.

### SEO rules
- Use `airportlive.in` as canonical domain.
- Add LocalBusiness JSON-LD.
- Include service area: Ludhiana, Chandigarh, Delhi NCR, Amritsar, Punjab.
- Add sitemap and robots.
- Use OG image generator with V3 brand visuals.
- Avoid fake ratings and fake review schema.

### UX rules
- Every CTA must lead to one of: WhatsApp, Call, Email, Inquiry Form.
- WhatsApp should be the primary booking channel.
- Mobile sticky bar must not cover footer content.
- Touch targets must be at least 44px.
- No horizontal overflow.
- No text over unreadable video.
- Use real contact data everywhere.

---

## Final Antigravity/Codex Prompt Addon

Paste this after the uploaded Production Build Plan:

```md
You are building V3 Tour & Travels / Airport Live using the uploaded Production Build Plan as the active source of truth.

Highest-priority rules:
1. Preserve SONA CORRIDOR: warm cream light mode, deep saffron gold, midnight indigo accents, editorial premium typography, cinematic scroll journey.
2. Use real business data everywhere:
   - Phone/Call: 9888000510
   - WhatsApp: 919888000510
   - Email: book@airportlive.in
   - Website/canonical domain: airportlive.in
   - Tagline: WHERE LUXURY MEETS COMFORT
   - Experience: 20+
   - Fleet: 100+
3. Do not show any rupee amount, fare, public price, “from price,” pricing table, meter language, GST included line, or fixed-price guarantee unless explicitly added later.
4. Replace old pricing sections with Booking Inquiry / Route Inquiry / Custom Quote style sections.
5. Use WhatsApp-first booking. Email inquiry can exist as fallback, but WhatsApp must be the primary conversion path.
6. Keep MVP lightweight: GSAP, Lenis, Three.js lightweight particles, next/image, Lucide, clsx, tailwind-merge only.
7. Do not install Babylon.js, A-Frame, PlayCanvas, Barba, AOS, Spline, or SweetAlert2 in MVP.
8. Use GSAP for route SVG path drawing; Anime.js is not required.
9. Use dynamic imports for heavy client-only visuals.
10. Disable custom cursor and magnetic hover on touch devices.
11. Add prefers-reduced-motion support.
12. Add LocalBusiness schema, sitemap, robots, OG image, metadata, canonical URL.
13. All placeholders must be blocked before production. No `+91 XXXXX XXXXX`, no fake verified badges, no fake reviews.
14. Testimonials may be present only as placeholders in code comments unless real verified testimonials are supplied.
15. Build mobile-first. Desktop can be cinematic; mobile must be fast, readable and conversion-focused.

Build sequence:
Phase 1: Constants, SEO, layout, globals, navbar, footer, mobile booking bar.
Phase 2: Hero, preloader, WhatsApp builder, call/email links, trust micro-row.
Phase 3: RouteMap, services, fleet showcase, journey section, how-it-works.
Phase 4: Booking inquiry form, FAQ, final CTA, placeholder-safe testimonials.
Phase 5: Performance audit, accessibility audit, SEO audit, production cleanup, Vercel deployment readiness.

Before writing code, scan existing files and report:
- exact files that will be created
- exact files that will be modified
- packages to install
- any missing assets required

After each phase, run:
- TypeScript check
- ESLint
- production build
- mobile layout check
- CTA link validation

Do not move to the next phase until the current phase builds cleanly.
```

---

## Final Decision
This plan is approved after these edits. Use it as the practical production plan. Treat the older ARCHON files as creative/design source material, not literal dependency instructions.

The final website should feel like a premium cinematic travel brand, but it should ship like a fast, mobile-first booking machine.
