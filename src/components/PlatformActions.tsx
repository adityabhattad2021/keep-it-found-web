import { describeAvailability } from '../features/acquisition/access-model'
import { siteConfig, sitePath } from '../site-config'

type PlatformActionsProps = Readonly<{
  placement: 'hero' | 'closing'
}>

export function PlatformActions({ placement }: PlatformActionsProps) {
  return (
    <div
      className={`platform-actions platform-actions--${placement}`}
      id={placement === 'hero' ? 'get-found' : undefined}
    >
      <a className="platform-action press-surface press-surface--raised" href={sitePath('get/')}>
        <strong>Get Found</strong>
        <small>{describeAvailability(siteConfig.releases)}</small>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}
