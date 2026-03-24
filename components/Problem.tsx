'use client'

import { AlertTriangle, Users, Lightbulb } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const problems = [
  {
    icon: Lightbulb,
    title: 'Sin dirección clara',
    description:
      'Tienes una idea poderosa pero no sabes por dónde empezar, qué construir primero ni cómo validarla antes de invertir.',
  },
  {
    icon: Users,
    title: 'Equipo descoordinado',
    description:
      'Diseñadores, desarrolladores y stakeholders hablan idiomas distintos. Sin alguien que los conecte, el proyecto se fragmenta.',
  },
  {
    icon: AlertTriangle,
    title: 'Decisiones técnicas sin visión',
    description:
      'Se construye lo que se puede, no lo que el negocio necesita. El resultado: retrasos, costos extra y un producto que nadie usa.',
  },
]

export default function Problem() {
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6 "
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={cn(
            'max-w-2xl mb-16 reveal',
            inView && 'visible'
          )}
        >
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            El problema
          </p>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-zinc-50 leading-tight mb-5">
            La mayoría de proyectos digitales{' '}
            <span className="text-zinc-500">nunca llegan a lanzar</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            No es falta de talento ni de presupuesto. Es falta de alguien que
            conecte la visión de negocio con la ejecución técnica.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.title}
                className={cn(
                  'glass rounded-2xl p-8 reveal',
                  inView && 'visible',
                  i === 0 && 'reveal-delay-1',
                  i === 1 && 'reveal-delay-2',
                  i === 2 && 'reveal-delay-3'
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-red-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-zinc-100 mb-3">
                  {problem.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {problem.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Transition statement */}
        <div
          className={cn(
            'mt-16 pt-16 border-t border-zinc-800/60 text-center reveal reveal-delay-4',
            inView && 'visible'
          )}
        >
          <p className="text-4xl sm:text-5xl font-heading font-semibold text-zinc-200 max-w-2xl mx-auto leading-snug">
            Para eso existo yo.{' '}
            <span className="gradient-text">
              El puente entre tu visión y el producto que tus usuarios van a usar.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
