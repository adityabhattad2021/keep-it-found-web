# iPhone release claim ledger

This document is the factual source of truth for Found's website, journal, roadmap,
privacy, support, and store materials. Editorial may explain why the work matters, but
public capability claims must remain within the boundaries below.

## Release status

Found 1.1.0 (build 8) for iPhone is live on the App Store (App Store id 6804260279,
free, iOS 16.4 or later); the owner confirmed it live on 2026-09-29. It replaced
1.0.0 (build 5), public since 2026-09-21. Every claim marked **Current** below is
verified against the code of build 8, commit `7e7012f` in the app repository. Claims
about later builds stay in future tense until the build that carries them is public.

Several features have an OS floor above the app's own. The app installs on iOS 16.4;
each row states the lowest system on which that feature exists. A feature above the
floor is simply absent on an older system; public copy names the floor whenever it
names the feature.

Found is an iPhone product. Public material describes one platform and one store and
does not mention other platforms, other stores, or test programs. Build 8 also installs
on iPad (row 35); public copy stays iPhone-first and does not advertise it.

## Public claims

Row numbers are referenced by the evidence section. Settings and control names are
quoted as build 8 shows them.

| # | Claim | OS floor | Exact behavior | Required limitation or setup | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Found keeps notes, links, photos, PDFs, and every other file type in one private library. | iOS 16.4 | Canonical records live in local SQLite and app-owned files. Files of any kind get previews and thumbnails; PDF, CSV, and text files are also text-indexed. | No account, sync, collaboration, web, or Mac access. Office and iWork files are searchable by name, not content. | Current |
| 2 | Save to Found from another app's Share Sheet. | iOS 16.4 | The Save to Found extension accepts text, one web link, and up to ten images and ten files in one share, then opens a review where the person chooses where it belongs; a name and context are optional. | Only what the other app offers to the Share Sheet. Save to Found may need to be enabled in the Share Sheet. | Current |
| 3 | Found offers to keep what you just copied. | iOS 16.4 | When Found opens or comes back to the front, Home can show "Keep the text you copied?" (or link, or image) with KEEP and NOT NOW. Until KEEP, Found reads only the clipboard's change count and the kinds it declares, never its content. KEEP reads it once and saves text as a note, a link as a link, an image as an image. The + capture menu also has a CLIPBOARD row. | iOS may ask to allow pasting on KEEP. A copy made inside Found, or one already kept or waved away, is not offered again. Found does not watch the clipboard in the background or read it without a tap. | Current |
| 4 | Control Center and Lock Screen controls: **Save Clipboard to Found** and **Find in Found**. | iOS 18 | Save Clipboard to Found opens Found, keeps the clipboard through the same path as the Home offer, and steps back. Find in Found opens Find. | The person adds the controls. Both open Found; a control cannot read the clipboard, so Save Clipboard is not silent, and iOS may ask to allow pasting. No Home Screen widgets. | Current |
| 5 | Gather items in folders and threads, and choose which appear on Home under **Spaces**. | iOS 16.4 | An item can sit in several folders. A thread keeps its items in the order they were saved. Folders and threads chosen for Home appear in Home's Spaces section. | Manual organisation; suggestions exist only on What's Inside and Tidy (rows 13 and 14). | Current |
| 6 | Keep what matters close. | iOS 16.4 | **Keep Close** in an item's menu pins it to Home's **Kept close** section; kept items also carry a higher ranking hint in Found's Spotlight entries. | None. | Current |
| 7 | Any saved item can carry a reminder. | iOS 16.4 | Add Reminder on a note, link, photo, or file schedules a local notification, with optional repeat. Due reminders appear on Home under **Needs you** and in Reminders. | Needs notification permission. Local notifications only; nothing is scheduled on a server. | Current |
| 8 | Offline keyword search covers the library. | iOS 16.4 | Tokenized prefix full-text search covers notes, links, file names, PDF pages, CSV rows and cells, text files, and text recognised in images. | Not strict exact-phrase search. Scanned PDF pages are not OCRed. Link-preview text requires a prior, approved network fetch. | Current |
| 9 | Search by meaning runs on-device. | iOS 16.4 | An explicitly downloaded model adds local semantic results to keyword search, so an item can turn up for words it does not contain. | The model is not bundled, needs a one-time download, and may need time to index. Relatedness is ranked, not guaranteed. | Current |
| 10 | Text inside saved photos becomes searchable. | iOS 16.4 | Apple Vision extracts text asynchronously into the derived search index. | Best effort; supported-size images only; no region highlighting, no scanned-PDF OCR. | Current |
| 11 | Photos without text can be found by what they show. | iOS 16.4 | Apple Vision's on-device classifier adds up to twelve general labels per image to the search index, kept only at high precision. | General categories only; no visual-similarity search; never identifies people. | Current |
| 12 | With Apple Intelligence, Found writes search phrasings for items and captions for images on the iPhone. | Phrasings iOS 26; captions iOS 27 with a model that accepts images; an iPhone that supports Apple Intelligence | Apple's on-device model writes up to eight search phrasings per item and, where images are supported, a one-sentence caption per image. Phrasings feed Found's search, Find with Found, Siri and Shortcuts, and Spotlight keywords; they are never displayed. A caption can appear as an image's matching excerpt in search. | Off when Apple Intelligence is unavailable, off, or its model is not ready. On by default where available; the switch is **Describe and rephrase on device** in Settings › Apple Intelligence, and turning it off deletes what it wrote. Runs while Found is open, a limited number of items per session, and pauses in Low Power Mode or when the iPhone is hot. Never presented as a chat or an answer. No titles are suggested at save time. | Current |
| 13 | **What's Inside** lifts the details and dates out of an item, and with Apple Intelligence suggests a name, a place, and a keyboard shortcut. | iOS 26; suggestions need an iPhone that supports Apple Intelligence | Opened from an item's menu for notes, links, photos, PDFs, CSV tables, and text files. **Details**: phone numbers, email addresses, addresses, links, amounts, flight and tracking numbers, UPI IDs, and labelled values, each with Copy; a value that looks sensitive clears from the clipboard after two minutes and stays on the device. **Coming up**: future dates, each with BRING BACK (a reminder at 9:00 a week before a date a month or more away, otherwise the day before, otherwise on the day) or PICK A TIME. Details and dates come from the system's on-device data detection and need no Apple Intelligence. **Found suggests** (Apple Intelligence on): labels for unlabelled details; a name, only for an item titled by a file name or placeholder; a folder or thread to keep it with; a Found Keyboard shortcut for a reusable note. Every suggestion applies only on tap, with Undo, and NOT NOW is remembered. The screen ends "Read on this iPhone. Nothing left it." | Runs only when the person opens it; nothing is lifted, scheduled, renamed, or filed at save time. Reads only text Found already extracted, up to the first 40 passages, so a long document is read in part and an item without text shows nothing. Reminders need notification permission. Suggestions wait while Apple Intelligence is off or not ready, in Low Power Mode, or when the iPhone is hot, and are unavailable in languages the model does not support. | Current |
| 14 | **Tidy Library** suggests names for untitled items and a place for loose ones. | iOS 26, Apple Intelligence | From Home's menu or Settings › Apple Intelligence › Tidy your library: **Name these** (items titled by a file name or placeholder) and **Keep together** (items in no folder or thread, when folders or threads exist). Each applies only on tap, with Undo. | Offered only while Describe and rephrase on device is on. Reads a few items per session; the rest wait for a later visit. | Current |
| 15 | Search returns the saved source, with its passage and page. | iOS 16.4 | Results retain locators for notes, attachments, PDF pages, and CSV rows or cells and show the matching excerpt. | A locator exists only when the source produced an eligible indexed unit. | Current |
| 16 | Results can be copied, opened, or shared directly. | iOS 16.4 | Actions reload current canonical content before use. | Not every item supports every action. Presenting the Share Sheet does not mean something was sent. | Current |
| 17 | **Siri & Spotlight** makes the library findable outside Found. | iOS 16.4 | One switch in Settings › Siri & Spotlight publishes an on-device copy of the library to a shared space and to Spotlight. Rows 18 to 26 read that copy. | Off on a fresh install; the person turns it on. Turning it off removes the copy (Found Keyboard shortcuts keep working). When an update does not finish, the page offers **Refresh Siri & Spotlight**. | Current |
| 18 | Share a question, selection, link, or screenshot to Find with Found. | iOS 16.4 | The action extension accepts explicitly shared text, one URL, or one image, searches without opening the main app, and can group list requests. | Needs Siri & Spotlight on. No silent screen access; one shared image; only apps that offer the Share Sheet; only eligible material from the latest successful publication. The action may need to be enabled in the Share Sheet. | Current |
| 19 | Find with Found returns an exact passage, its page, and the original file. | iOS 16.4 | Shows the passage with its source ("Page 7", "Row 12"), previews a matched PDF opened at that page, copies the passage, and prepares the original file for sharing, revalidated against the active published snapshot. | A passage requires extracted text; scanned pages may not have one; the person still confirms sharing. | Current |
| 20 | Shared context is not saved. | iOS 16.4 | The action extension uses supplied context for the current retrieval only. | The host app and iOS own their normal request lifecycle. | Current |
| 21 | Find the library from Spotlight. | iOS 16.4 | Eligible items publish titles, previews, and stable deep links into Found and open with Found closed. | Needs Siri & Spotlight on. Spotlight's own results are claimed for item names only; content and phrasings are matched by Find in Found, Find with Found, and Ask Found, not promised on the Spotlight screen. Protected data can be unavailable while locked; Spotlight opens the owning PDF, not the exact page. | Current |
| 22 | Ask Siri, and Found answers from what you saved. | iOS 26 | Say "Ask Found" or "Ask Found a question". Siri asks "What would you like to know?", searches the on-device copy the way Find with Found does (note text, text recognised in photos, PDF pages, CSV rows, captions), then speaks the matching passage and names its source, such as "… — from 'Lease · page 7'", with a card offering Copy (notes and links), Send, and Open. When several items match, Siri asks which one. A passage that looks like a password or code is shown, not spoken. Also available as the **Ask Found** action in Shortcuts. | The iPhone must be unlocked. Needs Siri & Spotlight on; otherwise Siri says to turn it on. The answer is a saved passage, or the item itself when it has no passage; it is never generated, summarised, or combined. No match: "Nothing in your library matches that." | Current |
| 23 | Find From Context turns a screenshot or text handed over by a shortcut into the matching item. | iOS 26 | A Shortcuts action (Siri: "Find this in Found", "What does Found have for this") takes an image or text from the previous step, such as Get What's On Screen or a screenshot automation, reads the image's text on the device, and returns the item with its passage. | Reads only what the shortcut passes; Found never looks at the screen itself. Unlocked iPhone; Siri & Spotlight on. | Current |
| 24 | Use Find in Found from Siri or Shortcuts. | Siri phrases iOS 17.4; Shortcuts action iOS 17 | "Find in Found" or "Search with Found". A text query returns one item or asks the person to choose. | Does not inspect the screen, screenshots, or current-app context. Unlocked iPhone; Siri & Spotlight on; depends on the active published snapshot. | Current |
| 25 | Shortcuts can get, copy, open, and send items from Found. | iOS 17 (Open Found File iOS 18) | Get Text from Found Item, Get Link from Found Item, Get File from Found Item, Copy Found Item, Open Found Item, Open Found File, Send Found Item (opens the item ready to share), and Open Found (Find or Save Clipboard). | One item at a time except as row 26 says; output depends on its type; unlocked iPhone; Siri & Spotlight on. | Current |
| 26 | On iOS 27, Siri and Shortcuts can also keep, add to, and organise. | iOS 27 | Siri phrases: "Keep this in Found" or "Make a note in Found" (Keep a Note in Found); "Save this to Found" or "Save to Found" (a link, text, or files); "Add this to Found" or "Add to a note in Found" (appends to a note); "Search Found" or "Open Find in Found" (opens Find with the words). Shortcuts actions: Update a Found Note (rename, keep close, file, attach), Add to a Found Folder, Get Found Items in Folder, Set a Found Keyboard Alias, Remind Me About a Found Note, Open Found Note. A Focus can choose a Found folder (Focus on a Found Folder) that Home then leads with under **In focus**. | Siri confirms at once; the change joins the library when Found next launches or comes to the front. An edit to a note that changed in between, or a mixed save, waits for the person's review in Found. Reminders from Siri are note-only. | Current |
| 27 | Found Keyboard inserts saved note text. | iOS 16.4 | Typing `;` and a note's shortcut selects the current plain text of that note and inserts it after projection revalidation; the keyboard lists matching shortcuts as cards. | Must be added in iOS Settings; each note needs its own shortcut (2 to 24 letters and numbers, starting with a letter); text only; works only where iOS permits third-party keyboards. | Current |
| 28 | Found Keyboard works without Full Access. | iOS 16.4 | Configured without open access, no network access, reads a protected read-only projection of notes with shortcuts. | Observes the marked prefix before the cursor; does not store surrounding host text. | Current |
| 29 | Found returns saved material rather than generating a replacement. | iOS 16.4 | Retrieval, including Ask Found, acts on stored text, validated URLs, and original files. | Ranking, phrasings, captions, detected details, and suggestions are derived from the source; suggestions change nothing until the person taps them. | Current |
| 30 | Backups are portable and human-readable. | iOS 16.4 | A checksummed ZIP contains readable notes, original files, and the records needed to restore; a backup can also be restored during onboarding on a new install. | Manual, unencrypted, replacement restore rather than merge or sync. Derived data is rebuilt after restore. | Current |
| 31 | Found is local-first: no account, no Found server. | iOS 16.4 | No Found account or Found-operated cloud; the canonical library stays on the iPhone. Apple Intelligence features run on the device. | External systems are used only for: the Search by meaning model download (Hugging Face); link previews, after the person allows them; crash reports, off until the person turns on Send crash reports (Firebase); First Edition purchase and restore (App Store, RevenueCat); and sharing or backup export the person starts. Found does not exclude its data from the person's own iOS device backups. | Current with qualification |
| 32 | Every feature is free. | iOS 16.4 | No feature is gated by a purchase. The First Edition page says Found stays fully useful without it. | First Edition (row 33) is optional. | Current |
| 33 | First Edition is a one-time purchase. | iOS 16.4 | "One-time purchase · no subscription." Unlocks: a bookplate of your own (your name and a note, ready to share), two First Edition Home Screen icons (Ink and Imprint), and a personal First Edition page inside Found. Restorable with the Apple Account. | Not required to use Found; no unreleased benefit is included; the bookplate stays on the device. Alternate icons need a device that allows them. | Current |
| 34 | Found has a light and a dark appearance. | iOS 16.4 | The app and its extensions follow the system appearance or a chosen one. | None. | Current |
| 35 | Build 8 also runs on iPad. | iPadOS 16.4 | Universal app: the app and every extension target iPhone and iPad, with a split-column layout on iPad. | Verified on the iPad simulator only. Public copy stays iPhone-first and does not advertise iPad. | Current, not advertised |

## Evidence

Paths are relative to the app repository at commit `7e7012f`. The shared native
package is `packages/expo-found-system` (abbreviated `efs/`).

| # | Proving files |
| --- | --- |
| all | `app.json` (version 1.1.0, buildNumber 8, supportsTablet true); `efs/plugin/found-system-config.js` (deployment targets: app and action and keyboard 16.4, App Intents extension 27.0, controls 18.0; device family follows supportsTablet); `efs/FoundSystem.podspec` (16.4; FoundationModels and DataDetection weak-linked) |
| 1, 8, 10, 15, 16 | `src/features/search/` (search-service.ts, search-sql.ts, content-extraction-repository.ts, text-file-extraction.ts, search-locator.ts, search-excerpt.ts); `efs/apple/Core/FoundVisionTextReader.swift` |
| 2 | `app.json` (expo-sharing activation rule: text, 1 web URL, 10 images, 10 files); `plugins/ios-share-extension-config.js` ("Save to Found"); `src/app/(root)/share/review.tsx` |
| 3 | `src/features/clipboard/clipboard-offer-policy.ts`, `clipboard-presence.ts`, `clipboard-generation.ios.ts`, `clipboard-capture.ts`; `src/features/home/clipboard-offer-tile.tsx`; `src/features/capture/library-capture-actions.ts` |
| 4 | `efs/targets/FoundControls/FoundControlsBundle.swift`; `efs/apple/Intents/FoundControlIntents.swift`; `src/app/(root)/save-clipboard.tsx` |
| 5, 6, 7 | `src/features/home/home-read-model-presentation.ts` (In focus, Needs you, Kept close, Used lately, Spaces, Recently saved); `src/features/home/home-reminders-panel.tsx`; `src/features/library/item-actions.ts`, `use-item-action-input.ts`; `src/features/threads/thread-content.ts`; `efs/apple/Intents/FoundSpotlightAttributes.swift` (ranking of kept items); `plugins/with-local-notifications-only.js` |
| 9, 31 | `src/features/search/embedding-model-manifest.ts` (huggingface.co), `enhanced-search-settings.tsx`, `search-by-meaning-offer.tsx` |
| 11 | `efs/apple/Core/FoundVisionImageClassifier.swift` |
| 12 | `efs/ios/FoundIntelligence.swift` (phrasings iOS 26; `describeImage` iOS 27 and `.vision` capability); `src/features/search/intelligence-policy.ts`, `intelligence-enrichment-service.ts`, `intelligence-settings.tsx`; `src/features/search/search-sql.ts` and `search-excerpt.ts` (phrasings search-only); `efs/apple/Intents/FoundSpotlightAttributes.swift` (keywords) |
| 13, 14 | `efs/ios/FoundRead.swift` (DataDetection detectors, model questions); `src/features/inside/inside-policy.ts` (FOUND_READ_CAPABILITIES, detail labels, reminder timing, 40-passage limit), `inside-service.ts`; `src/app/(root)/inside/[id].tsx`, `src/app/(root)/inside/library.tsx`; `src/features/search/intelligence-bridge.ios.ts` (`isReadSupported`, iOS 26); `src/features/navigation/use-tidy-offered.ts`, `destinations.ts`; `src/app/(root)/settings/apple-intelligence.tsx` |
| 17 | `src/features/found-here/found-system-settings.ios.tsx`; `found-system-projection-policy.ts` (only notes with shortcuts publish while off); `src/database/schema.ts` (`desired_enabled` default 0); `src/app/(root)/settings.tsx` |
| 18, 19, 20 | `efs/targets/FoundFindAction/` (Info.plist activation rule; ActionExtensionViewModel.swift; ActionExtensionRootView.swift "Page n"; ActionExtensionViewController.swift PDF preview at the page); `efs/apple/Core/FoundExcerpt.swift` |
| 21 | `efs/apple/Intents/FoundSpotlightIndex.swift`, `FoundSpotlightAttributes.swift`; `efs/ios/FoundSpotlightAppDelegateSubscriber.swift` |
| 22, 23 | `efs/apple/Intents/FoundAskIntents.swift` (`AskFoundIntent`, `FindFromContextIntent`, iOS 26, `.requiresLocalDeviceAuthentication`); `efs/apple/Shortcuts/FoundAppShortcuts.swift` (phrases and `#available` gates); `efs/apple/Intents/FoundIntentResultView.swift` (Copy, Send, Open); `efs/apple/Intents/FoundIntentError.swift` (Siri's messages); `efs/apple/Core/FoundExcerpt.swift` (`looksLikeCredential`, source labels) |
| 24, 25 | `efs/apple/Intents/FoundAppIntents.swift`, `FoundOpenIntents.swift`, `FoundControlIntents.swift`; `efs/apple/Shortcuts/FoundAppShortcuts.swift` (provider iOS 17.4). The item actions carry no `@available` gate and so compile for 16.4, but 1.0 registered them from iOS 17 and nothing since has been checked on iOS 16, so public copy keeps iOS 17. |
| 26 | `efs/apple/Intents/FoundWriteIntents.swift`, `FoundFolderIntents.swift`, `FoundOpenIntents.swift`; `efs/apple/Core/FoundWriteQueue.swift`; `src/features/found-here/found-write-queue-coordinator.ios.tsx` (drain on launch and foreground); `efs/apple/Core/FoundFocusStore.swift` |
| 27, 28 | `efs/targets/FoundKeyboard/Info.plist` (`RequestsOpenAccess` false), `KeyboardViewController.swift`; `src/features/found-keyboard/found-keyboard-policy.ts`; `efs/apple/Intents/FoundIntentError.swift` (shortcut rules) |
| 30 | `src/features/backup/backup-plan.ts` (`encryption: 'none'`, README), `src/app/(root)/settings/backup.tsx` |
| 31 | `firebase.json` (`crashlytics_auto_collection_enabled: false`); `src/features/error-reporting/crash-reporting-settings.tsx`; `src/features/links/link-preview-consent.ts`; `src/features/first-edition/first-edition-commerce.ios.ts`; no backup exclusion anywhere in `src/` or `packages/` |
| 32, 33 | `src/features/first-edition/first-edition-purchase-page.tsx` (benefits, "ONE-TIME PURCHASE · NO SUBSCRIPTION", trust line), `first-edition-member-page.tsx`, `first-edition-icon-picker.ios.tsx`, `first-edition-contract.ts` (non-consumable, lifetime); no First Edition check outside `src/features/first-edition/` and its settings routes |
| 35 | `app.json` (`supportsTablet: true`); `efs/plugin/found-system-config.js` (`targetedDeviceFamily` "1,2"); `packages/expo-found-ipad/`; `src/constants/device.ts` |

## Release proof

| Capability | Evidence | Public build | Verified |
| --- | --- | --- | --- |
| Everything marked Current in 1.0 | Native and JavaScript suites at commit `8a07211`; release acceptance on a physical iPhone; App Store review | 1.0.0 (5) | 2026-09-21 |
| Everything marked Current above | Code at commit `7e7012f`: source, native targets, intents, Info.plists, entitlements, and app.json, read without building; App Store review; owner confirmation that the build is live | 1.1.0 (8) | 2026-09-29 |

No test suite was run for this revision of the ledger; its evidence is the code at
`7e7012f`. Rows whose behaviour depends on Siri, Apple Intelligence, or system surfaces
describe what the code asks the system to do, within the stated limitations.

## Exact public names

- **Found**
- **Save to Found**: incoming capture extension, and on iOS 27 a Siri and Shortcuts action
- **Find with Found**: contextual retrieval action extension
- **Find in Found**: Siri and Shortcuts action, and a Control Center control
- **Ask Found**: Siri and Shortcuts action (iOS 26)
- **Find From Context**: Shortcuts action (iOS 26)
- **Search Found**: Siri action that opens Find (iOS 27)
- **Keep a Note in Found** (short title **Keep in Found**), **Add to a Found Note**, **Update a Found Note**, **Add to a Found Folder**, **Get Found Items in Folder**, **Set a Found Keyboard Alias**, **Remind Me About a Found Note**, **Open Found Note**, **Focus on a Found Folder**: iOS 27 actions
- **Get Text from Found Item**, **Get Link from Found Item**, **Get File from Found Item**
- **Copy Found Item**, **Open Found Item**, **Open Found File**, **Send Found Item**, **Open Found**
- **Save Clipboard to Found**: Control Center and Lock Screen control
- **Siri & Spotlight**: Settings destination and its switch; command **Refresh Siri & Spotlight**
- **Search by meaning**
- **Apple Intelligence**: Settings destination; its switch is **Describe and rephrase on device**
- **What's Inside**: item command; its sections are **Coming up**, **Details**, and **Found suggests**
- **Tidy Library**: navigation destination (**Tidy your library** in Settings); sections **Name these** and **Keep together**
- **Keep Close**: item command; Home section **Kept close**
- **Spaces**, **Needs you**, **In focus**, **Used lately**, **Recently saved**: Home sections
- **Folders**, **Threads**
- **Found Keyboard**; a note's `;` trigger is its **shortcut** in the app
- **First Edition**; icons **Ink** and **Imprint**

Do not use **Found Here**, **Enhanced Search**, or **Spotlight & Shortcuts** in public
copy. The Settings destination is now **Siri & Spotlight**, the feature is **Search by
meaning**, and the action is **Find with Found**. Build 8's Find with Found sheet still
shows "FOUND HERE" as its header and in its off and refresh messages, so screenshots of
that sheet carry the old name.

## Claims that require implementation or proof first

Do not publish claims that Found:

- reads the screen, watches the clipboard, or understands the current app automatically;
- answers with generated, summarised, or combined text, or holds a conversation;
- asks Siri a question in one breath ("Ask Found what's …"); the registered phrases are
  "Ask Found" and "Ask Found a question", after which Siri asks for the question;
- can be asked from the Spotlight screen, or searches library content from the Spotlight
  screen itself;
- opens the exact matched PDF page from Spotlight;
- works with Visual Intelligence, the Action button, Back Tap, or Siri's awareness of
  the item on screen; the code is present but none is proven on a device;
- lets Siri answer from indexed content through iOS's Show Content in Search;
- lifts details, dates, names, or places at save time, or brings items back without the
  person choosing BRING BACK;
- has Home Screen or Lock Screen widgets;
- automatically finds, answers, sends, or acts;
- works everywhere, on every device, or through every text field;
- understands every image, recognises people, or searches scanned PDF pages;
- provides encrypted or automatic backups, sync, collaboration, Mac, or web access;
- is designed for iPad (build 8 runs there, verified only on the simulator; see row 35);
- never connects to the internet or keeps every supporting operation on-device;
- has shipped anything from a build that is not yet public.

## Platform position

Found is iPhone-first and its public material describes only iPhone. Build 8 carries the
first Siri, Shortcuts, and on-device intelligence chapter on iPhone. Mac and iCloud
continuity follow as separate work. Public copy describes those as outcomes, never as
dated promises or as features of the current build.
