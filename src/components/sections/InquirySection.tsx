'use client';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone } from 'lucide-react';

export default function InquirySection() {
  const whatsappMsg = encodeURIComponent(
    `Hi ${BUSINESS.name}, I want to book a ride.`
  );

  return (
    <section className="py-32 bg-[#171717] text-white text-center px-4" aria-label="Final booking call to action">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold">Available 24/7</p>
        <h2 className="text-5xl md:text-7xl font-serif mb-8">Ready for <span className="italic text-[#B88A44]">Takeoff?</span></h2>
        <p className="text-xl mb-16 text-white/70 max-w-2xl mx-auto font-sans leading-relaxed">
          Reserve your premium vehicle for your next airport transfer. Whether it's a late-night flight or early morning pickup, we are always on time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a 
            href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#B88A44] text-white px-10 py-5 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-[#101010] transition-colors duration-300"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" /> Book on WhatsApp
          </a>
          <a 
            href={`tel:+91${BUSINESS.phone}`} 
            className="flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white/10 transition-colors duration-300"
            aria-label={`Call direct at ${BUSINESS.phone}`}
          >
            <Phone className="h-5 w-5" /> Call Direct
          </a>
        </div>
      </div>
    </section>
  );
}
