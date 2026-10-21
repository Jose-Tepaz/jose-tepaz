'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

const lead = 'Para eso existo yo.'.split(' ')
const rest = 'El puente que se integra a tu equipo y lleva la solución del problema a producción.'.split(' ')
const words = [
  ...lead.map((w) => ({ w, accent: false })),
  ...rest.map((w) => ({ w, accent: true })),
]

function Word({
  word,
  accent,
  index,
  total,
  progress,
}: {
  word: string
  accent: boolean
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = 0.08 + (index / total) * 0.72
  const opacity = useTransform(progress, [start, start + 0.1], [0.14, 1])
  const y = useTransform(progress, [start, start + 0.1], [10, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${accent ? 'text-accent' : 'text-ink'}`}
    >
      {word}
    </motion.span>
  )
}

export default function ScrollPhrase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <p className="font-heading text-4xl sm:text-5xl lg:text-6xl max-w-5xl text-center">
          {words.map((item, i) => (
            <Word
              key={i}
              word={item.w}
              accent={item.accent}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </div>
  )
}
