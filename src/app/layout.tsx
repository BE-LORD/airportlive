import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/seo";
import { buildAllSchemas } from "@/lib/schema";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { IntroLoader } from "@/components/motion/IntroLoader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = buildAllSchemas();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="video"
          href="/media/video/airportlive-remotion-intro-desktop.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="video"
          href="/media/video/airportlive-remotion-intro-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans bg-sona-cream text-sona-text antialiased" suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          <ScrollProgressBar />
          <div className="grain-overlay" aria-hidden="true" />
          <IntroLoader />
          <PageTransition>{children}</PageTransition>
          <WhatsAppFloat />
          <MobileStickyCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
