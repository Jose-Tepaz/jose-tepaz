'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** Aparece (fade + sube) la primera vez que entra al viewport. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'p' | 'h2' | 'h3' | 'li' | 'span'
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const T = Tag as 'div'
  return (
    <T
      ref={ref as never}
      className={`rv ${shown ? 'rv-in' : ''} ${className}`}
      style={{ '--rv-d': `${delay}s` } as CSSProperties}
    >
      {children}
    </T>
  )
}

/**
 * Progreso (0–1) de una sección "pegajosa": 0 cuando su tope llega al borde superior,
 * 1 cuando termina de recorrerse. Devuelve también el índice activo para `count` pasos.
 */
export function useStickyProgress(count: number) {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const active = Math.min(count - 1, Math.floor(progress * count))

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const total = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / count) * total, behavior: 'smooth' })
  }

  return { ref, progress, active, goTo }
}

/** Cabecera de sección: (nn) ETIQUETA ........ nota */
export function SecHead({ n, label, note }: { n: string; label: string; note?: string }) {
  return (
    <div className="sechead">
      <span className="sechead-n">({n})</span>
      <span className="sechead-l">{label}</span>
      {note && <span className="sechead-note">{note}</span>}
    </div>
  )
}
