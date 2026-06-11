# Catalog Card Visual Audit

## Purpose

This audit records the visual hierarchy applied to the new service-catalog
cards. It covers only catalog cards introduced for the operational explorer,
service-family pages, and deep operational files.

## Guardrails

- Existing approved service-family images are the only photographic assets used.
- Photography is reserved for primary navigation choices.
- Secondary cards use document, route, index, border, and technical-line motifs.
- Public copy, confirmed services, metadata, Schema.org, and claims are unchanged.
- Locations, packages, resources, contact, about, and section backgrounds are
  outside this audit.

## Variant Inventory

| Card family | Variant | Visual role | Implementation | Browser review |
| --- | --- | --- | --- | --- |
| Explorer journey tabs | `active` / `route` | Selected journey and connected operating stages | Complete | Passed |
| Explorer service cards | `media` | Primary family choices with approved family photography | Complete | Passed |
| Family filing cards | `file` | Confirmed filing/document records | Complete | Passed |
| Deep operational-file cards | `media` | Primary deep-file choices with approved family photography | Complete | Passed |
| How-we-work steps | `route` | Connected process sequence | Complete | Passed |
| Included-paperwork cards | `file` | Indexed document records with need-state note | Complete | Passed |
| What-to-have-ready card | `file` | Preparation checklist | Complete | Passed |
| Likely-next-step card | `route` | Operational connection to related services | Complete | Passed |

## Component System

- `media`: layered family image, cinematic contrast overlay, stable minimum
  height, index, and restrained image motion.
- `file`: indexed operational-file surface, inset border, technical grid, and
  document note treatment.
- `route`: route line, connection nodes, index, and informational ambient glow.
- `active`: selected explorer state with amber surface, border, and focus-safe
  contrast.

All variant surfaces use component tokens defined in `app/globals.css` and the
typed helpers in `components/ui/CatalogCard.tsx`.

## Acceptance Record

- [x] No new catalog card uses only the generic flat-card treatment.
- [x] Photography is limited to primary catalog choices.
- [x] Secondary cards communicate document, process, or connection.
- [x] Existing content and approval governance remain unchanged.
- [x] Desktop browser review complete.
- [x] Mobile browser review complete.
- [x] English and Spanish card review complete.
- [x] Keyboard tab switching and selected-state review complete.
- [x] Reduced-motion behavior remains covered by component and global media-query safeguards.
- [x] Images load inside stable absolute-fill card frames without layout shift.
- [x] Console review complete with no local warnings or errors.
- [x] Non-catalog location cards remain outside the variant system.

## Browser Review Notes

- The first production review exposed Tailwind removing dynamically assembled
  variant class names. The helper now uses a typed literal class map so every
  variant is retained in production builds.
- Desktop media cards retain cinematic family photography with readable
  left-to-right overlays.
- Mobile media cards use a tokenized vertical overlay so imagery remains visible
  above protected text.
- File cards preserve readable content while adding indexed document structure.
- Route cards communicate progression without implying approval or guaranteed
  outcomes.
