import { Linkedin, Instagram } from 'lucide-react'

const links = [
  { label: 'Proceso', href: '#proceso' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jose-tepaz-b84312145/',
    icon: Linkedin,
  }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <a
              href="#"
              className="font-heading font-bold text-xl text-zinc-50 hover:text-brand-light transition-colors cursor-pointer"
            >
              JT<span className="text-brand">.</span>
            </a>
            <p className="text-zinc-600 text-sm mt-1">
              De la idea al producto digital.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {social.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-zinc-800 hover:border-zinc-600 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-sm">
            © {year} José Tepáz. Todos los derechos reservados.
          </p>
          <p className="text-zinc-700 text-xs">
            Diseñado y construido con Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
