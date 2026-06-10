import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { locations, localize, services } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <footer className="relative z-20 border-t border-white/8 bg-[#050810] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Truckers Choice Insurance & Permits — Home" className="inline-flex items-center">
              <Image
                src="/images/logo-white.png"
                alt="Truckers Choice Insurance & Permits"
                width={720}
                height={426}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {locale === "es"
                ? "Seguros, permisos y cumplimiento para mantener tu operación en marcha."
                : "Insurance, permits and compliance to keep your operation moving."}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{t("services")}</p>
            <div className="flex flex-col gap-2">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="text-sm text-text-muted transition-colors hover:text-text">
                  {localize(service.title, locale)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{t("locations")}</p>
            <div className="flex flex-col gap-4">
              {locations.map((location) => (
                <div key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="text-sm font-semibold text-text">{location.name}</Link>
                  <a href={`tel:${location.phoneRaw}`} className="mt-1 block text-xs text-text-muted hover:text-accent">{location.phone}</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{locale === "es" ? "Explorar" : "Explore"}</p>
            <div className="flex flex-col gap-2">
              <Link href="/packages" className="text-sm text-text-muted hover:text-text">{t("packages")}</Link>
              <Link href="/about" className="text-sm text-text-muted hover:text-text">{t("about")}</Link>
              <Link href="/resources" className="text-sm text-text-muted hover:text-text">{t("resources")}</Link>
              <Link href="/contact" className="text-sm text-text-muted hover:text-text">{t("contact")}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Truckers Choice Insurance & Permits.</p>
          <p>{locale === "es" ? "Atención bilingüe en Florida y Nueva Jersey." : "Bilingual support in Florida and New Jersey."}</p>
        </div>
      </Container>
    </footer>
  );
}
