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
/** Alto de scroll (vh) que ocupa cada paso en Trabajo selecto e IA: más alto = hay que desplazar más para pasar al siguiente. */
export const STEP_VH = 50
/** Tiempo mínimo (ms) que se muestra cada paso antes de pasar al siguiente, aunque el scroll sea muy brusco. */
const PACE_MS = 900

/**
 * Progreso (0–1) de una sección "pegajosa": 0 cuando su tope llega al borde superior,
 * 1 cuando termina de recorrerse. Devuelve también el índice activo para `count` pasos.
 *
 * Para no re-renderizar la sección en cada fotograma de scroll, `progress` solo se actualiza si
 * `continuous` es true (frase y pulso del proceso); en el resto solo cambia `active`, que varía
 * unas pocas veces en todo el recorrido.
 */
export function useStickyProgress(count: number, continuous = false, paced = false) {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  // false hasta que se hizo la primera medición y se pintó: así el estado inicial (p. ej. al recargar a mitad de la sección)
  // se coloca de golpe, sin animar un cruce entre tarjetas.
  const [ready, setReady] = useState(false)
  const freeUntil = useRef(0)   // hasta cuándo un clic en una tarjeta puede saltar directo a su paso

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    // Modo "paced": el paso activo cambia SOLO cuando el usuario hace scroll, de uno en uno (nunca se salta ninguno) y con un
    // tiempo mínimo entre cambios. No hay temporizadores: si dejas de hacer scroll, nada se sigue abriendo solo.
    let shown = -1
    let lastChange = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      if (continuous) setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p))
      const a = Math.min(count - 1, Math.floor(p * count))
      if (!paced) {
        setActive((prev) => (prev === a ? prev : a))
        return
      }
      const now = performance.now()
      if (shown < 0 || now < freeUntil.current) {
        // primera medición o salto pedido por un clic (goTo): se coloca directo
        if (shown !== a) {
          shown = a
          lastChange = now
          setActive(a)
        }
        return
      }
      if (a !== shown && now - lastChange >= PACE_MS) {
        shown = Math.min(count - 1, Math.max(0, shown + (a > shown ? 1 : -1)))
        lastChange = now
        setActive(shown)
      }
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
    let r1 = 0
    let r2 = 0
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setReady(true)) })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [count, continuous, paced])

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    // en celular algunas secciones son estáticas: no hay a dónde saltar
    const pinned = el.querySelector('.sticky-in, .sticky-sec')
    if (pinned && getComputedStyle(pinned).position !== 'sticky') return
    const top = el.getBoundingClientRect().top + window.scrollY
    const total = el.offsetHeight - window.innerHeight
    freeUntil.current = performance.now() + 1500
    window.scrollTo({ top: top + ((i + 0.5) / count) * total, behavior: 'smooth' })
  }

  return { ref, progress, active, goTo, ready }
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
