"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import {
  Building2,
  Truck,
  ShieldAlert,
  ClipboardCheck,
} from "lucide-react";

interface StepItem {
  id: number;
  icon: any;
  titleKey: string;
  descKey: string;
}

export function HowItWorks() {
  const t = useTranslations("journey");
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // Scroll tracking to draw the connector line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // map progress to connection size
  const lineProgress = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);

  const steps: StepItem[] = [
    {
      id: 1,
      icon: Building2,
      titleKey: "step_1_title",
      descKey: "step_1_desc",
    },
    {
      id: 2,
      icon: Truck,
      titleKey: "step_2_title",
      descKey: "step_2_desc",
    },
    {
      id: 3,
      icon: ShieldAlert,
      titleKey: "step_3_title",
      descKey: "step_3_desc",
    },
    {
      id: 4,
      icon: ClipboardCheck,
      titleKey: "step_4_title",
      descKey: "step_4_desc",
    },
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-background border-t border-white/5">
      
      {/* Decorative background with strong dark navy overlay */}
      <div className="absolute inset-0 z-0 select-none" aria-hidden="true">
        <Image
          src="/images/journey-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        {/* Navy gradient and solid overlays for high text contrast */}
        <div className="absolute inset-0 bg-[#070B14]/85 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,22,38,0.7)_0%,rgba(7,11,20,1)_100%)] z-10" />
      </div>

      <Section className="relative z-10 py-24 md:py-36" background="route" backgroundPosition="center right">
        <Container className="flex flex-col gap-16">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <Reveal delay={0.1} yOffset={20}>
              <Badge variant="amber">
                {t("eyebrow")}
              </Badge>
            </Reveal>

            <Reveal delay={0.2} yOffset={25}>
              <h2 className="type-section text-text">
                {t("title")}
              </h2>
            </Reveal>
          </div>

          {/* Timeline Container */}
          <div className="relative w-full max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-0">
            
            {/* 1) Connecting Line (Desktop: Horizontal) */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-white/5 hidden lg:block z-0">
              <motion.div
                style={{ width: isReduced ? "100%" : lineProgress }}
                className="h-full bg-accent shadow-glow-amber origin-left"
              />
            </div>
            
            {/* 2) Connecting Line (Mobile/Tablet: Vertical) */}
            <div className="absolute left-[32px] top-[28px] bottom-[28px] w-0.5 bg-white/5 lg:hidden z-0">
              <motion.div
                style={{ height: isReduced ? "100%" : lineProgress }}
                className="w-full bg-accent shadow-glow-amber origin-top"
              />
            </div>

            {/* Steps wrapper */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-4 justify-between">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-4 lg:w-1/4 group"
                  >
                    {/* Big faded number background */}
                    <span className="absolute -top-8 left-16 select-none font-display text-6xl font-extrabold tracking-[-0.02em] text-white/[0.03] transition-colors duration-500 pointer-events-none group-hover:text-accent/[0.05] sm:text-7xl lg:left-auto lg:-top-12">
                      0{step.id}
                    </span>

                    {/* Step Node Circle */}
                    <Reveal delay={0.15 + idx * 0.1} yOffset={15} className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-[#0F1626] border-2 border-white/10 flex items-center justify-center relative group-hover:border-accent/50 transition-colors duration-300 shadow-lg">
                        <IconComponent className="h-6 w-6 text-accent stroke-[1.75] group-hover:scale-110 transition-transform duration-300" />
                        
                        {/* Core glow ring */}
                        <div className="absolute -inset-1 rounded-full border border-accent/0 group-hover:border-accent/20 group-hover:scale-105 transition-all duration-300 pointer-events-none" />
                      </div>
                    </Reveal>

                    {/* Text content details */}
                    <div className="flex flex-col gap-1 lg:items-center mt-1 lg:mt-0">
                      <Reveal delay={0.25 + idx * 0.1} yOffset={15}>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-text group-hover:text-accent transition-colors duration-300">
                          {t(step.titleKey)}
                        </h3>
                      </Reveal>
                      <Reveal delay={0.3 + idx * 0.1} yOffset={15}>
                        <p className="text-sm text-text-muted font-body leading-relaxed max-w-[220px]">
                          {t(step.descKey)}
                        </p>
                      </Reveal>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </Container>
      </Section>
    </div>
  );
}
