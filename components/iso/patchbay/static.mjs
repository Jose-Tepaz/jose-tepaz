import {
  at,
  P,
  S,
  L,
  D,
  BASE,
  BASE_H,
  FOOT_H,
  ROWS,
  MOD_X,
  MOD_W,
  MOD_D,
  MOD_FACE,
  PORT_Z,
  FERRULE,
  PANEL,
  PANEL_TOP,
  JACK_A,
  JACK_B,
  COLLAR_R,
  COLLAR_H,
  LED_X,
  BUS_X,
  CON,
  CON_Z0,
  CON_Z1,
  FACE_Y,
  METER,
  LAMP,
  LAMP_R,
  CORD_R,
  V,
} from './layout.mjs'
import { group, k, G, rrect, pathOn, faceOutline, sideOutline } from './parts.mjs'
import { needleAt } from './dynamic.mjs'
import { tubePieces, tubeSvg } from '../tube.mjs'

const byDepth = (points) =>
  [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P))
const RAD = Math.PI / 180

// Frames on the console face: u runs along +x, v up, s out toward the viewer.
const faceFrame = (x, z) => G.frameOf([x, FACE_Y, z], [0, 1, 0], [1, 0, 0], [0, 0, 1])
// Frames on a module's +x face: u runs along +y, v up, s out toward the viewer.
const portFrame = (y, z) => G.frameOf([MOD_FACE, y, z], [1, 0, 0], [0, 1, 0], [0, 0, 1])

const UNITS = 6
const BOARD_H = 52
const KEYS_H = 40
export const TRUNK_X = 70
export const TRUNK_Z = 26

function base(R) {
  const g = group(R, 'stand')
  g.raw(`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`)
  for (const [x, y] of byDepth(k.corners(BASE, 24))) {
    g.cyl('foot-flange', x, y, 7, -BASE_H - FOOT_H, 1.6, {
      tone: 'lo',
      steps: 28,
      className: 'pb-desk',
    })
    g.cyl('foot', x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, {
      tone: 'mid',
      steps: 28,
      className: 'pb-desk',
    })
  }
  g.slab('base', BASE, -BASE_H, BASE_H, { steps: 8, bevel: 1.6, className: 'pb-desk' })
  g.line(k.planOutline(k.insetPlan(BASE, 5), 0, P), 'lo')
  const screws = k.corners(BASE, 10)
  g.line(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), 'lo')
  g.dots(
    screws.map(([x, y]) => at([x, y, 0])),
    0.5,
    'mid',
  )
  const strip = { x: -118, y: 74, w: 232, d: 7, r: 1 }
  g.slab('ruler', strip, 0, 0.6, { steps: 3, tone: 'lo', crease: 'none' })
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P)
  g.line(t.minor, 'lo').line(t.major, 'mid')
  g.dots(
    [at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])],
    0.45,
    'mid',
  )
  const plate = { x: 96, y: 72, w: 34, d: 14, r: 2 }
  g.slab('label', plate, 0, 0.8, { steps: 4, tone: 'lo', crease: 'none' })
  g.line(k.planOutline(k.insetPlan(plate, 1.6), 0.8, P), 'faint')
  g.line(
    [0, 1, 2]
      .map((row) =>
        k.lineOnTop(
          [plate.x + 6, plate.y + 3.6 + row * 3.2],
          [plate.x + (row === 1 ? 20 : 28), plate.y + 3.6 + row * 3.2],
          0.8,
          P,
        ),
      )
      .join(''),
    'lo',
    { free: true },
  )
  g.dots(
    [
      at([plate.x + 3.4, plate.y + plate.d / 2, 0.8]),
      at([plate.x + plate.w - 3.4, plate.y + plate.d / 2, 0.8]),
    ],
    0.45,
    'mid',
  )
  return g.put([0, 0, 0], -100)
}

function socket(g, row, name) {
  // a connector on the module's +x face: flange, collar and the ferrule the cord leaves from
  const y = ROWS[row]
  const F = portFrame(y, PORT_Z[row])
  g.disc(`${name}-flange`, F, 0, 1.6, 4.6, { tone: 'mid' })
  g.disc(`${name}-collar`, F, 1.6, 3, 3.2, { tone: 'lo' })
  g.raw(L(G.circleOf(F, 3, 1.9, P), { tone: 'lo' }))
  g.raw(L(G.circleOf(F, 1.6, 3.9, P), { tone: 'faint' }))
}

function drives(R) {
  const g = group(R, 'drives')
  const y = ROWS[0]
  const x0 = MOD_X
  g.slab('plinth', { x: x0 - 2, y: y - MOD_D / 2 - 2, w: MOD_W + 4, d: MOD_D + 4, r: 3 }, 0, 4, {
    steps: 4,
    tone: 'lo',
    bevel: 0.4,
  })
  for (let j = 0; j < UNITS; j++) {
    const z = 4 + 13 * j
    const unit = { x: x0, y: y - MOD_D / 2, w: MOD_W, d: MOD_D, r: 2 }
    g.slab(`unit${j}`, unit, z, 13, { steps: 3, bevel: 0.5 })
    const zc = z + 6.5
    if (j !== 2) {
      g.line(sideOutline(MOD_FACE, y - 16, zc - 2.6, y - 2, zc + 2.6, 1.4), 'lo')
      g.slab(`handle${j}`, { x: MOD_FACE, y: y + 5, w: 2.4, d: 10, r: 1 }, zc - 1, 2, {
        steps: 2,
        bevel: 0,
      })
      g.dots([at([MOD_FACE, y + 16, zc])], 0.55, j === UNITS - 1 ? 'hi' : 'lo')
    } else {
      g.dots(
        [
          at([MOD_FACE, y - 15, zc - 3.4]),
          at([MOD_FACE, y - 15, zc + 3.4]),
          at([MOD_FACE, y + 15, zc - 3.4]),
          at([MOD_FACE, y + 15, zc + 3.4]),
        ],
        0.45,
        'mid',
      )
      socket(g, 0, 'port')
    }
  }
  const top = { x: x0 + 2, y: y - MOD_D / 2 + 2, w: MOD_W - 4, d: MOD_D - 4, r: 2 }
  const TOP = 4 + 13 * UNITS
  g.slab('cap', top, TOP, 2, { steps: 3, tone: 'lo', bevel: 0.3 })
  for (let i = 0; i < 3; i++)
    g.line(
      k.planOutline({ x: x0 + 12, y: y - 12 + i * 9, w: 30, d: 3.6, r: 1.6 }, TOP + 2, P, 3),
      'faint',
    )
  g.dots(
    [
      at([x0 + 6, y - 14, TOP + 2]),
      at([x0 + MOD_W - 6, y + 14, TOP + 2]),
      at([x0 + 6, y + 14, TOP + 2]),
      at([x0 + MOD_W - 6, y - 14, TOP + 2]),
    ],
    0.45,
    'mid',
  )
  return g.put([x0 + MOD_W / 2, y, 40], 0)
}

function board(R) {
  const g = group(R, 'board')
  const y = ROWS[1]
  const x0 = MOD_X
  const chassis = { x: x0, y: y - MOD_D / 2, w: MOD_W, d: MOD_D, r: 3 }
  g.slab('chassis', chassis, 0, BOARD_H, { steps: 4, bevel: 0.6 })
  g.line(k.sideSeam(chassis, 16, P, 4), 'faint')
  socket(g, 1, 'port')
  g.line(
    [-15, -9, -3].map((v) => sideOutline(MOD_FACE, y + v, 8, y + v + 4.4, 12, 1.2)).join(''),
    'lo',
  )
  g.dots([at([MOD_FACE, y + 14, 9]), at([MOD_FACE, y + 14, 15])], 0.5, 'lo')
  g.slab('lid', k.insetPlan(chassis, 1.4), BOARD_H, 3, { steps: 4, bevel: 0.5 })
  g.dots(
    k.corners(chassis, 5).map(([cx, cy]) => at([cx, cy, BOARD_H + 3])),
    0.45,
    'mid',
  )
  const chip = { x: x0 + 8, y: y - 12, w: 24, d: 24, r: 1.5 }
  g.slab('chip', chip, BOARD_H + 3, 4, { steps: 3, tone: 'hi', crease: 'lo', bevel: 0.5 })
  g.line(k.planOutline(k.insetPlan(chip, 4), BOARD_H + 7, P, 3), 'faint')
  const pins = []
  for (let i = 0; i < 6; i++) {
    const p = chip.x + 3 + i * 3.6
    pins.push(k.lineOnTop([p, chip.y + chip.d], [p, chip.y + chip.d + 2.4], BOARD_H + 3.8, P))
  }
  g.line(pins.join(''), 'lo')
  g.dots([at([chip.x + 3.2, chip.y + 3.2, BOARD_H + 7])], 0.55, 'hi')
  const sink = { x: x0 + 36, y: y - 17, w: 16, d: 34, r: 1 }
  g.slab('sink', sink, BOARD_H + 3, 2, { steps: 2, bevel: 0.3 })
  for (let j = 0; j < 6; j++)
    g.slab(
      `fin${j}`,
      { x: sink.x + 1, y: sink.y + 1.6 + j * 5.2, w: 14, d: 1.8, r: 0.6 },
      BOARD_H + 5,
      14,
      { steps: 2, bevel: 0, crease: 'faint' },
    )
  return g.put([x0 + MOD_W / 2, y, 28], 0)
}

function keys(R) {
  const g = group(R, 'keys')
  const y = ROWS[2]
  const x0 = MOD_X
  const housing = { x: x0, y: y - MOD_D / 2, w: MOD_W, d: MOD_D, r: 3 }
  g.slab('housing', housing, 0, KEYS_H, { steps: 4, bevel: 0.6 })
  g.line(k.sideSeam(housing, 12, P, 4), 'faint')
  socket(g, 2, 'port')
  g.line([-14, 10].map((v) => sideOutline(MOD_FACE, y + v, 6, y + v + 4, 10, 1.2)).join(''), 'lo')
  g.line(k.planOutline(k.insetPlan(housing, 3.4), KEYS_H, P, 4), 'faint')
  const kx = x0 + 14
  for (let j = 0; j < 5; j++) {
    const yc = y - 14 + j * 7
    g.slab(`key-base${j}`, { x: kx - 6, y: yc - 3, w: 12, d: 6, r: 1.2 }, KEYS_H, 1, {
      steps: 3,
      tone: 'lo',
      crease: 'none',
    })
    const up = j % 2 === 0
    g.slab(
      `key${j}`,
      { x: kx - 4.4 + (up ? 2 : 0), y: yc - 2.2, w: 8.8, d: 4.4, r: 1.2 },
      KEYS_H + 1,
      up ? 5 : 3,
      { steps: 3, tone: 'hi', crease: 'lo', bevel: 0.3 },
    )
    g.dots([at([kx + 11, yc, KEYS_H])], 0.5, up ? 'hi' : 'lo')
  }
  for (const yk of [y - 7, y + 11]) {
    const kc = [x0 + 40, yk]
    g.cyl(`knob${yk}`, kc[0], kc[1], 4.4, KEYS_H, 4, { steps: 24, bevel: 0.3 })
    g.line(k.knurl(kc[0], kc[1], 4.4, KEYS_H, KEYS_H + 4, 26, P), 'lo')
    g.line(k.lineOnTop(kc, [kc[0] + 4.2, kc[1] - 1.4], KEYS_H + 4, P), 'hi')
  }
  g.dots(
    k.corners(housing, 6).map(([cx, cy]) => at([cx, cy, KEYS_H])),
    0.45,
    'mid',
  )
  return g.put([x0 + MOD_W / 2, y, 20], 0)
}

function panel(R) {
  const g = group(R, 'panel')
  g.slab('tray', PANEL, 0, PANEL_TOP, { steps: 6, bevel: 1.2 })
  g.line(k.planOutline(k.insetPlan(PANEL, 3), PANEL_TOP, P, 6), 'faint')
  const screws = k.corners(PANEL, 6)
  g.line(screws.map(([x, y]) => k.ring(x, y, 1.9, PANEL_TOP, P, 14)).join(''), 'lo')
  g.dots(
    screws.map(([x, y]) => at([x, y, PANEL_TOP])),
    0.45,
    'mid',
  )
  // routing: jack B to its LED, the LEDs to a bus that leaves by the back
  const rows = []
  ROWS.forEach((y) => {
    rows.push([
      [JACK_B + COLLAR_R, y],
      [LED_X - 2.4, y],
    ])
    rows.push([
      [LED_X + 2.4, y],
      [BUS_X, y],
    ])
  })
  g.line(rows.map((r) => k.onTop(r, PANEL_TOP, P)).join(''), 'lo')
  g.line(
    k.onTop(
      [
        [BUS_X, ROWS[2]],
        [BUS_X, -60 + 2.6],
      ],
      PANEL_TOP,
      P,
    ),
    'lo',
  )
  const leds = []
  ROWS.forEach((y, i) => {
    const plate = { x: -38, y: y - 5, w: 12, d: 10, r: 1.6 }
    g.slab(`label${i}`, plate, PANEL_TOP, 0.8, { steps: 3, tone: 'lo', crease: 'none' })
    g.line(k.planOutline(k.insetPlan(plate, 1.4), PANEL_TOP + 0.8, P, 3), 'faint')
    g.line(
      [0, 1]
        .map((r) =>
          k.lineOnTop(
            [plate.x + 3, plate.y + 3.4 + r * 3.2],
            [plate.x + (r ? 7 : 9), plate.y + 3.4 + r * 3.2],
            PANEL_TOP + 0.8,
            P,
          ),
        )
        .join(''),
      'lo',
      { free: true },
    )
    for (const [jx, name, r] of [
      [JACK_A, 'park', COLLAR_R - 0.6],
      [JACK_B, 'jack', COLLAR_R],
    ]) {
      g.cyl(`${name}${i}`, jx, y, r, PANEL_TOP, COLLAR_H, { steps: 24, bevel: 0.3 })
      g.line(k.ring(jx, y, r - 1.8, PANEL_TOP + COLLAR_H, P, 20), 'lo')
      g.dots([at([jx, y, PANEL_TOP + COLLAR_H])], 0.9, 'hi')
    }
    g.cyl(`led${i}`, LED_X, y, 2.4, PANEL_TOP, 1, { steps: 16, tone: 'lo', crease: 'none' })
    leds.push(
      `<g data-part="led${i}">${D([at([LED_X, y, PANEL_TOP + 1])], { size: 1, tone: 'lo' })}</g>`,
    )
  })
  // between the rows: a selector with its scale, three push keys, binding posts and a fuse holder
  const sel = [46, -24]
  g.line(k.ring(sel[0], sel[1], 9.2, PANEL_TOP, P, 40), 'lo')
  const dial = k.radialTicks(
    sel[0],
    sel[1],
    9.2,
    20,
    5,
    PANEL_TOP,
    [1.2, 2.4],
    P,
    -Math.PI * 0.75,
    Math.PI * 1.5,
  )
  g.line(dial.minor, 'lo').line(dial.major, 'mid')
  g.cyl('selector', sel[0], sel[1], 5.6, PANEL_TOP, 4, { steps: 28, bevel: 0.3 })
  g.line(k.knurl(sel[0], sel[1], 5.6, PANEL_TOP, PANEL_TOP + 4, 30, P), 'lo')
  g.line(k.lineOnTop(sel, [sel[0] - 4.4, sel[1] + 3.6], PANEL_TOP + 4, P), 'hi')
  g.dots([at([sel[0], sel[1], PANEL_TOP + 4])], 0.5, 'hi')
  for (const x of [-22, -9, 4]) {
    g.slab(`key${x}`, { x: x - 4.6, y: -28.6, w: 9.2, d: 9.2, r: 1.8 }, PANEL_TOP, 1.2, {
      steps: 3,
      tone: 'lo',
      crease: 'none',
    })
    g.slab(`cap${x}`, { x: x - 3.2, y: -27.2, w: 6.4, d: 6.4, r: 1.4 }, PANEL_TOP + 1.2, 2.4, {
      steps: 3,
      tone: 'hi',
      crease: 'lo',
      bevel: 0.3,
    })
  }
  for (const x of [-22, -10, 2]) {
    g.cyl(`post${x}`, x, 24, 2.3, PANEL_TOP, 4, { steps: 16 })
    g.cyl(`post-cap${x}`, x, 24, 3, PANEL_TOP + 4, 1.6, { steps: 20, bevel: 0.2 })
    g.line(k.knurl(x, 24, 3, PANEL_TOP + 4, PANEL_TOP + 5.6, 14, P), 'lo')
  }
  g.cyl('fuse', 38, 24, 3.8, PANEL_TOP, 4.4, { steps: 24, bevel: 0.3 })
  g.line(k.lineOnTop([35.4, 24], [40.6, 24], PANEL_TOP + 4.4, P), 'hi')
  g.line(k.ring(38, 24, 2.6, PANEL_TOP + 4.4, P, 18), 'lo')
  // a ruler strip on the front edge
  const strip = { x: -36, y: 56, w: 112, d: 7, r: 1 }
  g.slab('strip', strip, PANEL_TOP, 0.6, { steps: 3, tone: 'lo', crease: 'none' })
  const t = k.topTicks(
    strip.x + 4,
    strip.x + strip.w - 4,
    4,
    5,
    strip.y + 0.8,
    PANEL_TOP + 0.6,
    [2, 3.6],
    P,
  )
  g.line(t.minor, 'lo').line(t.major, 'mid')
  // the trunk's gland
  g.cyl('gland', TRUNK_X, -60, 2.6, PANEL_TOP, 8, { steps: 16 })
  // the LEDs light as their plugs seat
  g.dynamic()
  leds.forEach((markup) => g.raw(markup))
  return g.put([PANEL.x + PANEL.w / 2, 0, 6], 0)
}

function console_(R) {
  const g = group(R, 'console')
  const body = { ...CON }
  g.slab('plinth', { x: CON.x - 3, y: CON.y - 3, w: CON.w + 6, d: CON.d + 6, r: 4 }, 0, CON_Z0, {
    steps: 4,
    tone: 'lo',
    bevel: 0.4,
  })
  g.slab('body', body, CON_Z0, CON_Z1 - CON_Z0, { steps: 5, bevel: 0.8 })
  g.slab('cap', { x: CON.x - 2, y: CON.y - 2, w: CON.w + 4, d: CON.d + 4, r: 6 }, CON_Z1, 6, {
    steps: 5,
    bevel: 0.8,
  })
  g.line(k.sideSeam(body, 30, P, 5), 'faint')
  for (let i = 0; i < 4; i++)
    g.line(
      k.planOutline({ x: 14 + i * 28, y: CON.y + 22, w: 16, d: 4, r: 2 }, CON_Z1 + 6, P, 3),
      'faint',
    )
  // vents
  for (let i = 0; i < 6; i++)
    g.line(faceOutline(FACE_Y, -24, 16 + i * 8, -10, 19.6 + i * 8, 1.4), 'lo')
  // meter bezel
  const [mx, mz] = METER
  const F0 = G.frameOf([0, FACE_Y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1])
  g.prism('bezel', F0, rrect(mx - 30, mz - 19, mx + 30, mz + 19, 4, 4), 0, 1.6, { tone: 'mid' })
  // two knobs
  for (const [kx, kz, deg] of [
    [70, 57, -35],
    [70, 44, 25],
  ]) {
    const F = faceFrame(kx, kz)
    g.disc(`knob${kz}`, F, 0, 5, 6.2, { tone: 'mid' })
    g.raw(L(G.ribsOf(F, 0.4, 4.6, 6.2, 24, P), { tone: 'lo' }))
    g.raw(L(G.circleOf(F, 5, 4.4, P), { tone: 'faint' }))
    const a = deg * RAD
    g.raw(
      L(
        pathOn([
          [kx, FACE_Y + 5, kz],
          [kx + 4.2 * Math.sin(a), FACE_Y + 5, kz + 4.2 * Math.cos(a)],
        ]),
        { tone: 'hi' },
      ),
    )
    g.dots([at([kx, FACE_Y + 5, kz])], 0.5, 'hi')
  }
  // the lamp's bezel and gasket
  const FL = faceFrame(LAMP[0], LAMP[1])
  g.disc('bezel-lamp', FL, 0, 3.2, LAMP_R, { tone: 'mid' })
  g.raw(L(G.circleOf(FL, 3.2, LAMP_R - 1.6, P), { tone: 'faint' }))
  g.disc('gasket', FL, 3.2, 4.4, 14.2, { tone: 'lo' })
  g.dots(
    [
      [-22, 12],
      [124, 12],
      [-22, 66],
      [124, 66],
    ].map(([x, z]) => at([x, FACE_Y, z])),
    0.5,
    'mid',
  )
  // the trunk lands on a flange
  g.disc('trunk-flange', faceFrame(TRUNK_X, TRUNK_Z), 0, 1.6, 4, { tone: 'mid' })
  g.raw(L(G.circleOf(faceFrame(TRUNK_X, TRUNK_Z), 1.6, 3.2, P), { tone: 'faint' }))

  // everything below follows the lamp: glow, the meter's glass and needle, and the lens
  g.dynamic()
  const glow = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2
    return [LAMP[0] + 28 * Math.cos(a), FACE_Y, LAMP[1] + 28 * Math.sin(a)]
  })
  g.raw(`<path data-part="glow" class="pb-glow" d="${pathOn(glow, true)}"/>`)
  g.prism('glass', F0, rrect(mx - 27, mz - 16, mx + 27, mz + 16, 3, 4), 1.6, 1.9, {
    tone: 'hi',
    className: 'pb-glass',
  })
  const gy = FACE_Y + 1.9
  const pivot = [mx, mz - 12]
  const arc = []
  for (let a = -50; a <= 50; a += 4)
    arc.push([pivot[0] + 24 * Math.sin(a * RAD), gy, pivot[1] + 24 * Math.cos(a * RAD)])
  const inner = []
  for (let a = -50; a <= 50; a += 4)
    inner.push([pivot[0] + 19.4 * Math.sin(a * RAD), gy, pivot[1] + 19.4 * Math.cos(a * RAD)])
  g.line(pathOn(arc), 'mid').line(pathOn(inner), 'lo')
  // a scale band: every tick runs from one arc to the other
  const minor = []
  const major = []
  for (let n = 0; n <= 10; n++) {
    const a = (-50 + n * 10) * RAD
    ;(n % 5 === 0 ? major : minor).push(
      pathOn([
        [pivot[0] + 19.4 * Math.sin(a), gy, pivot[1] + 19.4 * Math.cos(a)],
        [pivot[0] + 24 * Math.sin(a), gy, pivot[1] + 24 * Math.cos(a)],
      ]),
    )
  }
  g.line(minor.join(''), 'lo').line(major.join(''), 'mid')
  g.raw(
    `<path data-part="needle" class="iso-line pb-needle" data-tone="hi" data-free d="${needleAt(0)}"/>`,
  )
  g.line(
    G.circleOf(G.frameOf([pivot[0], gy, pivot[1]], [0, 1, 0], [1, 0, 0], [0, 0, 1]), 0, 1.8, P),
    'mid',
  )
  g.dots([at([pivot[0], gy, pivot[1]])], 0.8, 'hi')
  const LENS = []
  const R0 = 12.6
  const H = 8.5
  for (let i = 0; i <= 16; i++) {
    const phi = (i / 16) * 84 * RAD
    LENS.push([4.4 + H * Math.sin(phi), R0 * Math.cos(phi), 1])
  }
  LENS[0] = [4.4, R0]
  const lensRadius = (s) => R0 * Math.sqrt(Math.max(0, 1 - ((s - 4.4) / H) ** 2))
  const lensSlope = (s) =>
    (-R0 * (s - 4.4)) / (H * H * Math.sqrt(Math.max(1e-6, 1 - ((s - 4.4) / H) ** 2)))
  g.turned('lens', FL, LENS, {
    tone: 'hi',
    className: 'pb-lens',
    lathe: { smooth: { slope: lensSlope, radius: lensRadius } },
    radius: lensRadius,
  })
  return g.put([CON.x + CON.w / 2, CON.y + CON.d / 2, 36], 0)
}

export const TRUNK_ROUTE = G.fillet(
  [
    [TRUNK_X, -60, PANEL_TOP + 8],
    [TRUNK_X, -60, TRUNK_Z],
    [TRUNK_X, FACE_Y + 1.6, TRUNK_Z],
  ],
  5,
  7,
  { P, tube: CORD_R },
)

function trunk(R) {
  if (R)
    R.route('trunk.cable', TRUNK_ROUTE, CORD_R, {
      owner: 'trunk.cable',
      piece: 'trunk',
      limp: true,
    })
  const markup = []
  tubePieces(TRUNK_ROUTE, CORD_R, P, { maxLength: 12, spacing: 1 }).forEach((part, index) => {
    markup.push(tubeSvg(part, { tone: 'mid' }))
    if (R)
      R.put({
        piece: 'trunk',
        key: 600 + index,
        name: `trunk.cable:${index}`,
        svg: tubeSvg(part, { tone: 'mid' }),
        shapes: [R.A.tube(part.points, part.radii)],
      })
  })
  return markup.join('')
}

// Build order is the painter's order, back to front, proved by the audit. Without a recorder it
// returns the static art and, apart, the parts that follow the lamp (drawn over it).
export function buildStatic(R = null) {
  const art = []
  const overlay = []
  const order = [
    ['base', base],
    ['console', console_],
    ['drives', drives],
    ['board', board],
    ['keys', keys],
    ['panel', panel],
  ]
  order.forEach(([name, make], index) => {
    const item = make(R)
    if (R) item.key = index * 100
    art.push({ name, svg: item.art ?? item.svg })
    if (item.overlay) overlay.push({ name, svg: item.overlay })
  })
  art.push({ name: 'trunk', svg: trunk(R) })
  if (R) return art.map((item) => ({ ...item, svg: item.svg }))
  return {
    art: art.map((item) => item.svg).join(''),
    overlay: overlay.map((item) => item.svg).join(''),
  }
}
