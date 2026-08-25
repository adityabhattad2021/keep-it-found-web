import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { setGlobalOptions } from 'firebase-functions/v2'
import { HttpsError, onCall } from 'firebase-functions/v2/https'

import {
  parseFeatureId,
  parseFeatureIds,
  parseFeedbackMessage,
  planRoadmapPickUpdate,
  readVoteCount,
  roadmapRoundId,
  votableRoadmapFeatureIds,
} from './roadmap-features.js'

initializeApp()
setGlobalOptions({ maxInstances: 3, region: 'us-central1' })

const db = getFirestore()
const roadmapRound = db.collection('roadmapRounds').doc(roadmapRoundId)
const features = roadmapRound.collection('features')
const feedback = roadmapRound.collection('feedback')
const voters = roadmapRound.collection('voters')

export const getRoadmapVotes = onCall({ enforceAppCheck: true }, async (request) => {
  const featureRefs = votableRoadmapFeatureIds.map((featureId) => features.doc(featureId))
  const featureSnapshots = await db.getAll(...featureRefs)
  const counts = Object.fromEntries(featureSnapshots.map((snapshot) => [
    snapshot.id,
    readVoteCount(snapshot.get('voteCount')),
  ]))

  if (!request.auth) return { counts, pickedFeatureIds: [] }

  const voterSnapshot = await voters.doc(request.auth.uid).get()
  const pickedFeatureIds = voterSnapshot.exists
    ? parseFeatureIds(voterSnapshot.get('featureIds'))
    : []

  return { counts, pickedFeatureIds }
})

export const setRoadmapPicks = onCall({ enforceAppCheck: true }, async (request) => {
  const uid = requireAuthenticatedUser(request.auth?.uid)
  const desiredFeatureIds = requireFeatureIds(request.data)
  const voterRef = voters.doc(uid)

  return db.runTransaction(async (transaction) => {
    const voterSnapshot = await transaction.get(voterRef)
    const currentFeatureIds = voterSnapshot.exists
      ? parseFeatureIds(voterSnapshot.get('featureIds'))
      : []
    const desiredSet = new Set(desiredFeatureIds)
    const { addedFeatureIds, removedFeatureIds } = planRoadmapPickUpdate(currentFeatureIds, desiredFeatureIds)
    const changedFeatureIds = [...removedFeatureIds, ...addedFeatureIds]
    const changedFeatures = await Promise.all(changedFeatureIds.map(async (featureId) => {
      const featureRef = features.doc(featureId)
      return { featureId, featureRef, snapshot: await transaction.get(featureRef) }
    }))
    const counts: Record<string, number> = {}

    for (const { featureId, featureRef, snapshot } of changedFeatures) {
      const currentCount = readVoteCount(snapshot.get('voteCount'))
      const nextCount = Math.max(0, currentCount + (desiredSet.has(featureId) ? 1 : -1))
      counts[featureId] = nextCount
      transaction.set(featureRef, {
        updatedAt: FieldValue.serverTimestamp(),
        voteCount: nextCount,
      }, { merge: true })
    }

    for (const featureId of removedFeatureIds) {
      transaction.delete(feedback.doc(`${featureId}_${uid}`))
    }

    if (desiredFeatureIds.length === 0) transaction.delete(voterRef)
    else transaction.set(voterRef, {
      featureIds: desiredFeatureIds,
      updatedAt: FieldValue.serverTimestamp(),
    })

    return { counts, pickedFeatureIds: desiredFeatureIds }
  })
})

export const submitRoadmapFeedback = onCall({ enforceAppCheck: true }, async (request) => {
  const uid = requireAuthenticatedUser(request.auth?.uid)
  const featureId = requireSingleFeatureId(request.data)
  const message = requireFeedbackMessage(request.data)
  const voterRef = voters.doc(uid)
  const feedbackRef = feedback.doc(`${featureId}_${uid}`)

  await db.runTransaction(async (transaction) => {
    const voterSnapshot = await transaction.get(voterRef)
    const featureIds = voterSnapshot.exists ? parseFeatureIds(voterSnapshot.get('featureIds')) : []
    if (!featureIds.includes(featureId)) {
      throw new HttpsError('failed-precondition', 'Pick this feature before sharing context')
    }
    transaction.set(feedbackRef, {
      featureId,
      message,
      updatedAt: FieldValue.serverTimestamp(),
    })
  })

  return { accepted: true }
})

function requireAuthenticatedUser(uid: string | undefined): string {
  if (!uid) throw new HttpsError('unauthenticated', 'Anonymous authentication is required')
  return uid
}

function requireFeatureIds(data: unknown) {
  try {
    return parseFeatureIds(readProperty(data, 'featureIds'))
  } catch {
    throw new HttpsError('invalid-argument', 'Roadmap picks are invalid')
  }
}

function requireSingleFeatureId(data: unknown) {
  try {
    return parseFeatureId(readProperty(data, 'featureId'))
  } catch {
    throw new HttpsError('invalid-argument', 'Roadmap feature is invalid')
  }
}

function requireFeedbackMessage(data: unknown) {
  try {
    return parseFeedbackMessage(readProperty(data, 'message'))
  } catch {
    throw new HttpsError('invalid-argument', 'Roadmap feedback must contain 3 to 500 characters')
  }
}

function readProperty(value: unknown, key: string): unknown {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
  return Reflect.get(value, key)
}
