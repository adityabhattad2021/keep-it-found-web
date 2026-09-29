import assert from 'node:assert/strict'
import test from 'node:test'

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('the Get page sends people to the App Store and explains the setup that follows', async (context) => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  context.after(() => server.close())

  const { GetFoundPage } = await server.ssrLoadModule('/src/pages/GetFoundPage.tsx')
  const { appStoreUrl } = await server.ssrLoadModule('/src/app-store.ts')
  const page = renderToStaticMarkup(createElement(GetFoundPage))

  assert.match(page, new RegExp(`href="${appStoreUrl}"`))
  assert.match(page, /Free on the App Store/)
  assert.match(page, /rel="noreferrer"/)
  assert.match(page, /target="_blank"/)
  assert.match(page, /id="setup"/)
  assert.match(page, /Find with Found/)
  assert.match(page, /Found Keyboard/)
  assert.match(page, /Siri &amp; Spotlight/)
  assert.doesNotMatch(page, /Spotlight &amp; Shortcuts|Found Here/)
  assert.match(page, /Search by meaning/)
  assert.match(page, /without Full Access|does not ask for Full Access/)
  assert.match(page, /Ask Found a question/)
})
