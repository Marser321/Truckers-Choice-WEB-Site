import { getLocale } from "next-intl/server";
import { Phone } from "lucide-react";
import { locations } from "@/lib/content";
import { Link } from "@/navigation";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { Container } from "@/components/ui/Container";

export async function CtaBand() {
  const locale = await getLocale();
  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-[-8%] bg-[url('/images/media-posters/cta-highway.jpg')] bg-cover bg-center opacity-55 blur-3xl scale-110" />
        <AmbientVideo
          mp4="/media/cta-highway.mp4"
          poster="/images/media-posters/cta-highway.jpg"
          alt="Truck driving toward the horizon"
          className="bg-[#050810]/35 [&_img]:object-contain [&_img]:brightness-[1.2] [&_img]:saturate-[1.15] [&_video]:object-contain [&_video]:brightness-[1.2] [&_video]:saturate-[1.15] [&_video]:contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-[#050810]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/90 via-transparent to-[#050810]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/25 via-transparent via-60% to-[#050810]" />
        <div className="absolute left-1/2 top-1/2 h-[58%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050810]/28 blur-[90px]" />
      </div>
      <Container className="relative z-10 flex min-h-[78vh] flex-col items-center justify-center text-center">
        <span className="type-kicker">{locale === "es" ? "Tu próxima carga empieza aquí" : "Your next load starts here"}</span>
        <h2 className="type-hero mt-6 max-w-5xl text-balance text-text">
          {locale === "es" ? "Menos papeleo. Más carretera." : "Less paperwork. More road."}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted">{locale === "es" ? "Cuéntanos qué estás tratando de resolver. Te ayudamos a ordenar el próximo paso." : "Tell us what you are trying to solve. We will help organize the next step."}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="rounded-full bg-accent px-7 py-4 text-sm font-bold text-background shadow-glow-amber">{locale === "es" ? "Empezar cotización" : "Start a quote"}</Link>
          <a href={`tel:${locations[0].phoneRaw}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-7 py-4 text-sm font-bold text-text backdrop-blur"><Phone className="h-4 w-4 text-accent" />{locations[0].phone}</a>
        </div>
      </Container>
    </section>
  );
}
