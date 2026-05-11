import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * Section Label — Spec: 03_DESIGN_SYSTEM.md
 * Gold line + mono-accent text used as section eyebrow.
 */
export function SectionLabel({ children, className, dark }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-[#C8780A]" />
      <span
        className={cn(
          "font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-medium uppercase tracking-[0.2em]",
          dark ? "text-[#F0B429]" : "text-[#A08B72]"
        )}
      >
        {children}
      </span>
    </div>
  );
}
