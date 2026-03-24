'use client'

import { Calendar, MessageCircle, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function CTA() {
  const { ref, inView } = useInView()

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-violet-600/10 blur-[80px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <div className={cn('reveal', inView && 'visible')}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Disponible para nuevos proyectos
          </div>

          <h2 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-zinc-50 leading-[1.05] mb-6">
            ¿Tienes una idea?
            <br />
            <span className="gradient-text">Hablemos.</span>
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            Una llamada de 30 minutos es suficiente para entender tu proyecto y
            decirte con honestidad si puedo ayudarte — y cómo.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/+50258627018"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-brand hover:bg-brand-light text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 cursor-pointer"
            >
              <Calendar size={18} />
              Agenda una llamada gratuita
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          
          </div>

          {/* Reassurance */}
          <p className="mt-8 text-zinc-600 text-sm">
            Sin compromisos. Si no soy la persona correcta para tu proyecto, te
            lo digo y te ayudo a encontrar quién sí lo es.
          </p>
        </div>
      </div>
    </section>
  )
}
