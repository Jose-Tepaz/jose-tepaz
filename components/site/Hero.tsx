'use client'

import { useEffect, useState } from 'react'
import { CALENDLY } from '@/lib/site-content'

function Globe() {
  return (
    <svg viewBox="0 0 100 100" className="globe" aria-hidden="true">
      <g className="globe-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="50" cy="50" r="46" />
        <ellipse cx="50" cy="50" rx="46" ry="16" />
        <ellipse cx="50" cy="50" rx="46" ry="32" />
        <ellipse cx="50" cy="50" rx="16" ry="46" />
        <ellipse cx="50" cy="50" rx="32" ry="46" />
        <line x1="50" y1="4" x2="50" y2="96" />
      </g>
      <circle cx="38" cy="58" r="3" fill="#0080ff" />
      <circle cx="38" cy="58" r="6" fill="none" stroke="#0080ff" strokeWidth="0.8" className="globe-ping" />
    </svg>
  )
}

export default function Hero() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('es', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Guatemala',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" data-theme="dark" data-section="inicio" className="hero">
      <div className="hero-in">
      <div className="hero-copy">
        <h1 className="display">
          <span className="line"><span>Desarrollo productos</span></span>
          <span className="line"><span>digitales para empresas</span></span>
          <span className="line"><span className="blue">de alto nivel</span></span>
        </h1>
        <div className="hero-row">
        <p className="hero-sub">
          Me integro a tu operación para entender a fondo cómo funciona tu negocio y crear soluciones digitales que resuelvan problemas, mejoren procesos y aporten valor.
        </p>
        <div className="hero-cta">
          <a className="btn btn-blue" href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Agenda una llamada gratuita
          </a>
          <a className="t-link" href="#trabajo">
            <span className="link-text">Ver proyectos</span> <span className="t-arrow" aria-hidden="true">↘</span>
          </a>
        </div>
        </div>
      </div>

      <div className="hero-loc">
        <Globe />
        <div>
          <strong>Guatemala</strong>
          <span className="mono">{time || '--:--'}</span>
          <span>Forward Deployed Engineer</span>
        </div>
      </div>
      </div>
    </section>
  )
}
