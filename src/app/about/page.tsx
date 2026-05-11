import Header from '@/components/layout/Header';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';
import { Shield, Clock, Car, Users, MapPin, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: `About Us | ${BUSINESS.name}`,
  description: "Learn about V3 Tour and Travels. Over 20 years of experience providing luxury airport transfers and outstation tours across Punjab, Chandigarh, and Delhi NCR.",
};

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
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#171717] text-white" aria-label="About us hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Our Legacy</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">20+ Years of <span className="italic text-[#B88A44]">Trust</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            We didn&apos;t just build a taxi service; we built a legacy of reliable, premium travel for families and executives across North India.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white" aria-label="Company story">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">The V3 Story</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">From One Car to <span className="italic text-[#B88A44]">100+</span></h2>
          </div>
          <div className="space-y-6 text-[#6F6B63] text-base leading-relaxed">
            <p>V3 Tour & Travels started over two decades ago with a single vision: make travel across Punjab comfortable, reliable, and safe. What began as a small family operation in Ludhiana has grown into one of the region&apos;s most trusted travel brands.</p>
            <p>Today, we operate a network of 100+ vehicles including premium Innova Crystas, executive sedans, and group-travel Tempo Travellers. Our focus is on airport transfers — connecting Punjab to Delhi IGI, Chandigarh, and Amritsar airports — but we also handle outstation rides, corporate travel, and wedding logistics.</p>
            <p>Operating as <strong className="text-[#101010]">Airport Live</strong> for our digital presence, V3 Tour & Travels is the name families have trusted for generations. Our drivers are experienced, our vehicles are maintained to high standards, and our dispatch operates 24/7 via WhatsApp and phone.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#171717] text-white" aria-label="Company statistics">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-serif text-[#B88A44] mb-2">{stat.number}</p>
                <p className="text-xs uppercase tracking-widest text-white/60 font-mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-[#EFEEE8]" aria-label="Our values">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Why V3</p>
            <h2 className="text-4xl md:text-5xl font-serif">What Makes Us <span className="italic text-[#B88A44]">Different</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
                  <div className="w-12 h-12 rounded-2xl bg-[#B88A44]/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#B88A44]" />
                  </div>
                  <h3 className="text-lg font-serif text-[#101010] mb-2">{value.title}</h3>
                  <p className="text-[#6F6B63] text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-16 bg-white" aria-label="Cities served">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#101010] mb-8">Cities We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map(city => (
              <span key={city} className="bg-[#EFEEE8] border border-[#DEDBD2] text-[#101010] text-sm px-4 py-2 rounded-full">{city}</span>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Testimonials />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
