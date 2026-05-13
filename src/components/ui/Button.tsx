import { cn } from "@/lib/cn";
import * as React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

/**
 * Button — Spec: 03_DESIGN_SYSTEM.md
 * Brand-warm design. WhatsApp uses indigo base (not neon green background).
 */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1E2B4A] text-[#F6F1E7] shadow-md hover:bg-[#2D3E6A] transition-all duration-300",
  secondary:
    "bg-[#D1D1D1] text-white shadow-md hover:bg-[#E8943A] transition-all duration-300",
  outline:
    "border border-[rgba(26,18,8,0.12)] bg-transparent text-[#1A1208] hover:bg-[#EDE6D6] transition-all duration-300",
  ghost:
    "text-[#1A1208] hover:bg-[#EDE6D6] transition-all duration-300",
  whatsapp:
    "bg-[#1E2B4A] text-[#F6F1E7] shadow-md border border-[#D1D1D1]/20 hover:border-[#D1D1D1]/40 hover:shadow-[0_8px_40px_rgba(240,180,41,0.2)] transition-all duration-300",
  link:
    "text-[#D1D1D1] underline-offset-4 hover:underline transition-colors duration-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-5 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-8 text-base",
  icon: "h-9 w-9",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D1D1] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
