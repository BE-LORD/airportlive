'use client';
import { BUSINESS } from '@/lib/constants';

export default function InquirySection() {
  return (
    <section className="py-32 bg-[#EAE3D6] text-v3-navy text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif mb-8">Ready for <span className="italic text-v3-gold">Takeoff?</span></h2>
        <p className="text-xl mb-16 opacity-80 max-w-2xl mx-auto font-sans">
          Reserve your Innova Crysta for your next airport transfer. We are available 24/7.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href={`https://wa.me/91${BUSINESS.whatsapp}`} className="bg-v3-navy text-v3-cream px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-v3-gold hover:text-v3-navy transition-colors duration-300">
            Chat on WhatsApp
          </a>
          <a href={`tel:+91${BUSINESS.phone}`} className="border border-v3-navy text-v3-navy px-10 py-5 uppercase tracking-[0.2em] text-sm hover:bg-v3-navy hover:text-v3-cream transition-colors duration-300">
            Call Direct
          </a>
        </div>
      </div>
    </section>
  );
}
