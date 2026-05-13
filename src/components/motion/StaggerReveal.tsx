"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases, motionTokens } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  y?: number;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className,
  childClassName,
  stagger = 0.08,
  y = motionTokens.distance.base,
  once = true,
}: StaggerRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.16, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reducedMotion ? 0 : stagger,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              className={childClassName}
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: reducedMotion ? 0.01 : motionDurations.cardReveal,
                    ease: motionEases.mainEase,
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
