import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 relative overflow-hidden",
        className
      )}
    >
      {/* Editorial Grid Backdrop */}
      <div className="absolute inset-0 editorial-grid opacity-[0.24] pointer-events-none z-0" />
      
      {/* Ambient Glows */}
      <div className="absolute -top-44 -left-44 w-96 h-96 rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none z-0" />
      <div className="absolute -bottom-44 -right-44 w-96 h-96 rounded-full bg-secondary/[0.03] blur-[100px] pointer-events-none z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </section>
  );
}
