import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "button inline-flex min-h-11 items-center justify-center gap-[9px] whitespace-nowrap rounded-[9px] border border-transparent px-[17px] py-2.5 text-[13px] leading-[1.4] font-extrabold transition-colors",
  {
    variants: {
      variant: {
        primary: "button-primary",
        outline: "button-outline",
        gold: "button-gold",
        white: "button-white",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function Button({ asChild, variant, className, ...props }: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Component = asChild ? Slot : "button";
  return <Component data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />;
}
