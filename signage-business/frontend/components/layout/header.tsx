"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig, buildPhoneUrl } from "@/lib/config";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-black/40 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-5"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Transparent Logo */}
          <Link
            href="/"
            className="flex items-center group relative z-50 transition-transform duration-200 hover:scale-105"
            aria-label="Devi Arts – Commercial Artist & Digital Printers – Home"
          >
            <Image
              src="/logo.png"
              alt="Devi Arts – Commercial Artist & Digital Printers"
              width={220}
              height={75}
              priority
              unoptimized
              className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 relative py-1",
                    isActive
                      ? "text-[#ED1C24]"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED1C24] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 relative z-50">
            <a
              href={buildPhoneUrl()}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#ED1C24] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#ED1C24]" />
              <span>{siteConfig.phone}</span>
            </a>

            <Button asChild className="hidden sm:inline-flex bg-[#ED1C24] hover:bg-[#c8171e] text-white shadow-lg shadow-[#ED1C24]/25">
              <Link href="/quote">Get Free Quote</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-gray-300 hover:text-[#ED1C24] transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNav
            links={NAV_LINKS}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
