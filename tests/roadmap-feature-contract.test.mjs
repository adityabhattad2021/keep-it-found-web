import assert from 'node:assert/strict'
import test from 'node:test'

import {
  roadmapPickLimit as backendPickLimit,
  votableRoadmapFeatureIds as backendFeatureIds,
} from '../functions/src/roadmap-features.ts'
import {
  roadmapPickLimit as websitePickLimit,
  votableRoadmapFeatureIds as websiteFeatureIds,
} from '../src/roadmap/roadmap-content.ts'

test('website and backend expose the same votable roadmap features', () => {
  assert.deepEqual([...websiteFeatureIds].sort(), [...backendFeatureIds].sort())
  assert.equal(websitePickLimit, backendPickLimit)
  assert.equal(new Set(websiteFeatureIds).size, websiteFeatureIds.length)
})
