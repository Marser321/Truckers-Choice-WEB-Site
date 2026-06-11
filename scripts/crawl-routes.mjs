import { loadContent } from "./load-content.mjs";

const baseUrl = process.env.CRAWL_BASE_URL ?? "http://localhost:3000";
const content = loadContent();
const locales = ["en", "es"];
const routes = new Set();

for (const locale of locales) {
  for (const route of ["", "/services", "/packages", "/locations", "/about", "/resources", "/contact"]) {
    routes.add(`/${locale}${route}`);
  }
  for (const service of content.services) routes.add(`/${locale}/services/${service.slug}`);
  for (const topic of content.serviceTopics) routes.add(`/${locale}/services/${topic.familySlug}/${topic.slug}`);
  for (const location of content.locations) routes.add(`/${locale}/locations/${location.slug}`);
  for (const resource of content.resources) routes.add(`/${locale}/resources/${resource.slug}`);
}

const failures = [];
for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
  if (!response.ok) failures.push(`${route}: ${response.status}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Route crawl passed: ${routes.size} bilingual routes returned successful responses.`);
