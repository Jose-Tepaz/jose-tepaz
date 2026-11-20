'use client'

import { useEffect, useRef } from 'react'

const figures = {
  brecha: () => import('@/lib/hairline/figures/brecha'),
  generico: () => import('@/lib/hairline/figures/generico'),
  aislado: () => import('@/lib/hairline/figures/aislado'),
  estancado: () => import('@/lib/hairline/figures/estancado'),
  entrega: () => import('@/lib/hairline/figures/entrega'),
  ladrillos: () => import('@/lib/hairline/figures/ladrillos'),
}

export type HairlineName = keyof typeof figures

type Spec = {
  name: string
  means: string
  range: [number, number, number]
  tour?: ([number, number] | null)[]
  mount: (
    host: {
      stage: HTMLElement
      svg: SVGElement
      read: { textContent: string }
    },
    value: number,
  ) => { set: (v: number) => void; destroy: () => void }
}

export default function HairlineFigure({
  name,
  loop = false,
  className = 'w-[340px] max-w-full',
}: {
  name: HairlineName
  /** Un puntero invisible recorre la figura en bucle y le cede el control al mouse. */
  loop?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current
    if (!stage) return
    let dead = false
    let destroy = () => {}

    Promise.all([import('@/lib/hairline/kernel'), figures[name]()]).then(
      ([{ default: HL }, { default: define }]) => {
        if (dead) return
        let spec: Spec | null = null
        define(HL, (s: Spec) => {
          spec = s
        })
        if (!spec) return
        const fig: Spec = spec
        HL.inject(document)
        stage.setAttribute('data-hairline', fig.name)
        stage.setAttribute('role', 'img')
        stage.setAttribute('aria-label', fig.means)
        const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage)
        const handle = fig.mount({ stage, svg, read: { textContent: '' } }, fig.range[1])
        const lap = loop ? HL.tour(stage, fig.tour ?? HL.LAP, () => {}) : null
        destroy = () => {
          lap?.stop()
          handle.destroy()
        }
      },
    )

    return () => {
      dead = true
      destroy()
    }
  }, [name, loop])

  return (
    <div
      ref={ref}
      className={`${className} [--hairline-plate:#f7f8fa] [--hairline-hi:#0080ff] [--hairline-edge:#647080] [--hairline-mid:#BDBDB4] [--hairline-lo:#D8D8CF] group-hover:[--hairline-plate:#ffffff]`}
    />
  )
}
