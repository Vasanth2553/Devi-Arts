/**
 * Portfolio / project data types
 */

export type PortfolioCategory =
  | "all"
  | "led"
  | "neon"
  | "3d-letters"
  | "acrylic"
  | "flex"
  | "acp"
  | "shop-branding"
  | "office"
  | "restaurant"
  | "salon"
  | "events";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  categories: PortfolioCategory[]; // A project can belong to multiple categories
  signType: string;
  material: string;
  lighting?: string;
  dimensions?: string;
  description: string;
  // Main showcase image
  heroImage: string;
  // Gallery images
  gallery: string[];
  // Before/after
  beforeImage?: string;
  afterImage?: string;
  // Client info (keep generic — no real client names without permission)
  clientType: string; // e.g. "Restaurant", "Retail Shop"
  clientLocation?: string;
  // Whether to feature on homepage
  featured: boolean;
  // Demo marker — remove when real projects are available
  isDemo: boolean;
}
