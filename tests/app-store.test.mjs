import assert from 'node:assert/strict'
import test from 'node:test'

import { appStoreId, appStoreUrl } from '../src/app-store.ts'
import { siteConfig } from '../src/site-config.ts'

test('the site points at the App Store listing Apple publishes for Found', () => {
  assert.equal(appStoreId, '6804260279')
  assert.equal(appStoreUrl, 'https://apps.apple.com/app/found-private-library/id6804260279')
  assert.doesNotMatch(appStoreUrl, /\/(us|in|gb)\//, 'the URL must stay storefront-neutral')
  assert.equal(siteConfig.app.appStoreUrl, appStoreUrl)
  assert.equal(siteConfig.app.minimumIosVersion, '16.4')
})
