import { useLayoutEffect, useState } from 'react'
import { AnimatePresence, LazyMotion, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { FeatureDemo } from './components/FeatureDemo'
import { FeatureRibbon } from './components/FeatureRibbon'
import { HeroExperience } from './components/HeroExperience'
import { PlatformActions } from './components/PlatformActions'
import { SiteShell } from './components/SiteShell'
import './home.css'

const loadMotionFeatures = () => import('./components/motion-features').then((module) => module.default)

const featureGroups = [
  {
    index: '01',
    eyebrow: 'CAPTURE',
    title: 'Catch it without changing course.',
    copy: 'Write, photograph, choose a file, or share something straight into Found. Each thing keeps the shape that makes it useful.',
    visual: 'capture',
  },
  {
    index: '02',
    eyebrow: 'NOTES · TASKS · THREADS',
    title: 'Use the right shape for the job.',
    copy: 'A thought can stay a note. A list can be checked off. Workouts, plans, and daily logs can continue as timestamped Threads.',
    visual: 'work',
  },
  {
    index: '03',
    eyebrow: 'REMIND',
    title: 'Let useful things return.',
    copy: 'Complete, snooze, or repeat a reminder without losing its history. Recurring work advances instead of disappearing.',
    visual: 'remind',
  },
  {
    index: '04',
    eyebrow: 'FILES · IMAGES · LINKS',
    title: 'Keep the object, not just its name.',
    copy: 'Open PDFs, preview images, keep useful links, and place related material in a Folder or ongoing Thread without turning Found into a file cabinet.',
    visual: 'files',
  },
  {
    index: '05',
    eyebrow: 'FIND · REUSE',
    title: 'Bring it back and use it.',
    copy: 'Search what you remember, then open, copy, or share the useful part. Retrieval helps the rest of Found work better; it does not replace it.',
    visual: 'find',
  },
  {
    index: '06',
    eyebrow: 'OWN',
    title: 'Take your library with you.',
    copy: 'Inspect a portable backup before it leaves Found. Your device remains the source of truth, and your data stays understandable.',
    visual: 'own',
  },
] as const

const libraryKinds = [
  { id: 'note', label: 'Text', meta: 'NOTE', title: 'Client reply', body: 'Thanks for sending this over. I can have a first pass ready by Friday afternoon.' },
  { id: 'image', label: 'Images', meta: 'IMAGE', title: 'Whiteboard sketch', body: 'Captured after the product review' },
  { id: 'link', label: 'Links', meta: 'LINK', title: 'Designing calm software', body: 'A reference worth returning to' },
  { id: 'pdf', label: 'Files', meta: 'PDF · PAGE 4', title: 'Launch brief.pdf', body: 'Beta launch is scheduled for Friday after the client review.' },
] as const

type LibraryKind = (typeof libraryKinds)[number]['id']

function App() {
  const [selectedKind, setSelectedKind] = useState<LibraryKind>('note')
  const shouldReduceMotion = useReducedMotion()
  const selectedItem = libraryKinds.find((item) => item.id === selectedKind) ?? libraryKinds[0]
  const revealFrom = shouldReduceMotion ? false : { opacity: 0, y: 28 }

  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1)
    const target = targetId ? document.getElementById(targetId) : null
    if (!target) return

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    target.scrollIntoView()
    root.style.scrollBehavior = previousScrollBehavior
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <SiteShell page="home">
        <main>
        <HeroExperience />

        <FeatureRibbon />

        <section className="features-section" id="features" aria-labelledby="features-title">
          <header className="section-heading content-width">
            <p className="eyebrow">FEATURES</p>
            <h2 id="features-title">Every feature earns its place.</h2>
            <p>Found stays focused: capture something, give it context, bring it back, reuse it, and keep ownership of the whole library.</p>
          </header>
          <div className="feature-groups">
            {featureGroups.map((feature) => (
              <m.article
                className="feature-group content-width"
                id={`feature-${feature.visual}`}
                initial={revealFrom}
                key={feature.index}
                transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ amount: 0.25, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="feature-group__number" aria-hidden="true">{feature.index}</div>
                <div className="feature-group__copy">
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
                <FeatureDemo kind={feature.visual} />
              </m.article>
            ))}
          </div>
        </section>

        <section className="library-section" id="library" aria-labelledby="library-title">
          <div className="content-width">
            <header className="section-heading section-heading--compact">
              <p className="eyebrow">ONE LIBRARY</p>
              <h2 id="library-title">Different shapes. One place to look.</h2>
              <p>A note does not need to behave like a PDF. Found keeps each thing useful without making you manage a file cabinet.</p>
            </header>

            <div className="library-tool">
              <div className="segmented-control" aria-label="Choose a library item type" role="tablist">
                {libraryKinds.map((item) => (
                  <button
                    aria-controls="library-preview"
                    aria-selected={selectedKind === item.id}
                    className="segment press-surface press-surface--embedded"
                    key={item.id}
                    onClick={() => setSelectedKind(item.id)}
                    role="tab"
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <AnimatePresence initial={false} mode="wait">
                <m.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`library-preview library-preview--${selectedItem.id}`}
                  exit={{ opacity: 0, y: -12 }}
                  id="library-preview"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  key={selectedItem.id}
                  role="tabpanel"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="library-preview__mark" aria-hidden="true">{selectedItem.meta.slice(0, 1)}</div>
                  <div className="library-preview__copy">
                    <p className="item-meta">{selectedItem.meta}</p>
                    <h3>{selectedItem.title}</h3>
                    <p>{selectedItem.body}</p>
                  </div>
                  <div className="library-preview__actions" aria-hidden="true">
                    <span>OPEN</span><span>COPY</span><span>SHARE</span>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="trust-section" id="privacy" aria-labelledby="trust-title">
          <div className="content-width trust-section__layout">
            <div>
              <p className="eyebrow eyebrow--inverse">LOCAL FIRST</p>
              <h2 id="trust-title">Your library stays yours.</h2>
            </div>
            <div className="trust-points">
              <p><strong>No Found account.</strong><span>Start with your library, not a signup form.</span></p>
              <p><strong>No Found-operated cloud.</strong><span>Your canonical library lives on your device.</span></p>
              <p><strong>Portable backups.</strong><span>Take a validated, readable copy when you choose.</span></p>
              <p><strong>Local search.</strong><span>Keyword and optional enhanced search run on your device.</span></p>
            </div>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <m.div
            className="content-width closing-section__content"
            initial={revealFrom}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.4, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="eyebrow">READY WHEN YOU ARE</p>
            <h2 id="closing-title">Start your library.</h2>
            <PlatformActions placement="closing" />
          </m.div>
        </section>
        </main>
      </SiteShell>
    </LazyMotion>
  )
}

export default App
