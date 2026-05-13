import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="bg-[#0A0A0A] min-h-[100dvh] font-sans text-[#F5F5F5] flex flex-col">
      <Header />
      
      <section className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" aria-hidden="true" />
        
        <div className="relative z-10 max-w-lg mx-auto space-y-6">
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono font-bold">
            Error 404
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white">
            Lost in Transit
          </h1>
          <p className="text-[#A3A3A3] text-base md:text-lg">
            We couldn't find the page you're looking for. It might have been moved or the URL might be incorrect.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-[#E5E4E2] text-[#0A0A0A] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 border border-white/10 text-[#F5F5F5] px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
