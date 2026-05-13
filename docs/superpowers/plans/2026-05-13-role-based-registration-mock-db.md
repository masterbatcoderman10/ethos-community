# Role-Based Registration and Mock DB Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a light functional demo layer where registration, case creation, dashboards, and impact views are driven by active user session and mock JSON-style data.

**Architecture:** Use `localStorage` for active session and locally created draft cases. Move seeded mock users, cases, documents, activities, messages, and impact ledger rows into focused data/query modules under `src/data/`. Dashboards and intake screens consume query helpers instead of hardcoded local arrays.

**Tech Stack:** React 19, React Router 7, Vite, localStorage, existing CSS and component primitives. No Jotai dependency for this phase.

**Impeccable review rule:** After each major page or section wave, dispatch a subagent running the `impeccable` skill in critique/polish/adapt mode against the changed flow. Apply findings before marking that wave complete.

---

## Wave A — Mock Data and Session Foundation

### Task 1: Add mock DB and session utilities

**Files:**
- Create: `src/data/mockDb.js`
- Create: `src/data/mockSession.js`
- Create: `src/data/mockQueries.js`
- Modify: `src/utils/role.js`

- [x] Add seeded supporter users for Sarah, Osman, Khalid, and Hassan as separate accounts.
- [x] Add seeded receiver users for Halima plus at least one family/healthcare receiver and one SME receiver.
- [x] Move existing dashboard case data into shared mock cases with `ownerUserId`, `supporterUserIds`, `vertical`, `status`, `raised`, `target`, `documents`, `messages`, and `milestones`.
- [x] Add localStorage helpers for `activeUserId`, `activeRole`, draft cases, and locally registered users.
- [x] Update `role.js` so side resolution can use an active user first, falling back to the old role key for compatibility.
- [x] Verify with `npm run build`.

### Task 2: Add query helpers for dashboards and impact

**Files:**
- Modify: `src/data/mockQueries.js`

- [x] Implement `getActiveUser`, `setActiveUser`, `getDashboardUrlForUser`, `getCasesForSupporter`, `getCasesForReceiver`, `getDocumentsForReceiver`, `getMessagesForReceiver`, and `getImpactRowsForUser`.
- [x] Merge local draft cases with seeded cases in query results.
- [x] Ensure supporter queries only return funded, followed, or recommended cases for that active supporter.
- [x] Ensure receiver queries only return cases owned by that active receiver.
- [x] Verify query behavior manually in a browser console or with a temporary non-mutating Node import check.

## Wave B — Registration and Login Flow

### Task 3: Convert role chooser into registration/login entry

**Files:**
- Modify: `src/pages/RoleChooser.jsx`
- Modify: `src/pages/RoleChooser.css`

- [x] Replace the generic role-only flow with a two-part choice: “Use a demo login” and “Register a new demo profile.”
- [x] Show supporter demo logins as separate choices, not as a dashboard persona switcher.
- [x] Show receiver demo logins separately, including Halima.
- [x] On continue, persist `activeUserId` and route to `/supporter` or `/beneficiary`.
- [x] Preserve role copy for non-login roles, but map each to an actual side and active user.
- [x] Verify each demo login reaches the correct dashboard.

### Task 4: Add lightweight registration details

**Files:**
- Modify: `src/pages/RoleChooser.jsx`
- Modify: `src/pages/RoleChooser.css`
- Modify: `src/data/mockSession.js`

- [x] For supporter registration, capture name, country/corridor, and interest verticals.
- [x] For receiver registration, capture name, receiver type, location, and primary need pathway.
- [x] Store registered local demo users in `localStorage`.
- [x] Route supporters to `/supporter`; route receivers either to `/beneficiary` or `/create?mode=receiver` based on the selected path.
- [x] Verify reload preserves the selected user.

## Wave C — Dynamic Case Creation

### Task 5: Split case creation by active side

**Files:**
- Modify: `src/pages/CaseCreation.jsx`
- Modify: `src/pages/CaseCreation.css`
- Modify: `src/data/mockQueries.js`
- Modify: `src/data/mockSession.js`

- [x] Detect `mode=receiver`, active user side, or fallback side to choose intake mode.
- [x] Supporter intake copy should say “I want to support someone.”
- [x] Receiver intake copy should say “I need support / I am registering my situation.”
- [x] Receiver intake should ask for current situation, desired outcome, urgency, documents available, and ambassador/verifier contact.
- [x] Receiver intake should make funding amount optional and remove pledge frequency as a required field.
- [x] Supporter intake should keep relationship, beneficiary, support type, documents, pledge target, and pledge frequency.
- [x] Submit creates a pending draft case in localStorage linked to the active supporter or receiver.
- [x] Submit routes to the correct dashboard and shows the pending draft row.
- [x] Verify both modes by creating one supporter draft and one receiver draft.

## Wave D — Dashboard Data Split

### Task 6: Refactor supporter dashboard around active login

**Files:**
- Modify: `src/pages/SupporterDashboard.jsx`
- Modify: `src/pages/SupporterDashboard.css`

- [x] Remove the four-profile persona switcher.
- [x] Read active supporter from mock queries.
- [x] Show active supporter identity in the session panel.
- [x] Filter case rows, summary stats, activity, and suggested vertical by active supporter.
- [x] Add a clear fallback state if no supporter is selected, with CTA to `/role`.
- [x] Verify Sarah, Osman, Khalid, and Hassan show different dashboards.

### Task 7: Refactor beneficiary dashboard, cases, documents, and messages

**Files:**
- Modify: `src/pages/BeneficiaryDashboard.jsx`
- Modify: `src/pages/BeneficiaryMyCases.jsx`
- Modify: `src/pages/BeneficiaryCaseDetail.jsx`
- Modify: `src/pages/BeneficiaryDocuments.jsx`
- Modify: `src/pages/BeneficiaryMessages.jsx`

- [x] Read active receiver from mock queries instead of assuming Halima everywhere.
- [x] Show only cases owned by the active receiver.
- [x] Show documents and messages attached to the active receiver or selected case.
- [x] Add pending draft case support for receiver-created cases.
- [x] Add a clear fallback state if no receiver is selected, with CTA to `/role`.
- [x] Verify Halima’s receiver flow still works end to end.

### Task 8: Refactor impact dashboard to support global and user-specific views

**Files:**
- Modify: `src/pages/SupporterImpact.jsx`

- [x] Keep global impact as the default when no user-specific filter is selected.
- [x] If an active user exists, add a visible toggle between global impact and “My impact.”
- [x] Filter ledger rows and vertical counts for “My impact.”
- [x] Ensure rows still include seeded examples such as Afaf, Yasmin, Maryam, Halima, and SME/trade rows.
- [x] Verify global view remains pitch-ready.

## Wave E — Receiver Access to Pathways

### Task 9: Add receiver pathway routes and navigation

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Nav.jsx`
- Modify: existing pathway page components as needed

- [x] Add receiver-accessible routes under `/beneficiary/pathways/*` for healthcare, education, women, legal, SME, trade, and marketplace.
- [x] Reuse existing page components where practical.
- [x] Add a `viewerSide` prop or route-derived mode to change CTA language.
- [x] Receiver CTAs should focus on “Start request,” “Prepare documents,” “Ask ambassador,” and “View requirements.”
- [x] Supporter CTAs should keep “Pledge,” “Support,” and “Request introduction.”
- [x] Add receiver dashboard links to relevant pathway pages.

### Task 10: Impeccable critique and polish

**Files:**
- Modify files identified by critique.

- [x] Dispatch an independent subagent to run `impeccable` critique/polish/adapt on the updated registration and dashboard flows.
- [x] Apply high-signal findings that improve clarity, hierarchy, or demo flow.
- [x] Verify desktop and mobile layouts for `/role`, `/create`, `/supporter`, `/beneficiary`, and `/supporter/impact`.

## Wave F — Verification

### Task 11: Build and demo verification

**Files:**
- No planned source edits unless verification finds a bug.

- [x] Run `npm run build`.
- [x] Check for a free non-8080 port using `lsof -i :5173`; if occupied, try another port.
- [x] Start the Vite server on a free non-8080 port.
- [x] Manually verify:
  - Sarah login routes to supporter dashboard.
  - Khalid login routes to a different supporter dashboard.
  - Halima login routes to beneficiary dashboard.
  - Supporter-created case appears on supporter dashboard.
  - Receiver-created case appears on beneficiary dashboard.
  - Receiver can reach Women, Education, Legal, SME, Trade, and Healthcare pathways.
  - Impact dashboard global and account-specific views both render.
- [x] Mark completed waves in this plan as they are finished.
