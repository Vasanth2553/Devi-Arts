"use client";

import Link from "next/link";
import { CheckCircle2, MessageSquare, Home, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/config";

interface QuoteSuccessProps {
  referenceId: string;
  customerName: string;
  serviceName: string;
  signType: string;
  material: string;
  lighting: string;
  dimensions: string;
}

export function QuoteSuccess({
  referenceId,
  customerName,
  serviceName,
  signType,
  material,
  lighting,
  dimensions,
}: QuoteSuccessProps) {
  const [copied, setCopied] = useState(false);

  const whatsappMessage = `Hi Devi Arts, I submitted a quotation request on your website.
Reference ID: ${referenceId}
Name: ${customerName}
Service: ${serviceName}
Sign Type: ${signType}
Material: ${material}
Lighting: ${lighting}
Dimensions: ${dimensions}`;

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#161616] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl text-center space-y-8">
      {/* Icon Badge */}
      <div className="w-20 h-20 mx-auto rounded-full bg-[#8DC63F]/10 text-[#8DC63F] flex items-center justify-center border-4 border-[#8DC63F]/20 shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#8DC63F]/10 text-[#8DC63F] text-xs font-bold uppercase tracking-wider border border-[#8DC63F]/30">
          Request Successfully Submitted
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Quote Request Has Been Received!
        </h2>

        <p className="text-[#9A9A9A] text-base max-w-lg mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{customerName}</strong>. Our commercial art and signage team is reviewing your specifications and will respond via WhatsApp or call within 2 hours.
        </p>
      </div>

      {/* Reference Card */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 space-y-3 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-xs font-bold text-[#9A9A9A] uppercase tracking-wider">Reference ID</span>
          <button
            onClick={handleCopyRef}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] hover:underline cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8DC63F]" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </>
            )}
          </button>
        </div>

        <div className="text-2xl font-black tracking-widest font-mono text-center py-3 bg-[#121212] rounded-xl border border-white/10 shadow-inner text-[#ED1C24]">
          {referenceId}
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
          <div>
            <span className="text-[#9A9A9A] block mb-0.5">Service:</span>
            <span className="font-bold text-white">{serviceName}</span>
          </div>
          <div>
            <span className="text-[#9A9A9A] block mb-0.5">Format:</span>
            <span className="font-bold text-white">{signType}</span>
          </div>
          <div>
            <span className="text-[#9A9A9A] block mb-0.5">Material:</span>
            <span className="font-bold text-white">{material}</span>
          </div>
          <div>
            <span className="text-[#9A9A9A] block mb-0.5">Dimensions:</span>
            <span className="font-bold text-white">{dimensions}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
        <Button asChild size="lg" className="rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba59] text-black shadow-lg shadow-[#25D366]/20">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="w-5 h-5 mr-2" /> Discuss Urgently on WhatsApp
          </a>
        </Button>

        <Button asChild variant="ghostWhite" size="lg" className="rounded-xl font-bold border border-white/10">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
