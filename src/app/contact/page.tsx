"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import ContactBookingForm from '@/components/sections/ContactBookingForm';
import { BUSINESS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { motionEases } from '@/lib/motion';

export default function ContactPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen font-sans text-[#101010]">
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-[#171717] text-white" aria-label="Contact page hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-15" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEases.mainEase }}
            className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold"
          >
            Get In Touch
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            <SplitTextReveal text="Contact Us" highlight="Us" />
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: motionEases.mainEase }}
            className="text-white/70 max-w-2xl mx-auto text-lg mb-10"
          >
            We are available 24/7 for bookings, quotes, and travel assistance. Connect with our dispatch team instantly.
          </motion.p>
        </div>
      </section>

      {/* Direct Contact Info */}
      <section className="py-16 bg-white" aria-label="Contact information">
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
                className="p-6 border border-[#DEDBD2] rounded-[20px] hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="font-bold text-[#101010] mb-2 uppercase text-[10px] tracking-widest font-mono">{info.title}</h3>
                {info.href ? (
                  <a href={info.href} target={info.title === 'WhatsApp' ? '_blank' : '_self'} rel={info.title === 'WhatsApp' ? 'noopener noreferrer' : ''} className="text-[#B88A44] hover:text-[#101010] text-lg transition-colors font-mono block">
                    {info.text}
                  </a>
                ) : (
                  <p className="text-[#101010] text-sm">{info.text}</p>
                )}
                <p className="text-[10px] text-[#6F6B63] mt-1 uppercase">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <ContactBookingForm />

      {/* Emergency & Business Hours */}
      <section className="py-16 bg-[#EFEEE8]" aria-label="Business hours and emergency info">
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
              className="bg-white p-8 rounded-[20px] border border-[#DEDBD2]"
            >
              <h3 className="font-serif text-xl text-[#101010] mb-3">{item.title}</h3>
              <p className={item.isPhone ? "text-[#B88A44] font-bold text-lg font-mono" : (item.main === '24 / 7' ? "text-[#B88A44] font-bold text-2xl font-mono" : "text-[#101010] text-sm font-medium")}>{item.main}</p>
              <p className="text-[#6F6B63] text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
