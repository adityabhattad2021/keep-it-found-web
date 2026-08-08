import { roadmapPickLimit } from '../../roadmap/roadmap-content.ts'

export type RoadmapPickChange =
  | Readonly<{ featureId: string; type: 'add' }>
  | Readonly<{ featureId: string; type: 'remove' }>
  | Readonly<{ featureId: string; replacedFeatureId: string; type: 'replace' }>

export function applyRoadmapPickChange(
  currentFeatureIds: readonly string[],
  change: RoadmapPickChange,
): string[] {
  if (change.type === 'remove') {
    return currentFeatureIds.filter((featureId) => featureId !== change.featureId)
  }
  if (change.type === 'replace') {
    if (!currentFeatureIds.includes(change.replacedFeatureId) || currentFeatureIds.includes(change.featureId)) {
      throw new Error('Roadmap pick replacement is stale')
    }
    return currentFeatureIds.map((featureId) => (
      featureId === change.replacedFeatureId ? change.featureId : featureId
    ))
  }
  if (currentFeatureIds.includes(change.featureId)) return [...currentFeatureIds]
  if (currentFeatureIds.length >= roadmapPickLimit) throw new Error('Roadmap pick limit reached')
  return [...currentFeatureIds, change.featureId]
}
