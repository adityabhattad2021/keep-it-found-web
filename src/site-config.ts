import { appStoreId, appStoreUrl, minimumIosVersion } from './app-store.ts'

export const siteConfig = {
  name: 'Found',
  description: 'A private, local-first library for things worth finding again.',
  tagline: 'Save it once. Find it by meaning. Use it right here.',
  canonicalUrl: 'https://keep-it-found.app/',
  issueUrl: 'https://github.com/adityabhattad2021/keep-it-found-web/issues/new/choose',
  supportEmail: 'adityabhattad18@gmail.com',
  app: {
    appStoreId,
    appStoreUrl,
    minimumIosVersion,
  },
} as const

/** The launch film on YouTube. The site plays its own copy, so watching loads nothing from YouTube. */
export const filmOnYouTube = 'https://www.youtube.com/watch?v=qaoqS_fjirM'

export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const relative = path.replace(/^\//, '')
  return `${base}${relative}`
}
