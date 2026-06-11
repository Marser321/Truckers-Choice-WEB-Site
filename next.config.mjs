import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/about-us", destination: "/en/about", permanent: true },
      { source: "/contato-1", destination: "/en/contact", permanent: true },
      { source: "/services", destination: "/en/services", permanent: true },
      { source: "/locations", destination: "/en/locations", permanent: true },
      { source: "/medley-fl", destination: "/en/locations/medley-fl", permanent: true },
      { source: "/jersey-city-nj", destination: "/en/locations/jersey-city-nj", permanent: true },
      { source: "/elizabeth-nj", destination: "/en/locations/elizabeth-nj", permanent: true },
      // Retired sub-topic pages → anchors on the parent service page
      { source: "/:locale(en|es)/services/:slug/:detail", destination: "/:locale/services/:slug#:detail", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
