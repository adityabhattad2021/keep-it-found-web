export type RoadmapStatus = 'shipped' | 'wip' | 'todo'

export type RoadmapItem = Readonly<{
  category?: string
  id: string
  title: string
  description: string
  why: string
  examples?: readonly string[]
  votable?: boolean
}>

export type RoadmapSection = Readonly<{
  status: RoadmapStatus
  title: string
  description: string
  items: readonly RoadmapItem[]
}>

export const roadmapRoundId = 'found-everywhere-v2'
export const roadmapPickLimit = 2

export const roadmapSections: readonly RoadmapSection[] = [
  {
    status: 'shipped',
    title: 'Completed',
    description: 'The pieces of Found that are ready to use.',
    items: [
      {
        id: 'trusted-foundation',
        title: 'A library I can trust',
        description: 'Keep notes, links, images, PDFs, CSVs, reminders, folders, and threads without an account. Search locally by words, with optional Search by meaning, then share originals or create a portable backup.',
        why: 'Found needs to keep the source safe before it can make anything else feel effortless.',
      },
      {
        id: 'ready-to-use-results',
        title: 'The result is ready to use',
        description: 'Copy the text, open the link, return to the right source, or share the original directly from search.',
        why: 'Finding something is only useful when the next step is already close.',
      },
      {
        id: 'found-outside-found',
        title: 'Found outside Found',
        description: 'On iPhone, reach the library through Find with Found, Found Keyboard, Spotlight, Siri, and Shortcuts.',
        why: 'Something already saved should return without forcing me to abandon what I am doing.',
      },
      {
        id: 'searchable-image-text',
        title: 'Words inside images can be found',
        description: 'On iPhone, text inside supported saved images becomes searchable and still leads back to the original image.',
        why: 'An important detail should not disappear just because I saved it as a picture.',
      },
    ],
  },
  {
    status: 'wip',
    title: 'Always improving',
    description: 'The work that belongs in every Found release.',
    items: [
      {
        id: 'relentless-polish',
        title: 'Make every handoff feel obvious',
        description: 'I will keep improving capture, search, reading, recovery, accessibility, motion, and speed until Found feels quiet and dependable in daily use.',
        why: 'Polish is not what happens after the important work. It is what makes the important work trustworthy.',
      },
    ],
  },
  {
    status: 'todo',
    title: 'Committed next',
    description: 'I am building all three. Choose the two you most want me to bring to life first.',
    items: [
      {
        category: 'ACROSS DEVICES',
        id: 'found-across-devices',
        title: 'Found follows me to my desk',
        description: 'Save something on iPhone, find it on Mac, and keep working even when the internet disappears. Found for Mac will make that library immediately useful through quick capture, a global shortcut, a menu bar finder, and natural drag, copy, open, and share.',
        why: 'I should not have to remember which device has something important, or interrupt my work to retrieve it.',
        examples: ['Save it on my phone and use it at my desk', 'Find something without leaving the window I am in', 'Keep working offline'],
        votable: true,
      },
      {
        category: 'IPHONE',
        id: 'deeper-iphone-intelligence',
        title: 'Ask naturally. Get the source.',
        description: 'Bring Found deeper into Siri and new iPhone intelligence so a half-remembered idea, or something I deliberately ask about on screen, can lead back to what I saved.',
        why: 'I should be able to remember the meaning and let Found handle the exact words and location.',
        examples: ['Ask Siri for the note about a decision I half remember', 'Start with what I am looking at and return to the saved source'],
        votable: true,
      },
      {
        category: 'AI TOOLS',
        id: 'trusted-ai-tools',
        title: 'Bring my sources to the tools I trust',
        description: 'Let chosen AI tools search only the Found material I allow and return the real sources behind their work.',
        why: 'I should not have to paste the same private context repeatedly or hand over my entire library to get useful help.',
        examples: ['Give my writing tool the notes I selected', 'Let an assistant find a source without giving it everything'],
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
  shipped: 'COMPLETE',
  wip: 'ALWAYS',
  todo: 'NEXT',
}
