'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

import { getWhatsAppLink } from '@/lib/links';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book a ride.\n\nPickup: \nDrop: \nDate: `;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3">
      {/* Tooltip/Chat bubble */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl border border-[#DEDBD2] p-5 w-[280px] animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-[#101010] text-sm">Need a ride?</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#6F6B63] hover:text-[#101010] transition-colors"
              aria-label="Close chat bubble"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[#6F6B63] text-xs mb-4">Click below to book your airport taxi or outstation ride on WhatsApp.</p>
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white w-full py-3 rounded-xl text-sm font-semibold hover:bg-[#1da851] transition-colors"
            aria-label="Start WhatsApp chat"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
