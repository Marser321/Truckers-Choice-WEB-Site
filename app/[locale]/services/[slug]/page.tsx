import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, FileText } from "lucide-react";
import {
  getService,
  getServiceTopics,
  getServiceDetailsForTopic,
  localize,
  services,
} from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ExpandableSection } from "@/components/ui/ExpandableSection";
import { ServicePagerNav } from "@/components/sections/ServicePagerNav";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${localize(service.title, locale)} | Truckers Choice`,
    description: localize(service.description, locale),
  };
}

export default async function ServicePage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const service = getService(slug);
  if (!service) notFound();

  const topics = getServiceTopics(service.slug);
  const relatedServices = service.relatedFamilySlugs
    .map((relatedSlug) => getService(relatedSlug))
    .filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((item) => ({
      "@type": "Question",
      name: localize(item.question, locale),
      acceptedAnswer: { "@type": "Answer", text: localize(item.answer, locale) },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* 1 · Compact hero + breadcrumb */}
      <InteriorHero
        compact
        eyebrow={locale === "es" ? "Expediente operativo" : "Operational file"}
        title={localize(service.shortTitle, locale)}
        description={localize(service.description, locale)}
        image={service.painImage}
      />
      <section className="relative overflow-hidden bg-background pt-6 pb-2 border-b border-white/5">
        <SectionBackground variant="route" imagePosition="center right" />
        <Container className="relative z-10">
          <Breadcrumbs steps={[{ label: localize(service.title, locale) }]} />
        </Container>
      </section>

      {/* 2 · What we solve + mini process */}
      <section className="relative overflow-hidden bg-background py-16 md:py-20">
        <SectionBackground variant="route" imagePosition="center right" />
        <Container className="relative z-10 max-w-4xl">
          <span className="catalog-kicker">{locale === "es" ? "Cuando importa" : "When it matters"}</span>
          <h2 className="type-subsection mt-5 text-balance text-3xl text-text md:text-4xl">
            {localize(service.urgency, locale)}
          </h2>
          <ul className="mt-7 flex flex-col gap-3">
            {topics.map((topic) => (
              <li key={topic.slug} className="flex items-start gap-3 text-sm leading-relaxed text-text">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {localize(topic.title, locale)}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?service=${service.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold text-background shadow-glow-amber transition-transform hover:-translate-y-0.5"
          >
            {locale === "es" ? "Hablar con un especialista" : "Talk to a specialist"} <ArrowRight className="h-4 w-4" />
          </Link>

          <ol className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-8 md:flex-row md:items-start md:gap-8">
            {service.process.map((item, index) => (
              <li key={item.en} className="flex items-start gap-3 md:flex-1">
                <span className="font-display text-sm font-bold text-accent">0{index + 1}</span>
                <span className="text-sm leading-relaxed text-text-muted">{localize(item, locale)}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 3 · Confirmed filings, condensed by topic */}
      <section className="relative overflow-hidden border-t border-white/8 bg-background py-16 md:py-20">
        <SectionBackground variant="document" imagePosition="center right" />
        <Container className="relative z-10 max-w-4xl">
          <span className="catalog-kicker">{locale === "es" ? "Trámites confirmados" : "Confirmed filings"}</span>
          <div className="mt-8 flex flex-col gap-4">
            {topics.map((topic, topicIdx) => {
              const topicDetails = getServiceDetailsForTopic(topic);
              return (
                <ExpandableSection
                  key={topic.slug}
                  id={topic.slug}
                  defaultOpen={topicIdx === 0}
                  summary={
                    <span className="flex min-w-0 items-center gap-4">
                      {topic.painImage && (
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <Image src={topic.painImage} alt="" fill className="object-cover opacity-70" sizes="56px" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="type-card block truncate text-xl text-text">
                          {localize(topic.title, locale)}
                        </span>
                        <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                          {topicDetails.length} {locale === "es" ? "trámites" : "filings"}
                        </span>
                      </span>
                    </span>
                  }
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                    {localize(topic.description, locale)}
                  </p>
                  <ul className="mt-5 divide-y divide-white/8 border-t border-white/8">
                    {topicDetails.map((item) => (
                      <li key={item.slug} id={item.slug} className="flex items-start gap-3 py-4 scroll-mt-28">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div className="min-w-0">
                          <p className="type-card text-base text-text">{localize(item.title, locale)}</p>
                          <p className="mt-1 text-xs leading-relaxed text-text-muted">{localize(item.whenNeeded, locale)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ExpandableSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 · FAQ */}
      <section className="relative overflow-hidden border-t border-white/8 bg-background py-16 md:py-20">
        <SectionBackground variant="surface" />
        <Container className="relative z-10 max-w-4xl">
          <h2 className="type-subsection text-3xl text-text md:text-4xl">
            {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {service.faqs.map((item) => (
              <ExpandableSection
                key={item.question.en}
                summary={
                  <span className="type-card text-lg text-text">{localize(item.question, locale)}</span>
                }
              >
                <p className="max-w-2xl text-sm leading-relaxed text-text-muted">{localize(item.answer, locale)}</p>
              </ExpandableSection>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 · Related + pager */}
      <section className="relative overflow-hidden border-t border-white/8 bg-[#050810] py-16 md:py-20">
        <SectionBackground variant="route" imagePosition="center right" />
        <Container className="relative z-10 max-w-4xl">
          <span className="catalog-kicker">{locale === "es" ? "Siguientes pasos relacionados" : "Related next steps"}</span>
          <div className="mt-7 flex flex-wrap gap-3">
            {relatedServices.map((related) => related && (
              <Link key={related.slug} href={`/services/${related.slug}`} className="catalog-pill px-5 py-3 text-sm font-bold">
                <Check className="mr-2 h-4 w-4" /> {localize(related.title, locale)}
              </Link>
            ))}
            <Link href="/services" className="catalog-pill px-5 py-3 text-sm font-bold">
              {locale === "es" ? "Todos los servicios" : "All services"} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <ServicePagerNav slug={service.slug} locale={locale} />
          </div>
        </Container>
      </section>
    </main>
  );
}
