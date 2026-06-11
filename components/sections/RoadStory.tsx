"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { motionEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Chapter = {
  key: "ch1" | "ch2" | "ch3" | "ch4";
  href: string;
  video?: { mp4: string };
  poster: string;
};

const chapters: Chapter[] = [
  {
    key: "ch1",
    href: "/services/truck-insurance",
    video: { mp4: "/media/story-night-risk.mp4" },
    poster: "/images/media-posters/story-night-risk.jpg",
  },
  {
    key: "ch2",
    href: "/services/permits-fuel-tax",
    poster: "/images/story-cab-paperwork.webp",
  },
  {
    key: "ch3",
    href: "/locations",
    video: { mp4: "/media/story-network.mp4" },
    poster: "/images/media-posters/story-network.jpg",
  },
  {
    key: "ch4",
    href: "/contact",
    video: { mp4: "/media/story-sunrise.mp4" },
    poster: "/images/media-posters/story-sunrise.jpg",
  },
];

const FADE = 0.06;

function ChapterBackdrop({
  progress,
  index,
  chapter,
  alt,
}: {
  progress: MotionValue<number>;
  index: number;
  chapter: Chapter;
  alt: string;
}) {
  const start = index / chapters.length;
  const end = (index + 1) / chapters.length;
  const isFirst = index === 0;
  const isLast = index === chapters.length - 1;
  // WAAPI scroll-linked offsets must stay within [0, 1] and be non-decreasing.
  const opacity = useTransform(
    progress,
    isFirst ? [0, end - FADE, end] : isLast ? [start - FADE, start, 1] : [start - FADE, start, end - FADE, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  // Subtle Ken Burns only on the still chapter; the videos bring their own motion.
  const scale = useTransform(progress, [Math.max(0, start - FADE), end], chapter.video ? [1, 1] : [1.08, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {chapter.video ? (
        <motion.div style={{ scale }} className="absolute inset-0">
          <AmbientVideo mp4={chapter.video.mp4} poster={chapter.poster} alt={alt} />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-[#050810]">
          <motion.div style={{ scale }} className="absolute inset-y-0 right-0 w-full md:w-[52%] lg:w-[46%]">
            <Image src={chapter.poster} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050810] to-transparent" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export function RoadStory() {
  const t = useTranslations("roadStory");
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(
    () =>
      scrollYProgress.on("change", (value) =>
        setActive(Math.min(chapters.length - 1, Math.max(0, Math.floor(value * chapters.length))))
      ),
    [scrollYProgress]
  );

  const goTo = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((index + 0.5) / chapters.length) * travel, behavior: "smooth" });
  };

  const current = chapters[active];

  return (
    <section ref={sectionRef} className={`relative bg-[#050810] ${isReduced ? "" : "lg:h-[400vh]"}`}>
      {!isReduced && (
        <div className="hidden h-screen overflow-hidden lg:sticky lg:top-0 lg:block">
          {chapters.map((chapter, index) => (
            <ChapterBackdrop
              key={chapter.key}
              progress={scrollYProgress}
              index={index}
              chapter={chapter}
              alt={t(`${chapter.key}_alt`)}
            />
          ))}

          {/* Fixed contrast layers so the copy stays AA-readable over bright skies. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050810]/90 via-[#050810]/35 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#050810]/70 to-transparent" />

          <Container className="relative flex h-full flex-col justify-between py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{t("eyebrow")}</p>

            <div className="max-w-2xl pb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: motionEase }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
                    {t("chapterLabel")} 0{active + 1} <span aria-hidden="true">/</span> 0{chapters.length}
                  </p>
                  <h2 className="type-section mt-5 max-w-2xl text-balance text-text">
                    {t(`${current.key}_title`)}
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">{t(`${current.key}_body`)}</p>
                  <Link
                    href={current.href}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-background"
                  >
                    {t(`${current.key}_cta`)} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>

          {/* Progress rail: one dot per chapter, clickable for direct navigation. */}
          <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.key}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${t("chapterLabel")} ${index + 1}: ${t(`${chapter.key}_title`)}`}
                aria-current={index === active}
                className="group flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === active ? "h-3 w-3 bg-accent" : "h-2 w-2 bg-white/25 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`space-y-20 px-4 py-24 ${isReduced ? "mx-auto max-w-3xl" : "lg:hidden"}`}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{t("eyebrow")}</p>
        {chapters.map((chapter, index) => (
          <article key={chapter.key}>
            <div className={`relative overflow-hidden rounded-3xl border border-white/10 ${chapter.video ? "aspect-video" : "aspect-[4/5] max-w-md"}`}>
              <Image src={chapter.poster} alt={t(`${chapter.key}_alt`)} fill className="object-cover" sizes="(min-width: 768px) 48rem, 100vw" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
              {t("chapterLabel")} 0{index + 1}
            </p>
            <h3 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-text">{t(`${chapter.key}_title`)}</h3>
            <p className="mt-4 leading-relaxed text-text-muted">{t(`${chapter.key}_body`)}</p>
            <Link href={chapter.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
              {t(`${chapter.key}_cta`)} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
