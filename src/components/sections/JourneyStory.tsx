'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { journeyMedia, proofMedia, type AirportLiveImage } from '@/data/airportlive-media';
import { MotionButton } from '@/components/motion/MotionButton';
import { getWhatsAppLink } from '@/lib/links';
import { motionEases } from '@/lib/motion';

const journeyBeats: Array<{
  label: string;
  copy: string;
  image: AirportLiveImage;
}> = [
  {
    label: 'Booking confirmed',
    copy: 'Trip details are confirmed on WhatsApp with a clear fare and pickup time.',
    image: journeyMedia.bookingConfirmed,
  },
  {
    label: 'Driver assigned',
    copy: 'A professional chauffeur is assigned before your airport movement begins.',
    image: journeyMedia.driverAssigned,
  },
  {
    label: 'Luggage handled',
    copy: 'Bags are handled carefully so the family can settle in without stress.',
    image: proofMedia.luggageLoading,
  },
  {
    label: 'Quiet highway ride',
    copy: 'Clean cabins, calm driving, and a route rhythm built around flight timing.',
    image: journeyMedia.cabinComfort,
  },
  {
    label: 'On-time airport drop',
    copy: 'Your cab reaches the terminal with the right margin for check-in and luggage.',
    image: journeyMedia.airportArrival,
  },
];

export default function JourneyStory() {
  const whatsappMsg = 'Hi V3 Tour & Travels, I want to plan my airport ride.';

  return (
    <section className="relative bg-[#0A0A0A] py-14 text-white md:py-24" aria-label="Airport transfer journey">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-3xl md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E5E4E2]"
          >
            Journey Proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: motionEases.mainEase }}
            className="font-serif text-4xl leading-tight text-[#F5F5F5] md:text-6xl"
          >
            From Booking to Airport, Handled.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: motionEases.mainEase }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/62 md:text-lg"
          >
            A simple WhatsApp booking, a professional chauffeur, clean luggage handling, and a calm airport ride — all handled before you reach the terminal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-visible touch-pan-y overscroll-auto md:grid-cols-5">
          {journeyBeats.map((beat, index) => (
            <motion.article
              key={beat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.52, delay: index * 0.06, ease: motionEases.mainEase }}
              className="min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#111111]"
            >
              <div className="relative aspect-[16/10] bg-[#151515] md:aspect-[4/5]">
                <ResponsiveImage
                  {...beat.image}
                  fill
                  className="opacity-82"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-[#E5E4E2]/25 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E5E4E2] backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl text-white">{beat.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{beat.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
          className="mt-10 flex justify-center"
        >
          <MotionButton
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            icon={<MessageCircle className="h-4 w-4 text-[#25D366]" />}
            showArrow
            ariaLabel="Plan my airport ride on WhatsApp"
          >
            Plan My Airport Ride
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
}
