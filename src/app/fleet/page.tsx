import Header from '@/components/layout/Header';
import FleetShowcase from '@/components/sections/FleetShowcase';
import InquirySection from '@/components/sections/InquirySection';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';

function FleetHero() {
  return (
    <section className="relative pt-40 pb-32 bg-[#171717] text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">100+ Vehicles Network</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Our <span className="italic text-[#B88A44]">Premium</span> Fleet</h1>
        <p className="text-[#DEDBD2] max-w-2xl mx-auto text-lg mb-10">
          Choose comfort for every journey. From executive sedans to spacious Tempo Travellers, our vehicles are impeccably maintained.
        </p>
      </div>
    </section>
  );
}

export const metadata = {
  title: `Premium Taxi Fleet | Sedan, SUV & Group Travel Vehicles | ${BUSINESS.name}`,
  description: "Explore our premium fleet of Innova Crystas, Sedans, and Tempo Travellers for outstation and airport travel."
};

export default function FleetPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <FleetHero />
      <FleetShowcase />
      <InquirySection />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
