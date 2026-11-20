'use client'

import { useEffect, useRef } from 'react'

/**
 * Retrato punteado: convierte la foto en puntos blancos sobre fondo transparente.
 * Lo oscuro de la foto (cabello, camiseta, lentes) se vuelve denso; el fondo claro desaparece.
 * Los puntos se apartan del cursor y regresan solos.
 */
export default function DotPortrait({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = new Image()
    let raf = 0
    let dead = false
    let visible = true
    const mouse = { x: -999, y: -999 }

    type Dot = { x: number; y: number; ox: number; oy: number; r: number; a: number }
    let dots: Dot[] = []
    let W = 0
    let H = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.round(rect.width)
      H = Math.round(rect.height)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // muestreo de la foto, ajustada con "cover" al lienzo
      const gap = W < 420 ? 5 : 6
      const cols = Math.floor(W / gap)
      const rows = Math.floor(H / gap)
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d', { willReadFrequently: true })!
      const scale = Math.max(cols / img.width, rows / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      octx.drawImage(img, (cols - dw) / 2, (rows - dh) * 0.12, dw, dh)
      const data = octx.getImageData(0, 0, cols, rows).data

      dots = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
          const dark = 1 - lum
          // vignette: el borde del lienzo se desvanece
          const nx = x / cols - 0.5
          const ny = y / rows - 0.5
          const v = Math.max(0, 1 - Math.pow(Math.hypot(nx * 1.7, ny * 1.35), 2.4))
          const d = Math.max(0, dark - 0.12) * 1.25 * v
          if (d < 0.05) continue
          const jitter = (Math.random() - 0.5) * gap * 0.55
          const px = x * gap + gap / 2 + jitter
          const py = y * gap + gap / 2 + jitter
          dots.push({ x: px, y: py, ox: px, oy: py, r: 0.5 + d * 1.5, a: Math.min(1, 0.25 + d) })
        }
      }
    }

    const draw = () => {
      if (!visible) return
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#ffffff'
      const R = 70
      for (const d of dots) {
        if (!reduced) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < R) {
            const f = (1 - dist / R) * 6
            d.x += (dx / (dist || 1)) * f
            d.y += (dy / (dist || 1)) * f
          }
          d.x += (d.ox - d.x) * 0.08
          d.y += (d.oy - d.y) * 0.08
        }
        ctx.globalAlpha = d.a
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduced && !dead) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(draw)
      }
    })
    io.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }

    const start = () => {
      if (dead) return
      cancelAnimationFrame(raf)
      build()
      draw()
    }

    img.onload = start
    img.src = src
    const onLeave = () => {
      mouse.x = -999
      mouse.y = -999
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    const ro = new ResizeObserver(() => img.complete && start())
    ro.observe(canvas)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [src])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
