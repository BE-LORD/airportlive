'use client';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone, CheckCircle, Send, MapPin, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';

export default function BookingFlow() {
  const steps = [
    { icon: MessageCircle, num: '01', title: 'Share Trip Details', desc: 'Message us on WhatsApp or call with your pickup, drop, date, time, and passenger count.' },
    { icon: CheckCircle, num: '02', title: 'Confirm Fare & Vehicle', desc: 'We send a fixed fare quote with vehicle options. No hidden charges, no surge pricing.' },
    { icon: Car, num: '03', title: 'Driver Assigned', desc: 'A professional chauffeur is assigned. You receive driver details and tracking link on WhatsApp.' },
    { icon: Send, num: '04', title: 'Ride & Arrive Safely', desc: 'Your driver arrives early. Enjoy a clean, comfortable, and punctual journey to your destination.' },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-[#111111]" aria-label="Booking process">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
        >
          How It Works
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-16">
          <SplitTextReveal text="Booking is Effortless" highlight="Effortless" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: motionEases.mainEase, delay: 0.2 }}
            className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-[1px] bg-white/10 z-0 origin-left" 
            aria-hidden="true" 
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: motionEases.softEase }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-[72px] h-[72px] bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-sm mb-6 border border-white/10 group hover:shadow-[0_8px_30px_rgba(200,200,220,0.15)] hover:border-[#E5E4E2]/30 transition-all duration-500"
                >
                  <Icon className="h-6 w-6 text-[#E5E4E2]" />
                </motion.div>
                <span className="text-[#E5E4E2] font-mono text-xs uppercase tracking-widest mb-2">{step.num}</span>
                <h3 className="text-xl font-serif text-[#F5F5F5] mb-3">{step.title}</h3>
                <p className="text-[#A3A3A3] text-sm max-w-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA below steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <a
            href={`https://wa.me/91${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi ${BUSINESS.name}, I want to book a ride.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#E5E4E2] text-[#0A0A0A] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#D1D1D1] transition-colors"
            aria-label="Start booking on WhatsApp"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> Start Booking
          </a>
          <a
            href={`tel:+91${BUSINESS.phone}`}
            className="flex items-center gap-2 border border-white/10 text-[#F5F5F5] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] transition-colors"
            aria-label={`Call ${BUSINESS.phone}`}
          >
            <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
