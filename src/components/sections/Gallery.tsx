'use client';

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1538561498305-ce34190b5030?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563259837-1473bdab0cf2?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <section className="py-24 bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Experience</h2>
            <p className="text-[#DEDBD2] opacity-80 max-w-lg font-sans">From premium night pickups to scenic long-route travel.</p>
          </div>
          <a href="#contact" className="uppercase tracking-wider text-sm font-semibold text-white hover:text-[#B88A44] transition-colors underline underline-offset-8">
            Book Now
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="aspect-square bg-[#343434] rounded-[16px] overflow-hidden relative group">
              <img src={img} alt="Gallery" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
