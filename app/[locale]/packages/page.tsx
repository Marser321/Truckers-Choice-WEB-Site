import { getLocale } from "next-intl/server";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";

export default async function PackagesPage() {
  const locale = await getLocale();
  return <main><InteriorHero eyebrow={locale === "es" ? "Caminos coordinados" : "Coordinated paths"} title={locale === "es" ? "Un plan según dónde estás hoy." : "A plan for where you are today."} description={locale === "es" ? "Los requisitos cambian según tu operación. Empezamos por entender el objetivo y luego coordinamos las piezas correctas." : "Requirements change with your operation. We start by understanding the goal, then coordinate the right pieces."} image="/images/bg-connected-routes.webp" imagePosition="center right" overlay="soft" /><PackagesTeaser /></main>;
}
