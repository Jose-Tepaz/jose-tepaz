'use client'

import { useEffect, useState } from 'react'
import { CALENDLY, navLinks, sectionsIndex } from '@/lib/site-content'

/**
 * Elementos fijos de la página: barra superior, etiqueta vertical de sección,
 * botón flotante de menú y el menú a pantalla completa.
 * También fija el tema global (claro/oscuro) según la sección que cruza el 45% de la pantalla.
 */
export default function Chrome() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sectionsIndex[0])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const under = (x: number, y: number, sel: string) =>
        document
          .elementsFromPoint(x, y)
          .map((el) => el.closest<HTMLElement>(sel))
          .find(Boolean) ?? null
      // Tema global: manda la sección que cruza el 45% de la pantalla. Los colores de toda la
      // página se mezclan con una transición (ver :root en site.css).
      const sec = under(window.innerWidth / 2, window.innerHeight * 0.45, '[data-theme]')
      if (sec) document.documentElement.dataset.theme = sec.dataset.theme === 'light' ? 'light' : 'dark'

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
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <div className="chrome" data-chrome={open ? 'dark' : undefined}>
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="José Tepáz — inicio">
          José Tepáz <span className="brand-dots" aria-hidden="true"><i /><i /></span>
        </a>
        <span className="status">
          <span className="status-dot" aria-hidden="true" />
          Disponible para proyectos
        </span>
        <nav className="topnav" aria-label="Principal">
          {navLinks.filter((l) => l.id !== 'contacto').map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
          <button type="button" className="menu-pill" onClick={() => setOpen(true)} aria-haspopup="dialog">
            Menú <span className="brand-dots" aria-hidden="true"><i /><i /></span>
          </button>
        </nav>
      </header>

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

      <div className={`menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menú" aria-hidden={!open}>
        <button type="button" className="menu-close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Cerrar <span aria-hidden="true">✕</span>
        </button>
        <ol className="menu-list">
          {sectionsIndex.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span>{s.n}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        <a className="btn btn-blue menu-cta" href={CALENDLY} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
          Agenda una llamada
        </a>
      </div>
    </div>
  )
}
