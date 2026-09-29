import type { ReactNode } from 'react'

import { SiteShell } from '../components/SiteShell'
import { siteConfig, sitePath } from '../site-config'

export function SupportPage() {
  return (
    <SiteShell page="support">
      <main className="support-page">
        <header className="document-hero page-hero content-width">
          <p className="eyebrow">SUPPORT</p>
          <h1>Let’s get it found.</h1>
          <p className="page-hero__lede">Answers for Found 1.1 on iPhone: setting up, asking Siri, backups, and First Edition. If something is still wrong, there are two ways to reach a person.</p>
        </header>

        <section className="support-routes content-width" aria-label="Support options">
          <SupportRoute
            label="REPORT A PROBLEM"
            title="Something broke"
            copy="Open a public issue. Leave out private notes, links, filenames, and documents."
            href={siteConfig.issueUrl}
            action="OPEN GITHUB ISSUE"
          />
          <SupportRoute
            label="SETTING UP"
            title="Turn on the rest of Found"
            copy="Siri & Spotlight, Find with Found, Found Keyboard, and Search by meaning each need a moment of setup. The steps are on the Get page."
            action="SEE THE SETUP STEPS"
            href={sitePath('get/#setup')}
          />
          <SupportRoute
            label="PRIVATE SUPPORT"
            title="Need to share details"
            copy="Email anything that should not appear in a public issue. Include only what is needed to understand the problem."
            action="EMAIL SUPPORT"
            href={`mailto:${siteConfig.supportEmail}`}
          />
        </section>

        <section className="faq-section content-width" aria-labelledby="faq-title">
          <header className="section-heading section-heading--compact">
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 id="faq-title">Before you send anything.</h2>
          </header>

          <FaqGroup title="Getting started">
            <Faq question="How do I start?">
              <p>Install Found from the App Store. It needs iOS {siteConfig.app.minimumIosVersion} or later and no account. Save with the + button, or from another app with Save to Found in the Share Sheet. Home’s Use Found everywhere row shows what is left to set up.</p>
            </Faq>
            <Faq question="Save to Found is not in the Share Sheet.">
              <p>In the Share Sheet, scroll the row of apps to the end, tap More, and add Save to Found. It accepts text, one web link, and up to ten images and ten files at a time. You choose where each share belongs before it is saved.</p>
            </Faq>
            <Faq question="Why does Found offer to keep what I copied?">
              <p>When Found opens, Home can offer to keep the text, link, or image you just copied. Found reads the clipboard only when you tap KEEP, and iOS may ask you to allow pasting. NOT NOW leaves it alone, and the same copy is not offered again.</p>
            </Faq>
            <Faq question="How do I add the Control Center controls?">
              <p>On iOS 18 or later, open Control Center, tap +, then Add a Control, and search for Found. Choose Save Clipboard to Found or Find in Found. You can also put them on the Lock Screen when you customize it. Both controls open Found.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="Siri, Spotlight, and Shortcuts">
            <Faq question="How do I turn on Siri & Spotlight?">
              <p>In Found, open Settings › Siri &amp; Spotlight and turn the switch on. It is off on a fresh install. Spotlight, Find with Found, Siri, and Found’s Shortcuts actions all need it. If an update does not finish, the same page offers Refresh Siri &amp; Spotlight.</p>
            </Faq>
            <Faq question="How do I ask Siri?">
              <p>On iOS 26 or later, with your iPhone unlocked, say “Ask Found” or “Ask Found a question”. Siri asks what you’d like to know. Say your question, and Siri answers with the matching passage and names where it came from. The answer is always something you saved, never generated. It needs Siri &amp; Spotlight on.</p>
              <p>You can also use the Ask Found action in Shortcuts. On iOS 17.4 or later, “Find in Found” finds a saved item for what you ask.</p>
            </Faq>
            <Faq question="How do I add Find with Found to the Share Sheet?">
              <p>Share some text, a link, or a screenshot. Scroll to the end of the actions, tap Edit Actions, and turn on Find with Found. It searches your library without opening Found, and nothing you share to it is saved. It needs Siri &amp; Spotlight on.</p>
            </Faq>
            <Faq question="Something I saved is not in Spotlight.">
              <p>Check that Siri &amp; Spotlight is on. Spotlight matches items by name. To search inside notes, PDFs, and photos, use Find in Found, Find with Found, or Ask Found. Some items can be unavailable while the iPhone is locked. A PDF opens from Spotlight as the whole document, not at the matching page.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="Found Keyboard">
            <Faq question="How do I add Found Keyboard?">
              <p>On iOS 18 or later, open the Settings app, go to Apps › Found › Keyboards, and turn on Found. On earlier versions, go to General › Keyboard › Keyboards › Add New Keyboard and choose Found. Found Keyboard does not need Full Access and has no network access.</p>
            </Faq>
            <Faq question="How do I give a note a shortcut?">
              <p>Open a text note’s ••• menu and choose Add to Found Keyboard. A shortcut has 2 to 24 letters and numbers and starts with a letter. While typing anywhere, type ; and the shortcut with your usual keyboard, switch to Found with the globe key, and choose the note. Manage shortcuts in Settings › Found Keyboard.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="Search and Apple Intelligence">
            <Faq question="How do I turn on Search by meaning?">
              <p>Open Settings › Search, choose a model, and tap Turn On Search by Meaning. The model downloads once from Hugging Face, then Found indexes your library on your iPhone, which can take a while. Searching never leaves your iPhone. Exact-word search always works without it.</p>
            </Faq>
            <Faq question="What do the Apple Intelligence features need?">
              <p>With Apple Intelligence, Found writes search phrasings and image captions on your iPhone, so items turn up for the words you use. It needs iOS 26 or later on an iPhone that supports Apple Intelligence, with Apple Intelligence turned on and its model ready. Image captions also need iOS 27. The switch is Describe and rephrase on device in Found’s Settings › Apple Intelligence. It pauses in Low Power Mode or when the iPhone is hot.</p>
            </Faq>
            <Faq question="What does What’s Inside need?">
              <p>What’s Inside is in an item’s menu on iOS 26 or later. The details and dates it lists need no Apple Intelligence. Found suggests, which offers a name, a place, or a keyboard shortcut, needs Apple Intelligence. It reads an item only when you open it, and nothing changes until you tap a suggestion. A copied value that looks sensitive, such as a password, clears from the clipboard after two minutes.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="Your library">
            <Faq question="Where is my library stored?">
              <p>In Found’s private storage on your iPhone. Found has no account and no Found-operated sync. If you back up your iPhone to iCloud or a computer, that backup includes Found’s data.</p>
            </Faq>
            <Faq question="How do I back up and restore?">
              <p>Open Settings › Backup &amp; Restore and tap Create Backup, then choose where to save it. The backup is a readable ZIP of your notes, original files, and the records needed to restore. It is not encrypted, so keep it somewhere you trust. Backups are made only when you ask.</p>
              <p>Restoring replaces the library on this iPhone rather than merging with it. On a new install, choose Restore a Backup at the end of the introduction. Search data is rebuilt afterwards.</p>
            </Faq>
            <Faq question="Does Found send my library anywhere?">
              <p>No. Your library stays on your iPhone unless you share it or save a backup. The <a href={sitePath('privacy/')}>Privacy Policy</a> lists the few times Found connects.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="First Edition">
            <Faq question="Do I need First Edition?">
              <p>No. Every feature of Found is free. First Edition is an optional one-time purchase with a bookplate, two Home Screen icons, and a personal page. The <a href={sitePath('first-edition/terms/')}>First Edition terms</a> have the details.</p>
            </Faq>
            <Faq question="How do I get First Edition back on a new iPhone?">
              <p>Open First Edition in Found’s Settings and choose Restore Purchase with the same Apple Account. Ownership returns. The bookplate and icon choice stay on the original device.</p>
            </Faq>
          </FaqGroup>

          <FaqGroup title="Getting help">
            <Faq question="How do I contact support?">
              <p>Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>, or <a href={siteConfig.issueUrl} rel="noreferrer" target="_blank">open a public issue</a> for a problem others might share.</p>
            </Faq>
            <Faq question="What should a useful bug report include?">
              <p>In Found, Settings › Help &amp; About › Report a Problem starts an email with the version and build filled in. Otherwise include the Found version, your iPhone model, the iOS version, the screen involved, what you expected, and what happened. Never attach private library content unless support asks and explains why it is needed.</p>
            </Faq>
          </FaqGroup>
        </section>
      </main>
    </SiteShell>
  )
}

function FaqGroup({ children, title }: Readonly<{ children: ReactNode; title: string }>) {
  return (
    <div className="faq-group">
      <h3 className="faq-group__title eyebrow">{title}</h3>
      <div className="faq-list">{children}</div>
    </div>
  )
}

function Faq({ children, question }: Readonly<{ children: ReactNode; question: string }>) {
  return <details><summary>{question}</summary>{children}</details>
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
    <article className="support-route">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
      {actionNode}
    </article>
  )
}
