# Service Content Audit

<content_governance>
  <public_rule>
    Only entries marked `confirmed` may appear in navigation, pages, forms,
    metadata, or structured data.
  </public_rule>

  <research_rule>
    Entries marked `research-pending` remain available for future client review
    but must stay hidden from public surfaces.
  </research_rule>

  <rejected_rule>
    Entries marked `rejected` must not be recreated or redirected into the new
    service catalog.
  </rejected_rule>
</content_governance>

## Sources

| ID | Source | Accessed |
|---|---|---|
| CURRENT-SERVICES | https://www.truckerspermitting.com/services | 2026-06-11 |
| CURRENT-LOCATIONS | https://www.truckerspermitting.com/locations and current local pages | 2026-06-11 |
| INTERNAL-RESEARCH | `deep-research-report.md` | 2026-06-11 |

## Confirmed Public Catalog

| Family | English | Spanish | Status | Source |
|---|---|---|---|---|
| Corporations | Corporation (Corp) | Corporacion (Corp) | confirmed | CURRENT-SERVICES |
| Corporations | Limited Liability Company (LLC) | Compania de Responsabilidad Limitada (LLC) | confirmed | CURRENT-SERVICES |
| Corporations | Incorporation (Inc.) | Incorporacion (Inc.) | confirmed | CURRENT-SERVICES |
| Corporations | Tax ID / EIN | Tax ID / EIN | confirmed | CURRENT-SERVICES |
| DOT & MC Authority | DOT Number | Numero DOT | confirmed | CURRENT-SERVICES |
| DOT & MC Authority | MC Number | Numero MC | confirmed | CURRENT-SERVICES |
| DOT & MC Authority | BOC-3 | BOC-3 | confirmed | CURRENT-SERVICES |
| DOT & MC Authority | UCR | UCR | confirmed | CURRENT-SERVICES |
| DOT & MC Authority | Letter of Authority | Carta de Autoridad | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | New apportioned plates | Nuevas placas proporcionales | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | Commercial plates | Placas comerciales | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | Registration renewal | Renovacion de registro | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | Plate transfer | Transferencia de placa | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | Titles | Titulos | confirmed | CURRENT-SERVICES |
| IRP, Plates & Titles | Road Tax / Form 2290 | Road Tax / Formulario 2290 | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | IFTA permit | Permiso IFTA | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | NY HUT permit | Permiso NY HUT | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | KYU permit | Permiso KYU | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | New Mexico permit | Permiso de Nuevo Mexico | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | Temporary permits | Permisos temporales | confirmed | CURRENT-SERVICES |
| Permits & Fuel Tax | Quarterly fuel taxes | Impuestos trimestrales de combustible | confirmed | CURRENT-SERVICES |
| Truck Insurance | Primary liability | Responsabilidad primaria | confirmed | CURRENT-SERVICES |
| Truck Insurance | Cargo insurance | Seguro de carga | confirmed | CURRENT-SERVICES |
| Truck Insurance | Bobtail | Bobtail | confirmed | CURRENT-SERVICES |
| Truck Insurance | Physical damage | Danos fisicos | confirmed | CURRENT-SERVICES |
| DOT Compliance | MVR report | Reporte MVR | confirmed | CURRENT-SERVICES |
| DOT Compliance | Driver application | Solicitud de conductor | confirmed | CURRENT-SERVICES |
| DOT Compliance | Random program enrollment | Inscripcion en programa aleatorio | confirmed | CURRENT-SERVICES |
| DOT Compliance | Pre-employment drug test | Prueba de drogas pre-empleo | confirmed | CURRENT-SERVICES |
| DOT Compliance | DOT audit | Auditoria DOT | confirmed | CURRENT-SERVICES |

## Pending or Rejected Claims

| Claim | Status | Reason |
|---|---|---|
| More than 20 years of experience | research-pending | Current website also states more than 15 years. Use neutral language until confirmed. |
| UIIA/IANA and port drayage specialization | research-pending | Found through internal research, not the client's current public service catalog. |
| Clearinghouse, MCS-150 and DQF services | research-pending | Industry opportunity, not confirmed by the current public service catalog. |
| Hotshot, Freight Broker and BMC-84 packages | research-pending | Industry opportunity, not confirmed by the current public service catalog. |
| Exact founding and expansion dates | research-pending | No client-approved source available. |
| Medley as headquarters | research-pending | The address is confirmed; HQ status is not confirmed by the audited source set. |
| Tire, battery and oil/brake booking pages | rejected | Inherited Wix template content with placeholder copy and contact details. |

The runtime source of truth is [lib/content.ts](../lib/content.ts). This document
is the human-readable review artifact; code-level validation prevents hidden
claims from reaching public surfaces.
