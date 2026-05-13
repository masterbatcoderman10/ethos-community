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

export const getEthosSide = () => roleToSide(getEthosRole());

export const setEthosRole = (role) => {
  try { localStorage.setItem("ethos.role", role); } catch (e) {}
};

export const clearEthosRole = () => {
  try { localStorage.removeItem("ethos.role"); } catch (e) {}
};

const SIDE_ROOT = {
  supporter: "supporter/",
  beneficiary: "beneficiary/"
};

export const sideDashboardUrl = (side, fromDepth = 0) => {
  const prefix = fromDepth === 0 ? "" : "../".repeat(fromDepth);
  const root = SIDE_ROOT[side];
  if (!root) return `${prefix}landing.html`;
  return `${prefix}${root}dashboard.html`;
};
