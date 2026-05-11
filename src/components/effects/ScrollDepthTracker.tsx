"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Scroll Depth Tracker — Addon Pack #7.3
 * Fires analytics events at 25%, 50%, 75%, 100% scroll depth.
 * Only fires once per threshold per session.
 */

const THRESHOLDS = [25, 50, 75, 100];

export function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round(
        (window.scrollY / scrollHeight) * 100
      );

      for (const threshold of THRESHOLDS) {
        if (scrollPercent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackEvent("scroll_depth", { depth: threshold });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
