import Header from '@/components/layout/Header';
import RouteCorridor from '@/components/sections/RouteCorridor';
import FleetShowcase from '@/components/sections/FleetShowcase';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/sections/FAQ';
import InquirySection from '@/components/sections/InquirySection';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';

function AirportTaxiHero() {
  return (
    <section className="relative pt-40 pb-32 bg-[#171717] text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">24/7 Airport Transfers</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Premium <span className="italic text-[#B88A44]">Airport</span> Taxi</h1>
        <p className="text-[#DEDBD2] max-w-2xl mx-auto text-lg mb-10">
          Specialized pickup and drop services for Delhi and Chandigarh airports. Never miss a flight with our punctual fleet.
        </p>
        <div className="flex justify-center gap-4">
            <a href={`https://wa.me/91${BUSINESS.whatsapp}`} className="bg-[#B88A44] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-[#101010] transition-colors">
              Book on WhatsApp
            </a>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: `Airport Taxi Service | Premium Pickup & Drop | ${BUSINESS.name}`,
  description: "Book premium airport taxi and outstation rides with V3 Tour and Travels. 20+ years experience, 100+ fleet network."
};

export default function AirportTaxiPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <AirportTaxiHero />
      <RouteCorridor />
      <FleetShowcase />
      <WhyChooseUs />
      <FAQ />
      <InquirySection />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
