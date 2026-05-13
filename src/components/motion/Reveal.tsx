"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { buildRevealVariants, motionDurations, motionTokens } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  duration = motionDurations.sectionReveal,
  y = motionTokens.distance.section,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as as "div"] ?? motion.div;

  return (
    <Component
      className={cn(className)}
      variants={buildRevealVariants({ delay, duration, y, reducedMotion })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </Component>
  );
}
