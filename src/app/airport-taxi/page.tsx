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
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#0A0A0A] text-white" aria-label="Airport taxi hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">24/7 Airport Transfers</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Premium <span className="italic text-[#E5E4E2]">Airport</span> Taxi</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            Never miss a flight. Never wait at arrivals. Our specialized airport transfer service covers Delhi, Chandigarh, and Amritsar airports with flight tracking and door-to-terminal comfort.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="bg-[#E5E4E2] text-[#0A0A0A] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors" aria-label="Book airport taxi on WhatsApp">
              Book Airport Taxi
            </a>
            <a href={getPhoneLink()} className="border border-white/30 text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A]/10 transition-colors" aria-label={`Call ${BUSINESS.phone}`}>
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Airport Cards */}
      <section className="py-24 bg-[#1A1A1A]" aria-label="Airports we serve">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Airports We Serve</p>
            <h2 className="text-4xl md:text-5xl font-serif">Three Airports, <span className="italic text-[#E5E4E2]">One Call</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AIRPORTS.map((airport, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-[20px] p-8 hover:border-[#E5E4E2]/30 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="h-5 w-5 text-[#E5E4E2]" />
                  <span className="font-mono text-[#E5E4E2] text-xs uppercase tracking-widest">{airport.code}</span>
                </div>
                <h3 className="text-xl font-serif text-[#F5F5F5] mb-2">{airport.name}</h3>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-4">{airport.terminals}</p>
                <p className="text-[#A3A3A3] text-sm mb-6 leading-relaxed">{airport.desc}</p>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2">Popular From</p>
                  <div className="flex flex-wrap gap-2">
                    {airport.from.map(city => (
                      <span key={city} className="text-xs bg-[#1A1A1A] border border-white/10 px-3 py-1 rounded-full">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Airport Transfers Work */}
      <section className="py-24 bg-[#141414]" aria-label="How airport taxi booking works">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-serif">How Airport <span className="italic text-[#E5E4E2]">Transfers</span> Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="bg-[#1A1A1A] p-8 rounded-[20px] border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#E5E4E2]/10 flex items-center justify-center text-[#E5E4E2] font-mono text-xs font-bold">{i + 1}</span>
                    <Icon className="h-4 w-4 text-[#E5E4E2]" />
                  </div>
                  <h3 className="font-bold text-[#F5F5F5] mb-2">{step.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Late Night Note */}
      <section className="py-16 bg-[#0A0A0A] text-white text-center" aria-label="Late night service">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4">Late Night & Early Morning Flights?</h2>
          <p className="text-white/60 mb-6">We operate 24/7 with zero late-night surcharge. Whether your flight is at 2 AM or 11 PM, your driver will be there on time.</p>
          <a href={getWhatsAppLink(whatsappMsg)} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#E5E4E2] text-[#0A0A0A] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors" aria-label="Book late night airport taxi on WhatsApp">
            Book Late Night Taxi
          </a>
        </div>
      </section>

      <FAQ />

      {/* Fleet CTA */}
      <section className="py-16 bg-[#1A1A1A] text-center" aria-label="Choose your vehicle">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#F5F5F5]">Choose Your Airport Vehicle</h2>
          <p className="text-[#A3A3A3] mb-6">From executive sedans to spacious Innova Crystas — pick the perfect ride for your airport transfer.</p>
          <Link href="/fleet" className="inline-block border border-white/10 text-[#F5F5F5] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#222222] transition-colors">
            View Fleet →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
