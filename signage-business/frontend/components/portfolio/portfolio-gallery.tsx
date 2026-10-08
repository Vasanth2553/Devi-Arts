"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { portfolioProjects, PORTFOLIO_CATEGORIES, getProjectsByCategory } from "@/data/portfolio";
import { PortfolioFilters } from "./portfolio-filters";
import { PortfolioGrid } from "./portfolio-grid";

export function PortfolioGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Sync URL query when filter changes
  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "all";
    if (catFromUrl !== activeCategory) {
      setActiveCategory(catFromUrl);
    }
  }, [searchParams, activeCategory]);

  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    if (id === "all") {
      router.push("/portfolio", { scroll: false });
    } else {
      router.push(`/portfolio?category=${id}`, { scroll: false });
    }
  };

  // Calculate dynamic project counts per filter
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { all: portfolioProjects.length };
    PORTFOLIO_CATEGORIES.forEach((cat) => {
      if (cat.id === "all") return;
      const filtered = portfolioProjects.filter((p) =>
        cat.categorySlugs.some((slug) => p.categorySlug.toLowerCase() === slug.toLowerCase())
      );
      counts[cat.id] = filtered.length;
    });
    return counts;
  }, []);

  const displayedProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      <PortfolioFilters
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        projectCounts={projectCounts}
      />

      <PortfolioGrid
        projects={displayedProjects}
        activeCategory={activeCategory}
        onResetFilter={() => handleSelectCategory("all")}
      />
    </div>
  );
}
