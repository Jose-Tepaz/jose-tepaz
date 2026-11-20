'use client'

import { aiCapabilities } from '@/lib/site-content'
import AICards from './AICards'
import { useStickyProgress } from './ui'

/** La sección se queda fija y, al hacer scroll, las tarjetas se abren una por una. */
export default function AI() {
  const { ref, active, goTo } = useStickyProgress(aiCapabilities.length)

  return (
    <section
      id="ia"
      data-theme="dark"
      data-section="ia"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: `${aiCapabilities.length * 90 + 30}vh` }}
    >
      <div className="sticky-in ai-in">
        <div className="wrap">
          <h2 className="display big ai-title">
            Acelero cada etapa <span className="blue">con IA y automatización</span>
          </h2>
          <p className="lead">
            Integro herramientas de IA en tus procesos y en tu producto para que tu equipo entregue más, con menos trabajo manual.
          </p>
          <AICards active={active} onSelect={goTo} />
        </div>
      </div>
    </section>
  )
}
