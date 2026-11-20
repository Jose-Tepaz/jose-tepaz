// Proves the patch bay's geometry with the Anatomy audit: depth order, contacts, clearances.
// Run: node scripts/patchbay-audit.mjs [0,0,0] [1,1,1] ...  (each argument is one pose: the three plugs' shares)
import { P } from '../components/iso/patchbay/layout.mjs'
import { buildStatic } from '../components/iso/patchbay/static.mjs'
import { buildUnit } from '../components/iso/patchbay/unit.mjs'
import * as A from '../components/iso/audit.mjs'

const poses = process.argv
  .slice(2)
  .filter((a) => /^[\d.,]+$/.test(a))
  .map((a) => a.split(',').map(Number))
if (!poses.length) poses.push([0, 0, 0], [1, 1, 1])
let failed = 0

for (const shares of poses) {
  const R = A.recorder(P)
  R.A = A
  buildStatic(R)
  shares.forEach((share, i) => buildUnit(R, i, share))
  const geometric = new Map(R.items.map((item) => [item, item.key]))
  A.settle(R, P)
  const moved = R.items.filter(
    (item) => Math.abs(item.key - geometric.get(item)) > 1e-6 && item.key >= 900,
  )
  console.log(
    `\n=== pose ${shares.join(',')} · ${R.items.length} items · ${R.solids.length} solids · ${R.tubes.length} tubes`,
  )
  if (moved.length)
    console.log(`unit pieces whose key had to move: ${moved.map((i) => i.name).join(', ')}`)
  // a plug in flight is held by the cord and a hand: count it as ground so only real faults show
  const inFlight = shares.some((share) => share > 0 && share < 1)
  const ground = inFlight
    ? (shape) => A.grounded(shape) || /^plug\d\./.test(shape.name ?? '')
    : undefined
  const result = A.audit(R, P, ground ? { ground } : {})
  console.log(A.report(result))
  const count = A.failures(result)
  console.log(count ? `FAILED: ${count}` : 'passed')
  failed += count
}
process.exitCode = failed ? 1 : 0
