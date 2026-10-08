"use client";

import { Container, Section } from "@/components/ui/container";
import { MotionCard } from "@/components/ui/card";
import { PenTool, ShieldCheck, Zap, Factory, Award, Clock } from "lucide-react";

const REASONS = [
  {
    title: "Creative Excellence",
    description: "Our commercial artists bring decades of design expertise to every project, ensuring your brand looks stunning.",
    icon: PenTool,
    color: "#ED1C24",
  },
  {
    title: "Quality Materials",
    description: "We never compromise on raw materials — premium inks, durable substrates, and weather-resistant finishes.",
    icon: ShieldCheck,
    color: "#00AEEF",
  },
  {
    title: "In-House Printing",
    description: "Our own printing facility gives us full quality control at every step and eliminates middleman delays.",
    icon: Factory,
    color: "#EC008C",
  },
  {
    title: "Fast Turnaround",
    description: "We understand deadlines. Our streamlined workflow ensures your prints are ready when you need them.",
    icon: Zap,
    color: "#FFF200",
  },
  {
    title: "Award-Winning Art",
    description: "Recognised for outstanding commercial art and print quality across the region.",
    icon: Award,
    color: "#8DC63F",
  },
  {
    title: "Timely Support",
    description: "Dedicated support before, during, and after your project — we are always here for you.",
    icon: Clock,
    color: "#ED1C24",
  },
];

export function WhyChooseUs() {
  return (
    <Section variant="white" padding="lg">
      <Container>
        <div className="text-center mb-16">
          <p className="text-[#ED1C24] text-sm font-semibold uppercase tracking-widest mb-3">Why Devi Arts</p>
          <h2 className="text-heading-lg text-white mb-4">Why Choose Us?</h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            Hundreds of businesses trust Devi Arts for their commercial art and digital printing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <MotionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${reason.color}20`, border: `1px solid ${reason.color}40` }}
              >
                <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{reason.title}</h3>
              <p className="text-[#9A9A9A] leading-relaxed">
                {reason.description}
              </p>
            </MotionCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
