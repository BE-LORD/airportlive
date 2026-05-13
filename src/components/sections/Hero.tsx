'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { getWhatsAppLink, getPhoneLink, getBookingMessage } from '@/lib/links';
import { MessageCircle, Phone, Shield, Clock, Car, Star, ArrowLeft } from 'lucide-react';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { MotionButton } from '@/components/motion/MotionButton';
import { CountUp } from '@/components/motion/CountUp';
import { useWhatsAppRedirect } from '@/hooks/useWhatsAppRedirect';
import { motionDurations, motionEases } from '@/lib/motion';
import { ParticleSystem } from '@/components/effects/ParticleSystem';

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

  const canContinue =
    step === 1 ? Boolean(formData.pickup && formData.drop) :
    step === 2 ? Boolean(formData.date) :
    true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = getBookingMessage(formData);
    setSubmitted(true);
    window.setTimeout(() => {
      window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
    }, 120);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 md:pt-24 pb-12 overflow-hidden bg-[#0A0A0A]" aria-label="Hero section">
      {/* Background Image with cinematic Ken Burns slow pan */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: motionEases.softEase }}
      >
        <motion.div
          className="absolute inset-[-10%] bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute inset-0 bg-black/75 md:bg-[#0A0A0A]/90 md:bg-gradient-to-r md:from-[#0A0A0A] md:via-[#0A0A0A]/85 md:to-[#0A0A0A]/40"
          initial={{ opacity: 0.86 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: motionEases.mainEase }}
        />
      </motion.div>

      {/* Three.js Gold Particle Field — device-tier gated */}
      <ParticleSystem className="z-[1] opacity-60" />

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


          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.18 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 md:border-white/10 pt-8"
          >
            <div className="flex items-center gap-2" data-cursor="100+">
              <Car className="h-4 w-4 text-[#E5E4E2] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#F5F5F5]"><CountUp value="100+" /></p>
                <p className="text-xs text-white/70 md:text-[#A3A3A3] uppercase">Fleet</p>
              </div>
            </div>
            <div className="flex items-center gap-2" data-cursor="Trust">
              <Shield className="h-4 w-4 text-[#E5E4E2] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#F5F5F5]"><CountUp value="20+" /> Years</p>
                <p className="text-xs text-white/70 md:text-[#A3A3A3] uppercase">Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2" data-cursor="24/7">
              <Clock className="h-4 w-4 text-[#E5E4E2] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#F5F5F5]">24/7</p>
                <p className="text-xs text-white/70 md:text-[#A3A3A3] uppercase">Booking</p>
              </div>
            </div>
            <div className="flex items-center gap-2" data-cursor="Elite">
              <Star className="h-4 w-4 text-[#E5E4E2] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#F5F5F5]"><CountUp value="4.9" />★</p>
                <p className="text-xs text-white/70 md:text-[#A3A3A3] uppercase">Rating</p>
              </div>
            </div>
          </motion.div>
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
          <div className="bg-[#1A1A1A] p-5 md:p-8 rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-white/10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-serif text-[#F5F5F5] mb-2">Request Fare Quote</h3>
                <p className="text-sm text-[#A3A3A3]">Fill details and get an instant quote on WhatsApp.</p>
              </div>
              <span className="rounded-full bg-[#E5E4E2]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#E5E4E2]">
                {step}/4
              </span>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-2" aria-label="Quote form progress">
              {steps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`h-1.5 rounded-full transition-colors duration-200 ${
                    step >= item.id ? 'bg-[#E5E4E2]' : 'bg-[#DEDBD2]'
                  }`}
                  aria-label={`Go to ${item.label} step`}
                  aria-current={step === item.id}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        required
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
                        required
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
                        required
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
                      <label htmlFor="passengers" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Passengers</label>
                      <select
                        id="passengers"
                        value={formData.passengers}
                        onChange={(e) => updateField('passengers', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors"
                      >
                        {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => <option key={n} value={String(n)}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicle" className="block text-xs uppercase text-[#A3A3A3] mb-1 font-semibold">Vehicle</label>
                      <select
                        id="vehicle"
                        value={formData.vehicle}
                        onChange={(e) => updateField('vehicle', e.target.value)}
                        className="w-full border-b-2 border-white/10 py-3 focus:border-[#E5E4E2] outline-none bg-transparent text-[#F5F5F5] transition-colors"
                      >
                        <option>Innova Crysta</option>
                        <option>Premium Sedan</option>
                        <option>XL6 / SUV</option>
                        <option>Tempo Traveller</option>
                        <option>Any / Best Available</option>
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
                    type="submit"
                    variant="whatsapp"
                    icon={<MessageCircle className="h-4 w-4" />}
                    success={submitted}
                    className="flex-1 rounded-[14px]"
                  >
                    Get Quote on WhatsApp
                  </MotionButton>
                )}
              </div>
            </form>

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
