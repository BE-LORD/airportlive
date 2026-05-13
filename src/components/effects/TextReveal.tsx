'use client';

/**
 * TextReveal - Character-level text reveal animation
 * 
 * Features:
 * - Character-by-character fade-in with stagger
 * - 3D rotation effect (rotationX: 90 to 0)
 * - Scroll-triggered activation with IntersectionObserver
 * - Respects prefers-reduced-motion
 */

import { useEffect, useRef } from 'react';
import { useAnimationController } from '@/hooks/useAnimationController';

interface TextRevealProps {
  children: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
}

export function TextReveal({
  children,
  className = '',
  stagger = 0.03,
  duration = 0.6,
  delay = 0,
  triggerOnce = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gsap, prefersReducedMotion } = useAnimationController();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into characters
    const text = children;
    const chars = text.split('');
    
    // Clear container and create character spans
    container.innerHTML = '';
    const charElements: HTMLSpanElement[] = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
      span.style.display = 'inline-block';
      span.style.opacity = prefersReducedMotion ? '1' : '0';
      span.style.transform = prefersReducedMotion ? 'none' : 'rotateX(90deg)';
      span.style.transformOrigin = 'center bottom';
      container.appendChild(span);
      charElements.push(span);
    });

    // If reduced motion, show immediately
    if (prefersReducedMotion) {
      return;
    }

    // Set up IntersectionObserver for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !hasAnimated.current)) {
            hasAnimated.current = true;

            // Animate characters
            gsap.to(charElements, {
              opacity: 1,
              rotateX: 0,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
            });

            if (triggerOnce) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [children, stagger, duration, delay, triggerOnce, gsap, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px' }}
    />
  );
}
