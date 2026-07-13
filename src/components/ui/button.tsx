import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline" | "danger" | "amber";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-amber-500 text-ink-950 hover:bg-amber-400": variant === "default",
            "bg-white/5 text-slate-100 hover:bg-white/10 border border-white/10":
              variant === "secondary",
            "hover:bg-white/5 text-slate-300": variant === "ghost",
            "border border-white/15 bg-transparent hover:bg-white/5 text-slate-100":
              variant === "outline",
            "bg-risk-red/90 text-white hover:bg-risk-red": variant === "danger",
            "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25":
              variant === "amber",
          },
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-11 px-6 text-base": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
