'use client';

const SERVICES = [
  { title: "Airport Pickup & Drop", desc: "Smooth airport transfers with punctual pickup, luggage-friendly vehicles, and quick WhatsApp booking." },
  { title: "Outstation Taxi", desc: "Comfortable long-route travel for family, business, and personal journeys." },
  { title: "Corporate Travel", desc: "Professional travel support for business meetings, airport transfers, and executive movement." },
  { title: "Family Tours", desc: "Spacious, clean vehicles for relaxed family travel and planned trips." },
  { title: "Wedding/Event Transport", desc: "Reliable fleet options for transporting guests comfortably and on time." },
  { title: "Local City Rides", desc: "Premium vehicles for local shopping, meetings, or day-to-day premium travel." }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Signature Services</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010]">Crafted for the Modern Traveler</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div key={i} className="bg-white p-8 rounded-[24px] border border-[#DEDBD2] hover:bg-[#EFEEE8] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#EFEEE8] group-hover:bg-white flex items-center justify-center mb-6 text-[#101010] font-serif italic text-xl transition-colors">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-serif text-[#101010] mb-4">{service.title}</h3>
              <p className="text-[#6F6B63] mb-8 line-clamp-2">{service.desc}</p>
              <a href="#contact" className="text-sm font-semibold uppercase tracking-wider text-[#101010] group-hover:text-[#B88A44] transition-colors inline-flex items-center gap-2">
                Explore <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
