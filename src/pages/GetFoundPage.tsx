import { AppStoreAction } from '../components/AppStoreAction'
import { SiteShell } from '../components/SiteShell'
import { siteConfig, sitePath } from '../site-config'

/**
 * Get Found: the App Store, then the few switches that bring the library to
 * wherever the question is. Names and OS floors follow the claim ledger.
 */
const setupSteps = [
  {
    id: 'siri-spotlight',
    where: 'In Found · Settings',
    title: 'Siri & Spotlight',
    steps: 'Open the menu, choose Settings, then Siri & Spotlight, and turn it on. This one switch lets Find with Found, Siri, Spotlight and Shortcuts reach your library.',
    note: 'Off until you turn it on. Found keeps an on-device copy of what it can share there, and removes it when you turn this off.',
  },
  {
    id: 'save-to-found',
    where: 'The Share Sheet, in another app',
    title: 'Save to Found',
    steps: 'Tap Share, then Save to Found. If it isn’t in the row of apps, scroll to the end of the row, tap More, and add it. Then choose where it belongs, or just save.',
    note: 'Takes text, one link, and up to ten photos and ten files at a time.',
  },
  {
    id: 'find-with-found',
    where: 'The Share Sheet, in another app',
    title: 'Find with Found',
    steps: 'Select a question, a link or a screenshot, tap Share, then Find with Found. If it isn’t there, scroll to the end of the actions, tap Edit Actions, and add it.',
    note: 'Nothing you share to it is saved.',
  },
  {
    id: 'found-keyboard',
    where: 'The Settings app',
    title: 'Found Keyboard',
    steps: 'Go to General, Keyboard, Keyboards, Add New Keyboard, and choose Found. In Found, give a note a shortcut. Then type ; and the shortcut, switch to the Found Keyboard with the globe key, and tap the note.',
    note: 'The Found Keyboard works without Full Access and has no network access.',
  },
  {
    id: 'search-by-meaning',
    where: 'In Found · Settings · Search',
    title: 'Search by meaning',
    steps: 'Turn on Search by meaning to download its model once. After that, Found can find things you describe in other words, on your iPhone.',
    note: 'Keyword search works without it.',
  },
  {
    id: 'apple-intelligence',
    where: 'In Found · Settings · Apple Intelligence',
    title: 'Apple Intelligence',
    steps: 'On iOS 26, check that Describe and rephrase on device is on. It is by default where Apple Intelligence is available. Found then writes search phrasings on your iPhone, and What’s Inside can suggest a name and a place for things.',
    note: 'Needs an iPhone that supports Apple Intelligence. What’s Inside’s details and dates work without it.',
  },
  {
    id: 'controls',
    where: 'Control Center or the Lock Screen',
    title: 'Controls',
    steps: 'On iOS 18, add Save Clipboard to Found and Find in Found as controls, to keep what you copied or open Find in one tap.',
    note: 'Both open Found. iOS may ask you to allow pasting.',
  },
] as const

const needs = [
  { term: 'iPhone', detail: `iOS ${siteConfig.app.minimumIosVersion} or later. Found is free, with no account to create.` },
  { term: 'Siri and Shortcuts', detail: 'Most Shortcuts actions need iOS 17, and Find in Found with Siri iOS 17.4. Asking Siri with “Ask Found” needs iOS 26.' },
  { term: 'What’s Inside', detail: 'iOS 26. Its details and dates work without Apple Intelligence.' },
  { term: 'Apple Intelligence', detail: 'Search phrasings and What’s Inside suggestions need iOS 26 on an iPhone that supports Apple Intelligence.' },
  { term: 'Controls', detail: 'Save Clipboard to Found and Find in Found need iOS 18.' },
] as const

export function GetFoundPage() {
  return (
    <SiteShell page="get">
      <main className="get-page">
        <section className="get-hero content-width" aria-labelledby="get-title">
          <div className="get-hero__copy">
            <p className="eyebrow">Found for iPhone</p>
            <h1 id="get-title">Get Found.</h1>
            <p className="page-hero__lede">Free on the App Store. Nothing to sign up for. Your library stays on your iPhone.</p>
            <AppStoreAction placement="get" />
          </div>
          <figure className="get-hero__qr">
            <img src={sitePath('brand/app-store-qr.svg')} width="220" height="220" alt="QR code for Found on the App Store" />
            <figcaption>On a computer? Scan with your iPhone.</figcaption>
          </figure>
        </section>

        <section className="setup content-width" aria-labelledby="setup-title" id="setup">
          <header className="section-heading">
            <p className="eyebrow">After you install</p>
            <h2 id="setup-title">A minute of setup, then Found is there when you ask.</h2>
            <p>Found works on its own right away. These bring it into other apps, Siri and the keyboard. Most stay off until you turn them on.</p>
          </header>
          <ol className="setup-steps">
            {setupSteps.map((step, index) => (
              <li className="setup-step" id={step.id} key={step.id}>
                <span className="setup-step__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="setup-step__copy">
                  <p className="setup-step__where">{step.where}</p>
                  <h3>{step.title}</h3>
                  <p>{step.steps}</p>
                  <small>{step.note}</small>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="get-ask content-width" aria-labelledby="ask-siri-title">
          <div className="get-ask__card">
            <p className="eyebrow">Ask Siri · iOS 26</p>
            <h2 id="ask-siri-title">“Ask Found a question.”</h2>
            <p>Siri asks what you’d like to know. Say it, and Siri answers with the passage you saved and where it came from. It never makes an answer up.</p>
          </div>
        </section>

        <section className="needs content-width" aria-labelledby="needs-title">
          <h2 id="needs-title">What it needs</h2>
          <dl>
            {needs.map((need) => (
              <div key={need.term}>
                <dt>{need.term}</dt>
                <dd>{need.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="needs__note">The App Store handles installing, updates and First Edition under Apple’s terms. Found has no account of its own. <a href={sitePath('support/')}>Questions? See Support.</a></p>
        </section>
      </main>
    </SiteShell>
  )
}
