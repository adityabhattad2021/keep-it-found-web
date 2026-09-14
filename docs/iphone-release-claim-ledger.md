# iPhone release claim ledger

This document is the factual source of truth for the next Found editorial, release note,
storefront, roadmap, privacy, support, and launch materials. The editorial may explain why
the work matters, but public capability claims must remain within the boundaries below.

## Release status rule

Found for iPhone is configured as `1.0.0 (3)`, but build 3 does not yet have an accepted
release archive. The editorial intentionally uses **this release** because the website and
accepted app build will be published as one launch. That tense is safe only while publication
is gated on the exact archive passing TestFlight and physical-device acceptance. If the article
becomes public before the accepted build can be installed, it must return to future tense.

**Available now**, **released**, and equivalent availability claims become valid only after
public distribution is verified. During store propagation, use **rolling out now**.

## Public claims

| Claim | Platform and OS | Exact behavior | Required limitation or setup | Publication status |
| --- | --- | --- | --- | --- |
| Found keeps notes, links, images, PDFs, and CSVs in a local library. | iPhone and Android supported releases | Canonical records live in local SQLite and app-owned files. | No account sync, collaboration, web, or desktop access. | Current |
| Offline keyword search covers the library. | iPhone and Android supported releases | Tokenized prefix full-text search covers notes, links, file metadata, extracted PDF text, and CSV content. | This is not strict exact-phrase search. Scanned PDF pages are not OCRed. Link-preview metadata requires a prior, approved network fetch. | Current |
| Search by meaning runs on-device. | iPhone and Android supported releases | An explicitly downloaded model adds local semantic results to keyword search. | The model is not bundled, requires a download, and may need time to index. | Current |
| In-app Search returns the saved source. | iPhone and Android supported releases | Results retain locators for notes, attachments, PDF pages, and CSV rows or cells. | A locator exists only when the source produced an eligible indexed unit. | Current for in-app Search |
| In-app Search results can be copied, opened, or shared directly. | iPhone and Android supported releases | Actions reload current canonical content before use. | Not every item supports every action. Presenting the Share Sheet does not mean something was sent. | Publish with the accepted app build |
| Text inside saved images becomes searchable. | iPhone; iOS 16.4+ app baseline | Apple Vision extracts text asynchronously into the derived search index. | Best effort; supported-size images only; no region highlighting, visual-similarity search, Android image OCR, or scanned-PDF OCR. | Publish with the accepted iPhone build |
| Share a question, selection, link, or screenshot to Find with Found. | iPhone; iOS 16.4+ app baseline | The action extension accepts explicitly shared text, one URL, or one image and searches without opening the main app. | No silent screen access; one shared image; only eligible material from the latest successful publication. The action may need to be enabled or surfaced in the Share Sheet. | Publish with the accepted iPhone build |
| Find with Found can return an exact passage and original file. | iPhone; iOS 16.4+ app baseline | It can preview a matched PDF page, copy indexed text, and prepare the original file for sharing. The result is revalidated against the active published snapshot; files are also size/hash verified. | A passage requires extracted text; scanned pages may not have one; the person still confirms sharing. | Publish with the accepted iPhone build |
| Shared context is not saved. | iPhone; iOS 16.4+ app baseline | The action extension uses supplied context for the current retrieval and does not add it to the library, projection, logs, or history. | The host app and iOS still own their normal request lifecycle. | Publish with the accepted iPhone build |
| Find the library from Spotlight. | iPhone; iOS 16.4+ baseline, semantic candidates on iOS 18+ | Eligible items publish titles, previews, indexed content, and stable deep links into Found. | Opt-in and requires an initial successful publication. It may need **Refresh iPhone Search**, can lag canonical changes, and protected data can be unavailable while locked. Spotlight opens the owning PDF, not the exact matched page. | Publish with the accepted iPhone build |
| Use Find in Found from Siri or Shortcuts. | iPhone; App Shortcut packaging on iOS 17+ | A text query returns one item or asks the person to disambiguate. | It does not inspect the screen, screenshots, or current-app context. Search depends on the active published snapshot. | Publish with the accepted iPhone build |
| Shortcuts can get text, links, or files from Found. | iPhone; iOS 17+ launch surface | Typed follow-on actions return exact projected note text, a validated URL, or a verified projected file. | One selected item; output depends on its type; no multi-item workflow. | Publish with the accepted iPhone build |
| Found Keyboard inserts saved note text. | iPhone; iOS 16.4+ app baseline | A configured alias or `;prefix` selects current plain text and inserts it after projection revalidation. | Found Keyboard must be enabled in iPhone Settings and each note needs an explicit alias. It works only where iOS permits third-party keyboards; text only; no formatting, files, or images. | Publish with the accepted iPhone build |
| Found Keyboard works without Full Access. | iPhone; iOS 16.4+ app baseline | The extension is configured without open access, has no network access, and reads a protected, read-only keyboard projection. | It observes the marked prefix immediately before the cursor but does not store surrounding host text. Turning off Spotlight & Shortcuts can still leave the explicitly configured keyboard-only projection. | Publish with the accepted iPhone build |
| Found returns saved material rather than generating a replacement. | iPhone and Android supported releases | Retrieval acts on stored text, validated URLs, and original files. | Ranking and extracted metadata are derived from the source. | Current |
| Backups are portable and human-readable. | iPhone and Android supported releases | A checksummed ZIP contains canonical records and original blobs. | Manual, unencrypted, and replacement restore rather than merge or sync. | Current; keyboard aliases require build 3 |
| Found is local-first. | iPhone and Android supported releases | No Found account or Found-operated cloud is required; the canonical library stays local. | Approved model downloads, link previews, diagnostics, sharing, and backup export can use external systems. | Current with qualification |

## Release proof registry

The publication status above is a copy guard, not evidence. Before changing a next-release
claim to current, link the archived build and record an approver and verification date here.

| Capability | Automated evidence | Physical evidence | Accepted archive | Required approver | Verified date |
| --- | --- | --- | --- | --- | --- |
| Find with Found | Native behavior and contract suites pass | Core success, ambiguity, no-match, cancellation, and error flows recorded on a development candidate | Pending build 3 | iOS release owner | Pending |
| Spotlight and Shortcuts | Native contracts and app integration tests pass | Final killed-app, locked-device, Siri, disambiguation, and deep-link matrix pending | Pending build 3 | iOS release owner | Pending |
| Found Keyboard | Native catalog, insertion, projection, and configuration contracts pass | Final host-app, secure-field, accessibility, memory, and keyboard-switching matrix pending | Pending build 3 | iOS release owner | Pending |
| Saved-image text extraction | Native extraction and indexing implementation is present | Release-build recognition, failure, size-limit, and search-result checks pending | Pending build 3 | iOS release owner | Pending |
| Onboarding and redesigned result actions | JavaScript, TypeScript, lint, export, and native Release validation pass | Final release-build visual, reduced-motion, accessibility, and action checks pending | Pending build 3 | Product release owner | Pending |

## Exact public names

- **Found**
- **Save to Found**: incoming capture extension
- **Find with Found**: contextual retrieval action extension
- **Search by meaning**
- **Spotlight & Shortcuts**: Settings destination
- **Find in Found**
- **Get Text from Found Item**
- **Get Link from Found Item**
- **Get File from Found Item**
- **Copy Found Item**
- **Open Found Item**
- **Found Keyboard**
- **Refresh iPhone Search**: Settings command

Do not use **Found Here** as a visible control name. It remains in implementation and some
unreconciled copy, but the installed action is **Find with Found** and the Settings destination
is **Spotlight & Shortcuts**.

## Claims that require implementation or proof first

Do not publish claims that Found:

- reads the screen, monitors the clipboard, or understands the current app automatically;
- offers `Find From Context`, an Action Button flow, Foundation Models, Apple Intelligence,
  or Visual Intelligence integration;
- automatically finds, answers, sends, or acts;
- works everywhere, on every device, or through every text field;
- understands every image or searches scanned PDF pages;
- opens the exact matched PDF page from Spotlight;
- provides encrypted or automatic backups, sync, collaboration, Mac, web, or iPad support;
- never connects to the internet or keeps every supporting operation on-device;
- has released build-3 features before the accepted build-3 archive exists.

## Platform position

The next product chapter is deliberately iPhone-first. Android's core local library remains
available in closed testing. Public material must not promise feature parity, an Android date,
or an Android imitation of the iPhone system experience.
