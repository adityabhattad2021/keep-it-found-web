import { useLayoutEffect } from 'react'
import { LazyMotion } from 'motion/react'

import { HeroExperience } from './components/HeroExperience'
import { LibraryProof } from './components/LibraryProof'
import { PlatformActions } from './components/PlatformActions'
import { SiteShell } from './components/SiteShell'
import { everydayUses } from './home-content'
import { sitePath } from './site-config'
import './home.css'

const loadMotionFeatures = () => import('./components/motion-features').then((module) => module.default)

function App() {
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

          <section className="breadth-section" id="features" aria-labelledby="breadth-title">
            <div className="content-width breadth-section__layout">
              <header className="section-heading section-heading--compact">
                <p className="eyebrow">ONE LIBRARY, REAL OBJECTS</p>
                <h2 id="breadth-title">Everything keeps its shape.</h2>
                <p>Every item keeps the behavior that makes it useful. Text stays copyable, images stay shareable, and files stay original.</p>
              </header>
              <LibraryProof />
            </div>
          </section>

          <section className="uses-section" aria-labelledby="uses-title">
            <div className="content-width">
              <header className="section-heading section-heading--compact">
                <p className="eyebrow">USE IT AGAIN</p>
                <h2 id="uses-title">Ready when you need it.</h2>
              </header>
              <div className="use-list">
                {everydayUses.map((use) => (
                  <article key={use.index}>
                    <span>{use.index}</span>
                    <h3>{use.title}</h3>
                    <p>{use.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="trust-section" id="privacy" aria-labelledby="trust-title">
            <div className="content-width trust-section__layout">
              <div>
                <p className="eyebrow">THE FOUND PROMISE</p>
                <h2 id="trust-title">Yours means yours.</h2>
              </div>
              <div className="trust-section__proof">
                <p>Use the core library without an account. Search locally. Create a portable backup when you choose.</p>
                <a href={sitePath('privacy/')}>Read the plain-language privacy policy</a>
              </div>
            </div>
          </section>

          <section className="build-section" aria-labelledby="build-title">
            <div className="content-width build-section__layout">
              <header>
                <p className="eyebrow">BUILT IN PUBLIC</p>
                <h2 id="build-title">Found is learning what deserves to exist next.</h2>
                <p>The roadmap stays honest, and the journal shows the decisions behind the product.</p>
              </header>
              <div className="build-section__links">
                <a className="press-surface press-surface--raised" href={sitePath('roadmap/')}><span>ROADMAP</span><strong>Shape what comes next</strong></a>
                <a className="press-surface press-surface--raised" href={sitePath('journal/')}><span>JOURNAL</span><strong>Read how Found is built</strong></a>
              </div>
            </div>
          </section>

          <section className="closing-section" aria-labelledby="closing-title">
            <div className="content-width closing-section__content">
              <p className="eyebrow">KEEP IT FOUND</p>
              <h2 id="closing-title">Keep the things you need twice.</h2>
              <p>Found is in early release. Put it on a real phone, use it for real material, and help make the next version sharper.</p>
              <PlatformActions placement="closing" />
            </div>
          </section>
        </main>
      </SiteShell>
    </LazyMotion>
  )
}

export default App
