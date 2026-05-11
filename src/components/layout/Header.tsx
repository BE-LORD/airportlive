'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Airport Taxi', path: '/airport-taxi' },
    { name: 'Routes', path: '/routes' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#F8F7F3]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#DEDBD2]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={`font-serif text-2xl font-bold tracking-wider ${isScrolled ? 'text-[#101010]' : 'text-white'}`}>
          {BUSINESS.brand.toUpperCase()}
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.path} className={`font-mono text-sm uppercase tracking-widest hover:text-[#B88A44] transition-colors ${isScrolled ? 'text-[#101010]' : 'text-white'}`}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href={`tel:+91${BUSINESS.phone}`} className={`px-6 py-2 border uppercase tracking-widest text-sm rounded-full transition-colors ${isScrolled ? 'border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#101010]'}`}>
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
