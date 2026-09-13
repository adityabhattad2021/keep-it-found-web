import type { ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { siteConfig } from '../site-config'

const policyLinks = [
  ['summary', 'At a glance'],
  ['library', 'Your library'],
  ['network', 'Network use'],
  ['purchases', 'Purchases'],
  ['diagnostics', 'Diagnostics'],
  ['website', 'Website'],
  ['choices', 'Your choices'],
] as const

export function PrivacyPage() {
  return (
    <SiteShell page="privacy">
      <main className="document-page">
        <header className="document-hero page-hero content-width">
          <p className="eyebrow">PRIVACY</p>
          <h1>Your library is not the product.</h1>
          <p className="page-hero__lede">Found works locally, requires no account, and does not sell your data. This page explains the few times information can leave your device.</p>
          <p className="document-meta">Effective September 13, 2026</p>
        </header>

        <div className="document-layout content-width">
          <PolicyNavigation />
          <article className="document-content">
            <PolicySection id="summary" title="At a glance">
              <ul className="document-summary">
                <li><strong>Local first.</strong> Your library is stored in Found's private app storage.</li>
                <li><strong>No account required.</strong> Found does not need your name, email address, or phone number.</li>
                <li><strong>No sale or advertising.</strong> Found does not sell your data or use it for targeted advertising.</li>
                <li><strong>You choose exports.</strong> Files leave Found when you explicitly share or back them up.</li>
                <li><strong>Apple handles payments.</strong> Found never receives your payment-card information.</li>
                <li><strong>Personal means local.</strong> First Edition bookplate text stays on your device.</li>
              </ul>
            </PolicySection>

            <PolicySection id="library" title="1. Your library">
              <p>Notes, links, images, PDFs, CSVs, collections, and reminders stay in Found's private storage on your device. Search indexes, link previews, and embeddings are supporting data derived from that library.</p>
              <p>Found does not currently provide an account or a Found-operated sync service. A portable backup is created only when you request one. Current backups are readable ZIP archives and are not encrypted, so keep them somewhere you trust.</p>
            </PolicySection>

            <PolicySection id="network" title="2. When Found uses the network">
              <p>Search by meaning downloads a model, then runs searches on your device. Your query and library are not sent to a Found server.</p>
              <p>If link previews are enabled, Found contacts the website behind a saved link for public title, image, and description information. The website can receive ordinary connection details such as your IP address.</p>
              <p>When you choose Share, the receiving app or service handles the content you selected under its own privacy terms.</p>
            </PolicySection>

            <PolicySection id="purchases" title="3. Purchases and First Edition">
              <p>When you open First Edition, Found connects to RevenueCat to retrieve product availability and Apple's localized price, and to check whether the purchase belongs to this copy. When you buy or restore First Edition, Apple processes the payment and RevenueCat verifies the transaction and purchase entitlement.</p>
              <p>RevenueCat can process an anonymous app user identifier, product and transaction identifiers, purchase status and dates, storefront, country, currency, app version, and ordinary connection or device information. Found uses this information to provide and restore First Edition, understand aggregate purchase activity, prevent purchase errors, and answer purchase-support questions.</p>
              <p>Found does not send RevenueCat your name, email address, library, searches, filenames, documents, or First Edition bookplate. Automatic device-identifier collection is disabled, and Found does not attach a Found account because no account is currently required. Neither Found nor RevenueCat receives your payment-card details from Apple.</p>
              <p>Your First Edition bookplate and app-icon choice are stored on your device. Purchase ownership can be restored, but local personalization may be lost if you delete Found or replace your device. RevenueCat explains its own practices in its <a href="https://www.revenuecat.com/privacy/">privacy policy</a>, and Apple handles App Store purchases under <a href="https://www.apple.com/legal/privacy/">Apple's privacy policy</a>.</p>
            </PolicySection>

            <PolicySection id="diagnostics" title="4. Diagnostics">
              <p>Release builds can use Firebase Crashlytics to receive crash and reliability reports. Reporting starts off. You can choose to turn it on in Found's Privacy &amp; Data settings.</p>
              <p>A report can include stack traces, app and operating-system versions, device model, application state, and an installation identifier. Found does not set a Crashlytics user ID or deliberately attach notes, links, searches, filenames, reminder text, or documents to reports.</p>
              <p>If reporting is switched off, Crashlytics can keep reports on the device. Switching it back on can send reports waiting there. The changed preference takes effect the next time Found opens.</p>
            </PolicySection>

            <PolicySection id="website" title="5. Website and roadmap">
              <p>The Found website does not use advertising or product analytics. The public roadmap stores two selected feature identifiers, an anonymous browser identifier, and an update time so picks can be counted and changed.</p>
              <p>You may also send optional written context with a roadmap pick. Do not include private library content. Removing or replacing a pick from the same browser removes the response attached to it.</p>
              <p>Android closed testing uses a publicly joinable Google Group as an access list. Google processes the account you use to join, and the group's owners and managers can see member email addresses. Found does not copy that membership into its own system or use the group for marketing. TestFlight and Google Play otherwise handle testing access under their own privacy terms.</p>
            </PolicySection>

            <PolicySection id="choices" title="6. Your choices">
              <ul>
                <li>Delete items permanently through Trash.</li>
                <li>Choose whether Found downloads link previews or sends crash diagnostics in Settings.</li>
                <li>Create a portable backup whenever you choose.</li>
                <li>Restore a First Edition purchase made with the same Apple Account from the First Edition screen.</li>
                <li>Remove or replace roadmap picks from the same browser.</li>
                <li>Leave a test using the controls provided by the app store, and leave the Android tester group at any time.</li>
              </ul>
              <p>Questions or deletion requests for information sent directly to support can be emailed to <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Material policy changes will update the effective date before the changed behavior is released.</p>
            </PolicySection>
          </article>
        </div>
      </main>
    </SiteShell>
  )
}

function PolicyNavigation() {
  const renderLinks = () => policyLinks.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)
  return (
    <>
      <aside className="document-index" aria-label="Privacy policy sections">{renderLinks()}</aside>
      <details className="document-jump">
        <summary>Jump to a section</summary>
        <nav aria-label="Privacy policy sections">{renderLinks()}</nav>
      </details>
    </>
  )
}

function PolicySection({ children, id, title }: Readonly<{ children: ReactNode; id: string; title: string }>) {
  return <section id={id}><h2>{title}</h2>{children}</section>
}
