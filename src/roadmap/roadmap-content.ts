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

export const roadmapRoundId = 'reuse-v2'
export const roadmapPickLimit = 2

export const roadmapSections: readonly RoadmapSection[] = [
  {
    status: 'shipped',
    title: 'The trusted foundation',
    description: 'The local library available in Found today.',
    items: [
      {
        id: 'trusted-foundation',
        title: 'Found 1.0',
        description: 'Capture notes, links, images, PDFs, CSVs, reminders, and ongoing collections. Search locally, share originals, and create portable backups.',
        why: 'Reuse starts with a dependable source of truth. The first release proves Found can safely keep different kinds of material without requiring an account or flattening every item into a note.',
      },
    ],
  },
  {
    status: 'wip',
    title: 'Reuse first',
    description: 'The current focus is reducing the time between remembering something and using it.',
    items: [
      {
        id: 'reuse-first',
        title: 'Faster retrieval and action',
        description: 'Improve capture entry points, result quality, source navigation, copy, open, and share flows across iPhone and Android.',
        why: 'Found earns a daily place when retrieving a useful detail or original takes seconds and the next action is already there.',
      },
    ],
  },
  {
    status: 'todo',
    title: 'What should earn priority',
    description: 'Choose the two directions that would save you the most time.',
    items: [
      {
        category: 'ACCESS',
        id: 'found-outside-found',
        title: 'Found outside Found',
        description: 'Retrieve and use saved material from widgets, shortcuts, share actions, Spotlight, system search, and platform automation.',
        why: 'The best retrieval flow may not begin inside the app. Useful material should be available where the user is already working.',
        examples: ['Copy my client reply from Spotlight', 'Open my insurance card from a Lock Screen widget'],
        votable: true,
      },
      {
        category: 'COLLECTIONS',
        id: 'reusable-kits',
        title: 'Reusable kits',
        description: 'Turn related snippets, files, images, links, and instructions into reusable packs for recurring situations.',
        why: 'People rarely reuse one isolated item. A client handoff, visa application, trip, or onboarding flow usually needs a small collection used together.',
        examples: ['Open everything I use for client onboarding', 'Prepare my visa document pack'],
        votable: true,
      },
      {
        category: 'UNDERSTANDING',
        id: 'understand-every-item',
        title: 'Understand every item',
        description: 'Add OCR, image understanding, richer webpage capture, and structured extraction for documents and tables.',
        why: 'A screenshot, scan, photo, or long document should be as searchable and reusable as typed text.',
        votable: true,
      },
      {
        category: 'CONTEXT',
        id: 'active-library',
        title: 'An active library',
        description: 'Bring back expiring documents, unfinished intentions, due reminders, and material connected to the current context.',
        why: 'Some useful things should return before the user remembers to search, but only through explicit, controllable rules.',
        examples: ['Remind me before this passport expires', 'Bring this checklist back when I arrive at the airport'],
        votable: true,
      },
      {
        category: 'CONTINUITY',
        id: 'continuity-across-devices',
        title: 'Continuity across devices',
        description: 'Add end-to-end encrypted sync, version history, desktop access, and browser capture while preserving offline use.',
        why: 'Recurring infrastructure is worth paying for when it makes a trusted library available everywhere without taking ownership away from its user.',
        votable: true,
      },
      {
        category: 'INTELLIGENCE',
        id: 'workflow-intelligence',
        title: 'Workflow intelligence',
        description: 'Use the right local, system, or optional cloud intelligence to retrieve sources, fill reusable workflows, and perform confirmed actions.',
        why: 'Intelligence should remove repeated work and show its sources. It should not exist as a generic chat screen searching for a purpose.',
        examples: ['Find the latest contract and prepare it to share', 'Fill this form from the details I approved'],
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
  shipped: 'SHIPPED',
  wip: 'NOW',
  todo: 'NEXT',
}
