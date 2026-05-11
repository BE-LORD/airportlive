'use client';

export default function Testimonials() {
  const reviews = [
    { name: "Rahul S.", route: "Ludhiana to Delhi Airport", text: "Smooth airport pickup, clean car, and professional driver. The booking was quick and stress-free." },
    { name: "Amanpreet K.", route: "Chandigarh to Amritsar", text: "Very comfortable Innova. Driver was on time and drove very safely. Highly recommend V3 Tour & Travels." },
    { name: "Vikram M.", route: "Delhi Airport Pickup", text: "Flight landed late at night but the driver was waiting. True luxury service and highly reliable." }
  ];

  return (
    <section className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#101010] text-center mb-16">Words from our <span className="italic text-[#B88A44]">Travelers</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-[24px] border border-[#DEDBD2]">
              <div className="flex gap-1 text-[#B88A44] mb-6">
                {"★★★★★".split("").map((star, j) => <span key={j}>{star}</span>)}
              </div>
              <p className="text-[#6F6B63] mb-8 italic font-serif text-lg">"{review.text}"</p>
              <div>
                <p className="font-bold text-[#101010] font-sans">{review.name}</p>
                <p className="text-xs text-[#6F6B63] font-mono uppercase tracking-wider mt-1">{review.route}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
