import { getActiveUserId, getActiveRole } from '../data/mockSession.js'
import { getUserById } from '../data/mockDb.js'

const ROLE_TO_SIDE = {
  supporter: "supporter",
  mentor: "supporter",
  ambassador: "supporter",
  finance: "supporter",
  development: "supporter",
  beneficiary: "beneficiary",
  sme: "beneficiary"
};

export const roleToSide = (role) => ROLE_TO_SIDE[role] || null;

export const getEthosRole = () => {
  try { return localStorage.getItem("ethos.role"); } catch (e) { return null; }
};

export const getEthosSide = () => {
  const activeId = getActiveUserId()
  if (activeId) {
    const user = getUserById(activeId)
    if (user) return user.side
    const activeRole = getActiveRole()
    if (activeRole) return roleToSide(activeRole)
  }
  return roleToSide(getEthosRole())
};

export const setEthosRole = (role) => {
  try { localStorage.setItem("ethos.role", role); } catch (e) {}
};

export const clearEthosRole = () => {
  try { localStorage.removeItem("ethos.role"); } catch (e) {}
};

export const getActiveSide = () => getEthosSide()

export const sideDashboardUrl = (side, fromDepth = 0) => {
  if (side === "beneficiary") return "/beneficiary";
  if (side === "supporter") return "/supporter";
  return "/";
};
