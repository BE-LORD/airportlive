"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2 } from "lucide-react";

const exitEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const introFallbackMs = 6500;
const introExitVideoTime = 3;
const reducedMotionDurationMs = 1400;

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

export function IntroLoader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isClosingRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const releasePage = useCallback(() => {
    document.body.style.overflow = "";
    delete document.body.dataset.introLoading;
  }, []);

  const closeIntro = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setLoading(false);
  }, []);

  const unlockSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = false;
    video.muted = false;
    video.volume = 0.72;

    video
      .play()
      .then(() => setSoundBlocked(false))
      .catch(() => {
        video.defaultMuted = true;
        video.muted = true;
        setSoundBlocked(true);
        video.play().catch(() => {});
      });
  }, []);

  useEffect(() => {
    isClosingRef.current = false;
    document.body.dataset.introLoading = "true";
    document.body.style.overflow = "hidden";

    const hideTimeout = window.setTimeout(
      closeIntro,
      reducedMotion ? reducedMotionDurationMs : introFallbackMs
    );

    return () => {
      window.clearTimeout(hideTimeout);
      releasePage();
    };
  }, [closeIntro, reducedMotion, releasePage]);

  useEffect(() => {
    if (reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let animationFrame = 0;
    video.volume = 0.72;

    const keepPlaying = () => {
      if (isClosingRef.current || video.ended) return;

      video.play().catch(() => {
        video.defaultMuted = true;
        video.muted = true;
        setSoundBlocked(true);
        video.play().catch(() => {});
      });
    };

    const closeBeforeLastFrame = () => {
      if (isClosingRef.current) return;

      if (video.currentTime >= introExitVideoTime) {
        closeIntro();
        return;
      }

      animationFrame = window.requestAnimationFrame(closeBeforeLastFrame);
    };

    video.defaultMuted = false;
    video.muted = false;
    video
      .play()
      .then(() => setSoundBlocked(false))
      .catch(() => {
        video.defaultMuted = true;
        video.muted = true;
        setSoundBlocked(true);
        video.play().catch(() => {});
      });

    video.addEventListener("pause", keepPlaying);
    video.addEventListener("ended", closeIntro);
    animationFrame = window.requestAnimationFrame(closeBeforeLastFrame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      video.removeEventListener("pause", keepPlaying);
      video.removeEventListener("ended", closeIntro);
    };
  }, [closeIntro, reducedMotion]);

  return (
    <AnimatePresence onExitComplete={releasePage}>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.018,
            transition: { duration: 0.62, ease: exitEase },
          }}
          className="fixed inset-0 z-[100000] overflow-hidden bg-[#020506] text-white"
          data-intro-loader
          aria-label="AirportLive cinematic intro"
          role="status"
        >
          {!reducedMotion && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              playsInline
              preload="auto"
            >
              <source
                src="/media/video/airportlive-remotion-intro-mobile.mp4"
                type="video/mp4"
                media="(max-width: 767px)"
              />
              <source src="/media/video/airportlive-remotion-intro-desktop.mp4" type="video/mp4" />
            </video>
          )}

          {soundBlocked && !reducedMotion && (
            <button
              type="button"
              aria-label="Enable intro sound"
              className="absolute bottom-7 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-white/15"
              onClick={unlockSound}
              onPointerDown={unlockSound}
            >
              <Volume2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
