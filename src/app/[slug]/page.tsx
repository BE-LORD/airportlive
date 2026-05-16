import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getWhatsAppLink, getPhoneLink } from '@/lib/links';
import { SEO_PAGES, type SeoPageData } from '@/data/seoPages';
import { PSEO_ROUTES, type RouteDetail } from '@/data/pSEO_routes';
import { BUSINESS } from '@/lib/constants';
import { MessageCircle, Phone, ChevronDown, ShieldCheck, Star, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { buildAllSchemas } from '@/lib/schema';
import Script from 'next/script';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { pageHeroMedia } from '@/data/airportlive-media';

type SeoRenderablePage = SeoPageData | RouteDetail;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all defined SEO and pSEO pages
export function generateStaticParams() {
  const allSlugs = [...Object.keys(SEO_PAGES), ...Object.keys(PSEO_ROUTES)];
  return Array.from(new Set(allSlugs)).map((slug) => ({
    slug,
  }));
}

// Generate unique metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page: SeoRenderablePage | undefined = PSEO_ROUTES[slug] ?? SEO_PAGES[slug];
  
  if (!page) return {};
  const title = page.title.replace(/\s\|\sV3 Tour & Travels$/i, '');

  return {
    title,
    description: page.metaDesc,
    alternates: {
      canonical: `${BUSINESS.website}/${slug}`,
    },
    openGraph: {
      title,
      description: page.metaDesc,
      url: `${BUSINESS.website}/${slug}`,
      siteName: BUSINESS.name,
      images: [
        {
          url: '/og-image.jpg', // Should be a premium route-specific image ideally
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const pSEOPage = PSEO_ROUTES[slug];
  const legacyPage = SEO_PAGES[slug];
  const page = pSEOPage || legacyPage;

  if (!page) notFound();

  const isPSEO = !!pSEOPage;
  const overview = pSEOPage?.content.overview ?? legacyPage?.content.overview ?? '';
  const whatsappMsg = `Hi ${BUSINESS.name}, I want to book the ${page.h1} service.`;
  
  // Build dynamic schema for this specific page
  const schemas = buildAllSchemas();

  return (
    <main className="bg-[#0A0A0A] min-h-screen font-sans text-[#F5F5F5] selection:bg-[#E5E4E2] selection:text-[#0A0A0A]">
      <Header />
      
      {/* Dynamic Schema Injection */}
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero Section - Cinematic with Grain & Blur */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
        <div className="absolute inset-0 scale-105" aria-hidden="true">
          <ResponsiveImage
            {...(isPSEO ? pageHeroMedia.airportTaxi : pageHeroMedia.contact)}
            fill
            priority={false}
            className="opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/80">
              {isPSEO ? 'Priority Airport Corridor' : 'Premium Service Tier'}
            </span>
          </div>
          
          <h1 className="mb-8 font-serif text-[clamp(3rem,12vw,6rem)] leading-[0.95] tracking-tight md:text-8xl">
            {page.h1}
          </h1>
          
          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-white/68 md:mb-12 md:text-2xl font-light italic">
            &ldquo;{page.subhead}&rdquo;
          </p>

          <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            <a 
              href={getWhatsAppLink(whatsappMsg)} 
              className="group flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E5E4E2] px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0A0A0A] shadow-[0_0_40px_rgba(229,228,226,0.2)] transition-all duration-500 hover:scale-105 hover:bg-white"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Get Instant Fare Quote
            </a>
            <a 
              href={getPhoneLink()} 
              className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-white/5"
            >
              <Phone className="w-4 h-4" /> Direct Call
            </a>
          </div>
        </div>
      </section>

      {/* Trust Metrics Strip */}
      <section className="py-12 border-y border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Avg. Response', val: '2 Mins', icon: Clock },
            { label: 'Rating', val: '4.9/5', icon: Star },
            { label: 'Safety Record', val: '100%', icon: ShieldCheck },
            { label: 'Chauffeurs', val: 'Verified', icon: MapPin }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <item.icon className="w-5 h-5 text-white/40 mb-3" />
              <span className="text-2xl font-serif text-white mb-1">{item.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Content Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Narrative - 800+ Word Impact */}
          <div className="lg:col-span-7 space-y-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-4xl font-serif text-white mb-8 underline decoration-white/10 underline-offset-8">
                The V3 Difference: Mastery of the Road
              </h2>
              
              <p className="text-white/70 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                {overview}
              </p>

              {pSEOPage && (
                <>
                  <div className="my-16 p-8 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <ShieldCheck className="w-24 h-24 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-4">Our Commitment to Safety</h3>
                    <p className="text-white/60 leading-relaxed italic">
                      {pSEOPage.content.safetyCommitment}
                    </p>
                  </div>

                  <h3 className="text-3xl font-serif text-white mb-6">A Legacy of Serving the NRI Community</h3>
                  <p className="text-white/60 mb-12">
                    {pSEOPage.content.nriService}
                  </p>

                  <div className="p-8 border-l-2 border-white/20 bg-white/5 rounded-r-3xl">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-400" /> Route-Specific Advice
                    </h4>
                    <p className="text-white/70 text-sm italic">
                      {pSEOPage.content.routeSpecificAdvice}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar Components */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Quick Stats Card */}
            {pSEOPage && (
              <div className="p-8 rounded-3xl bg-[#141414] border border-white/10">
                <h3 className="text-xl font-serif text-white mb-6">Route Fast-Facts</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">Est. Distance</span>
                    <span className="text-white font-mono">{pSEOPage.distance}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">Typical Time</span>
                    <span className="text-white font-mono">{pSEOPage.travelTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-white/40 text-sm">Priority Status</span>
                    <span className="text-green-400 text-sm font-bold uppercase tracking-widest">{pSEOPage.priority}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pain Points Section - CRO Engineered */}
            {pSEOPage && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-serif text-white mb-6">We Solve Your Travel Pain</h3>
                <div className="space-y-4">
                  {pSEOPage.painPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{point} — <span className="text-white/90 font-bold">Solved.</span></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium CTA Box */}
            <div className="p-8 rounded-3xl bg-[#E5E4E2] text-[#0A0A0A] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-2">Book Your Chauffeur</h3>
                <p className="text-sm opacity-70 mb-6">Fixed pricing for {page.h1}. No surges, no hidden fees.</p>
                <a 
                  href={getWhatsAppLink(whatsappMsg)} 
                  className="block text-center py-4 rounded-xl bg-[#0A0A0A] text-white font-bold uppercase tracking-widest text-xs hover:scale-[0.98] transition-transform"
                >
                  Confirm Availability
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section with Schema-Ready Structure */}
      <section className="py-32 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 italic">Frequently Asked</h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">Transparent answers for peaceful travel</p>
          </div>
          
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group bg-[#141414] rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20">
                <summary className="flex items-center justify-between p-8 cursor-pointer font-bold text-white list-none">
                  <span className="text-lg md:text-xl font-serif">{faq.q}</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
                    <ChevronDown className="h-5 w-5 text-white/40" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-white/60 leading-relaxed text-base md:text-lg max-w-3xl">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Footer CTA */}
      <section className="py-40 relative text-center bg-[#0D0D0D]">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Ready to Start?</h2>
          <p className="text-xl text-white/40 mb-12">Join 10,000+ happy travelers who choose V3 for punctuality and peace of mind.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href={getWhatsAppLink(whatsappMsg)} 
              className="bg-[#E5E4E2] text-[#0A0A0A] px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Secure My Booking
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
