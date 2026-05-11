import { BUSINESS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-v3-navy text-v3-cream/50 py-16 px-4 border-t border-v3-cream/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <h3 className="text-3xl font-serif text-v3-cream mb-4">{BUSINESS.name}</h3>
          <p className="font-mono text-sm mb-2">{BUSINESS.brand}</p>
          <p className="font-sans">{BUSINESS.address}</p>
        </div>
        <div className="md:text-right font-mono text-sm space-y-2">
          <p><a href={`tel:+91${BUSINESS.phone}`} className="hover:text-v3-gold transition-colors">+91 {BUSINESS.phone}</a></p>
          <p><a href={`mailto:${BUSINESS.email}`} className="hover:text-v3-gold transition-colors">{BUSINESS.email}</a></p>
          <p className="mt-8 pt-8 border-t border-v3-cream/10 inline-block w-full md:w-auto">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
