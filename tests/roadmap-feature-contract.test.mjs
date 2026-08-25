import assert from 'node:assert/strict'
import test from 'node:test'

import {
  roadmapPickLimit as backendPickLimit,
  roadmapRoundId as backendRoundId,
  votableRoadmapFeatureIds as backendFeatureIds,
} from '../functions/src/roadmap-features.ts'
import {
  roadmapPickLimit as websitePickLimit,
  roadmapRoundId as websiteRoundId,
  votableRoadmapFeatureIds as websiteFeatureIds,
} from '../src/roadmap/roadmap-content.ts'

test('website and backend expose the same roadmap voting contract', () => {
  assert.deepEqual([...websiteFeatureIds].sort(), [...backendFeatureIds].sort())
  assert.equal(websitePickLimit, backendPickLimit)
  assert.equal(websiteRoundId, backendRoundId)
  assert.equal(websitePickLimit, 2)
  assert.equal(websiteRoundId, 'reuse-v2')
  assert.equal(new Set(websiteFeatureIds).size, websiteFeatureIds.length)
})
