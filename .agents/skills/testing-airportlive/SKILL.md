---
name: testing-airportlive
description: Test the Airport Live Next.js app end-to-end. Use when verifying UI, animations, hooks, or component changes.
---

# Testing Airport Live

## Overview
Airport Live is a Next.js 16.x app (Turbopack) with GSAP scroll animations, Framer Motion transitions, and Lenis smooth scrolling. The app is a premium airport taxi booking service.

## Dev Server
```bash
cd /home/ubuntu/repos/airportlive
npm run dev
# Runs on http://localhost:3000
```

## Key Pages to Test
- `/` — Homepage with Hero, Services, Routes, Fleet, Gallery, Footer
- `/routes` — Route corridor with SplitTextReveal animation
- `/fleet` — Vehicle cards with Card3DTilt hover effects
- `/airport-taxi` — Airport-specific service page
- `/about` — About page
- `/contact` — Contact/inquiry page

## Vercel Preview
- Vercel previews may require SSO login. If blocked, use local dev server instead.
- Preview URLs follow pattern: `airportlive-git-{branch}-pr7n8y-6845s-projects.vercel.app`

## Components and Hooks to Verify

### Media Query Hooks
- `useMediaQuery` — Central hook used by `usePrefersReducedMotion`, `useIsMobile`, and `CustomCursor`
- Verify via browser console: `window.matchMedia('(pointer: fine)').matches`, `window.matchMedia('(min-width: 768px)').matches`
- In VM environments, `pointer:fine` is typically `false` — CustomCursor will correctly hide itself

### GSAP Scroll Animations
- `useGsapScrollAnimation` — Used by section components (FinalCTA, HowItWorks, TrustLayer, JourneyScrub, RouteMap)
- These section components may not be imported by any page currently — check imports before testing
- Scroll animations on homepage come from motion components (Reveal, SplitTextReveal, MotionCard)
- Verify by scrolling through the page and observing fade-in/slide-up effects

### CustomCursor
- Renders only when `pointer:fine && min-width:768px && !prefers-reduced-motion`
- In VM testing, cursor won't render due to `pointer:fine = false` — this is correct behavior
- Check DOM: `document.querySelectorAll('div').filter(el => getComputedStyle(el).position === 'fixed')`

### Card3DTilt (Fleet)
- Used in FleetShowcase on homepage and /fleet page
- Uses `isTouchDevice()` from `@/lib/device` to disable tilt on touch devices

### SplitTextReveal
- Used on /routes page hero ("Mastering the Corridor")
- Uses both `useIsMobile` and `useReducedMotion`

## What to Check
1. Pages load without console errors (filter out Google FedCM/GTM warnings)
2. Smooth scrolling is active (Lenis — not native jerky scroll)
3. Sections animate on scroll (not all static)
4. WhatsApp links use correct format: `https://wa.me/919888000510?text=...`
5. Phone links use: `tel:+919888000510`
6. No hydration mismatches (would show as React errors in console)

## Known Issues
- `npm test` (Vitest) may fail with `@rolldown/binding-linux-x64-gnu` error — pre-existing env issue requiring Node >= 20.19.0 or >= 22.12.0
- `npx tsc --noEmit` has a pre-existing error in `src/data/airportlive-media.test.ts` (Property 'priority' does not exist)
- ESLint warnings exist in `audit/` files (unused variables) — pre-existing, not in app code

## Devin Secrets Needed
None required for local testing. Vercel SSO would need org credentials if testing preview deployments directly.
