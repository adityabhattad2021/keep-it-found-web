export type HomeScenario = Readonly<{
  id: 'client-reply' | 'visa-document' | 'form-detail'
  need: string
  source: string
  format: string
  title: string
  body: string
  memory: string
  action: string
  outcome: string
  context: string
}>

export const homeScenarios: readonly HomeScenario[] = [
  {
    id: 'client-reply',
    need: 'Reply to a client',
    source: 'Notes',
    format: 'TEXT',
    title: 'Client follow-up',
    body: 'Thanks for sending this over. I can have a first pass ready by Friday afternoon.',
    memory: 'reply about the first pass on Friday',
    action: 'Copy reply',
    outcome: 'Reply ready to paste',
    context: 'Saved with Client launch',
  },
  {
    id: 'visa-document',
    need: 'Show a visa document',
    source: 'Files',
    format: 'PDF / PAGE 4',
    title: 'Visa checklist.pdf',
    body: 'Your passport must remain valid for at least six months.',
    memory: 'passport valid for six months',
    action: 'Open page 4',
    outcome: 'Exact page ready to show',
    context: 'Saved with Visa documents',
  },
  {
    id: 'form-detail',
    need: 'Fill out a form',
    source: 'Messages',
    format: 'DETAIL',
    title: 'Studio membership',
    body: 'Member ID: FD-2048-17',
    memory: 'my studio member number',
    action: 'Copy member ID',
    outcome: 'Member ID ready to paste',
    context: 'Saved with Memberships',
  },
]

export const libraryFormats = [
  { id: 'text', label: 'Text', mark: 'T', title: 'Reusable replies', detail: 'Copy the useful words without reopening a long note.' },
  { id: 'image', label: 'Images', mark: 'I', title: 'Reference images', detail: 'Keep the original image ready to preview or share.' },
  { id: 'link', label: 'Links', mark: 'L', title: 'Useful links', detail: 'Keep the destination and the reason it mattered.' },
  { id: 'file', label: 'Files', mark: 'F', title: 'PDFs and CSVs', detail: 'Open and share a clean original instead of a flattened copy.' },
  { id: 'list', label: 'Lists', mark: 'C', title: 'Working lists', detail: 'Keep checklists close to the material they belong with.' },
] as const

export const everydayUses = [
  {
    index: '01',
    title: 'Client work',
    body: 'Keep the proposal, call notes, shared links, and reusable follow-up together. Pull up the right piece while the conversation is still happening.',
  },
  {
    index: '02',
    title: 'Forms and details',
    body: 'Bring back membership numbers, addresses, Wi-Fi details, and standard replies without remembering which app held them.',
  },
  {
    index: '03',
    title: 'Travel and documents',
    body: 'Keep tickets, visa documents, checklists, and reference images in one place, then open the original when someone asks for it.',
  },
] as const
