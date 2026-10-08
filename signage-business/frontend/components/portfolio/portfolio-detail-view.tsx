"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  MessageCircle,
  Maximize2,
  CheckCircle2,
  Layers,
  SparkleIcon,
  Tag,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PortfolioProject, getRelatedProjects } from "@/data/portfolio";
import { PortfolioLightbox } from "./portfolio-lightbox";
import { PortfolioCard } from "./portfolio-card";

interface PortfolioDetailViewProps {
  project: PortfolioProject;
}

export function PortfolioDetailView({ project }: PortfolioDetailViewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const relatedProjects = getRelatedProjects(project, 3);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+917403199299";

  const whatsappMessage = encodeURIComponent(
    `Hi Devi Arts,\n\nI saw your portfolio project:\n"${project.title}"\n\nI am interested in a similar signage solution. Please share more details and quotation.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Back Navigation Bar */}
      <div className="pt-24 pb-4 border-b border-white/5 bg-[#0D0D0D]/90 backdrop-blur sticky top-0 z-30">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#ED1C24]" />
              <span>Back to All Work</span>
            </Link>

            <span className="text-xs font-mono text-[#ED1C24] bg-[#ED1C24]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-[#0D0D0D]">
        <Container>
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#ED1C24]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devi Arts Completed Work</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-gray-300 leading-relaxed font-normal max-w-3xl">
              {project.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Primary Project Image & Gallery Section */}
      <section className="pb-12 bg-[#0D0D0D]">
        <Container>
          {project.images && project.images.length > 0 && (
            <div className="space-y-6">
              {/* Main Featured Photo */}
              <div
                className="relative rounded-3xl overflow-hidden bg-black aspect-[16/9] border border-white/10 shadow-2xl group cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                <button className="absolute bottom-4 right-4 z-20 px-4 py-2 rounded-full bg-black/80 backdrop-blur text-white text-xs font-bold inline-flex items-center gap-2 border border-white/20 hover:bg-[#ED1C24] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Fullscreen</span>
                </button>
              </div>

              {/* Supporting Gallery Grid if multi-image */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className={`relative rounded-2xl overflow-hidden bg-black aspect-[4/3] border cursor-pointer group transition-all ${
                        idx === activeImageIndex
                          ? "border-[#ED1C24] shadow-lg shadow-[#ED1C24]/20"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} - View ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Project Specifications & CTA Grid */}
      <Section variant="dark" padding="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Project Details Columns */}
            <div className="lg:col-span-8 space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#ED1C24]" />
                <span>Work Specifications</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#161616] border border-white/5 space-y-1">
                  <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#00AEEF]" /> Service Category
                  </span>
                  <p className="text-base font-bold text-white">{project.category}</p>
                </div>

                {project.material && (
                  <div className="p-5 rounded-2xl bg-[#161616] border border-white/5 space-y-1">
                    <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" /> Craftsmanship Materials
                    </span>
                    <p className="text-base font-bold text-white">{project.material}</p>
                  </div>
                )}

                {project.lighting && (
                  <div className="p-5 rounded-2xl bg-[#161616] border border-white/5 space-y-1">
                    <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider flex items-center gap-1.5">
                      <SparkleIcon className="w-3.5 h-3.5 text-[#FFF200]" /> Luminous Lighting
                    </span>
                    <p className="text-base font-bold text-white">{project.lighting}</p>
                  </div>
                )}

                {project.location && (
                  <div className="p-5 rounded-2xl bg-[#161616] border border-white/5 space-y-1">
                    <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ED1C24]" /> Project Location
                    </span>
                    <p className="text-base font-bold text-white">{project.location}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar CTAs */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 space-y-6 sticky top-32 shadow-2xl">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24]">
                    LIKE THIS WORK?
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    Let&apos;s create something similar for your business.
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#ED1C24] hover:bg-[#c8171e] text-white font-bold py-6 text-sm shadow-lg shadow-[#ED1C24]/25"
                  >
                    <Link
                      href={`/quote?service=${encodeURIComponent(
                        project.categorySlug
                      )}&project=${encodeURIComponent(project.slug)}`}
                    >
                      <span>GET A QUOTE</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghostWhite"
                    size="lg"
                    className="w-full bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 font-bold py-6 text-sm transition-all"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>CHAT ON WHATSAPP</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <Section variant="dark" padding="lg">
          <Container>
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ED1C24]">
                MORE REAL WORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Related Signage Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relProj) => (
                <PortfolioCard key={relProj.id} project={relProj} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Fullscreen Lightbox Modal */}
      <PortfolioLightbox
        images={project.images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
        title={project.title}
      />
    </main>
  );
}
