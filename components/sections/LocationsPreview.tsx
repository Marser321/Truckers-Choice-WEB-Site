import Image from "next/image";
import { getLocale } from "next-intl/server";
import { ArrowUpRight, Phone } from "lucide-react";
import { locations, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";

export async function LocationsPreview() {
  const locale = await getLocale();

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      <SectionBackground variant="local" imagePosition="center right" />
      <Container className="relative z-10">
        <Reveal variant="mask-up">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{locale === "es" ? "Atención local" : "Local support"}</span>
          <h2 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-none tracking-[-0.04em] text-text md:text-6xl">
            {locale === "es" ? "Tres oficinas. El mismo equipo bilingüe." : "Three offices. One bilingual standard."}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal key={location.slug} delay={index * 0.08}>
              <article className="group overflow-hidden rounded-3xl border border-white/10 bg-surface/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={`/images/loc-${location.slug}.jpg`} alt={location.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-text">{location.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{localize(location.description, locale)}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-5">
                    <a href={`tel:${location.phoneRaw}`} className="inline-flex items-center gap-2 text-xs font-semibold text-text"><Phone className="h-4 w-4 text-accent" />{location.phone}</a>
                    <Link href={`/locations/${location.slug}`} aria-label={location.name} className="rounded-full border border-white/10 p-3 text-accent hover:border-accent"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
