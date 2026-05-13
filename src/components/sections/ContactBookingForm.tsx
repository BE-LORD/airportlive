'use client';
import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { getWhatsAppLink, getBookingMessage } from '@/lib/links';

export default function ContactBookingForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    pickup: '', drop: '', date: '', time: '',
    passengers: '2', vehicle: 'Any / Best Available',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = getBookingMessage({
      name: form.name,
      phone: form.phone,
      pickup: form.pickup,
      drop: form.drop,
      date: form.date,
      time: form.time,
      passengers: form.passengers,
      vehicle: form.vehicle,
      message: form.notes
    });
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-[#0A0A0A]" aria-label="Booking submitted">
        <div className="max-w-md mx-auto px-4 text-center">
          <CheckCircle className="h-16 w-16 text-[#25D366] mx-auto mb-6" />
          <h3 className="text-2xl font-serif text-[#F5F5F5] mb-3">Booking Sent!</h3>
          <p className="text-[#A3A3A3] mb-6">Your booking details have been sent to our WhatsApp. We will confirm your fare and vehicle shortly.</p>
          <button onClick={() => setSubmitted(false)} className="underline text-[#E5E4E2] uppercase text-sm tracking-wider font-semibold">
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0A0A0A]" aria-label="Booking inquiry form" id="booking-form">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Online Booking Inquiry</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F5F5F5] mb-3">Send Booking Request</h2>
          <p className="text-[#A3A3A3] text-sm max-w-lg mx-auto">Fill out the form below and your booking details will be sent to our team on WhatsApp for instant confirmation.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] p-8 md:p-10 rounded-[24px] border border-white/10 shadow-sm space-y-6">
          {/* Personal Details */}
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase text-[#A3A3A3] tracking-widest font-bold mb-4 font-mono">Your Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Full Name *</label>
                <input id="contact-name" type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" autoComplete="name" className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Phone *</label>
                <input id="contact-phone" type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91..." autoComplete="tel" className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Email</label>
                <input id="contact-email" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="Optional" autoComplete="email" className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
            </div>
          </fieldset>

          {/* Trip Details */}
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase text-[#A3A3A3] tracking-widest font-bold mb-4 font-mono">Trip Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-pickup" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Pickup *</label>
                <input id="contact-pickup" type="text" required value={form.pickup} onChange={e => update('pickup', e.target.value)} placeholder="City or Airport" className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
              <div>
                <label htmlFor="contact-drop" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Drop *</label>
                <input id="contact-drop" type="text" required value={form.drop} onChange={e => update('drop', e.target.value)} placeholder="City or Airport" className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="contact-date" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Date *</label>
                <input id="contact-date" type="date" required value={form.date} onChange={e => update('date', e.target.value)} className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
              <div>
                <label htmlFor="contact-time" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Time</label>
                <input id="contact-time" type="time" value={form.time} onChange={e => update('time', e.target.value)} className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30" />
              </div>
              <div>
                <label htmlFor="contact-passengers" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Passengers</label>
                <select id="contact-passengers" value={form.passengers} onChange={e => update('passengers', e.target.value)} className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30">
                  {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => <option key={n} value={String(n)}>{n}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="contact-vehicle" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Vehicle</label>
                <select id="contact-vehicle" value={form.vehicle} onChange={e => update('vehicle', e.target.value)} className="w-full border border-white/10 bg-[#0A0A0A] text-white rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm placeholder:text-white/30">
                  <option>Any / Best Available</option>
                  <option>Innova Crysta</option>
                  <option>Premium Sedan</option>
                  <option>XL6 / SUV</option>
                  <option>Tempo Traveller</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Notes */}
          <div>
            <label htmlFor="contact-notes" className="block text-xs text-[#A3A3A3] uppercase mb-1 font-semibold">Additional Notes</label>
            <textarea id="contact-notes" rows={3} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Flight number, special requests, etc." className="w-full border border-white/10 rounded-xl px-4 py-3 focus:border-[#E5E4E2] outline-none text-sm resize-none" />
          </div>

          {/* Submit */}
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-[14px] uppercase tracking-wider text-sm font-bold hover:bg-[#1da851] transition-colors">
            <MessageCircle className="h-4 w-4" /> Send Booking Request via WhatsApp
          </button>

          <p className="text-[10px] text-center text-[#A3A3A3]/60 font-mono uppercase tracking-wider">
            No online payment required • Fare confirmed by our team
          </p>
        </form>
      </div>
    </section>
  );
}
