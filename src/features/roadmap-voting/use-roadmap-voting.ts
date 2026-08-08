import { useCallback, useEffect, useRef, useState } from 'react'

import { getRoadmapVotingClient } from './roadmap-voting-client.ts'
import { applyRoadmapPickChange } from './roadmap-pick-change.ts'
import type { RoadmapPickChange } from './roadmap-pick-change.ts'
import type { RoadmapPickResult, RoadmapPickSnapshot } from './roadmap-voting-response.ts'

type VotingAvailability = 'loading' | 'ready' | 'degraded' | 'unavailable'

const emptySnapshot: RoadmapPickSnapshot = { counts: {}, pickedFeatureIds: [] }

export function useRoadmapVoting() {
  const [availability, setAvailability] = useState<VotingAvailability>('loading')
  const [error, setError] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<RoadmapPickSnapshot>(emptySnapshot)
  const snapshotRef = useRef<RoadmapPickSnapshot>(emptySnapshot)
  const updateQueueRef = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    let active = true
    const client = getRoadmapVotingClient()
    if (!client) return () => { active = false }

    client.loadSnapshot()
      .then((nextSnapshot) => {
        if (!active) return
        snapshotRef.current = nextSnapshot
        setSnapshot(nextSnapshot)
        setAvailability('ready')
      })
      .catch(() => {
        if (!active) return
        setError('Your roadmap picks could not be loaded. Reload the page to try again.')
        setAvailability('degraded')
      })

    return () => { active = false }
  }, [])

  const updatePick = useCallback((change: RoadmapPickChange): Promise<RoadmapPickResult> => {
    const client = getRoadmapVotingClient()
    if (!client) throw new Error('Roadmap voting is unavailable')

    const operation = updateQueueRef.current.then(async () => {
      const desiredFeatureIds = applyRoadmapPickChange(snapshotRef.current.pickedFeatureIds, change)
      const result = await client.setPicks(desiredFeatureIds)
      const nextSnapshot = {
        counts: { ...snapshotRef.current.counts, ...result.counts },
        pickedFeatureIds: result.pickedFeatureIds,
      }
      snapshotRef.current = nextSnapshot
      setSnapshot(nextSnapshot)
      setAvailability('ready')
      setError(null)
      return result
    })
    updateQueueRef.current = operation.then(() => undefined, () => undefined)
    return operation
  }, [])

  const submitFeedback = useCallback(async (featureId: string, message: string) => {
    const client = getRoadmapVotingClient()
    if (!client) throw new Error('Roadmap feedback is unavailable')
    await client.submitFeedback(featureId, message)
  }, [])

  return {
    availability: getRoadmapVotingClient() ? availability : 'unavailable',
    error,
    snapshot,
    submitFeedback,
    updatePick,
  } as const
}
