'use client'

import { useEffect, useRef } from 'react'

type Stat = { value: string; label: string }

// Parámetros de la animación
const DOT = 5.5 // tamaño de la cuadrícula, en % del tamaño de fuente
const SPRING = 0.14
const DAMPING = 0.74
const REPEL_RADIUS = 70
const REPEL_FORCE = 9
const STAGGER = 0.06
const TAIL = 0.4
const ENTER: [number, number] = [0.98, 0.66] // posición del bloque (top / alto de pantalla) al formarse
const EXIT: [number, number] = [0.22, -0.08] // ... y al deshacerse hacia arriba

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => t * t * (3 - 2 * t)
const phase = (t: number, delay: number) => clamp((t - delay) / (1 - TAIL))

type Dot = {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  n: number
  size: number
  sx: number
  below: number
  above: number
  seed: number
}

/**
 * Cifras hechas de puntos: al entrar en pantalla los puntos suben desde abajo y forman los números;
 * al salir por arriba se dispersan. Se apartan del cursor y regresan solos.
 * El texto real queda en el DOM (transparente) para lectores de pantalla y para cuando no hay JS.
 */
export default function DotFigures({ stats }: { stats: Stat[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = wrap.current
    const cv = canvas.current
    if (!root || !cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let dots: Dot[] = []
    let W = 0
    let H = 0
    let count = 1
    let items: HTMLElement[] = []
    let lastK: number[] = []
    let raf = 0
    let running = false
    let dead = false
    const mouse = { x: -9999, y: -9999 }

    const build = () => {
      const R = root.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = R.width
      H = R.height
      cv.width = W * dpr
      cv.height = 3 * H * dpr
      cv.style.top = `${-H}px`
      cv.style.height = `${3 * H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, H * dpr)

      const nums = [...root.querySelectorAll<HTMLElement>('.about-num')]
      items = [...root.querySelectorAll<HTMLElement>('.about-stat')]
      count = nums.length
      lastK = items.map(() => -1)
      dots = []
      if (!nums.length) return

      const g = Math.max(3, Math.round((parseFloat(getComputedStyle(nums[0]).fontSize) / 100) * DOT))

      nums.forEach((el, n) => {
        const rect = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        const pad = Math.ceil(parseFloat(cs.fontSize) * 0.3)
        const off = document.createElement('canvas')
        off.width = Math.ceil(rect.width) + pad * 2
        off.height = Math.ceil(rect.height) + pad * 2
        const o = off.getContext('2d', { willReadFrequently: true })
        const text = el.firstChild
        if (!o || !text || text.nodeType !== Node.TEXT_NODE) return
        o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
        o.textBaseline = 'alphabetic'
        o.fillStyle = '#000'
        const m = o.measureText('0')
        const base = (rect.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent
        const str = (text as Text).data
        for (let k = 0; k < str.length; k++) {
          const r = document.createRange()
          r.setStart(text, k)
          r.setEnd(text, k + 1)
          const cr = r.getBoundingClientRect()
          o.fillText(str[k], cr.left - Math.round(rect.left) + pad, base + (rect.top - Math.round(rect.top)) + pad)
        }
        const { data } = o.getImageData(0, 0, off.width, off.height)
        const ox = Math.round(rect.left - R.left) - pad
        const oy = Math.round(rect.top - R.top) - pad
        const sx0 = (g - (((ox % g) + g) % g)) % g
        const sy0 = (g - (((oy % g) + g) % g)) % g
        for (let y = sy0; y < off.height; y += g) {
          for (let x = sx0; x < off.width; x += g) {
            if (data[(y * off.width + x) * 4 + 3] < 128) continue
            const tx = ox + x
            const ty = oy + y
            dots.push({
              tx, ty, x: tx, y: ty + H, vx: 0, vy: 0, n,
              size: g * 0.74,
              sx: Math.random() * W,
              below: H * (0.6 + Math.random() * 0.9),
              above: -H * (0.4 + Math.random() * 0.9),
              seed: Math.random(),
            })
          }
        }
      })
    }

    const frame = () => {
      raf = 0
      if (dead || !running) return
      const R = root.getBoundingClientRect()
      const vh = window.innerHeight
      if (R.bottom >= -H && R.top <= vh * 1.2) {
        const I = R.top / vh
        const leaving = I < EXIT[0]

        items.forEach((el, k) => {
          const t = leaving
            ? phase(clamp((I - EXIT[1]) / (EXIT[0] - EXIT[1])), (count - 1 - k) * STAGGER * 0.5)
            : phase(clamp((ENTER[0] - I) / (ENTER[0] - ENTER[1])), k * STAGGER + 0.08)
          const v = smooth(t)
          if (Math.abs(v - lastK[k]) < 0.004) return
          lastK[k] = v
          el.style.setProperty('--k', v.toFixed(3))
          el.style.setProperty('--away', leaving ? '-1' : '1')
        })

        const mx = mouse.x - R.left
        const my = mouse.y - R.top
        ctx.clearRect(0, -H, W, 3 * H)
        ctx.fillStyle = getComputedStyle(root).color
        const path = new Path2D()
        for (const d of dots) {
          const enter = smooth(phase(clamp((ENTER[0] - I) / (ENTER[0] - ENTER[1])), d.n * STAGGER + d.seed * 0.08))
          const exit = smooth(phase(clamp((I - EXIT[1]) / (EXIT[0] - EXIT[1])), (count - 1 - d.n) * STAGGER * 0.5 + d.seed * 0.08))
          const p = leaving ? exit : enter
          const from = leaving ? d.above : d.below
          const gx = d.sx + (d.tx - d.sx) * p
          const gy = from + (d.ty - from) * p
          d.vx += (gx - d.x) * SPRING
          d.vy += (gy - d.y) * SPRING
          const dx = d.x - mx
          const dy = d.y - my
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const f = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_FORCE
            d.vx += (dx / dist) * f
            d.vy += (dy / dist) * f
          }
          d.vx *= DAMPING
          d.vy *= DAMPING
          d.x += d.vx
          d.y += d.vy
          if (p < 0.002) continue
          const r = (d.size / 2) * (0.35 + 0.65 * p)
          path.moveTo(d.x + r * 2, d.y + r)
          path.arc(d.x + r, d.y + r, r, 0, Math.PI * 2)
        }
        ctx.fill(path)
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || dead) return
      running = true
      raf = requestAnimationFrame(frame)
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

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '100% 0px' })
    const ro = new ResizeObserver(() => !dead && build())

    document.fonts.ready.then(() => {
      if (dead) return
      build()
      root.classList.add('has-dot-figures')
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      ro.observe(root)
      io.observe(root)
    })

    return () => {
      dead = true
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      root.classList.remove('has-dot-figures')
      items.forEach((el) => el.style.removeProperty('--k'))
    }
  }, [stats])

  return (
    <div ref={wrap} className="about-stats-wrap">
      <dl className="about-stats">
        {stats.map((s) => (
          <div key={s.label} className="about-stat">
            <dt>
              <span className="about-num">{s.value}</span>
            </dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
      <canvas ref={canvas} className="dot-figures" aria-hidden="true" />
    </div>
  )
}
