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
    "name": "Eppigo",
    "category": "Marketplace de seguros",
    "description": "Marketplace de seguros para cotizar, comparar y contratar pólizas en línea en Estados Unidos, en pocos pasos.",
    "tags": [
      "Marketplace",
      "Seguros"
    ],
    "image": "/images/projects/eppigo-4.png"
  },
  {
    "name": "Winkelman",
    "category": "Sitio web",
    "description": "Sitio web renovado para presentar con claridad los servicios de ingeniería civil y topografía de Winkelman y facilitar el contacto con sus clientes en Estados Unidos.",
    "tags": [
      "Diseño web",
      "Desarrollo"
    ],
    "image": "/images/projects/winkelman-1.png"
  },
  {
    "name": "GoAMS",
    "category": "Plataforma de gestión",
    "description": "Plataforma de gestión para agencias y agentes de seguros, con un panel para consultar pólizas, clientes, citas y comisiones.",
    "tags": [
      "Web App",
      "Seguros"
    ],
    "image": "/images/projects/go-ams.png"
  },
  {
    "name": "VSTCONTROL",
    "category": "Plataforma con IA",
    "description": "Plataforma de gestión interna para dar seguimiento a facturas vencidas, cuentas por pagar y por cobrar, y al avance de los proyectos. Incluye un asistente de inteligencia artificial para interactuar con la plataforma.",
    "tags": [
      "Web App",
      "IA"
    ],
    "image": "/images/projects/plataforma-de-control.png"
  }
]
