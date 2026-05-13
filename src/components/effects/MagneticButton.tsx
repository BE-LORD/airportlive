'use client';

/**
 * MagneticButton - Button with magnetic cursor effect
 * 
 * Features:
 * - Pull effect within 100px radius (30% strength)
 * - Smooth GSAP animation with power3.out easing
 * - Disabled on touch devices
 * - Respects prefers-reduced-motion
 */

import { useEffect, useRef, ReactNode, MouseEvent } from 'react';
import { useAnimationController } from '@/hooks/useAnimationController';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { gsap, prefersReducedMotion } = useAnimationController();
  const isEnabled = useRef(true);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    isEnabled.current = !isTouchDevice && !prefersReducedMotion;
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isEnabled.current || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate button center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to button center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    
    // Only apply effect within radius
    if (distance < radius) {
      // Calculate pull strength based on distance (closer = stronger)
      const pullStrength = (1 - distance / radius) * strength;
      
      // Apply magnetic pull
      gsap.to(button, {
        x: deltaX * pullStrength,
        y: deltaY * pullStrength,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isEnabled.current || !buttonRef.current) return;

    // Reset position
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
