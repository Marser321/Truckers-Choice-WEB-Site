"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowButton } from "@/components/ui/GlowButton";

export function OneRoof() {
  const t = useTranslations("oneroof");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // Scroll parallax for the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Amber Check Icon for the list
  const CheckIcon = () => (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 border border-accent/25 flex-shrink-0 mt-0.5">
      <svg
        className="w-3.5 h-3.5 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-background border-t border-white/5">
      {/* Background radial navy gradient and subtle blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(15,22,38,0.7)_0%,rgba(7,11,20,1)_100%)] z-0" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-2/5 blur-[160px] pointer-events-none z-0" />

      <Section className="relative z-10 py-24 md:py-36" background="surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Localized Copy in Cascade Reveal */}
            <div className="flex flex-col gap-6 max-w-xl">
              <Reveal delay={0.1} yOffset={20}>
                <Badge variant="amber" className="tracking-wider">
                  {t("eyebrow")}
                </Badge>
              </Reveal>

              <Reveal delay={0.2} yOffset={25}>
                <h2 className="type-section text-text">
                  {t("title")}
                </h2>
              </Reveal>

              <Reveal delay={0.3} yOffset={30}>
                <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed">
                  {t("description")}
                </p>
              </Reveal>

              {/* Bullet List */}
              <ul className="flex flex-col gap-4 mt-2">
                <Reveal delay={0.4} yOffset={25}>
                  <li className="flex items-start gap-4">
                    <CheckIcon />
                    <span className="text-sm sm:text-base text-text font-medium font-body leading-relaxed">
                      {t("bullet_1")}
                    </span>
                  </li>
                </Reveal>
                <Reveal delay={0.45} yOffset={25}>
                  <li className="flex items-start gap-4">
                    <CheckIcon />
                    <span className="text-sm sm:text-base text-text font-medium font-body leading-relaxed">
                      {t("bullet_2")}
                    </span>
                  </li>
                </Reveal>
                <Reveal delay={0.5} yOffset={25}>
                  <li className="flex items-start gap-4">
                    <CheckIcon />
                    <span className="text-sm sm:text-base text-text font-medium font-body leading-relaxed">
                      {t("bullet_3")}
                    </span>
                  </li>
                </Reveal>
                <Reveal delay={0.55} yOffset={25}>
                  <li className="flex items-start gap-4">
                    <CheckIcon />
                    <span className="text-sm sm:text-base text-text font-medium font-body leading-relaxed">
                      {t("bullet_4")}
                    </span>
                  </li>
                </Reveal>
              </ul>

              <Reveal delay={0.65} yOffset={30} className="mt-4">
                <GlowButton href="/contact" variant="primary" className="w-full sm:w-auto self-start">
                  {t("cta")}
                </GlowButton>
              </Reveal>
            </div>

            {/* Right Column: Image with Glass Frame + Glow Parallax */}
            <div className="relative flex justify-center items-center">
              {/* Blur amber glow underneath */}
              <div className="absolute -inset-4 rounded-[28px] bg-accent/5 blur-3xl pointer-events-none z-0" />

              <Reveal delay={0.2} duration={0.8} yOffset={35} className="w-full max-w-[500px] z-10">
                <motion.div
                  style={{ y: isReduced ? 0 : imgY }}
                  className="relative overflow-hidden rounded-[24px] glass p-2.5 border border-white/8 shadow-glow-amber bg-white/2"
                >
                  <div className="relative overflow-hidden rounded-[16px] aspect-[4/5] w-full bg-surface-2">
                    <Image
                      src="/images/one-roof.jpg"
                      alt="Truckers Choice specialist reviewing paperwork in a modern office, with a truck waiting outside"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                      className="object-cover transform hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </Reveal>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
