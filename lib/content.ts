export type Client = {
  name: string
  /** Ruta bajo /public, p. ej. '/img/clients/teknergy.svg'. Si falta, se muestra el nombre como wordmark. */
  logo?: string
}

export type Project = {
  name: string
  category: string
  description: string
  tags: string[]
  /** Ruta bajo /public, p. ej. '/img/projects/teknergy.jpg'. Si falta, se muestra una ilustración. */
  image?: string
  /** Link al sitio o caso de estudio. Si falta, la tarjeta no es clicable. */
  url?: string
}

export const clients: Client[] = [
  { name: 'Teknergy' },
  { name: 'Winkelmann' },
  { name: 'Tienda Borgatta' },
  { name: 'Bales Hay' },
]

export const projects: Project[] = [
  {
    name: 'Teknergy',
    category: 'Web App',
    description:
      'Plataforma de gestión energética para empresas industriales. Dashboards en tiempo real, alertas inteligentes y reportes automatizados.',
    tags: ['Webflow', 'Web App', 'Dashboard'],
  },
  {
    name: 'Winkelmann',
    category: 'Sitio Web & E-commerce',
    description:
      'Rediseño completo de identidad digital y tienda online para empresa de insumos industriales en Europa.',
    tags: ['Diseño', 'Desarrollo', 'E-commerce'],
  },
  {
    name: 'Tienda Borgatta',
    category: 'E-commerce',
    description:
      'Tienda de moda construida en Shopify con diseño custom y estrategia de conversión optimizada para mobile.',
    tags: ['Shopify', 'E-commerce', 'Mobile-first'],
  },
  {
    name: 'Bales Hay',
    category: 'UX/UI & App',
    description:
      'Aplicación para gestión agrícola. Diseño UX completo y desarrollo en Shopify para conectar productores con compradores.',
    tags: ['UX/UI Design', 'Shopify', 'Mobile'],
  },
]
