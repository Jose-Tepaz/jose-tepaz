import type { Metadata } from 'next'
import { Inter_Tight, Geist_Mono } from 'next/font/google'
import { MotionProvider, ScrollProgress } from '@/components/motion'
import { IntroProvider } from '@/components/intro-context'
import './globals.css'
import './studio-reference.css'
import './studio-adapter.css'

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'José Tepáz — Forward Deployed Engineer',
  description:
    'Me integro a tu equipo, entiendo el problema de negocio y construyo, integro y lanzo la solución en producción. Web apps, integraciones y e-commerce.',
  keywords: [
    'forward deployed engineer',
    'ingeniero de software',
    'integraciones',
    'inteligencia artificial',
    'automatización de procesos',
    'CI/CD',
    'despliegue de software',
    'web app',
    'ecommerce',
    'José Tepáz',
  ],
  authors: [{ name: 'José Tepáz', url: 'https://josetepaz.com' }],
  openGraph: {
    title: 'José Tepáz — Forward Deployed Engineer',
    description: 'Del problema a producción.',
    url: 'https://josetepaz.com',
    siteName: 'José Tepáz',
    locale: 'es_GT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Tepáz — Forward Deployed Engineer',
    description: 'Del problema a producción.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-body antialiased bg-paper text-ink">
        <MotionProvider>
          <IntroProvider>
            <ScrollProgress />
            <div className="relative overflow-x-clip">{children}</div>
          </IntroProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
