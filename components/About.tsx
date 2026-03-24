'use client'

import { CheckCircle2, MapPin, Music } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const highlights = [
  'Conecto la visión de negocio con la ejecución técnica',
  'Coordino diseñadores, desarrolladores y stakeholders',
  'Tomo decisiones técnicas informadas por el negocio',
  'Entrego proyectos con estructura, no con improvisación',
]

const skills = [
  'Product Strategy',
  'UX/UI Design',
  'Web Development',
  'Mobile Apps',
  'E-commerce',
  'Automatizaciones',
  'Figma',
  'Shopify',
  'Webflow',
  'React / Next.js',
]

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="sobre-mi"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 px-6"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-900/10 blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <div className={cn('reveal', inView && 'visible')}>
            {/* Avatar placeholder */}
            <div className="relative w-full  mx-auto lg:mx-0">
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-indigo-900/40 via-zinc-900 to-violet-900/30 border border-zinc-800 overflow-hidden flex items-center justify-center">
                {/* Initials avatar */}
                <div className="text-center flex flex-col items-center justify-center">
                  <Image src="/img/profile.JPG" alt="José Tepáz" width={500} height={500} className="rounded-full  w-[400px] h-[400px] object-cover mb-4" />
                  <p className="font-heading font-semibold text-zinc-300 text-lg">
                    José Tepáz
                  </p>
                  <p className="text-zinc-500 text-sm mt-1 flex items-center justify-center gap-1.5">
                    <MapPin size={12} />
                    Guatemala
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              
            </div>
          </div>

          {/* Right: content */}
          <div className={cn('reveal reveal-delay-2', inView && 'visible')}>
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
              Sobre mí
            </p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-zinc-50 leading-tight mb-6">
              No soy solo un consultor.{' '}
              <span className="gradient-text">Soy tu socio estratégico.</span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Soy José Tepáz, consultor de proyectos digitales con más de 6 años
              llevando ideas al mercado. He trabajado con empresas en Guatemala,
              Latinoamérica, Estados Unidos y Europa — desde startups en etapa temprana hasta
              empresas consolidadas transformando su presencia digital.
            </p>

            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              Mi valor no está solo en saber diseñar o programar — está en saber
              qué construir, cuándo, y por qué. Soy el punto de convergencia
              entre tu equipo, tu tecnología y tus usuarios.
            </p>

            

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
