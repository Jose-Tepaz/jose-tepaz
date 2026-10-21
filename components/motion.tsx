'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react'
import { useIntroDone } from '@/components/intro-context'

export const ease = [0.22, 1, 0.36, 1] as const

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent z-[60]"
    />
  )
}

/** Fade + rise + de-blur when entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

/** Each line slides up from behind a mask. */
export function MaskLines({
  lines,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const introDone = useIntroDone()
  const trigger = immediate
    ? { animate: { y: introDone ? '0%' : '110%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-80px' } }
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.12em] -my-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            {...trigger}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** startAt: ms desde que cargó la página; el conteo espera hasta ese momento. */
export function Counter({
  to,
  suffix = '',
  startAt = 0,
}: {
  to: number
  suffix?: string
  startAt?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, to, {
      duration: 1.8,
      delay: Math.max(0, startAt - performance.now()) / 1000,
      ease,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, startAt])

  return <span ref={ref}>{`0${suffix}`}</span>
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] uppercase text-muted mb-6">
      <span className="text-accent tabular-nums">[{index}]</span>
      <span aria-hidden="true" className="h-px w-8 bg-line" />
      {children}
    </p>
  )
}
