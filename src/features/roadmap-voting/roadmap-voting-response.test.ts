import assert from 'node:assert/strict'
import test from 'node:test'

import { parsePickResult, parsePickSnapshot } from './roadmap-voting-response.ts'

test('pick snapshots accept known counts and up to three unique picks', () => {
  assert.deepEqual(parsePickSnapshot({
    counts: { 'found-can-act': 4 },
    pickedFeatureIds: ['found-can-act'],
  }), {
    counts: { 'found-can-act': 4 },
    pickedFeatureIds: ['found-can-act'],
  })
})

test('pick snapshots reject malformed, unknown, duplicate, and excessive picks', () => {
  assert.throws(() => parsePickSnapshot({ counts: { 'found-can-act': -1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: { unknown: 1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: {}, pickedFeatureIds: ['found-can-act', 'found-can-act'] }))
  assert.throws(() => parsePickSnapshot({
    counts: {},
    pickedFeatureIds: [
      'found-can-act',
      'intelligent-retrieval',
      'open-automation',
      'personal-adaptation',
    ],
  }))
})

test('pick results validate changed counts and the authoritative selection', () => {
  assert.deepEqual(parsePickResult({
    counts: { 'found-can-act': 2, 'intelligent-retrieval': 7 },
    pickedFeatureIds: ['found-can-act'],
  }), {
    counts: { 'found-can-act': 2, 'intelligent-retrieval': 7 },
    pickedFeatureIds: ['found-can-act'],
  })
  assert.throws(() => parsePickResult({ counts: { 'found-can-act': 1.5 }, pickedFeatureIds: [] }))
})
