'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { useWhatsAppRedirect } from '@/hooks/useWhatsAppRedirect';
import { motionDurations, motionEases } from '@/lib/motion';

export default function MobileStickyCTA() {
  const whatsappMsg = `Hi ${BUSINESS.name}, I would like to book a ride.`;
  const whatsappHref = getWhatsAppLink(whatsappMsg);
  const whatsapp = useWhatsAppRedirect(whatsappHref, 'WhatsApp');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const footer = document.querySelector('footer');
      const interactiveZones = document.querySelectorAll('#booking, #booking-form, #inquiry, #fleet, #final-cta');
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const nearFooter = footerTop < window.innerHeight + 120;
      const overInteractiveZone = Array.from(interactiveZones).some((zone) => {
        const rect = zone.getBoundingClientRect();
        return rect.top < window.innerHeight - 80 && rect.bottom > window.innerHeight - 120;
      });
      setVisible(progress > 0.2 && !nearFooter && !overInteractiveZone);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 84, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 84, opacity: 0 }}
          transition={{ duration: motionDurations.drawerOpen, ease: motionEases.mainEase }}
          className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="grid grid-cols-2 gap-2 rounded-full border border-white/15 bg-[#0A0A0A]/92 p-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <a
              href={getPhoneLink()}
              className="premium-tap flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1A1A1A]/10 text-xs font-black uppercase tracking-widest text-white"
              aria-label={`Call ${BUSINESS.phone}`}
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={whatsapp.open}
              className="premium-tap flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-xs font-black uppercase tracking-widest text-white"
              aria-label="Open WhatsApp booking"
              aria-busy={whatsapp.isOpening}
            >
              <MessageCircle className="h-4 w-4" />
              {whatsapp.isOpening ? 'Opening...' : 'WhatsApp'}
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
