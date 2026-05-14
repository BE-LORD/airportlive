# 🚀 V3_MASTER_BUILD_CODEX.md
## THE ULTIMATE AI CODING PROMPT — CURSOR / WINDSURF / CODEX
### V3 Tour & Travels | SONA CORRIDOR | All 15 Tools Integrated
### Paste this ENTIRE file into your AI coding assistant. It knows everything.

---

> **HOW TO USE THIS FILE:**
> 1. Open Cursor / Windsurf / GitHub Codex
> 2. Attach this file to your AI context (@ this file or paste into system prompt)
> 3. Say: "Build Phase 1" — it builds. Say "Build Phase 2" — it continues.
> 4. Every command is pre-engineered for zero ambiguity.
> 5. Every tool has a mapped role. No guessing. No hallucinating.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 0 — PROJECT IDENTITY (AI: READ THIS FIRST)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
PROJECT:        V3 Tour & Travels — "SONA CORRIDOR"
TYPE:           Premium Single-Page Scroll Website
CLIENT:         V3 Tour & Travels, Ludhiana, Punjab, India
SERVICE:        Airport Transfer — Ludhiana, Chandigarh, Delhi NCR
FLEET:          Toyota Innova Crysta
MODE:           LIGHT MODE (warm cream + deep saffron gold + midnight indigo accents)
PERSONALITY:    Quietly confident. Cinematic. Warm. Playfully premium.
GOAL:           WhatsApp bookings + brand prestige above Ola/Uber/InDriver
BENCHMARK:      Awwwards SOTD level. Global premium. Indian soul.
ANTI-PATTERN:   NO Bootstrap. NO template look. NO dark mode. NO purple gradients.
                NO Inter/Roboto. NO stock-photo hero. NO generic travel UI.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 1 — 15-TOOL ARSENAL MAP
## (Every tool has ONE job. No overlap. No confusion.)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
┌─────────────────────────────────────────────────────────────────────┐
│  TOOL          │  ROLE IN V3            │  SECTION / COMPONENT      │
├─────────────────────────────────────────────────────────────────────┤
│  GSAP          │  Master animation      │  ALL sections — primary   │
│  Lenis         │  Smooth scroll engine  │  Global scroll wrapper    │
│  Three JS      │  3D particle field     │  Hero background          │
│  Spline        │  3D logo embed         │  Hero right panel         │
│  Anime JS      │  SVG path drawing      │  Route map animation      │
│  Barba JS      │  Page transitions      │  Route → Fleet → CTA nav  │
│  AOS           │  Simple scroll reveals │  Pricing table rows       │
│  Floating UI   │  Smart tooltips        │  Pricing hover details    │
│  Luxon         │  Live time / dates     │  Navbar clock + ETA calc  │
│  Sweeeet Alert │  Booking confirmation  │  WhatsApp CTA confirm     │
│  Babylon JS    │  Interactive 3D map    │  Route visualization      │
│  Aframe        │  360° car tour         │  Fleet section (Phase 2)  │
│  Playcanvas    │  Animated route game   │  Interactive Punjab map   │
│  Framer        │  Prototype reference   │  Design handoff only      │
│  Webflow       │  NOT USED (Next.js)    │  Alternative if no-code   │
└─────────────────────────────────────────────────────────────────────┘
```

### Tool Priority Tiers:

```
TIER 1 — MUST BUILD (Core experience)
  → GSAP + ScrollTrigger + SplitText
  → Lenis (smooth scroll)
  → Three JS (hero particles)
  → Spline (3D logo)
  → Anime JS (route SVG)
  → Luxon (live time)
  → Sweeeet Alert (booking confirm)

TIER 2 — BUILD AFTER TIER 1 WORKS
  → Barba JS (page transitions)
  → AOS (pricing reveals)
  → Floating UI (tooltips)

TIER 3 — PHASE 2 / ENHANCEMENT
  → Babylon JS (interactive 3D map)
  → Aframe (360° car tour)
  → Playcanvas (animated route)
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 2 — COMPLETE CLI SETUP
## (Run these commands IN ORDER. Zero deviations.)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
# ════════════════════════════════════════
# STEP 1 — Create Next.js 14 Project
# ════════════════════════════════════════
npx create-next-app@latest v3-sona-corridor \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd v3-sona-corridor

# ════════════════════════════════════════
# STEP 2 — Install ALL 15 Tools + Deps
# ════════════════════════════════════════

# TIER 1 — Core Animation Stack
npm install gsap @gsap/react                    # GSAP v3 + React hook
npm install lenis                               # Smooth scroll
npm install three @types/three                  # Three.js 3D
npm install @splinetool/react-spline            # Spline 3D embed
npm install animejs                             # Anime.js SVG paths
npm install luxon @types/luxon                  # DateTime handling

# TIER 2 — UI Enhancement
npm install @barba/core @barba/prefetch         # Barba.js transitions
npm install aos @types/aos                      # AOS scroll reveals
npm install @floating-ui/react                  # Smart tooltips/popovers
npm install sweetalert2                         # Sweeeet Alert modals

# TIER 3 — Advanced 3D (Phase 2)
npm install @babylonjs/core @babylonjs/react    # Babylon.js
npm install aframe                              # A-Frame WebXR
npm install playcanvas                          # PlayCanvas 3D

# Utilities
npm install clsx tailwind-merge                 # CSS utilities
npm install react-intersection-observer        # Scroll detection
npm install next-sanity @sanity/image-url      # CMS
npm install @vercel/og                          # OG images

# Dev dependencies
npm install -D @types/node prettier eslint-config-prettier

# ════════════════════════════════════════
# STEP 3 — Verify All Packages Installed
# ════════════════════════════════════════
npm list --depth=0 | grep -E "(gsap|lenis|three|spline|animejs|luxon|barba|aos|floating|sweetalert|babylon|aframe|playcanvas)"

# ════════════════════════════════════════
# STEP 4 — Create Folder Structure
# ════════════════════════════════════════
mkdir -p src/components/{layout,sections,ui,three,spline}
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/{fonts,videos,images/{fleet,hero,routes,textures},icons}
mkdir -p src/app/api/og

echo "✅ V3 SONA CORRIDOR — Project initialized. All 15 tools installed."
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 3 — DESIGN TOKENS (AI: USE THESE EXACT VALUES)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### globals.css — Paste this EXACTLY:
```css
/* V3 SONA CORRIDOR — Design Tokens */
:root {
  /* ── BACKGROUNDS ──────────────────── */
  --bg-primary:     #F6F1E7;    /* Main cream — warm paper */
  --bg-surface:     #EDE6D6;    /* Section surfaces */
  --bg-card:        #FDFAF3;    /* Cards — near white warm */
  --bg-dark:        #1A1208;    /* Dark moments — warm black */
  --bg-indigo:      #1E2B4A;    /* Testimonial section — midnight */

  /* ── TYPOGRAPHY ───────────────────── */
  --text-primary:   #1A1208;    /* Main text — warm near-black */
  --text-secondary: #5C4733;    /* Subtext — warm brown */
  --text-muted:     #A08B72;    /* Labels, meta — warm grey */
  --text-on-dark:   #F6F1E7;    /* On dark/indigo sections */
  --text-gold:      #C8780A;    /* Gold text treatments */

  /* ── BRAND COLORS ─────────────────── */
  --gold-deep:      #C8780A;    /* Primary accent */
  --gold-bright:    #F0B429;    /* Luminous gold, glows */
  --gold-pale:      #F5D485;    /* Subtle gold elements */
  --saffron:        #E8943A;    /* Warm orange accent */
  --indigo-deep:    #1E2B4A;    /* Contrast sections */

  /* ── INTERACTIVE ──────────────────── */
  --hover-lift:     rgba(200, 120, 10, 0.08);
  --glow-gold:      rgba(240, 180, 41, 0.25);
  --border-subtle:  rgba(26, 18, 8, 0.08);
  --border-gold:    rgba(200, 120, 10, 0.3);

  /* ── TYPOGRAPHY SCALE ─────────────── */
  --font-display:   'Cormorant Garamond', Georgia, serif;
  --font-body:      'Satoshi', 'DM Sans', system-ui, sans-serif;
  --font-mono:      'JetBrains Mono', 'Courier New', monospace;

  --text-hero:      clamp(64px, 11vw, 150px);
  --text-display:   clamp(40px, 6vw, 88px);
  --text-headline:  clamp(28px, 3.5vw, 52px);
  --text-title:     clamp(20px, 2.5vw, 32px);
  --text-body:      clamp(15px, 1.4vw, 17px);
  --text-small:     13px;
  --text-mono:      clamp(10px, 1.1vw, 12px);

  /* ── SPACING ──────────────────────── */
  --section-y:      clamp(80px, 12vw, 160px);
  --section-x:      clamp(20px, 6vw, 80px);
  --container:      1400px;

  /* ── MOTION ───────────────────────── */
  --ease-out:       cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout:     cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:       0.3s;
  --dur-normal:     0.6s;
  --dur-slow:       1.0s;
  --dur-cinematic:  1.6s;

  /* ── GRAIN ────────────────────────── */
  --grain-opacity:  0.035;
}

/* ── BASE RESET ───────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* Lenis handles smooth scroll */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  overflow-x: hidden;
  overflow-y: scroll; /* NOT hidden — Lenis needs this */
}

/* ── GRAIN OVERLAY ────────────────────── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/images/textures/grain.png');
  opacity: var(--grain-opacity);
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
}

/* ── CUSTOM CURSOR ────────────────────── */
* { cursor: none; }

/* ── FONT LOADING ─────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 4 — TOOL IMPLEMENTATION BLUEPRINTS
## (AI: Each tool gets exact code. No placeholder.)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

### 🔧 TOOL 1: LENIS — Smooth Scroll Core
**File:** `src/lib/lenis.ts`

```typescript
// V3 SONA CORRIDOR — Lenis Singleton
// CRITICAL: Call initLenis() ONCE in RootLayout. Never twice.
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  // Connect Lenis RAF to GSAP ticker (critical for ScrollTrigger sync)
  lenisInstance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time: number) => {
    lenisInstance!.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}
```

---

### 🔧 TOOL 2: GSAP — Animation Engine
**File:** `src/lib/gsap-config.ts`

```typescript
// V3 SONA CORRIDOR — GSAP Complete Setup
// Import this file ONCE. All plugins registered here.
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import Flip from 'gsap/Flip'

// NOTE: SplitText is a Club GSAP plugin
// If you have license: import SplitText from 'gsap/SplitText'
// Free alternative: use split-type npm package

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  Flip,
)

// Default animation configs
export const animations = {
  // Hero character entry
  heroChar: {
    opacity: 0,
    y: 80,
    rotationX: -90,
    transformOrigin: '0% 50% -50px',
    stagger: 0.03,
    duration: 0.7,
    ease: 'power3.out',
  },
  // Standard section reveal
  sectionReveal: {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power3.out',
  },
  // Scroll trigger defaults
  scrollDefaults: {
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  // Magnetic button config
  magnetic: {
    strength: 0.4,
    innerStrength: 0.15,
    duration: 0.4,
    ease: 'power2.out',
    resetEase: 'elastic.out(1, 0.5)',
    resetDuration: 0.7,
  },
}

export { gsap, ScrollTrigger }
```

---

### 🔧 TOOL 3: THREE JS — Hero Particle Field
**File:** `src/components/three/HeroParticles.tsx`

```typescript
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HeroParticlesProps {
  count?: number
  color?: string
  className?: string
}

export default function HeroParticles({
  count = 1800,
  color = '#C8780A',
  className = '',
}: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,           // Transparent background — shows cream page behind
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particles — two layers for depth
    function createParticleLayer(count: number, spread: number, size: number, opacity: number) {
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * spread
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        size,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        sizeAttenuation: true,
      })
      return new THREE.Points(geo, mat)
    }

    const layerFar = createParticleLayer(count, 12, 0.008, 0.3)
    const layerNear = createParticleLayer(Math.floor(count * 0.3), 8, 0.015, 0.6)
    scene.add(layerFar, layerNear)

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animate
    const clock = new THREE.Clock()
    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      layerFar.rotation.y = t * 0.04
      layerFar.rotation.x = t * 0.015
      layerNear.rotation.y = -t * 0.025

      // Smooth mouse follow
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const ro = new ResizeObserver(() => {
      if (!canvas) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    })
    ro.observe(canvas)

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      ro.disconnect()
      layerFar.geometry.dispose()
      layerNear.geometry.dispose()
      ;(layerFar.material as THREE.Material).dispose()
      ;(layerNear.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}
```

---

### 🔧 TOOL 4: SPLINE — 3D Logo Component
**File:** `src/components/spline/V3Logo3D.tsx`

```typescript
'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic import — only loads on client, not in SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      {/* Static gold V3 as fallback during Spline load */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(60px, 10vw, 120px)',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #C8780A, #F0B429, #C8780A)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>V3</span>
    </div>
  ),
})

interface V3Logo3DProps {
  splineUrl: string  // Your Spline scene URL
  className?: string
}

export default function V3Logo3D({ splineUrl, className = '' }: V3Logo3DProps) {
  // SPLINE URL: Replace with your exported scene URL from spline.design
  // Scene should contain: V3 chrome logo, gold rim lighting, dark void bg
  // Export → Public Link → Copy URL → paste as splineUrl prop

  // Mobile: Don't load Spline (performance)
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #C8780A, #F0B429, #C8780A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>V3</span>
      </div>
    )
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Suspense fallback={null}>
        <Spline scene={splineUrl} />
      </Suspense>
    </div>
  )
}
```

---

### 🔧 TOOL 5: ANIME JS — SVG Route Path Drawing
**File:** `src/components/sections/RouteMap.tsx`

```typescript
'use client'
import { useEffect, useRef } from 'react'
import anime from 'animejs'

// The route data (customize with real coordinates mapped to SVG viewBox)
const cities = [
  { id: 'ludhiana',    label: 'Ludhiana',   x: 180, y: 280, km: 'Base', time: '0 hrs' },
  { id: 'chandigarh',  label: 'Chandigarh', x: 360, y: 200, km: '95km', time: '~90 min' },
  { id: 'delhi',       label: 'Delhi NCR',  x: 600, y: 320, km: '310km', time: '~3.5 hrs' },
]

// SVG path connecting cities (customize for your actual map design)
const ROUTE_PATH = 'M 180,280 C 240,260 310,210 360,200 S 520,280 600,320'

export default function RouteMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const path = svgRef.current.querySelector('.route-path') as SVGPathElement
    if (!path) return

    const pathLength = path.getTotalLength()
    path.style.strokeDasharray = String(pathLength)
    path.style.strokeDashoffset = String(pathLength)

    // Intersection Observer to trigger on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Draw the path
            anime({
              targets: path,
              strokeDashoffset: [pathLength, 0],
              duration: 2400,
              easing: 'easeInOutQuart',
              delay: 200,
            })

            // City dots appear as path reaches them
            cities.forEach((city, i) => {
              anime({
                targets: `.city-dot-${city.id}`,
                scale: [0, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeOutElastic(1, 0.6)',
                delay: 500 + (i * 700),
              })
              // City labels
              anime({
                targets: `.city-label-${city.id}`,
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 400,
                easing: 'easeOutQuart',
                delay: 750 + (i * 700),
              })
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-y) var(--section-x)',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost chapter number */}
      <span style={{
        position: 'absolute',
        top: '10%',
        left: '-2%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(120px, 22vw, 300px)',
        fontWeight: 700,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(200, 120, 10, 0.08)',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>01</span>

      {/* Section header */}
      <div style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-mono)',
          color: 'var(--gold-deep)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>Chapter I: The Road</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-display)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.05,
        }}>
          Three Cities.<br />
          One Trusted Name.
        </h2>
      </div>

      {/* SVG Route Map */}
      <svg
        ref={svgRef}
        viewBox="0 0 780 520"
        style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'block' }}
      >
        {/* Background grid lines (subtle) */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,18,8,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="780" height="520" fill="url(#grid)" />

        {/* Animated route path */}
        <path
          className="route-path"
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transition: 'none' }}
        />

        {/* Dashed secondary path */}
        <path
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--gold-pale)"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity={0.4}
        />

        {/* City nodes */}
        {cities.map((city) => (
          <g key={city.id}>
            {/* Pulse ring */}
            <circle
              className={`city-dot-${city.id}`}
              cx={city.x} cy={city.y}
              r={20}
              fill="var(--gold-pale)"
              opacity={0}
              style={{ transform: 'scale(0)', transformOrigin: `${city.x}px ${city.y}px` }}
            />
            {/* Solid dot */}
            <circle
              className={`city-dot-${city.id}`}
              cx={city.x} cy={city.y}
              r={8}
              fill="var(--gold-deep)"
              opacity={0}
              style={{ transform: 'scale(0)', transformOrigin: `${city.x}px ${city.y}px` }}
            />
            {/* City label group */}
            <g className={`city-label-${city.id}`} opacity={0}>
              <text
                x={city.x}
                y={city.y - 28}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 600,
                  fill: 'var(--text-primary)',
                }}
              >{city.label}</text>
              <text
                x={city.x}
                y={city.y + 38}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fill: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
              >{city.km} · {city.time}</text>
            </g>
          </g>
        ))}
      </svg>
    </section>
  )
}
```

---

### 🔧 TOOL 6: LUXON — Live Time Display
**File:** `src/components/ui/LiveClock.tsx`

```typescript
'use client'
import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

// Shows: Current IST time + "Available Now" / "Pre-book" status
export default function LiveClock() {
  const [time, setTime] = useState<string>('')
  const [available, setAvailable] = useState<boolean>(true)

  useEffect(() => {
    function update() {
      const now = DateTime.now().setZone('Asia/Kolkata')
      setTime(now.toFormat('HH:mm · dd LLL'))
      // V3 is 24/7 — always available
      setAvailable(true)
    }
    update()
    const interval = setInterval(update, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [])

  // ETA Calculator — given departure time, show arrival estimate
  // Usage: calculateETA('LDH', 'DEL', '06:30')
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-small)',
      color: 'var(--text-muted)',
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: available ? '#22C55E' : '#EF4444',
        display: 'inline-block',
        boxShadow: available ? '0 0 6px #22C55E' : 'none',
        animation: 'pulse 2s infinite',
      }} />
      <span>IST {time}</span>
      <span style={{ color: 'var(--gold-deep)' }}>·</span>
      <span style={{ color: available ? '#22C55E' : 'var(--text-muted)' }}>
        {available ? 'Available 24/7' : 'Pre-book'}
      </span>
    </div>
  )
}

// ETA Calculator utility
export function calculateETA(
  fromCity: 'LDH' | 'CHD' | 'DEL',
  toCity: 'LDH' | 'CHD' | 'DEL',
  departureTime: string // "HH:mm"
): string {
  const durations: Record<string, number> = {
    'LDH-CHD': 90, 'CHD-LDH': 90,
    'LDH-DEL': 210, 'DEL-LDH': 210,
    'CHD-DEL': 180, 'DEL-CHD': 180,
  }
  const key = `${fromCity}-${toCity}`
  const mins = durations[key] || 0
  const [h, m] = departureTime.split(':').map(Number)
  const arrival = DateTime.now().setZone('Asia/Kolkata')
    .set({ hour: h, minute: m })
    .plus({ minutes: mins })
  return arrival.toFormat('HH:mm')
}
```

---

### 🔧 TOOL 7: SWEEEET ALERT — Booking Confirmation
**File:** `src/components/ui/BookingConfirm.tsx`

```typescript
'use client'
import Swal from 'sweetalert2'

// Custom V3-branded Swal theme
const V3Swal = Swal.mixin({
  customClass: {
    popup: 'v3-swal-popup',
    title: 'v3-swal-title',
    htmlContainer: 'v3-swal-body',
    confirmButton: 'v3-swal-confirm',
    cancelButton: 'v3-swal-cancel',
  },
  buttonsStyling: false,
})

// Inject V3 Swal styles once
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .v3-swal-popup {
      background: var(--bg-card) !important;
      border: 1px solid var(--border-gold) !important;
      border-radius: 4px !important;
      font-family: var(--font-body) !important;
      padding: 2.5rem !important;
    }
    .v3-swal-title {
      font-family: var(--font-display) !important;
      font-size: 2rem !important;
      font-weight: 700 !important;
      color: var(--text-primary) !important;
    }
    .v3-swal-body {
      color: var(--text-secondary) !important;
      font-size: 0.95rem !important;
      line-height: 1.7 !important;
    }
    .v3-swal-confirm {
      background: var(--gold-deep) !important;
      color: #FDFAF3 !important;
      border: none !important;
      padding: 14px 32px !important;
      font-family: var(--font-body) !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      border-radius: 2px !important;
      cursor: pointer !important;
    }
    .v3-swal-cancel {
      background: transparent !important;
      color: var(--text-muted) !important;
      border: 1px solid var(--border-subtle) !important;
      padding: 14px 28px !important;
      font-family: var(--font-body) !important;
      font-size: 13px !important;
      letter-spacing: 0.08em !important;
      text-transform: uppercase !important;
      border-radius: 2px !important;
      cursor: pointer !important;
    }
  `
  document.head.appendChild(style)
}

export async function showBookingConfirm(route?: string): Promise<boolean> {
  const result = await V3Swal.fire({
    title: 'Ready to book?',
    html: `
      <p>You'll be connected to our WhatsApp team.</p>
      <p style="margin-top:0.5rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted)">
        ${route ? `Route: ${route}` : 'Tell us your route, date & time.'}
      </p>
      <p style="margin-top:0.75rem; color: var(--gold-deep); font-weight:500">
        Instant confirmation. Fixed price guaranteed.
      </p>
    `,
    showCancelButton: true,
    confirmButtonText: 'Open WhatsApp →',
    cancelButtonText: 'Not yet',
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster',
    },
  })
  return result.isConfirmed
}

export async function showBookingSuccess(): Promise<void> {
  await V3Swal.fire({
    title: 'You\'re all set.',
    html: `
      <p>Our team will confirm your booking within minutes.</p>
      <p style="margin-top:0.75rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted)">
        Available 24/7 · No booking fee · Fixed price
      </p>
    `,
    confirmButtonText: 'Perfect  ✓',
    icon: 'success',
  })
}
```

---

### 🔧 TOOL 8: AOS — Pricing Table Reveals
**File:** `src/components/sections/Pricing.tsx` (AOS integration)

```typescript
'use client'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// AOS is perfect for the pricing table — simple, reliable, no GSAP complexity
// Used ONLY for pricing rows — GSAP handles all other animations

const routes = [
  { from: 'Ludhiana', to: 'Chandigarh Airport',  km: '95km',  time: '90 min', price: '₹1,800' },
  { from: 'Ludhiana', to: 'Delhi IGI Airport',    km: '310km', time: '3.5 hrs', price: '₹4,500' },
  { from: 'Ludhiana', to: 'Delhi NCR',            km: '310km', time: '3.5 hrs', price: '₹4,200' },
  { from: 'Chandigarh', to: 'Delhi Airport',      km: '265km', time: '3 hrs',  price: '₹3,800' },
  { from: 'Ludhiana', to: 'Amritsar Airport',     km: '165km', time: '2 hrs',  price: '₹2,800' },
]

export default function Pricing() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    })
    return () => AOS.refresh()
  }, [])

  return (
    <section style={{ padding: 'var(--section-y) var(--section-x)' }}>
      {/* Header */}
      <div data-aos="fade-up" data-aos-delay="0">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mono)',
          color: 'var(--gold-deep)', letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '0.75rem' }}>Chapter VI: The Clarity</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)',
          fontWeight: 700, lineHeight: 1.05 }}>
          Fixed Prices.<br />No Surprises.
        </h2>
      </div>

      {/* Table */}
      <div style={{ marginTop: '3rem' }}>
        {/* Header row */}
        <div data-aos="fade-up" data-aos-delay="100" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          padding: '0.5rem 0',
          marginBottom: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          {['ROUTE', 'DISTANCE', 'TIME', 'FROM'].map(h => (
            <span key={h} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
            }}>{h}</span>
          ))}
        </div>

        {/* Route rows */}
        {routes.map((r, i) => (
          <div
            key={i}
            data-aos="fade-left"
            data-aos-delay={String(150 + i * 80)}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '1.25rem 0',
              borderBottom: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'background var(--dur-fast) ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--hover-lift)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent'
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {r.from} → {r.to}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)',
              color: 'var(--text-muted)' }}>{r.km}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)',
              color: 'var(--text-muted)' }}>{r.time}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.2rem', color: 'var(--gold-deep)' }}>{r.price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

### 🔧 TOOL 9: FLOATING UI — Pricing Tooltips
**File:** `src/components/ui/PriceTooltip.tsx`

```typescript
'use client'
import { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react'

interface PriceTooltipProps {
  children: React.ReactNode
  content: {
    includes: string[]
    note?: string
  }
}

export default function PriceTooltip({ children, content }: PriceTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()}>{children}</span>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '4px',
              padding: '1rem 1.25rem',
              boxShadow: '0 8px 32px rgba(26, 18, 8, 0.12)',
              zIndex: 9999,
              minWidth: '220px',
            }}
            {...getFloatingProps()}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--gold-deep)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>Includes:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {content.includes.map((item, i) => (
                <li key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  padding: '2px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ color: 'var(--gold-deep)' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            {content.note && (
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
              }}>{content.note}</p>
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}
```

---

### 🔧 TOOL 10: BARBA JS — Page Transitions
**File:** `src/lib/barba-init.ts`

```typescript
// Barba.js — Cinematic page transitions
// Install: npm install @barba/core
// Usage: Pages fade out with cream wipe, new page enters

import barba from '@barba/core'
import gsap from 'gsap'

export function initBarba() {
  barba.init({
    transitions: [{
      name: 'cream-wipe',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        })
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power3.out',
        })
      },
      afterEnter() {
        // Re-init GSAP ScrollTrigger after page change
        window.scrollTo(0, 0)
        // ScrollTrigger.refresh() — call after Barba transition
      }
    }]
  })
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 5 — BUILD PHASES (EXACT AI COMMANDS)
## (Tell your AI assistant exactly these commands)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PHASE 1 COMMAND (paste into Cursor/Windsurf):
```
Using the V3_MASTER_BUILD_CODEX.md context:

Build Phase 1 — Core Infrastructure:
1. Create globals.css with ALL design tokens from Section 3
2. Create src/lib/lenis.ts — exact code from Tool 1
3. Create src/lib/gsap-config.ts — exact code from Tool 2
4. Create src/app/layout.tsx that:
   - Loads Cormorant Garamond + JetBrains Mono fonts
   - Initializes Lenis on client side
   - Renders CustomCursor component
   - Renders Preloader component
   - Has GrainOverlay
5. Create src/components/ui/CustomCursor.tsx with:
   - 12px gold dot (--gold-deep)
   - Expands to 40px on CTA hover with "BOOK" text
   - Hollow ring on image hover
   - mix-blend-mode: multiply (blends on cream)
   - GSAP follower animation
6. Create src/components/ui/Preloader.tsx with:
   - V3 logo + "TOUR & TRAVELS" text
   - Gold horizontal rule scales in
   - Wipes upward on exit
   - 2.8 second total duration

Verify: Run `npm run dev` — page should show cream bg, grain, preloader, then reveal.
```

---

### PHASE 2 COMMAND:
```
Using V3_MASTER_BUILD_CODEX.md context, Phase 1 complete:

Build Phase 2 — Hero Section:
1. Create src/components/three/HeroParticles.tsx — exact code from Tool 3
2. Create src/components/spline/V3Logo3D.tsx — exact code from Tool 4
3. Create src/components/sections/Hero.tsx with:
   - Full viewport height (100dvh)
   - Background: warm cream gradient with particle canvas behind (z-index: 1)
   - Left column (60%): Animated headline using split-type npm package
     - Eyebrow: "LUDHIANA · CHANDIGARH · DELHI" in JetBrains Mono gold
     - H1: "ARRIVE / LIKE YOU WERE / EXPECTED." (3 lines, Cormorant Garamond 700)
     - Sub: "Premium Airport Transfer. Toyota Innova Crysta." Satoshi Regular
     - CTA: MagneticButton with showBookingConfirm() from Sweeeet Alert
   - Right column (40%): V3Logo3D spline component
   - Scroll indicator: animated down arrow in gold
4. Create src/components/ui/MagneticButton.tsx — magnetic hover using GSAP
5. Create src/components/ui/LiveClock.tsx — exact code from Tool 6 (Luxon)

Verify: Hero animates in after preloader. Particles visible. Gold palette correct.
```

---

### PHASE 3 COMMAND:
```
Build Phase 3 — Scroll Sections:
1. Create src/components/sections/RouteMap.tsx — exact code from Tool 5 (Anime.js)
2. Create src/components/sections/Fleet.tsx with:
   - Pinned horizontal scroll (GSAP ScrollTrigger)
   - 4 panels: Exterior, Interior, Space, Driver
   - Each panel: full-height image + editorial copy
3. Create src/components/sections/VideoScrub.tsx with:
   - Pinned video element
   - Scroll scrubs video currentTime
   - 3 text overlays at keyframe positions
   - Mobile: shows poster image only
4. Create src/components/sections/HowItWorks.tsx with:
   - 3 steps with SVG icon draw-in (Anime.js stroke animation)
   - Large step numbers (0→1, 0→2, 0→3) count animation
   - Step titles split-animated on scroll
5. Create src/components/sections/Testimonials.tsx with:
   - Background changes to --bg-indigo
   - 4 testimonials, each full viewport height
   - GSAP scale + opacity scroll scrub
6. Create src/components/sections/Pricing.tsx — exact code from Tool 8 (AOS)
   - Add PriceTooltip from Tool 9 (Floating UI) on each price cell
7. Create src/components/sections/CTASection.tsx with:
   - showBookingConfirm from Tool 7 (Sweeeet Alert) on button click
   - Magnetic button effect
   - Gold radial glow behind button

Verify: All 7 scroll sections render. Route SVG draws. Video scrubs. Pricing tooltip works.
```

---

### PHASE 4 COMMAND:
```
Build Phase 4 — Assembly + Polish:
1. Assemble all sections in src/app/page.tsx in order:
   Preloader → Hero → RouteMap → Fleet → VideoScrub → 
   HowItWorks → Testimonials → Pricing → CTASection → Footer

2. Create src/components/layout/Navbar.tsx:
   - Transparent on hero, cream+blur on scroll (GSAP ScrollTrigger)
   - V3 logo left, nav links center, "Book Now" button right
   - LiveClock component in navbar (subtle)
   - Mobile: hamburger + direct WhatsApp link

3. Create src/components/layout/Footer.tsx:
   - Brand statement + coordinates in JetBrains Mono
   - Gold horizontal rule
   - Contact links + WhatsApp
   - Copyright

4. Create src/components/layout/MobileCTA.tsx:
   - Fixed bottom bar on mobile
   - "Book on WhatsApp" button (appears after hero)
   - Uses showBookingConfirm → opens WhatsApp on confirm

5. Performance pass:
   - Add dynamic imports for Three.js, Spline, Babylon
   - Add next/image for all fleet photos
   - Add loading="lazy" to all below-fold images
   - Add ScrollTrigger.refresh() after window.load
   - Add cleanup: ctx.revert() in all useEffect returns

Verify: Full page renders. All animations fire. WhatsApp opens on confirm. Mobile layout works.
```

---

### PHASE 5 COMMAND (Phase 2 Features):
```
Build Phase 5 — Advanced 3D (Babylon JS + Aframe + PlayCanvas):

BABYLON JS — Interactive 3D Punjab Route Map:
Replace static SVG RouteMap with Babylon.js scene:
1. Create src/components/three/BabylonRouteMap.tsx
2. Scene: Stylized 3D terrain of Punjab (flat, minimalist, premium)
3. Gold line rises from ground: Ludhiana → Chandigarh → Delhi
4. Small 3D city markers (cylinders) pulse when line arrives
5. OrbitControls: User can rotate map slightly on hover
6. Mobile fallback: Static SVG from Phase 3

AFRAME — 360° Car Interior Tour:
1. Create src/components/three/CarTour360.tsx
2. A-Frame scene embedded in Fleet section Panel 1
3. 360° panoramic view of Innova Crysta interior
4. Hot spots: Click leather seat → tooltip "Climate controlled leather"
5. Trigger: "Take a look inside →" button below fleet

PLAYCANVAS — Animated Route Game Element:
1. Create src/components/three/RouteGame.tsx
2. Simple PlayCanvas scene: Small Innova model drives along route
3. User can click cities to change destination
4. Shows estimated time in real-time (Luxon calculateETA)
5. Embedded in Pricing section as interactive upsell

Verify: All 3 Phase 2 components load with dynamic import. Mobile shows fallbacks.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 6 — QUICK FIX COMMANDS
## (Paste when something breaks)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
# ScrollTrigger not working?
# Add this to the component:
# useEffect(() => { ScrollTrigger.refresh() }, [])

# Lenis conflicting with ScrollTrigger?
# Ensure: lenisInstance.on('scroll', ScrollTrigger.update) is called

# Three.js canvas blocking scroll?
# Add: style={{ pointerEvents: 'none' }} to canvas element

# Spline not loading on mobile?
# Add: if (window.innerWidth < 768) return <StaticFallback />

# AOS not triggering?
# Add: AOS.refresh() inside useEffect after content renders

# Floating UI tooltip off-screen?
# Add flip() and shift() to middleware array (already in code above)

# SweetAlert2 not using custom styles?
# Ensure CSS is injected before first Swal.fire() call

# Barba.js breaking React hydration?
# Use barba.init() inside useEffect(() => {}, []) with router.events

# Anime.js SVG path not drawing?
# Verify getTotalLength() returns > 0 (path must be rendered in DOM first)

# Luxon showing wrong timezone?
# Always use .setZone('Asia/Kolkata') — never .local()

# Babylon.js canvas conflict with Three.js?
# Each 3D library needs its OWN separate <canvas> element
# Never share canvas between Three.js and Babylon.js
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 7 — TOOL DECISION TREE
## (When to use which tool — zero confusion)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Need animation?
├── Text animation (split, stagger, reveal)?     → GSAP + SplitText
├── Scroll-triggered?                            → GSAP ScrollTrigger
├── SVG path drawing?                            → Anime.js
├── Simple fade/slide on scroll?                 → AOS (for pricing only)
└── Page transition?                             → Barba.js

Need 3D?
├── Particle background (hero)?                  → Three.js
├── Logo / hero decoration (no-code)?            → Spline
├── Interactive terrain / route map?             → Babylon.js
├── WebXR / 360° experience?                     → A-Frame
└── Game-like interactive 3D?                    → PlayCanvas

Need smooth scroll?                              → Lenis (only 1 instance)

Need time/date?                                  → Luxon (always IST)

Need tooltip/popover?                            → Floating UI

Need modal/confirm?                              → SweetAlert2

Need page transition?                            → Barba.js

Need design prototype?                           → Framer (NOT in prod)

Need no-code website?                            → Webflow (NOT this project)
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 8 — PERFORMANCE CHECKLIST
## (Run before every deploy)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
LIGHTHOUSE TARGETS: Performance 85+, Accessibility 95+, Best Practices 95+

PRE-DEPLOY CHECKLIST:
[ ] Three.js: dynamic import only, not in initial bundle
[ ] Spline: dynamic import + mobile bypass
[ ] Babylon.js: dynamic import, loads only when section visible
[ ] All images: next/image component, WebP format, max 200KB
[ ] Hero video: max 8MB, H.264, muted autoplay, poster attribute set
[ ] Fonts: preload link tags in <head> for Cormorant + Mono
[ ] GSAP: only ScrollTrigger + SplitText plugins registered (not full bundle)
[ ] Lenis: single instance, properly destroyed on unmount
[ ] AOS: once: true (doesn't re-trigger, better performance)
[ ] SweetAlert2: dynamically imported (not in initial bundle)
[ ] All useEffect: return cleanup function
[ ] ScrollTrigger.getAll().forEach(t => t.kill()) on page unmount
[ ] No console.log() in production
[ ] NODE_ENV=production build tested: npm run build && npm start
[ ] Test on: Chrome Android, Safari iOS, Chrome Desktop
[ ] Mobile WhatsApp CTA: visible and working
[ ] WhatsApp number: REAL number set in .env.local
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 9 — ENV VARIABLES TEMPLATE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
# .env.local — NEVER commit to git
# Copy this, fill in real values

NEXT_PUBLIC_WHATSAPP_NUMBER=+91XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi V3 Team! I'd like to book an airport transfer.
NEXT_PUBLIC_PHONE_NUMBER=+91XXXXXXXXXX

NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode

# Vercel Blob (for video hosting)
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 10 — FINAL DEPLOY COMMANDS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```bash
# Build + test
npm run build
npm run start

# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod

# Or connect GitHub repo to Vercel dashboard for auto-deploy on push
# Dashboard: vercel.com → New Project → Import from GitHub

echo "🚀 V3 SONA CORRIDOR — LIVE ON THE INTERNET."
echo "Punjab's golden corridor now has a website that matches its prestige."
```

---

> **ARCHON SIGN-OFF:**
> This file is self-contained. Every tool has a job. Every phase has a command.
> Paste into Cursor/Windsurf. Say "Build Phase 1". Watch it go.
> 15 tools. 5 phases. Zero ambiguity. Maximum productivity.
>
> *SONA CORRIDOR — V3 Tour & Travels.*
> *Built by ARCHON for Ajay, V3 Creative Studio, Ludhiana.*

---
*V3_MASTER_BUILD_CODEX.md | Version 1.0 | ARCHON Overpowered | All 15 Tools Integrated*
