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

const introSeenKey = "airportlive:intro-seen";

function subscribeToIntroSeen() {
  // The value only changes via closeIntro() in this same component (which also
  // flips `loading`), so there is nothing external to subscribe to.
  return () => {};
}

function getIntroSeenSnapshot() {
  try {
    return window.sessionStorage.getItem(introSeenKey) === "1";
  } catch {
    return false;
  }
}

function getIntroSeenServerSnapshot() {
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
  // Read via useSyncExternalStore so the server and hydration render see
  // `false` (intro shown, matching SSR HTML) and only after hydration does a
  // returning visitor reconcile to `true` — no hydration mismatch.
  const introSeen = useSyncExternalStore(
    subscribeToIntroSeen,
    getIntroSeenSnapshot,
    getIntroSeenServerSnapshot
  );

  // Repeat visits this session skip the intro entirely: no scroll lock, no
  // video download, instant page.
  const visible = loading && !introSeen;

  const releasePage = useCallback(() => {
    document.body.style.overflow = "";
    delete document.body.dataset.introLoading;
  }, []);

  const closeIntro = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    try {
      window.sessionStorage.setItem(introSeenKey, "1");
    } catch {
      // sessionStorage unavailable (private mode); intro simply replays.
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!visible) return;

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
  }, [visible, closeIntro, reducedMotion, releasePage]);

  useEffect(() => {
    if (reducedMotion || !visible) return;

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
        requestSoundPlayback().catch(() => {});
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

    requestSoundPlayback().catch(() => {
      video.defaultMuted = true;
      video.muted = true;
      armHiddenSoundUnlock();
      video.play().catch(() => {});
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
  }, [closeIntro, visible, reducedMotion]);

  return (
    <AnimatePresence onExitComplete={releasePage}>
      {visible && (
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
