'use client';

export default function BookingFlow() {
  const steps = [
    { num: "01", title: "Share Pickup & Drop", desc: "Provide your locations and dates on WhatsApp or Call." },
    { num: "02", title: "Confirm Fare", desc: "Get an instant, transparent quote with no hidden fees." },
    { num: "03", title: "Enjoy the Ride", desc: "Your driver arrives on time for a premium travel experience." }
  ];

  return (
    <section className="py-24 bg-[#EFEEE8]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#101010] mb-16">Booking is Effortless</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-[#DEDBD2] z-0"></div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-serif italic text-[#B88A44] shadow-sm mb-6 border border-[#DEDBD2]">
                {step.num}
              </div>
              <h3 className="text-2xl font-serif text-[#101010] mb-3">{step.title}</h3>
              <p className="text-[#6F6B63] max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
