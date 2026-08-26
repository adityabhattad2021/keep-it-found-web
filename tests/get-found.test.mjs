import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildAcquisitionPlatformUrl,
  detectAcquisitionPlatform,
  resolveAcquisitionPlatform,
} from '../src/features/acquisition/platform.ts'
import { siteConfig } from '../src/site-config.ts'

test('detects Android and Apple mobile devices', () => {
  assert.equal(detectAcquisitionPlatform({ userAgent: 'Mozilla/5.0 (Linux; Android 16; Pixel 10)' }), 'android')
  assert.equal(detectAcquisitionPlatform({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0)' }), 'ios')
})

test('detects an iPad as an Apple platform without implying product support', () => {
  assert.equal(detectAcquisitionPlatform({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',
    maxTouchPoints: 5,
  }), 'ios')
})

test('leaves desktop visitors unselected', () => {
  assert.equal(detectAcquisitionPlatform({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',
    maxTouchPoints: 0,
  }), 'unknown')
})

test('an explicit platform link takes precedence over device detection', () => {
  assert.equal(resolveAcquisitionPlatform('?platform=ios', {
    userAgent: 'Mozilla/5.0 (Linux; Android 16; Pixel 10)',
  }), 'ios')
})

test('changing platform updates only the acquisition query parameter', () => {
  const url = buildAcquisitionPlatformUrl(
    'https://keep-it-found.app/get/?ref=reddit&platform=android#install',
    'ios',
  )

  assert.equal(url.href, 'https://keep-it-found.app/get/?ref=reddit&platform=ios#install')
})

test('testing links use the intended Google and Apple destinations', () => {
  assert.equal(siteConfig.releases.android.mode, 'closed-test')
  assert.equal(siteConfig.releases.android.groupUrl, 'https://groups.google.com/g/found-android-beta/about')
  assert.equal(siteConfig.releases.android.storeUrl, 'https://play.google.com/apps/testing/com.keepitfound.app')
  assert.equal(siteConfig.releases.ios.mode, 'testflight')
  assert.equal(siteConfig.releases.ios.testFlightUrl, 'https://testflight.apple.com/join/dTgeP31u')
})
