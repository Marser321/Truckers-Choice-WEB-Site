import { getLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { packages, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export async function PackagesTeaser() {
  const locale = await getLocale();
  return (
    <Section className="bg-background" background="route" backgroundPosition="center right">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent-2/5 blur-[150px] pointer-events-none z-0" />
      <Container className="relative">
        <Reveal variant="mask-up">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{locale === "es" ? "Elige tu camino" : "Choose your path"}</span>
          <h2 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-none tracking-[-0.04em] text-text md:text-6xl">
            {locale === "es" ? "No necesitas comprar trámites. Necesitas un plan." : "You do not need a pile of filings. You need a plan."}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {packages.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.07}>
              <article className="h-full rounded-3xl border border-white/10 bg-surface/45 p-7 transition-colors hover:border-accent/35">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{localize(item.bestFor, locale)}</p>
                <h3 className="mt-4 font-display text-3xl font-bold text-text">{localize(item.title, locale)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(item.description, locale)}</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {item.includes.map((included) => (
                    <div key={included.en} className="flex items-center gap-2 text-xs text-text-muted"><Check className="h-4 w-4 text-accent" />{localize(included, locale)}</div>
                  ))}
                </div>
                <Link href={`/contact?package=${item.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  {locale === "es" ? "Cotizar este plan" : "Quote this plan"} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
