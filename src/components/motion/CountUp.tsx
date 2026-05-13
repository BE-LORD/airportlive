"use client";

import { useEffect, useMemo, useState } from "react";
import { motionDurations } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

export function CountUp({ value, className, duration = motionDurations.countUp }: CountUpProps) {
  const { ref, isInView } = useInViewOnce<HTMLSpanElement>();
  const reducedMotion = useReducedMotion();
  const parsed = useMemo(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || value.includes("/")) return null;
    return { number: Number(match[1]), suffix: match[2] ?? "" };
  }, [value]);
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);

  useEffect(() => {
    if (!isInView || !parsed || reducedMotion) {
      if (isInView) {
        // eslint-disable-next-line
        setDisplay(value);
      }
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      const formatted = Number.isInteger(parsed.number)
        ? Math.round(current).toString()
        : current.toFixed(1);

      setDisplay(`${formatted}${parsed.suffix}`);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, isInView, parsed, reducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
