'use client';

/**
 * ScrollColorMatrix — Stage B of the 1000000x Blueprint
 * 
 * Creates smooth section transitions with:
 * 1. Ambient gold glow orbs that follow scroll position
 * 2. Scroll velocity-responsive header opacity
 * 3. Section transition blending overlays
 * 
 * This component is mounted once at the page root and
 * reads scroll data to animate global atmospheric elements.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

export function ScrollColorMatrix() {
  const { scrollYProgress, scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());
  
  // Smooth spring-based transforms for organic movement
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Ambient orb positions — they drift based on scroll
  const orbY1 = useTransform(smoothProgress, [0, 0.5, 1], ['5vh', '45vh', '85vh']);
  const orbY2 = useTransform(smoothProgress, [0, 0.5, 1], ['20vh', '60vh', '10vh']);
  const orbOpacity1 = useTransform(smoothProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], [0.04, 0.06, 0.03, 0.05, 0.03, 0.06, 0.04]);
  const orbOpacity2 = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.03, 0.05, 0.02, 0.04, 0.06, 0.03]);

  // Gold orb color shifts based on section (dark sections get brighter orbs)
  const orbColor1 = useTransform(
    smoothProgress,
    [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [
      'rgba(200, 120, 10, 0.08)',  // Hero (dark) — visible
      'rgba(200, 120, 10, 0.04)',  // Services (light) — subtle
      'rgba(200, 120, 10, 0.03)',  // RouteCorridor (mixed) — minimal
      'rgba(200, 120, 10, 0.07)',  // FleetShowcase (dark) — visible
      'rgba(200, 120, 10, 0.03)',  // BookingFlow (light) — subtle
      'rgba(200, 120, 10, 0.07)',  // Gallery (dark) — visible
      'rgba(200, 120, 10, 0.03)',  // FAQ (light) — subtle
      'rgba(200, 120, 10, 0.06)',  // Footer (dark) — visible
    ]
  );

  // Velocity tracking for scroll-responsive elements
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const v = Math.abs(latest - lastScroll.current) / dt;
      setVelocity(Math.min(v * 10, 1)); // Normalize 0-1
    }
    lastScroll.current = latest;
    lastTime.current = now;
  });

  // Scroll progress indicator bar at top
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50 });

  return (
    <>
      {/* ═══ Scroll Progress Bar — Gold line at top ═══ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D1D1D1] via-[#FFFFFF] to-[#D1D1D1] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* ═══ Ambient Floating Orbs — They drift with scroll ═══ */}
      <motion.div
        className="fixed left-[-15vw] w-[40vw] h-[40vw] rounded-full pointer-events-none z-[0] blur-[120px]"
        style={{ top: orbY1, backgroundColor: orbColor1, opacity: orbOpacity1 }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed right-[-10vw] w-[30vw] h-[30vw] rounded-full pointer-events-none z-[0] blur-[100px]"
        style={{ top: orbY2, backgroundColor: 'rgba(240, 180, 41, 0.05)', opacity: orbOpacity2 }}
        aria-hidden="true"
      />

      {/* ═══ Velocity Indicator — Subtle side accent ═══ */}
      <motion.div
        className="fixed right-0 top-1/2 -translate-y-1/2 w-[3px] bg-[#D1D1D1]/30 z-[99] pointer-events-none rounded-full origin-center"
        animate={{ 
          height: `${20 + velocity * 80}px`,
          opacity: velocity > 0.05 ? 0.4 : 0,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />
    </>
  );
}
