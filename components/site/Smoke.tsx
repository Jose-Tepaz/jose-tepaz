'use client'

import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_strength;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= .5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - .5 * u_res) / u_res.y;
  float t = u_time * .07;

  vec2 q = vec2(fbm(p * 1.5 + vec2(0., t)), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.8 + 2. * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.8 + 2. * q + vec2(8.3, 2.8) - t));

  // el cursor empuja el humo
  vec2 mp = (u_mouse * u_res - .5 * u_res) / u_res.y;
  float md = exp(-pow(length(p - mp) * 2.4, 2.));
  float f = fbm(p * 1.7 + 2.4 * r + vec2(t * 2., -t) + md * .6);

  float d = smoothstep(.32, .92, f);
  d *= .55 + .45 * r.x;
  d += md * .22 * fbm(p * 3. + t * 4.);
  d *= mix(.45, 1., 1. - uv.y * .8);

  vec3 blue = vec3(0., .5, 1.);
  vec3 white = vec3(.86, .93, 1.);
  vec3 col = mix(blue * .55, white, smoothstep(.45, 1., d));
  float a = clamp(d * u_strength, 0., 1.);
  gl_FragColor = vec4(col * a, a);
}
`

type Props = {
  className?: string
  /** 0–1. Cuánto se ve el humo. */
  strength?: number
}

/**
 * Humo en WebGL (ruido fbm con distorsión de dominio) en azul de marca sobre fondo transparente.
 * Renderiza a media resolución, se pausa fuera de pantalla y respeta prefers-reduced-motion.
 */
export default function Smoke({ className, strength = 0.85 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn('Smoke shader:', gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uStrength = gl.getUniformLocation(prog, 'u_strength')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const SCALE = 0.5
    let visible = true
    let raf = 0
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const start = performance.now()

    const resize = () => {
      const w = Math.max(2, Math.round(canvas.clientWidth * SCALE))
      const h = Math.max(2, Math.round(canvas.clientHeight * SCALE))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const draw = (now: number) => {
      resize()
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000 + 8)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uStrength, strength)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    draw(performance.now())
    if (!reduced) {
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [strength])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
