/**
 * Site configuration — reads from environment variables.
 * All configurable business details live here.
 */

export const siteConfig = {
  // Business info
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Devi Arts",
  tagline: "Commercial Artist & Digital Printers",
  description:
    "From creative commercial artwork and large-format digital printing to premium LED, neon, acrylic and 3D signage — Devi Arts makes your brand impossible to miss.",

  // Contact
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 98765 43210",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@deviarts.com",

  // WhatsApp — number only, no + or spaces (e.g. 919876543210)
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",

  // Address
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Devi Arts Studio, Main Commercial Road, City Center, India",
  city: "City Center",
  state: "State",
  country: "India",

  // Working hours
  workingHours: {
    weekdays: "Mon – Sat: 9:00 AM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 3:00 PM",
  },

  // Social
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/deviarts_branding",
    facebook: "https://facebook.com/deviarts",
    youtube: "",
  },

  // URLs
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

/**
 * Build a pre-filled WhatsApp URL.
 * @param message - Pre-filled message text
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = siteConfig.whatsappNumber;
  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${number}${encodedMessage}`;
}

/**
 * Build a tel: link for the business phone.
 */
export function buildPhoneUrl(): string {
  const cleaned = siteConfig.phone.replace(/\s/g, "");
  return `tel:${cleaned}`;
}

/**
 * Build WhatsApp URL with quote context pre-filled.
 */
export function buildQuoteWhatsAppUrl(context: {
  service?: string;
  signType?: string;
  material?: string;
  lighting?: string;
  size?: string;
  businessName?: string;
}): string {
  const lines = [
    `Hi Devi Arts! I'm interested in a custom ${context.service || "signage/printing"}.`,
    "",
    context.businessName ? `Business: ${context.businessName}` : "",
    context.signType ? `Type: ${context.signType}` : "",
    context.material ? `Material: ${context.material}` : "",
    context.lighting ? `Lighting: ${context.lighting}` : "",
    context.size ? `Approximate Size: ${context.size}` : "",
    "",
    "Please share a quote.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return buildWhatsAppUrl(lines.trim());
}
