import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { QuoteStepper } from "@/components/quote/quote-stepper";
import { ShieldCheck, Clock, ThumbsUp } from "lucide-react";

export const metadata = {
  title: "Get a Free Signage & Print Quotation | Devi Arts",
  description: "Request a free custom quote for commercial art, digital printing, LED sign boards, neon signs, and flex banners from Devi Arts.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2]">
      {/* Standard-height Header (No full-screen hero, no divider border lines) */}
      <section className="pt-28 pb-8 bg-[#0D0D0D]">
        <Container className="text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-3">
            Zero Obligation • Fast 2-Hour Response
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Get Your Free <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Custom Quote</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9A9A9A] max-w-xl mx-auto leading-relaxed">
            Tell us about your requirements, select your materials, attach your artwork or logo, and receive a prompt quote from our team.
          </p>
        </Container>
      </section>

      {/* Main Quote Wizard */}
      <section className="py-8 pb-20 bg-[#0D0D0D]">
        <Container>
          <Suspense fallback={<div className="text-center py-20 font-bold text-gray-400">Loading Quote Builder...</div>}>
            <QuoteStepper />
          </Suspense>

          {/* Trust Highlights below wizard */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#161616] p-6 rounded-2xl shadow-lg flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#ED1C24]/10 text-[#ED1C24] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Fast Response Guarantee</h4>
                <p className="text-xs text-[#9A9A9A]">We review and respond to every quote request within 2 business hours.</p>
              </div>
            </div>

            <div className="bg-[#161616] p-6 rounded-2xl shadow-lg flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Premium Grade Materials</h4>
                <p className="text-xs text-[#9A9A9A]">Top-tier acrylics, branded IP67 LEDs, UV-resistant inks, and heavy-duty ACP.</p>
              </div>
            </div>

            <div className="bg-[#161616] p-6 rounded-2xl shadow-lg flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#8DC63F]/10 text-[#8DC63F] shrink-0">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Professional Installation</h4>
                <p className="text-xs text-[#9A9A9A]">Safe on-site mounting, wiring, and structural installation support.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
