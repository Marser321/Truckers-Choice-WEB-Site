# Site Background Coherence Audit

## Purpose

This audit records the visual-background hierarchy applied after the public-site
restructure. It is visual polish only: content, page order, service
architecture, functionality, metadata, claims, and structured data are
unchanged.

## Background System

| Variant | Role | Treatment |
| --- | --- | --- |
| `canvas` | Functional clean surface | Dark canvas, restrained grid, ambient glows |
| `surface` | Contextual content surface | Raised navy tone, stronger technical grid |
| `document` | Operational files and resources | Truck-cab paperwork image, protected contrast, technical structure |
| `route` | Processes, plans, and next steps | Connected highway image, route-light emphasis, protected contrast |
| `local` | Offices and local support | Regional highway/city image, local-network atmosphere, protected contrast |

The typed variants live in `components/ui/SectionBackground.tsx`. Shared tokens,
image opacity, grids, washes, and glow behavior live in `app/globals.css`.

## Page-Family Audit

| Page family | Classification | Applied treatment | Result |
| --- | --- | --- | --- |
| Home cinematic story and service explorers | Cinematic primary | Existing video and photography preserved | Preserved |
| Home One Roof and trust surfaces | Contextual surface | Reusable `surface` treatment | Complete |
| Home process, packages, and next-step bands | Contextual route | Reusable `route` treatment | Complete |
| Home resources | Contextual document | Reusable `document` treatment | Complete |
| Home locations | Contextual local | Reusable `local` treatment | Complete |
| Services index | Cinematic hero + route context | Existing hero preserved; explorer surfaces use `route` | Complete |
| Service detail | Functional file | Route, document, surface, and next-step treatments by section role | Complete |
| Packages | Cinematic route hero + route context | New connected-routes asset and `route` treatment | Complete |
| Locations index and detail | Cinematic local + local context | New local-network asset and `local` treatment | Complete |
| Resources index and detail | Cinematic document + document context | New operational-documents asset and `document` treatment | Complete |
| Contact | Cinematic hero + route context | Existing contact hero preserved; form area uses `route` | Complete |
| About | Contextual narrative | Local, surface, and route treatments by section role | Complete |

## New Assets

| Asset | Role | Optimized size |
| --- | --- | --- |
| `bg-local-network.webp` | Locations and local-support context | 106 KB |
| `bg-operational-documents.webp` | Resources and operational-file context | 58 KB |
| `bg-connected-routes.webp` | Packages, processes, and next-step context | 80 KB |

## Guardrails

- Photography is reserved for meaningful page-family context.
- Functional surfaces retain strong copy contrast.
- Background images remain decorative with empty alt text.
- Typed variants prevent one-off overlay stacks from spreading.
- Reduced-motion behavior is unchanged.
- No public content, claims, metadata, Schema.org, navigation, or form behavior changed.
