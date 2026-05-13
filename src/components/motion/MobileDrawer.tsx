"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases } from "@/lib/motion";
import { MotionButton } from "./MotionButton";

export interface DrawerLink {
  name: string;
  path: string;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  links: DrawerLink[];
  brand: string;
  phoneHref: string;
  whatsappHref: string;
  phoneLabel: string;
}

export function MobileDrawer({
  open,
  onClose,
  links,
  brand,
  phoneHref,
  whatsappHref,
  phoneLabel,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (!open) return;
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;
      onClose();
    }
  }, [onClose, open, pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDurations.micro }}
          className="fixed inset-0 z-[55] bg-[#0A0A0A] text-white lg:hidden"
        >
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: motionDurations.drawerOpen, ease: motionEases.mainEase }}
            className="flex min-h-dvh flex-col justify-center px-6 pb-10 pt-24"
          >
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.28em] text-[#E5E4E2]">
              {brand}
            </p>

            <nav className="space-y-3" aria-label="Mobile primary navigation">
              {links.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.04 * index,
                    duration: motionDurations.cardReveal,
                    ease: motionEases.mainEase,
                  }}
                >
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={cn(
                      "block min-h-12 py-2 font-serif text-4xl leading-tight transition-colors",
                      pathname === item.path ? "text-[#E5E4E2]" : "text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-12 grid gap-3">
              <MotionButton
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                icon={<MessageCircle className="h-4 w-4" />}
                className="w-full"
              >
                Book on WhatsApp
              </MotionButton>
              <MotionButton
                href={phoneHref}
                variant="outline"
                icon={<Phone className="h-4 w-4" />}
                className="w-full border-white/20 text-white hover:bg-[#1A1A1A]/10"
              >
                Call {phoneLabel}
              </MotionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
