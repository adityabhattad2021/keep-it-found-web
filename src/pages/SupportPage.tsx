import { SiteShell } from '../components/SiteShell'
import { siteConfig, sitePath } from '../site-config'

export function SupportPage() {
  return (
    <SiteShell page="support">
      <main className="support-page">
        <header className="document-hero page-hero content-width">
          <p className="eyebrow">SUPPORT</p>
          <h1>Let’s get it found.</h1>
          <p className="page-hero__lede">Testing access, backups, and problems with your library. Start with the shortest route below.</p>
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
            label="ANDROID CLOSED TEST"
            title="Join closed testing"
            copy="Join the tester group, then opt in through Google Play using the same Google account."
            action="OPEN TEST ACCESS"
            href={sitePath('get/?platform=android')}
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
            <details><summary>How does Android closed testing work?</summary><p>Join Found's public tester group, then use the same Google account to opt in on Google Play. Group owners and managers can see the Google account email you join with. Found does not use the group for marketing or conversations.</p></details>
            <details><summary>Why does Google Play say &quot;App not available&quot;?</summary><p>Confirm that Google Groups and Google Play use the same account and that the tester group appears under My groups. Access changes can take a few minutes to reach Google Play, so retry the testing link after a short wait.</p></details>
            <details><summary>What should a useful bug report include?</summary><p>App version, device model, operating-system version, the screen involved, what you expected, and what happened. Never attach private library content unless support explicitly requests and explains why it is needed.</p></details>
            <details><summary>Is iOS available?</summary><p>The Get Found page always shows the current TestFlight access status.</p></details>
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
  const external = href && /^https?:/.test(href)
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
