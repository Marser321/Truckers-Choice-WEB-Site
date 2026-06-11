import { locations } from "@/lib/content";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        "@id": "https://truckerspermitting.com/#organization",
        name: "Truckers Choice Insurance & Permits",
        url: "https://truckerspermitting.com",
        logo: "https://truckerspermitting.com/images/logo.png",
        description: "Insurance, permits and compliance paperwork for trucking operations.",
      },
      ...locations.map((location) => ({
        "@type": "InsuranceAgency",
        "@id": `https://truckerspermitting.com/locations/${location.slug}#branch`,
        name: `Truckers Choice - ${location.name}`,
        image: `https://truckerspermitting.com/images/loc-${location.slug}.jpg`,
        telephone: location.phone,
        faxNumber: location.fax,
        url: `https://truckerspermitting.com/locations/${location.slug}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.street,
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lng,
        },
        openingHoursSpecification: location.openingHours.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.days,
          opens: hours.opens,
          closes: hours.closes,
        })),
      })),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
