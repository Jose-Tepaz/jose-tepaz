'use client'

import { Search, Pencil, Code2, Rocket } from 'lucide-react'
import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'

const steps = [
  {
    label: 'Inmersión',
    icon: Search,
    title: 'Inmersión y definición',
    description:
      'Me integro a tu equipo, entiendo procesos, usuarios y datos. Definimos el problema real y qué significa el éxito, sin suposiciones.',
    tags: ['Discovery', 'Stakeholders', 'Alcance'],
  },
  {
    label: 'Solución',
    icon: Pencil,
    title: 'Diseño de la solución',
    description:
      'Diseño la arquitectura y prototipo rápido junto a tu equipo, validando sobre tu entorno real antes de comprometer el desarrollo.',
    tags: ['Arquitectura', 'Prototipo', 'UX'],
  },
  {
    label: 'Construcción',
    icon: Code2,
    title: 'Construcción e integración',
    description:
      'Construyo y conecto la solución con tus sistemas y datos. Aceleramos con IA y automatización, con entregas incrementales para que veas el progreso en tiempo real.',
    tags: ['Desarrollo', 'Integraciones', 'Automatización'],
  },
  {
    label: 'Producción',
    icon: Rocket,
    title: 'Producción y resultados',
    description:
      'Despliego en tu entorno, capacito al equipo y mido resultados. Me quedo hasta que la solución funciona para usuarios reales.',
    tags: ['Deploy', 'Capacitación', 'Métricas'],
  },
]

export default function Process() {
  return (
    <section id="proceso" className={`relative py-28 bg-sunken ${sectionX}`}>
      <SectionHeader
        index="02"
        eyebrow="Mi proceso"
        lines={[
          'Cómo llevo tu problema',
          <span key="m" className="text-accent">
            hasta producción
          </span>,
        ]}
      >
        Embebido en tu equipo, con entregas continuas y visibilidad total en cada etapa.
      </SectionHeader>

      <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <Cell key={step.label} label={step.label} index={i + 1}>
              <div className="flex items-center justify-between px-7 pt-10 pb-8 border-b border-dashed border-line">
                <span className="font-heading text-7xl leading-none text-ink/15 transition-colors duration-500 group-hover:text-accent/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-11 h-11 border border-line bg-surface flex items-center justify-center">
                  <Icon size={18} className="text-ink" strokeWidth={1.6} />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                <div>
                  <h3 className="font-heading text-3xl leading-tight text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 border border-line text-muted font-mono text-[11px] uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Cell>
          )
        })}
      </Grid>
    </section>
  )
}
