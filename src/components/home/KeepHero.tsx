import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'

import { sitePath } from '../../site-config'
import { usePrefersReducedMotion } from '../use-motion'

/**
 * The keep moment from Found's onboarding, on the web: press and hold the Found
 * icon and the things around it are pulled in, one after another, faster and
 * faster, with the icon giving a little under each arrival and its badge
 * counting. When all of it is kept, the icon opens into the library.
 *
 * Every item is from the library in the launch film, so the page and the film
 * tell one story.
 */
type Keepsake = Readonly<{
  kind: string
  title: string
  image?: string
  /** Where it waits: centre as a share of the stage, and a small tilt. Off-stage items enter from `from`. */
  x: number
  y: number
  rotate: number
  from?: 'left' | 'right' | 'top' | 'bottom'
}>

const ITEMS: readonly Keepsake[] = [
  { kind: 'PDF', title: 'Signed agreement', x: 0.26, y: 0.2, rotate: -3 },
  { kind: 'LINK', title: 'Trattoria Lucia', x: 0.76, y: 0.34, rotate: 2 },
  { kind: 'IMG', title: 'Dinner receipt', image: 'media/items/dinner-receipt.jpg', x: 0.22, y: 0.74, rotate: 2.5 },
  { kind: 'NOTE', title: 'Launch day', x: 0.74, y: 0.8, rotate: -2 },
  { kind: 'NOTE', title: 'Rate card', x: 0, y: 0.3, rotate: 5, from: 'left' },
  { kind: 'IMG', title: 'Harbor Lane whiteboard', image: 'media/items/whiteboard.jpg', x: 0, y: 0.12, rotate: -6, from: 'right' },
  { kind: 'NOTE', title: 'Passport renewal', x: 0.5, y: 0, rotate: 4, from: 'top' },
  { kind: 'NOTE', title: 'Trip ideas', x: 0, y: 0.62, rotate: -4, from: 'left' },
  { kind: 'LINK', title: 'Flight check-in', x: 0, y: 0.52, rotate: 6, from: 'right' },
  { kind: 'IMG', title: 'IMG_4812.jpg', image: 'media/items/IMG_4812.jpg', x: 0.5, y: 1, rotate: -3, from: 'bottom' },
  { kind: 'LIST', title: 'Books to read', x: 0, y: 0.88, rotate: 3, from: 'left' },
  { kind: 'NOTE', title: 'Studio intro', x: 0, y: 0.9, rotate: -5, from: 'right' },
  { kind: 'NOTE', title: 'Renewal review notes', x: 0.3, y: 0, rotate: 2, from: 'top' },
]

/** Holding pulls things in like a pour: each gap is shorter than the last (the app's own schedule). */
const LAUNCH_AT: readonly number[] = ITEMS.reduce<number[]>((times, _, index) => {
  const previous = index === 0 ? 80 : times[index - 1] + Math.max(95, 280 * 0.84 ** (index - 1))
  return [...times, Math.round(previous)]
}, [])
const FLIGHT = 480
const PULL = 'cubic-bezier(0.5, 0, 0.9, 0.55)'
const NUDGE = 5
const TILT = 1.6
const SQUASH = 0.045

type Phase = 'waiting' | 'holding' | 'paused' | 'kept' | 'open'

export function KeepHero() {
  const reducedMotion = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLButtonElement>(null)
  const replayRef = useRef<HTMLButtonElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const clock = useRef({ held: 0, since: 0, holding: false, launched: 0, arrived: 0 })
  const frame = useRef(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [kept, setKept] = useState(0)

  const arrive = useCallback((index: number, from: DOMRect, to: DOMRect) => {
    clock.current.arrived += 1
    setKept(clock.current.arrived)
    navigator.vibrate?.(6)
    const icon = iconRef.current
    if (icon && !reducedMotion) {
      // A small give along the item's path, a hair of tilt and squash, sprung back.
      const dx = to.left + to.width / 2 - (from.left + from.width / 2)
      const dy = to.top + to.height / 2 - (from.top + from.height / 2)
      const length = Math.hypot(dx, dy) || 1
      const nx = (dx / length) * NUDGE
      const ny = (dy / length) * NUDGE
      const tilt = (dx >= 0 ? 1 : -1) * TILT
      icon.animate([
        { transform: 'translate(0, 0) rotate(0) scale(1, 1)' },
        { transform: `translate(${nx}px, ${ny}px) rotate(${tilt}deg) scale(${1 + SQUASH}, ${1 - SQUASH})`, offset: 0.22 },
        { transform: `translate(${-nx * 0.35}px, ${-ny * 0.35}px) rotate(${-tilt * 0.4}deg) scale(${1 - SQUASH * 0.4}, ${1 + SQUASH * 0.4})`, offset: 0.55 },
        { transform: `translate(${nx * 0.1}px, ${ny * 0.1}px) rotate(${tilt * 0.12}deg) scale(1, 1)`, offset: 0.8 },
        { transform: 'translate(0, 0) rotate(0) scale(1, 1)' },
      ], { duration: 420, easing: 'linear' })
    }
    if (index === ITEMS.length - 1) {
      window.setTimeout(() => setPhase('kept'), 360)
      window.setTimeout(() => setPhase('open'), reducedMotion ? 400 : 1150)
    }
  }, [reducedMotion])

  const launch = useCallback((index: number) => {
    const card = cardRefs.current[index]
    const icon = iconRef.current
    if (!card || !icon) return
    const from = card.getBoundingClientRect()
    const to = icon.getBoundingClientRect()
    const dx = to.left + to.width / 2 - (from.left + from.width / 2)
    const dy = to.top + to.height / 2 - (from.top + from.height / 2)
    const rotate = ITEMS[index].rotate
    if (reducedMotion) {
      card.style.opacity = '0'
      arrive(index, from, to)
      return
    }
    // Drawn in: a gentle start, then faster, as if pulled; small and gone as it lands.
    const flight = card.animate([
      { transform: `translate(0, 0) rotate(${rotate}deg) scale(1)`, opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 18}px) rotate(${rotate * 0.4}deg) scale(0.52)`, opacity: 1, offset: 0.62 },
      { transform: `translate(${dx}px, ${dy}px) rotate(0deg) scale(0.12)`, opacity: 1, offset: 0.86 },
      { transform: `translate(${dx}px, ${dy}px) rotate(0deg) scale(0.08)`, opacity: 0 },
    ], { duration: FLIGHT, easing: PULL, fill: 'forwards' })
    flight.onfinish = () => arrive(index, from, to)
  }, [arrive, reducedMotion])

  const startHold = useCallback(() => {
    const state = clock.current
    if (state.holding || state.launched >= ITEMS.length) return
    // A press always keeps the next thing at once, so a tap is never ignored.
    state.held = Math.max(state.held, LAUNCH_AT[state.launched])
    state.since = performance.now()
    state.holding = true
    setPhase('holding')
    const pour = () => {
      if (!state.holding) return
      const held = state.held + (performance.now() - state.since)
      while (state.launched < ITEMS.length && LAUNCH_AT[state.launched] <= held) {
        launch(state.launched)
        state.launched += 1
      }
      if (state.launched < ITEMS.length) frame.current = requestAnimationFrame(pour)
    }
    pour()
  }, [launch])

  const endHold = useCallback(() => {
    const state = clock.current
    if (!state.holding) return
    state.held += performance.now() - state.since
    state.holding = false
    cancelAnimationFrame(frame.current)
    if (state.launched < ITEMS.length) setPhase('paused')
  }, [])

  const replay = useCallback(() => {
    cancelAnimationFrame(frame.current)
    clock.current = { held: 0, since: 0, holding: false, launched: 0, arrived: 0 }
    cardRefs.current.forEach((card) => {
      card?.getAnimations().forEach((animation) => animation.cancel())
      if (card) card.style.opacity = ''
    })
    setKept(0)
    setPhase('waiting')
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  // The icon is gone once the library opens; keep keyboard focus on the page, on Replay.
  useEffect(() => {
    if (phase === 'open' && document.activeElement === iconRef.current) replayRef.current?.focus()
  }, [phase])

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* a synthetic pointer has nothing to capture */ }
    startHold()
  }
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      startHold()
    }
  }
  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') endHold()
  }

  const hint = phase === 'open' || phase === 'kept'
    ? 'Kept together. Ready to find.'
    : phase === 'holding' ? 'Keep holding.'
      : phase === 'paused' ? 'Hold a little longer.'
        : 'Hold the icon, and everything here goes into Found.'

  return (
    <div className="keep-hero">
    <div className={`keep-stage keep-stage--${phase}`} ref={stageRef}>
      <div className="keep-stage__field" aria-hidden="true">
        {ITEMS.map((item, index) => (
          <div
            className={`keep-card${item.image ? ' keep-card--image' : ''}${item.from ? ` keep-card--from-${item.from}` : ''}`}
            key={item.title}
            ref={(node) => { cardRefs.current[index] = node }}
            style={{ '--x': item.x, '--y': item.y, '--r': `${item.rotate}deg` } as CSSProperties}
          >
            {item.image ? <img src={sitePath(item.image)} alt="" loading="lazy" /> : null}
            <span className="keep-card__kind">{item.kind}</span>
            {item.image ? null : <span className="keep-card__title">{item.title}</span>}
          </div>
        ))}
      </div>

      <div className="keep-stage__centre">
        <button
          className="keep-icon"
          ref={iconRef}
          type="button"
          aria-label={phase === 'open' ? 'Everything is kept in Found' : 'Press and hold Found to keep everything here'}
          aria-describedby="keep-hint"
          aria-disabled={phase === 'kept' || phase === 'open'}
          tabIndex={phase === 'open' ? -1 : 0}
          onContextMenu={(event) => event.preventDefault()}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPointerCancel={endHold}
          onPointerDown={onPointerDown}
          onPointerUp={endHold}
        >
          <img src={sitePath('brand/found-icon.png')} alt="" draggable={false} />
          <span className={`keep-icon__badge${kept > 0 ? ' is-counting' : ''}`} key={kept} aria-hidden="true">{kept}</span>
        </button>
        <span className="keep-icon__label" aria-hidden="true">Press and hold</span>

        <figure className="keep-open" aria-hidden={phase !== 'open'}>
          <div className="device keep-open__device">
            <div className="device__screen">
              <img src={sitePath('media/home.jpg')} alt="Found’s Home: Find anything, the text you copied, a reminder that needs you, and notes kept close." />
            </div>
          </div>
        </figure>
      </div>
    </div>

      <p className="keep-stage__hint" id="keep-hint" aria-live="polite">
        <span>{hint}</span>
        {phase === 'open' ? (
          <button className="keep-stage__replay" ref={replayRef} type="button" onClick={replay}>Replay <span aria-hidden="true">↻</span></button>
        ) : kept > 0 ? (
          <span className="keep-stage__count">{kept} of {ITEMS.length} kept</span>
        ) : null}
      </p>
    </div>
  )
}
