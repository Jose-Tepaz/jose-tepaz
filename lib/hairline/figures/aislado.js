// Hairline figure (lucasmarkes/hairline). Wrapped so the kernel and `hairline` are injected.
// @ts-nocheck
export default function define(HL, hairline) {
/**
 * Aislado: three machines that are meant to talk, a drum of disks, a rack and
 * a tower, each with a cable reaching toward the others. The cables never meet:
 * every pair stops short and a dashed gap says what is missing. The pointer
 * picks a machine and its cables stretch out toward the neighbours, in turn,
 * but however far they go, they stop short. The slider is that reach, as a
 * share of the distance between the machines.
 *
 * The pattern: one of many. Tweens, a stagger by distance, identity carried by
 * geometry, and a hit test on each machine's rest pose.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, rrect, seg, tdone, tset, tval, tween, unproj,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const NODES = [
  { c: [30, 30], h: 30, hit: 22 },   // a drum of three disks
  { c: [62, 122], h: 36, hit: 18 },  // a tower with a cap
  { c: [125, 62], h: 14, hit: 30 },  // a rack with slits and a light
];
const ZC = 1.5, STEP = 70, MAXF = 0.54, SEEN = 0.4;
const rest = (i, j) => 0.24 + 0.04 * ((i + 2 * j) % 3);

function build(P, front, svg, k) {
  const g = mk("g", {}, svg), [cx, cy] = NODES[k].c, sil = [];
  const part = (x0, y0, x1, y1, r, b, z0, z1) => {
    const s = solid(g);
    put(s, prism(P, front, rrect(x0, y0, x1, y1, r, 14), rrect(x0 + b, y0 + b, x1 - b, y1 - b, r - b, 14), z0, z1));
    sil.push(s.sil);
  };
  if (k === 0) for (let d = 0; d < 3; d++) part(cx - 13, cy - 13, cx + 13, cy + 13, 13, 1.6, d * 10.5, d * 10.5 + 8.5);
  if (k === 1) {
    part(cx - 10, cy - 10, cx + 10, cy + 10, 3, 1.4, 0, 30);
    part(cx - 6, cy - 6, cx + 6, cy + 6, 2.4, 1, 30, 36);
    place(mk("circle", { r: 1.7, class: "dot off" }, g), P(cx + 10, cy, 14));
  }
  if (k === 2) {
    const [x0, y0, x1, y1] = [cx - 23, cy - 13, cx + 23, cy + 13];
    part(x0, y0, x1, y1, 4, 1.4, 0, 14);
    mk("path", { class: "nf lo", d: seg(P(x0 + 6, y1, 4.5), P(x1 - 14, y1, 4.5)) + seg(P(x0 + 6, y1, 9), P(x1 - 14, y1, 9)) }, g);
    place(mk("circle", { r: 1.7, class: "dot off" }, g), P(x1 - 7, y1, 9));
  }
  return sil;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value, act = -1;

  const C = Cam(45, 0.5, 2.15);
  fit(C, [[0, 0, 0], [150, 0, 0], [0, 140, 0], [150, 140, 0], [30, 30, 30], [62, 122, 36]], 200, 168);
  const P = proj(C), front = facing(C);

  // cables first, behind every machine: they leave a machine's centre and its body covers the start
  const dashes = mk("g", {}, svg), lines = mk("g", {}, svg), tips = mk("g", {}, svg);
  const stubs = [], cables = [];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const n = cables.length, pair = [];
    for (const [a, b] of [[i, j], [j, i]]) {
      const [ax, ay] = NODES[a].c, [bx, by] = NODES[b].c, d = [bx - ax, by - ay];
      const s = { a, b, d, tw: tween(rest(a, b)), line: mk("path", { class: "nf" }, lines), tip: flatDot(tips, C, 1.9, "dot off"), f: NaN, n };
      pair.push(s); stubs.push(s);
    }
    cables.push({ pair, dash: mk("path", { class: "nf dash" }, dashes), n });
  }
  const sils = NODES.map((_, k) => build(P, front, svg, k));
  // paint back to front by x + y
  const order = NODES.map((n, k) => [n.c[0] + n.c[1], k]).sort((p, q) => p[0] - q[0]);
  const groups = sils.map((s) => s[0].parentNode.parentNode);
  order.forEach(([, k]) => svg.appendChild(groups[k]));

  const tipAt = (s, f) => [NODES[s.a].c[0] + s.d[0] * f, NODES[s.a].c[1] + s.d[1] * f];
  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const s of stubs) {
      const f = tval(s.tw, now);
      if (!tdone(s.tw, now)) moving = true;
      if (f === s.f) continue;
      s.f = f;
      const [tx, ty] = tipAt(s, f), [ax, ay] = NODES[s.a].c;
      s.line.setAttribute("d", seg(P(ax, ay, ZC), P(tx, ty, ZC)));
      place(s.tip, P(tx, ty, 0));
    }
    for (const c of cables) {
      const [p, q] = c.pair;
      c.dash.setAttribute("d", seg(P(...tipAt(p, p.f), ZC), P(...tipAt(q, q.f), ZC)));
    }
    return moving;
  });
  bag.add(B.unregister);

  function paint() {
    for (const s of stubs) {
      const on = s.a === act;
      s.line.classList.toggle("hi", on);
      s.tip.setAttribute("class", "dot" + (on || (act < 0 && s.n === 2) ? "" : " off"));
    }
    sils.forEach((ss, k) => ss.forEach((el) => el.classList.toggle("hi", k === act)));
  }
  paint();

  /** Retargets every cable: the machine picked reaches out, the cables facing it answer a little, the rest hold, staggered by distance. */
  function setActive(a) {
    const from = a >= 0 ? a : act, now = performance.now();
    act = a;
    for (const s of stubs) {
      const delay = s.a === from ? 0 : Math.abs(s.a - from) * STEP;
      const rank = s.b === (from + 1) % 3 ? 0 : 1;
      tset(s.tw, s.a === a ? clamp(reach, SEEN, MAXF) : rest(s.a, s.b) + (s.b === a ? 0.1 : 0), now, delay + (s.a === from ? rank * STEP : 0));
    }
    paint();
    read.textContent = a < 0 ? "rest" : `node ${a + 1}`;
    B.wake();
  }

  // the hit test reads each machine's rest pose: the pointer on three planes of the machine: its foot, its middle and its top
  function hit([x, y]) {
    let best = -1, bd = 1;
    NODES.forEach((n, k) => {
      const d = Math.min(...[0, n.h / 2, n.h].map((z) => { const [wx, wy] = unproj(C, x, y, z); return Math.hypot(wx - n.c[0], wy - n.c[1]); })) / n.hit;
      if (d < bd) { bd = d; best = k; }
    });
    return best;
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v; if (act >= 0) { const n = act; act = -1; setActive(n); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "aislado",
  means: "Three machines reach for each other with cables that stop short: the nearer the pointer, the farther they reach, and still they never meet.",
  rules: [1, 2, 5, 8],
  range: [0.42, 0.48, 0.54],
  tour: [[200, 92], [100, 152], [290, 186], null],
  mount,
});

}
