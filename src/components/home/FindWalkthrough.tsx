import { useEffect, useRef, useState } from 'react'

import { Device } from '../Device'
import { usePrefersReducedMotion } from '../use-motion'

/**
 * One real, uncut recording, played a step at a time as each step reaches the
 * middle of the screen: a question in a chat, Find with Found, the page it came
 * from, and the answer typed back with the Found Keyboard.
 */
const STEPS = [
  {
    from: 0,
    to: 3.9,
    title: 'Select the question.',
    body: 'Someone asks for the cancellation terms. You don’t go looking. You select what they asked.',
  },
  {
    from: 3.9,
    to: 7.3,
    title: 'Find with Found.',
    body: 'From the Share Sheet, without leaving the chat. Found searches your library for the question.',
  },
  {
    from: 7.3,
    to: 10.5,
    title: 'The page, not just the file.',
    body: 'Page 7 of the signed agreement, with the passage that answers it. Preview it, copy it, or share the original.',
  },
  {
    from: 10.5,
    to: 16.3,
    title: 'Answer with what you kept.',
    body: 'Type ;terms and switch to the Found Keyboard. Your saved reply goes in where the cursor is.',
  },
  {
    from: 16.3,
    to: 18.7,
    title: 'Sent. Still in the conversation.',
    body: 'No app switching, no scrolling back through folders. The question and the answer, in one place.',
  },
] as const

export function FindWalkthrough() {
  const reducedMotion = usePrefersReducedMotion()
  const phoneRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)

  // The step being read is the one playing: mid-screen beside the phone, or, on a
  // phone-sized screen where the phone sits on top, the band just below it.
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 760px)').matches
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
      })
    }, { rootMargin: narrow ? '-64% 0px -18% 0px' : '-45% 0px -45% 0px' })
    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Nothing plays until the walkthrough is on screen, so no step is used up unseen.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Play just this step's stretch of the recording, then rest on its last frame.
  useEffect(() => {
    const video = phoneRef.current?.querySelector('video')
    if (!video || !inView) return
    const step = STEPS[active]
    if (reducedMotion) {
      video.currentTime = step.to - 0.2
      return
    }
    video.currentTime = step.from
    void video.play().catch(() => undefined)
    const stop = () => {
      if (video.currentTime >= step.to - 0.05) {
        video.pause()
        video.currentTime = step.to - 0.05
      }
    }
    video.addEventListener('timeupdate', stop)
    return () => {
      video.removeEventListener('timeupdate', stop)
      video.pause()
    }
  }, [active, inView, reducedMotion])

  return (
    <div className="walkthrough" ref={rootRef}>
      <div className="walkthrough__phone" ref={phoneRef}>
        <Device
          autoplay={false}
          clip="find"
          label="A real recording: a question in a chat, Find with Found, page 7 of the signed agreement, and the saved reply typed back with the Found Keyboard."
          width="max(210px, min(320px, 24vw, calc((100vh - 200px) * 0.45)))"
        />
        <p className="walkthrough__caption">Recorded in Found 1.1</p>
        <ol className="walkthrough__progress" aria-hidden="true">
          {STEPS.map((step, index) => <li className={index === active ? 'is-active' : index < active ? 'is-done' : ''} key={step.title} />)}
        </ol>
      </div>
      <ol className="walkthrough__steps">
        {STEPS.map((step, index) => (
          <li
            className={`walkthrough__step${index === active ? ' is-active' : ''}`}
            data-step={index}
            key={step.title}
            ref={(node) => { stepRefs.current[index] = node }}
          >
            <span className="walkthrough__number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
