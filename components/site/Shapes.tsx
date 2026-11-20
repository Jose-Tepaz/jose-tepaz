/**
 * Ilustraciones de línea (tinta + azul de marca) con animación propia en CSS (clases `sh-*` en site.css).
 * El trazo principal usa `currentColor`, así que sigue el tema claro/oscuro.
 */
export type ShapeKind =
  | 'cube' | 'nodes' | 'rocket' | 'stack'
  | 'gap' | 'misfit' | 'islands' | 'stuck'

const BLUE = '#0080ff'
const ink = { stroke: 'currentColor', strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
const accent = { stroke: BLUE, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
const soft = 'color-mix(in srgb, currentColor 7%, transparent)'
const softer = 'color-mix(in srgb, currentColor 13%, transparent)'
const tint = 'rgba(0,128,255,.14)'
const hair = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', opacity: 0.3 } as const

export default function Shape({ kind, className = 'shape' }: { kind: ShapeKind; className?: string }) {
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 300 300" fill="none" className={`${className} sh`} aria-hidden="true">
      {children}
    </svg>
  )

  switch (kind) {
    case 'cube': // solución a la medida: un cubo que se arma y se abre
      return svg(
        <>
          <ellipse cx="150" cy="282" rx="78" ry="9" fill="currentColor" opacity=".08" className="sh-shadow" />
          <g className="sh-float">
            <path d="M50 96 L150 151 L150 266 L50 211 Z" fill={soft} {...ink} />
            <path d="M250 96 L150 151 L150 266 L250 211 Z" fill={softer} {...ink} />
            <path d="M70 124 L130 157 M70 150 L130 183 M70 176 L130 209" {...hair} />
            <circle cx="205" cy="190" r="6" {...hair} />
            <path d="M178 160 L228 132" {...hair} />
            <g className="sh-lift">
              <path d="M150 41 L250 96 L150 151 L50 96 Z" fill={tint} {...accent} />
              <path d="M150 70 L200 96 L150 123 L100 96 Z" {...hair} stroke={BLUE} opacity=".6" />
            </g>
          </g>
          <g {...accent} strokeWidth={3}>
            <path d="M262 52 v14 M255 59 h14" className="sh-spark" />
            <path d="M38 40 v10 M33 45 h10" className="sh-spark sh-d2" />
          </g>
        </>,
      )
    case 'nodes': // integración: un hub que recibe y envía datos
      return svg(
        <>
          {[[62, 62], [238, 62], [62, 238], [238, 238]].map(([x, y]) => (
            <path key={`l${x}${y}`} d={`M150 150 L${x} ${y}`} {...ink} strokeWidth={3} opacity={0.25} />
          ))}
          {[[62, 62], [238, 62], [62, 238], [238, 238]].map(([x, y], i) => (
            <path key={`f${x}${y}`} d={`M150 150 L${x} ${y}`} {...accent} strokeWidth={3} className={`sh-flow sh-d${i}`} />
          ))}
          <circle cx="150" cy="150" r="30" className="sh-pulse" {...accent} strokeWidth={2} />
          <circle cx="150" cy="150" r="30" fill={tint} {...accent} />
          <circle cx="150" cy="150" r="9" fill={BLUE} />
          {[[62, 62], [238, 62], [62, 238], [238, 238]].map(([x, y], i) => (
            <g key={`n${x}${y}`} className={`sh-bob sh-d${i}`}>
              <circle cx={x} cy={y} r="22" fill={soft} {...ink} />
              <circle cx={x} cy={y} r="6" fill="currentColor" />
            </g>
          ))}
        </>,
      )
    case 'rocket': // despliegue: despegue con llama y líneas de velocidad
      return svg(
        <>
          <g className="sh-streaks" {...hair} strokeWidth={3} opacity={0.35}>
            <path d="M70 70 v26" className="sh-streak" />
            <path d="M232 52 v34" className="sh-streak sh-d2" />
            <path d="M52 168 v22" className="sh-streak sh-d1" />
            <path d="M250 160 v26" className="sh-streak sh-d3" />
          </g>
          <g className="sh-rocket">
            <path d="M150 28 C200 62 214 128 196 196 H104 C86 128 100 62 150 28 Z" fill={soft} {...ink} />
            <path d="M104 160 L66 214 L112 202 M196 160 L234 214 L188 202" fill={softer} {...ink} />
            <circle cx="150" cy="110" r="24" fill={tint} {...accent} />
            <path d="M138 108 q12 -14 24 0" {...hair} stroke={BLUE} opacity={0.7} />
            <path d="M122 196 h56 l-8 18 h-40 Z" fill={softer} {...ink} />
            <g className="sh-flame">
              <path d="M138 218 q12 46 24 0 q-12 12 -24 0 Z" fill={BLUE} stroke={BLUE} strokeWidth={3} strokeLinejoin="round" />
              <path d="M144 218 q6 24 12 0" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
            </g>
          </g>
        </>,
      )
    case 'stack': // liderazgo técnico: capas que se coordinan
      return svg(
        <>
          <g className="sh-layer sh-l3">
            <path d="M40 206 L150 262 L260 206 L150 150 Z" fill={soft} {...ink} />
            <path d="M92 212 L150 241 L208 212" {...hair} />
          </g>
          <g className="sh-layer sh-l2">
            <path d="M40 160 L150 216 L260 160 L150 104 Z" fill={tint} {...accent} />
            <circle cx="150" cy="160" r="9" fill={BLUE} />
          </g>
          <g className="sh-layer sh-l1">
            <path d="M40 114 L150 170 L260 114 L150 58 Z" fill={softer} {...ink} />
            <path d="M92 114 L150 143 L208 114" {...hair} />
          </g>
          <path d="M150 40 v-14 M142 33 h16" {...accent} strokeWidth={3} className="sh-spark" />
        </>,
      )
    case 'gap': // brecha: dos mundos que no se tocan
      return svg(
        <>
          <g className="sh-bob">
            <rect x="20" y="76" width="96" height="148" rx="16" fill={soft} {...ink} />
            <path d="M40 106 h48 M40 130 h60 M40 154 h36" {...ink} strokeWidth={4} opacity={0.55} />
            <rect x="38" y="178" width="34" height="26" rx="6" fill="currentColor" opacity={0.18} />
          </g>
          <g className="sh-bob sh-d2">
            <rect x="184" y="76" width="96" height="148" rx="16" fill={softer} {...ink} />
            <path d="M206 112 l-14 14 l14 14 M258 112 l14 14 l-14 14" {...accent} />
            <path d="M232 106 l-10 40" {...accent} strokeWidth={3} />
            <rect x="206" y="174" width="52" height="8" rx="4" fill="currentColor" opacity={0.22} />
          </g>
          <path d="M124 150 H176" {...ink} strokeDasharray="3 9" opacity={0.4} />
          <circle cx="124" cy="150" r="9" fill={BLUE} className="sh-gapdot" />
          <path d="M154 134 l8 8 m0 -8 l-8 8" {...accent} strokeWidth={3} className="sh-blink" transform="translate(-4 8)" />
        </>,
      )
    case 'misfit': // genérico: una pieza que no encaja
      return svg(
        <>
          <circle cx="198" cy="196" r="52" {...accent} strokeDasharray="2 10" className="sh-hole" />
          <circle cx="198" cy="196" r="38" fill={tint} stroke="none" />
          <g className="sh-try">
            <rect x="52" y="64" width="92" height="92" rx="12" fill={softer} {...ink} />
            <path d="M74 92 h48 M74 112 h32" {...hair} />
          </g>
          <path d="M236 70 l18 18 m0 -18 l-18 18" {...accent} strokeWidth={4} className="sh-blink" />
        </>,
      )
    case 'islands': // aislado: sistemas flotando sin conexión
      return svg(
        <>
          <path d="M96 92 L138 120 M190 128 L160 150 M130 200 L150 172" {...ink} strokeDasharray="2 12" opacity={0.5} className="sh-blink" />
          <g className="sh-bob">
            <circle cx="76" cy="76" r="34" fill={soft} {...ink} />
            <path d="M62 76 h28 M76 62 v28" {...hair} />
            <circle cx="76" cy="76" r="8" fill="currentColor" />
          </g>
          <g className="sh-bob sh-d2">
            <circle cx="226" cy="100" r="30" fill={tint} {...accent} />
            <circle cx="226" cy="100" r="8" fill={BLUE} />
          </g>
          <g className="sh-bob sh-d1">
            <circle cx="120" cy="222" r="32" fill={softer} {...ink} />
            <path d="M104 222 h32" {...hair} />
            <circle cx="120" cy="222" r="8" fill="currentColor" />
          </g>
          <path d="M240 232 l14 14 m0 -14 l-14 14" {...accent} strokeWidth={3} className="sh-blink sh-d2" />
        </>,
      )
    default: // 'stuck': el prototipo que casi llega a producción
      return svg(
        <>
          <path d="M30 258 H270" {...ink} />
          <path d="M60 258 V212 H116 V166 H172 V120 H228 V74" fill="none" {...ink} />
          <path d="M60 212 H116 V258 H60 Z M116 166 H172 V258 H116 Z M172 120 H228 V258 H172 Z" fill={soft} stroke="none" />
          <path d="M228 74 h28" {...accent} strokeDasharray="3 8" />
          <path d="M240 42 v32 M240 42 l22 8 l-22 8" {...accent} strokeWidth={3} />
          <g className="sh-climb">
            <circle cx="88" cy="190" r="15" fill={BLUE} stroke={BLUE} />
          </g>
          <path d="M84 188 q4 -5 8 0" stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" className="sh-climb" />
        </>,
      )
  }
}
