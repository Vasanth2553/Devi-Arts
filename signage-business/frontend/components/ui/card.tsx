"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dark-themed card — used as default throughout the site.
 */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-[#161616] border border-white/8 rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#ED1C24]/30 hover:shadow-[0_12px_40px_-8px_rgba(237,28,36,0.15)] hover:-translate-y-1 overflow-hidden",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * A slightly lighter card for contrast in charcoal sections.
 */
export const DarkCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#ED1C24]/30 hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
DarkCard.displayName = "DarkCard";

/**
 * A Framer Motion enabled card for entrance animations — dark themed.
 */
export const MotionCard = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[#161616] border border-white/8 rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-300 hover:border-[#ED1C24]/30",
        className
      )}
      {...props}
    />
  )
);
MotionCard.displayName = "MotionCard";

// Card sub-components

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold leading-tight tracking-tight text-white", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-[#9A9A9A]", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
