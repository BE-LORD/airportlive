'use client';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';

export default function InquirySection() {
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ride.`;

  return (
    <section className="py-32 bg-[#171717] text-white text-center px-4" aria-label="Final booking call to action">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: motionEases.mainEase }}
          className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
        >
          Available 24/7
        </motion.p>
        <h2 className="text-5xl md:text-7xl font-serif mb-8">
          <SplitTextReveal text="Ready for Takeoff?" highlight="Takeoff?" />
        </h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
          className="text-xl mb-16 text-white/70 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Reserve your premium vehicle for your next airport transfer. Whether it&apos;s a late-night flight or early morning pickup, we are always on time.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: motionEases.mainEase }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a 
            href={getWhatsAppLink(whatsappMsg)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#B88A44] text-white px-10 py-5 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-[#101010] transition-colors duration-300"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" /> Book on WhatsApp
          </a>
          <a 
            href={getPhoneLink()} 
            className="flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white/10 transition-colors duration-300"
            aria-label={`Call direct at ${BUSINESS.phone}`}
          >
            <Phone className="h-5 w-5" /> Call Direct
          </a>
        </motion.div>
      </div>
    </section>
  );
}
