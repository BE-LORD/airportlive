"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Shield, Clock, Users, ThumbsUp, Car, HeadphonesIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Trust Layer — Spec: 04_ARCHITECTURE.md #6, 06_CONTENT_BRIEF.md #6
 * "Trust is earned in details."
 * Stats, trust signals, and clean entry animations.
 */

const stats = [
  { value: "20+", label: "Years of Service" },
  { value: "50K+", label: "Rides Completed" },
  { value: "100+", label: "Fleet Vehicles" },
  { value: "24/7", label: "Availability" },
];

const trustPoints = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Confirmed Fixed Fare",
    description: "No surge, no negotiation. The fare you see is the fare you pay. Every time.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "On-Time Guarantee",
    description: "Flight-aware pickups. Your chauffeur tracks arrival times and adjusts accordingly.",
  },
  {
    icon: <Car className="h-5 w-5" />,
    title: "Clean Cabin Promise",
    description: "Every vehicle is sanitized, AC-checked, and luggage-readied before each booking.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Personal Coordination",
    description: "No automated replies. Every booking is confirmed personally by the team.",
  },
  {
    icon: <ThumbsUp className="h-5 w-5" />,
    title: "No Hidden Charges",
    description: "Toll, parking, and route — everything is communicated upfront. Transparent always.",
  },
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: "24/7 Support",
    description: "WhatsApp, call, or email. We respond fast because airport travel doesn't wait.",
  },
];

export function TrustLayer() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header entry
      gsap.from("[data-trust-header]", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Stats flip-in (clean, no conflicting float)
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll("[data-stat]");
        gsap.from(items, {
          y: 50,
          rotationX: -40,
          transformOrigin: "50% 0%",
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }

      // Trust cards — clean stagger entry
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-trust-card]");

        gsap.from(cards, {
          y: 60,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
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
              skewY: skewAmount,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }

      // Subtle parallax glow
      gsap.to("[data-trust-glow]", {
        scale: 1.2,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trust" ref={sectionRef} className="bg-[#1E2B4A] py-28 sm:py-36 overflow-hidden relative">
      {/* Subtle gold glow top right */}
      <div data-trust-glow className="absolute right-0 top-0 h-[60%] w-[40%] bg-gradient-to-bl from-[#D1D1D1]/8 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div data-trust-header className="mb-20 text-center">
          <SectionLabel dark className="mb-5 justify-center">
            Why V3
          </SectionLabel>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
            Trust is earned in details.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
            Over two decades of airport transfers. Every ride is a reputation decision.
            Here&rsquo;s why families, corporates, and travelers keep coming back.
          </p>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4"
          style={{ perspective: 1200 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="group rounded-2xl border border-white/10 bg-[#1A1A1A]/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#D1D1D1]/30 hover:bg-[#1A1A1A]/8"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#FFFFFF] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Grid */}
        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              data-trust-card
              className="group rounded-2xl border border-white/8 bg-[#1A1A1A]/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-[#D1D1D1]/25 hover:bg-[#1A1A1A]/8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D1D1D1]/15 text-[#FFFFFF] transition-all duration-300 group-hover:bg-[#D1D1D1] group-hover:text-white group-hover:scale-105">
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
