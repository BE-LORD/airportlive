'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone, Shield, Clock, Car, Star } from 'lucide-react';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi ${BUSINESS.name}, I want to book a ride.\n\n` +
      `📍 Pickup: ${formData.pickup || 'Not specified'}\n` +
      `📍 Drop: ${formData.drop || 'Not specified'}\n` +
      `📅 Date: ${formData.date || 'Not specified'}\n` +
      `🕐 Time: ${formData.time || 'Not specified'}\n` +
      `👤 Name: ${formData.name || 'Not specified'}\n` +
      `📞 Phone: ${formData.phone || 'Not specified'}\n` +
      `👥 Passengers: ${formData.passengers}\n` +
      `🚗 Vehicle: ${formData.vehicle}`
    );
    window.open(`https://wa.me/91${BUSINESS.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F8F7F3]" aria-label="Hero section">
      {/* Background Image with proper overlay for contrast */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" aria-hidden="true">
        <div className="absolute inset-0 bg-black/70 md:bg-[#F8F7F3]/90 md:bg-gradient-to-r md:from-[#F8F7F3] md:via-[#F8F7F3]/85 md:to-[#F8F7F3]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Content */}
        <div className="lg:col-span-7">
          <p className="hero-anim text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">
            PREMIUM AIRPORT TRANSFERS & TRAVEL
          </p>
          <h1 className="hero-anim text-5xl md:text-7xl lg:text-[80px] font-serif leading-[0.95] text-white md:text-[#101010] mb-6">
            WHERE LUXURY<br/>
            <span className="italic text-white/80 md:text-[#343434]">MEETS COMFORT</span>
          </h1>
          <p className="hero-anim text-lg text-white/90 md:text-[#6F6B63] max-w-xl mb-10 font-sans leading-relaxed">
            Premium airport transfers and comfortable taxi rides backed by 20+ years of trusted travel experience across Punjab, Chandigarh, and Delhi NCR.
          </p>

          {/* CTAs */}
          <div className="hero-anim flex flex-wrap gap-4 mb-12">
            <a
              href={`https://wa.me/91${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi ${BUSINESS.name}, I want to book a ride.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#171717] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors"
              aria-label="Book a ride on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Book on WhatsApp
            </a>
            <a
              href={`tel:+91${BUSINESS.phone}`}
              className="flex items-center gap-2 border border-white/40 md:border-[#DEDBD2] text-white md:text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#EFEEE8] hover:text-[#101010] transition-colors"
              aria-label={`Call ${BUSINESS.phone}`}
            >
              <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
            </a>
          </div>

          {/* Trust Strip */}
          <div className="hero-anim grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 md:border-[#DEDBD2] pt-8">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-[#B88A44] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#101010]">100+</p>
                <p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Fleet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#B88A44] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#101010]">20+ Years</p>
                <p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#B88A44] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#101010]">24/7</p>
                <p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Booking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#B88A44] hidden md:block" />
              <div>
                <p className="font-bold text-white md:text-[#101010]">4.9★</p>
                <p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="hero-anim lg:col-span-5 relative mt-8 lg:mt-0" id="booking">
          <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-[#DEDBD2]">
            <h3 className="text-2xl font-serif text-[#101010] mb-2">Request Fare Quote</h3>
            <p className="text-sm text-[#6F6B63] mb-6">Fill details and get an instant quote on WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickup" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Pickup *</label>
                      <input
                        id="pickup"
                        type="text"
                        placeholder="City or Airport"
                        value={formData.pickup}
                        onChange={(e) => updateField('pickup', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010] placeholder:text-[#6F6B63]/50"
                        required
                        autoComplete="address-level2"
                      />
                    </div>
                    <div>
                      <label htmlFor="drop" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Drop *</label>
                      <input
                        id="drop"
                        type="text"
                        placeholder="City or Airport"
                        value={formData.drop}
                        onChange={(e) => updateField('drop', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010] placeholder:text-[#6F6B63]/50"
                        required
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Date *</label>
                      <input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Time</label>
                      <input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => updateField('time', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-[#101010] text-white py-4 rounded-[14px] uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors mt-2"
                  >
                    Next Step →
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010] placeholder:text-[#6F6B63]/50"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="userphone" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Phone</label>
                      <input
                        id="userphone"
                        type="tel"
                        placeholder="+91..."
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010] placeholder:text-[#6F6B63]/50"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="passengers" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Passengers</label>
                      <select
                        id="passengers"
                        value={formData.passengers}
                        onChange={(e) => updateField('passengers', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010]"
                      >
                        {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => <option key={n} value={String(n)}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicle" className="block text-xs uppercase text-[#6F6B63] mb-1 font-semibold">Vehicle</label>
                      <select
                        id="vehicle"
                        value={formData.vehicle}
                        onChange={(e) => updateField('vehicle', e.target.value)}
                        className="w-full border-b-2 border-[#DEDBD2] py-2 focus:border-[#B88A44] outline-none bg-transparent text-[#101010]"
                      >
                        <option>Innova Crysta</option>
                        <option>Premium Sedan</option>
                        <option>XL6 / SUV</option>
                        <option>Tempo Traveller</option>
                        <option>Any / Best Available</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-shrink-0 border border-[#DEDBD2] text-[#6F6B63] py-4 px-6 rounded-[14px] uppercase tracking-wider text-sm font-semibold hover:bg-[#EFEEE8] transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-[14px] uppercase tracking-wider text-sm font-semibold hover:bg-[#1da851] transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" /> Get Quote on WhatsApp
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Trust note */}
            <p className="text-[10px] text-[#6F6B63]/60 text-center mt-4 font-mono uppercase tracking-wider">
              No online payment • Quote confirmed on WhatsApp
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
