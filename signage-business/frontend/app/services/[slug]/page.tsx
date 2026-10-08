import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import { portfolioProjects } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { buildPhoneUrl } from "@/lib/config";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Devi Arts`,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  // Find portfolio projects matching this service
  const serviceProjects = portfolioProjects.filter(
    (p) =>
      p.categorySlug.toLowerCase().includes(service.slug.toLowerCase()) ||
      service.slug.toLowerCase().includes(p.categorySlug.toLowerCase()) ||
      (p.services && p.services.some((s) => s.toLowerCase().includes(service.title.toLowerCase())))
  );

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Standard-height Dynamic Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0D0D0D]/85 z-10" />
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <Container className="relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#ED1C24] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md shadow-[#ED1C24]/30">
              <Sparkles className="w-3.5 h-3.5" /> Devi Arts Service
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#ED1C24] hover:bg-[#c8171e] text-white text-base px-8 shadow-lg shadow-[#ED1C24]/25">
                <Link href={`/quote?service=${service.slug}`}>
                  Request Exact Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="ghostWhite" size="lg" className="text-base px-8 border border-white/20">
                <a href={buildPhoneUrl()}>
                  <PhoneCall className="w-4 h-4 mr-2 text-[#ED1C24]" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Details Section */}
      <Section variant="light" padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Overview</h2>
                <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Key Specifications &amp; Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#1F1F1F] p-5 rounded-2xl shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-[#ED1C24] shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-[#161616] p-8 rounded-3xl shadow-2xl sticky top-28 space-y-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Project Estimate
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider mb-1">
                      Starting Price
                    </h4>
                    <p className="text-3xl font-black text-[#ED1C24]">{service.startingPrice}</p>
                    <p className="text-xs text-[#9A9A9A] mt-1">*Final cost depends on size, lighting style, and mounting site requirements.</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider mb-3">
                      Premium Materials Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.materials.map((mat, i) => (
                        <span key={i} className="bg-white/5 text-gray-200 px-3 py-1 rounded-lg text-xs font-medium">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild className="w-full bg-[#ED1C24] hover:bg-[#c8171e] text-white font-bold py-6 text-base shadow-lg shadow-[#ED1C24]/20">
                      <Link href={`/quote?service=${service.slug}`}>
                        Get Exact Custom Pricing
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Relevant Portfolio Showcase for this Service */}
      {serviceProjects.length > 0 && (
        <Section variant="dark" padding="lg" className="border-t border-white/5">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24]">
                  REAL WORK SHOWCASE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  OUR {service.title.toUpperCase()} WORK
                </h2>
              </div>

              <Link
                href={`/portfolio?category=${service.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1C24] hover:underline"
              >
                <span>VIEW ALL {service.title.toUpperCase()} PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
