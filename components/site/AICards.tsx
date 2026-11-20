'use client'

import { useState } from 'react'
import { Bot, Workflow, Sparkles, Zap } from 'lucide-react'
import { aiCapabilities } from '@/lib/site-content'

const icons = [Bot, Workflow, Sparkles, Zap]

/** Acordeón horizontal: la tarjeta activa se expande y las demás muestran el título en vertical. */
export default function AICards() {
  const [active, setActive] = useState(0)
  return (
    <div className="aa-row" role="list">
      {aiCapabilities.map((c, i) => {
        const Icon = icons[i % icons.length]
        return (
          <article
            key={c.title}
            role="listitem"
            tabIndex={0}
            className={`aa-card${i === active ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="aa-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="aa-dot" aria-hidden="true" />
            <h3 className="aa-title">{c.title}</h3>
            <Icon className="aa-icon" strokeWidth={1} aria-hidden="true" />
            <div className="aa-body">
              <p className="aa-desc">{c.description}</p>
              <div className="aa-tags">
                {c.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
