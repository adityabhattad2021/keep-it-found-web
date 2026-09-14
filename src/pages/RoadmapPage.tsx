import { useMemo } from 'react'
import type { ComponentProps } from 'react'

import { SiteShell } from '../components/SiteShell'
import { RoadmapPickControl } from '../features/roadmap-voting/RoadmapPickControl'
import { useRoadmapVoting } from '../features/roadmap-voting/use-roadmap-voting'
import { roadmapPickLimit, roadmapSections, roadmapStatusLabels } from '../roadmap/roadmap-content'
import type { RoadmapItem, RoadmapSection, RoadmapStatus } from '../roadmap/roadmap-content'
import '../roadmap.css'

type PresentRoadmapStatus = Exclude<RoadmapStatus, 'todo'>

export function RoadmapPage() {
  const voting = useRoadmapVoting()
  const pickedFeatureIds = voting.snapshot.pickedFeatureIds
  const pickedFeatureIdSet = useMemo(() => new Set(pickedFeatureIds), [pickedFeatureIds])
  const futureSection = roadmapSections.find((section) => section.status === 'todo')
  const futureItems = futureSection?.items ?? []
  const presentItems = roadmapSections.filter(isPresentSection).flatMap((section) =>
    section.items.map((item, index) => ({
      anchorId: index === 0 ? (section.status === 'shipped' ? 'shipped' : 'now') : undefined,
      item,
      status: section.status,
    })),
  )
  const replacementOptions = futureItems
    .filter((item) => pickedFeatureIdSet.has(item.id))
    .map((item) => ({ featureId: item.id, title: item.title }))

  return (
    <SiteShell page="roadmap">
      <main className="roadmap-page">
        <header className="roadmap-hero page-hero content-width">
          <div className="roadmap-hero__copy">
            <p className="eyebrow">PUBLIC ROADMAP</p>
            <h1>What Found has become. Where I am taking it next.</h1>
            <p className="page-hero__lede">Found now keeps the source, finds it by words or meaning, and brings it back where I need it. Next I am taking that same library across devices, deeper into iPhone, and into the tools I trust.</p>
          </div>
          <nav className="roadmap-hero__guide" aria-label="Roadmap overview">
            <a href="#shipped"><span>01 · COMPLETE</span><strong>See what now works</strong></a>
            <a href="#now"><span>02 · ALWAYS</span><strong>Follow the polish</strong></a>
            <a href="#next"><span>03 · NEXT</span><strong>Help set the order</strong></a>
          </nav>
        </header>

        {voting.error && (
          <div className="roadmap-voting-notice" role="status">
            <p className="content-width">{voting.error}</p>
          </div>
        )}

        <section className="roadmap-present" aria-labelledby="present-title">
          <div className="content-width">
            <header className="roadmap-section-heading">
              <p className="eyebrow">WHERE THINGS STAND</p>
              <h2 id="present-title">What is complete. What never stops.</h2>
            </header>
            <div className="roadmap-present__grid">
              {presentItems.map(({ anchorId, item, status }) => (
                <RoadmapStatusCard anchorId={anchorId} item={item} key={item.id} status={status} />
              ))}
            </div>
          </div>
        </section>

        <section className="roadmap-next" aria-labelledby="next-title" id="next">
          <div className="content-width">
            <header className="roadmap-next__header">
              <div>
                <p className="eyebrow">COMMITTED NEXT</p>
                <h2 id="next-title">Which part should I build first?</h2>
                <p>I am building all three. Choose the two that would make the biggest difference in your day.</p>
              </div>
              <RoadmapPickMeter pickedCount={pickedFeatureIds.length} />
            </header>

            <div className="roadmap-future-grid">
              {futureItems.map((item) => (
                <RoadmapFutureCard
                  availability={voting.availability}
                  count={voting.snapshot.counts[item.id] ?? 0}
                  item={item}
                  key={item.id}
                  onFeedback={voting.submitFeedback}
                  onUpdatePick={voting.updatePick}
                  pickedFeatureIds={pickedFeatureIds}
                  replacementOptions={replacementOptions}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="roadmap-feedback-callout" aria-labelledby="feedback-title">
          <div className="content-width roadmap-feedback-callout__layout">
            <div>
              <p className="eyebrow">YOUR CONTEXT MATTERS</p>
              <h2 id="feedback-title">A pick tells me where. Your story tells me why.</h2>
            </div>
            <p>After choosing a direction, you can share the moment when it would help. You can change your picks whenever your priorities change.</p>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

function RoadmapStatusCard({ anchorId, item, status }: Readonly<{
  anchorId?: string
  item: RoadmapItem
  status: PresentRoadmapStatus
}>) {
  return (
    <article className={`roadmap-status-card roadmap-status-card--${status}`} id={anchorId}>
      <div className="roadmap-status-card__label">
        <span>{roadmapStatusLabels[status]}</span>
        <span>{status === 'shipped' ? 'AVAILABLE TODAY' : 'IN EVERY RELEASE'}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="roadmap-status-card__reason">
        <strong>WHY IT MATTERS</strong>
        <p>{item.why}</p>
      </div>
    </article>
  )
}

function isPresentSection(section: RoadmapSection): section is RoadmapSection & { status: PresentRoadmapStatus } {
  return section.status !== 'todo'
}

function RoadmapFutureCard({
  availability,
  count,
  item,
  onFeedback,
  onUpdatePick,
  pickedFeatureIds,
  replacementOptions,
}: Readonly<{
  availability: 'loading' | 'ready' | 'degraded' | 'unavailable'
  count: number
  item: RoadmapItem
  onFeedback(featureId: string, message: string): Promise<void>
  onUpdatePick: ComponentProps<typeof RoadmapPickControl>['onUpdatePick']
  pickedFeatureIds: readonly string[]
  replacementOptions: readonly Readonly<{ featureId: string; title: string }>[]
}>) {
  const picked = pickedFeatureIds.includes(item.id)

  return (
    <article className="roadmap-future-card" data-picked={picked || undefined}>
      {item.category && <span className="roadmap-future-card__category">{item.category}</span>}
      <h3>{item.title}</h3>
      <p className="roadmap-future-card__description">{item.description}</p>
      <div className="roadmap-future-card__reason">
        <strong>WHY IT MATTERS</strong>
        <p>{item.why}</p>
      </div>
      {item.examples && (
        <ul className="roadmap-future-card__examples" aria-label="Example uses">
          {item.examples.map((example) => <li key={example}>{example}</li>)}
        </ul>
      )}
      {item.votable && (
        <RoadmapPickControl
          availability={availability}
          count={count}
          featureId={item.id}
          featureTitle={item.title}
          onFeedback={onFeedback}
          onUpdatePick={onUpdatePick}
          pickedFeatureIds={pickedFeatureIds}
          replacementOptions={replacementOptions}
        />
      )}
    </article>
  )
}

function RoadmapPickMeter({ pickedCount }: Readonly<{ pickedCount: number }>) {
  return (
    <div className="roadmap-pick-meter" role="status">
      <div>
        <span>YOUR PICKS</span>
        <strong>{pickedCount} OF {roadmapPickLimit}</strong>
      </div>
      <div className="roadmap-pick-meter__marks" aria-hidden="true">
        {Array.from({ length: roadmapPickLimit }, (_, index) => (
          <span data-filled={index < pickedCount || undefined} key={index} />
        ))}
      </div>
    </div>
  )
}
