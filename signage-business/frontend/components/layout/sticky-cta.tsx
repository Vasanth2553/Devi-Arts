"use client";

import Link from "next/link";
import { PhoneCall, MessageCircle, FileText } from "lucide-react";
import { buildPhoneUrl, buildWhatsAppUrl } from "@/lib/config";
import { usePathname } from "next/navigation";

export function StickyCTA() {
  const pathname = usePathname();

  // Hide on quote page since they are already getting a quote
  if (pathname.startsWith("/quote")) {
    return null;
  }

  return (
    <div className="sticky-cta">
      <a
        href={buildPhoneUrl()}
        className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white active:bg-white/10 transition-colors"
      >
        <PhoneCall className="w-5 h-5 text-[#ED1C24]" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
      </a>
      
      <a
        href={buildWhatsAppUrl("Hi Devi Arts, I would like to get a quote.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] active:bg-[#25D366]/25 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>
      
      <Link
        href="/quote"
        className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-[#ED1C24] text-white active:bg-[#c8171e] transition-colors shadow-lg shadow-[#ED1C24]/25 font-bold"
      >
        <FileText className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Quote</span>
      </Link>
    </div>
  );
}
