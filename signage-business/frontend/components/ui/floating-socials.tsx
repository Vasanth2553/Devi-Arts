"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig, buildWhatsAppUrl } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingSocials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
    };

    const timer = setTimeout(() => setIsVisible(true), 1000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3"
        >
          {/* Instagram Button */}
          <motion.a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Devi Arts on Instagram"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-[0_4px_20px_rgba(236,0,140,0.4)] hover:shadow-[0_6px_28px_rgba(236,0,140,0.6)] transition-shadow cursor-pointer"
            style={{
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {/* Tooltip on desktop */}
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#161616] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
              Instagram
            </span>
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href={buildWhatsAppUrl("Hi Devi Arts! I would like to inquire about your commercial art, printing, and signage services.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Devi Arts on WhatsApp"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.5,
              },
            }}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-shadow cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            {/* Tooltip on desktop */}
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#161616] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
              WhatsApp Us
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
