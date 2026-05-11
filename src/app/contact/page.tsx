import Header from '@/components/layout/Header';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import ContactBookingForm from '@/components/sections/ContactBookingForm';
import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Book Taxi Online — Contact ${BUSINESS.name}`,
  description: "Contact Airport Live / V3 Tour & Travels for instant taxi booking. Call or WhatsApp our 24/7 helpline. Submit a booking inquiry directly.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-[#171717] text-white" aria-label="Contact page hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-15" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Contact <span className="italic text-[#B88A44]">Us</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-10">
            We are available 24/7 for bookings, quotes, and travel assistance. Connect with our dispatch team instantly.
          </p>
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-16 bg-white" aria-label="Contact information">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 border border-[#DEDBD2] rounded-[20px] hover:shadow-lg transition-shadow text-center">
              <h3 className="font-bold text-[#101010] mb-2 uppercase text-[10px] tracking-widest font-mono">WhatsApp</h3>
              <a href={`https://wa.me/91${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#B88A44] hover:text-[#101010] text-lg transition-colors font-mono block" aria-label={`WhatsApp us at ${BUSINESS.whatsapp}`}>
                +91 {BUSINESS.whatsapp}
              </a>
              <p className="text-[10px] text-[#6F6B63] mt-1 uppercase">Fastest response</p>
            </div>
            <div className="p-6 border border-[#DEDBD2] rounded-[20px] hover:shadow-lg transition-shadow text-center">
              <h3 className="font-bold text-[#101010] mb-2 uppercase text-[10px] tracking-widest font-mono">Call Center</h3>
              <a href={`tel:+91${BUSINESS.phone}`} className="text-[#B88A44] hover:text-[#101010] text-lg transition-colors font-mono block" aria-label={`Call us at ${BUSINESS.phone}`}>
                +91 {BUSINESS.phone}
              </a>
              <p className="text-[10px] text-[#6F6B63] mt-1 uppercase">Standard call rates apply</p>
            </div>
            <div className="p-6 border border-[#DEDBD2] rounded-[20px] hover:shadow-lg transition-shadow text-center">
              <h3 className="font-bold text-[#101010] mb-2 uppercase text-[10px] tracking-widest font-mono">Email</h3>
              <a href={`mailto:${BUSINESS.email}`} className="text-[#B88A44] hover:text-[#101010] text-lg transition-colors font-mono block break-all" aria-label={`Email us at ${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              <p className="text-[10px] text-[#6F6B63] mt-1 uppercase">For corporate queries</p>
            </div>
            <div className="p-6 border border-[#DEDBD2] rounded-[20px] hover:shadow-lg transition-shadow text-center">
              <h3 className="font-bold text-[#101010] mb-2 uppercase text-[10px] tracking-widest font-mono">Location</h3>
              <p className="text-[#101010] text-sm">{BUSINESS.address}</p>
              <p className="text-[10px] text-[#6F6B63] mt-1 uppercase">By appointment only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <ContactBookingForm />

      {/* Emergency & Business Hours */}
      <section className="py-16 bg-[#EFEEE8]" aria-label="Business hours and emergency info">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-xl text-[#101010] mb-3">Business Hours</h3>
            <p className="text-[#B88A44] font-bold text-2xl font-mono">24 / 7</p>
            <p className="text-[#6F6B63] text-sm mt-2">Including holidays, weekends, early mornings, and late nights.</p>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-xl text-[#101010] mb-3">Urgent Bookings</h3>
            <p className="text-[#B88A44] font-bold text-lg font-mono">{BUSINESS.phone}</p>
            <p className="text-[#6F6B63] text-sm mt-2">For same-day or emergency bookings, call directly for fastest confirmation.</p>
          </div>
          <div className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]">
            <h3 className="font-serif text-xl text-[#101010] mb-3">Service Coverage</h3>
            <p className="text-[#101010] text-sm font-medium">Punjab · Chandigarh · Delhi NCR</p>
            <p className="text-[#6F6B63] text-sm mt-2">Ludhiana, Jalandhar, Patiala, Amritsar, Mohali, and custom routes.</p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBookingBar />
    </main>
  );
}
