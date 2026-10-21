'use client'

import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'
import Iso from '@/components/Iso'

const problems = [
  {
    label: 'Brecha',
    title: 'Negocio y técnica no se hablan',
    description:
      'Los stakeholders piden una cosa y el equipo construye otra. Sin un puente, el producto se desvía.',
  },
  {
    label: 'Genérico',
    title: 'Soluciones que no encajan',
    description:
      'Software genérico que no se adapta a tus procesos, sistemas ni datos reales. Termina sin usarse.',
  },
  {
    label: 'Aislado',
    title: 'Sistemas que no se conectan',
    description:
      'APIs, datos y herramientas sueltas. Sin integración, la solución no funciona en el entorno real del cliente.',
  },
  {
    label: 'Estancado',
    title: 'Proyectos que no llegan a producción',
    description:
      'Prototipos que lucen bien en la demo pero nunca salen: faltan entornos, despliegue y alguien que responda por el resultado.',
  },
]

export default function Problem() {
  return (
    <section className={`relative pt-28 pb-10 ${sectionX}`}>
      <SectionHeader
        index="01"
        eyebrow="El problema"
        lines={[
          'La mayoría de proyectos técnicos',
          <span key="n" className="text-accent">
            se pierden entre negocio y código
          </span>,
        ]}
      >
        No es falta de talento. Es falta de alguien que entienda el problema del cliente y la
        tecnología, y lleve la solución hasta producción.
      </SectionHeader>

      <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p, i) => (
          <Cell key={p.label} label={p.label} index={i + 1}>
            <div className="flex items-center justify-center h-72 border-b border-dashed border-line">
              <Iso variant={i} />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-7">
              <h3 className="font-heading text-3xl leading-[1.1] text-ink">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{p.description}</p>
            </div>
          </Cell>
        ))}
      </Grid>
    </section>
  )
}
