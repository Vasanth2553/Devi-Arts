"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CATEGORIES, PortfolioCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface PortfolioFiltersProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  projectCounts?: Record<string, number>;
}

export function PortfolioFilters({
  activeCategory,
  onSelectCategory,
  projectCounts = {},
}: PortfolioFiltersProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max px-1">
        {PORTFOLIO_CATEGORIES.map((cat: PortfolioCategory) => {
          const isActive = activeCategory === cat.id;
          const count = projectCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none whitespace-nowrap",
                isActive
                  ? "text-white shadow-lg shadow-[#ED1C24]/20"
                  : "text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activePortfolioFilter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ED1C24] to-[#EC008C]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{cat.name}</span>
                {typeof count === "number" && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                    )}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
