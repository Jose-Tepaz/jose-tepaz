'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  tx: number // posición de reposo dentro de la tira de texto
  ty: number
  dx: number // desplazamiento por el cursor
  dy: number
  vx: number
  vy: number
  r: number
  blue: boolean
}

const SPEED = 60 // px por segundo
const AREA_PER_DOT = 9 // px² de letra por cada punto
const REPEL_RADIUS = 110
const REPEL_FORCE = 12
const SPRING = 0.1
const DAMPING = 0.82

/**
 * Marquee de texto hecho de puntos al azar. Se desplaza solo, cambia de dirección según hacia
 * dónde se haga scroll, y los puntos se apartan del cursor y regresan. Lee el color del tema.
 */
export default function StippleMarquee({ names }: { names: string[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = wrap.current
    const cv = canvas.current
    if (!root || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let runW = 1
    let parts: Particle[] = []
    let offset = 0
    let dir = -1
    let lastY = window.scrollY
    let last = 0
    let raf = 0
    let running = false
    let dead = false
    let building = false
    const mouse = { x: -9999, y: -9999 }

    const build = async () => {
      if (building) return
      building = true
      try {
        await document.fonts.ready
        if (dead) return
        await buildOnce()
      } finally {
        building = false
      }
    }

    const buildOnce = async () => {
      const rect = root.getBoundingClientRect()
      W = Math.round(rect.width)
      const F = Math.min(224, Math.max(80, W * 0.15))
      H = Math.round(F * 1.25)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = W * dpr
      cv.height = H * dpr
      cv.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cs = getComputedStyle(root)
      const font = `800 ${F}px ${cs.fontFamily}`
      const m = document.createElement('canvas')
      const mc = m.getContext('2d', { willReadFrequently: true })
      if (!mc) return
      mc.font = font
      if ('letterSpacing' in mc) (mc as unknown as { letterSpacing: string }).letterSpacing = `${(-0.055 * F).toFixed(2)}px`
      const once = names.map((n) => `${n} •`).join(' ') + ' '
      const reps = Math.max(1, Math.ceil((W * 1.6) / Math.max(1, mc.measureText(once).width)))
      const text = once.repeat(reps)
      runW = Math.ceil(mc.measureText(text).width)

      // al cambiar el tamaño del lienzo se reinicia el contexto: se vuelve a configurar
      m.width = runW
      m.height = H
      mc.font = font
      if ('letterSpacing' in mc) (mc as unknown as { letterSpacing: string }).letterSpacing = `${(-0.055 * F).toFixed(2)}px`
      mc.textBaseline = 'alphabetic'
      mc.fillStyle = '#000'
      mc.fillText(text, 0, H * 0.8)
      const { data } = mc.getImageData(0, 0, runW, H)

      let area = 0
      for (let i = 3; i < data.length; i += 4) if (data[i] > 128) area++
      const count = Math.min(40000, Math.round(area / AREA_PER_DOT))
      const list: Particle[] = []
      let guard = count * 60
      while (list.length < count && guard-- > 0) {
        const x = Math.floor(Math.random() * runW)
        const y = Math.floor(Math.random() * H)
        if (data[(y * runW + x) * 4 + 3] <= 128) continue
        list.push({
          tx: x + Math.random(),
          ty: y + Math.random(),
          dx: 0, dy: 0, vx: 0, vy: 0,
          r: 0.55 + Math.random() * 0.7,
          blue: Math.random() < 0.035,
        })
      }
      parts = list
      if (reduced) frame(performance.now())
    }

    const frame = (now: number) => {
      raf = 0
      if (dead) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      if (!reduced) offset += dir * SPEED * dt
      offset %= runW || 1

      const rect = root.getBoundingClientRect()
      const mx = mouse.x - rect.left
      const my = mouse.y - rect.top
      const near = my > -REPEL_RADIUS && my < H + REPEL_RADIUS

      ctx.clearRect(0, 0, W, H)
      const plain = new Path2D()
      const blue = new Path2D()
      for (const p of parts) {
        const x = (((p.tx + offset) % runW) + runW) % runW
        const showA = x < W + 20
        const showB = x - runW > -20
        if (!showA && !showB) continue

        // El cursor empuja los puntos y estos regresan solos
        const px = (showA ? x : x - runW) + p.dx
        const py = p.ty + p.dy
        p.vx -= p.dx * SPRING
        p.vy -= p.dy * SPRING
        if (near && !reduced) {
          const ex = px - mx
          const ey = py - my
          const dist = Math.hypot(ex, ey)
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const f = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_FORCE
            p.vx += (ex / dist) * f
            p.vy += (ey / dist) * f
          }
        }
        p.vx *= DAMPING
        p.vy *= DAMPING
        p.dx += p.vx
        p.dy += p.vy

        const path = p.blue ? blue : plain
        if (showA) {
          const cx = x + p.dx
          path.moveTo(cx + p.r, py)
          path.arc(cx, py, p.r, 0, Math.PI * 2)
        }
        if (showB) {
          const cx = x - runW + p.dx
          path.moveTo(cx + p.r, py)
          path.arc(cx, py, p.r, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = getComputedStyle(root).color
      ctx.fill(plain)
      ctx.fillStyle = '#0080ff'
      ctx.fill(blue)
      if (running && !reduced) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || dead) return
      running = true
      last = performance.now()
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
    }
    const onScroll = () => {
      const y = window.scrollY
      if (y !== lastY) {
        dir = y > lastY ? -1 : 1
        lastY = y
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => !dead && build(), 150)
    })
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '20% 0px' })

    build()
    ro.observe(root)
    io.observe(root)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      dead = true
      stop()
      clearTimeout(resizeTimer)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [names])

  return (
    <div ref={wrap} className="stipple-marquee" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  )
}
