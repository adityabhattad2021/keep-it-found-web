import { useLayoutEffect, useState } from 'react'
import type { CSSProperties } from 'react'

import { AppStoreLink, appAvailability } from './components/AppStoreAction'
import { Device } from './components/Device'
import { FilmDialog } from './components/FilmDialog'
import { AskDemo } from './components/home/AskDemo'
import { Bookplate } from './components/home/Bookplate'
import { FindWalkthrough } from './components/home/FindWalkthrough'
import { KeepHero } from './components/home/KeepHero'
import { RecordLedger } from './components/home/RecordLedger'
import { SurfaceGrid } from './components/home/SurfaceGrid'
import { SiteShell } from './components/SiteShell'
import { useReveals } from './components/use-motion'
import { comingNext, keptKinds, pile } from './home-content'
import { sitePath } from './site-config'
import './home.css'

function App() {
  const [filmOpen, setFilmOpen] = useState(false)
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

  const watchFilm = (
    <button className="film-button" type="button" onClick={() => setFilmOpen(true)}>
      <span className="film-button__play" aria-hidden="true" />
      <span>Watch the film</span>
      <small>1:59</small>
    </button>
  )

  return (
    <SiteShell page="home">
      <main className="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__inner content-width">
            <header className="hero__copy">
              <p className="eyebrow">Found for iPhone</p>
              <h1 id="hero-title">Save it once.<br />Find it again.</h1>
              <p className="hero__lede">One private place for your notes, links, photos, PDFs and files. When you need something back, ask for what it said, right where the question is.</p>
              <div className="hero__actions">
                <AppStoreLink />
                {watchFilm}
              </div>
              <p className="hero__meta">{appAvailability}</p>
            </header>
            <KeepHero />
          </div>
        </section>

        <section className="somewhere" aria-labelledby="somewhere-title">
          <div className="content-width somewhere__inner">
            <ul className="somewhere__pile" aria-label="Where things end up">
              {pile.map((entry, index) => (
                <li key={entry.label} style={{ '--tilt': `${entry.tilt}deg`, '--delay': `${index * 120}ms` } as CSSProperties}>
                  <strong>{entry.count.toLocaleString('en-US')}</strong>
                  <span>{entry.label}</span>
                </li>
              ))}
            </ul>
            <div className="somewhere__words">
              <h2 id="somewhere-title">You kept it once.<br /><span>Somewhere.</span></h2>
              <p>Once should be enough.</p>
            </div>
          </div>
        </section>

        <section className="chapter" id="how-it-works" aria-labelledby="where-title">
          <div className="content-width">
            <header className="chapter__heading reveal">
              <p className="eyebrow">Right where the question is</p>
              <h2 id="where-title">Find it without leaving the conversation.</h2>
            </header>
            <FindWalkthrough />
          </div>
        </section>

        <section className="chapter chapter--split" aria-labelledby="keep-title">
          <div className="content-width split">
            <div className="split__copy reveal">
              <p className="eyebrow">Save to Found</p>
              <h2 id="keep-title">Keep it in one move.</h2>
              <p>Choose Save to Found in the Share Sheet of any app that offers one: text, links, photos, PDFs and every other kind of file. Or tap Keep when Found offers what you just copied. Found reads your clipboard only when you tap.</p>
              <ul className="kinds" aria-label="What Found keeps">
                {keptKinds.map((kind) => <li key={kind.kind}><span>{kind.kind}</span>{kind.label}</li>)}
              </ul>
            </div>
            <Device className="split__device reveal" clip="save" label="A real recording: a business card photo shared from Files to Found, then saved." width="clamp(240px, 23vw, 310px)" />
          </div>
        </section>

        <section className="chapter chapter--ask" id="try-found" aria-labelledby="ask-title">
          <div className="content-width">
            <header className="chapter__heading reveal">
              <p className="eyebrow">Find it again</p>
              <h2 id="ask-title">Ask for what it said, not where you put it.</h2>
              <p>Found reads the words in your photos and the pages of your PDFs, and with Search by meaning, finds things you describe in other words. Remembering a fragment is enough. Try it.</p>
            </header>
            <AskDemo />
          </div>
        </section>

        <section className="chapter chapter--split" aria-labelledby="inside-title">
          <div className="content-width split split--reverse">
            <Device className="split__device reveal" clip="inside" label="A real recording: What’s Inside on a business card photo shows its email and phone number and suggests a name, then on a whiteboard photo shows the dates coming up, and one is brought back." width="clamp(240px, 23vw, 310px)" />
            <div className="split__copy reveal">
              <p className="eyebrow">What’s Inside</p>
              <h2 id="inside-title">It notices what’s inside.</h2>
              <p>Open What’s Inside on a note, link, photo, PDF or text file, and Found lifts out the details: phone numbers, emails, addresses, amounts, flight numbers. It lists the dates coming up, and brings one back to you in time when you tap Bring back.</p>
              <p>With Apple Intelligence, it also suggests a name for something saved as IMG_4812, and where to keep it.</p>
              <p className="footnote">Requires iOS 26. Suggestions need an iPhone that supports Apple Intelligence. Read on your iPhone; nothing leaves it.</p>
            </div>
          </div>
        </section>

        <section className="chapter chapter--split" aria-labelledby="spaces-title">
          <div className="content-width split">
            <div className="split__copy reveal">
              <p className="eyebrow">Spaces and Kept close</p>
              <h2 id="spaces-title">Keep what belongs together.</h2>
              <p>Folders and threads for the things that go together, with the ones you choose on Home. Keep Close pins what you reach for, and any saved thing can carry a reminder that waits under Needs you.</p>
            </div>
            <Device className="split__device reveal" clip="spaces" label="A real recording: the Harbor Lane launch folder, then Launch day kept close on Home." width="clamp(240px, 23vw, 310px)" />
          </div>
        </section>

        <section className="chapter chapter--surfaces" aria-labelledby="surfaces-title">
          <div className="content-width">
            <header className="chapter__heading reveal">
              <p className="eyebrow">Where you ask</p>
              <h2 id="surfaces-title">Found is there when the question is.</h2>
            </header>
            <SurfaceGrid />
          </div>
        </section>

        <section className="yours" id="privacy" aria-labelledby="yours-title">
          <div className="content-width yours__inner">
            <div className="yours__copy reveal">
              <p className="eyebrow eyebrow--inverse">Yours</p>
              <h2 id="yours-title">No account. No Found server.</h2>
              <p>Your library stays on your iPhone, and in your iPhone’s own backups. Found reaches out only when you ask it to: the Search by meaning download, link previews you allow, crash reports you turn on, a First Edition purchase, and whatever you choose to share or back up.</p>
              <a className="yours__link" href={sitePath('privacy/')}>Read the privacy policy</a>
            </div>
            <RecordLedger />
          </div>
        </section>

        <section className="chapter edition" id="first-edition" aria-labelledby="edition-title">
          <div className="content-width split">
            <div className="split__copy reveal">
              <p className="eyebrow">First Edition</p>
              <h2 id="edition-title">Every feature is free.</h2>
              <p>If Found earns a place in your day, there’s First Edition. One purchase puts your name on a bookplate, adds two First Edition icons for your Home Screen, Ink and Imprint, and gives you a page of your own inside Found.</p>
              <p className="edition__maker">One person builds Found. First Edition helps write what comes next.</p>
              <p className="footnote">One-time purchase · No subscription · <a href={sitePath('first-edition/terms/')}>First Edition terms</a></p>
            </div>
            <Bookplate />
          </div>
        </section>

        <section className="chapter coming" aria-labelledby="coming-title">
          <div className="content-width">
            <header className="chapter__heading reveal">
              <p className="eyebrow">Coming next</p>
              <h2 id="coming-title">The next chapter.</h2>
              <p>Being built now, in the open. Tell us what should come first.</p>
            </header>
            <ol className="coming__list">
              {comingNext.map((item, index) => (
                <li className="reveal" key={item.title} style={{ transitionDelay: `${index * 90}ms` }}>
                  <span className="coming__tag">In development</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
            <a className="button button--raised coming__roadmap" href={sitePath('roadmap/')}>Vote on the roadmap</a>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="content-width closing__inner">
            <div className="closing__copy">
              <img className="closing__icon" src={sitePath('brand/found-icon.png')} width="60" height="60" alt="" />
              <h2 id="closing-title">Start with the thing you just thought of.</h2>
              <div className="hero__actions closing__actions">
                <AppStoreLink />
                {watchFilm}
              </div>
              <p className="hero__meta">{appAvailability}</p>
            </div>
            <figure className="closing__qr">
              <img src={sitePath('brand/app-store-qr.svg')} width="220" height="220" alt="QR code for Found on the App Store" />
              <figcaption>Scan with your iPhone</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <FilmDialog open={filmOpen} onClose={() => setFilmOpen(false)} />
    </SiteShell>
  )
}

export default App
