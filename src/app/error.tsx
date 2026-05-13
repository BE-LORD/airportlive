'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-[#0A0A0A] min-h-[100dvh] font-sans text-[#F5F5F5] flex flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" aria-hidden="true" />
      
      <div className="relative z-10 max-w-md mx-auto space-y-6 bg-[#1A1A1A] p-8 md:p-10 rounded-[24px] border border-red-500/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <h2 className="text-3xl font-serif text-white mb-2">Something went wrong!</h2>
        <p className="text-[#A3A3A3] text-sm md:text-base">
          We've encountered an unexpected error. Please try again or return to the homepage.
        </p>
        
        <div className="pt-6 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-[#E5E4E2] text-[#0A0A0A] w-full py-4 rounded-xl uppercase tracking-wider text-sm font-bold hover:bg-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-white/10 text-[#F5F5F5] w-full py-4 rounded-xl uppercase tracking-wider text-sm font-semibold hover:bg-[#222222] transition-colors"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
