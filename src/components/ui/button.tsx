import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Editorial button system — sharp corners, uppercase, tracked.
 * Mirrors .btn-primary / .btn-dark-outline / .btn-outline from index.css.
 * No rounded corners, no shadows, no gradients.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.1em] text-[0.82rem] leading-none rounded-none border-0 transition-[opacity,background-color,color,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Solid near-black
        default:
          "bg-[#171717] text-white font-bold hover:opacity-[0.85]",
        destructive:
          "bg-destructive text-destructive-foreground font-bold hover:opacity-[0.85]",
        // Dark outline on light backgrounds
        outline:
          "bg-transparent text-[#171717] font-semibold border border-[#171717] hover:bg-[#171717] hover:text-white",
        // Light outline on dark/photo backgrounds
        secondary:
          "bg-transparent text-white font-semibold border border-white/70 hover:bg-white hover:text-[#171717]",
        ghost:
          "bg-transparent text-[#171717] font-semibold hover:bg-[#171717]/5",
        link:
          "text-[#171717] underline-offset-4 hover:underline normal-case tracking-normal font-medium",
      },
      size: {
        default: "px-[1.6rem] py-[1rem]",
        sm: "px-4 py-2.5 text-[0.72rem]",
        lg: "px-7 py-[1.1rem]",
        icon: "h-12 w-12 p-0",
      },
      // kept for backwards-compat with existing call sites — all sharp now
      shape: {
        pill: "",
        card: "",
        rect: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rect",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, shape, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
