'use client';
import { motion } from 'framer-motion';
import { Plane, MapPin, Briefcase, Users, PartyPopper, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { serviceMedia, type AirportLiveImage } from '@/data/airportlive-media';
import { motionEases } from '@/lib/motion';

const SERVICES = [
  {
    title: 'Airport Pickup',
    desc: 'Flight-aware pickup/drop with clean, luggage-friendly cars.',
    bestFor: 'Delhi, Chandigarh, Amritsar',
    icon: Plane,
    href: '/airport-taxi',
    media: serviceMedia.airportPickup,
  },
  {
    title: 'Outstation Taxi',
    desc: 'Long-route taxi rides across Punjab, Himachal, and Delhi NCR.',
    bestFor: 'Punjab, Himachal, Delhi NCR',
    icon: MapPin,
    href: '/routes',
    media: serviceMedia.outstationTaxi,
  },
  {
    title: 'Corporate Travel',
    desc: 'Airport, meeting, team, and business movement.',
    bestFor: 'GST invoices available',
    icon: Briefcase,
    href: '/corporate-travel',
    media: serviceMedia.corporateTravel,
  },
  {
    title: 'Family Tours',
    desc: 'Spacious cars for family trips, pilgrimages, and weekends.',
    bestFor: 'Custom routes',
    icon: Users,
    href: '/family-tours',
    media: serviceMedia.familyTours,
  },
  {
    title: 'Event Transport',
    desc: 'Weddings, events, guest pickup, and group movement.',
    bestFor: 'Fleet coordination',
    icon: PartyPopper,
    href: '/contact',
    media: serviceMedia.eventTransport,
  },
  {
    title: 'City Rides',
    desc: 'Premium local rides around Ludhiana and nearby.',
    bestFor: 'Ludhiana & nearby',
    icon: Car,
    href: '/contact',
    media: serviceMedia.cityRides,
  },
] satisfies Array<{
  title: string;
  desc: string;
  bestFor: string;
  icon: typeof Plane;
  href: string;
  media: AirportLiveImage;
}>;

function ServiceCard({ service, priority = false }: { service: typeof SERVICES[0]; priority?: boolean }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      data-cursor="Explore"
      className="group relative flex min-h-[206px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0A0A0A] p-4 transition-colors duration-300 hover:border-[#E5E4E2]/35 md:min-h-[286px] md:rounded-[20px] md:p-6"
    >
      <ResponsiveImage
        {...service.media}
        fill
        priority={priority}
        className="opacity-[0.46] grayscale-[25%] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-[0.62] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/72 to-[#0A0A0A]/16" />
      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/35 text-[#E5E4E2] backdrop-blur-md">
            <Icon className="h-4 w-4" />
          </div>
          <ArrowRight className="h-4 w-4 text-white/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#E5E4E2]" />
        </div>

        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#E5E4E2] md:mb-3 md:text-[10px] md:tracking-[0.16em]">
            {service.bestFor}
          </p>
          <h3 className="mb-2 font-serif text-xl leading-none text-white md:mb-3 md:text-3xl">{service.title}</h3>
          <p className="max-w-lg translate-y-0 text-sm leading-snug text-white/76 opacity-100 transition-all duration-500 md:text-[15px] md:leading-relaxed">
            {service.desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#111111] py-10 md:py-20"
      data-services-layout="compact"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-7 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: motionEases.mainEase }}
              className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E5E4E2]"
            >
              Signature Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: motionEases.mainEase }}
              className="font-serif text-3xl leading-tight text-[#F5F5F5] md:text-6xl"
            >
              Everything your airport ride needs.
            </motion.h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/5"
          >
            Plan a ride
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.48, delay: i * 0.04, ease: motionEases.mainEase }}
            >
              <ServiceCard service={service} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
