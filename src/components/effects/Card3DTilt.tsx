'use client';

/**
 * Card3DTilt - 3D tilt effect for cards with mouse tracking
 * 
 * Features:
 * - Mouse-tracking tilt (max 15deg rotation)
 * - Glare overlay effect with radial gradient
 * - Smooth hover scale animation (1.05x)
 * - Disabled on touch devices and low-tier devices
 */

import { useRef, useState, ReactNode } from 'react';
import { detectDeviceTier, isFeatureEnabled } from '@/lib/three';

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareOpacity?: number;
}

export function Card3DTilt({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.05,
  glareOpacity = 0.3,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if feature should be enabled (outside of effect)
  const tier = detectDeviceTier();
  const enabled = isFeatureEnabled('enable3DCardTilt', tier);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const isEnabled = enabled && !isTouchDevice;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    // Apply transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
    
    // Update glare position
    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      
      glareRef.current.style.background = `
        radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255, 255, 255, ${glareOpacity}) 0%,
          transparent 50%
        )
      `;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    setIsHovered(false);
    
    // Reset transform
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    
    // Hide glare
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  // If not enabled, render children without effects
  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
