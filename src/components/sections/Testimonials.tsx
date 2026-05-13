'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';

const REVIEWS = [
  { name: 'Rahul S.', route: 'Ludhiana → Delhi Airport', vehicle: 'Innova Crysta', type: 'Airport Transfer', when: 'Recent customer', text: 'Smooth airport pickup, clean car, and professional driver. The booking was quick and stress-free. Will definitely use V3 again.' },
  { name: 'Amanpreet K.', route: 'Chandigarh → Amritsar', vehicle: 'Innova Crysta', type: 'Outstation', when: 'Recent customer', text: 'Very comfortable Innova. Driver was on time and drove very safely. Highly recommend V3 Tour & Travels for family travel.' },
  { name: 'Vikram M.', route: 'Delhi Airport → Ludhiana', vehicle: 'Premium Sedan', type: 'Airport Pickup', when: 'Recent customer', text: 'Flight landed late at night but the driver was waiting at the terminal. True luxury service and highly reliable even at odd hours.' },
  { name: 'Priya G.', route: 'Ludhiana → Chandigarh Airport', vehicle: 'Sedan', type: 'Family Pickup', when: 'Recent customer', text: 'I book for my parents every time they fly. The team is reliable, polite, and always communicates clearly. Peace of mind for me.' },
  { name: 'Gurpreet S.', route: 'Multi-City Punjab', vehicle: 'Fleet (5 cars)', type: 'Corporate Event', when: 'Recent customer', text: 'Used them for a corporate event with 5 cars. Everything was coordinated perfectly. No stress, no confusion. Professional service.' },
  { name: 'Anita R.', route: 'Ludhiana + Jalandhar + Chandigarh', vehicle: 'Tempo Traveller + Sedans', type: 'Wedding Transport', when: 'Recent customer', text: 'For our wedding, they handled guest pickups from three different cities. Every car arrived on time. Professional from start to finish.' },
];

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 768);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-12 md:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
          >
            Real Feedback
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5]">
            <SplitTextReveal text="Words from our Travelers" highlight="Travelers" />
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="max-w-xl mx-auto text-[#A3A3A3] mt-4"
          >
            Real feedback from customers who care about timing, comfort, and trust.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={i} 
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: motionEases.softEase }}
              className="holographic-sheen bg-[#1A1A1A] p-6 md:p-8 rounded-[20px] border border-white/10 flex flex-col hover:shadow-[0_16px_60px_rgba(200,200,220,0.12)] hover:border-[#E5E4E2]/30 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 text-[#E5E4E2] mb-4">
                {'★★★★★'.split('').map((star, j) => <span key={j} className="text-sm">{star}</span>)}
              </div>

              {/* Quote */}
              <p className="text-[#A3A3A3] mb-6 italic font-serif text-base leading-relaxed flex-grow">&ldquo;{review.text}&rdquo;</p>

              {/* Reviewer Info */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <p className="font-bold text-[#F5F5F5] font-sans">{review.name}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-[#141414] text-[#A3A3A3] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    {review.route}
                  </span>
                  <span className="text-[10px] bg-[#141414] text-[#A3A3A3] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    {review.vehicle}
                  </span>
                </div>
                <p className="text-[10px] text-[#A3A3A3]/60 font-mono uppercase tracking-wider">{review.type} · {review.when}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
