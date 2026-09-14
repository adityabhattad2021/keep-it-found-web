import assert from 'node:assert/strict'
import test from 'node:test'

import { parsePickResult, parsePickSnapshot } from './roadmap-voting-response.ts'

test('pick snapshots accept known counts and up to two unique picks', () => {
  assert.deepEqual(parsePickSnapshot({
    counts: { 'found-across-devices': 4 },
    pickedFeatureIds: ['found-across-devices'],
  }), {
    counts: { 'found-across-devices': 4 },
    pickedFeatureIds: ['found-across-devices'],
  })
})

test('pick snapshots reject malformed, unknown, duplicate, and excessive picks', () => {
  assert.throws(() => parsePickSnapshot({ counts: { 'found-across-devices': -1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: { unknown: 1 }, pickedFeatureIds: [] }))
  assert.throws(() => parsePickSnapshot({ counts: {}, pickedFeatureIds: ['found-across-devices', 'found-across-devices'] }))
  assert.throws(() => parsePickSnapshot({
    counts: {},
    pickedFeatureIds: [
      'found-across-devices',
      'deeper-iphone-intelligence',
      'trusted-ai-tools',
    ],
  }))
})

test('pick results validate changed counts and the authoritative selection', () => {
  assert.deepEqual(parsePickResult({
    counts: { 'found-across-devices': 2, 'deeper-iphone-intelligence': 7 },
    pickedFeatureIds: ['found-across-devices'],
  }), {
    counts: { 'found-across-devices': 2, 'deeper-iphone-intelligence': 7 },
    pickedFeatureIds: ['found-across-devices'],
  })
  assert.throws(() => parsePickResult({ counts: { 'found-across-devices': 1.5 }, pickedFeatureIds: [] }))
})
