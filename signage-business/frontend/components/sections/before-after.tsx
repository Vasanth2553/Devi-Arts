"use client";

import { useState, useRef, useEffect } from "react";
import { Container, Section } from "@/components/ui/container";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

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

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Section variant="dark" padding="lg">
      <Container>
        <div className="text-center mb-12">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Storefront Transformation</p>
          <h2 className="text-heading-lg mb-4 text-white">
            FROM PLAIN FACADE TO <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>POWERFUL BRAND</span>
          </h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            Real transformation: See how Devi Arts engineered, manufactured, and installed complete illuminated 3D LED signage and modern facade architecture for Unique Bazaar.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={containerRef}
            className="relative h-[380px] md:h-[480px] lg:h-[560px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl bg-black"
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
              src="/images/before-after/after.webp"
              alt="Branded Storefront with 3D LED Signage - Unique Bazaar by Devi Arts"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider z-20">
              AFTER (Devi Arts Branding)
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden border-r-2 border-white"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/images/before-after/before.webp"
                alt="Unbranded Storefront Before Transformation"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerWidth ? `${containerWidth}px` : (containerRef.current?.getBoundingClientRect().width || '100%') }}
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ED1C24] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
