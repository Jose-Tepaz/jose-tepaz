'use client'

import { Monitor, Smartphone, ShoppingBag, MousePointerClick, ArrowUpRight } from 'lucide-react'
import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'

const services = [
  {
    icon: Monitor,
    title: 'Soluciones a la medida',
    description:
      'Web apps, plataformas internas y herramientas hechas para tu operación. Desde un MVP hasta sistemas complejos que escalan con tu negocio.',
    features: ['Web App', 'Plataformas', 'MVPs', 'Dashboards'],
  },
  {
    icon: Smartphone,
    title: 'Integración de sistemas',
    description:
      'Conecto APIs, bases de datos y herramientas existentes para que tu producto viva dentro de tu ecosistema real, no al margen.',
    features: ['APIs', 'Datos', 'IA', 'Automatizaciones'],
  },
  {
    icon: ShoppingBag,
    title: 'Despliegue a producción',
    description:
      'Entornos, CI/CD, hosting y lanzamiento. Todo el camino de "funciona" a "funcionando para usuarios reales", con monitoreo y rollback.',
    features: ['CI/CD', 'Cloud', 'Staging', 'Monitoring'],
  },
  {
    icon: MousePointerClick,
    title: 'Liderazgo técnico',
    description:
      'Dirijo equipos o trabajo dentro del tuyo: decisiones de arquitectura y coordinación entre diseño, desarrollo y negocio.',
    features: ['Arquitectura', 'Equipos', 'Roadmap', 'UX'],
  },
]

export default function Services() {
  return (
    <section id="servicios" className={`relative py-28 ${sectionX}`}>
      <SectionHeader
        index="03"
        eyebrow="Servicios"
        lines={[
          'Lo que hago',
          <span key="c" className="text-accent">
            dentro de tu equipo
          </span>,
        ]}
      >
        Trabajo embebido contigo: desde entender el problema hasta mantener la solución viva en
        producción.
      </SectionHeader>

      <Grid cols="sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <Cell key={s.title} label={s.title} index={i + 1}>
              <div className="flex flex-1 flex-col justify-between gap-12 p-9">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 border border-line bg-surface flex items-center justify-center transition-colors duration-500 group-hover:bg-accent group-hover:border-accent">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-ink transition-colors duration-500 group-hover:text-white"
                    />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-subtle transition-all duration-500 group-hover:text-ink group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-3xl text-ink mb-3">{s.title}</h3>
                  <p className="text-muted leading-relaxed mb-8 max-w-xl">{s.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 border border-line text-muted font-mono text-[11px] uppercase tracking-wide"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Cell>
          )
        })}
      </Grid>
    </section>
  )
}
