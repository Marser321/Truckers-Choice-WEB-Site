"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";
import { Files, Phone } from "lucide-react";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { locations } from "@/lib/content";

export function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // Scroll parallax effects
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax calculations (disabled if reduced-motion)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isReduced ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, isReduced ? 1 : 1.08]);

  // Scroll cue opacity fades out dynamically as the user scrolls down
  const scrollCueOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  // Kinetic typography parameters
  const titleWords = t("title").split(" ");

  // Helper to determine highlight words (amber color and glow text effect)
  const isKeyword = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
    return ["one", "roof", "un", "solo", "lugar"].includes(cleanWord);
  };

  // Variants for parent list reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReduced ? 0 : 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Words mask-up slide and fade-in transition
  const wordVariants = {
    hidden: isReduced
      ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
      : { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: isReduced ? 0 : 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  };

  // Spring animations for CTA buttons
  const ctaHoverProps = {
    whileHover: isReduced ? {} : { scale: 1.05, y: -2 },
    whileTap: isReduced ? {} : { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
  };

  // Safe SVG background representation to avoid string escaping conflicts in JSX attributes
  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* 1) Multilayer background video with poster placeholder and grain overlays */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          <AmbientVideo
            mp4="/media/hero-loop.mp4"
            poster="/images/media-posters/hero-video.jpg"
            alt="Semi-truck moving along an open highway"
            className="[&_img]:brightness-[1.18] [&_img]:saturate-[1.12] [&_video]:brightness-[1.18] [&_video]:saturate-[1.12] [&_video]:contrast-[1.04]"
            priority
          />
        </motion.div>

        {/* Multi-layered navy overlay and cinematic noise */}
        {/* Keep the media vivid while protecting the centered headline. */}
        <div className="absolute inset-0 bg-[#070B14]/12 z-10 pointer-events-none" />

        {/* Layer 2: Radial vignette gradient for focal centering */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,11,20,0.08)_15%,rgba(7,11,20,0.42)_100%)] z-10 pointer-events-none" />

        {/* Layer 3: Vertical blending gradient (blends towards bottom navy section) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/22 to-transparent z-10 pointer-events-none" />

        {/* Local contrast behind copy instead of dimming the entire video. */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[60%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#070B14]/24 blur-[90px] pointer-events-none md:w-[64%]" />

        {/* Very light cinematic grain, limited to the hero media. */}
        <div
          style={grainStyle}
          className="absolute inset-0 opacity-[0.008] mix-blend-soft-light z-10 pointer-events-none"
        />
      </div>

      {/* 2) Main Hero Content with Parallax sink & fade */}
      <Container className="relative z-20 flex flex-col items-center justify-center text-center">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center justify-center max-w-4xl"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <Badge variant="amber" className="px-4 py-1.5 font-semibold text-xs tracking-wider">
              {t("eyebrow")}
            </Badge>
          </motion.div>

          {/* H1 - Kinetic word-by-word reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="type-hero mb-6 flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-text sm:gap-y-2"
          >
            {titleWords.map((word, idx) => {
              const highlight = isKeyword(word);
              return (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block ${
                      highlight
                        ? "text-accent drop-shadow-[0_0_15px_rgba(255,176,32,0.45)]"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </motion.h1>

          {/* Subcopy paragraphs */}
          <motion.p
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-emphasis mb-10 max-w-2xl font-body text-base leading-relaxed sm:text-xl"
          >
            {t("subcopy")}
          </motion.p>

          {/* Action CTAs with spring-hover wrapper */}
          <motion.div
            initial={isReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-10"
          >
            <motion.div {...ctaHoverProps} className="w-full sm:w-auto">
              <GlowButton href="/contact" variant="primary" className="w-full">
                {t("cta_quote")}
              </GlowButton>
            </motion.div>
            <motion.div {...ctaHoverProps} className="w-full sm:w-auto">
              <a href={`tel:${locations[0].phoneRaw}`} className="glass relative inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                <Phone className="w-4 h-4 text-accent" />
                <span>{t("cta_call")}</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isReduced ? 0 : 0.4, delay: 1 }}
            className="catalog-pill gap-2 px-4 py-2 text-xs font-semibold"
          >
            <Files className="h-4 w-4" />
            <span>{t("trust_text")}</span>
          </motion.div>
        </motion.div>
      </Container>

      {/* 3) Bottom right animated scroll cue - disappears when user scrolls */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-body">
          Scroll
        </span>
        {isReduced ? (
          <div className="w-5 h-8 border-2 border-text-muted/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-text-muted/40 rounded-full" />
          </div>
        ) : (
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-text-muted/50 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-accent rounded-full" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
