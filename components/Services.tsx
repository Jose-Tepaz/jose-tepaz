'use client'

import { Monitor, Smartphone, ShoppingBag, MousePointerClick } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Monitor,
    title: 'Web App',
    description:
      'Aplicaciones web para procesos internos, B2B y B2C. Desde un MVP para validar tu idea hasta sistemas complejos que escalan con tu negocio.',
    features: ['SaaS', 'Plataformas B2B', 'Dashboards', 'MVPs'],
    gradient: 'from-indigo-500/20 to-violet-500/5',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 border-indigo-500/25',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Smartphone,
    title: 'App Mobile',
    description:
      'Apps iOS y Android con experiencia nativa. Tu producto en el bolsillo de tus usuarios, construido para rendimiento y facilidad de uso.',
    features: ['iOS & Android', 'React Native', 'UX nativa', 'App Store'],
    gradient: 'from-violet-500/20 to-purple-500/5',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 border-violet-500/25',
    iconColor: 'text-violet-400',
  },
  {
    icon: ShoppingBag,
    title: 'Sitio Web & E-commerce',
    description:
      'Presencia digital que convierte. Desde landing pages hasta tiendas online completas en Shopify o Webflow, con diseño que refleja tu marca.',
    features: ['Shopify', 'Webflow', 'Landing pages', 'E-commerce'],
    gradient: 'from-emerald-500/15 to-teal-500/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 border-emerald-500/25',
    iconColor: 'text-emerald-400',
  },
  {
    icon: MousePointerClick,
    title: 'Mejora de UX',
    description:
      'Auditoría y rediseño de productos existentes. Identifico dónde pierdes usuarios y propongo mejoras que aumentan la conversión y reducen la fricción.',
    features: ['UX Audit', 'Rediseño', 'Prototipos', 'A/B testing'],
    gradient: 'from-orange-500/15 to-amber-500/5',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10 border-orange-500/25',
    iconColor: 'text-orange-400',
  },
]

export default function Services() {
  const { ref, inView } = useInView()

  return (
    <section
      id="servicios"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={cn('max-w-2xl mb-16 reveal', inView && 'visible')}>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Servicios
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-zinc-50 leading-tight mb-5">
            Lo que puedo{' '}
            <span className="gradient-text">construir contigo</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            No elijo tecnología por moda — la elijo en función de lo que tu
            proyecto necesita para llegar al mercado de la manera correcta.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={cn(
                  `relative overflow-hidden rounded-2xl border ${service.border} bg-gradient-to-br ${service.gradient} p-8 cursor-pointer group reveal transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`,
                  inView && 'visible',
                  i === 0 && 'reveal-delay-1',
                  i === 1 && 'reveal-delay-2',
                  i === 2 && 'reveal-delay-3',
                  i === 3 && 'reveal-delay-4'
                )}
                style={{ background: 'rgba(24,24,27,0.4)', backdropFilter: 'blur(12px)' }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${service.iconBg} border flex items-center justify-center mb-6`}
                >
                  <Icon size={22} className={service.iconColor} />
                </div>

                <h3 className="font-heading font-bold text-2xl text-zinc-50 mb-3">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-700/60 text-zinc-400 text-xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
