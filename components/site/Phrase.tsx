'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { phrase } from '@/lib/site-content'
import { useStickyProgress } from './ui'

const words = [
  ...phrase.lead.split(' ').map((w) => ({ w, blue: false })),
  ...phrase.rest.split(' ').map((w) => ({ w, blue: true })),
]

/** La frase se enciende palabra por palabra con el scroll. */
export default function Phrase() {
  const { ref, progress } = useStickyProgress(1, true)
  // Móvil: la sección no queda fija; el avance depende de dónde está en la pantalla (null = escritorio).
  const [mobileProgress, setMobileProgress] = useState<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!mq.matches || !el) {
        setMobileProgress(null)
        return
      }
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 cuando el tope llega al 50% de la pantalla (justo cuando el fondo cambia a oscuro);
      // 1 cuando el fondo de la sección llega al 35%.
      const p = (vh * 0.5 - r.top) / (vh * 0.15 + r.height)
      setMobileProgress(Math.round(Math.min(1, Math.max(0, p)) * 500) / 500)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  const pr = mobileProgress ?? progress

  return (
    <section
      id="propuesta"
      data-theme="dark"
      data-section="propuesta"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: '260vh' }}
    >
      <div className="sticky-in phrase-in">
        <p className="display big phrase-text">
          {words.map((x, i) => {
            const start = 0.08 + (i / words.length) * 0.72
            const t = Math.min(1, Math.max(0, (pr - start) / 0.1))
            const opacity = 0.14 + 0.86 * t
            return (
              <span
                key={i}
                className={x.blue ? 'blue' : ''}
                // --wo / --wt los usa mobile.css (en móvil la frase no queda fija)
                style={{ opacity, transform: `translateY(${10 * (1 - t)}px)`, '--wo': opacity, '--wt': t } as CSSProperties}
              >
                {x.w}{' '}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
