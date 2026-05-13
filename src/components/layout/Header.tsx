'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { MobileDrawer } from '@/components/motion/MobileDrawer';
import { MotionButton } from '@/components/motion/MotionButton';
import { useWhatsAppRedirect } from '@/hooks/useWhatsAppRedirect';
import { motionDurations, motionEases } from '@/lib/motion';

const navLinks = [
  { name: 'Airport Taxi', path: '/airport-taxi' },
  { name: 'Routes', path: '/routes' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ride.`;
  const whatsappHref = getWhatsAppLink(whatsappMsg);
  const whatsapp = useWhatsAppRedirect(whatsappHref, 'WhatsApp');

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/88 backdrop-blur-xl shadow-lg py-3 border-b border-white/10'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.28em' }}
            animate={{ opacity: 1, letterSpacing: '0.08em' }}
            transition={{ duration: 0.7, ease: motionEases.mainEase }}
            className="z-[60]"
          >
          <Link
            href="/"
            data-cursor="Home"
            className="font-serif text-2xl md:text-3xl font-bold text-white mix-blend-difference"
          >
            {BUSINESS.brand.toUpperCase()}
          </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                data-cursor="Explore"
                data-active={pathname === item.path}
                className={`font-mono text-xs uppercase tracking-[0.15em] transition-colors relative group ${
                  isScrolled ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white'
                } premium-link-underline pb-2`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={getPhoneLink()}
              data-cursor="Call"
              className={`flex items-center gap-2 px-2 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-white/80 hover:text-[#E5E4E2]' : 'text-white/90 hover:text-white'
              }`}
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <MotionButton
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={whatsapp.open}
              dataCursor="Book"
              variant="gold"
              icon={<MessageCircle className="h-4 w-4 text-[#25D366]" />}
              loading={whatsapp.isOpening}
              success={whatsapp.state === 'success'}
              ariaLabel="Book on WhatsApp"
            >
              {whatsapp.label}
            </MotionButton>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-colors lg:hidden text-white bg-[#1A1A1A]/10 backdrop-blur-md z-[60]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div id="mobile-navigation">
        <MobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          links={navLinks}
          brand="Navigation"
          phoneHref={getPhoneLink()}
          whatsappHref={whatsappHref}
          phoneLabel={BUSINESS.phone}
        />
      </div>
    </>
  );
}
