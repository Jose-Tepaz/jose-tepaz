'use client'

import Image from 'next/image'
import { clients } from '@/lib/content'

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className="flex items-center px-10 sm:px-14">
          {c.logo ? (
            <Image
              src={c.logo}
              alt={hidden ? '' : c.name}
              width={160}
              height={40}
              className="h-8 w-auto opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="font-heading text-3xl sm:text-4xl whitespace-nowrap text-ink/45 transition-colors duration-500 hover:text-ink">
              {c.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ClientsMarquee() {
  return (
    <section
      aria-label="Clientes"
      className="border-y border-line mx-6 sm:mx-[60px] grid lg:grid-cols-[240px_1fr]"
    >
      <div className="flex items-center px-0 lg:px-7 py-5 lg:border-r border-dashed border-line font-mono text-xs uppercase tracking-[0.14em]">
        <span className="text-accent mr-3">[ ]</span>
        <span>Han confiado en mí</span>
      </div>
      <div className="marquee group relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
          <Row hidden />
          <Row hidden />
        </div>
      </div>
    </section>
  )
}
