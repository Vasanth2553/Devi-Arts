import { Container, Section } from "@/components/ui/container";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { siteConfig } from "@/lib/config";
import { Paintbrush, Sparkles, Award } from "lucide-react";

export const metadata = {
  title: `About ${siteConfig.name} | Commercial Artist & Digital Printers`,
  description: "Learn about our journey, our craft, and why businesses trust Devi Arts for high-impact commercial art, sign boards, and digital printing.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Standard-height Page Header (No full-screen hero, no divider border lines) */}
      <section className="pt-28 pb-8 bg-[#0D0D0D]">
        <Container className="text-center max-w-4xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-3">
            Craftsmanship &amp; Precision
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            About <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{siteConfig.name}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#9A9A9A] max-w-2xl mx-auto leading-relaxed">
            We are a dedicated team of commercial artists, print technicians, and signage craftsmen committed to making your business visually remarkable.
          </p>
        </Container>
      </section>

      {/* Story & Stats */}
      <Section variant="light" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest block">
                Our Journey &amp; Passion
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                Transforming Ideas into Captivating Visual Realities
              </h2>
              <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
                Starting as a specialized commercial art studio, Devi Arts has expanded into a full-scale digital printing and signage production powerhouse. We blend traditional artistic mastery with cutting-edge digital print technology.
              </p>
              <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
                We believe that every sign board, flex banner, and commercial art piece is the primary voice of your brand. It must convey quality, trustworthiness, and distinct style from the very first glance.
              </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-[#1F1F1F] p-6 rounded-2xl text-center shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-[#ED1C24] mb-2">500+</div>
                <div className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider">Projects Completed</div>
              </div>
              <div className="bg-[#1F1F1F] p-6 rounded-2xl text-center shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-[#00AEEF] mb-2">15+</div>
                <div className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="bg-[#1F1F1F] p-6 rounded-2xl text-center shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-[#FFF200] mb-2">100%</div>
                <div className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider">In-House Printing</div>
              </div>
              <div className="bg-[#1F1F1F] p-6 rounded-2xl text-center shadow-lg">
                <div className="text-3xl sm:text-4xl font-black text-[#8DC63F] mb-2">350+</div>
                <div className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider">Happy Clients</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Principles */}
      <Section variant="dark" padding="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">Our Core Pillars</h2>
            <p className="text-[#9A9A9A] max-w-2xl mx-auto text-base">
              The foundational standards that make Devi Arts the premier partner for commercial branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#161616] space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center">
                <Paintbrush className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Artistic Vision</h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed">
                Every project is approached with genuine commercial artist intuition, creating striking compositions that capture customer attention.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#161616] space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">High-Resolution Precision</h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed">
                We use high-grade UV and eco-solvent printing technology for vivid colors, sharp definition, and long-lasting durability.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#161616] space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#8DC63F]/10 text-[#8DC63F] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Reliable Craftsmanship</h3>
              <p className="text-sm text-[#9A9A9A] leading-relaxed">
                From outdoor weatherproofing to robust LED wiring, our installations are built to withstand the elements and perform flawlessly.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Devi Arts */}
      <WhyChooseUs />
    </main>
  );
}
