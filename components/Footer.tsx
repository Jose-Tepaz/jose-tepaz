import { Linkedin } from 'lucide-react'

const links = [
  { label: 'Proceso', href: '#proceso' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jose-tepaz-b84312145/',
    icon: Linkedin,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line py-14 px-6 sm:px-[60px]">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a href="#" className="font-heading text-3xl text-ink">
              JT<span className="text-accent">.</span>
            </a>
            <p className="text-muted text-sm mt-1">Del problema a producción.</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-ink text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {social.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 border border-line hover:border-ink hover:bg-ink hover:text-white flex items-center justify-center text-muted transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-sm">© {year} José Tepáz. Todos los derechos reservados.</p>
          <p className="text-subtle text-xs">Diseñado y construido con Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
