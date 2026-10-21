'use client'

import { motion } from 'motion/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { MaskLines, Reveal, ease } from '@/components/motion'

export default function CTA() {
  return (
    <section id="contacto" className="relative py-28 px-6 sm:px-[60px]">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease }}
        className="relative w-full overflow-hidden bg-ink px-6 py-24 sm:py-28 text-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/40 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponible para nuevos proyectos
            </div>
          </Reveal>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl text-white mb-8">
            <MaskLines
              lines={[
                '¿Tienes un problema',
                <span key="h" className="text-[#FF7A57]">
                  por resolver?
                </span>,
              ]}
            />
          </h2>

          <Reveal delay={0.15}>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              Una llamada de 30 minutos basta para entender tu caso y decirte con honestidad si
              puedo ayudarte, y cómo.
            </p>

            <a
              href="https://calendly.com/josetepaz28/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 pl-7 pr-3 py-3 bg-white text-ink font-medium text-base hover:bg-paper transition-colors duration-300"
            >
              <Calendar size={18} />
              Agenda una llamada gratuita
              <span className="flex h-9 w-9 items-center justify-center bg-ink text-white">
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </a>

            <p className="mt-10 text-white/45 text-sm max-w-md mx-auto">
              Sin compromisos. Si no soy la persona correcta para tu proyecto, te lo digo y te
              ayudo a encontrar quién sí lo es.
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
