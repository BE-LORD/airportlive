import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import Services from '@/components/sections/Services';
import JourneyStory from '@/components/sections/JourneyStory';
import RouteCorridor from '@/components/sections/RouteCorridor';
import FleetShowcase from '@/components/sections/FleetShowcase';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Gallery from '@/components/sections/Gallery';
import InquirySection from '@/components/sections/InquirySection';
import Footer from '@/components/layout/Footer';
import { ScrollColorMatrix } from '@/components/effects/ScrollColorMatrix';
import { SectionBlend } from '@/components/effects/SectionBlend';
import { HOME_METADATA } from '@/lib/homepage-metadata';

export const metadata = HOME_METADATA;

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5] relative">
      {/* Global atmospheric layer */}
      <ScrollColorMatrix />

      <Header />
      <Hero />
      <TrustStrip />

      {/* Dark → Light blend into Services */}
      <SectionBlend from="dark" to="light" />
      <Services />

      <JourneyStory />

      <RouteCorridor variant="compact" />

      {/* Light → Dark blend into Fleet */}
      <SectionBlend from="light" to="dark" />
      <FleetShowcase />

      <WhyChooseUs />

      {/* Light → Dark blend into Gallery */}
      <SectionBlend from="light" to="dark" />
      <Gallery />

      {/* Cream → Dark blend into Inquiry */}
      <SectionBlend from="cream" to="dark" />
      <InquirySection />

      <Footer />
    </main>
  );
}
