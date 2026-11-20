'use client'

import { useEffect, useRef } from 'react'
import { audiences } from '@/lib/site-content'
import { Reveal } from './ui'

/** La sección pasa de negro a blanco a medida que sube por la pantalla (--p: 0 → 1). */
export default function Audience() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      // Empieza cuando el borde superior está al 90% de la pantalla y termina al 35%.
      const p = reduce ? (top < vh * 0.5 ? 1 : 0) : Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.55)))
      el.style.setProperty('--p', p.toFixed(3))
      el.dataset.theme = p > 0.5 ? 'light' : 'dark'
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={ref} id="audiencia" data-theme="dark" data-section="audiencia" className="sec audience audience-fade">
      <div className="wrap">
        <Reveal as="h2" className="display big">
          Hecho para quienes <span className="blue">necesitan resultados reales</span>
        </Reveal>

        <ol className="aud-list">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display">{a.title}</h3>
              <p>{a.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
