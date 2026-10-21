'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Eyebrow, Reveal, Stagger, StaggerItem, MaskLines, ease } from '@/components/motion'

const skills = [
  'Next.js',
  'React',
  'MongoDB',
  'IA & LLMs',
  'Agentes',
  'n8n',
  'APIs',
  'CI/CD',
  'Vercel',
  'Shopify',
  'Webflow',
  'Automatizaciones',
  'Figma',
  'Product Strategy',
]

export default function About() {
  return (
    <section id="sobre-mi" className="relative py-28 px-6 sm:px-[60px] bg-sunken">
      <div className="w-full">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.3, ease }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface shadow-lift">
              <Image
                src="/img/profile.jpeg"
                alt="José Tepáz"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-ink/70 to-transparent">
                <p className="font-heading text-3xl text-white">José Tepáz</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                  <MapPin size={13} />
                  Guatemala
                </p>
              </div>
            </div>
          </motion.div>

          <div>
            <Reveal>
              <Eyebrow index="06">Sobre mí</Eyebrow>
            </Reveal>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink mb-8">
              <MaskLines
                lines={[
                  'Me integro a tu equipo',
                  <span key="s" className="text-accent">
                    hasta que funciona.
                  </span>,
                ]}
              />
            </h2>

            <Reveal delay={0.1}>
              <p className="text-ink/80 text-lg leading-relaxed mb-5">
                Soy José Tepáz, Forward Deployed Engineer con más de 6 años llevando soluciones a
                producción dentro de los equipos de mis clientes. He trabajado con empresas en
                Guatemala, Latinoamérica, Estados Unidos y Europa, desde startups en etapa
                temprana hasta empresas consolidadas.
              </p>
              <p className="text-muted leading-relaxed mb-10">
                Diseño, desarrollo y dirijo equipos, solo o acompañando al tuyo, apoyándome en IA y automatización para acelerar cada etapa. Mi valor está en
                entender a la vez el problema del negocio y la tecnología, y en responder por el
                resultado en producción.
              </p>
            </Reveal>

            <Stagger className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <StaggerItem key={skill}>
                  <span className="inline-block px-4 py-2 bg-surface border border-line text-ink/80 text-sm transition-colors duration-300 hover:border-ink/30">
                    {skill}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
