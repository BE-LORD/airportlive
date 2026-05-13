'use client';
import { BUSINESS } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';

export default function MobileBookingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi ${BUSINESS.name}, I want to book a ride.\n\nPickup: \nDrop: \nDate: \nPassengers: `
  );

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 md:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Gradient fade for smooth transition */}
      <div className="h-6 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      <div className="bg-[#0A0A0A] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#25D366] py-3 text-white active:scale-95 transition-transform min-h-[52px]"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>
          <a
            href={`tel:+91${BUSINESS.phone}`}
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#1A1A1A]/10 py-3 text-white active:scale-95 transition-transform min-h-[52px]"
            aria-label="Call now"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
          </a>
          <a
            href="#booking"
            className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#E5E4E2] py-3 text-white active:scale-95 transition-transform min-h-[52px]"
            aria-label="Book a ride"
          >
            <CalendarCheck className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Book</span>
          </a>
        </div>
      </div>
    </div>
  );
}
