'use client'

import { useRef } from 'react'
import { easeInOut, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import {
  siClaude,
  siFigma,
  siGithub,
  siMongodb,
  siN8n,
  siNextdotjs,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZapier,
  type SimpleIcon,
} from 'simple-icons'

function Logo({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className={className}>
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  )
}

type TileDef = {
  icon: SimpleIcon
  x: number
  y: number
  rot: number
  rotY: number
  blur: number
  mobile?: boolean
}

// x/y en vw/vh respecto al punto de anclaje del escenario
const tiles: TileDef[] = [
  { icon: siFigma, x: -34, y: -27, rot: -8, rotY: 28, blur: 0, mobile: true },
  { icon: siNextdotjs, x: -4, y: -33, rot: 4, rotY: -20, blur: 1, mobile: true },
  { icon: siMongodb, x: 32, y: -25, rot: 8, rotY: -28, blur: 0, mobile: true },
  { icon: siReact, x: -45, y: -2, rot: -5, rotY: 30, blur: 2 },
  { icon: siTypescript, x: -24, y: 19, rot: 6, rotY: 24, blur: 3 },
  { icon: siTailwindcss, x: 22, y: 20, rot: -6, rotY: -24, blur: 2 },
  { icon: siClaude, x: 36, y: -1, rot: 5, rotY: -30, blur: 1, mobile: true },
  { icon: siN8n, x: -14, y: 30, rot: -4, rotY: 18, blur: 2, mobile: true },
  { icon: siZapier, x: 38, y: 23, rot: 7, rotY: -26, blur: 3 },
  { icon: siVercel, x: -27, y: -14, rot: 5, rotY: 22, blur: 1 },
  { icon: siSupabase, x: 28, y: -11, rot: -7, rotY: -22, blur: 2 },
  { icon: siGithub, x: 6, y: 29, rot: 3, rotY: -16, blur: 3, mobile: true },
]

const sidebar = [
  { icon: siFigma, name: 'Figma', role: 'Diseño' },
  { icon: siNextdotjs, name: 'Next.js', role: 'Frontend' },
  { icon: siMongodb, name: 'MongoDB', role: 'Base de datos' },
  { icon: siClaude, name: 'Claude', role: 'IA' },
  { icon: siN8n, name: 'n8n', role: 'Automatización' },
  { icon: siVercel, name: 'Vercel', role: 'Deploy' },
]

const stats = [
  { label: 'Uptime', value: '99.9%' },
  { label: 'Deploys / mes', value: '148' },
  { label: 'Carga', value: '0.9s' },
]

const bars = [34, 48, 42, 60, 55, 72, 66, 80, 74, 90, 84, 100]

function Tile({ def, index, p }: { def: TileDef; index: number; p: MotionValue<number> }) {
  const end = 0.5 + index * 0.004
  const o = { ease: easeInOut }
  const x = useTransform(p, [0.02, end], [`${def.x}vw`, '0vw'], o)
  const y = useTransform(p, [0.02, end], [`${def.y}vh`, '14vh'], o)
  const rotate = useTransform(p, [0.02, end], [def.rot, 0], o)
  const rotateY = useTransform(p, [0.02, end], [def.rotY, 0], o)
  const scale = useTransform(p, [0.02, end], [1, 0.3], o)
  const opacity = useTransform(p, [0, 0.38, 0.52], [1, 1, 0])
  const filter = useTransform(p, [0, 0.3], [`blur(${def.blur}px)`, 'blur(0px)'])

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, rotate, rotateY, scale, opacity, filter, transformPerspective: 900 }}
      className={`absolute left-1/2 top-[36vh] -ml-10 -mt-10 sm:-ml-16 sm:-mt-16 h-20 w-20 sm:h-32 sm:w-32 items-center justify-center border border-line bg-surface shadow-lift ${
        def.mobile ? 'flex' : 'hidden sm:flex'
      }`}
    >
      <Logo icon={def.icon} className="h-8 w-8 sm:h-12 sm:w-12" />
    </motion.div>
  )
}

function Bar({ h, i, p }: { h: number; i: number; p: MotionValue<number> }) {
  const s = 0.7 + i * 0.012
  const scaleY = useTransform(p, [s, s + 0.1], [0, 1], { ease: easeInOut })
  return (
    <motion.div
      style={{ scaleY, height: `${h}%` }}
      className={`flex-1 origin-bottom ${i === bars.length - 1 ? 'bg-accent' : 'bg-ink/80'}`}
    />
  )
}

export default function ToolStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const titleA = useTransform(p, [0.26, 0.4], [1, 0])
  const titleAy = useTransform(p, [0.26, 0.4], [0, -24])
  const windowY = useTransform(p, [0.3, 0.8], ['58vh', '0vh'], { ease: easeInOut })
  const sideOpacity = useTransform(p, [0.6, 0.7], [0, 1])
  const mainOpacity = useTransform(p, [0.66, 0.76], [0, 1])

  return (
    <section
      ref={ref}
      aria-label="Herramientas que domino"
      className="relative h-[340vh] border-t border-line"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {tiles.map((t, i) => (
          <Tile key={t.icon.slug} def={t} index={i} p={p} />
        ))}

        <motion.div
          style={{ opacity: titleA, y: titleAy }}
          className="absolute inset-x-6 top-[36vh] -translate-y-1/2 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-5">
            [ Stack tecnológico ]
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink">
            De la herramienta al deploy.
          </h2>
          <p className="mt-5 mx-auto max-w-md text-lg text-muted leading-relaxed">
            Figma, Next.js, MongoDB, Claude, n8n y más: el stack con el que llevo soluciones a producción, acelerado con IA.
          </p>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          style={{ y: windowY }}
          className="pointer-events-auto h-[56vh] w-[min(1040px,92vw)] border border-ink/25 bg-surface shadow-lift"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
            <span className="flex items-center gap-2 text-ink">
              <span className="h-2 w-2 bg-accent" />
              tu-producto.app
            </span>
            <span className="flex items-center gap-3 text-subtle" aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </span>
          </div>

          <div className="grid h-[calc(100%-45px)] sm:grid-cols-[210px_1fr]">
            <motion.aside
              style={{ opacity: sideOpacity }}
              className="hidden sm:block border-r border-dashed border-line p-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle mb-4">
                Stack
              </p>
              <ul className="space-y-1">
                {sidebar.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-3 border border-transparent px-2 py-2 text-sm text-ink first:border-line first:bg-paper"
                  >
                    <Logo icon={s.icon} className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{s.name}</span>
                    <span className="font-mono text-[10px] uppercase text-subtle">{s.role}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            <motion.div style={{ opacity: mainOpacity }} className="flex flex-col p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-heading text-2xl text-ink">Resumen</p>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  En producción
                </span>
              </div>
              <div className="grid grid-cols-3 border-t border-l border-line">
                {stats.map((s) => (
                  <div key={s.label} className="border-r border-b border-line p-3 sm:p-4">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-subtle">
                      {s.label}
                    </p>
                    <p className="font-heading text-3xl sm:text-4xl text-ink mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-1 items-end gap-1.5 border-b border-line min-h-0">
                {bars.map((h, i) => (
                  <Bar key={i} h={h} i={i} p={p} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
