import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { resources, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/ui/SectionBackground";

export async function ResourcesPreview() {
  const locale = await getLocale();
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-[#050810] py-24">
      <SectionBackground variant="document" imagePosition="center right" />
      <Container className="relative z-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="type-kicker">{locale === "es" ? "Sin sopa de letras" : "No alphabet soup"}</span>
            <h2 className="type-section mt-4 max-w-3xl text-balance text-text">
              {locale === "es" ? "Entiende qué necesitas antes de firmar." : "Understand what you need before you sign."}
            </h2>
          </div>
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-accent">{locale === "es" ? "Todos los recursos" : "All resources"} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link key={resource.slug} href={`/resources/${resource.slug}`} className="group bg-[#080d18] p-8 transition-colors hover:bg-surface">
              <p className="type-kicker">{localize(resource.eyebrow, locale)}</p>
              <h3 className="type-card mt-12 text-balance text-2xl text-text">{localize(resource.title, locale)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(resource.description, locale)}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-text group-hover:text-accent">{localize(resource.readingTime, locale)} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
