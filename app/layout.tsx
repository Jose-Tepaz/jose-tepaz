import type { Metadata } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import MouseGlow from '@/components/MouseGlow'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'José Tepáz — Consultor de Proyectos Digitales',
  description:
    'Orquesto diseño, desarrollo y estrategia para llevar tu idea al producto digital que tus usuarios van a usar. Web apps, mobile, ecommerce y UX.',
  keywords: [
    'consultor digital',
    'desarrollo web',
    'web app',
    'app mobile',
    'UX design',
    'ecommerce',
    'proyectos digitales',
    'José Tepáz',
  ],
  authors: [{ name: 'José Tepáz', url: 'https://josetepaz.com' }],
  openGraph: {
    title: 'José Tepáz — Consultor de Proyectos Digitales',
    description: 'De la idea al producto digital. Yo orquesto todo el proceso.',
    url: 'https://josetepaz.com',
    siteName: 'José Tepáz',
    locale: 'es_GT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Tepáz — Consultor de Proyectos Digitales',
    description: 'De la idea al producto digital. Yo orquesto todo el proceso.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <MouseGlow />
        {children}
      </body>
    </html>
  )
}
