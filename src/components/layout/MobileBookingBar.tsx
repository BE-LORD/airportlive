'use client';
import { BUSINESS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function MobileBookingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 transition-transform duration-500 md:hidden flex ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <a href={`tel:+91${BUSINESS.phone}`} className="flex-1 bg-v3-navy text-v3-cream py-5 text-center font-semibold tracking-wider text-xs uppercase border-r border-v3-cream/20">
        Call Now
      </a>
      <a href={`https://wa.me/91${BUSINESS.whatsapp}`} className="flex-1 bg-v3-gold text-v3-navy py-5 text-center font-semibold tracking-wider text-xs uppercase">
        WhatsApp
      </a>
    </div>
  );
}
