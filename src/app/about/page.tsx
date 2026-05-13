"use client";

import Header from '@/components/layout/Header';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/layout/Footer';
import { Shield, Clock, Car, Users, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';

const VALUES = [
  { icon: Clock, title: 'Punctuality First', desc: 'We reach before time, every time. Our drivers track flights and plan routes to ensure zero delays.' },
  { icon: Shield, title: 'Safety Standards', desc: 'Every vehicle is inspected regularly. Every driver is licensed, trained, and professionally groomed.' },
  { icon: Car, title: 'Premium Fleet', desc: '100+ vehicles ranging from executive sedans to Tempo Travellers. All clean, air-conditioned, well-maintained.' },
  { icon: Users, title: 'Family Values', desc: 'We treat every passenger like family. From elderly parents to corporate VIPs, the care level is the same.' },
  { icon: MapPin, title: 'Local Knowledge', desc: '20+ years in Punjab means we know every highway, shortcut, and toll booth. Efficient routing, always.' },
  { icon: Award, title: 'Trust & Reliability', desc: 'Hundreds of families trust us for regular airport runs. Many of our drivers have been with us 10+ years.' },
];

const STATS = [
  { number: '20+', label: 'Years of Service' },
  { number: '100+', label: 'Vehicles in Network' },
  { number: '50K+', label: 'Trips Completed' },
  { number: '24/7', label: 'Always Available' },
];

const CITIES = ['Ludhiana', 'Chandigarh', 'Delhi NCR', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali', 'Phagwara', 'Panchkula', 'Zirakpur', 'Khanna', 'Mandi Gobindgarh'];

export default function AboutPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#0A0A0A] text-white" aria-label="About us hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
          >
            Our Legacy
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            <SplitTextReveal text="20+ Years of Trust" highlight="Trust" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-white/70 max-w-2xl mx-auto text-lg mb-10"
          >
            We didn&apos;t just build a taxi service; we built a legacy of reliable, premium travel for families and executives across North India.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-[#1A1A1A]" aria-label="Company story">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">The V3 Story</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              <SplitTextReveal text="From One Car to 100+" highlight="100+" />
            </h2>
          </Reveal>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: motionEases.softEase }}
            className="space-y-6 text-[#A3A3A3] text-base leading-relaxed"
          >
            <p>V3 Tour & Travels started over two decades ago with a single vision: make travel across Punjab comfortable, reliable, and safe. What began as a small family operation in Ludhiana has grown into one of the region&apos;s most trusted travel brands.</p>
            <p>Today, we operate a network of 100+ vehicles including premium Innova Crystas, executive sedans, and group-travel Tempo Travellers. Our focus is on airport transfers — connecting Punjab to Delhi IGI, Chandigarh, and Amritsar airports — but we also handle outstation rides, corporate travel, and wedding logistics.</p>
            <p>Operating as <strong className="text-[#F5F5F5]">Airport Live</strong> for our digital presence, V3 Tour & Travels is the name families have trusted for generations. Our drivers are experienced, our vehicles are maintained to high standards, and our dispatch operates 24/7 via WhatsApp and phone.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0A0A0A] text-white" aria-label="Company statistics">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: motionEases.mainEase }}
              >
                <p className="text-4xl md:text-5xl font-serif text-[#E5E4E2] mb-2">{stat.number}</p>
                <p className="text-xs uppercase tracking-widest text-white/60 font-mono">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-[#141414]" aria-label="Our values">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Why V3</p>
            <h2 className="text-4xl md:text-5xl font-serif">
              <SplitTextReveal text="What Makes Us Different" highlight="Different" />
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: motionEases.softEase }}
                  className="bg-[#1A1A1A] p-8 rounded-[20px] border border-white/10"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E5E4E2]/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#E5E4E2]" />
                  </div>
                  <h3 className="text-lg font-serif text-[#F5F5F5] mb-2">{value.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-16 bg-[#1A1A1A]" aria-label="Cities served">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-serif text-[#F5F5F5] mb-8">Cities We Serve</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map((city, i) => (
              <motion.span 
                key={city} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: motionEases.mainEase }}
                className="bg-[#141414] border border-white/10 text-[#F5F5F5] text-sm px-4 py-2 rounded-full"
              >
                {city}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
