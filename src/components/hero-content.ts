export type HeroMemory = Readonly<{
  id: string
  cue: string
  remembered: string
  kind: string
  mark: string
  title: string
  location: string
  matchTerms: readonly string[]
  excerpt: Readonly<{
    before?: string
    match: string
    after?: string
  }>
}>

export const heroMemories: readonly HeroMemory[] = [
  {
    id: 'visa',
    cue: 'Passport validity',
    remembered: 'something about my passport being valid for six months',
    kind: 'PDF · PAGE 4',
    mark: 'P',
    title: 'Visa checklist.pdf',
    location: 'Visa documents',
    matchTerms: ['passport', 'valid', 'six month', 'visa'],
    excerpt: {
      before: 'Your passport must remain valid for ',
      match: 'at least six months',
      after: '.',
    },
  },
  {
    id: 'models',
    cue: 'Models to test',
    remembered: 'the small on-device models I wanted to test',
    kind: 'NOTE',
    mark: 'T',
    title: 'Five models worth testing',
    location: 'Product research',
    matchTerms: ['model', 'on-device', 'test', 'small'],
    excerpt: {
      before: 'Compare ',
      match: 'small, fast models that work on-device',
      after: ' before the next build.',
    },
  },
  {
    id: 'packing',
    cue: 'Packing list',
    remembered: 'what was still left to pack for the weekend',
    kind: 'CHECKLIST',
    mark: '✓',
    title: 'Weekend packing',
    location: 'Upcoming',
    matchTerms: ['pack', 'weekend', 'charger', 'trip'],
    excerpt: {
      before: 'Book train · ',
      match: 'Pack charger',
      after: ' · Download tickets',
    },
  },
  {
    id: 'whiteboard',
    cue: 'Whiteboard photo',
    remembered: 'the whiteboard photo from our product review',
    kind: 'IMAGE',
    mark: 'I',
    title: 'Whiteboard sketch',
    location: 'Field notes',
    matchTerms: ['whiteboard', 'photo', 'product review', 'sketch'],
    excerpt: {
      before: 'Captured after the ',
      match: 'product review',
      after: '.',
    },
  },
]

export function findHeroMemory(query: string): HeroMemory | null {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return null

  let bestMatch: HeroMemory | null = null
  let bestScore = 0

  for (const memory of heroMemories) {
    const score = memory.matchTerms.reduce(
      (total, term) => total + Number(normalizedQuery.includes(term)),
      0,
    )

    if (score > bestScore) {
      bestMatch = memory
      bestScore = score
    }
  }

  return bestMatch
}
