"use client";

import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";

export interface BreadcrumbStep {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
}

export function Breadcrumbs({ steps }: BreadcrumbsProps) {
  const locale = useLocale();

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-20 mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-text-muted"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 transition-colors hover:text-accent"
        aria-label={locale === "es" ? "Inicio" : "Home"}
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />

      <Link
        href="/services"
        className="transition-colors hover:text-accent"
      >
        {locale === "es" ? "Servicios" : "Services"}
      </Link>

      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />
            {step.href && !isLast ? (
              <Link
                href={step.href}
                className="transition-colors hover:text-accent"
              >
                {step.label}
              </Link>
            ) : (
              <span className="text-text" aria-current="page">
                {step.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
