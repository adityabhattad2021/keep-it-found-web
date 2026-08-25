import assert from 'node:assert/strict'
import test from 'node:test'

import {
  parseFeatureId,
  parseFeatureIds,
  parseFeedbackMessage,
  planRoadmapPickUpdate,
  readVoteCount,
  roadmapPickLimit,
  roadmapRoundId,
  votableRoadmapFeatureIds,
} from '../lib/roadmap-features.js'

test('the active roadmap round allows exactly two picks per identity', () => {
  assert.equal(roadmapRoundId, 'reuse-v2')
  assert.equal(roadmapPickLimit, 2)
})

test('roadmap feature ids are unique and accepted', () => {
  assert.equal(new Set(votableRoadmapFeatureIds).size, votableRoadmapFeatureIds.length)
  for (const featureId of votableRoadmapFeatureIds) assert.equal(parseFeatureId(featureId), featureId)
})

test('unknown roadmap feature ids are rejected', () => {
  assert.throws(() => parseFeatureId('made-up-feature'))
  assert.throws(() => parseFeatureId(null))
})

test('roadmap picks are unique, known, and limited to the active round limit', () => {
  const valid = votableRoadmapFeatureIds.slice(0, roadmapPickLimit)
  assert.deepEqual(parseFeatureIds(valid), valid)
  assert.throws(() => parseFeatureIds([...valid, votableRoadmapFeatureIds[roadmapPickLimit]]))
  assert.throws(() => parseFeatureIds([valid[0], valid[0]]))
  assert.throws(() => parseFeatureIds(['not-a-roadmap-feature']))
})

test('pick transitions identify exact add, remove, replace, and no-op changes', () => {
  const [first, second, third] = votableRoadmapFeatureIds
  assert.deepEqual(planRoadmapPickUpdate([], [first]), {
    addedFeatureIds: [first],
    removedFeatureIds: [],
  })
  assert.deepEqual(planRoadmapPickUpdate([first, second], [first]), {
    addedFeatureIds: [],
    removedFeatureIds: [second],
  })
  assert.deepEqual(planRoadmapPickUpdate([first, second], [first, third]), {
    addedFeatureIds: [third],
    removedFeatureIds: [second],
  })
  assert.deepEqual(planRoadmapPickUpdate([first], [first]), {
    addedFeatureIds: [],
    removedFeatureIds: [],
  })
})

test('roadmap feedback is trimmed and bounded', () => {
  assert.equal(parseFeedbackMessage('  This would help me prepare client documents.  '), 'This would help me prepare client documents.')
  assert.throws(() => parseFeedbackMessage('  '))
  assert.throws(() => parseFeedbackMessage('x'.repeat(501)))
})

test('invalid stored vote counts fail closed to zero', () => {
  assert.equal(readVoteCount(12), 12)
  assert.equal(readVoteCount(-1), 0)
  assert.equal(readVoteCount(1.5), 0)
  assert.equal(readVoteCount('12'), 0)
})
