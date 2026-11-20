import { Reveal } from './ui'
import AICards from './AICards'

export default function AI() {
  return (
    <section id="ia" data-theme="dark" data-section="ia" className="sec sec-dark ai">
      <div className="wrap">

        <Reveal as="h2" className="display big ai-title">
          Acelero cada etapa <span className="blue">con IA y automatización</span>
        </Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Integro herramientas de IA en tus procesos y en tu producto para que tu equipo entregue más, con menos trabajo manual.
        </Reveal>

        <Reveal delay={0.1}>
          <AICards />
        </Reveal>
      </div>
    </section>
  )
}
