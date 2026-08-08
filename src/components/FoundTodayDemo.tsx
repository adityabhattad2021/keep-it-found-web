import { useState } from 'react'
import { AnimatePresence, LayoutGroup, MotionConfig, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

const captureOptions = [
  { id: 'note', mark: 'T', label: 'Note', title: 'Five models to test', meta: 'Note · Just now' },
  { id: 'photo', mark: 'I', label: 'Photo', title: 'Whiteboard sketch', meta: 'Image · Just now' },
  { id: 'file', mark: 'P', label: 'File', title: 'Visa checklist.pdf', meta: 'PDF · 8 pages' },
  { id: 'share', mark: '↗', label: 'Share', title: 'Designing calm software', meta: 'Link · Just now' },
] as const

const tasks = [
  { id: 'launch', label: 'Prepare beta launch' },
  { id: 'invite', label: 'Send tester invites' },
] as const

type CaptureOption = (typeof captureOptions)[number]
type TaskId = (typeof tasks)[number]['id']

export function FoundTodayDemo() {
  const shouldReduceMotion = useReducedMotion()
  const [captureOpen, setCaptureOpen] = useState(false)
  const [recentItem, setRecentItem] = useState<CaptureOption>(captureOptions[2])
  const [completedTasks, setCompletedTasks] = useState<readonly TaskId[]>([])
  const [reminderDone, setReminderDone] = useState(false)

  const toggleTask = (id: TaskId) => {
    setCompletedTasks((current) => (
      current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id]
    ))
  }

  const capture = (option: CaptureOption) => {
    setRecentItem(option)
    setCaptureOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
      <LayoutGroup id="found-today">
        <div className="found-today" aria-label="Interactive overview of Found">
          <header className="found-today__header">
            <span><strong>Today in Found</strong><small>Your private place</small></span>
            <m.button
              aria-expanded={captureOpen}
              aria-label={captureOpen ? 'Close capture actions' : 'Open capture actions'}
              className="press-surface press-surface--embedded"
              onClick={() => setCaptureOpen((current) => !current)}
              type="button"
            >
              <m.span animate={{ rotate: captureOpen ? 45 : 0 }} aria-hidden="true">+</m.span>
            </m.button>
          </header>

          <AnimatePresence initial={false}>
            {captureOpen ? (
              <m.div
                animate={{ height: 'auto', opacity: 1 }}
                className="found-today__capture"
                exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              >
                {captureOptions.map((option) => (
                  <m.button className="press-surface press-surface--embedded" key={option.id} onClick={() => capture(option)} type="button">
                    <span aria-hidden="true">{option.mark}</span><strong>{option.label}</strong>
                  </m.button>
                ))}
              </m.div>
            ) : null}
          </AnimatePresence>

          <div className="found-today__grid">
            <section className="found-today__panel" aria-labelledby="today-do-title">
              <div className="found-today__panel-heading"><strong id="today-do-title">Do</strong><span>{completedTasks.length}/{tasks.length}</span></div>
              <div className="found-today__tasks">
                {tasks.map((task) => {
                  const completed = completedTasks.includes(task.id)
                  return (
                    <m.button
                      aria-pressed={completed}
                      className="press-surface press-surface--embedded"
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      type="button"
                    >
                      <span aria-hidden="true">{completed ? '✓' : ''}</span>
                      <strong>{task.label}</strong>
                    </m.button>
                  )
                })}
              </div>
            </section>

            <section className="found-today__panel" aria-labelledby="today-return-title">
              <div className="found-today__panel-heading"><strong id="today-return-title">Return</strong><span>Reminder</span></div>
              <div className="found-today__reminder" aria-live="polite">
                <AnimatePresence initial={false} mode="wait">
                  <m.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    key={reminderDone ? 'next' : 'now'}
                  >
                    <small>{reminderDone ? 'Tomorrow · 9:00 AM' : 'Today · 9:00 AM'}</small>
                    <strong>Take medicine</strong>
                    <span>{reminderDone ? 'Completed now · Next scheduled' : 'Repeats after completion'}</span>
                  </m.div>
                </AnimatePresence>
                <button className="press-surface press-surface--raised" onClick={() => setReminderDone((current) => !current)} type="button">
                  {reminderDone ? 'Undo' : 'Done'}
                </button>
              </div>
            </section>

            <section className="found-today__panel" aria-labelledby="today-keep-title">
              <div className="found-today__panel-heading"><strong id="today-keep-title">Keep</strong><span>Latest</span></div>
              <div className="found-today__recent" aria-live="polite">
                <AnimatePresence initial={false} mode="wait">
                  <m.div
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                    key={recentItem.id}
                  >
                    <span aria-hidden="true">{recentItem.mark}</span>
                    <span><strong>{recentItem.title}</strong><small>{recentItem.meta}</small></span>
                  </m.div>
                </AnimatePresence>
                <span className="found-today__kept">Kept</span>
              </div>
            </section>
          </div>
        </div>
      </LayoutGroup>
    </MotionConfig>
  )
}
