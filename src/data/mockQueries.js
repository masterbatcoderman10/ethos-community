import {
  CASES, LEDGER, getUserById,
  SUPPORTER_ACTIVITY, BENEFICIARY_ACTIVITY
} from './mockDb.js'
import {
  getActiveUser, setActiveUser, getDraftCases, getActiveUserId
} from './mockSession.js'

export { getActiveUser, setActiveUser }

export const getDashboardUrlForUser = (user) => {
  if (!user) return '/'
  if (user.side === 'supporter') return '/supporter'
  if (user.side === 'beneficiary') return '/beneficiary'
  return '/'
}

const mergeDrafts = (seeded, drafts, filterFn) => {
  const matchingDrafts = drafts
    .filter(filterFn)
    .map(d => ({ ...d, isDraft: true, status: d.status || 'pending' }))
  return [...seeded, ...matchingDrafts]
}

export const getCasesForSupporter = (userId) => {
  const drafts = getDraftCases()
  const seeded = CASES.filter(c => c.supporterUserIds?.includes(userId))
  return mergeDrafts(seeded, drafts, d => d.supporterUserIds?.includes(userId))
}

export const getCasesForReceiver = (userId) => {
  const drafts = getDraftCases()
  const seeded = CASES.filter(c => c.ownerUserId === userId)
  return mergeDrafts(seeded, drafts, d => d.ownerUserId === userId)
}

export const getCasesForSide = (side) => {
  const user = getActiveUser()
  if (!user) return []
  if (side === 'supporter') return getCasesForSupporter(user.id)
  if (side === 'beneficiary') return getCasesForReceiver(user.id)
  return []
}

export const getDocumentsForReceiver = (userId) => {
  const cases = getCasesForReceiver(userId)
  return cases.flatMap(c =>
    (c.documents || []).map(d => ({ ...d, caseId: c.id, caseName: c.name }))
  )
}

export const getMessagesForReceiver = (userId) => {
  const cases = getCasesForReceiver(userId)
  return cases.flatMap(c =>
    (c.messages || []).map(m => ({ ...m, caseId: c.id, caseName: c.name }))
  )
}

const caseIdsForUser = (userId) => {
  const asSupporter = CASES.filter(c => c.supporterUserIds?.includes(userId))
  const asReceiver = CASES.filter(c => c.ownerUserId === userId)
  const all = [...asSupporter, ...asReceiver]
  return new Set(all.map(c => c.id))
}

export const getImpactRowsForUser = (userId) => {
  const ids = caseIdsForUser(userId)
  return LEDGER.filter(row => ids.has(row.id))
}

export const getSupporterSummary = (userId) => {
  const cases = getCasesForSupporter(userId)
  const activeCases = cases.filter(c => c.status !== 'complete').length
  const totalPledged = cases.reduce((sum, c) => sum + (c.raised || 0), 0)
  const livesReached = cases.reduce((sum, c) => {
    if (c.category === 'family') return sum + 5
    if (c.category === 'education' && c.ownerUserId === null) return sum + 12
    return sum + 1
  }, 0)
  const verifications = cases.reduce(
    (sum, c) => sum + (c.documents || []).filter(d => d.status === 'verified').length, 0
  )
  return { totalPledged, activeCases, livesReached, verifications }
}

export const getBeneficiarySummary = (userId) => {
  const cases = getCasesForReceiver(userId)
  const activeCases = cases.filter(c => c.status !== 'complete').length
  const fundsRaised = cases.reduce((sum, c) => sum + (c.raised || 0), 0)
  const targetTotal = cases.reduce((sum, c) => sum + (c.target || 0), 0)
  const supporterIds = new Set(cases.flatMap(c => c.supporterUserIds || []))
  return { activeCases, fundsRaised, targetTotal, supporterCount: supporterIds.size }
}

export const getActivityFeed = (side, userId) => {
  if (side === 'supporter') return SUPPORTER_ACTIVITY[userId] || SUPPORTER_ACTIVITY.default || []
  if (side === 'beneficiary') return BENEFICIARY_ACTIVITY
  return []
}

export const getCaseMessages = (caseId) => {
  const c = CASES.find(x => x.id === caseId)
  return c ? (c.messages || []) : []
}

export const getCaseDocuments = (caseId) => {
  const c = CASES.find(x => x.id === caseId)
  return c ? (c.documents || []) : []
}

export const getCaseMilestones = (caseId) => {
  const c = CASES.find(x => x.id === caseId)
  return c ? (c.milestones || []) : []
}

export const getLedgerForUser = (userId) => getImpactRowsForUser(userId)

export const getCasesForUser = (userId) => {
  const user = getUserById(userId)
  if (!user) return []
  if (user.side === 'supporter') return getCasesForSupporter(userId)
  if (user.side === 'beneficiary') return getCasesForReceiver(userId)
  return []
}
