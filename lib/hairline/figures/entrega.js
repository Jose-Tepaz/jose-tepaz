// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Entrega: a drum of disks, a tapered tower and a slotted block stand in a
 * line toward a raised platform, a gap between each pair and a plank hinged
 * over every gap. A crate waits on the first. The pointer's place along the
 * line says how far the product has got: the planks behind it swing shut, one
 * after another, and the crate rides over them, ending seated on the platform.
 * The planks past the pointer stay raised. The slider is the stagger of the planks.
 *
 * The pattern: one of many. Tweens, a stagger by distance, a hit test on the
 * ground-fixed line, and a rest that is a composition.
 */
const {
  Cam, clamp, facing, fit, hull, lerp, open, poly, proj, prism, rings, rrect, ringAt, run, rad, seg,
  tdone, tset, tval, tween, unproj, mk, place, put, pointer, register, disposer, solid,
} = HL;

const CX = [18, 76, 140, 213], DECK = 14, TOP = 22, CY = 0, TRIP = 700;
const HINGE = [34, 90, 162], LEN = [32, 32, 36], TH = 2.4, OPEN = 52, REST_T = [0.3, 0.55, 0.12];
const KEYS = [2, 28, 55, 84, 112, 156, 190], CUT = [47, 104, 176];
const zOf = (x) => (x <= 162 ? DECK : x < 198 ? DECK + ((TOP - DECK) * (x - 162)) / 36 : TOP);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1, cur = 0;
  const C = Cam(45, 0.5, 1.68);
  fit(C, [[-12, -30, 0], [244, -30, 0], [-12, 30, 0], [244, 30, 0], [76, -9, 26], [100, 0, 44], [140, 0, 44], [200, 0, 44]], 200, 166);
  const P = proj(C), front = facing(C);
  const slab = (g, x0, y0, x1, y1, r, z0, z1, b = 1.4, n = 4) => {
    const s = solid(g);
    put(s, prism(P, front, rrect(x0, y0, x1, y1, r, n), rrect(x0 + b, y0 + b, x1 - b, y1 - b, r - b, n), z0, z1));
    return s;
  };
  const layer = () => mk("g", {}, svg);

  // the stations, back to front by x; each group is also a stop in the paint order
  const groups = Array.from({ length: 7 }, layer);
  const [gBase, gS0, gP0, gS1, gP1, gS2, gP2] = groups;
  const gPlat = layer();
  slab(gBase, -12, -30, 244, 30, 8, -4, 0, 2, 6);
  for (let d = 0; d < 3; d++) slab(gS0, 2, -16, 34, 16, 16, d * 5, d * 5 + 4, 1.2, 14);
  {
    const ft = rrect(62, -15, 90, 15, 3, 4), tp = rrect(65, -12, 87, 12, 3, 4), inner = rrect(66.4, -10.6, 85.6, 10.6, 1.6, 4);
    put(solid(gS1), {
      sil: poly(hull(ringAt(P, ft, 0).concat(ringAt(P, tp, DECK)))),
      crease: open(ringAt(P, run(inner, front), DECK)),
    });
    slab(gS1, 71, -11.5, 77, -6.5, 1.8, DECK, 28, 1);
    place(mk("circle", { r: 1.6, class: "dot off" }, gS1), P(90 - 5, 15, 4));
  }
  slab(gS2, 118, -17, 162, 17, 4, 0, DECK);
  mk("path", { class: "nf lo", d: [0, 1, 2, 3].map((k) => seg(P(127 + k * 8, 17, 3), P(127 + k * 8, 17, 10))).join("") }, gS2);
  place(mk("circle", { r: 1.6, class: "dot off" }, gS2), P(156, 17, 11));
  const plat = slab(gPlat, 194, -22, 232, 22, 6, 0, TOP, 1.6);
  mk("path", { class: "nf dash", d: poly(ringAt(P, rrect(205, -8, 221, 8, 3, 4), TOP)) }, gPlat);
  groups.push(gPlat);

  // planks: hinged on the top edge of the station before the gap, thin, turned up by th
  const planks = [0, 1, 2].map((i) => ({ s: solid(groups[2 + 2 * i]), t: tween(REST_T[i]), u: tween(0), d: NaN }));
  const shut = (i) => (i === 2 ? Math.atan2(TOP - DECK, LEN[2]) : 0);
  function drawPlank(i, t) {
    const th = lerp(rad(OPEN), shut(i), t), c = Math.cos(th), s = Math.sin(th);
    const w = (q, dz) => P(HINGE[i] + q.u * c - dz * s, CY + q.v, DECK + q.u * s + dz * c);
    const top = rrect(0, -9, LEN[i], 9, 2.4, 3), cr = rrect(1.4, -7.6, LEN[i] - 1.4, 7.6, 1.2, 3);
    put(planks[i].s, { sil: poly(hull(top.map((q) => w(q, 0)).concat(top.map((q) => w(q, -TH))))), crease: poly(cr.map((q) => w(q, 0))) });
  }

  // the crate (the product): a body and a lid, riding on whatever is under it
  const gCrate = mk("g", {}, svg), body = solid(gCrate), lid = solid(gCrate);
  let at = -1, drawn = NaN;
  function drawCrate(q) {
    const k = Math.min(2, Math.floor(q)), x = lerp(CX[k], CX[k + 1], q - k), z = zOf(x);
    const [a, b] = rings(x - 7, CY - 7, x + 7, CY + 7, 2.6, 1.4), [e, f] = rings(x - 5.2, CY - 5.2, x + 5.2, CY + 5.2, 1.6, 0.9);
    put(body, prism(P, front, a, b, z, z + 11));
    put(lid, prism(P, front, e, f, z + 11, z + 12.6));
    const n = KEYS.reduce((m, key, j) => (x >= key ? j : m), 0);
    if (n !== at) { at = n; groups[n + 1].after(gCrate); }
  }

  const B = register(stage, (_dt, now) => {
    let moving = false, q = 0;
    planks.forEach((p, i) => {
      const t = tval(p.t, now);
      if (t !== p.d) { p.d = t; drawPlank(i, t); }
      q += tval(p.u, now);
      if (!tdone(p.t, now) || !tdone(p.u, now)) moving = true;
    });
    if (q !== drawn) { drawn = q; drawCrate(q); }
    return moving;
  });
  bag.add(B.unregister);

  /** The product is at stage a (-1 lets it go back): planks behind close in turn, the crate crosses each once it lies shut, those ahead are raised. */
  function go(a) {
    if (a === act) return;
    const now = performance.now(), from = cur, to = Math.max(a, 0), openT = (i) => (a < 0 ? REST_T[i] : 0);
    act = a; cur = to;
    let end = 0;
    for (let i = 0; i < 3; i++) {
      const p = planks[i];
      if (i < to && to > from) {
        if (i < from) continue;
        const db = (i - from) * stag, du = Math.max(end, db + TRIP);
        tset(p.t, 1, now, db); tset(p.u, 1, now, du); end = du + TRIP;
      } else if (i < to) continue;
      else if (i >= to && i < from) {
        const du = (from - 1 - i) * TRIP;
        tset(p.u, 0, now, du); tset(p.t, openT(i), now, du + TRIP);
      } else tset(p.t, openT(i), now, Math.abs(i - to) * stag);
    }
    plat.sil.classList.toggle("hi", a < 0);
    body.sil.classList.toggle("hi", a >= 0); lid.sil.classList.toggle("hi", a >= 0);
    read.textContent = a < 0 ? "rest" : `stage ${a + 1}`;
    B.wake();
  }
  plat.sil.classList.add("hi");

  // the pointer on the deck's plane: a plane that never moves; the stage is the band of the line it is in
  const hit = ([x, y]) => {
    const [wx, wy] = unproj(C, x, y, DECK);
    return Math.abs(wy - CY) > 32 || wx < -12 || wx > 244 ? -1 : CUT.reduce((m, c) => (wx > c ? m + 1 : m), 0);
  };
  bag.add(pointer(stage, { move: (p) => go(hit(p)), leave: () => go(-1) }));
  bag.add(() => svg.replaceChildren());
  B.wake();

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "entrega",
  means: "Systems, technology and a team in a line toward production: planks swing shut over each gap and the product crosses to the platform.",
  rules: [1, 2, 5, 8],
  range: [0, 60, 140],
  tour: [[90, 95], [155, 125], [232, 162], [320, 196], [336, 203], null],
  mount,
});

}
