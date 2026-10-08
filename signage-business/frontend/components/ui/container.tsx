import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A standard container that constraints max-width and centers content.
 * Used inside sections to keep content aligned.
 */
export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "white" | "light" | "charcoal" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * A wrapper for page sections — all variants remapped to the dark palette.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "white", padding = "md", ...props }, ref) => {
    // All variants remapped to dark theme
    const variants = {
      white: "bg-[#0d0d0d] text-[#f2f2f2]",
      light: "bg-[#161616] text-[#f2f2f2]",
      charcoal: "bg-[#1a1a1a] text-white",
      dark: "bg-[#0d0d0d] text-white",
    };

    const paddings = {
      none: "py-0",
      sm: "py-6 lg:py-10",
      md: "py-10 md:py-14 lg:py-18",
      lg: "py-12 md:py-16 lg:py-20",
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

