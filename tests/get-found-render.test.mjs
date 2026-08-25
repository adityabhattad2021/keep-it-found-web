import assert from 'node:assert/strict'
import test from 'node:test'

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('the acquisition page renders only actions allowed by each release state', async (context) => {
  const server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  context.after(() => server.close())

  const { GetFoundPage } = await server.ssrLoadModule('/src/pages/GetFoundPage.tsx')
  const render = (initialPlatform, releases) => renderToStaticMarkup(
    createElement(GetFoundPage, { initialPlatform, releases }),
  )

  const androidClosedTest = render('android', {
    android: {
      mode: 'closed-test',
      groupUrl: 'https://groups.example.test',
      storeUrl: 'https://play.example.test',
    },
    ios: { mode: 'reviewing', testFlightUrl: 'https://testflight.example.test' },
  })
  assert.match(androidClosedTest, /https:\/\/groups\.example\.test/)
  assert.match(androidClosedTest, /https:\/\/play\.example\.test/)
  assert.match(androidClosedTest, /access-step__disclosure/)
  assert.match(androidClosedTest, /opens in a new tab/)
  assert.match(androidClosedTest, /target="_blank"/)
  assert.match(androidClosedTest, /rel="noreferrer"/)
  assert.match(androidClosedTest, /role="group"/)
  assert.match(androidClosedTest, /aria-controls="platform-access"/)
  assert.match(androidClosedTest, /role="region"/)

  const androidProduction = render('android', {
    android: { mode: 'production', storeUrl: 'https://play.example.test/production' },
    ios: { mode: 'reviewing', testFlightUrl: 'https://testflight.example.test' },
  })
  assert.match(androidProduction, /https:\/\/play\.example\.test\/production/)
  assert.doesNotMatch(androidProduction, /https:\/\/groups\.example\.test/)

  const androidPaused = render('android', {
    android: { mode: 'paused' },
    ios: { mode: 'reviewing', testFlightUrl: 'https://testflight.example.test' },
  })
  assert.match(androidPaused, /aria-disabled="true"/)
  assert.doesNotMatch(androidPaused, /play\.example\.test/)

  const iosReviewing = render('ios', {
    android: { mode: 'paused' },
    ios: { mode: 'reviewing', testFlightUrl: 'https://testflight.example.test/private' },
  })
  assert.match(iosReviewing, /aria-disabled="true"/)
  assert.doesNotMatch(iosReviewing, /https:\/\/testflight\.example\.test\/private/)

  const iosTestFlight = render('ios', {
    android: { mode: 'paused' },
    ios: { mode: 'testflight', testFlightUrl: 'https://testflight.example.test/public' },
  })
  assert.match(iosTestFlight, /https:\/\/testflight\.example\.test\/public/)

  const iosProduction = render('ios', {
    android: { mode: 'paused' },
    ios: { mode: 'production', storeUrl: 'https://apps.example.test/found' },
  })
  assert.match(iosProduction, /https:\/\/apps\.example\.test\/found/)
  assert.doesNotMatch(iosProduction, /aria-disabled="true"/)
})
