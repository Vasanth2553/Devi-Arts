"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { getFeaturedProjects } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";

export function PortfolioPreview() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Section variant="light" padding="lg" className="bg-[#0D0D0D]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-3 border border-[#ED1C24]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Work • Real Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              FEATURED <span style={{
                background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>WORK</span>
            </h2>
            <p className="text-base sm:text-lg text-[#9A9A9A] mt-2">
              Real work. Real craftsmanship. Explore selected commercial signage installations completed by Devi Arts.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#ED1C24]/40 hover:bg-white/10 font-bold text-sm text-white transition-all group self-start md:self-end whitespace-nowrap shadow-lg"
          >
            <span>VIEW ALL WORK</span>
            <ArrowRight className="w-4 h-4 text-[#ED1C24] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => {
            const isFeaturedLarge = index === 0;
            const isWide = index === 3;
            const aspectRatio = isFeaturedLarge
              ? "aspect-[16/10]"
              : isWide
              ? "aspect-[16/9]"
              : "aspect-[4/3]";

            return (
              <PortfolioCard
                key={project.id}
                project={project}
                aspectRatio={aspectRatio}
                className={
                  isFeaturedLarge
                    ? "md:col-span-2 lg:col-span-2"
                    : isWide
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }
              />
            );
          })}
        </div>

        {/* Bottom CTA Link */}
        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ED1C24] hover:bg-[#c8171e] text-white font-black text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#ED1C24]/25 group"
          >
            <span>EXPLORE FULL PORTFOLIO ({featuredProjects.length}+ PROJECTS)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
