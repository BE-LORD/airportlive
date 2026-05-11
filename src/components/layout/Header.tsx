'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const whatsappMsg = encodeURIComponent(
    `Hi ${BUSINESS.name}, I want to book a ride.`
  );

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#101010]/80 backdrop-blur-xl shadow-lg py-4 border-b border-white/5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            data-cursor="Home"
            className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white mix-blend-difference z-[60]"
          >
            {BUSINESS.brand.toUpperCase()}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                data-cursor="Explore"
                className={`font-mono text-xs uppercase tracking-[0.15em] transition-colors relative group ${
                  isScrolled ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#B88A44] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:+91${BUSINESS.phone}`}
              data-cursor="Call"
              className={`flex items-center gap-2 px-2 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-white/80 hover:text-[#B88A44]' : 'text-white/90 hover:text-white'
              }`}
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="flex items-center gap-2 bg-[#B88A44] text-white px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-[#101010] transition-colors duration-300"
              aria-label="Book on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] group-hover:hidden" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="Menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-colors lg:hidden text-white bg-white/10 backdrop-blur-md z-[60]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-[#101010] text-white overflow-hidden"
          >
            {/* Grain overlay for luxury feel */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="flex flex-1 flex-col justify-center px-8 sm:px-12 relative z-10">
              <p className="text-[#B88A44] font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold">Navigation</p>
              
              <nav className="space-y-4">
                {navLinks.map((item, i) => (
                  <div key={item.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setMobileOpen(false)}
                        className="block font-serif text-5xl sm:text-6xl text-white hover:text-[#B88A44] transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-16 space-y-4"
              >
                <a
                  href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full bg-[#B88A44] px-8 py-5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-[#101010] transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Book on WhatsApp
                </a>
                <a
                  href={`tel:+91${BUSINESS.phone}`}
                  className="flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
