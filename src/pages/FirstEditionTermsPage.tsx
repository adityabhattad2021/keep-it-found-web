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
          <p className="page-hero__lede">These terms explain the permanent benefits included with First Edition and how purchase ownership and local personalization work.</p>
          <p className="document-meta">Effective September 13, 2026</p>
        </header>

        <div className="document-layout content-width">
          <TermsNavigation />
          <article className="document-content">
            <TermsSection id="summary" title="At a glance">
              <ul className="document-summary">
                <li><strong>One payment.</strong> First Edition is a one-time purchase, not a subscription.</li>
                <li><strong>Something yours today.</strong> It immediately unlocks a member page, personal bookplate, and two alternate icons.</li>
                <li><strong>A complete purchase.</strong> No unreleased product, service, subscription, platform, discount, or launch date is included.</li>
              </ul>
            </TermsSection>

            <TermsSection id="purchase" title="1. The purchase">
              <p>First Edition is an optional, one-time non-consumable purchase offered inside Found for iPhone. The price shown in Found is the localized price provided by Apple. Apple charges the Apple Account you confirm at purchase and handles the payment under its App Store terms.</p>
              <p>First Edition is not required to use Found. Buying it does not place the library, search, files, or existing workflows behind a paywall.</p>
            </TermsSection>

            <TermsSection id="included" title="2. What is included today">
              <p>A completed purchase immediately unlocks the First Edition member page, a personal bookplate for your copy of Found, and two alternate First Edition app icons. Found also records the purchase entitlement so the member page can recognize a valid First Edition owner.</p>
              <p>The presentation of these items may evolve as Found and Apple's platforms change, but an update will not turn this one-time purchase into a subscription.</p>
            </TermsSection>

            <TermsSection id="personalization" title="3. Personalization stays with this device">
              <p>The name and inscription you add to the bookplate are stored in Found's private storage on your device. Found does not send that text to RevenueCat. Your icon choice is also a device setting.</p>
              <p>Deleting Found, replacing your device, or restoring the device without this local app data can remove the bookplate and reset the selected icon. Restoring the purchase restores First Edition ownership, but it does not recreate personalization that never left the original device.</p>
            </TermsSection>

            <TermsSection id="future" title="4. Future additions">
              <p>Found may add new First Edition benefits in future updates. If a benefit is added to the existing First Edition entitlement, owners with a valid purchase will receive it without buying First Edition again.</p>
              <p>No unreleased feature, product, service, subscription, platform, integration, discount, monetary value, or launch date is included in this purchase. Purchase First Edition based only on the benefits identified as available today.</p>
            </TermsSection>

            <TermsSection id="restore" title="5. Restore, refunds, and revocation">
              <p>You can use Restore Purchase inside First Edition to ask Apple and RevenueCat to recover a valid purchase associated with the same Apple Account. A restore needs a network connection and may create a new anonymous RevenueCat identifier for the reinstalled copy.</p>
              <p>Refund requests are handled through Apple. If Apple refunds or revokes the purchase, Found may remove access to First Edition membership. Personalization left in local storage is not proof of an active purchase and may remain until you remove the app data.</p>
            </TermsSection>

            <TermsSection id="changes" title="6. Availability and changes">
              <p>First Edition currently requires a compatible iPhone, supported version of iOS, an Apple Account that can make In-App Purchases, and internet access for purchase verification or restoration. Alternate-icon behavior also depends on capabilities Apple provides.</p>
              <p>We may update these terms to describe product changes, improve clarity, or meet legal requirements. A material update will receive a new effective date. We will not retroactively add an automatic renewal to an existing First Edition purchase.</p>
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
