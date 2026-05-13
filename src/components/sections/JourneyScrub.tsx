"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

/**
 * JourneyScrub — Spec: 04_ARCHITECTURE.md #5.5, Addon Pack #6.5
 * "The middle-funnel scroll-storytelling bridge."
 * Narrative beats that cross-fade as the user scrolls.
 */

const beats = [
  {
    id: 1,
    title: "The road should feel handled.",
    description: "Pickup confirmed before you move.",
    percentage: "0–25%",
    context: "From Ludhiana's morning roads.",
  },
  {
    id: 2,
    title: "Calm inside, Punjab outside.",
    description: "The cabin stays calm after the airport rush.",
    percentage: "25–55%",
    context: "Through Punjab's golden corridor.",
  },
  {
    id: 3,
    title: "Travel without the stress.",
    description: "Punjab passes quietly outside the glass.",
    percentage: "55–80%",
    context: "Toward the airport, without the stress.",
  },
  {
    id: 4,
    title: "Arrive like you were expected.",
    description: "You arrive without chasing the car. Already arranged.",
    percentage: "80–100%",
    context: "Your car. Your route. Your time.",
  },
];

export function JourneyScrub() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      });

      // Animate beats — smooth crossfade with gentle scale
      const beatElements = gsap.utils.toArray<HTMLElement>("[data-beat]");
      beatElements.forEach((beat, i) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: `${i * 25}% top`,
            end: `${(i + 1) * 25}% top`,
            scrub: 1,
          },
        });

        // Smooth crossfade with gentle motion
        timeline
          .fromTo(
            beat,
            {
              opacity: 0,
              scale: 0.85,
              y: 60,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            }
          )
          .to(
            beat,
            {
              opacity: 0,
              scale: 1.15,
              y: -40,
              duration: 0.6,
              ease: "power2.in",
            },
            "+=0.2"
          );
      });

      // Progress bar
      gsap.to("[data-journey-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative">
      <div ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-[#1E2B4A]">
        {/* Ambient Golden Background */}
        <div className="absolute inset-0">
          <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-[#C8780A] opacity-[0.08] blur-[160px]" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[800px] w-[800px] rounded-full bg-[#F0B429] opacity-[0.06] blur-[160px]" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <SectionLabel dark className="mb-12 justify-center">
              The Journey
            </SectionLabel>

            <div className="relative h-48 sm:h-64">
              {beats.map((beat) => (
                <div
                  key={beat.id}
                  data-beat
                  className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0"
                >
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.4em] text-[#F0B429] mb-4">
                    {beat.context}
                  </p>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">
                    {beat.title}
                  </h2>
                  <p className="mt-6 text-lg text-white/60 sm:text-xl">
                    {beat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 w-full max-w-xs -translate-x-1/2 px-6">
          <div className="relative h-px w-full bg-white/10">
            <div
              data-journey-progress
              className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#C8780A]"
            />
          </div>
          <div className="mt-4 flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>Ludhiana</span>
            <span>Airport</span>
          </div>
        </div>
      </div>
    </section>
  );
}
