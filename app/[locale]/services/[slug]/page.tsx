import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { getService, localize, services } from "@/lib/content";
import { Link } from "@/navigation";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const locale = await getLocale();
  const service = getService(slug);
  if (!service) return {};
  return { title: `${localize(service.title, locale)} | Truckers Choice`, description: localize(service.description, locale) };
}

export default async function ServicePage({ params: { slug } }: { params: { slug: string } }) {
  const locale = await getLocale();
  const service = getService(slug);
  if (!service) notFound();
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map((item) => ({ "@type": "Question", name: localize(item.question, locale), acceptedAnswer: { "@type": "Answer", text: localize(item.answer, locale) } })) };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <InteriorHero eyebrow={localize(service.title, locale)} title={localize(service.shortTitle, locale)} description={localize(service.description, locale)} image={service.painImage} />
      <section className="bg-background py-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">{locale === "es" ? "Por qué importa ahora" : "Why it matters now"}</span>
            <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-none text-text">{localize(service.urgency, locale)}</h2>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold text-background">{locale === "es" ? "Hablar con un especialista" : "Talk to a specialist"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {service.includes.map((item) => <div key={item.en} className="rounded-2xl border border-white/10 bg-surface/40 p-5 text-sm text-text-muted"><Check className="mb-5 h-5 w-5 text-accent" />{localize(item, locale)}</div>)}
          </div>
        </Container>
      </section>
      <section className="border-y border-white/8 bg-[#050810] py-24">
        <Container>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{locale === "es" ? "Cómo funciona" : "How it works"}</span>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 md:grid-cols-3">
            {service.process.map((item, index) => <div key={item.en} className="bg-[#080d18] p-8"><span className="font-display text-5xl font-bold text-white/10">0{index + 1}</span><h2 className="mt-16 font-display text-2xl font-bold text-text">{localize(item, locale)}</h2></div>)}
          </div>
        </Container>
      </section>
      <section className="bg-background py-24">
        <Container className="max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-text">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2>
          <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
            {service.faqs.map((item) => <details key={item.question.en} className="group py-6"><summary className="cursor-pointer list-none font-display text-xl font-bold text-text">{localize(item.question, locale)}</summary><p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">{localize(item.answer, locale)}</p></details>)}
          </div>
        </Container>
      </section>
    </main>
  );
}
