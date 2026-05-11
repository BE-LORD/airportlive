'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLEET } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function FleetShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fleet-img', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-v3-navy text-v3-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {FLEET.map(vehicle => (
          <div key={vehicle.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-v3-gold font-mono uppercase tracking-[0.2em] mb-4 text-sm">{vehicle.tagline}</p>
              <h2 className="text-5xl md:text-7xl font-serif mb-8">{vehicle.name}</h2>
              <ul className="space-y-6 font-sans">
                {vehicle.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 border-b border-v3-cream/10 pb-4">
                    <span className="text-v3-gold font-mono">0{i+1}</span>
                    <span className="text-xl opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 fleet-img h-[50vh] lg:h-[70vh] relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${vehicle.image})` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
