'use client';

const REVIEWS = [
  { name: 'Rahul S.', route: 'Ludhiana → Delhi Airport', vehicle: 'Innova Crysta', type: 'Airport Transfer', when: 'Recent customer', text: 'Smooth airport pickup, clean car, and professional driver. The booking was quick and stress-free. Will definitely use V3 again.' },
  { name: 'Amanpreet K.', route: 'Chandigarh → Amritsar', vehicle: 'Innova Crysta', type: 'Outstation', when: 'Recent customer', text: 'Very comfortable Innova. Driver was on time and drove very safely. Highly recommend V3 Tour & Travels for family travel.' },
  { name: 'Vikram M.', route: 'Delhi Airport → Ludhiana', vehicle: 'Premium Sedan', type: 'Airport Pickup', when: 'Recent customer', text: 'Flight landed late at night but the driver was waiting at the terminal. True luxury service and highly reliable even at odd hours.' },
  { name: 'Priya G.', route: 'Ludhiana → Chandigarh Airport', vehicle: 'Sedan', type: 'Family Pickup', when: 'Recent customer', text: 'I book for my parents every time they fly. The team is reliable, polite, and always communicates clearly. Peace of mind for me.' },
  { name: 'Gurpreet S.', route: 'Multi-City Punjab', vehicle: 'Fleet (5 cars)', type: 'Corporate Event', when: 'Recent customer', text: 'Used them for a corporate event with 5 cars. Everything was coordinated perfectly. No stress, no confusion. Professional service.' },
  { name: 'Anita R.', route: 'Ludhiana + Jalandhar + Chandigarh', vehicle: 'Tempo Traveller + Sedans', type: 'Wedding Transport', when: 'Recent customer', text: 'For our wedding, they handled guest pickups from three different cities. Every car arrived on time. Professional from start to finish.' },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Real Feedback</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#101010]">Words from our <span className="italic text-[#B88A44]">Travelers</span></h2>
          <p className="max-w-xl mx-auto text-[#6F6B63] mt-4">Real feedback from customers who care about timing, comfort, and trust.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-[20px] border border-[#DEDBD2] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-shadow duration-500">
              {/* Stars */}
              <div className="flex gap-1 text-[#B88A44] mb-4">
                {'★★★★★'.split('').map((star, j) => <span key={j} className="text-sm">{star}</span>)}
              </div>

              {/* Quote */}
              <p className="text-[#6F6B63] mb-6 italic font-serif text-base leading-relaxed flex-grow">&ldquo;{review.text}&rdquo;</p>

              {/* Reviewer Info */}
              <div className="border-t border-[#DEDBD2] pt-4 space-y-2">
                <p className="font-bold text-[#101010] font-sans">{review.name}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-[#EFEEE8] text-[#6F6B63] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    {review.route}
                  </span>
                  <span className="text-[10px] bg-[#EFEEE8] text-[#6F6B63] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    {review.vehicle}
                  </span>
                </div>
                <p className="text-[10px] text-[#6F6B63]/60 font-mono uppercase tracking-wider">{review.type} · {review.when}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
