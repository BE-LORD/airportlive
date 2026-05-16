"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import ContactBookingForm from '@/components/sections/ContactBookingForm';
import { BUSINESS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { pageHeroMedia } from '@/data/airportlive-media';

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[68svh] overflow-hidden bg-[#0A0A0A] pt-32 pb-16 text-white md:min-h-[74svh] md:pt-40 md:pb-20" aria-label="Contact page hero">
        <div className="absolute inset-0" aria-hidden="true">
          <ResponsiveImage
            {...pageHeroMedia.contact}
            fill
            className="opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/72 to-[#0A0A0A]/35" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#E5E4E2] uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs font-mono mb-6 font-bold"
          >
            Get In Touch
          </motion.p>
          <h1 className="mx-auto mb-6 max-w-[10ch] text-[clamp(3rem,13vw,5.8rem)] font-serif leading-[0.9] md:max-w-none md:text-7xl">
            <SplitTextReveal text="Contact Us" highlight="Us" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-white/72 max-w-2xl mx-auto text-base leading-relaxed md:text-lg mb-8"
          >
            We are available 24/7 for bookings, quotes, and travel assistance. Connect with our dispatch team instantly.
          </motion.p>
          <div className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
            <a
              href={getWhatsAppLink("Hi V3 Tour & Travels, I need booking assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center rounded-full bg-[#E5E4E2] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0A0A0A] transition-colors hover:bg-white"
            >
              WhatsApp Now
            </a>
            <a
              href={getPhoneLink()}
              className="flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-16 bg-[#1A1A1A]" aria-label="Contact information">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'WhatsApp', text: `+91 ${BUSINESS.whatsapp}`, href: getWhatsAppLink("Hi V3 Tour & Travels, I have an inquiry."), desc: 'Fastest response' },
              { title: 'Call Center', text: `+91 ${BUSINESS.phone}`, href: getPhoneLink(), desc: 'Standard call rates apply' },
              { title: 'Email', text: BUSINESS.email, href: `mailto:${BUSINESS.email}`, desc: 'For corporate queries' },
              { title: 'Location', text: BUSINESS.address, href: null, desc: 'By appointment only' }
            ].map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: motionEases.softEase }}
                className="rounded-[18px] border border-white/10 p-5 text-center transition-shadow hover:shadow-lg md:p-6"
              >
                <h3 className="font-bold text-[#F5F5F5] mb-2 uppercase text-[10px] tracking-widest font-mono">{info.title}</h3>
                {info.href ? (
                  <a href={info.href} target={info.title === 'WhatsApp' ? '_blank' : '_self'} rel={info.title === 'WhatsApp' ? 'noopener noreferrer' : ''} className="text-[#E5E4E2] hover:text-[#F5F5F5] text-lg transition-colors font-mono block">
                    {info.text}
                  </a>
                ) : (
                  <p className="text-[#F5F5F5] text-sm">{info.text}</p>
                )}
                <p className="text-[10px] text-[#A3A3A3] mt-1 uppercase">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <ContactBookingForm />

      {/* Emergency & Business Hours */}
      <section className="py-16 bg-[#141414]" aria-label="Business hours and emergency info">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Business Hours', main: '24 / 7', desc: 'Including holidays, weekends, early mornings, and late nights.' },
            { title: 'Urgent Bookings', main: BUSINESS.phone, desc: 'For same-day or emergency bookings, call directly for fastest confirmation.', isPhone: true },
            { title: 'Service Coverage', main: 'Punjab · Chandigarh · Delhi NCR', desc: 'Ludhiana, Jalandhar, Patiala, Amritsar, Mohali, and custom routes.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: motionEases.softEase }}
              className="bg-[#1A1A1A] p-8 rounded-[20px] border border-white/10"
            >
              <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">{item.title}</h3>
              <p className={item.isPhone ? "text-[#E5E4E2] font-bold text-lg font-mono" : (item.main === '24 / 7' ? "text-[#E5E4E2] font-bold text-2xl font-mono" : "text-[#F5F5F5] text-sm font-medium")}>{item.main}</p>
              <p className="text-[#A3A3A3] text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
