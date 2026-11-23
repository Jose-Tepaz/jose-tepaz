'use client'

import type { CSSProperties } from 'react'
import { services } from '@/lib/site-content'
import Shape from './Shapes'
import { ScrollHint, useStickyProgress } from './ui'

export default function Services() {
  const { ref, active, goTo } = useStickyProgress(services.length)
  const s = services[active]

  return (
    <section
      id="servicios"
      data-theme="light"
      data-section="servicios"
      ref={ref}
      className="sec sec-light sticky-sec"
      style={{ height: `${services.length * 80 + 20}vh` }}
    >
      <div className="sticky-in services-in">
        <div className="wrap services-body">
          <div className="services-copy" key={s.title}>
            <p className="eyebrow">Trabajo embebido contigo: de entender el problema a mantener la solución viva.</p>
            <h2 className="display big">{s.title}</h2>
            <p className="lead">{s.description}</p>
            <ul className="chips chips-light">
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="services-shape" key={`${s.title}-shape`}>
            <Shape kind={s.shape} />
          </div>
        </div>

        <ol className="wrap tabs" style={{ '--cols': services.length } as CSSProperties}>
          {services.map((x, i) => (
            <li key={x.title}>
              <button type="button" className={`tab ${i === active ? 'is-on' : ''}`} onClick={() => goTo(i)}>
                <span className="tab-bar" />
                <span className="tab-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="tab-t">{x.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <ScrollHint show={active < services.length - 1} />
      </div>
    </section>
  )
}
