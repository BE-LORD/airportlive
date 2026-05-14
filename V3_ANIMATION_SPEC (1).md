# ANIMATION_SPEC.md — V3 TOUR & TRAVELS
## Complete Animation Blueprints — Every Section
### SONA CORRIDOR | Version 1.0 | ARCHON Spec

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 00 — PRELOADER
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Duration:** 2.8 seconds total
**Feel:** Cinematic, purposeful — not a loading spinner

### Sequence:
```
0ms     → Black screen
200ms   → V3 logo appears (opacity 0→1, scale 0.85→1), ease: power3.out, 600ms
800ms   → "TOUR & TRAVELS" fades in below, tracked wide, opacity 0→1, 400ms
1400ms  → Gold horizontal rule scales from center (scaleX 0→1), 400ms
1800ms  → Logo + text fade out simultaneously (opacity 1→0, y: 0→-20px), 400ms
2200ms  → Cream background wipes upward (clip-path or translateY), 500ms
2700ms  → Hero section revealed — animations begin
```

### Code:
```javascript
const tl = gsap.timeline()

tl.fromTo('.preloader-logo',
  { opacity: 0, scale: 0.85 },
  { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
)
.fromTo('.preloader-tagline',
  { opacity: 0, y: 10 },
  { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2'
)
.fromTo('.preloader-rule',
  { scaleX: 0 },
  { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'center' }, '+=0.3'
)
.to(['.preloader-logo', '.preloader-tagline'],
  { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.3'
)
.to('.preloader',
  { yPercent: -100, duration: 0.5, ease: 'power3.inOut' }, '-=0.1'
)
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 01 — HERO SECTION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Duration:** 2 seconds after preloader exits
**Feel:** Cinematic title reveal — each word arrives like a film title card

### Elements:
- Background: Ambient video (looping dawn highway) OR static hero image with parallax
- Eyebrow label: "LUDHIANA · CHANDIGARH · DELHI"
- Main headline: "ARRIVE" (line 1) + "LIKE YOU WERE" (line 2) + "EXPECTED." (line 3)
- Subheadline: "Premium Airport Transfer. Toyota Innova Crysta."
- CTA: "Book Your Transfer →" (magnetic button)
- V3 logo 3D: Spline embed, floating right side
- Scroll indicator: Animated arrow pointing down

### Animation Sequence:
```
0s   → Video/image fades in (opacity 0→0.7), 1.5s, ease: power2.out
0.4s → Eyebrow label slides up (y: 20→0, opacity 0→1), 0.5s, ease: power3.out
0.7s → "ARRIVE" — characters animate in (SplitText chars), y: 80→0, rotationX: -90→0
       stagger: 0.035s, duration: 0.7s each, ease: power3.out
1.0s → "LIKE YOU WERE" — same treatment, stagger: 0.025s, duration: 0.6s
1.2s → "EXPECTED." — italic treatment, stagger: 0.04s, duration: 0.8s
1.5s → Subheadline fades in (opacity 0→1, y: 10→0), 0.5s
1.8s → CTA button appears (scale 0.9→1, opacity 0→1), 0.4s, ease: power2.out
2.0s → Scroll indicator pulses in, 0.3s
```

### SplitText Code:
```javascript
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText, ScrollTrigger)

const ctx = gsap.context(() => {
  // Wait for fonts to load
  document.fonts.ready.then(() => {
    const headline = new SplitText('.hero-headline', { type: 'chars, words, lines' })
    const tl = gsap.timeline({ delay: 2.8 }) // After preloader

    tl.from(headline.chars, {
      opacity: 0,
      y: 80,
      rotationX: -90,
      transformOrigin: '0% 50% -50px',
      stagger: 0.03,
      duration: 0.7,
      ease: 'power3.out'
    })
    .from('.hero-sub', { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
  })
}, heroRef)

return () => ctx.revert()
```

### Scroll Behavior (Pinned 0% → 15%):
```javascript
// Hero parallax on scroll
gsap.to('.hero-video', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
})

// Hero text fades on scroll
gsap.to('.hero-content', {
  opacity: 0,
  y: -40,
  scrollTrigger: {
    trigger: '.hero',
    start: 'center top',
    end: 'bottom top',
    scrub: 0.8
  }
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 02 — ROUTE MAP SECTION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 10% – 25%
**Feel:** The road being drawn for you. Patient. Precise.

### The WOW Moment: Animated SVG Route
A stylized map of Punjab + Haryana + Delhi NCR. No Google Maps. A custom illustrated SVG where:
1. A gold dotted line draws itself from Ludhiana dot → Chandigarh dot → Delhi dot
2. Each city dot pulses (scale 1 → 1.3 → 1) as the line reaches it
3. City name labels fade in with a slight upward movement
4. Small distance tags appear ("~95km" / "~265km")
5. Chapter number "01" appears as massive ghost background text

### Code:
```javascript
// SVG path animation
const routePath = document.querySelector('.route-path') // SVG path element
const pathLength = routePath.getTotalLength()

// Initialize — hidden
gsap.set(routePath, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength,
})

// Animate on scroll
gsap.to(routePath, {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.route-section',
    start: 'top 70%',
    end: 'center 30%',
    scrub: 1.5,
  }
})

// City dots pulse when line arrives
const cityDots = document.querySelectorAll('.city-dot')
cityDots.forEach((dot, i) => {
  ScrollTrigger.create({
    trigger: '.route-section',
    start: `top ${70 - (i * 20)}%`,
    onEnter: () => {
      gsap.fromTo(dot,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
      )
      // City label
      gsap.fromTo(dot.nextElementSibling,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 }
      )
    }
  })
})
```

### Chapter number ghost reveal:
```javascript
gsap.from('.chapter-ghost', {
  opacity: 0,
  x: -30,
  duration: 1.2,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.route-section', start: 'top 80%' }
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 03 — FLEET SHOWCASE (Horizontal Scroll)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 25% – 40% (PINNED)
**Feel:** Magazine spread. Like a luxury car editorial.

### Layout:
- Section is PINNED while user scrolls horizontally through 4 slides:
  1. Full car exterior (low angle, golden hour)
  2. Interior — leather seats, climate control
  3. Boot space / luggage
  4. Driver detail — gloved hands, steering wheel

### Code:
```javascript
const panels = gsap.utils.toArray('.fleet-panel')

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.fleet-section',
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      duration: { min: 0.2, max: 0.5 },
      ease: 'power2.inOut'
    },
    end: () => '+=' + document.querySelector('.fleet-section').offsetWidth * (panels.length - 1)
  }
})

// Panel content reveals as each panel enters
panels.forEach((panel, i) => {
  gsap.from(panel.querySelector('.panel-content'), {
    opacity: 0,
    x: 40,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: panel,
      containerAnimation: fleetST, // the horizontal scroll
      start: 'left center',
      toggleActions: 'play none none reverse'
    }
  })
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 04 — VIDEO SCRUB SECTION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 40% – 55% (PINNED)
**Feel:** You ARE in the car. This IS the journey.

### What happens:
- Video is pinned to viewport
- As user scrolls, video scrubs through 10-second clip
- Video shows: Ludhiana street → expressway entry → highway → Chandigarh signboard → Delhi skyline glimpse
- Overlaid text changes at 3 keyframe points:
  - 0–3s: "From Ludhiana's heart..."
  - 3–7s: "Through Punjab's golden corridor..."
  - 7–10s: "To wherever you need to be."

### Code:
```javascript
const videoEl = document.querySelector('.scrub-video')

// Pause video initially
videoEl.pause()
videoEl.currentTime = 0

// Scrub with scroll
gsap.to(videoEl, {
  currentTime: videoEl.duration || 10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.video-scrub-section',
    pin: true,
    scrub: 0.5,
    start: 'top top',
    end: '+=300%',
  }
})

// Overlay text at keyframe positions
const overlays = [
  { selector: '.overlay-1', start: '0%', end: '30%' },
  { selector: '.overlay-2', start: '30%', end: '65%' },
  { selector: '.overlay-3', start: '65%', end: '100%' },
]

overlays.forEach(({ selector, start, end }) => {
  ScrollTrigger.create({
    trigger: '.video-scrub-section',
    start: `top+=${parseInt(start) * 3 / 100 * window.innerHeight * 3} top`,
    end:   `top+=${parseInt(end) * 3 / 100 * window.innerHeight * 3} top`,
    onEnter: () => gsap.to(selector, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
    onLeave: () => gsap.to(selector, { opacity: 0, y: -15, duration: 0.3 }),
    onEnterBack: () => gsap.to(selector, { opacity: 1, y: 0, duration: 0.5 }),
    onLeaveBack: () => gsap.to(selector, { opacity: 0, y: 15, duration: 0.3 }),
  })
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 05 — HOW IT WORKS (Playful Animated Steps)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 55% – 70%
**Feel:** Smart. Simple. Satisfying.
**Anti-AI filter check:** NOT icons in boxes. NOT numbered cards. Instead: large animated step numbers that count themselves up, with a drawing-in SVG icon animation.

### Step Reveal Animation:
```javascript
const steps = document.querySelectorAll('.how-step')

steps.forEach((step, i) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: step,
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  })

  // Big number counts up (0 → 1, 2, or 3)
  const numEl = step.querySelector('.step-number')
  tl.from(numEl, {
    textContent: 0,
    duration: 0.6,
    ease: 'power2.out',
    snap: { textContent: 1 },
    stagger: 0.1
  })

  // Step icon draws itself (SVG stroke animation)
  const icon = step.querySelector('.step-icon path')
  const len = icon.getTotalLength()
  tl.fromTo(icon,
    { strokeDasharray: len, strokeDashoffset: len },
    { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
    '-=0.3'
  )

  // Text reveals
  const split = new SplitText(step.querySelector('.step-title'), { type: 'words' })
  tl.from(split.words, {
    opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out'
  }, '-=0.4')

  tl.from(step.querySelector('.step-body'), {
    opacity: 0, y: 10, duration: 0.4, ease: 'power2.out'
  }, '-=0.2')
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 06 — TESTIMONIALS (Full-Screen Editorial)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 70% – 80%
**Background:** Switches to --bg-indigo (midnight indigo) — contrast moment
**Feel:** You stop. You read. You believe.

### Layout:
Each testimonial takes full screen. One at a time. Ambient background video (blurred, dark highway at night) behind glass-blur card.

### Animation:
```javascript
const quotes = gsap.utils.toArray('.testimonial-quote')

quotes.forEach((quote, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: quote,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    }
  })
  .from(quote, {
    opacity: 0,
    scale: 0.96,
    y: 40,
    duration: 1,
    ease: 'power3.out'
  })
  .to(quote, {
    opacity: 0,
    scale: 1.02,
    y: -30,
    duration: 1,
    ease: 'power3.in'
  })
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 07 — PRICING TABLE (Typographic)
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 80% – 90%
**Feel:** Editorial. Like a menu at a fine restaurant.

### Animation — Row reveal with distance counter:
```javascript
const rows = document.querySelectorAll('.route-row')

rows.forEach((row, i) => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' }
  })

  // Row slides in from left
  tl.from(row, {
    x: -40,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    delay: i * 0.08
  })

  // Price counts up
  const price = row.querySelector('.price-value')
  tl.from(price, {
    textContent: 0,
    duration: 0.8,
    ease: 'power2.out',
    snap: { textContent: 50 },
    onUpdate: function() {
      price.textContent = '₹' + Math.ceil(this.targets()[0]._gsap.textContent)
    }
  }, '-=0.3')

  // Gold rule under each row draws in
  tl.fromTo(row.querySelector('.row-rule'),
    { scaleX: 0 },
    { scaleX: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'left' },
    '-=0.5'
  )
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 08 — WHATSAPP CTA SECTION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Scroll Position:** 90% – 100%
**Background:** Returns to --bg-primary with warm radial glow behind button
**Feel:** Inevitable. This is where the journey ends and the booking begins.

### Magnetic Button (The Signature Interaction):
```javascript
const ctaBtn = document.querySelector('.cta-whatsapp')

ctaBtn.addEventListener('mousemove', (e) => {
  const rect = ctaBtn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2

  gsap.to(ctaBtn, {
    x: x * 0.4,
    y: y * 0.4,
    duration: 0.4,
    ease: 'power2.out'
  })

  // Inner text moves slightly more
  gsap.to(ctaBtn.querySelector('span'), {
    x: x * 0.15,
    y: y * 0.15,
    duration: 0.4,
    ease: 'power2.out'
  })
})

ctaBtn.addEventListener('mouseleave', () => {
  gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
  gsap.to(ctaBtn.querySelector('span'), { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
})
```

### Section reveal:
```javascript
const tl = gsap.timeline({
  scrollTrigger: { trigger: '.cta-section', start: 'top 70%' }
})

tl.from('.cta-eyebrow', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' })
  .from('.cta-headline', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  .from('.cta-sub', { opacity: 0, y: 15, duration: 0.5 }, '-=0.3')
  .from('.cta-whatsapp', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }, '-=0.2')
  .from('.cta-glow', { scale: 0, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 09 — NAVBAR BEHAVIOR
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```javascript
// Transparent on hero → Cream + blur on scroll
ScrollTrigger.create({
  start: 'top -80px',
  onUpdate: (self) => {
    if (self.progress > 0) {
      gsap.to('.navbar', {
        backgroundColor: 'rgba(246, 241, 231, 0.92)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(26, 18, 8, 0.08)',
        duration: 0.4
      })
    } else {
      gsap.to('.navbar', {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        boxShadow: 'none',
        duration: 0.4
      })
    }
  }
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 10 — MOBILE STICKY WHATSAPP CTA
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```javascript
// Appears after hero exits
ScrollTrigger.create({
  start: 'top -100px',
  onEnter: () => {
    gsap.to('.mobile-wa-cta', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out'
    })
  },
  onLeaveBack: () => {
    gsap.to('.mobile-wa-cta', {
      y: 80,
      opacity: 0,
      duration: 0.3
    })
  }
})
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 11 — GLOBAL RULES FOR ALL ANIMATIONS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```javascript
// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0)
  // Show all elements without animation
  gsap.set('*', { opacity: 1, x: 0, y: 0, scale: 1 })
  return
}

// Refresh ScrollTrigger after all images load
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})

// Kill ScrollTriggers properly on component unmount (React)
return () => {
  ctx.revert()
  ScrollTrigger.getAll().forEach(st => st.kill())
}
```

---

*ANIMATION_SPEC Version 1.0 | ARCHON | V3 Creative Studio | Ludhiana*
