import assert from 'node:assert/strict'
import test from 'node:test'

import { applyRoadmapPickChange } from './roadmap-pick-change.ts'

test('pick changes add, remove, and replace without reordering unrelated picks', () => {
  assert.deepEqual(applyRoadmapPickChange(['a'], { featureId: 'b', type: 'add' }), ['a', 'b'])
  assert.deepEqual(applyRoadmapPickChange(['a', 'b'], { featureId: 'a', type: 'remove' }), ['b'])
  assert.deepEqual(applyRoadmapPickChange(
    ['a', 'b'],
    { featureId: 'd', replacedFeatureId: 'b', type: 'replace' },
  ), ['a', 'd'])
})

test('pick changes reject over-limit and stale replacements', () => {
  assert.throws(() => applyRoadmapPickChange(['a', 'b'], { featureId: 'd', type: 'add' }))
  assert.throws(() => applyRoadmapPickChange(
    ['a', 'b'],
    { featureId: 'd', replacedFeatureId: 'missing', type: 'replace' },
  ))
})
