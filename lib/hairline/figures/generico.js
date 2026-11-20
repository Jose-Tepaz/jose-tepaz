// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Generico: a standard square block hovering over a slab with a cross-shaped
 * socket whose arms are narrower than the block. The pointer, projected on the
 * ground, sets where the block hunts: it follows partway, turns with the
 * pointer's x and drops towards the socket, but its corners catch the rim and
 * it springs back before it ever seats. At rest it hangs off to one side and
 * the socket rim is the bright mark; when the pointer answers, the block is.
 * The slider is how far the block drops while it tries, in world units.
 *
 * The pattern: a continuous gesture on springs, a hit test on the ground plane
 * (which never moves), and a rest that is already a composition.
 */
const {
  Cam, clamp, facing, fillet, fit, poly, prism, proj, rad, rings, seg, unproj,
  spring, stepS, mk, pointer, put, register, disposer, solid,
} = HL;

const PW = 96, PT = 8, SC = 48, ZR = 34, BS = 13, BH = 16, STUD = 3.5, ZMIN = 2.5, D = 6;
const REST = { x: 60, y: 40, yaw: 20 };
// the socket: a cross with unequal arms, every arm 16 wide, so a 26 block never fits
const HOLE = [[40, 20], [56, 20], [56, 40], [84, 40], [84, 56], [56, 56], [56, 70], [40, 70], [40, 56], [14, 56], [14, 40], [40, 40]];
const HR = [2.4, 2.4, 1.2, 2.4, 2.4, 1.2, 2.4, 2.4, 1.2, 2.4, 2.4, 1.2];

/** A ring turned by th about the origin and moved to (x, y); its normals turn with it. */
const move = (ring, th, x, y) => {
  const c = Math.cos(rad(th)), s = Math.sin(rad(th));
  return ring.map((q) => ({ ...q, u: x + q.u * c - q.v * s, v: y + q.u * s + q.v * c, nu: q.nu * c - q.nv * s, nv: q.nu * s + q.nv * c }));
};

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let drop = value, over = false;

  // Fitted to the block at its two extremes, high and off to the side and low over the socket, so no pose leaves the frame.
  const C = Cam(45, 0.5, 2.1);
  const ext = [[0, 0, -PT], [PW, 0, -PT], [0, PW, -PT], [PW, PW, -PT]];
  for (const [x, y] of [[SC - 16, SC - 16], [SC + 16, SC + 16], [REST.x, REST.y]]) ext.push([x - BS, y - BS, ZR + BH + STUD], [x + BS, y + BS, ZR + BH + STUD]);
  fit(C, ext, 200, 160);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(0, 0, PW, PW, 8, 2);
  put(solid(g), prism(P, front, pr, pi, -PT, 0));

  // The socket: its far walls, which the viewer sees into, then the rim on the slab's top.
  const hole = fillet(HOLE, HR, 3);
  const area = HOLE.reduce((a, p, i) => a + p[0] * HOLE[(i + 1) % HOLE.length][1] - HOLE[(i + 1) % HOLE.length][0] * p[1], 0);
  for (let i = 0; i < HOLE.length; i++) {
    const a = HOLE[i], b = HOLE[(i + 1) % HOLE.length], dx = b[0] - a[0], dy = b[1] - a[1];
    const inward = area > 0 ? dx - dy : dy - dx; // the inward normal dotted with the viewer's direction (1, 1)
    if (inward > 0) mk("path", { d: poly([P(a[0], a[1], 0), P(b[0], b[1], 0), P(b[0], b[1], -D), P(a[0], a[1], -D)]), class: "lo" }, g);
  }
  const rim = mk("path", { d: poly(hole.map((p) => P(p[0], p[1], 0))), class: "nf sil hi" }, g);

  const guide = mk("path", { class: "nf dash" }, g);
  const [br, bi] = rings(-BS, -BS, BS, BS, 5, 1.6), [sr, si] = rings(-4.5, -4.5, 4.5, 4.5, 2, 0.8);
  const block = solid(g), stud = solid(g);

  const sp = { x: spring(REST.x), y: spring(REST.y), yaw: spring(REST.yaw), z: spring(ZR, { k: 140, c: 7 }) };
  let last = "";
  function draw() {
    const z = Math.max(ZMIN, sp.z.x), x = sp.x.x, y = sp.y.x, th = sp.yaw.x, key = [z, x, y, th].map((n) => n.toFixed(2)).join();
    if (key === last) return;
    last = key;
    guide.setAttribute("d", seg(P(x, y, 0), P(x, y, z)));
    put(block, prism(P, front, move(br, th, x, y), move(bi, th, x, y), z, z + BH));
    put(stud, prism(P, front, move(sr, th, x, y), move(si, th, x, y), z + BH, z + BH + STUD));
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const k in sp) if (stepS(sp[k], dt)) m = true;
    draw();
    return m;
  });
  bag.add(B.unregister);

  function retarget(p) {
    // the block follows the pointer partway, turns with its x, and drops by the slider's amount
    sp.x.t = over ? SC + clamp((p[0] - SC) * 0.5, -14, 14) : REST.x;
    sp.y.t = over ? SC + clamp((p[1] - SC) * 0.5, -14, 14) : REST.y;
    sp.yaw.t = over ? REST.yaw + clamp((p[0] - SC) / SC, -1, 1) * 40 : REST.yaw;
    sp.z.t = over ? ZR - drop : ZR;
    block.sil.classList.toggle("hi", over);
    rim.classList.toggle("hi", !over);
    read.textContent = over ? "fit 0" : "rest";
    B.wake();
  }

  let at = null;
  // the slab's footprint on the ground: it never moves, so the choice cannot flicker
  bag.add(pointer(stage, {
    move: (q) => { const w = unproj(C, q[0], q[1], 0); over = w[0] > -4 && w[0] < PW + 4 && w[1] > -4 && w[1] < PW + 4; at = w; retarget(at); },
    leave: () => { over = false; retarget(null); },
  }));
  bag.add(() => svg.replaceChildren());
  draw();

  return {
    set: (v) => { drop = v; if (over) retarget(at); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "generico",
  means: "A standard block hunts over a cross-shaped socket: it turns and drops, catches the rim, and never seats.",
  rules: [1, 4, 5, 8],
  range: [6, 16, 28],
  tour: [[135, 188], [265, 182], [205, 220], null],
  mount,
});

}
