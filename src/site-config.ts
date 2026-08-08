export type PlatformRelease = Readonly<{
  label: string
  detail: string
  href?: string
  external?: boolean
}>

export const siteConfig = {
  name: 'Found',
  description: 'A private, local-first library for things worth finding again.',
  canonicalUrl: 'https://keep-it-found.app/',
  issueUrl: 'https://github.com/adityabhattad2021/keep-it-found-web/issues/new/choose',
  supportEmail: 'adityabhattad18@gmail.com',
  releases: {
    android: {
      label: 'Android beta opening soon',
      detail: 'Closed testing',
      href: undefined,
      external: true,
    },
    ios: {
      label: 'iOS coming next',
      detail: 'TestFlight',
      href: undefined,
      external: true,
    },
  } satisfies Record<'android' | 'ios', PlatformRelease>,
} as const

export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const relative = path.replace(/^\//, '')
  return `${base}${relative}`
}
