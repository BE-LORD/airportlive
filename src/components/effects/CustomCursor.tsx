"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

/**
 * 1000000x Custom Cursor
 * Sentient cursor with magnetic pull, glassmorphism, dynamic text, and click ripple.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasHover || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check for data-cursor
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const newText = cursorTarget.getAttribute('data-cursor') || "";
        if (newText !== cursorText) {
          setCursorText(newText);
          isHovering = true;
          gsap.to(ring, {
            scale: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            duration: 0.4,
            ease: "expo.out"
          });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
          gsap.to(text, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
        }
      } else if (isHovering) {
        setCursorText("");
        isHovering = false;
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderColor: "rgba(200, 120, 10, 0.3)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.2 });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // 200ms Ripple distortion wave simulation
      const ripple = rippleRef.current;
      if (!ripple) return;
      
      gsap.fromTo(ripple, 
        { x: e.clientX - 50, y: e.clientY - 50, scale: 0, opacity: 0.5 },
        { scale: 2, opacity: 0, duration: 0.6, ease: "power2.out" }
      );
      
      gsap.to(ring, { scale: isHovering ? 2.5 : 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: isHovering ? 3 : 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    const handleMouseEnterInteractive = () => {
      if (isHovering) return; // Don't override data-cursor effects
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(200, 120, 10, 0.5)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeaveInteractive = () => {
      if (isHovering) return;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(200, 120, 10, 0.3)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Setup interactives
    const setupInteractives = () => {
      const interactives = document.querySelectorAll(
        "a:not([data-cursor]), button:not([data-cursor]), [role='button']:not([data-cursor]), input, textarea, select"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      return interactives;
    };
    
    let interactives = setupInteractives();

    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      gsap.set(dot, { x: mouse.x - 4, y: mouse.y - 4 });
      gsap.set(ring, { x: pos.x - 16, y: pos.y - 16 });
    };
    gsap.ticker.add(ticker);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      gsap.ticker.remove(ticker);
    };
  }, [pathname, cursorText]); // Re-bind on route changes

  return (
    <>
      {/* Ripple Effect */}
      <div 
        ref={rippleRef}
        className="pointer-events-none fixed left-0 top-0 z-[9996] hidden h-[100px] w-[100px] rounded-full border border-white/40 bg-[#1A1A1A]/10 lg:block mix-blend-overlay"
        style={{ willChange: "transform, opacity", opacity: 0 }}
        aria-hidden="true"
      />
      
      {/* Gold dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-2 w-2 rounded-full bg-[#D1D1D1] opacity-0 lg:block mix-blend-difference"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      
      {/* Follower ring (Morphs into glassmorphic circle) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-8 w-8 rounded-full border border-[rgba(200,200,220,0.3)] opacity-0 lg:flex items-center justify-center overflow-hidden"
        style={{ willChange: "transform, background-color, border-color" }}
        aria-hidden="true"
      >
        <span 
          ref={textRef}
          className="text-[4px] font-mono tracking-widest text-white uppercase font-bold text-center opacity-0 scale-50 whitespace-nowrap"
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}
