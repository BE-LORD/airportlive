"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  lineClassName?: string;
  highlight?: string;
  delay?: number;
}

export function SplitTextReveal({
  text,
  className,
  lineClassName,
  highlight,
  delay = 0,
}: SplitTextRevealProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const lines = text.split("\n");

  return (
    <span className={cn("block", className)} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, index) => {
        const isHighlighted = Boolean(highlight && line.includes(highlight));
        const parts = highlight ? line.split(highlight) : [line];

        return (
          <span key={`${line}-${index}`} className="block overflow-hidden" aria-hidden="true">
            <motion.span
              className={cn("block", lineClassName)}
              initial={reducedMotion ? { opacity: 0 } : { y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: reducedMotion ? 0 : delay + index * (isMobile ? 0.08 : 0.12),
                duration: reducedMotion ? 0.01 : motionDurations.heroReveal,
                ease: motionEases.mainEase,
              }}
            >
              {parts.map((part, partIndex) => (
                <span key={`${part}-${partIndex}`}>
                  {part}
                  {isHighlighted && partIndex < parts.length - 1 ? (
                    <span className="motion-gold-shine italic text-[#B88A44]">
                      {highlight}
                    </span>
                  ) : null}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
