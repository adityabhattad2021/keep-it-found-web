import type { ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { siteConfig, sitePath } from '../site-config'

const termsLinks = [
  ['summary', 'At a glance'],
  ['purchase', 'The purchase'],
  ['included', 'Included today'],
  ['personalization', 'Personalization'],
  ['future', 'Future additions'],
  ['restore', 'Restore and refunds'],
  ['changes', 'Availability'],
  ['contact', 'Contact'],
] as const

export function FirstEditionTermsPage() {
  return (
    <SiteShell page="first-edition-terms">
      <main className="document-page">
        <header className="document-hero page-hero content-width">
          <p className="eyebrow">FOUND / FIRST EDITION</p>
          <h1>A small purchase with a clear promise.</h1>
          <p className="page-hero__lede">These terms explain what First Edition includes today, how the purchase works, and how its personal touches stay on your device.</p>
          <p className="document-meta"><span>Effective September 29, 2026</span><span>Found 1.1 for iPhone</span></p>
        </header>

        <div className="document-layout content-width">
          <TermsNavigation />
          <article className="document-content">
            <TermsSection id="summary" title="At a glance">
              <ul className="document-summary">
                <li><strong>One payment.</strong> A one-time purchase. No subscription.</li>
                <li><strong>Every feature is free.</strong> Found stays fully useful without First Edition. Nothing in Found is behind a purchase.</li>
                <li><strong>Yours today.</strong> A bookplate of your own, two First Edition Home Screen icons, and a personal First Edition page inside Found.</li>
                <li><strong>Nothing promised later.</strong> No unreleased benefit is included in the purchase.</li>
              </ul>
            </TermsSection>

            <TermsSection id="purchase" title="1. The purchase">
              <p>First Edition is an optional, one-time non-consumable purchase offered inside Found for iPhone. It is not a subscription and never renews. The price shown in Found is the localized price provided by Apple. Apple charges the Apple Account you confirm at purchase and handles the payment under its App Store terms.</p>
              <p>First Edition is not required to use Found. Every feature of Found is free. Buying it does not change your library, search, files, or how you use Found.</p>
              <p>If a purchase needs approval first, such as from your bank or a family member, First Edition shows that it is waiting for Apple. It appears once Apple confirms the purchase.</p>
            </TermsSection>

            <TermsSection id="included" title="2. What is included today">
              <p>A completed purchase unlocks three things:</p>
              <ul>
                <li><strong>A bookplate of your own.</strong> Your name and a note, ready to share.</li>
                <li><strong>Two First Edition Home Screen icons.</strong> Ink and Imprint. Alternate icons need an iPhone that allows them.</li>
                <li><strong>A personal First Edition page inside Found.</strong></li>
              </ul>
              <p>Found also records the purchase entitlement so First Edition can recognize a valid owner. The presentation of these items may evolve as Found and Apple's platforms change, but an update will not turn this one-time purchase into a subscription.</p>
            </TermsSection>

            <TermsSection id="personalization" title="3. Personalization stays with this device">
              <p>The name and note on your bookplate are stored in Found's private storage on your iPhone. Found does not send them to RevenueCat or to us, and a Found backup does not include them. Your icon choice is a device setting.</p>
              <p>Sharing your bookplate sends it only where you choose. Deleting Found, replacing your iPhone, or restoring it without this app data can remove the bookplate and reset the icon. Restoring the purchase restores First Edition ownership, but it does not recreate personalization that never left the original device.</p>
            </TermsSection>

            <TermsSection id="future" title="4. Future additions">
              <p>Found may add First Edition benefits in future updates. If a benefit is added to the existing First Edition entitlement, owners with a valid purchase will receive it without buying First Edition again.</p>
              <p>No unreleased feature, product, service, subscription, platform, integration, discount, monetary value, or launch date is included in this purchase. Purchase First Edition based only on the benefits identified as available today.</p>
            </TermsSection>

            <TermsSection id="restore" title="5. Restore, refunds, and revocation">
              <p>First Edition is restorable with the Apple Account that bought it. On a new iPhone or after reinstalling, open First Edition in Found's Settings and choose Restore Purchase. A restore needs a network connection and may create a new anonymous RevenueCat identifier for the reinstalled copy.</p>
              <p>Refund requests are handled through Apple. If Apple refunds or revokes the purchase, Found may remove access to First Edition. Personalization left in local storage is not proof of an active purchase and may remain until you remove the app data.</p>
            </TermsSection>

            <TermsSection id="changes" title="6. Availability and changes">
              <p>First Edition requires Found on a supported iPhone, an Apple Account that can make In-App Purchases, and internet access to purchase or restore. Alternate icons also depend on what iOS allows on your iPhone.</p>
              <p>We may update these terms to describe product changes, improve clarity, or meet legal requirements. A material update will receive a new effective date. We will not add an automatic renewal to an existing First Edition purchase.</p>
            </TermsSection>

            <TermsSection id="contact" title="7. Questions">
              <p>Questions about First Edition can be emailed to <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. You can read how purchase information is handled in Found's <a href={sitePath('privacy/')}>Privacy Policy</a>.</p>
            </TermsSection>
          </article>
        </div>
      </main>
    </SiteShell>
  )
}

function TermsNavigation() {
  const renderLinks = () => termsLinks.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)
  return (
    <>
      <aside className="document-index" aria-label="First Edition terms sections">{renderLinks()}</aside>
      <details className="document-jump">
        <summary>Jump to a section</summary>
        <nav aria-label="First Edition terms sections">{renderLinks()}</nav>
      </details>
    </>
  )
}

function TermsSection({ children, id, title }: Readonly<{ children: ReactNode; id: string; title: string }>) {
  return <section id={id}><h2>{title}</h2>{children}</section>
}
