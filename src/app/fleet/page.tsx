"use client";

import Header from '@/components/layout/Header';
import FleetShowcase from '@/components/sections/FleetShowcase';
import Footer from '@/components/layout/Footer';
import { getWhatsAppLink } from '@/lib/links';
import { BUSINESS } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';

const COMPARISON_TABLE = [
  { vehicle: 'Premium Sedan', seats: '4', luggage: '2 Large + 1 Cabin', airport: '✓', outstation: '✓', best: 'Solo / Couples' },
  { vehicle: 'Innova Crysta', seats: '6–7', luggage: '4 Large + Cabin', airport: '✓', outstation: '✓', best: 'Families / Corporate' },
  { vehicle: 'XL6 / SUV', seats: '6', luggage: '3 Large + Cabin', airport: '✓', outstation: '✓', best: 'Family Trips' },
  { vehicle: 'Tempo Traveller', seats: '12–16', luggage: '8+ Bags', airport: '—', outstation: '✓', best: 'Groups / Events' },
  { vehicle: 'Luxury / Executive', seats: '4', luggage: '2 Large + Cabin', airport: '✓', outstation: '✓', best: 'VIP / Executive' },
];

export default function FleetPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#171717] text-white" aria-label="Fleet page hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
          >
            100+ Vehicles Network
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            <SplitTextReveal text="Our Premium Fleet" highlight="Premium" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-white/70 max-w-2xl mx-auto text-lg mb-10"
          >
            Choose comfort for every journey. From executive sedans to spacious Tempo Travellers, our vehicles are impeccably maintained and driven by professionals.
          </motion.p>
        </div>
      </section>

      <FleetShowcase />

      {/* Comparison Table */}
      <section className="py-24 bg-[#F8F7F3]" aria-label="Vehicle comparison table">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal className="mb-12 text-center">
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Quick Compare</p>
            <h2 className="text-3xl md:text-4xl font-serif">
              <SplitTextReveal text="Vehicle Comparison" highlight="Comparison" />
            </h2>
          </Reveal>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: motionEases.softEase }}
            className="bg-white rounded-[20px] border border-[#DEDBD2] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="bg-[#EFEEE8]">
                    <th className="text-left px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Vehicle</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Seats</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Luggage</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Airport</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Outstation</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#6F6B63]" scope="col">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_TABLE.map((row, i) => (
                    <tr key={i} className="border-t border-[#DEDBD2] hover:bg-[#F8F7F3]/60 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#101010]">{row.vehicle}</td>
                      <td className="text-center px-4 py-4 text-[#6F6B63]">{row.seats}</td>
                      <td className="text-center px-4 py-4 text-[#6F6B63] text-xs">{row.luggage}</td>
                      <td className="text-center px-4 py-4 text-[#B88A44]">{row.airport}</td>
                      <td className="text-center px-4 py-4 text-[#B88A44]">{row.outstation}</td>
                      <td className="text-center px-4 py-4 text-[#6F6B63] text-xs">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </motion.div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-16 bg-white" aria-label="Fleet standards">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Regular Maintenance', desc: 'Every vehicle goes through regular servicing, deep cleaning, and safety checks before each long-distance trip.' },
            { title: 'Professional Drivers', desc: 'Licensed, experienced, and well-groomed. Many of our drivers have been with us for over a decade.' },
            { title: 'AC Always On', desc: 'Climate control is standard. Whether it\'s summer heat or winter fog, you travel in comfort.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: motionEases.softEase }}
              className="bg-[#F8F7F3] p-8 rounded-[20px] border border-[#DEDBD2]"
            >
              <h3 className="font-serif text-lg text-[#101010] mb-2">{item.title}</h3>
              <p className="text-[#6F6B63] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#EFEEE8] text-center" aria-label="Book your vehicle">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#101010]">Ready to Choose Your Ride?</h2>
          <p className="text-[#6F6B63] mb-6">Book your preferred vehicle on WhatsApp or check our routes to plan your journey.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={getWhatsAppLink(`Hi ${BUSINESS.name}, I want to book a vehicle.\n\nVehicle: \nDate: `)} target="_blank" rel="noopener noreferrer" className="bg-[#171717] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#B88A44] transition-colors" aria-label="Book vehicle on WhatsApp">
              Book on WhatsApp
            </a>
            <Link href="/routes" className="border border-[#DEDBD2] text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white transition-colors">
              View Routes →
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
