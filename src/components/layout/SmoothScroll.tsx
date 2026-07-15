'use client';

import { useEffect } from 'react';
import { useMediaPerformance } from '@/hooks/useMediaPerformance';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { canUseSmoothScroll } = useMediaPerformance();

  useEffect(() => {
    if (!canUseSmoothScroll) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    async function initLenis() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.07,
        duration: 1.15,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    }

    initLenis();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, [canUseSmoothScroll]);

  return <>{children}</>;
}
