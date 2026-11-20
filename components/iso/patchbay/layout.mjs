import * as k from '../iso-kit.mjs'

// A desk patch bay: three source modules on the left, a patch panel in front, a console with a
// lamp and a meter behind. World units are ~1 px, x/y on the desk, z up.
export const W = 600
export const H = 600
export const AZIMUTH = 45
export const ELEVATION = 48

export const BASE = { x: -138, y: -136, w: 276, d: 224, r: 10 }
export const BASE_H = 10
export const FOOT_H = 5

export const ROWS = [-48, 0, 48]
export const MOD_X = -120
export const MOD_W = 56
export const MOD_D = 38
export const MOD_FACE = MOD_X + MOD_W
export const PORT_Z = [36, 26, 20]
export const FERRULE = 1.6

export const PANEL = { x: -40, y: -66, w: 122, d: 132, r: 5 }
export const PANEL_TOP = 12
export const JACK_A = -14
export const JACK_B = 24
export const COLLAR_R = 5
export const COLLAR_H = 2.2
export const SEAT_Z = PANEL_TOP + COLLAR_H
export const LED_X = 56
export const BUS_X = 70

export const CON = { x: -28, y: -122, w: 158, d: 36, r: 5 }
export const CON_Z0 = 6
export const CON_Z1 = 72
export const FACE_Y = CON.y + CON.d
export const METER = [24, 39]
export const LAMP = [104, 39]
export const LAMP_R = 17

export const PLUG_H = 17.8
export const CORD_R = 1.5
export const LIFT = 17

export const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...k.boxCorners({ x: CON.x - 3, y: CON.y - 3, w: CON.w + 6, d: CON.d + 6 }, 0, 80),
    [MOD_X, ROWS[0] - MOD_D / 2, 86],
    [JACK_B, 0, 66],
  ],
  W,
  H,
  { pad: 26, azimuth: AZIMUTH, elevation: ELEVATION },
)

export const at = (point) => k.iso(point, P)
export const V = (() => {
  const [vx, vy] = k.towardViewer(P)
  const { cosE, sinE } = k.cameraOf(P)
  return [vx * cosE, vy * cosE, sinE]
})()
export const depth = (point) => k.depthOf(point, P)
export const S = (paths, style) => k.solidSvg(paths, style)
export const L = (d, style) => k.lineSvg(d, style)
export const D = (points, style) => k.dotsSvg(points, style)
export const fine = (value) => Math.round(value * 10) / 10
