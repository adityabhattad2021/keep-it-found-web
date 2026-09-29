/** The home page's lists. Every claim stays within docs/iphone-release-claim-ledger.md. */

/** Where things end up: the pile the film opens on. */
export const pile = [
  { count: 14208, label: 'Photos', tilt: -2.5 },
  { count: 63, label: 'Tabs', tilt: 1.8 },
  { count: 412, label: 'Notes', tilt: -1.2 },
  { count: 3912, label: 'Emails', tilt: 2.4 },
] as const

export const keptKinds = [
  { kind: 'NOTE', label: 'Notes and lists' },
  { kind: 'LINK', label: 'Links' },
  { kind: 'IMG', label: 'Photos' },
  { kind: 'PDF', label: 'PDFs' },
  { kind: 'CSV', label: 'CSV tables' },
  { kind: 'FILE', label: 'Any other file' },
] as const

type ComingItem = Readonly<{ title: string; body: string }>

export const comingNext: readonly ComingItem[] = [
  {
    title: 'Found on your Mac',
    body: 'Your library at your desk: find what you kept on your iPhone, and use it where you are working.',
  },
  {
    title: 'Every device, your own iCloud',
    body: 'The same library on each of your devices, carried by your own iCloud. Still no Found server.',
  },
  {
    title: 'The AI apps you choose',
    body: 'Let an AI app you pick find things in your library, only after you allow it, and never change or remove anything.',
  },
]
