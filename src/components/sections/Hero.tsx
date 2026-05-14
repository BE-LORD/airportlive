'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { getWhatsAppLink, getPhoneLink, getBookingMessage } from '@/lib/links';
import { MessageCircle, Phone, Shield, Clock, Car, Star, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { MotionButton } from '@/components/motion/MotionButton';
import { CountUp } from '@/components/motion/CountUp';
import { useWhatsAppRedirect } from '@/hooks/useWhatsAppRedirect';
import { motionDurations, motionEases } from '@/lib/motion';

const customerInitials = ['AK', 'RS', 'MS'];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    passengers: '2',
    vehicle: 'Innova Crysta',
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const whatsapp = useWhatsAppRedirect(getWhatsAppLink(), 'Book on WhatsApp');

  const steps = [
    { id: 1, label: 'Route' },
    { id: 2, label: 'Timing' },
    { id: 3, label: 'Ride' },
    { id: 4, label: 'Confirm' },
  ];

  // Date is optional so users can always advance; we validate only pickup/drop
  const canContinue =
    step === 1 ? Boolean(formData.pickup && formData.drop) :
    true; // steps 2-3 are always continuable

  const handleFinalSubmit = () => {
    // HARD GUARD: never send to WhatsApp unless explicitly on Step 4
    if (step !== 4 || submitted) return;
    const msg = getBookingMessage(formData);
    setSubmitted(true);
    window.setTimeout(() => {
      window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
    }, 120);
  };

  // Block Enter key from any form submission on steps 1-3
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 4) {
      e.preventDefault();
      e.stopPropagation();
      if (canContinue) setStep((current) => Math.min(4, current + 1));
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Ensure passenger count doesn't exceed vehicle capacity when vehicle changes
  const handleVehicleChange = (newVehicle: string) => {
    updateField('vehicle', newVehicle);
    const pax = formData.passengers === '10+' ? 11 : parseInt(formData.passengers);
    if (newVehicle === 'Premium Sedan' && pax > 4) {
      updateField('passengers', '4');
    } else if ((newVehicle === 'Innova Crysta' || newVehicle === 'XL6 / SUV') && pax > 6) {
      updateField('passengers', '6');
    }
  };

  const getPassengerOptions = (vehicle: string) => {
    if (vehicle === 'Premium Sedan') return [1, 2, 3, 4];
    if (vehicle === 'Innova Crysta' || vehicle === 'XL6 / SUV') return [1, 2, 3, 4, 5, 6];
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-[90svh] md:min-h-[100svh] flex items-center pt-20 md:pt-24 pb-12 overflow-hidden bg-[#0A0A0A]" aria-label="Hero section">
      {/* Background Image with cinematic Ken Burns slow pan */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: motionEases.softEase }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
            alt="Premium luxury car background"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black/60 md:bg-[#0A0A0A]/90 md:bg-gradient-to-r md:from-[#0A0A0A] md:via-[#0A0A0A]/85 md:to-[#0A0A0A]/40"
          initial={{ opacity: 0.86 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: motionEases.mainEase }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent md:hidden" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Content */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-[10px] md:text-xs font-mono mb-4 font-bold"
          >
            PREMIUM AIRPORT TRANSFERS & TRAVEL
          </motion.p>
          <h1 className="text-4xl md:text-7xl lg:text-[80px] font-serif leading-[0.95] text-white md:text-[#F5F5F5] mb-6">
            <SplitTextReveal
              text={"WHERE LUXURY\nMEETS COMFORT"}
              highlight="MEETS COMFORT"
              delay={0.28}
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.9, ease: motionEases.mainEase }}
            className="text-base md:text-lg text-white/90 md:text-[#A3A3A3] max-w-xl mb-8 md:mb-10 font-sans leading-relaxed"
          >
            Premium airport transfers and comfortable taxi rides backed by 20+ years of trusted travel experience across Punjab, Chandigarh, and Delhi NCR.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.04, ease: motionEases.mainEase }}
            className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12"
          >
            <MotionButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={whatsapp.open}
              dataCursor="Book"
              variant="dark"
              icon={<MessageCircle className="h-4 w-4 text-[#25D366]" />}
              loading={whatsapp.isOpening}
              success={whatsapp.state === 'success'}
              ariaLabel="Book a ride on WhatsApp"
            >
              {whatsapp.label}
            </MotionButton>
            <MotionButton
              href={getPhoneLink()}
              dataCursor="Call"
              variant="outline"
              icon={<Phone className="h-4 w-4" />}
              className="border-white/40 text-white hover:text-[#F5F5F5] md:border-white/10 md:text-[#F5F5F5]"
              ariaLabel={`Call ${BUSINESS.phone}`}
            >
              Call {BUSINESS.phone}
            </MotionButton>
          </motion.div>


          <div className="grid grid-cols-1 gap-5 pt-8 border-t border-white/10 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-6 sm:pt-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: motionEases.mainEase }}
              className="flex min-w-0 items-center gap-3 sm:gap-4"
            >
              <div className="flex shrink-0 -space-x-2.5 sm:-space-x-3" aria-hidden="true">
                {customerInitials.map((initials, i) => (
                  <div
                    key={initials}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-[#2D3E6A] via-[#1A1A1A] to-[#0A0A0A] text-[10px] font-bold text-[#F5F5F5] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] sm:h-10 sm:w-10"
                    style={{ zIndex: customerInitials.length - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-[#E5E4E2] text-[#E5E4E2]" />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3] sm:tracking-widest">
                  2.5k+ Happy Clients
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: motionEases.mainEase }}
              className="flex min-w-0 items-center gap-3 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0"
            >
              <ShieldCheck className="h-5 w-5 text-[#E5E4E2]" />
              <div>
                <p className="text-white font-bold text-sm leading-none mb-1">Elite Fleet</p>
                <p className="text-[10px] uppercase tracking-widest text-[#A3A3A3]">Verified Premium Cab</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.72, ease: motionEases.mainEase }}
          className="lg:col-span-5 relative mt-8 lg:mt-0"
          id="booking"
          data-cursor="Form"
        >
          <div className="bg-[#0D0D0D]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[32px] border border-white/10 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.05] to-transparent opacity-50" />
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-serif text-[#F5F5F5] mb-2">Request Fare Quote</h3>
                <p className="text-sm text-[#A3A3A3]">Fill details and get an instant quote on WhatsApp.</p>
              </div>
              <span className="rounded-full bg-[#E5E4E2]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#E5E4E2]">
                {step}/4
              </span>
            </div>

            <div className="mb-8 flex items-center justify-between gap-1" aria-label="Quote form progress">
              {steps.map((item) => (
                <div key={item.id} className="flex-1 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { if (item.id <= step) setStep(item.id); }}
                    className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                      step >= item.id ? 'bg-[#E5E4E2] shadow-[0_0_8px_rgba(229,228,226,0.4)]' : 'bg-white/10'
                    } ${item.id > step ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                    aria-label={`Go to ${item.label} step`}
                    aria-current={step === item.id}
                  />
                  <span className={`text-[9px] uppercase tracking-[0.15em] font-mono transition-colors duration-300 ${
                    step === item.id ? 'text-[#E5E4E2] font-bold' : 'text-[#A3A3A3]/30'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div onKeyDown={handleKeyDown} className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="route"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: motionDurations.accordionOpen, ease: motionEases.mainEase }}
                    className="space-y-4"
                  >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickup" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Pickup *</label>
                      <input
                        id="pickup"
                        type="text"
                        placeholder="City or Airport"
                        value={formData.pickup}
                        onChange={(e) => updateField('pickup', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] placeholder:text-[#A3A3A3]/50 transition-colors"
                        autoComplete="address-level2"
                      />
                    </div>
                    <div>
                      <label htmlFor="drop" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Drop *</label>
                      <input
                        id="drop"
                        type="text"
                        placeholder="City or Airport"
                        value={formData.drop}
                        onChange={(e) => updateField('drop', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] placeholder:text-[#A3A3A3]/50 transition-colors"
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="timing"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: motionDurations.accordionOpen, ease: motionEases.mainEase }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label htmlFor="date" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Date *</label>
                      <input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Time</label>
                      <input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => updateField('time', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="ride"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: motionDurations.accordionOpen, ease: motionEases.mainEase }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label htmlFor="vehicle" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Vehicle</label>
                      <select
                        id="vehicle"
                        value={formData.vehicle}
                        onChange={(e) => handleVehicleChange(e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        <option>Innova Crysta</option>
                        <option>Premium Sedan</option>
                        <option>XL6 / SUV</option>
                        <option>Tempo Traveller</option>
                        <option>Any / Best Available</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="passengers" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Passengers</label>
                      <select
                        id="passengers"
                        value={formData.passengers}
                        onChange={(e) => updateField('passengers', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        {getPassengerOptions(formData.vehicle).map(n => <option key={n} value={String(n)}>{n}</option>)}
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: motionDurations.accordionOpen, ease: motionEases.mainEase }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] placeholder:text-[#A3A3A3]/50 transition-colors"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="userphone" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Phone</label>
                        <input
                          id="userphone"
                          type="tel"
                          placeholder="+91..."
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] placeholder:text-[#A3A3A3]/50 transition-colors"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    {submitted ? (
                      <p className="rounded-2xl bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#1f8f49]">
                        Opening WhatsApp with your trip details...
                      </p>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 pt-2">
                {step > 1 ? (
                  <MotionButton
                    type="button"
                    variant="outline"
                    onClick={() => setStep((current) => Math.max(1, current - 1))}
                    icon={<ArrowLeft className="h-4 w-4" />}
                    className="shrink-0 px-5"
                  >
                    Back
                  </MotionButton>
                ) : null}
                {step < 4 ? (
                  <MotionButton
                    type="button"
                    onClick={() => setStep((current) => Math.min(4, current + 1))}
                    disabled={!canContinue}
                    className="flex-1 rounded-[14px]"
                    showArrow
                  >
                    Next Step
                  </MotionButton>
                ) : (
                  <MotionButton
                    type="button"
                    variant="whatsapp"
                    onClick={handleFinalSubmit}
                    icon={<MessageCircle className="h-4 w-4" />}
                    success={submitted}
                    className="flex-1 rounded-[14px]"
                  >
                    Get Quote on WhatsApp
                  </MotionButton>
                )}
              </div>
            </div>

            {/* Trust note */}
            <p className="text-[10px] text-[#A3A3A3]/60 text-center mt-4 font-mono uppercase tracking-wider">
              No online payment - Quote confirmed on WhatsApp
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
