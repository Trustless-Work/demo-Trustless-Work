import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "flex items-center gap-2 px-4 py-2 text-xs text-primary-700 dark:text-primary-300 bg-primary-50 border border-primary-200 dark:border-primary-700/50 rounded-lg hover:bg-primary-50 dark:bg-primary-900/50 dark:hover:bg-primary-900 transition-colors duration-200",
        destructive:
          "flex items-center gap-2 px-4 py-2 text-xs text-red-700 dark:text-red-300 bg-red-50 border border-red-200 dark:border-red-700/50 rounded-lg hover:bg-red-100 dark:bg-red-900/50 dark:hover:bg-red-900 transition-colors duration-200",
        success:
          "flex items-center gap-2 px-4 py-2 text-xs text-green-700 dark:text-green-300 bg-green-50 border border-green-200 dark:border-green-700/50 rounded-lg hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900 transition-colors duration-200",
        warning:
          "flex items-center gap-2 px-4 py-2 text-xs text-yellow-700 dark:text-yellow-400 bg-yellow-50 border border-yellow-200 dark:border-yellow-700/50 rounded-lg hover:bg-yellow-100 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 transition-colors duration-200",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
