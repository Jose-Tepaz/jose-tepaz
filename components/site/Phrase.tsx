'use client'

import { phrase } from '@/lib/site-content'
import Smoke from './Smoke'
import { useStickyProgress } from './ui'

const words = [
  ...phrase.lead.split(' ').map((w) => ({ w, blue: false })),
  ...phrase.rest.split(' ').map((w) => ({ w, blue: true })),
]

/** La frase se enciende palabra por palabra con el scroll. */
export default function Phrase() {
  const { ref, progress } = useStickyProgress(1)

  return (
    <section
      id="propuesta"
      data-theme="dark"
      data-section="propuesta"
      ref={ref}
      className="sec sec-dark sticky-sec"
      style={{ height: '260vh' }}
    >
      <div className="sticky-in phrase-in">
        <Smoke className="smoke" strength={0.55} />
        <p className="display big phrase-text">
          {words.map((x, i) => {
            const start = 0.08 + (i / words.length) * 0.72
            const t = Math.min(1, Math.max(0, (progress - start) / 0.1))
            return (
              <span
                key={i}
                className={x.blue ? 'blue' : ''}
                style={{ opacity: 0.14 + 0.86 * t, transform: `translateY(${10 * (1 - t)}px)` }}
              >
                {x.w}{' '}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
