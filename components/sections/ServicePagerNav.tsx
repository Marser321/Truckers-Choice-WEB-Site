import { ArrowLeft, ArrowRight } from "lucide-react";
import { services, localize } from "@/lib/content";
import { Link } from "@/navigation";

interface ServicePagerNavProps {
  slug: string;
  locale: string;
}

export function ServicePagerNav({ slug, locale }: ServicePagerNavProps) {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return null;
  const prev = index > 0 ? services[index - 1] : null;
  const next = index < services.length - 1 ? services[index + 1] : null;

  return (
    <nav
      aria-label={locale === "es" ? "Navegación entre servicios" : "Service navigation"}
      className="flex items-center justify-between gap-4 border-t border-white/8 pt-8"
    >
      {prev ? (
        <Link
          href={`/services/${prev.slug}`}
          className="group inline-flex min-w-0 items-center gap-2 text-sm font-bold text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="truncate">{localize(prev.title, locale)}</span>
        </Link>
      ) : (
        <span />
      )}
      <span className="shrink-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
        0{index + 1}/0{services.length}
      </span>
      {next ? (
        <Link
          href={`/services/${next.slug}`}
          className="group inline-flex min-w-0 items-center gap-2 text-sm font-bold text-text-muted transition-colors hover:text-text"
        >
          <span className="truncate">{localize(next.title, locale)}</span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
