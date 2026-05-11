"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import {
  buildWhatsAppUrl,
  buildEmailUrl,
  buildBookingMessage,
  buildBookingEmailBody,
} from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Mail, CheckCircle } from "lucide-react";
import type { BookingFormData } from "@/lib/booking";

gsap.registerPlugin(ScrollTrigger);

const initialForm: BookingFormData = {
  fullName: "",
  phone: "",
  pickup: "",
  drop: "",
  date: "",
  time: "",
  flightNumber: "",
  passengers: "",
  luggage: "",
  message: "",
};

const inputClasses =
  "w-full rounded-xl border border-[rgba(26,18,8,0.08)] bg-[#FDFAF3] px-4 py-3.5 text-sm text-[#1A1208] outline-none transition-all duration-300 focus:border-[#C8780A] focus:ring-2 focus:ring-[#C8780A]/20 placeholder:text-[#A08B72]/50";

export function BookingInquiry() {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.fullName) return;

    trackEvent("booking_submit", { channel: "whatsapp" });
    const message = buildBookingMessage(form);
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const handleEmailFallback = () => {
    trackEvent("booking_submit", { channel: "email" });
    const body = buildBookingEmailBody(form);
    const url = buildEmailUrl("Booking Inquiry", body);
    window.location.href = url;
  };

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header entry
      gsap.from("[data-inquiry-header]", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Form entry — clean elastic rise
      if (formRef.current) {
        gsap.from(formRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        // Stagger form field groups
        const inputs = formRef.current.querySelectorAll("[data-form-field]");
        gsap.from(inputs, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (submitted) {
    return (
      <section id="inquiry" ref={sectionRef} className="bg-[#EDE6D6] py-28 sm:py-36">
        <div className="mx-auto max-w-xl px-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
            <CheckCircle className="h-8 w-8 text-[#25D366]" />
          </div>
          <h2 className="mt-8 font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-[#1E2B4A] sm:text-4xl">
            Inquiry Prepared
          </h2>
          <p className="mt-4 text-[#A08B72] leading-relaxed">
            Your WhatsApp message has been prepared with all the details.
            {BUSINESS.name} will confirm everything with you shortly.
          </p>
          <Button
            variant="outline"
            className="mt-8 border-[rgba(26,18,8,0.12)] text-[#1E2B4A]"
            onClick={() => {
              setSubmitted(false);
              setForm(initialForm);
            }}
          >
            Send Another Inquiry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" ref={sectionRef} className="bg-[#EDE6D6] py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div data-inquiry-header className="mb-12 text-center">
          <SectionLabel className="mb-5 justify-center">
            Get in Touch
          </SectionLabel>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold text-[#1E2B4A] sm:text-6xl">
            Book Your Ride
          </h2>
          <p className="mt-5 text-lg text-[#A08B72] leading-relaxed">
            Every booking is confirmed personally. No confusion after you message
            us. Fill in the details — we handle the rest.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleWhatsAppSubmit}
          className="rounded-2xl border border-[rgba(26,18,8,0.08)] bg-[#F6F1E7] p-7 sm:p-10 shadow-[0_24px_80px_rgba(23,17,10,0.06)]"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Full Name <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your full name"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Phone Number <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="98XXXXXXXX"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Pickup Location <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="pickup"
                required
                value={form.pickup}
                onChange={handleChange}
                className={inputClasses}
                placeholder="e.g., Ludhiana Railway Station"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Drop Location <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="drop"
                required
                value={form.drop}
                onChange={handleChange}
                className={inputClasses}
                placeholder="e.g., Chandigarh Airport"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Travel Date <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="date"
                type="date"
                required
                value={form.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Travel Time <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="time"
                type="time"
                required
                value={form.time}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Flight Number
              </label>
              <input
                name="flightNumber"
                value={form.flightNumber}
                onChange={handleChange}
                className={inputClasses}
                placeholder="e.g., AI 123"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Passengers <span className="text-[#C8780A]">*</span>
              </label>
              <input
                name="passengers"
                type="number"
                min="1"
                required
                value={form.passengers}
                onChange={handleChange}
                className={inputClasses}
                placeholder="1"
              />
            </div>
            <div data-form-field>
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Luggage Count
              </label>
              <input
                name="luggage"
                type="number"
                min="0"
                value={form.luggage}
                onChange={handleChange}
                className={inputClasses}
                placeholder="0"
              />
            </div>
            <div data-form-field className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#1A1208]">
                Special Request / Message
              </label>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Any special requirements..."
              />
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto bg-[#1E2B4A] border border-[#C8780A]/30 hover:border-[#C8780A]/60 hover:shadow-[0_8px_40px_rgba(240,180,41,0.24)]"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              Send Inquiry on WhatsApp
            </Button>

            {/* Email fallback */}
            <button
              type="button"
              onClick={handleEmailFallback}
              className="flex items-center gap-2 text-sm text-[#A08B72] underline-offset-4 hover:text-[#C8780A] hover:underline transition-colors"
            >
              <Mail className="h-4 w-4" />
              Prefer email? Send inquiry via email instead
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
