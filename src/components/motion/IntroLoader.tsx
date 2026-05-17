"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plane,
  Clock,
  Navigation,
  MapPin,
  ShieldCheck,
  Compass,
} from "lucide-react";

// The sequence of icons to mimic rapid flashing
const icons = [Car, Plane, Compass, Clock, Navigation, MapPin, ShieldCheck];

// High-end cinematic easing
const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Fast-paced premium flash (75ms per icon)
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => {
        if (prev >= icons.length * 2) {
          // Loop through a few times
          clearInterval(iconInterval);
          setShowLogo(true);
          return prev;
        }
        return prev + 1;
      });
    }, 75);

    // Hide loader after a set time to trigger exit animation
    const hideTimeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(hideTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100vh",
            opacity: [1, 1, 0], // Stay opaque for most of the slide, fade at end
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pointer-events-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_65%)]" />



          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait">
              {!showLogo ? (
                <motion.div
                  key={`icon-${currentIcon}`}
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.4, filter: "blur(4px)" }}
                  transition={{ duration: 0.08, ease: "linear" }}
                  className="absolute flex items-center justify-center text-white mix-blend-screen"
                >
                  {(() => {
                    const Icon = icons[currentIcon % icons.length];
                    return Icon ? (
                      <Icon
                        className="h-16 w-16 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        strokeWidth={1}
                      />
                    ) : null;
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="logo"
                  className="absolute flex flex-col items-center text-white"
                >
                  {/* Masked text reveal */}
                  <div className="overflow-hidden pb-4">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        ease: premiumEase,
                        delay: 0.1,
                      }}
                      className="flex items-center gap-2"
                    >
                      <span className="font-serif text-5xl md:text-7xl tracking-tight font-bold text-white drop-shadow-2xl">
                        Airport
                        <span className="italic text-[#A3A3A3] font-normal">
                          Live
                        </span>
                      </span>
                    </motion.div>
                  </div>

                  {/* Elegant expanding line below logo */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "120%", opacity: 1 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.4,
                      ease: premiumEase,
                    }}
                    className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  />

                  {/* Subtle tagline reveal */}
                  <div className="overflow-hidden mt-6">
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.6,
                        ease: premiumEase,
                      }}
                    >
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-[#A3A3A3]">
                        Premium Transit
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
