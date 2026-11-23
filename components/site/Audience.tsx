import { audiences } from '@/lib/site-content'
import { Reveal } from './ui'

/** Sección clara: el cambio de negro a blanco lo hace el tema global (ver Chrome y :root en site.css). */
export default function Audience() {
  return (
    <section id="audiencia" data-theme="light" data-section="audiencia" className="sec sec-light audience">
      <div className="wrap">
        <Reveal as="h2" className="display big">
          Hecho para quienes <span className="blue">necesitan resultados reales</span>
        </Reveal>

        <ol className="aud-list">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display">{a.title}</h3>
              <p>{a.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
