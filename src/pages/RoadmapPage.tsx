import { useMemo } from 'react'
import type { ComponentProps, ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { RoadmapPickControl } from '../features/roadmap-voting/RoadmapPickControl'
import { useRoadmapVoting } from '../features/roadmap-voting/use-roadmap-voting'
import { roadmapPickLimit, roadmapSections, roadmapStatusLabels } from '../roadmap/roadmap-content'
import type { RoadmapItem, RoadmapSection } from '../roadmap/roadmap-content'
import '../roadmap.css'

export function RoadmapPage() {
  const voting = useRoadmapVoting()
  const pickedFeatureIds = voting.snapshot.pickedFeatureIds
  const pickedFeatureIdSet = useMemo(() => new Set(pickedFeatureIds), [pickedFeatureIds])
  const todoItems = roadmapSections.find((section) => section.status === 'todo')?.items ?? []
  const replacementOptions = todoItems
    .filter((item) => pickedFeatureIdSet.has(item.id))
    .map((item) => ({ featureId: item.id, title: item.title }))

  return (
    <SiteShell page="roadmap">
      <main className="roadmap-page">
        <header className="roadmap-hero content-width">
          <p className="eyebrow">PUBLIC ROADMAP</p>
          <h1>Found is still being found.</h1>
          <p>See what has shipped, what I’m working on, and use three picks to push the directions that would matter most to you.</p>
          <p className="roadmap-hero__note">The board shows intent, not guaranteed dates. Your picks inform the work; they do not automatically decide it.</p>
        </header>

        {voting.error && (
          <div className="roadmap-voting-notice" role="status">
            <p className="content-width">{voting.error}</p>
          </div>
        )}

        <section className="roadmap-board-shell" aria-label="Found public roadmap board">
          <div className="roadmap-board">
            {roadmapSections.map((section) => (
              <RoadmapColumn
                availability={voting.availability}
                counts={voting.snapshot.counts}
                key={section.status}
                onFeedback={voting.submitFeedback}
                onUpdatePick={voting.updatePick}
                pickedFeatureIds={pickedFeatureIds}
                replacementOptions={replacementOptions}
                section={section}
              />
            ))}
          </div>
        </section>

        <section className="roadmap-feedback-callout" aria-labelledby="feedback-title">
          <div className="content-width roadmap-feedback-callout__layout">
            <div>
              <p className="eyebrow">HELP SHAPE FOUND</p>
              <h2 id="feedback-title">A pick says what. Context says why.</h2>
            </div>
            <div>
              <p>After making a pick, tell me about the real moment when Found could have helped. That context is more useful than a feature pitch.</p>
              <p className="roadmap-feedback-callout__note">Picks can change as often as your priorities do.</p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

function RoadmapColumn({
  availability,
  counts,
  onFeedback,
  onUpdatePick,
  pickedFeatureIds,
  replacementOptions,
  section,
}: Readonly<{
  availability: 'loading' | 'ready' | 'degraded' | 'unavailable'
  counts: Readonly<Record<string, number>>
  onFeedback(featureId: string, message: string): Promise<void>
  onUpdatePick: ComponentProps<typeof RoadmapPickControl>['onUpdatePick']
  pickedFeatureIds: readonly string[]
  replacementOptions: readonly Readonly<{ featureId: string; title: string }>[]
  section: RoadmapSection
}>) {
  return (
    <section className={`roadmap-column roadmap-column--${section.status}`} aria-labelledby={`roadmap-${section.status}`}>
      <header className="roadmap-column__header">
        <div className="roadmap-column__title-row">
          <p className={`roadmap-status roadmap-status--${section.status}`}>{roadmapStatusLabels[section.status]}</p>
          <span>{section.items.length}</span>
        </div>
        <h2 id={`roadmap-${section.status}`}>{section.title}</h2>
        <p>{section.description}</p>
        {section.status === 'todo' && <RoadmapPickMeter pickedCount={pickedFeatureIds.length} />}
      </header>

      <div className="roadmap-column__list">
        {section.items.map((item) => {
          const picked = pickedFeatureIds.includes(item.id)
          return (
            <RoadmapCard item={item} key={item.id} picked={picked}>
              {item.votable && (
                <RoadmapPickControl
                  availability={availability}
                  count={counts[item.id] ?? 0}
                  featureId={item.id}
                  onFeedback={onFeedback}
                  onUpdatePick={onUpdatePick}
                  pickedFeatureIds={pickedFeatureIds}
                  replacementOptions={replacementOptions}
                />
              )}
            </RoadmapCard>
          )
        })}
      </div>
    </section>
  )
}

function RoadmapCard({ children, item, picked }: Readonly<{
  children?: ReactNode
  item: RoadmapItem
  picked: boolean
}>) {
  return (
    <article className="roadmap-card" data-picked={picked || undefined}>
      <h3>{item.title}</h3>
      <p className="roadmap-card__description">{item.description}</p>
      <details className="roadmap-card__details">
        <summary>WHY THIS MATTERS <span aria-hidden="true">+</span></summary>
        <p>{item.why}</p>
        {item.examples && (
          <div className="roadmap-card__examples" aria-label="Example requests">
            {item.examples.map((example) => <span key={example}>“{example}”</span>)}
          </div>
        )}
      </details>
      {children}
    </article>
  )
}

function RoadmapPickMeter({ pickedCount }: Readonly<{ pickedCount: number }>) {
  return (
    <div className="roadmap-pick-meter" role="status">
      <div>
        <span>YOUR PICKS</span>
        <strong>{pickedCount} / {roadmapPickLimit}</strong>
      </div>
      <div className="roadmap-pick-meter__marks" aria-hidden="true">
        {Array.from({ length: roadmapPickLimit }, (_, index) => (
          <span data-filled={index < pickedCount || undefined} key={index} />
        ))}
      </div>
    </div>
  )
}
