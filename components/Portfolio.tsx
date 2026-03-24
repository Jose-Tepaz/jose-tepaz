'use client'

import { ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const projects = [
  {
    name: 'Teknergy',
    category: 'Web App',
    description:
      'Plataforma de gestión energética para empresas industriales. Dashboards en tiempo real, alertas inteligentes y reportes automatizados.',
    tags: ['Webflow', 'Web App', 'Dashboard'],
    gradient: 'from-indigo-900/60 to-blue-900/30',
    accent: 'bg-indigo-500',
    span: 'sm:col-span-2',
  },
  {
    name: 'Winkelmann',
    category: 'Sitio Web & E-commerce',
    description:
      'Rediseño completo de identidad digital y tienda online para empresa de insumos industriales en Europa.',
    tags: ['Diseño', 'Desarrollo', 'E-commerce'],
    gradient: 'from-zinc-800/80 to-zinc-900/60',
    accent: 'bg-violet-500',
    span: '',
  },
  {
    name: 'Tienda Borgatta',
    category: 'E-commerce',
    description:
      'Tienda de moda construida en Shopify con diseño custom y estrategia de conversión optimizada para mobile.',
    tags: ['Shopify', 'E-commerce', 'Mobile-first'],
    gradient: 'from-rose-900/40 to-zinc-900/60',
    accent: 'bg-rose-500',
    span: '',
  },
  {
    name: 'Bales Hay',
    category: 'UX/UI & App',
    description:
      'Aplicación para gestión agrícola. Diseño UX completo y desarrollo en Shopify para conectar productores con compradores.',
    tags: ['UX/UI Design', 'Shopify', 'Mobile'],
    gradient: 'from-emerald-900/40 to-zinc-900/60',
    accent: 'bg-emerald-500',
    span: 'sm:col-span-2',
  },
]

export default function Portfolio() {
  const { ref, inView } = useInView()

  return (
    <section
      id="trabajo"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={cn(
            'flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 reveal',
            inView && 'visible'
          )}
        >
          <div className="max-w-xl">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
              Trabajo selecto
            </p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-zinc-50 leading-tight">
              Proyectos que{' '}
              <span className="gradient-text">llegaron al mercado</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs">
            Cada proyecto tiene una historia distinta. Lo que los une: ideas que
            se convirtieron en productos reales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={cn(
                `group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br ${project.gradient} cursor-pointer reveal`,
                inView && 'visible',
                project.span,
                i === 0 && 'reveal-delay-1',
                i === 1 && 'reveal-delay-2',
                i === 2 && 'reveal-delay-3',
                i === 3 && 'reveal-delay-4'
              )}
              style={{ minHeight: '240px' }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="relative p-8 flex flex-col h-full justify-between" style={{ minHeight: '240px' }}>
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/60 border border-zinc-700/60 text-zinc-400 text-xs mb-4">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.accent}`} />
                      {project.category}
                    </span>
                    <h3 className="font-heading font-bold text-3xl text-zinc-50">
                      {project.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 cursor-pointer">
                    <ArrowUpRight size={16} className="text-zinc-300" />
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-6">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-zinc-900/70 border border-zinc-700/50 text-zinc-400 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
