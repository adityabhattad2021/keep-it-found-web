/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY?: string
  readonly VITE_FIREBASE_APP_ID?: string
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string
  readonly VITE_FIREBASE_PROJECT_ID?: string
  readonly VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN?: string
  readonly VITE_FIREBASE_APP_CHECK_SITE_KEY?: string
  readonly VITE_FIREBASE_FUNCTIONS_REGION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
