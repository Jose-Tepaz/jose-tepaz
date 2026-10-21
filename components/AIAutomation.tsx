'use client'

import { ArrowUpRight, Bot, Workflow, Sparkles, Zap, Inbox, Database, BellRing } from 'lucide-react'
import { Cell, Grid, SectionHeader, sectionX } from '@/components/Grid'
import { Reveal } from '@/components/motion'

const flow = [
  { icon: Inbox, label: 'Entrada', detail: 'Correo, formulario o webhook' },
  { icon: Sparkles, label: 'IA', detail: 'Clasifica, resume y decide', highlight: true },
  { icon: Database, label: 'Sistema', detail: 'CRM, base de datos o API' },
  { icon: BellRing, label: 'Acción', detail: 'Notifica, responde o despliega' },
]

const capabilities = [
  {
    icon: Bot,
    title: 'Agentes y asistentes de IA',
    description:
      'Asistentes y agentes conectados a tus datos y herramientas, que responden, investigan y ejecutan tareas por tu equipo.',
    tags: ['LLMs', 'Agentes', 'RAG'],
  },
  {
    icon: Workflow,
    title: 'Automatización de procesos',
    description:
      'Flujos que eliminan el trabajo manual repetitivo: del correo al CRM, de los datos a los reportes, sin intervención humana.',
    tags: ['n8n', 'Webhooks', 'APIs', 'Workflows'],
  },
  {
    icon: Sparkles,
    title: 'IA dentro del producto',
    description:
      'Integro modelos de lenguaje en tus productos: búsqueda inteligente, clasificación, generación de contenido y copilotos.',
    tags: ['Búsqueda semántica', 'Copilotos', 'Generación'],
  },
  {
    icon: Zap,
    title: 'Desarrollo acelerado con IA',
    description:
      'Uso IA a lo largo del ciclo de desarrollo (código, revisión, pruebas y documentación) para entregar más rápido sin perder calidad.',
    tags: ['Código', 'Revisión', 'Testing', 'Docs'],
  },
]

export default function AIAutomation() {
  return (
    <section id="ia" className={`relative py-28 ${sectionX}`}>
      <SectionHeader
        index="04"
        eyebrow="IA y automatización"
        lines={[
          'Acelero cada etapa',
          <span key="a" className="text-accent">
            con IA y automatización
          </span>,
        ]}
      >
        Integro herramientas de IA en tus procesos y en tu producto para que tu equipo entregue
        más, con menos trabajo manual.
      </SectionHeader>

      <Reveal>
        <div className="mb-5 border border-line">
          <div className="flex items-center justify-between px-7 py-4 border-b border-dashed border-line font-mono text-xs uppercase tracking-[0.14em]">
            <span>Ejemplo de flujo</span>
            <span className="text-subtle">[ Automático ]</span>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((n, i) => {
              const Icon = n.icon
              return (
                <li
                  key={n.label}
                  style={{ animationDelay: `${i * 1.5}s` }}
                  className="flow-node relative flex items-center gap-4 border-b border-line p-6 lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center border ${
                      n.highlight
                        ? 'border-accent bg-accent text-white'
                        : 'border-line bg-surface text-ink'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl leading-none text-ink">{n.label}</p>
                    <p className="mt-1.5 text-sm text-muted">{n.detail}</p>
                  </div>
                  {i < flow.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center border border-line bg-paper font-mono text-xs text-accent lg:flex"
                    >
                      →
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </Reveal>

      <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const Icon = c.icon
          return (
            <Cell key={c.title} label={c.tags[0]} index={i + 1}>
              <div className="flex flex-1 flex-col justify-between gap-12 p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-line bg-surface transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-ink transition-colors duration-500 group-hover:text-white"
                    />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-subtle transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-3xl leading-tight text-ink mb-3">{c.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">{c.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Cell>
          )
        })}
      </Grid>
    </section>
  )
}
