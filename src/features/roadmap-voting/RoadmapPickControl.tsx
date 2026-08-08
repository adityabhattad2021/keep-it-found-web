import { useId, useState } from 'react'

import { roadmapPickLimit } from '../../roadmap/roadmap-content.ts'
import type { RoadmapPickChange } from './roadmap-pick-change.ts'

type ReplacementOption = Readonly<{
  featureId: string
  title: string
}>

type RoadmapPickControlProps = Readonly<{
  availability: 'loading' | 'ready' | 'degraded' | 'unavailable'
  count: number
  featureId: string
  onFeedback(featureId: string, message: string): Promise<void>
  onUpdatePick(change: RoadmapPickChange): Promise<unknown>
  pickedFeatureIds: readonly string[]
  replacementOptions: readonly ReplacementOption[]
}>

export function RoadmapPickControl({
  availability,
  count,
  featureId,
  onFeedback,
  onUpdatePick,
  pickedFeatureIds,
  replacementOptions,
}: RoadmapPickControlProps) {
  const feedbackId = useId()
  const picked = pickedFeatureIds.includes(featureId)
  const [feedback, setFeedback] = useState('')
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackState, setFeedbackState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [pickState, setPickState] = useState<'idle' | 'saving' | 'error'>('idle')
  const [replacementOpen, setReplacementOpen] = useState(false)
  const disabled = availability !== 'ready' || pickState === 'saving'

  const resetFeedback = () => {
    setFeedback('')
    setFeedbackOpen(false)
    setFeedbackState('idle')
  }

  const savePick = async (change: RoadmapPickChange) => {
    setPickState('saving')
    try {
      await onUpdatePick(change)
      setPickState('idle')
      setReplacementOpen(false)
      if (change.type === 'remove') resetFeedback()
    } catch {
      setPickState('error')
    }
  }

  const handlePrimaryAction = () => {
    if (picked) {
      void savePick({ featureId, type: 'remove' })
      return
    }
    if (pickedFeatureIds.length < roadmapPickLimit) {
      resetFeedback()
      void savePick({ featureId, type: 'add' })
      return
    }
    setReplacementOpen(true)
    setPickState('idle')
  }

  const handleReplacement = (replacedFeatureId: string) => {
    resetFeedback()
    void savePick({ featureId, replacedFeatureId, type: 'replace' })
  }

  const handleFeedback = async () => {
    const message = feedback.trim()
    if (!message) return
    setFeedbackState('sending')
    try {
      await onFeedback(featureId, message)
      setFeedbackState('sent')
      setFeedbackOpen(false)
    } catch {
      setFeedbackState('error')
    }
  }

  return (
    <div className="roadmap-pick">
      <div className="roadmap-pick__primary">
        <button
          aria-pressed={picked}
          className="roadmap-pick__button press-surface press-surface--raised"
          disabled={disabled}
          onClick={handlePrimaryAction}
          type="button"
        >
          {pickButtonLabel(availability, pickState, picked)}
        </button>
        <p aria-live="polite">{pickCountLabel(count, picked)}</p>
      </div>

      {pickState === 'error' && <p className="roadmap-pick__error" role="alert">Couldn’t update your picks. Try again.</p>}

      {replacementOpen && !picked && (
        <div className="roadmap-replacement" role="group" aria-label="Choose a pick to replace">
          <p>Your three picks are used. Replace one:</p>
          {replacementOptions.map((option) => (
            <button disabled={pickState === 'saving'} key={option.featureId} onClick={() => handleReplacement(option.featureId)} type="button">
              {option.title}
            </button>
          ))}
          <button className="roadmap-replacement__cancel" onClick={() => setReplacementOpen(false)} type="button">KEEP MY PICKS</button>
        </div>
      )}

      {picked && feedbackState !== 'sent' && !feedbackOpen && (
        <button className="roadmap-pick__context" onClick={() => setFeedbackOpen(true)} type="button">TELL ME WHY →</button>
      )}

      {picked && feedbackOpen && feedbackState !== 'sent' && (
        <div className="roadmap-feedback">
          <label htmlFor={feedbackId}>What would this help you do? <span>Optional</span></label>
          <textarea
            id={feedbackId}
            maxLength={500}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Share the real moment. Don’t include private library content."
            rows={3}
            value={feedback}
          />
          <div className="roadmap-feedback__actions">
            <button disabled={!feedback.trim() || feedbackState === 'sending'} onClick={handleFeedback} type="button">
              {feedbackState === 'sending' ? 'SENDING…' : 'SEND CONTEXT'}
            </button>
            <button onClick={() => setFeedbackOpen(false)} type="button">NOT NOW</button>
          </div>
          {feedbackState === 'error' && <p className="roadmap-pick__error" role="alert">Couldn’t send that context. Your pick is still saved.</p>}
        </div>
      )}

      {picked && feedbackState === 'sent' && <p className="roadmap-pick__thanks" aria-live="polite">Context received. Thank you.</p>}
    </div>
  )
}

function pickButtonLabel(
  availability: RoadmapPickControlProps['availability'],
  pickState: 'idle' | 'saving' | 'error',
  picked: boolean,
) {
  if (availability === 'unavailable') return 'PICKS UNAVAILABLE'
  if (availability === 'degraded') return 'RELOAD TO PICK'
  if (availability === 'loading') return 'CHECKING PICKS…'
  if (pickState === 'saving') return 'MOVING…'
  return picked ? 'YOUR PICK ↑' : 'PUSH THIS ↑'
}

function pickCountLabel(count: number, picked: boolean) {
  if (count === 0) return 'NO PICKS YET'
  if (picked) return count === 1 ? 'YOUR PICK' : `YOU + ${count - 1}`
  return count === 1 ? '1 PICK' : `${count} PICKS`
}
