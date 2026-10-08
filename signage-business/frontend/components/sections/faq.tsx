"use client";

import { Container, Section } from "@/components/ui/container";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";

const FAQS = [
  {
    question: "What types of services does Devi Arts provide?",
    answer: "We specialize in end-to-end commercial art, high-resolution digital printing, flex and vinyl banners, LED sign boards (front-lit, back-lit/halo), 3D acrylic letters, vehicle graphics, and complete retail shop branding.",
  },
  {
    question: "How long does it take to manufacture and install signage?",
    answer: "Most digital printing and banner jobs are completed within 24 to 48 hours. Custom LED sign boards, 3D letters, and ACP boards generally take 4 to 7 working days from design sign-off.",
  },
  {
    question: "Do you provide design and artwork assistance?",
    answer: "Yes! Our experienced commercial artists can design your logo, layouts, and print files from scratch, or optimize your existing artwork for large-format high-definition printing.",
  },
  {
    question: "Do you offer on-site measurement and installation?",
    answer: "Yes, our technical team provides full on-site measurement visits, mounting assessments, safe structural installation, and professional electrical connections for illuminated signage.",
  },
  {
    question: "What materials and warranty do you offer on LED boards?",
    answer: "We use high-grade cast acrylic, weatherproof ACP cladding, and certified IP67 Samsung/equivalent LED modules. We provide a 1-year warranty on electronic components, with materials engineered for years of weather resistance.",
  },
];

export function FAQ() {
  return (
    <Section variant="white" padding="lg">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest mb-3">Helpful Information</p>
            <h2 className="text-heading-lg mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-[#9A9A9A] text-lg">
              Everything you need to know about our commercial art, printing, and signage process.
            </p>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {FAQS.map((faq, index) => (
              <Accordion.Item 
                key={index} 
                value={`item-${index}`}
                className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden data-[state=open]:border-[#ED1C24]/50 transition-colors"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full p-6 text-left focus:outline-none group">
                    <span className="font-bold text-white text-lg group-data-[state=open]:text-[#ED1C24] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-data-[state=open]:text-[#ED1C24] group-data-[state=open]:rotate-180 transition-transform duration-300" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="p-6 pt-0 text-[#9A9A9A] leading-relaxed text-base">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </Section>
  );
}
