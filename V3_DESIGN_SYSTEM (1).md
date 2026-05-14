# DESIGN_SYSTEM.md — V3 TOUR & TRAVELS
## Design System: SONA CORRIDOR
### Light Mode | Warm Editorial | Playfully Premium
### Version 1.0 | ARCHON Spec

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 01 — DESIGN PHILOSOPHY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**"Sona Corridor" is Punjab's golden road made visible.**

This is NOT:
- A white corporate website with blue buttons
- A dark luxury site (we deliberately break that expectation)
- A generic travel template with stock images

This IS:
- Warm cream paper that feels hand-crafted and premium at the same time
- Gold that is earthy, deep, and real — not the cheap gold of discount apps
- Typography that has personality — sometimes it floats, sometimes it roars
- Interactions that make you smile (magnetic pull, playful hovers, characters that dance)
- A light website that carries the weight of a ₹50,000 brand

**The one thing a visitor will remember:**
The route animation — a gold line drawing itself from Ludhiana to Delhi, city names appearing one by one, like the road is being built in real time just for them.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 02 — COLOR PALETTE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Full CSS Variables (globals.css)

```css
:root {
  /* Backgrounds — warm cream hierarchy */
  --bg-primary:    #F6F1E7;   /* Main page background — warm cream paper */
  --bg-surface:    #EDE6D6;   /* Section backgrounds — slightly deeper */
  --bg-card:       #FDFAF3;   /* Cards, modals — near white but warm */
  --bg-dark:       #1A1208;   /* CONTRAST moments — deep warm black */
  --bg-indigo:     #1E2B4A;   /* Midnight indigo — for WOW sections */

  /* Typography */
  --text-primary:  #1A1208;   /* Main text — warm near-black */
  --text-secondary:#5C4733;   /* Subtext — warm brown */
  --text-muted:    #A08B72;   /* Meta, labels — warm grey */
  --text-on-dark:  #F6F1E7;   /* Text on dark sections */
  --text-gold:     #C8780A;   /* Gold text treatments */

  /* Accent Colors */
  --gold-deep:     #C8780A;   /* Primary accent — deep saffron gold */
  --gold-bright:   #F0B429;   /* Bright luminous gold — highlights, glows */
  --gold-pale:     #F5D485;   /* Soft gold — subtle elements */
  --indigo-deep:   #1E2B4A;   /* Contrast sections, dark moments */
  --indigo-mid:    #2D3E6A;   /* Hover states on indigo sections */
  --saffron:       #E8943A;   /* Warm orange — Punjab reference */

  /* Interactive */
  --hover-lift:    rgba(200, 120, 10, 0.08);  /* Gold tint on hover */
  --glow-gold:     rgba(240, 180, 41, 0.25);  /* Gold glow for buttons */
  --border-subtle: rgba(26, 18, 8, 0.08);     /* Light borders */
  --border-gold:   rgba(200, 120, 10, 0.3);   /* Gold borders */

  /* Grain texture intensity */
  --grain-opacity: 0.035;
}
```

### Color Usage Rules

| Color | Use | Never Use For |
|-------|-----|---------------|
| `--bg-primary` #F6F1E7 | Main background | Text on this (use --text-primary) |
| `--gold-deep` #C8780A | CTAs, highlights, route line | Large body text blocks |
| `--gold-bright` #F0B429 | Glow effects, icons, hover states | Backgrounds (too bright) |
| `--bg-indigo` #1E2B4A | CTA section, testimonials section | More than 2 sections |
| `--text-primary` #1A1208 | All body text | Light backgrounds with poor contrast |
| `--saffron` #E8943A | Accent moments, icons | Primary text |

### Grain Texture (Global)
Every section has a subtle film grain overlay at 3.5% opacity. This is what separates premium from flat. Applied via CSS `::after` pseudo-element using SVG noise filter or static PNG grain.

```css
.grain-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/images/grain.png');
  opacity: var(--grain-opacity);
  pointer-events: none;
  z-index: 9999;
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 03 — TYPOGRAPHY SYSTEM
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Font Stack

```css
/* Display — Cormorant Garamond: warm, editorial, Indian-compatible, luxurious serifs */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,500&display=swap');

/* Body — Satoshi: modern, geometric, premium feel without being cold */
/* Source: fontshare.com/fonts/satoshi */

/* Mono — JetBrains Mono: for route codes, times, distances */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Satoshi', 'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;
}
```

### Type Scale

```css
/* KINETIC / HERO — Large display */
--text-hero:      clamp(72px, 12vw, 160px);   /* "V3 TOUR & TRAVELS" */
--text-display:   clamp(48px, 7vw, 96px);      /* Section titles */
--text-headline:  clamp(32px, 4vw, 56px);      /* Sub-sections */
--text-title:     clamp(24px, 3vw, 36px);      /* Cards, features */
--text-body:      clamp(16px, 1.5vw, 18px);    /* Body text */
--text-small:     14px;                         /* Labels, meta */
--text-mono:      clamp(11px, 1.2vw, 13px);    /* Route codes */
```

### Typography Behavior Rules

1. **Hero headline:** Cormorant Garamond Bold, character-level split animation
2. **Section numbers:** "01. 02. 03." in JetBrains Mono, --text-muted color
3. **Route codes:** "LDH → CHD → DEL" in JetBrains Mono — feels technical + premium
4. **Chapter labels:** Cormorant Garamond Italic — "Chapter I: The Road"
5. **Body text:** Satoshi Regular — never Cormorant for long body copy (readability)
6. **CTAs:** Satoshi Medium, tracked wide (letter-spacing: 0.1em), uppercase

### Type Treatments That Create "WOW"

```css
/* Outline / Ghost text — used for background chapter numbers */
.text-outline {
  -webkit-text-stroke: 1px rgba(200, 120, 10, 0.15);
  color: transparent;
  font-size: clamp(100px, 20vw, 280px);
  font-family: var(--font-display);
}

/* Tracked display — luxury labels */
.text-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Gold gradient text */
.text-gold-gradient {
  background: linear-gradient(135deg, #C8780A 0%, #F0B429 50%, #C8780A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 04 — SPACING SYSTEM
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   16px;
  --space-4:   24px;
  --space-5:   40px;
  --space-6:   64px;
  --space-7:   96px;
  --space-8:   128px;
  --space-9:   192px;
  --space-10:  256px;
}

/* Section padding */
--section-padding-y: clamp(80px, 12vw, 160px);
--section-padding-x: clamp(24px, 6vw, 80px);

/* Container */
--container-max: 1440px;
--container-comfortable: 1200px;
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 05 — MOTION TOKENS
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```javascript
// lib/motion-tokens.ts
export const motion = {
  // Easing
  ease: {
    out:      'power3.out',
    inOut:    'power2.inOut',
    smooth:   'power4.out',
    elastic:  'elastic.out(1, 0.5)',
    bounce:   'bounce.out',
    slow:     'power1.inOut',
  },

  // Durations
  duration: {
    instant:      0.15,   // Micro-interactions
    fast:         0.3,    // Hover states
    normal:       0.6,    // Content reveals
    slow:         0.9,    // Section transitions
    cinematic:    1.4,    // Hero animations
    epic:         2.0,    // Preloader, major reveals
  },

  // Stagger
  stagger: {
    chars:  0.025,  // Character-level text
    words:  0.08,   // Word-level text
    items:  0.1,    // List items, cards
    slow:   0.15,   // Featured items
  },

  // Scroll trigger defaults
  scrollTrigger: {
    start:    'top 80%',
    end:      'bottom 20%',
    scrubFast: 0.5,
    scrubSlow: 1.5,
  }
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 06 — COMPONENT VISUAL LANGUAGE
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Buttons

```css
/* PRIMARY — WhatsApp / Book Now */
.btn-primary {
  background: var(--gold-deep);
  color: #FDFAF3;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 18px 40px;
  border-radius: 2px;          /* Almost square — premium */
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Hover — fill sweep from left */
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold-bright);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s power3.out;
}

.btn-primary:hover::before { transform: scaleX(1); }

/* SECONDARY — Outline style */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid var(--border-gold);
  padding: 16px 36px;
  border-radius: 2px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 13px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--hover-lift);
  border-color: var(--gold-deep);
  color: var(--gold-deep);
}
```

### Cards (Fleet + Route items)

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.4s power3.out, box-shadow 0.4s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(26, 18, 8, 0.08), 
              0 4px 16px rgba(200, 120, 10, 0.06);
}
```

### Section Dividers

Not lines. Not borders. Negative space + a 1px gold rule that appears on scroll, like a thread being pulled through paper.

```css
.section-rule {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-pale), transparent);
  transform: scaleX(0);
  transform-origin: center;
}
/* Animated in on scroll with GSAP scaleX(0→1) */
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 07 — CUSTOM CURSOR
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Default:    Small circle (12px) in --gold-deep, no border
Hover CTA:  Expands to 40px, fill gold, text "BOOK" appears inside (10px Mono)
Hover Image: Expands to 60px, border only (hollow), rotates slowly
Hover text: Shrinks to 6px, shifts to underline style
```

CSS:
```css
.cursor {
  width: 12px;
  height: 12px;
  background: var(--gold-deep);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: multiply; /* Blends beautifully on cream */
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
}
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 08 — ICONOGRAPHY
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Library: Lucide React (lightest, cleanest SVG icons)
- Style: Stroke-only, 1.5px, rounded caps
- Color: Always --gold-deep or --text-secondary
- Size: 20px standard, 32px featured, 16px inline
- NO filled icons anywhere
- NO colored icon sets (Material UI, Font Awesome color packs)

Special icons designed custom (SVG):
- V3 monogram mark (decorative, used in dividers)
- Route arrow (custom directional element)
- WhatsApp icon (modified to match brand — not stock green)

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 09 — PHOTOGRAPHY + VIDEO DIRECTION
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Photography Style
- **Lighting:** Golden hour / early morning. Never harsh noon light.
- **Color grading:** Warm tones with slight film grain. Slight fade in shadows.
- **Car shots:** Low angle, dramatic perspective. Car fills 70% of frame.
- **Interior shots:** Macro detail — stitching, wood trim, sunroof, arm rest.
- **Human presence:** Hands on steering wheel. Door opening from inside. Never stock-smiling chauffeur.
- **Environment:** Punjab expressway, wheat fields, airport exterior at dusk.

### Video Style
- Slow push-in camera movements
- 24fps cinematic (not 60fps "video" look)
- Shallow depth of field
- Natural ambient sound (optional) — wind, engine purr
- Color grade: Warm cream + gold tones, slightly desaturated highlights

### What to NEVER show:
- Ola/Uber style top-down car graphic
- Stock driver photo (generic)
- Night photography with harsh flash
- Interior with garbage/mess
- Any other car brand logos visible

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 10 — LAYOUT RULES
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Break the grid at least once per section** — an image that bleeds to edge, a number that overlaps text
2. **Section chapter numbers** ("01 / 06") — displayed as oversized ghost text behind content (outline, 8% opacity)
3. **Asymmetry is default** — never center-stack everything
4. **Text overlaps images intentionally** — with mix-blend-mode: multiply or careful z-index layering
5. **No equal-sized columns** — prefer 60/40, 70/30, or completely broken grid
6. **Generous negative space** — especially before the WOW moments (breathing room creates anticipation)
7. **One element per section that bleeds full-width** — either image or background color
8. **The footer is designed, not an afterthought** — coordinates, brand mark, minimal gold rule

---

*DESIGN_SYSTEM Version 1.0 | ARCHON | V3 Creative Studio | Ludhiana*
