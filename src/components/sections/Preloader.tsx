"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BUSINESS } from "@/lib/constants";

/**
 * Preloader — Spec: §11.1 FRAMER_PREMIUM_FRONTEND_REDESIGN_MASTER.md
 * "A quiet premium start."
 *
 * Timeline:
 *   0ms → warm black screen
 * 200ms → "V3" appears (scale + opacity)
 * 700ms → "TOUR & TRAVELS" fades in
 * 1100ms → gold progress line draws
 * 1600ms → logo moves upward
 * 1900ms → cream wipe reveals hero
 *
 * Shows once per session via sessionStorage.
 */

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem("v3-preloader-seen");
    if (seen) {
      setVisible(false);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      sessionStorage.setItem("v3-preloader-seen", "true");
      setVisible(false);
      return;
    }

    // Cinematic GSAP timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("v3-preloader-seen", "true");
          setVisible(false);
        },
      });

      // Initial state
      gsap.set("[data-preloader-v3]", { opacity: 0, scale: 0.8 });
      gsap.set("[data-preloader-tagline]", { opacity: 0, y: 10 });
      gsap.set("[data-preloader-line]", { scaleX: 0, transformOrigin: "left center" });

      // 200ms — V3 logo appears
      tl.to("[data-preloader-v3]", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        delay: 0.2,
      })
        // 700ms — Tagline fades in
        .to("[data-preloader-tagline]", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.1")
        // 1100ms — Gold line draws
        .to("[data-preloader-line]", {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        }, "-=0.2")
        // 1600ms — Content moves up
        .to(contentRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        }, "+=0.2")
        // 1900ms — Cream wipe out
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
        }, "-=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1208]"
      aria-hidden="true"
    >
      <div ref={contentRef} className="text-center">
        {/* V3 Logo */}
        <h1
          data-preloader-v3
          className="font-[family-name:var(--font-cormorant)] text-6xl font-light tracking-tight text-[#F6F1E7] sm:text-7xl"
        >
          V3
        </h1>

        {/* Tagline */}
        <p
          data-preloader-tagline
          className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.35em] text-[#C8780A]"
        >
          {BUSINESS.tagline}
        </p>

        {/* Gold progress line */}
        <div className="mt-10 mx-auto h-0.5 w-32 overflow-hidden rounded-full bg-white/5">
          <div
            data-preloader-line
            className="h-full w-full bg-gradient-to-r from-[#C8780A] to-[#F0B429]"
          />
        </div>

        {/* Sub-brand */}
        <p className="mt-6 font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.2em] text-white/20">
          Tour & Travels
        </p>
      </div>
    </div>
  );
}
