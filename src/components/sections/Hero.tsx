'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BUSINESS } from '@/lib/constants';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F8F7F3]">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 md:bg-[#F8F7F3]/90 md:bg-gradient-to-r md:from-[#F8F7F3] md:via-[#F8F7F3]/80 md:to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7">
          <p className="hero-anim text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">
            PREMIUM AIRPORT TRANSFERS & TRAVEL
          </p>
          <h1 className="hero-anim text-5xl md:text-7xl lg:text-[80px] font-serif leading-[0.95] text-white md:text-[#101010] mb-6">
            WHERE LUXURY<br/>
            <span className="italic text-white/80 md:text-[#343434]">MEETS COMFORT</span>
          </h1>
          <p className="hero-anim text-lg text-white/90 md:text-[#6F6B63] max-w-xl mb-10 font-sans leading-relaxed">
            Premium airport transfers and comfortable taxi rides backed by 20+ years of trusted travel experience.
          </p>
          
          <div className="hero-anim flex flex-wrap gap-4 mb-12">
            <a href={`https://wa.me/91${BUSINESS.whatsapp}?text=Hi%20V3%20Tour%20and%20Travels%2C%20I%20want%20to%20book%20a%20ride.`} className="bg-[#171717] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors">
              Book on WhatsApp
            </a>
            <a href={`tel:+91${BUSINESS.phone}`} className="border border-white/40 md:border-[#DEDBD2] text-white md:text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#EFEEE8] hover:text-[#101010] transition-colors">
              Call {BUSINESS.phone}
            </a>
          </div>

          <div className="hero-anim grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 md:border-[#DEDBD2] pt-8">
            <div><p className="font-bold text-white md:text-[#101010]">100+</p><p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Fleet</p></div>
            <div><p className="font-bold text-white md:text-[#101010]">20+ Years</p><p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Experience</p></div>
            <div><p className="font-bold text-white md:text-[#101010]">24/7</p><p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Booking</p></div>
            <div><p className="font-bold text-white md:text-[#101010]">Airport</p><p className="text-xs text-white/70 md:text-[#6F6B63] uppercase">Routes</p></div>
          </div>
        </div>

        <div className="hero-anim lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="bg-white p-8 rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#DEDBD2]">
            <h3 className="text-2xl font-serif text-[#101010] mb-6">Request Fare Quote</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#6F6B63] mb-1">Pickup</label>
                  <input type="text" placeholder="City or Airport" className="w-full border-b border-[#DEDBD2] py-2 focus:border-[#101010] outline-none bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-[#6F6B63] mb-1">Drop</label>
                  <input type="text" placeholder="City or Airport" className="w-full border-b border-[#DEDBD2] py-2 focus:border-[#101010] outline-none bg-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#6F6B63] mb-1">Date</label>
                  <input type="date" className="w-full border-b border-[#DEDBD2] py-2 focus:border-[#101010] outline-none bg-transparent text-[#6F6B63]" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-[#6F6B63] mb-1">Vehicle</label>
                  <select className="w-full border-b border-[#DEDBD2] py-2 focus:border-[#101010] outline-none bg-transparent text-[#6F6B63]">
                    <option>Innova Crysta</option>
                    <option>Sedan</option>
                    <option>Tempo Traveller</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button type="button" className="w-full bg-[#101010] text-white py-4 rounded-[14px] uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors">
                  Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
