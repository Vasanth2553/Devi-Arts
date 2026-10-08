"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE (PLAIN STOREFRONT)",
  afterLabel = "AFTER (BRANDED SIGNAGE)",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative h-[350px] md:h-[480px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none border-2 border-gray-200 shadow-xl"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After Signage Installation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-4 right-4 bg-black/75 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider z-10">
        {afterLabel}
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 z-10 overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Signage Installation"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
        />
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0057ff] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
