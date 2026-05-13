import Header from '@/components/layout/Header';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';
import { Plane, Clock, MapPin, Shield, Phone, Luggage } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Airport Taxi Service — Premium Pickup & Drop | ${BUSINESS.name}`,
  description: "Book premium airport taxi and outstation rides with V3 Tour and Travels. 20+ years experience, 100+ fleet network. Delhi, Chandigarh, and Amritsar airports.",
};

const AIRPORTS = [
  { name: 'Delhi (IGI) Airport', code: 'DEL', terminals: 'T1, T2, T3', desc: 'Indira Gandhi International — India\'s busiest airport. We cover all terminals with meet-and-greet at arrivals.', from: ['Ludhiana', 'Chandigarh', 'Jalandhar', 'Patiala'] },
  { name: 'Chandigarh Airport', code: 'IXC', terminals: 'Single Terminal', desc: 'Compact, efficient airport. Our drivers park at the designated taxi zone and assist with luggage.', from: ['Ludhiana', 'Mohali', 'Panchkula', 'Zirakpur'] },
  { name: 'Amritsar Airport', code: 'ATQ', terminals: 'Single Terminal', desc: 'Sri Guru Ram Dass Jee International Airport. Popular for NRI families and Golden Temple visitors.', from: ['Ludhiana', 'Jalandhar', 'Chandigarh'] },
];

const PROCESS_STEPS = [
  { icon: Phone, title: 'Book via WhatsApp / Call', desc: 'Share your flight details, pickup address, date and time. We confirm fare and vehicle in minutes.' },
  { icon: Clock, title: 'Flight Tracking Activated', desc: 'For airport pickups, we monitor your flight status. If delayed, we adjust pickup time automatically.' },
  { icon: MapPin, title: 'Driver Reaches Early', desc: 'Your chauffeur arrives 15–30 minutes before scheduled time. Tracking link shared on WhatsApp.' },
  { icon: Shield, title: 'Safe & Comfortable Ride', desc: 'Clean vehicle, professional driver, AC always on, luggage assistance, and a smooth highway experience.' },
  { icon: Luggage, title: 'Terminal Drop / Pickup', desc: 'For drops: we drop at your terminal gate. For pickups: driver waits at arrivals with a name board.' },
  { icon: Plane, title: 'Done — Book Again Anytime', desc: 'We save your preferences. Next booking is even faster. Most customers become regulars.' },
];

export default function AirportTaxiPage() {
  const whatsappMsg = `Hi ${BUSINESS.name}, I need an airport taxi.\n\nFlight: \nDate: \nPassengers: `;

  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#171717] text-white" aria-label="Airport taxi hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">24/7 Airport Transfers</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Premium <span className="italic text-[#B88A44]">Airport</span> Taxi</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            Never miss a flight. Never wait at arrivals. Our specialized airport transfer service covers Delhi, Chandigarh, and Amritsar airports with flight tracking and door-to-terminal comfort.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="bg-[#B88A44] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-[#101010] transition-colors" aria-label="Book airport taxi on WhatsApp">
              Book Airport Taxi
            </a>
            <a href={getPhoneLink()} className="border border-white/30 text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white/10 transition-colors" aria-label={`Call ${BUSINESS.phone}`}>
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Airport Cards */}
      <section className="py-24 bg-white" aria-label="Airports we serve">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Airports We Serve</p>
            <h2 className="text-4xl md:text-5xl font-serif">Three Airports, <span className="italic text-[#B88A44]">One Call</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AIRPORTS.map((airport, i) => (
              <div key={i} className="bg-[#F8F7F3] border border-[#DEDBD2] rounded-[20px] p-8 hover:border-[#B88A44]/30 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="h-5 w-5 text-[#B88A44]" />
                  <span className="font-mono text-[#B88A44] text-xs uppercase tracking-widest">{airport.code}</span>
                </div>
                <h3 className="text-xl font-serif text-[#101010] mb-2">{airport.name}</h3>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#6F6B63] mb-4">{airport.terminals}</p>
                <p className="text-[#6F6B63] text-sm mb-6 leading-relaxed">{airport.desc}</p>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6F6B63] mb-2">Popular From</p>
                  <div className="flex flex-wrap gap-2">
                    {airport.from.map(city => (
                      <span key={city} className="text-xs bg-white border border-[#DEDBD2] px-3 py-1 rounded-full">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Airport Transfers Work */}
      <section className="py-24 bg-[#EFEEE8]" aria-label="How airport taxi booking works">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-serif">How Airport <span className="italic text-[#B88A44]">Transfers</span> Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#B88A44]/10 flex items-center justify-center text-[#B88A44] font-mono text-xs font-bold">{i + 1}</span>
                    <Icon className="h-4 w-4 text-[#B88A44]" />
                  </div>
                  <h3 className="font-bold text-[#101010] mb-2">{step.title}</h3>
                  <p className="text-[#6F6B63] text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Late Night Note */}
      <section className="py-16 bg-[#171717] text-white text-center" aria-label="Late night service">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4">Late Night & Early Morning Flights?</h2>
          <p className="text-white/60 mb-6">We operate 24/7 with zero late-night surcharge. Whether your flight is at 2 AM or 11 PM, your driver will be there on time.</p>
          <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#B88A44] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-[#101010] transition-colors" aria-label="Book late night airport taxi on WhatsApp">
            Book Late Night Taxi
          </a>
        </div>
      </section>

      <FAQ />

      {/* Fleet CTA */}
      <section className="py-16 bg-white text-center" aria-label="Choose your vehicle">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#101010]">Choose Your Airport Vehicle</h2>
          <p className="text-[#6F6B63] mb-6">From executive sedans to spacious Innova Crystas — pick the perfect ride for your airport transfer.</p>
          <Link href="/fleet" className="inline-block border border-[#DEDBD2] text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#EFEEE8] transition-colors">
            View Fleet →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
