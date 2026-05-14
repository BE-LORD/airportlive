'use client';

import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Users, Luggage, Star, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/links';
import { Reveal } from '@/components/motion/Reveal';
import { MotionCard } from '@/components/motion/MotionCard';
import { Card3DTilt } from '@/components/effects/Card3DTilt';
import { MotionButton } from '@/components/motion/MotionButton';
import { SwipeCarousel } from '@/components/motion/SwipeCarousel';

const FLEET_DETAILED = [
  {
    id: 'sedan',
    name: 'Premium Sedan',
    tagline: 'Executive Comfort',
    image: 'https://images.unsplash.com/photo-1590362891991-f70287a935be?q=80&w=2070&auto=format&fit=crop',
    seats: '4 passengers',
    luggage: '2 large bags',
    bestFor: 'Airport runs, couples, solo business',
    comfort: 'High',
    vehicles: 'Dzire, Aura, Honda City',
    features: ['Leather Interior', 'Climate Control', 'Smooth Highway Ride', 'Professional Driver'],
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    tagline: 'The Corporate Standard',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    seats: '6-7 passengers',
    luggage: '4 large bags',
    bestFor: 'Families, corporate, airport groups',
    comfort: 'Premium+',
    vehicles: 'Toyota Innova Crysta (Captain Seats)',
    features: ['Captain Seats', 'Quiet Cabin', 'Ample Boot Space', 'Rear AC Control'],
  },
  {
    id: 'suv',
    name: 'XL6 / SUV',
    tagline: 'Family Comfort',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    seats: '6 passengers',
    luggage: '3 large bags',
    bestFor: 'Small family trips, weekend getaways',
    comfort: 'Premium',
    vehicles: 'Maruti XL6, Ertiga, Kia Carens',
    features: ['Spacious Interior', 'Flexible Seating', 'Luggage Friendly', 'Hybrid Efficiency'],
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    tagline: 'Group Travel Redefined',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop',
    seats: '12-16 passengers',
    luggage: '10+ bags',
    bestFor: 'Weddings, events, large groups',
    comfort: 'Spacious',
    vehicles: 'Force Tempo Traveller (AC)',
    features: ['Push-Back Chairs', 'Entertainment System', 'Aisle Space', 'Extra Legroom'],
  },
  {
    id: 'luxury',
    name: 'Luxury / Executive',
    tagline: 'On Special Request',
    image: 'https://images.unsplash.com/photo-1563259837-1473bdab0cf2?q=80&w=2070&auto=format&fit=crop',
    seats: '4 passengers',
    luggage: '2 large bags',
    bestFor: 'VIP arrivals, high-profile travel',
    comfort: 'Ultra Premium',
    vehicles: 'Fortuner, Endeavour, Mercedes (on request)',
    features: ['Premium Leather', 'Chauffeur-Driven', 'Privacy Partition', 'Luxury Amenities'],
  },
];

function FleetCard({ vehicle }: { vehicle: typeof FLEET_DETAILED[0] }) {
  const [expanded, setExpanded] = useState(false);
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ${vehicle.name}.\n\nPickup: \nDrop: \nDate: `;

  return (
    <MotionCard className="h-full overflow-hidden rounded-[24px] border border-white/10 bg-[#0A0A0A] text-white">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="block w-full text-left"
        aria-expanded={expanded}
        aria-label={`Show ${vehicle.name} details`}
      >
        <div className="relative h-[260px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${vehicle.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/35 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="rounded-full bg-[#0A0A0A]/70 backdrop-blur-sm px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#E5E4E2] border border-[#E5E4E2]/20">
              {vehicle.comfort}
            </span>
          </div>
        </div>

        <div className="p-7">
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-[#E5E4E2]">{vehicle.tagline}</p>
          <h3 className="mb-2 text-3xl font-serif text-white">{vehicle.name}</h3>
          <p className="mb-5 text-xs text-white/45">{vehicle.vehicles}</p>

          <div className="grid grid-cols-2 gap-3 border-y border-white/10 py-4">
            <div className="text-sm text-white/70">
              <span className="mb-1 flex items-center gap-2 text-white"><Users className="h-4 w-4 text-[#E5E4E2]" /> Seats</span>
              <span className="text-xs">{vehicle.seats}</span>
            </div>
            <div className="text-sm text-white/70">
              <span className="mb-1 flex items-center gap-2 text-white"><Luggage className="h-4 w-4 text-[#E5E4E2]" /> Luggage</span>
              <span className="text-xs">{vehicle.luggage}</span>
            </div>
            <div className="col-span-2 text-sm text-white/70">
              <span className="mb-1 flex items-center gap-2 text-white"><Star className="h-4 w-4 text-[#E5E4E2]" /> Best For</span>
              <span className="text-xs">{vehicle.bestFor}</span>
            </div>
          </div>

          <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100'}`}>
            <div className="overflow-hidden">
              <ul className="mt-5 space-y-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-xs text-white/70">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#E5E4E2]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </button>

      <div className="px-7 pb-7">
        <MotionButton
          href={getWhatsAppLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          variant="light"
          showArrow
          dataCursor="Book"
          className="w-full"
        >
          Choose {vehicle.name}
        </MotionButton>
      </div>
    </MotionCard>
  );
}

export default function FleetShowcase() {
  return (
    <section id="fleet" className="py-12 md:py-32 bg-[#0A0A0A] text-white overflow-hidden relative" data-cursor="Swipe">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <Reveal className="mb-12" y={24}>
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">
            Swipe to Explore
          </p>
          <h2 className="text-5xl md:text-7xl font-serif mb-6">
            Choose Your <span className="italic text-[#E5E4E2]">Ride</span>
          </h2>
          <p className="max-w-xl text-base md:text-lg text-white/55 font-sans">
            Swipe to explore the fleet. Tap a vehicle to reveal details, then choose your ride on WhatsApp.
          </p>
        </Reveal>
      </div>

      <div className="pl-2 md:pl-[max(1rem,calc((100vw-80rem)/2))]" data-cursor="DRAG">
        <SwipeCarousel
          ariaLabel="Premium fleet carousel"
          viewportClassName="pb-2"
          slideClassName="sm:flex-[0_0_420px] lg:flex-[0_0_420px]"
          showArrows
        >
          {FLEET_DETAILED.map((vehicle) => (
            <Card3DTilt key={vehicle.id} maxTilt={10} scale={1.02} className="h-full">
              <div data-cursor="VIEW" className="h-full">
                <FleetCard vehicle={vehicle} />
              </div>
            </Card3DTilt>
          ))}
        </SwipeCarousel>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
