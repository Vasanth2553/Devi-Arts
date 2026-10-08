"use client";

import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

const MATERIALS = [
  {
    name: "Cast Acrylic",
    description: "Ultra-glossy crystal clarity. Weatherproof, UV-stable, and ideal for precision laser-cut 3D letters and glowing lightboxes.",
    uses: ["3D Letters", "Glow Signs", "Indoor Logos"],
    color: "#ED1C24",
  },
  {
    name: "ACP (Aluminium Composite)",
    description: "Rigid, heavy-duty architectural panels. The gold standard for outdoor shopfront fascias, building cladding, and totems.",
    uses: ["Shop Fascia", "Outdoor Boards", "Monoliths"],
    color: "#00AEEF",
  },
  {
    name: "Titanium & Stainless Steel",
    description: "Luxury metallic finish available in gold, rose gold, and brushed silver. Rust-proof with extraordinary lifespan.",
    uses: ["Luxury 3D Letters", "Corporate HQ", "Hotel Branding"],
    color: "#FFF200",
  },
  {
    name: "Star Flex & Vinyl",
    description: "High-density, UV-printed weatherproof PVC material. Brilliant color vibrancy for large outdoor hoardings and illuminated banners.",
    uses: ["Backlit Flex", "Frontlit Banners", "Hoardings"],
    color: "#8DC63F",
  },
  {
    name: "PVC Foam Sunboard",
    description: "Lightweight dense foam board engineered for direct high-resolution UV flatbed printing and promotional displays.",
    uses: ["Life-size Cutouts", "Promotional Standees", "In-store Posters"],
    color: "#EC008C",
  },
  {
    name: "Silicone Neon Flex",
    description: "Flexible, unbreakable LED tubes delivering the vintage aura of glass neon with 12V safety and energy efficiency.",
    uses: ["Cafe Signs", "Instagram Walls", "Decor Elements"],
    color: "#00AEEF",
  },
];

export function Materials() {
  return (
    <Section variant="white" padding="lg">
      <Container>
        <div className="text-center mb-12">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Durability &amp; Craft</p>
          <h2 className="text-heading-lg mb-4 text-white">CHOOSE YOUR MATERIAL</h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            The right material ensures your signage lasts for years in rain and sunshine. We source only certified, high-grade substrates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATERIALS.map((material, index) => (
            <Card key={index} className="h-full flex flex-col bg-[#161616] border border-white/10 hover:border-[#ED1C24]/30 shadow-xl">
              <CardContent className="p-7 flex-grow flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{material.name}</h3>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: material.color }}
                    />
                  </div>
                  <p className="text-[#9A9A9A] text-sm leading-relaxed">
                    {material.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-[#9A9A9A] uppercase tracking-wider mb-2.5">
                    Recommended Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {material.uses.map((use, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-lg font-semibold bg-white/5 border border-white/10 text-gray-200"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
