"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, FolderKanban } from "lucide-react";
import { PortfolioProject, PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { PortfolioCard } from "./portfolio-card";

interface PortfolioGridProps {
  projects: PortfolioProject[];
  activeCategory: string;
  onResetFilter?: () => void;
}

export function PortfolioGrid({ projects, activeCategory, onResetFilter }: PortfolioGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      (project.services && project.services.some((s) => s.toLowerCase().includes(q)))
    );
  });

  const activeCategoryObj = PORTFOLIO_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#ED1C24]/50 transition-colors"
          />
        </div>

        <div className="text-xs text-gray-400 font-medium self-end sm:self-auto">
          Showing <span className="text-white font-bold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {/* Strict 2-Column Grid Layout */}
      {filteredProjects.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State for category with no uploaded photos */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-[#141414] border border-white/10 p-12 text-center max-w-xl mx-auto space-y-5 my-12"
        >
          <div className="w-16 h-16 rounded-full bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center mx-auto shadow-inner">
            <FolderKanban className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] font-bold text-[#ED1C24] uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 animate-pulse" /> Real Craftsmanship
            </span>
            <h3 className="text-2xl font-black text-white">MORE WORK COMING SOON</h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              We&apos;re currently adding completed photos for{" "}
              <strong className="text-gray-200">{activeCategoryObj?.name || "this category"}</strong>. We only showcase real completed Devi Arts projects.
            </p>
          </div>

          {onResetFilter && (
            <button
              onClick={onResetFilter}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#ED1C24] hover:bg-[#c8171e] text-white font-bold text-xs transition-all shadow-lg shadow-[#ED1C24]/20 cursor-pointer"
            >
              Explore All Categories →
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
