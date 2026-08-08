import type { ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { siteConfig } from '../site-config'

export function PrivacyPage() {
  return (
    <SiteShell page="privacy">
      <main className="document-page">
        <header className="document-hero content-width">
          <p className="eyebrow">PRIVACY</p>
          <h1>Your library is not our business model.</h1>
          <p>Found is local first. This policy explains what stays on your device, what can leave it, and the controls available to you.</p>
          <p className="document-meta">Effective August 8, 2026</p>
        </header>

        <div className="document-layout content-width">
          <aside className="document-index" aria-label="Privacy policy sections">
            <a href="#library-data">Library data</a>
            <a href="#network">Network features</a>
            <a href="#crash-reports">Crash reports</a>
            <a href="#website">Website and beta</a>
            <a href="#choices">Your choices</a>
            <a href="#contact">Contact</a>
          </aside>
          <article className="document-content">
            <PolicySection id="library-data" title="1. Your library data">
              <p>Notes, checklists, links, images, PDFs, CSVs, Threads, Folders, and reminders are stored in Found's private application storage on your device. Found does not require an account and does not operate a cloud service that receives your library.</p>
              <p>Search indexes, embeddings, link-preview metadata, and temporary exports are derived from your library. They can be rebuilt or removed without changing the canonical items you kept.</p>
            </PolicySection>

            <PolicySection id="network" title="2. Features that use the network">
              <p>Keyword search works without a network connection. If you enable Enhanced Search, Found downloads a model and runs it on your device; your search text and library are not sent to a Found server.</p>
              <p>When link previews are enabled, Found contacts the website behind a saved link to request public preview information. That website and its network providers can receive ordinary connection information such as your IP address.</p>
              <p>When you choose to share or export something, the destination application or service handles the copy you selected under its own privacy terms.</p>
            </PolicySection>

            <PolicySection id="crash-reports" title="3. Crash reports">
              <p>Release builds use Firebase Crashlytics to help diagnose crashes, application-not-responding events, and selected unexpected failures. Automatic sending is enabled by default and can be changed in Found's Privacy settings.</p>
              <p>Reports can include technical stack traces, app and operating-system versions, device information, application state, and an installation identifier. Found does not set a Crashlytics user ID and intentionally removes note text, titles, queries, links, filenames, attachment details, reminder text, database identifiers, and filesystem paths from handled reports.</p>
              <p>While automatic sending is off, Crashlytics can retain reports on the device. Turning sending back on can upload reports waiting there. Preference changes are guaranteed from the next app launch.</p>
            </PolicySection>

            <PolicySection id="website" title="4. Website and beta enrollment">
              <p>This website is published through GitHub Pages. Found does not add advertising cookies or product analytics to it. GitHub may process ordinary hosting and security logs under GitHub's own privacy terms.</p>
              <p>The public roadmap uses Firebase Anonymous Authentication, Cloud Functions, Firestore, and App Check. When you make up to three picks, Firebase creates a pseudonymous browser identifier and Found stores the selected feature identifiers with an update timestamp. Public roadmap counts are aggregated; individual identifiers and written responses are not public.</p>
              <p>After making a pick, you may optionally explain what it would help you do. Do not include notes, documents, or other private library content. Removing or replacing a pick from the same browser also removes its associated written response. Clearing browser storage can make those anonymous picks impossible for you to identify or remove later.</p>
              <p>The Android beta button opens a Google Form. If you submit it, the developer receives the Google Play email address and any optional testing details you provide. That information is used only to manage beta access, communicate about the test, and understand testing coverage. Google processes the form under its own terms.</p>
              <p>Roadmap responses are removed when their pick is removed or replaced, when the related experiment is closed, or when they are no longer useful for product research. Beta enrollment records are deleted when they are no longer needed for testing or when you ask for their deletion, unless retention is required to meet a legal obligation.</p>
            </PolicySection>

            <PolicySection id="choices" title="5. Your choices and control">
              <ul>
                <li>Delete individual items or delete them forever through Trash.</li>
                <li>Disable link previews and automatic crash-report sending in Settings.</li>
                <li>Export a portable Found backup whenever you choose.</li>
                <li>Remove or replace roadmap picks and their optional responses from the same browser.</li>
                <li>Leave a Play or TestFlight beta through the platform's testing controls.</li>
                <li>Request deletion of beta-enrollment or support information you sent directly.</li>
              </ul>
              <p>Current Found backups are readable ZIP archives and are not encrypted. Anyone with the backup file can read its contents, so store and share it carefully.</p>
            </PolicySection>

            <PolicySection id="contact" title="6. Contact and changes">
              <p>Privacy and support questions can be sent to <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Material changes to this policy will update the effective date and be reflected here before the changed behavior is released.</p>
            </PolicySection>
          </article>
        </div>
      </main>
    </SiteShell>
  )
}

function PolicySection({ children, id, title }: Readonly<{ children: ReactNode; id: string; title: string }>) {
  return <section id={id}><h2>{title}</h2>{children}</section>
}
