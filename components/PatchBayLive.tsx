'use client'

import { useEffect, useRef } from 'react'
import { buildUnit } from '@/components/iso/patchbay/unit.mjs'
import { needleAt } from '@/components/iso/patchbay/dynamic.mjs'
import { follow, settle, spring } from '@/components/iso/patchbay/motion.mjs'
import {
  CORDS,
  describe,
  levelOf,
  lampOf,
  sharesOf,
  tourAt,
} from '@/components/iso/patchbay/model.mjs'

const STILL = '(prefers-reduced-motion: reduce)'
const LONGEST_FRAME = 1 / 30
const RESUME = 3600
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

// Makes the server-drawn patch bay move. It renders nothing: it finds its figure and writes
// attributes straight onto it, so React never re-renders per frame.
export default function PatchBayLive() {
  const anchor = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = anchor.current?.closest<HTMLElement>('.pb')
    if (!root) return
    const units = [...Array(CORDS)].map((_, i) =>
      root.querySelector<SVGGElement>(`[data-unit="${i}"]`),
    )
    const needle = root.querySelector<SVGPathElement>('[data-part="needle"]')
    const leds = [...Array(CORDS)].map((_, i) =>
      root.querySelector<SVGGElement>(`[data-part="led${i}"] .iso-dots`),
    )
    const still = window.matchMedia(STILL)

    const s = {
      u: 0,
      target: 0,
      clock: 0,
      touring: !still.matches,
      needle: { at: 0, rate: 0 },
      lamp: { x: 0, v: 0 },
      drawn: [-1, -1, -1],
      text: '',
      level: -1,
    }
    let frame = 0
    let last = 0
    let visible = false
    let resume = 0

    const draw = () => {
      const shares = sharesOf(s.u)
      shares.forEach((share: number, i: number) => {
        if (Math.abs(share - s.drawn[i]) < 1e-4) return
        s.drawn[i] = share
        const unit = units[i]
        if (unit) unit.innerHTML = buildUnit(null, i, share)
        leds[i]?.setAttribute('data-tone', share >= 0.99 ? 'hi' : 'lo')
      })
      if (needle && Math.abs(s.needle.at - s.level) > 1e-4) {
        s.level = s.needle.at
        needle.setAttribute('d', needleAt(clamp(s.needle.at, 0, 1.04)))
      }
      root.style.setProperty('--lamp', s.lamp.x.toFixed(3))
      const text = describe(s.u)
      if (text !== s.text) {
        s.text = text
        root.setAttribute('aria-valuetext', text)
        root.setAttribute('aria-valuenow', String(Math.round(s.u)))
      }
    }

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, LONGEST_FRAME) : 1 / 60
      last = now
      const calm = still.matches
      if (s.touring) {
        s.clock += dt
        s.target = tourAt(s.clock)
      }
      s.u = follow(s.u, s.target, dt, 0.32, calm)
      const needleDone = spring(s.needle, levelOf(s.u), dt, 90, 11, calm)
      const lampMoving = settle(s.lamp, lampOf(s.u), dt, 0.5, calm)
      draw()
      const idle = !s.touring && s.u === s.target && needleDone && !lampMoving
      frame = visible && !idle ? requestAnimationFrame(tick) : 0
    }
    const run = () => {
      if (frame || !visible) return
      last = 0
      frame = requestAnimationFrame(tick)
    }
    const steer = (target: number) => {
      s.touring = false
      s.target = clamp(target, 0, CORDS)
      window.clearTimeout(resume)
      resume = window.setTimeout(() => {
        s.touring = !still.matches
        s.clock = 0
        run()
      }, RESUME)
      run()
    }

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect()
      steer(clamp(((event.clientX - box.left) / box.width - 0.18) / 0.64, 0, 1) * CORDS)
    }
    const onKey = (event: KeyboardEvent) => {
      const step =
        event.key === 'ArrowRight' || event.key === 'ArrowUp'
          ? 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
            ? -1
            : 0
      if (step) steer(Math.round(s.target) + step)
      else if (event.key === 'Home') steer(0)
      else if (event.key === 'End') steer(CORDS)
      else return
      event.preventDefault()
    }

    const watcher = new IntersectionObserver(
      (entries) => {
        visible = Boolean(entries[entries.length - 1]?.isIntersecting)
        if (visible) run()
      },
      { rootMargin: '120px 0px' },
    )
    watcher.observe(root)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerdown', onMove)
    root.addEventListener('keydown', onKey)
    // someone who asks for stillness gets the finished machine, lamp lit, and still moves it by hand
    if (still.matches) {
      s.target = CORDS
      s.u = CORDS
    }
    draw()

    return () => {
      window.clearTimeout(resume)
      cancelAnimationFrame(frame)
      watcher.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onMove)
      root.removeEventListener('keydown', onKey)
    }
  }, [])

  return <span ref={anchor} hidden />
}
