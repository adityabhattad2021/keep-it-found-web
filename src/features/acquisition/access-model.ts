import type { AndroidRelease, IosRelease, PlatformReleases } from '../../site-config'

export type AccessAction = Readonly<{
  href: string
  label: string
}>

export type AndroidAccessModel =
  | Readonly<{
      mode: 'closed-test'
      status: 'CLOSED TEST'
      groupAction: AccessAction
      storeAction: AccessAction
    }>
  | Readonly<{
      mode: 'paused'
      status: 'PAUSED'
    }>
  | Readonly<{
      mode: 'production'
      status: 'AVAILABLE'
      storeAction: AccessAction
    }>

export type IosAccessModel =
  | Readonly<{
      mode: 'production'
      status: 'AVAILABLE'
      storeAction: AccessAction
    }>
  | Readonly<{
      mode: 'reviewing'
      status: 'IN REVIEW'
    }>
  | Readonly<{
      mode: 'testflight'
      status: 'TESTFLIGHT'
      testFlightAction: AccessAction
    }>

export function buildAndroidAccess(release: AndroidRelease): AndroidAccessModel {
  switch (release.mode) {
    case 'closed-test':
      return {
        mode: release.mode,
        status: 'CLOSED TEST',
        groupAction: { href: release.groupUrl, label: 'Join the tester group' },
        storeAction: { href: release.storeUrl, label: 'Open Google Play' },
      }
    case 'production':
      return {
        mode: release.mode,
        status: 'AVAILABLE',
        storeAction: { href: release.storeUrl, label: 'Get it on Google Play' },
      }
    case 'paused':
      return { mode: release.mode, status: 'PAUSED' }
  }
}

export function buildIosAccess(release: IosRelease): IosAccessModel {
  switch (release.mode) {
    case 'production':
      return {
        mode: release.mode,
        status: 'AVAILABLE',
        storeAction: { href: release.storeUrl, label: 'Open the App Store' },
      }
    case 'reviewing':
      return { mode: release.mode, status: 'IN REVIEW' }
    case 'testflight':
      return {
        mode: release.mode,
        status: 'TESTFLIGHT',
        testFlightAction: { href: release.testFlightUrl, label: 'Open TestFlight' },
      }
  }
}

export function describeAvailability(releases: PlatformReleases): string {
  return `${describeAndroid(releases.android)} · ${describeIos(releases.ios)}`
}

function describeAndroid(release: AndroidRelease): string {
  switch (release.mode) {
    case 'closed-test': return 'Android closed test'
    case 'paused': return 'Android access paused'
    case 'production': return 'Android available'
  }
}

function describeIos(release: IosRelease): string {
  switch (release.mode) {
    case 'production': return 'iOS available'
    case 'reviewing': return 'iOS pending review'
    case 'testflight': return 'iOS TestFlight'
  }
}
