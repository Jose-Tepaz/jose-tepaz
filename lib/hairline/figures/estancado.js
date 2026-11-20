// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Estancado: a flight of six steps climbing away from the viewer toward a
 * raised platform, with a gap before it. A small crate stands on the second
 * step. The pointer picks a step by where it is along the flight; the crate
 * climbs to it on the lift curve, but never past the slider's reach, and never
 * across the gap. Letting go drops it back to where it started. The platform
 * is bright at rest; the crate takes the bright while the pointer chooses.
 * The slider is the reach, in steps.
 *
 * The pattern: one of many, on a hit test along the ground, which never moves.
 */
const {
  Cam, clamp, facing, fit, lerp, poly, prism, proj, rings, rrect, ringAt, open, unproj,
  tdone, tset, tval, tween, disposer, mk, place, pointer, put, register, solid,
} = HL;

const N = 6, SL = 16, GAP = 16, PL = 28, W = 34, PH = 54, REST = 0;
const XS = PL + GAP;                                   // where the flight starts, at its far end
const STEP = (k) => 8 + 7 * k;                         // height of step k
const BX = 12, BY = 24, BH = 11;
const XMAX = XS + N * SL;

/** Height of the ground under the crate at step position s: each riser is eased, so it climbs rather than jumps. */
const rise = (s) => {
  const k = clamp(Math.floor(s), 0, N - 1), f = clamp(s - k, 0, 1), e = f * f * (3 - 2 * f);
  return lerp(STEP(k), STEP(Math.min(k + 1, N - 1)), e);
};

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = Math.floor(value);

  const C = Cam(45, 0.5, 1.9);
  fit(C, [[-6, -6, -5], [XMAX + 6, W + 6, -5], [XMAX + 6, -6, -5], [-6, W + 6, -5], [0, 0, PH + 4], [XMAX, 0, STEP(N - 1) + BH + 2]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [br, bi] = rings(-6, -6, XMAX + 6, W + 6, 7, 2);
  put(solid(g), prism(P, front, br, bi, -5, 0));

  // the platform, far end: a slab with a thin pad set into its top and one dot at its middle
  const [pr, pi] = rings(0, 0, PL, W, 4, 1.6);
  const plat = solid(g);
  put(plat, prism(P, front, pr, pi, 0, PH));
  mk("path", { d: poly(ringAt(P, rrect(6, 6, PL - 6, W - 6, 2.5, 4), PH)), class: "nf lo" }, g);
  const pdot = mk("circle", { r: 1.3, class: "dot" }, g);
  place(pdot, P(PL / 2, W / 2, PH));

  // the step that was never built: a dashed outline in the gap, behind the flight's highest step
  const [gr] = rings(PL + 0.3, 0, XS - 0.3, W, 2.4, 1);
  mk("path", { d: poly(ringAt(P, gr, STEP(N))), class: "nf dash" }, g);

  // the flight, painted far to near: the highest step first
  const steps = [];
  for (let k = N - 1; k >= 0; k--) {
    const x0 = XS + (N - 1 - k) * SL + 0.3, [r, i] = rings(x0, 0, x0 + SL - 0.6, W, 2.4, 1);
    const s = solid(g);
    put(s, prism(P, front, r, i, 0, STEP(k)));
    steps[k] = s;
  }

  // the crate: a prototype box, its lid creased, one dot on top
  const crate = solid(mk("g", {}, g));
  const cdot = mk("circle", { r: 1.1, class: "dot m" }, crate.g);
  const sp = tween(REST);
  let drawn = NaN, host = -1;

  function draw(s) {
    if (s === drawn) return;
    drawn = s;
    const cx = XS + (N - s - 0.5) * SL, cy = W / 2, z = rise(s);
    const [r, i] = rings(cx - BX / 2, cy - BY / 2, cx + BX / 2, cy + BY / 2, 2.4, 1.1);
    put(crate, prism(P, front, r, i, z, z + BH));
    place(cdot, P(cx, cy, z + BH));
    // painted after the step it stands on, so the nearer steps still cover it
    const k = clamp(Math.round(s), 0, N - 1);
    if (k !== host) { host = k; steps[k].g.after(crate.g.parentNode); }
  }

  const B = register(stage, (_dt, now) => {
    draw(r2(tval(sp, now)));
    return !tdone(sp, now);
  });
  bag.add(B.unregister);

  // the choice: which step the pointer is over, read on the ground, which never moves
  let over = -1, act = false;
  // each part is read at its own rest top, and the one the pointer is nearest the middle of is chosen
  const stepAt = (p) => {
    let best = N, bd = Math.abs(unproj(C, p[0], p[1], PH)[0] - PL / 2) / PL;
    for (let k = 0; k < N; k++) {
      const d = Math.abs(unproj(C, p[0], p[1], STEP(k))[0] - (XS + (N - k - 0.5) * SL)) / SL;
      if (d < bd) { bd = d; best = k; }
    }
    return best;
  };
  function choose(a) {
    if (a === over) return;
    over = a;
    const eff = a < 0 ? REST : Math.min(a, reach);
    pick(eff, a);
  }
  function pick(eff, a) {
    tset(sp, eff, performance.now(), 0);
    act = a >= 0;
    crate.sil.classList.toggle("hi", act);
    plat.sil.classList.toggle("hi", !act);
    pdot.setAttribute("class", act ? "dot m" : "dot");
    cdot.setAttribute("class", act ? "dot" : "dot m");
    read.textContent = a < 0 ? "rest" : a > reach ? "stall" : "step " + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => choose(stepAt(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  plat.sil.classList.add("hi");
  draw(REST);

  return {
    set: (v) => { reach = Math.floor(v); if (over >= 0) { const a = over; over = -2; choose(a); } },
    destroy: bag.dispose,
  };
}

const r2 = (n) => Math.round(n * 100) / 100;

hairline({
  name: "estancado",
  means: "A crate climbs a flight of steps toward a platform it never reaches: the gap stops it, and it drops back.",
  rules: [1, 4, 5, 8],
  range: [2, 3, 5],
  tour: [[262, 216], [219, 171], [125, 76], null],
  mount,
});

}
