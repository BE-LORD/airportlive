'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, MapPin, Briefcase, Users, PartyPopper, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card3DTilt } from '@/components/effects/Card3DTilt';

const SERVICES = [
  {
    title: 'Airport Pickup & Drop',
    desc: 'Punctual airport pickup/drop with luggage-friendly cars and WhatsApp confirmation.',
    bestFor: 'Flights, family travel, late-night pickup',
    icon: Plane,
    route: 'Delhi, Chandigarh, Amritsar Airports',
    href: '/airport-taxi',
    colSpan: 'md:col-span-2 lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
  },
  {
    title: 'Outstation Taxi',
    desc: 'Comfortable long-route travel for family, business, and personal journeys across North India.',
    bestFor: 'Intercity travel, hill stations',
    icon: MapPin,
    route: 'Punjab, Himachal, Delhi NCR',
    href: '/routes',
    colSpan: 'md:col-span-1 lg:col-span-1',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
  },
  {
    title: 'Corporate Travel',
    desc: 'Professional travel support for business meetings, airport transfers, and executive movement.',
    bestFor: 'Executives, teams, business events',
    icon: Briefcase,
    route: 'GST invoices available',
    href: '/corporate-travel',
    colSpan: 'md:col-span-1 lg:col-span-1',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Family Tours',
    desc: 'Spacious, clean vehicles for relaxed family travel, planned trips, and pilgrimage journeys.',
    bestFor: 'Weekend getaways, religious trips',
    icon: Users,
    route: 'Customizable routes',
    href: '/family-tours',
    colSpan: 'md:col-span-2 lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Event Transport',
    desc: 'Reliable multi-vehicle coordination for guest pickups, decorated cars, and event logistics.',
    bestFor: 'Weddings, receptions',
    icon: PartyPopper,
    route: 'Multi-city fleet management',
    href: '/contact',
    colSpan: 'md:col-span-2 lg:col-span-1',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
  },
  {
    title: 'Local City Rides',
    desc: 'Premium vehicles for local shopping, meetings, hospital visits, or day-to-day premium travel.',
    bestFor: 'Shopping, daily premium travel',
    icon: Car,
    route: 'Within Ludhiana & nearby',
    href: '/contact',
    colSpan: 'md:col-span-1 lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
  },
];

function BentoCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const Icon = service.icon;

  return (
    <Link 
      href={service.href}
      ref={cardRef}
      data-cursor="Explore"
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0A] flex flex-col justify-end min-h-[360px] md:min-h-[420px] ${service.colSpan} transition-transform duration-500 hover:scale-[0.98]`}
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-[-20%] z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[80%] opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url(${service.image})` }}
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-20 p-8 md:p-10 flex flex-col h-full justify-end">
        <div className="w-12 h-12 rounded-full bg-[#1A1A1A]/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-[#E5E4E2] transition-colors duration-500">
          <Icon className="w-5 h-5 text-white group-hover:text-[#0A0A0A] transition-colors duration-500" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">{service.title}</h3>
        <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed max-w-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {service.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-500 absolute bottom-8 left-8 right-8">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5E4E2] bg-[#E5E4E2]/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#E5E4E2]/20">
            {service.bestFor}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {service.route}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
          >
            Signature Services
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-[#F5F5F5]"
          >
            Crafted for the <br/>
            <span className="italic text-[#E5E4E2]">Modern Traveler</span>
          </motion.h2>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={service.colSpan}
            >
              <Card3DTilt maxTilt={8} scale={1.02} className="h-full">
                <BentoCard service={service} index={i} />
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
