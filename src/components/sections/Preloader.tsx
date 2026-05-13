"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem("v3-preloader-seen");
    if (seen) {
      const timeout = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("v3-preloader-seen", "true");
          }, 800);
          return 100;
        }
        // Random increment for organic feel
        const inc = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + inc, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#101010]"
        >
          {/* Grain overlay for luxury feel */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 text-center w-full max-w-sm px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-2 tracking-tighter">
                {BUSINESS.brand.toUpperCase()}
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#B88A44] mb-12">
                Tour & Travels
              </p>
            </motion.div>

            {/* Counter */}
            <div className="overflow-hidden h-[120px] md:h-[160px] flex items-center justify-center">
              <motion.span 
                key={count}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                className="font-serif text-[80px] md:text-[120px] text-white leading-none inline-block"
              >
                {count}%
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="mt-8 w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#B88A44]"
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="mt-6 font-mono text-[9px] uppercase tracking-widest text-white"
            >
              Initializing Premium Fleet
            </motion.p>
          </div>

          {/* Decorative background numbers */}
          <div className="absolute bottom-10 right-10 opacity-5 font-serif text-[20vw] text-white select-none pointer-events-none leading-none">
            {count}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
