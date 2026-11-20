import { audiences } from '@/lib/site-content'
import { Reveal, SecHead } from './ui'

export default function Audience() {
  return (
    <section id="audiencia" data-theme="dark" data-section="audiencia" className="sec sec-dark audience">
      <div className="wrap">
        <SecHead n="10" label="PARA QUIÉN TRABAJO" note="Quienes necesitan resultados reales" />
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
