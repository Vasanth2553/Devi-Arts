"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "illuminated", name: "Illuminated & LED" },
  { id: "letters", name: "3D & Metal Letters" },
  { id: "facade", name: "Facade & Branding" },
];

const SERVICES = [
  {
    id: "neon-sign-boards",
    slug: "neon-sign-boards",
    category: "illuminated",
    title: "Neon Sign Boards",
    tagline: "Vibrant Custom Glow",
    badge: "Trending",
    badgeColor: "from-[#EC008C] to-[#00AEEF]",
    description: "Create vibrant and eye-catching illuminated signs for shops, restaurants, cafés, offices, and businesses.",
    image: "/images/services/neon-sign-boards.jpg",
    features: ["Shatterproof Silicone LED Neon", "12+ Luminous Color Options", "Energy-Efficient 12V Operation"],
    href: "/services/neon-sign-boards",
  },
  {
    id: "acp-cladding",
    slug: "acp-cladding",
    category: "facade",
    title: "ACP Cladding",
    tagline: "Modern Exterior Facade",
    badge: "Architectural",
    badgeColor: "from-[#00AEEF] to-[#8DC63F]",
    description: "Provide modern, durable, and professional exterior finishes using Aluminium Composite Panels for commercial buildings and business spaces.",
    image: "/images/services/acp-cladding.jpg",
    features: ["Weatherproof PVDF Coating", "Heavy GI Sub-Frame Mounting", "Metallic & Matte Panel Finishes"],
    href: "/services/acp-cladding",
  },
  {
    id: "acrylic-letters",
    slug: "acrylic-letters",
    category: "letters",
    title: "Acrylic Letters",
    tagline: "Laser-Cut Precision 3D",
    badge: "Popular",
    badgeColor: "from-[#ED1C24] to-[#EC008C]",
    description: "Create premium custom acrylic lettering for business names, logos, branding, storefronts, offices, and commercial spaces.",
    image: "/images/services/acrylic-letters.jpg",
    features: ["Laser-Cut Crystal Polish Edges", "3mm to 25mm Depth Thicknesses", "Gloss, Matte & Mirror Accents"],
    href: "/services/acrylic-letters",
  },
  {
    id: "vinyl-stickers",
    slug: "vinyl-stickers",
    category: "facade",
    title: "Vinyl Stickers",
    tagline: "High-Definition Graphics",
    badge: "Versatile",
    badgeColor: "from-[#FFF200] to-[#ED1C24]",
    description: "Provide customized vinyl stickers for glass, walls, vehicles, doors, windows, and other smooth surfaces for branding and promotional purposes.",
    image: "/images/services/vinyl-stickers.jpg",
    features: ["HD 1440 DPI Photographic Print", "Frosted Glass Privacy Decals", "Bubble-Free Air-Release Adhesive"],
    href: "/services/vinyl-stickers",
  },
  {
    id: "front-lit-boards",
    slug: "front-lit-boards",
    category: "illuminated",
    title: "Front-Lit Boards",
    tagline: "High-Visibility Storefronts",
    badge: "Best Seller",
    badgeColor: "from-[#ED1C24] to-[#FFF200]",
    description: "Create highly visible illuminated signage using front-facing LED lighting, ideal for storefronts and commercial businesses.",
    image: "/images/services/front-lit-boards.jpg",
    features: ["Ultra-Bright IP67 Samsung LEDs", "Translucent Acrylic Diffusion", "Zero Hotspots & Uniform Glow"],
    href: "/services/front-lit-boards",
  },
  {
    id: "back-lit-boards",
    slug: "back-lit-boards",
    category: "illuminated",
    title: "Back-Lit Boards",
    tagline: "Prestige Halo Illumination",
    badge: "Luxury",
    badgeColor: "from-[#FFF200] to-[#EC008C]",
    description: "Create premium signage with a glowing halo effect behind letters or logos, providing an elegant appearance and excellent nighttime visibility.",
    image: "/images/services/back-lit-boards.jpg",
    features: ["Architectural Warm & Cool Halo", "Concealed Standoff Mounting", "Solid Stainless / Acrylic Face"],
    href: "/services/back-lit-boards",
  },
  {
    id: "ss-letters",
    slug: "ss-letters",
    category: "letters",
    title: "Stainless Steel (SS) Letters",
    tagline: "Marine-Grade Metallic Finish",
    badge: "Durable",
    badgeColor: "from-[#00AEEF] to-[#ED1C24]",
    description: "Create durable and premium stainless-steel lettering with a sleek metallic finish for offices, showrooms, hotels, commercial buildings, and businesses.",
    image: "/images/services/ss-letters.png",
    features: ["Corrosion-Proof Grade 304/316 SS", "Mirror Chrome & Hairline Brushed", "Titanium Gold PVD Coating"],
    href: "/services/ss-letters",
  },
  {
    id: "trim-cap-letters",
    slug: "trim-cap-letters",
    category: "letters",
    title: "Trim Cap Letters",
    tagline: "Commercial Channel Letters",
    badge: "Commercial",
    badgeColor: "from-[#8DC63F] to-[#00AEEF]",
    description: "Create professional illuminated letters using trim-cap construction, suitable for storefronts, commercial buildings, and corporate branding.",
    image: "/images/services/trim-cap-letters.jpg",
    features: ["Heavy Aluminum Coil Depth", "Molded CAB Sealed Trim Capping", "Weather-Tight LED Protection"],
    href: "/services/trim-cap-letters",
  },
  {
    id: "mirror-frosted-service",
    slug: "mirror-frosted-service",
    category: "facade",
    title: "Mirror & Frosted Glass",
    tagline: "Architectural Privacy Film",
    badge: "New",
    badgeColor: "from-[#00AEEF] to-[#EC008C]",
    description: "Provide custom decorative frosted glass, privacy films, and mirrored glass graphics for offices, conference rooms, and commercial windows.",
    image: "/images/services/mirror-frosted-service.jpg",
    features: ["Custom Geometric & Logo Cutouts", "24/7 Office Glass Privacy", "Scratch-Resistant Architectural Film"],
    href: "/services/mirror-frosted-service",
  },
];

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredServices = selectedCategory === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <Section variant="dark" padding="lg" className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#ED1C24]/10 via-[#00AEEF]/5 to-transparent blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#ED1C24] mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Signage &amp; Branding Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              COMMERCIAL SIGNAGE &amp;{" "}
              <span className="bg-gradient-to-r from-[#ED1C24] via-[#FFF200] to-[#00AEEF] bg-clip-text text-transparent">
                BRANDING SERVICES
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-base sm:text-lg mt-3">
              Explore our 9 specialized signage boards and architectural finishes. Precision manufactured with premium materials and illuminated technology.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#ED1C24]/40 hover:bg-white/10 font-semibold text-sm text-gray-200 hover:text-white transition-all whitespace-nowrap group self-start md:self-end"
          >
            <span>All Services</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#ED1C24]" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none",
                  isActive
                    ? "text-white shadow-lg shadow-[#ED1C24]/20"
                    : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeServiceTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ED1C24] to-[#EC008C]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.id === "all" && <Zap className="w-3.5 h-3.5" />}
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid with Framer Motion Layout Animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isHovered = hoveredCard === service.id;
              return (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative rounded-3xl bg-[#141414] border border-white/10 hover:border-[#ED1C24]/50 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(237,28,36,0.15)] cursor-pointer"
                >
                  <Link href={service.href} className="flex flex-col h-full">
                    {/* Image Container with 16:9 ratio, Zoom & Gradient */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />

                      {/* Dynamic Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md bg-gradient-to-r",
                          service.badgeColor
                        )}>
                          {service.badge}
                        </span>
                      </div>

                      {/* Tagline */}
                      <div className="absolute bottom-2 left-4 right-4">
                        <p className="text-[11px] font-semibold text-[#FFF200] uppercase tracking-wider truncate">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ED1C24] transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Feature Bullet Points */}
                        <ul className="space-y-1.5">
                          {service.features.map((feat, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                              <CheckCircle2 className="w-3 h-3 text-[#00AEEF] flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Single Quote CTA */}
                      <div className="pt-4 mt-4 border-t border-white/5">
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/quote?service=${service.slug}`;
                          }}
                          className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#c8171e] text-white text-xs font-bold transition-all shadow-md shadow-[#ED1C24]/20"
                        >
                          <span>Get a Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

