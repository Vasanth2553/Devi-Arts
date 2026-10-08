import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#ED1C24] text-white hover:bg-[#c8171e] shadow-[0_4px_12px_rgba(237,28,36,0.25)] hover:shadow-[0_6px_20px_rgba(237,28,36,0.40)]",
        neon:
          "bg-[#ED1C24] text-white hover:bg-[#c8171e] shadow-[0_0_20px_rgba(237,28,36,0.5)] border border-[#EC008C]/40",
        secondary:
          "bg-white text-[#111111] border-2 border-[#d4d4d4] hover:border-[#111111] hover:bg-[#fafafa]",
        outline:
          "border-2 border-[#ED1C24] text-[#ED1C24] bg-transparent hover:bg-[#ED1C24] hover:text-white",
        ghost: "hover:bg-[#f0f0f0] hover:text-[#111111]",
        ghostWhite:
          "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1fbe5c] shadow-[0_4px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)]",
        link: "text-[#ED1C24] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = "Button";

export interface CTAButtonProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function CTAButton({
  href,
  children,
  variant = "default",
  size = "default",
  className,
  target,
  rel,
}: CTAButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  );
}

export { Button, buttonVariants };
