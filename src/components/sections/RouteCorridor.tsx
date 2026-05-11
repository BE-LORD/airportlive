'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS } from '@/lib/constants';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPANDED_ROUTES = [
  { id: 1, from: 'Ludhiana', to: 'Delhi Airport (IGI)', distance: '~310 km', time: '5h 30m', type: 'Airport Transfer', desc: 'Premium non-stop express to Delhi International Airport. Flight tracking included.' },
  { id: 2, from: 'Chandigarh', to: 'Delhi Airport (IGI)', distance: '~250 km', time: '4h 00m', type: 'Airport Transfer', desc: 'Corporate priority route with highway comfort. Popular for business travelers.' },
  { id: 3, from: 'Ludhiana', to: 'Chandigarh Airport (IXC)', distance: '~110 km', time: '2h 00m', type: 'Airport Transfer', desc: 'Quick airport connection with terminal drop-off and luggage assistance.' },
  { id: 4, from: 'Ludhiana', to: 'Amritsar Airport (ATQ)', distance: '~140 km', time: '2h 30m', type: 'Airport Transfer', desc: 'Sri Guru Ram Dass Jee International Airport transfers with punctual service.' },
  { id: 5, from: 'Jalandhar', to: 'Delhi Airport (IGI)', distance: '~370 km', time: '6h 00m', type: 'Airport Transfer', desc: 'Long-haul comfort ride with professional chauffeur and premium vehicle.' },
  { id: 6, from: 'Patiala', to: 'Delhi Airport (IGI)', distance: '~270 km', time: '4h 30m', type: 'Airport Transfer', desc: 'Reliable airport transfer from Patiala with flexible pickup timing.' },
  { id: 7, from: 'Delhi Airport', to: 'Punjab (Any City)', distance: 'Custom', time: 'Express', type: 'Return Transfer', desc: 'Safe arrival home. We pick you up from any terminal — domestic or international.' },
  { id: 8, from: 'Ludhiana', to: 'Manali / Shimla', distance: '~300+ km', time: '6–8h', type: 'Outstation', desc: 'Hill station getaway with experienced mountain drivers and SUV comfort.' },
  { id: 9, from: 'Custom', to: 'Anywhere in North India', distance: 'On Request', time: 'On Request', type: 'Custom Route', desc: 'Weddings, corporate events, family trips — tell us your plan and we handle the rest.' },
];

export default function RouteCorridor() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.route-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="routes" className="py-24 md:py-32 bg-[#F8F7F3] text-[#101010] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Network & Coverage</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Mastering the <span className="italic text-[#B88A44]">Corridor</span></h2>
          <p className="max-w-2xl mx-auto text-lg text-[#6F6B63] font-sans">
            Specialized in Punjab to Delhi Airport route. We don&apos;t just drive; we orchestrate your departure.
          </p>
        </div>

        {/* Route Type Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All Routes', 'Airport Transfer', 'Outstation', 'Custom'].map((tab) => (
            <span key={tab} className="bg-white border border-[#DEDBD2] text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full text-[#6F6B63] cursor-default">
              {tab}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPANDED_ROUTES.map((route) => {
            const fareMsg = encodeURIComponent(
              `Hi ${BUSINESS.name}, I need a fare quote:\n\nFrom: ${route.from}\nTo: ${route.to}\nDate: \nPassengers: `
            );
            return (
              <div
                key={route.id}
                className="route-card group bg-white border border-[#DEDBD2] rounded-[20px] p-6 md:p-8 hover:border-[#B88A44]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col"
              >
                {/* Route type badge */}
                <span className="inline-block self-start bg-[#EFEEE8] text-[#6F6B63] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  {route.type}
                </span>

                {/* Route names */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-[#B88A44]" />
                    <span className="font-serif text-xl text-[#101010]">{route.from}</span>
                  </div>
                  <div className="ml-1.5 border-l-2 border-dashed border-[#DEDBD2] h-4" />
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#101010]" />
                    <span className="font-serif text-xl text-[#101010]">{route.to}</span>
                  </div>
                </div>

                {/* Distance & Time */}
                <div className="flex gap-6 mb-4 text-sm text-[#6F6B63]">
                  <span className="flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3" /> {route.distance}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {route.time}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#6F6B63] text-sm mb-6 flex-grow">{route.desc}</p>

                {/* CTA */}
                <a
                  href={`https://wa.me/91${BUSINESS.whatsapp}?text=${fareMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#101010] group-hover:text-[#B88A44] transition-colors"
                >
                  Get Fare Quote <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
