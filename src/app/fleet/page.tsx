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
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-[#0A0A0A] text-white" aria-label="Fleet page hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
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
      <section className="py-16 md:py-24 bg-[#0A0A0A]" aria-label="Vehicle comparison table">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal className="mb-12 text-center">
            <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Quick Compare</p>
            <h2 className="text-3xl md:text-4xl font-serif">
              <SplitTextReveal text="Vehicle Comparison" highlight="Comparison" />
            </h2>
          </Reveal>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: motionEases.softEase }}
            className="bg-[#1A1A1A] rounded-[20px] border border-white/10 overflow-hidden"
          >
            {/* Mobile Cards View */}
            <div className="grid gap-4 p-4 md:hidden">
              {COMPARISON_TABLE.map((row, i) => (
                <div key={i} className="bg-[#0A0A0A]/60 rounded-xl p-4 border border-white/5 space-y-3">
                  <h3 className="font-semibold text-[#F5F5F5] border-b border-white/10 pb-2">{row.vehicle}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-[#A3A3A3] block mb-1">Seats:</span> {row.seats}</div>
                    <div><span className="text-[#A3A3A3] block mb-1">Luggage:</span> {row.luggage}</div>
                    <div><span className="text-[#A3A3A3] block mb-1">Airport:</span> {row.airport}</div>
                    <div><span className="text-[#A3A3A3] block mb-1">Outstation:</span> {row.outstation}</div>
                  </div>
                  <div className="text-xs pt-1">
                    <span className="text-[#A3A3A3] block mb-1">Best For:</span> {row.best}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="bg-[#141414]">
                    <th className="text-left px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Vehicle</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Seats</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Luggage</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Airport</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Outstation</th>
                    <th className="text-center px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3]" scope="col">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_TABLE.map((row, i) => (
                    <tr key={i} className="border-t border-white/10 hover:bg-[#0A0A0A]/60 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#F5F5F5]">{row.vehicle}</td>
                      <td className="text-center px-4 py-4 text-[#A3A3A3]">{row.seats}</td>
                      <td className="text-center px-4 py-4 text-[#A3A3A3] text-xs">{row.luggage}</td>
                      <td className="text-center px-4 py-4 text-[#E5E4E2]">{row.airport}</td>
                      <td className="text-center px-4 py-4 text-[#E5E4E2]">{row.outstation}</td>
                      <td className="text-center px-4 py-4 text-[#A3A3A3] text-xs">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </motion.div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-12 md:py-16 bg-[#1A1A1A]" aria-label="Fleet standards">
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
              className="bg-[#0A0A0A] p-8 rounded-[20px] border border-white/10"
            >
              <h3 className="font-serif text-lg text-[#F5F5F5] mb-2">{item.title}</h3>
              <p className="text-[#A3A3A3] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[#141414] text-center" aria-label="Book your vehicle">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#F5F5F5]">Ready to Choose Your Ride?</h2>
          <p className="text-[#A3A3A3] mb-6">Book your preferred vehicle on WhatsApp or check our routes to plan your journey.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={getWhatsAppLink(`Hi ${BUSINESS.name}, I want to book a vehicle.\n\nVehicle: \nDate: `)} target="_blank" rel="noopener noreferrer" className="bg-[#0A0A0A] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#E5E4E2] transition-colors" aria-label="Book vehicle on WhatsApp">
              Book on WhatsApp
            </a>
            <Link href="/routes" className="border border-white/10 text-[#F5F5F5] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] transition-colors">
              View Routes →
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
