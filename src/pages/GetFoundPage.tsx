import { useState } from 'react'

import { PlatformIcon } from '../components/PlatformIcon'
import { SiteShell } from '../components/SiteShell'
import {
  buildAndroidAccess,
  buildIosAccess,
  type AccessAction,
} from '../features/acquisition/access-model'
import {
  buildAcquisitionPlatformUrl,
  resolveAcquisitionPlatform,
  type AcquisitionPlatform,
} from '../features/acquisition/platform'
import {
  siteConfig,
  sitePath,
  type AndroidRelease,
  type IosRelease,
  type PlatformReleases,
} from '../site-config'

const selectablePlatforms = ['android', 'ios'] as const

type GetFoundPageProps = Readonly<{
  initialPlatform?: AcquisitionPlatform
  releases?: PlatformReleases
}>

export function GetFoundPage({
  initialPlatform,
  releases = siteConfig.releases,
}: GetFoundPageProps = {}) {
  const [platform, setPlatform] = useState<AcquisitionPlatform>(() => (
    initialPlatform ?? resolveInitialPlatform()
  ))

  const selectPlatform = (nextPlatform: Exclude<AcquisitionPlatform, 'unknown'>) => {
    setPlatform(nextPlatform)
    window.history.replaceState(null, '', buildAcquisitionPlatformUrl(window.location.href, nextPlatform))
  }

  return (
    <SiteShell page="get">
      <main className="get-found-page">
        <header className="get-found-hero page-hero content-width">
          <p className="eyebrow">CURRENT RELEASES</p>
          <h1>Get Found.</h1>
          <p className="page-hero__lede">Choose your device to see what is available today and how to install it.</p>
        </header>

        <section className="access-section" aria-label="Choose your device">
          <div className="content-width access-section__inner">
            <header className="access-section__header">
              <p className="eyebrow">YOUR DEVICE</p>
              <div className="platform-switch" aria-label="Choose a mobile platform" role="group">
                {selectablePlatforms.map((option) => (
                  <button
                    aria-controls="platform-access"
                    aria-pressed={platform === option}
                    key={option}
                    onClick={() => selectPlatform(option)}
                    type="button"
                  >
                    <PlatformIcon platform={option === 'android' ? 'Android' : 'iOS'} />
                    {option === 'android' ? 'Android' : 'iPhone'}
                  </button>
                ))}
              </div>
            </header>

            <div aria-label="Platform access" aria-live="polite" id="platform-access" role="region">
              {platform === 'android' && <AndroidAccess release={releases.android} />}
              {platform === 'ios' && <IosAccess release={releases.ios} />}
              {platform === 'unknown' && (
                <div className="access-empty">
                  <p>Select the phone you want to install Found on.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="access-trust">
          <div className="content-width access-trust__inner">
            <p className="eyebrow">NO FOUND ACCOUNT</p>
            <p>Testing access is handled by Google Play or TestFlight. Found does not create a separate account or copy your store account into its own system.</p>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

function AndroidAccess({ release }: Readonly<{ release: AndroidRelease }>) {
  const access = buildAndroidAccess(release)

  return (
    <div className="access-workflow">
      <AccessTitle detail="Google Play" platform="Android" status={access.status} title="Found for Android" />

      {access.mode === 'closed-test' && (
        <>
          <p className="access-account-note"><strong>Use the same Google account for both steps.</strong> This must also be the account active in Google Play on your phone.</p>

          <ol className="access-steps">
            <li>
              <span className="access-step__number" aria-hidden="true">1</span>
              <div className="access-step__copy">
                <h4>Join the tester group</h4>
                <p className="access-step__disclosure">Google uses group membership to grant Play access. Group owners and managers can see your Google account email. Found does not use the group for messages or marketing. After joining, return to this tab.</p>
              </div>
              <ExternalAction action={access.groupAction} />
            </li>
            <li>
              <span className="access-step__number" aria-hidden="true">2</span>
              <div className="access-step__copy">
                <h4>Continue to Google Play</h4>
                <p>Choose Become a tester, then install Found from the Play Store. Already joined the group? Start here.</p>
              </div>
              <ExternalAction action={access.storeAction} />
            </li>
          </ol>

          <details className="access-help">
            <summary>Seeing &quot;App not available&quot;?</summary>
            <p>Confirm that Google Groups and Google Play use the same account, check that the group appears under My groups, then wait a few minutes and retry Google Play. Access changes can take time to propagate.</p>
            <a href={sitePath('support/')}>More troubleshooting</a>
          </details>
        </>
      )}

      {access.mode === 'production' && (
        <div className="direct-access">
          <p>Install Found from Google Play. Updates arrive through the Play Store.</p>
          <ExternalAction action={access.storeAction} />
        </div>
      )}

      {access.mode === 'paused' && (
        <div className="access-unavailable">
          <div>
            <strong>Android access is temporarily paused.</strong>
            <p>There is no waitlist or account to create. This page will change when testing reopens.</p>
          </div>
          <span aria-disabled="true">Access paused</span>
        </div>
      )}
    </div>
  )
}

function IosAccess({ release }: Readonly<{ release: IosRelease }>) {
  const access = buildIosAccess(release)
  const detail = access.mode === 'production' ? 'App Store' : 'TestFlight'

  return (
    <div className="access-workflow">
      <AccessTitle detail={detail} platform="iOS" status={access.status} title="Found for iPhone" />

      {access.mode === 'production' && (
        <div className="direct-access">
          <p>Install Found from the App Store. Updates arrive through the App Store.</p>
          <ExternalAction action={access.storeAction} />
        </div>
      )}

      {access.mode === 'testflight' && (
        <div className="direct-access">
          <p>TestFlight installs and updates the Found test build on your iPhone.</p>
          <ExternalAction action={access.testFlightAction} />
        </div>
      )}

      {access.mode === 'reviewing' && (
        <div className="access-unavailable">
          <div>
            <strong>The first external TestFlight build is with Apple.</strong>
            <p>Public access will open here after Beta App Review. There is no waitlist or account to create.</p>
          </div>
          <span aria-disabled="true">TestFlight opening soon</span>
        </div>
      )}
    </div>
  )
}

function AccessTitle({ detail, platform, status, title }: Readonly<{
  detail: string
  platform: 'Android' | 'iOS'
  status: string
  title: string
}>) {
  return (
    <header className="access-workflow__title">
      <div className="access-workflow__platform"><PlatformIcon platform={platform} /></div>
      <div>
        <p>{detail}</p>
        <h3>{title}</h3>
      </div>
      <span className="access-status">{status}</span>
    </header>
  )
}

function ExternalAction({ action }: Readonly<{ action: AccessAction }>) {
  return (
    <a
      aria-label={`${action.label} (opens in a new tab)`}
      className="access-step__action press-surface press-surface--raised"
      href={action.href}
      rel="noreferrer"
      target="_blank"
    >
      {action.label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function resolveInitialPlatform(): AcquisitionPlatform {
  if (typeof window === 'undefined') return 'unknown'

  return resolveAcquisitionPlatform(window.location.search, {
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints,
  })
}
