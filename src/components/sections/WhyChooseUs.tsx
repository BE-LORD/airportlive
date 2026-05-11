'use client';
import { BUSINESS } from '@/lib/constants';
import { Shield, Clock, Car, Star, Users, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    { icon: Clock, title: '20+ Years Experience', desc: 'Two decades of mastering Punjab-to-airport routes with consistent reliability.' },
    { icon: Car, title: 'Premium Vehicles', desc: 'Innova Crysta, executive sedans, and Tempo Travellers — all clean, AC, well-maintained.' },
    { icon: Shield, title: 'Transparent Pricing', desc: 'Fixed fare confirmed before you book. No surge, no hidden charges, no toll surprises.' },
    { icon: Star, title: 'Professional Drivers', desc: 'Licensed, experienced, well-groomed chauffeurs who prioritize safety and punctuality.' },
    { icon: Headphones, title: '24/7 WhatsApp Booking', desc: 'Book anytime via WhatsApp. Get instant confirmation, driver details, and live tracking.' },
    { icon: Users, title: 'Family Trusted', desc: 'Hundreds of families trust us for regular airport runs. Many customers are 5+ year regulars.' },
  ];

  return (
    <section className="py-24 bg-[#F8F7F3] overflow-hidden" aria-label="Why choose us">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div>
          <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm border border-[#DEDBD2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop"
              alt="Professional V3 Tour and Travels chauffeur standing near premium sedan"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">The {BUSINESS.name} Standard</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010] mb-6">A Legacy of <span className="italic text-[#B88A44]">Reliable</span> Travel</h2>
          <p className="text-[#6F6B63] mb-10 text-lg leading-relaxed">
            Since our inception, we have redefined how Punjab travels to the airport. It&apos;s not just a taxi ride; it&apos;s a commitment to punctuality, cleanliness, and peace of mind.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#EFEEE8] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#B88A44]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#B88A44]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#101010] text-sm mb-0.5">{pillar.title}</p>
                    <p className="text-[#6F6B63] text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
