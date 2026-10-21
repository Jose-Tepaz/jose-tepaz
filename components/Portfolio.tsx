'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'
import Iso from '@/components/Iso'
import { projects } from '@/lib/content'

export default function Portfolio() {
  return (
    <section id="trabajo" className={`relative py-28 ${sectionX}`}>
      <SectionHeader
        index="05"
        eyebrow="Trabajo selecto"
        lines={[
          'Proyectos que',
          <span key="l" className="text-accent">
            llegaron a producción
          </span>,
        ]}
      >
        Cada proyecto tiene una historia distinta. Lo que los une: software real, en producción y
        usado por personas reales.
      </SectionHeader>

      <Grid cols="sm:grid-cols-2">
        {projects.map((p, i) => {
          const body = (
            <>
              <div className="relative flex h-72 items-center justify-center overflow-hidden border-b border-dashed border-line bg-sunken/60">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`Proyecto ${p.name}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Iso variant={i} />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-8 p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-3xl sm:text-4xl text-ink">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-subtle transition-all duration-500 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <div>
                  <p className="text-muted leading-relaxed mb-6 max-w-xl">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 border border-line text-muted font-mono text-[11px] uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )
          return (
            <Cell key={p.name} label={p.category} index={i + 1}>
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 flex-col"
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </Cell>
          )
        })}
      </Grid>
    </section>
  )
}
