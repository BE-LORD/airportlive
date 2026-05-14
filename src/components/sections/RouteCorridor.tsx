'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { Clock, ArrowRight, Plane } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';

const ROUTES = [
  { 
    id: 1, 
    from: 'Ludhiana', 
    to: 'Delhi Airport (DEL)', 
    distance: '310 km', 
    time: '5.5h', 
    visual: 'from-[#1E2B4A] via-[#111111] to-[#0A0A0A]',
    tag: 'Popular',
    desc: 'The executive lifeline. Terminal drop-off at T3, T2, or T1. Flight-synced scheduling.'
  },
  { 
    id: 2, 
    from: 'Chandigarh', 
    to: 'Delhi Airport (DEL)', 
    distance: '250 km', 
    time: '4h', 
    visual: 'from-[#2D3E6A] via-[#111111] to-[#0A0A0A]',
    tag: 'Corporate',
    desc: 'Express highway transit for business professionals. Quiet cabins and professional chauffeurs.'
  },
  { 
    id: 3, 
    from: 'Jalandhar', 
    to: 'Delhi Airport (DEL)', 
    distance: '370 km', 
    time: '6.5h', 
    visual: 'from-[#4B3827] via-[#111111] to-[#0A0A0A]',
    tag: 'NRI Priority',
    desc: 'The preferred route for NRI families. Spacious vehicles and reliable, safe highway transit.'
  },
  { 
    id: 4, 
    from: 'Patiala', 
    to: 'Delhi Airport (DEL)', 
    distance: '260 km', 
    time: '4.5h', 
    visual: 'from-[#2d2d2d] via-[#111111] to-[#0A0A0A]',
    tag: 'Airport',
    desc: 'Direct connection from the Royal City of Patiala to IGI Airport. Punctual and comfortable.'
  },
  { 
    id: 5, 
    from: 'Ludhiana', 
    to: 'Chandigarh (IXC)', 
    distance: '110 km', 
    time: '2h', 
    visual: 'from-[#D98A32]/35 via-[#111111] to-[#0A0A0A]',
    tag: 'Regional',
    desc: 'Swift airport connections from Ludhiana to Mohali/Chandigarh Airport. Stress-free transfers.'
  }
];

function RouteRow({ route }: { route: typeof ROUTES[0] }) {
  const corridorRef = useRef<HTMLDivElement>(null);
  const fareMsg = `Hi ${BUSINESS.name}, I need a quote for ${route.from} to ${route.to}.`;

  return (
    <div 
      ref={corridorRef}
      className="relative min-h-[500px] md:h-[80svh] w-full overflow-hidden flex items-center justify-center group"
      aria-label={`Route corridor showcasing ${route.from} to ${route.to}`}
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 md:inset-[-20%] z-0"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${route.visual} transition-all duration-1000 ease-in-out`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,transparent_0%,rgba(229,228,226,0.08)_45%,transparent_46%)]" />
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="bg-[#E5E4E2] text-[#0A0A0A] text-[10px] font-mono uppercase tracking-[0.3em] px-6 py-2 rounded-full mb-6 inline-block">
            {route.tag}
          </span>
        </motion.div>

        <h3 className="text-3xl sm:text-4xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
          <span className="block opacity-60 group-hover:opacity-100 transition-opacity duration-700 drop-shadow-md">{route.from}</span>
          <span className="italic text-[#E5E4E2] px-4 drop-shadow-md">to</span>
          <span className="block drop-shadow-md">{route.to}</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white/70 font-mono text-sm md:text-lg mb-10">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#E5E4E2]" /> {route.time}
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[#E5E4E2]" /> {route.distance}
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#E5E4E2]" /> Terminal Drop
          </div>
        </div>

        <p className="text-white/70 md:text-white/50 text-sm md:text-lg max-w-2xl mx-auto mb-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 md:translate-y-4 md:group-hover:translate-y-0">
          {route.desc}
        </p>

        <motion.a
          href={getWhatsAppLink(fareMsg)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Book"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 bg-[#1A1A1A] text-[#F5F5F5] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-bold transition-colors hover:bg-[#E5E4E2] hover:text-white"
        >
          Request Fare Quote <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function RouteCorridor({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="routes" className="bg-[#0A0A0A] py-0 overflow-hidden">
      {!hideHeader && (
        <div className="py-12 md:py-32 px-4 text-center border-b border-white/5">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#E5E4E2] uppercase tracking-[0.3em] text-xs font-mono mb-6"
          >
            The Transit Network
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif text-white"
          >
            Mastering the <span className="italic text-[#E5E4E2]">Corridor</span>
          </motion.h2>
        </div>
      )}

      <div className="relative">
        {ROUTES.map((route) => (
          <RouteRow key={route.id} route={route} />
        ))}
      </div>

      {/* Bottom CTA to all routes */}
      <div className="py-32 bg-[#0A0A0A] text-center">
        <h4 className="text-3xl md:text-5xl font-serif text-[#F5F5F5] mb-8">Traveling elsewhere?</h4>
        <p className="text-[#A3A3A3] mb-12 max-w-xl mx-auto px-4">
          We cover all of North India including Shimla, Manali, Jaipur, and beyond. Custom travel plans available on request.
        </p>
        <a 
          href={getPhoneLink()}
          className="inline-block bg-[#E5E4E2] text-[#0A0A0A] px-10 py-5 rounded-full text-sm font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#D1D1D1] transition-colors"
        >
          Custom Inquiry
        </a>
      </div>
    </section>
  );
}
