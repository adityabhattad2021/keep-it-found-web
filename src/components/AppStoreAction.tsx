import { siteConfig } from '../site-config'

export const appAvailability = `No account · iPhone with iOS ${siteConfig.app.minimumIosVersion} or later`

type AppStoreActionProps = Readonly<{
  placement: 'closing' | 'get' | 'hero'
}>

export function AppStoreAction({ placement }: AppStoreActionProps) {
  return (
    <div className={`app-store-action app-store-action--${placement}`} id={placement === 'hero' ? 'get-found' : undefined}>
      <AppStoreLink />
      <small className="app-store-action__note">{appAvailability}</small>
    </div>
  )
}

export function AppStoreLink() {
  return (
    <a
      aria-label="Get Found, free on the App Store (opens in a new tab)"
      className="app-store-link press-surface press-surface--raised"
      href={siteConfig.app.appStoreUrl}
      rel="noreferrer"
      target="_blank"
    >
      <span><strong>Get Found</strong><small>Free on the App Store</small></span>
    </a>
  )
}
