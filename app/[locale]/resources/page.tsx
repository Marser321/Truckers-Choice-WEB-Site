import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { localize, resources } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/ui/SectionBackground";

export default async function ResourcesPage() {
  const locale = await getLocale();
  return (
    <main>
      <InteriorHero eyebrow={locale === "es" ? "Recursos claros" : "Clear resources"} title={locale === "es" ? "Entiende la operación. Decide con confianza." : "Understand the operation. Decide with confidence."} description={locale === "es" ? "Guías prácticas bilingües para convertir requisitos complejos en próximos pasos claros." : "Practical bilingual guides that turn complex requirements into clear next steps."} image="/images/bg-operational-documents.webp" imagePosition="center right" overlay="soft" />
      <section className="relative overflow-hidden bg-background py-24"><SectionBackground variant="document" imagePosition="center right" density="rich" /><Container className="relative z-10 grid gap-5 md:grid-cols-3">{resources.map((item) => <Link key={item.slug} href={`/resources/${item.slug}`} className="catalog-card catalog-card--file p-7"><span className="catalog-card__visual" aria-hidden="true" /><p className="type-kicker">{localize(item.eyebrow, locale)}</p><h2 className="type-card mt-12 text-2xl text-text">{localize(item.title, locale)}</h2><p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(item.description, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-accent">{localize(item.readingTime, locale)} <ArrowRight className="h-4 w-4" /></span></Link>)}</Container></section>
    </main>
  );
}
