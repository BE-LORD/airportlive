import Header from '@/components/layout/Header';
import InquirySection from '@/components/sections/InquirySection';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';

function ContactHero() {
  return (
    <section className="relative pt-40 pb-32 bg-[#171717] text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Get In Touch</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Contact <span className="italic text-[#B88A44]">Us</span></h1>
        <p className="text-[#DEDBD2] max-w-2xl mx-auto text-lg mb-10">
          We are available 24/7 for bookings, quotes, and travel assistance. Connect with our dispatch team instantly.
        </p>
      </div>
    </section>
  );
}

export const metadata = {
  title: `Book Taxi Online | Contact ${BUSINESS.name}`,
  description: "Contact Airport Live / V3 Tour & Travels for instant taxi booking. Call or WhatsApp our 24/7 helpline."
};

export default function ContactPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <ContactHero />
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif mb-12">Direct Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-10 border border-[#DEDBD2] rounded-[24px] hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-[#101010] mb-4 uppercase text-xs tracking-widest">WhatsApp</h3>
                    <a href={`https://wa.me/91${BUSINESS.whatsapp}`} className="text-[#B88A44] hover:text-[#101010] text-xl transition-colors font-mono block">+91 {BUSINESS.whatsapp}</a>
                </div>
                <div className="p-10 border border-[#DEDBD2] rounded-[24px] hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-[#101010] mb-4 uppercase text-xs tracking-widest">Call Center</h3>
                    <a href={`tel:+91${BUSINESS.phone}`} className="text-[#B88A44] hover:text-[#101010] text-xl transition-colors font-mono block">+91 {BUSINESS.phone}</a>
                </div>
                <div className="p-10 border border-[#DEDBD2] rounded-[24px] hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-[#101010] mb-4 uppercase text-xs tracking-widest">Email</h3>
                    <a href={`mailto:${BUSINESS.email}`} className="text-[#B88A44] hover:text-[#101010] text-lg transition-colors font-mono block">{BUSINESS.email}</a>
                </div>
            </div>
        </div>
      </section>
      <InquirySection />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
