/**
 * The sample library for the page's search: the same things as the launch film.
 * It runs in the browser and only imitates how Found explains a match; on an
 * iPhone, Found searches the person's own library on the device.
 */
export type SampleItem = Readonly<{
  id: string
  kind: 'NOTE' | 'LINK' | 'PDF' | 'IMG'
  title: string
  meta: string
  /** The text Found keeps or reads for this item: a note's text, a PDF page, the words in a photo. */
  text: string
  /** Where that text lives, when it is not the item itself. */
  source?: 'page' | 'photo'
  page?: string
  /** What the item is about, for matches by meaning. */
  about: readonly string[]
  actions: readonly string[]
}>

export const SAMPLE_LIBRARY: readonly SampleItem[] = [
  {
    id: 'trattoria',
    kind: 'LINK',
    title: 'Trattoria Lucia · hand-rolled tagliatelle',
    meta: 'trattorialucia.example/menu',
    text: 'Menu. Hand-rolled tagliatelle, ragù, cacio e pepe, tiramisu.',
    about: ['pasta', 'italian', 'restaurant', 'dinner', 'lunch', 'food', 'eat', 'place', 'noodles', 'menu', 'spaghetti'],
    actions: ['OPEN WEBSITE', 'SHARE'],
  },
  {
    id: 'agreement',
    kind: 'PDF',
    title: 'Signed agreement',
    meta: 'Signed agreement.pdf · 7 pages',
    text: '9. Ending the agreement. Cancellation terms: 30 days’ written notice. Either party may end this agreement at any time by giving 30 days’ written notice to the other.',
    source: 'page',
    page: 'Page 7',
    about: ['cancel', 'cancellation', 'terms', 'notice', 'end', 'terminate', 'quit', 'contract', 'leave', 'agreement', 'period'],
    actions: ['PREVIEW', 'COPY PASSAGE', 'SHARE'],
  },
  {
    id: 'card',
    kind: 'IMG',
    title: 'IMG_4812.jpg',
    meta: 'Photo · words found in it',
    text: 'Priya Nair · Store Manager, Harbor Lane Coffee · priya@harborlanecoffee.example · +1 (555) 014 2291',
    source: 'photo',
    about: ['business card', 'contact', 'phone', 'number', 'email', 'manager', 'coffee', 'call', 'card'],
    actions: ['COPY', 'SHARE'],
  },
  {
    id: 'whiteboard',
    kind: 'IMG',
    title: 'Harbor Lane whiteboard',
    meta: 'Photo · words found in it',
    text: 'Soft open — Oct 14. Menu photos Thursday. Signage proof Friday.',
    source: 'photo',
    about: ['launch', 'opening', 'open', 'date', 'when', 'schedule', 'plan', 'deadline', 'day'],
    actions: ['COPY', 'SHARE'],
  },
  {
    id: 'rates',
    kind: 'NOTE',
    title: 'Rate card',
    meta: 'Note · kept close',
    text: 'Day rate: 640. Half day: 360. Rush work: plus 25 percent. Invoices due within 14 days.',
    about: ['price', 'pricing', 'fee', 'fees', 'cost', 'charge', 'rate', 'invoice', 'much', 'quote', 'money', 'pay'],
    actions: ['COPY TEXT'],
  },
  {
    id: 'reply',
    kind: 'NOTE',
    title: 'Cancellation reply',
    meta: 'Note · ;terms on the Found Keyboard',
    text: 'It’s 30 days’ notice. It’s on page 7 of the signed agreement.',
    about: ['cancel', 'cancellation', 'reply', 'answer', 'notice', 'terms'],
    actions: ['COPY TEXT'],
  },
  {
    id: 'receipt',
    kind: 'IMG',
    title: 'Dinner receipt',
    meta: 'Photo · words found in it',
    text: 'Trattoria Lucia. 2 × tagliatelle, 1 × tiramisu. Total 84.20.',
    source: 'photo',
    about: ['bill', 'receipt', 'expense', 'spent', 'total', 'dinner', 'paid'],
    actions: ['COPY', 'SHARE'],
  },
  {
    id: 'passport',
    kind: 'NOTE',
    title: 'Passport renewal',
    meta: 'Note · reminder tomorrow, 2:30 PM',
    text: 'Bring the old passport, two photographs, address proof and the appointment receipt.',
    about: ['passport', 'travel', 'documents', 'visa', 'id', 'appointment', 'renew'],
    actions: ['COPY TEXT'],
  },
  {
    id: 'trip',
    kind: 'NOTE',
    title: 'Trip ideas',
    meta: 'Note',
    text: 'Lisbon, in May. Tram 28 early, before the crowds. Pastéis in Belém.',
    about: ['holiday', 'vacation', 'travel', 'trip', 'lisbon', 'portugal', 'may'],
    actions: ['COPY TEXT'],
  },
]

export const SAMPLE_QUESTIONS = [
  'that pasta place',
  'cancellation terms',
  'priya’s number',
  'when is the soft open',
  'how much do I charge',
] as const

export type SampleMatch = Readonly<{
  item: SampleItem
  /** Why it came back, in Found's words. */
  reason: 'meaning' | 'words' | 'photo' | 'page'
  /** The passage to show, with the matched words marked. */
  excerpt: readonly (string | { mark: string })[]
}>

const STOP = new Set(['the', 'a', 'an', 'is', 'of', 'to', 'do', 'i', 'my', 'me', 'that', 'what', 'was', 'it', 'for', 'in', 'on', 'and', 'where', 'did', 'we', 'our', 'with', 's'])

function words(text: string): string[] {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']s\b/g, '').replace(/[’']/g, '').split(/[^a-z0-9@.]+/).filter(Boolean)
}

/** Marks every word of `text` that starts with one of the query's words. */
function mark(text: string, terms: readonly string[]): SampleMatch['excerpt'] {
  const parts: (string | { mark: string })[] = []
  for (const piece of text.split(/(\s+)/)) {
    const plain = words(piece)[0] ?? ''
    if (plain && terms.some((term) => plain.startsWith(term) || (term.length > 3 && plain.includes(term)))) parts.push({ mark: piece })
    else parts.push(piece)
  }
  return parts
}

/** Whether a query has anything to search for yet ("that" alone does not). */
export function hasSearchTerms(query: string): boolean {
  return words(query).some((term) => !STOP.has(term))
}

/** What Find shows before a search: the most recent things. */
export const RECENT: readonly SampleMatch[] = ['whiteboard', 'trattoria', 'rates'].map((id) => {
  const item = SAMPLE_LIBRARY.find((entry) => entry.id === id)!
  return { item, reason: 'words' as const, excerpt: [item.text] }
})

export function searchSample(query: string): SampleMatch[] {
  const terms = words(query).filter((term) => !STOP.has(term))
  if (terms.length === 0) return []
  const scored = SAMPLE_LIBRARY.map((item) => {
    const titleWords = words(item.title)
    const textWords = words(item.text)
    const direct = terms.filter((term) => [...titleWords, ...textWords].some((word) => word.startsWith(term)))
    const meant = terms.filter((term) => item.about.some((topic) => topic.startsWith(term) || term.startsWith(topic)))
    const score = direct.length * 3 + meant.length * 2 + (direct.length === terms.length ? 2 : 0)
    return { item, direct, meant, score }
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score)

  return scored.slice(0, 3).map(({ item, direct }) => {
    const inText = direct.some((term) => words(item.text).some((word) => word.startsWith(term)))
    const reason: SampleMatch['reason'] = inText
      ? item.source === 'photo' ? 'photo' : item.source === 'page' ? 'page' : 'words'
      : direct.length > 0 ? 'words' : 'meaning'
    return { item, reason, excerpt: mark(item.text, direct) }
  })
}
