# TRD.md — V3 TOUR & TRAVELS
## Technical Requirements Document
### Project: SONA CORRIDOR | Version 1.0 | ARCHON Spec

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 01 — TECH STACK (WITH RATIONALE)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Framework:       Next.js 14+ (App Router)
Language:        TypeScript
Styling:         Tailwind CSS + CSS Modules (for complex animation states)
3D:              Spline (embedded) + Three.js vanilla for particle elements
Animation:       GSAP 3 + ScrollTrigger + SplitText + Flip
Smooth Scroll:   Lenis v1+
Page Transitions: Framer Motion (minimal — just page fade)
CMS:             Sanity v3 (for routes/pricing + testimonials — client can update)
Deployment:      Vercel (Edge Network — fast India CDN)
Analytics:       Vercel Analytics + Google Analytics 4
State:           React useState (no Zustand needed at this scale)
Maps:            Leaflet.js (for interactive route map) OR SVG-based custom animation
WhatsApp CTA:    wa.me deep link with pre-filled message
```

### Why Next.js over Pure HTML:
- Sanity CMS integration for routes/pricing updates without developer
- Built-in image optimization (next/image) — critical for fleet photos on mobile India
- ISR (Incremental Static Regeneration) for fast loads
- OG image generation for WhatsApp link previews
- API routes for future booking form

### Why Lenis over Locomotive:
- Lighter bundle (8KB vs 40KB)
- Better GSAP ScrollTrigger compatibility
- Smoother on mid-range Android (Jio Phone, Redmi Note)
- No CSS class conflicts

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 02 — ARCHITECTURE OVERVIEW
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
v3-travels/
├── app/
│   ├── layout.tsx          # Root layout + fonts + Lenis init
│   ├── page.tsx            # Homepage (all sections assembled)
│   ├── globals.css         # CSS variables + base styles
│   └── api/
│       └── og/route.tsx    # OG image generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Transparent → solid on scroll
│   │   ├── Footer.tsx      # Coordinates footer
│   │   └── MobileWhatsApp.tsx  # Sticky mobile CTA
│   ├── sections/
│   │   ├── Preloader.tsx   # V3 logo intro
│   │   ├── Hero.tsx        # Cinematic hero
│   │   ├── RouteMap.tsx    # SVG animated route
│   │   ├── Fleet.tsx       # Horizontal scroll fleet
│   │   ├── VideoScrub.tsx  # Scroll-driven video
│   │   ├── HowItWorks.tsx  # 3-step process
│   │   ├── Testimonials.tsx # Full-screen proof
│   │   ├── Pricing.tsx     # Route pricing table
│   │   └── CTASection.tsx  # WhatsApp CTA
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── SplitText.tsx   # Reusable text split component
│   │   ├── GrainOverlay.tsx # Noise texture layer
│   │   └── ParticleField.tsx # Three.js particles (hero)
│   └── three/
│       └── V3Logo3D.tsx    # Spline embed or Three.js logo
├── lib/
│   ├── lenis.ts            # Lenis singleton
│   ├── gsap.ts             # GSAP plugin registration
│   └── sanity.ts           # Sanity client
├── sanity/
│   ├── schema/
│   │   ├── route.ts        # Route + pricing schema
│   │   └── testimonial.ts  # Testimonial schema
│   └── sanity.config.ts
├── public/
│   ├── fonts/             # Self-hosted fonts
│   ├── videos/            # Optimized hero videos
│   └── images/            # Fleet photos, textures
└── styles/
    └── animations.css     # Keyframe definitions
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 03 — PACKAGE INSTALL COMMANDS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
# Core setup
npx create-next-app@latest v3-travels --typescript --tailwind --app --src-dir

# Animation & scroll
npm install gsap @gsap/react lenis

# 3D
npm install three @types/three

# CMS
npm install next-sanity @sanity/image-url

# Utilities
npm install clsx tailwind-merge

# Maps (if SVG route not sufficient)
npm install leaflet react-leaflet @types/leaflet

# Dev
npm install -D @types/node
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 04 — THIRD-PARTY INTEGRATIONS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### WhatsApp Business API
```typescript
const WHATSAPP_NUMBER = "+919876543210" // Replace with V3 number
const DEFAULT_MESSAGE = encodeURIComponent("Hi V3 Team! I'd like to book an airport transfer.")

const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`
```

### Google Analytics 4
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### OG Image (WhatsApp link preview)
When someone shares the link on WhatsApp, a beautiful gold V3 branded preview card shows — not a blank gray box. Generated via `/api/og` using `@vercel/og`.

### Sanity CMS Studio
- Client can update: routes, pricing, testimonials
- Hosted at `/studio` subdomain
- No technical knowledge required after setup

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 05 — PERFORMANCE BUDGETS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Resource | Budget | Strategy |
|----------|--------|----------|
| Hero video (loop) | ≤ 8MB | H.264 + poster image fallback |
| Fleet images | ≤ 200KB each | WebP, next/image optimization |
| JS bundle (initial) | ≤ 150KB | Dynamic imports for GSAP + Three.js |
| CSS | ≤ 30KB | Tailwind purge + CSS Modules |
| Fonts | ≤ 100KB | WOFF2 subset + font-display: swap |
| Total First Load | ≤ 3MB | Aggressive lazy loading |

### Mobile India Optimization (Critical)
- Video hero: Does NOT autoplay on mobile. Shows poster image + play button.
- Three.js: Dynamic import, fallback to static image on mobile
- GSAP animations: Reduced motion on devices with `prefers-reduced-motion`
- Images: `loading="lazy"` + `priority` only for above-fold

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 06 — BROWSER SUPPORT MATRIX
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome (Android) | Full | Primary Indian mobile browser |
| Safari (iOS) | Full | NRI audience uses iPhone |
| Chrome (Desktop) | Full | — |
| Firefox (Desktop) | Full | — |
| Samsung Internet | Partial | No 3D, static fallback |
| UC Browser | Basic | Static HTML fallback |

### Progressive Enhancement Strategy
1. Base: Static HTML + CSS (works everywhere)
2. Enhanced: Smooth scroll + GSAP animations (modern browsers)
3. Premium: Three.js + video + Spline (high-end devices)

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 07 — LENIS + GSAP INITIALIZATION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```typescript
// lib/lenis.ts
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 08 — ERROR PREVENTION CHECKLIST
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
GSAP
[x] gsap.registerPlugin() in lib/gsap.ts — imported once
[x] gsap.context() used in all React components
[x] ScrollTrigger.kill() in useEffect cleanup
[x] ScrollTrigger.refresh() after fonts + images loaded
[x] Lenis RAF connected to GSAP ticker

THREE.JS
[x] Renderer appended to ref, not document.body
[x] Camera at z: 5 (not default 0,0,0)
[x] AmbientLight + DirectionalLight added
[x] animate() RAF loop started
[x] ResizeObserver for canvas resize
[x] Dispose: geometry, material, renderer on unmount

LENIS
[x] lenis.raf() in requestAnimationFrame loop
[x] lenis.destroy() on page change (Next.js router events)
[x] No overflow:hidden on body — use overflow:clip

CSS
[x] 100dvh used instead of 100vh (iOS Safari fix)
[x] Canvas: pointer-events: none (scroll-through)
[x] No z-index conflicts between Three.js and Lenis layers

MOBILE
[x] Touch events don't conflict with Lenis scroll
[x] No autoplay video on mobile (poster + click)
[x] WhatsApp CTA visible at all scroll positions on mobile
[x] Magnetic button effects disabled on touch devices
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 09 — HOSTING & DEPLOYMENT
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Production: Vercel (Pro plan recommended — better India edge speeds)
Domain: v3tourandtravels.com (or current domain)
CDN: Vercel Edge Network (auto)
Videos: Vercel Blob Storage OR Cloudinary (free tier for videos)
Images: next/image with Vercel Image Optimization
Environment Variables: .env.local (never committed)
  - NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
  - NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  - SANITY_PROJECT_ID=xxxxx
  - SANITY_DATASET=production
```

---

*TRD Version 1.0 | ARCHON | V3 Creative Studio | Ludhiana*
