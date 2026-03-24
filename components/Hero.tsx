'use client'

import { ArrowRight, Calendar } from 'lucide-react'

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center  pt-24 pb-20 px-6">
      {/* Background orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="animate-glow-pulse absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="animate-glow-pulse absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px]" style={{ animationDelay: '2s' }} />
        
      </div>

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Consultor de Proyectos Digitales
        </div>

        {/* Headline */}
        <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-zinc-50 mb-6">
          De la idea al
          <br />
          <span className="gradient-text">producto digital</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-3x2 mx-auto text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10">
          Como consultor orquesto la experiencia digital completa, desde la idea hasta el lanzamiento, sin que tengas que preocuparte por los detalles técnicos, la gestión delproyecto y la comunicación con el equipo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-light text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer"
          >
            <Calendar size={18} />
            Agenda una llamada gratuita
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl text-zinc-200">6+</span>
            <span>años de experiencia</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl text-zinc-200">60+</span>
            <span>proyectos lanzados</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl text-zinc-200">3</span>
            <span>continentes atendidos</span>
          </div>
        </div>
      </div>

    
    </section>
  )
}
