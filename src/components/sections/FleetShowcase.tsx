'use client';

import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Users, Luggage, Star } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/links';
import { Reveal } from '@/components/motion/Reveal';
import { MotionCard } from '@/components/motion/MotionCard';
import { Card3DTilt } from '@/components/effects/Card3DTilt';
import { MotionButton } from '@/components/motion/MotionButton';
import { SwipeCarousel } from '@/components/motion/SwipeCarousel';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { fleetMedia, type AirportLiveImage, type FleetVehicleMedia } from '@/data/airportlive-media';

const fleetMediaById = new Map(fleetMedia.map((vehicle) => [vehicle.id, vehicle]));

function isImage(image: AirportLiveImage | undefined): image is AirportLiveImage {
  return Boolean(image);
}

type FleetDetail = {
  id: string;
  mediaId?: FleetVehicleMedia["id"];
  name: string;
  tagline: string;
  visual: string;
  seats: string;
  luggage: string;
  bestFor: string;
  comfort: string;
  vehicles: string;
  features: string[];
};

const FLEET_DETAILED = [
  {
    id: 'sedan',
    mediaId: 'premium-sedan',
    name: 'Premium Sedan',
    tagline: 'Executive Comfort',
    visual: 'from-[#2D3E6A] via-[#1A1A1A] to-[#0A0A0A]',
    seats: '4 passengers',
    luggage: '2 large bags',
    bestFor: 'Airport runs, couples, solo business',
    comfort: 'High',
    vehicles: 'Dzire, Aura, Honda City',
    features: ['Leather Interior', 'Climate Control', 'Smooth Highway Ride', 'Professional Driver'],
  },
  {
    id: 'innova-crysta',
    mediaId: 'innova-crysta',
    name: 'Innova Crysta',
    tagline: 'The Corporate Standard',
    visual: 'from-[#4B3827] via-[#1A1A1A] to-[#0A0A0A]',
    seats: '6-7 passengers',
    luggage: '4 large bags',
    bestFor: 'Families, corporate, airport groups',
    comfort: 'Premium+',
    vehicles: 'Toyota Innova Crysta (Captain Seats)',
    features: ['Captain Seats', 'Quiet Cabin', 'Ample Boot Space', 'Rear AC Control'],
  },
  {
    id: 'suv',
    mediaId: 'xl6-suv',
    name: 'XL6 / SUV',
    tagline: 'Family Comfort',
    visual: 'from-[#1E2B4A] via-[#141414] to-[#0A0A0A]',
    seats: '6 passengers',
    luggage: '3 large bags',
    bestFor: 'Small family trips, weekend getaways',
    comfort: 'Premium',
    vehicles: 'Maruti XL6, Ertiga, Kia Carens',
    features: ['Spacious Interior', 'Flexible Seating', 'Luggage Friendly', 'Hybrid Efficiency'],
  },
  {
    id: 'tempo-traveller',
    mediaId: 'tempo-traveller',
    name: 'Tempo Traveller',
    tagline: 'Group Travel Redefined',
    visual: 'from-[#2d2d2d] via-[#1A1A1A] to-[#0A0A0A]',
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
    visual: 'from-[#D98A32]/35 via-[#1A1A1A] to-[#0A0A0A]',
    seats: '4 passengers',
    luggage: '2 large bags',
    bestFor: 'VIP arrivals, high-profile travel',
    comfort: 'Ultra Premium',
    vehicles: 'Fortuner, Endeavour, Mercedes (on request)',
    features: ['Premium Leather', 'Chauffeur-Driven', 'Privacy Partition', 'Luxury Amenities'],
  },
] satisfies FleetDetail[];

function FleetCard({ vehicle }: { vehicle: FleetDetail }) {
  const [expanded, setExpanded] = useState(false);
  const media = vehicle.mediaId ? fleetMediaById.get(vehicle.mediaId) : undefined;
  const detailImages = [media?.interior, media?.luggage].filter(isImage);
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
        <div className="relative h-[220px] overflow-hidden md:h-[260px]">
          {media ? (
            <ResponsiveImage
              {...media.exterior}
              fill
              className="opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${vehicle.visual} transition-transform duration-700 group-hover:scale-[1.04]`} />
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/10" />
              <div className="absolute right-12 top-14 h-16 w-32 rounded-full border border-white/10" />
            </>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(to_top,#0A0A0A,rgba(0,0,0,0.28),transparent)]" />
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
              {detailImages.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {detailImages.map((image) => (
                    <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
                      <ResponsiveImage
                        {...image}
                        fill
                        className="opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    </div>
                  ))}
                </div>
              ) : null}
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
    <section id="fleet" className="relative overflow-hidden bg-[#0A0A0A] pt-12 pb-32 text-white md:py-32" data-cursor="Swipe">
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
