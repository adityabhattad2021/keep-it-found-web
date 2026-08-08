export type RoadmapStatus = 'shipped' | 'wip' | 'todo'

export type RoadmapItem = Readonly<{
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

export const roadmapPickLimit = 3

export const roadmapSections: readonly RoadmapSection[] = [
  {
    status: 'shipped',
    title: 'Ready to use',
    description: 'The foundation already working in Found.',
    items: [
      {
        id: 'private-library',
        title: 'A private library',
        description: 'Keep notes, checklists, links, images, PDFs, CSVs, and reminders together without creating an account.',
        why: 'Useful information rarely arrives in one format. Found preserves what something is instead of forcing everything into a note.',
      },
      {
        id: 'context-without-ceremony',
        title: 'Folders and Threads',
        description: 'Collect related items in Folders or maintain ongoing logs in Threads.',
        why: 'Capture stays fast while growing projects and recurring parts of life still have somewhere to continue.',
      },
      {
        id: 'find-it-again',
        title: 'Find it again',
        description: 'Search text, links, file metadata, PDF contents, CSV data, and related meaning.',
        why: 'Saving something has no value if finding it later depends on remembering where it was placed.',
      },
      {
        id: 'let-it-return',
        title: 'Reminders that return',
        description: 'Create one-time, recurring, or completion-relative reminders and retain their history.',
        why: 'Some information should not wait for you to search for it.',
      },
      {
        id: 'take-it-with-you',
        title: 'Share and back up',
        description: 'Share individual items or complete collections and create portable, validated backups.',
        why: 'Your library should remain yours, including the ability to leave.',
      },
    ],
  },
  {
    status: 'wip',
    title: 'One thing at a time',
    description: 'The work receiving active focus now.',
    items: [
      {
        id: 'apple-devices',
        title: 'Found on Apple devices',
        description: 'Bring the core Found experience to iPhone and iPad, including capture, sharing, reminders, search, files, and accessibility.',
        why: 'Found should reach more people without asking them to change the devices they already use.',
      },
    ],
  },
  {
    status: 'todo',
    title: 'Waiting to earn a place',
    description: 'Choose the three directions that would make the biggest difference to you.',
    items: [
      {
        id: 'capture-without-stopping',
        title: 'Capture without stopping',
        description: 'Add faster widgets, shortcuts, share actions, camera capture, and one consistent composer across Found.',
        why: 'A thought, document, or task should be safely kept before the moment disappears.',
        votable: true,
      },
      {
        id: 'better-writing-surface',
        title: 'A better writing surface',
        description: 'Improve editing, selection, lists, checklists, attachments, and long-note reliability.',
        why: 'Found supports many kinds of content, but writing must still feel excellent.',
        votable: true,
      },
      {
        id: 'understand-every-item',
        title: 'Understand every item',
        description: 'Add OCR for images and scans, searchable image descriptions, richer webpage contents, and structured document extraction.',
        why: 'A screenshot or scanned document should be as findable as typed text.',
        votable: true,
      },
      {
        id: 'right-thing-returns',
        title: 'The right thing returns',
        description: 'Create a focused place for due reminders, unfinished intentions, active Threads, and things you asked to revisit.',
        why: 'Found should create continuity without becoming an engagement feed or deciding what matters for you.',
        votable: true,
      },
      {
        id: 'intelligent-retrieval',
        title: 'Intelligent retrieval',
        description: 'Answer questions using relevant notes, files, images, and Threads while showing the exact sources.',
        why: 'Sometimes you remember the meaning of something, not its title, filename, or location.',
        examples: ['What did I decide about the launch?', 'Which documents did I use for my last visa application?'],
        votable: true,
      },
      {
        id: 'found-can-act',
        title: 'Found can act',
        description: 'Use natural language to create reminders, update checklists, find content, organize items, and prepare files for sharing.',
        why: 'Intelligence becomes valuable when it removes work, not when it merely paraphrases saved content.',
        votable: true,
      },
      {
        id: 'voice-camera-intelligence',
        title: 'Voice and camera intelligence',
        description: 'Turn spoken thoughts, screenshots, whiteboards, receipts, and documents into searchable, actionable information.',
        why: 'The fastest way to capture something is often not typing.',
        votable: true,
      },
      {
        id: 'library-that-travels',
        title: 'A library that travels',
        description: 'Add end-to-end encrypted sync, version history, desktop access, web access, and browser capture.',
        why: 'Found should remain offline first while becoming available wherever its owner needs it.',
        votable: true,
      },
      {
        id: 'personal-adaptation',
        title: 'Personal adaptation',
        description: 'Let Found learn from explicit corrections, dismissals, confirmations, and preferences.',
        why: 'A personal library should become more useful without turning private data into someone else\'s training material.',
        votable: true,
      },
      {
        id: 'open-automation',
        title: 'Open automation',
        description: 'Expose Found content and actions through platform automation, shortcuts, and carefully designed integrations.',
        why: 'Found should work with the tools people choose instead of trapping information inside one interface.',
        votable: true,
      },
      {
        id: 'on-device-assistant',
        title: 'A local assistant worth carrying',
        description: 'Revisit a fully on-device assistant when its speed, size, compatibility, and answer quality justify the cost.',
        why: 'Private intelligence is compelling, but it must feel useful and proportionate on the devices people actually own.',
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
  wip: 'WIP',
  todo: 'TODO',
}
