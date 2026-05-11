'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROUTES } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function RouteCorridor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.route-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
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
    <section ref={sectionRef} className="py-32 bg-v3-cream text-v3-navy px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Mastering the <span className="italic text-v3-gold">Corridor</span></h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80 font-sans">
            Specialized in the Punjab to Delhi Airport route. We don't just drive; we orchestrate your departure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROUTES.map((route, i) => (
            <div key={route.id} className="route-card group border border-v3-navy/10 p-10 hover:bg-v3-navy hover:text-v3-cream transition-colors duration-500 flex flex-col h-full">
              <div className="text-v3-gold font-mono text-sm mb-8">0{i + 1} // {route.time}</div>
              <h3 className="text-3xl font-serif mb-4 group-hover:text-v3-gold transition-colors">{route.from} <br/><span className="italic opacity-70 text-xl">to</span> <br/>{route.to}</h3>
              <p className="mt-auto pt-8 font-sans opacity-70 group-hover:opacity-100">{route.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
