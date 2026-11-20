'use client'

import { useEffect, useRef, useState } from 'react'
import {
  siClaude, siFigma, siGithub, siMongodb, siN8n, siNextdotjs, siReact, siSupabase,
  siTailwindcss, siTypescript, siVercel, siZapier, type SimpleIcon,
} from 'simple-icons'
import { moreTools, stackBars, stackStats, tools } from '@/lib/site-content'
import { Reveal, SecHead } from './ui'

const registry: Record<string, SimpleIcon> = {
  siClaude, siFigma, siGithub, siMongodb, siN8n, siNextdotjs, siReact, siSupabase,
  siTailwindcss, siTypescript, siVercel, siZapier,
}
const icon = (key: string) => registry[key]

function Logo({ k, className }: { k: string; className?: string }) {
  const i = icon(k)
  if (!i) return null
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={i.title} className={className}>
      <path d={i.path} fill="currentColor" />
    </svg>
  )
}

export default function Stack() {
  const [open, setOpen] = useState(0)
  const [shown, setShown] = useState(false)
  const card = useRef<HTMLDivElement>(null)
  const t = tools[open]

  useEffect(() => {
    const el = card.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="stack" data-theme="light" data-section="stack" className="sec sec-light stack">
      <div className="wrap">
        <SecHead n="09" label="STACK TECNOLÓGICO" note="Herramientas que domino" />
        <Reveal as="h2" className="display big stack-title">De la herramienta al deploy.</Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Figma, Next.js, MongoDB, Claude, n8n y más: el stack con el que llevo soluciones a producción, acelerado con IA.
        </Reveal>

        <div className="stack-grid">
          <ol className="stack-list">
            {tools.map((x, i) => (
              <li key={x.name}>
                <button
                  type="button"
                  className={i === open ? 'is-on' : ''}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                >
                  <Logo k={x.key} className="stack-logo" />
                  <span className="stack-name">{x.name}</span>
                  <span className="mono stack-role">{x.role}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="stack-card" ref={card}>
            <div className="stack-card-bar">
              <span><i className="dot" /> tu-producto.app</span>
              <span className="mono">— □ ×</span>
            </div>
            <div className="stack-card-head" key={t.name}>
              <Logo k={t.key} className="stack-big" />
              <div>
                <h3 className="display">{t.name}</h3>
                <span className="mono">{t.role}</span>
              </div>
              <span className="live mono"><i className="dot" /> En producción</span>
            </div>
            <dl className="stack-stats">
              {stackStats.map((s) => (
                <div key={s.label}>
                  <dt className="mono">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="stack-bars" aria-hidden="true">
              {stackBars.map((h, i) => (
                <span key={i} style={{ height: shown ? `${h}%` : '0%', transitionDelay: `${i * 60}ms` }} />
              ))}
            </div>
          </div>
        </div>

        <ul className="stack-strip" aria-label="Más herramientas">
          {[...tools.map((x) => x.key), ...moreTools].map((k) => (
            <li key={k}>
              <Logo k={k} className="stack-mini" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
