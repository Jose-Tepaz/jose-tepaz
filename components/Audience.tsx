'use client'

import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'

const audiences = [
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
    description:
      'Marcas que necesitan tiendas e integraciones que funcionen bajo presión y conviertan.',
  },
  {
    title: 'Equipos técnicos',
    description:
      'Equipos que necesitan refuerzo embebido y alguien que conecte negocio, diseño y código.',
  },
]

export default function Audience() {
  return (
    <section className={`relative py-28 border-t border-line ${sectionX}`}>
      <SectionHeader
        index="05"
        eyebrow="Para quién trabajo"
        lines={[
          'Hecho para quienes',
          <span key="c" className="text-accent">
            necesitan resultados reales
          </span>,
        ]}
      />
      <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <Cell key={a.title} label={a.title} index={i + 1}>
            <div className="flex flex-1 flex-col justify-between gap-16 p-7 min-h-[260px]">
              <h3 className="font-heading text-3xl text-ink">{a.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{a.description}</p>
            </div>
          </Cell>
        ))}
      </Grid>
    </section>
  )
}
