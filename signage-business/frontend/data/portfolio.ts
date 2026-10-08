export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  images: string[];
  featured?: boolean;
  location?: string;
  services?: string[];
  material?: string;
  lighting?: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  categorySlugs: string[];
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: "all", name: "ALL", categorySlugs: [] },
  { id: "neon", name: "NEON", categorySlugs: ["neon", "neon-sign-boards"] },
  { id: "acp", name: "ACP", categorySlugs: ["acp", "acp-cladding"] },
  { id: "backlit", name: "BACKLIT", categorySlugs: ["backlit", "backlit-boards"] },
  { id: "frontlit", name: "FRONTLIT", categorySlugs: ["frontlit", "frontlit-boards"] },
  { id: "ss-letters", name: "SS LETTERS", categorySlugs: ["ss-letters", "ss"] },
  { id: "trim-cap", name: "TRIM CAP", categorySlugs: ["trim-cap", "trim-cap-letters"] },
  { id: "acrylic", name: "ACRYLIC", categorySlugs: ["acrylic", "acrylic-letters"] },
  { id: "vinyl", name: "VINYL", categorySlugs: ["vinyl", "vinyl-work", "vinyl-stickers"] },
  { id: "foster-mirror", name: "FOSTER MIRROR", categorySlugs: ["foster-mirror", "mirror-frosted-service"] },
  { id: "led", name: "LED", categorySlugs: ["led", "led-sign-boards"] },
  { id: "3d-letters", name: "3D LETTERS", categorySlugs: ["3d-letters"] },
  { id: "printing", name: "PRINTING", categorySlugs: ["printing", "flex-printing", "digital-printing"] },
  { id: "branding", name: "BRANDING", categorySlugs: ["branding", "shop-branding", "office-branding"] },
];

export const portfolioProjects: PortfolioProject[] = [
  // ==========================================
  // 1. STAINLESS STEEL (SS) LETTERS (4 IMAGES)
  // ==========================================
  {
    id: "ss-001",
    slug: "3d-stainless-steel-lettering-1",
    title: "3D Stainless Steel Lettering - Mirror Polish",
    category: "SS Letters",
    categorySlug: "ss-letters",
    description: "Precision-crafted Grade 304 mirror chrome stainless steel 3D dimensional lettering.",
    images: ["/images/portfolio/ss-letters/ss (1).png"],
    featured: true,
    services: ["SS Letters", "3D Letters"],
    material: "Grade 304 Stainless Steel Sheet",
  },
  {
    id: "ss-002",
    slug: "3d-stainless-steel-lettering-2",
    title: "3D Stainless Steel Lettering - Brushed Finish",
    category: "SS Letters",
    categorySlug: "ss-letters",
    description: "Hairline brushed stainless steel box letter construction with mounting rods.",
    images: ["/images/portfolio/ss-letters/ss (2).png"],
    featured: true,
    services: ["SS Letters", "3D Letters"],
    material: "Hairline Brushed Stainless Steel",
  },
  {
    id: "ss-003",
    slug: "titanium-gold-pvd-ss-letters-1",
    title: "Titanium Gold PVD SS Letters - Gold Gloss",
    category: "SS Letters",
    categorySlug: "ss-letters",
    description: "Luxury titanium gold PVD coated stainless steel dimensional letters for corporate branding.",
    images: ["/images/portfolio/ss-letters/ss (3).png"],
    featured: true,
    services: ["SS Letters"],
    material: "PVD Titanium Gold Coated SS 304",
  },
  {
    id: "ss-004",
    slug: "titanium-gold-pvd-ss-letters-2",
    title: "Titanium Gold PVD SS Letters - Architectural",
    category: "SS Letters",
    categorySlug: "ss-letters",
    description: "Weather-proof titanium gold PVD metal letters with decade-long outdoor durability.",
    images: ["/images/portfolio/ss-letters/ss (4).png"],
    featured: false,
    services: ["SS Letters"],
    material: "PVD Coated Metal Alloy",
  },

  // ==========================================
  // 2. ACP CLADDING (9 IMAGES)
  // ==========================================
  {
    id: "acp-001",
    slug: "acp-cladding-facade-1",
    title: "Commercial ACP Facade Cladding - View 1",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "High-grade Aluminium Composite Panel (ACP) exterior building facade installation.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (1).png"],
    featured: true,
    services: ["ACP Cladding"],
    material: "3mm Weatherproof PVDF ACP Sheets",
  },
  {
    id: "acp-002",
    slug: "acp-cladding-facade-2",
    title: "Commercial ACP Facade Cladding - View 2",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Heavy GI sub-frame mounted ACP cladding work for retail showrooms.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (2).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "Grade-A ACP Sheet & GI Framing",
  },
  {
    id: "acp-003",
    slug: "acp-cladding-facade-3",
    title: "Commercial ACP Facade Cladding - View 3",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Sleek metallic panel cladding giving modern structural flatness.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (3).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "Metallic Finish ACP Panels",
  },
  {
    id: "acp-004",
    slug: "acp-storefront-panel-1",
    title: "Storefront ACP Panel Elevation - View 1",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Modern storefront facade transformation using architectural ACP panels.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (4).png"],
    featured: true,
    services: ["ACP Cladding", "Shop Branding"],
    material: "PVDF Coated Metallic ACP",
  },
  {
    id: "acp-005",
    slug: "acp-storefront-panel-2",
    title: "Storefront ACP Panel Elevation - View 2",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Seamless ACP cladding integrated with 3D signage mounts.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (5).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "Aluminium Composite Panel",
  },
  {
    id: "acp-006",
    slug: "acp-storefront-panel-3",
    title: "Storefront ACP Panel Elevation - View 3",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Weather-sealed ACP architectural elevation for business centers.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (6).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "Structural Silicone & ACP Sheets",
  },
  {
    id: "acp-007",
    slug: "acp-building-facade-1",
    title: "Building Exterior ACP Finish - View 1",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Multi-story commercial building exterior ACP sheet installation.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (7).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "4mm High-Impact ACP",
  },
  {
    id: "acp-008",
    slug: "acp-building-facade-2",
    title: "Building Exterior ACP Finish - View 2",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Smooth matte and metallic ACP panel finish.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (8).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "Grade-A ACP Sheet",
  },
  {
    id: "acp-009",
    slug: "acp-building-facade-3",
    title: "Building Exterior ACP Finish - View 3",
    category: "ACP Cladding",
    categorySlug: "acp",
    description: "Completed ACP architectural building facade.",
    images: ["/images/portfolio/acp-cladding/ACP Cladding (9).png"],
    featured: false,
    services: ["ACP Cladding"],
    material: "PVDF ACP Panels",
  },

  // ==========================================
  // 3. ACRYLIC LETTERS (5 IMAGES)
  // ==========================================
  {
    id: "acrylic-001",
    slug: "3d-acrylic-lettering-1",
    title: "3D Laser-Cut Acrylic Lettering - View 1",
    category: "Acrylic Letters",
    categorySlug: "acrylic",
    description: "Laser-cut 3D acrylic letters with crystal flame-polished edges.",
    images: ["/images/portfolio/acrylic/Acrylic Letter 1.png"],
    featured: true,
    services: ["Acrylic Letters", "3D Letters"],
    material: "Cast Acrylic (PMMA)",
  },
  {
    id: "acrylic-002",
    slug: "3d-acrylic-lettering-2",
    title: "3D Laser-Cut Acrylic Lettering - View 2",
    category: "Acrylic Letters",
    categorySlug: "acrylic",
    description: "Dimensional acrylic letters with high depth thickness.",
    images: ["/images/portfolio/acrylic/Acrylic Letter 2.png"],
    featured: false,
    services: ["Acrylic Letters"],
    material: "10mm Solid Cast Acrylic",
  },
  {
    id: "acrylic-003",
    slug: "custom-acrylic-name-board-1",
    title: "Custom Acrylic Name Board - View 1",
    category: "Acrylic Letters",
    categorySlug: "acrylic",
    description: "Gloss finish acrylic signage for commercial storefronts.",
    images: ["/images/portfolio/acrylic/Acrylic Letter 3.png"],
    featured: true,
    services: ["Acrylic Letters"],
    material: "Cast Acrylic & 3M VHB Mounts",
  },
  {
    id: "acrylic-004",
    slug: "custom-acrylic-name-board-2",
    title: "Custom Acrylic Name Board - View 2",
    category: "Acrylic Letters",
    categorySlug: "acrylic",
    description: "Reception feature wall acrylic 3D branding.",
    images: ["/images/portfolio/acrylic/Acrylic Letter 4.png"],
    featured: false,
    services: ["Acrylic Letters", "Office Branding"],
    material: "Colored Acrylic Sheets",
  },
  {
    id: "acrylic-005",
    slug: "custom-acrylic-name-board-3",
    title: "Custom Acrylic Name Board - View 3",
    category: "Acrylic Letters",
    categorySlug: "acrylic",
    description: "Precision laser engraved acrylic letter installation.",
    images: ["/images/portfolio/acrylic/Acrylic Letter 5.png"],
    featured: false,
    services: ["Acrylic Letters"],
    material: "Cast Acrylic PMMA",
  },

  // ==========================================
  // 4. BACKLIT BOARDS (5 IMAGES)
  // ==========================================
  {
    id: "backlit-001",
    slug: "halo-backlit-led-board-1",
    title: "Prestige Halo Back-Lit LED Board - View 1",
    category: "Backlit Boards",
    categorySlug: "backlit",
    description: "Halo backlit LED signboard casting ambient illumination backwards onto facade.",
    images: ["/images/portfolio/backlit/Backlit (1).png"],
    featured: true,
    services: ["Backlit Boards"],
    material: "Metallic Face & Rear Diffusers",
    lighting: "Warm White Halo LED",
  },
  {
    id: "backlit-002",
    slug: "halo-backlit-led-board-2",
    title: "Prestige Halo Back-Lit LED Board - View 2",
    category: "Backlit Boards",
    categorySlug: "backlit",
    description: "Refined silhouette halo lighting with concealed standoff wall mounts.",
    images: ["/images/portfolio/backlit/Backlit (2).png"],
    featured: false,
    services: ["Backlit Boards"],
    material: "Opaque Acrylic & Metal",
    lighting: "Halo LED Modules",
  },
  {
    id: "backlit-003",
    slug: "halo-backlit-led-board-3",
    title: "Prestige Halo Back-Lit LED Board - View 3",
    category: "Backlit Boards",
    categorySlug: "backlit",
    description: "Nighttime illuminated halo logo board.",
    images: ["/images/portfolio/backlit/Backlit (3).png"],
    featured: false,
    services: ["Backlit Boards"],
    material: "Grade 304 SS Face",
    lighting: "Natural White Halo LED",
  },
  {
    id: "backlit-004",
    slug: "architectural-halo-sign-1",
    title: "Architectural Halo Luminous Sign - View 1",
    category: "Backlit Boards",
    categorySlug: "backlit",
    description: "Luxurious halo lit entrance signage.",
    images: ["/images/portfolio/backlit/Backlit (4).png"],
    featured: true,
    services: ["Backlit Boards"],
    material: "Metal Box Letter & Standoffs",
    lighting: "Cool White Halo LED",
  },
  {
    id: "backlit-005",
    slug: "architectural-halo-sign-2",
    title: "Architectural Halo Luminous Sign - View 2",
    category: "Backlit Boards",
    categorySlug: "backlit",
    description: "Boutique storefront halo illuminated signboard.",
    images: ["/images/portfolio/backlit/Backlit (5).png"],
    featured: false,
    services: ["Backlit Boards"],
    material: "Opaque Sheet & LED Strips",
    lighting: "IP67 Halo LED Modules",
  },

  // ==========================================
  // 5. FOSTER MIRROR (4 IMAGES)
  // ==========================================
  {
    id: "foster-mirror-001",
    slug: "frosted-glass-privacy-film-1",
    title: "Architectural Frosted Glass Privacy Film - View 1",
    category: "Foster Mirror",
    categorySlug: "foster-mirror",
    description: "Custom cut frosted glass privacy film for corporate office partitions.",
    images: ["/images/portfolio/foster-mirror/Mirror Foster (1).png"],
    featured: true,
    services: ["Foster Mirror", "Office Branding"],
    material: "Dusted & Frosted Vinyl Film",
  },
  {
    id: "foster-mirror-002",
    slug: "frosted-glass-privacy-film-2",
    title: "Architectural Frosted Glass Privacy Film - View 2",
    category: "Foster Mirror",
    categorySlug: "foster-mirror",
    description: "Precision plotter-cut geometric privacy graphics for glass doors.",
    images: ["/images/portfolio/foster-mirror/Mirror Foster (2).png"],
    featured: false,
    services: ["Foster Mirror"],
    material: "Frosted Vinyl Film",
  },
  {
    id: "foster-mirror-003",
    slug: "mirror-frosted-glass-film-1",
    title: "Corporate Mirror & Frosted Glass Film - View 1",
    category: "Foster Mirror",
    categorySlug: "foster-mirror",
    description: "Decorative metallic mirror and frosted graphic application for conference rooms.",
    images: ["/images/portfolio/foster-mirror/Mirror Foster (3).png"],
    featured: true,
    services: ["Foster Mirror"],
    material: "Metallic Mirror & Dusted Film",
  },
  {
    id: "foster-mirror-004",
    slug: "mirror-frosted-glass-film-2",
    title: "Corporate Mirror & Frosted Glass Film - View 2",
    category: "Foster Mirror",
    categorySlug: "foster-mirror",
    description: "Scratch-resistant glass privacy film application.",
    images: ["/images/portfolio/foster-mirror/Mirror Foster (4).png"],
    featured: false,
    services: ["Foster Mirror"],
    material: "Architectural Glass Vinyl",
  },

  // ==========================================
  // 6. FRONTLIT BOARDS (1 IMAGE)
  // ==========================================
  {
    id: "frontlit-001",
    slug: "large-scale-frontlit-billboard",
    title: "Commercial Highway Front-Lit Billboard",
    category: "Frontlit Boards",
    categorySlug: "frontlit",
    description: "High-impact outdoor front-lit billboard structure engineered for maximum daytime and nighttime highway visibility.",
    images: ["/images/portfolio/frontlit/frontlit-001-1.jpg"],
    featured: true,
    services: ["Front-Lit Boards", "Flex / Banner Printing"],
    material: "Heavy Steel Truss Frame & UV Flex Vinyl",
    lighting: "Top-Mounted High-Power Floodlights",
  },

  // ==========================================
  // 7. NEON SIGN BOARDS (4 IMAGES)
  // ==========================================
  {
    id: "neon-001",
    slug: "custom-neon-bar-sign",
    title: "Custom BAR & Cocktail Glass Neon Sign",
    category: "Neon Sign Boards",
    categorySlug: "neon",
    description: "Custom luminous LED neon flex sign crafted with dual-tone pink and blue luminescence on a dark acrylic base.",
    images: ["/images/portfolio/neon/Neon Service 1.png"],
    featured: true,
    services: ["Neon Sign Boards"],
    material: "12V Silicone LED Neon Flex + Laser-Cut Acrylic Base",
    lighting: "Dual-Tone LED Neon (Pink & Blue)",
  },
  {
    id: "neon-002",
    slug: "custom-script-name-neon-sign",
    title: "Custom Script Name Neon Sign",
    category: "Neon Sign Boards",
    categorySlug: "neon",
    description: "Precision-bent script typography LED neon sign mounted on clear contoured acrylic backplate.",
    images: ["/images/portfolio/neon/Neon Service 2.png"],
    featured: true,
    services: ["Neon Sign Boards", "Acrylic Letters"],
    material: "Contour-Cut Clear Acrylic & Warm White LED Flex",
    lighting: "Warm White LED Neon",
  },
  {
    id: "neon-003",
    slug: "roots-n-rouge-illuminated-sign",
    title: "Roots N Rouge Illuminated Wall Sign",
    category: "Neon Sign Boards",
    categorySlug: "neon",
    description: "Vertical architectural illuminated entrance sign with neon typography for salon interior branding.",
    images: ["/images/portfolio/neon/Neon Service 3.png"],
    featured: true,
    services: ["Neon Sign Boards", "Backlit Boards"],
    material: "Wood-grain Metal Frame & Yellow LED Backlit Face",
    lighting: "High-Lumen Yellow Ambient LED",
  },
  {
    id: "neon-004",
    slug: "commercial-neon-display-wall",
    title: "Commercial Multi-Neon Display Wall",
    category: "Neon Sign Boards",
    categorySlug: "neon",
    description: "Custom commercial neon signage suite featuring Ice Cream, Fired Chicken, and Sparkle neon art.",
    images: ["/images/portfolio/neon/Neon Service 4.png"],
    featured: true,
    services: ["Neon Sign Boards", "Shop Branding"],
    material: "High-Density Silicone LED Flex & Wall Grid System",
    lighting: "RGB Multi-color LED Neon",
  },

  // ==========================================
  // 8. TRIM CAP LETTERS (5 IMAGES)
  // ==========================================
  {
    id: "trim-cap-001",
    slug: "trim-cap-channel-letters-1",
    title: "Illuminated Trim Cap Channel Letters - View 1",
    category: "Trim Cap Letters",
    categorySlug: "trim-cap",
    description: "Heavy-gauge aluminum coil returns with molded CAB sealed trim capping.",
    images: ["/images/portfolio/trim-cap/Trimp Cap (1).png"],
    featured: true,
    services: ["Trim Cap Letters", "3D Letters"],
    material: "CAB Trim Cap + Aluminum Coil + Translucent Acrylic",
    lighting: "IP67 Samsung LED Modules",
  },
  {
    id: "trim-cap-002",
    slug: "trim-cap-channel-letters-2",
    title: "Illuminated Trim Cap Channel Letters - View 2",
    category: "Trim Cap Letters",
    categorySlug: "trim-cap",
    description: "Clean structural borders and weather-tight illuminated channel letters.",
    images: ["/images/portfolio/trim-cap/Trimp Cap (2).png"],
    featured: false,
    services: ["Trim Cap Letters"],
    material: "CAB Trim Cap & Acrylic Face",
    lighting: "Internal White LED",
  },
  {
    id: "trim-cap-003",
    slug: "trim-cap-channel-letters-3",
    title: "Illuminated Trim Cap Channel Letters - View 3",
    category: "Trim Cap Letters",
    categorySlug: "trim-cap",
    description: "Vivid forward illumination for storefront building branding.",
    images: ["/images/portfolio/trim-cap/Trimp Cap (3).png"],
    featured: false,
    services: ["Trim Cap Letters"],
    material: "Molded Trim Cap & Aluminum Returns",
    lighting: "High-Output LEDs",
  },
  {
    id: "trim-cap-004",
    slug: "3d-trim-cap-signage-4",
    title: "3D Channel Letter Storefront Signage - View 4",
    category: "Trim Cap Letters",
    categorySlug: "trim-cap",
    description: "High impact resistance wind-tight channel letter construction.",
    images: ["/images/portfolio/trim-cap/Trimp Cap (4).png"],
    featured: true,
    services: ["Trim Cap Letters"],
    material: "Aluminum Return & CAB Edge Trim",
    lighting: "Uniform LED Diffusion",
  },
  {
    id: "trim-cap-005",
    slug: "3d-trim-cap-signage-5",
    title: "3D Channel Letter Storefront Signage - View 5",
    category: "Trim Cap Letters",
    categorySlug: "trim-cap",
    description: "Custom color trim capping and letter heights.",
    images: ["/images/portfolio/trim-cap/Trimp Cap (5).jpg"],
    featured: false,
    services: ["Trim Cap Letters"],
    material: "Aluminum Return Depth Sheet",
    lighting: "Internal Waterproof LEDs",
  },

  // ==========================================
  // 9. VINYL WORK (4 IMAGES)
  // ==========================================
  {
    id: "vinyl-001",
    slug: "custom-wall-vinyl-graphics-1",
    title: "Full-Wall Custom Vinyl Graphics - View 1",
    category: "Vinyl Work",
    categorySlug: "vinyl",
    description: "1440 DPI photographic resolution printed wall vinyl graphics installation.",
    images: ["/images/portfolio/vinyl/vinyl (1).png"],
    featured: true,
    services: ["Vinyl Work", "Shop Branding"],
    material: "1440 DPI Eco-Solvent Matte Laminated Vinyl",
  },
  {
    id: "vinyl-002",
    slug: "custom-wall-vinyl-graphics-2",
    title: "Full-Wall Custom Vinyl Graphics - View 2",
    category: "Vinyl Work",
    categorySlug: "vinyl",
    description: "Anti-scratch matte laminated self-adhesive interior wall branding.",
    images: ["/images/portfolio/vinyl/vinyl (2).png"],
    featured: false,
    services: ["Vinyl Work"],
    material: "Self-Adhesive Cast Vinyl",
  },
  {
    id: "vinyl-003",
    slug: "glass-window-vinyl-decal-1",
    title: "Commercial Glass Window Decal - View 1",
    category: "Vinyl Work",
    categorySlug: "vinyl",
    description: "Bubble-free air-release adhesive window graphics and promotional stickers.",
    images: ["/images/portfolio/vinyl/vinyl (3).png"],
    featured: true,
    services: ["Vinyl Work"],
    material: "Air-Release Self-Adhesive Vinyl",
  },
  {
    id: "vinyl-004",
    slug: "glass-window-vinyl-decal-2",
    title: "Commercial Glass Window Decal - View 2",
    category: "Vinyl Work",
    categorySlug: "vinyl",
    description: "UV overlaminated outdoor longevity vinyl window branding.",
    images: ["/images/portfolio/vinyl/vinyl (4).png"],
    featured: false,
    services: ["Vinyl Work"],
    material: "UV Overlaminated Vinyl",
  }
];

// Helper Functions
export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(categoryFilterId: string): PortfolioProject[] {
  if (!categoryFilterId || categoryFilterId === "all") {
    return portfolioProjects;
  }
  const categoryConfig = PORTFOLIO_CATEGORIES.find((c) => c.id === categoryFilterId);
  if (!categoryConfig) return portfolioProjects;

  return portfolioProjects.filter((p) =>
    categoryConfig.categorySlugs.some(
      (slug) => p.categorySlug.toLowerCase() === slug.toLowerCase()
    )
  );
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured);
}

export function getRelatedProjects(currentProject: PortfolioProject, limit = 3): PortfolioProject[] {
  return portfolioProjects
    .filter((p) => p.id !== currentProject.id)
    .filter(
      (p) =>
        p.categorySlug === currentProject.categorySlug ||
        (p.services && currentProject.services && p.services.some((s) => currentProject.services?.includes(s)))
    )
    .slice(0, limit);
}
