"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  buildWhatsAppUrl,
  buildEmailUrl,
  buildBookingMessage,
  buildBookingEmailBody,
} from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Mail, ArrowRight, Check } from "lucide-react";
import type { BookingFormData } from "@/lib/booking";

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

// Floating Label Input Component
function FloatingInput({ 
  label, 
  name, 
  type = "text", 
  required = false, 
  value, 
  onChange,
  className = ""
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || String(value).length > 0;

  return (
    <div className={`relative ${className}`} data-form-field>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg outline-none transition-all duration-300 focus:border-[#B88A44] peer"
        placeholder=" "
      />
      <label 
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none text-white/50 ${
          active ? '-top-2 text-xs text-[#B88A44]' : 'top-4 text-lg'
        }`}
      >
        {label} {required && <span className="text-[#B88A44]">*</span>}
      </label>
    </div>
  );
}

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

  return (
    <section id="inquiry" className="bg-[#101010] py-32 relative overflow-hidden" data-cursor="Type">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B88A44]/30 to-transparent" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B88A44]/5 blur-[150px]" />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-8 relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
          >
            Reservation
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Reserve Your <span className="italic text-[#B88A44]">Journey</span>
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="text-center p-12 md:p-20 border border-white/10 bg-white/5 rounded-[32px] backdrop-blur-md"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#B88A44]/20 border border-[#B88A44]/30 mb-8">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Check className="h-10 w-10 text-[#B88A44]" />
                </motion.div>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Request Sent Successfully</h3>
              <p className="text-white/60 mb-10 max-w-lg mx-auto">
                Your WhatsApp message has been prepared. We'll be in touch momentarily to confirm your booking.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                }}
                className="text-[#B88A44] font-mono uppercase tracking-widest text-xs hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                Make Another Booking <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleWhatsAppSubmit}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-12 border border-white/10 bg-white/5 rounded-[32px] backdrop-blur-md"
            >
              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                <FloatingInput label="Full Name" name="fullName" required value={form.fullName} onChange={handleChange} />
                <FloatingInput label="Phone Number" name="phone" type="tel" required value={form.phone} onChange={handleChange} />
                <FloatingInput label="Pickup Location" name="pickup" required value={form.pickup} onChange={handleChange} />
                <FloatingInput label="Drop Location" name="drop" required value={form.drop} onChange={handleChange} />
                <FloatingInput label="Travel Date" name="date" type="date" required value={form.date} onChange={handleChange} />
                <FloatingInput label="Travel Time" name="time" type="time" required value={form.time} onChange={handleChange} />
                <FloatingInput label="Flight Number (Optional)" name="flightNumber" value={form.flightNumber ?? ""} onChange={handleChange} />
                
                <div className="grid grid-cols-2 gap-6">
                  <FloatingInput label="Passengers" name="passengers" type="number" required value={form.passengers} onChange={handleChange} />
                  <FloatingInput label="Luggage" name="luggage" type="number" value={form.luggage ?? ""} onChange={handleChange} />
                </div>

                <div className="sm:col-span-2 relative mt-4">
                  <textarea
                    name="message"
                    id="message"
                    rows={1}
                    value={form.message ?? ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg outline-none transition-all duration-300 focus:border-[#B88A44] peer resize-none"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none text-white/50 ${
                      (form.message?.length ?? 0) > 0 ? '-top-2 text-xs text-[#B88A44]' : 'top-4 text-lg'
                    }`}
                  >
                    Special Requests
                  </label>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-16 flex flex-col items-center gap-6">
                <button
                  type="submit"
                  data-cursor="Book"
                  className="w-full sm:w-auto bg-white text-[#101010] hover:bg-[#B88A44] hover:text-white px-10 py-5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:text-white transition-colors" />
                  Confirm on WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleEmailFallback}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Or send via email
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
