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
  assert.match(privacy, /Siri &amp; Spotlight is off on a fresh install/)
  assert.match(privacy, /Turning the switch off removes the copy/)
  assert.match(privacy, /does not save it/)
  assert.match(privacy, /without Full Access/)
  assert.match(privacy, /Apple&#x27;s on-device model/)
  assert.match(privacy, /Until you tap KEEP, Found reads only the clipboard&#x27;s change count/)
  assert.match(privacy, /never reads the content itself/)
  assert.match(privacy, /clears from the clipboard after two minutes/)
  assert.match(privacy, /Crash reports are off until you turn on Send crash reports/)
  assert.match(privacy, /Hugging Face/)
  assert.match(privacy, /Found asks before it first fetches a preview/)
  assert.match(privacy, /does not exclude its data from your iPhone&#x27;s own backups/)
  assert.match(privacy, /Effective September 29, 2026/)
  assert.doesNotMatch(privacy, /Spotlight &amp; Shortcuts|Found Here|Enhanced Search/)

  assert.match(terms, /one-time non-consumable purchase/)
  assert.match(terms, /A one-time purchase. No subscription./)
  assert.match(terms, /A bookplate of your own/)
  assert.match(terms, /Ink and Imprint/)
  assert.match(terms, /A personal First Edition page inside Found/)
  assert.match(terms, /Every feature of Found is free/)
  assert.match(terms, /restorable with the Apple Account/)
  assert.match(terms, /Alternate icons need an iPhone that allows them/)
  assert.match(terms, /No unreleased feature, product, service, subscription/)
  assert.match(terms, /Purchase First Edition based only on the benefits identified as available today/)
  assert.doesNotMatch(terms, /Found Everywhere|twelve-month|twelve months|first year/)
  assert.match(terms, /href="\/privacy\/"/)
})

test('support answers match Found 1.1 on iPhone', async (context) => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  context.after(() => server.close())

  const { SupportPage } = await server.ssrLoadModule('/src/pages/SupportPage.tsx')
  const { siteConfig } = await server.ssrLoadModule('/src/site-config.ts')
  const support = renderToStaticMarkup(createElement(SupportPage))

  assert.match(support, /Settings › Siri &amp; Spotlight/)
  assert.match(support, /It is off on a fresh install/)
  assert.match(support, /Refresh Siri &amp; Spotlight/)
  assert.match(support, /Edit Actions/)
  assert.match(support, /Add to Found Keyboard/)
  assert.match(support, /does not need Full Access/)
  assert.match(support, /“Ask Found” or “Ask Found a question”/)
  assert.doesNotMatch(support, /Ask Found what/)
  assert.match(support, /Spotlight matches items by name/)
  assert.match(support, /The details and dates it lists need no Apple Intelligence/)
  assert.match(support, /Found reads the clipboard only when you tap KEEP/)
  assert.match(support, /Restoring replaces the library/)
  assert.match(support, /Restore Purchase/)
  assert.ok(support.includes(`mailto:${siteConfig.supportEmail}`))
  assert.ok(support.includes(siteConfig.issueUrl))
  assert.doesNotMatch(support, /Spotlight &amp; Shortcuts|Found Here|Enhanced Search|Refresh iPhone Search/)
})
