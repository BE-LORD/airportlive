import Header from '@/components/layout/Header';
import RouteCorridor from '@/components/sections/RouteCorridor';
import InquirySection from '@/components/sections/InquirySection';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';

function RoutesHero() {
  return (
    <section className="relative pt-40 pb-32 bg-[#171717] text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Network & Coverage</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Mastering the <span className="italic text-[#B88A44]">Corridor</span></h1>
        <p className="text-[#DEDBD2] max-w-2xl mx-auto text-lg mb-10">
          Dedicated airport and outstation routes connecting Punjab, Chandigarh, and Delhi. Safe, non-stop, and highly punctual.
        </p>
      </div>
    </section>
  );
}

export const metadata = {
  title: `Airport & Outstation Taxi Routes | ${BUSINESS.name}`,
  description: "View our core taxi routes including Ludhiana to Delhi Airport, Chandigarh to Delhi, and across Punjab."
};

export default function RoutesPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <RoutesHero />
      <RouteCorridor />
      <InquirySection />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
