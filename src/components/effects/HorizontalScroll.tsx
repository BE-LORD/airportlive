'use client';

/**
 * HorizontalScroll - Pinned horizontal scroll section
 * 
 * Features:
 * - Pinned horizontal scroll using ScrollTrigger
 * - Animate cards horizontally with scrub: 1
 * - Card reveal animations as they enter viewport
 * - Calculate total scroll distance based on card widths
 * - Respects prefers-reduced-motion
 */

import { useEffect, useRef, ReactNode } from 'react';
import { useAnimationController } from '@/hooks/useAnimationController';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function HorizontalScroll({
  children,
  className = '',
  speed = 1,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, prefersReducedMotion } = useAnimationController();

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    
    if (!container || !scroller || prefersReducedMotion) return;

    // Calculate total scroll distance
    const scrollWidth = scroller.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = scrollWidth - containerWidth;

    // Create horizontal scroll animation
    const animation = gsap.to(scroller, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance * speed}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate cards as they enter viewport
    const cards = scroller.querySelectorAll('[data-card]');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: animation,
            start: 'left right',
            end: 'left center',
            scrub: 1,
          },
        }
      );
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger, speed, prefersReducedMotion]);

  // If reduced motion, render as normal vertical scroll
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        ref={scrollerRef}
        className="flex gap-8 w-max"
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
