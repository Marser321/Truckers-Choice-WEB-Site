import { getLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default async function ServicesPage() {
  const locale = await getLocale();
  return (
    <main>
      <InteriorHero eyebrow={locale === "es" ? "Una mesa. Todo conectado." : "One desk. Everything connected."} title={locale === "es" ? "Servicios para mantener tu operación en marcha." : "Services built to keep your operation moving."} description={locale === "es" ? "Coordinamos seguros, permisos, autoridad, placas y cumplimiento para que no tengas que unir las piezas solo." : "We coordinate insurance, permits, authority, plates and compliance so you do not have to connect the pieces alone."} video={{ mp4: "/media/urban-loop.mp4", poster: "/images/media-posters/urban-loop.jpg" }} />
      <Section className="bg-background">
        <Container className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 transition-colors hover:border-accent/40 min-h-[320px] flex flex-col justify-between">
              <Image src={service.cardImage} alt="" fill className="object-cover object-right opacity-30 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/95 via-[#050810]/80 to-transparent z-10 pointer-events-none" />
              <div className="relative z-20 flex flex-col h-full justify-between">
                <div>
                  <span className="font-display text-5xl font-bold text-white/10">0{index + 1}</span>
                  <h2 className="mt-8 font-display text-3xl font-bold text-text">{localize(service.title, locale)}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(service.description, locale)}</p>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent">{locale === "es" ? "Ver servicio" : "View service"} <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </Container>
      </Section>
    </main>
  );
}
