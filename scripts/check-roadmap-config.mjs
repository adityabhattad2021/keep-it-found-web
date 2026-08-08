const requiredVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_CHECK_SITE_KEY',
]

const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim())

if (missingVariables.length > 0) {
  console.error(`Roadmap voting configuration is incomplete: ${missingVariables.join(', ')}`)
  process.exitCode = 1
} else {
  console.log('Roadmap voting configuration is complete.')
}
