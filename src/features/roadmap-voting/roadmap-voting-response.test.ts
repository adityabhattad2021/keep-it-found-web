import assert from 'node:assert/strict'
import test from 'node:test'

import { parsePickResult, parsePickSnapshot } from './roadmap-voting-response.ts'

test('pick snapshots accept known counts and up to two unique picks', () => {
  assert.deepEqual(parsePickSnapshot({
    counts: { 'found-outside-found': 4 },
    pickedFeatureIds: ['found-outside-found'],
  }), {
    counts: { 'found-outside-found': 4 },
    pickedFeatureIds: ['found-outside-found'],
  })
})

test('pick snapshots reject malformed, unknown, duplicate, and excessive picks', () => {
  assert.throws(() => parsePickSnapshot({ counts: { 'found-outside-found': -1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: { unknown: 1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: {}, pickedFeatureIds: ['found-outside-found', 'found-outside-found'] }))
  assert.throws(() => parsePickSnapshot({
    counts: {},
    pickedFeatureIds: [
      'found-outside-found',
      'reusable-kits',
      'active-library',
    ],
  }))
})

test('pick results validate changed counts and the authoritative selection', () => {
  assert.deepEqual(parsePickResult({
    counts: { 'found-outside-found': 2, 'reusable-kits': 7 },
    pickedFeatureIds: ['found-outside-found'],
  }), {
    counts: { 'found-outside-found': 2, 'reusable-kits': 7 },
    pickedFeatureIds: ['found-outside-found'],
  })
  assert.throws(() => parsePickResult({ counts: { 'found-outside-found': 1.5 }, pickedFeatureIds: [] }))
})
