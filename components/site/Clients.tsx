import { clients } from '@/lib/site-content'
import StippleMarquee from './StippleMarquee'

/**
 * Nombres de clientes en un marquee gigante hecho de puntos, como en la referencia.
 * Es una tira de partículas que reacciona al cursor y al sentido del scroll.
 */
export default function Clients() {
  return (
    <section id="clientes" data-theme="dark" data-section="clientes" aria-label="Clientes" className="clients">
      <p className="wrap clients-label">
        <i>[ ]</i> Han confiado en mí
      </p>
      <StippleMarquee names={clients} />
      <ul className="visually-hidden">
        {clients.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}
