import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MotionCard, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/data";

export const metadata = {
  title: "Commercial Signage & Architectural Boards | Devi Arts",
  description: "Explore our complete range of 9 specialized commercial signage services including Neon Signs, ACP Cladding, Acrylic Letters, Front-Lit & Back-Lit Boards, Vinyl Stickers, and Mirror Frosted Glass.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Standard-height Page Header */}
      <section className="pt-28 pb-8 bg-[#0D0D0D]">
        <Container className="text-center max-w-4xl">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-3">
            Commercial Signage &amp; Architectural Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Our <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Signage &amp; Branding Services</span>
          </h1>
          <p className="text-base sm:text-lg text-[#9A9A9A] max-w-2xl mx-auto leading-relaxed">
            From luminous neon displays and ACP building cladding to 3D acrylic, stainless steel, vinyl stickers, and mirror frosted glass — explore our 9 specialized signage services.
          </p>
        </Container>
      </section>

      {/* Services Grid with 16:9 Image Ratios */}
      <section className="py-8 pb-20 bg-[#0D0D0D]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <MotionCard 
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group cursor-pointer flex flex-col h-full bg-[#161616] border border-white/5 hover:border-[#ED1C24]/40 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <Link href={`/services/${service.slug}`} className="flex-grow flex flex-col">
                  {/* 16:9 Image Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors z-10" />
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 z-20 bg-black/75 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md border border-white/10">
                      From {service.startingPrice}
                    </div>
                  </div>

                  <CardContent className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-lg font-bold mb-2 text-white group-hover:text-[#ED1C24] transition-colors leading-snug">
                        {service.title}
                      </h2>
                      <p className="text-[#9A9A9A] text-xs leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#00AEEF]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate text-gray-300 font-medium">{service.features[0]}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-semibold text-[#9A9A9A]">
                          In-House Craft
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] group-hover:translate-x-1 transition-transform">
                          Explore Details <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </MotionCard>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
