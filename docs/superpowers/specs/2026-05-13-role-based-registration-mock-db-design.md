# Role-Based Registration and Mock DB Design

## Summary

The prototype needs a light functional layer that turns the current static role chooser, case creation wizard, supporter dashboard, beneficiary dashboard, and impact dashboard into coherent role-based demo flows.

The core change is to introduce mock users, mock cases, and session state. A user can register or select a demo login as either a supporter-side actor or receiver-side actor. Their selected account is stored in `localStorage`, dashboards filter to that account, and case creation adapts its questions and destination based on whether the active user is a supporter or receiver.

Use `localStorage` and small React utilities. Do not add Jotai for this phase. The app only needs demo persistence, seeded data, and predictable routing, not global state complexity.

## Product Direction

- Treat the existing vertical pages (`education`, `healthcare`, `women`, `legal`, `sme`, `traders`, `marketplace`) as service-pathway pages, not purely supporter pages.
- Keep them reachable from supporter navigation for case discovery, but also expose receiver-side entry points where relevant:
  - Receiver can browse pathway guidance for Women, Education, Legal, SME, Trade, Healthcare.
  - Supporter can browse cases and impact around the same pathways.
- Split the current supporter dashboard personas into separate demo accounts, not profile toggles inside one login.
- Split cases and impact by active user:
  - Supporter dashboard shows cases the active supporter funds, follows, or is recommended to review.
  - Receiver dashboard shows cases owned by the active receiver.
  - Impact dashboard can show global impact by default, with an account-specific view when a user is logged in.

## Interfaces and Data Model

Create a mock data layer under `src/data/`:

- `mockDb.js` exports seeded users, cases, activities, messages, documents, and impact ledger rows.
- `mockSession.js` wraps `localStorage` reads/writes for:
  - `ethos.activeUserId`
  - `ethos.activeRole`
  - `ethos.caseDrafts`
  - optional `ethos.registeredUsers`
- `mockQueries.js` exposes read helpers:
  - `getActiveUser()`
  - `getDashboardUrlForUser(user)`
  - `getCasesForSupporter(userId)`
  - `getCasesForReceiver(userId)`
  - `getImpactForUser(userId)`
  - `createCaseDraftFromIntake(input, user)`

Minimum user shape:

```js
{
  id: "supporter-sarah",
  side: "supporter",
  role: "supporter",
  name: "Dr Sarah Mahmoud",
  title: "Consultant Cardiologist",
  location: "Manchester, UK",
  initials: "SM",
  interests: ["healthcare"],
  dashboardPath: "/supporter"
}
```

Minimum case shape:

```js
{
  id: "K-2756",
  ownerUserId: "receiver-yasmin-family",
  supporterUserIds: ["supporter-sarah"],
  vertical: "healthcare",
  status: "verified",
  title: "Paediatric cardiac surgery",
  beneficiaryName: "Yasmin H.",
  location: "Cairo, Egypt",
  raised: 4200,
  target: 8400,
  partner: "Cleopatra Hospital",
  milestones: [],
  documents: [],
  messages: []
}
```

## Registration and Case Creation Behavior

Registration should become a two-path flow:

- **Supporter registration:** choose role, enter supporter identity, choose interests/corridors, choose demo login or create a local demo account, then route to `/supporter`.
- **Receiver registration:** choose receiver type (`beneficiary`, `family representative`, `SME/business owner`, `professional`, `student/patient`), enter basic identity and location, choose need pathway, then route either to `/create?mode=receiver` or `/beneficiary`.

Case creation should branch by active side:

- **Supporter-created case:** “I want to support someone.” Capture relationship, beneficiary details, support type, need description, supporting documents, pledge target, pledge frequency, then create a draft linked to the supporter and route to the supporter dashboard.
- **Receiver-created case:** “I need support / I am registering my situation.” Capture receiver type, current situation, desired outcome, urgency, documents available, verifier/ambassador contact, and optional estimated amount. Do not require pledge frequency. Create a draft owned by the receiver and route to the beneficiary dashboard.

The prototype may store drafts only in `localStorage`; they do not need full case detail pages unless included in the seeded mock DB. Newly created drafts should still appear in the relevant dashboard list with `pending verification` status.

## Navigation and Page Placement

- Keep existing supporter routes working to avoid breaking current demo links.
- Add receiver-accessible aliases for pathway pages, for example `/beneficiary/pathways/women`, `/beneficiary/pathways/education`, `/beneficiary/pathways/legal`, `/beneficiary/pathways/sme`, `/beneficiary/pathways/trade`, `/beneficiary/pathways/healthcare`.
- Reuse the existing page components where possible, but pass a `viewerSide` prop or infer from the route so CTA language changes:
  - supporter CTA: “Support this case”, “Request introduction”, “Pledge”
  - receiver CTA: “Start request”, “Prepare documents”, “Ask ambassador”, “View requirements”
- Provider marketplace can remain under supporter navigation, but receiver side should have a pathway to find relevant providers or required documents.

## Demo Acceptance Criteria

- Selecting one of the four supporter accounts lands on `/supporter` and shows only that supporter’s relevant cases and activity.
- Selecting a receiver account lands on `/beneficiary` and shows only that receiver’s cases, documents, messages, and next steps.
- Creating a supporter-side case creates a pending draft linked to the supporter and shows it on the supporter dashboard.
- Creating a receiver-side case creates a pending draft linked to the receiver and shows it on the beneficiary dashboard.
- The dashboard no longer includes a four-profile switcher inside one supporter session.
- Impact rows can be filtered by active user while preserving a global demo view.
- Women, education, legal, SME, trade, and healthcare pathway pages are reachable from receiver navigation or receiver dashboard.

## Assumptions

- This remains a prototype. No authentication, backend, payments, real uploads, or regulated workflows are added.
- `localStorage` is the source of truth for session and draft mutations.
- Seeded mock data remains the main way to show rich case-detail pages.
- New locally created cases appear as dashboard rows but may use a generic pending detail view if clicked.
- No new dependency is required; use React state, `localStorage`, and pure helper modules.
