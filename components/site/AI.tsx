import { aiCapabilities, aiFlow } from '@/lib/site-content'
import { Reveal, SecHead } from './ui'

export default function AI() {
  return (
    <section id="ia" data-theme="dark" data-section="ia" className="sec sec-dark ai">
      <div className="wrap">
        <SecHead n="07" label="IA Y AUTOMATIZACIÓN" note="Menos trabajo manual" />

        <Reveal as="h2" className="display big ai-title">
          Acelero cada etapa <span className="blue">con IA y automatización</span>
        </Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Integro herramientas de IA en tus procesos y en tu producto para que tu equipo entregue más, con menos trabajo manual.
        </Reveal>

        <Reveal className="flow" delay={0.1}>
          <div className="flow-head">
            <span>Ejemplo de flujo</span>
            <span>[ Automático ]</span>
          </div>
          <ol className="flow-list">
            {aiFlow.map((n, i) => (
              <li key={n.label} className={n.highlight ? 'is-ai' : ''} style={{ animationDelay: `${i * 1.5}s` }}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <strong>{n.label}</strong>
                <em>{n.detail}</em>
                {i < aiFlow.length - 1 && <i className="flow-arrow" aria-hidden="true">→</i>}
              </li>
            ))}
          </ol>
        </Reveal>

        <ol className="ai-grid">
          {aiCapabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.08} className="ai-card">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <ul className="chips">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
