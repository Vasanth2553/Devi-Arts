import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from the Django backend and common image services
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },

  // Environment variable exposure (public variables only)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_BUSINESS_PHONE: process.env.NEXT_PUBLIC_BUSINESS_PHONE,
    NEXT_PUBLIC_BUSINESS_EMAIL: process.env.NEXT_PUBLIC_BUSINESS_EMAIL,
    NEXT_PUBLIC_BUSINESS_NAME: process.env.NEXT_PUBLIC_BUSINESS_NAME,
  },
};

export default nextConfig;
