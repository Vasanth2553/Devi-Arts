"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";
import { siteConfig, buildPhoneUrl, buildWhatsAppUrl } from "@/lib/config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  links: Array<{ name: string; href: string }>;
  onClose: () => void;
}

export function MobileNav({ links, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-30 bg-[#0d0d0d] pt-24 px-6 pb-24 overflow-y-auto lg:hidden flex flex-col justify-between"
    >
      <div className="flex flex-col space-y-6">
        {/* Mobile Nav Header Logo */}
        <div className="mb-4">
          <Link href="/" onClick={onClose} className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="Devi Arts"
              width={170}
              height={60}
              unoptimized
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 text-xl font-bold tracking-tight">
          {links.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between py-3 px-4 rounded-2xl transition-colors",
                    isActive
                      ? "text-[#ED1C24] bg-[#161616]"
                      : "text-gray-200 hover:text-white hover:bg-white/5"
                  )}
                  onClick={onClose}
                >
                  {link.name}
                  <ArrowRight className="w-5 h-5 opacity-40" />
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Contact CTAs */}
      <div className="pt-8 space-y-3">
        <Link
          href="/quote"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-[#ED1C24] text-white font-bold text-sm shadow-lg shadow-[#ED1C24]/20 hover:bg-[#c8171e] transition-colors"
        >
          Get Free Custom Quote <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href={buildWhatsAppUrl("Hi Devi Arts, I would like to inquire about commercial art and digital printing services.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-[#25D366]/15 text-[#25D366] font-bold text-sm hover:bg-[#25D366]/25 transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
        </a>

        <a
          href={buildPhoneUrl()}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-[#161616] text-gray-300 font-semibold text-sm hover:text-white transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-[#ED1C24]" /> Call {siteConfig.phone}
        </a>
      </div>
    </motion.div>
  );
}
