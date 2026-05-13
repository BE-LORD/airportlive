"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}

export function MotionCard({ children, className, as = "div" }: MotionCardProps) {
  const isMobile = useIsMobile();
  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component
      className={cn(
        "transition-colors duration-200 will-change-auto hover:border-[#B88A44]/35",
        className
      )}
      whileHover={isMobile ? undefined : { y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: motionDurations.cardHover, ease: motionEases.quickEase }}
    >
      {children}
    </Component>
  );
}
