/** Figuras de línea en negro + azul de marca. `currentColor` es el trazo principal. */
export type ShapeKind =
  | 'cube' | 'nodes' | 'rocket' | 'stack'
  | 'gap' | 'misfit' | 'islands' | 'stuck'

const base = { fill: 'none', strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

export default function Shape({ kind, className = 'shape' }: { kind: ShapeKind; className?: string }) {
  const ink = { ...base, stroke: 'currentColor' }
  const blue = { ...base, stroke: '#0080ff', className: 'draw' }
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      {children}
    </svg>
  )

  switch (kind) {
    case 'cube':
      return svg(
        <>
          <path {...ink} d="M150 30 L260 90 V210 L150 270 L40 210 V90 Z" />
          <path {...blue} d="M40 90 L150 150 L260 90" />
          <path {...ink} d="M150 150 V270" />
        </>,
      )
    case 'nodes':
      return svg(
        <>
          <path {...ink} d="M60 70 L150 150 L240 70 M150 150 L60 230 M150 150 L240 230" />
          <circle {...blue} cx="150" cy="150" r="26" />
          {[[60, 70], [240, 70], [60, 230], [240, 230]].map(([x, y]) => (
            <circle key={`${x}${y}`} {...ink} cx={x} cy={y} r="18" />
          ))}
        </>,
      )
    case 'rocket':
      return svg(
        <>
          <path {...ink} d="M150 30 C205 70 215 150 195 215 H105 C85 150 95 70 150 30 Z" />
          <circle {...blue} cx="150" cy="115" r="22" />
          <path {...ink} d="M105 190 L65 235 L110 225 M195 190 L235 235 L190 225" />
          <path {...blue} d="M130 245 V275 M150 245 V285 M170 245 V275" />
        </>,
      )
    case 'stack':
      return svg(
        <>
          <path {...ink} d="M40 110 L150 55 L260 110 L150 165 Z" />
          <path {...blue} d="M40 155 L150 210 L260 155" />
          <path {...ink} d="M40 200 L150 255 L260 200" />
        </>,
      )
    case 'gap': // negocio y técnica separados por una brecha
      return svg(
        <>
          <rect {...ink} x="25" y="90" width="95" height="120" rx="8" />
          <rect {...ink} x="180" y="90" width="95" height="120" rx="8" />
          <path {...blue} d="M135 150 H165" />
          <path {...blue} d="M135 120 V180 M165 120 V180" />
        </>,
      )
    case 'misfit': // pieza genérica que no encaja
      return svg(
        <>
          <rect {...ink} x="60" y="60" width="120" height="120" rx="6" />
          <circle {...blue} cx="190" cy="205" r="48" />
        </>,
      )
    case 'islands': // nodos sueltos
      return svg(
        <>
          <circle {...ink} cx="70" cy="80" r="24" />
          <circle {...ink} cx="225" cy="110" r="24" />
          <circle {...ink} cx="110" cy="220" r="24" />
          <path {...blue} d="M96 90 L120 100 M205 128 L190 145 M120 196 L130 175" strokeDasharray="2 14" />
        </>,
      )
    default: // 'stuck': prototipo que nunca sale
      return svg(
        <>
          <path {...ink} d="M40 250 H260" />
          <path {...ink} d="M70 250 V200 H130 V150 H190 V100" />
          <circle {...blue} cx="215" cy="85" r="22" />
          <path {...blue} d="M190 100 L200 90" />
        </>,
      )
  }
}
