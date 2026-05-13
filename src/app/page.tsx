import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Services from '@/components/sections/Services';
import RouteCorridor from '@/components/sections/RouteCorridor';
import FleetShowcase from '@/components/sections/FleetShowcase';
import BookingFlow from '@/components/sections/BookingFlow';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import InquirySection from '@/components/sections/InquirySection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <RouteCorridor />
      <FleetShowcase />
      <BookingFlow />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <FAQ />
      <InquirySection />
      <Footer />
    </main>
  );
}
