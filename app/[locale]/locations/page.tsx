import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/navigation";
import { Phone, MapPin, Clock, ArrowRight, Mail } from "lucide-react";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "locations" });

  return {
    title: `${t("title")} | Truckers Choice`,
    description: t("subtitle"),
  };
}

interface LocationData {
  slug: string;
  nameKey: string;
  descKey: string;
  address: string;
  phone: string;
  phoneRaw: string;
  fax: string;
  hoursKey: string;
  mapLink: string;
}

export default async function LocationsIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "locations" });

  const locations: LocationData[] = [
    {
      slug: "medley-fl",
      nameKey: "medley.name",
      descKey: "medley.desc",
      address: "9090 NW South River Dr. Ste 2, Medley, FL 33166",
      phone: "305-749-9990",
      phoneRaw: "+13057499990",
      fax: "305-900-5699",
      hoursKey: "medley_hours", // We can map standard times
      mapLink: "https://maps.google.com/?q=9090+NW+South+River+Dr+Ste+2,+Medley,+FL+33166",
    },
    {
      slug: "jersey-city-nj",
      nameKey: "jersey_city.name",
      descKey: "jersey_city.desc",
      address: "376 Duncan Ave, Suite 3, Jersey City, NJ 07306",
      phone: "201-333-2255",
      phoneRaw: "+12013332255",
      fax: "201-333-0522",
      hoursKey: "nj_hours",
      mapLink: "https://maps.google.com/?q=376+Duncan+Ave,+Suite+3,+Jersey+City,+NJ+07306",
    },
    {
      slug: "elizabeth-nj",
      nameKey: "elizabeth.name",
      descKey: "elizabeth.desc",
      address: "701 Spring St, Suite 7, Elizabeth, NJ 07201",
      phone: "908-351-1085",
      phoneRaw: "+19083511085",
      fax: "908-351-1086",
      hoursKey: "nj_hours",
      mapLink: "https://maps.google.com/?q=701+Spring+St,+Suite+7,+Elizabeth,+NJ+07201",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col bg-background">
      <LocalBusinessSchema />
      
      {/* Background decorations */}
      <div className="pointer-events-none absolute top-12 left-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] z-0" />
      <div className="pointer-events-none absolute bottom-12 right-0 h-[450px] w-[450px] rounded-full bg-secondary/5 blur-[120px] z-0" />

      {/* Main Content */}
      <Section className="relative z-10 py-16 md:py-24">
        <Container className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <Badge variant="amber" className="px-4 py-1.5 font-semibold text-xs tracking-wider">
              {t("title").toUpperCase()}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-text leading-tight">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-body leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto w-full">
            {locations.map((loc) => {
              const isHQ = loc.slug === "medley-fl";
              const openingHours = loc.slug === "medley-fl" 
                ? (locale === "es" ? "L-V 9-5, Sáb 9-1" : "Mon-Fri 9-5, Sat 9-1")
                : (locale === "es" ? "L-V 9-6, Sáb 10-2" : "Mon-Fri 9-6, Sat 10-2");

              return (
                <div
                  key={loc.slug}
                  className={`relative w-full rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 bg-[#0F1626]/40 border ${
                    isHQ
                      ? "border-accent shadow-glow-amber bg-[#0F1626]/70"
                      : "border-white/8 glass hover:border-white/15"
                  }`}
                >
                  {isHQ && (
                    <Badge
                      variant="amber"
                      className="absolute -top-3 left-6 px-4 py-1 text-[9px] font-black tracking-widest shadow-glow-amber border border-accent/30"
                    >
                      HEADQUARTERS
                    </Badge>
                  )}

                  <div>
                    {/* Location Photo Preview (Thumbnail) */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6 border border-white/5 bg-surface-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/loc-${loc.slug}.jpg`}
                        alt={t(loc.nameKey)}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4">
                        <h2 className="text-xl font-bold font-display text-text">
                          {t(loc.nameKey)}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-muted font-body leading-relaxed mb-6">
                      {t(loc.descKey)}
                    </p>

                    {/* Branch Info items */}
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm font-body leading-normal text-text-muted">
                          <p className="font-semibold text-text">{t("address")}</p>
                          <a
                            href={loc.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                          >
                            {loc.address}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm font-body leading-normal text-text-muted">
                          <p className="font-semibold text-text">{t("phone")}</p>
                          <a
                            href={`tel:${loc.phoneRaw}`}
                            className="hover:text-accent transition-colors"
                          >
                            {loc.phone}
                          </a>
                          <span className="text-xs text-text-muted block mt-0.5">
                            {t("fax")}: {loc.fax}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm font-body leading-normal text-text-muted">
                          <p className="font-semibold text-text">{t("hours")}</p>
                          <p>{openingHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <Link
                      href={`/locations/${loc.slug}`}
                      className={`inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-bold font-body rounded-xl transition-all duration-300 ${
                        isHQ
                          ? "bg-accent text-[#070B14] hover:bg-accent/80 shadow-glow-amber-hover"
                          : "bg-white/5 border border-white/8 text-text hover:bg-white/10 hover:border-white/15"
                      }`}
                    >
                      <span>{t("view_details")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

    </main>
  );
}
