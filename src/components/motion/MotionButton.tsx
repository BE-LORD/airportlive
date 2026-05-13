"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MotionButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  variant?: "dark" | "gold" | "light" | "outline" | "whatsapp";
  icon?: React.ReactNode;
  showArrow?: boolean;
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  dataCursor?: string;
}

const variants = {
  dark: "bg-[#101010] text-white hover:bg-[#B88A44]",
  gold: "bg-[#B88A44] text-white hover:bg-[#101010]",
  light: "bg-white text-[#101010] hover:bg-[#B88A44] hover:text-white",
  outline:
    "border border-[#DEDBD2] text-[#101010] hover:border-[#B88A44]/50 hover:bg-[#EFEEE8]",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1da851]",
};

export function MotionButton({
  children,
  href,
  type = "button",
  target,
  rel,
  onClick,
  className,
  variant = "dark",
  icon,
  showArrow = false,
  loading = false,
  success = false,
  disabled = false,
  ariaLabel,
  dataCursor,
}: MotionButtonProps) {
  const isMobile = useIsMobile();
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : icon}
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </>
  );
  const sharedClassName = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-[#B88A44] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className
  );
  const motionProps = {
    whileTap: { scale: 0.97 },
    whileHover: isMobile || disabled ? undefined : { y: -2 },
    transition: { duration: motionDurations.buttonTap, ease: motionEases.quickEase },
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={sharedClassName}
        aria-label={ariaLabel}
        aria-busy={loading}
        data-cursor={dataCursor}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled || loading}
      className={sharedClassName}
      aria-label={ariaLabel}
      aria-busy={loading}
      data-cursor={dataCursor}
    >
      {content}
    </motion.button>
  );
}
