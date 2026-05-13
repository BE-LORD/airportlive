"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { getWhatsAppLink, getPhoneLink, getEmailLink } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Final CTA — Spec: 04_ARCHITECTURE.md #10
 * "Your arrival deserves a plan."
 * Last conversion push before footer.
 */

export function FinalCTA() {
  const whatsappMessage = `Hi ${BUSINESS.name}, I want to book an airport transfer.\nPickup:\nDrop:\nDate & Time:\nFlight Number:\nPassengers:`;

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Ambient background breathing (subtle)
      gsap.to(".cta-glow", {
        scale: 1.15,
        opacity: 0.12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Cinematic content entry
      gsap.from("[data-cta-content] > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#1E2B4A] py-28 sm:py-36 overflow-hidden">
      {/* Ambient gold glow */}
      <div className="cta-glow absolute right-0 top-0 h-[70%] w-[45%] bg-gradient-to-bl from-[#D1D1D1]/8 to-transparent" />
      <div className="cta-glow absolute left-0 bottom-0 h-[50%] w-[35%] bg-gradient-to-tr from-[#FFFFFF]/5 to-transparent" />

      <div data-cta-content className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <SectionLabel dark className="mb-6 justify-center">
          Ready When You Are
        </SectionLabel>

        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
          Your arrival deserves<br className="hidden sm:block" /> a plan.
        </h2>

        <p className="mt-6 text-lg text-white/60 leading-relaxed">
          Send your pickup, drop, date, time and flight number.
          <br />
          We&rsquo;ll confirm the rest. No apps. No surge. Just you and the road.
        </p>

        {/* Template hint */}
        <div className="mt-8 mx-auto max-w-md rounded-xl border border-white/10 bg-[#1A1A1A]/5 p-5 backdrop-blur-sm">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.15em] text-[#FFFFFF] mb-3">
            Quick booking template
          </p>
          <p className="text-sm text-white/50 leading-relaxed text-left">
            &ldquo;Hi V3, I need a pickup from <strong className="text-white/70">[Location]</strong> to <strong className="text-white/70">[Airport]</strong> on <strong className="text-white/70">[Date]</strong> at <strong className="text-white/70">[Time]</strong>. Flight: <strong className="text-white/70">[Number]</strong>. <strong className="text-white/70">[X]</strong> passengers.&rdquo;
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={getWhatsAppLink(whatsappMessage)}
            onClick={() => trackEvent("whatsapp_click_final")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="bg-[#1A1208] border border-[#D1D1D1]/30 hover:border-[#D1D1D1]/60 hover:shadow-[0_8px_40px_rgba(240,180,41,0.24)]">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              Book on WhatsApp
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a
            href={getPhoneLink()}
            onClick={() => trackEvent("call_click_final")}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white/15 text-white hover:bg-[#1A1A1A]/10 hover:text-white"
            >
              <Phone className="h-5 w-5" />
              Call {BUSINESS.phone}
            </Button>
          </a>
          <a
            href={getEmailLink()}
            onClick={() => trackEvent("email_click_final")}
          >
            <Button
              variant="ghost"
              size="lg"
              className="text-white/60 hover:bg-[#1A1A1A]/10 hover:text-white"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
