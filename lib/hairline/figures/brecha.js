// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Brecha: two blocks on a plinth, a low broad one and a tall stepped one,
 * with a gap between them and a plank pivoted on the low one that should
 * cross it. At rest the tall block has slid sideways off its dashed footprint,
 * so the plank skews and lands half off its top. The pointer's place across the
 * plinth sets where the tall block sits, on a spring; the plank follows and
 * only lies true when the block is back on its footprint. The slider is how
 * far the block follows the pointer.
 *
 * The pattern: a continuous position. A spring, a hit test on the ground
 * plane, and a rest that is a composition.
 */
const {
  Cam, clamp, facing, fit, poly, proj, prism, rings, unproj, rrect, ringAt,
  spring, stepS, mk, put, pointer, register, disposer, solid,
} = HL;

const AX1 = 34, AY1 = 36, AH = 24, BX0 = 62, BX1 = 100, BW = 20, BY = 8, BH = 24, TH = 46;
const PIV = [28, 18], LEN = 46, PW = 10, PZ0 = AH, PZ1 = AH + 3.2, REST = 13, MAXS = 16, PX0 = -8, PX1 = 108, PY0 = -14, PY1 = 50;

/** A ring from rings() turned by th about the origin and moved to (ox, oy), normals turned with it. */
const turn = (ring, th, ox, oy) => {
  const c = Math.cos(th), s = Math.sin(th);
  return ring.map((q) => ({ u: ox + q.u * c - q.v * s, v: oy + q.u * s + q.v * c, nu: q.nu * c - q.nv * s, nv: q.nu * s + q.nv * c }));
};

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.15);
  fit(C, [[PX0, PY0, -4], [PX1, PY1, -4], [PX1, PY0, -4], [PX0, PY1, -4], [BX1, BY - MAXS, TH], [BX1, BY + BW + MAXS, TH]], 200, 166);
  const P = proj(C), front = facing(C);
  let gain = value, over = null, drawn = NaN;

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(PX0, PY0, PX1, PY1, 7, 2);
  put(solid(g), prism(P, front, pr, pi, -4, 0));
  // where the tall block belongs: a dashed footprint, painted before the block that covers it
  mk("path", { d: poly(ringAt(P, rrect(BX0, BY, BX1, BY + BW, 3, 4), 0)), class: "dash nf" }, g);

  const block = (x0, y0, x1, y1, r, z0, z1) => { const [a, b] = rings(x0, y0, x1, y1, r, 1.4); const s = solid(g); put(s, prism(P, front, a, b, z0, z1)); return { s, x0, y0, x1, y1, r, z0, z1 }; };
  block(0, 0, AX1, AY1, 5, 0, AH);
  block(4, 5, 16, 17, 2.4, AH, AH + 6);
  const B = block(BX0, BY, BX1, BY + BW, 3, 0, BH), T = block(BX1 - 18, BY + 3, BX1 - 4, BY + BW - 3, 2.4, BH, TH);
  const plank = solid(g);
  plank.sil.classList.add("hi");

  const place = (blk, dy) => {
    const [a, b] = rings(blk.x0, blk.y0 + dy, blk.x1, blk.y1 + dy, blk.r, 1.4);
    put(blk.s, prism(P, front, a, b, blk.z0, blk.z1));
  };
  const sp = spring(REST, { eps: 0.02 });

  function draw() {
    const s = sp.x;
    if (s === drawn) return;
    drawn = s;
    place(B, s); place(T, s);
    const th = Math.atan2(s * 0.5, LEN), [a, b] = rings(0, -PW / 2, LEN, PW / 2, 2.4, 1);
    put(plank, prism(P, front, turn(a, th, PIV[0], PIV[1]), turn(b, th, PIV[0], PIV[1]), PZ0, PZ1));
  }
  const loop = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(loop.unregister);

  function retarget() {
    sp.t = over ? clamp((over[1] - (BY + BW / 2)) * gain, -MAXS, MAXS) : REST;
    read.textContent = over ? `off ${Math.round(Math.abs(sp.t))}` : "rest";
    loop.wake();
  }
  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { gain = v; if (over) retarget(); }, destroy: bag.dispose };
}

hairline({
  name: "brecha",
  means: "Two blocks and a plank that should bridge them: it only fits when the tall block is back on its footprint.",
  rules: [1, 3, 5, 6, 9],
  range: [0.4, 0.8, 1.4],
  tour: [[288, 163], [227, 194], [246, 185], null],
  mount,
});

}
