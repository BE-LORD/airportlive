'use client';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop',
    alt: 'Premium sedan driving on highway during golden hour - V3 Tour and Travels airport transfer',
  },
  {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop',
    alt: 'Clean premium sedan exterior - V3 Tour and Travels fleet vehicle',
  },
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    alt: 'Professional chauffeur standing near luxury SUV - V3 Tour and Travels driver',
  },
  {
    src: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop',
    alt: 'Multi-passenger vehicle for group travel - V3 Tour and Travels tempo traveller',
  },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-[#171717] text-white" aria-label="Photo gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-[#B88A44] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Visual Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Experience</h2>
            <p className="text-white/60 max-w-lg font-sans">From premium night pickups to scenic long-route travel. Every ride is built around comfort.</p>
          </div>
          <a
            href="https://wa.me/919888000510?text=Hi%20V3%20Tour%20%26%20Travels%2C%20I%20want%20to%20book%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-wider text-sm font-semibold text-white hover:text-[#B88A44] transition-colors underline underline-offset-8 flex-shrink-0"
            aria-label="Book a ride on WhatsApp"
          >
            Book Now
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="aspect-square bg-[#2a2a2a] rounded-[16px] overflow-hidden relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                    const fallback = document.createElement('span');
                    fallback.textContent = 'Premium Travel';
                    fallback.className = 'text-white/30 font-mono text-xs uppercase tracking-wider';
                    target.parentElement.appendChild(fallback);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
