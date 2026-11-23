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

/** Cuánto hay que bajar (en alto de pantalla) para pasar al siguiente paso de una sección fija: un solo scroll. */
export const STEP_VH = 28

/**
 * Progreso (0–1) de una sección "pegajosa": 0 cuando su tope llega al borde superior,
 * 1 cuando termina de recorrerse. Devuelve también el índice activo para `count` pasos.
 *
 * Para no re-renderizar la sección en cada fotograma de scroll, `progress` solo se actualiza si
 * `continuous` es true (frase y pulso del proceso); en el resto solo cambia `active`, que varía
 * unas pocas veces en todo el recorrido.
 */
export function useStickyProgress(count: number, continuous = false) {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      if (continuous) setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p))
      const a = Math.min(count - 1, Math.floor(p * count))
      setActive((prev) => (prev === a ? prev : a))
    }
    // solo medir mientras la sección está cerca de la pantalla; al entrar o salir se ajusta una vez
    let near = true
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting
        if (!raf) raf = requestAnimationFrame(update)
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(el)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [count, continuous])

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    // en celular algunas secciones son estáticas: no hay a dónde saltar
    const pinned = el.querySelector('.sticky-in, .sticky-sec')
    if (pinned && getComputedStyle(pinned).position !== 'sticky') return
    const top = el.getBoundingClientRect().top + window.scrollY
    const total = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / count) * total, behavior: 'smooth' })
  }

  return { ref, progress, active, goTo }
}

/** Flecha que avisa (solo en celular) que la sección sigue cambiando al hacer scroll. */
export function ScrollHint({ show }: { show: boolean }) {
  return (
    <span className={`scroll-hint${show ? ' is-on' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </span>
  )
}
