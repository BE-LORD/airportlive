'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { Users, Luggage, Star, ArrowRight } from 'lucide-react';

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

// 3D Tilt Card Component
function FleetCard({ vehicle }: { vehicle: typeof FLEET_DETAILED[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi ${BUSINESS.name}, I want to book a ${vehicle.name}.\n\nPickup: \nDrop: \nDate: `
  );

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-w-[320px] md:min-w-[400px] bg-[#101010] border border-white/10 rounded-[24px] overflow-hidden group cursor-grab active:cursor-grabbing flex flex-col"
    >
      {/* Image Parallax Container */}
      <div 
        className="h-[280px] relative overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        <motion.div
          className="absolute inset-[-10%] bg-cover bg-center"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundImage: `url(${vehicle.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6" style={{ transform: "translateZ(40px)" }}>
          <span className="bg-[#B88A44] text-white text-[10px] font-mono uppercase tracking-wider px-4 py-1.5 rounded-full">
            {vehicle.comfort}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col relative z-10" style={{ transform: "translateZ(20px)" }}>
        <p className="text-[#B88A44] font-mono text-xs uppercase tracking-widest mb-2">{vehicle.tagline}</p>
        <h3 className="text-3xl font-serif mb-2 text-white">{vehicle.name}</h3>
        <p className="text-xs text-white/40 mb-6 font-mono">{vehicle.vehicles}</p>

        {/* Specs Reveal (Hidden by default, expands on hover) */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden mb-6"
        >
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
            <div className="flex flex-col gap-1 text-sm text-white/70">
              <span className="flex items-center gap-2 text-white"><Users className="h-4 w-4 text-[#B88A44]" /> Seats</span>
              <span className="text-xs">{vehicle.seats}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-white/70">
              <span className="flex items-center gap-2 text-white"><Luggage className="h-4 w-4 text-[#B88A44]" /> Luggage</span>
              <span className="text-xs">{vehicle.luggage}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-white/70 col-span-2">
              <span className="flex items-center gap-2 text-white"><Star className="h-4 w-4 text-[#B88A44]" /> Best For</span>
              <span className="text-xs">{vehicle.bestFor}</span>
            </div>
          </div>
          
          <ul className="space-y-2 mt-4">
            {vehicle.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-white/70">
                <span className="w-1 h-1 bg-[#B88A44] rounded-full flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Book"
            className="w-full flex items-center justify-between bg-white/5 hover:bg-[#B88A44] border border-white/10 hover:border-transparent text-white py-4 px-6 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Choose {vehicle.name} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FleetShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // We use Framer Motion's drag to make it natively interactive without react-use-gesture
  return (
    <section ref={containerRef} id="fleet" className="py-32 bg-[#171717] text-white overflow-hidden relative" data-cursor="Drag">
      <div className="max-w-7xl mx-auto px-4 relative z-10 pointer-events-none">
        <div className="mb-12">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
          >
            100+ Vehicles Network
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Choose Your <span className="italic text-[#B88A44]">Ride</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl text-lg text-white/50 font-sans"
          >
            Drag to explore our premium fleet. Hover over any vehicle to reveal specifications.
          </motion.p>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div className="pl-4 md:pl-0 md:ml-[calc((100vw-80rem)/2)] pb-12 cursor-grab active:cursor-grabbing">
        <motion.div 
          ref={carouselRef}
          className="flex gap-6 pr-8"
          drag="x"
          dragConstraints={{ right: 0, left: -1800 }} // We will rely on approximate width for drag constraints
          whileTap={{ cursor: "grabbing" }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {FLEET_DETAILED.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
          {/* Spacer for right edge */}
          <div className="min-w-[1px] md:min-w-[40px]" />
        </motion.div>
      </div>
    </section>
  );
}
