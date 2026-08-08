import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, Ref } from 'react'
import { useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

const ribbonItems = [
  { href: '#feature-capture', label: 'CAPTURE' },
  { href: '#feature-work', label: 'WRITE & DO' },
  { href: '#feature-remind', label: 'REMIND' },
  { href: '#feature-files', label: 'KEEP' },
  { href: '#feature-find', label: 'FIND & REUSE' },
  { href: '#feature-own', label: 'OWN' },
] as const

const RIBBON_SPEED_PX_PER_SECOND = 30

export function FeatureRibbon() {
  const sequenceRef = useRef<HTMLDivElement>(null)
  const sequenceWidthRef = useRef(0)
  const pageIsHiddenRef = useRef(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const isPaused = hasFocus || isHovered || isPressed

  const beginTouchScroll = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch' || shouldReduceMotion) return

    const sequenceWidth = sequenceWidthRef.current
    if (sequenceWidth === 0) return

    event.currentTarget.scrollLeft = Math.abs(x.get()) % sequenceWidth
    x.set(0)
  }

  const finishTouchScroll = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch' || shouldReduceMotion) return

    const sequenceWidth = sequenceWidthRef.current
    if (sequenceWidth === 0) return

    x.set(-(event.currentTarget.scrollLeft % sequenceWidth))
    event.currentTarget.scrollLeft = 0
  }

  useEffect(() => {
    const sequence = sequenceRef.current
    if (!sequence) return

    const updateWidth = () => {
      const previousWidth = sequenceWidthRef.current
      const nextWidth = sequence.getBoundingClientRect().width
      const progress = previousWidth > 0 ? Math.abs(x.get() / previousWidth) % 1 : 0

      sequenceWidthRef.current = nextWidth
      x.set(-progress * nextWidth)
    }
    const observer = new ResizeObserver(updateWidth)

    updateWidth()
    observer.observe(sequence)
    return () => observer.disconnect()
  }, [x])

  useEffect(() => {
    if (shouldReduceMotion) x.set(0)
  }, [shouldReduceMotion, x])

  useEffect(() => {
    const handleVisibilityChange = () => {
      pageIsHiddenRef.current = document.hidden
    }

    handleVisibilityChange()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useAnimationFrame((_, delta) => {
    const sequenceWidth = sequenceWidthRef.current
    if (shouldReduceMotion || isPaused || pageIsHiddenRef.current || sequenceWidth === 0) return

    let nextX = x.get() - (RIBBON_SPEED_PX_PER_SECOND * delta) / 1000
    while (nextX <= -sequenceWidth) nextX += sequenceWidth
    x.set(nextX)
  })

  return (
    <nav
      aria-label="Explore Found features"
      className="feature-ribbon"
      data-static={shouldReduceMotion ? 'true' : undefined}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
      }}
      onFocusCapture={() => setHasFocus(true)}
      onPointerCancel={(event) => {
        finishTouchScroll(event)
        setIsPressed(false)
      }}
      onPointerDown={(event) => {
        beginTouchScroll(event)
        setIsPressed(true)
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(false)
      }}
      onPointerUp={(event) => {
        finishTouchScroll(event)
        setIsPressed(false)
      }}
    >
      <m.div className="feature-ribbon__track" style={{ x }}>
        <RibbonSequence ref={sequenceRef} />
        <RibbonSequence duplicate />
      </m.div>
    </nav>
  )
}

function RibbonSequence({
  duplicate = false,
  ref,
}: Readonly<{
  duplicate?: boolean
  ref?: Ref<HTMLDivElement>
}>) {
  return (
    <div aria-hidden={duplicate || undefined} className="feature-ribbon__sequence" ref={ref}>
      {ribbonItems.map((item) => (
        <a href={item.href} key={item.href} tabIndex={duplicate ? -1 : undefined}>
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  )
}
