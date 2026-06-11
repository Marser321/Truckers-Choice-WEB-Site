import { notFound } from "next/navigation";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { getLocation, locations, localize } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: `${location.name} | Truckers Choice`,
    description: localize(location.description, locale),
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function LocationDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const location = getLocation(slug);
  if (!location) notFound();

  const mapEmbedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main>
      <InteriorHero
        eyebrow={locale === "es" ? "Oficina local" : "Local office"}
        title={location.name}
        description={localize(location.description, locale)}
        image={`/images/loc-${location.slug}.jpg`}
        imagePosition="center"
        overlay="strong"
      />
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <SectionBackground variant="local" imagePosition="center right" />
        <Container className="relative z-10 grid gap-8 lg:grid-cols-2">
          <div className="catalog-card p-7 md:p-9">
            <span className="catalog-kicker">{locale === "es" ? "Informacion verificada" : "Verified information"}</span>
            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-accent" />
                <div><h2 className="type-card text-xl text-text">{locale === "es" ? "Direccion" : "Address"}</h2><p className="mt-2 text-sm text-text-muted">{location.address}</p></div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-6 w-6 shrink-0 text-accent" />
                <div><h2 className="type-card text-xl text-text">{locale === "es" ? "Telefono y fax" : "Phone and fax"}</h2><a href={`tel:${location.phoneRaw}`} className="mt-2 block text-sm font-bold text-accent">{location.phone}</a><p className="mt-1 text-xs text-text-muted">Fax: {location.fax}</p></div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-6 w-6 shrink-0 text-accent" />
                <div><h2 className="type-card text-xl text-text">{locale === "es" ? "Horario" : "Hours"}</h2><p className="mt-2 text-sm text-text-muted">{localize(location.hours, locale)}</p></div>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-3 border-t border-white/8 pt-7">
              <a href={`tel:${location.phoneRaw}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-bold text-background"><Phone className="h-4 w-4" />{locale === "es" ? "Llamar oficina" : "Call office"}</a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-bold text-text hover:border-accent"><Navigation className="h-4 w-4 text-accent" />{locale === "es" ? "Como llegar" : "Get directions"}</a>
            </div>
          </div>
          <div className="catalog-card overflow-hidden p-3">
            <iframe title={location.name} src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-[480px] w-full rounded-2xl opacity-80 invert-[90%] hue-rotate-180 contrast-125 saturate-50 brightness-[85%]" />
          </div>
        </Container>
      </section>
    </main>
  );
}
