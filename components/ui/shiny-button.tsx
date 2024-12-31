"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const ShinyButton = forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium",
          "transition-all duration-300 hover:scale-105 active:scale-95",
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r",
          "before:transition-opacity hover:before:opacity-100",
          {
            "bg-primary text-white before:from-primary/50 before:to-primary before:opacity-0":
              variant === "primary",
            "bg-secondary text-primary before:from-secondary/50 before:to-secondary before:opacity-0":
              variant === "secondary",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);