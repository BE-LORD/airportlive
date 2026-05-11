'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS } from '@/lib/constants';
import { Users, Luggage, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FLEET_DETAILED = [
  {
    id: 'sedan',
    name: 'Premium Sedan',
    tagline: 'Executive Comfort',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2070&auto=format&fit=crop',
    seats: '4 passengers',
    luggage: '2 large + 1 cabin bag',
    bestFor: 'Airport runs, couples, solo business',
    comfort: 'Premium',
    airport: true,
    outstation: true,
    vehicles: 'Dzire, Aura, Honda City',
    features: ['Leather Interior', 'Climate Control', 'Smooth Highway Ride'],
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    tagline: 'The Corporate Standard',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    seats: '6–7 passengers',
    luggage: '4 large + cabin bags',
    bestFor: 'Families, corporate, airport groups',
    comfort: 'Premium+',
    airport: true,
    outstation: true,
    vehicles: 'Innova Crysta (Captain Seats)',
    features: ['Captain Seats', 'Quiet Cabin', 'Ample Boot Space'],
  },
  {
    id: 'suv',
    name: 'XL6 / SUV',
    tagline: 'Family Comfort',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070&auto=format&fit=crop',
    seats: '6 passengers',
    luggage: '3 large + cabin bags',
    bestFor: 'Family trips, weekend getaways',
    comfort: 'Premium',
    airport: true,
    outstation: true,
    vehicles: 'Maruti XL6, Ertiga, Kia Carens',
    features: ['Spacious Interior', 'Flexible Seating', 'Luggage Friendly'],
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    tagline: 'Group Travel Redefined',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop',
    seats: '12–16 passengers',
    luggage: '8+ bags',
    bestFor: 'Weddings, events, group travel',
    comfort: 'Comfortable',
    airport: false,
    outstation: true,
    vehicles: 'Force Tempo Traveller (AC)',
    features: ['Push-Back Chairs', 'Entertainment System', 'Aisle Space'],
  },
  {
    id: 'luxury',
    name: 'Luxury / Executive',
    tagline: 'On Special Request',
    image: 'https://images.unsplash.com/photo-1563259837-1473bdab0cf2?q=80&w=2070&auto=format&fit=crop',
    seats: '4 passengers',
    luggage: '2 large + cabin bags',
    bestFor: 'VIP arrivals, high-profile travel',
    comfort: 'Ultra Premium',
    airport: true,
    outstation: true,
    vehicles: 'Fortuner, Endeavour, Mercedes (on request)',
    features: ['Premium Leather', 'Chauffeur-Driven', 'Privacy Partition'],
  },
];

export default function FleetShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fleet-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whatsappMsg = (vehicleName: string) =>
    encodeURIComponent(`Hi ${BUSINESS.name}, I want to book a ${vehicleName}.\n\nPickup: \nDrop: \nDate: `);

  return (
    <section ref={sectionRef} id="fleet" className="py-24 md:py-32 bg-[#171717] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">100+ Vehicles Network</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Choose Your <span className="italic text-[#B88A44]">Ride</span></h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60 font-sans">
            Every vehicle is selected for the trip it serves best. Compare comfort, capacity, and suitability.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_DETAILED.map((vehicle) => (
            <div
              key={vehicle.id}
              className="fleet-card bg-white/5 border border-white/10 rounded-[20px] overflow-hidden hover:border-[#B88A44]/30 transition-all duration-500 group flex flex-col"
            >
              {/* Image */}
              <div className="h-48 md:h-56 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${vehicle.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#B88A44] text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                    {vehicle.comfort}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-[#B88A44] font-mono text-xs uppercase tracking-widest mb-1">{vehicle.tagline}</p>
                <h3 className="text-2xl font-serif mb-4">{vehicle.name}</h3>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Users className="h-3.5 w-3.5 text-[#B88A44]" />
                    {vehicle.seats}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Luggage className="h-3.5 w-3.5 text-[#B88A44]" />
                    {vehicle.luggage}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Star className="h-3.5 w-3.5 text-[#B88A44]" />
                    {vehicle.bestFor}
                  </div>
                </div>

                {/* Suitability */}
                <div className="flex gap-2 mb-4">
                  {vehicle.airport && (
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full uppercase tracking-wider">Airport ✓</span>
                  )}
                  {vehicle.outstation && (
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full uppercase tracking-wider">Outstation ✓</span>
                  )}
                </div>

                {/* Vehicles */}
                <p className="text-xs text-white/40 mb-6 font-mono">{vehicle.vehicles}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {vehicle.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="w-1 h-1 bg-[#B88A44] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg(vehicle.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#B88A44] text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors"
                >
                  Choose {vehicle.name} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
