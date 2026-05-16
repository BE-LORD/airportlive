'use client';
import { BUSINESS } from '@/lib/constants';
import { Shield, Clock, Car, Star, Users, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { proofMedia } from '@/data/airportlive-media';

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
    <section className="py-14 md:py-24 bg-[#111111] overflow-hidden" aria-label="Why choose us">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Supporting image */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: motionEases.mainEase }}
          className="order-2 hidden lg:order-1 lg:block"
        >
          <div className="aspect-[16/10] bg-[#1A1A1A] sm:aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm border border-white/10 relative section-vignette">
            <ResponsiveImage
              {...proofMedia.driverPortrait}
              fill
              className="md:grayscale md:hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
          >
            The {BUSINESS.name} Standard
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-6">
            <SplitTextReveal text="A Legacy of Reliable Travel" highlight="Reliable" />
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-[#A3A3A3] mb-8 md:mb-10 text-base md:text-lg leading-relaxed"
          >
            Since our inception, we have redefined how Punjab travels to the airport. It&apos;s not just a taxi ride; it&apos;s a commitment to punctuality, cleanliness, and peace of mind.
          </motion.p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1), ease: motionEases.softEase }}
                  className="flex items-start gap-3 rounded-xl p-4 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#222222] hover:shadow-[0_4px_20px_rgba(200,200,220,0.08)] group/pillar"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E5E4E2]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#E5E4E2]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#F5F5F5] text-sm mb-0.5">{pillar.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#A3A3A3]">{pillar.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
