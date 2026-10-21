'use client'

import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { Counter } from '@/components/motion'

const stats = [
  { to: 6, suffix: '+', label: 'años de experiencia' },
  { to: 60, suffix: '+', label: 'proyectos lanzados' },
  { to: 3, suffix: '', label: 'continentes atendidos' },
]

const titleLines: ReactNode[] = [
  'De la idea ,',
  <span key="p" className="text-accent">
    al producto digital
  </span>,
]

// La entrada es CSS puro (ver .intro-* en globals.css): no depende de que React hidrate.
const delay = (d: number) => ({ '--d': `${d}s` }) as CSSProperties

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 pb-24 px-6 sm:px-[60px] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-accent/[0.09] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full text-center">
        <div
          style={delay(0.1)}
          className="intro-fade inline-flex items-center gap-2.5 px-4 py-2 border border-line bg-surface/70 backdrop-blur text-muted font-mono text-xs uppercase tracking-[0.14em] mb-10 shadow-card"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Forward Deployed Engineer
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] text-ink mb-8">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden py-[0.12em] -my-[0.12em]">
              <span className="intro-line block" style={{ '--i': i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          style={delay(0.5)}
          className="intro-fade max-w-[600px] mx-auto text-lg sm:text-xl text-muted leading-relaxed mb-12"
        >
          Me integro a tu equipo, entiendo el problema de negocio y llevo la solución a
          producción: construida, conectada a tus sistemas y funcionando en tu entorno real.
        </p>

        <div
          style={delay(0.65)}
          className="intro-fade flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://calendly.com/josetepaz28/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 pl-6 pr-3 py-3 bg-ink text-paper font-medium text-base hover:bg-accent transition-colors duration-300 shadow-lift"
          >
            <Calendar size={18} />
            Agenda una llamada gratuita
            <span className="flex h-9 w-9 items-center justify-center bg-paper/15 group-hover:bg-paper/25 transition-colors">
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>

        <dl
          style={delay(0.8)}
          className="intro-fade mt-24 w-full grid grid-cols-3 border-t border-l border-line text-left"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-r border-b border-line px-4 py-6 sm:px-7 sm:py-8">
              <dt className="font-heading text-5xl sm:text-6xl text-ink tabular-nums">
                <Counter to={s.to} suffix={s.suffix} startAt={2800} />
              </dt>
              <dd className="mt-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] text-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
