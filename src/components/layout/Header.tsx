'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F7F3]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#DEDBD2]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-2xl font-bold tracking-wider transition-colors ${
              isScrolled ? 'text-[#101010]' : 'text-white'
            }`}
          >
            {BUSINESS.brand.toUpperCase()}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`font-mono text-xs uppercase tracking-widest hover:text-[#B88A44] transition-colors ${
                  isScrolled ? 'text-[#101010]' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:+91${BUSINESS.phone}`}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-[#101010] hover:text-[#B88A44]' : 'text-white/90 hover:text-white'
              }`}
              aria-label="Call us"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
            <a
              href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#B88A44] transition-colors"
              aria-label="Book on WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${
              isScrolled ? 'text-[#101010] hover:bg-[#101010]/5' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[#F8F7F3] transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DEDBD2]">
          <Link href="/" className="font-serif text-2xl font-bold text-[#101010]" onClick={() => setMobileOpen(false)}>
            {BUSINESS.brand.toUpperCase()}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#101010] hover:bg-[#101010]/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8">
          <nav className="space-y-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className="block font-serif text-3xl font-semibold text-[#101010] hover:text-[#B88A44] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-12 space-y-3">
            <a
              href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Book on WhatsApp
            </a>
            <a
              href={`tel:+91${BUSINESS.phone}`}
              className="flex items-center justify-center gap-3 rounded-full border border-[#DEDBD2] px-6 py-4 text-sm font-medium text-[#101010]"
            >
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>

        <p className="px-8 pb-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F6B63]">
          {BUSINESS.tagline}
        </p>
      </div>
    </>
  );
}
