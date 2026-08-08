import { siteConfig } from '../site-config'
import { PlatformIcon } from './PlatformIcon'

type PlatformActionsProps = Readonly<{
  placement: 'hero' | 'closing'
}>

export function PlatformActions({ placement }: PlatformActionsProps) {
  return (
    <div
      className={`platform-actions platform-actions--${placement}`}
      id={placement === 'hero' ? 'get-found' : undefined}
      aria-label="Found platform availability"
    >
      <PlatformAction platform="Android" release={siteConfig.releases.android} />
      <PlatformAction platform="iOS" release={siteConfig.releases.ios} />
    </div>
  )
}

function PlatformAction({ platform, release }: Readonly<{
  platform: 'Android' | 'iOS'
  release: (typeof siteConfig.releases)['android'] | (typeof siteConfig.releases)['ios']
}>) {
  const content = (
    <>
      <span className="platform-action__icon"><PlatformIcon platform={platform} /></span>
      <strong>{release.label}</strong>
      <small>{release.detail}</small>
    </>
  )

  if (!release.href) {
    return <span aria-disabled="true" className="platform-action platform-action--disabled">{content}</span>
  }

  return (
    <a
      className="platform-action press-surface press-surface--raised"
      href={release.href}
      rel={release.external ? 'noreferrer' : undefined}
      target={release.external ? '_blank' : undefined}
    >
      {content}
    </a>
  )
}
