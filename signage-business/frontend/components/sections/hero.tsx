// Hero section with responsive carousel
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Slide {
  id: number;
  title: string;
  slogan: string;
  tabLabel: string;
  image: string;
  imagePosition: string;
  description: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Light Up Your Brand",
    slogan: "LED Signage",
    tabLabel: "LED Signage",
    image: "/images/hero/slide-1.png",
    imagePosition: "center center",
    description:
      "Premium energy‑efficient LED and custom flex signage tailored to illuminate your commercial space day and night.",
  },
  {
    id: 2,
    title: "Make Your Storefront Stand Out",
    slogan: "Shop Branding",
    tabLabel: "Shop Branding",
    image: "/images/hero/slide-2.png",
    imagePosition: "center center",
    description:
      "Modern architectural panel weather‑proof cladding and complete retail exterior elevation design.",
  },
  {
    id: 3,
    title: "Signage That Gets Noticed",
    slogan: "Backlit Boards",
    tabLabel: "Backlit Boards",
    image: "/images/hero/slide-3.png",
    imagePosition: "center 40%",
    description:
      "High‑contrast glow boards and halo backlit lightboxes designed to capture customer attention from afar.",
  },
  {
    id: 4,
    title: "Built With Precision",
    slogan: "SS Letters",
    tabLabel: "SS Letters",
    image: "/images/hero/slide-4.png",
    imagePosition: "center center",
    description:
      "Laser‑cut block letters, solid brass, and brushed stainless steel (SS) architectural dimensional signage.",
  },
  {
    id: 5,
    title: "Complete Branding Solutions",
    slogan: "From Signage to Digital Printing",
    tabLabel: "Digital Printing",
    image: "/images/hero/slide-5.png",
    imagePosition: "center 35%",
    description:
      "End‑to‑end commercial art, high‑definition digital printing, vinyl wraps, flex banners, and total store identity solutions.",
  },
];

const TRUST_FEATURES = [
  "Commercial Art",
  "Digital Printing",
  "Flex & Vinyl Banners",
  "Premium Signage",
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative flex flex-col justify-between overflow-hidden bg-[#0D0D0D]"
      style={{
        minHeight: "clamp(620px, 86vh, 860px)",
        paddingTop: "clamp(72px, 8.5vh, 96px)",
        paddingBottom: "clamp(16px, 2.5vh, 32px)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover filter brightness-[1.12] contrast-[1.04]"
              style={{ objectPosition: activeSlide.imagePosition }}
              loading={activeSlide.id === 1 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient overlays with balanced opacity for brighter image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/88 via-[#0D0D0D]/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/85 via-transparent to-[#0D0D0D]/30 z-10" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#ED1C24] rounded-full blur-[160px] opacity-[0.10] pointer-events-none z-10" />
      </div>

      {/* Main slide content */}
      <Container className="relative z-20 flex-1 flex items-center py-4">
        <div className="w-full max-w-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Slogan badge */}
              <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/15 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#ED1C24] animate-pulse shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#F0F0F0] uppercase">
                  {activeSlide.slogan}
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-black text-white leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                {activeSlide.title}
              </h1>

              {/* Description */}
              <p
                className="text-[#DCDCDC] max-w-lg leading-relaxed drop-shadow-sm"
                style={{ fontSize: "clamp(0.875rem, 1.35vw, 1.0625rem)" }}
              >
                {activeSlide.description}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ED1C24] hover:bg-[#c8171e] text-white text-sm font-bold shadow-lg shadow-[#ED1C24]/25 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-[#ED1C24]/30 whitespace-nowrap"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/[0.18] text-white text-sm font-bold border border-white/20 hover:border-white/35 backdrop-blur-md shadow-md transition-all duration-200 hover:-translate-y-[2px] whitespace-nowrap"
                >
                  View Portfolio
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Bottom controls & trust features */}
      <div className="relative z-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3">
            {/* Slide tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? "bg-white text-black border-white shadow-md font-bold"
                        : "bg-black/40 hover:bg-black/60 text-white/80 border-white/15 hover:border-white/30"
                    }`}
                    aria-label={`Go to slide ${slide.id}`}
                  >
                    {"0" + slide.id}. {slide.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Counter and arrows */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="text-xs text-[#A8A8A8] font-mono tabular-nums">
                {"0" + (currentSlide + 1)} / {"0" + HERO_SLIDES.length}
              </span>
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 hover:border-white/30 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 hover:border-white/30 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trust features grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/55 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-white/10 shadow-xl">
            {TRUST_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-[#EFEFEF]">
                <CheckCircle2 className="w-4 h-4 text-[#ED1C24] shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium tracking-wide">{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
