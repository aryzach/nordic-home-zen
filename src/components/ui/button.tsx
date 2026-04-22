import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-[colors,filter] duration-200 ease-out hover:brightness-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] shadow-none",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border-[1.5px] border-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))] bg-transparent",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:brightness-100",
        link: "text-primary underline-offset-4 hover:underline hover:brightness-100",
      },
      size: {
        default: "h-12 px-6 py-3.5",
        sm: "h-10 px-4 py-2.5",
        lg: "h-14 px-6 py-3.5",
        icon: "h-12 w-12",
      },
      shape: {
        pill: "rounded-full",
        card: "rounded-[14px]",
        rect: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "card",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
