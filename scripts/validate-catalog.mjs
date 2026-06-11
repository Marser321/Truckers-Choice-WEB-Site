import fs from "node:fs";
import path from "node:path";
import { loadContent } from "./load-content.mjs";

const content = loadContent();
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(content.services.length === 6, `Expected 6 public families, found ${content.services.length}.`);
assert(content.locations.length === 3, `Expected 3 public locations, found ${content.locations.length}.`);
assert(content.serviceTopics.length === 9, `Expected 9 deep service topics, found ${content.serviceTopics.length}.`);

const details = content.services.flatMap((service) => service.details);
assert(details.length === 30, `Expected 30 confirmed subservices, found ${details.length}.`);
assert(content.services.every((item) => item.status === "confirmed"), "A non-confirmed family is public.");
assert(details.every((item) => item.status === "confirmed"), "A non-confirmed subservice is public.");
assert(content.serviceTopics.every((item) => item.status === "confirmed"), "A non-confirmed topic is public.");
assert(content.locations.every((item) => item.status === "confirmed"), "A non-confirmed location is public.");

const uniqueDetailSlugs = new Set(details.map((item) => item.slug));
assert(uniqueDetailSlugs.size === details.length, "Subservice slugs must be unique.");

for (const detail of details) {
  assert(Boolean(detail.title.en && detail.title.es), `${detail.slug} is missing bilingual titles.`);
  assert(Boolean(detail.description.en && detail.description.es), `${detail.slug} is missing bilingual descriptions.`);
  assert(detail.sources.length > 0, `${detail.slug} is missing an audit source.`);
}

for (const topic of content.serviceTopics) {
  const family = content.services.find((service) => service.slug === topic.familySlug);
  assert(Boolean(family), `${topic.slug} points to a missing family.`);
  for (const detailSlug of topic.detailSlugs) {
    assert(uniqueDetailSlugs.has(detailSlug), `${topic.slug} points to missing subservice ${detailSlug}.`);
  }
}

const forbidden = [
  /UIIA/i,
  /IANA/i,
  /Clearinghouse/i,
  /MCS-150/i,
  /\bDQF\b/i,
  /BMC-84/i,
  /Hotshot/i,
  /Freight Broker/i,
  /20\+/i,
  /over 20 years/i,
  /more than 20 years/i,
  /\bHQ\b/,
  /HEADQUARTERS/i,
  /Accredited/i,
  /Certified by/i,
];
const publicRoots = ["app", "components", "messages"];
for (const root of publicRoots) {
  const stack = [path.resolve(root)];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(entryPath);
      if (!entry.isFile() || !/\.(ts|tsx|json)$/.test(entry.name)) continue;
      const text = fs.readFileSync(entryPath, "utf8");
      for (const pattern of forbidden) {
        assert(!pattern.test(text), `Forbidden public claim ${pattern} found in ${path.relative(process.cwd(), entryPath)}.`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Catalog valid: ${content.services.length} families, ${details.length} confirmed subservices, ${content.serviceTopics.length} deep topics, ${content.locations.length} locations.`);
