/**
 * SONA CORRIDOR 2.0 — Centralized Motion Tokens
 * Master Spec: FRAMER_PREMIUM_FRONTEND_REDESIGN_MASTER.md §12
 *
 * All GSAP animations should reference these tokens
 * for consistent motion language across the entire site.
 */

export const motionTokens = {
  /** Duration presets (seconds) */
  duration: {
    /** Micro-interactions: button press, focus ring */
    micro: 0.18,
    /** Fast transitions: tooltip, tab switch */
    fast: 0.28,
    /** Standard section entry animation */
    base: 0.45,
    /** Section-level reveals */
    section: 0.75,
    /** Cinematic hero / headline reveals */
    cinematic: 1.2,
    /** Desktop preloader sequence */
    preloaderDesktop: 2.4,
    /** Mobile preloader (shorter for perceived speed) */
    preloaderMobile: 1.6,
  },

  /** Cubic-bezier easing curves */
  ease: {
    /** Standard exit ease — smooth deceleration */
    out: [0.16, 1, 0.3, 1] as [number, number, number, number],
    /** Symmetric in-out */
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
    /** Soft, luxurious settle */
    soft: [0.22, 1, 0.36, 1] as [number, number, number, number],
    /** Elastic snap for playful entries */
    snap: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },

  /** Y-axis displacement presets (px) */
  distance: {
    /** Subtle shift for micro-interactions */
    subtle: 12,
    /** Standard section entry offset */
    base: 24,
    /** Dramatic hero / cinematic offset */
    dramatic: 80,
  },

  /** Velocity-based transform limits */
  velocity: {
    /** Max skew in degrees */
    maxSkew: 5,
    /** Velocity divisor for skew calculation */
    skewDivisor: 300,
    /** Max stretch multiplier (1.0 = none) */
    maxStretch: 1.03,
    /** Min stretch multiplier */
    minStretch: 0.97,
    /** Velocity divisor for stretch calculation */
    stretchDivisor: 5000,
  },

  /** Stagger presets */
  stagger: {
    /** Fast card/list stagger */
    fast: 0.06,
    /** Standard stagger */
    base: 0.1,
    /** Dramatic headline stagger */
    dramatic: 0.15,
  },
} as const;

/**
 * GSAP ease string equivalents for named easings.
 * Use these when GSAP expects a string (e.g., "expo.out").
 */
export const gsapEase = {
  /** Standard deceleration */
  out: "expo.out",
  /** Power curve for parallax */
  power: "power2.out",
  /** Elastic bounce for playful entries */
  elastic: "back.out(1.4)",
  /** Linear for scroll-scrub */
  linear: "none",
  /** Smooth sine for breathing animations */
  sine: "sine.inOut",
} as const;
