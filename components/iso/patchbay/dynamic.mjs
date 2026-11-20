import { METER, FACE_Y } from './layout.mjs'
import { pathOn } from './parts.mjs'

const RAD = Math.PI / 180

// The meter's needle at a level 0..1, drawn on the glass in the plane of the console face.
export function needleAt(level) {
  const [mx, mz] = METER
  const gy = FACE_Y + 1.9
  const a = (-46 + 92 * level) * RAD
  const pivot = [mx, gy, mz - 12]
  return pathOn([
    [pivot[0] - 3 * Math.sin(a), gy + 0.1, pivot[2] - 3 * Math.cos(a)],
    [pivot[0] + 21 * Math.sin(a), gy + 0.1, pivot[2] + 21 * Math.cos(a)],
  ])
}
