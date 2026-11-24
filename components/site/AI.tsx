'use client'

import { aiCapabilities } from '@/lib/site-content'
import AICards from './AICards'
import { ScrollHint, STEP_VH, useStickyProgress } from './ui'

/** La sección se queda fija y, al hacer scroll, las tarjetas se abren una por una. */
export default function AI() {
  const { ref, active, goTo, ready } = useStickyProgress(aiCapabilities.length, false, true)

  return (
    <section
      id="ia"
      data-theme="dark"
      data-section="ia"
      ref={ref}
      className={`sec sec-dark sticky-sec${ready ? '' : ' no-anim'}`}
      style={{ height: `${aiCapabilities.length * STEP_VH + 100}vh` }}
    >
      <div className="sticky-in ai-in">
        <div className="wrap">
          <h2 className="display big ai-title">
            Acelero cada etapa <span className="blue">con IA y automatización</span>
          </h2>
          <p className="lead">
            Integro IA en tus procesos y en tu producto para que tu equipo logre más con menos trabajo manual.
          </p>
          <AICards active={active} onSelect={goTo} />
        </div>
        <ScrollHint show={active < aiCapabilities.length - 1} />
      </div>
    </section>
  )
}
