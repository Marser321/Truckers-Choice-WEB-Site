"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import {
  FileCheck,
  Tags,
  Route,
  Shield,
  ClipboardCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

interface ServiceItem {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
  icon: any;
  href: string;
}

export function ServicesGrid() {
  const t = useTranslations("services");

  const services: ServiceItem[] = [
    {
      id: 1,
      titleKey: "svc_1_title",
      descKey: "svc_1_desc",
      image: "/images/svc-authority.jpg",
      icon: FileCheck,
      href: "/services",
    },
    {
      id: 2,
      titleKey: "svc_2_title",
      descKey: "svc_2_desc",
      image: "/images/svc-irp.jpg",
      icon: Tags,
      href: "/services",
    },
    {
      id: 3,
      titleKey: "svc_3_title",
      descKey: "svc_3_desc",
      image: "/images/svc-permits.jpg",
      icon: Route,
      href: "/services",
    },
    {
      id: 4,
      titleKey: "svc_4_title",
      descKey: "svc_4_desc",
      image: "/images/svc-insurance.jpg",
      icon: Shield,
      href: "/services",
    },
    {
      id: 5,
      titleKey: "svc_5_title",
      descKey: "svc_5_desc",
      image: "/images/svc-compliance.jpg",
      icon: ClipboardCheck,
      href: "/services",
    },
    {
      id: 6,
      titleKey: "svc_6_title",
      descKey: "svc_6_desc",
      image: "/images/svc-corp.jpg",
      icon: Building2,
      href: "/services",
    },
  ];

  return (
    <div className="relative bg-background overflow-hidden border-t border-white/5">
      {/* Background decorations */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[130px] z-0" />

      <Section className="relative z-10 py-24 md:py-36">
        <Container className="flex flex-col gap-16">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <Reveal delay={0.1} yOffset={20}>
              <Badge variant="amber">
                {t("eyebrow")}
              </Badge>
            </Reveal>

            <Reveal delay={0.2} yOffset={25}>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-text leading-tight">
                {t("title")}
              </h2>
            </Reveal>
          </div>

          {/* Grid responsivo (3 col desktop, 2 col tablet, 1 col mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              const IconComponent = svc.icon;

              return (
                <Reveal
                  key={svc.id}
                  delay={0.1 + (idx % 3) * 0.1} // Stagger reveal column-based
                  yOffset={25}
                  className="group relative overflow-hidden rounded-2xl glass p-8 flex flex-col justify-between h-[320px] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-glow-amber bg-[#0F1626]/50 border border-white/8 hover:border-accent/30"
                >
                  {/* Absolute Background image fading in on hover */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out select-none">
                    <Image
                      src={svc.image}
                      alt={t(svc.titleKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transform scale-[1.05] group-hover:scale-100 transition-transform duration-700 ease-out"
                    />
                    {/* Navy/black overlay to preserve text readability */}
                    <div className="absolute inset-0 bg-[#070B14]/92 mix-blend-multiply z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-transparent z-10" />
                  </div>

                  {/* Relative Content container to overlay on top of BG image */}
                  <div className="relative z-20 flex flex-col gap-4">
                    {/* Icon container */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 stroke-[1.75]" />
                    </div>

                    <h3 className="text-xl font-bold font-display text-text mt-2">
                      {t(svc.titleKey)}
                    </h3>

                    <p className="text-sm text-text-muted font-body leading-relaxed max-w-[280px]">
                      {t(svc.descKey)}
                    </p>
                  </div>

                  {/* Link wrapper at bottom */}
                  <div className="relative z-20 mt-auto">
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer group/link"
                    >
                      <span>{t("see_more")}</span>
                      <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </Container>
      </Section>
    </div>
  );
}
