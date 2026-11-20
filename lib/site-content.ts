/** Contenido original del sitio de José Tepáz, mapeado a las secciones del rediseño. */

export const CALENDLY = 'https://calendly.com/josetepaz28/30min'
export const LINKEDIN = 'https://www.linkedin.com/in/jose-tepaz-b84312145/'

export const navLinks = [
  { id: 'trabajo', label: 'Proyectos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Hablemos' },
]

/** Etiquetas de la columna lateral y del menú, en el orden de la página. */
export const sectionsIndex = [
  { id: 'inicio', n: '00', label: 'Inicio' },
  { id: 'clientes', n: '01', label: 'Clientes' },
  { id: 'trabajo', n: '02', label: 'Trabajo selecto' },
  { id: 'problema', n: '03', label: 'El problema' },
  { id: 'propuesta', n: '04', label: 'Mi propuesta' },
  { id: 'proceso', n: '05', label: 'Mi proceso' },
  { id: 'servicios', n: '06', label: 'Servicios' },
  { id: 'ia', n: '07', label: 'IA y automatización' },
  { id: 'stack', n: '08', label: 'Stack tecnológico' },
  { id: 'audiencia', n: '09', label: 'Para quién trabajo' },
  { id: 'sobre-mi', n: '10', label: 'Sobre mí' },
  { id: 'contacto', n: '11', label: 'Contacto' },
]

export const stats = [
  { to: 6, suffix: '+', label: 'años de experiencia' },
  { to: 60, suffix: '+', label: 'proyectos lanzados' },
  { to: 3, suffix: '', label: 'continentes atendidos' },
]

export const clients = ['Teknergy', 'Winkelmann', 'Tienda Borgatta', 'Bales Hay']

export const projects = [
  {
    name: 'Eppigo',
    category: 'Marketplace de seguros',
    description:
      'Marketplace de seguros para cotizar, comparar y contratar pólizas en línea en Estados Unidos, en pocos pasos.',
    tags: ['Marketplace', 'Seguros'],
    image: '/images/projects/eppigo-4.png',
  },
  {
    name: 'Winkelman',
    category: 'Sitio web',
    description:
      'Sitio web renovado para presentar con claridad los servicios de ingeniería civil y topografía de Winkelman y facilitar el contacto con sus clientes en Estados Unidos.',
    tags: ['Diseño web', 'Desarrollo'],
    image: '/images/projects/winkelman-1.png',
  },
  {
    name: 'GoAMS',
    category: 'Plataforma de gestión',
    description:
      'Plataforma de gestión para agencias y agentes de seguros, con un panel para consultar pólizas, clientes, citas y comisiones.',
    tags: ['Web App', 'Seguros'],
    image: '/images/projects/go-ams.png',
  },
  {
    name: 'VSTCONTROL',
    category: 'Plataforma con IA',
    description:
      'Plataforma de gestión interna para dar seguimiento a facturas vencidas, cuentas por pagar y por cobrar, y al avance de los proyectos. Incluye un asistente de inteligencia artificial para interactuar con la plataforma.',
    tags: ['Web App', 'IA'],
    image: '/images/projects/plataforma-de-control.png',
  },
]

export const problems = [
  {
    shape: 'gap',
    label: 'Brecha',
    title: 'Negocio y técnica no se hablan',
    description:
      'Los stakeholders piden una cosa y el equipo construye otra. Sin un puente, el producto se desvía.',
  },
  {
    shape: 'misfit',
    label: 'Genérico',
    title: 'Soluciones que no encajan',
    description:
      'Software genérico que no se adapta a tus procesos, sistemas ni datos reales. Termina sin usarse.',
  },
  {
    shape: 'islands',
    label: 'Aislado',
    title: 'Sistemas que no se conectan',
    description:
      'APIs, datos y herramientas sueltas. Sin integración, la solución no funciona en el entorno real del cliente.',
  },
  {
    shape: 'stuck',
    label: 'Estancado',
    title: 'Proyectos que no llegan a producción',
    description:
      'Prototipos que lucen bien en la demo pero nunca salen: faltan entornos, despliegue y alguien que responda por el resultado.',
  },
] as const

export const phrase = {
  lead: 'Para eso existo yo.',
  rest: 'El puente que se integra a tu equipo y lleva la solución del problema a producción.',
}

export const steps = [
  {
    title: 'Inmersión y definición',
    text: 'Me integro a tu equipo, entiendo procesos, usuarios y datos. Definimos el problema real y qué significa el éxito, sin suposiciones.',
    tags: ['Discovery', 'Stakeholders', 'Alcance'],
  },
  {
    title: 'Diseño de la solución',
    text: 'Diseño la arquitectura y prototipo rápido junto a tu equipo, validando sobre tu entorno real antes de comprometer el desarrollo.',
    tags: ['Arquitectura', 'Prototipo', 'UX'],
  },
  {
    title: 'Construcción e integración',
    text: 'Construyo y conecto la solución con tus sistemas y datos. Aceleramos con IA y automatización, con entregas incrementales para que veas el progreso en tiempo real.',
    tags: ['Desarrollo', 'Integraciones', 'Automatización'],
  },
  {
    title: 'Producción y resultados',
    text: 'Despliego en tu entorno, capacito al equipo y mido resultados. Me quedo hasta que la solución funciona para usuarios reales.',
    tags: ['Deploy', 'Capacitación', 'Métricas'],
  },
]

export const services = [
  {
    title: 'Soluciones a la medida',
    description:
      'Web apps, plataformas internas y herramientas hechas para tu operación. Desde un MVP hasta sistemas complejos que escalan con tu negocio.',
    features: ['Web App', 'Plataformas', 'MVPs', 'Dashboards'],
    shape: 'cube',
  },
  {
    title: 'Integración de sistemas',
    description:
      'Conecto APIs, bases de datos y herramientas existentes para que tu producto viva dentro de tu ecosistema real, no al margen.',
    features: ['APIs', 'Datos', 'IA', 'Automatizaciones'],
    shape: 'nodes',
  },
  {
    title: 'Despliegue a producción',
    description:
      'Entornos, CI/CD, hosting y lanzamiento. Todo el camino de "funciona" a "funcionando para usuarios reales", con monitoreo y rollback.',
    features: ['CI/CD', 'Cloud', 'Staging', 'Monitoring'],
    shape: 'rocket',
  },
  {
    title: 'Liderazgo técnico',
    description:
      'Dirijo equipos o trabajo dentro del tuyo: decisiones de arquitectura y coordinación entre diseño, desarrollo y negocio.',
    features: ['Arquitectura', 'Equipos', 'Roadmap', 'UX'],
    shape: 'stack',
  },
] as const

export const aiFlow = [
  { label: 'Entrada', detail: 'Correo, formulario o webhook' },
  { label: 'IA', detail: 'Clasifica, resume y decide', highlight: true },
  { label: 'Sistema', detail: 'CRM, base de datos o API' },
  { label: 'Acción', detail: 'Notifica, responde o despliega' },
]

export const aiCapabilities = [
  {
    title: 'Agentes y asistentes de IA',
    description:
      'Asistentes y agentes conectados a tus datos y herramientas, que responden, investigan y ejecutan tareas por tu equipo.',
    tags: ['LLMs', 'Agentes', 'RAG'],
  },
  {
    title: 'Automatización de procesos',
    description:
      'Flujos que eliminan el trabajo manual repetitivo: del correo al CRM, de los datos a los reportes, sin intervención humana.',
    tags: ['n8n', 'Webhooks', 'APIs', 'Workflows'],
  },
  {
    title: 'IA dentro del producto',
    description:
      'Integro modelos de lenguaje en tus productos: búsqueda inteligente, clasificación, generación de contenido y copilotos.',
    tags: ['Búsqueda semántica', 'Copilotos', 'Generación'],
  },
  {
    title: 'Desarrollo acelerado con IA',
    description:
      'Uso IA a lo largo del ciclo de desarrollo (código, revisión, pruebas y documentación) para entregar más rápido sin perder calidad.',
    tags: ['Código', 'Revisión', 'Testing', 'Docs'],
  },
]

/** Herramientas (con su ícono de simple-icons) y su rol. */
export const tools = [
  { key: 'siFigma', name: 'Figma', role: 'Diseño' },
  { key: 'siNextdotjs', name: 'Next.js', role: 'Frontend' },
  { key: 'siMongodb', name: 'MongoDB', role: 'Base de datos' },
  { key: 'siClaude', name: 'Claude', role: 'IA' },
  { key: 'siN8n', name: 'n8n', role: 'Automatización' },
  { key: 'siVercel', name: 'Vercel', role: 'Deploy' },
] as const

export const moreTools = ['siReact', 'siTypescript', 'siTailwindcss', 'siZapier', 'siSupabase', 'siGithub'] as const

export const stackStats = [
  { label: 'Uptime', value: '99.9%' },
  { label: 'Deploys / mes', value: '148' },
  { label: 'Carga', value: '0.9s' },
]

export const stackBars = [34, 48, 42, 60, 55, 72, 66, 80, 74, 90, 84, 100]

export const audiences = [
  {
    title: 'Startups',
    description:
      'Fundadores que necesitan un ingeniero senior que construya y lance rápido, sin armar un equipo completo.',
  },
  {
    title: 'Empresas',
    description:
      'Compañías que necesitan adaptar tecnología a sus procesos y sistemas existentes, sin frenar la operación.',
  },
  {
    title: 'E-commerce',
    description: 'Marcas que necesitan tiendas e integraciones que funcionen bajo presión y conviertan.',
  },
  {
    title: 'Equipos técnicos',
    description: 'Equipos que necesitan refuerzo embebido y alguien que conecte negocio, diseño y código.',
  },
]

export const skills = [
  'Next.js', 'React', 'MongoDB', 'IA & LLMs', 'Agentes', 'n8n', 'APIs', 'CI/CD',
  'Vercel', 'Shopify', 'Webflow', 'Automatizaciones', 'Figma', 'Product Strategy',
]
