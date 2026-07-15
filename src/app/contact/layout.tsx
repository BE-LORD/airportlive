import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Taxi Online — Contact",
  description: "Contact Airport Live / V3 Tour & Travels for instant taxi booking. Call or WhatsApp our 24/7 helpline. Submit a booking inquiry directly.",
  alternates: {
    canonical: `${BUSINESS.website}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
