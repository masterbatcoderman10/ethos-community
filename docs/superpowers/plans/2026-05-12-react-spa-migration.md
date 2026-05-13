# Plan: React SPA Migration

**Date:** 2026-05-13
**Status:** In Progress
**Base Branch:** main
**Work Branch:** react-spa-migration

---

## Objective

Convert the CDN-based React prototype into a proper React SPA with Vite, ES modules, and React Router v6.

## Context

- Current: React 18 + Babel standalone CDN, no module system, 23 separate HTML files
- Target: Vite SPA with React Router, single HTML entry, ES modules
- All page logic stays as-is — only reorganized into modules
- `styles.css` stays unchanged — imported once in `main.jsx`
- `tweaks-panel.jsx` and EDITMODE blocks get dropped
- No TypeScript, no state management library, no backend

## Tasks

### Wave 1 — Scaffold Vite + React Router

Create the project skeleton:

1. Initialize `package.json` with dependencies: `react`, `react-dom`, `react-router-dom`
2. Add devDependencies: `vite`, `@vitejs/plugin-react`
3. Create `vite.config.js` with basic React plugin config
4. Create `index.html` — single SPA entry, Google Fonts link, `#root` div
5. Create `src/main.jsx` — imports ReactDOM, BrowserRouter, App, global CSS; renders `<BrowserRouter><App /></BrowserRouter>`
6. Create `src/App.jsx` — layout shell with `<Outlet />`, persistent nav header
7. Install dependencies and verify `npm run dev` starts with a placeholder page
8. Verify no console errors on startup

### Wave 2 — Shared Components

Extract primitives from `shared.jsx` into `src/components/`:

1. `src/components/Icon.jsx` — export default, all icon SVGs
2. `src/components/Counter.jsx` — export default, intersection observer counting
3. `src/components/Reveal.jsx` — export default, scroll reveal wrapper
4. `src/components/Toast.jsx` — export `showToast` function + toast container logic
5. Any other shared primitives found in `shared.jsx`
6. Verify each component can be imported and renders without errors
7. **Impeccable review** — dispatch subagent to audit components

### Wave 3a — Top-Level Pages

Migrate each HTML+JSX+CSS bundle to `src/pages/`:

1. `src/pages/Landing.jsx` — from `app.jsx` + `landing.html`
   - Import shared components from `src/components/`
   - Import `styles.css` (already in `main.jsx`)
   - Remove `useTweaks` and `TweaksPanel` references
   - Remove EDITMODE blocks
   - Keep all page logic, markup, and styles as-is
   - Export default function Landing()
2. `src/pages/RoleChooser.jsx` — from `role-chooser.jsx` + `role-chooser.html` + `role-chooser.css`
3. `src/pages/CaseCreation.jsx` — from `case-creation.jsx` + `case-creation.html` + `case-creation.css`
4. `src/pages/Showcase.jsx` — from `showcase.html` (standalone page)
5. Wire routes in `App.jsx` for `/`, `/role`, `/create`, `/showcase`
6. Verify each page loads at its route with no console errors
7. **Impeccable review** — dispatch subagent to audit migrated pages

### Wave 3b — Supporter Pages

Migrate all supporter pages:

1. `src/pages/SupporterDashboard.jsx` — from `supporter/dashboard.jsx`
2. `src/pages/SupporterImpact.jsx` — from `supporter/impact.jsx`
3. `src/pages/SupporterEducation.jsx` — from `supporter/education.jsx`
4. `src/pages/SupporterHealthcare.jsx` — from `supporter/healthcare.jsx`
5. `src/pages/SupporterLegalServices.jsx` — from `supporter/legal-services.jsx`
6. `src/pages/SupporterWomenEmpowerment.jsx` — from `supporter/women-empowerment.jsx`
7. `src/pages/SupporterSmeAdvisory.jsx` — from `supporter/sme-advisory.jsx`
8. `src/pages/SupporterProviderMarketplace.jsx` — from `supporter/provider-marketplace.jsx`
9. `src/pages/SupporterProductTraders.jsx` — from `supporter/product-traders.jsx`
10. `src/pages/SupporterCaseDetail.jsx` — from `supporter/cases/*.jsx` (dynamic route `/supporter/cases/:id`)
11. Wire routes in `App.jsx` for `/supporter`, `/supporter/impact`, etc.
12. Verify each supporter page loads correctly
13. **Impeccable review** — dispatch subagent to audit migrated pages

### Wave 3c — Beneficiary Pages

Migrate all beneficiary pages:

1. `src/pages/BeneficiaryDashboard.jsx` — from `beneficiary/dashboard.jsx`
2. `src/pages/BeneficiaryCaseDetail.jsx` — from `beneficiary/case-detail.jsx`
3. `src/pages/BeneficiaryMyCases.jsx` — from `beneficiary/my-cases.jsx`
4. `src/pages/BeneficiaryDocuments.jsx` — from `beneficiary/documents.jsx`
5. `src/pages/BeneficiaryMessages.jsx` — from `beneficiary/messages.jsx`
6. Wire routes in `App.jsx` for `/beneficiary`, `/beneficiary/case/:id`, etc.
7. Verify each beneficiary page loads correctly
8. **Impeccable review** — dispatch subagent to audit migrated pages

### Wave 4 — Navigation Audit

Replace all `<a href="*.html">` with `<Link to="">`:

1. Search all page JSX files for `href="*.html"` patterns
2. Replace internal navigation with `<Link to="/route">` from `react-router-dom`
3. Keep external links as `<a>` with `target="_blank" rel="noopener noreferrer"`
4. Update hash anchor links (`#verticals`, `#impact`, etc.) to use proper scroll behavior or keep as `<a>`
5. Update `ReturningRibbon` dashboard links
6. Update footer links
7. Update all CTA buttons that navigate
8. Spot-check every route works end-to-end
9. Verify no broken paths or 404s

### Wave 5 — Cleanup

Final cleanup and polish:

1. Remove all `legacy/` files (if created) or move originals to `legacy/`
2. Remove `tweaks-panel.jsx`
3. Remove all `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` blocks from any remaining files
4. Remove all Babel standalone CDN references
5. Remove all React CDN script tags
6. Remove all `<script type="text/babel">` patterns
7. Remove duplicate CSS variable `:root` blocks from page HTML files (now handled by global `styles.css`)
8. Run final lint pass
9. Verify `npm run dev` starts clean
10. **Impeccable review** — dispatch subagent for final audit
11. Verify all routes load, no console errors, navigation works

## Verification Checklist

- [ ] `npm run dev` starts Vite dev server
- [ ] Every route loads the correct page component
- [ ] No console errors on any page
- [ ] All navigation links work (internal via `<Link>`, external via `<a>`)
- [ ] Design matches current visual output (fonts, colors, spacing)
- [ ] All shared components render correctly
- [ ] No references to `*.html` files in JSX
- [ ] No CDN React/Babel references remain

## Notes

- Page-level CSS files should be imported in their respective page components: `import './PageName.css'`
- Keep all component logic exactly as-is — this is reorganization, not rewriting
- The `KushianBadge`, `Nav`, `Footer`, `PartnershipStrip`, `DemoTag` components from `shared.jsx` may need extraction during Wave 2 or 3
- `useTweaks` and all tweak-related code should be removed entirely
- If a component is only used in one page, it can stay in that page file rather than being extracted

## Design Document Reference

- See `docs/superpowers/specs/2026-05-12-react-spa-migration-design.md` for full migration design
- See `DESIGN.md` for design system tokens and visual standards
