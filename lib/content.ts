export type Locale = "en" | "es";
export type ClaimStatus = "confirmed" | "research-pending" | "rejected";
export type JourneyStage = "start" | "operate" | "comply";
export type ServiceFamily =
  | "corporations"
  | "authority"
  | "registration"
  | "permits"
  | "insurance"
  | "compliance";

export interface LocalizedText {
  en: string;
  es: string;
}

export interface ClaimSource {
  label: string;
  url: string;
  accessedAt: string;
  note?: string;
}

export interface ServiceDetail {
  slug: string;
  topicSlug: string;
  title: LocalizedText;
  description: LocalizedText;
  whenNeeded: LocalizedText;
  status: ClaimStatus;
  sources: ClaimSource[];
}

export interface ServiceTopic {
  slug: string;
  familySlug: string;
  title: LocalizedText;
  description: LocalizedText;
  handles: LocalizedText;
  status: ClaimStatus;
  detailSlugs: string[];
  relatedFamilySlugs: string[];
  painImage?: string;
}

export interface ServiceContent {
  slug: string;
  family: ServiceFamily;
  journey: JourneyStage;
  status: ClaimStatus;
  sources: ClaimSource[];
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  urgency: LocalizedText;
  image: string;
  painImage: string;
  cardImage: string;
  details: ServiceDetail[];
  process: LocalizedText[];
  relatedFamilySlugs: string[];
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
}

export interface PackageContent {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  bestFor: LocalizedText;
  includes: LocalizedText[];
  status: ClaimStatus;
}

export interface ResourceFrontmatter {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  readingTime: LocalizedText;
  sections: Array<{ title: LocalizedText; body: LocalizedText }>;
}

export interface LocationContent {
  slug: string;
  name: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  fax: string;
  hours: LocalizedText;
  openingHours: Array<{ days: string[]; opens: string; closes: string }>;
  description: LocalizedText;
  lat: number;
  lng: number;
  status: ClaimStatus;
}

export interface AuditedClaim {
  id: string;
  status: ClaimStatus;
  text: LocalizedText;
  sources: ClaimSource[];
  note?: string;
}

export const localize = (value: LocalizedText, locale: string) =>
  value[locale === "es" ? "es" : "en"];

export const isPublicClaim = <T extends { status: ClaimStatus }>(item: T) =>
  item.status === "confirmed";

const currentWebsite: ClaimSource = {
  label: "Current Truckers Choice services page",
  url: "https://www.truckerspermitting.com/services",
  accessedAt: "2026-06-11",
};

const currentLocations: ClaimSource = {
  label: "Current Truckers Choice locations and local pages",
  url: "https://www.truckerspermitting.com/locations",
  accessedAt: "2026-06-11",
};

const researchReport: ClaimSource = {
  label: "Internal industry research",
  url: "internal://deep-research-report",
  accessedAt: "2026-06-11",
  note: "Useful opportunity research, not client approval.",
};

const faq = (
  questionEn: string,
  questionEs: string,
  answerEn: string,
  answerEs: string
) => ({
  question: { en: questionEn, es: questionEs },
  answer: { en: answerEn, es: answerEs },
});

const detail = (
  slug: string,
  topicSlug: string,
  en: string,
  es: string,
  descriptionEn: string,
  descriptionEs: string,
  whenEn: string,
  whenEs: string
): ServiceDetail => ({
  slug,
  topicSlug,
  title: { en, es },
  description: { en: descriptionEn, es: descriptionEs },
  whenNeeded: { en: whenEn, es: whenEs },
  status: "confirmed",
  sources: [currentWebsite],
});

const allServices: ServiceContent[] = [
  {
    slug: "corporations-llc",
    family: "corporations",
    journey: "start",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "Corporations & LLCs", es: "Corporaciones y LLC" },
    shortTitle: { en: "Build the business behind the truck.", es: "Construye el negocio detrás del camión." },
    description: {
      en: "Business formation and Tax ID/EIN assistance for new trucking operations.",
      es: "Asistencia con formación empresarial y Tax ID/EIN para nuevas operaciones de transporte.",
    },
    urgency: {
      en: "The business structure is the first piece that connects paperwork, insurance and permits.",
      es: "La estructura empresarial es la primera pieza que conecta documentos, seguros y permisos.",
    },
    image: "/images/svc-corp.jpg",
    painImage: "/images/pain-paperwork-cab.jpg",
    cardImage: "/images/svc-card-corp.png",
    details: [
      detail("corp", "business-formation", "Corporation (Corp)", "Corporación (Corp)", "Assistance forming a corporation for the trucking business.", "Asistencia para formar una corporación para el negocio de transporte.", "When starting or restructuring the business.", "Al iniciar o reestructurar el negocio."),
      detail("llc", "business-formation", "Limited Liability Company (LLC)", "Compañía de Responsabilidad Limitada (LLC)", "Assistance forming an LLC for the trucking business.", "Asistencia para formar una LLC para el negocio de transporte.", "When choosing an entity for a new operation.", "Al elegir una entidad para una nueva operación."),
      detail("inc", "business-formation", "Incorporation (Inc.)", "Incorporación (Inc.)", "Assistance with incorporation paperwork.", "Asistencia con documentos de incorporación.", "When the selected business structure requires incorporation.", "Cuando la estructura elegida requiere incorporación."),
      detail("ein-tax-id", "business-formation", "Tax ID / EIN", "Tax ID / EIN", "Assistance obtaining the federal tax identification used by the business.", "Asistencia para obtener la identificación fiscal federal usada por el negocio.", "When the business needs its federal tax identifier.", "Cuando el negocio necesita su identificador fiscal federal."),
    ],
    process: [
      { en: "Review the business goal", es: "Revisamos el objetivo del negocio" },
      { en: "Prepare formation information", es: "Preparamos la información de formación" },
      { en: "Connect the next registrations", es: "Conectamos los siguientes registros" },
    ],
    relatedFamilySlugs: ["authority-registration", "truck-insurance"],
    faqs: [
      faq("Should I form an LLC or corporation?", "¿Debo formar una LLC o corporación?", "The right structure depends on your situation. We organize the formation process, while legal or tax advice should come from qualified advisors.", "La estructura correcta depende de tu situación. Organizamos el proceso de formación, mientras el consejo legal o fiscal debe venir de profesionales calificados."),
      faq("What comes after formation?", "¿Qué sigue después de formar la empresa?", "New trucking businesses commonly move next into authority, insurance, registration and permit requirements.", "Los nuevos negocios de transporte normalmente continúan con autoridad, seguros, registros y permisos."),
    ],
  },
  {
    slug: "authority-registration",
    family: "authority",
    journey: "start",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "DOT & MC Authority", es: "Autoridad DOT y MC" },
    shortTitle: { en: "Set up the authority behind the operation.", es: "Establece la autoridad de tu operación." },
    description: {
      en: "Assistance with DOT, MC, BOC-3, UCR and Letter of Authority paperwork.",
      es: "Asistencia con documentos DOT, MC, BOC-3, UCR y Carta de Autoridad.",
    },
    urgency: {
      en: "Missing authority paperwork can delay the moment an operation is ready to move.",
      es: "La falta de documentos de autoridad puede retrasar el momento de empezar a operar.",
    },
    image: "/images/svc-authority.jpg",
    painImage: "/images/pain-authority-stop.webp",
    cardImage: "/images/svc-card-authority.png",
    details: [
      detail("dot-number", "usdot-mc", "DOT Number", "Número DOT", "Assistance with DOT number paperwork.", "Asistencia con documentos para el número DOT.", "When the operation requires DOT identification.", "Cuando la operación requiere identificación DOT."),
      detail("mc-number", "usdot-mc", "MC Number", "Número MC", "Assistance with MC operating authority paperwork.", "Asistencia con documentos de autoridad operativa MC.", "When the operation requires MC authority.", "Cuando la operación requiere autoridad MC."),
      detail("boc-3", "boc3-ucr", "BOC-3", "BOC-3", "Assistance with BOC-3 filing.", "Asistencia con la presentación BOC-3.", "When BOC-3 is part of the authority setup.", "Cuando BOC-3 forma parte de la apertura de autoridad."),
      detail("ucr", "boc3-ucr", "UCR", "UCR", "Assistance with UCR registration.", "Asistencia con el registro UCR.", "When UCR registration applies to the operation.", "Cuando el registro UCR aplica a la operación."),
      detail("letter-of-authority", "usdot-mc", "Letter of Authority", "Carta de Autoridad", "Assistance obtaining a Letter of Authority copy.", "Asistencia para obtener una copia de la Carta de Autoridad.", "When a current authority document is requested.", "Cuando se solicita un documento vigente de autoridad."),
    ],
    process: [
      { en: "Review how the business will operate", es: "Revisamos cómo operará el negocio" },
      { en: "Prepare the applicable filings", es: "Preparamos los trámites aplicables" },
      { en: "Organize the next operational steps", es: "Organizamos los próximos pasos operativos" },
    ],
    relatedFamilySlugs: ["truck-insurance", "irp-plates-titles"],
    faqs: [
      faq("Do I need both DOT and MC?", "¿Necesito DOT y MC?", "It depends on how and where the business operates. We review the operation before organizing the paperwork.", "Depende de cómo y dónde opera el negocio. Revisamos la operación antes de organizar los documentos."),
      faq("Can you help with a Letter of Authority?", "¿Ayudan con la Carta de Autoridad?", "Yes. Letter of Authority assistance is listed among the current services.", "Sí. La asistencia con Carta de Autoridad aparece entre los servicios actuales."),
    ],
  },
  {
    slug: "irp-plates-titles",
    family: "registration",
    journey: "operate",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "IRP, Plates & Titles", es: "IRP, Placas y Títulos" },
    shortTitle: { en: "Keep registrations and vehicle documents moving.", es: "Mantén en marcha registros y documentos." },
    description: {
      en: "Assistance with apportioned plates, commercial plates, registrations, transfers, titles and Form 2290.",
      es: "Asistencia con placas proporcionales, placas comerciales, registros, transferencias, títulos y Formulario 2290.",
    },
    urgency: {
      en: "Registration and title issues can interrupt trips and create avoidable delays.",
      es: "Los problemas de registro y título pueden interrumpir viajes y causar retrasos evitables.",
    },
    image: "/images/svc-irp.jpg",
    painImage: "/images/pain-weigh-station.jpg",
    cardImage: "/images/svc-card-irp.png",
    details: [
      detail("new-apportioned-plates", "irp-registration", "New apportioned plates", "Nuevas placas proporcionales", "Assistance with new apportioned plate paperwork.", "Asistencia con documentos para nuevas placas proporcionales.", "When registering an applicable vehicle for the first time.", "Al registrar por primera vez un vehículo aplicable."),
      detail("commercial-plates", "irp-registration", "Commercial plates", "Placas comerciales", "Assistance with commercial plate paperwork.", "Asistencia con documentos para placas comerciales.", "When a commercial vehicle needs the applicable plate.", "Cuando un vehículo comercial necesita la placa aplicable."),
      detail("registration-renewal", "irp-registration", "Registration renewal", "Renovación de registro", "Assistance renewing an existing registration.", "Asistencia para renovar un registro existente.", "Before the current registration expires.", "Antes del vencimiento del registro actual."),
      detail("plate-transfer", "titles-2290", "Plate transfer", "Transferencia de placa", "Assistance with plate transfer paperwork.", "Asistencia con documentos para transferencia de placa.", "When moving an applicable plate between vehicles.", "Al transferir una placa aplicable entre vehículos."),
      detail("titles", "titles-2290", "Titles", "Títulos", "Assistance with vehicle title paperwork.", "Asistencia con documentos de títulos vehiculares.", "When a title must be issued, updated or transferred.", "Cuando un título debe emitirse, actualizarse o transferirse."),
      detail("form-2290", "titles-2290", "Road Tax / Form 2290", "Road Tax / Formulario 2290", "Assistance with Road Tax Form 2290 paperwork.", "Asistencia con documentos del Road Tax/Formulario 2290.", "When Form 2290 applies to the vehicle.", "Cuando el Formulario 2290 aplica al vehículo."),
    ],
    process: [
      { en: "Confirm vehicle and document details", es: "Confirmamos vehículo y documentos" },
      { en: "Prepare the applicable paperwork", es: "Preparamos los documentos aplicables" },
      { en: "Coordinate the registration next step", es: "Coordinamos el siguiente paso del registro" },
    ],
    relatedFamilySlugs: ["permits-fuel-tax", "truck-insurance"],
    faqs: [
      faq("Can you help with registration renewals?", "¿Ayudan con renovaciones de registro?", "Yes. Registration renewal is listed among the current services.", "Sí. La renovación de registro aparece entre los servicios actuales."),
      faq("Do you assist with Form 2290?", "¿Ayudan con el Formulario 2290?", "Yes. Road Tax/Form 2290 assistance is listed among the current services.", "Sí. La asistencia con Road Tax/Formulario 2290 aparece entre los servicios actuales."),
    ],
  },
  {
    slug: "permits-fuel-tax",
    family: "permits",
    journey: "operate",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "Permits & Fuel Tax", es: "Permisos e Impuestos de Combustible" },
    shortTitle: { en: "Organize permits before the next route.", es: "Organiza permisos antes de la próxima ruta." },
    description: {
      en: "Assistance with IFTA, quarterly fuel taxes, state permits and temporary permits.",
      es: "Asistencia con IFTA, impuestos trimestrales de combustible, permisos estatales y temporales.",
    },
    urgency: {
      en: "Routes can introduce different permit and fuel-tax paperwork.",
      es: "Las rutas pueden introducir distintos documentos de permisos e impuestos de combustible.",
    },
    image: "/images/svc-permits.jpg",
    painImage: "/images/pain-state-line-snow.jpg",
    cardImage: "/images/svc-card-permits.png",
    details: [
      detail("ifta-permit", "ifta-fuel-tax", "IFTA permit", "Permiso IFTA", "Assistance with IFTA permit paperwork.", "Asistencia con documentos del permiso IFTA.", "When IFTA applies to the operation.", "Cuando IFTA aplica a la operación."),
      detail("ny-hut", "state-permits", "NY HUT permit", "Permiso NY HUT", "Assistance with NY HUT permit paperwork.", "Asistencia con documentos del permiso NY HUT.", "When the route and vehicle require NY HUT.", "Cuando la ruta y el vehículo requieren NY HUT."),
      detail("kyu", "state-permits", "KYU permit", "Permiso KYU", "Assistance with KYU permit paperwork.", "Asistencia con documentos del permiso KYU.", "When the route and vehicle require KYU.", "Cuando la ruta y el vehículo requieren KYU."),
      detail("nm-permit", "state-permits", "New Mexico permit", "Permiso de Nuevo México", "Assistance with New Mexico permit paperwork.", "Asistencia con documentos del permiso de Nuevo México.", "When the route and vehicle require the permit.", "Cuando la ruta y el vehículo requieren el permiso."),
      detail("temporary-permits", "state-permits", "Temporary permits", "Permisos temporales", "Assistance with temporary permit paperwork.", "Asistencia con documentos de permisos temporales.", "When a temporary permit is needed for a trip.", "Cuando se necesita un permiso temporal para un viaje."),
      detail("quarterly-fuel-taxes", "ifta-fuel-tax", "Quarterly fuel taxes", "Impuestos trimestrales de combustible", "Assistance with quarterly fuel-tax paperwork.", "Asistencia con documentos trimestrales de impuestos de combustible.", "When the applicable quarterly filing is due.", "Cuando vence la declaración trimestral aplicable."),
    ],
    process: [
      { en: "Review routes and current paperwork", es: "Revisamos rutas y documentos actuales" },
      { en: "Identify the applicable permits", es: "Identificamos los permisos aplicables" },
      { en: "Organize filings and recurring dates", es: "Organizamos trámites y fechas recurrentes" },
    ],
    relatedFamilySlugs: ["irp-plates-titles", "dot-compliance"],
    faqs: [
      faq("Do you assist with state permits?", "¿Ayudan con permisos estatales?", "Yes. NY HUT, KYU and New Mexico permits are listed among the current services.", "Sí. Los permisos NY HUT, KYU y Nuevo México aparecen entre los servicios actuales."),
      faq("Can you help with quarterly fuel taxes?", "¿Ayudan con impuestos trimestrales de combustible?", "Yes. Quarterly fuel-tax assistance is listed among the current services.", "Sí. La asistencia con impuestos trimestrales de combustible aparece entre los servicios actuales."),
    ],
  },
  {
    slug: "truck-insurance",
    family: "insurance",
    journey: "operate",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "Truck Insurance", es: "Seguro de Camiones" },
    shortTitle: { en: "Coordinate coverage around the operation.", es: "Coordina cobertura alrededor de tu operación." },
    description: {
      en: "Assistance with primary liability, cargo, bobtail and physical damage insurance.",
      es: "Asistencia con seguros de responsabilidad primaria, carga, bobtail y daños físicos.",
    },
    urgency: {
      en: "Coverage needs change with the truck, cargo and operation.",
      es: "Las necesidades de cobertura cambian según el camión, la carga y la operación.",
    },
    image: "/images/svc-insurance.jpg",
    painImage: "/images/pain-storm-road.webp",
    cardImage: "/images/svc-card-insurance.png",
    details: [
      detail("primary-liability", "coverage-options", "Primary liability", "Responsabilidad primaria", "Assistance coordinating primary liability insurance.", "Asistencia para coordinar seguro de responsabilidad primaria.", "When the operation needs applicable liability coverage.", "Cuando la operación necesita la cobertura de responsabilidad aplicable."),
      detail("cargo-insurance", "coverage-options", "Cargo insurance", "Seguro de carga", "Assistance coordinating cargo insurance.", "Asistencia para coordinar seguro de carga.", "When the operation needs coverage for transported cargo.", "Cuando la operación necesita cobertura para la carga transportada."),
      detail("bobtail", "coverage-options", "Bobtail", "Bobtail", "Assistance coordinating bobtail insurance.", "Asistencia para coordinar seguro bobtail.", "When bobtail coverage applies to the operation.", "Cuando la cobertura bobtail aplica a la operación."),
      detail("physical-damage", "coverage-options", "Physical damage", "Daños físicos", "Assistance coordinating physical damage insurance.", "Asistencia para coordinar seguro de daños físicos.", "When the equipment needs applicable physical damage coverage.", "Cuando el equipo necesita cobertura aplicable de daños físicos."),
    ],
    process: [
      { en: "Review the truck, cargo and operation", es: "Revisamos camión, carga y operación" },
      { en: "Organize applicable coverage needs", es: "Organizamos las coberturas aplicables" },
      { en: "Coordinate the quote process", es: "Coordinamos el proceso de cotización" },
    ],
    relatedFamilySlugs: ["authority-registration", "irp-plates-titles"],
    faqs: [
      faq("What coverage do I need?", "¿Qué cobertura necesito?", "Coverage depends on the operation, equipment, cargo and applicable requirements. A specialist reviews the situation before coordinating a quote.", "La cobertura depende de la operación, equipo, carga y requisitos aplicables. Un especialista revisa la situación antes de coordinar una cotización."),
      faq("Can insurance and permits be coordinated?", "¿Se pueden coordinar seguro y permisos?", "Yes. The current website presents insurance and permits as connected services.", "Sí. La web actual presenta seguros y permisos como servicios conectados."),
    ],
  },
  {
    slug: "dot-compliance",
    family: "compliance",
    journey: "comply",
    status: "confirmed",
    sources: [currentWebsite],
    title: { en: "DOT Compliance & Audits", es: "Cumplimiento DOT y Auditorías" },
    shortTitle: { en: "Keep required records organized.", es: "Mantén organizados los registros requeridos." },
    description: {
      en: "Assistance with MVR reports, driver applications, testing programs and DOT audits.",
      es: "Asistencia con reportes MVR, solicitudes de conductores, programas de pruebas y auditorías DOT.",
    },
    urgency: {
      en: "Missing compliance records can create interruptions when documents are requested.",
      es: "La falta de registros de cumplimiento puede causar interrupciones cuando se solicitan documentos.",
    },
    image: "/images/svc-compliance.jpg",
    painImage: "/images/pain-audit-desk.jpg",
    cardImage: "/images/svc-card-compliance.png",
    details: [
      detail("mvr-report", "audits-testing", "MVR report", "Reporte MVR", "Assistance with MVR report paperwork.", "Asistencia con documentos del reporte MVR.", "When an applicable motor vehicle record is needed.", "Cuando se necesita un registro vehicular aplicable."),
      detail("driver-application", "audits-testing", "Driver application", "Solicitud de conductor", "Assistance organizing driver application paperwork.", "Asistencia para organizar documentos de solicitud del conductor.", "When adding or documenting a driver.", "Al agregar o documentar un conductor."),
      detail("random-program", "audits-testing", "Random program enrollment", "Inscripción en programa aleatorio", "Assistance with random program enrollment.", "Asistencia con inscripción en programa aleatorio.", "When the applicable testing program is required.", "Cuando se requiere el programa de pruebas aplicable."),
      detail("pre-employment-drug-test", "audits-testing", "Pre-employment drug test", "Prueba de drogas pre-empleo", "Assistance coordinating a pre-employment drug test.", "Asistencia para coordinar una prueba de drogas pre-empleo.", "Before an applicable driver begins work.", "Antes de que un conductor aplicable comience a trabajar."),
      detail("dot-audit", "audits-testing", "DOT audit", "Auditoría DOT", "Assistance preparing for a DOT audit.", "Asistencia para prepararse para una auditoría DOT.", "When preparing records for a DOT audit.", "Al preparar registros para una auditoría DOT."),
    ],
    process: [
      { en: "Review existing records", es: "Revisamos los registros existentes" },
      { en: "Identify missing documents", es: "Identificamos documentos faltantes" },
      { en: "Organize the applicable next step", es: "Organizamos el siguiente paso aplicable" },
    ],
    relatedFamilySlugs: ["permits-fuel-tax", "authority-registration"],
    faqs: [
      faq("Can you help before a DOT audit?", "¿Pueden ayudar antes de una auditoría DOT?", "Yes. DOT audit assistance is listed among the current services.", "Sí. La asistencia con auditorías DOT aparece entre los servicios actuales."),
      faq("Do you assist with driver paperwork?", "¿Ayudan con documentos de conductores?", "Yes. MVR reports and driver applications are listed among the current services.", "Sí. Los reportes MVR y solicitudes de conductores aparecen entre los servicios actuales."),
    ],
  },
];

export const services = allServices.filter(isPublicClaim);

const allServiceTopics: ServiceTopic[] = [
  {
    slug: "business-formation",
    familySlug: "corporations-llc",
    title: { en: "Corp, LLC, Inc. & EIN", es: "Corp, LLC, Inc. y EIN" },
    description: { en: "The formation documents behind a new trucking business.", es: "Los documentos de formación detrás de un nuevo negocio de transporte." },
    handles: { en: "Truckers Choice helps organize the selected formation and Tax ID/EIN paperwork.", es: "Truckers Choice ayuda a organizar la formación elegida y los documentos Tax ID/EIN." },
    status: "confirmed",
    detailSlugs: ["corp", "llc", "inc", "ein-tax-id"],
    relatedFamilySlugs: ["authority-registration"],
    painImage: "/images/hero-alt-newowner-dawn.jpg",
  },
  {
    slug: "usdot-mc",
    familySlug: "authority-registration",
    title: { en: "DOT, MC & Letter of Authority", es: "DOT, MC y Carta de Autoridad" },
    description: { en: "Core authority paperwork for the operation.", es: "Documentos centrales de autoridad para la operación." },
    handles: { en: "Truckers Choice helps organize DOT, MC and Letter of Authority paperwork.", es: "Truckers Choice ayuda a organizar documentos DOT, MC y Carta de Autoridad." },
    status: "confirmed",
    detailSlugs: ["dot-number", "mc-number", "letter-of-authority"],
    relatedFamilySlugs: ["truck-insurance", "irp-plates-titles"],
    painImage: "/images/pain-roadside-inspection.jpg",
  },
  {
    slug: "boc3-ucr",
    familySlug: "authority-registration",
    title: { en: "BOC-3 & UCR", es: "BOC-3 y UCR" },
    description: { en: "Additional authority-related filings listed in the current service catalog.", es: "Trámites adicionales de autoridad incluidos en el catálogo actual." },
    handles: { en: "Truckers Choice assists with BOC-3 and UCR paperwork.", es: "Truckers Choice ayuda con documentos BOC-3 y UCR." },
    status: "confirmed",
    detailSlugs: ["boc-3", "ucr"],
    relatedFamilySlugs: ["authority-registration"],
    painImage: "/images/pain-grounded-truck.jpg",
  },
  {
    slug: "irp-registration",
    familySlug: "irp-plates-titles",
    title: { en: "IRP, commercial plates & renewals", es: "IRP, placas comerciales y renovaciones" },
    description: { en: "Plate and registration paperwork for commercial vehicles.", es: "Documentos de placas y registro para vehículos comerciales." },
    handles: { en: "Truckers Choice assists with apportioned plates, commercial plates and registration renewals.", es: "Truckers Choice ayuda con placas proporcionales, placas comerciales y renovaciones." },
    status: "confirmed",
    detailSlugs: ["new-apportioned-plates", "commercial-plates", "registration-renewal"],
    relatedFamilySlugs: ["permits-fuel-tax"],
    painImage: "/images/pain-weigh-station.jpg",
  },
  {
    slug: "titles-2290",
    familySlug: "irp-plates-titles",
    title: { en: "Plate transfers, titles & Form 2290", es: "Transferencias, títulos y Formulario 2290" },
    description: { en: "Vehicle document assistance beyond the initial plate.", es: "Asistencia documental del vehículo más allá de la placa inicial." },
    handles: { en: "Truckers Choice assists with plate transfers, titles and Road Tax/Form 2290 paperwork.", es: "Truckers Choice ayuda con transferencias de placas, títulos y Road Tax/Formulario 2290." },
    status: "confirmed",
    detailSlugs: ["plate-transfer", "titles", "form-2290"],
    relatedFamilySlugs: ["irp-plates-titles"],
    painImage: "/images/pain-paperwork-cab.jpg",
  },
  {
    slug: "ifta-fuel-tax",
    familySlug: "permits-fuel-tax",
    title: { en: "IFTA & quarterly fuel taxes", es: "IFTA e impuestos trimestrales de combustible" },
    description: { en: "Fuel-tax paperwork listed in the current service catalog.", es: "Documentos de impuestos de combustible incluidos en el catálogo actual." },
    handles: { en: "Truckers Choice assists with IFTA permits and quarterly fuel-tax paperwork.", es: "Truckers Choice ayuda con permisos IFTA y documentos trimestrales de combustible." },
    status: "confirmed",
    detailSlugs: ["ifta-permit", "quarterly-fuel-taxes"],
    relatedFamilySlugs: ["irp-plates-titles"],
    painImage: "/images/pain-fuel-stop.jpg",
  },
  {
    slug: "state-permits",
    familySlug: "permits-fuel-tax",
    title: { en: "State & temporary permits", es: "Permisos estatales y temporales" },
    description: { en: "NY HUT, KYU, New Mexico and temporary permit assistance.", es: "Asistencia con NY HUT, KYU, Nuevo México y permisos temporales." },
    handles: { en: "Truckers Choice helps organize the applicable state or temporary permit paperwork.", es: "Truckers Choice ayuda a organizar los documentos estatales o temporales aplicables." },
    status: "confirmed",
    detailSlugs: ["ny-hut", "kyu", "nm-permit", "temporary-permits"],
    relatedFamilySlugs: ["permits-fuel-tax"],
    painImage: "/images/pain-state-line-snow.jpg",
  },
  {
    slug: "coverage-options",
    familySlug: "truck-insurance",
    title: { en: "Truck insurance coverage options", es: "Opciones de cobertura para camiones" },
    description: { en: "Primary liability, cargo, bobtail and physical damage assistance.", es: "Asistencia con responsabilidad primaria, carga, bobtail y daños físicos." },
    handles: { en: "Truckers Choice coordinates the quote process around the applicable coverage needs.", es: "Truckers Choice coordina la cotización según las coberturas aplicables." },
    status: "confirmed",
    detailSlugs: ["primary-liability", "cargo-insurance", "bobtail", "physical-damage"],
    relatedFamilySlugs: ["authority-registration"],
    painImage: "/images/pain-cargo-dock.jpg",
  },
  {
    slug: "audits-testing",
    familySlug: "dot-compliance",
    title: { en: "Driver records, testing & DOT audits", es: "Registros, pruebas y auditorías DOT" },
    description: { en: "Confirmed driver-document, testing-program and audit assistance.", es: "Asistencia confirmada con documentos, programas de pruebas y auditorías." },
    handles: { en: "Truckers Choice helps organize the applicable records and next steps.", es: "Truckers Choice ayuda a organizar los registros y próximos pasos aplicables." },
    status: "confirmed",
    detailSlugs: ["mvr-report", "driver-application", "random-program", "pre-employment-drug-test", "dot-audit"],
    relatedFamilySlugs: ["dot-compliance"],
    painImage: "/images/pain-audit-desk.jpg",
  },
];

export const serviceTopics = allServiceTopics.filter(isPublicClaim);

export const auditedClaims: AuditedClaim[] = [
  {
    id: "one-roof-service-model",
    status: "confirmed",
    text: { en: "Insurance, permits and compliance are coordinated in one place.", es: "Seguros, permisos y cumplimiento se coordinan en un solo lugar." },
    sources: [currentWebsite],
  },
  {
    id: "experience-duration",
    status: "research-pending",
    text: { en: "More than 20 years of experience.", es: "Más de 20 años de experiencia." },
    sources: [
      { ...currentWebsite, url: "https://www.truckerspermitting.com" },
      { ...currentWebsite, url: "https://www.truckerspermitting.com/about-us", note: "Contradicts homepage by stating more than 15 years." },
    ],
    note: "Use neutral experience language until the client confirms the correct duration.",
  },
  {
    id: "uiia-iana",
    status: "research-pending",
    text: { en: "UIIA/IANA port drayage insurance services.", es: "Servicios de seguro UIIA/IANA para drayage portuario." },
    sources: [researchReport],
  },
  {
    id: "clearinghouse-mcs150-dqf",
    status: "research-pending",
    text: { en: "Clearinghouse, MCS-150 and DQF services.", es: "Servicios de Clearinghouse, MCS-150 y DQF." },
    sources: [researchReport],
  },
  {
    id: "hotshot-freight-broker-bmc84",
    status: "research-pending",
    text: { en: "Hotshot, freight broker and BMC-84 service packages.", es: "Paquetes para Hotshot, freight broker y BMC-84." },
    sources: [researchReport],
  },
  {
    id: "exact-history-dates",
    status: "research-pending",
    text: { en: "Exact founding, expansion and office-opening dates.", es: "Fechas exactas de fundación, expansión y apertura de oficinas." },
    sources: [researchReport],
  },
  {
    id: "legacy-mechanical-booking",
    status: "rejected",
    text: { en: "Tire, battery and oil/brake booking services.", es: "Reservas de llantas, batería y aceite/frenos." },
    sources: [{ ...currentWebsite, url: "https://www.truckerspermitting.com/book-online", note: "Inherited Wix template content with placeholder contact details." }],
  },
];

const allPackages: PackageContent[] = [
  {
    slug: "start-the-business",
    title: { en: "Start the Business", es: "Inicia el Negocio" },
    description: { en: "Connect formation and authority paperwork around the new operation.", es: "Conecta formación y documentos de autoridad alrededor de la nueva operación." },
    bestFor: { en: "New trucking businesses", es: "Nuevos negocios de transporte" },
    includes: [services[0].title, services[1].title],
    status: "confirmed",
  },
  {
    slug: "prepare-to-operate",
    title: { en: "Prepare to Operate", es: "Prepárate para Operar" },
    description: { en: "Coordinate registration, permits and insurance around the truck and routes.", es: "Coordina registros, permisos y seguros alrededor del camión y sus rutas." },
    bestFor: { en: "Operations getting ready to move", es: "Operaciones preparándose para rodar" },
    includes: [services[2].title, services[3].title, services[4].title],
    status: "confirmed",
  },
  {
    slug: "keep-records-ready",
    title: { en: "Keep Records Ready", es: "Mantén Registros Listos" },
    description: { en: "Organize recurring permits, driver paperwork and audit preparation.", es: "Organiza permisos recurrentes, documentos de conductores y auditorías." },
    bestFor: { en: "Existing trucking operations", es: "Operaciones de transporte existentes" },
    includes: [services[3].title, services[5].title],
    status: "confirmed",
  },
];

export const packages = allPackages.filter(isPublicClaim);

const allLocations: LocationContent[] = [
  {
    slug: "medley-fl",
    name: "Medley, FL",
    address: "9090 NW South River Dr. Ste 2, Medley, FL 33166",
    street: "9090 NW South River Dr. Ste 2",
    city: "Medley",
    state: "FL",
    zip: "33166",
    phone: "305-749-9990",
    phoneRaw: "+13057499990",
    fax: "305-900-5699",
    hours: { en: "Mon-Fri 9-5 · Sat 9-1", es: "Lun-Vie 9-5 · Sab 9-1" },
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { days: ["Saturday"], opens: "09:00", closes: "13:00" },
    ],
    description: { en: "Local office serving the trucking community in Medley, Florida.", es: "Oficina local que atiende a la comunidad camionera en Medley, Florida." },
    lat: 25.854881,
    lng: -80.342371,
    status: "confirmed",
  },
  {
    slug: "jersey-city-nj",
    name: "Jersey City, NJ",
    address: "376 Duncan Ave, Suite 3, Jersey City, NJ 07306",
    street: "376 Duncan Ave, Suite 3",
    city: "Jersey City",
    state: "NJ",
    zip: "07306",
    phone: "201-333-2255",
    phoneRaw: "+12013332255",
    fax: "201-333-0522",
    hours: { en: "Mon-Fri 9-6 · Sat 10-2", es: "Lun-Vie 9-6 · Sab 10-2" },
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { days: ["Saturday"], opens: "10:00", closes: "14:00" },
    ],
    description: { en: "Local office serving the trucking community in Jersey City, New Jersey.", es: "Oficina local que atiende a la comunidad camionera en Jersey City, Nueva Jersey." },
    lat: 40.72591,
    lng: -74.07661,
    status: "confirmed",
  },
  {
    slug: "elizabeth-nj",
    name: "Elizabeth, NJ",
    address: "701 Spring St, Suite 7, Elizabeth, NJ 07201",
    street: "701 Spring St, Suite 7",
    city: "Elizabeth",
    state: "NJ",
    zip: "07201",
    phone: "908-351-1085",
    phoneRaw: "+19083511085",
    fax: "908-351-1086",
    hours: { en: "Mon-Fri 9-6 · Sat 10-2", es: "Lun-Vie 9-6 · Sab 10-2" },
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { days: ["Saturday"], opens: "10:00", closes: "14:00" },
    ],
    description: { en: "Local office serving the trucking community in Elizabeth, New Jersey.", es: "Oficina local que atiende a la comunidad camionera en Elizabeth, Nueva Jersey." },
    lat: 40.67912,
    lng: -74.19504,
    status: "confirmed",
  },
];

export const locations = allLocations.filter(isPublicClaim);

export const resources: ResourceFrontmatter[] = [
  {
    slug: "startup-checklist",
    title: { en: "The trucking-business startup checklist", es: "Checklist para iniciar un negocio de transporte" },
    description: { en: "A plain-language map of the paperwork behind a new trucking operation.", es: "Un mapa claro de los documentos detrás de una nueva operación de transporte." },
    eyebrow: { en: "Start organized", es: "Empieza organizado" },
    readingTime: { en: "6 min read", es: "6 min de lectura" },
    sections: [
      { title: { en: "Build the business", es: "Construye el negocio" }, body: { en: "Start with the selected business formation and Tax ID/EIN paperwork.", es: "Empieza con la formación empresarial elegida y los documentos Tax ID/EIN." } },
      { title: { en: "Organize authority and insurance", es: "Organiza autoridad y seguro" }, body: { en: "Connect the applicable authority and insurance paperwork around the operation.", es: "Conecta los documentos aplicables de autoridad y seguros alrededor de la operación." } },
      { title: { en: "Prepare recurring records", es: "Prepara registros recurrentes" }, body: { en: "Keep registrations, permits and compliance documents organized before deadlines.", es: "Mantén registros, permisos y documentos de cumplimiento organizados antes de los vencimientos." } },
    ],
  },
  {
    slug: "irp-vs-ifta",
    title: { en: "IRP vs IFTA: two different paperwork paths", es: "IRP vs IFTA: dos caminos documentales distintos" },
    description: { en: "A simple introduction to two services commonly requested by interstate operations.", es: "Una introducción sencilla a dos servicios solicitados por operaciones interestatales." },
    eyebrow: { en: "Permits explained", es: "Permisos claros" },
    readingTime: { en: "5 min read", es: "5 min de lectura" },
    sections: [
      { title: { en: "IRP connects to registration", es: "IRP se conecta al registro" }, body: { en: "IRP assistance sits with apportioned plates and commercial registration paperwork.", es: "La asistencia IRP se relaciona con placas proporcionales y documentos de registro comercial." } },
      { title: { en: "IFTA connects to fuel-tax paperwork", es: "IFTA se conecta a documentos de combustible" }, body: { en: "IFTA assistance sits with permits and quarterly fuel-tax paperwork.", es: "La asistencia IFTA se relaciona con permisos y documentos trimestrales de combustible." } },
      { title: { en: "Review the operation first", es: "Revisa primero la operación" }, body: { en: "The right paperwork depends on the vehicle, routes and current registrations.", es: "Los documentos correctos dependen del vehículo, rutas y registros actuales." } },
    ],
  },
  {
    slug: "dot-audit-preparation",
    title: { en: "Organize records before a DOT audit", es: "Organiza registros antes de una auditoría DOT" },
    description: { en: "A practical starting point for the confirmed compliance services.", es: "Un punto de partida práctico para los servicios confirmados de cumplimiento." },
    eyebrow: { en: "Keep records ready", es: "Mantén registros listos" },
    readingTime: { en: "7 min read", es: "7 min de lectura" },
    sections: [
      { title: { en: "Know what you have", es: "Conoce lo que tienes" }, body: { en: "Inventory driver applications, MVR reports, testing records and permit documents.", es: "Inventaría solicitudes de conductores, reportes MVR, pruebas y permisos." } },
      { title: { en: "Identify missing documents", es: "Identifica documentos faltantes" }, body: { en: "Missing records are easier to organize before an audit request.", es: "Los registros faltantes son más fáciles de organizar antes de una auditoría." } },
      { title: { en: "Maintain the paperwork", es: "Mantén los documentos" }, body: { en: "Treat compliance documents as a recurring operating responsibility.", es: "Trata los documentos de cumplimiento como una responsabilidad operativa recurrente." } },
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
export const getServiceTopics = (familySlug: string) =>
  serviceTopics.filter((topic) => topic.familySlug === familySlug);
export const getServiceDetailsForTopic = (topic: ServiceTopic) => {
  const family = getService(topic.familySlug);
  return family?.details.filter((item) => topic.detailSlugs.includes(item.slug) && isPublicClaim(item)) ?? [];
};
export const getLocation = (slug: string) => locations.find((location) => location.slug === slug);
export const getResource = (slug: string) => resources.find((resource) => resource.slug === slug);
