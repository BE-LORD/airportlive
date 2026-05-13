"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MapPin, Clock, MessageCircle, ArrowRight, Plane } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Route Corridor — Spec: 04_ARCHITECTURE.md, 06_CONTENT_BRIEF.md #3
 * Chapter I · The Road
 * "Three cities. One trusted road."
 */

const routes = [
  {
    from: "Ludhiana",
    to: "Chandigarh Airport",
    distance: "~100 km",
    time: "2 – 2.5 hrs",
    code: "IXC",
    popular: true,
    description:
      "Early morning departures. Late night arrivals. Pickup coordination aligned to your flight schedule.",
  },
  {
    from: "Ludhiana",
    to: "Delhi Airport (IGI)",
    distance: "~310 km",
    time: "5 – 6 hrs",
    code: "DEL",
    popular: true,
    description:
      "Terminal-specific drop. Domestic or International. Your driver knows the approach roads.",
  },
  {
    from: "Ludhiana",
    to: "Amritsar Airport",
    distance: "~145 km",
    time: "2.5 – 3 hrs",
    code: "ATQ",
    popular: false,
    description:
      "Sri Guru Ram Dass Jee International Airport. Comfortable highway drive with experienced chauffeur.",
  },
  {
    from: "Chandigarh",
    to: "Delhi Airport (IGI)",
    distance: "~250 km",
    time: "4 – 4.5 hrs",
    code: "DEL",
    popular: false,
    description:
      "NH-44 corridor. Smooth expressway drive with planned rest stops if needed.",
  },
];

export function RouteMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-route-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // SVG line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-route-card]");
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="routes" ref={sectionRef} className="bg-[#EDE6D6] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Chapter label + editorial headline */}
        <div data-route-header className="mb-20">
          <SectionLabel className="mb-5">
            Chapter I · The Road
          </SectionLabel>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold text-[#1E2B4A] sm:text-6xl lg:text-7xl">
            Three cities. One trusted road.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#5C4733] leading-relaxed">
            Every route is mapped, every pickup timed, every return planned.
            Whether it&rsquo;s a 5 AM flight from Chandigarh or a midnight landing at IGI — we&rsquo;re already on the way.
          </p>
        </div>

        {/* SVG Route Line — Visual connector */}
        <div className="mb-16 hidden sm:block">
          <svg
            viewBox="0 0 1000 60"
            className="mx-auto w-full max-w-4xl"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={lineRef}
              d="M 50 30 Q 250 8 500 30 Q 750 52 950 30"
              fill="none"
              stroke="#C8780A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* City dots */}
            {[
              { cx: 50, label: "LDH" },
              { cx: 350, label: "IXC" },
              { cx: 650, label: "ATQ" },
              { cx: 950, label: "DEL" },
            ].map((city) => (
              <g key={city.label}>
                <circle cx={city.cx} cy="30" r="6" fill="#C8780A" />
                <circle cx={city.cx} cy="30" r="3" fill="#F6F1E7" />
                <text
                  x={city.cx}
                  y="55"
                  textAnchor="middle"
                  className="fill-[#5C4733] text-[10px] font-bold"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {city.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Route Cards */}
        <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2">
          {routes.map((route) => {
            const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a transfer.\nRoute: ${route.from} → ${route.to}\nDate:\nTime:\nPassengers:`;
            return (
              <div
                key={`${route.from}-${route.to}`}
                data-route-card
                className="group relative rounded-2xl border border-[rgba(26,18,8,0.08)] bg-[#FDFAF3] p-7 transition-all duration-300 hover:border-[rgba(200,120,10,0.32)] hover:shadow-[0_16px_50px_rgba(23,17,10,0.08)] hover:-translate-y-0.5"
              >
                {route.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#C8780A]/10 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8780A]">
                    Popular
                  </span>
                )}

                {/* Route path */}
                <div className="mb-5 flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-[#C8780A]" />
                  <span className="text-lg font-semibold text-[#1E2B4A]">
                    {route.from}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#A08B72]" />
                  <span className="text-lg font-semibold text-[#1E2B4A]">
                    {route.to}
                  </span>
                </div>

                {/* Meta row */}
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-[#A08B72]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {route.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Plane className="h-3.5 w-3.5" />
                    {route.code}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#5C4733]">
                    {route.distance}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#A08B72]">
                  {route.description}
                </p>

                {/* Micro-CTA */}
                <a
                  href={getWhatsAppLink(whatsappMsg)}
                  onClick={() =>
                    trackEvent("whatsapp_click_route", {
                      route: `${route.from}-${route.to}`,
                    })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(200,120,10,0.32)] bg-[#C8780A]/5 px-4 py-2 text-xs font-semibold text-[#C8780A] transition-all duration-300 hover:bg-[#C8780A] hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Book this route
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
