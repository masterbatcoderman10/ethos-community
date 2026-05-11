# Prototype v2: SRS Gap Coverage Design Spec

**Date:** 2026-05-09
**Last revised:** 2026-05-11 — added two-sided architecture (Give vs Receive) per beneficiary-shell gap discovery
**Status:** Draft
**Source:** `docs/srs.md`

## Scope

This spec covers all modifications needed to bring the Ethos Community mock prototype into alignment with the Software Requirements Specification (SRS). All additions follow the existing prototype pattern: **static HTML + JSX + CSS, React/Babel loaded from CDN, hardcoded data, toast stubs for all interactive actions, no backend, no real flows.**

## Cross-cutting rule — Impeccable subagent review (added 2026-05-11)

Every plan derived from this spec **must** include, at the end of each major page or section task, a step that dispatches a subagent to run the `impeccable` skill (modes: `craft`, `critique`, `polish`, `adapt`, `delight` as relevant) against the just-completed work. The implementing developer's review is biased toward their own output; the subagent provides independent design critique. Findings are applied before the page/section is declared complete.

This rule applies to:
- Every new page (e.g., the 5 beneficiary pages in §4.0)
- Every major section addition (e.g., partner ecosystem strip in §5.1, finance-readiness section in §5.3)
- Every new shared component once integrated into its first consuming page
- Not required for trivial wiring tasks (relocation/path fixups, link updates).

The rule is also baked into `CLAUDE.md` and `AGENTS.md` at the project root.

---

## 1. Current State

The prototype is ~15 static HTML pages loading React 18.3.1 and Babel 7.29 from unpkg CDN at runtime — no build step, no backend, all data hardcoded. Navigation is via `<a href>` links between separate `.html` files. All interactive features are stubbed with `showToast()` notifications.

**Note (2026-05-11):** `role-chooser.html` and `case-creation.html` already shipped from a prior phase 1 plan and are not listed in §1.1 — they live at root and are reworked further by this spec (gate behavior + side-aware redirect).

### 1.1 Existing Pages

| Page | File(s) | Status |
|------|---------|--------|
| Landing/Marketing | `landing.html`, `app.jsx` | Done — hero (4 variants), service verticals, case study, how-it-works, founder, CTA, footer |
| Supporter Dashboard | `supporter-dashboard.html`, `supporter-dashboard.jsx` | Done — persona switcher, 6 cases with filtering, summary metrics, activity feed |
| Impact Dashboard | `impact-dashboard.html`, `impact-dashboard.jsx`, `impact-dashboard.css` | Done — stats, donut/bar charts, geo grid (14 countries), disbursement ledger, audit strip |
| Education & CPD | `education.html`, `education.jsx`, `education.css` | Done — hero, mentorship grid (6), CPD pathway (4 stages), credential vault, student list |
| Healthcare & Takaful | `healthcare.html`, `healthcare.jsx`, `healthcare.css` | Done — urgency bar, Takaful pools (3 tiers), active cases, clinical partners (4) |
| SME Recovery & Advisory | `sme-advisory.html`, `sme-advisory.jsx`, `sme-advisory.css` | Done — 6 SME cards, 4-stage workflow, 6 services, 8 advisors |
| Maryam Profile (Family) | `beneficiary-profile.html`, `beneficiary-profile.jsx`, `beneficiary-profile.css` | Done — Case K-2384, tabs (Story/Docs/Timeline/Supporters), partner sidebar |
| Awad Profile (Family) | `awad-profile.html`, `awad-profile.jsx` | Done — Case K-1908 |
| Yasmin Profile (Health) | `yasmin-profile.html`, `yasmin-profile.jsx` | Done — Case K-2756 |
| Dr Afaf Profile (SME) | `afaf-profile.html`, `afaf-profile.jsx` | Done — Case K-3014 |
| Ibrahim Profile (Education) | `ibrahim-profile.html`, `ibrahim-profile.jsx` | Done — Case K-2102 |
| Halima Profile (Women) | `halima-profile.html`, `halima-profile.jsx` | Done — Case K-2890 |
| IsDB Pitch Video | `isdb-pitch/` (HyperFrames) | Done — separate subproject, not covered here |

### 1.2 Shared Components (`shared.jsx`)

`Icon`, `Counter`, `Reveal`, `showToast`, `Nav`, `Footer`, `DemoTag`, `Photo`, `Avatar`

### 1.3 Design System

CSS custom properties across `.css` files. Color palette: cream paper (`--cream`), forest green (`--green`), gold (`--gold`), ink (`--ink`). Typography: Newsreader/Manrope (default), DM Serif/DM Sans, Instrument Serif/Inter Tight — switchable via `body[data-pair]`. WCAG 2.1 AA target. JetBrains Mono for data/labels.

### 1.4 Two-Sided Architecture (added 2026-05-11)

The prototype is a **two-sided platform** — Upwork-style. Every page belongs to one of three URL spaces:

| Space | Purpose | URL convention |
|---|---|---|
| **Neutral** (root) | Marketing, role-chooser, case-creation wizard, shared assets | `/landing.html`, `/role-chooser.html`, `/case-creation.html` |
| **Supporter side** (Give) | Browse-and-fund cases, view impact, browse providers | `/supporter/dashboard.html`, `/supporter/cases/maryam.html`, `/supporter/healthcare.html`, ... |
| **Beneficiary side** (Receive) | Manage own cases, verification, ambassador chat | `/beneficiary/dashboard.html`, `/beneficiary/my-cases.html`, ... |

**Role → side mapping (Give vs Receive split):**

| SRS role | Side |
|---|---|
| Diaspora Supporter | supporter |
| Mentor / Service Provider | supporter |
| Community Ambassador | supporter |
| Finance / Takaful Partner | supporter |
| Development Partner | supporter |
| Beneficiary | beneficiary |
| SME / Business Owner | beneficiary |

**Visual identity:** shared. Same design tokens, fonts, colors. Sides are differentiated by URL, nav link set, and a "You're in: <side>" badge in the nav — not by branding.

**Side state:**
- localStorage key `ethos.role` is written by role-chooser on Continue.
- Each page passes `<Nav side="supporter|beneficiary|neutral" />` explicitly. Nav reads localStorage only for the badge + the landing-page returning-user ribbon.
- URL (subdirectory) is the source of truth for which side a page belongs to. localStorage is just convenience.

**Switching sides:** every side nav has a "Switch role" link → `/role-chooser.html`. Picking a different role overwrites localStorage and redirects to the new side dashboard. No auth.

**Verticals (`education.html`, `healthcare.html`, `sme-advisory.html`, plus deferred `women-empowerment`, `legal-services`, `product-traders`, `provider-marketplace`) live under `/supporter/`** — they are browse-to-fund framing pages. Beneficiary side does not duplicate them; beneficiaries access services through the ambassador-mediated flow.

**Profiles (Maryam, Awad, Yasmin, Afaf, Ibrahim, Halima) live under `/supporter/cases/`** — they are public browse-to-fund pages. The beneficiary's own case view is a separate page (`/beneficiary/case-detail.html`) with editing affordances and funding-recipient framing, not a "Support this case" CTA.

---

## 2. SRS Gap Analysis

### 2.1 Screens/Pages Completely Missing

| # | SRS Requirement | Gap |
|---|----------------|-----|
| 1 | "Choose your role: supporter, beneficiary, mentor, provider, SME, community ambassador or partner" | No role selection or registration exists |
| 2 | "Create a support case: health, education, legal, women empowerment, SME recovery or family support" | CTA buttons fire toast stubs; no case creation screen |
| 3 | "Provider marketplace: clinics, mentors, universities, lawyers, accountants, advisers and finance partners" | Referenced in copy but no directory page |
| 4 | "Women empowerment pathway: CPD, mentorship, enterprise support and family resilience" | Only Halima's profile exists; no dedicated vertical page like education/healthcare/SME have |
| 5 | "Professional services and legal support marketplace" | No page at all — SRS service #6 |
| 6 | "Family support" as a dedicated vertical | Awad profile shows this use case but no vertical page |
| 7 | "SME finance-readiness dashboard" (SRS detail) | Existing SME page has 4-stage workflow but lacks cash-flow template, compliance checklist, finance referral panel |
| 8 | "Beneficiary registration" + beneficiary self-service surfaces (SRS service #1, role list) | **No beneficiary side exists.** Prototype is supporter-skewed: dashboard, profile views, impact are all browse-to-fund. A beneficiary cannot see their own cases, verification status, documents, or ambassador thread. |

### 2.2 Existing Pages Missing SRS Content

| Page | SRS Gap |
|------|---------|
| Landing | Business model not visible; partnership ecosystem not shown; Kushian/Ethos scalability messaging absent; "not a charity" positioning missing |
| Impact Dashboard | SRS wants: women reached, students supported, healthcare cases, SMEs supported, countries covered, verified support facilitated — some missing |
| Supporter Dashboard | No "purpose-linked" category classification visible on cases (health/education/rent/legal/etc) |
| SME Advisory | Needs cash-flow template, compliance checklist, finance referral panel to match "finance-readiness dashboard" description |
| All profile pages | "Support this case" fires generic toast; should link to case-creation mock flow |

### 2.3 Use Cases Not Represented

| Use Case | Status |
|----------|--------|
| UC1: Diaspora doctor → elderly parents (healthcare) | Represented (Yasmin) |
| UC2: Banker → university students (education) | Represented (Ibrahim cohort) |
| UC3: Legal adviser → displaced parents (Uganda) | **Missing — no legal services representation** |
| UC4: Widowed women → family resilience (North Sudan) | **Partially missing** — Halima covers women workforce, not widows/resilience |
| UC5: Woman dentist → clinic in Sharjah (SME) | Represented (Dr Afaf) |
| UC6: SME owner → working capital (Riyadh/Doha) | Partially — SME page covers recovery, not explicit working capital/compliance |
| UC7: Product traders → export supply chains | **Missing completely** |

### 2.4 Message/Narrative Gaps

| SRS Requirement | Current State |
|-----------------|---------------|
| "Not a charity app — scalable human-development infrastructure" | Landing reads more like a nonprofit |
| "Kushian is the Sudan pilot. Ethos Community is the scalable platform" | No Kushian branding visible anywhere |
| 6 partnership categories should be visible | Only healthcare (clinical partners) and SME (advisory bench) show partners |
| 7 stakeholder groups should be visible | Only supporters, beneficiaries, providers visible; community ambassadors, finance/Takaful partners, development partners, platform operator absent |
| 6 revenue streams should be acknowledged | Not shown anywhere |
| "Measurable human-development impact" | Impact dashboard exists but lacks SRS-specified breakdowns |

---

## 3. Modification Plan

### 3.1 Summary

| Action | Count | Phase |
|--------|-------|-------|
| Existing supporter pages relocated to `/supporter/*` | 11 (+ asset path fixups) | Phase 1 |
| New beneficiary-shell pages under `/beneficiary/*` | 5 | Phase 1 |
| `Nav` reworked with `side` prop + per-side link sets | 1 component | Phase 1 |
| Role-chooser gate behavior + landing returning-user ribbon + case-creation fork | 3 page edits | Phase 1 |
| New shared components for beneficiary shell (`CaseProgressBar`, `StatusPill`, `MessageBubble`) | 3 | Phase 1 |
| New mock pages (verticals + marketplace from §4.2–4.6) | 6 | Phase 2 |
| Existing pages modified per §5.1–5.4, §5.6 | 6 (plus 6 profile pages) | Phase 2 |
| Other shared components (§6.1–6.6, §6.10) | 7 | Phase 2 |
| New static data entities | ~40 | Phase 2 |

---

## 4. New Mock Pages

### 4.0 Beneficiary Shell — `/beneficiary/*` (added 2026-05-11)

Five new mock pages forming the receive-side experience. All hardcoded data, no real auth, all interactive actions stub via `showToast()`. Mock identity: **Halima M.** (existing case `K-2890`) — the same identity is reused across the shell so cross-links resolve sensibly.

#### 4.0.1 `/beneficiary/dashboard.html` + `.jsx` + `.css`

**Content:**
- Greeting hero: "Welcome back, Halima" + verification status badge (`Verified` / `Pending review` / `Action needed`)
- 3-up stat row: Active Cases, Funds Raised (with target), Supporters
- "Your Cases" section: 2 case cards, each with progress bar, status pill, supporter avatar stack, "View case" CTA → `case-detail.html`
- "Next Steps" panel: checklist (3-4 items, mix of statuses) — "Complete documents", "Respond to ambassador", "Share case link"
- "Recent Activity" feed: 5-6 items — supporter pledges, ambassador notes, document approvals
- Right rail: assigned ambassador card (name, photo, "Message" CTA → `messages.html`)

#### 4.0.2 `/beneficiary/my-cases.html` + `.jsx` + `.css`

**Content:**
- Header: "My Cases" + "+ New Case" CTA → `/case-creation.html`
- Filter chips: All / Pending / Verified / Funded / Completed
- 2-3 case rows: case ID, title, category text label (PurposeBadge component is phase 2 — phase 1 uses a plain text category in JetBrains Mono), progress bar, status pill, supporter count, last update timestamp
- Empty state for filter combinations with no matches

#### 4.0.3 `/beneficiary/case-detail.html` + `.jsx` + `.css`

Single mock case rendered (Halima K-2890). **Distinct from `/supporter/cases/halima.html`** — funding-recipient framing, no "Support this case" CTA.

**Content:**
- Header: case ID, status pill, funding bar (raised / target), "Edit Case" + "Share Case" CTAs (both fire toast)
- Tabs: Overview / Funding / Documents / Updates
- Overview: own narrative + ambassador-verified note
- Funding tab: supporter list (avatars + amounts, "Anonymous" option for some), pledge timeline
- Documents tab: per-doc cards (status, "Replace" stub, ambassador note if rejected)
- Updates tab: thread of system notes + ambassador messages

#### 4.0.4 `/beneficiary/documents.html` + `.jsx` + `.css`

**Content:**
- Header: "Verification Documents" + overall status summary (e.g., "3 of 5 verified")
- Required-docs checklist using `StatusDot` (complete / in-progress / pending)
- Per-doc card: name, description, status, "Upload" or "Replace" stub button (fires toast), ambassador note panel if rejected
- "Submit for Re-verification" CTA at bottom → fires toast

#### 4.0.5 `/beneficiary/messages.html` + `.jsx` + `.css`

**Content:**
- Two-pane layout: conversation list (left, 1 thread for mock) + active thread (right)
- Mock conversation with assigned ambassador "Fatima O." — 5-7 messages mixing system notes, ambassador questions, beneficiary responses
- Message composer at bottom: textarea + Send button (fires toast)
- New shared component: `MessageBubble` (sender variant: `ambassador` / `me` / `system`)

**Design follow:** Same cream + green palette. Reuses `Nav` (with `side="beneficiary"`), `Footer`, `DemoTag`, `Avatar`, `Icon`, `StatusDot`, `Counter`. Adds three new shared components: `CaseProgressBar`, `StatusPill`, `MessageBubble` (see §6).

### 4.1 Role Chooser — `role-chooser.html` + `.jsx` + `.css`

Mock role-selection gate screen. First screen in the user journey, before the landing.

**Content:**
- Header: "How would you like to engage with Ethos Community?" with subtitle about selecting a role
- 7 `RoleCard` tiles in a responsive grid (3 columns desktop, 2 tablet, 1 mobile):
  1. **Diaspora Supporter** — "Support your family and community with verified, purpose-linked pathways"
  2. **Beneficiary** — "Register yourself or a family member for verified support access"
  3. **Mentor / Service Provider** — "Offer your professional skills, mentorship, or services to the community"
  4. **SME / Business Owner** — "Access recovery support, finance-readiness, and advisory services"
  5. **Community Ambassador** — "Help verify needs, onboard users, and build local trust"
  6. **Finance / Takaful Partner** — "Provide regulated financial, health, and risk-protection pathways"
  7. **Development Partner** — "NGOs, foundations, and public-sector stakeholders"
- Each card has: icon (from existing `Icon` set), title, description, "Select Role" button
- Clicking "Select Role" fires `showToast("Role selected: [name] — Registration coming next")` and visually marks the card as selected (green border/fill)
- **Continue button (gate behavior, added 2026-05-11):** writes `localStorage.setItem("ethos.role", id)` and redirects to the role's side dashboard per the role→side map in §1.4 (supporter roles → `/supporter/dashboard.html`, beneficiary/SME → `/beneficiary/dashboard.html`)
- If localStorage already has a role on page load, pre-highlight that card and show a passive "Continue as <Role>" link in the footer for one-click return
- "Skip — Continue as Guest" link at bottom → navigates to `landing.html`
- Collapsible "Sign Up" section at bottom: name, email, role dropdown (pre-filled from selection), password fields + document upload zone placeholder — submit button fires toast
- **No real auth or registration logic**

**Design follow:** Same cream + green palette. Cards follow existing vertical card pattern from landing page. 4:5 aspect ratio not required for role cards — use a compact square/proportionate card.

### 4.2 Case Creation Wizard — `case-creation.html` + `.jsx` + `.css`

Mock multi-step case creation wizard. Replaces the toast stubs that currently fire from all "Create Case", "Start Support", "Pledge Now" CTA buttons across the prototype.

**Content:**
- `StepWizard` component with 5 steps and horizontal progress bar at top
- **Step 1 — Support Type:** 6 cards in a grid (Health, Education, Legal, Women Empowerment, Family Support, SME Recovery). Clicking one advances to step 2 with visual selection.
- **Step 2 — Beneficiary Details:** Pre-filled static form: name field, location dropdown (Sudan, Egypt, UAE, KSA, Qatar, Uganda, UK, Other), beneficiary category radio (Family Member, Student, Patient, Professional, SME, Other). All fields non-functional.
- **Step 3 — Need Description:** Textarea placeholder with sample text, document upload zone (dashed border, "Drag files or click to upload" — no actual upload, clicking fires toast), suggested document list (ID, proof of need, proof of relationship).
- **Step 4 — Funding:** Pledge target display (static: "$0 — enter amount"), frequency selector (one-time/monthly), bank/wallet info placeholder ("Will be collected after verification").
- **Step 5 — Confirmation:** Success card with auto-generated case ID (e.g., "K-3891"), summary of selections, "Your case has been submitted for verification. A community ambassador will review it within 48 hours.", "Return to Dashboard" button → **side-aware redirect (added 2026-05-11):** reads `localStorage.ethos.role`, computes side, links to `/supporter/dashboard.html` or `/beneficiary/dashboard.html` (defaults to supporter if unset).
- All Next/Submit/Save actions fire toasts. Navigation between steps is React `useState` only.
- Progress bar fills proportionally with each step; completed steps show checkmarks.
- "Cancel" link at bottom → back to previous page (via `window.history.back()` or hardcoded fallback).

**Design follow:** Cream background, green primary buttons, gold accents on active step. Step labels under progress bar in JetBrains Mono.

**Link updates:** All existing "Create Case" / "Start Support" / "Pledge Now" buttons on all pages change `href` to `case-creation.html` (or still fire toast, but with updated copy referencing the case creation flow).

### 4.3 Provider Marketplace — `provider-marketplace.html` + `.jsx` + `.css`

Mock curated provider directory matching SRS service #6 description.

**Content:**
- Hero strip: "Provider Marketplace" heading + "Verified professionals, clinics, institutions, and advisers serving Sudanese diaspora and displaced communities" subtitle
- Category filter tabs (horizontal scrollable row): All, Clinics & Hospitals, Mentors & Coaches, Universities & Training, Lawyers, Accountants & Auditors, Tax Advisers, Immigration & Documentation, Property & Inheritance, Business Consultants, Finance Partners, Takaful & Insurance
- Search bar (non-functional — on submit fires toast "Search: [query]")
- Provider cards grid (~18-20 hardcoded entries) with:
  - `ProviderCard` component
  - Name, category tag, location
  - Verified badge (green shield icon for verified, gold circle for pending)
  - Rating stars (static, 3.5–5.0)
  - Short description (1-2 lines)
  - "Request Introduction" button — fires toast `"Introduction request sent for [provider name]"`
- Static data should include providers from each category, geographically distributed across diaspora corridors (UAE, KSA, Egypt, UK, USA, Qatar, Uganda)
- "Become a Listed Provider" CTA section at bottom — "Join our verified provider network" with toast button
- **No real search, filter, or messaging**

**Design follow:** Three-column card grid. Cards follow existing case-card pattern with verified badge. Category tabs styled as pill buttons, green for active.

### 4.4 Women Empowerment — `women-empowerment.html` + `.jsx` + `.css`

Mock vertical page covering SRS service #5. Matches the layout pattern of `education.html`, `healthcare.html`, and `sme-advisory.html`.

**Content:**
- Hero: "Women Empowerment & Family Resilience" heading, subtitle about dignified pathways for women, static stats counter (X women supported, Y widows reached, Z women-led SMEs)
- 5 pathway cards in a horizontal grid:
  1. **Widows Support** — Living support, legal documentation, family stability
  2. **Female-Headed Household Resilience** — Income generation, children's education, rent support
  3. **Women CPD & Certification** — Professional development, credential preservation, AAOIFI/industry certifications
  4. **Women-Led SME Support** — Business setup, licensing, finance-readiness, marketplace access
  5. **Family Resilience** — Combined health, education, and living support for vulnerable families
- Each pathway card: icon, title, description, "Learn More" toast button
- **Active Cases** section: 4-5 case cards including Halima M. (Case K-2890, existing profile link) and 3-4 new women-focused cases (e.g., Fatima — widowed mother of 3 in Kassala, Amira — displaced nurse seeking CPD in Cairo, Nour — women-led textile cooperative in Omdurman)
- **Mentor Matching** section: grid of 4 women mentors (reuse existing mentor card pattern from education page) — Sudanese women professionals in diaspora (doctor in London, accountant in Dubai, lawyer in Riyadh, professor in Doha)
- **Takaful Referral** card: link to healthcare page's Takaful pools
- "Start a Women's Case" CTA button → links to `case-creation.html`

**Design follows:** Same hero pattern as healthcare/education/SME pages. Counters use existing `Counter` component. Pathway cards use existing vertical card pattern from landing. Case cards reuse existing case card component style.

### 4.5 Legal Services — `legal-services.html` + `.jsx` + `.css`

Mock professional services marketplace page covering SRS service #6 and UC3.

**Content:**
- Hero: "Professional & Legal Services" heading, "Trusted advisers for documentation, residency, inheritance, compliance, and business setup across diaspora corridors"
- 8 service category cards in grid:
  1. Legal Advisory
  2. Accounting & Audit
  3. Tax Advisory
  4. Immigration Support
  5. Documentation Services
  6. Property & Inheritance
  7. Compliance & Licensing
  8. Business Setup
- Each card: icon, title, description, count of listed practitioners ("12 practitioners")
- **Practitioner Listing** section: ~12 cards with:
  - Name, specialization, location, jurisdiction badge(s)
  - Languages: Arabic, English (some with French)
  - Verification status: "Verified" (green) or "Pending Review" (gold)
  - "Request Consultation" button — fires toast
- **Featured Case** panel: UC3 representation — "Supporting Displaced Parents in Uganda" case card with static narrative about a Sudanese legal professional in Saudi Arabia connecting parents in Uganda with local legal/documentation support
- "List Your Practice" CTA → fires toast

**Design follows:** Two-column layout for practitioner cards (name/avatar on left, details on right). Service category cards follow compact card pattern. Jurisdiction badges as small outlined pills.

### 4.6 Product Traders — `product-traders.html` + `.jsx` + `.css`

Mock trade corridor support page representing UC7.

**Content:**
- Hero: "Trade Corridor Recovery" heading, "Protecting Sudanese export livelihoods — from sesame to baobab" subtitle
- 4 product category cards:
  1. **Sesame** — "Sudan's largest agricultural export, disrupted by conflict"
  2. **Arabic Gum** — "Critical global supply chain ingredient"
  3. **Karkadi (Hibiscus)** — "Premium dried hibiscus for global beverage markets"
  4. **Baobab** — "Emerging superfood with growing European demand"
- Each card: product image placeholder (reuse existing `Photo` component), description, trade volume indicator (static), buyer interest level (low/medium/high badge)
- **Trade Corridor Map** visual: decorative static map (Sudan → Cairo, Dubai, Riyadh, London, Rotterdam, Singapore) — CSS/SVG decorative, not interactive
- **Trader Profiles** section: ~6 cards with:
  - Business name, product, location
  - Export-readiness status badge: "Export Ready", "Documentation Pending", "Early Stage"
  - Buyer introduction indicator
  - Finance-readiness checklist stub (reuse `Checklist` component)
- Each trader card has "Request Support" button → fires toast
- **Documentation Support** panel: static checklist (export license, phytosanitary certificate, certificate of origin, commercial invoice, packing list, bill of lading)
- **Finance-Readiness Referral** panel: matches the SME page's finance referral pattern — Islamic trade finance, export credit, working capital
- "Profile Your Export Business" CTA → fires toast

**Design follows:** Product cards follow existing case card pattern but with product imagery. Map is purely decorative. Checklist uses new `Checklist` component.

---

## 5. Existing Pages to Modify

### 5.0 Relocate Supporter-Side Pages to `/supporter/` (added 2026-05-11)

All existing supporter-skewed pages move into the `/supporter/` subdirectory to match the two-sided URL convention from §1.4. This is mechanical relocation + asset path fixups; no content changes.

**File moves:**

| From (root) | To |
|---|---|
| `supporter-dashboard.html` + `.jsx` | `supporter/dashboard.html` + `dashboard.jsx` |
| `impact-dashboard.html` + `.jsx` + `.css` | `supporter/impact.html` + `impact.jsx` + `impact.css` |
| `education.html` + `.jsx` + `.css` | `supporter/education.html` + `education.jsx` + `education.css` |
| `healthcare.html` + `.jsx` + `.css` | `supporter/healthcare.html` + `healthcare.jsx` + `healthcare.css` |
| `sme-advisory.html` + `.jsx` + `.css` | `supporter/sme-advisory.html` + ... |
| `beneficiary-profile.html` + `.jsx` + `.css` (Maryam) | `supporter/cases/maryam.html` + ... |
| `awad-profile.html` + `.jsx` | `supporter/cases/awad.html` + `awad.jsx` |
| `yasmin-profile.html` + `.jsx` | `supporter/cases/yasmin.html` + `yasmin.jsx` |
| `afaf-profile.html` + `.jsx` | `supporter/cases/afaf.html` + `afaf.jsx` |
| `ibrahim-profile.html` + `.jsx` | `supporter/cases/ibrahim.html` + `ibrahim.jsx` |
| `halima-profile.html` + `.jsx` | `supporter/cases/halima.html` + `halima.jsx` |

**Stay at root (neutral surfaces):**
- `landing.html` + `app.jsx`
- `role-chooser.html` + `.jsx` + `.css`
- `case-creation.html` + `.jsx` + `.css`
- `index.html` (redirects to `landing.html`)
- `showcase.html` (development tool, not user-facing)
- `shared.jsx`, `styles.css`, `tweaks-panel.jsx`
- `favicon.svg`, `images/`, `uploads/`

**Per-file fixups in moved files:**
- `<link rel="stylesheet" href="styles.css">` → `href="../styles.css"` (and `../../styles.css` for `/supporter/cases/*.html`)
- `<script type="text/babel" src="shared.jsx">` → `../shared.jsx` (or `../../shared.jsx` for case profiles)
- `<link rel="icon" type="image/svg+xml" href="favicon.svg">` → `href="../favicon.svg"` (or `../../favicon.svg` for case profiles)
- Per-page CSS files moved alongside their HTML; references stay relative (`href="dashboard.css"`)
- Image references (`images/...`) → `../images/...` or `../../images/...`
- All inter-page anchor links update to new paths (e.g., `href="impact-dashboard.html"` → `href="impact.html"` within `/supporter/`, or `href="../landing.html"` going back to root)

**`<Nav />` calls:** every relocated page passes `<Nav side="supporter" />`. Profile pages under `/supporter/cases/` likewise.

**Done before 5.1–5.6 work in this spec.** All §5.1–5.6 modifications then apply to the relocated files at their new paths.

### 5.1 Landing Page — `landing.html` + `app.jsx`

Three new sections inserted into the existing page structure.

**5.1.1 Partner Ecosystem section** (inserted between How-It-Works and Founder Bio)

- Section heading: "An Ecosystem of Trusted Partners"
- Subtitle: "Ethos Community connects diaspora supporters with verified providers, finance partners, and community institutions"
- 6 partner category cards in a responsive grid (3x2):
  1. **Technology Partner** — iWire emblem, "Web, mobile, and dashboard development"
  2. **Payment & Fintech Partners** — "Regulated payment flows, wallets, and remittance integration"
  3. **Healthcare & Takaful Partners** — "Clinics, hospitals, telemedicine, and cooperative insurance"
  4. **Education & CPD Partners** — "Universities, online learning, and professional certification"
  5. **Professional Service Partners** — "Lawyers, accountants, auditors, tax and immigration advisers"
  6. **Community Partners** — "Diaspora associations, women networks, student groups, NGOs"
- Use existing card styling pattern. Each card: icon, title, description. No interactive elements — purely informational.

**5.1.2 Revenue Model strip** (before the dark CTA band)

- Compact horizontal strip: "This is not a charity app — it is scalable human-development infrastructure"
- 6 revenue stream pills: Platform Fees, Subscriptions, Referral Commissions, Training & CPD, SME Advisory, White-Label Licensing
- Styled as a row of small outlined pills/badges, informational only
- "Learn about our model" link fires toast

**5.1.3 Branding additions**

- Navigation bar: Add "Kushian™" badge (small green pill) next to logo, with tooltip "Sudan Pilot · Powered by Ethos Community™"
- Hero section: Add small "Kushian™ — Sudan Pilot" eyebrow text above the main hero heading (depending on which hero variant is active)
- After the revenue strip, add a scalability message band: "Scalable across 57 OIC member countries" with a row of country-name pills (Sudan, Yemen, Palestine, Syria, Somalia, Iraq, Libya...)

**5.1.4 Copy hardening**

Light edits to key copy strings across the page to shift tone from charity/nonprofit to infrastructure/investment:
- "Support" → "Verified support" or "Purpose-linked support"
- "Help" → "Enable" or "Facilitate"
- "Give back" → "Create measurable outcomes"
- "Donation" → "Verified contribution"
- Hero subtitle adjusted to include "converting informal diaspora support into verified, purpose-linked and measurable outcomes"

### 5.2 Impact Dashboard — `impact-dashboard.html` + `.jsx` + `.css`

**New metric cards** added to the existing stats strip:
- Women Reached (static number, `Counter` component)
- Students Supported (static number, `Counter` component)
- Healthcare Cases Facilitated (static number, `Counter` component)

**New section:** "Verticals Impacted" — 6 tiles in a row (Education, Health, Family Support, Women, SME Recovery, Legal) — each with a count and the `PurposeBadge` component

**Existing modifications:**
- Add "Countries Covered" highlighted count (already partially covered by geo grid, add explicit count card)
- Add "Verified Support Facilitated" aggregate total card at the top of the stats row
- Rename existing metric labels to match SRS language where needed

All values remain hardcoded. No real data binding.

### 5.3 SME Advisory — `sme-advisory.html` + `.jsx` + `.css`

Three new sections added below the existing 4-stage recovery workflow (or replacing/reorganizing it):

**5.3.1 Finance-Readiness Checklist**
- `Checklist` component with 6 items:
  - Business Registered — status: complete (green check)
  - Licensed & Permitted — status: complete (green check)
  - Tax Compliant — status: in-progress (gold clock)
  - Audited Financials — status: in-progress (gold clock)
  - Cash-Flow Statement Ready — status: pending (grey)
  - Finance Partner Matched — status: pending (grey)
- "Download Readiness Guide" button fires toast

**5.3.2 Cash-Flow Snapshot**
- Decorative visual: a simple horizontal bar or table representation of cash-flow (revenue, costs, net) — static numbers, not interactive
- Styled as a data card with JetBrains Mono numbers

**5.3.3 Finance Referral Panel**
- 4 partner option cards:
  1. Islamic Murabaha Financing — "Asset-backed, Sharia-compliant"
  2. Microfinance — "Small-scale working capital"
  3. Development Finance — "IsDB member-country facilities"
  4. Trade Finance — "Export/import credit lines"
- Each has "Apply for Referral" button → fires toast
- Matches the existing partner card pattern from healthcare page

**Existing content preserved:** SME cards, advisory bench, and service line cards remain intact.

### 5.4 Supporter Dashboard — `supporter-dashboard.html` + `.jsx`

**5.4.1 Purpose Badges on Case Cards**
- Add `PurposeBadge` component to each case card in the case list
- Color coding: Health (blue), Education (green), Family Support (gold), Legal (purple), Emergency (red), Training (teal), SME (orange), Women (pink)
- Badge positioned at top-right of each case card or as a small pill next to the case title

**5.4.2 Create Case Button**
- Add prominent "Create New Case" button in the header area (next to or replacing the existing "+ New Case" if exists)
- Links to `case-creation.html`

**5.4.3 Empty State Guidance**
- Add a `useState` toggle for demo: "Show Empty State" (default off, toggled in UI or via URL param `?empty=1` for demo)
- Empty state shows 3-step beginner guidance: "1. Choose your role", "2. Create your first support case", "3. Track verified outcomes on the impact dashboard"
- "Get Started" button → links to role-chooser or case-creation

### 5.5 Navigation — `shared.jsx` (`Nav` component)

**Restructured for two-sided architecture (added 2026-05-11):** `Nav` accepts a required `side` prop (`"supporter" | "beneficiary" | "neutral"`). Each page passes its own value explicitly. Link sets differ per side; visual styling is identical.

**`side="supporter"` link set:**
- Dashboard → `/supporter/dashboard.html`
- Education → `/supporter/education.html`
- Healthcare → `/supporter/healthcare.html`
- SME Advisory → `/supporter/sme-advisory.html`
- Impact → `/supporter/impact.html`
- *(phase 2 additions)* Provider Marketplace → `/supporter/provider-marketplace.html`, Women Empowerment → `/supporter/women-empowerment.html`, Legal Services → `/supporter/legal-services.html`, Export Traders → `/supporter/product-traders.html`
- Primary CTA: "Create Case" → `/case-creation.html`
- Right-side badge: `You're in: Supporter · Switch role` → `/role-chooser.html`

**`side="beneficiary"` link set:**
- Dashboard → `/beneficiary/dashboard.html`
- My Cases → `/beneficiary/my-cases.html`
- Documents → `/beneficiary/documents.html`
- Messages → `/beneficiary/messages.html`
- Primary CTA: "Create Case" → `/case-creation.html`
- Right-side badge: `You're in: Beneficiary · Switch role` → `/role-chooser.html`

**`side="neutral"` link set** (used by `landing.html`, `role-chooser.html`, `case-creation.html`):
- Home → `/landing.html`
- Get Started → `/role-chooser.html`
- No side badge

**If space is constrained on supporter side**, group vertical pages (Education, Healthcare, SME, Women, Legal) under a "Verticals" dropdown, keeping Dashboard and Impact as primary links.

**Branding addition (phase 2):** Add `KushianBadge` component near the logo (left side of nav): "Kushian™" pill. Renders on all sides.

### 5.6 All 6 Profile Pages

Uniform changes across `beneficiary-profile.html`, `awad-profile.html`, `yasmin-profile.html`, `afaf-profile.html`, `ibrahim-profile.html`, `halima-profile.html`:

- "Support this case" / "Become a supporter" / "Pledge now" buttons: keep firing toast, but update toast copy to reference case-creation: *"To support this case, create a support case →"*
- Add "Similar Cases" row at bottom of each profile:
  - Maryam/Awad → link to each other (both family support)
  - Yasmin → link to healthcare page
  - Dr Afaf → link to SME advisory page and product-traders page
  - Ibrahim → link to education page
  - Halima → link to women-empowerment page
- 3-4 hardcoded similar case links per profile
- No structural changes to tab layouts, document checklists, timelines, or supporter grids

---

## 6. New Shared Components

All added to `shared.jsx`. Follow existing component patterns (React function components, no hooks beyond `useState`/`useEffect`/`useRef`, CSS inline or via companion `.css` files).

### 6.1 `RoleCard`

```jsx
<RoleCard icon="user" title="Diaspora Supporter" desc="..." onSelect={fn} selected={bool} />
```

- Image area with `Icon` component
- Title, description paragraph
- "Select Role" button
- `selected` state: green border + light green background tint
- Clicking fires `onSelect` callback (default: toast + toggle selected)

### 6.2 `StepWizard`

```jsx
<StepWizard steps={[{label, content}]} currentStep={n} onStepChange={fn} />
```

- Horizontal progress bar with step dots/labels
- Each step: dot (filled if active/complete, outlined if future), label below
- Connecting lines between dots
- Content area renders `steps[currentStep].content`
- "Next" and "Back" buttons. "Next" on last step becomes "Submit"
- All transitions fire `onStepChange(stepIndex)` — default: `useState` in parent
- "Submit" fires toast

### 6.3 `ProviderCard`

```jsx
<ProviderCard name="..." category="..." verified={bool} location="..." rating={4.5} desc="..." />
```

- Category tag pill (top)
- Name (heading)
- Location (small text)
- Verified badge: green shield icon + "Verified" or gold circle + "Pending"
- Rating stars (static display, non-interactive)
- Description (1-2 lines)
- "Request Introduction" button → fires toast

### 6.4 `Checklist`

```jsx
<Checklist items={[{label: "Business Registered", status: "complete"}]} />
```

- List of items with status icon on the left
- Status values: `complete` (green check), `in_progress` (gold clock), `pending` (grey circle)
- Label text
- Purely display — no checkboxes, no interactive state
- Compact styling, JetBrains Mono for status, body font for labels

### 6.5 `PurposeBadge`

```jsx
<PurposeBadge category="health" />
```

- Small colored pill/badge
- Category mapping:
  - `health` → blue background
  - `education` → green background
  - `family` → gold background
  - `legal` → purple background
  - `emergency` → red background
  - `training` → teal background
  - `sme` → orange background
  - `women` → pink background
- Text label: title-case display name of category
- Rendered as inline pill, small font size (12-13px), JetBrains Mono optional

### 6.6 `PartnershipStrip`

```jsx
<PartnershipStrip partners={[{name, desc, icon}]} />
```

- Horizontal row of partner cards/logos
- Simplified version for the landing page partner section
- Each partner: icon area, name, description
- Non-interactive, purely informational display
- Can render as a grid (inherit parent grid layout) or a flex row with gaps

### 6.7 `CaseProgressBar` (added 2026-05-11)

```jsx
<CaseProgressBar raised={4200} target={8000} />
```

- Horizontal bar showing fill ratio
- Numeric label above or below: `$4,200 raised · $3,800 to go` (JetBrains Mono)
- Reuses `--green` for fill, `--cream-2` for track, 6px height, rounded ends
- Used on beneficiary dashboard, my-cases, case-detail; also reusable on supporter case cards

### 6.8 `StatusPill` (added 2026-05-11)

```jsx
<StatusPill status="verified" />
```

- Small pill displaying case lifecycle state
- Status values: `draft`, `pending`, `verified`, `funded`, `completed`, `action_needed`
- Color mapping: pending → gold, verified → green, funded → blue, completed → muted green, action_needed → red, draft → muted
- Used on beneficiary case cards, case-detail header, dashboard greeting

### 6.9 `MessageBubble` (added 2026-05-11)

```jsx
<MessageBubble sender="ambassador" name="Fatima O." timestamp="2h ago">
  Documents look good. One question on the medical referral letter…
</MessageBubble>
```

- Sender variants: `ambassador`, `me`, `system`
- `me` aligned right, green tint; `ambassador` aligned left, cream-2 tint; `system` centered, muted, no avatar
- Avatar slot (left/right per variant), name + timestamp metadata
- Used only on `/beneficiary/messages.html` for now; reusable for supporter↔beneficiary messaging in later phases

### 6.10 `KushianBadge`

```jsx
<KushianBadge variant="pilot" />
```

- Variants:
  - `"pilot"` — "Kushian™" small pill (green background, cream text)
  - `"full"` — "Kushian™ · Sudan Pilot" (slightly wider)
  - `"powered"` — "Powered by Ethos Community™" (cream background, green text, thin border)
- Rendered as an inline `<span>` with padding and rounded corners
- Used in nav bar, hero sections, and footer

---

## 7. Static Data Entities

All hardcoded within their respective JSX files. No external data fetching.

### 7.1 New Cases (Women Empowerment)

| ID | Name | Category | Description |
|----|------|----------|-------------|
| K-2890 | Halima M. | Women CPD | Finance returnship, AAOIFI CPD (existing — link to profile) |
| K-3120 | Fatima A. | Widows Support | Widowed mother of 3, Kassala, living support + children's education |
| K-3275 | Amira A. | Women CPD | Displaced nurse seeking CPD recertification in Cairo |
| K-3401 | Nour H. | Women SME | Women-led textile cooperative, Omdurman, seeking market access |
| K-3580 | Samira K. | Family Resilience | Female-headed household, Port Sudan, combined health + education support |

### 7.2 Providers (Marketplace)

~20 entries across categories, geographically distributed. Representative sample:

| Name | Category | Location | Verified | Rating |
|------|----------|----------|----------|--------|
| Cleopatra Hospital | Clinic | Cairo, Egypt | Yes | 4.8 |
| Sudan Doctors Network | Clinic | Dubai, UAE | Yes | 4.6 |
| Dr Rasha Salim | Mentor | London, UK | Yes | 5.0 |
| Prof Khalid Mahmoud | Mentor | Doha, Qatar | Yes | 4.9 |
| Al-Neel Legal Consultancy | Lawyer | Riyadh, KSA | Yes | 4.7 |
| Nile Accounting Group | Accountant | Dubai, UAE | Yes | 4.5 |
| Dar Immigration Services | Immigration | Cairo, Egypt | Yes | 4.3 |
| Heritage Property Law | Property | London, UK | Yes | 4.6 |
| Ibn Khaldun Tax Advisory | Tax | Jeddah, KSA | Pending | 4.2 |
| ... (10+ more across categories) |

### 7.3 Legal Practitioners

12 entries as specified in section 4.5.

### 7.4 Product Traders

6 entries as specified in section 4.6.

### 7.5 Partner Ecosystem

6 partner categories with static descriptions as specified in section 5.1.1.

---

## 8. Design Consistency Rules

All new work must follow:

- **Color palette:** Same CSS custom properties (`--cream`, `--green`, `--gold`, `--ink`, `--muted`, `--line`, `--red`, `--blue`). No new colors without justification.
- **Typography:** Same system — Newsreader/Manrope (default pair), DM Serif/DM Sans, Instrument Serif/Inter Tight. JetBrains Mono for data, labels, eyebrow text. All new pages get `body[data-pair]` support.
- **Spacing:** Follow existing patterns (generous padding, 24-48px gaps between sections, 16px card gaps).
- **Components:** Reuse `Nav`, `Footer`, `DemoTag`, `Icon`, `Counter`, `Reveal`, `Photo`, `Avatar` from `shared.jsx` instead of reimplementing.
- **Cards:** Follow existing card patterns — rounded corners (`--round`), cream backgrounds with muted borders, subtle hover effects.
- **Buttons:** Green primary (`--green`), gold secondary (`--gold`), cream ghost. Same size/padding conventions.
- **WCAG 2.1 AA:** Maintain sufficient color contrast. No text smaller than 12px for body copy.
- **Toast:** All interactive actions use the existing `showToast()` function from `shared.jsx`.

---

## 9. File Manifest

**Restructured 2026-05-11 to reflect two-sided directory split.** Reads top-down by directory.

### 9.1 Final Directory Layout

```
/
├── index.html                  redirect → landing.html (unchanged)
├── landing.html                MODIFY (sections added, copy edits, returning-user ribbon)
├── app.jsx                     MODIFY (partner section, revenue strip, scalability band, ribbon logic)
├── role-chooser.html           MODIFY (gate behavior — write localStorage, redirect)
├── role-chooser.jsx            MODIFY (Continue button writes localStorage + redirects per role→side map)
├── role-chooser.css            unchanged
├── case-creation.html          unchanged
├── case-creation.jsx           MODIFY (side-aware submit + cancel redirect)
├── case-creation.css           unchanged
├── shared.jsx                  MODIFY (Nav side prop + per-side link sets, new components)
├── styles.css                  MODIFY (styles for new components + side badge)
├── showcase.html               unchanged
├── tweaks-panel.jsx            unchanged
├── favicon.svg                 unchanged
├── images/                     unchanged
├── uploads/                    unchanged
│
├── supporter/                  RELOCATE — all existing supporter pages move here
│   ├── dashboard.html          (was supporter-dashboard.html) — relocate + path fixups + Nav side="supporter" + §5.4 modifications
│   ├── dashboard.jsx           ditto (note: no .css — uses styles.css)
│   ├── impact.html             (was impact-dashboard.html) + §5.2 modifications
│   ├── impact.jsx              ditto
│   ├── impact.css              ditto
│   ├── education.html          relocate + path fixups + Nav side="supporter"
│   ├── education.jsx           ditto
│   ├── education.css           ditto
│   ├── healthcare.html         ditto
│   ├── healthcare.jsx          ditto
│   ├── healthcare.css          ditto
│   ├── sme-advisory.html       relocate + §5.3 modifications
│   ├── sme-advisory.jsx        ditto
│   ├── sme-advisory.css        ditto
│   ├── women-empowerment.html  NEW (deferred to phase 2 per §5.0 scope)
│   ├── women-empowerment.jsx   NEW (phase 2)
│   ├── women-empowerment.css   NEW (phase 2)
│   ├── legal-services.html     NEW (phase 2)
│   ├── legal-services.jsx      NEW (phase 2)
│   ├── legal-services.css      NEW (phase 2)
│   ├── product-traders.html    NEW (phase 2)
│   ├── product-traders.jsx     NEW (phase 2)
│   ├── product-traders.css     NEW (phase 2)
│   ├── provider-marketplace.html  NEW (phase 2)
│   ├── provider-marketplace.jsx   NEW (phase 2)
│   ├── provider-marketplace.css   NEW (phase 2)
│   └── cases/
│       ├── maryam.html         (was beneficiary-profile.html) + §5.6 modifications
│       ├── maryam.jsx          ditto
│       ├── maryam.css          ditto (only Maryam has its own .css; others use styles.css)
│       ├── awad.html           relocate + §5.6 (no .css)
│       ├── awad.jsx            ditto
│       ├── yasmin.html         relocate + §5.6 (no .css)
│       ├── yasmin.jsx          ditto
│       ├── afaf.html           relocate + §5.6 (no .css)
│       ├── afaf.jsx            ditto
│       ├── ibrahim.html        relocate + §5.6 (no .css)
│       ├── ibrahim.jsx         ditto
│       ├── halima.html         relocate + §5.6 (no .css)
│       └── halima.jsx          ditto
│
└── beneficiary/                NEW — receive-side shell (§4.0)
    ├── dashboard.html          NEW
    ├── dashboard.jsx           NEW
    ├── dashboard.css           NEW
    ├── my-cases.html           NEW
    ├── my-cases.jsx            NEW
    ├── my-cases.css            NEW
    ├── case-detail.html        NEW
    ├── case-detail.jsx         NEW
    ├── case-detail.css         NEW
    ├── documents.html          NEW
    ├── documents.jsx           NEW
    ├── documents.css           NEW
    ├── messages.html           NEW
    ├── messages.jsx            NEW
    └── messages.css            NEW
```

### 9.2 Phase Mapping

| Phase | Work |
|---|---|
| **Phase 1 (split)** — see plan dated 2026-05-12 (forthcoming) | §5.0 relocation, §4.0 beneficiary shell (5 pages), §5.5 Nav side prop, §6.7–6.9 new components, role-chooser gate behavior, case-creation fork, landing returning-user ribbon |
| **Phase 2 (SRS gap fill)** | §4.2 case-creation refinements, §4.3–4.6 four new vertical pages, §5.1–5.4 + §5.6 page modifications, §6.1–6.6 + §6.10 remaining components, Kushian branding |

### 9.3 Not Modified

```
isdb-pitch/ (entire subproject)
favicon.svg
PRODUCT.md
docs/srs.md
showcase.html
tweaks-panel.jsx
```

---

## 10. Validation Checklist

Before declaring the prototype v2 complete, verify:

**Two-sided architecture (Phase 1):**
- [ ] All relocated supporter pages load at new `/supporter/*` paths without console errors
- [ ] All `../styles.css` and `../shared.jsx` references resolve from subdirectory pages
- [ ] All `../../styles.css` references resolve from `/supporter/cases/*.html` profile pages
- [ ] Every page passes an explicit `<Nav side="..." />` prop (no implicit defaults)
- [ ] Supporter nav renders supporter link set; beneficiary nav renders beneficiary link set; neutral nav renders neutral link set
- [ ] Side badge ("You're in: …") appears on supporter + beneficiary nav, not on neutral
- [ ] Role chooser writes `localStorage.ethos.role` and redirects to correct side dashboard for all 7 roles
- [ ] Returning to role chooser pre-highlights the previously-selected role
- [ ] Landing page shows returning-user ribbon when localStorage has a role; ribbon hidden otherwise
- [ ] Case-creation submit redirect honors `localStorage.ethos.side` (supporter → supporter dashboard, beneficiary → beneficiary dashboard)
- [ ] All 5 beneficiary pages load without console errors
- [ ] Beneficiary case-detail does NOT show a "Support this case" CTA
- [ ] Supporter case profile pages still show "Support this case" CTA
- [ ] "Switch role" link in nav badge routes to role chooser; selecting a different role overwrites localStorage and redirects to new side
- [ ] No supporter-side page links into `/beneficiary/*` and vice versa, except via the role-chooser switcher

**General (all phases):**
- [ ] All new pages use existing CSS custom properties (no hardcoded colors outside palette)
- [ ] `Footer` and `DemoTag` render correctly on all new pages
- [ ] All new components in `shared.jsx` render correctly on their target pages
- [ ] No page has broken links (all `<a href="...">` point to existing files)
- [ ] All interactive buttons fire `showToast()` with relevant copy (no silent clicks)
- [ ] Typography switching via `body[data-pair]` works on all new pages
- [ ] Landing page copy edits do not break layout or overflow
- [ ] Impact dashboard new metric cards integrate with existing grid
- [ ] SME advisory page new sections do not break existing layout
- [ ] Supporter dashboard purpose badges do not break case card layout
- [ ] All 6 profile pages retain their tab layouts with new similar-cases rows
- [ ] Mobile/tablet responsive: new pages use same responsive patterns as existing pages
- [ ] No real functionality accidentally wired (all flows are mock/stub)
