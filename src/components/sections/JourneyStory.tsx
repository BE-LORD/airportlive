'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, Luggage, MessageCircle, ShieldCheck } from 'lucide-react';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { journeyMedia, proofMedia } from '@/data/airportlive-media';
import { MotionButton } from '@/components/motion/MotionButton';
import { getWhatsAppLink } from '@/lib/links';
import { motionEases } from '@/lib/motion';

const journeyBeats = [
  {
    label: 'WhatsApp quote',
    copy: 'Route, fare, and pickup window confirmed by a real coordinator.',
    icon: MessageCircle,
  },
  {
    label: 'Driver assigned',
    copy: 'Driver details arrive before pickup, with enough airport timing buffer.',
    icon: ShieldCheck,
  },
  {
    label: 'Luggage handled',
    copy: 'Clean vehicle, careful loading, and cabin space matched to your group.',
    icon: Luggage,
  },
  {
    label: 'On-time arrival',
    copy: 'A calm highway ride planned around terminal, luggage, and check-in time.',
    icon: Clock3,
  },
];

export default function JourneyStory() {
  const whatsappMsg = 'Hi V3 Tour & Travels, I want to plan my airport ride.';

  return (
    <section className="relative bg-[#0A0A0A] py-12 text-white md:py-20" aria-label="Airport transfer journey">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 overflow-visible px-4 touch-pan-y overscroll-auto lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: motionEases.mainEase }}
          className="relative min-h-[280px] overflow-hidden rounded-[22px] border border-white/10 bg-[#111111] md:min-h-[520px]"
        >
          <ResponsiveImage
            {...journeyMedia.driverAssigned}
            fill
            className="opacity-82"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/42 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5E4E2]">Handled end to end</p>
            <h2 className="max-w-lg font-serif text-3xl leading-tight text-white md:text-6xl">
              From booking to terminal, no chaos in between.
            </h2>
          </div>
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: motionEases.mainEase }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E5E4E2]"
          >
            Journey Proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: motionEases.mainEase }}
            className="max-w-2xl font-serif text-3xl leading-tight text-[#F5F5F5] md:text-6xl"
          >
            Airport transfers that stay calm.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: motionEases.mainEase }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg"
          >
            One message starts the booking, and every detail after that is handled with timing, care, and clear coordination.
          </motion.p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {journeyBeats.map((beat, index) => {
              const Icon = beat.icon;
              return (
                <motion.article
                  key={beat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.44, delay: index * 0.04, ease: motionEases.mainEase }}
                  className="rounded-[16px] border border-white/10 bg-[#111111] p-4 md:rounded-[18px] md:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E4E2]/10 text-[#E5E4E2]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-[#E5E4E2]/75" />
                  </div>
                  <h3 className="font-serif text-xl text-white md:text-2xl">{beat.label}</h3>
                  <p className="mt-2 text-sm leading-snug text-white/62 md:leading-relaxed">{beat.copy}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-[88px_1fr] gap-4 rounded-[18px] border border-white/10 bg-[#111111] p-3">
            <div className="relative min-h-28 overflow-hidden rounded-[14px] bg-[#151515]">
              <ResponsiveImage
                {...proofMedia.luggageLoading}
                fill
                className="opacity-86"
              />
            </div>
            <div className="py-2 pr-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E5E4E2]">Real ride proof</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Luggage, clean cabin, and airport timing are visible service details, not hidden claims.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12, ease: motionEases.mainEase }}
            className="mt-7"
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
      </div>
    </section>
  );
}
