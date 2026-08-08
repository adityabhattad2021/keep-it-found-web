import { getApp, getApps, initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

import { parsePickResult, parsePickSnapshot } from './roadmap-voting-response.ts'
import type { RoadmapPickResult, RoadmapPickSnapshot } from './roadmap-voting-response.ts'

export type RoadmapVotingClient = Readonly<{
  loadSnapshot(): Promise<RoadmapPickSnapshot>
  setPicks(featureIds: readonly string[]): Promise<RoadmapPickResult>
  submitFeedback(featureId: string, message: string): Promise<void>
}>

let client: RoadmapVotingClient | null | undefined

export function getRoadmapVotingClient(): RoadmapVotingClient | null {
  if (client !== undefined) return client

  const config = readFirebaseConfig()
  if (!config) {
    client = null
    return client
  }

  if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN === 'true') {
    Object.assign(globalThis, { FIREBASE_APPCHECK_DEBUG_TOKEN: true })
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config.firebase)
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(config.appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  })

  const auth = getAuth(app)
  const functions = getFunctions(app, config.functionsRegion)
  const loadVotes = httpsCallable(functions, 'getRoadmapVotes')
  const setRoadmapPicks = httpsCallable(functions, 'setRoadmapPicks')
  const submitFeedback = httpsCallable(functions, 'submitRoadmapFeedback')
  let snapshotRequest: Promise<RoadmapPickSnapshot> | null = null

  client = {
    loadSnapshot() {
      snapshotRequest ??= auth.authStateReady()
        .then(() => loadVotes())
        .then((result) => parsePickSnapshot(result.data))
        .catch((error: unknown) => {
          snapshotRequest = null
          throw error
        })
      return snapshotRequest
    },
    async setPicks(featureIds) {
      await auth.authStateReady()
      if (!auth.currentUser) await signInAnonymously(auth)
      const result = await setRoadmapPicks({ featureIds })
      return parsePickResult(result.data)
    },
    async submitFeedback(featureId, message) {
      await auth.authStateReady()
      if (!auth.currentUser) throw new Error('Pick this feature before sharing roadmap feedback')
      await submitFeedback({ featureId, message })
    },
  }

  return client
}

function readFirebaseConfig() {
  const firebase = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  }
  const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY

  if (Object.values(firebase).some((value) => !value) || !appCheckSiteKey) return null

  return {
    appCheckSiteKey,
    firebase,
    functionsRegion: import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'us-central1',
  }
}
