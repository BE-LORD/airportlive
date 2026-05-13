'use client';

/**
 * 1000000x MagneticButton - Button with magnetic cursor effect & spring physics
 * 
 * Features:
 * - Pull effect within 100px radius (30% strength)
 * - Smooth GSAP animation with power3.out easing
 * - Heavy spring physics on press/release (scale 0.95 -> 1.0)
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
      ease: 'elastic.out(1, 0.3)', // Springy reset
    });
  };

  const handleMouseDown = () => {
    if (!isEnabled.current || !buttonRef.current) return;
    
    // Heavy physical press
    gsap.to(buttonRef.current, {
      scale: 0.94,
      duration: 0.1,
      ease: 'power2.out',
    });
  };

  const handleMouseUp = () => {
    if (!isEnabled.current || !buttonRef.current) return;
    
    // Spring release with overshoot
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1.2, 0.4)',
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
