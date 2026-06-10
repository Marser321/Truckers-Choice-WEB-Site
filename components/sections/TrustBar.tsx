"use client";

import { useLocale } from "next-intl";
import { Building2, Languages, Layers3, Route } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function TrustBar() {
  const locale = useLocale();
  const items = [
    { icon: Route, value: "20+", en: "Years serving truckers", es: "Años sirviendo a truckers" },
    { icon: Building2, value: "3", en: "Offices in FL & NJ", es: "Oficinas en FL y NJ" },
    { icon: Languages, value: "EN / ES", en: "Bilingual support", es: "Atención bilingüe" },
    { icon: Layers3, value: "One roof", en: "Insurance + permits + compliance", es: "Seguro + permisos + compliance" },
  ];

  return (
    <section className="relative z-30 -mt-10 px-4">
      <Container>
        <Reveal className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0b111f]/90 shadow-2xl backdrop-blur-xl md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.value} className="border-b border-white/8 p-6 last:border-0 md:border-r lg:border-b-0">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-5 font-display text-2xl font-bold text-text">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">{locale === "es" ? item.es : item.en}</p>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
