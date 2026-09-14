import assert from 'node:assert/strict'
import test from 'node:test'

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('privacy and First Edition terms describe the implemented purchase contract', async (context) => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  context.after(() => server.close())

  const { PrivacyPage } = await server.ssrLoadModule('/src/pages/PrivacyPage.tsx')
  const { FirstEditionTermsPage } = await server.ssrLoadModule('/src/pages/FirstEditionTermsPage.tsx')
  const privacy = renderToStaticMarkup(createElement(PrivacyPage))
  const terms = renderToStaticMarkup(createElement(FirstEditionTermsPage))

  assert.match(privacy, /RevenueCat/)
  assert.match(privacy, /anonymous app user identifier/)
  assert.match(privacy, /does not send RevenueCat your name/)
  assert.match(privacy, /never receives your payment-card information/)
  assert.match(privacy, /bookplate and app-icon choice are stored on your device/)

  assert.match(terms, /one-time non-consumable purchase/)
  assert.match(terms, /immediately unlocks the First Edition member page/)
  assert.match(terms, /No unreleased feature, product, service, subscription/)
  assert.match(terms, /Purchase First Edition based only on the benefits identified as available today/)
  assert.doesNotMatch(terms, /Found Everywhere|twelve-month|twelve months|first year/)
  assert.match(terms, /href="\/privacy\/"/)
})
