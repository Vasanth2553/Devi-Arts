import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "../styles/theme.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingSocials } from "@/components/ui/floating-socials";
import GlowCursor from "@/components/ui/GlowCursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Commercial Artist & Digital Printers`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "commercial artist",
    "digital printing",
    "flex printing",
    "vinyl banners",
    "signage",
    "LED sign boards",
    "neon signs",
    "acrylic signs",
    "3D letters",
    "shop branding",
    "sign board",
    "custom signs",
    "business signage",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Commercial Artist & Digital Printers`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Commercial Artist & Digital Printers`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-[#F2F2F2] font-sans">
        <GlowCursor
          color="#ED1C24"
          secondaryColor="#00AEEF"
          trailLength={40}
          trailWidth={10}
          trailTaper={0.8}
          followSpeed={0.88}
          glowIntensity={2.4}
          glowSpread={1.4}
          hotspot={0.75}
          brightness={1.35}
          opacity={1}
          pulseSpeed={1.4}
          noiseStrength={0.03}
          idleFade={true}
          idleTimeout={500}
          fadeDuration={600}
          blendMode="screen"
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingSocials />
        </GlowCursor>
      </body>
    </html>
  );
}
