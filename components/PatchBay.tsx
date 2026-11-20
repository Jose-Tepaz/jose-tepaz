import { preload } from 'react-dom'
import './iso/patchbay/patchbay.css'
import { OVERLAY, SIZE, UNITS } from './iso/patchbay/rest.mjs'
import PatchBayLive from './PatchBayLive'

const LABEL =
  'A desk patch bay: three source modules (a stack of drives, a processor board and a bank of keys) each send a cord to a patch panel. As each plug seats in its jack the meter on the console rises, and when the third seats the console lamp lights.'

// The static art is public/patchbay.svg and the rest pose of what moves is rest.mjs, both written by
// node scripts/patchbay-build.mjs (plugs parked, lamp off). The client only animates it, so this
// file imports no geometry and works whether it is rendered on the server or inside a client page.
const GLOW = `<radialGradient id="pb-glow"><stop offset="0" stop-color="#fa3600" stop-opacity=".5"/><stop offset=".55" stop-color="#fa3600" stop-opacity=".16"/><stop offset="1" stop-color="#fa3600" stop-opacity="0"/></radialGradient>`
const [W, H] = SIZE
const CORDS = UNITS.length
const UNIT_GROUPS = UNITS.map((markup, i) => `<g data-unit="${i}">${markup}</g>`).join('')

export default function PatchBay({ className = '' }: { className?: string }) {
  preload('/patchbay.svg', { as: 'image', fetchPriority: 'high' })
  return (
    <div
      className={`pb pb-box ${className}`}
      tabIndex={0}
      role="slider"
      aria-label="Patch bay: move across it, or use the arrow keys, to plug the cords in one by one"
      aria-valuemin={0}
      aria-valuemax={CORDS}
      aria-valuenow={0}
      aria-valuetext={`0 of ${CORDS} cords connected`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="pb-art"
        src="/patchbay.svg"
        alt=""
        width={W}
        height={H}
        decoding="async"
        draggable={false}
      />
      <svg
        className="pb-live"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={LABEL}
        focusable="false"
      >
        <defs dangerouslySetInnerHTML={{ __html: GLOW }} />
        <g dangerouslySetInnerHTML={{ __html: OVERLAY }} />
        <g dangerouslySetInnerHTML={{ __html: UNIT_GROUPS }} />
      </svg>
      <PatchBayLive />
    </div>
  )
}
