"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { motionDurations, motionEases } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.01 : motionDurations.pageTransition,
        ease: motionEases.mainEase,
      }}
    >
      {children}
    </motion.div>
  );
}
