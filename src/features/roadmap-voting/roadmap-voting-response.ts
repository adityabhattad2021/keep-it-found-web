import { roadmapPickLimit, votableRoadmapFeatureIds } from '../../roadmap/roadmap-content.ts'

export type RoadmapPickSnapshot = Readonly<{
  counts: Readonly<Record<string, number>>
  pickedFeatureIds: readonly string[]
}>

export type RoadmapPickResult = RoadmapPickSnapshot

const featureIds = new Set<string>(votableRoadmapFeatureIds)

export function parsePickSnapshot(value: unknown): RoadmapPickSnapshot {
  if (!isRecord(value) || !isRecord(value.counts) || !Array.isArray(value.pickedFeatureIds)) {
    throw new Error('Roadmap pick snapshot is invalid')
  }

  const counts = Object.fromEntries(
    Object.entries(value.counts).map(([featureId, count]) => {
      if (!featureIds.has(featureId)) throw new Error('Roadmap count feature is invalid')
      if (!isCount(count)) throw new Error('Roadmap pick count is invalid')
      return [featureId, count]
    }),
  )
  const pickedFeatureIds = value.pickedFeatureIds.map((featureId) => {
    if (typeof featureId !== 'string' || !featureIds.has(featureId)) {
      throw new Error('Roadmap pick feature is invalid')
    }
    return featureId
  })
  if (pickedFeatureIds.length > roadmapPickLimit || new Set(pickedFeatureIds).size !== pickedFeatureIds.length) {
    throw new Error('Roadmap picks are invalid')
  }

  return { counts, pickedFeatureIds }
}

export const parsePickResult = parsePickSnapshot

function isCount(value: unknown): value is number {
  return Number.isSafeInteger(value) && Number(value) >= 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
