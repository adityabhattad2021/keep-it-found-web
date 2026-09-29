/**
 * The roadmap's words. Every claim about what Found does today stays within
 * docs/iphone-release-claim-ledger.md; everything else is an outcome, never a date.
 *
 * The votable ids, the pick limit and the round id are a contract with
 * functions/src/roadmap-features.ts. Change their copy freely, never their ids.
 */

export type RoadmapStatus = 'shipped' | 'wip' | 'todo' | 'later'

export type RoadmapItem = Readonly<{
  category?: string
  id: string
  title: string
  description: string
  why: string
  /** The 1.1 feature a votable direction builds on, named as on the page above it. */
  buildsOn?: string
  /** The lowest iOS a shipped feature needs, named whenever the feature is. */
  floor?: string
  /** Keys shown beside an item, for the Mac. */
  keys?: readonly string[]
  votable?: boolean
}>

export type RoadmapSection = Readonly<{
  status: RoadmapStatus
  title: string
  description: string
  items: readonly RoadmapItem[]
}>

export const roadmapRoundId = 'iphone-first-v3'
export const roadmapPickLimit = 2

/** The release on the App Store now. */
export const currentRelease = {
  name: 'Found 1.1',
  facts: [
    { label: 'For', value: 'iPhone' },
    { label: 'Requires', value: 'iOS 16.4 or later' },
    { label: 'Price', value: 'Free' },
    { label: 'Account', value: 'None' },
  ],
} as const

/** What the rest of Found does, the ground 1.1 stands on. */
export const roadmapSections: readonly RoadmapSection[] = [
  {
    status: 'shipped',
    title: 'New in 1.1',
    description: 'The first Siri, Shortcuts and on-device intelligence chapter, on the App Store now.',
    items: [
      {
        id: 'ask-found',
        title: 'Ask Found with Siri',
        description: 'Say “Ask Found”, then ask your question. Siri speaks the passage you saved and names where it came from, with a card to open or send it.',
        why: 'Always a passage you saved, never a made-up answer. Turn on Siri & Spotlight in Found first.',
        floor: 'iOS 26',
      },
      {
        id: 'whats-inside',
        title: 'What’s Inside',
        description: 'Lifts the phone numbers, emails, addresses, amounts and dates out of an item, and brings a date back in time when you tap Bring back.',
        why: 'With Apple Intelligence it also suggests a name and a place to keep it. Nothing changes until you tap.',
        floor: 'iOS 26',
      },
      {
        id: 'find-from-context',
        title: 'Find From Context',
        description: 'A Shortcuts action that takes a screenshot or text from the step before it and returns the matching item with its passage.',
        why: 'Found reads only what the shortcut hands it. It never looks at the screen itself.',
        floor: 'iOS 26',
      },
      {
        id: 'keep-what-you-copied',
        title: 'Keep what you copied',
        description: 'Home offers to keep the text, link or image you just copied. One tap on Keep, and it is saved.',
        why: 'Found reads your clipboard only when you tap Keep.',
        floor: 'iOS 16.4',
      },
      {
        id: 'controls',
        title: 'Control Center and Lock Screen',
        description: 'Two controls you can add: Save Clipboard to Found keeps what you copied, and Find in Found opens Find.',
        why: 'Both open Found, so nothing happens out of sight.',
        floor: 'iOS 18',
      },
      {
        id: 'keep-with-siri',
        title: 'Keep and organise with Siri',
        description: '“Keep this in Found”, “Add this to Found”, and Shortcuts actions that file, rename and set reminders. A Focus can bring a folder to the top of Home.',
        why: 'Siri confirms at once, and the change joins your library the next time Found opens.',
        floor: 'iOS 27',
      },
      {
        id: 'reminders-on-anything',
        title: 'A reminder on anything',
        description: 'Any saved note, link, photo or file can carry a reminder. Due ones wait on Home under Needs you.',
        why: 'Local notifications only; nothing is scheduled on a server.',
        floor: 'iOS 16.4',
      },
      {
        id: 'tidy-library',
        title: 'Tidy Library',
        description: 'Suggests names for things saved as IMG_4812 and a place for loose ones. Each applies only on tap, with Undo.',
        why: 'Nothing is renamed or moved until you tap.',
        floor: 'iOS 26 with Apple Intelligence',
      },
    ],
  },
  {
    status: 'wip',
    title: 'In every release',
    description: 'The work that never ships once.',
    items: [
      {
        id: 'relentless-polish',
        title: 'Make every handoff feel obvious',
        description: 'Capture, search, reading, recovery, accessibility, motion and speed, improved until Found feels quiet and dependable every day.',
        why: 'Polish is what makes the important work trustworthy.',
      },
    ],
  },
  {
    status: 'later',
    title: 'Being built',
    description: 'Each is built as its own work, on the same rules as today: your library stays yours, and nothing reaches it without your say.',
    items: [
      {
        category: 'MAC',
        id: 'found-across-devices',
        title: 'Found on your Mac',
        description: 'A Found of its own for the Mac. Your library a keystroke away while you work: find it, then paste the exact line you need.',
        why: 'Something you saved on your phone should be there at your desk without a second thought.',
        keys: ['⌥', 'Space'],
      },
      {
        category: 'ICLOUD',
        id: 'library-on-every-device',
        title: 'Every device, your own iCloud',
        description: 'The same library on each of your devices, carried by your own iCloud. Still no Found account and no Found server.',
        why: 'You should never have to remember which device has the thing you need.',
      },
      {
        category: 'AI APPS',
        id: 'trusted-ai-tools',
        title: 'The AI apps you choose',
        description: 'Let an AI app you pick find things in your library, only after you allow it. It can read what isn’t Private, and never change or remove anything.',
        why: 'Your own context, without pasting it again or handing over the whole library.',
      },
    ],
  },
  {
    status: 'todo',
    title: 'Where the iPhone goes deeper',
    description: 'Each of these has a first version in Found 1.1. Choose the two that would change your day the most, and help set the order.',
    items: [
      {
        category: 'SIRI',
        id: 'siri-knows-found',
        title: 'Siri that knows your library',
        buildsOn: 'Ask Found with Siri',
        description: 'Fewer steps between the question and the answer: ask in one sentence, wherever you already talk to Siri. Still the saved passage, never a made-up answer.',
        why: 'The fewer words between a question and its answer, the more often you ask.',
        votable: true,
      },
      {
        category: 'THE SCREEN',
        id: 'start-from-context',
        title: 'Start from what’s in front of you',
        buildsOn: 'Find with Found and Find From Context',
        description: 'Begin from the camera, a button, or what is already on screen, and land on the saved source with the passage that answers it. Only when you ask.',
        why: 'The need usually shows up somewhere else. Found should meet it there.',
        votable: true,
      },
      {
        category: 'CAPTURE',
        id: 'keep-from-anywhere',
        title: 'Keep it from anywhere',
        buildsOn: 'Keep what you copied, the controls, and Keep with Siri',
        description: 'Fewer steps between noticing something and keeping it: from more places, on more iPhones, without leaving what you are doing.',
        why: 'Saving something should cost less than losing it.',
        votable: true,
      },
      {
        category: 'UNDERSTANDING',
        id: 'found-reads-what-you-saved',
        title: 'Found reads more of what you saved',
        buildsOn: 'What’s Inside',
        description: 'Whole long documents, not only their opening pages. The contents of documents, spreadsheets and presentations from other apps, not only their names. Scanned pages, too.',
        why: 'The useful part of a saved thing is often one line inside it.',
        votable: true,
      },
      {
        category: 'REUSE',
        id: 'value-one-tap-away',
        title: 'The value, one tap away',
        buildsOn: 'The Found Keyboard',
        description: 'The keyboard offers the saved value a field is asking for, and the things you send every week sit one tap from the Home Screen.',
        why: 'Reuse should not need a search.',
        votable: true,
      },
    ],
  },
]

export const votableRoadmapFeatureIds = roadmapSections
  .flatMap((section) => section.items)
  .filter((item) => item.votable)
  .map((item) => item.id)

export const roadmapStatusLabels: Readonly<Record<RoadmapStatus, string>> = {
  shipped: 'New in 1.1',
  wip: 'In every release',
  todo: 'Your vote',
  later: 'In development',
}
