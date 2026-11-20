// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Ladrillos: eight chunky bricks and a baseplate, studs on every top, that
 * build a small stepped tower. The pointer's height says how far the build has
 * got: the bricks up to the one under it are seated, the ones above hover over
 * their slots in a neat column, each a little higher than the one below,
 * staggered outwards from the brick chosen. The last brick, a roof tile, is
 * bright at rest and when the tower is done; while the pointer chooses, the
 * bright is on the brick it chose. The slider is the stagger, in ms.
 *
 * The pattern: one of many. Tweens, a stagger by distance, a hit test on
 * static bands of the screen, and a rest that is already half a build.
 */
const {
  Cam, clamp, facing, fit, prism, proj, put, rings, rrect, solid,
  tdone, tset, tval, tween, disposer, mk, pointer, register,
} = HL;

const PITCH = 10, BASE = 3, BH = 9, TILE = 3.5, SR = 2.7, SH = 1.7, N = 8, REST_A = 2;
// each brick: studs across, studs deep, first cell across, first cell deep, base height, height
const BRICKS = [
  [4, 2, 0, 0, 3, BH], [2, 2, 0, 2, 3, BH], [1, 2, 2, 2, 3, BH],
  [2, 2, 0, 0, 12, BH], [2, 1, 2, 0, 12, BH], [2, 1, 0, 2, 12, BH],
  [1, 2, 0, 0, 21, BH], [1, 2, 0, 0, 30, TILE],
];
const X = (c) => 2 + c * PITCH;
/** How high brick i hovers over its slot when the build has reached brick a. */
const lift = (i, a) => (i <= a ? 0 : 4 + 1.6 * (i - a - 1));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1;

  const C = Cam(45, 0.5, 4.25);
  fit(C, [[0, 0, 0], [44, 0, 0], [0, 44, 0], [44, 44, 0], [2, 2, 51], [12, 12, 51]], 200, 166);
  const P = proj(C), front = facing(C);
  const stud = (g, cx, cy, z) => {
    const s = solid(g);
    put(s, prism(P, front, rrect(cx - SR, cy - SR, cx + SR, cy + SR, SR, 5), rrect(cx - SR + 0.9, cy - SR + 0.9, cx + SR - 0.9, cy + SR - 0.9, SR - 0.9, 5), z, z + SH));
    return s;
  };

  // the baseplate and its sixteen studs: they never move; seated bricks cover the ones beneath them
  const ground = mk("g", {}, svg);
  const [pr, pi] = rings(0, 0, 44, 44, 4, 1.4);
  put(solid(ground), prism(P, front, pr, pi, 0, BASE));
  for (let s = 0; s <= 12; s++) for (let c = 0; c < 4; c++) if (s - c >= 0 && s - c < 4) stud(ground, X(c) + 5, X(s - c) + 5, BASE);

  const bricks = BRICKS.map(([w, d, c0, r0, z0, h], i) => {
    const g = mk("g", {}, svg), x0 = X(c0) + 0.3, y0 = X(r0) + 0.3, x1 = X(c0 + w) - 0.3, y1 = X(r0 + d) - 0.3;
    const [r, inner] = rings(x0, y0, x1, y1, 1.8, 1.1);
    const body = solid(g), studs = [];
    for (let s = 0; s < w + d - 1; s++) for (let c = 0; c < w; c++) if (s - c >= 0 && s - c < d) studs.push({ c, r: s - c, el: null });
    studs.forEach((q) => { q.el = solid(g); });
    return { g, body, studs, r, inner, z0, h, x0, y0, o: tween(lift(i, REST_A)), drawn: NaN, w, d, c0, r0 };
  });

  function draw(b, o) {
    if (o === b.drawn) return;
    b.drawn = o;
    put(b.body, prism(P, front, b.r, b.inner, b.z0 + o, b.z0 + o + b.h));
    for (const q of b.studs) {
      const cx = X(b.c0 + q.c) + 5, cy = X(b.r0 + q.r) + 5, z = b.z0 + o + b.h;
      put(q.el, prism(P, front, rrect(cx - SR, cy - SR, cx + SR, cy + SR, SR, 5), rrect(cx - SR + 0.9, cy - SR + 0.9, cx + SR - 0.9, cy + SR - 0.9, SR - 0.9, 5), z, z + SH));
    }
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    bricks.forEach((b) => { draw(b, Math.round(tval(b.o, now) * 100) / 100); if (!tdone(b.o, now)) moving = true; });
    return moving;
  });
  bag.add(B.unregister);

  /** The build has reached brick a (-1 lets go: the rest pose). The stagger spreads from the brick chosen, or the one let go. */
  function build(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act, to = a < 0 ? REST_A : a, hi = a < 0 ? N - 1 : a;
    act = a;
    bricks.forEach((b, i) => {
      tset(b.o, lift(i, to), now, Math.abs(i - (from < 0 ? REST_A : from)) * stag);
      b.body.sil.classList.toggle("hi", i === hi);
      b.studs.forEach((q) => q.el.sil.classList.toggle("hi", i === hi));
    });
    read.textContent = a < 0 ? "rest" : "brick " + (a + 1);
    B.wake();
  }

  // static bands: the pointer's height on the screen, from the foot of the build to the tile's rest height
  const yB = P(44, 44, BASE)[1] - 22, yT = P(7, 7, 33.5)[1] + 10;
  const hit = ([x, y]) => (Math.abs(x - 200) > 140 || y < yT - 30 || y > yB + 50 ? -1 : clamp(Math.round(((yB - y) / (yB - yT)) * (N - 1)), 0, N - 1));
  bag.add(pointer(stage, { move: (p) => build(hit(p)), leave: () => build(-1) }));
  bag.add(() => svg.replaceChildren());

  bricks.forEach((b, i) => { draw(b, lift(i, REST_A)); });
  bricks[N - 1].body.sil.classList.add("hi");
  bricks[N - 1].studs.forEach((q) => q.el.sil.classList.add("hi"));

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "ladrillos",
  means: "Eight bricks build a small tower: the one under the pointer is seated with all below it, the rest hover over their slots.",
  rules: [1, 2, 4, 5, 8],
  range: [0, 50, 110],
  tour: [[200, 263], [200, 208], [200, 153], [200, 99], null],
  mount,
});

}
