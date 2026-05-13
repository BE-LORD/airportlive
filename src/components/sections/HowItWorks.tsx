"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MessageSquare, ClipboardCheck, CarFront, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * How It Works — Spec: 04_ARCHITECTURE.md #7, 06_CONTENT_BRIEF.md #7
 * "Three steps. One experience."
 */

const steps = [
  {
    number: "01",
    title: "Message Us",
    description:
      "Send your pickup, drop, date, time, flight number, and passenger count via WhatsApp or the inquiry form. That's all we need.",
    icon: <MessageSquare className="h-6 w-6" />,
    accent: "Tell us where and when.",
  },
  {
    number: "02",
    title: "We Confirm",
    description:
      "We confirm route, vehicle, pickup timing, and driver coordination. Every booking is confirmed personally — no automated replies.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    accent: "Everything planned before you travel.",
  },
  {
    number: "03",
    title: "You Travel",
    description:
      "Your chauffeur arrives prepared with a clean cabin, luggage space ready, and flight-aware timing. You sit back. No surprises.",
    icon: <CarFront className="h-6 w-6" />,
    accent: "Arrive like you were expected.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header entry
      gsap.from("[data-hiw-header]", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Connector line drawing
      gsap.fromTo(
        "[data-connector-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-hiw-card]");

        // Elastic pop-in (clean, no broken rotationZ)
        gsap.from(cards, {
          y: 60,
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        });

        // Gentle velocity skew
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = gsap.utils.clamp(-4, 4, velocity / 400);

            gsap.to(cards, {
              skewX: skewAmount,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book an airport transfer.\nPickup:\nDrop:\nDate & Time:\nFlight Number:\nPassengers:`;

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-[#EDE6D6] py-16 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-hiw-header className="mb-12 sm:mb-20 text-center">
          <SectionLabel className="mb-5 justify-center">
            Simple Process
          </SectionLabel>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold text-[#1E2B4A] sm:text-6xl">
            Three steps. One experience.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-lg text-[#A08B72] leading-relaxed">
            No apps. No surge pricing. No confusion.
            Every booking is confirmed personally.
          </p>
        </div>

        <div ref={gridRef} className="relative grid gap-6 sm:gap-8 sm:grid-cols-3">
          {/* Connector line desktop */}
          <div data-connector-line className="absolute left-0 right-0 top-[80px] hidden h-px bg-gradient-to-r from-[#D1D1D1]/0 via-[#D1D1D1]/60 to-[#D1D1D1]/0 sm:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              data-hiw-card
              className="group relative rounded-2xl border border-[rgba(26,18,8,0.08)] bg-[#FDFAF3] p-8 text-center transition-all duration-300 hover:border-[rgba(200,200,220,0.32)] hover:shadow-[0_16px_50px_rgba(23,17,10,0.08)]"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D1D1D1]/10 text-[#D1D1D1] ring-1 ring-[#D1D1D1]/20 transition-all duration-300 group-hover:bg-[#D1D1D1] group-hover:text-white group-hover:ring-[#D1D1D1] group-hover:scale-110">
                {step.icon}
              </div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1D1D1]">
                Step {step.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-[#1E2B4A]">
                {step.title}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm italic text-[#D1D1D1]">
                {step.accent}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#A08B72]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Copy template CTA */}
        <div className="mt-12 text-center">
          <a
            href={getWhatsAppLink(whatsappMsg)}
            onClick={() => trackEvent("whatsapp_click_hiw")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[rgba(200,200,220,0.32)] bg-[#D1D1D1]/5 px-6 py-3 text-sm font-semibold text-[#D1D1D1] transition-all duration-300 hover:bg-[#D1D1D1] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Start with a message
          </a>
        </div>
      </div>
    </section>
  );
}
