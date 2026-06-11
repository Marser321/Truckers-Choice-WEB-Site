"use client";

import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelineStage {
  slug: string;
  number: string;
  label: { en: string; es: string };
}

const stages: TimelineStage[] = [
  {
    slug: "corporations-llc",
    number: "01",
    label: { en: "Corporations", es: "Corporaciones" },
  },
  {
    slug: "authority-registration",
    number: "02",
    label: { en: "Authority", es: "Autoridad" },
  },
  {
    slug: "irp-plates-titles",
    number: "03",
    label: { en: "IRP & Plates", es: "IRP y Placas" },
  },
  {
    slug: "permits-fuel-tax",
    number: "04",
    label: { en: "Permits", es: "Permisos" },
  },
  {
    slug: "truck-insurance",
    number: "05",
    label: { en: "Insurance", es: "Seguro" },
  },
  {
    slug: "dot-compliance",
    number: "06",
    label: { en: "Compliance", es: "Cumplimiento" },
  },
];

interface JourneyTimelineProps {
  /** Active service; omit to render a neutral, clickable index (hub mode). */
  currentSlug?: string;
}

export function JourneyTimeline({ currentSlug }: JourneyTimelineProps) {
  const locale = useLocale();
  const activeIndex = stages.findIndex((stage) => stage.slug === currentSlug);

  return (
    <div className="relative z-10 w-full overflow-x-auto pb-4 scrollbar-none">
      <div className="flex min-w-[768px] justify-between items-center px-4">
        {stages.map((stage, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;
          const labelText = locale === "es" ? stage.label.es : stage.label.en;

          return (
            <div key={stage.slug} className="flex-1 flex items-center relative">
              {/* Connector line (except for the last stage) */}
              {idx < stages.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[calc(50%+1rem)] right-[calc(-50%+1rem)] h-0.5 top-[18px] z-0 transition-colors duration-500",
                    isCompleted
                      ? "bg-accent"
                      : idx === activeIndex
                      ? "bg-gradient-to-r from-accent to-white/10"
                      : "bg-white/10"
                  )}
                />
              )}

              {/* Stage Node */}
              <Link
                href={`/services/${stage.slug}`}
                className="mx-auto flex flex-col items-center gap-2 z-10 group"
              >
                {/* Node circle */}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "border-accent bg-accent text-background"
                      : isActive
                      ? "border-accent bg-[#070B14] text-accent shadow-glow-amber scale-110"
                      : "border-white/10 bg-[#0c1322] text-text-muted group-hover:border-white/30 group-hover:text-text"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : (
                    <span className="font-display text-xs font-bold">{stage.number}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={cn(
                    "font-display text-[11px] font-bold uppercase tracking-wider text-center transition-colors",
                    isActive ? "text-accent" : "text-text-muted group-hover:text-text"
                  )}
                >
                  {labelText}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
