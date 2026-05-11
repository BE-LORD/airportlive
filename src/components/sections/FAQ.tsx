'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: "How do I book an airport taxi?", a: "You can book instantly by messaging us on WhatsApp or calling our 24/7 helpline at 9888000510. Just share your pickup and drop locations, date, time, and passenger count. We will confirm the fare and vehicle within minutes." },
  { q: "Do you provide Delhi Airport pickup?", a: "Yes. We specialize in Delhi IGI Airport pickups and drops from Ludhiana, Chandigarh, Jalandhar, and across Punjab. Our drivers track your flight status for on-time arrival." },
  { q: "Do you provide Chandigarh Airport pickup?", a: "Absolutely. Chandigarh Airport (IXC) is one of our most popular routes. We provide seamless pickup and drop service with flight tracking and luggage assistance." },
  { q: "Can I book for a late night or early morning flight?", a: "Yes. We operate 24/7 with no extra late-night charges. Whether your flight is at 3 AM or 11 PM, your driver will be there on time." },
  { q: "Can I choose my vehicle?", a: "Yes. Our fleet includes Premium Sedans, Innova Crysta, XL6/SUV, and Tempo Travellers. You can choose based on your passenger count, luggage, and comfort preference." },
  { q: "Are tolls included in the fare?", a: "Tolls are charged separately and paid directly at toll booths. Your quoted fare covers vehicle, driver, fuel, and service. We keep pricing transparent with no hidden charges." },
  { q: "How is the fare confirmed?", a: "After you share your trip details, we provide a fixed fare quote on WhatsApp or call. The fare is locked once you confirm — no surge pricing, no surprises." },
  { q: "Do you provide round trips?", a: "Yes. We offer both one-way and round-trip services. For round trips, we provide discounted rates and the driver waits at your destination." },
  { q: "Do you provide one-way taxi?", a: "Yes. One-way taxi is our most popular service for airport transfers. You pay only for the one-way distance — no return charges." },
  { q: "Do you provide corporate billing?", a: "Yes. We provide GST invoices and support monthly billing for corporate clients. We also offer dedicated account management for regular business travel." },
  { q: "How much luggage can I carry?", a: "Sedan: 2 large bags + 1 cabin bag. Innova Crysta: 4 large bags + cabin bags. Tempo Traveller: 8+ bags. We can arrange extra vehicle for excess luggage." },
  { q: "Is WhatsApp booking available?", a: "Yes. WhatsApp is our primary booking channel. Simply message us at 9888000510 with your details. You can also call us directly for instant booking." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#EFEEE8]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010]">Frequently Asked</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#DEDBD2] rounded-[16px] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex justify-between items-center gap-4 font-bold text-[#101010] font-sans text-sm md:text-base min-h-[52px]"
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#B88A44] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-5 md:pb-6 text-[#6F6B63] font-sans leading-relaxed text-sm md:text-base">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-[#6F6B63] mb-4 text-sm">Still have questions?</p>
          <a
            href="https://wa.me/919888000510?text=Hi%20V3%20Tour%20%26%20Travels%2C%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#B88A44] hover:text-[#101010] font-semibold uppercase tracking-wider text-sm transition-colors"
          >
            Ask on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
