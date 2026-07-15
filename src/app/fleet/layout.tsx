import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Taxi Fleet — Sedan, SUV & Group Travel",
  description: "Explore our premium fleet of Innova Crystas, executive sedans, SUVs, and Tempo Travellers. Compare seats, luggage capacity, and suitability for airport and outstation travel.",
  alternates: {
    canonical: `${BUSINESS.website}/fleet`,
  },
};

export default function FleetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
