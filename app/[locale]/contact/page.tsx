import { getLocale } from "next-intl/server";
import { Clock, Phone } from "lucide-react";
import { locations, localize } from "@/lib/content";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { Section } from "@/components/ui/Section";

export default async function ContactPage() {
  const locale = await getLocale();
  return (
    <main>
      <InteriorHero eyebrow={locale === "es" ? "Empieza la conversación" : "Start the conversation"} title={locale === "es" ? "Cuéntanos qué te está frenando." : "Tell us what is holding you back."} description={locale === "es" ? "Un formulario corto para ordenar el próximo paso. También puedes llamar directamente a cualquiera de nuestras oficinas." : "A short form to organize the next step. You can also call any of our offices directly."} image="/images/bg-contact.png" />
      <Section className="bg-background">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8"><QuoteWizard /></div>
          <aside className="space-y-4 lg:col-span-4">
            {locations.map((location) => <div key={location.slug} className="rounded-2xl border border-white/10 bg-surface/40 p-6"><h2 className="font-display text-xl font-bold text-text">{location.name}</h2><a href={`tel:${location.phoneRaw}`} className="mt-4 flex items-center gap-2 text-sm font-bold text-accent"><Phone className="h-4 w-4" />{location.phone}</a><p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-text-muted"><Clock className="mt-0.5 h-4 w-4 shrink-0" />{localize(location.hours, locale)}</p></div>)}
          </aside>
        </Container>
      </Section>
    </main>
  );
}
