"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  title,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % images.length);
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white">
          <div className="text-sm font-medium text-gray-300">
            {title && <span className="font-bold text-white mr-3">{title}</span>}
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main image presentation */}
        <div
          className="relative max-w-6xl max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]}
            alt={title || `Gallery Image ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex - 1 + images.length) % images.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
