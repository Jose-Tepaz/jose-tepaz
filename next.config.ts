import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // calidades de imagen que usa el sitio (40 en Trabajo selecto, 75 por defecto); Next.js 16 exige declararlas
  images: { qualities: [40, 75] },
}

export default nextConfig
