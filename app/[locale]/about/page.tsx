import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";
import { Link } from "@/navigation";
import { Award, ShieldCheck, CheckCircle, Landmark, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: `${t("title")} | Truckers Choice`,
    description: t("hero_desc"),
  };
}

interface TimelineItem {
  yearKey: string;
  titleKey: string;
  descKey: string;
}

interface ValueItem {
  titleKey: string;
  descKey: string;
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "about" });

  const timelineItems: TimelineItem[] = [
    {
      yearKey: "timeline_1_year",
      titleKey: "timeline_1_title",
      descKey: "timeline_1_desc",
    },
    {
      yearKey: "timeline_2_year",
      titleKey: "timeline_2_title",
      descKey: "timeline_2_desc",
    },
    {
      yearKey: "timeline_3_year",
      titleKey: "timeline_3_title",
      descKey: "timeline_3_desc",
    },
    {
      yearKey: "timeline_4_year",
      titleKey: "timeline_4_title",
      descKey: "timeline_4_desc",
    },
  ];

  const values: ValueItem[] = [
    {
      titleKey: "value_1_title",
      descKey: "value_1_desc",
    },
    {
      titleKey: "value_2_title",
      descKey: "value_2_desc",
    },
    {
      titleKey: "value_3_title",
      descKey: "value_3_desc",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[130px] z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] z-0" />

      {/* Hero Section */}
      <Section className="relative z-10 pt-16 pb-8 md:pt-24 md:pb-12" background="local" backgroundPosition="center right">
        <Container className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
          {/* Hero Left - Text */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <Badge variant="amber" className="w-fit px-4 py-1.5 font-semibold text-xs tracking-wider">
              {t("eyebrow")}
            </Badge>
            <h1 className="type-hero type-hero--compact text-text">
              {t("hero_title")}
            </h1>
            <p className="text-emphasis font-body text-base leading-relaxed sm:text-lg">
              {t("hero_desc")}
            </p>
          </div>

          {/* Hero Right - Team Image Card */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full aspect-square max-w-[500px] rounded-2xl overflow-hidden border border-white/10 glass p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-office.webp"
                  alt="Modern Truckers Choice office building at dusk with a semi-truck parked outside"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="relative z-10 py-16 md:py-24 bg-surface/20 border-t border-b border-white/5" background="surface">
        <Container className="flex flex-col gap-12 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <Badge variant="amber" className="mx-auto w-fit">VALUES</Badge>
            <h2 className="type-section text-text">
              {t("values_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const icons = [Award, ShieldCheck, CheckCircle];
              const Icon = icons[idx];

              return (
                <div
                  key={idx}
                  className="glass border border-white/8 rounded-2xl p-8 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 bg-[#0F1626]/40"
                >
                  <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="type-card text-xl text-text">
                    {t(val.titleKey)}
                  </h3>
                  <p className="text-sm text-text-muted font-body leading-relaxed">
                    {t(val.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* History Timeline Section */}
      <Section className="relative z-10 py-16 md:py-24" background="route" backgroundPosition="center right">
        <Container className="flex flex-col gap-16 max-w-4xl mx-auto">
          <div className="text-center flex flex-col gap-3">
            <Badge variant="amber" className="mx-auto w-fit">TIMELINE</Badge>
            <h2 className="type-section text-text">
              {t("timeline_title")}
            </h2>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-white/10 ml-4 md:ml-32 flex flex-col gap-12">
            {timelineItems.map((item, idx) => {
              return (
                <div key={idx} className="relative pl-8 md:pl-12 group">
                  {/* Timeline circle marker */}
                  <div className="absolute -left-[6px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-[#070B14] transition-all duration-300 group-hover:bg-accent shadow-glow-amber" />

                  {/* Desktop Year Label (Left of timeline) */}
                  <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                    <span className="text-xl font-bold font-display text-accent">
                      {t(item.yearKey)}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="glass border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors duration-300 bg-[#0F1626]/20">
                    {/* Mobile Year Label */}
                    <div className="md:hidden mb-2">
                      <span className="text-sm font-bold font-display text-accent">
                        {t(item.yearKey)}
                      </span>
                    </div>
                    <h3 className="type-card mb-2 text-lg text-text">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted font-body leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Why Trust / Badges Section */}
      <Section className="relative z-10 py-16 md:py-24 bg-surface/20 border-t border-white/5" background="surface">
        <Container className="flex flex-col gap-12 max-w-6xl mx-auto text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            <Badge variant="amber" className="mx-auto w-fit">WHY TRUCKERS CHOICE</Badge>
            <h2 className="type-section text-text">
              {t("trust_title")}
            </h2>
            <p className="text-sm sm:text-base text-text-muted font-body leading-relaxed">
              {t("trust_desc")}
            </p>
          </div>

          {/* Trust badges grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            {[
              { label: locale === "es" ? "ATENCION BILINGUE" : "BILINGUAL SUPPORT", sub: "English + Spanish", desc: locale === "es" ? "Ayuda clara para decisiones operativas" : "Clear help for operational decisions" },
              { label: locale === "es" ? "SERVICIO CONECTADO" : "CONNECTED SERVICE", sub: locale === "es" ? "Un mismo flujo" : "One workflow", desc: locale === "es" ? "Seguro, permisos y cumplimiento coordinados" : "Insurance, permits and compliance coordinated together" },
              { label: locale === "es" ? "TRES OFICINAS" : "THREE OFFICES", sub: "Florida + New Jersey", desc: "Medley, Jersey City and Elizabeth" },
              { label: locale === "es" ? "30 SERVICIOS" : "30 SERVICES", sub: locale === "es" ? "Catalogo confirmado" : "Confirmed catalog", desc: locale === "es" ? "Cada servicio enlazado a su expediente" : "Every service linked to its operational file" },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="glass border border-white/5 bg-[#0F1626]/25 rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-2"
              >
                <div className="p-3 rounded-full bg-accent/5 text-accent mb-2">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold tracking-[0.14em] text-text uppercase">
                  {badge.label}
                </h3>
                <p className="text-[10px] text-accent font-semibold uppercase">
                  {badge.sub}
                </p>
                <p className="text-[11px] text-text-muted font-body leading-normal mt-1">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative z-10 py-16 md:py-28 bg-gradient-to-b from-transparent to-[#0F1626]/40 border-t border-white/5" background="route" backgroundPosition="center right">
        <Container className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="type-section text-text">
            {t("cta_title")}
          </h2>
          <p className="text-emphasis max-w-xl font-body text-base leading-relaxed sm:text-lg">
            {t("cta_desc")}
          </p>
          <div className="mt-4">
            <Link href="/contact">
              <GlowButton variant="primary" className="py-3.5 px-8 text-sm flex items-center gap-2">
                <span>{t("cta_button")}</span>
                <ArrowRight className="w-4 h-4" />
              </GlowButton>
            </Link>
          </div>
        </Container>
      </Section>

    </main>
  );
}
