'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/site-content'
import { ScrollHint, STEP_VH, useStickyProgress } from './ui'

export default function Work() {
  const { ref, active, goTo } = useStickyProgress(projects.length)
  const p = projects[active]
  const tilt = useRef<HTMLDivElement>(null)

  // El mockup se inclina un poco siguiendo el cursor dentro del panel
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tilt.current
    if (!el || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`)
  }
  const onLeave = () => {
    tilt.current?.style.setProperty('--ry', '0deg')
    tilt.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <section
      id="trabajo"
      data-theme="dark"
      data-section="trabajo"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: `${projects.length * STEP_VH + 100}vh` }}
    >
      <div className="sticky-in work-in">
        <div className="work-panel" onPointerMove={onMove} onPointerLeave={onLeave}>
          {projects.map((x, i) => (
            <div key={x.name} className={`work-bg ${i === active ? 'is-on' : ''}`} aria-hidden="true">
              <Image src={x.image} alt="" fill sizes="320px" quality={40} className="work-img" priority={i === 0} />
            </div>
          ))}

          <div className="work-grid">
            <div className="work-top">
              <span>
                (03) Trabajo selecto<span className="work-top-long"> · Proyectos que llegaron a producción</span>
              </span>
              <span className="mono">
                {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            <div className="work-info">
              <ol className="work-nav">
                {projects.map((x, i) => (
                  <li key={x.name}>
                    <button type="button" className={i === active ? 'is-on' : ''} onClick={() => goTo(i)}>
                      <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                      {x.name}
                    </button>
                  </li>
                ))}
              </ol>

              <div className="work-copy" key={p.name}>
                <h2 className="display work-title">{p.name}</h2>
                <p className="work-meta">{p.category}</p>
                <p className="work-text">{p.description}</p>
                <ul className="chips">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="work-also">En producción y usado por personas reales.</p>
              </div>
            </div>

            <div className="work-stage" aria-hidden="true">
              <div className="work-tilt" ref={tilt}>
                <div className="work-float">
                  {projects.map((x, i) => (
                    <figure key={x.name} className={`work-shot ${i === active ? 'is-on' : ''}`}>
                      <Image
                        src={x.image}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 55vw, 92vw"
                        className="work-shot-img"
                        priority={i === 0}
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollHint show={active < projects.length - 1} />
      </div>
    </section>
  )
}
