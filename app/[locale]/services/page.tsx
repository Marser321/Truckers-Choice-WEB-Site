import { getLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services, localize, type JourneyStage } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { JourneyTimeline } from "@/components/ui/JourneyTimeline";
import { SectionBackground } from "@/components/ui/SectionBackground";

const journeyStages: Array<{ stage: JourneyStage; number: string; label: { en: string; es: string } }> = [
  { stage: "start", number: "01", label: { en: "Start the business", es: "Arranca el negocio" } },
  { stage: "operate", number: "02", label: { en: "Prepare to operate", es: "Prepárate para operar" } },
  { stage: "comply", number: "03", label: { en: "Keep records ready", es: "Mantén registros listos" } },
];

export default async function ServicesPage() {
  const locale = await getLocale();
  return (
    <main>
      <InteriorHero eyebrow={locale === "es" ? "Una mesa. Todo conectado." : "One desk. Everything connected."} title={locale === "es" ? "Servicios para mantener tu operación en marcha." : "Services built to keep your operation moving."} description={locale === "es" ? "Coordinamos seguros, permisos, autoridad, placas y cumplimiento para que no tengas que unir las piezas solo." : "We coordinate insurance, permits, authority, plates and compliance so you do not have to connect the pieces alone."} video={{ mp4: "/media/urban-loop.mp4", poster: "/images/media-posters/urban-loop.jpg" }} />

      <section className="relative hidden overflow-hidden border-b border-white/5 bg-background pt-10 pb-6 md:block">
        <SectionBackground variant="route" imagePosition="center right" density="quiet" transition="bottom" />
        <Container className="relative z-10">
          <JourneyTimeline />
        </Container>
      </section>

      <Section className="bg-background" background="route" backgroundPosition="center right" backgroundDensity="rich">
        <Container className="flex flex-col gap-16">
          {journeyStages.map(({ stage, number, label }) => {
            const stageServices = services.filter((service) => service.journey === stage);
            if (stageServices.length === 0) return null;
            return (
              <div key={stage}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-bold text-accent">{number}</span>
                  <h2 className="type-card text-2xl text-text md:text-3xl">
                    {locale === "es" ? label.es : label.en}
                  </h2>
                </div>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {stageServices.map((service) => {
                    const index = services.indexOf(service);
                    return (
                      <Link key={service.slug} href={`/services/${service.slug}`} className="catalog-card group relative min-h-[280px] md:min-h-[350px] overflow-hidden p-8 flex flex-col justify-between">
                        <Image src={service.cardImage} alt="" fill className="object-cover object-right opacity-30 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/95 via-[#050810]/80 to-transparent z-10 pointer-events-none" />
                        <div className="relative z-20 flex flex-col h-full justify-between">
                          <div>
                            <span className="font-display text-5xl font-bold text-white/10">0{index + 1}</span>
                            <h3 className="type-card mt-8 text-3xl text-text">{localize(service.title, locale)}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(service.description, locale)}</p>
                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                              {service.details.length} {locale === "es" ? "tramites confirmados" : "confirmed filings"}
                            </p>
                          </div>
                          <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent">{locale === "es" ? "Ver servicio" : "View service"} <ArrowRight className="h-4 w-4" /></span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </main>
  );
}
