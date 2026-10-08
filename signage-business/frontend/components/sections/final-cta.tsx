"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { buildPhoneUrl } from "@/lib/config";
import { siteConfig } from "@/lib/config";

export function FinalCTA() {
  return (
    <Section variant="dark" padding="lg" className="relative overflow-hidden">
      {/* Animated gradient background glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#ED1C24] rounded-full blur-[160px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-[#EC008C] rounded-full blur-[160px] opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-[#ED1C24] text-xs font-semibold uppercase tracking-widest">Get Started Today</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            READY TO MAKE YOUR <br />
            <span style={{
              background: "linear-gradient(90deg, #ED1C24, #EC008C, #FFF200, #00AEEF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              BRAND UNFORGETTABLE?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#9A9A9A]">
            Let's create stunning commercial art and digital print solutions that make your business impossible to miss.
            Get a free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 h-13 bg-[#ED1C24] hover:bg-[#c8171e] text-white shadow-xl shadow-[#ED1C24]/30">
              <Link href="/quote">
                Get Free Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button asChild variant="ghostWhite" size="lg" className="w-full sm:w-auto text-base px-8 h-13 text-white border border-white/10">
              <a href={buildPhoneUrl()}>
                <PhoneCall className="w-5 h-5 mr-2 text-[#ED1C24]" />
                Call {siteConfig.phone}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
