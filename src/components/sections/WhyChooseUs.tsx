'use client';
import { BUSINESS } from '@/lib/constants';

export default function WhyChooseUs() {
  const pillars = [
    "20+ years of trusted experience",
    "Clean, premium vehicles",
    "Punctual airport route understanding",
    "Professional drivers",
    "Easy WhatsApp support",
    "Transparent pricing"
  ];

  return (
    <section className="py-24 bg-[#F8F7F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm border border-[#DEDBD2]">
            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" alt="Premium Chauffeur" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
        <div>
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">The {BUSINESS.name} Standard</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010] mb-6">A Legacy of Reliable Travel</h2>
          <p className="text-[#6F6B63] mb-10 text-lg leading-relaxed">
            Since our inception, we have redefined how Punjab travels to the airport. It's not just a taxi ride; it's a commitment to punctuality, cleanliness, and peace of mind.
          </p>
          <ul className="space-y-4">
            {pillars.map((pillar, i) => (
              <li key={i} className="flex items-center gap-4 text-[#101010] font-medium font-sans">
                <span className="w-1.5 h-1.5 bg-[#B88A44] rounded-full"></span>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
