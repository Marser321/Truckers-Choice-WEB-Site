import { notFound } from "next/navigation";
import { getResource, localize, resources } from "@/lib/content";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}

export default async function ResourcePage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const resource = getResource(slug);
  if (!resource) notFound();
  return (
    <main>
      <InteriorHero eyebrow={`${localize(resource.eyebrow, locale)} · ${localize(resource.readingTime, locale)}`} title={localize(resource.title, locale)} description={localize(resource.description, locale)} image="/images/bg-operational-documents.webp" imagePosition="center right" overlay="soft" />
      <article className="relative overflow-hidden bg-background py-20"><SectionBackground variant="document" imagePosition="center right" /><Container className="relative z-10 max-w-3xl space-y-14">{resource.sections.map((section, index) => <section key={section.title.en}><span className="font-display text-5xl font-bold text-white/10">0{index + 1}</span><h2 className="mt-5 font-display text-3xl font-bold text-text">{localize(section.title, locale)}</h2><p className="mt-5 text-base leading-8 text-text-muted">{localize(section.body, locale)}</p></section>)}</Container></article>
    </main>
  );
}
