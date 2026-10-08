import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig, buildPhoneUrl, buildWhatsAppUrl } from "@/lib/config";
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-white pt-16 md:pt-20 pb-8 mt-auto relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Intro */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center group transition-transform duration-200 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Devi Arts"
                width={190}
                height={66}
                unoptimized
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9A9A9A] hover:bg-[#EC008C] hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9A9A9A] hover:bg-[#00AEEF] hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={buildWhatsAppUrl("Hi Devi Arts! I would like to inquire about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9A9A9A] hover:bg-[#25D366] hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9A9A9A] hover:bg-[#ED1C24] hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-semibold text-white tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Our Process", href: "/process" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9A9A9A] hover:text-[#ED1C24] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#ED1C24]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-semibold text-white tracking-wide uppercase text-sm">Our Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Neon Sign Boards", href: "/services/neon-sign-boards" },
                { name: "ACP Cladding", href: "/services/acp-cladding" },
                { name: "Acrylic Letters", href: "/services/acrylic-letters" },
                { name: "Vinyl Stickers", href: "/services/vinyl-stickers" },
                { name: "Front-Lit Boards", href: "/services/front-lit-boards" },
                { name: "Back-Lit Boards", href: "/services/back-lit-boards" },
                { name: "Stainless Steel (SS) Letters", href: "/services/ss-letters" },
                { name: "Trim Cap Letters", href: "/services/trim-cap-letters" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-[#9A9A9A] hover:text-[#ED1C24] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#ED1C24]" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-semibold text-white tracking-wide uppercase text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href={buildPhoneUrl()} className="flex items-start gap-3 text-[#9A9A9A] hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-[#ED1C24] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-sm">
                    <span className="block font-medium text-white mb-1">Call Us</span>
                    {siteConfig.phone}
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-[#9A9A9A] hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-[#00AEEF] mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="text-sm">
                    <span className="block font-medium text-white mb-1">Email Us</span>
                    {siteConfig.email}
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#9A9A9A]">
                <MapPin className="w-5 h-5 text-[#8DC63F] mt-0.5 shrink-0" />
                <div className="text-sm">
                  <span className="block font-medium text-white mb-1">Visit Us</span>
                  {siteConfig.address}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9A9A9A] text-sm">
            © {currentYear} Devi Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#9A9A9A]">
            <Link href="/about" className="hover:text-white transition-colors">About Devi Arts</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
