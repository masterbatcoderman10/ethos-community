# Design: React SPA Migration

**Date:** 2026-05-12  
**Status:** Draft  
**Decisions:** Vite SPA + React Router v6 · single HTML entry · import/export modules · drop tweaks-panel

---

## 1. Motivation

Convert the current CDN-based React prototype (23 separate HTML pages, no bundler, no module system, global Babel-standalone JSX) into a proper React SPA with Vite, ES modules, and client-side routing. The goal is a build system and module imports — less code, better dev experience (HMR), still a prototype with no business logic.

## 2. Current State

### Architecture
- React 18 + ReactDOM loaded from unpkg CDN
- Babel standalone transforms `text/babel` scripts in-browser
- No module system — components share global scope via `const { useState } = React`
- Navigation via plain `<a href="*.html">` between files (full page reloads)

### Files (46 total)
```
index.html                    → meta redirect to landing.html
landing.html + app.jsx        → main landing page
styles.css                    → 43KB global design-system CSS
role-chooser.html + role-chooser.jsx + role-chooser.css
case-creation.html + case-creation.jsx + case-creation.css
showcase.html (standalone)    → design system showcase
shared.jsx                    → 557 lines of shared components (Icon, Counter, Reveal, Toast, etc.)
tweaks-panel.jsx              → 568 lines dev-time prototyping tool (drop)

beneficiary/
  dashboard.html + dashboard.jsx + dashboard.css
  case-detail.html + case-detail.jsx + case-detail.css
  my-cases.html + my-cases.jsx + my-cases.css
  documents.html + documents.jsx + documents.css
  messages.html + messages.jsx + messages.css

supporter/
  dashboard.html + dashboard.jsx
  impact.html + impact.jsx + impact.css
  education.html + education.jsx + education.css
  healthcare.html + healthcare.jsx + healthcare.css
  legal-services.html + legal-services.jsx + legal-services.css
  women-empowerment.html + women-empowerment.jsx + women-empowerment.css
  sme-advisory.html + sme-advisory.jsx + sme-advisory.css
  provider-marketplace.html + provider-marketplace.jsx + provider-marketplace.css
  product-traders.html + product-traders.jsx + product-traders.css
  cases/ (subdirectory)
```

### Duplication
- Every HTML file duplicates: DOCTYPE, `<head>`, Google Fonts `<link>`, CSS variables `:root` block, React/Babel CDN `<script>` tags
- `shared.jsx` loaded as separate `<script>` tag in every HTML file

## 3. Target State

### Project Structure

```
ethos-community/
├── index.html                # Single SPA entry (replaces all 23 HTML files)
├── vite.config.js
├── package.json
├── DESIGN.md                 # Unchanged
├── PRODUCT.md                # Unchanged
├── styles.css                # Global design-system CSS (unchanged, 1 import)
├── favicon.svg               # Unchanged
│
├── src/
│   ├── main.jsx              # Bootstrap: ReactDOM + BrowserRouter + App
│   ├── App.jsx               # Layout shell: nav header + <Outlet/>
│   │
│   ├── components/           # Shared primitives extracted from shared.jsx
│   │   ├── Icon.jsx
│   │   ├── Counter.jsx
│   │   ├── Reveal.jsx
│   │   ├── Toast.jsx
│   │   └── ...
│   │
│   └── pages/                # One file per route (all ~18 pages)
│       ├── Landing.jsx
│       ├── RoleChooser.jsx
│       ├── CaseCreation.jsx
│       ├── Showcase.jsx
│       ├── SupporterDashboard.jsx
│       ├── SupporterImpact.jsx
│       ├── SupporterEducation.jsx
│       ├── SupporterHealthcare.jsx
│       ├── SupporterLegalServices.jsx
│       ├── SupporterWomenEmpowerment.jsx
│       ├── SupporterSmeAdvisory.jsx
│       ├── SupporterProviderMarketplace.jsx
│       ├── SupporterProductTraders.jsx
│       ├── SupporterCaseDetail.jsx   # /supporter/cases/:id (afaf, awad, halima, ibrahim, maryam, yasmin)
│       ├── BeneficiaryDashboard.jsx
│       ├── BeneficiaryCaseDetail.jsx
│       ├── BeneficiaryMyCases.jsx
│       ├── BeneficiaryDocuments.jsx
│       └── BeneficiaryMessages.jsx
│
├── legacy/                   # Original files kept for reference during migration
│   ├── landing.html
│   ├── app.jsx
│   ├── role-chooser.html / .jsx / .css
│   ├── case-creation.html / .jsx / .css
│   ├── shared.jsx
│   ├── supporter/
│   └── beneficiary/
```

### Component Architecture

- **`src/main.jsx`**: Imports React, ReactDOM, `BrowserRouter` from `react-router-dom`, `App` component, and global `styles.css`. Renders `<BrowserRouter><App /></BrowserRouter>` into `#root`.
- **`src/App.jsx`**: Persistent layout shell — navigation header with links to top-level sections, `<Outlet />` for route-rendered page content. Single import of Google Fonts stylesheet.
- **`src/components/*.jsx`**: Each shared primitive from `shared.jsx` becomes its own file with `export default`. Proper `import { useState, useEffect, useRef } from "react"` ES modules.
- **`src/pages/*.jsx`**: Each current HTML+JSX+CSS bundle becomes a single page component. `export default function PageName()`. Page-level CSS imported via `import "./PageName.css"` (or inline if small). Logic and markup kept as-is, just wrapped in proper exports.
- **`styles.css`**: Imported once in `main.jsx`. No changes needed — design system tokens, typography scale, and global utilities remain intact.

### Routing (React Router v6)

| Current HTML file | Route Path |
|---|---|
| `landing.html` | `/` |
| `role-chooser.html` | `/role` |
| `case-creation.html` | `/create` |
| `showcase.html` | `/showcase` |
| `supporter/dashboard.html` | `/supporter` |
| `supporter/impact.html` | `/supporter/impact` |
| `supporter/education.html` | `/supporter/education` |
| `supporter/healthcare.html` | `/supporter/healthcare` |
| `supporter/legal-services.html` | `/supporter/legal` |
| `supporter/women-empowerment.html` | `/supporter/women` |
| `supporter/sme-advisory.html` | `/supporter/sme` |
| `supporter/provider-marketplace.html` | `/supporter/marketplace` |
| `supporter/product-traders.html` | `/supporter/traders` |
| `supporter/cases/*.html` | `/supporter/cases/:id` |
| `beneficiary/dashboard.html` | `/beneficiary` |
| `beneficiary/case-detail.html` | `/beneficiary/case/:id` |
| `beneficiary/my-cases.html` | `/beneficiary/cases` |
| `beneficiary/documents.html` | `/beneficiary/documents` |
| `beneficiary/messages.html` | `/beneficiary/messages` |

All `<a href="*.html">` navigation links in page JSX become `<Link to="...">` components. `<a href="landing.html">` → `<Link to="/">`. External links stay as `<a>`.

### Dependencies

```jsonc
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "vite": "^6",
    "@vitejs/plugin-react": "^4"
  }
}
```

No state management library (zustand, redux, etc.) — this is a prototype with no business logic. `useState`/`useEffect` suffice. No TypeScript — keep JSX as-is.

### What Gets Dropped

- **tweaks-panel.jsx** — 568-line dev prototyping tool not needed in the new build system
- **All `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` blocks** — tweaks-panel injection points
- **Babel standalone CDN** — Vite handles JSX transpilation
- **React CDN scripts** — npm packages
- **All `<script type="text/babel">` tags** — replaced by ESM imports

### What Remains Unchanged

- **DESIGN.md** — design system spec
- **PRODUCT.md** — product definition
- **`styles.css`** — global design tokens and utility classes (imported, not rewritten)
- **All page-level CSS files** — co-located with page components as imports
- **All component logic** — just reorganized into ES modules, logic unchanged
- **The prototype nature** — no backend, no auth, no data persistence

## 4. Non-Goals

- No backend integration
- No authentication or authorization
- No data persistence (localStorage at most)
- No state management library
- No TypeScript conversion
- No design changes or redesigns
- No new features or pages
- No CSS rewrite

## 5. Migration Strategy (Waves)

### Wave 1 — Scaffold
Create Vite+React project, `index.html`, `main.jsx`, `App.jsx` with router skeleton and global CSS. Verify dev server starts with placeholder page.

### Wave 2 — Shared Components
Extract each primitive from `shared.jsx` (Icon, Counter, Reveal, Toast, etc.) into `src/components/` with proper `export default`. Verify each component renders in isolation.

### Wave 3 — Page Migration (sub-waves)
Systematically convert each HTML+JSX+CSS bundle into a `src/pages/` component. Each page: CSS import, component function, exported default. Link in router config.

**Wave 3a — Top-level pages:** Landing, RoleChooser, CaseCreation, Showcase  
**Wave 3b — Supporter pages:** Dashboard, Impact, Education, Healthcare, Legal, Women, SME, Marketplace, Traders  
**Wave 3c — Beneficiary pages:** Dashboard, CaseDetail, MyCases, Documents, Messages

### Wave 4 — Navigation Audit
Replace all `<a href="*.html">` with `<Link to="">`. Spot-check every route works end-to-end. Verify no broken paths.

### Wave 5 — Cleanup
Remove `legacy/` directory. Remove CDN references. Final lint/polish pass.

### Impeccable Review
After Waves 3a, 3b, 3c, and 5 — dispatch a subagent to audit the migrated pages against DESIGN.md via the `impeccable` skill. Fix any design regressions before declaring the wave complete.

## 6. Verification

- `npm run dev` starts Vite dev server with HMR
- Every route loads the correct page component
- No console errors on any page
- All navigation links work (internal via `<Link>`, external via `<a>`)
- Design matches current visual output (same fonts, colors, spacing)
