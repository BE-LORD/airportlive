import Header from '@/components/layout/Header';
import RouteCorridor from '@/components/sections/RouteCorridor';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Airport & Outstation Taxi Routes | ${BUSINESS.name}`,
  description: "View our core taxi routes including Ludhiana to Delhi Airport, Chandigarh to Delhi, Amritsar Airport, and across Punjab. Distance, time estimates, and instant WhatsApp booking.",
};

export default function RoutesPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-32 bg-[#171717] text-white" aria-label="Routes page hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Network & Coverage</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Mastering the <span className="italic text-[#B88A44]">Corridor</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            Dedicated airport and outstation routes connecting Punjab, Chandigarh, and Delhi. Safe, non-stop, and highly punctual. Every route with a fare quote on WhatsApp.
          </p>
        </div>
      </section>

      <RouteCorridor />

      {/* Route Tips */}
      <section className="py-16 bg-[#EFEEE8]" aria-label="Route booking tips">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-lg text-[#101010] mb-2">Book Early, Save More</h3>
            <p className="text-[#6F6B63] text-sm">Booking 12–24 hours in advance guarantees vehicle availability and the best rates.</p>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-lg text-[#101010] mb-2">One-Way Available</h3>
            <p className="text-[#6F6B63] text-sm">Pay only for the distance you travel. No return charges for one-way airport drops or pickups.</p>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-lg text-[#101010] mb-2">Custom Routes</h3>
            <p className="text-[#6F6B63] text-sm">Don&apos;t see your route? Just WhatsApp us. We handle custom routes across all of North India.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center" aria-label="Choose vehicle for your route">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-[#101010]">Choose the Right Vehicle for Your Route</h2>
          <p className="text-[#6F6B63] mb-6">Different routes, different needs. See which vehicle fits your journey best.</p>
          <Link href="/fleet" className="inline-block border border-[#DEDBD2] text-[#101010] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#EFEEE8] transition-colors">
            View Fleet →
          </Link>
        </div>
      </section>

      <Footer />
      <MobileBookingBar />
    </main>
  );
}
