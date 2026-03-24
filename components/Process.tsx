'use client'

import { Search, Pencil, Code2, Rocket } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Estrategia y definición',
    description:
      'Entendemos el problema real, identificamos oportunidades y trazamos el camino. Salimos con un alcance claro y un plan de acción — sin suposiciones.',
    tags: ['Research', 'Product definition', 'Roadmap'],
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Diseño de experiencia',
    description:
      'Creamos la interfaz que conecta con tus usuarios. Iteramos rápido con prototipos hasta que cada flujo se sienta natural e intuitivo.',
    tags: ['UX/UI Design', 'Prototyping', 'User testing'],
  },
  {
    number: '03',
    icon: Code2,
    title: 'Desarrollo',
    description:
      'Construimos con tecnología que escala. Código limpio, arquitectura sólida y entregas incrementales para que puedas ver el progreso en tiempo real.',
    tags: ['Web App', 'Mobile', 'E-commerce'],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Lanzamiento y seguimiento',
    description:
      'Llevamos el producto al mercado con una estrategia de lanzamiento. Medimos lo que importa e iteramos sobre datos reales, no suposiciones.',
    tags: ['Launch', 'Analytics', 'Iterations'],
  },
]

export default function Process() {
  const { ref, inView } = useInView()

  return (
    <section
      id="proceso"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-900/10 blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={cn('max-w-2xl mb-20 reveal', inView && 'visible')}
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Mi proceso
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-zinc-50 leading-tight mb-5">
            Cómo llevo tu idea a las{' '}
            <span className="gradient-text">manos de tus usuarios</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Un proceso probado, sin sorpresas, con visibilidad total en cada
            etapa.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className={cn(
                    'relative reveal',
                    inView && 'visible',
                    i === 0 && 'reveal-delay-1',
                    i === 1 && 'reveal-delay-2',
                    i === 2 && 'reveal-delay-3',
                    i === 3 && 'reveal-delay-4'
                  )}
                >
                  {/* Step number + icon */}
                  <div className="relative flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center flex-shrink-0 glow-indigo">
                      <Icon size={22} className="text-indigo-400" />
                    </div>
                    <span className="font-heading font-black text-5xl text-zinc-800 select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-zinc-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
