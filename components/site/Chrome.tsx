'use client'

import { useEffect, useState } from 'react'
import { CALENDLY, navLinks, sectionsIndex } from '@/lib/site-content'

/**
 * Elementos fijos de la página: barra superior (como josetepaz.com) y píldora inferior al hacer scroll, etiqueta vertical de sección,
 * botón flotante de menú y el menú a pantalla completa.
 * El tema (claro/oscuro) sigue a la sección que está bajo la barra.
 */
export default function Chrome() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [active, setActive] = useState(sectionsIndex[0])
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const under = (x: number, y: number, sel: string) =>
        document
          .elementsFromPoint(x, y)
          .map((el) => el.closest<HTMLElement>(sel))
          .find(Boolean) ?? null
      const sec = under(window.innerWidth / 2, 36, '[data-theme]')
      if (sec) setTheme(sec.dataset.theme === 'light' ? 'light' : 'dark')

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
    <div className="chrome" data-chrome={open ? 'dark' : theme}>
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

      <button type="button" className="fab" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
        <span className={`fab-bars ${open ? 'is-open' : ''}`}>
          <i />
          <i />
        </span>
      </button>

      <div className={`menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menú" aria-hidden={!open}>
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
