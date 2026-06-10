import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: GlowButtonProps) {
  const baseClass = cn(
    "relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
    variant === "primary"
      ? "bg-accent text-background shadow-glow-amber hover:shadow-glow-amber-hover hover:bg-accent/90 border border-accent"
      : "glass hover:bg-white/10 text-foreground border border-white/10",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
}
