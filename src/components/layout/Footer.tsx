'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/links';

const exploreLinks = [
  { name: 'Airport Taxi', href: '/airport-taxi' },
  { name: 'Routes', href: '/routes' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const routeLinks = [
  'Ludhiana → Delhi Airport',
  'Chandigarh → Delhi Airport',
  'Ludhiana → Chandigarh Airport',
  'Ludhiana → Amritsar Airport',
  'Delhi Airport → Punjab',
];

export default function Footer() {
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ride.`;

  return (
    <footer className="bg-[#0A0A0A] text-white pt-10 md:pt-24 pb-28 md:pb-0 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Massive Branding Reveal — Hollow to Gold Fill */}
        <div className="mb-10 md:mb-20 overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-full whitespace-normal break-words font-serif text-[15vw] leading-[0.86] tracking-normal select-none motion-gold-shine sm:whitespace-nowrap md:text-[14vw]"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(to top, rgba(200,200,220,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              backgroundClip: 'text',
            }}
          >
            {BUSINESS.brand.toUpperCase()}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mb-10 md:mb-20">
          {/* Contact Column */}
          <div className="space-y-6">
            <div>
              <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-6 font-bold">Inquiries</p>
              <div className="space-y-4">
                <a
                  href={getPhoneLink()} 
                  data-cursor="Call"
                  className="flex min-h-11 items-center font-serif text-xl transition-colors hover:text-[#E5E4E2] md:text-2xl"
                >
                  +91 {BUSINESS.phone}
                </a>
                <a 
                  href={getEmailLink()} 
                  className="flex min-h-11 items-center break-words text-white/50 transition-colors hover:text-white"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-white/55 text-sm max-w-xs">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-[#E5E4E2]" />
              <p>{BUSINESS.address}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-5 md:mb-8 font-bold">Navigation</p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 sm:block sm:space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex min-h-11 items-center justify-between text-white/60 transition-all hover:text-white">
                    <span className="text-base md:text-lg font-serif">{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-5 md:mb-8 font-bold">Top Corridors</p>
            <ul className="space-y-3 md:space-y-4">
              {routeLinks.map((route) => (
                <li key={route}>
                  <Link href="/routes" className="flex min-h-11 items-center text-sm font-mono text-white/60 transition-colors hover:text-white">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect CTA */}
          <div className="bg-[#1A1A1A]/5 p-6 md:p-8 rounded-[20px] md:rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-serif mb-4">Book in seconds.</h4>
              <p className="text-white/55 text-xs leading-relaxed mb-6 md:mb-8 font-mono">
                WhatsApp verified booking. No automated calls. Real people. 24/7.
              </p>
            </div>
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="bg-[#E5E4E2] text-[#0A0A0A] px-6 py-4 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors text-center font-bold"
            >
              Start Conversation
            </a>
          </div>
        </div>

        {/* Legal & Attribution */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-8 text-[10px] font-mono uppercase tracking-widest text-white/45">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <p>© {new Date().getFullYear()} {BUSINESS.brand}</p>
            <Link href="/contact" className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-white">Privacy</Link>
            <Link href="/contact" className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-white">Terms</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Crafted by</span>
            <span className="text-white font-bold tracking-tighter">V3 DIGITAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
