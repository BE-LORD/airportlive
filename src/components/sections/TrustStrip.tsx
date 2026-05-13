'use client';

import { motion } from 'framer-motion';

export default function TrustStrip() {
  const stats = [
    "20+ Years Experience",
    "100+ Fleet Network",
    "Airport Pickup & Drop",
    "Clean Comfortable Rides",
    "Professional Drivers",
    "WhatsApp Booking",
    "Fixed Fare Promise",
    "24/7 Availability",
  ];

  // Double the array for seamless infinite loop
  const marqueeItems = [...stats, ...stats];

  return (
    <div className="bg-[#0A0A0A] text-white py-5 overflow-hidden border-b border-white/8 relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((stat, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span className="text-xs md:text-sm font-mono tracking-[0.15em] uppercase text-white/80 hover:text-[#E5E4E2] transition-colors duration-300 cursor-default">
              {stat}
            </span>
            <span className="text-[#E5E4E2] text-lg" aria-hidden="true">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
