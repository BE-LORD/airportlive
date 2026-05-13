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
    <section id="how-it-works" className="py-24 bg-[#EFEEE8]" aria-label="Booking process">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
        >
          How It Works
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#101010] mb-16">
          <SplitTextReveal text="Booking is Effortless" highlight="Effortless" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: motionEases.mainEase, delay: 0.2 }}
            className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-[1px] bg-[#DEDBD2] z-0 origin-left" 
            aria-hidden="true" 
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: motionEases.softEase }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-[#DEDBD2] group">
                  <Icon className="h-6 w-6 text-[#B88A44]" />
                </div>
                <span className="text-[#B88A44] font-mono text-xs uppercase tracking-widest mb-2">{step.num}</span>
                <h3 className="text-xl font-serif text-[#101010] mb-3">{step.title}</h3>
                <p className="text-[#6F6B63] text-sm max-w-xs leading-relaxed">{step.desc}</p>
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
            className="flex items-center gap-2 bg-[#171717] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors"
            aria-label="Start booking on WhatsApp"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> Start Booking
          </a>
          <a
            href={`tel:+91${BUSINESS.phone}`}
            className="flex items-center gap-2 border border-[#DEDBD2] text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white transition-colors"
            aria-label={`Call ${BUSINESS.phone}`}
          >
            <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
