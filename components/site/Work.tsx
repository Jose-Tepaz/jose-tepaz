'use client'

import Image from 'next/image'
import { projects } from '@/lib/site-content'
import { useStickyProgress } from './ui'

export default function Work() {
  const { ref, active, goTo } = useStickyProgress(projects.length)
  const p = projects[active]

  return (
    <section
      id="trabajo"
      data-theme="dark"
      data-section="trabajo"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: `${projects.length * 85 + 15}vh` }}
    >
      <div className="sticky-in work-in">
        {projects.map((x, i) => (
          <div key={x.name} className={`work-bg ${i === active ? 'is-on' : ''}`} aria-hidden="true">
            <Image src={x.image} alt="" fill sizes="100vw" className="work-img" priority={i === 0} />
          </div>
        ))}
        <div className="work-halftone" aria-hidden="true" />

        <div className="wrap work-grid">
          <div className="work-top">
            <span>(02) Trabajo selecto · Proyectos que llegaron a producción</span>
            <span className="mono">
              {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <h2 className="display huge work-title" key={p.name}>
            {p.name}
          </h2>

          <div className="work-side" key={`${p.name}-side`}>
            <p className="work-meta">{p.category}</p>
            <p className="work-text">{p.description}</p>
            <ul className="chips">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="work-also">Software real, en producción y usado por personas reales.</p>
          </div>

          <ol className="work-dots">
            {projects.map((x, i) => (
              <li key={x.name}>
                <button type="button" className={i === active ? 'is-on' : ''} onClick={() => goTo(i)} aria-label={x.name} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
