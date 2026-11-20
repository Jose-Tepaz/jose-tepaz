import {
  P,
  S,
  L,
  ROWS,
  MOD_FACE,
  PORT_Z,
  JACK_A,
  JACK_B,
  SEAT_Z,
  PLUG_H,
  CORD_R,
  LIFT,
} from './layout.mjs'
import { group, k, G } from './parts.mjs'
import { tubePieces, tubeSvg } from '../tube.mjs'

export const CORD_START = MOD_FACE + 3

const smooth = (t) => t * t * (3 - 2 * t)

// share 0 is the plug parked beside the module, 1 is seated in its jack: it lifts, slides, lowers.
export function pose(share) {
  const s = Math.max(0, Math.min(1, share))
  return { x: JACK_A + (JACK_B - JACK_A) * smooth(s), lift: LIFT * Math.sin(Math.PI * s) }
}

export function route(i, share) {
  const { x, lift } = pose(share)
  const y = ROWS[i]
  const zp = PORT_Z[i]
  const top = SEAT_Z + lift + PLUG_H
  const high = Math.max(top + 14, zp + 18, 46)
  const out = CORD_START + 12
  return G.fillet(
    [
      [CORD_START, y, zp],
      [out, y, zp],
      [out, y, high],
      [x, y, high],
      [x, y, top],
    ],
    5,
    7,
    { P, tube: CORD_R },
  )
}

function plug(R, i, share) {
  const { x, lift } = pose(share)
  const y = ROWS[i]
  const z0 = SEAT_Z + lift
  const g = group(R, `plug${i}`)
  g.cyl('nose', x, y, 4.4, z0, 1.8, { tone: 'lo', steps: 18 })
  g.cyl('barrel', x, y, 3.4, z0 + 1.8, 4, { steps: 18, tone: 'hi' })
  g.cyl('grip', x, y, 4.3, z0 + 5.8, 4, { steps: 20, bevel: 0.3, tone: 'hi' })
  g.line(k.knurl(x, y, 4.3, z0 + 5.8, z0 + 9.8, 22, P), 'lo')
  g.cyl('upper', x, y, 3.4, z0 + 9.8, 3, { steps: 18, tone: 'hi' })
  g.turned(
    'boot',
    G.frameAlong([x, y, z0 + 12.8], [0, 0, 1]),
    [
      [0, 3.4],
      [5, 1.6],
    ],
    { tone: 'hi' },
  )
  g.line(k.sideArc(x, y, 3.4, z0 + 11.2, P, 14), 'faint')
  return g
}

// One cord with its plug: depth-sorted pieces, ready to draw. With a recorder every piece is
// recorded with its true shape (keys sit above the static art, which is always behind).
export function buildUnit(R, i, share, hold = false) {
  const items = []
  const g = plug(R, i, share)
  const { x, lift } = pose(share)
  const centre = [x, ROWS[i], SEAT_Z + lift + 8]
  const key = (p) => 1000 + i * 400 + k.depthOf(p, P)
  items.push({ key: key(centre), svg: g.markup() })
  if (R) g.put(centre, 0, { key: key(centre), name: `plug${i}.item` })
  const line = route(i, share)
  if (R) R.route(`cord${i}`, line, CORD_R, { owner: `cord${i}`, piece: `unit${i}`, limp: true })
  tubePieces(line, CORD_R, P, { maxLength: 26, spacing: 2 }).forEach((part, index) => {
    const svg = tubeSvg(part, { tone: 'hi' })
    items.push({ key: key(part.mid), svg })
    if (R)
      R.put({
        piece: `unit${i}`,
        key: key(part.mid),
        name: `cord${i}:${index}`,
        svg,
        shapes: [R.A.tube(part.points, part.radii)],
      })
  })
  return items
    .sort((a, b) => a.key - b.key)
    .map((item) => item.svg)
    .join('')
}
