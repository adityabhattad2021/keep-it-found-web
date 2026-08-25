export type AcquisitionPlatform = 'android' | 'ios' | 'unknown'

export type DeviceSignals = Readonly<{
  userAgent: string
  maxTouchPoints?: number
}>

export function detectAcquisitionPlatform({
  userAgent,
  maxTouchPoints = 0,
}: DeviceSignals): AcquisitionPlatform {
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/i.test(userAgent)) return 'ios'

  const isIPadUsingDesktopUserAgent = /Macintosh/i.test(userAgent) && maxTouchPoints > 1
  return isIPadUsingDesktopUserAgent ? 'ios' : 'unknown'
}

export function resolveAcquisitionPlatform(search: string, device: DeviceSignals): AcquisitionPlatform {
  const requestedPlatform = new URLSearchParams(search).get('platform')
  if (requestedPlatform === 'android' || requestedPlatform === 'ios') return requestedPlatform
  return detectAcquisitionPlatform(device)
}

export function buildAcquisitionPlatformUrl(
  currentUrl: string,
  platform: Exclude<AcquisitionPlatform, 'unknown'>,
): URL {
  const nextUrl = new URL(currentUrl)
  nextUrl.searchParams.set('platform', platform)
  return nextUrl
}
