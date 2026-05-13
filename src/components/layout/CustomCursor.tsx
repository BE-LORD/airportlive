'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Check if device is touch enabled, if so don't render custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isHovered ? 40 : 10));
      cursorY.set(e.clientY - (isHovered ? 40 : 10));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverableElement = target.closest('[data-cursor]');
      
      if (hoverableElement) {
        setIsHovered(true);
        setHoverText(hoverableElement.getAttribute('data-cursor') || '');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isHovered]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest text-center"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        width: isHovered ? 80 : 20,
        height: isHovered ? 80 : 20,
        borderRadius: '50%',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
        opacity: isHovered ? 1 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="mix-blend-difference text-black"
      >
        {hoverText}
      </motion.span>
    </motion.div>
  );
}
