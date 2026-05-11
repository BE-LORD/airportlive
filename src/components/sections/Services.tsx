'use client';
import { Plane, MapPin, Briefcase, Users, PartyPopper, Car, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    title: 'Airport Pickup & Drop',
    desc: 'Punctual airport pickup/drop with luggage-friendly cars and WhatsApp confirmation.',
    bestFor: 'Flights, family travel, late-night pickup',
    icon: Plane,
    route: 'Delhi, Chandigarh, Amritsar Airports',
    href: '/airport-taxi',
  },
  {
    title: 'Outstation Taxi',
    desc: 'Comfortable long-route travel for family, business, and personal journeys across North India.',
    bestFor: 'Intercity travel, hill stations, pilgrimages',
    icon: MapPin,
    route: 'Punjab, Himachal, Delhi NCR',
    href: '/routes',
  },
  {
    title: 'Corporate Travel',
    desc: 'Professional travel support for business meetings, airport transfers, and executive movement.',
    bestFor: 'Executives, teams, business events',
    icon: Briefcase,
    route: 'GST invoices available',
    href: '/contact',
  },
  {
    title: 'Family Tours',
    desc: 'Spacious, clean vehicles for relaxed family travel, planned trips, and pilgrimage journeys.',
    bestFor: 'Weekend getaways, religious trips, family visits',
    icon: Users,
    route: 'Customizable routes',
    href: '/fleet',
  },
  {
    title: 'Wedding & Event Transport',
    desc: 'Reliable multi-vehicle coordination for guest pickups, decorated cars, and event logistics.',
    bestFor: 'Weddings, receptions, guest coordination',
    icon: PartyPopper,
    route: 'Multi-city fleet management',
    href: '/contact',
  },
  {
    title: 'Local City Rides',
    desc: 'Premium vehicles for local shopping, meetings, hospital visits, or day-to-day premium travel.',
    bestFor: 'Shopping, meetings, daily premium travel',
    icon: Car,
    route: 'Within Ludhiana & nearby',
    href: '/contact',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Signature Services</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010]">Crafted for the Modern Traveler</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 md:p-8 rounded-[20px] border border-[#DEDBD2] hover:border-[#B88A44]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFEEE8] group-hover:bg-[#B88A44]/10 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-[#B88A44]" />
                </div>
                <h3 className="text-xl font-serif text-[#101010] mb-3">{service.title}</h3>
                <p className="text-[#6F6B63] text-sm mb-4 leading-relaxed">{service.desc}</p>

                {/* Best For */}
                <div className="bg-[#EFEEE8] rounded-xl px-4 py-3 mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6F6B63] mb-1">Best for</p>
                  <p className="text-sm text-[#101010] font-medium">{service.bestFor}</p>
                </div>

                {/* Route hint */}
                <p className="text-xs text-[#6F6B63]/60 font-mono uppercase tracking-wider mb-6">{service.route}</p>

                {/* CTA */}
                <a
                  href={service.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#101010] group-hover:text-[#B88A44] transition-colors"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
