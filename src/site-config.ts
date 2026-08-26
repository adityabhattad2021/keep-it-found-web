export type AndroidRelease =
  | Readonly<{ mode: 'closed-test'; groupUrl: string; storeUrl: string }>
  | Readonly<{ mode: 'paused' }>
  | Readonly<{ mode: 'production'; storeUrl: string }>

export type IosRelease =
  | Readonly<{ mode: 'production'; storeUrl: string }>
  | Readonly<{ mode: 'reviewing'; testFlightUrl: string }>
  | Readonly<{ mode: 'testflight'; testFlightUrl: string }>

export type PlatformReleases = Readonly<{
  android: AndroidRelease
  ios: IosRelease
}>

export const siteConfig = {
  name: 'Found',
  description: 'A private, local-first library for things worth finding again.',
  canonicalUrl: 'https://keep-it-found.app/',
  issueUrl: 'https://github.com/adityabhattad2021/keep-it-found-web/issues/new/choose',
  supportEmail: 'adityabhattad18@gmail.com',
  releases: {
    android: {
      mode: 'closed-test',
      groupUrl: 'https://groups.google.com/g/found-android-beta/about',
      storeUrl: 'https://play.google.com/apps/testing/com.keepitfound.app',
    },
    ios: {
      mode: 'testflight',
      testFlightUrl: 'https://testflight.apple.com/join/dTgeP31u',
    },
  } satisfies PlatformReleases,
} as const

export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const relative = path.replace(/^\//, '')
  return `${base}${relative}`
}
