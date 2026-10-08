"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function GlowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for ambient glow follower
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Check if hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* 1. Large Ambient Rainbow Aura using Devi Arts Palette (#ED1C24, #EC008C, #FFF200, #00AEEF, #8DC63F) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.85 : 0.55,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute w-72 h-72 rounded-full blur-[75px] mix-blend-screen animate-spin-slow"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #ED1C24 0%, #EC008C 25%, #00AEEF 50%, #8DC63F 75%, #FFF200 90%, #ED1C24 100%)",
          }}
        />
      </motion.div>

      {/* 2. Concentrated Soft Core Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 1.3 : 1,
          opacity: isHovered ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute w-28 h-28 rounded-full blur-[25px] mix-blend-screen"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(237,28,36,0.9) 0%, rgba(236,0,140,0.7) 40%, rgba(0,174,239,0.4) 75%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 3. Precise Center Laser Ring / Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? "#FFF200" : "#ED1C24",
          backgroundColor: isHovered ? "rgba(237, 28, 36, 0.25)" : "rgba(236, 0, 140, 0.15)",
        }}
        transition={{ duration: 0.1 }}
        className="absolute w-8 h-8 rounded-full border border-[#ED1C24]/80 shadow-[0_0_12px_rgba(237,28,36,0.9)] backdrop-blur-[1px] flex items-center justify-center"
      >
        {/* Tiny center pinpoint */}
        <div
          className="w-1.5 h-1.5 rounded-full transition-transform duration-150"
          style={{
            background: isHovered ? "#FFF200" : "#00AEEF",
            boxShadow: "0 0 6px #FFF200",
            transform: isHovered ? "scale(1.5)" : "scale(1)",
          }}
        />
      </motion.div>
    </div>
  );
}
