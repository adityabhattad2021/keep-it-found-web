export const roadmapPickLimit = 3

export const votableRoadmapFeatureIds = [
  'capture-without-stopping',
  'better-writing-surface',
  'understand-every-item',
  'right-thing-returns',
  'intelligent-retrieval',
  'found-can-act',
  'voice-camera-intelligence',
  'library-that-travels',
  'personal-adaptation',
  'open-automation',
  'on-device-assistant',
] as const

export type VotableRoadmapFeatureId = (typeof votableRoadmapFeatureIds)[number]

const featureIds = new Set<string>(votableRoadmapFeatureIds)

export function parseFeatureId(value: unknown): VotableRoadmapFeatureId {
  if (typeof value !== 'string' || !featureIds.has(value)) {
    throw new Error('Unknown roadmap feature')
  }
  return value as VotableRoadmapFeatureId
}

export function parseFeatureIds(value: unknown): VotableRoadmapFeatureId[] {
  if (!Array.isArray(value) || value.length > roadmapPickLimit) {
    throw new Error(`Roadmap picks must contain at most ${roadmapPickLimit} features`)
  }

  const parsed = value.map(parseFeatureId)
  if (new Set(parsed).size !== parsed.length) throw new Error('Roadmap picks must be unique')
  return parsed
}

export function planRoadmapPickUpdate(
  currentFeatureIds: readonly VotableRoadmapFeatureId[],
  desiredFeatureIds: readonly VotableRoadmapFeatureId[],
) {
  const currentSet = new Set(currentFeatureIds)
  const desiredSet = new Set(desiredFeatureIds)
  return {
    addedFeatureIds: desiredFeatureIds.filter((featureId) => !currentSet.has(featureId)),
    removedFeatureIds: currentFeatureIds.filter((featureId) => !desiredSet.has(featureId)),
  }
}

export function parseFeedbackMessage(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Roadmap feedback must be text')
  const message = value.trim()
  if (message.length < 3 || message.length > 500) {
    throw new Error('Roadmap feedback must contain 3 to 500 characters')
  }
  return message
}

export function readVoteCount(value: unknown): number {
  return Number.isSafeInteger(value) && Number(value) >= 0 ? Number(value) : 0
}
