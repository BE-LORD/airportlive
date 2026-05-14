"use client";

import Header from '@/components/layout/Header';
import RouteCorridor from '@/components/sections/RouteCorridor';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';

export default function RoutesPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#0A0A0A] text-white" aria-label="Routes page hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
          >
            Network & Coverage
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            <SplitTextReveal text="Mastering the Corridor" highlight="Corridor" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-white/70 max-w-2xl mx-auto text-lg mb-10"
          >
            Dedicated airport and outstation routes connecting Punjab, Chandigarh, and Delhi. Safe, non-stop, and highly punctual. Every route with a fare quote on WhatsApp.
          </motion.p>
        </div>
      </section>

      <RouteCorridor hideHeader />

      {/* Route Tips */}
      <section className="py-16 bg-[#141414]" aria-label="Route booking tips">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Book Early, Save More', desc: 'Booking 12–24 hours in advance guarantees vehicle availability and the best rates.' },
            { title: 'One-Way Available', desc: 'Pay only for the distance you travel. No return charges for one-way airport drops or pickups.' },
            { title: 'Custom Routes', desc: 'Don\'t see your route? Just WhatsApp us. We handle custom routes across all of North India.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: motionEases.softEase }}
              className="bg-[#1A1A1A] p-8 rounded-[20px] border border-white/10"
            >
              <h3 className="font-serif text-lg text-[#F5F5F5] mb-2">{item.title}</h3>
              <p className="text-[#A3A3A3] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A] text-center" aria-label="Choose vehicle for your route">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#F5F5F5]">Choose the Right Vehicle for Your Route</h2>
          <p className="text-[#A3A3A3] mb-6">Different routes, different needs. See which vehicle fits your journey best.</p>
          <Link href="/fleet" className="inline-block border border-white/10 text-[#F5F5F5] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#222222] transition-colors">
            View Fleet →
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
