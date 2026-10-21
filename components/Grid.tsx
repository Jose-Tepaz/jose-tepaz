'use client'

import type { ReactNode } from 'react'
import { Eyebrow, MaskLines, Reveal, Stagger, StaggerItem } from '@/components/motion'

export const sectionX = 'px-6 sm:px-[60px]'

export function SectionHeader({
  index,
  eyebrow,
  lines,
  children,
}: {
  index: string
  eyebrow: string
  lines: ReactNode[]
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
      <div>
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl text-ink">
          <MaskLines lines={lines} />
        </h2>
      </div>
      {children && (
        <Reveal delay={0.15} className="max-w-md">
          <p className="text-muted text-lg leading-relaxed">{children}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Grid({ cols, children }: { cols: string; children: ReactNode }) {
  return (
    <Stagger className={`grid ${cols} border-t border-l border-line`}>{children}</Stagger>
  )
}

export function Cell({
  label,
  index,
  children,
}: {
  label: string
  index: number
  children: ReactNode
}) {
  return (
    <StaggerItem className="flex flex-col border-r border-b border-line">
      <div className="group relative flex flex-1 flex-col transition-colors duration-500 hover:bg-surface">
        <span className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
        <div className="flex items-center justify-between px-7 py-4 border-b border-dashed border-line font-mono text-xs uppercase tracking-[0.14em] text-ink">
          <span>{label}</span>
          <span className="text-subtle transition-colors duration-500 group-hover:text-accent">
            [{String(index).padStart(2, '0')}]
          </span>
        </div>
        {children}
      </div>
    </StaggerItem>
  )
}
