import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Phone, MapPin, Clock, CheckCircle2, Navigation } from "lucide-react";

interface LocationData {
  slug: string;
  nameKey: string;
  descKey: string;
  servicesKey: string; // key of the array of services
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  fax: string;
  lat: number;
  lng: number;
}

const locationSlugs = ["medley-fl", "jersey-city-nj", "elizabeth-nj"];

function getLocationData(slug: string): LocationData | null {
  switch (slug) {
    case "medley-fl":
      return {
        slug: "medley-fl",
        nameKey: "medley.name",
        descKey: "medley.desc",
        servicesKey: "medley.services",
        address: "9090 NW South River Dr. Ste 2, Medley, FL 33166",
        street: "9090 NW South River Dr. Ste 2",
        city: "Medley",
        state: "FL",
        zip: "33166",
        phone: "305-749-9990",
        phoneRaw: "+13057499990",
        fax: "305-900-5699",
        lat: 25.854881,
        lng: -80.342371,
      };
    case "jersey-city-nj":
      return {
        slug: "jersey-city-nj",
        nameKey: "jersey_city.name",
        descKey: "jersey_city.desc",
        servicesKey: "jersey_city.services",
        address: "376 Duncan Ave, Suite 3, Jersey City, NJ 07306",
        street: "376 Duncan Ave, Suite 3",
        city: "Jersey City",
        state: "NJ",
        zip: "07306",
        phone: "201-333-2255",
        phoneRaw: "+12013332255",
        fax: "201-333-0522",
        lat: 40.72591,
        lng: -74.07661,
      };
    case "elizabeth-nj":
      return {
        slug: "elizabeth-nj",
        nameKey: "elizabeth.name",
        descKey: "elizabeth.desc",
        servicesKey: "elizabeth.services",
        address: "701 Spring St, Suite 7, Elizabeth, NJ 07201",
        street: "701 Spring St, Suite 7",
        city: "Elizabeth",
        state: "NJ",
        zip: "07201",
        phone: "908-351-1085",
        phoneRaw: "+19083511085",
        fax: "908-351-1086",
        lat: 40.67912,
        lng: -74.19504,
      };
    default:
      return null;
  }
}

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!locationSlugs.includes(slug)) return {};

  const t = await getTranslations({ locale, namespace: "locations" });
  const loc = getLocationData(slug);
  if (!loc) return {};

  const resolvedName = t(loc.nameKey);

  // Geo-specific local SEO descriptions
  let seoDesc = t(loc.descKey);
  if (slug === "medley-fl") {
    seoDesc += " Serving Miami-Dade County, Doral, and South Florida truckers.";
  } else if (slug === "jersey-city-nj") {
    seoDesc += " Located near the Port of NY/NJ in Hudson County for container drayage.";
  } else if (slug === "elizabeth-nj") {
    seoDesc += " Convenient office near Newark/Elizabeth port area in Union County.";
  }

  return {
    title: `${resolvedName} - Insurance & Permits | Truckers Choice`,
    description: seoDesc,
    alternates: {
      canonical: `/locations/${slug}`,
    },
  };
}

export default async function LocationDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!locationSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "locations" });
  const loc = getLocationData(slug);
  if (!loc) {
    notFound();
  }

  const resolvedName = t(loc.nameKey);
  const resolvedDesc = t(loc.descKey);

  // Retrieve translation array for services
  // getTranslations can load raw values or we can read them step by step
  const servicesList: string[] = [];
  try {
    for (let i = 0; i < 6; i++) {
      const serviceText = t(`${loc.servicesKey}.${i}` as any);
      if (serviceText && !serviceText.startsWith("locations.")) {
        servicesList.push(serviceText);
      }
    }
  } catch (e) {
    // Fail-safe default local services list
    servicesList.push(
      "Commercial Truck Insurance",
      "USDOT & MC Authority Setup",
      "Apportioned Plates & IRP",
      "DOT compliance support"
    );
  }

  const openingHours = slug === "medley-fl"
    ? (locale === "es" ? "Lunes - Viernes: 9:00 AM - 5:00 PM | Sábado: 9:00 AM - 1:00 PM | Domingo: Cerrado" : "Monday - Friday: 9:00 AM - 5:00 PM | Saturday: 9:00 AM - 1:00 PM | Sunday: Closed")
    : (locale === "es" ? "Lunes - Viernes: 9:00 AM - 6:00 PM | Sábado: 10:00 AM - 2:00 PM | Domingo: Cerrado" : "Monday - Friday: 9:00 AM - 6:00 PM | Saturday: 10:00 AM - 2:00 PM | Sunday: Closed");

  // Dynamic JSON-LD LocalBusiness Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `https://truckerspermitting.com/locations/${slug}#branch`,
    "name": `Truckers Choice - ${resolvedName}`,
    "image": `https://truckerspermitting.com/images/loc-${slug}.jpg`,
    "telephone": loc.phone,
    "faxNumber": loc.fax,
    "url": `https://truckerspermitting.com/locations/${slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": loc.street,
      "addressLocality": loc.city,
      "addressRegion": loc.state,
      "postalCode": loc.zip,
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": loc.lat,
      "longitude": loc.lng,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": slug === "medley-fl" ? "17:00" : "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": slug === "medley-fl" ? "09:00" : "10:00",
        "closes": slug === "medley-fl" ? "13:00" : "14:00",
      },
    ],
  };

  // Google Maps Embed Dark Mode trick (Invert color on iframe via custom Tailwind styles)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${loc.lat},${loc.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="relative min-h-screen flex flex-col bg-background">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Background decorations */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[130px] z-0" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] z-0" />

      {/* Hero Header with photo background */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/loc-${slug}.jpg`}
          alt={resolvedName}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/40 via-[#070B14]/70 to-[#070B14] z-10" />

        <Container className="relative z-20 text-center flex flex-col items-center gap-4 max-w-3xl">
          <Badge variant="amber" className="px-4 py-1.5 font-semibold text-xs tracking-wider">
            {slug === "medley-fl" ? "MAIN HEADQUARTERS" : "REGIONAL BRANCH"}
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-text leading-tight drop-shadow-md">
            {resolvedName}
          </h1>
          <p className="text-base sm:text-xl text-text-muted font-body leading-relaxed max-w-2xl drop-shadow-sm">
            {resolvedDesc}
          </p>
        </Container>
      </section>

      {/* Location Details and Map split */}
      <Section className="relative z-20 py-12 md:py-20 bg-background border-t border-white/5">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto w-full">
          
          {/* Details Column */}
          <div className="flex flex-col gap-8">
            <div className="glass border border-white/8 rounded-2xl p-8 flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-display text-text border-b border-white/5 pb-4">
                {locale === "es" ? "Información de la Sede" : "Office Information"}
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text uppercase tracking-wider mb-1">
                      {t("address")}
                    </h3>
                    <p className="text-sm text-text-muted font-body">{loc.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text uppercase tracking-wider mb-1">
                      {t("phone")} / {t("fax")}
                    </h3>
                    <p className="text-sm text-text-muted font-body">
                      <a href={`tel:${loc.phoneRaw}`} className="hover:text-accent font-semibold text-text transition-colors">
                        {loc.phone}
                      </a>
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Fax: {loc.fax}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text uppercase tracking-wider mb-1">
                      {t("hours")}
                    </h3>
                    <p className="text-sm text-text-muted font-body leading-relaxed">
                      {openingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 border-t border-white/5 pt-6">
                <a href={`tel:${loc.phoneRaw}`} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-6 py-3 text-xs font-semibold text-background shadow-glow-amber transition-all hover:bg-accent/90 sm:w-auto">
                  <Phone className="w-4 h-4" />
                  <span>{t("contact_branch")}</span>
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-xs py-3 px-6 rounded-xl font-bold font-body transition-all duration-300 bg-white/5 border border-white/8 text-text hover:bg-white/10 hover:border-white/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-accent" />
                  <span>{t("get_directions")}</span>
                </a>
              </div>
            </div>

            {/* Local Services Bullet List */}
            <div className="glass border border-white/8 rounded-2xl p-8 flex flex-col gap-6">
              <h2 className="text-2xl font-bold font-display text-text border-b border-white/5 pb-4">
                {t("local_services")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesList.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-text-muted font-body font-medium leading-snug">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="glass border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4">
            <h2 className="text-xl font-bold font-display text-text px-2">
              {locale === "es" ? "Mapa de la Ubicación" : "Location Map"}
            </h2>
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-white/5 bg-surface">
              {/* Inverted colors trick to achieve matching dark mode Google Maps */}
              <iframe
                title={resolvedName}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-80 invert-[90%] hue-rotate-180 contrast-125 saturate-50 brightness-[85%]"
              />
            </div>
          </div>

        </Container>
      </Section>

    </main>
  );
}
