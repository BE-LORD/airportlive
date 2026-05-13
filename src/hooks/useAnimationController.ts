/**
 * useAnimationController - React hook for AnimationController
 * 
 * Provides access to the AnimationController singleton
 */

import { useEffect, useState } from 'react';
import { AnimationController } from '@/lib/gsap/AnimationController';

export function useAnimationController() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    AnimationController.isPrefersReducedMotion()
  );

  useEffect(() => {
    // Update state when reduced motion preference changes
    const checkReducedMotion = () => {
      setPrefersReducedMotion(AnimationController.isPrefersReducedMotion());
    };

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  return {
    controller: AnimationController,
    prefersReducedMotion,
    gsap: AnimationController.getGSAP(),
    ScrollTrigger: AnimationController.getScrollTriggerPlugin(),
  };
}
