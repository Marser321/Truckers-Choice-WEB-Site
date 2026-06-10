"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { services, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function HorizontalServices() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure the real horizontal travel instead of a hardcoded percentage,
  // so the last card always lands fully in view at any viewport width.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(
    () =>
      scrollYProgress.on("change", (value) =>
        setActive(Math.min(services.length - 1, Math.max(0, Math.round(value * services.length))))
      ),
    [scrollYProgress]
  );

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section ref={sectionRef} className={`relative bg-[#050810] ${reduceMotion ? "" : "lg:h-[550vh]"}`}>
      {!reduceMotion && (
        <div className="hidden h-screen overflow-hidden lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-center">
          <Container className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {locale === "es" ? "Una mesa. Todo resuelto." : "One desk. Every next step."}
              </span>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-text">
                {locale === "es" ? "Tu operación no vive en departamentos separados." : "Your operation does not live in separate departments."}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="text-xs text-text-muted">{locale === "es" ? "Desplázate para explorar" : "Scroll to explore"}</span>
              <span className="font-display text-sm font-bold tabular-nums text-text">
                0{active + 1} <span className="text-text-muted">/ 0{services.length}</span>
              </span>
              <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left bg-accent" />
              </div>
            </div>
          </Container>

          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-[max(2rem,calc((100vw-80rem)/2))] pr-[20vw]">
            {services.map((service, index) => (
              <article key={service.slug} className="group relative h-[58vh] w-[72vw] max-w-[920px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
                <Image src={service.cardImage} alt={localize(service.title, locale)} fill className="object-cover object-right transition-transform duration-1000 group-hover:scale-105" sizes="72vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/85 to-[#050810]/25" />
                <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-end p-12">
                  <span className="mb-auto font-display text-7xl font-bold text-white/10">0{index + 1}</span>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">{localize(service.title, locale)}</p>
                  <h3 className="text-balance font-display text-5xl font-bold leading-none tracking-[-0.04em] text-text">{localize(service.shortTitle, locale)}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">{localize(service.description, locale)}</p>
                  <Link href={`/services/${service.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-bold text-text transition-colors hover:border-accent hover:text-accent">
                    {locale === "es" ? "Explorar servicio" : "Explore service"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      )}

      <div className={`py-20 ${reduceMotion ? "" : "lg:hidden"}`}>
        <Container>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{locale === "es" ? "Todo en un lugar" : "Everything in one place"}</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-none tracking-[-0.04em] text-text">
            {locale === "es" ? "Servicios conectados para una operación real." : "Connected services for a real operation."}
          </h2>
        </Container>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5">
          {services.map((service) => (
            <article key={service.slug} className="relative h-[520px] min-w-[88vw] snap-center overflow-hidden rounded-3xl border border-white/10 sm:min-w-[420px]">
              <Image src={service.cardImage} alt={localize(service.title, locale)} fill className="object-cover" sizes="88vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{localize(service.title, locale)}</p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-none text-text">{localize(service.shortTitle, locale)}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{localize(service.description, locale)}</p>
                <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  {locale === "es" ? "Ver servicio" : "View service"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
