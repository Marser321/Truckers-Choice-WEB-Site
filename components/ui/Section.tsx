import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  SectionBackground,
  type SectionBackgroundVariant,
  type SectionBackgroundDensity,
} from "@/components/ui/SectionBackground";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: SectionBackgroundVariant;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundDensity?: SectionBackgroundDensity;
  backgroundTransition?: "none" | "top" | "bottom" | "both";
}

export function Section({
  children,
  className,
  id,
  background = "canvas",
  backgroundImage,
  backgroundPosition,
  backgroundDensity,
  backgroundTransition,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 relative overflow-hidden",
        className
      )}
    >
      <SectionBackground
        variant={background}
        image={backgroundImage}
        imagePosition={backgroundPosition}
        density={backgroundDensity}
        transition={backgroundTransition}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </section>
  );
}
