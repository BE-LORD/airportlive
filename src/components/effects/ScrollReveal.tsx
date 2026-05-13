'use client';

/**
 * ScrollReveal - Scroll-triggered animations for sections
 * 
 * Features:
 * - Multiple animation variants (fade, slide-up, slide-left, scale, rotate)
 * - ScrollTrigger configuration (start: 'top 80%', toggleActions: 'play none none reverse')
 * - Respects prefers-reduced-motion
 */

import { useEffect, useRef, ReactNode } from 'react';
import { useAnimationController } from '@/hooks/useAnimationController';

export type ScrollRevealVariant = 
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'rotate';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  className?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  triggerStart?: string;
  toggleActions?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = 'fade',
  className = '',
  duration = 0.8,
  delay = 0,
  stagger = 0,
  triggerStart = 'top 80%',
  toggleActions = 'play none none reverse',
  once = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, prefersReducedMotion } = useAnimationController();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    // Get initial state based on variant
    const getInitialState = (): gsap.TweenVars => {
      switch (variant) {
        case 'fade':
          return { opacity: 0 };
        case 'slide-up':
          return { opacity: 0, y: 50 };
        case 'slide-down':
          return { opacity: 0, y: -50 };
        case 'slide-left':
          return { opacity: 0, x: 50 };
        case 'slide-right':
          return { opacity: 0, x: -50 };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        case 'rotate':
          return { opacity: 0, rotateY: 90 };
        default:
          return { opacity: 0 };
      }
    };

    // Get final state
    const getFinalState = (): gsap.TweenVars => {
      switch (variant) {
        case 'fade':
          return { opacity: 1 };
        case 'slide-up':
        case 'slide-down':
          return { opacity: 1, y: 0 };
        case 'slide-left':
        case 'slide-right':
          return { opacity: 1, x: 0 };
        case 'scale':
          return { opacity: 1, scale: 1 };
        case 'rotate':
          return { opacity: 1, rotateY: 0 };
        default:
          return { opacity: 1 };
      }
    };

    // Set initial state
    gsap.set(container, getInitialState());

    // Get children elements for stagger
    const children = stagger > 0 
      ? Array.from(container.children) 
      : container;

    // Create animation
    const animation = gsap.to(children, {
      ...getFinalState(),
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        toggleActions,
        once,
      },
    });

    return () => {
      animation.kill();
    };
  }, [
    variant,
    duration,
    delay,
    stagger,
    triggerStart,
    toggleActions,
    once,
    gsap,
    ScrollTrigger,
    prefersReducedMotion,
  ]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
