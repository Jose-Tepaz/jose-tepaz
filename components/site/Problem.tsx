import { problems } from '@/lib/site-content'
import Shape from './Shapes'
import { Reveal, SecHead } from './ui'

export default function Problem() {
  return (
    <section id="problema" data-theme="light" data-section="problema" className="sec sec-light problem">
      <div className="wrap">
        <SecHead n="04" label="EL PROBLEMA" note="Entre negocio y código" />

        <Reveal as="h2" className="display big problem-title">
          La mayoría de proyectos técnicos <span className="blue">se pierden entre negocio y código</span>
        </Reveal>
        <Reveal as="p" className="lead problem-lead" delay={0.1}>
          No es falta de talento. Es falta de alguien que entienda el problema del cliente y la tecnología, y lleve la solución hasta producción.
        </Reveal>

        <ol className="problem-grid">
          {problems.map((p, i) => (
            <Reveal as="li" key={p.label} delay={i * 0.08} className="problem-card">
              <div className="problem-fig">
                <Shape kind={p.shape} />
              </div>
              <span className="mono problem-tag">
                {String(i + 1).padStart(2, '0')} · {p.label}
              </span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
