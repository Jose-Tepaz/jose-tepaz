'use client'

import { useEffect, useState } from 'react'
import { CALENDLY, navLinks, sectionsIndex } from '@/lib/site-content'

/**
 * Elementos fijos: encabezado arriba (como josetepaz.com) y píldora inferior al hacer scroll,
 * etiqueta vertical de sección y botón flotante para agendar.
 * También fija el tema global (claro/oscuro) según la sección que cruza el 45% de la pantalla.
 */
export default function Chrome() {
  const [active, setActive] = useState(sectionsIndex[0])
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let raf = 0
    let raf2 = 0
    // Posiciones de las secciones, medidas una vez (y cuando cambia el tamaño), para no leer el
    // layout ni hacer hit-testing en cada fotograma de scroll.
    const secs = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    let tops: number[] = []
    let bottoms: number[] = []
    const measure = () => {
      const y = window.scrollY
      tops = secs.map((el) => el.getBoundingClientRect().top + y)
      bottoms = secs.map((el, i) => tops[i] + el.offsetHeight)
    }
    const at = (frac: number) => {
      const py = window.scrollY + window.innerHeight * frac
      for (let i = 0; i < secs.length; i++) if (py >= tops[i] && py < bottoms[i]) return secs[i]
      return null
    }
    // Tema global: manda la sección que cruza el 45% de la pantalla. Los colores de toda la
    // página se mezclan con una transición (ver :root en site.css).
    const syncTheme = () => {
      const sec = at(0.45)
      if (sec) document.documentElement.dataset.theme = sec.dataset.theme === 'light' ? 'light' : 'dark'
    }
    const update = () => {
      raf = 0
      syncTheme()
      // algunas secciones (p. ej. "Para quién trabajo") cambian su propio data-theme en este mismo fotograma
      cancelAnimationFrame(raf2)
      raf2 = requestAnimationFrame(syncTheme)

      // Encabezado arriba; al hacer scroll aparece la píldora inferior con la sección actual
      setScrolled(window.scrollY > 2)
      // la sección actual es la más cercana por encima del 40% de la pantalla (no la última de la lista)
      const line = window.scrollY + window.innerHeight * 0.4
      let now = ''
      let best = -Infinity
      for (const l of navLinks) {
        const i = secs.findIndex((el) => el.dataset.section === l.id)
        if (i >= 0 && tops[i] <= line && tops[i] > best) {
          best = tops[i]
          now = l.id
        }
      }
      setCurrent(now)

      const cur = at(0.5)
      if (cur) {
        const found = sectionsIndex.find((s) => s.id === cur.dataset.section)
        if (found) setActive((p) => (p.id === found.id ? p : found))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    // Las animaciones infinitas de una sección se pausan mientras la sección no se ve (ver site.css).
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.target as HTMLElement).toggleAttribute('data-offscreen', !e.isIntersecting)),
      { rootMargin: '10% 0px' },
    )
    secs.forEach((el) => io.observe(el))
    measure()
    update()
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="chrome">
      <header className={`jn-header${scrolled ? '' : ' is-visible'}`} aria-hidden={scrolled} inert={scrolled}>
        <a className="jn-logo" href="#inicio" aria-label="José Tepáz — inicio">
          <span className="jn-monogram">JT</span>
          <span className="jn-logotype">
            José Tepáz
            <span>Forward Deployed Engineer</span>
          </span>
        </a>
        <nav className="jn-nav" aria-label="Principal">
          {navLinks
            .filter((l) => l.id !== 'contacto')
            .map((l) => (
              <a key={l.id} href={`#${l.id}`}>
                {l.label}
              </a>
            ))}
          <a className="jn-contact" href="#contacto">
            Hablemos
          </a>
        </nav>
      </header>

      <nav className={`jn-bottom${scrolled ? ' is-visible' : ''}`} aria-label="Navegación de secciones" aria-hidden={!scrolled} inert={!scrolled}>
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={current === l.id ? 'location' : undefined}>
            {l.label}
          </a>
        ))}
        <a className="jn-cta" href={CALENDLY} target="_blank" rel="noopener noreferrer" aria-label="Agenda una llamada gratuita">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
            <path d="M8 2.5v4M16 2.5v4M3 10h18" />
          </svg>
          <span className="jn-cta-label">Llamada gratuita</span>
        </a>
      </nav>

      <div className="sidelabel" aria-hidden="true">
        <span className="sidelabel-dot" />
        ({active.n}) {active.label}
      </div>

    </div>
  )
}
