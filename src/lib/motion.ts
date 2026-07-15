/**
 * V3 Premium Motion Tokens
 *
 * Motion personality: premium cinematic editorial motion.
 * Calm, precise, mobile-first, and conversion-focused.
 */

export const motionEases = {
  mainEase: [0.22, 1, 0.36, 1] as [number, number, number, number],
  softEase: [0.16, 1, 0.3, 1] as [number, number, number, number],
  quickEase: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
} as const;

export const motionDurations = {
  micro: 0.14,
  buttonTap: 0.12,
  inputFocus: 0.18,
  cardHover: 0.22,
  cardReveal: 0.42,
  sectionReveal: 0.52,
  heroReveal: 0.95,
  pageTransition: 0.56,
  drawerOpen: 0.4,
  accordionOpen: 0.28,
  carouselSnap: 0.32,
  countUp: 1.1,
  imageReveal: 0.68,
} as const;

export const motionTokens = {
  /** Duration presets (seconds) */
  duration: {
    /** Micro-interactions: button press, focus ring */
    micro: motionDurations.micro,
    /** Fast transitions: tooltip, tab switch */
    fast: motionDurations.accordionOpen,
    /** Standard section entry animation */
    base: motionDurations.cardReveal,
    /** Section-level reveals */
    section: motionDurations.sectionReveal,
    /** Cinematic hero / headline reveals */
    cinematic: motionDurations.heroReveal,
    /** Desktop preloader sequence */
    preloaderDesktop: 2.4,
    /** Mobile preloader (shorter for perceived speed) */
    preloaderMobile: 1.6,
  },

  /** Cubic-bezier easing curves */
  ease: {
    /** Standard exit ease — smooth deceleration */
    out: motionEases.softEase,
    /** Symmetric in-out */
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
    /** Soft, luxurious settle */
    soft: motionEases.mainEase,
    /** Quick tap/feedback curve; avoid bouncy motion. */
    quick: motionEases.quickEase,
  },

  /** Y-axis displacement presets (px) */
  distance: {
    /** Subtle shift for micro-interactions */
    subtle: 12,
    /** Mobile reveal offset; must stay between 12px and 20px. */
    mobile: 16,
    /** Standard section entry offset */
    base: 24,
    /** Standard section reveal travel */
    section: 40,
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

export type RevealVariantOptions = {
  delay?: number;
  duration?: number;
  y?: number;
  reducedMotion?: boolean;
};

export function buildRevealVariants({
  delay = 0,
  duration = motionDurations.sectionReveal,
  y = motionTokens.distance.section,
  reducedMotion = false,
}: RevealVariantOptions = {}) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }

  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: motionEases.mainEase,
      },
    },
  };
}

/**
 * GSAP ease string equivalents for named easings.
 * Use these when GSAP expects a string (e.g., "expo.out").
 */
export const gsapEase = {
  /** Standard deceleration */
  out: "expo.out",
  /** Power curve for parallax */
  power: "power2.out",
  /** Restrained settle for premium entries */
  settle: "power3.out",
  /** Linear for scroll-scrub */
  linear: "none",
  /** Smooth sine for breathing animations */
  sine: "sine.inOut",
} as const;
