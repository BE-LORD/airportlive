"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom Cursor — Spec: 05_ANIMATION_SPEC.md #4
 * Small gold dot with follower ring. Desktop only (lg+).
 * Respects prefers-reduced-motion.
 */

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only on desktop (hover devices)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasHover || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    // Track mouse position
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(200, 120, 10, 0.5)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(200, 120, 10, 0.3)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Add hover effects to interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    // Animation loop
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
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      {/* Gold dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-2 w-2 rounded-full bg-[#C8780A] opacity-0 lg:block"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      {/* Follower ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-8 w-8 rounded-full border border-[rgba(200,120,10,0.3)] opacity-0 lg:block"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  );
}
