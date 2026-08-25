import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { homeScenarios } from '../home-content'
import { ArtifactCard } from './ArtifactCard'

export function ProductJourney() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [didCompleteAction, setDidCompleteAction] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const scenario = homeScenarios[scenarioIndex]

  const selectScenario = (index: number) => {
    setScenarioIndex(index)
    setDidCompleteAction(false)
  }

  return (
    <section className="product-journey" aria-labelledby="journey-title">
      <div className="product-journey__intro">
        <div>
          <p className="eyebrow">ONE ITEM, FOUR MOMENTS</p>
          <h2 id="journey-title">From kept to useful.</h2>
        </div>
        <p>Found keeps the item and its context together, so remembering a fragment is enough to bring the right thing back.</p>
      </div>

      <div className="scenario-picker" aria-label="Choose a situation">
        {homeScenarios.map((item, index) => (
          <button
            aria-pressed={scenarioIndex === index}
            className="scenario-picker__button press-surface"
            key={item.id}
            onClick={() => selectScenario(index)}
            type="button"
          >
            <strong>{item.need}</strong>
            <span aria-hidden="true">{scenarioIndex === index ? '●' : '○'}</span>
          </button>
        ))}
      </div>

      <div className="journey-tool">
        <AnimatePresence initial={false} mode="wait">
          <m.div
            animate={{ opacity: 1, y: 0 }}
            className="journey-flow"
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            key={scenario.id}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <JourneyStage index="01" label="Capture">
              <span className="journey-flow__quiet">IN FRONT OF YOU</span>
              <strong className="journey-flow__source">{scenario.source}</strong>
              <small>Capture it without stopping to organize.</small>
            </JourneyStage>

            <JourneyStage index="02" label="Keep">
              <ArtifactCard item={scenario} compact />
              <small>{scenario.context}</small>
            </JourneyStage>

            <JourneyStage index="03" label="Remember">
              <span className="journey-flow__quiet">YOU TYPE</span>
              <blockquote>&quot;{scenario.memory}&quot;</blockquote>
              <small>Recall what it meant, not where it lives.</small>
            </JourneyStage>

            <JourneyStage index="04" label="Reuse">
              <strong className="journey-flow__ready">Exact item ready</strong>
              <button
                aria-expanded={didCompleteAction}
                className="journey-flow__action press-surface press-surface--raised"
                onClick={() => setDidCompleteAction((current) => !current)}
                type="button"
              >
                {didCompleteAction ? 'Hide result' : `Preview: ${scenario.action}`}
              </button>
              {didCompleteAction ? (
                <span className="journey-flow__outcome" role="status">{scenario.outcome}</span>
              ) : null}
              <small>Finish with the action you came for.</small>
            </JourneyStage>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function JourneyStage({ children, index, label }: Readonly<{
  children: ReactNode
  index: string
  label: string
}>) {
  return (
    <article className="journey-flow__stage">
      <header><span>{index}</span><strong>{label}</strong></header>
      <div className="journey-flow__content">{children}</div>
    </article>
  )
}
