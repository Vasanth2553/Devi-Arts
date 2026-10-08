"use client";

import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Requirement & Vision",
    description: "Share your business requirement, artwork files, or idea via WhatsApp, call, or our online quote builder.",
    color: "#ED1C24",
  },
  {
    number: "02",
    title: "Site Measurement & Consultation",
    description: "Our technical team reviews exact dimensions, visibility angles, lighting needs, and structural mounting points.",
    color: "#EC008C",
  },
  {
    number: "03",
    title: "Artwork & 3D Mockup",
    description: "Our commercial artists create precise digital mockups showing how your signage or print will look in real life.",
    color: "#FFF200",
  },
  {
    number: "04",
    title: "Quotation & Approval",
    description: "Transparent pricing breakdown with materials specified. Production commences immediately upon design sign-off.",
    color: "#00AEEF",
  },
  {
    number: "05",
    title: "Printing & Fabrication",
    description: "Your job is produced in our facility using high-definition printers, premium acrylics, and tested LED modules.",
    color: "#8DC63F",
  },
  {
    number: "06",
    title: "Installation & Delivery",
    description: "Our experienced crew installs your sign securely with proper electrical connections and safety testing.",
    color: "#ED1C24",
  },
];

export function Process() {
  return (
    <Section variant="white" padding="lg">
      <Container>
        <div className="text-center mb-16">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Our Workflow</p>
          <h2 className="text-heading-lg text-white mb-4">Our Streamlined Process</h2>
          <p className="text-[#9A9A9A] max-w-2xl mx-auto text-lg">
            A transparent 6-step workflow from your initial inquiry to spotless final installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-8 bg-[#161616] rounded-2xl border border-white/10 hover:border-[#ED1C24]/40 transition-all duration-300 shadow-xl overflow-hidden group hover:-translate-y-1"
            >
              {/* Giant background numeral */}
              <div 
                className="text-7xl font-black absolute right-4 top-4 select-none opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ color: step.color }}
              >
                {step.number}
              </div>

              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mb-6 shadow-md"
                  style={{
                    backgroundColor: `${step.color}20`,
                    color: step.color,
                    border: `1px solid ${step.color}40`,
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#9A9A9A] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
