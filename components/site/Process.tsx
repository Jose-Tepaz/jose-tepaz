'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { steps } from '@/lib/site-content'
import { useStickyProgress } from './ui'

const PULSE =
  'M0 120 H110 L128 104 L146 120 H200 L216 150 L246 12 L276 208 L294 120 H356 L372 104 L388 120 H452 L470 96 L488 120 H600'

export default function Process() {
  const { ref, progress, active, goTo } = useStickyProgress(steps.length)
  const path = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const [dot, setDot] = useState({ x: 0, y: 120 })
  const p = Math.min(1, progress * 1.05)

  useEffect(() => {
    if (path.current) setLen(path.current.getTotalLength())
  }, [])

  useEffect(() => {
    if (!path.current || !len) return
    const pt = path.current.getPointAtLength(len * p)
    setDot({ x: pt.x, y: pt.y })
  }, [p, len])

  return (
    <section
      id="proceso"
      data-theme="dark"
      data-section="proceso"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: `${steps.length * 80 + 20}vh` }}
    >
      <div className="sticky-in process-in">
        <div className="wrap process-top">
          <svg viewBox="0 0 600 240" className="pulse" aria-hidden="true">
            <path d={PULSE} className="pulse-ghost" />
            <path
              ref={path}
              d={PULSE}
              className="pulse-line"
              style={{ strokeDasharray: len || 2000, strokeDashoffset: len ? len * (1 - p) : 2000 }}
            />
            <circle cx={dot.x} cy={dot.y} r="9" className="pulse-dot" />
          </svg>
          <div>
            <p className="eyebrow">(05) Mi proceso</p>
            <h2 className="display big">
              Cómo llevo tu problema <span className="blue">hasta producción</span>
            </h2>
            <p className="lead process-lead">
              Embebido en tu equipo, con entregas continuas y visibilidad total en cada etapa.
            </p>
          </div>
        </div>

        <ol className="wrap tabs tabs-text" style={{ '--cols': steps.length } as CSSProperties}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <button type="button" className={`tab ${i <= active ? 'is-on' : ''} ${i === active ? 'is-cur' : ''}`} onClick={() => goTo(i)}>
                <span className="tab-bar" />
                <span className="tab-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="tab-t">{s.title}</span>
                <span className="tab-d">{s.text}</span>
                <span className="tab-tags">{s.tags.join(' · ')}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
