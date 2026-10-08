/**
 * Service data types
 * Keep service info centralized — later replaceable with API data.
 */

export interface ServiceMaterial {
  name: string;
  description: string;
  recommended: boolean;
}

export interface LightingOption {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface ServiceApplication {
  name: string;
  icon?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export type ServiceCategory =
  | "led"
  | "neon"
  | "3d-letters"
  | "acrylic"
  | "flex-printing"
  | "acp"
  | "shop-branding"
  | "outdoor"
  | "indoor"
  | "misc";

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  category: ServiceCategory;
  materials: ServiceMaterial[];
  lightingOptions: LightingOption[];
  applications: ServiceApplication[];
  features: ServiceFeature[];
  faqs: ServiceFAQ[];
  // Gallery images for the service page
  gallery: string[];
  // Whether this service is featured on the homepage
  featured: boolean;
  // Sort order
  order: number;
}
