'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease } from '@/components/motion'

const links = [
  { label: 'Proceso', href: '#proceso' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre mí', href: '#sobre-mi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{ '--d': '0.1s' } as React.CSSProperties}
      className={cn(
        'intro-drop ',
        'fixed top-3 sm:top-7 inset-x-3 sm:inset-x-7 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-500',
        scrolled || open
          ? 'py-3 bg-paper/85 backdrop-blur-xl border-b border-line'
          : 'py-6 bg-transparent border-b border-transparent'
      )}
    >
      <div className="w-full px-4 sm:px-8 flex items-center justify-between">
        <a
          href="#"
          className="font-heading text-2xl tracking-tight text-ink"
          aria-label="José Tepáz — inicio"
        >
          JT<span className="text-accent">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-muted hover:text-ink transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contacto"
            className="inline-flex items-center px-5 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Hablemos
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 pt-6 pb-8 flex flex-col gap-5">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.08 * i + 0.1 }}
                  className="font-heading text-3xl text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center items-center px-5 py-3.5 bg-ink text-paper text-sm font-medium"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
