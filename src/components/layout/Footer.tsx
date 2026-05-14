'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
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
    <footer className="bg-[#0A0A0A] text-white pt-12 md:pt-32 pb-36 md:pb-0 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Massive Branding Reveal — Hollow to Gold Fill */}
        <div className="mb-12 md:mb-24 overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-[18vw] md:text-[14vw] font-serif leading-[0.8] tracking-tighter select-none whitespace-nowrap motion-gold-shine"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Contact Column */}
          <div className="space-y-8">
            <div>
              <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-6 font-bold">Inquiries</p>
              <div className="space-y-4">
                <a 
                  href={getPhoneLink()} 
                  data-cursor="Call"
                  className="block text-2xl font-serif hover:text-[#E5E4E2] transition-colors"
                >
                  +91 {BUSINESS.phone}
                </a>
                <a 
                  href={getEmailLink()} 
                  className="block text-white/50 hover:text-white transition-colors break-words"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-white/40 text-sm max-w-xs">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-[#E5E4E2]" />
              <p>{BUSINESS.address}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">Navigation</p>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center justify-between text-white/60 hover:text-white transition-all">
                    <span className="text-lg font-serif">{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <p className="text-[#E5E4E2] font-mono text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">Top Corridors</p>
            <ul className="space-y-4">
              {routeLinks.map((route) => (
                <li key={route}>
                  <Link href="/routes" className="block text-white/60 hover:text-white transition-colors text-sm font-mono">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect CTA */}
          <div className="bg-[#1A1A1A]/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-serif mb-4">Book in seconds.</h4>
              <p className="text-white/40 text-xs leading-relaxed mb-8 font-mono">
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
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-white/30">
          <div className="flex items-center gap-8">
            <p>© {new Date().getFullYear()} {BUSINESS.brand}</p>
            <Link href="/contact" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms</Link>
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
