'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { Clock, ArrowRight, Plane, MapPin, Phone } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { routeMedia } from '@/data/airportlive-media';
import { motionEases } from '@/lib/motion';

const ROUTES = [
  {
    id: 1,
    from: 'Ludhiana',
    to: 'Delhi Airport (DEL)',
    distance: '310 km',
    time: '5.5h',
    visual: 'from-[#1E2B4A] via-[#111111] to-[#0A0A0A]',
    tag: 'Popular',
    desc: 'Terminal drop-off at T3, T2, or T1 with flight-synced scheduling.',
  },
  {
    id: 2,
    from: 'Chandigarh',
    to: 'Delhi Airport (DEL)',
    distance: '250 km',
    time: '4h',
    visual: 'from-[#2D3E6A] via-[#111111] to-[#0A0A0A]',
    tag: 'Corporate',
    desc: 'Express highway transit for business professionals and family travelers.',
  },
  {
    id: 3,
    from: 'Jalandhar',
    to: 'Delhi Airport (DEL)',
    distance: '370 km',
    time: '6.5h',
    visual: 'from-[#4B3827] via-[#111111] to-[#0A0A0A]',
    tag: 'NRI Priority',
    desc: 'Spacious vehicles and reliable long-distance airport timing.',
  },
  {
    id: 4,
    from: 'Patiala',
    to: 'Delhi Airport (DEL)',
    distance: '260 km',
    time: '4.5h',
    visual: 'from-[#2d2d2d] via-[#111111] to-[#0A0A0A]',
    tag: 'Airport',
    desc: 'Direct connection from Patiala to IGI Airport with comfortable cabins.',
  },
  {
    id: 5,
    from: 'Ludhiana',
    to: 'Chandigarh (IXC)',
    distance: '110 km',
    time: '2h',
    visual: 'from-[#D98A32]/35 via-[#111111] to-[#0A0A0A]',
    tag: 'Regional',
    desc: 'Swift airport connections from Ludhiana to Mohali and Chandigarh Airport.',
  },
];

type Route = typeof ROUTES[0];

function RouteRow({ route }: { route: Route }) {
  const corridorRef = useRef<HTMLDivElement>(null);
  const fareMsg = `Hi ${BUSINESS.name}, I need a quote for ${route.from} to ${route.to}.`;
  const featuredRoute = route.id === 1;

  return (
    <div
      ref={corridorRef}
      className="relative min-h-[500px] md:h-[80svh] w-full overflow-hidden flex items-center justify-center group"
      aria-label={`Route corridor showcasing ${route.from} to ${route.to}`}
    >
      <div className="absolute inset-0 md:inset-[-20%] z-0">
        {featuredRoute ? (
          <ResponsiveImage
            {...routeMedia.ludhianaDelhiAirport}
            fill
            className="opacity-70 transition-transform duration-1000 ease-in-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${route.visual} transition-all duration-1000 ease-in-out`} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,transparent_0%,rgba(229,228,226,0.08)_45%,transparent_46%)]" />
        <div className="absolute inset-0 bg-black/76 group-hover:bg-black/66 transition-colors duration-1000" />
      </div>

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="mb-6 inline-block rounded-full bg-[#E5E4E2] px-6 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#0A0A0A]">
            {route.tag}
          </span>
        </motion.div>

        <h3 className="mb-6 font-serif text-3xl leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-8xl">
          <span className="block opacity-60 drop-shadow-md transition-opacity duration-700 group-hover:opacity-100">{route.from}</span>
          <span className="px-4 italic text-[#E5E4E2] drop-shadow-md">to</span>
          <span className="block drop-shadow-md">{route.to}</span>
        </h3>

        <div className="mb-10 flex flex-wrap justify-center gap-8 font-mono text-sm text-white/70 md:gap-12 md:text-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#E5E4E2]" /> {route.time}
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-[#E5E4E2]" /> {route.distance}
          </div>
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-[#E5E4E2]" /> Terminal Drop
          </div>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-sm text-white/70 opacity-100 transition-all duration-700 md:translate-y-4 md:text-lg md:text-white/50 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {route.desc}
        </p>

        <motion.a
          href={getWhatsAppLink(fareMsg)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Book"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 rounded-full bg-[#1A1A1A] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F5] transition-colors hover:bg-[#E5E4E2] hover:text-[#0A0A0A]"
        >
          Request Fare Quote <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function CompactRoutePlanner() {
  const featured = ROUTES[0];
  const routeRows = ROUTES.slice(0, 3);

  return (
    <section
      id="routes"
      className="relative overflow-hidden bg-[#0A0A0A] py-12 text-white md:py-20"
      data-route-corridor-variant="compact"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: motionEases.mainEase }}
          className="relative min-h-[310px] overflow-hidden rounded-[22px] border border-white/10 bg-[#111111] p-5 md:min-h-[520px] md:rounded-[24px] md:p-8"
        >
          <ResponsiveImage
            {...routeMedia.ludhianaDelhiAirport}
            fill
            sizes="(max-width: 1024px) 92vw, 48vw"
            className="opacity-58"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/68 to-[#0A0A0A]/8" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#E5E4E2]">
                Most-booked airport routes
              </p>
              <h2 className="max-w-xl font-serif text-3xl leading-tight text-white md:text-6xl">
                Punjab to airport corridors, ready on WhatsApp.
              </h2>
            </div>
            <div>
              <div className="mb-5 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-center">
                <div>
                  <p className="font-serif text-2xl text-white">5.5h</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">{featured.from}</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-white">310</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">km</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-white">24/7</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">booking</p>
                </div>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-white/72">
                Fixed-fare airport transfers for Delhi, Chandigarh, and nearby airport drops. Route, vehicle, and pickup timing are confirmed directly by our team.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="rounded-[24px] border border-white/10 bg-[#111111] p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5E4E2]">Fare-ready routes</p>
              <p className="mt-1 text-sm text-white/58">Tap a route for a WhatsApp quote.</p>
            </div>
            <Link
              href="/routes"
              className="hidden min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/5 sm:inline-flex"
            >
              See all routes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3">
            {routeRows.map((route, index) => {
              const fareMsg = `Hi ${BUSINESS.name}, I need a quote for ${route.from} to ${route.to}.`;
              return (
                <motion.a
                  key={route.id}
                  href={getWhatsAppLink(fareMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: motionEases.mainEase }}
                  className="group grid gap-3 rounded-[16px] border border-white/8 bg-[#0A0A0A] p-4 transition-colors hover:border-[#E5E4E2]/30 md:grid-cols-[1fr_auto] md:items-center md:rounded-[18px] md:p-5"
                >
                  <div>
                    <span className="mb-3 inline-flex rounded-full border border-[#E5E4E2]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E5E4E2]">
                      {route.tag}
                    </span>
                    <h3 className="font-serif text-xl leading-tight text-white md:text-3xl">
                      {route.from} <span className="italic text-[#E5E4E2]">to</span> {route.to}
                    </h3>
                    <p className="mt-2 text-sm leading-snug text-white/62 md:leading-relaxed">{route.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/68 md:flex-col md:items-end">
                    <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#E5E4E2]" />{route.time}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#E5E4E2]" />{route.distance}</span>
                    <span className="inline-flex items-center gap-2 text-[#E5E4E2]">Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 sm:hidden">
            <Link
              href="/routes"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
            >
              See all routes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={getPhoneLink()}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E5E4E2] px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]"
            >
              <Phone className="h-3.5 w-3.5" /> Custom inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type RouteCorridorProps = {
  hideHeader?: boolean;
  variant?: 'immersive' | 'compact';
};

export default function RouteCorridor({ hideHeader = false, variant = 'immersive' }: RouteCorridorProps) {
  if (variant === 'compact') {
    return <CompactRoutePlanner />;
  }

  return (
    <section id="routes" className="overflow-hidden bg-[#0A0A0A] py-0">
      {!hideHeader && (
        <div className="border-b border-white/5 px-4 py-12 text-center md:py-32">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#E5E4E2]"
          >
            The Transit Network
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl text-white md:text-8xl"
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

      <div className="bg-[#0A0A0A] py-32 text-center">
        <h4 className="mb-8 font-serif text-3xl text-[#F5F5F5] md:text-5xl">Traveling elsewhere?</h4>
        <p className="mx-auto mb-12 max-w-xl px-4 text-[#A3A3A3]">
          We cover all of North India including Shimla, Manali, Jaipur, and beyond. Custom travel plans available on request.
        </p>
        <a
          href={getPhoneLink()}
          className="inline-block rounded-full bg-[#E5E4E2] px-10 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#0A0A0A] transition-colors hover:bg-[#D1D1D1]"
        >
          Custom Inquiry
        </a>
      </div>
    </section>
  );
}
