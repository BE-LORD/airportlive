import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { SEO_PAGES } from '@/data/seoPages';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all defined SEO pages
export function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({
    slug,
  }));
}

// Generate unique metadata for each SEO page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES[slug];
  
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.metaDesc,
  };
}

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const page = SEO_PAGES[slug];

  // If the slug is not in our data, return 404
  if (!page) {
    notFound();
  }

  const Icon = page.icon;
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book the ${page.h1} service.`;

  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 bg-[#0A0A0A] text-white" aria-label={`${page.h1} hero`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-6 font-bold flex items-center justify-center gap-2">
            <Icon className="w-4 h-4" /> {page.type === 'route' ? 'Dedicated Route' : page.type === 'fleet' ? 'Premium Fleet' : 'Premium Service'}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">{page.h1}</h1>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            {page.subhead}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={getWhatsAppLink(whatsappMsg)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#E5E4E2] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors flex items-center gap-2"
              aria-label="Get Fare on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" /> Get Fare on WhatsApp
            </a>
            <a 
              href={getPhoneLink()} 
              className="border border-white/30 text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A]/10 transition-colors flex items-center gap-2"
              aria-label={`Call ${BUSINESS.phone}`}
            >
              <Phone className="w-4 h-4" /> Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-[#1A1A1A]" aria-label="Service Details">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif mb-6 text-[#F5F5F5]">Overview</h2>
            <p className="text-[#A3A3A3] text-base leading-relaxed mb-8">
              {page.content.overview}
            </p>
            
            {page.content.popularRoutes && (
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/10">
                <h3 className="font-serif text-lg mb-4 text-[#F5F5F5]">Popular Connections</h3>
                <ul className="space-y-3">
                  {page.content.popularRoutes.map((route, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#A3A3A3]">
                      <span className="w-1.5 h-1.5 bg-[#E5E4E2] rounded-full"></span> {route}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            <div className="p-8 rounded-[20px] bg-[#141414] border border-white/10">
              <h3 className="text-xl font-serif text-[#F5F5F5] mb-2">{page.content.feature1Title}</h3>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{page.content.feature1Desc}</p>
            </div>
            <div className="p-8 rounded-[20px] bg-[#141414] border border-white/10">
              <h3 className="text-xl font-serif text-[#F5F5F5] mb-2">{page.content.feature2Title}</h3>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{page.content.feature2Desc}</p>
            </div>
            <div className="p-8 rounded-[20px] bg-[#141414] border border-white/10">
              <h3 className="text-xl font-serif text-[#F5F5F5] mb-2">{page.content.feature3Title}</h3>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{page.content.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#0A0A0A]" aria-label="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#F5F5F5]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#F5F5F5]">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-[#E5E4E2] transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#A3A3A3] text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#0A0A0A] text-center" aria-label="Book your service">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-white">Ready to travel with us?</h2>
          <p className="text-white/70 mb-8">Click below to share your trip details on WhatsApp and get an instant, transparent quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={getWhatsAppLink(whatsappMsg)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#E5E4E2] text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F5F5] transition-colors"
            >
              Book Now via WhatsApp
            </a>
            <Link 
              href="/contact" 
              className="border border-white/30 text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A]/10 transition-colors"
            >
              Use Booking Form →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
