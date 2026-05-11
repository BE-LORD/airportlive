"use client";

import { useState, useEffect, useCallback } from "react";
import { BUSINESS } from "@/lib/constants";
import { buildWhatsAppUrl, buildCallUrl } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Navbar — Spec: 04_ARCHITECTURE.md #1, Addon Pack #4
 * Cream glass effect, WhatsApp visible, minimal yet premium.
 */

const navLinks = [
  { label: "Routes", href: "#routes" },
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route click
  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book an airport transfer.`;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#F6F1E7]/90 shadow-[0_1px_0_rgba(26,18,8,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-baseline gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-cormorant)] text-2xl font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-[#1E2B4A]" : "text-white"
              )}
            >
              V3
            </span>
            <span
              className={cn(
                "hidden font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 sm:block",
                scrolled ? "text-[#C8780A]" : "text-[#F0B429]"
              )}
            >
              Airport Live
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-[#C8780A]",
                  scrolled ? "text-[#5C4733]" : "text-white/80"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={buildCallUrl()}
              onClick={() => trackEvent("call_click_nav")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                scrolled
                  ? "text-[#5C4733] hover:text-[#C8780A]"
                  : "text-white/80 hover:text-white"
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
            <a
              href={buildWhatsAppUrl(whatsappMsg)}
              onClick={() => trackEvent("whatsapp_click_nav")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#1E2B4A] px-5 py-2.5 text-sm font-semibold text-[#F6F1E7] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(240,180,41,0.2)] border border-[#C8780A]/20 hover:border-[#C8780A]/40"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden",
              scrolled
                ? "text-[#1E2B4A] hover:bg-[#1E2B4A]/5"
                : "text-white hover:bg-white/10"
            )}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[#F6F1E7] transition-all duration-500 lg:hidden",
          mobileOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1E2B4A]">
            V3
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1E2B4A] hover:bg-[#1E2B4A]/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8">
          <nav className="space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-[#1E2B4A] transition-colors hover:text-[#C8780A]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-12 space-y-3">
            <a
              href={buildWhatsAppUrl(whatsappMsg)}
              onClick={() => trackEvent("whatsapp_click_nav_mobile")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-full bg-[#1E2B4A] px-6 py-4 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Book on WhatsApp
            </a>
            <a
              href={buildCallUrl()}
              onClick={() => trackEvent("call_click_nav_mobile")}
              className="flex items-center justify-center gap-3 rounded-full border border-[rgba(26,18,8,0.08)] px-6 py-4 text-sm font-medium text-[#1E2B4A]"
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>

        <p className="px-8 pb-8 text-center font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.2em] text-[#A08B72]">
          {BUSINESS.tagline}
        </p>
      </div>
    </>
  );
}
