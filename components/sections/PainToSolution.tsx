"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { services, localize } from "@/lib/content";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { motionEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const story = [services[0], services[1], services[3], services[4], services[5]];

const FADE = 0.05;

function StorySlide({
  progress,
  index,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  index: number;
  src: string;
  alt: string;
}) {
  const start = index / story.length;
  const end = (index + 1) / story.length;
  const isFirst = index === 0;
  const isLast = index === story.length - 1;
  // Overlapping ranges: slide i fades in while slide i-1 fades out → seamless, reversible scrub.
  // WAAPI scroll-linked offsets must stay within [0, 1] and be non-decreasing.
  const opacity = useTransform(
    progress,
    isFirst ? [0, end - FADE, end] : isLast ? [start - FADE, start, 1] : [start - FADE, start, end - FADE, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [Math.max(0, start - FADE), end], [1.04, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image src={src} alt={alt} fill className="object-cover" sizes="60vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/80 via-transparent to-transparent" />
      <span className="absolute bottom-6 right-6 font-display text-7xl font-bold text-white/15">
        0{index + 1}
      </span>
    </motion.div>
  );
}

export function PainToSolution() {
  const locale = useLocale();
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(
    () =>
      scrollYProgress.on("change", (value) =>
        setActive(Math.min(story.length - 1, Math.max(0, Math.floor(value * story.length))))
      ),
    [scrollYProgress]
  );

  const current = story[active];

  return (
    <section ref={sectionRef} className={`relative bg-[#050810] ${isReduced ? "" : "lg:h-[450vh]"}`}>
      {!isReduced && (
        <div className="hidden h-screen lg:sticky lg:top-0 lg:block">
          <Container className="grid h-full grid-cols-12 items-center gap-12 py-20">
            <div className="col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">{locale === "es" ? "Lo que detiene el camión" : "What stops the truck"}</p>
              <AnimatePresence mode="wait">
                <motion.div key={current.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: motionEase }}>
                  <h2 className="type-section mt-5 text-balance text-text">{localize(current.urgency, locale)}</h2>
                  <div className="my-8 h-px bg-gradient-to-r from-red-400/50 via-accent/50 to-transparent" />
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{locale === "es" ? "Cómo lo resolvemos" : "How we resolve it"}</p>
                  <h3 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-accent">{localize(current.shortTitle, locale)}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">{localize(current.description, locale)}</p>
                  <Link href={`/services/${current.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-text hover:text-accent">{locale === "es" ? "Ver la solución" : "See the solution"} <ArrowRight className="h-4 w-4" /></Link>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-2">
                {story.map((item, index) => <span key={item.slug} className={`h-1 flex-1 rounded-full transition-colors ${index === active ? "bg-accent" : "bg-white/10"}`} />)}
              </div>
            </div>
            <div className="relative col-span-7 aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
              {story.map((item, index) => (
                <StorySlide
                  key={item.slug}
                  progress={scrollYProgress}
                  index={index}
                  src={item.painImage}
                  alt={localize(item.urgency, locale)}
                />
              ))}
            </div>
          </Container>
        </div>
      )}

      <div className={`space-y-16 px-4 py-24 ${isReduced ? "" : "lg:hidden"}`}>
        <h2 className="type-section text-balance text-text">{locale === "es" ? "Del riesgo a la carretera." : "From risk back to the road."}</h2>
        {story.map((item, index) => (
          <article key={item.slug}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <Image src={item.painImage} alt={localize(item.urgency, locale)} fill className="object-cover" sizes="100vw" />
              <span className="absolute left-4 top-4 rounded-full bg-[#050810]/80 px-3 py-2 text-xs font-bold text-accent">0{index + 1}</span>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-400">{locale === "es" ? "El riesgo" : "The risk"}</p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-text">{localize(item.urgency, locale)}</h3>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent">{locale === "es" ? "La salida" : "The way forward"}</p>
            <p className="mt-3 text-lg font-semibold text-accent">{localize(item.description, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
