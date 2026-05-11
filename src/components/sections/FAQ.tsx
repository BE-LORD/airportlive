'use client';
import { useState } from 'react';

const FAQS = [
  { q: "How do I book an airport taxi?", a: "You can book instantly by messaging us on WhatsApp or calling our 24/7 helpline. Just share your pickup and drop locations, and we will confirm the fare and vehicle." },
  { q: "Are fares fixed?", a: "Yes, our fares are transparent and fixed at the time of booking. There are no hidden charges." },
  { q: "Do you operate at night?", a: "Absolutely. We operate 24/7 to ensure you never miss an early morning or late night flight." },
  { q: "What vehicle options are available?", a: "Our premium fleet includes Sedan, SUV (like Innova Crysta/XL6), Executive SUVs, and Tempo Travellers for larger groups." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#EFEEE8]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#101010] text-center mb-16">Frequently Asked</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-[#DEDBD2] rounded-[16px] overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-8 py-6 flex justify-between items-center font-bold text-[#101010] font-sans"
              >
                {faq.q}
                <span className="text-[#B88A44] text-xl font-mono">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <div className="px-8 pb-6 text-[#6F6B63] font-sans leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
