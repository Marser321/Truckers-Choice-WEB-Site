export type Locale = "en" | "es";

export interface LocalizedText {
  en: string;
  es: string;
}

export interface ServiceContent {
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  urgency: LocalizedText;
  image: string;
  painImage: string;
  cardImage: string;
  includes: LocalizedText[];
  process: LocalizedText[];
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
}

export interface PackageContent {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  bestFor: LocalizedText;
  includes: LocalizedText[];
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
  description: LocalizedText;
  lat: number;
  lng: number;
}

export const localize = (value: LocalizedText, locale: string) =>
  value[locale === "es" ? "es" : "en"];

const faq = (
  questionEn: string,
  questionEs: string,
  answerEn: string,
  answerEs: string
) => ({
  question: { en: questionEn, es: questionEs },
  answer: { en: answerEn, es: answerEs },
});

export const services: ServiceContent[] = [
  {
    slug: "authority-registration",
    title: { en: "Authority & Registration", es: "Autoridad y Registro" },
    shortTitle: { en: "Get legal. Start moving.", es: "Actívate. Empieza a rodar." },
    description: {
      en: "We coordinate USDOT, MC authority, BOC-3 and UCR so your operation starts on solid ground.",
      es: "Coordinamos USDOT, autoridad MC, BOC-3 y UCR para que tu operación empiece sobre una base firme.",
    },
    urgency: {
      en: "Operating without the right authority can stop a truck before the first profitable load.",
      es: "Operar sin la autoridad correcta puede detener el camión antes de la primera carga rentable.",
    },
    image: "/images/svc-authority.jpg",
    painImage: "/images/pain-authority-stop.webp",
    cardImage: "/images/svc-card-authority.png",
    includes: [
      { en: "USDOT number registration", es: "Registro de número USDOT" },
      { en: "MC operating authority", es: "Autoridad operativa MC" },
      { en: "BOC-3 filing", es: "Presentación BOC-3" },
      { en: "UCR registration guidance", es: "Acompañamiento para registro UCR" },
      { en: "MC Letter of Authority copies", es: "Copias de la Carta de Autoridad MC (Letter of Authority)" },
    ],
    process: [
      { en: "We review your operation", es: "Revisamos tu operación" },
      { en: "We prepare the required filings", es: "Preparamos las presentaciones requeridas" },
      { en: "We guide you through activation", es: "Te acompañamos hasta la activación" },
    ],
    faqs: [
      faq("Do I need both USDOT and MC?", "¿Necesito USDOT y MC?", "It depends on how and where you operate. We review your operation before recommending filings.", "Depende de cómo y dónde operas. Revisamos tu operación antes de recomendar trámites."),
      faq("How long does activation take?", "¿Cuánto tarda la activación?", "Timing varies by filing and federal processing. We give you a clear checklist and next steps.", "El tiempo varía según el trámite y el procesamiento federal. Te damos un checklist y próximos pasos claros."),
      faq("What is a Letter of Authority?", "¿Qué es la Letter of Authority?", "It is the official FMCSA document confirming your operating authority is active. Brokers, shippers and insurers often request a copy before working with you. We help you obtain it and keep it on file.", "Es el documento oficial de la FMCSA que confirma que tu autoridad operativa está activa. Brokers, embarcadores y aseguradoras suelen pedir una copia antes de trabajar contigo. Te ayudamos a obtenerla y mantenerla en archivo."),
    ],
  },
  {
    slug: "irp-plates-titles",
    title: { en: "IRP, Plates & Titles", es: "IRP, Placas y Títulos" },
    shortTitle: { en: "Keep every wheel authorized.", es: "Mantén cada rueda autorizada." },
    description: {
      en: "Apportioned registrations, commercial plates, titles and Form 2290 support for interstate trucks.",
      es: "Registros proporcionales, placas comerciales, títulos y apoyo con Formulario 2290 para camiones interestatales.",
    },
    urgency: {
      en: "Expired or incorrect registrations create delays at weigh stations and ports of entry.",
      es: "Registros vencidos o incorrectos generan retrasos en básculas y puertos de entrada.",
    },
    image: "/images/svc-irp.jpg",
    painImage: "/images/pain-weigh-station.jpg",
    cardImage: "/images/svc-card-irp.png",
    includes: [
      { en: "IRP account setup and renewals", es: "Apertura y renovación de cuenta IRP" },
      { en: "Apportioned plates", es: "Placas proporcionales" },
      { en: "Title transfers", es: "Transferencias de título" },
      { en: "Form 2290 guidance", es: "Acompañamiento con Formulario 2290" },
    ],
    process: [
      { en: "Confirm vehicle and operation details", es: "Confirmamos vehículo y operación" },
      { en: "Prepare registration documents", es: "Preparamos documentos de registro" },
      { en: "Coordinate filing and renewal", es: "Coordinamos presentación y renovación" },
    ],
    faqs: [
      faq("What is IRP?", "¿Qué es IRP?", "IRP distributes commercial registration fees across the jurisdictions where a qualified vehicle operates.", "IRP distribuye las tarifas de registro comercial entre las jurisdicciones donde opera un vehículo calificado."),
      faq("Can you help with renewals?", "¿Ayudan con renovaciones?", "Yes. We can review your current registration and help prepare the renewal.", "Sí. Podemos revisar tu registro actual y ayudar a preparar la renovación."),
    ],
  },
  {
    slug: "permits-fuel-tax",
    title: { en: "Permits & Fuel Tax", es: "Permisos e Impuestos de Combustible" },
    shortTitle: { en: "Cross state lines with confidence.", es: "Cruza estados con confianza." },
    description: {
      en: "IFTA and state-specific permit support for carriers operating across multiple jurisdictions.",
      es: "Apoyo con IFTA y permisos estatales para transportistas que operan en múltiples jurisdicciones.",
    },
    urgency: {
      en: "Every state line can introduce a different filing, tax or permit requirement.",
      es: "Cada frontera estatal puede introducir un trámite, impuesto o permiso diferente.",
    },
    image: "/images/svc-permits.jpg",
    painImage: "/images/pain-weigh-station.jpg",
    cardImage: "/images/svc-card-permits.png",
    includes: [
      { en: "IFTA account setup", es: "Apertura de cuenta IFTA" },
      { en: "Quarterly fuel-tax filing support", es: "Apoyo con declaraciones trimestrales" },
      { en: "NY HUT, KYU and New Mexico permits", es: "Permisos NY HUT, KYU y Nuevo México" },
      { en: "Temporary trip permits", es: "Permisos temporales de viaje" },
    ],
    process: [
      { en: "Map where you operate", es: "Mapeamos dónde operas" },
      { en: "Identify required permits", es: "Identificamos los permisos requeridos" },
      { en: "Prepare filings and deadlines", es: "Preparamos trámites y fechas límite" },
    ],
    faqs: [
      faq("Do I need IFTA?", "¿Necesito IFTA?", "It depends on your vehicle and interstate operation. We help determine the requirements that apply.", "Depende de tu vehículo y operación interestatal. Te ayudamos a determinar los requisitos aplicables."),
      faq("Do permits expire?", "¿Los permisos vencen?", "Many permits and registrations renew on a schedule. We explain the deadlines that apply to your operation.", "Muchos permisos y registros se renuevan periódicamente. Te explicamos las fechas aplicables a tu operación."),
    ],
  },
  {
    slug: "truck-insurance",
    title: { en: "Truck Insurance", es: "Seguro de Camiones" },
    shortTitle: { en: "Protect the load and the road ahead.", es: "Protege la carga y el camino." },
    description: {
      en: "Commercial trucking coverage coordinated around your equipment, cargo and operating authority.",
      es: "Cobertura comercial coordinada alrededor de tu equipo, carga y autoridad operativa.",
    },
    urgency: {
      en: "The wrong coverage can leave your authority, equipment and next load exposed.",
      es: "La cobertura incorrecta puede dejar expuestos tu autoridad, equipo y próxima carga.",
    },
    image: "/images/svc-insurance.jpg",
    painImage: "/images/pain-storm-road.webp",
    cardImage: "/images/svc-card-insurance.png",
    includes: [
      { en: "Primary liability", es: "Responsabilidad primaria" },
      { en: "Cargo coverage", es: "Cobertura de carga" },
      { en: "Bobtail coverage", es: "Cobertura bobtail" },
      { en: "Physical damage", es: "Daño físico" },
      { en: "UIIA & port drayage insurance compliance", es: "Cumplimiento de seguro UIIA y drayage portuario" },
    ],
    process: [
      { en: "Understand your operation and cargo", es: "Entendemos tu operación y carga" },
      { en: "Review coverage needs", es: "Revisamos necesidades de cobertura" },
      { en: "Coordinate the quote process", es: "Coordinamos el proceso de cotización" },
    ],
    faqs: [
      faq("What coverage do I need?", "¿Qué cobertura necesito?", "Coverage depends on your contracts, cargo, equipment and authority. A specialist reviews the full picture.", "La cobertura depende de tus contratos, carga, equipo y autoridad. Un especialista revisa el panorama completo."),
      faq("Can insurance and permits be coordinated?", "¿Se pueden coordinar seguro y permisos?", "Yes. That coordination is a core benefit of working with one trucking-focused team.", "Sí. Esa coordinación es un beneficio clave de trabajar con un solo equipo especializado."),
      faq("Do you handle UIIA insurance requirements for port drayage?", "¿Manejan los requisitos de seguro UIIA para drayage portuario?", "Yes. Intermodal carriers operating under the UIIA need specific coverages, including trailer interchange and non-owned trailer liability, filed with IANA. Our New Jersey offices near the Port of NY/NJ coordinate these requirements regularly.", "Sí. Los transportistas intermodales que operan bajo el acuerdo UIIA necesitan coberturas específicas, incluyendo intercambio de remolques (trailer interchange) y responsabilidad por remolques no propios, registradas ante IANA. Nuestras oficinas de Nueva Jersey, cerca del Puerto de NY/NJ, coordinan estos requisitos con frecuencia."),
    ],
  },
  {
    slug: "dot-compliance",
    title: { en: "DOT Compliance & Audits", es: "Cumplimiento DOT y Auditorías" },
    shortTitle: { en: "Stay ready before DOT asks.", es: "Prepárate antes de que DOT pregunte." },
    description: {
      en: "Practical support for driver files, testing programs, renewals and DOT audit preparation.",
      es: "Apoyo práctico para expedientes de conductores, programas de pruebas, renovaciones y auditorías DOT.",
    },
    urgency: {
      en: "Compliance gaps can ground trucks, interrupt loads and threaten operating authority.",
      es: "Las brechas de cumplimiento pueden detener camiones, interrumpir cargas y amenazar la autoridad.",
    },
    image: "/images/svc-compliance.jpg",
    painImage: "/images/pain-compliance-alert.webp",
    cardImage: "/images/svc-card-compliance.png",
    includes: [
      { en: "Driver qualification files", es: "Expedientes de calificación de conductores" },
      { en: "Pre-employment and random drug & alcohol testing programs", es: "Programas de pruebas de drogas y alcohol pre-empleo y aleatorias" },
      { en: "FMCSA Drug & Alcohol Clearinghouse registration and queries", es: "Registro y consultas en el Clearinghouse de Drogas y Alcohol de la FMCSA" },
      { en: "MCS-150 biennial update filing", es: "Actualización bienal del MCS-150" },
      { en: "MVR and document review", es: "Revisión de MVR y documentos" },
      { en: "DOT audit preparation", es: "Preparación para auditoría DOT" },
    ],
    process: [
      { en: "Identify compliance gaps", es: "Identificamos brechas de cumplimiento" },
      { en: "Organize required records", es: "Organizamos registros requeridos" },
      { en: "Build a maintenance routine", es: "Creamos una rutina de mantenimiento" },
    ],
    faqs: [
      faq("What is a DQF?", "¿Qué es un DQF?", "A Driver Qualification File contains required records used to document a driver's qualifications.", "Un expediente de calificación contiene registros requeridos para documentar las calificaciones del conductor."),
      faq("Can you help before an audit?", "¿Pueden ayudar antes de una auditoría?", "Yes. Preparation is most effective before deadlines or audit requests become urgent.", "Sí. La preparación es más efectiva antes de que las fechas o solicitudes se vuelvan urgentes."),
      faq("What is the Drug & Alcohol Clearinghouse?", "¿Qué es el Clearinghouse de Drogas y Alcohol?", "It is FMCSA's online database of CDL driver drug and alcohol violations. Carriers must register, run a pre-employment query on every new driver and an annual query on current drivers. A driver in prohibited status cannot operate until completing the return-to-duty process.", "Es la base de datos en línea de la FMCSA con las violaciones de drogas y alcohol de conductores CDL. Los transportistas deben registrarse, hacer una consulta pre-empleo a cada conductor nuevo y una consulta anual a los actuales. Un conductor en estado prohibido no puede operar hasta completar el proceso de regreso al servicio."),
      faq("What is the difference between pre-employment and random testing?", "¿Cuál es la diferencia entre pruebas pre-empleo y aleatorias?", "A pre-employment test is required before a CDL driver operates for you for the first time. Random testing enrolls your drivers in an ongoing pool with unannounced selections throughout the year. DOT requires both.", "La prueba pre-empleo se exige antes de que un conductor CDL opere por primera vez para tu empresa. Las pruebas aleatorias inscriben a tus conductores en un pool con selecciones sin previo aviso durante el año. El DOT exige ambas."),
      faq("When do I file the MCS-150 biennial update?", "¿Cuándo se presenta la actualización bienal del MCS-150?", "Every carrier must update its MCS-150 at least once every two years, even if nothing changed, on a schedule tied to the USDOT number. Missing the deadline can deactivate your USDOT number.", "Todo transportista debe actualizar su MCS-150 al menos una vez cada dos años, incluso sin cambios, según un calendario ligado al número USDOT. No cumplir la fecha puede desactivar tu número USDOT."),
    ],
  },
  {
    slug: "corporations-llc",
    title: { en: "Corporations & LLCs", es: "Corporaciones y LLC" },
    shortTitle: { en: "Build the business behind the truck.", es: "Construye el negocio detrás del camión." },
    description: {
      en: "Business formation and EIN guidance designed to support the next steps of a trucking operation.",
      es: "Formación empresarial y acompañamiento con EIN diseñados para apoyar los próximos pasos de una operación.",
    },
    urgency: {
      en: "A clean business structure makes authority, insurance and banking easier to coordinate.",
      es: "Una estructura empresarial clara facilita coordinar autoridad, seguro y banca.",
    },
    image: "/images/svc-corp.jpg",
    painImage: "/images/pain-paperwork-cab.jpg",
    cardImage: "/images/svc-card-corp.png",
    includes: [
      { en: "Corporation or LLC formation", es: "Formación de corporación o LLC" },
      { en: "EIN / Tax ID guidance", es: "Acompañamiento con EIN / Tax ID" },
      { en: "Startup document checklist", es: "Checklist de documentos iniciales" },
      { en: "Coordination with authority setup", es: "Coordinación con apertura de autoridad" },
    ],
    process: [
      { en: "Choose the operation path", es: "Elegimos el camino de operación" },
      { en: "Prepare formation details", es: "Preparamos detalles de formación" },
      { en: "Connect the next registrations", es: "Conectamos los siguientes registros" },
    ],
    faqs: [
      faq("Should I form an LLC or corporation?", "¿Debo formar una LLC o corporación?", "The right structure depends on your situation. We help organize the formation process, but legal or tax advice should come from qualified advisors.", "La estructura correcta depende de tu situación. Ayudamos a organizar el proceso, pero el consejo legal o fiscal debe venir de profesionales calificados."),
      faq("What comes after formation?", "¿Qué sigue después de formar la empresa?", "Most new carriers then coordinate authority, insurance, plates and compliance requirements.", "La mayoría de nuevos transportistas después coordina autoridad, seguro, placas y cumplimiento."),
    ],
  },
];

export const packages: PackageContent[] = [
  {
    slug: "new-owner-operator",
    title: { en: "New Owner-Operator", es: "Nuevo Dueño-Operador" },
    description: { en: "A guided path from business formation to your first compliant load.", es: "Un camino guiado desde la formación del negocio hasta tu primera carga en cumplimiento." },
    bestFor: { en: "Starting a trucking business", es: "Empezar un negocio de transporte" },
    includes: services.slice(0, 4).map((service) => service.title),
  },
  {
    slug: "small-fleet",
    title: { en: "Small Fleet", es: "Flota Pequeña" },
    description: { en: "Coordinated registrations, insurance and ongoing compliance for growing teams.", es: "Registros, seguros y cumplimiento coordinados para equipos en crecimiento." },
    bestFor: { en: "Operations adding trucks or drivers", es: "Operaciones que agregan camiones o conductores" },
    includes: [services[1].title, services[2].title, services[3].title, services[4].title],
  },
  {
    slug: "hotshot-non-cdl",
    title: { en: "Hotshot / Non-CDL", es: "Hotshot / Sin CDL" },
    description: { en: "A requirement-focused setup for lighter and specialized operations.", es: "Una configuración enfocada en requisitos para operaciones ligeras y especializadas." },
    bestFor: { en: "Hotshot and specialized carriers", es: "Transportistas hotshot y especializados" },
    includes: [services[0].title, services[2].title, services[3].title],
  },
  {
    slug: "freight-broker",
    title: { en: "Freight Broker", es: "Freight Broker (Corredor de Carga)" },
    description: { en: "Formation and authority coordination for a brokerage operation.", es: "Formación y coordinación de autoridad para una operación de corretaje de carga." },
    bestFor: { en: "Starting a freight brokerage", es: "Empezar un negocio de corretaje de carga" },
    includes: [services[5].title, services[0].title],
  },
];

export const locations: LocationContent[] = [
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
    hours: { en: "Mon–Fri 9–5 · Sat 9–1", es: "Lun–Vie 9–5 · Sáb 9–1" },
    description: { en: "Serving South Florida's trucking community with bilingual support.", es: "Atendiendo a la comunidad camionera del sur de Florida con apoyo bilingüe." },
    lat: 25.854881,
    lng: -80.342371,
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
    hours: { en: "Mon–Fri 9–6 · Sat 10–2", es: "Lun–Vie 9–6 · Sáb 10–2" },
    description: { en: "Local support near the Port of New York and New Jersey, with UIIA and container drayage insurance experience.", es: "Apoyo local cerca del Puerto de Nueva York y Nueva Jersey, con experiencia en seguros UIIA y drayage de contenedores." },
    lat: 40.72591,
    lng: -74.07661,
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
    hours: { en: "Mon–Fri 9–6 · Sat 10–2", es: "Lun–Vie 9–6 · Sáb 10–2" },
    description: { en: "Bilingual trucking support for the Newark and Elizabeth port area, including UIIA compliance for drayage carriers.", es: "Apoyo camionero bilingüe para el área portuaria de Newark y Elizabeth, incluyendo cumplimiento UIIA para transportistas de drayage." },
    lat: 40.67912,
    lng: -74.19504,
  },
];

export const resources: ResourceFrontmatter[] = [
  {
    slug: "startup-checklist",
    title: { en: "The owner-operator startup checklist", es: "Checklist para empezar como dueño-operador" },
    description: { en: "A plain-language map of the decisions and filings behind a new trucking operation.", es: "Un mapa claro de las decisiones y trámites detrás de una nueva operación de transporte." },
    eyebrow: { en: "Start strong", es: "Empieza bien" },
    readingTime: { en: "6 min read", es: "6 min de lectura" },
    sections: [
      { title: { en: "Build the business", es: "Construye el negocio" }, body: { en: "Start with the legal structure and tax identification that will support banking, insurance and federal filings.", es: "Empieza con la estructura legal e identificación fiscal que sostendrán banca, seguro y trámites federales." } },
      { title: { en: "Activate the operation", es: "Activa la operación" }, body: { en: "Coordinate authority, insurance, registrations and permits based on where and how you plan to operate.", es: "Coordina autoridad, seguro, registros y permisos según dónde y cómo planeas operar." } },
      { title: { en: "Stay ready", es: "Mantente preparado" }, body: { en: "Create a routine for renewals, driver records, fuel tax and compliance before deadlines become emergencies.", es: "Crea una rutina para renovaciones, expedientes, impuestos de combustible y cumplimiento antes de que las fechas sean emergencias." } },
    ],
  },
  {
    slug: "irp-vs-ifta",
    title: { en: "IRP vs IFTA: what each one does", es: "IRP vs IFTA: qué hace cada uno" },
    description: { en: "Two interstate requirements, explained without the alphabet soup.", es: "Dos requisitos interestatales explicados sin sopa de letras." },
    eyebrow: { en: "Permits explained", es: "Permisos claros" },
    readingTime: { en: "5 min read", es: "5 min de lectura" },
    sections: [
      { title: { en: "IRP follows registration", es: "IRP sigue el registro" }, body: { en: "IRP helps distribute commercial vehicle registration fees among participating jurisdictions.", es: "IRP ayuda a distribuir las tarifas de registro comercial entre jurisdicciones participantes." } },
      { title: { en: "IFTA follows fuel use", es: "IFTA sigue el uso de combustible" }, body: { en: "IFTA simplifies reporting fuel taxes for qualified vehicles operating across jurisdictions.", es: "IFTA simplifica el reporte de impuestos de combustible para vehículos calificados que operan entre jurisdicciones." } },
      { title: { en: "Your operation decides", es: "Tu operación decide" }, body: { en: "Vehicle weight, configuration and operating territory determine which registrations apply.", es: "El peso, configuración y territorio operativo determinan qué registros aplican." } },
    ],
  },
  {
    slug: "dot-audit-preparation",
    title: { en: "Prepare before a DOT audit becomes urgent", es: "Prepárate antes de que una auditoría DOT sea urgente" },
    description: { en: "A practical starting point for organizing driver and compliance records.", es: "Un punto de partida práctico para organizar expedientes y registros de cumplimiento." },
    eyebrow: { en: "Protect continuity", es: "Protege la continuidad" },
    readingTime: { en: "7 min read", es: "7 min de lectura" },
    sections: [
      { title: { en: "Know what you have", es: "Conoce lo que tienes" }, body: { en: "Inventory driver files, testing records, registrations and recurring deadlines.", es: "Inventaría expedientes, registros de pruebas, registros vehiculares y fechas recurrentes." } },
      { title: { en: "Close gaps early", es: "Cierra brechas temprano" }, body: { en: "Missing records are easier to address before an audit request or renewal deadline.", es: "Los registros faltantes son más fáciles de resolver antes de una auditoría o renovación." } },
      { title: { en: "Maintain a routine", es: "Mantén una rutina" }, body: { en: "Compliance is a recurring operating process, not a one-time filing.", es: "El cumplimiento es un proceso operativo recurrente, no un trámite único." } },
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
export const getLocation = (slug: string) => locations.find((location) => location.slug === slug);
export const getResource = (slug: string) => resources.find((resource) => resource.slug === slug);
