export interface PainItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
}

export interface MetricItem {
  id: string;
  target: number;
  displayFormat: 'ratio10' | 'percent' | 'multiplier';
  label: string;
  barRatio: number;
  context: string;
}

export interface PillarItem {
  id: 'web' | 'seo' | 'confianza';
  index: string;
  title: string;
  description: string;
  highlights: string[];
  nodePosition: { x: number; y: number };
  shortLabel: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface CaseScenario {
  id: string;
  sector: string;
  tag: string;
  image: string;
  imageAlt: string;
  contexto: string;
  enfoque: string;
  resultados: string[];
  cita: string;
  autor: string;
}

export type PlanCategoryId = 'social' | 'web';

export interface PlanCardItem {
  id: string;
  name: string;
  subtitle?: string;
  availability: string;
  popular?: boolean;
  features: string[];
  footnote?: string;
  ctaLabel: string;
  needId: NeedOptionId;
}

export interface PlanCategoryGroup {
  id: PlanCategoryId;
  label: string;
  contextLine: string;
  plans: PlanCardItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ModalDocument {
  id: string;
  title: string;
  category: string;
  sections: { heading: string; body: string }[];
}

export type NeedOptionId = 'web' | 'social' | 'both';

export interface NeedOption {
  id: NeedOptionId;
  title: string;
  description: string;
}

export interface WebProject {
  id: string;
  category: string;
  title: string;
  clientType: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  highlights: string[];
}

export interface WebCopyPillar {
  index: string;
  title: string;
  body: string;
}

export interface SocialCopyPillar {
  index: string;
  title: string;
  subtitle: string;
  body: string;
}

export interface SocialChannelSpec {
  id: 'instagram' | 'linkedin' | 'local';
  label: string;
  focus: string;
  copyApproach: string;
  formats: string[];
  metrics: string[];
}

export const PAIN_CARDS: PainItem[] = [
  {
    id: 'busquedas-sin-respuesta',
    index: '01',
    title: 'Búsquedas sin respuesta',
    subtitle: 'No aparecer cuando buscan tu servicio en Google',
    description:
      'El cliente busca una solución rápida en Google. Si no sales en los primeros resultados de tu zona, para esa persona no existes. Tu competencia con presencia digital ordenada se queda con las llamadas y visitas que tú no estás recogiendo.',
    metricLabel: 'Búsquedas sin captura',
  },
  {
    id: 'dudas-al-decidir',
    index: '02',
    title: 'Dudas al decidir',
    subtitle: 'Falta de confianza en los primeros segundos',
    description:
      'Una web vieja, lenta o difícil para pedir información no pasa desapercibida: frena la compra al instante y el cliente se va. El 75% juzga si un negocio es fiable por cómo se ve y funciona su web.',
    metricLabel: 'Fricción en decisión',
  },
  {
    id: 'fuga-entre-canales',
    index: '03',
    title: 'Fuga de clientes entre canales',
    subtitle: 'Redes, Google y web sin conexión entre sí',
    description:
      'Publicar en redes por un lado, tener una web olvidada por otro y la ficha de Google a medias hace que se pierdan contactos por el camino. Cuando todo va conectado, cada visita tiene más opciones de convertirse en cliente.',
    metricLabel: 'Fuga entre canales',
  },
];

export const KEY_METRICS: MetricItem[] = [
  {
    id: 'busqueda-local',
    target: 8,
    displayFormat: 'ratio10',
    label: 'personas buscan un negocio local en internet antes de visitarlo o comprar.',
    barRatio: 0.8,
    context: 'Búsqueda antes de ir o comprar',
  },
  {
    id: 'credibilidad-web',
    target: 75,
    displayFormat: 'percent',
    label: 'de las personas juzgan si un negocio es fiable por el diseño y la rapidez de su web.',
    barRatio: 0.75,
    context: 'Confianza a primera vista',
  },
  {
    id: 'visitas-seo',
    target: 3,
    displayFormat: 'multiplier',
    label: 'reciben los negocios bien trabajados para búsquedas locales frente a los que no lo están.',
    barRatio: 0.92,
    context: 'Más visitas en tu zona',
  },
  {
    id: 'abandono-carga',
    target: 53,
    displayFormat: 'percent',
    label: 'de las personas abandonan una web que tarda más de 3 segundos en cargar.',
    barRatio: 0.53,
    context: 'Clientes que se van por lentitud',
  },
];

export const ECOSYSTEM_PILLARS: PillarItem[] = [
  {
    id: 'web',
    index: '01',
    title: 'Web profesional',
    shortLabel: 'Web <2s',
    description:
      'Diseño claro que da confianza, carga en menos de 2 segundos y se ve bien en el móvil. Tu negocio abierto y explicando qué haces las 24 horas, incluso cuando tienes la tienda física cerrada.',
    highlights: [
      'Carga < 2 segundos',
      'Se adapta bien al móvil',
      'Pensada para que te contacten fácil',
    ],
    nodePosition: { x: 110, y: 86 },
  },
  {
    id: 'seo',
    index: '02',
    title: 'SEO local',
    shortLabel: 'SEO Local',
    description:
      'Que te encuentren cuando alguien busca tu servicio en Google y en Google Maps en tu zona. Trabajamos tu ficha de Google y los contenidos de tu web para que aparezcas antes que tu competencia.',
    highlights: [
      'Ficha de Google Business optimizada',
      'Búsquedas en Google Maps de tu zona',
      'Contenidos locales orientados a cliente',
    ],
    nodePosition: { x: 370, y: 86 },
  },
  {
    id: 'confianza',
    index: '03',
    title: 'Confianza digital',
    shortLabel: 'Confianza',
    description:
      'Reseñas visibles, casos reales, web segura y una imagen cuidada en todo momento. Que el cliente sienta seguridad antes de llamar, pedir cita o entrar a tu local.',
    highlights: [
      'Reseñas visibles y verificables',
      'Web segura con certificado SSL',
      'Imagen coherente en cada canal',
    ],
    nodePosition: { x: 240, y: 314 },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Revisión inicial',
    description:
      'Revisamos cómo se ve y funciona hoy tu negocio en internet, dónde se pierden clientes y qué mejoras tienen mayor impacto.',
    deliverable: 'Informe en ≤ 48h',
  },
  {
    number: '02',
    title: 'Diseño del sistema',
    description:
      'Definimos la web, la visibilidad local y los elementos de confianza para que todo comunique lo mismo y lleve al contacto.',
    deliverable: 'Todo conectado y coherente',
  },
  {
    number: '03',
    title: 'Creación y puesta a punto',
    description:
      'Construimos la web, optimizamos su velocidad, preparamos la presencia local y redactamos textos claros para el cliente.',
    deliverable: 'Rapidez y visibilidad local',
  },
  {
    number: '04',
    title: 'Publicación y medición',
    description:
      'Publicamos la web y configuramos la medición para ver qué visitas se convierten en llamadas, formularios o pedidos.',
    deliverable: 'Saber qué funciona de verdad',
  },
  {
    number: '05',
    title: 'Mejora continua',
    description:
      'Revisamos los datos reales de tu negocio y hacemos mejoras continuas para seguir sumando clientes con el tiempo.',
    deliverable: 'Optimización continua',
  },
];

export const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'clinica-santa-marta',
    sector: 'Clínica Santa Marta · Clínica de Medicina General',
    tag: 'Salud / Medicina',
    image: '/src/assets/images/caso_clinica_dental_1795290066117.jpg',
    imageAlt: 'Recepción luminosa y moderna de Clínica Santa Marta con acabados cálidos',
    contexto:
      'Con más de 20 años de trayectoria al servicio de la salud, la clínica necesitaba dar el salto digital para mostrar su trabajo, reforzar la confianza de su marca y convertir búsquedas en nuevos pacientes.',
    enfoque:
      'Rediseño de identidad visual adaptado al sector sanitario, mejora de visibilidad en Google Maps, optimización de ficha de Google Business, gestión activa de reseñas y calendario constante de publicaciones en redes sociales.',
    resultados: [
      '+340% de visitas desde buscadores',
      '12 reservas online a la semana',
      'Top 3 en búsquedas locales',
    ],
    cita: 'Estamos muy conformes con Pau y el equipo, nos modernizaron la clínica por completo.',
    autor: 'Mercedes, Directora de Clínica Santa Marta',
  },
  {
    id: 'sergio-nogueron',
    sector: 'Sergio Noguerón · Escritor, Filósofo y Maestro Espiritual',
    tag: 'Marca Personal / Desarrollo Espiritual',
    image: '/src/assets/images/cliente_sergio_nogueron_1795307209954.jpg',
    imageAlt: 'Estudio de Sergio Noguerón con libros, notas manuscritas y lámpara cálida',
    contexto:
      'Sergio contaba con una sólida trayectoria, libros publicados y una comunidad fiel, pero su presencia online estaba dispersa y dependía casi por completo del boca a boca para llenar sus sesiones, talleres y charlas.',
    enfoque:
      'Diseño de web personal con identidad propia, presentación clara de sus obras y acompañamientos, sistema directo de solicitud de sesiones, contenidos optimizados para buscadores y elementos de autoridad y confianza.',
    resultados: [
      '+22 solicitudes de sesión al mes',
      'Posicionamiento orgánico por nombre y temáticas clave',
      '−40% de dependencia exclusiva del boca a boca',
    ],
    cita: 'Por fin tengo un espacio digital que transmite mi esencia y trabaja por mí cada día.',
    autor: 'Sergio Noguerón',
  },
  {
    id: 'otto-discoteca',
    sector: 'Otto · Discoteca & Pub',
    tag: 'Ocio Nocturno / Hostelería',
    image: '/src/assets/images/cliente_otto_discoteca_1795307209884.jpg',
    imageAlt: 'Interior contemporáneo de Otto Discoteca y Pub con barra de piedra e iluminación violeta',
    contexto:
      'El local tenía buen ambiente y público habitual los fines de semana, pero su imagen en redes estaba desactualizada, no aparecía bien posicionado cuando la gente buscaba dónde salir por la zona y perdía reservas de mesas y eventos privados frente a otros locales con mejor presencia digital.',
    enfoque:
      'Renovación de identidad visual y estética nocturna para redes sociales, optimización de ficha en Google Maps y reseñas, sistema ágil de reserva de mesas y listas VIP desde el móvil, y calendario de contenido enfocado en eventos y ambiente real.',
    resultados: [
      '+210% de visualizaciones en Google Maps y búsquedas locales',
      'Aumento constante de reservas de mesas y listas VIP cada fin de semana',
      'Imagen de marca coherente y atractiva en todos los canales',
    ],
    cita: 'El equipo de Connect resuelve muy rápido, bien y prolijo. Estoy muy satisfecho con su trabajo.',
    autor: 'Ramiro, Socio Gerente de Otto',
  },
];

export const PLAN_CATEGORIES: PlanCategoryGroup[] = [
  {
    id: 'social',
    label: 'Social Media',
    contextLine: 'Social Media & Branding · Modalidad a consultar',
    plans: [
      {
        id: 'connect-growth',
        name: 'CONNECT GROWTH',
        availability: 'A consultar según alcance del proyecto',
        features: [
          'Planeación de contenido + diseño. Diseño de Social Media (perfil y banners)',
          '3 post semanales',
          '4 stories dinámicas semanales',
          '4 Destacadas organizadas con identidad visual corporativa',
          'Redacción de copys orientados a conversión',
          'Soporte continuo',
        ],
        ctaLabel: 'CONSULTAR PLAN',
        needId: 'social',
      },
      {
        id: 'connect-scale',
        name: 'CONNECT SCALE',
        availability: 'A consultar según alcance del proyecto',
        popular: true,
        features: [
          'Planeación de contenido estratégico + diseño de alto impacto',
          'Reportes mensuales',
          'Diseño de portada y perfil unificado',
          '5 post semanales',
          '6 stories dinámicas semanales',
          '6 Destacadas organizadas con identidad visual corporativa',
          'Redacción de copys persuasivos',
          'Soporte prioritario',
        ],
        ctaLabel: 'CONSULTAR PLAN',
        needId: 'social',
      },
    ],
  },
  {
    id: 'web',
    label: 'Diseño Web',
    contextLine: 'Infraestructura Digital · Esquema a consultar',
    plans: [
      {
        id: 'connect-web-corporate',
        name: 'CONNECT WEB CORPORATE',
        subtitle: 'Para presencia profesional y captación',
        availability: 'Propuesta y modalidad de pago a consultar',
        features: [
          'Arquitectura de información y diseño UX/UI moderno',
          'Desarrollo web profesional en WordPress, optimizado y responsive (4–6 páginas)',
          'Configuración básica orientada a conversión (SEO on-page técnico y pasarelas de contacto directo)',
          'Soporte continuo',
        ],
        footnote: 'Alcance y condiciones sujetas a consulta previa',
        ctaLabel: 'CONSULTAR PLAN',
        needId: 'web',
      },
      {
        id: 'connect-web-scale-ecommerce',
        name: 'CONNECT WEB SCALE E-COMMERCE',
        subtitle: 'Máquina de ventas',
        availability: 'Propuesta y modalidad de pago a consultar',
        popular: true,
        features: [
          'Arquitectura avanzada orientada a conversión y experiencia de usuario',
          'Desarrollo web integral en WordPress',
          'Optimización extrema de velocidad de carga y rendimiento técnico',
          'Configuración SEO on-page estratégico, integración de píxeles de seguimiento, contacto directo y automatización básica de formularios/pedidos',
          'Soporte prioritario',
        ],
        footnote: 'Alcance y condiciones sujetas a consulta previa',
        ctaLabel: 'CONSULTAR PLAN',
        needId: 'web',
      },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'seo-local-trabajo',
    question: '¿Cómo trabajáis el SEO para posicionar una web o un negocio local?',
    answer:
      'Trabajamos el posicionamiento SEO combinando optimización técnica, arquitectura web, investigación de palabras clave y SEO local (como Google Business Profile y búsquedas geolocalizadas). El objetivo es que tu página aparezca cuando clientes potenciales busquen tus servicios en Google y en mapas, captando tráfico orgánico cualificado sin depender únicamente de anuncios de pago.',
  },
  {
    id: 'tiempos-seo',
    question: '¿Cuánto tardan en notarse los resultados del SEO y del marketing digital?',
    answer:
      'El SEO es una estrategia a medio plazo: los primeros avances técnicos y de visibilidad suelen notarse entre los 3 y 6 meses, con una evolución más sólida a partir del sexto mes según tu sector, autoridad del dominio y competencia. En cambio, las mejoras de conversión en la web, la captación directa o las campañas activas pueden generar movimiento mucho antes, dependiendo del punto de partida de tu proyecto.',
  },
  {
    id: 'dominio-hosting',
    question: '¿Qué pasa si ya tengo dominio y hosting, o si todavía no tengo ninguno?',
    answer:
      'Si ya cuentas con dominio y hosting, auditamos su estado, velocidad y seguridad para trabajar sobre ellos o migrarlos sin interrupciones; si aún no tienes nada, te orientamos para registrar el dominio adecuado y elegir un alojamiento web fiable y rápido. En todos los casos, el dominio y los accesos principales de tu proyecto permanecen bajo el control de tu negocio.',
  },
  {
    id: 'rediseno-marca',
    question: '¿Puedo rediseñar mi marca sin perder mi identidad ni el posicionamiento actual?',
    answer:
      'Sí, un rediseño de marca bien planteado moderniza la identidad visual, mejora la coherencia en web y redes sociales y refuerza la percepción de valor sin borrar lo que ya funciona. Cuando también se renueva la web, cuidamos la estructura de contenidos, los metadatos y las redirecciones para proteger el posicionamiento SEO que ya hayas conseguido.',
  },
  {
    id: 'web-no-convierte',
    question: '¿Qué ocurre si ya tengo una página web pero no atrae clientes ni convierte?',
    answer:
      'Analizamos qué está frenando los resultados: problemas de velocidad de carga, estructura confusa, falta de enfoque SEO, diseño anticuado o llamados a la acción poco claros. A partir de ese diagnóstico, podemos optimizar la web actual o plantear un rediseño estratégico orientado a que las visitas se conviertan en consultas, reservas o ventas reales.',
  },
  {
    id: 'etapas-o-juntos',
    question:
      '¿Necesito contratar diseño web, SEO y social media juntos o puedo empezar por etapas?',
    answer:
      'Puedes empezar por la prioridad más urgente de tu negocio y escalar después, aunque conectar diseño web, SEO y contenido en redes sociales suele dar mejores resultados a largo plazo. De este modo, tu identidad visual, tu buscador y tus canales sociales cuentan el mismo mensaje y empujan hacia el mismo objetivo comercial.',
  },
  {
    id: 'mantenimiento-soporte',
    question: '¿Ofrecéis mantenimiento, actualizaciones y soporte después del lanzamiento?',
    answer:
      'Sí, contamos con opciones de soporte y seguimiento para mantener tu web actualizada, segura y con buen rendimiento técnico, además de acompañar la evolución de tus contenidos o campañas. Así evitas caídas, plugins desactualizados o páginas que se quedan estáticas tras el lanzamiento.',
  },
  {
    id: 'elegir-plan',
    question: '¿Cómo sé qué plan o enfoque encaja mejor con mi negocio?',
    answer:
      'La mejor forma de definirlo es revisar tu punto de partida, tus objetivos comerciales y el alcance que necesitas en web, marca, SEO o redes sociales. Con esa información te proponemos una hoja de ruta clara y a medida, adaptada al momento real de tu empresa antes de empezar a ejecutar.',
  },
];

export const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'web',
    title: 'Web profesional + SEO local',
    description: 'Tener web rápida, visible en Google y orientada a captar clientes.',
  },
  {
    id: 'social',
    title: 'Redes sociales y contenido',
    description: 'Presencia activa, contenido constante y comunidad.',
  },
  {
    id: 'both',
    title: 'Ambos (Web + Redes)',
    description: 'Ecosistema completo conectado.',
  },
];

export const WEB_COPY_PILLARS: WebCopyPillar[] = [
  {
    index: '01',
    title: 'Textos que resuelven dudas y frenan objeciones',
    body: 'La mayoría de webs hablan de sí mismas y obligan al visitante a adivinar si encajan con lo que buscan. Ordenamos cada pantalla para responder en segundos qué haces, para quién es, qué pruebas respaldan tu trabajo y qué paso dar a continuación.',
  },
  {
    index: '02',
    title: 'Velocidad real en el móvil (< 2 segundos)',
    body: 'En el móvil, cada segundo de espera hace que la gente cierre la pestaña y pruebe con el siguiente resultado. Desarrollamos webs ligeras, sin plantillas pesadas ni código de más, para que abran rápido desde Google, Google Maps o redes sociales.',
  },
  {
    index: '03',
    title: 'Estructura pensada para Google y para convertir visitas en contactos',
    body: 'No diseñamos primero y pensamos en Google después. Preparamos la estructura, las páginas, las direcciones web y los formularios desde el inicio para que te encuentren cuando buscan lo que ofreces y puedan pedir información o presupuesto sin trabas.',
  },
];

export const WEB_PROJECTS: WebProject[] = [
  {
    id: 'docpath',
    category: 'SaaS (CML y CCR) · Presencia internacional',
    title: 'DocPath',
    clientType: 'Software documental en más de 20 países',
    image: '/src/assets/images/proyecto_web_docpath_1795308152720.jpg',
    imageAlt: 'Estación de trabajo mostrando la nueva arquitectura web corporativa para la Suite de productos de DocPath',
    challenge:
      'Venían de una web con estética de los años 2000 para una solución utilizada en más de 20 países por bancos, grandes superficies y empresas de logística. Una imagen desfasada choca con el nivel de exigencia de grandes cuentas; necesitaban una web a la altura de la Suite de productos de DocPath.',
    solution:
      'Nueva arquitectura web alineada con su Suite (gestión documental, CML y CCR), con mensaje claro para decisores corporativos, mejor lectura en cualquier pantalla y recorridos directos hacia contacto comercial.',
    highlights: [
      'Imagen alineada con su Suite de productos',
      'Enfoque claro para grandes cuentas y sectores regulados',
      'Experiencia ágil en escritorio y móvil',
      'Rutas directas a contacto y demostración',
    ],
  },
  {
    id: 'appventuro',
    category: 'SaaS · Plataforma de servicio',
    title: 'Appventuro',
    clientType: 'Plataforma de servicio digital',
    image: '/src/assets/images/proyecto_web_appventuro_1795308152656.jpg',
    imageAlt: 'Portátil mostrando la landing page enfocada en conversión y flujo de uso de Appventuro',
    challenge:
      'Plataforma de servicio SaaS que necesitaba presentar su propuesta de forma sencilla, creíble y directa para que nuevos usuarios entendieran el valor del producto sin perderse en explicaciones confusas.',
    solution:
      'Estructura enfocada en el problema del usuario, cómo funciona la plataforma en pasos claros, pruebas de utilidad y llamadas a la acción visibles para solicitar acceso o contacto.',
    highlights: [
      'Propuesta de valor clara desde la primera pantalla',
      'Explicación sencilla del funcionamiento de la plataforma',
      'Carga rápida y navegación limpia en móvil',
      'Llamadas a la acción visibles para pedir información',
    ],
  },
  {
    id: 'dr-jose-lopez-roca',
    category: 'Salud · Profesional independiente',
    title: 'Dr. José López Roca',
    clientType: 'Clínica médica independiente',
    image: '/src/assets/images/web_proyecto_corporativo_1795291654592.jpg',
    imageAlt: 'Portátil mostrando plataforma web médica clara con solicitud de cita rápida para clínica',
    challenge:
      'El doctor lanzó su clínica junto con toda su identidad corporativa, logrando ya posicionarse en el 3.º puesto en las búsquedas de Google. El reto era respaldar esa visibilidad con una web a la altura para convertir búsquedas en pacientes.',
    solution:
      'Web médica clara y cercana, coherente con su nueva identidad corporativa, diseñada para reforzar la confianza del paciente y facilitar la solicitud de cita desde el móvil.',
    highlights: [
      'Coherencia total con la nueva identidad de la clínica',
      'Respaldo a su 3.ª posición en Google con información clara',
      'Experiencia rápida y sencilla desde el móvil',
      'Vías directas para pedir cita o resolver dudas',
    ],
  },
];

export const SOCIAL_COPY_PILLARS: SocialCopyPillar[] = [
  {
    index: '01',
    title: 'Posicionamiento y voz de marca antes de publicar',
    subtitle: 'Dejar de improvisar cada lunes',
    body: 'Publicar por rellenar calendario no construye marca ni trae clientes. Definimos tus pilares editoriales, el tono exacto con el que habla tu negocio y los problemas reales que tus clientes preguntan cada semana en tu mostrador o por teléfono.',
  },
  {
    index: '02',
    title: 'Guiones y copywriting que retienen los primeros 3 segundos',
    subtitle: 'Gancho claro, desarrollo útil y llamada a la acción',
    body: 'Cada Reel, carrusel o publicación de LinkedIn sigue una estructura probada: abrir con una situación cotidiana reconocible, aportar criterio práctico que demuestre tu oficio y cerrar con un paso natural hacia tu web, reserva o mensaje directo.',
  },
  {
    index: '03',
    title: 'Producción visual ágil sin postureo artificial',
    subtitle: 'Contenido real grabado para tu negocio físico',
    body: 'El usuario local desconfía de las fotos genéricas de banco de imágenes. Planificamos sesiones eficientes o guías de grabación sencillas para mostrar a tu equipo, tus instalaciones, el proceso real y los resultados de tu trabajo.',
  },
  {
    index: '04',
    title: 'Redes conectadas con tu web y Google Business',
    subtitle: 'Convertir atención en negocio medible',
    body: 'Los «me gusta» no pagan facturas. Medimos clics al enlace, conversaciones iniciadas por DM/WhatsApp, guardados y visitas derivadas a tu web para que las redes trabajen dentro de un ecosistema único junto a tu SEO local.',
  },
];

export const SOCIAL_CHANNELS: SocialChannelSpec[] = [
  {
    id: 'instagram',
    label: 'Instagram y Reels',
    focus: 'Hostelería, clínicas, estética, retail y negocios locales de proximidad.',
    copyApproach:
      'Ganchos visuales directos, guiones cortos centrados en dudas frecuentes del cliente y carruseles educativos que generan guardados y mensajes privados.',
    formats: [
      'Reels verticales de 20–40s mostrando procesos reales',
      'Carruseles comparativos y mitos del sector',
      'Historias estructuradas con encuestas y derivación a reserva',
    ],
    metrics: ['Alcance no seguidores', 'Guardados y compartidos', 'Clics a reserva / WhatsApp'],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn B2B',
    focus: 'Despachos, consultorías, servicios profesionales e industria PYME.',
    copyApproach:
      'Textos editoriales con criterio de negocio, análisis de casos reales, aprendizajes de cliente y narrativa directiva sin jerga vacía.',
    formats: [
      'Publicaciones de texto largo con tesis clara',
      'Documentos PDF interactivos paso a paso',
      'Casos prácticos orientados a decisores locales',
    ],
    metrics: ['Visitas al perfil', 'Conversaciones cualificadas', 'Solicitudes de propuesta'],
  },
  {
    id: 'local',
    label: 'Ecosistema Local',
    focus: 'Integración semanal entre redes sociales, ficha de Google Maps y web.',
    copyApproach:
      'Reutilización inteligente del contenido para alimentar Google Updates, respuestas estratégicas a reseñas y artículos breves en tu web.',
    formats: [
      'Publicaciones semanales en Google Business Profile',
      'Prueba social cruzada (reseñas convertidas en contenido)',
      'Campañas puntuales geolocalizadas de refuerzo',
    ],
    metrics: ['Llamadas desde Google', 'Solicitudes de ruta', 'Leads atribuidos al canal'],
  },
];

export const MODAL_DOCUMENTS: Record<string, ModalDocument> = {
  nosotros: {
    id: 'nosotros',
    title: 'Sobre Connect Agencia de Marketing Digital',
    category: 'Empresa',
    sections: [
      {
        heading: 'Enfoque para PYMES en España',
        body: 'Ayudamos a negocios físicos y empresas de servicios en España a convertir búsquedas locales en clientes reales mediante sistemas conectados: web rápida, SEO local, redes sociales y señales claras de confianza.',
      },
      {
        heading: 'Compromiso de transparencia',
        body: 'Antes de proponer cualquier plan, entregamos un diagnóstico gratuito en un máximo de 48 horas con hallazgos accionables sobre velocidad, visibilidad en Google Maps y experiencia de contacto.',
      },
    ],
  },
  blog: {
    id: 'blog',
    title: 'Guías prácticas de SEO Local para PYMES',
    category: 'Recursos',
    sections: [
      {
        heading: '1. Cómo optimizar tu ficha de Google Business Profile en 2026',
        body: 'Categorías principales y secundarias precisas, horarios actualizados, fotografías reales del local y respuestas sistemáticas a reseñas aumentan significativamente las llamadas y solicitudes de ruta.',
      },
      {
        heading: '2. Por qué la velocidad por debajo de 2 segundos multiplica tus contactos',
        body: 'El 53% de las visitas móviles abandonan si la carga supera los 3 segundos. Optimizar imágenes, fuentes y código evita perder clientes que ya hicieron clic en tu negocio.',
      },
    ],
  },
  aviso: {
    id: 'aviso',
    title: 'Aviso Legal',
    category: 'Legal',
    sections: [
      {
        heading: 'Titularidad del sitio web',
        body: 'En cumplimiento de la Ley 34/2002 (LSSI-CE), el presente sitio web pertenece a Connect Agencia de Marketing Digital, con ámbito de prestación de servicios digitales para empresas y PYMES en España.',
      },
      {
        heading: 'Propiedad intelectual y uso',
        body: 'Todos los contenidos, textos, diseño gráfico, estructura técnica e isotipos mostrados en esta página están protegidos por la normativa vigente sobre propiedad intelectual e industrial.',
      },
    ],
  },
  privacidad: {
    id: 'privacidad',
    title: 'Política de Privacidad',
    category: 'Legal',
    sections: [
      {
        heading: 'Responsable y finalidad del tratamiento',
        body: 'Connect Agencia de Marketing Digital trata los datos facilitados en el formulario de diagnóstico gratuito (nombre, negocio o sector, necesidad seleccionada, correo electrónico y teléfono) con la única finalidad de atender tu solicitud, preparar tu diagnóstico en un plazo máximo de 48h y enviarte una propuesta adaptada.',
      },
      {
        heading: 'Legitimación, destinatarios y derechos RGPD',
        body: 'La base legal es tu consentimiento expreso al enviar el formulario. No se ceden datos a terceros salvo obligación legal o proveedores técnicos estrictamente necesarios para la gestión de solicitudes y correo. Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad conforme al RGPD y la LOPDGDD.',
      },
    ],
  },
  cookies: {
    id: 'cookies',
    title: 'Política de Cookies',
    category: 'Legal',
    sections: [
      {
        heading: 'Uso de cookies técnicas',
        body: 'Este sitio emplea únicamente almacenamiento técnico esencial para garantizar el rendimiento, la accesibilidad y la navegación fluida de la página, sin rastreadores publicitarios intrusivos.',
      },
    ],
  },
};
