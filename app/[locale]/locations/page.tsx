import Image from "next/image";
import { getLocale } from "next-intl/server";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { locations, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/ui/SectionBackground";

export default async function LocationsIndexPage() {
  const locale = await getLocale();

  return (
    <main>
      <InteriorHero
        eyebrow={locale === "es" ? "Atencion local" : "Local support"}
        title={locale === "es" ? "Tres oficinas. Datos claros." : "Three offices. Clear information."}
        description={locale === "es" ? "Direcciones, telefonos, faxes y horarios desde una sola fuente verificada." : "Addresses, phones, faxes and hours from one verified source."}
        image="/images/bg-local-network.webp"
        imagePosition="center right"
        overlay="soft"
      />
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <SectionBackground variant="local" imagePosition="center right" density="rich" />
        <Container className="relative z-10 grid gap-6 lg:grid-cols-3">
          {locations.map((location) => (
            <article key={location.slug} className="catalog-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={`/images/loc-${location.slug}.jpg`} alt={location.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <h2 className="type-card text-3xl text-text">{location.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(location.description, locale)}</p>
                <div className="mt-7 space-y-4 border-t border-white/8 pt-6 text-sm text-text-muted">
                  <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-accent" />{location.address}</p>
                  <a href={`tel:${location.phoneRaw}`} className="flex gap-3 hover:text-accent"><Phone className="h-5 w-5 shrink-0 text-accent" />{location.phone}</a>
                  <p className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-accent" />{localize(location.hours, locale)}</p>
                </div>
                <Link href={`/locations/${location.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  {locale === "es" ? "Ver oficina" : "View office"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
