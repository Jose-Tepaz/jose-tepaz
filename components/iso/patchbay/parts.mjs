import * as k from '../iso-kit.mjs'
import * as G from '../lathe.mjs'
import { P, S, L, D } from './layout.mjs'

// A group of parts that is drawn in one go: every solid is built from the kit, and, when a
// recorder is given, recorded with its true shape so the audit can prove depth order and contacts.
export function group(R, piece) {
  const svg = []
  const shapes = []
  const rec = (make) => {
    if (R) shapes.push(R.solid(make()))
  }
  let cut = -1
  const B = {
    svg,
    shapes,
    // from here on, parts are the ones that change with the lamp: they are drawn over the art
    dynamic() {
      cut = svg.length
      return B
    },
    slab(name, plan, z, h, o = {}) {
      const steps = o.steps ?? 5
      svg.push(
        S(k.slabOf(plan, z, h, P, steps, o.bevel ?? 0), {
          tone: o.tone ?? 'mid',
          crease: o.crease ?? 'faint',
          lit: o.lit,
          inner: o.inner ?? '',
          className: o.className,
        }),
      )
      rec(() => R.A.slab(plan, z, h, { name: `${piece}.${name}`, ...o.meta }, steps))
      return B
    },
    cyl(name, cx, cy, r, z, h, o = {}) {
      svg.push(
        S(k.cylinder(cx, cy, r, z, h, P, o.steps ?? 28, o.bevel ?? 0), {
          tone: o.tone ?? 'mid',
          crease: o.crease ?? 'faint',
          inner: o.inner ?? '',
        }),
      )
      rec(() => R.A.cylinder(cx, cy, r, z, h, { name: `${piece}.${name}`, ...o.meta }))
      return B
    },
    disc(name, F, s0, s1, r, o = {}) {
      svg.push(
        S(G.disc(s0, s1, r, F, P, o.lathe ?? {}), {
          tone: o.tone ?? 'mid',
          crease: o.crease ?? 'faint',
          inner: o.inner ?? '',
          className: o.className,
        }),
      )
      rec(() => R.A.disc(F, s0, s1, r, { name: `${piece}.${name}`, ...o.meta }))
      return B
    },
    prism(name, F, poly, s0, s1, o = {}) {
      svg.push(
        S(G.prismOf(F, poly, s0, s1, P), {
          tone: o.tone ?? 'mid',
          crease: o.crease ?? 'faint',
          inner: o.inner ?? '',
          className: o.className,
        }),
      )
      rec(() => R.A.prism(F, poly, s0, s1, { name: `${piece}.${name}`, ...o.meta }))
      return B
    },
    turned(name, F, profile, o = {}) {
      const paths = G.solidOf(profile, F, P, o.lathe ?? {})
      svg.push(
        S(paths, {
          tone: o.tone ?? 'mid',
          crease: o.crease ?? 'faint',
          inner: o.inner ?? '',
          className: o.className,
        }),
      )
      rec(() => R.A.solid(F, profile, { name: `${piece}.${name}`, radius: o.radius, ...o.meta }))
      return B
    },
    raw(markup) {
      svg.push(markup)
      return B
    },
    line(d, tone = 'lo', style = {}) {
      if (d) svg.push(L(d, { tone, ...style }))
      return B
    },
    dots(points, size = 0.5, tone = 'mid') {
      svg.push(D(points, { size, tone }))
      return B
    },
    put(centre, bias = 0, extra = {}) {
      if (!R) {
        const at = cut < 0 ? svg.length : cut
        return {
          svg: svg.join(''),
          art: svg.slice(0, at).join(''),
          overlay: svg.slice(at).join(''),
        }
      }
      return R.put({
        piece,
        at: centre,
        bias,
        name: `${piece}.item`,
        svg: svg.join(''),
        shapes,
        ...extra,
      })
    },
    markup: () => svg.join(''),
  }
  return B
}

export const rrect = (u0, v0, u1, v1, r, steps = 5) => {
  const out = []
  const corners = [
    [u1 - r, v0 + r, -Math.PI / 2],
    [u1 - r, v1 - r, 0],
    [u0 + r, v1 - r, Math.PI / 2],
    [u0 + r, v0 + r, Math.PI],
  ]
  for (const [cx, cy, a0] of corners) {
    for (let step = 0; step <= steps; step++) {
      const a = a0 + (step / steps) * (Math.PI / 2)
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
    }
  }
  return out
}

export const pathOn = (points, closed = false) =>
  k.pathOf(
    points.map((p) => k.iso(p, P)),
    closed,
  )

// a closed rounded outline drawn on the face of the console (plane y = const)
export const faceOutline = (y, u0, v0, u1, v1, r) =>
  pathOn(
    rrect(u0, v0, u1, v1, r, 4).map(([u, v]) => [u, y, v]),
    true,
  )
// the same on a face of a module (plane x = const), u running along y
export const sideOutline = (x, u0, v0, u1, v1, r) =>
  pathOn(
    rrect(u0, v0, u1, v1, r, 4).map(([u, v]) => [x, u, v]),
    true,
  )

export { k, G }
