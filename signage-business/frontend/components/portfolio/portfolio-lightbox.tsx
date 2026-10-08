"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export function PortfolioLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title,
}: PortfolioLightboxProps) {
  const total = images.length;

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && total > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={onClose}
        >
        {/* Top Header Bar */}
        <div
          className="p-4 md:p-6 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/80 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {title && <h3 className="text-sm md:text-base font-bold text-gray-200">{title}</h3>}
            <p className="text-xs text-gray-400 font-mono">
              {currentIndex + 1} / {total}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#ED1C24] text-white transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image View */}
        <div
          className="relative flex-1 flex items-center justify-center p-2 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {total > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[#ED1C24] text-white transition-colors focus:outline-none shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[84vh] w-full h-full flex items-center justify-center p-2"
            >
              <img
                src={images[currentIndex]}
                alt={`${title || "Portfolio Work"} - Photo ${currentIndex + 1}`}
                className="max-w-full max-h-[84vh] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[#ED1C24] text-white transition-colors focus:outline-none shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Bar if multiple images */}
        {total > 1 && (
          <div
            className="p-4 flex items-center justify-center gap-2 overflow-x-auto bg-gradient-to-t from-black/90 to-transparent z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  idx === currentIndex
                    ? "border-[#ED1C24] scale-105"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);
}
