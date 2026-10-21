'use client'

import { useEffect } from 'react'
import { useIntro } from '@/components/intro-context'

const steps = [
  'Entender el problema',
  'Integrarme al equipo',
  'Diseñar la solución',
  'Construir e integrar',
  'Desplegar a producción',
  'Medir resultados',
]

// Retraso (s) con el que se enciende cada paso, alineado con la curva del contador
const stepDelays = [0, 0.6, 0.82, 1, 1.18, 1.4]

// La cortina (CSS) termina de subir a los 3.1s; después se retira del DOM
const TOTAL_MS = 3300

export default function Loader() {
  const { done, finish } = useIntro()

  useEffect(() => {
    if (done) return
    // El conteo y la cortina corren en CSS desde el primer paint. JS solo retira el
    // overlay y libera el scroll; si hidrató tarde, el tiempo ya transcurrido cuenta.
    const timer = setTimeout(finish, Math.max(0, TOTAL_MS - performance.now()))
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!done && (
        <div
          role="status"
          aria-label="Cargando"
          className="loader-overlay fixed inset-0 z-[100] bg-paper text-ink flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.16em]">
            <span>José Tepáz</span>
            <span className="text-muted text-right">
              Forward Deployed Engineer
              <br />
              Guatemala
            </span>
          </div>

          <ol className="font-mono text-xs sm:text-sm uppercase tracking-[0.12em] space-y-2">
            {steps.map((step, i) => (
              <li
                key={step}
                className="loader-step flex gap-4"
                style={{ animationDelay: `${stepDelays[i]}s` }}
              >
                <span className="loader-step-num">{String(i + 1).padStart(3, '0')}</span>
                {step}
              </li>
            ))}
          </ol>

          <div>
            <div className="flex items-end justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Cargando portafolio
              </span>
              <span className="font-heading text-8xl sm:text-9xl leading-none tabular-nums">
                <span className="loader-count" />
                <span className="text-accent text-5xl sm:text-6xl align-top">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-line">
              <div className="loader-bar h-px w-full bg-accent" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
