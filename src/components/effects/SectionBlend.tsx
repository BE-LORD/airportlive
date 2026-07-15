'use client';

/**
 * SectionBlend — Smooth gradient transition between adjacent sections
 * 
 * Instead of hard color cuts between light (#0A0A0A) and dark (#0A0A0A) sections,
 * this creates a 80px gradient blend zone that feels like liquid color flow.
 * 
 * Usage: <SectionBlend from="light" to="dark" />
 */

interface SectionBlendProps {
  from: 'light' | 'dark' | 'cream';
  to: 'light' | 'dark' | 'cream';
  height?: number;
  className?: string;
}

const COLORS = {
  light: '#111111',
  dark: '#0A0A0A',
  cream: '#111111',
};

export function SectionBlend({ from, to, height = 80, className = '' }: SectionBlendProps) {
  return (
    <div 
      className={`w-full pointer-events-none relative z-10 ${className}`}
      style={{ 
        height: `${height}px`,
        marginTop: `-${height}px`,
        background: `linear-gradient(to bottom, ${COLORS[from]}, ${COLORS[to]})`,
      }}
      aria-hidden="true"
    />
  );
}
