import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

const exploreLinks = [
  { name: 'Airport Taxi', href: '/airport-taxi' },
  { name: 'Routes', href: '/routes' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const routeLinks = [
  'Ludhiana → Delhi Airport',
  'Chandigarh → Delhi Airport',
  'Ludhiana → Chandigarh Airport',
  'Ludhiana → Amritsar Airport',
  'Delhi Airport → Punjab',
  'Jalandhar → Delhi Airport',
];

const serviceAreas = [
  'Ludhiana', 'Chandigarh', 'Delhi NCR', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali', 'Phagwara'
];

export default function Footer() {
  const whatsappMsg = encodeURIComponent(
    `Hi ${BUSINESS.name}, I want to book a ride.`
  );

  return (
    <footer className="bg-[#171717] text-white/70 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top CTA Banner */}
        <div className="bg-[#B88A44]/10 border border-[#B88A44]/20 rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Ready to book your ride?</h3>
            <p className="text-white/60 text-sm">Available 24/7 — Airport transfers, outstation rides, and more.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/91${BUSINESS.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1da851] transition-colors text-center"
            >
              Book on WhatsApp
            </a>
            <a
              href={`tel:+91${BUSINESS.phone}`}
              className="border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors text-center"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">{BUSINESS.name}</h3>
            <p className="font-mono text-[#B88A44] text-xs uppercase tracking-widest mb-4">{BUSINESS.brand}</p>
            <p className="text-sm leading-relaxed mb-6">{BUSINESS.address}</p>
            <div className="space-y-2 font-mono text-sm">
              <p><a href={`tel:+91${BUSINESS.phone}`} className="hover:text-[#B88A44] transition-colors">+91 {BUSINESS.phone}</a></p>
              <p><a href={`mailto:${BUSINESS.email}`} className="hover:text-[#B88A44] transition-colors">{BUSINESS.email}</a></p>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#B88A44] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes Column */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Popular Routes</h4>
            <ul className="space-y-3">
              {routeLinks.map((route) => (
                <li key={route}>
                  <Link href="/routes" className="hover:text-[#B88A44] transition-colors text-sm">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Service Areas</h4>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="bg-white/5 border border-white/10 text-xs px-3 py-1.5 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Business Hours</h4>
              <p className="text-sm">24/7 — Always Available</p>
              <p className="text-xs text-white/40 mt-1">Including holidays, late nights, and early mornings.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
