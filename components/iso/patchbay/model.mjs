// The patch bay's model, pure and DOM-free: three cords, each plugged in as progress crosses its
// share of the way. The lamp lights only when every cord is seated, and the meter reads how much of
// the signal has got through.
export const CORDS = 3

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const smooth = (t) => t * t * (3 - 2 * t)

/** Where each plug is on its way from parked (0) to seated (1), for progress u in 0..3. */
export const sharesOf = (u) => Array.from({ length: CORDS }, (_, i) => clamp(u - i, 0, 1))

/** How many cords are fully seated. */
export const seatedOf = (u) => sharesOf(u).filter((share) => share >= 0.99).length

/** The signal that has got through: a third per cord, as each one seats. */
export const levelOf = (u) => sharesOf(u).reduce((sum, share) => sum + smooth(share), 0) / CORDS

/** The lamp's target: lit only when the last cord is home. */
export const lampOf = (u) => smooth(clamp((u - 2.6) / 0.4, 0, 1))

export const describe = (u) => {
  const n = seatedOf(u)
  return n === CORDS
    ? 'All three cords connected: the lamp is lit'
    : `${n} of ${CORDS} cords connected`
}

// The idle tour: plug each cord in turn, hold the lit lamp, then pull them all out and begin again.
const TOUR = [
  [0, 0],
  [1.6, 0],
  [1.6, 1],
  [3.4, 1],
  [3.4, 2],
  [5.2, 2],
  [5.2, 3],
  [10.4, 3],
  [10.4, 0],
  [13.4, 0],
]
export const TOUR_LENGTH = TOUR[TOUR.length - 1][0]

export function tourAt(clock) {
  const t = clock % TOUR_LENGTH
  let target = 0
  for (const [at, to] of TOUR) if (t >= at) target = to
  return target
}
