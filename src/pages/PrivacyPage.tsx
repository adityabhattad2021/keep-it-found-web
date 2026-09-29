import type { ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { siteConfig } from '../site-config'

const policyLinks = [
  ['summary', 'At a glance'],
  ['library', 'Your library'],
  ['on-device', 'On your iPhone'],
  ['system', 'Siri, Spotlight, and the keyboard'],
  ['network', 'When Found connects'],
  ['purchases', 'Purchases'],
  ['diagnostics', 'Crash reports'],
  ['backups', 'Backups'],
  ['website', 'Website'],
  ['choices', 'Your choices'],
  ['changes', 'What changed'],
] as const

export function PrivacyPage() {
  return (
    <SiteShell page="privacy">
      <main className="document-page">
        <header className="document-hero page-hero content-width">
          <p className="eyebrow">PRIVACY</p>
          <h1>Your library is not the product.</h1>
          <p className="page-hero__lede">Found works on your iPhone, needs no account, and does not sell your data. This page covers what Found 1.1 for iPhone keeps, what it reads, and the few times information leaves your device.</p>
          <p className="document-meta"><span>Effective September 29, 2026</span><span>Found 1.1 for iPhone</span></p>
        </header>

        <div className="document-layout content-width">
          <PolicyNavigation />
          <article className="document-content">
            <PolicySection id="summary" title="At a glance">
              <ul className="document-summary">
                <li><strong>Local first.</strong> Your library is stored in Found's private storage on your iPhone. There is no Found server that receives it.</li>
                <li><strong>No account.</strong> Found does not ask for your name, email address, or phone number.</li>
                <li><strong>On your iPhone.</strong> Search, Search by meaning, and Found's Apple Intelligence features run on the device.</li>
                <li><strong>The clipboard on your tap.</strong> Found reads what you copied only when you tap KEEP.</li>
                <li><strong>Siri &amp; Spotlight is your choice.</strong> It is off on a fresh install. Turning it on keeps a copy on this iPhone for Siri, Spotlight, and Shortcuts.</li>
                <li><strong>Crash reports start off.</strong> Nothing is sent to Firebase unless you turn on Send crash reports.</li>
                <li><strong>No sale or advertising.</strong> Found does not sell your data, track you, or use it for advertising.</li>
                <li><strong>Apple handles payments.</strong> Found never receives your payment-card information.</li>
              </ul>
            </PolicySection>

            <PolicySection id="library" title="1. Your library">
              <p>Notes, links, photos, PDFs, other files, folders, threads, and reminders stay in Found's private app storage on your iPhone. Found has no account and no Found-operated cloud or sync service.</p>
              <p>To make the library searchable, Found also keeps supporting data derived from it on the device: a search index, text recognised in photos, general labels for what a photo shows, Search by meaning data, search phrasings and image captions, What's Inside readings, and link previews you allowed. This data is rebuilt from your library when needed.</p>
              <p>Reminders are local notifications scheduled on your iPhone. Nothing is scheduled on a server. Items you delete go to Trash, and deleting them from Trash removes them from the library.</p>
            </PolicySection>

            <PolicySection id="on-device" title="2. What runs on your iPhone">
              <h3>Apple Intelligence</h3>
              <p>On an iPhone that supports Apple Intelligence, Found uses Apple's on-device model to write search phrasings for your items and, on iOS 27, a one-sentence caption for images. It also uses the model for the suggestions on What's Inside and for Tidy Library. These run on the device while Found is open. Found does not send your items to a server for them.</p>
              <p>Phrasings are used for search and are never shown. The switch is Describe and rephrase on device in Settings › Apple Intelligence. Turning it off deletes what it wrote, including What's Inside readings.</p>

              <h3>What's Inside</h3>
              <p>What's Inside reads an item only when you open it, using text Found already extracted. The details and dates it lists come from the system's on-device data detection. Nothing is lifted, scheduled, renamed, or filed at save time, and a suggestion changes nothing until you tap it.</p>
              <p>When you copy a detail that looks sensitive, such as a password or PIN, it stays on this iPhone and clears from the clipboard after two minutes.</p>

              <h3>The clipboard</h3>
              <p>When Found opens or comes back to the front, Home can offer to keep what you just copied. Until you tap KEEP, Found reads only the clipboard's change count and the kinds of content it declares, such as text, a link, or an image. It never reads the content itself. KEEP reads it once and saves it to your library. iOS may ask you to allow pasting.</p>
              <p>Found does not watch the clipboard in the background or read it without a tap.</p>

              <h3>Controls</h3>
              <p>On iOS 18 or later you can add two controls to Control Center or the Lock Screen. Save Clipboard to Found opens Found and keeps the clipboard the same way KEEP does. Find in Found opens Find. A control cannot read the clipboard on its own.</p>

              <h3>Photos and files</h3>
              <p>Text in photos is recognised on the device with Apple's Vision framework. Photos without text can get up to twelve general labels from Apple's on-device classifier. Found never identifies people.</p>
              <p>Save to Found in the Share Sheet receives only what you choose to share, and you review it before it is saved.</p>
            </PolicySection>

            <PolicySection id="system" title="3. Siri & Spotlight and Found Keyboard">
              <h3>Siri &amp; Spotlight</h3>
              <p>Siri &amp; Spotlight is off on a fresh install. When you turn it on in Found's Settings, Found publishes a protected, read-only copy of your library to a shared space on this iPhone and adds your items to Spotlight's index on this iPhone. The copy includes item names, note text, links, files, the passages Found extracted, and phrasings. It does not leave your iPhone. Turning the switch off removes the copy and the Spotlight entries.</p>
              <p>Find with Found, Ask Found, Find in Found, Find From Context, and Found's Shortcuts actions read this copy. They need Siri &amp; Spotlight on and an unlocked iPhone.</p>
              <ul>
                <li><strong>Find with Found</strong> uses the text, link, or image you share to it for that one search and does not save it.</li>
                <li><strong>Ask Found</strong> (iOS 26) receives your question as text from Siri, searches the copy, and answers with a saved passage and its source. A passage that looks like a password or code is shown, not spoken. Apple handles your voice request under its own privacy policy.</li>
                <li><strong>Find From Context</strong> (iOS 26) reads only the image or text a shortcut hands it, and reads an image's text on the device. Found never looks at your screen.</li>
                <li><strong>Shortcuts actions</strong> read, copy, open, or share one item at a time when you run them.</li>
              </ul>
              <p>On iOS 27, when you ask Siri or a shortcut to keep, add to, or organise something, the change waits in the shared space on this iPhone until Found next opens and adds it to your library.</p>

              <h3>Found Keyboard</h3>
              <p>Found Keyboard works without Full Access, so iOS gives it no network access. It reads a protected, read-only copy of only the notes you gave a shortcut. That copy is kept even while Siri &amp; Spotlight is off. The keyboard looks at the characters you typed just before the cursor to spot a shortcut and does not store the text around it.</p>
            </PolicySection>

            <PolicySection id="network" title="4. When Found connects">
              <p>Found does not send your library, searches, or questions to a Found server. It connects to other services only in these cases:</p>
              <ul>
                <li><strong>Search by meaning download.</strong> When you turn on Search by meaning in Settings › Search, Found downloads its model once from Hugging Face. Hugging Face can receive ordinary connection details such as your IP address. Searching itself stays on your iPhone.</li>
                <li><strong>Link previews, after you allow them.</strong> Found asks before it first fetches a preview. If you allow it, Found contacts the website behind a saved HTTPS link for its public title and image. The website can receive ordinary connection details such as your IP address. The switch is Download link previews in Settings › Privacy.</li>
                <li><strong>Crash reports, if you turn them on.</strong> See section 6.</li>
                <li><strong>First Edition.</strong> See section 5.</li>
                <li><strong>Sharing and exports you start.</strong> When you choose Share, Send, or create a backup, the app or service you pick handles what you selected under its own terms.</li>
              </ul>
              <p>Apple Intelligence may need to download its model through iOS before Found's features can use it. That download is between your iPhone and Apple.</p>
            </PolicySection>

            <PolicySection id="purchases" title="5. Purchases and First Edition">
              <p>When you open First Edition, Found connects to RevenueCat to retrieve product availability and Apple's localized price, and to check whether the purchase belongs to this copy. When you buy or restore First Edition, Apple processes the payment through the App Store and RevenueCat verifies the transaction and purchase entitlement.</p>
              <p>RevenueCat can process an anonymous app user identifier, product and transaction identifiers, purchase status and dates, storefront, country, currency, app version, and ordinary connection or device information. Found uses this information to provide and restore First Edition, understand aggregate purchase activity, prevent purchase errors, and answer purchase-support questions.</p>
              <p>Found does not send RevenueCat your name, email address, library, searches, filenames, documents, or First Edition bookplate. Automatic device-identifier collection is turned off. Neither Found nor RevenueCat receives your payment-card details from Apple.</p>
              <p>Your First Edition bookplate and app-icon choice are stored on your device. Purchase ownership can be restored, but local personalization may be lost if you delete Found or replace your device. RevenueCat explains its own practices in its <a href="https://www.revenuecat.com/privacy/">privacy policy</a>, and Apple handles App Store purchases under <a href="https://www.apple.com/legal/privacy/">Apple's privacy policy</a>.</p>
            </PolicySection>

            <PolicySection id="diagnostics" title="6. Crash reports">
              <p>Crash reports are off until you turn on Send crash reports in Settings › Privacy. When it is on, Found uses Firebase Crashlytics to receive crash and reliability reports.</p>
              <p>A report can include stack traces, app and operating-system versions, device model, the kind of screen in use (a fixed label such as “search”), a short code for an error Found caught, and an installation identifier. Found does not set a user ID and does not add notes, links, searches, filenames, reminder text, or documents to reports.</p>
              <p>If reporting is off, Crashlytics can keep reports on the device, and turning it back on can send reports waiting there. A change applies fully the next time Found opens.</p>
            </PolicySection>

            <PolicySection id="backups" title="7. Backups">
              <p>A Found backup is made only when you ask for one in Settings › Backup &amp; Restore, and saved where you choose. Found never uploads it. It is a normal ZIP with readable notes, your original files, and the records needed to restore. It is not encrypted, so anyone with the file can read it. Keep it somewhere you trust.</p>
              <p>Restoring a backup replaces the library on this iPhone rather than merging with it.</p>
              <p>Found does not exclude its data from your iPhone's own backups. If you back up your iPhone to iCloud or to a computer, that backup includes Found's library and is handled under Apple's terms and your backup settings.</p>
            </PolicySection>

            <PolicySection id="website" title="8. Website and roadmap">
              <p>This website does not use advertising or product analytics. The service that hosts the site can log ordinary request details such as your IP address.</p>
              <p>The public roadmap stores up to two selected feature identifiers, an anonymous browser identifier, and an update time so picks can be counted and changed. To prevent abuse, the roadmap uses Firebase App Check with Google reCAPTCHA Enterprise, which can process ordinary browser and connection information.</p>
              <p>You may also send optional written context with a roadmap pick. Do not include private library content. Removing a pick from the same browser removes the context attached to it.</p>
              <p>The App Store handles installation and updates under Apple's terms. Found does not receive your Apple Account.</p>
            </PolicySection>

            <PolicySection id="choices" title="9. Your choices">
              <ul>
                <li>Delete items permanently through Trash.</li>
                <li>Turn Siri &amp; Spotlight off in Found's Settings to remove the copy Found keeps for Siri, Spotlight, and Shortcuts.</li>
                <li>Remove a note's Found Keyboard shortcut. While Siri &amp; Spotlight is off, that note then leaves the keyboard's copy.</li>
                <li>Turn off Describe and rephrase on device to delete the phrasings, captions, suggestions, and What's Inside readings Found wrote.</li>
                <li>Choose whether Found downloads link previews or sends crash reports in Settings › Privacy.</li>
                <li>Turn off or remove the Search by meaning download in Settings › Search.</li>
                <li>Tap NOT NOW on a clipboard offer, or never add the controls.</li>
                <li>Create a backup whenever you choose.</li>
                <li>Restore a First Edition purchase made with the same Apple Account from the First Edition page.</li>
                <li>Remove or replace roadmap picks from the same browser.</li>
              </ul>
              <p>Questions, or requests to delete information you sent to support, can be emailed to <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Material policy changes will update the effective date before the changed behavior is released.</p>
            </PolicySection>

            <PolicySection id="changes" title="10. What changed on September 29, 2026">
              <p>This version describes Found 1.1 for iPhone.</p>
              <ul>
                <li>Added What's Inside and Tidy Library, and how their Apple Intelligence suggestions stay on the device.</li>
                <li>Added the Home clipboard offer, which reads the clipboard only when you tap KEEP.</li>
                <li>Added the Save Clipboard to Found and Find in Found controls.</li>
                <li>Renamed the system setting to Siri &amp; Spotlight, stated that it is off on a fresh install, and described what Ask Found, Find From Context, and Shortcuts read.</li>
                <li>Named the Search by meaning download host and the Send crash reports switch.</li>
                <li>Added a Backups section, including that Found does not exclude its data from your iPhone's own backups.</li>
                <li>Described the roadmap's abuse protection.</li>
              </ul>
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
