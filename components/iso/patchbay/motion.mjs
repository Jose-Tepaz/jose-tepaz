// Calm, time-based motion: exponential follow, a sub-stepped spring and a critically damped settle.
export function follow(current, target, dt, seconds, calm = false) {
  if (calm) return target
  const next = current + (target - current) * (1 - Math.exp(-dt / seconds))
  return Math.abs(target - next) < 1e-3 ? target : next
}

/** state = { at, rate }; returns true once settled on target. */
export function spring(state, target, dt, stiffness, damping, calm = false) {
  const drag = calm ? 2 * Math.sqrt(stiffness) : damping
  const steps = Math.max(Math.ceil(dt * 240), 1)
  const slice = dt / steps
  for (let step = 0; step < steps; step++) {
    state.rate += (target - state.at) * stiffness * slice - state.rate * drag * slice
    state.at += state.rate * slice
  }
  if (Math.abs(target - state.at) < 5e-4 && Math.abs(state.rate) < 5e-4) {
    state.at = target
    state.rate = 0
  }
  return state.at === target && state.rate === 0
}

/** state = { x, v }; critically damped, never overshoots; returns true while still moving. */
export function settle(state, target, dt, seconds, calm = false) {
  if (calm) {
    state.x = target
    state.v = 0
    return false
  }
  const w = 1 / seconds
  const slice = dt / 4
  for (let step = 0; step < 4; step++) {
    state.v += (w * w * (target - state.x) - 2 * w * state.v) * slice
    state.x += state.v * slice
  }
  if (Math.abs(target - state.x) < 1e-4 && Math.abs(state.v) < 1e-4) {
    state.x = target
    state.v = 0
    return false
  }
  return true
}
