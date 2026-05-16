'use client';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { ctaMedia } from '@/data/airportlive-media';

export default function InquirySection() {
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ride.`;

  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 pb-28 text-center text-white md:py-20" aria-label="Final booking call to action">
      <div className="absolute inset-0" aria-hidden="true">
        <ResponsiveImage
          {...ctaMedia}
          fill
          className="opacity-55"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/76" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: motionEases.mainEase }}
          className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
        >
          Available 24/7
        </motion.p>
        <h2 className="mx-auto max-w-[11ch] font-serif text-[clamp(2.75rem,13vw,5rem)] leading-[0.9] md:max-w-none md:text-7xl">
          <SplitTextReveal text="Ready for Takeoff?" highlight="Takeoff?" />
        </h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
          className="mx-auto mt-6 mb-9 max-w-2xl text-base leading-relaxed text-white/70 md:mb-12 md:text-xl"
        >
          Reserve your premium vehicle for your next airport transfer. Whether it&apos;s a late-night flight or early morning pickup, we are always on time.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: motionEases.mainEase }}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="breathing-glow flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E5E4E2] px-10 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#0A0A0A] transition-colors duration-300 hover:bg-[#1A1A1A] hover:text-[#F5F5F5] sm:w-auto"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" /> Book on WhatsApp
          </a>
          <a
            href={getPhoneLink()}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 px-10 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#1A1A1A]/10 sm:w-auto"
            aria-label={`Call direct at ${BUSINESS.phone}`}
          >
            <Phone className="h-5 w-5" /> Call Direct
          </a>
        </motion.div>
      </div>
    </section>
  );
}
