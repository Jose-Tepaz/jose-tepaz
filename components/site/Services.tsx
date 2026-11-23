'use client'

import type { CSSProperties } from 'react'
import { services } from '@/lib/site-content'
import Shape from './Shapes'
import { ScrollHint, useStickyProgress } from './ui'

export default function Services() {
  const { ref, active, goTo } = useStickyProgress(services.length)

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
          {/* escritorio: solo el servicio activo en dos columnas · móvil: los 4 como tarjetas */}
          {services.map((s, i) => (
            <article key={s.title} className={`svc${i === active ? ' is-active' : ''}`}>
              <div className="services-copy">
                <span className="svc-n mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display big">{s.title}</h2>
                <p className="lead">{s.description}</p>
                <ul className="chips chips-light">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="services-shape" aria-hidden="true">
                <Shape kind={s.shape} />
              </div>
            </article>
          ))}
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
