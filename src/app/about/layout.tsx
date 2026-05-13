import { BUSINESS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About Us | ${BUSINESS.name}`,
  description: "Learn about V3 Tour and Travels. Over 20 years of experience providing luxury airport transfers and outstation tours across Punjab, Chandigarh, and Delhi NCR.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
