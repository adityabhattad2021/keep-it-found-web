import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

import { sitePath } from '../site-config'
import { usePrefersReducedMotion } from './use-motion'

type DeviceProps = Readonly<{
  /** A clip in public/media: its .mp4 plays and its .jpg is the poster. */
  clip: string
  label: string
  width?: string
  className?: string
  /** Loop the recording while it is on screen (the default), or leave playback to the caller. */
  autoplay?: boolean
}>

/**
 * A real recording of Found inside the film's iPhone. It plays only while it is on
 * screen, and not at all for people who ask for less motion: they see the poster.
 */
export function Device({ clip, label, width = '320px', className, autoplay = true }: DeviceProps) {
  const reducedMotion = usePrefersReducedMotion()
  const ownRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ownRef.current
    if (!video) return
    // Set in the DOM, not only as a prop, so browsers allow the silent loop to play.
    video.muted = true
    video.defaultMuted = true
    if (!autoplay) return
    if (reducedMotion) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined)
      else video.pause()
    }, { threshold: 0.35 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [autoplay, reducedMotion])


  return (
    <figure className={`device${className ? ` ${className}` : ''}`} style={{ '--device-width': width } as CSSProperties}>
      <div className="device__screen">
        <video
          ref={ownRef}
          aria-label={label}
          muted
          playsInline
          loop={autoplay}
          preload="metadata"
          poster={sitePath(`media/${clip}.jpg`)}
          src={sitePath(`media/${clip}.mp4`)}
        />
      </div>
    </figure>
  )
}
