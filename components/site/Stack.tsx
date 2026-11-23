'use client'

import { useEffect, useRef, useState } from 'react'
import {
  siClaude, siFigma, siGithub, siMongodb, siN8n, siNextdotjs, siReact, siSupabase,
  siTailwindcss, siTypescript, siVercel, siZapier, type SimpleIcon,
} from 'simple-icons'
import { moreTools, tools } from '@/lib/site-content'
import { Reveal } from './ui'

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
  const items = useRef<(HTMLLIElement | null)[]>([])
  const t = tools[open]

  // La herramienta activa es la más cercana al centro de la pantalla (solo depende del scroll).
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let best = 0
      let bestD = Infinity
      items.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      setOpen(best)
    }
    // solo medir mientras la sección está cerca de la pantalla
    let near = true
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update)
    }
    const sec = items.current[0]?.closest('section')
    const io = sec
      ? new IntersectionObserver(
          ([e]) => {
            near = e.isIntersecting
            if (!raf) raf = requestAnimationFrame(update)
          },
          { rootMargin: '100% 0px' },
        )
      : null
    if (sec) io?.observe(sec)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="stack" data-theme="dark" data-section="stack" className="sec sec-dark stack">
      <div className="wrap">
        <Reveal as="h2" className="display big stack-title">De la herramienta al deploy.</Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Figma, Next.js, MongoDB, Claude, n8n y más: el stack con el que llevo soluciones a producción, acelerado con IA.
        </Reveal>

        <div className="stack-grid">
          <div className="stack-focus" aria-hidden="true">
            <div key={t.name} className="stack-focus-inner">
              <Logo k={t.key} className="stack-focus-logo" />
              <span className="stack-focus-name">{t.name}</span>
              <span className="stack-focus-role">
                {String(open + 1).padStart(2, '0')} · {t.role}
              </span>
            </div>
          </div>

          <div className="stack-history">
            <span className="stack-history-label mono">HERRAMIENTAS</span>
            <ol className="stack-list">
              {tools.map((x, i) => (
                <li
                  key={x.name}
                  data-i={i}
                  ref={(el) => {
                    items.current[i] = el
                  }}
                  className={i === open ? 'is-on' : ''}
                  onClick={() => items.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <span className="stack-dot" aria-hidden="true" />
                  <span className="stack-item-role">{x.role}</span>
                  <span className="stack-item-name">
                    <Logo k={x.key} className="stack-logo" />
                    {x.name}
                  </span>
                </li>
              ))}
            </ol>
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
