import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Airport & Outstation Taxi Routes | ${BUSINESS.name}`,
  description: "View our core taxi routes including Ludhiana to Delhi Airport, Chandigarh to Delhi, Amritsar Airport, and across Punjab. Distance, time estimates, and instant WhatsApp booking.",
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
