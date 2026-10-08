"use client";

import { Container, Section } from "@/components/ui/container";
import { Store, UtensilsCrossed, Scissors, ShoppingBag, Pill, Briefcase } from "lucide-react";
import { MotionCard } from "@/components/ui/card";

const INDUSTRIES = [
  { name: "Restaurants & Cafes", icon: UtensilsCrossed, color: "#ED1C24", bg: "bg-[#ED1C24]/10" },
  { name: "Retail Showrooms", icon: Store, color: "#00AEEF", bg: "bg-[#00AEEF]/10" },
  { name: "Salons & Spas", icon: Scissors, color: "#EC008C", bg: "bg-[#EC008C]/10" },
  { name: "Fashion & Apparel", icon: ShoppingBag, color: "#FFF200", bg: "bg-[#FFF200]/10" },
  { name: "Clinics & Pharmacy", icon: Pill, color: "#8DC63F", bg: "bg-[#8DC63F]/10" },
  { name: "Corporate Offices", icon: Briefcase, color: "#00AEEF", bg: "bg-[#00AEEF]/10" },
];

export function Industries() {
  return (
    <Section variant="dark" padding="lg" className="border-t border-white/5">
      <Container>
        <div className="text-center mb-12">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Tailored Solutions</p>
          <h2 className="text-heading-lg mb-4 text-white">BRANDING FOR EVERY INDUSTRY</h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            Different businesses require unique visual identities. We tailor commercial artwork and print materials to match your target audience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map((industry, index) => (
            <MotionCard 
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="p-6 text-center bg-[#161616] border border-white/10 hover:border-white/20 transition-all cursor-default flex flex-col items-center justify-center space-y-3"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${industry.color}15`,
                  borderColor: `${industry.color}30`,
                }}
              >
                <industry.icon className="w-7 h-7" style={{ color: industry.color }} />
              </div>
              <h3 className="font-bold text-sm text-white leading-tight">
                {industry.name}
              </h3>
            </MotionCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
