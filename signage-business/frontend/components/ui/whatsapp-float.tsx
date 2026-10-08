"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  // Show after scrolling a bit so it doesn't clash with initial hero animations
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={buildWhatsAppUrl("Hi! I would like to get a quote for a sign board.")}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] transition-shadow"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
