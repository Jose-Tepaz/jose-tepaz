import { clients } from '@/lib/site-content'

export default function Clients() {
  const row = Array.from({ length: 8 }).flatMap(() => clients)

  return (
    <section id="clientes" data-theme="dark" data-section="clientes" aria-label="Clientes" className="clients">
      <div className="wrap clients-in">
        <span className="clients-label">
          <i>[ ]</i> Han confiado en mí
        </span>
        <div className="clients-marquee">
          <div className="marquee-track">
            {row.map((c, i) => (
              <span key={i} aria-hidden={i >= clients.length || undefined}>
                {c} <b>•</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
