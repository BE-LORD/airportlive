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

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollColorMatrix() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const mobileOrTouch = window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const saveData = Boolean(connection?.saveData);
      const slowConnection =
        connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';

      setEnabled(!mobileOrTouch && !reducedMotion && !saveData && !slowConnection);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return enabled ? <DesktopAmbientColorMatrix /> : null;
}

function DesktopAmbientColorMatrix() {
  const { scrollYProgress } = useScroll();
  
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

  return (
    <>
      {/* ═══ Ambient Floating Orbs — They drift with scroll ═══ */}
      <motion.div
        className="fixed left-[-14vw] h-[34vw] w-[34vw] rounded-full pointer-events-none z-[0] blur-[80px]"
        style={{ top: orbY1, backgroundColor: orbColor1, opacity: orbOpacity1 }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed right-[-9vw] h-[26vw] w-[26vw] rounded-full pointer-events-none z-[0] blur-[72px]"
        style={{ top: orbY2, backgroundColor: 'rgba(240, 180, 41, 0.05)', opacity: orbOpacity2 }}
        aria-hidden="true"
      />
    </>
  );
}
