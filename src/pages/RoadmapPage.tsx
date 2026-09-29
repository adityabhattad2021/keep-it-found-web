import { useLayoutEffect, useMemo } from 'react'
import type { ComponentProps, CSSProperties } from 'react'

import { AppStoreLink, appAvailability } from '../components/AppStoreAction'
import { SiteShell } from '../components/SiteShell'
import { useReveals } from '../components/use-motion'
import { RoadmapPickControl } from '../features/roadmap-voting/RoadmapPickControl'
import { useRoadmapVoting } from '../features/roadmap-voting/use-roadmap-voting'
import { currentRelease, roadmapPickLimit, roadmapSections, roadmapStatusLabels } from '../roadmap/roadmap-content'
import type { RoadmapItem, RoadmapStatus } from '../roadmap/roadmap-content'
import { sitePath } from '../site-config'
import '../roadmap.css'

type VotingAvailability = ComponentProps<typeof RoadmapPickControl>['availability']

function itemsFor(status: RoadmapStatus): readonly RoadmapItem[] {
  return roadmapSections.find((section) => section.status === status)?.items ?? []
}

function sectionFor(status: RoadmapStatus) {
  return roadmapSections.find((section) => section.status === status)
}

export function RoadmapPage() {
  const voting = useRoadmapVoting()
  const pickedFeatureIds = voting.snapshot.pickedFeatureIds
  const pickedFeatureIdSet = useMemo(() => new Set(pickedFeatureIds), [pickedFeatureIds])
  const shipped = itemsFor('shipped')
  const always = itemsFor('wip')
  const building = itemsFor('later')
  const directions = itemsFor('todo')
  const replacementOptions = directions
    .filter((item) => pickedFeatureIdSet.has(item.id))
    .map((item) => ({ featureId: item.id, title: item.title }))
  const pickedTitles = pickedFeatureIds
    .map((id) => directions.find((item) => item.id === id)?.title)
    .filter((title): title is string => Boolean(title))

  useReveals()

  useLayoutEffect(() => {
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null
    if (!target) return
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    target.scrollIntoView()
    root.style.scrollBehavior = previous
  }, [])

  return (
    <SiteShell page="roadmap">
      <main className="roadmap">
        <section className="rm-hero" aria-labelledby="roadmap-title">
          <div className="content-width rm-hero__inner">
            <header className="rm-hero__copy">
              <p className="eyebrow">Roadmap</p>
              <h1 id="roadmap-title">Found 1.1 is here. <span>Here’s what’s next.</span></h1>
              <p className="rm-hero__lede">What Found does on your iPhone today, what is being built now, and a vote on where the iPhone goes deeper first.</p>
              <div className="rm-hero__actions">
                <a className="button button--ink button--raised" href="#vote">Cast your two picks</a>
                <a className="button button--quiet" href="#new">See what’s new</a>
              </div>
            </header>

            <aside className="rm-release" aria-label="Found today">
              <p className="rm-release__kicker">On the App Store now</p>
              <p className="rm-release__name">{currentRelease.name}</p>
              <dl className="rm-release__facts">
                {currentRelease.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <nav className="rm-release__nav" aria-label="On this page">
                <a href="#new"><span>01</span>New in 1.1</a>
                <a href="#building"><span>02</span>Being built</a>
                <a href="#vote"><span>03</span>Your vote</a>
              </nav>
            </aside>
          </div>
        </section>

        {voting.error && (
          <div className="rm-notice" role="status">
            <p className="content-width">{voting.error}</p>
          </div>
        )}

        <section className="rm-chapter" id="new" aria-labelledby="new-title">
          <div className="content-width">
            <header className="rm-heading reveal">
              <p className="eyebrow">{sectionFor('shipped')?.title}</p>
              <h2 id="new-title">On the App Store, today.</h2>
              <p>{sectionFor('shipped')?.description}</p>
            </header>

            <ul className="rm-shipped">
              {shipped.map((item, index) => (
                <li className="rm-shipped__card reveal" key={item.id} style={{ transitionDelay: `${(index % 4) * 70}ms` }}>
                  {item.floor && <span className="rm-floor">{item.floor}</span>}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="rm-footnote">{item.why}</p>
                </li>
              ))}
            </ul>

            <p className="rm-footnote rm-shipped__more">Find with Found, Ask Found, Spotlight and Shortcuts share one switch: Siri &amp; Spotlight, in Found’s Settings. Features above iOS 16.4 are absent on older systems. <a href={sitePath()}>See everything Found does</a></p>
          </div>
        </section>

        <section className="rm-band" id="building" aria-labelledby="building-title">
          <div className="content-width">
            <header className="rm-heading rm-heading--inverse reveal">
              <p className="eyebrow eyebrow--inverse">{roadmapStatusLabels.later}</p>
              <h2 id="building-title">Found, beyond one iPhone.</h2>
              <p>{sectionFor('later')?.description} Outcomes, not dates: each arrives when it is quiet and dependable.</p>
            </header>

            <ol className="rm-building">
              {building.map((item, index) => (
                <li className="reveal" key={item.id} style={{ transitionDelay: `${index * 90}ms` } as CSSProperties}>
                  <span className="rm-building__tag">{roadmapStatusLabels.later}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.keys && (
                    <p className="rm-building__keys" aria-hidden="true">
                      {item.keys.map((key) => <kbd key={key}>{key}</kbd>)}
                    </p>
                  )}
                  <p className="rm-building__why">{item.why}</p>
                </li>
              ))}
            </ol>

            {always.map((item) => (
              <div className="rm-always reveal" key={item.id}>
                <span className="rm-always__label">{sectionFor('wip')?.title}</span>
                <p><strong>{item.title}.</strong> {item.description} {item.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rm-chapter rm-vote" id="vote" aria-labelledby="vote-title">
          <div className="content-width">
            <div className="rm-vote__intro">
              <header className="rm-heading reveal">
                <p className="eyebrow">{roadmapStatusLabels.todo}</p>
                <h2 id="vote-title">Where should the iPhone go deeper?</h2>
                <p>{sectionFor('todo')?.description}</p>
                <ol className="rm-steps" aria-label="How voting works">
                  <li><span>1</span>Choose two directions</li>
                  <li><span>2</span>Change them whenever you like</li>
                  <li><span>3</span>Say why, if you want to</li>
                </ol>
              </header>
              <PickMeter availability={voting.availability} pickedTitles={pickedTitles} />
            </div>

            <ul className="rm-directions">
              {directions.map((item) => (
                <DirectionCard
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
            </ul>
          </div>
        </section>

        <section className="rm-closing" aria-labelledby="closing-title">
          <div className="content-width rm-closing__inner">
            <div className="rm-closing__copy">
              <p className="eyebrow">Your context matters</p>
              <h2 id="closing-title">A pick tells me where. Your story tells me why.</h2>
              <p>After you choose a direction, you can share the moment it would help. Don’t include anything private from your library. One person builds Found, and this is how the next part gets decided.</p>
              <div className="rm-closing__actions">
                <AppStoreLink />
                <a className="button button--raised" href={sitePath('journal/')}>Read the journal</a>
              </div>
              <p className="rm-closing__meta">{appAvailability}</p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

function DirectionCard({
  availability,
  count,
  item,
  onFeedback,
  onUpdatePick,
  pickedFeatureIds,
  replacementOptions,
}: Readonly<{
  availability: VotingAvailability
  count: number
  item: RoadmapItem
  onFeedback(featureId: string, message: string): Promise<void>
  onUpdatePick: ComponentProps<typeof RoadmapPickControl>['onUpdatePick']
  pickedFeatureIds: readonly string[]
  replacementOptions: readonly Readonly<{ featureId: string; title: string }>[]
}>) {
  const picked = pickedFeatureIds.includes(item.id)

  return (
    <li className="rm-direction reveal" data-picked={picked || undefined}>
      <div className="rm-direction__top">
        {item.category && <span className="rm-direction__category">{item.category}</span>}
        {picked && <span className="rm-direction__picked">Your pick</span>}
      </div>
      <h3>{item.title}</h3>
      {item.buildsOn && <p className="rm-direction__builds">Builds on {item.buildsOn}</p>}
      <p className="rm-direction__next">{item.description}</p>
      <p className="rm-direction__why">{item.why}</p>
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
    </li>
  )
}

function PickMeter({ availability, pickedTitles }: Readonly<{
  availability: VotingAvailability
  pickedTitles: readonly string[]
}>) {
  const status = availability === 'ready'
    ? `${pickedTitles.length} of ${roadmapPickLimit} chosen`
    : availability === 'loading' ? 'Loading your picks' : 'Picks unavailable right now'

  return (
    <aside className="rm-meter reveal" aria-label="Your picks">
      <p className="rm-meter__head">
        <span>Your picks</span>
        <strong role="status">{status}</strong>
      </p>
      <ol className="rm-meter__slots">
        {Array.from({ length: roadmapPickLimit }, (_, index) => {
          const title = pickedTitles[index]
          return (
            <li data-filled={title ? true : undefined} key={index}>
              <span aria-hidden="true">{index + 1}</span>
              {title ?? <em>Open</em>}
            </li>
          )
        })}
      </ol>
      <p className="rm-meter__note">{availability === 'ready' ? 'No account. Picks are counted anonymously.' : 'The directions are still worth a read.'}</p>
    </aside>
  )
}
