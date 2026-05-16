'use client';

import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { galleryMedia, type AirportLiveImage } from '@/data/airportlive-media';

const GALLERY_IMAGES = [
  {
    label: 'Clean Interior',
    image: galleryMedia.cleanInterior,
  },
  {
    label: 'Airport Pickup',
    image: galleryMedia.airportPickupProof,
  },
  {
    label: 'Luggage Handled',
    image: galleryMedia.luggageHandled,
  },
  {
    label: 'Fleet Lineup',
    image: galleryMedia.fleetLineup,
  },
  {
    label: 'Family Travel',
    image: galleryMedia.familyTravelProof,
  },
  {
    label: 'Group Transport',
    image: galleryMedia.groupTransportProof,
  },
] satisfies Array<{ label: string; image: AirportLiveImage }>;

export default function Gallery() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] pt-12 pb-28 text-white md:py-24" aria-label="Photo gallery">
      {/* Ambient gold glow */}
      <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#D1D1D1] opacity-[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#FFFFFF] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: motionEases.mainEase }}
              className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold"
            >
              Visual Proof
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              <SplitTextReveal text="Real Cars. Real Drivers. Real Airport Rides." highlight="Real Airport Rides." />
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
              className="text-white/60 max-w-lg font-sans"
            >
              From airport pickups to clean interiors and group travel, every ride is built around comfort, timing, and trust.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: motionEases.mainEase }}
            href="https://wa.me/919888000510?text=Hi%20V3%20Tour%20%26%20Travels%2C%20I%20want%20to%20book%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wider text-sm font-semibold text-white hover:text-[#E5E4E2] transition-colors underline underline-offset-8 flex-shrink-0"
            aria-label="Book a ride on WhatsApp"
          >
            Book Now
          </motion.a>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {GALLERY_IMAGES.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ 
                opacity: 0, 
                clipPath: i % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
              }}
              whileInView={{ 
                opacity: 1, 
                clipPath: 'inset(0 0% 0 0%)',
              }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[4/5] bg-[#2a2a2a] rounded-[16px] overflow-hidden relative group cursor-pointer sm:aspect-square"
              data-cursor="EXPLORE"
            >
              <ResponsiveImage
                {...item.image}
                fill
                className="opacity-74 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
