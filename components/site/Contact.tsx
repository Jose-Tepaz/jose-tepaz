import { CALENDLY, LINKEDIN, navLinks } from '@/lib/site-content'
import { Reveal } from './ui'

export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <section id="contacto" data-theme="dark" data-section="contacto" className="sec sec-dark contact">
      <div className="contact-panel">

        <div className="contact-center">
          <Reveal as="h2" className="display huge">
            ¿Tienes un problema <span className="blue">por resolver?</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            Una llamada de 30 minutos basta para entender tu caso y decirte con honestidad si puedo ayudarte, y cómo.
          </Reveal>
          <Reveal delay={0.15} className="contact-actions">
            <a className="btn btn-blue" href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Agenda una llamada gratuita
            </a>
            <a className="t-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className="link-text">LinkedIn</span> <span className="t-arrow t-arrow--out" aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <Reveal as="p" className="contact-note" delay={0.2}>
            Sin compromisos. Si no soy la persona correcta para tu proyecto, te lo digo y te ayudo a encontrar quién sí lo es.
          </Reveal>
        </div>
      </div>

      <footer className="wrap foot">
        <span className="foot-logo">
          JT<i>.</i>
        </span>
        <nav aria-label="Pie de página">
          {[{ id: 'proceso', label: 'Proceso' }, ...navLinks.filter((l) => l.id === 'servicios' || l.id === 'sobre-mi'), { id: 'contacto', label: 'Contacto' }].map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <span className="mono">© {year} José Tepáz. Todos los derechos reservados.</span>
        <span className="mono foot-built">Diseñado y construido con Next.js & Tailwind CSS</span>
      </footer>
    </section>
  )
}
