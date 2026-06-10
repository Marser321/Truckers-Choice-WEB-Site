export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        "@id": "https://truckerspermitting.com/#organization",
        "name": "Truckers Choice Insurance & Permits",
        "url": "https://truckerspermitting.com",
        "logo": "https://truckerspermitting.com/images/logo.png",
        "sameAs": [
          "https://www.facebook.com/truckerschoice",
          "https://www.instagram.com/truckerschoice"
        ],
        "description": "Offering you the best trucking insurance and permits solutions for over 20 years."
      },
      {
        "@type": "InsuranceAgency",
        "name": "Truckers Choice - Medley, FL (HQ)",
        "image": "https://truckerspermitting.com/images/loc-medley-fl.jpg",
        "telephone": "305-749-9990",
        "faxNumber": "305-900-5699",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9090 NW South River Dr. Ste 2",
          "addressLocality": "Medley",
          "addressRegion": "FL",
          "postalCode": "33166",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.854881,
          "longitude": -80.342371
        },
        "url": "https://truckerspermitting.com/locations",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "13:00"
          }
        ]
      },
      {
        "@type": "InsuranceAgency",
        "name": "Truckers Choice - Jersey City, NJ",
        "image": "https://truckerspermitting.com/images/loc-jersey-city-nj.jpg",
        "telephone": "201-333-2255",
        "faxNumber": "201-333-0522",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "376 Duncan Ave, Suite 3",
          "addressLocality": "Jersey City",
          "addressRegion": "NJ",
          "postalCode": "07306",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.72591,
          "longitude": -74.07661
        },
        "url": "https://truckerspermitting.com/locations",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
          }
        ]
      },
      {
        "@type": "InsuranceAgency",
        "name": "Truckers Choice - Elizabeth, NJ",
        "image": "https://truckerspermitting.com/images/loc-elizabeth-nj.jpg",
        "telephone": "908-351-1085",
        "faxNumber": "908-351-1086",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "701 Spring St, Suite 7",
          "addressLocality": "Elizabeth",
          "addressRegion": "NJ",
          "postalCode": "07201",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.67912,
          "longitude": -74.19504
        },
        "url": "https://truckerspermitting.com/locations",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
