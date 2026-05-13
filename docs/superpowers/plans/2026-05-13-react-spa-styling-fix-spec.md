# Fix Spec: React SPA Migration Styling Issues

**Date:** 2026-05-13
**Status:** Draft
**Branch:** react-spa-migration

---

## Problem Statement

The React SPA migration has significant styling inconsistencies and broken functionality across multiple pages. The original CDN-based prototype rendered correctly because each HTML file loaded its own CSS. In the migration, many CSS files were never imported into the corresponding page components.

---

## Root Cause Analysis

### Issue 1: Missing CSS Imports (8 Supporter Pages)

The original supporter pages each had a dedicated `.css` file:
- `supporter/impact.css`
- `supporter/education.css`
- `supporter/healthcare.css`
- `supporter/legal-services.css`
- `supporter/women-empowerment.css`
- `supporter/sme-advisory.css`
- `supporter/provider-marketplace.css`
- `supporter/product-traders.css`

These were **never imported** in the migrated `src/pages/*.jsx` components. Each page renders with only `styles.css` (global) and no page-specific styling.

### Issue 2: Missing Google Fonts — Material Symbols

The original `role-chooser.html` loaded:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,400,0,0" rel="stylesheet" />
```

The new `index.html` does NOT include this font. `RoleChooser.jsx` uses:
```jsx
<span className="material-symbols-rounded">arrow_forward</span>
```

Without the font, these render as plain text "arrow_forward" instead of icons.

### Issue 3: Missing Landing Page CSS (Partially Fixed)

The original `landing.html` had ~186 lines of inline `<style>` CSS. This was extracted to `src/pages/Landing.css` in a previous fix.

### Issue 4: Missing SupporterDashboard CSS (Partially Fixed)

The original `supporter/dashboard.html` had ~63 lines of inline `<style>` CSS. This was extracted to `src/pages/SupporterDashboard.css` in a previous fix.

### Issue 5: Counter Component Showing 0

The `Counter` component on the landing page uses `IntersectionObserver` to trigger counting animation. On initial load, all counters show "0" because:
- The `Reveal` wrapper may not be triggering correctly
- OR the Counter's intersection observer isn't firing
- OR there's a timing issue with Vite's module loading

### Issue 6: Double Navbar (Fixed)

`App.jsx` previously rendered a development nav on top of each page's own nav. Fixed by removing the App-level nav.

---

## Fix Plan

### Task 1: Add Material Symbols Font

**File:** `index.html`

Add the Material Symbols Rounded font link inside `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,400,0,0" rel="stylesheet" />
```

**Verification:** Role chooser page should show proper arrow icons instead of "arrow_forward" text.

### Task 2: Import Missing Supporter Page CSS

**Files to modify:** Add `import '../../supporter/PAGENAME.css'` to each:

| Page Component | CSS File Path |
|---|---|
| `src/pages/SupporterImpact.jsx` | `../../supporter/impact.css` |
| `src/pages/SupporterEducation.jsx` | `../../supporter/education.css` |
| `src/pages/SupporterHealthcare.jsx` | `../../supporter/healthcare.css` |
| `src/pages/SupporterLegalServices.jsx` | `../../supporter/legal-services.css` |
| `src/pages/SupporterWomenEmpowerment.jsx` | `../../supporter/women-empowerment.css` |
| `src/pages/SupporterSmeAdvisory.jsx` | `../../supporter/sme-advisory.css` |
| `src/pages/SupporterProviderMarketplace.jsx` | `../../supporter/provider-marketplace.css` |
| `src/pages/SupporterProductTraders.jsx` | `../../supporter/product-traders.css` |

**Note:** The CSS files are in `legacy/supporter/*.css` but should be copied/moved to the project root's `supporter/` directory during cleanup. Actually, looking at the current state, `legacy/supporter/*.css` files exist but the pages need to import them. The simplest approach is to copy these CSS files from `legacy/supporter/` to `supporter/` in the project root, OR update imports to point to `../../legacy/supporter/impact.css`.

**Better approach:** Copy all `legacy/supporter/*.css` files to `supporter/*.css` in project root, and update imports accordingly. Same for `legacy/beneficiary/*.css`.

**Verification:** Each supporter page should render with correct layout, colors, spacing, and component styling.

### Task 3: Fix Beneficiary CSS Import Paths

The beneficiary pages currently import from `../styles/beneficiary/*.css` (copied files). Verify these files have correct content and are being loaded. If not, copy from `legacy/beneficiary/*.css` to project root `beneficiary/*.css` and update imports to `../../beneficiary/*.css`.

**Verification:** All beneficiary pages render correctly.

### Task 4: Fix Counter Component

**Investigate:** The `Counter` component uses `IntersectionObserver` with `useRef`. Check if:
1. The ref is correctly attached to the DOM element
2. The observer triggers when the element scrolls into view
3. The animation uses `requestAnimationFrame` correctly

**Potential fix:** If the issue is that counters show 0 on initial load and never animate, we may need to:
- Add a fallback to show the target number immediately if the observer doesn't fire
- Or ensure the component re-renders when observed

**Verification:** Landing page shows "1,247" instead of "0" for Diaspora Supporters.

### Task 5: Verify Reveal Animation

The `Reveal` component also uses `IntersectionObserver`. Verify it correctly adds the `.in` class when elements scroll into view.

**Verification:** Scroll down on landing page — elements should fade in smoothly.

### Task 6: Final Visual Regression Testing

**Pages to test:**
1. `/` — Landing (hero, stats, verticals, case story, founder, CTA)
2. `/role` — Role chooser (icons, layout, selection states)
3. `/create` — Case creation (form layout, step wizard)
4. `/showcase` — Design system showcase
5. `/supporter` — Dashboard (hero, case rows, filters, panels)
6. `/supporter/impact` — Impact (charts, metrics)
7. `/supporter/education` — Education page
8. `/supporter/healthcare` — Healthcare page
9. `/supporter/legal` — Legal services page
10. `/supporter/women` — Women empowerment page
11. `/supporter/sme` — SME advisory page
12. `/supporter/marketplace` — Provider marketplace
13. `/supporter/traders` — Product traders
14. `/supporter/cases/maryam` — Case detail
15. `/beneficiary` — Beneficiary dashboard
16. `/beneficiary/cases` — My cases
17. `/beneficiary/documents` — Documents
18. `/beneficiary/messages` — Messages

**Checklist for each page:**
- [ ] No console errors
- [ ] Layout matches original (no broken grids, missing padding)
- [ ] Colors match original (green, gold, cream backgrounds)
- [ ] Typography correct (Newsreader display, Manrope body, JetBrains Mono labels)
- [ ] Icons render correctly (SVG icons, Material Symbols)
- [ ] Navigation works (no 404s, correct active states)
- [ ] Images load correctly
- [ ] Buttons styled correctly (pill shape, hover states)
- [ ] Responsive behavior works

---

## Implementation Strategy

Execute in waves:

**Wave 1 — Critical Fixes:**
1. Add Material Symbols font to index.html
2. Copy all `legacy/supporter/*.css` to `supporter/*.css`
3. Copy all `legacy/beneficiary/*.css` to `beneficiary/*.css`
4. Add CSS imports to all 8 missing supporter pages
5. Fix beneficiary import paths

**Wave 2 — Component Fixes:**
6. Fix Counter component showing 0
7. Verify Reveal animation

**Wave 3 — Visual Regression:**
8. Test every route visually
9. Compare against legacy pages
10. Fix any remaining inconsistencies

---

## Verification

- `npm run build` passes with zero errors
- `npm run dev` starts successfully
- Every route loads without console errors
- Visual output matches legacy HTML pages
