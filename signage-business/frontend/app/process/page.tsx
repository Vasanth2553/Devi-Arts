import { Container, Section } from "@/components/ui/container";
import { Process as ProcessTimeline } from "@/components/sections/process";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Process | Devi Arts – Commercial Artist & Digital Printers",
  description: "Learn how Devi Arts takes your signage and printing project from concept and artwork to flawless print, fabrication, and installation.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Standard-height Page Header (No full-screen hero, no divider border lines) */}
      <section className="pt-28 pb-8 bg-[#0D0D0D]">
        <Container className="text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#ED1C24]/10 text-[#ED1C24] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            How We Deliver Excellence
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            From Creative Concept To <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Flawless Execution</span>
          </h1>
          <p className="text-base sm:text-lg text-[#9A9A9A] max-w-2xl mx-auto leading-relaxed">
            We manage the entire lifecycle of your printing and signage project in-house. 
            No outsourcing, no delays. Just quality craftsmanship delivered on time.
          </p>
        </Container>
      </section>

      {/* The detailed timeline */}
      <ProcessTimeline />
      
      {/* Additional details about manufacturing & printing */}
      <Section variant="dark" padding="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest block">
                In-House Production
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Full-Scale Printing &amp; Fabrication Facility</h2>
              <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
                Operating our own digital printing and sign manufacturing facility allows us to maintain the highest quality control, guarantee rapid turnarounds, and provide transparent pricing.
              </p>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ED1C24] shrink-0" />
                  High-speed UV and eco-solvent large format printers
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00AEEF] shrink-0" />
                  Precision laser cutting and acrylic thermo-bending
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#8DC63F] shrink-0" />
                  Heavy-duty frame welding and weatherproof LED assembly
                </li>
              </ul>
            </div>
            <div className="relative h-[380px] rounded-3xl overflow-hidden bg-[#161616] shadow-2xl">
               <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                  alt="Devi Arts Printing & Signage Facility"
                  className="w-full h-full object-cover opacity-80"
                />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
