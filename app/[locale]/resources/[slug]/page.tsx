import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getResource, localize, resources } from "@/lib/content";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}

export default async function ResourcePage({ params: { slug } }: { params: { slug: string } }) {
  const locale = await getLocale();
  const resource = getResource(slug);
  if (!resource) notFound();
  return (
    <main>
      <InteriorHero eyebrow={`${localize(resource.eyebrow, locale)} · ${localize(resource.readingTime, locale)}`} title={localize(resource.title, locale)} description={localize(resource.description, locale)} image="/images/bg-resources.png" />
      <article className="bg-background py-20"><Container className="max-w-3xl space-y-14">{resource.sections.map((section, index) => <section key={section.title.en}><span className="font-display text-5xl font-bold text-white/10">0{index + 1}</span><h2 className="mt-5 font-display text-3xl font-bold text-text">{localize(section.title, locale)}</h2><p className="mt-5 text-base leading-8 text-text-muted">{localize(section.body, locale)}</p></section>)}</Container></article>
    </main>
  );
}
