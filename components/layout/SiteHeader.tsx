"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Phone, X } from "lucide-react";
import { Link } from "@/navigation";
import { locations, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "./LanguageToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const primaryPhone = locations[0];

  const nav = [
    { href: "/services", label: t("services") },
    { href: "/packages", label: t("packages") },
    { href: "/locations", label: t("locations") },
    { href: "/about", label: t("about") },
    { href: "/resources", label: t("resources") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/8 bg-[#070B14]/75 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Truckers Choice Insurance & Permits — Home" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-white.png"
            alt="Truckers Choice Insurance & Permits"
            width={720}
            height={426}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold text-text-muted transition-colors hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${primaryPhone.phoneRaw}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold text-text transition-colors hover:border-accent/50">
            <Phone className="h-3.5 w-3.5 text-accent" />
            {primaryPhone.phone}
          </a>
          <LanguageToggle />
          <Link href="/contact" className="rounded-full bg-accent px-5 py-3 text-xs font-bold text-background shadow-glow-amber transition-transform hover:-translate-y-0.5">
            {locale === "es" ? "Cotización" : "Get a quote"}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text lg:hidden"
          aria-expanded={open}
          aria-label={open ? (locale === "es" ? "Cerrar menú" : "Close menu") : (locale === "es" ? "Abrir menú" : "Open menu")}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </Container>

      <div className={cn("border-t border-white/8 bg-[#070B14] px-4 transition-all lg:hidden", open ? "max-h-[80vh] py-5 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0")}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-text-muted hover:bg-white/5 hover:text-text">
              {item.label}
            </Link>
          ))}
          <div className="my-3 h-px bg-white/8" />
          <div className="mb-4 flex flex-wrap gap-2 px-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setOpen(false)} className="rounded-full border border-white/8 px-3 py-2 text-[11px] text-text-muted">
                {service.title[locale === "es" ? "es" : "en"]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3">
            <LanguageToggle />
            <Link href="/contact" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-accent px-5 py-3 text-center text-xs font-bold text-background">
              {locale === "es" ? "Cotización gratis" : "Free quote"}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
