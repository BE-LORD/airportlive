"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type VideoBackgroundProps = {
  desktopMp4: string;
  mobileMp4?: string;
  desktopWebm?: string;
  mobileWebm?: string;
  poster: string;
  className?: string;
  videoClassName?: string;
  overlayClassName?: string;
  objectPosition?: string;
  preload?: "none" | "metadata" | "auto";
  lazy?: boolean;
  ariaLabel?: string;
  pauseWhenNotVisible?: boolean;
  threshold?: number | number[];
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function VideoBackground({
  desktopMp4,
  mobileMp4,
  desktopWebm,
  mobileWebm,
  poster,
  className,
  videoClassName,
  overlayClassName,
  objectPosition = "center center",
  preload = "auto",
  lazy = false,
  ariaLabel,
  pauseWhenNotVisible = false,
  threshold = 0.1,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const markVideoLoaded = () => setIsLoaded(true);

  useEffect(() => {
    if (reducedMotion || !shouldLoad) return;

    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    const frame = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion, shouldLoad, desktopMp4, mobileMp4]);

  // A single IntersectionObserver (below) drives both lazy-loading and
  // play/pause. The previous setInterval(250ms) + scroll/resize polling was
  // redundant with it and caused layout thrash (getBoundingClientRect on every
  // tick) — the main source of scroll jank when several videos are mounted.
  useEffect(() => {
    if (!containerRef.current) return;

    if (!lazy && !pauseWhenNotVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lazy) setShouldLoad(true);
            if (pauseWhenNotVisible && videoRef.current) {
              // Only attempt play if not reduced motion and video has loaded
              if (!reducedMotion) {
                videoRef.current.play().catch(() => {
                  // Autoplay might be blocked, silent catch
                });
              }
            }
          } else {
            if (pauseWhenNotVisible && videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { rootMargin: "200px 0px", threshold }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lazy, pauseWhenNotVisible, reducedMotion, threshold]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Fallback / Poster Image Layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          isLoaded && !reducedMotion ? "opacity-0" : "opacity-100"
        )}
        style={{ objectPosition }}
      />

      {/* Video Layer */}
      {!reducedMotion && shouldLoad && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            "opacity-100",
            videoClassName
          )}
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload={preload}
          poster={poster}
          aria-hidden={ariaLabel ? undefined : true}
          aria-label={ariaLabel}
          onLoadedData={markVideoLoaded}
          onCanPlay={markVideoLoaded}
        >
          {/* Mobile Sources (rendered first if provided to prioritize them on small screens via CSS/DOM) */}
          {/* Note: the browser picks the first supported source. Media attributes let us do responsive sources. */}
          {mobileWebm && (
            <source src={mobileWebm} type="video/webm" media="(max-width: 767px)" />
          )}
          {mobileMp4 && (
            <source src={mobileMp4} type="video/mp4" media="(max-width: 767px)" />
          )}
          
          {/* Desktop Sources */}
          {desktopWebm && <source src={desktopWebm} type="video/webm" />}
          <source src={desktopMp4} type="video/mp4" />
        </video>
      )}

      {/* Overlay Layer */}
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}
    </div>
  );
}
