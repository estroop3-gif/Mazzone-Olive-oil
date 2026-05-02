import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-olive-800 text-white hover:bg-olive-700 active:bg-olive-900",
  secondary:
    "border-2 border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white",
  ghost: "text-olive-700 hover:text-olive-900 hover:bg-olive-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center font-medium tracking-wide uppercase transition-all duration-200 rounded-sm",
            variants[variant],
            sizes[size],
            className
          )
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
