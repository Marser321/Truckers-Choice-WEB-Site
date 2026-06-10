import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "amber" | "blue" | "glass";
}

export function Badge({ children, className, variant = "amber" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variant === "amber" && "bg-accent/10 text-accent border border-accent/20",
        variant === "blue" && "bg-accent-2/10 text-accent-2 border border-accent-2/20",
        variant === "glass" && "glass text-foreground/80",
        className
      )}
    >
      {children}
    </span>
  );
}
