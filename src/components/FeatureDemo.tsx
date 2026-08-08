import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, LayoutGroup, MotionConfig, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { findHeroMemory, heroMemories } from './hero-content'
import type { HeroMemory } from './hero-content'

export type FeatureDemoKind = 'capture' | 'work' | 'remind' | 'files' | 'find' | 'own'

const captureOptions = [
  { id: 'note', mark: 'T', label: 'Note', title: 'Five models to test', meta: 'Ready in your library' },
  { id: 'photo', mark: 'I', label: 'Photo', title: 'Whiteboard sketch', meta: 'Captured from camera' },
  { id: 'file', mark: 'P', label: 'File', title: 'Visa checklist.pdf', meta: 'PDF · 8 pages' },
  { id: 'share', mark: '↗', label: 'Share', title: 'Designing calm software', meta: 'Link received from browser' },
] as const

const destinations = [
  { id: 'folder', mark: 'F', label: 'Visa documents', meta: 'Folder · 4 items' },
  { id: 'thread', mark: 'T', label: 'Berlin planning', meta: 'Thread · 9 entries' },
] as const

const workModes = [
  {
    id: 'note',
    mark: 'N',
    label: 'Note',
    title: 'Product thoughts',
    meta: 'A clean writing surface',
    body: 'The capture should stay fast even as the library grows.',
  },
  {
    id: 'tasks',
    mark: '✓',
    label: 'Tasks',
    title: 'Today',
    meta: '2 of 3 complete',
    body: 'Prepare beta · Invite testers · Publish website',
  },
  {
    id: 'thread',
    mark: 'T',
    label: 'Thread',
    title: 'Gym',
    meta: '12 timestamped entries',
    body: 'Bench press 60 kg × 8 · Set recorded today',
  },
] as const

export function FeatureDemo({ kind }: Readonly<{ kind: FeatureDemoKind }>) {
  const shouldReduceMotion = useReducedMotion()
  let demo: ReactNode

  if (kind === 'capture') demo = <CaptureDemo shouldReduceMotion={shouldReduceMotion} />
  else if (kind === 'work') demo = <WorkDemo shouldReduceMotion={shouldReduceMotion} />
  else if (kind === 'remind') demo = <ReminderDemo shouldReduceMotion={shouldReduceMotion} />
  else if (kind === 'files') demo = <FilesDemo shouldReduceMotion={shouldReduceMotion} />
  else if (kind === 'find') demo = <FindReuseDemo shouldReduceMotion={shouldReduceMotion} />
  else demo = <OwnershipDemo shouldReduceMotion={shouldReduceMotion} />

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
      <LayoutGroup id={`feature-${kind}`}>{demo}</LayoutGroup>
    </MotionConfig>
  )
}

type DemoMotionProps = Readonly<{ shouldReduceMotion: boolean | null }>

function CaptureDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [selectedId, setSelectedId] = useState<(typeof captureOptions)[number]['id']>('note')
  const selected = captureOptions.find((option) => option.id === selectedId) ?? captureOptions[0]

  return (
    <div className="feature-demo" aria-label="Capture something in Found">
      <DemoHeader title="Capture" status="Choose what arrived" />
      <div className="feature-demo__choices feature-demo__choices--four">
        {captureOptions.map((option) => (
          <DemoChoice
            active={selected.id === option.id}
            key={option.id}
            label={option.label}
            mark={option.mark}
            onPress={() => setSelectedId(option.id)}
          />
        ))}
      </div>
      <div className="feature-demo__outcome-stage" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <DemoOutcome
            key={selected.id}
            mark={selected.mark}
            meta={selected.meta}
            shouldReduceMotion={shouldReduceMotion}
            status="Kept"
            title={selected.title}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

function WorkDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [selectedId, setSelectedId] = useState<(typeof workModes)[number]['id']>('note')
  const selected = workModes.find((item) => item.id === selectedId) ?? workModes[0]

  return (
    <div className="feature-demo" aria-label="Use Found for notes, tasks, and threads">
      <DemoHeader title="Write and do" status="Choose the right shape" />
      <div className="feature-demo__choices feature-demo__choices--three">
        {workModes.map((item) => (
          <DemoChoice
            active={selected.id === item.id}
            key={item.id}
            label={item.label}
            mark={item.mark}
            onPress={() => setSelectedId(item.id)}
          />
        ))}
      </div>
      <div className="feature-demo__work-stage" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <m.div
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            key={selected.id}
          >
            <span aria-hidden="true">{selected.mark}</span>
            <span><small>{selected.label}</small><strong>{selected.title}</strong><p>{selected.body}</p></span>
            <b>{selected.meta}</b>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function FilesDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [destinationId, setDestinationId] = useState<(typeof destinations)[number]['id']>('folder')
  const destination = destinations.find((item) => item.id === destinationId) ?? destinations[0]

  return (
    <div className="feature-demo" aria-label="Place an item in context">
      <DemoHeader title="Place in" status="Passport.pdf" />
      <div className="feature-demo__source">
        <span aria-hidden="true">P</span>
        <span><strong>Passport.pdf</strong><small>PDF · In your library</small></span>
      </div>
      <div className="feature-demo__choices feature-demo__choices--two">
        {destinations.map((item) => (
          <DemoChoice
            active={destination.id === item.id}
            key={item.id}
            label={item.label}
            mark={item.mark}
            meta={item.meta}
            onPress={() => setDestinationId(item.id)}
          />
        ))}
      </div>
      <div className="feature-demo__confirmation" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <m.span
            animate={{ opacity: 1, x: 0 }}
            className="feature-demo__confirmation-copy"
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
            key={destination.id}
          >
            <span>Now in</span><strong>{destination.label}</strong><small>Still searchable across your library</small>
          </m.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

function ReminderDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [state, setState] = useState<'scheduled' | 'done' | 'snoozed'>('scheduled')
  const schedule = state === 'done' ? 'Tomorrow · 9:00 AM' : state === 'snoozed' ? 'Today · 9:15 AM' : 'Today · 9:00 AM'

  return (
    <div className="feature-demo" aria-label="Complete or snooze a reminder">
      <DemoHeader title="Reminder" status={state === 'scheduled' ? 'Due now' : 'Updated'} />
      <div className="feature-demo__reminder" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <m.span
            animate={{ opacity: 1, y: 0 }}
            className="feature-demo__reminder-state"
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            key={state}
          >
            <span><small>{schedule}</small><strong>Take medicine</strong></span>
            <b>{state === 'done' ? 'Completed now' : state === 'snoozed' ? 'Snoozed 15 min' : 'Waiting'}</b>
          </m.span>
        </AnimatePresence>
      </div>
      <div className="feature-demo__actions">
        <button aria-pressed={state === 'done'} className="press-surface press-surface--embedded" onClick={() => setState('done')} type="button">Done</button>
        <button aria-pressed={state === 'snoozed'} className="press-surface press-surface--embedded" onClick={() => setState('snoozed')} type="button">Snooze 15m</button>
      </div>
      <p className="feature-demo__note">
        {state === 'done' ? 'Completion kept · Next occurrence scheduled' : 'The reminder stays visible with its current state.'}
      </p>
    </div>
  )
}

function FindReuseDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [draft, setDraft] = useState(heroMemories[0].remembered)
  const [result, setResult] = useState<HeroMemory | null>(heroMemories[0])
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const selectMemory = (memory: HeroMemory) => {
    setDraft(memory.remembered)
    setResult(memory)
    setCopyStatus('idle')
  }

  const copyResult = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(
        `${result.excerpt.before ?? ''}${result.excerpt.match}${result.excerpt.after ?? ''}`,
      )
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  return (
    <div className="feature-demo" aria-label="Find and reuse something in Found">
      <DemoHeader title="Find and reuse" status="Search what you remember" />
      <div className="feature-demo__choices feature-demo__choices--two">
        {heroMemories.slice(0, 2).map((memory, index) => (
          <DemoChoice
            active={result?.id === memory.id}
            key={memory.id}
            label={memory.cue}
            mark={String(index + 1).padStart(2, '0')}
            onPress={() => selectMemory(memory)}
          />
        ))}
      </div>
      <form
        className="feature-demo__find"
        onSubmit={(event) => {
          event.preventDefault()
          setResult(findHeroMemory(draft))
          setCopyStatus('idle')
        }}
      >
        <input aria-label="Search the sample Found library" onChange={(event) => setDraft(event.target.value)} value={draft} />
        <button className="press-surface press-surface--embedded" type="submit">Find</button>
      </form>
      <div className="feature-demo__snippet" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          {result ? (
            <m.div
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              key={result.id}
            >
              <span>{result.kind}</span><strong>{result.title}</strong>
              <p>{result.excerpt.before}<mark>{result.excerpt.match}</mark>{result.excerpt.after}</p>
            </m.div>
          ) : (
            <m.div animate={{ opacity: 1 }} initial={shouldReduceMotion ? false : { opacity: 0 }} key="empty">
              <span>No demo match</span><strong>Try one of the examples above</strong>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <m.button className="feature-demo__copy press-surface press-surface--embedded" disabled={!result} onClick={copyResult} type="button">
        {copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy unavailable' : 'Copy text'}
      </m.button>
    </div>
  )
}

function OwnershipDemo({ shouldReduceMotion }: DemoMotionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="feature-demo" aria-label="Inspect a portable Found backup">
      <DemoHeader title="Portable backup" status="Sample library" />
      <m.button
        aria-expanded={isOpen}
        className="feature-demo__backup-summary press-surface press-surface--embedded"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span aria-hidden="true">B</span>
        <span><strong>found-backup.zip</strong><small>Readable archive · 248 MB</small></span>
        <b>{isOpen ? 'Close' : 'Inspect'}</b>
      </m.button>
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <m.div
            animate={{ height: 'auto', opacity: 1 }}
            className="feature-demo__manifest"
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            key="manifest"
          >
            <span><strong>126</strong><small>Notes and entries</small></span>
            <span><strong>34</strong><small>Images and files</small></span>
            <span><strong>1</strong><small>Searchable manifest</small></span>
          </m.div>
        ) : (
          <m.p
            animate={{ opacity: 1 }}
            className="feature-demo__backup-copy"
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            key="summary"
          >
            Review what leaves the app before you store or move it.
          </m.p>
        )}
      </AnimatePresence>
      <p className="feature-demo__note">Created only when you ask · Your device remains the source of truth</p>
    </div>
  )
}

function DemoHeader({ status, title }: Readonly<{ status: string; title: string }>) {
  return <div className="feature-demo__header"><strong>{title}</strong><span>{status}</span></div>
}

function DemoChoice({
  active,
  label,
  mark,
  meta,
  onPress,
}: Readonly<{
  active: boolean
  label: string
  mark: string
  meta?: string
  onPress: () => void
}>) {
  return (
    <m.button aria-pressed={active} className="press-surface press-surface--embedded" onClick={onPress} type="button">
      {active ? <m.span className="feature-demo__choice-selection" layoutId="active-choice" /> : null}
      <span className="feature-demo__choice-mark" aria-hidden="true">{mark}</span>
      <span className="feature-demo__choice-copy"><strong>{label}</strong>{meta ? <small>{meta}</small> : null}</span>
    </m.button>
  )
}

function DemoOutcome({
  mark,
  meta,
  shouldReduceMotion,
  status,
  title,
}: Readonly<{ mark: string; meta: string; shouldReduceMotion: boolean | null; status: string; title: string }>) {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className="feature-demo__outcome"
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
    >
      <span aria-hidden="true">{mark}</span>
      <span><strong>{title}</strong><small>{meta}</small></span>
      <b>{status}</b>
    </m.div>
  )
}
