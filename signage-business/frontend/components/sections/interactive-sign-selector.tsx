"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SIGN_TYPES = [
  {
    id: "front-lit",
    name: "Front Lit LED",
    description: "The classic high-impact illuminated sign. Light shines brightly through the letter faces, ensuring maximum day and night readability.",
    image: "https://images.unsplash.com/photo-1542125633-8557db5c5cb2?q=80&w=1200&auto=format&fit=crop",
    color: "#ED1C24",
  },
  {
    id: "back-lit",
    name: "Back Lit (Halo Glow)",
    description: "Elegant and sophisticated. Raised off the wall with light projecting backward, creating a glowing architectural halo effect.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
    color: "#00AEEF",
  },
  {
    id: "neon-flex",
    name: "Custom Neon Flex",
    description: "Vibrant, flexible, and trendy. Delivers the classic aesthetic of glass neon with modern unbreakable silicone durability.",
    image: "https://images.unsplash.com/photo-1554290712-e640351074bd?q=80&w=1200&auto=format&fit=crop",
    color: "#EC008C",
  },
  {
    id: "acrylic",
    name: "Solid 3D Acrylic",
    description: "Clean, precision laser-cut letters mounted directly to the substrate. Perfect for executive suites and bright retail fronts.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    color: "#8DC63F",
  }
];

export function InteractiveSignSelector() {
  const [activeId, setActiveId] = useState(SIGN_TYPES[0].id);
  const activeSign = SIGN_TYPES.find(s => s.id === activeId) || SIGN_TYPES[0];

  return (
    <Section variant="dark" padding="lg" className="overflow-hidden border-t border-white/5">
      <Container>
        <div className="text-center mb-12">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Lighting Variations</p>
          <h2 className="text-heading-lg mb-4 text-white">
            CHOOSE YOUR <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>GLOW &amp; STYLE</span>
          </h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            How your signage is illuminated completely changes its character and mood. 
            Select an option below to preview the lighting aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col gap-3 order-2 lg:order-1">
            {SIGN_TYPES.map((sign) => {
              const isActive = activeId === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => setActiveId(sign.id)}
                  className={cn(
                    "flex flex-col text-left px-6 py-4 rounded-2xl border transition-all duration-300",
                    isActive 
                      ? "bg-[#161616] border-[#ED1C24]/50 shadow-lg shadow-[#ED1C24]/10" 
                      : "bg-[#121212] border-white/5 hover:bg-[#161616] hover:border-white/10"
                  )}
                >
                  <span className={cn(
                    "font-bold text-lg mb-1 transition-colors flex items-center justify-between",
                    isActive ? "text-white" : "text-gray-400"
                  )}>
                    <span>{sign.name}</span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sign.color }} />
                    )}
                  </span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[#9A9A9A] text-xs leading-relaxed mt-1"
                    >
                      {sign.description}
                    </motion.span>
                  )}
                </button>
              );
            })}

            <div className="mt-6 space-y-3">
              <Button asChild size="lg" className="w-full bg-[#ED1C24] hover:bg-[#c8171e] text-white font-bold shadow-lg shadow-[#ED1C24]/20">
                <Link href={`/quote?lighting=${activeId}`}>
                  Get Quote for {activeSign.name} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual Preview */}
          <div className="lg:col-span-8 order-1 lg:order-2 h-[380px] lg:h-[540px] relative rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSign.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={activeSign.image}
                alt={activeSign.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Overlay Gradient to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
            
            {/* Animated Glow effect badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={`badge-${activeSign.id}`}
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
            >
              <div 
                className="text-2xl md:text-4xl font-black text-white px-4 py-2 rounded-2xl bg-black/70 backdrop-blur border border-white/10 shadow-lg"
              >
                {activeSign.name}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
