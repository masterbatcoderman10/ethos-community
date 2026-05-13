import { getUserById } from './mockDb.js'

const KEYS = {
  activeUserId: 'ethos.activeUserId',
  activeRole: 'ethos.role',
  draftCases: 'ethos.draftCases',
  localUsers: 'ethos.localUsers'
}

const safeGet = (key) => {
  try { return localStorage.getItem(key) } catch (e) { return null }
}

const safeSet = (key, value) => {
  try { localStorage.setItem(key, value) } catch (e) {}
}

const safeRemove = (key) => {
  try { localStorage.removeItem(key) } catch (e) {}
}

const safeGetJSON = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (e) { return null }
}

const safeSetJSON = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) {}
}

export const getActiveUser = () => {
  const id = safeGet(KEYS.activeUserId)
  if (!id) return null
  const localUsers = getLocalUsers()
  const local = localUsers.find(u => u.id === id)
  if (local) return local
  return getUserById(id)
}

export const setActiveUser = (user) => {
  if (!user) { clearActiveUser(); return }
  safeSet(KEYS.activeUserId, user.id)
  safeSet(KEYS.activeRole, user.role)
}

export const clearActiveUser = () => {
  safeRemove(KEYS.activeUserId)
  safeRemove(KEYS.activeRole)
}

export const getActiveUserId = () => safeGet(KEYS.activeUserId)

export const getActiveRole = () => safeGet(KEYS.activeRole)

export const getDraftCases = () => safeGetJSON(KEYS.draftCases) || []

export const addDraftCase = (draft) => {
  const drafts = getDraftCases()
  drafts.push({ ...draft, createdAt: new Date().toISOString() })
  safeSetJSON(KEYS.draftCases, drafts)
  return drafts
}

export const getLocalUsers = () => safeGetJSON(KEYS.localUsers) || []

export const addLocalUser = (user) => {
  const users = getLocalUsers()
  users.push(user)
  safeSetJSON(KEYS.localUsers, users)
  return users
}
