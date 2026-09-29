import assert from 'node:assert/strict'
import test from 'node:test'

import { parsePickResult, parsePickSnapshot } from './roadmap-voting-response.ts'

test('pick snapshots accept known counts and up to two unique picks', () => {
  assert.deepEqual(parsePickSnapshot({
    counts: { 'siri-knows-found': 4 },
    pickedFeatureIds: ['siri-knows-found'],
  }), {
    counts: { 'siri-knows-found': 4 },
    pickedFeatureIds: ['siri-knows-found'],
  })
})

test('pick snapshots reject malformed, unknown, duplicate, and excessive picks', () => {
  assert.throws(() => parsePickSnapshot({ counts: { 'siri-knows-found': -1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: { unknown: 1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: {}, pickedFeatureIds: ['siri-knows-found', 'siri-knows-found'] }))
  assert.throws(() => parsePickSnapshot({
    counts: {},
    pickedFeatureIds: [
      'siri-knows-found',
      'start-from-context',
      'keep-from-anywhere',
    ],
  }))
})

test('pick results validate changed counts and the authoritative selection', () => {
  assert.deepEqual(parsePickResult({
    counts: { 'siri-knows-found': 2, 'start-from-context': 7 },
    pickedFeatureIds: ['siri-knows-found'],
  }), {
    counts: { 'siri-knows-found': 2, 'start-from-context': 7 },
    pickedFeatureIds: ['siri-knows-found'],
  })
  assert.throws(() => parsePickResult({ counts: { 'siri-knows-found': 1.5 }, pickedFeatureIds: [] }))
})
