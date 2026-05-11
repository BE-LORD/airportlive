'use client';

export default function TrustStrip() {
  const stats = [
    "20+ Years Experience",
    "100+ Fleet Network",
    "Airport Pickup & Drop",
    "Clean Comfortable Rides",
    "Professional Drivers",
    "WhatsApp Booking"
  ];

  return (
    <div className="bg-[#171717] text-white py-6 overflow-hidden border-b border-[#343434]">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-mono tracking-wider uppercase opacity-80">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            <span>{stat}</span>
            {i !== stats.length - 1 && <span className="hidden md:inline text-[#B88A44]">/</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
