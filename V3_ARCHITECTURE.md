# V3_ARCHITECTURE.md — V3 TOUR & TRAVELS
## Full Component Tree + Project Structure
### SONA CORRIDOR | 15 Tools | Version 1.0 | ARCHON Spec

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## COMPLETE FILE TREE (Build-Ready)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
v3-sona-corridor/
│
├── 📁 src/
│   │
│   ├── 📁 app/                           # Next.js 14 App Router
│   │   ├── layout.tsx                    # Root — fonts, Lenis, cursor, preloader
│   │   ├── page.tsx                      # Homepage — all sections assembled
│   │   ├── globals.css                   # Design tokens + base styles + grain
│   │   ├── loading.tsx                   # Next.js loading state (backup)
│   │   └── 📁 api/
│   │       └── 📁 og/
│   │           └── route.tsx             # OG image generator (@vercel/og)
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 layout/                    # Page-level structural components
│   │   │   ├── Navbar.tsx                # GSAP scroll behavior — transparent→cream
│   │   │   ├── Footer.tsx                # Coordinates + brand statement
│   │   │   └── MobileCTA.tsx             # Fixed bottom WhatsApp bar (mobile only)
│   │   │
│   │   ├── 📁 sections/                  # All 9 scroll sections (in page order)
│   │   │   ├── Preloader.tsx             # [TOOL: GSAP] Logo dissolve, 2.8s
│   │   │   ├── Hero.tsx                  # [TOOL: Three.js + Spline + GSAP]
│   │   │   ├── RouteMap.tsx              # [TOOL: Anime.js] SVG path draw
│   │   │   ├── Fleet.tsx                 # [TOOL: GSAP ScrollTrigger] Horizontal pin
│   │   │   ├── VideoScrub.tsx            # [TOOL: GSAP ScrollTrigger] Scrub video
│   │   │   ├── HowItWorks.tsx            # [TOOL: Anime.js + GSAP] Step reveal
│   │   │   ├── Testimonials.tsx          # [TOOL: GSAP] Full-screen indigo bg
│   │   │   ├── Pricing.tsx               # [TOOL: AOS + Floating UI] Table reveal
│   │   │   └── CTASection.tsx            # [TOOL: GSAP + SweetAlert2] Magnetic CTA
│   │   │
│   │   ├── 📁 ui/                        # Reusable UI components
│   │   │   ├── CustomCursor.tsx          # [TOOL: GSAP] Gold dot, mix-blend-mode
│   │   │   ├── MagneticButton.tsx        # [TOOL: GSAP] Elastic magnetic pull
│   │   │   ├── LiveClock.tsx             # [TOOL: Luxon] IST clock + availability
│   │   │   ├── PriceTooltip.tsx          # [TOOL: Floating UI] Smart tooltips
│   │   │   ├── BookingConfirm.tsx        # [TOOL: SweetAlert2] V3-branded modal
│   │   │   ├── VideoLoop.tsx             # Reusable ambient video component
│   │   │   ├── GrainOverlay.tsx          # Global film grain (CSS only)
│   │   │   ├── SectionRule.tsx           # Animated gold divider (GSAP scaleX)
│   │   │   └── ScrollIndicator.tsx       # Animated scroll arrow
│   │   │
│   │   ├── 📁 three/                     # Three.js + Babylon.js components
│   │   │   ├── HeroParticles.tsx         # [TOOL: Three.js] Gold particle field
│   │   │   ├── BabylonRouteMap.tsx       # [TOOL: Babylon.js] 3D Punjab terrain
│   │   │   └── RouteGame.tsx             # [TOOL: PlayCanvas] Interactive route
│   │   │
│   │   └── 📁 spline/                    # Spline 3D embeds
│   │       ├── V3Logo3D.tsx              # [TOOL: Spline] Chrome V3 logo
│   │       └── CarTour360.tsx            # [TOOL: A-Frame] 360° interior
│   │
│   └── 📁 lib/                           # Utility libraries
│       ├── lenis.ts                      # [TOOL: Lenis] Singleton smooth scroll
│       ├── gsap-config.ts                # [TOOL: GSAP] Plugin registration
│       ├── barba-init.ts                 # [TOOL: Barba.js] Page transitions
│       ├── motion-tokens.ts              # Animation constants (timings, easings)
│       ├── whatsapp.ts                   # WhatsApp link builder utility
│       ├── sanity.ts                     # Sanity CMS client
│       └── utils.ts                      # clsx + tailwind-merge helpers
│
├── 📁 sanity/                            # Sanity CMS
│   ├── sanity.config.ts
│   └── 📁 schema/
│       ├── route.ts                      # Route + pricing data schema
│       └── testimonial.ts               # Testimonial schema
│
├── 📁 public/
│   ├── 📁 fonts/                         # Self-hosted Satoshi font
│   │   ├── Satoshi-Regular.woff2
│   │   ├── Satoshi-Medium.woff2
│   │   └── Satoshi-Bold.woff2
│   ├── 📁 videos/                        # All AI-generated videos (11 files)
│   │   └── [See V3_VIDEO_PROMPTS.md for full list]
│   ├── 📁 images/
│   │   ├── 📁 hero/                      # Hero section images
│   │   ├── 📁 fleet/                     # Car photos (exterior, interior, detail)
│   │   ├── 📁 routes/                    # Punjab landscape, highway
│   │   ├── 📁 testimonials/              # Portrait backgrounds
│   │   └── 📁 textures/
│   │       ├── grain.png                 # Film grain overlay
│   │       └── paper.webp                # Cream paper texture
│   └── 📁 icons/
│       ├── v3-logo.svg                   # V3 gold SVG logo
│       ├── v3-mark.svg                   # V3 monogram mark (decorative)
│       └── whatsapp.svg                  # Custom WhatsApp icon (brand-matched)
│
├── .env.local                            # [NEVER commit] — all secrets
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## COMPONENT DEPENDENCY MAP
## (Which tools each component uses)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
layout.tsx
├── Lenis (init once here)
├── GSAP (register plugins once here)
├── Barba.js (init once here)
├── CustomCursor.tsx
│   └── GSAP (follower animation)
└── Preloader.tsx
    └── GSAP (timeline animation)

page.tsx (assembly)
├── Navbar.tsx → GSAP ScrollTrigger, Luxon (clock)
├── Hero.tsx
│   ├── HeroParticles.tsx → Three.js
│   ├── V3Logo3D.tsx → Spline
│   ├── GSAP + SplitText (headline animation)
│   ├── MagneticButton.tsx → GSAP
│   └── BookingConfirm.tsx → SweetAlert2
├── RouteMap.tsx → Anime.js
├── Fleet.tsx → GSAP ScrollTrigger (horizontal pin)
├── VideoScrub.tsx → GSAP ScrollTrigger (scrub)
├── HowItWorks.tsx → Anime.js + GSAP
├── Testimonials.tsx → GSAP ScrollTrigger
├── Pricing.tsx
│   ├── AOS (row reveals)
│   └── PriceTooltip.tsx → Floating UI
├── CTASection.tsx
│   ├── MagneticButton.tsx → GSAP
│   └── BookingConfirm.tsx → SweetAlert2
├── Footer.tsx
└── MobileCTA.tsx → GSAP (appears on scroll) + SweetAlert2
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DATA FLOW (How dynamic data works)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
STATIC DATA (hardcoded — change in code)
├── City names + coordinates (RouteMap.tsx)
├── How It Works steps (HowItWorks.tsx)
├── Hero headline copy (Hero.tsx)
└── Footer content (Footer.tsx)

SANITY CMS DATA (client can update via Sanity Studio)
├── Routes + pricing (Pricing.tsx fetches from Sanity)
└── Testimonials (Testimonials.tsx fetches from Sanity)

REAL-TIME DATA (computed at runtime)
├── Current IST time (Luxon — LiveClock.tsx)
├── Availability status (LiveClock.tsx — always true for V3)
└── ETA calculations (Luxon — calculateETA utility)

ENVIRONMENT DATA (from .env.local)
├── WhatsApp number (used in BookingConfirm + MobileCTA)
├── Spline scene URL (V3Logo3D.tsx)
└── Google Analytics ID (layout.tsx)
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SCROLL SECTION ORDER + HEIGHTS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Section          Height              Background            Tool
─────────────────────────────────────────────────────────────────────
Preloader        100dvh (overlay)    #1A1208 warm black    GSAP
Hero             100dvh              --bg-primary + video  Three.js + Spline
RouteMap         auto (~120vh)       --bg-surface          Anime.js
Fleet            100dvh × 4 (pinned) --bg-primary          GSAP ScrollTrigger
VideoScrub       300vh (pinned)      dark overlay          GSAP scrub
HowItWorks       auto (~100vh)       --bg-surface          Anime.js + GSAP
Testimonials     auto (~300vh)       --bg-indigo           GSAP
Pricing          auto (~100vh)       --bg-primary          AOS + Floating UI
CTASection       100dvh              --bg-primary          GSAP + SweetAlert2
Footer           auto (~40vh)        --bg-dark             Static
─────────────────────────────────────────────────────────────────────
TOTAL:           ~1200vh total scroll depth
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## NEXT.CONFIG.TS (Complete)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },        // Sanity CDN
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Accept-Ranges', value: 'bytes' },  // Video streaming
        ],
      },
    ]
  },

  // Webpack: Handle Babylon.js + PlayCanvas canvas modules
  webpack: (config) => {
    config.externals = config.externals || []
    return config
  },

  // Experiment: optimistic PPR
  experimental: {
    optimizeCss: true,   // Inline critical CSS
  },
}

export default nextConfig
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TAILWIND.CONFIG.TS (Extended tokens)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'v3': {
          'cream':     '#F6F1E7',
          'surface':   '#EDE6D6',
          'card':      '#FDFAF3',
          'dark':      '#1A1208',
          'indigo':    '#1E2B4A',
          'gold':      '#C8780A',
          'gold-bright':'#F0B429',
          'gold-pale': '#F5D485',
          'saffron':   '#E8943A',
          'text':      '#1A1208',
          'muted':     '#A08B72',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Satoshi', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      screens: {
        'xs': '375px',   // Small phones
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

*V3_ARCHITECTURE Version 1.0 | ARCHON | V3 Creative Studio | Ludhiana*
