import Header from '@/components/layout/Header';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import InquirySection from '@/components/sections/InquirySection';
import MobileBookingBar from '@/components/layout/MobileBookingBar';
import Footer from '@/components/layout/Footer';
import { BUSINESS } from '@/lib/constants';

function AboutHero() {
  return (
    <section className="relative pt-40 pb-32 bg-[#171717] text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Our Legacy</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">20+ Years of <span className="italic text-[#B88A44]">Trust</span></h1>
        <p className="text-[#DEDBD2] max-w-2xl mx-auto text-lg mb-10">
          We didn't just build a taxi service; we built a legacy of reliable, premium travel for families and executives across North India.
        </p>
      </div>
    </section>
  );
}

export const metadata = {
  title: `About Us | ${BUSINESS.name}`,
  description: "Learn about V3 Tour and Travels. Over 20 years of experience providing luxury airport transfers and outstation tours."
};

export default function AboutPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <AboutHero />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <InquirySection />
      <Footer />
      <MobileBookingBar />
    </main>
  );
}
