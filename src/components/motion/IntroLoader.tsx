"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    let removeUnlockListeners = () => {};
    video.volume = 0.72;

    const requestSoundPlayback = () => {
      video.defaultMuted = false;
      video.muted = false;
      video.volume = 0.72;
      return video.play();
    };

    const armHiddenSoundUnlock = () => {
      removeUnlockListeners();

      const unlock = () => {
        requestSoundPlayback().catch((err) => {
          if (process.env.NODE_ENV === "development") {
            console.warn("IntroLoader: sound unlock playback failed", err);
          }
        });
        removeUnlockListeners();
      };

      window.addEventListener("pointerdown", unlock, { once: true, passive: true });
      window.addEventListener("touchstart", unlock, { once: true, passive: true });
      window.addEventListener("keydown", unlock, { once: true });
      removeUnlockListeners = () => {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("touchstart", unlock);
        window.removeEventListener("keydown", unlock);
      };
    };

    const keepPlaying = () => {
      if (isClosingRef.current || video.ended) return;

      requestSoundPlayback().catch(() => {
        video.defaultMuted = true;
        video.muted = true;
        armHiddenSoundUnlock();
        video.play().catch((err) => {
          if (process.env.NODE_ENV === "development") {
            console.warn("IntroLoader: muted video play failed in keepPlaying", err);
          }
        });
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

    requestSoundPlayback().catch(() => {
      video.defaultMuted = true;
      video.muted = true;
      armHiddenSoundUnlock();
      video.play().catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("IntroLoader: muted video play failed on init", err);
        }
      });
    });

    video.addEventListener("pause", keepPlaying);
    video.addEventListener("ended", closeIntro);
    animationFrame = window.requestAnimationFrame(closeBeforeLastFrame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      removeUnlockListeners();
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
