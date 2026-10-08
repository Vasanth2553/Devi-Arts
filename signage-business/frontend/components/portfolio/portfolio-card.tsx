"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ImageOff, Layers } from "lucide-react";
import { PortfolioProject } from "@/data/portfolio";
import { PortfolioLightbox } from "./portfolio-lightbox";

interface PortfolioCardProps {
  project: PortfolioProject;
  aspectRatio?: string;
  className?: string;
}

export function PortfolioCard({
  project,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: PortfolioCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const primaryImage = project.images && project.images.length > 0 ? project.images[0] : null;

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.images && project.images.length > 0) {
      setLightboxIndex(0);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[#ED1C24]/60 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_20px_50px_rgba(237,28,36,0.15)] ${className}`}
      >
        <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full overflow-hidden">
          {/* Image Container */}
          <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#0A0A0A] border-b border-white/5`}>
            {primaryImage && !imageError ? (
              <motion.img
                src={primaryImage}
                alt={project.title}
                onError={() => setImageError(true)}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#181818] to-[#0D0D0D] text-center border border-white/5">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#ED1C24] mb-3">
                  <ImageOff className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#ED1C24] uppercase mb-1">DEVI ARTS</span>
                <span className="text-xs text-gray-400 font-medium">Project photo coming soon</span>
              </div>
            )}

            {/* Overlay deepens on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"
            />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur text-gray-200 border border-white/10 shadow-md">
                {project.category}
              </span>
            </div>

            {/* Eye button: opens image fully in lightbox */}
            {primaryImage && (
              <div
                className={`absolute bottom-3 right-3 z-10 transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-100 sm:opacity-0 sm:translate-y-1"
                }`}
              >
                <button
                  type="button"
                  onClick={handleOpenLightbox}
                  aria-label={`View full image of ${project.title}`}
                  title="View image fully"
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-[#ED1C24] backdrop-blur border border-white/20 hover:border-[#ED1C24] text-white transition-all duration-200 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Text content */}
          <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-3 bg-[#141414]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ED1C24] transition-colors leading-snug mb-1.5">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Material badge */}
            <div className="pt-2.5 border-t border-white/5">
              {project.material ? (
                <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 truncate">
                  <Layers className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                  <span className="truncate">{project.material}</span>
                </span>
              ) : (
                <span className="text-[11px] text-gray-500 font-mono uppercase">Devi Arts Signage</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Full image viewer lightbox */}
      <PortfolioLightbox
        images={project.images || []}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        title={project.title}
      />
    </>
  );
}
