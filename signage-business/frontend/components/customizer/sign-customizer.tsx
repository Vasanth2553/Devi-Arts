"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Type, 
  Palette, 
  Sun, 
  Moon, 
  Ruler, 
  Layers, 
  Zap, 
  Check, 
  ArrowRight, 
  Copy, 
  Sparkles,
  Info,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FONTS = [
  { id: "modern", name: "Modern Clean", family: "'Inter', sans-serif", previewText: "MODERN" },
  { id: "bold", name: "Bold Impact", family: "'Impact', 'Arial Black', sans-serif", previewText: "HEAVY" },
  { id: "classic", name: "Classic Serif", family: "'Georgia', 'Playfair Display', serif", previewText: "CLASSIC" },
  { id: "script", name: "Elegant Script", family: "'Dancing Script', 'Brush Script MT', cursive", previewText: "Elegant" },
  { id: "tech", name: "Futuristic Tech", family: "'Courier New', monospace", previewText: "SYSTEM" },
];

const SIGN_TYPES = [
  { id: "led", name: "LED Sign Board", tag: "Most Popular" },
  { id: "neon", name: "Neon Flex Sign", tag: "Trendy & Vibrant" },
  { id: "3d", name: "3D Acrylic Letters", tag: "Architectural" },
  { id: "acp", name: "ACP Cladding Lightbox", tag: "Storefront Facade" },
];

const COLORS = [
  { id: "electric-blue", name: "Electric Blue", hex: "#00f5ff", glow: "0 0 10px #00f5ff, 0 0 25px #00f5ff, 0 0 50px #00f5ff" },
  { id: "neon-pink", name: "Neon Pink", hex: "#ff007f", glow: "0 0 10px #ff007f, 0 0 25px #ff007f, 0 0 50px #ff007f" },
  { id: "warm-gold", name: "Warm Gold", hex: "#ffd700", glow: "0 0 10px #ffd700, 0 0 25px #ffd700, 0 0 45px #ffd700" },
  { id: "cool-white", name: "Cool White", hex: "#e0f7fa", glow: "0 0 10px #e0f7fa, 0 0 20px #e0f7fa, 0 0 40px #ffffff" },
  { id: "emerald-green", name: "Emerald Green", hex: "#00ff88", glow: "0 0 10px #00ff88, 0 0 25px #00ff88, 0 0 50px #00ff88" },
  { id: "ruby-red", name: "Ruby Red", hex: "#ff2a2a", glow: "0 0 10px #ff2a2a, 0 0 25px #ff2a2a, 0 0 50px #ff2a2a" },
  { id: "purple-glow", name: "Electric Purple", hex: "#b026ff", glow: "0 0 10px #b026ff, 0 0 25px #b026ff, 0 0 50px #b026ff" },
];

const LIGHTING_OPTIONS = [
  { id: "front-lit", name: "Front-Lit", desc: "Illuminated letter face for high contrast." },
  { id: "back-lit", name: "Halo Back-Lit", desc: "Soft ambient halo projecting behind letters." },
  { id: "edge-lit", name: "Edge-Lit", desc: "Sleek glowing perimeter outline." },
  { id: "neon-glow", name: "Neon Tube Glow", desc: "360-degree continuous vibrant neon tube." },
  { id: "non-lit", name: "Non-Illuminated", desc: "Dimensional 3D letters without internal LEDs." },
];

const BACKDROPS = [
  { id: "black-acp", name: "Matte Black ACP", class: "bg-[#111111]" },
  { id: "wood", name: "Modern Wood Slats", class: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800 via-neutral-900 to-black" },
  { id: "brick", name: "Exposed Brick Wall", class: "bg-stone-900" },
  { id: "glass", name: "Commercial Glass Facade", class: "bg-slate-900" },
];

export function SignCustomizer() {
  const [customText, setCustomText] = useState("VASANTH TEXTILES");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedSignType, setSelectedSignType] = useState(SIGN_TYPES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedLighting, setSelectedLighting] = useState(LIGHTING_OPTIONS[0]);
  const [selectedBackdrop, setSelectedBackdrop] = useState(BACKDROPS[0]);
  const [isNightMode, setIsNightMode] = useState(true);
  
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(2);
  const [unit, setUnit] = useState<"ft" | "in" | "cm" | "mm">("ft");

  const [copied, setCopied] = useState(false);

  const quoteUrl = `/quote?text=${encodeURIComponent(customText)}&signType=${selectedSignType.id}&font=${selectedFont.id}&color=${selectedColor.id}&lighting=${selectedLighting.id}&width=${width}&height=${height}&unit=${unit}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + quoteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getTextStyles = () => {
    const isLit = selectedLighting.id !== "non-lit";
    const opacity = isNightMode ? 1 : 0.85;

    let textShadow = "none";
    if (isLit) {
      if (selectedLighting.id === "front-lit") {
        textShadow = `0 0 10px ${selectedColor.hex}, 0 0 20px ${selectedColor.hex}, 0 0 40px ${selectedColor.hex}`;
      } else if (selectedLighting.id === "back-lit") {
        textShadow = `0 0 35px ${selectedColor.hex}, 0 0 70px ${selectedColor.hex}`;
      } else if (selectedLighting.id === "neon-glow") {
        textShadow = `0 0 5px #fff, 0 0 15px ${selectedColor.hex}, 0 0 30px ${selectedColor.hex}, 0 0 60px ${selectedColor.hex}`;
      } else if (selectedLighting.id === "edge-lit") {
        textShadow = `0 0 8px ${selectedColor.hex}, 0 0 16px ${selectedColor.hex}`;
      }
    } else {
      textShadow = "2px 4px 10px rgba(0,0,0,0.8)";
    }

    return {
      fontFamily: selectedFont.family,
      color: isLit ? (selectedLighting.id === "neon-glow" ? "#ffffff" : selectedColor.hex) : "#d1d5db",
      textShadow,
      opacity,
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Live Preview Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0057ff]" />
            <span className="font-bold text-gray-900 text-sm">Interactive Live Mockup</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Day / Night Environment Toggle */}
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isNightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" /> Night Mode
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Day Mode
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Live Signboard Canvas */}
        <div
          className={`relative h-[380px] sm:h-[450px] md:h-[500px] w-full rounded-3xl overflow-hidden border-4 border-gray-900 shadow-2xl transition-colors duration-500 flex items-center justify-center p-8 select-none ${
            selectedBackdrop.class
          } ${isNightMode ? "brightness-95" : "brightness-110"}`}
        >
          {/* Backdrop ambient lighting tint */}
          {isNightMode && selectedLighting.id !== "non-lit" && (
            <div
              className="absolute inset-0 opacity-25 blur-3xl pointer-events-none transition-all duration-500"
              style={{ backgroundColor: selectedColor.hex }}
            />
          )}

          {/* Width Dimension Indicator Banner */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 z-10">
            <Ruler className="w-3.5 h-3.5 text-[#00f5ff]" />
            <span>
              Width: {width} {unit}
            </span>
          </div>

          {/* Height Dimension Indicator Banner */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/75 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-10 hidden sm:block">
            <span>
              Height: {height} {unit}
            </span>
          </div>

          {/* Signage Display Unit */}
          <div className="relative z-10 text-center max-w-full px-4 py-8">
            <motion.div
              key={`${customText}-${selectedFont.id}-${selectedColor.id}-${selectedLighting.id}`}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={getTextStyles()}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider break-words leading-tight uppercase transition-all duration-300"
            >
              {customText || "YOUR SIGN TEXT"}
            </motion.div>
          </div>

          {/* Bottom Facade Bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-gray-400 z-10">
            <span className="bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              Type: <strong className="text-white">{selectedSignType.name}</strong>
            </span>
            <span className="bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              Lighting: <strong className="text-white">{selectedLighting.name}</strong>
            </span>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> This visual preview is for custom styling and color estimation. Final CAD dimensions, mounting hardware, and power adapter details are engineered upon quotation request.
          </p>
        </div>
      </div>

      {/* Control Panel Sidebar (5 cols on desktop) */}
      <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Customize Your Sign</h2>
          <p className="text-sm text-gray-500">Configure text, typography, colors, and dimensions.</p>
        </div>

        {/* 1. Text Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Type className="w-4 h-4 text-[#0057ff]" /> 1. Enter Your Sign Text
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value.toUpperCase())}
            placeholder="e.g. VASANTH TEXTILES"
            maxLength={35}
            className="w-full px-4 py-3 text-base font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0057ff] focus:border-[#0057ff] focus:outline-none uppercase"
          />
          <div className="text-right text-[11px] text-gray-400">{customText.length}/35 characters</div>
        </div>

        {/* 2. Font Style Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            2. Choose Font Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {FONTS.map((font) => {
              const isSelected = selectedFont.id === font.id;
              return (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0057ff]/10 border-[#0057ff] text-[#0057ff] font-bold"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="block text-xs font-semibold text-gray-500 mb-1">{font.name}</span>
                  <span style={{ fontFamily: font.family }} className="text-base truncate block font-extrabold">
                    {font.previewText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Sign Type */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0057ff]" /> 3. Select Signage Type
          </label>
          <div className="space-y-2">
            {SIGN_TYPES.map((type) => {
              const isSelected = selectedSignType.id === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedSignType(type)}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0057ff] text-white font-bold border-[#0057ff]"
                      : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-white" : "border-gray-400"}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-semibold">{type.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {type.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Color Options */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#0057ff]" /> 4. LED / Neon Glow Color
          </label>
          <div className="grid grid-cols-4 gap-3">
            {COLORS.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected ? "border-[#0057ff] bg-blue-50 ring-2 ring-[#0057ff]" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full shadow-inner border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] font-bold text-gray-700 truncate w-full text-center">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Lighting Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#0057ff]" /> 5. Lighting Effect
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LIGHTING_OPTIONS.map((light) => {
              const isSelected = selectedLighting.id === light.id;
              return (
                <button
                  key={light.id}
                  onClick={() => setSelectedLighting(light)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0057ff]/10 border-[#0057ff] text-[#0057ff] font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="block text-xs font-bold">{light.name}</span>
                  <span className="block text-[10px] text-gray-500 mt-0.5 line-clamp-1">{light.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Approximate Dimensions */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#0057ff]" /> 6. Approximate Dimensions
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <span className="block text-[10px] font-bold text-gray-500 mb-1">Width</span>
              <input
                type="number"
                min={1}
                max={100}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm font-bold bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-500 mb-1">Height</span>
              <input
                type="number"
                min={1}
                max={50}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm font-bold bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-500 mb-1">Unit</span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-3 py-2 text-sm font-bold bg-gray-50 border border-gray-300 rounded-xl"
              >
                <option value="ft">Feet (ft)</option>
                <option value="in">Inches (in)</option>
                <option value="cm">CM</option>
                <option value="mm">MM</option>
              </select>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <Button asChild variant="default" size="lg" className="w-full rounded-xl text-base font-bold bg-[#0057ff] hover:bg-[#0046cd]">
            <Link href={quoteUrl}>
              Request Official Quotation <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Link Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-500" /> Share / Save This Design Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
