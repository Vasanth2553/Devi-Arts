import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { BeforeAfter } from "@/components/sections/before-after";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Industries } from "@/components/sections/industries";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* 1. Hero with 5-Slide Auto Carousel & Trust Strip */}
      <Hero />
      
      {/* 2. Core Devi Arts Services */}
      <Services />
      
      {/* 3. Before & After Transformation Slider */}
      <BeforeAfter />
      
      {/* 4. Featured Portfolio Work */}
      <PortfolioPreview />
      
      {/* 6. Tailored Industry Solutions */}
      <Industries />
      
      {/* 7. Why Choose Devi Arts */}
      <WhyChooseUs />
      
      {/* 8. 6-Step Workflow Process */}
      <Process />
      
      {/* 9. FAQ Accordion */}
      <FAQ />
      
      {/* 10. Conversion CTA Banner */}
      <FinalCTA />
    </div>
  );
}
