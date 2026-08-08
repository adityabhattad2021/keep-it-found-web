import { SiteShell } from '../components/SiteShell'
import { siteConfig } from '../site-config'

export function SupportPage() {
  return (
    <SiteShell page="support">
      <main className="support-page">
        <header className="document-hero content-width">
          <p className="eyebrow">SUPPORT</p>
          <h1>Let’s get it found.</h1>
          <p>Beta access, backups, and problems with your library. Start with the shortest route below.</p>
        </header>

        <section className="support-routes" aria-label="Support options">
          <SupportRoute
            label="REPORT A PROBLEM"
            title="Something broke"
            copy="Open a public issue without including private notes, links, filenames, or documents."
            href={siteConfig.issueUrl}
            action="OPEN GITHUB ISSUE"
          />
          <SupportRoute
            label="ANDROID BETA"
            title="Waiting for access"
            copy="Beta invitations are added in batches. Use the same Google account that is active in Play Store."
            action={siteConfig.releases.android.href ? 'OPEN BETA FORM' : 'FORM OPENING SOON'}
            href={siteConfig.releases.android.href}
          />
          <SupportRoute
            label="PRIVATE SUPPORT"
            title="Need to share details"
            copy="Email details that should not appear in a public issue. Include only what is needed to understand the problem."
            action="EMAIL SUPPORT"
            href={`mailto:${siteConfig.supportEmail}`}
          />
        </section>

        <section className="faq-section content-width" aria-labelledby="faq-title">
          <header className="section-heading section-heading--compact">
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 id="faq-title">Before you send anything.</h2>
          </header>
          <div className="faq-list">
            <details><summary>Where is my library stored?</summary><p>Canonical library data stays in Found's private storage on your device. Found currently has no account or Found-operated sync service.</p></details>
            <details><summary>Can I take my data out?</summary><p>Yes. Settings can create a validated, human-readable Found backup. Current backups are not encrypted, so handle the ZIP carefully.</p></details>
            <details><summary>How do Android beta invitations work?</summary><p>Submit the Google account used by Play Store. After it is added to the closed-test list, you receive a Play opt-in link. Remain enrolled for the requested test period and use Found naturally.</p></details>
            <details><summary>What should a useful bug report include?</summary><p>App version, device model, Android version, the screen involved, what you expected, and what happened. Never attach private library content unless support explicitly requests and explains why it is needed.</p></details>
            <details><summary>Is iOS available?</summary><p>iPhone and iPad support is being qualified. The iOS action on the homepage will become active only when a real TestFlight build is ready.</p></details>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}

function SupportRoute({ action, copy, href, label, title }: Readonly<{
  action: string
  copy: string
  href?: string
  label: string
  title: string
}>) {
  const external = href && !href.startsWith('mailto:')
  const actionNode = href
    ? <a href={href} rel={external ? 'noreferrer' : undefined} target={external ? '_blank' : undefined}>{action}<span aria-hidden="true">→</span></a>
    : <span aria-disabled="true">{action}</span>

  return (
    <article className="support-route content-width">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
      {actionNode}
    </article>
  )
}
