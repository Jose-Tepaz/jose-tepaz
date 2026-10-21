'use client'

import { motion } from 'motion/react'
import { ease } from '@/components/motion'

type Shape = { solid: string[]; dashed: string[] }

const shapes: Shape[] = [
  {
    solid: [
      'M40 128 L100 98 L160 128 L100 158 Z',
      'M40 128 V140 L100 170 L160 140 V128',
      'M86 52 V122 M114 52 V122 M86 52 A14 6 0 0 1 114 52 A14 6 0 0 1 86 52 M86 122 A14 6 0 0 0 114 122',
    ],
    dashed: ['M100 98 V158 M70 113 L130 143 M130 113 L70 143'],
  },
  {
    solid: [
      'M100 60 L155 90 L155 148 L100 178 L45 148 L45 90 Z',
      'M45 90 L100 120 L155 90',
      'M86 34 A14 14 0 1 0 114 34 A14 14 0 1 0 86 34',
    ],
    dashed: ['M100 120 V178 M100 48 V120'],
  },
  {
    solid: [
      'M45 100 A55 55 0 1 0 155 100 A55 55 0 1 0 45 100',
      'M100 70 L126 85 L126 115 L100 130 L74 115 L74 85 Z',
    ],
    dashed: ['M100 45 V155 M45 100 H155', 'M74 85 L100 100 L126 85 M100 100 V130'],
  },
  {
    solid: [
      'M45 92 L100 64 L155 92 L100 120 Z',
      'M45 92 V104 L100 132 L155 104 V92',
      'M45 128 L100 100 L155 128 L100 156 Z',
      'M45 128 V140 L100 168 L155 140 V128',
    ],
    dashed: ['M100 64 V156 M100 120 V132'],
  },
]

export default function Iso({ variant }: { variant: number }) {
  const shape = shapes[variant % shapes.length]
  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="h-44 w-44 text-ink/45 transition-all duration-700 group-hover:text-accent group-hover:scale-105"
    >
      {shape.solid.map((d, i) => (
        <motion.path
          key={`s${i}`}
          d={d}
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
          transition={{ duration: 1.6, ease, delay: 0.2 + i * 0.15 }}
        />
      ))}
      {shape.dashed.map((d, i) => (
        <motion.path
          key={`d${i}`}
          d={d}
          strokeDasharray="4 4"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 0.8 } }}
          transition={{ duration: 1, ease, delay: 1.2 }}
        />
      ))}
    </motion.svg>
  )
}
