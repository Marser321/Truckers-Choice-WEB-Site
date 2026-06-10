import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { localize, resources } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";

export default async function ResourcesPage() {
  const locale = await getLocale();
  return (
    <main>
      <InteriorHero eyebrow={locale === "es" ? "Recursos claros" : "Clear resources"} title={locale === "es" ? "Entiende la operación. Decide con confianza." : "Understand the operation. Decide with confidence."} description={locale === "es" ? "Guías prácticas bilingües para convertir requisitos complejos en próximos pasos claros." : "Practical bilingual guides that turn complex requirements into clear next steps."} image="/images/journey-bg.jpg" />
      <section className="bg-background py-24"><Container className="grid gap-5 md:grid-cols-3">{resources.map((item) => <Link key={item.slug} href={`/resources/${item.slug}`} className="rounded-3xl border border-white/10 bg-surface/40 p-7 hover:border-accent/40"><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{localize(item.eyebrow, locale)}</p><h2 className="mt-12 font-display text-2xl font-bold leading-tight text-text">{localize(item.title, locale)}</h2><p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(item.description, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-accent">{localize(item.readingTime, locale)} <ArrowRight className="h-4 w-4" /></span></Link>)}</Container></section>
    </main>
  );
}
