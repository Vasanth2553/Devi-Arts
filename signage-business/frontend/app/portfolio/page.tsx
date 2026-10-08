import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";

export const metadata = {
  title: "Our Work & Signage Portfolio | Devi Arts",
  description: "Real signage. Real craftsmanship. Real projects. Explore neon sign boards, ACP cladding, backlit boards, SS letters, acrylic 3D letters, and commercial branding completed by Devi Arts.",
};

function GalleryFallback() {
  return (
    <div className="py-12 text-center text-gray-500 font-mono text-sm animate-pulse">
      Loading Devi Arts Portfolio...
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Premium Header Introduction */}
      <section className="pt-28 pb-8 bg-[#0D0D0D]">
        <Container className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-4 border border-[#ED1C24]/20">
            <span>OUR WORK</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Real Signage.{" "}
            <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Real Craftsmanship.
            </span>{" "}
            Real Projects.
          </h1>

          <p className="text-base sm:text-lg text-[#9A9A9A] max-w-2xl mx-auto leading-relaxed mb-8">
            Explore signage, digital printing, and business branding work completed by Devi Arts. High-luminescence neon, 3D letters, and architectural finishes.
          </p>

          <Suspense fallback={<GalleryFallback />}>
            <PortfolioGallery />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
