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
    const under = (x: number, y: number, sel: string) =>
      document
        .elementsFromPoint(x, y)
        .map((el) => el.closest<HTMLElement>(sel))
        .find(Boolean) ?? null
    // Tema global: manda la sección que cruza el 45% de la pantalla. Los colores de toda la
    // página se mezclan con una transición (ver :root en site.css).
    const syncTheme = () => {
      const sec = under(window.innerWidth / 2, window.innerHeight * 0.45, '[data-theme]')
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
      let now = ''
      for (const l of navLinks) {
        if ((document.getElementById(l.id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.4) now = l.id
      }
      setCurrent(now)

      const cur = under(window.innerWidth / 2, window.innerHeight / 2, '[data-section]')
      if (cur) {
        const found = sectionsIndex.find((s) => s.id === cur.dataset.section)
        if (found) setActive((p) => (p.id === found.id ? p : found))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
            Hablemos <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <nav className={`jn-bottom${scrolled ? ' is-visible' : ''}`} aria-label="Navegación de secciones" aria-hidden={!scrolled} inert={!scrolled}>
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={current === l.id ? 'location' : undefined}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="sidelabel" aria-hidden="true">
        <span className="sidelabel-dot" />
        ({active.n}) {active.label}
      </div>

      <a className="fab" href={CALENDLY} target="_blank" rel="noopener noreferrer" aria-label="Agenda una llamada gratuita">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
          <path d="M8 2.5v4M16 2.5v4M3 10h18" />
        </svg>
        <span className="fab-label">Agenda una llamada</span>
      </a>
    </div>
  )
}
