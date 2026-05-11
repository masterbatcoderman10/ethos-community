# Phase 1 (revised): Two-Sided Prototype Split Implementation Plan

**Status:** Waves A–D complete (Tasks 1–16 committed). Wave E (Task 17 — final validation) pending.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the existing single-shell prototype into a two-sided platform (Upwork-style). Relocate all existing supporter-side pages under `/supporter/*`, build a new beneficiary shell under `/beneficiary/*`, fork the shared `Nav` component to render side-specific link sets, and turn the role chooser into a real gate that redirects users into the correct side.

**Architecture:** Subdirectory split with shared assets at root. `localStorage.ethos.role` powers the side badge + landing returning-user ribbon; URL is the source of truth. Every page passes `<Nav side="supporter|beneficiary|neutral" />` explicitly. Shared visual identity — no per-side branding.

**Tech Stack:** React 18.3.1 + Babel standalone via unpkg CDN, vanilla CSS (custom properties + media queries), `localStorage` for role memory, no build step, no router.

**Source spec:** `docs/superpowers/specs/2026-05-09-srs-gap-prototype-design.md` (revised 2026-05-11 with §1.4 two-sided architecture + §4.0 beneficiary shell + §5.0 relocation).

**Verification approach:** No test framework exists. Each task ends with a manual browser verification step (open the page, click interactive elements, confirm toast / state / redirect) and a console-clean check. For pages that materially change layout/UX (beneficiary shell), an `impeccable` subagent review step is mandatory before commit.

---

## Parallel Execution Map

The 17 tasks form a dependency graph that compresses to **five execution waves**. Use this map only when running under `superpowers:subagent-driven-development` — inline execution should keep the natural Task 1 → 17 order.

```
Wave A (solo)        : Task 1 ✅                  (directory scaffold)
Wave B (solo)        : Tasks 2 + 9 + 10 ✅        (shared.jsx + styles.css — same files)
Wave C (parallel, 6×): Tasks 3, 4, 5, 6, 7, 8 ✅  (disjoint file sets)
Wave D (parallel, 5×): Tasks 12, 13, 14, 15, 16 ✅ (new beneficiary files)
Wave E (solo)        : Task 17 ⏳ PENDING                 (full-system validation)
```

### Wave A — Task 1

Single subagent. Creates `supporter/`, `supporter/cases/`, `beneficiary/` with `.gitkeep` files. ~30s of work.

### Wave B — Tasks 2 + 9 + 10 (serialize on shared resources)

Tasks 2, 9, and 10 all modify `shared.jsx` and/or `styles.css`. Running them in parallel guarantees merge conflicts. Two options:

**Option B1 (recommended):** dispatch one subagent that executes all three tasks in sequence as a single hand-off. Net work is identical, no merge risk. Treat them as one logical wave.

**Option B2:** dispatch sequentially in three separate subagent rounds (Task 2 → review → Task 9 → review → Task 10 → review). Slower but provides three review checkpoints if design risk is high.

After Wave B, `shared.jsx` exports the side-aware `Nav`, the three new components, the depth-aware `Footer`, and all `setEthosRole` / `getEthosSide` / `sideDashboardUrl` helpers. `styles.css` carries the side-badge, returning-ribbon, three-component, and StatusDot-extension rules.

### Wave C — Tasks 3, 4, 5, 6, 7, 8 (6× parallel)

Six independent subagents touching disjoint file sets. None of the six modifies `shared.jsx` or `styles.css` (Wave B already did). Each task's verification step may fail to reach all targets (e.g., Task 3 verification clicks "Healthcare" which is moved by Task 5) — that is expected during this wave; Task 17 is the final cross-page check.

| Subagent | Task | Files |
|---|---|---|
| C1 | Task 3 | `supporter-dashboard.{html,jsx}` → `supporter/dashboard.*` |
| C2 | Task 4 | `impact-dashboard.{html,jsx,css}` → `supporter/impact.*` |
| C3 | Task 5 | `education.*`, `healthcare.*`, `sme-advisory.*` → `supporter/` |
| C4 | Task 6 | `beneficiary-profile.{html,jsx,css}` → `supporter/cases/maryam.*` |
| C5 | Task 7 | 5 remaining `*-profile.{html,jsx}` → `supporter/cases/` |
| C6 | Task 8 | `app.jsx`, `role-chooser.jsx`, `case-creation.jsx` (root pages — neutral nav + gate + side-aware redirects) |

**Shared-file caveat for C6:** Task 8 step 8.3 appends returning-ribbon CSS to `styles.css`. This conflicts with Wave B if Wave B is still in flight. Two safe handlings:
- Move the returning-ribbon CSS into Wave B (recommended — fold into Task 8.3 work) and let C6 only touch the three `.jsx` files.
- Or hold C6 until C1–C5 also finish, then run C6 solo. Slower; choose only if Wave B was split.

If you adopt the first handling, also pre-extract Task 8 step 8.3 from C6's prompt and append it to whichever Wave B subagent executes Task 9 (since Task 9 already appends `styles.css` rules).

### Wave D — Tasks 12, 13, 14, 15, 16 (5× parallel)

Five independent subagents, each builds one beneficiary page. All five touch only their own three new files (`<page>.html`, `<page>.jsx`, `<page>.css`) under `/beneficiary/`. Zero file overlap.

| Subagent | Task | New files |
|---|---|---|
| D1 | Task 12 | `beneficiary/dashboard.{html,jsx,css}` |
| D2 | Task 13 | `beneficiary/my-cases.{html,jsx,css}` |
| D3 | Task 14 | `beneficiary/case-detail.{html,jsx,css}` |
| D4 | Task 15 | `beneficiary/documents.{html,jsx,css}` |
| D5 | Task 16 | `beneficiary/messages.{html,jsx,css}` |

Each D-subagent itself dispatches a **second-level** impeccable subagent (see Cross-cutting rule above) before committing. The orchestrator does not need to manage this — the D-subagent owns the full task including its own quality gate.

**Cross-page link caveat:** Task 12 (dashboard) links to `case-detail.html`; Task 13 (my-cases) also links to `case-detail.html`. Both can author those links before Task 14 produces the target — links are static strings, not validated at edit time. Task 17 catches any drift.

### Wave E — Task 17

Single subagent. Walks every page, runs the broken-link grep, ticks the spec §10 checklist, and commits any final fixes.

### Wall-clock estimate (subagent-driven)

If each subagent takes ~5 min for relocation work and ~15 min for a beneficiary page (including its impeccable second-level review), the sequential 17-task run is ~120 min and the 5-wave parallel run is roughly:

- Wave A: ~1 min
- Wave B: ~15 min (one combined subagent)
- Wave C: ~10 min (6-way parallel ≈ longest task ≈ Task 5 with 3 pages × 5 min, plus overhead)
- Wave D: ~20 min (5-way parallel ≈ longest beneficiary page including impeccable review)
- Wave E: ~10 min

**Total parallel ≈ 55 min vs. ~120 min sequential.** Roughly 2× speed-up, gated by Wave B and Wave E.

---

## Cross-cutting rule — Impeccable subagent review

Per `CLAUDE.md`, `AGENTS.md`, and spec §"Cross-cutting rule": every major page-creation task ends with a step that dispatches a subagent to run the `impeccable` skill (modes `craft`, `critique`, `polish`, `adapt`, `delight` as relevant) against the just-completed work. The implementing developer's review is biased toward their own output; the subagent provides independent design critique. Findings must be applied (or explicitly deferred with reasoning) before the page is committed and the task marked complete.

**When the rule applies in this plan:** Tasks 12–16 (the five beneficiary shell pages). **Not required** for: directory scaffolding, mechanical relocation/path-fixups, component-library additions without a consuming page, link updates.

**Subagent dispatch template** (copy/paste pattern for those tasks):

```
Agent(
  description: "Impeccable review of <page>",
  subagent_type: "general-purpose",
  prompt: """
Open `<absolute-path-to-just-built-page>` in context. Run the `impeccable` skill
in critique + polish + delight modes against this page. The page is a static
React/JSX prototype (no backend, no real data) and is part of the new
beneficiary side of the Ethos Community prototype. Grounding docs:
- docs/superpowers/specs/2026-05-09-srs-gap-prototype-design.md (§4.0.<n> for this page)
- DESIGN.md (design tokens + accessibility rules)

Independently critique:
1. Visual hierarchy and information architecture
2. Typography role correctness (Newsreader display 400, Manrope body, JetBrains
   Mono labels — see DESIGN.md)
3. Color palette adherence (only `--cream`, `--green`, `--gold`, `--ink`,
   `--ink-soft`, `--muted`, `--line`, `--red`, `--cream-2`, `--gold-2`,
   `--green-2`; no new colors)
4. Spacing, alignment, responsive behavior at 360px / 768px / 1024px / 1440px
5. Accessibility: focus rings on all interactive controls, semantic markup,
   color contrast, reduced-motion respect
6. UX copy clarity and tone (purpose-linked, infrastructure framing — not
   charity tone)
7. Any micro-interaction or delight opportunities that would elevate this from
   "functional mock" to "production-grade demo"

Report findings as: (a) must-fix issues, (b) recommended polish, (c) optional
delight ideas. Do not write any code — return critique only.
"""
)
```

Apply findings inline. Optional delight ideas can be deferred to phase 2; must-fix and recommended-polish items should be addressed before commit.

---

## File Structure

### Final (post-Phase-1) directory layout

```
/
├── index.html                  redirect → landing.html (unchanged)
├── landing.html                MODIFY (returning-user ribbon)
├── app.jsx                     MODIFY (ribbon logic, Nav side="neutral")
├── role-chooser.html           MODIFY (Nav side="neutral")
├── role-chooser.jsx            MODIFY (gate behavior — write localStorage + redirect)
├── role-chooser.css            unchanged
├── case-creation.html          MODIFY (Nav side="neutral")
├── case-creation.jsx           MODIFY (side-aware submit + cancel redirect)
├── case-creation.css           unchanged
├── shared.jsx                  MODIFY (Nav side prop, side helpers, 3 new components)
├── styles.css                  MODIFY (styles for new components + side badge)
├── showcase.html               unchanged
├── tweaks-panel.jsx            unchanged
├── favicon.svg                 unchanged
├── images/                     unchanged
├── uploads/                    unchanged
├── supporter/
│   ├── dashboard.html          relocated from supporter-dashboard.html
│   ├── dashboard.jsx           relocated
│   ├── impact.html             relocated from impact-dashboard.html
│   ├── impact.jsx              relocated
│   ├── impact.css              relocated from impact-dashboard.css
│   ├── education.html          relocated
│   ├── education.jsx           relocated
│   ├── education.css           relocated
│   ├── healthcare.html         relocated
│   ├── healthcare.jsx          relocated
│   ├── healthcare.css          relocated
│   ├── sme-advisory.html       relocated
│   ├── sme-advisory.jsx        relocated
│   ├── sme-advisory.css        relocated
│   └── cases/
│       ├── maryam.html         relocated from beneficiary-profile.html
│       ├── maryam.jsx          relocated
│       ├── maryam.css          relocated from beneficiary-profile.css
│       ├── awad.html           relocated
│       ├── awad.jsx            relocated
│       ├── yasmin.html         relocated
│       ├── yasmin.jsx          relocated
│       ├── afaf.html           relocated
│       ├── afaf.jsx            relocated
│       ├── ibrahim.html        relocated
│       ├── ibrahim.jsx         relocated
│       ├── halima.html         relocated
│       └── halima.jsx          relocated
└── beneficiary/
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

### File responsibilities

- `shared.jsx`: `Nav` becomes side-aware (prop `side`). New side helpers `getEthosRole`, `getEthosSide`, `roleToSide`. New atoms `CaseProgressBar`, `StatusPill`, `MessageBubble`.
- `styles.css`: side badge styles, three new component styles.
- `/supporter/*`: identical content to the pre-existing root pages, only paths and Nav prop differ.
- `/beneficiary/*`: 5 new pages, each with own `.css` for page-specific layout (component styles stay in `styles.css`).
- Asset path convention: subdirectory pages use `../styles.css`, `../shared.jsx`, `../favicon.svg`. Case-profile pages under `/supporter/cases/` use `../../`.

---

## Task 1 — Create directory scaffolding

**Files:**
- Create: `supporter/.gitkeep`, `supporter/cases/.gitkeep`, `beneficiary/.gitkeep`

- [x] **Step 1.1: Create the three directories with placeholder files**

```bash
mkdir -p supporter/cases beneficiary
touch supporter/.gitkeep supporter/cases/.gitkeep beneficiary/.gitkeep
```

- [x] **Step 1.2: Verify directories exist**

```bash
ls -la supporter/ supporter/cases/ beneficiary/
```

Expected: each directory listed with `.gitkeep` inside.

- [x] **Step 1.3: Commit**

```bash
git add supporter/.gitkeep supporter/cases/.gitkeep beneficiary/.gitkeep
git commit -m "chore(split): scaffold supporter and beneficiary directories"
```

---

## Task 2 — Fork `Nav` component to accept `side` prop

Add three link sets keyed by side. Default `side="supporter"` for transitional backward compat (Task 16 cleanup removes the default once every call site is updated).

**Files:**
- Modify: `shared.jsx` (Nav component + helpers, append to `Object.assign`)
- Modify: `styles.css` (append side-badge styles)

- [x] **Step 2.1: Add side-state helpers to `shared.jsx`**

Insert immediately after the `showToast` function (~line 105), before the `Nav` declaration:

```jsx
const ROLE_TO_SIDE = {
  supporter: "supporter",
  mentor: "supporter",
  ambassador: "supporter",
  finance: "supporter",
  development: "supporter",
  beneficiary: "beneficiary",
  sme: "beneficiary"
};

const roleToSide = (role) => ROLE_TO_SIDE[role] || null;

const getEthosRole = () => {
  try { return localStorage.getItem("ethos.role"); } catch (e) { return null; }
};

const getEthosSide = () => roleToSide(getEthosRole());

const setEthosRole = (role) => {
  try { localStorage.setItem("ethos.role", role); } catch (e) {}
};

const clearEthosRole = () => {
  try { localStorage.removeItem("ethos.role"); } catch (e) {}
};

const SIDE_ROOT = {
  supporter: "supporter/",
  beneficiary: "beneficiary/"
};

const sideDashboardUrl = (side, fromDepth = 0) => {
  const prefix = fromDepth === 0 ? "" : "../".repeat(fromDepth);
  const root = SIDE_ROOT[side];
  if (!root) return `${prefix}landing.html`;
  return `${prefix}${root}dashboard.html`;
};
```

- [x] **Step 2.2: Replace the `Nav` component in `shared.jsx`**

Replace the existing `Nav` definition (currently lines 107–147) with the side-aware version:

```jsx
const NAV_LINKS_SUPPORTER = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}supporter/dashboard.html`, label: "Dashboard", key: "dashboard" },
    { href: `${p}supporter/education.html`, label: "Education", key: "education" },
    { href: `${p}supporter/healthcare.html`, label: "Healthcare", key: "healthcare" },
    { href: `${p}supporter/sme-advisory.html`, label: "SME Advisory", key: "sme" },
    { href: `${p}supporter/impact.html`, label: "Impact", key: "impact" }
  ];
};

const NAV_LINKS_BENEFICIARY = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}beneficiary/dashboard.html`, label: "Dashboard", key: "dashboard" },
    { href: `${p}beneficiary/my-cases.html`, label: "My Cases", key: "my-cases" },
    { href: `${p}beneficiary/documents.html`, label: "Documents", key: "documents" },
    { href: `${p}beneficiary/messages.html`, label: "Messages", key: "messages" }
  ];
};

const NAV_LINKS_NEUTRAL = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}landing.html`, label: "Home", key: "home" },
    { href: `${p}role-chooser.html`, label: "Get Started", key: "role" }
  ];
};

const Nav = ({ active, side = "supporter", depth = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links =
    side === "beneficiary" ? NAV_LINKS_BENEFICIARY(depth) :
    side === "neutral" ? NAV_LINKS_NEUTRAL(depth) :
    NAV_LINKS_SUPPORTER(depth);
  const prefix = "../".repeat(depth);
  const logoHref = `${prefix}landing.html`;
  const ctaHref = `${prefix}case-creation.html`;
  const chooserHref = `${prefix}role-chooser.html`;
  const sideLabel = side === "supporter" ? "Supporter" : side === "beneficiary" ? "Beneficiary" : null;

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href={logoHref} className="logo"><span className="logo-mark"></span><span className="logo-text"> Ethos Community™</span></a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>{l.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          {sideLabel && (
            <a href={chooserHref} className="nav-side-badge" title="Switch role">
              <span className="nav-side-badge-label">You're in:</span>
              <span className="nav-side-badge-value">{sideLabel}</span>
              <span className="nav-side-badge-switch">Switch role</span>
            </a>
          )}
          <button className="btn btn-soft sm nav-cta-btn" onClick={() => showToast("Notifications — coming next")}><Icon name="bell" size={16}/></button>
          <a href={ctaHref} className="btn btn-primary sm nav-cta-btn">Create Case <Icon name="arrow"/></a>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <Icon name={menuOpen ? "close" : "hamburger"}/>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(l => (
            <a key={l.key} href={l.href} className={`nav-mobile-link ${active === l.key ? "active" : ""}`} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          {sideLabel && (
            <a href={chooserHref} className="nav-mobile-link nav-mobile-switch" onClick={() => setMenuOpen(false)}>Switch role · You're in {sideLabel}</a>
          )}
          <div className="nav-mobile-ctas">
            <button className="btn btn-soft btn-sm" onClick={() => { setMenuOpen(false); showToast("Notifications — coming next"); }}><Icon name="bell" size={16}/></button>
            <a href={ctaHref} className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Create Case <Icon name="arrow"/></a>
          </div>
        </div>
      )}
    </nav>
  );
};
```

- [x] **Step 2.3: Extend the `Object.assign(window, …)` export at the bottom of `shared.jsx`**

Replace the existing single-line export with:

```jsx
Object.assign(window, {
  Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar,
  StatusDot, FormInput, FormTextarea, FormSelect, FormRadioGroup, UploadZone,
  ChoiceCard, StepIndicator, FormField, StepProgressBar, StepWizard,
  roleToSide, getEthosRole, getEthosSide, setEthosRole, clearEthosRole,
  sideDashboardUrl
});
```

- [x] **Step 2.4: Append side-badge styles to `styles.css`**

Append at the very end:

```css
/* side badge in nav */
.nav-side-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;background:var(--cream);color:var(--ink);font-size:12px;text-decoration:none;transition:border-color .15s ease,background .15s ease}
.nav-side-badge:hover{border-color:var(--green);background:rgba(14,59,46,.04)}
.nav-side-badge-label{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.nav-side-badge-value{font-weight:600;color:var(--ink)}
.nav-side-badge-switch{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--green);padding-left:8px;border-left:1px solid var(--line)}
@media(max-width:960px){.nav-side-badge{display:none}}
.nav-mobile-switch{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--green) !important;border-top:1px solid var(--line);padding-top:12px;margin-top:8px}
```

- [x] **Step 2.5: Smoke-test that nothing is broken**

```
open landing.html
```

Manual checks:
- Page renders, no console errors.
- Nav still functions (the default `side="supporter"` means links point to `/supporter/*`, which doesn't exist yet — those links will 404, but the page itself renders).
- No layout shift on the nav row.

- [x] **Step 2.6: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(nav): add side prop with supporter/beneficiary/neutral link sets"
```

---

## Task 3 — Relocate `supporter-dashboard` → `supporter/dashboard`

**Files:**
- Move: `supporter-dashboard.html` → `supporter/dashboard.html`
- Move: `supporter-dashboard.jsx` → `supporter/dashboard.jsx`
- Modify: both for path fixups + `<Nav side="supporter" depth={1} />`

- [x] **Step 3.1: Move files via git**

```bash
git mv supporter-dashboard.html supporter/dashboard.html
git mv supporter-dashboard.jsx supporter/dashboard.jsx
```

- [x] **Step 3.2: Fix asset paths in `supporter/dashboard.html`**

Open `supporter/dashboard.html` and apply these substitutions:

- `<link rel="icon" type="image/svg+xml" href="favicon.svg">` → `<link rel="icon" type="image/svg+xml" href="../favicon.svg">`
- `<link rel="stylesheet" href="styles.css">` → `<link rel="stylesheet" href="../styles.css">`
- `<script type="text/babel" src="shared.jsx">` → `<script type="text/babel" src="../shared.jsx">`
- `<script type="text/babel" src="supporter-dashboard.jsx">` → `<script type="text/babel" src="dashboard.jsx">`

If the file references any other per-page CSS or images by relative root path, also prefix with `../`.

- [x] **Step 3.3: Update Nav call site in `supporter/dashboard.jsx`**

Find the JSX `<Nav active="dashboard" />` (or `<Nav />`) and replace with:

```jsx
<Nav active="dashboard" side="supporter" depth={1} />
```

- [x] **Step 3.4: Update internal links inside `supporter/dashboard.jsx`**

Apply these substitutions (treat each as a `replace_all` in the file):

| Old href | New href |
|---|---|
| `"supporter-dashboard.html"` | `"dashboard.html"` |
| `"impact-dashboard.html"` | `"impact.html"` |
| `"education.html"` | `"education.html"` (unchanged within `/supporter/`) |
| `"healthcare.html"` | `"healthcare.html"` (unchanged) |
| `"sme-advisory.html"` | `"sme-advisory.html"` (unchanged) |
| `"beneficiary-profile.html"` | `"cases/maryam.html"` |
| `"awad-profile.html"` | `"cases/awad.html"` |
| `"yasmin-profile.html"` | `"cases/yasmin.html"` |
| `"afaf-profile.html"` | `"cases/afaf.html"` |
| `"ibrahim-profile.html"` | `"cases/ibrahim.html"` |
| `"halima-profile.html"` | `"cases/halima.html"` |
| `"landing.html"` | `"../landing.html"` |
| `"role-chooser.html"` | `"../role-chooser.html"` |
| `"case-creation.html"` | `"../case-creation.html"` |

(Apply only substitutions where the LHS appears in the file. Some may not.)

- [x] **Step 3.5: Verify**

```
open supporter/dashboard.html
```

Manual checks:
- Page loads, no console errors.
- Nav side badge reads `You're in: Supporter`.
- Nav links work (Dashboard active, Education/Healthcare/SME/Impact route to existing root files temporarily — those will be moved in Tasks 4–7 but until then they 404; that's expected for this task).
- Logo links to `../landing.html`.
- Hero, case grid, activity feed render.

- [x] **Step 3.6: Commit**

```bash
git add supporter/dashboard.html supporter/dashboard.jsx
git commit -m "refactor(split): relocate supporter-dashboard to /supporter/dashboard"
```

---

## Task 4 — Relocate `impact-dashboard` → `supporter/impact`

**Files:**
- Move: `impact-dashboard.html` → `supporter/impact.html`
- Move: `impact-dashboard.jsx` → `supporter/impact.jsx`
- Move: `impact-dashboard.css` → `supporter/impact.css`

- [x] **Step 4.1: Move files**

```bash
git mv impact-dashboard.html supporter/impact.html
git mv impact-dashboard.jsx supporter/impact.jsx
git mv impact-dashboard.css supporter/impact.css
```

- [x] **Step 4.2: Path fixups in `supporter/impact.html`**

Apply same substitutions as Task 3 Step 3.2, plus:

- `<link rel="stylesheet" href="impact-dashboard.css">` → `<link rel="stylesheet" href="impact.css">`
- `<script type="text/babel" src="impact-dashboard.jsx">` → `<script type="text/babel" src="impact.jsx">`

- [x] **Step 4.3: Nav update in `supporter/impact.jsx`**

```jsx
<Nav active="impact" side="supporter" depth={1} />
```

- [x] **Step 4.4: Internal link updates in `supporter/impact.jsx`**

Apply the same link substitution table from Task 3 Step 3.4.

- [x] **Step 4.5: Verify**

```
open supporter/impact.html
```

Manual checks: page loads, no console errors, side badge present, charts and ledger render with their CSS.

- [x] **Step 4.6: Commit**

```bash
git add supporter/impact.html supporter/impact.jsx supporter/impact.css
git commit -m "refactor(split): relocate impact-dashboard to /supporter/impact"
```

---

## Task 5 — Relocate vertical pages (education, healthcare, sme-advisory)

Three near-identical relocations. Group into a single task.

**Files:**
- Move: `education.html` + `.jsx` + `.css` → `supporter/`
- Move: `healthcare.html` + `.jsx` + `.css` → `supporter/`
- Move: `sme-advisory.html` + `.jsx` + `.css` → `supporter/`

- [x] **Step 5.1: Move files**

```bash
git mv education.html supporter/education.html
git mv education.jsx supporter/education.jsx
git mv education.css supporter/education.css
git mv healthcare.html supporter/healthcare.html
git mv healthcare.jsx supporter/healthcare.jsx
git mv healthcare.css supporter/healthcare.css
git mv sme-advisory.html supporter/sme-advisory.html
git mv sme-advisory.jsx supporter/sme-advisory.jsx
git mv sme-advisory.css supporter/sme-advisory.css
```

- [x] **Step 5.2: HTML path fixups for each of the three pages**

In each of `supporter/education.html`, `supporter/healthcare.html`, `supporter/sme-advisory.html`, apply:
- `href="favicon.svg"` → `href="../favicon.svg"`
- `href="styles.css"` → `href="../styles.css"`
- `src="shared.jsx"` → `src="../shared.jsx"`
- (the per-page `.css` and `.jsx` stay as-is since they're co-located after the move)

- [x] **Step 5.3: Nav + internal links in each `.jsx`**

For each file, update Nav:
- `supporter/education.jsx` → `<Nav active="education" side="supporter" depth={1} />`
- `supporter/healthcare.jsx` → `<Nav active="healthcare" side="supporter" depth={1} />`
- `supporter/sme-advisory.jsx` → `<Nav active="sme" side="supporter" depth={1} />`

Apply the link substitution table from Task 3 Step 3.4 to each file.

- [x] **Step 5.4: Verify all three pages**

```
open supporter/education.html
open supporter/healthcare.html
open supporter/sme-advisory.html
```

Manual checks (per page): loads without console errors, hero + content sections render with their CSS, side badge present, Nav active state correct.

- [x] **Step 5.5: Commit**

```bash
git add supporter/education.* supporter/healthcare.* supporter/sme-advisory.*
git commit -m "refactor(split): relocate vertical pages to /supporter/"
```

---

## Task 6 — Relocate Maryam profile (`beneficiary-profile` → `supporter/cases/maryam`)

Maryam is the only profile with a dedicated `.css`. Handle it separately as a template for Task 7.

**Files:**
- Move: `beneficiary-profile.html` → `supporter/cases/maryam.html`
- Move: `beneficiary-profile.jsx` → `supporter/cases/maryam.jsx`
- Move: `beneficiary-profile.css` → `supporter/cases/maryam.css`

- [x] **Step 6.1: Move files**

```bash
git mv beneficiary-profile.html supporter/cases/maryam.html
git mv beneficiary-profile.jsx supporter/cases/maryam.jsx
git mv beneficiary-profile.css supporter/cases/maryam.css
```

- [x] **Step 6.2: HTML path fixups in `supporter/cases/maryam.html`**

Two-level depth — use `../../`:

- `href="favicon.svg"` → `href="../../favicon.svg"`
- `href="styles.css"` → `href="../../styles.css"`
- `src="shared.jsx"` → `src="../../shared.jsx"`
- `href="beneficiary-profile.css"` → `href="maryam.css"`
- `src="beneficiary-profile.jsx"` → `src="maryam.jsx"`

- [x] **Step 6.3: Nav in `supporter/cases/maryam.jsx`**

```jsx
<Nav side="supporter" depth={2} />
```

(`active` omitted — profile pages aren't a top-level nav target.)

- [x] **Step 6.4: Internal link updates in `supporter/cases/maryam.jsx`**

| Old href | New href |
|---|---|
| `"landing.html"` | `"../../landing.html"` |
| `"supporter-dashboard.html"` | `"../dashboard.html"` |
| `"impact-dashboard.html"` | `"../impact.html"` |
| `"education.html"` | `"../education.html"` |
| `"healthcare.html"` | `"../healthcare.html"` |
| `"sme-advisory.html"` | `"../sme-advisory.html"` |
| `"beneficiary-profile.html"` | `"maryam.html"` |
| `"awad-profile.html"` | `"awad.html"` |
| `"yasmin-profile.html"` | `"yasmin.html"` |
| `"afaf-profile.html"` | `"afaf.html"` |
| `"ibrahim-profile.html"` | `"ibrahim.html"` |
| `"halima-profile.html"` | `"halima.html"` |
| `"role-chooser.html"` | `"../../role-chooser.html"` |
| `"case-creation.html"` | `"../../case-creation.html"` |

- [x] **Step 6.5: Verify**

```
open supporter/cases/maryam.html
```

Manual checks: case detail loads, tabs work, photos render (verify image references at `../../images/*` resolve), side badge present, "Support this case" toast still fires.

- [x] **Step 6.6: Commit**

```bash
git add supporter/cases/maryam.html supporter/cases/maryam.jsx supporter/cases/maryam.css
git commit -m "refactor(split): relocate Maryam profile to /supporter/cases/maryam"
```

---

## Task 7 — Relocate remaining 5 profiles

Awad, Yasmin, Afaf, Ibrahim, Halima — all use root `styles.css` only (no per-profile `.css`).

**Files:** 5 × (`.html` + `.jsx`)

- [x] **Step 7.1: Move files**

```bash
git mv awad-profile.html supporter/cases/awad.html
git mv awad-profile.jsx supporter/cases/awad.jsx
git mv yasmin-profile.html supporter/cases/yasmin.html
git mv yasmin-profile.jsx supporter/cases/yasmin.jsx
git mv afaf-profile.html supporter/cases/afaf.html
git mv afaf-profile.jsx supporter/cases/afaf.jsx
git mv ibrahim-profile.html supporter/cases/ibrahim.html
git mv ibrahim-profile.jsx supporter/cases/ibrahim.jsx
git mv halima-profile.html supporter/cases/halima.html
git mv halima-profile.jsx supporter/cases/halima.jsx
```

- [x] **Step 7.2: HTML path fixups for each profile**

For each of `awad.html`, `yasmin.html`, `afaf.html`, `ibrahim.html`, `halima.html`, apply:

- `href="favicon.svg"` → `href="../../favicon.svg"`
- `href="styles.css"` → `href="../../styles.css"`
- `src="shared.jsx"` → `src="../../shared.jsx"`
- `src="<name>-profile.jsx"` → `src="<name>.jsx"` (e.g., `src="awad-profile.jsx"` → `src="awad.jsx"`)

- [x] **Step 7.3: Nav + internal links in each `.jsx`**

In each of the 5 files, set Nav:

```jsx
<Nav side="supporter" depth={2} />
```

Apply the link substitution table from Task 6 Step 6.4.

- [x] **Step 7.4: Verify all 5 profiles**

```
open supporter/cases/awad.html
open supporter/cases/yasmin.html
open supporter/cases/afaf.html
open supporter/cases/ibrahim.html
open supporter/cases/halima.html
```

Manual checks per page: loads, tabs work, image references resolve, side badge present.

- [x] **Step 7.5: Commit**

```bash
git add supporter/cases/
git commit -m "refactor(split): relocate remaining 5 case profiles to /supporter/cases/"
```

---

## Task 8 — Update root pages for neutral nav + side-aware redirects

`landing.html`, `role-chooser.html`, `case-creation.html` stay at root. They get:
- `<Nav side="neutral" depth={0} />`
- Role chooser gains gate behavior (writes `localStorage.ethos.role`, redirects to side dashboard)
- Landing gains returning-user ribbon (reads localStorage, shows link to last side)
- Case-creation submit + cancel become side-aware

**Files:**
- Modify: `app.jsx` (landing), `role-chooser.jsx`, `case-creation.jsx`

- [x] **Step 8.1: Update Nav call in `app.jsx`**

Find the existing `<Nav ... />` call and replace with:

```jsx
<Nav side="neutral" depth={0} />
```

- [x] **Step 8.2: Add returning-user ribbon to `app.jsx`**

Find the top of the `App` component's JSX (immediately after `<Nav .../>` and `<DemoTag />`, before the hero). Insert a `ReturningRibbon` component definition above `App` and render it:

Define above the `App` component (or wherever other top-level helpers live in `app.jsx`):

```jsx
const ReturningRibbon = () => {
  const [role, setRole] = useState(null);
  useEffect(() => { setRole(getEthosRole()); }, []);
  if (!role) return null;
  const side = roleToSide(role);
  const sideLabel = side === "supporter" ? "Supporter" : "Beneficiary";
  const href = sideDashboardUrl(side, 0);
  return (
    <div className="returning-ribbon">
      <div className="container returning-ribbon-inner">
        <span className="returning-ribbon-label">Welcome back, {sideLabel}.</span>
        <a href={href} className="returning-ribbon-link">Return to your dashboard <Icon name="arrow" size={14} /></a>
      </div>
    </div>
  );
};
```

Render it inside `App`, immediately after `<DemoTag />`:

```jsx
<DemoTag />
<ReturningRibbon />
```

- [x] **Step 8.3: Append ribbon styles to `styles.css`**

```css
/* returning-user ribbon */
.returning-ribbon{background:var(--cream-2);border-bottom:1px solid var(--line)}
.returning-ribbon-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0;font-size:13px}
.returning-ribbon-label{color:var(--ink)}
.returning-ribbon-link{display:inline-flex;align-items:center;gap:6px;color:var(--green);text-decoration:none;font-weight:500;font-size:13px}
.returning-ribbon-link:hover{color:var(--green-2)}
@media(max-width:640px){.returning-ribbon-inner{flex-direction:column;align-items:flex-start;gap:6px;padding:12px 0}}
```

- [x] **Step 8.4: Update Nav + landing CTA in `app.jsx`**

Any landing-page CTAs that previously linked to `supporter-dashboard.html` should now link to `role-chooser.html` (for the unified "Get Started" flow). Specifically, scan `app.jsx` for `href="supporter-dashboard.html"` and change to `href="role-chooser.html"`. Footer links (in `shared.jsx`) we'll fix in Task 11.

- [x] **Step 8.5: Update `role-chooser.jsx` for gate behavior**

Open `role-chooser.jsx`. Update the Nav call:

```jsx
<Nav side="neutral" depth={0} />
```

Replace the existing `handleContinue` function with the gate version that writes localStorage and redirects:

```jsx
const handleContinue = () => {
  if (!selected) return;
  setEthosRole(selected);
  const side = roleToSide(selected);
  const target = side === "beneficiary" ? "beneficiary/dashboard.html" : "supporter/dashboard.html";
  showToast(`Continuing as ${ROLES.find(r => r.id === selected).title}…`);
  setTimeout(() => { window.location.href = target; }, 600);
};
```

Also add a `useEffect` near the top of `RoleChooserPage` to pre-highlight the previously-selected role and show a one-click return:

```jsx
useEffect(() => {
  const stored = getEthosRole();
  if (stored && !selected) setSelected(stored);
}, []);
```

- [x] **Step 8.6: Update `case-creation.jsx` for neutral nav + side-aware submit/cancel**

Open `case-creation.jsx`. Update the Nav call:

```jsx
<Nav side="neutral" depth={0} />
```

Replace `handleSubmit`:

```jsx
const handleSubmit = () => {
  const side = getEthosSide() || "supporter";
  const target = side === "beneficiary" ? "beneficiary/dashboard.html" : "supporter/dashboard.html";
  showToast(`Case ${caseId} submitted for verification`);
  setTimeout(() => { window.location.href = target; }, 1200);
};
```

Update the Cancel link href. Find the existing cancel anchor (currently `href="supporter-dashboard.html"`) and replace with a dynamic computation. Replace the JSX line:

```jsx
<a href="supporter-dashboard.html" className="btn-text">Cancel and return to dashboard</a>
```

with:

```jsx
<a
  href={(getEthosSide() === "beneficiary") ? "beneficiary/dashboard.html" : "supporter/dashboard.html"}
  className="btn-text"
>Cancel and return to dashboard</a>
```

- [x] **Step 8.7: Update `index.html` redirect target**

Verify `index.html` still redirects to `landing.html`. If it doesn't, fix it. (No relocation — index stays at root.)

```bash
cat index.html
```

Expected: contains `<meta http-equiv="refresh" content="0; url=landing.html">` or similar redirect.

- [x] **Step 8.8: Verify**

```
open landing.html
open role-chooser.html
open case-creation.html
```

Manual checks:
- **Landing:** loads, neutral nav (Home + Get Started), no side badge. With localStorage empty: no ribbon. Open devtools, run `localStorage.setItem("ethos.role", "supporter")`, refresh: ribbon shows "Welcome back, Supporter" + link to `/supporter/dashboard.html`.
- **Role chooser:** loads, neutral nav. Pick a role → Continue → toast fires → redirects to correct side dashboard within ~600ms. localStorage now contains the role. Return to chooser: previously-selected card pre-highlighted.
- **Case-creation:** loads, neutral nav. Cancel link routes to `/supporter/dashboard.html` (or `/beneficiary/dashboard.html` if localStorage is beneficiary). Complete wizard → Submit → toast + redirect to correct side dashboard.

- [x] **Step 8.9: Commit**

```bash
git add app.jsx role-chooser.jsx case-creation.jsx styles.css
git commit -m "feat(split): root pages neutral nav + role-chooser gate + side-aware redirects"
```

---

## Task 9 — Add new shared components `CaseProgressBar`, `StatusPill`, `MessageBubble`

**Files:**
- Modify: `shared.jsx`
- Modify: `styles.css`

- [x] **Step 9.1: Add the three components to `shared.jsx`**

Insert immediately after `StepWizard` (and before the `Object.assign(window, ...)` export):

```jsx
const CaseProgressBar = ({ raised = 0, target = 0, compact = false }) => {
  const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
  const remaining = Math.max(0, target - raised);
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  return (
    <div className={`case-progress ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="case-progress-label">
          <span className="case-progress-raised">{fmt(raised)} raised</span>
          <span className="case-progress-remaining">{fmt(remaining)} to go</span>
        </div>
      )}
      <div className="case-progress-track" aria-label={`${pct}% funded`}>
        <div className="case-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {compact && <span className="case-progress-pct">{pct}%</span>}
    </div>
  );
};

const STATUS_PILL_LABEL = {
  draft: "Draft",
  pending: "Pending review",
  verified: "Verified",
  funded: "Funded",
  completed: "Completed",
  action_needed: "Action needed"
};

const StatusPill = ({ status = "pending" }) => {
  const label = STATUS_PILL_LABEL[status] || status;
  return <span className={`status-pill status-pill-${status}`}>{label}</span>;
};

const MessageBubble = ({ sender = "system", name, timestamp, children }) => {
  if (sender === "system") {
    return (
      <div className="message-row message-row-system">
        <div className="message-system">{children}</div>
      </div>
    );
  }
  const initials = (name || "").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`message-row message-row-${sender}`}>
      {sender === "ambassador" && <Avatar initials={initials} green />}
      <div className="message-stack">
        <div className="message-meta">
          {name && <span className="message-name">{name}</span>}
          {timestamp && <span className="message-time">{timestamp}</span>}
        </div>
        <div className={`message-bubble message-bubble-${sender}`}>{children}</div>
      </div>
      {sender === "me" && <Avatar initials={initials || "ME"} />}
    </div>
  );
};
```

- [x] **Step 9.2: Extend the `Object.assign(window, …)` export**

Update the final `Object.assign` to include the three new names:

```jsx
Object.assign(window, {
  Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar,
  StatusDot, FormInput, FormTextarea, FormSelect, FormRadioGroup, UploadZone,
  ChoiceCard, StepIndicator, FormField, StepProgressBar, StepWizard,
  CaseProgressBar, StatusPill, MessageBubble,
  roleToSide, getEthosRole, getEthosSide, setEthosRole, clearEthosRole,
  sideDashboardUrl
});
```

- [x] **Step 9.3a: Extend `StatusDot` to support doc-checklist statuses**

`Step 14` and `Step 15` pass `status="complete"`, `status="in_progress"`, and `status="pending"` to `StatusDot`, but the existing CSS only defines `idle|active|done`. Add the missing variants by appending to `styles.css`:

```css
/* status dot — doc checklist variants */
.status-dot-complete{background:var(--green);border:1px solid var(--green);color:var(--cream)}
.status-dot-in_progress{background:var(--gold);border:1px solid var(--gold-2,#7a5d1f);color:var(--green-2,#0a2e22)}
.status-dot-pending{background:var(--cream-2);border:1px solid var(--line);color:var(--muted)}
```

Also update the `StatusDot` component in `shared.jsx` so the check icon renders for both `done` and `complete`:

Find:
```jsx
{status === "done" ? <Icon name="check" size={Math.round(size * 0.7)} /> : children}
```
Replace with:
```jsx
{(status === "done" || status === "complete") ? <Icon name="check" size={Math.round(size * 0.7)} /> : children}
```

- [x] **Step 9.3: Append component styles to `styles.css`**

```css
/* case progress bar */
.case-progress{display:flex;flex-direction:column;gap:6px;width:100%}
.case-progress-label{display:flex;justify-content:space-between;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.case-progress-raised{color:var(--green)}
.case-progress-remaining{color:var(--muted)}
.case-progress-track{height:6px;background:var(--cream-2);border-radius:999px;overflow:hidden}
.case-progress-fill{height:100%;background:var(--green);border-radius:999px;transition:width .3s ease}
.case-progress.compact{flex-direction:row;align-items:center;gap:10px}
.case-progress.compact .case-progress-track{flex:1}
.case-progress-pct{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);min-width:30px;text-align:right}

/* status pill */
.status-pill{display:inline-flex;align-items:center;font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;border:1px solid transparent;white-space:nowrap}
.status-pill-draft{background:var(--cream-2);color:var(--muted);border-color:var(--line)}
.status-pill-pending{background:rgba(166,130,46,.12);color:var(--gold-2,#7a5d1f)}
.status-pill-verified{background:rgba(14,59,46,.1);color:var(--green-2,#0a2e22)}
.status-pill-funded{background:rgba(56,103,158,.12);color:#244a73}
.status-pill-completed{background:var(--cream-2);color:var(--green-2,#0a2e22);border-color:var(--green)}
.status-pill-action_needed{background:rgba(170,52,52,.1);color:var(--red,#aa3434)}

/* message bubbles */
.message-row{display:flex;gap:10px;margin-bottom:14px;align-items:flex-start}
.message-row-me{flex-direction:row-reverse;justify-content:flex-start}
.message-row-system{justify-content:center}
.message-stack{display:flex;flex-direction:column;gap:4px;max-width:60ch}
.message-meta{display:flex;gap:8px;font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
.message-row-me .message-meta{justify-content:flex-end}
.message-name{color:var(--ink-soft)}
.message-bubble{padding:12px 14px;border-radius:8px;font-size:14px;line-height:1.5;color:var(--ink)}
.message-bubble-ambassador{background:var(--cream-2);border:1px solid var(--line);border-top-left-radius:2px}
.message-bubble-me{background:rgba(14,59,46,.06);border:1px solid var(--green);border-top-right-radius:2px;color:var(--green-2,#0a2e22)}
.message-system{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);padding:6px 12px;background:var(--cream-2);border-radius:999px}
```

- [x] **Step 9.4: Smoke test**

```
open landing.html
```

Manual: page renders without console errors (the three new components aren't consumed yet — pure availability check).

- [x] **Step 9.5: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add CaseProgressBar, StatusPill, MessageBubble"
```

---

## Task 10 — Footer link fixups in `shared.jsx`

The shared `Footer` still references root-level paths that no longer exist after Tasks 3–7. Fix them with subdirectory-aware links. Since the Footer is used by every page across both sides, hardcode to root-relative-ish paths that work given the `depth` of the current page.

For now (Phase 1), keep the Footer simple — accept a `depth` prop and prefix links accordingly.

**Files:**
- Modify: `shared.jsx` (Footer component)

- [x] **Step 10.1: Update `Footer` in `shared.jsx`**

Replace the existing `Footer` definition with:

```jsx
const Footer = ({ depth = 0 }) => {
  const p = "../".repeat(depth);
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href={`${p}landing.html`} className="logo"><span className="logo-mark"></span> Ethos Community™</a>
            <p>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <ul>
              <li><a href={`${p}supporter/dashboard.html`}>Supporter Dashboard</a></li>
              <li><a href={`${p}supporter/impact.html`}>Impact Dashboard</a></li>
              <li><a href={`${p}supporter/cases/maryam.html`}>Beneficiary Cases</a></li>
              <li><a href="#">Partner Directory</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Verticals</h5>
            <ul>
              <li><a href={`${p}supporter/education.html`}>Education & CPD</a></li>
              <li><a href={`${p}supporter/healthcare.html`}>Healthcare & Takaful</a></li>
              <li><a href={`${p}supporter/sme-advisory.html`}>SME Advisory</a></li>
              <li><a href="#">Women & Workforce</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Organisation</h5>
            <ul>
              <li><a href="#">About Kushian™</a></li>
              <li><a href="#">Founder</a></li>
              <li><a href="#">Press & Media</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="compliance">Prototype for demonstration only. Future financial, insurance, healthcare and payment services will be delivered through licensed partners subject to applicable laws and approvals. Ethos Community™ and Kushian™ are demonstration marks shown for the IsDB Group Innovation and Startups Pitch Competition.</p>
        <div className="footer-bottom">
          <span>© 2026 Ethos Community™</span>
          <span>Demo · v0.1 · MVP Prototype</span>
        </div>
      </div>
    </footer>
  );
};
```

- [x] **Step 10.2: Update every consumer to pass `depth`**

For every `<Footer />` call across the project:
- Root pages (`landing`, `role-chooser`, `case-creation`): `<Footer depth={0} />` (or just `<Footer />`)
- `supporter/*` top-level pages: `<Footer depth={1} />`
- `supporter/cases/*` pages: `<Footer depth={2} />`
- `beneficiary/*` pages (Tasks 12–16): `<Footer depth={1} />`

Search for `<Footer />` and `<Footer/>` across the project and add the prop per file.

```bash
grep -rln "<Footer" --include="*.jsx" .
```

For each file in the output, set the appropriate `depth`. Default-no-prop is acceptable for root pages.

- [x] **Step 10.3: Verify**

```
open landing.html
open supporter/dashboard.html
open supporter/cases/maryam.html
```

Manual: footer links resolve from each location. Click "Supporter Dashboard" from Maryam profile → routes to `../dashboard.html` (which is `supporter/dashboard.html`).

- [x] **Step 10.4: Commit**

```bash
git add shared.jsx supporter/ app.jsx role-chooser.jsx case-creation.jsx
git commit -m "feat(footer): depth-aware footer links across subdirectories"
```

---

## Task 11 — Update Maryam profile internal Footer references in `supporter/cases/maryam.jsx`

(Folded into Task 10 if footer change was done globally; this task only runs if footer was deferred.) Skip if Task 10 covered all `<Footer />` consumers.

- [x] **Step 11.1: Skip if Task 10 complete; otherwise repeat Task 10 Step 10.2 for the cases/ subdirectory.**

---

## Task 12 — Build `/beneficiary/dashboard.html`

First beneficiary page. **Ends with mandatory impeccable subagent review.**

**Files:**
- Create: `beneficiary/dashboard.html`, `beneficiary/dashboard.jsx`, `beneficiary/dashboard.css`

- [x] **Step 12.1: Create `beneficiary/dashboard.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Dashboard — Ethos Community™ Beneficiary</title>
<link rel="icon" type="image/svg+xml" href="../favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../styles.css" />
<link rel="stylesheet" href="dashboard.css" />
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  <script type="text/babel" src="../shared.jsx"></script>
  <script type="text/babel" src="dashboard.jsx"></script>
</body>
</html>
```

- [x] **Step 12.2: Create `beneficiary/dashboard.jsx`**

```jsx
const BENE_CASES = [
  {
    id: "K-2890",
    title: "Women's CPD — Finance Returnship",
    category: "Women CPD",
    raised: 4200,
    target: 8000,
    status: "verified",
    supporters: ["RS", "KM", "AB", "LS", "MO"],
    updated: "Updated 2 days ago"
  },
  {
    id: "K-3120",
    title: "Children's Education Support",
    category: "Education",
    raised: 900,
    target: 3600,
    status: "pending",
    supporters: ["RS", "AB"],
    updated: "Updated 5 days ago"
  }
];

const BENE_NEXT_STEPS = [
  { label: "Upload medical referral (Case K-2890)", status: "in_progress" },
  { label: "Reply to ambassador question on K-3120", status: "pending" },
  { label: "Share K-2890 case link with extended family", status: "pending" },
  { label: "Confirm bank details for first disbursement", status: "idle" }
];

const BENE_ACTIVITY = [
  { who: "Rasha S.", what: "pledged $400 to Case K-2890", when: "2h ago", kind: "pledge" },
  { who: "Fatima O. (ambassador)", what: "verified your government ID", when: "yesterday", kind: "verify" },
  { who: "Khalid M.", what: "pledged $250 to Case K-2890", when: "yesterday", kind: "pledge" },
  { who: "System", what: "Case K-3120 submitted for review", when: "5 days ago", kind: "system" },
  { who: "Fatima O. (ambassador)", what: "requested a medical referral letter", when: "1 week ago", kind: "request" }
];

const ICON_FOR_ACTIVITY = { pledge: "heart", verify: "shield", system: "doc", request: "mail" };

const BeneficiaryDashboard = () => {
  const verifStatus = "verified"; // Halima is verified as base state
  return (
    <>
      <Nav active="dashboard" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-dashboard">
        <div className="container">
          <Reveal as="header" className="bene-dashboard-hero">
            <div className="bene-dashboard-hero-text">
              <span className="section-eyebrow">Beneficiary dashboard</span>
              <h1>Welcome back, Halima</h1>
              <p>Your cases, your verification, your supporters — all in one place.</p>
            </div>
            <StatusPill status={verifStatus} />
          </Reveal>

          <section className="bene-stat-row">
            <div className="bene-stat">
              <span className="bene-stat-label">Active cases</span>
              <span className="bene-stat-value"><Counter to={2} /></span>
            </div>
            <div className="bene-stat">
              <span className="bene-stat-label">Funds raised</span>
              <span className="bene-stat-value">$<Counter to={5100} /></span>
              <span className="bene-stat-sub">of $11,600 target</span>
            </div>
            <div className="bene-stat">
              <span className="bene-stat-label">Supporters</span>
              <span className="bene-stat-value"><Counter to={17} /></span>
            </div>
          </section>

          <div className="bene-dashboard-grid">
            <section className="bene-cases-panel">
              <div className="panel-head">
                <h2>Your cases</h2>
                <a href="my-cases.html" className="btn-text">View all <Icon name="arrow" size={14} /></a>
              </div>
              {BENE_CASES.map(c => (
                <article key={c.id} className="bene-case-card">
                  <div className="bene-case-card-head">
                    <div>
                      <span className="bene-case-id">{c.id}</span>
                      <h3>{c.title}</h3>
                      <span className="bene-case-category">{c.category}</span>
                    </div>
                    <StatusPill status={c.status} />
                  </div>
                  <CaseProgressBar raised={c.raised} target={c.target} />
                  <div className="bene-case-card-foot">
                    <div className="bene-case-supporters">
                      {c.supporters.slice(0, 4).map((s, i) => <Avatar key={i} initials={s} size="sm" />)}
                      {c.supporters.length > 4 && <span className="bene-case-more">+{c.supporters.length - 4}</span>}
                      <span className="bene-case-updated">{c.updated}</span>
                    </div>
                    <a href="case-detail.html" className="btn btn-soft sm">View case <Icon name="arrow" size={14} /></a>
                  </div>
                </article>
              ))}
            </section>

            <aside className="bene-side-col">
              <section className="bene-next-steps panel">
                <h2>Next steps</h2>
                <ul className="bene-next-steps-list">
                  {BENE_NEXT_STEPS.map((s, i) => (
                    <li key={i}>
                      <StatusDot status={s.status} size={18} />
                      <span>{s.label}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bene-ambassador-card panel">
                <span className="section-eyebrow">Your ambassador</span>
                <div className="bene-ambassador-head">
                  <Avatar initials="FO" green />
                  <div>
                    <h3>Fatima O.</h3>
                    <span className="bene-ambassador-sub">Khartoum · 47 cases verified</span>
                  </div>
                </div>
                <p>Reply within 48 hours to keep your verification on track.</p>
                <a href="messages.html" className="btn btn-primary sm">Open conversation <Icon name="arrow" size={14} /></a>
              </section>
            </aside>
          </div>

          <section className="bene-activity panel">
            <h2>Recent activity</h2>
            <ul className="bene-activity-list">
              {BENE_ACTIVITY.map((a, i) => (
                <li key={i} className={`bene-activity-item bene-activity-${a.kind}`}>
                  <Icon name={ICON_FOR_ACTIVITY[a.kind] || "doc"} size={18} />
                  <div>
                    <span className="bene-activity-who">{a.who}</span>
                    <span className="bene-activity-what"> {a.what}</span>
                  </div>
                  <span className="bene-activity-when">{a.when}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<BeneficiaryDashboard />);
```

- [x] **Step 12.3: Create `beneficiary/dashboard.css`**

```css
.bene-dashboard{padding:48px 0 96px}
@media(max-width:880px){.bene-dashboard{padding:32px 0 64px}}

.bene-dashboard-hero{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:0 0 36px}
.bene-dashboard-hero h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(32px,3.8vw,44px);line-height:1.1;letter-spacing:var(--display-tracking);margin:8px 0 6px}
.bene-dashboard-hero p{font-size:15px;line-height:1.55;color:var(--ink-soft);margin:0;max-width:520px}
@media(max-width:640px){.bene-dashboard-hero{flex-direction:column;align-items:flex-start}}

.bene-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:0 0 36px}
@media(max-width:640px){.bene-stat-row{grid-template-columns:1fr}}
.bene-stat{padding:20px;background:var(--cream);border:1px solid var(--line);border-radius:6px;display:flex;flex-direction:column;gap:4px}
.bene-stat-label{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bene-stat-value{font-family:var(--ff-display);font-size:32px;font-weight:var(--display-weight);color:var(--ink);line-height:1.1}
.bene-stat-sub{font-size:12.5px;color:var(--muted)}

.bene-dashboard-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:24px;margin:0 0 36px}
@media(max-width:960px){.bene-dashboard-grid{grid-template-columns:1fr}}

.bene-cases-panel{display:flex;flex-direction:column;gap:14px}
.panel-head{display:flex;justify-content:space-between;align-items:center;margin:0 0 4px}
.panel-head h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:22px;line-height:1.2;letter-spacing:var(--display-tracking);margin:0}

.bene-case-card{padding:20px;background:var(--cream);border:1px solid var(--line);border-radius:6px;display:flex;flex-direction:column;gap:14px;transition:border-color .15s ease,box-shadow .15s ease}
.bene-case-card:hover{border-color:#d4caac;box-shadow:0 4px 16px -8px rgba(20,21,18,.1)}
.bene-case-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}
.bene-case-id{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bene-case-card-head h3{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:20px;line-height:1.2;letter-spacing:var(--display-tracking);margin:4px 0 4px}
.bene-case-category{font-size:13px;color:var(--ink-soft)}
.bene-case-card-foot{display:flex;justify-content:space-between;align-items:center;gap:14px}
.bene-case-supporters{display:flex;align-items:center;gap:6px}
.bene-case-more{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);margin-left:4px}
.bene-case-updated{font-size:12px;color:var(--muted);margin-left:10px}

.bene-side-col{display:flex;flex-direction:column;gap:20px}
.panel{padding:24px;background:var(--cream);border:1px solid var(--line);border-radius:6px}
.bene-next-steps h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:18px;margin:0 0 14px}
.bene-next-steps-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.bene-next-steps-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--ink)}

.bene-ambassador-head{display:flex;align-items:center;gap:12px;margin:10px 0 12px}
.bene-ambassador-head h3{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:18px;margin:0}
.bene-ambassador-sub{font-size:12px;color:var(--muted)}
.bene-ambassador-card p{font-size:13.5px;color:var(--ink-soft);margin:0 0 14px}

.bene-activity h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:22px;margin:0 0 14px}
.bene-activity-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.bene-activity-item{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;padding:10px 12px;border-radius:6px;font-size:14px;color:var(--ink)}
.bene-activity-item:hover{background:var(--cream-2)}
.bene-activity-who{font-weight:500}
.bene-activity-what{color:var(--ink-soft)}
.bene-activity-when{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted)}
```

- [x] **Step 12.4: Verify in browser**

```
open beneficiary/dashboard.html
```

Manual checks:
- Page loads, no console errors.
- Side badge shows "You're in: Beneficiary".
- Hero renders with verification pill (green "Verified").
- 3 stats row with counters animating.
- 2 case cards with progress bars, supporter avatars, status pills.
- Right rail: Next Steps + Ambassador card.
- Recent activity feed with 5 items.
- Click any "View case" → routes to `case-detail.html` (currently 404 until Task 14; verify the URL is correct).
- Resize to 360px / 768px / 1024px: layout stacks gracefully without overflow.

- [x] **Step 12.5: Dispatch impeccable subagent review**

Use the Agent tool with the template from the cross-cutting rule above, substituting:
- `<page>` → `beneficiary/dashboard.html`
- `§4.0.<n>` → `§4.0.1`

Apply must-fix and recommended-polish findings before committing.

- [x] **Step 12.6: Commit**

```bash
git add beneficiary/dashboard.html beneficiary/dashboard.jsx beneficiary/dashboard.css
git commit -m "feat(beneficiary): dashboard page with stats, cases, next steps, activity"
```

---

## Task 13 — Build `/beneficiary/my-cases.html`

**Files:**
- Create: `beneficiary/my-cases.html`, `beneficiary/my-cases.jsx`, `beneficiary/my-cases.css`

- [x] **Step 13.1: Create `beneficiary/my-cases.html`**

Copy the HTML shell from Task 12 Step 12.1 and adjust:
- `<title>My Cases — Ethos Community™ Beneficiary</title>`
- `<link rel="stylesheet" href="my-cases.css" />` (replacing `dashboard.css`)
- `<script type="text/babel" src="my-cases.jsx">` (replacing `dashboard.jsx`)

- [x] **Step 13.2: Create `beneficiary/my-cases.jsx`**

```jsx
const ALL_BENE_CASES = [
  { id: "K-2890", title: "Women's CPD — Finance Returnship", category: "Women CPD", raised: 4200, target: 8000, status: "verified", supporters: 12, updated: "2 days ago" },
  { id: "K-3120", title: "Children's Education Support", category: "Education", raised: 900, target: 3600, status: "pending", supporters: 5, updated: "5 days ago" },
  { id: "K-2700", title: "Family Living Support — Cairo Relocation", category: "Family Support", raised: 6000, target: 6000, status: "funded", supporters: 21, updated: "3 weeks ago" },
  { id: "K-2410", title: "Medical Follow-up — Mother", category: "Healthcare", raised: 1800, target: 1800, status: "completed", supporters: 9, updated: "2 months ago" }
];

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "funded", label: "Funded" },
  { value: "completed", label: "Completed" }
];

const MyCasesPage = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ALL_BENE_CASES : ALL_BENE_CASES.filter(c => c.status === filter);
  return (
    <>
      <Nav active="my-cases" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-my-cases">
        <div className="container">
          <header className="bene-my-cases-header">
            <div>
              <span className="section-eyebrow">My cases</span>
              <h1>All your support cases</h1>
            </div>
            <a href="../case-creation.html" className="btn btn-primary"><Icon name="plus" size={16} /> New case</a>
          </header>

          <div className="bene-filter-row">
            {FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                className={`bene-filter-chip ${filter === f.value ? "active" : ""}`}
                onClick={() => setFilter(f.value)}
              >{f.label}</button>
            ))}
          </div>

          <div className="bene-case-rows">
            {filtered.length === 0 && (
              <div className="bene-empty">
                <Icon name="doc" size={28} />
                <p>No cases match this filter.</p>
                <button type="button" className="btn-text" onClick={() => setFilter("all")}>Clear filter</button>
              </div>
            )}
            {filtered.map(c => (
              <article key={c.id} className="bene-case-row">
                <div className="bene-case-row-main">
                  <div className="bene-case-row-head">
                    <span className="bene-case-id">{c.id}</span>
                    <span className="bene-case-category">{c.category}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <CaseProgressBar raised={c.raised} target={c.target} compact />
                </div>
                <div className="bene-case-row-meta">
                  <StatusPill status={c.status} />
                  <span className="bene-case-row-supporters">{c.supporters} supporters</span>
                  <span className="bene-case-row-updated">Updated {c.updated}</span>
                </div>
                <a href="case-detail.html" className="bene-case-row-link" aria-label={`View ${c.id}`}><Icon name="arrow" size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<MyCasesPage />);
```

- [x] **Step 13.3: Create `beneficiary/my-cases.css`**

```css
.bene-my-cases{padding:48px 0 96px}
@media(max-width:880px){.bene-my-cases{padding:32px 0 64px}}

.bene-my-cases-header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:0 0 28px}
.bene-my-cases-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(28px,3.4vw,40px);line-height:1.1;letter-spacing:var(--display-tracking);margin:8px 0 0}
@media(max-width:640px){.bene-my-cases-header{flex-direction:column;align-items:flex-start}}

.bene-filter-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 24px}
.bene-filter-chip{font-family:inherit;font-size:13px;padding:8px 16px;border:1px solid var(--line);background:var(--cream);color:var(--ink-soft);border-radius:999px;cursor:pointer;transition:border-color .15s ease,background .15s ease,color .15s ease}
.bene-filter-chip:hover{border-color:var(--green);color:var(--ink)}
.bene-filter-chip.active{background:var(--green);border-color:var(--green);color:var(--cream)}
.bene-filter-chip:focus-visible{outline:2px solid var(--green);outline-offset:2px}

.bene-case-rows{display:flex;flex-direction:column;gap:12px}
.bene-case-row{display:grid;grid-template-columns:1.4fr auto auto;align-items:center;gap:20px;padding:20px;background:var(--cream);border:1px solid var(--line);border-radius:6px;transition:border-color .15s ease,box-shadow .15s ease}
.bene-case-row:hover{border-color:#d4caac;box-shadow:0 4px 16px -8px rgba(20,21,18,.08)}
@media(max-width:880px){.bene-case-row{grid-template-columns:1fr auto;gap:14px}.bene-case-row-meta{grid-column:1/-1;flex-wrap:wrap}}
.bene-case-row-main{display:flex;flex-direction:column;gap:8px;min-width:0}
.bene-case-row-head{display:flex;gap:12px;align-items:center}
.bene-case-row-main h3{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:18px;line-height:1.2;margin:0;letter-spacing:var(--display-tracking)}
.bene-case-row-meta{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
.bene-case-row-supporters,.bene-case-row-updated{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);letter-spacing:.04em}
.bene-case-row-link{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:var(--cream-2);color:var(--ink-soft);text-decoration:none;transition:background .15s ease,color .15s ease}
.bene-case-row-link:hover{background:var(--green);color:var(--cream)}
.bene-case-row-link:focus-visible{outline:2px solid var(--green);outline-offset:2px}

.bene-empty{padding:48px;text-align:center;color:var(--muted);background:var(--cream-2);border-radius:8px;display:flex;flex-direction:column;align-items:center;gap:10px}
.bene-empty p{margin:0;font-size:14px}
```

- [x] **Step 13.4: Verify**

```
open beneficiary/my-cases.html
```

Manual checks:
- Page loads, no console errors.
- 4 case rows render.
- Filter chips work: clicking "Pending" shows only 1 row; "Completed" shows 1; "All" restores all.
- "Clear filter" empty-state button shown when filter yields nothing — manually verify by selecting "Funded" filter then a non-existent filter (or temporarily change ALL_BENE_CASES to remove one state).
- "New case" CTA routes to `../case-creation.html`.
- Each row's arrow link routes to `case-detail.html`.

- [x] **Step 13.5: Impeccable subagent review**

Dispatch using the template above with `<page>` → `beneficiary/my-cases.html` and `§4.0.<n>` → `§4.0.2`. Apply findings.

- [x] **Step 13.6: Commit**

```bash
git add beneficiary/my-cases.html beneficiary/my-cases.jsx beneficiary/my-cases.css
git commit -m "feat(beneficiary): my-cases list page with filters"
```

---

## Task 14 — Build `/beneficiary/case-detail.html`

**Files:**
- Create: `beneficiary/case-detail.html`, `beneficiary/case-detail.jsx`, `beneficiary/case-detail.css`

- [x] **Step 14.1: Create `beneficiary/case-detail.html`**

Same shell as Task 12, with `title`/`css`/`jsx` swapped to `case-detail.*` and `<title>Case K-2890 — Ethos Community™ Beneficiary</title>`.

- [x] **Step 14.2: Create `beneficiary/case-detail.jsx`**

```jsx
const CASE = {
  id: "K-2890",
  title: "Women's CPD — Finance Returnship",
  category: "Women CPD",
  raised: 4200,
  target: 8000,
  status: "verified",
  created: "2026-04-18",
  narrative: "After a five-year career break to care for my children, I'm returning to finance with a structured CPD pathway: AAOIFI Islamic finance certification, advanced Excel + financial modelling, and a placement supported by a women's network in Khartoum.",
  ambassadorNote: "Halima's credentials and break-in-employment letter have been verified. CPD pathway is sequenced and matches recommended employer requirements.",
  supporters: [
    { initials: "RS", name: "Rasha S.", amount: 800, when: "2 days ago" },
    { initials: "KM", name: "Khalid M.", amount: 600, when: "3 days ago" },
    { initials: "AB", name: "Amir B.", amount: 500, when: "5 days ago" },
    { initials: "LS", name: "Anonymous", amount: 400, when: "1 week ago" },
    { initials: "MO", name: "Mariam O.", amount: 400, when: "1 week ago" },
    { initials: "FH", name: "Faisal H.", amount: 1500, when: "2 weeks ago" }
  ],
  docs: [
    { name: "Government ID", status: "complete", note: null },
    { name: "Proof of finance career (CV + last employer letter)", status: "complete", note: null },
    { name: "AAOIFI CPD enrolment confirmation", status: "complete", note: null },
    { name: "Letter of intent — sponsoring employer", status: "in_progress", note: "Ambassador requested a signed copy by Friday." },
    { name: "Bank/Wallet for first disbursement", status: "pending", note: null }
  ],
  updates: [
    { sender: "system", body: "Case created and submitted for verification.", when: "2026-04-18" },
    { sender: "ambassador", name: "Fatima O.", body: "ID and employer letter received — verifying with HR contact.", when: "2026-04-20" },
    { sender: "system", body: "Verification complete — case visible to supporters.", when: "2026-04-22" },
    { sender: "ambassador", name: "Fatima O.", body: "First pledges in. Reminder: please upload the sponsor letter of intent.", when: "2026-05-04" }
  ]
};

const TABS = ["Overview", "Funding", "Documents", "Updates"];

const CaseDetailPage = () => {
  const [tab, setTab] = useState("Overview");
  return (
    <>
      <Nav side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-case-detail">
        <div className="container">
          <a href="my-cases.html" className="btn-text bene-case-detail-back"><Icon name="arrow-left" size={14} /> Back to my cases</a>

          <header className="bene-case-detail-header">
            <div>
              <span className="bene-case-id">{CASE.id} · {CASE.category}</span>
              <h1>{CASE.title}</h1>
              <StatusPill status={CASE.status} />
            </div>
            <div className="bene-case-detail-actions">
              <button type="button" className="btn btn-soft sm" onClick={() => showToast("Edit case — coming soon")}>Edit case</button>
              <button type="button" className="btn btn-primary sm" onClick={() => showToast("Case link copied to clipboard")}>Share case <Icon name="arrow-up-right" size={14} /></button>
            </div>
          </header>

          <section className="bene-case-funding-band">
            <CaseProgressBar raised={CASE.raised} target={CASE.target} />
            <span className="bene-case-funding-stat">{CASE.supporters.length} supporters · created {CASE.created}</span>
          </section>

          <nav className="bene-tabs" role="tablist">
            {TABS.map(t => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`bene-tab ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >{t}</button>
            ))}
          </nav>

          <section className="bene-tab-panel">
            {tab === "Overview" && (
              <>
                <h2>Your case narrative</h2>
                <p>{CASE.narrative}</p>
                <div className="bene-ambassador-note">
                  <Icon name="shield" size={16} />
                  <div>
                    <span className="bene-ambassador-note-label">Ambassador verification note</span>
                    <p>{CASE.ambassadorNote}</p>
                  </div>
                </div>
              </>
            )}

            {tab === "Funding" && (
              <>
                <h2>Supporters & pledges</h2>
                <ul className="bene-supporters-list">
                  {CASE.supporters.map((s, i) => (
                    <li key={i}>
                      <Avatar initials={s.initials} />
                      <div className="bene-supporter-meta">
                        <span className="bene-supporter-name">{s.name}</span>
                        <span className="bene-supporter-when">{s.when}</span>
                      </div>
                      <span className="bene-supporter-amount">${s.amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "Documents" && (
              <>
                <h2>Verification documents</h2>
                <ul className="bene-doc-list">
                  {CASE.docs.map((d, i) => (
                    <li key={i} className={`bene-doc-item bene-doc-${d.status}`}>
                      <StatusDot status={d.status} size={20} />
                      <div className="bene-doc-body">
                        <span className="bene-doc-name">{d.name}</span>
                        {d.note && <span className="bene-doc-note">{d.note}</span>}
                      </div>
                      <button type="button" className="btn btn-soft sm" onClick={() => showToast(`Upload — demo only (${d.name})`)}>
                        {d.status === "complete" ? "Replace" : "Upload"}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "Updates" && (
              <>
                <h2>Case updates</h2>
                <div className="bene-updates">
                  {CASE.updates.map((u, i) => (
                    <MessageBubble key={i} sender={u.sender} name={u.name} timestamp={u.when}>{u.body}</MessageBubble>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CaseDetailPage />);
```

- [x] **Step 14.3: Create `beneficiary/case-detail.css`**

```css
.bene-case-detail{padding:32px 0 96px}
.bene-case-detail-back{display:inline-flex;align-items:center;gap:6px;margin:0 0 24px;color:var(--ink-soft)}

.bene-case-detail-header{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin:0 0 24px}
.bene-case-detail-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(28px,3.4vw,40px);line-height:1.1;letter-spacing:var(--display-tracking);margin:8px 0 10px}
.bene-case-detail-actions{display:flex;gap:10px;flex-shrink:0}
@media(max-width:640px){.bene-case-detail-header{flex-direction:column}.bene-case-detail-actions{align-self:stretch}}

.bene-case-funding-band{display:flex;align-items:center;gap:24px;padding:20px;background:var(--cream);border:1px solid var(--line);border-radius:6px;margin:0 0 24px}
.bene-case-funding-band .case-progress{flex:1}
.bene-case-funding-stat{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
@media(max-width:640px){.bene-case-funding-band{flex-direction:column;align-items:stretch}.bene-case-funding-stat{align-self:flex-start}}

.bene-tabs{display:flex;gap:4px;border-bottom:1px solid var(--line);margin:0 0 24px;overflow-x:auto}
.bene-tab{font-family:inherit;font-size:14px;padding:12px 16px;background:transparent;border:none;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:color .15s ease,border-color .15s ease;white-space:nowrap}
.bene-tab:hover{color:var(--ink)}
.bene-tab.active{color:var(--green);border-bottom-color:var(--green)}
.bene-tab:focus-visible{outline:2px solid var(--green);outline-offset:2px}

.bene-tab-panel{padding:24px;background:var(--cream);border:1px solid var(--line);border-radius:6px;min-height:280px}
.bene-tab-panel h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:22px;line-height:1.2;letter-spacing:var(--display-tracking);margin:0 0 16px}
.bene-tab-panel p{font-size:15px;line-height:1.6;color:var(--ink);max-width:65ch}

.bene-ambassador-note{display:flex;gap:10px;padding:16px;background:var(--cream-2);border-left:3px solid var(--green);border-radius:6px;margin:20px 0 0}
.bene-ambassador-note-label{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--green-2,#0a2e22);display:block;margin:0 0 4px}
.bene-ambassador-note p{font-size:14px;color:var(--ink-soft);margin:0}

.bene-supporters-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column}
.bene-supporters-list li{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}
.bene-supporters-list li:last-child{border-bottom:none}
.bene-supporter-meta{flex:1;display:flex;flex-direction:column;gap:2px}
.bene-supporter-name{font-size:14px;color:var(--ink)}
.bene-supporter-when{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted)}
.bene-supporter-amount{font-family:"JetBrains Mono",monospace;font-size:14px;color:var(--green);font-weight:600}

.bene-doc-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.bene-doc-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--cream-2);border-radius:6px}
.bene-doc-body{flex:1;display:flex;flex-direction:column;gap:4px}
.bene-doc-name{font-size:14px;color:var(--ink)}
.bene-doc-note{font-size:12.5px;color:var(--muted);font-style:italic}

.bene-updates{display:flex;flex-direction:column}
```

- [x] **Step 14.4: Verify**

```
open beneficiary/case-detail.html
```

Manual checks:
- Page loads, no console errors.
- Header: case ID, title, status pill, action buttons (Edit / Share).
- Funding band: progress bar + supporter count + creation date.
- Tabs: Overview / Funding / Documents / Updates — switching tabs shows correct content.
- Overview: narrative + ambassador note panel.
- Funding: 6 supporter rows.
- Documents: 5 docs with status dots; Upload/Replace buttons fire toast.
- Updates: 4 message bubbles (mixed system + ambassador) rendering correctly via `MessageBubble`.
- **NO "Support this case" CTA anywhere.** This is the key differentiator from supporter-side profiles.
- Back link routes to `my-cases.html`.

- [x] **Step 14.5: Impeccable subagent review**

Dispatch with `<page>` → `beneficiary/case-detail.html`, `§4.0.<n>` → `§4.0.3`. Apply findings.

- [x] **Step 14.6: Commit**

```bash
git add beneficiary/case-detail.html beneficiary/case-detail.jsx beneficiary/case-detail.css
git commit -m "feat(beneficiary): case-detail page with tabs and recipient framing"
```

---

## Task 15 — Build `/beneficiary/documents.html`

**Files:**
- Create: `beneficiary/documents.html`, `beneficiary/documents.jsx`, `beneficiary/documents.css`

- [x] **Step 15.1: Create `beneficiary/documents.html`**

Same shell as Task 12 with `documents.*` swapped in and `<title>Documents — Ethos Community™ Beneficiary</title>`.

- [x] **Step 15.2: Create `beneficiary/documents.jsx`**

```jsx
const DOCS = [
  { id: "id", name: "Government-issued ID", desc: "National ID, passport, or driver's licence", status: "complete", note: null, updated: "2026-04-19" },
  { id: "employer", name: "Proof of finance career", desc: "CV and last employer letter (Case K-2890)", status: "complete", note: null, updated: "2026-04-19" },
  { id: "enrolment", name: "AAOIFI CPD enrolment", desc: "Confirmation of programme enrolment", status: "complete", note: null, updated: "2026-04-21" },
  { id: "sponsor", name: "Sponsor letter of intent", desc: "Signed letter from sponsoring employer", status: "in_progress", note: "Ambassador requested a signed copy by Friday.", updated: "Awaiting upload" },
  { id: "bank", name: "Bank / wallet details", desc: "For first disbursement after verification", status: "pending", note: null, updated: "Required after sponsor letter" }
];

const summary = (docs) => {
  const total = docs.length;
  const done = docs.filter(d => d.status === "complete").length;
  return `${done} of ${total} verified`;
};

const DocumentsPage = () => {
  return (
    <>
      <Nav active="documents" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-documents">
        <div className="container">
          <header className="bene-documents-header">
            <div>
              <span className="section-eyebrow">Verification documents</span>
              <h1>Keep your verification current</h1>
              <p>Required documents power supporter trust and unlock disbursement steps.</p>
            </div>
            <div className="bene-documents-summary">
              <span className="bene-documents-summary-num">{summary(DOCS)}</span>
              <CaseProgressBar
                raised={DOCS.filter(d => d.status === "complete").length}
                target={DOCS.length}
                compact
              />
            </div>
          </header>

          <ul className="bene-doc-grid">
            {DOCS.map(d => (
              <li key={d.id} className={`bene-doc-card bene-doc-card-${d.status}`}>
                <div className="bene-doc-card-head">
                  <StatusDot status={d.status} size={22} />
                  <div>
                    <h3>{d.name}</h3>
                    <p>{d.desc}</p>
                  </div>
                </div>
                {d.note && <div className="bene-doc-card-note"><Icon name="bell" size={14} /> {d.note}</div>}
                <div className="bene-doc-card-foot">
                  <span className="bene-doc-card-updated">{d.updated}</span>
                  <button type="button" className="btn btn-soft sm" onClick={() => showToast(`Upload — demo only (${d.name})`)}>
                    {d.status === "complete" ? "Replace" : "Upload"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="bene-documents-cta">
            <button type="button" className="btn btn-primary" onClick={() => showToast("Submitted for re-verification — demo only")}>
              Submit for re-verification <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<DocumentsPage />);
```

- [x] **Step 15.3: Create `beneficiary/documents.css`**

```css
.bene-documents{padding:48px 0 96px}
.bene-documents-header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:0 0 32px}
.bene-documents-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(28px,3.4vw,40px);line-height:1.1;letter-spacing:var(--display-tracking);margin:8px 0 8px}
.bene-documents-header p{font-size:14.5px;color:var(--ink-soft);max-width:520px;margin:0}
.bene-documents-summary{min-width:240px;display:flex;flex-direction:column;gap:6px}
.bene-documents-summary-num{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
@media(max-width:640px){.bene-documents-header{flex-direction:column;align-items:stretch}.bene-documents-summary{min-width:0}}

.bene-doc-grid{list-style:none;padding:0;margin:0 0 32px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
@media(max-width:880px){.bene-doc-grid{grid-template-columns:1fr}}
.bene-doc-card{display:flex;flex-direction:column;gap:12px;padding:20px;background:var(--cream);border:1px solid var(--line);border-radius:6px;transition:border-color .15s ease}
.bene-doc-card-complete{border-color:var(--green)}
.bene-doc-card-in_progress{border-color:var(--gold)}
.bene-doc-card-head{display:flex;align-items:flex-start;gap:12px}
.bene-doc-card-head h3{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:18px;line-height:1.2;letter-spacing:var(--display-tracking);margin:0 0 4px}
.bene-doc-card-head p{font-size:13.5px;color:var(--ink-soft);margin:0}
.bene-doc-card-note{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--gold-2,#7a5d1f);background:rgba(166,130,46,.08);padding:10px 12px;border-radius:6px}
.bene-doc-card-foot{display:flex;justify-content:space-between;align-items:center;gap:12px}
.bene-doc-card-updated{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--muted);letter-spacing:.04em}

.bene-documents-cta{text-align:center}
```

- [x] **Step 15.4: Verify**

```
open beneficiary/documents.html
```

Manual checks:
- Page loads, no console errors.
- Header shows "3 of 5 verified" + a compact progress bar.
- 5 doc cards in 2-column grid; cards have border-color cue per status (green / gold / line).
- "Sponsor letter" card shows the ambassador note inside a gold-tinted panel.
- Upload / Replace buttons fire correct toast.
- "Submit for re-verification" CTA fires toast.

- [x] **Step 15.5: Impeccable subagent review**

Dispatch with `<page>` → `beneficiary/documents.html`, `§4.0.<n>` → `§4.0.4`. Apply findings.

- [x] **Step 15.6: Commit**

```bash
git add beneficiary/documents.html beneficiary/documents.jsx beneficiary/documents.css
git commit -m "feat(beneficiary): documents page with status grid"
```

---

## Task 16 — Build `/beneficiary/messages.html`

**Files:**
- Create: `beneficiary/messages.html`, `beneficiary/messages.jsx`, `beneficiary/messages.css`

- [x] **Step 16.1: Create `beneficiary/messages.html`**

Same shell, swap to `messages.*` and `<title>Messages — Ethos Community™ Beneficiary</title>`.

- [x] **Step 16.2: Create `beneficiary/messages.jsx`**

```jsx
const THREADS = [
  { id: "fatima-o", name: "Fatima O.", role: "Community ambassador · Khartoum", lastMsg: "Reminder: please upload the sponsor letter of intent.", unread: 1, active: true }
];

const MESSAGES = [
  { sender: "system", body: "Conversation started after Case K-2890 was created.", when: "2026-04-18" },
  { sender: "ambassador", name: "Fatima O.", body: "Welcome Halima — I've received your ID and CV. Verifying with your previous HR contact now.", when: "2026-04-19 · 10:14" },
  { sender: "me", name: "Halima M.", body: "Thank you Fatima. I've also attached the AAOIFI enrolment confirmation.", when: "2026-04-19 · 11:02" },
  { sender: "ambassador", name: "Fatima O.", body: "Got it. Verification complete from my side — your case is now visible to supporters.", when: "2026-04-22 · 09:30" },
  { sender: "system", body: "First pledge received from Rasha S. ($800).", when: "2026-05-01" },
  { sender: "ambassador", name: "Fatima O.", body: "Reminder: please upload the sponsor letter of intent by Friday so we can confirm the placement step.", when: "2026-05-09 · 16:48" },
  { sender: "me", name: "Halima M.", body: "Will do — meeting the sponsor on Thursday.", when: "2026-05-10 · 08:22" }
];

const MessagesPage = () => {
  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    showToast("Message sent — demo only");
    setDraft("");
  };
  return (
    <>
      <Nav active="messages" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-messages">
        <div className="container">
          <header className="bene-messages-header">
            <span className="section-eyebrow">Messages</span>
            <h1>Talk to your ambassador</h1>
          </header>

          <div className="bene-messages-layout">
            <aside className="bene-thread-list">
              {THREADS.map(t => (
                <button key={t.id} type="button" className={`bene-thread ${t.active ? "active" : ""}`}>
                  <Avatar initials="FO" green />
                  <div className="bene-thread-meta">
                    <span className="bene-thread-name">{t.name}</span>
                    <span className="bene-thread-role">{t.role}</span>
                    <span className="bene-thread-last">{t.lastMsg}</span>
                  </div>
                  {t.unread > 0 && <span className="bene-thread-unread">{t.unread}</span>}
                </button>
              ))}
            </aside>

            <section className="bene-thread-view panel">
              <header className="bene-thread-view-head">
                <Avatar initials="FO" green />
                <div>
                  <h2>Fatima O.</h2>
                  <span className="bene-thread-role">Community ambassador · Khartoum</span>
                </div>
              </header>

              <div className="bene-thread-messages">
                {MESSAGES.map((m, i) => (
                  <MessageBubble key={i} sender={m.sender} name={m.name} timestamp={m.when}>{m.body}</MessageBubble>
                ))}
              </div>

              <div className="bene-thread-composer">
                <FormTextarea
                  placeholder="Write a reply…"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  rows={3}
                />
                <button type="button" className="btn btn-primary" onClick={send} disabled={!draft.trim()}>
                  Send <Icon name="arrow" size={14} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<MessagesPage />);
```

- [x] **Step 16.3: Create `beneficiary/messages.css`**

```css
.bene-messages{padding:48px 0 96px}
.bene-messages-header{margin:0 0 28px}
.bene-messages-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(28px,3.4vw,40px);line-height:1.1;letter-spacing:var(--display-tracking);margin:8px 0 0}

.bene-messages-layout{display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:flex-start}
@media(max-width:880px){.bene-messages-layout{grid-template-columns:1fr}}

.bene-thread-list{display:flex;flex-direction:column;gap:8px}
.bene-thread{display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--cream);border:1px solid var(--line);border-radius:6px;cursor:pointer;text-align:left;font-family:inherit;color:inherit;transition:border-color .15s ease,background .15s ease;position:relative}
.bene-thread:hover{border-color:#d4caac}
.bene-thread.active{border-color:var(--green);background:rgba(14,59,46,.04)}
.bene-thread:focus-visible{outline:2px solid var(--green);outline-offset:2px}
.bene-thread-meta{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.bene-thread-name{font-weight:500;font-size:14px;color:var(--ink)}
.bene-thread-role{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bene-thread-last{font-size:12.5px;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.bene-thread-unread{position:absolute;top:14px;right:14px;background:var(--green);color:var(--cream);font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:600;padding:2px 6px;border-radius:999px;min-width:18px;text-align:center}

.bene-thread-view{display:flex;flex-direction:column;gap:16px;padding:0;overflow:hidden}
.bene-thread-view-head{display:flex;align-items:center;gap:12px;padding:18px 24px;border-bottom:1px solid var(--line)}
.bene-thread-view-head h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:18px;margin:0}
.bene-thread-messages{padding:20px 24px;display:flex;flex-direction:column;gap:4px;max-height:540px;overflow-y:auto}
.bene-thread-composer{padding:16px 24px 20px;border-top:1px solid var(--line);display:flex;gap:12px;align-items:flex-end}
.bene-thread-composer .form-textarea{flex:1;min-height:60px}
```

- [x] **Step 16.4: Verify**

```
open beneficiary/messages.html
```

Manual checks:
- Page loads, no console errors.
- Two-pane layout at >880px; stacks vertically below.
- Single thread in the left list with "1 unread" pill.
- Right pane: thread header (Fatima O.) + 7 messages mixing sender variants:
  - 2 system bubbles (centered pills)
  - 3 ambassador bubbles (left-aligned, cream-2 tint)
  - 2 me bubbles (right-aligned, green tint)
- Textarea composer at bottom; "Send" disabled until text typed; clicking Send fires toast and clears textarea.
- Resize to mobile: pane stacks, composer remains usable.

- [x] **Step 16.5: Impeccable subagent review**

Dispatch with `<page>` → `beneficiary/messages.html`, `§4.0.<n>` → `§4.0.5`. Apply findings.

- [x] **Step 16.6: Commit**

```bash
git add beneficiary/messages.html beneficiary/messages.jsx beneficiary/messages.css
git commit -m "feat(beneficiary): messages page with ambassador thread"
```

---

## Task 17 — Final validation pass

Catch-all verification before declaring Phase 1 complete.

- [ ] **Step 17.1: Whole-flow smoke test**

Clear browser localStorage first (`localStorage.clear()` in devtools console), then walk:

1. `open index.html` → redirects to landing
2. Click "Get Started" → routes to `role-chooser.html`
3. Select "Diaspora Supporter" → Continue → redirects to `/supporter/dashboard.html`
4. localStorage now has `ethos.role = "supporter"`
5. From supporter dashboard nav, click Healthcare → `/supporter/healthcare.html` loads
6. Click side badge "Switch role" → routes to `/role-chooser.html`
7. Maryam card pre-highlighted via the stored role? — *no, supporter was stored*; instead pick Beneficiary → Continue → redirects to `/beneficiary/dashboard.html`
8. localStorage updated to `ethos.role = "beneficiary"`
9. From beneficiary dashboard, click each beneficiary nav link (My Cases / Documents / Messages) — each loads
10. Click "View case" on dashboard → `/beneficiary/case-detail.html` loads
11. Back to landing.html (open root) → returning-user ribbon shows "Welcome back, Beneficiary" + link to `/beneficiary/dashboard.html`
12. Click "Create Case" from beneficiary nav → `/case-creation.html` loads with neutral nav
13. Walk the 5 steps → Submit → redirects to `/beneficiary/dashboard.html`

- [ ] **Step 17.2: Console error sweep**

For each page, open and check the browser devtools console for errors. Any error = bug to fix.

Pages to check:
- `landing.html`, `role-chooser.html`, `case-creation.html`, `index.html`
- `supporter/dashboard.html`, `supporter/impact.html`, `supporter/education.html`, `supporter/healthcare.html`, `supporter/sme-advisory.html`
- `supporter/cases/maryam.html`, `supporter/cases/awad.html`, `supporter/cases/yasmin.html`, `supporter/cases/afaf.html`, `supporter/cases/ibrahim.html`, `supporter/cases/halima.html`
- `beneficiary/dashboard.html`, `beneficiary/my-cases.html`, `beneficiary/case-detail.html`, `beneficiary/documents.html`, `beneficiary/messages.html`

- [ ] **Step 17.3: Broken-link sweep**

```bash
grep -rn 'href="supporter-dashboard.html"\|href="impact-dashboard.html"\|href="beneficiary-profile.html"\|href="awad-profile.html"\|href="yasmin-profile.html"\|href="afaf-profile.html"\|href="ibrahim-profile.html"\|href="halima-profile.html"' --include="*.jsx" --include="*.html" .
```

Expected: no matches (all old root-level paths should be gone or replaced with new subdirectory paths).

- [ ] **Step 17.4: Responsive sweep**

Open each new beneficiary page at 360px, 768px, 1024px, 1440px. Confirm no overflow, no broken layouts.

- [ ] **Step 17.5: Spec checklist sync**

Open `docs/superpowers/specs/2026-05-09-srs-gap-prototype-design.md` §10 (validation checklist) and tick off each item that this plan covered. Any unticked item = follow-up work for phase 2.

- [ ] **Step 17.6: Commit final validation fixes (if any)**

```bash
git add -A
git commit -m "fix(split): final validation sweep — broken links + console errors"
```

If no fixes needed, skip the commit.

---

## Phase 1 (revised) Done — Final Validation Checklist

- [ ] All existing supporter pages load at new `/supporter/*` paths without console errors
- [ ] All 5 beneficiary pages load at new `/beneficiary/*` paths without console errors
- [ ] Asset path references (`../`, `../../`) resolve correctly from every subdirectory page
- [ ] Every page passes explicit `<Nav side="..." />` (no implicit default reliance)
- [ ] Side badge shows on supporter + beneficiary nav, hidden on neutral
- [ ] Role chooser writes localStorage and redirects to correct side dashboard for all 7 roles
- [ ] Returning role chooser pre-highlights previously-selected role
- [ ] Landing page returning-user ribbon appears only when localStorage has a role
- [ ] Case-creation submit and cancel redirects honor `localStorage.ethos.side`
- [ ] Beneficiary case-detail does NOT show "Support this case" CTA
- [ ] Supporter case profiles still show "Support this case" CTA
- [ ] "Switch role" link from nav badge routes to role chooser; picking another role updates localStorage and redirects
- [ ] No supporter-side page links into `/beneficiary/*` and vice versa (except via role-chooser switcher)
- [ ] No console errors across all 19+ pages
- [ ] Mobile/tablet responsive at 360px / 768px / 1024px / 1440px
- [ ] All interactive controls fire `showToast()` (no silent clicks)
- [ ] Each beneficiary page has had an impeccable subagent review and findings applied
- [ ] No real functionality accidentally wired (all flows are mock/stub)

---

## Out of Scope (deferred to phase 2+)

- New SRS gap vertical pages: `women-empowerment`, `legal-services`, `product-traders`, `provider-marketplace`
- Landing page modifications: partner ecosystem section, revenue model strip, scalability band, Kushian branding
- `KushianBadge` component + nav placement
- Impact dashboard new metric cards + verticals strip
- SME advisory: finance-readiness checklist, cash-flow snapshot, finance referral panel
- Supporter dashboard: purpose badges on cases, empty-state guidance
- Per-profile-page similar-cases rows + toast copy updates referencing case-creation
- Other deferred shared components: `RoleCard` extensions, `ProviderCard`, `Checklist`, `PurposeBadge`, `PartnershipStrip`
- Removing the `side="supporter"` default in `Nav` (cleanup once every call site is verified)
