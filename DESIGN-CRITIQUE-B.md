# DESIGN.md Critique — Assessment B (Independent Second Opinion)
**Project:** Ethos Community™ — Kushian™ Sudan Pilot  
**File:** `/Users/mali/Documents/Projects/ethos-community/DESIGN.md`  
**Assessor:** Sub-agent B (codebase cross-check)  
**Date:** 2026-05-10

---

## Executive Summary

The DESIGN.md is **directionally accurate** but **incomplete and under-specified** for a production design system. It correctly captures the core color palette, font pairings, and atomic components (buttons, tags, cards), but misses ~60% of the typography scale, omits dozens of spacing values, fails to document composite/page-level components, and contains **3 verifiable inaccuracies** where the documented token does not match the actual CSS/JSX. The responsive breakpoint table is a fiction — the real codebase uses 5 breakpoints, not the 5 listed, and the descriptions of what happens at each are often wrong. Accessibility is mentioned only in passing; the code has modest a11y affordances that go undocumented, while significant gaps (reduced motion, focus management) are unaddressed in both code and design doc.

**Verdict:** This DESIGN.md is a good *mood board* and *starter token set*, but it would fail as a source of truth for a second developer trying to build new pages. It needs expansion, correction, and structural reorganization before it can serve as a durable design system reference.

---

## 1. Color Tokens — Accurate but Incomplete

### What's correct
All 12 named colors in `:root` match exactly across `styles.css`, `landing.html`, and all page files. The strategy description ("Restrained Committed palette: ~3 hues with red as functional signal") is an accurate read of the code.

### Issues found

**[P2] One-off hardcoded colors undocumented**
- `impact-dashboard.jsx` donut chart uses `#7a8c5c` and `#c46243` — these are not in the palette and have no token names.
- `styles.css` card hover border uses `#d4caac` (not a named token).
- `styles.css` button-gold hover uses `#d8b86c` (not a named token).
- Hatch pattern values `#d8cfba` / `#cdc3ad` appear 10+ times but are not tokenized.

**[P3] Blue token is dead code**
- `--blue:#1c3a5c` is defined in `:root` but **never used** in any UI component. The legal vertical icon uses `currentColor`, not blue. The DESIGN.md claims it is "Reserved for the legal vertical iconography" — this is post-hoc rationalization for an unused variable. Either remove it or actually apply it.

**[P2] Shadow color inconsistency**
- `toast-shadow` uses `rgba(0,0,0,.5)` (pure black) while every other shadow uses `rgba(20,21,18,...)`. This violates the doc's own rule: "Tint every neutral toward the brand hue."

---

## 2. Typography — Severely Under-Documented

### What's correct
The 6 documented tokens (display, h1-display, body-md, body-sm, label, mono-sm) exist and match. The font-pair switching via `body[data-pair]` is accurate.

### Issues found

**[P1] Typography scale is ~40% complete**
The codebase uses **at least 18 additional type sizes** that are not tokenized:

| Size | Location in code | Missing token |
|------|------------------|---------------|
| clamp(48px, 6vw, 96px) | `.imp-hero h1` (impact-dashboard.css) | `hero-xl` |
| clamp(40px, 5vw, 72px) | `.vert-hero h1` (education/healthcare/sme css) | `vert-hero-title` |
| clamp(36px, 4vw, 52px) | `.dash-greet`, `.bp-name` | `h2-display` |
| clamp(28px, 3vw, 42px) | `.case h3` (landing.html) | `case-title` |
| 46px | `.stat .num` (landing.html) | `stat-num` |
| 36px | `.sum-card .num`, `.vert-stats .num` | `summary-num` |
| 32px | `.num-big`, `.audit-strip h3` | `panel-heading` |
| 28px | `.case-stat .num` | `case-stat-num` |
| 24px | `.card h3`, `.step h4`, `.bp-section h3` | `h3` |
| 22px | `.logo`, `.photo-overlay`, hero-meta num | `hero-meta-num` |
| 20px | `.founder-name` | `founder-name` |
| 19px | `.lede` (landing.html) | `lede` |
| 18px | `.vert-hero p`, `.imp-hero p`, `.bp-side .panel h4` | `body-lg` |
| 16px | Case paragraphs, various | `body-md-alt` |
| 13.5px | `.activity-item`, `.bar-chart`, `.mentor .bio` | `body-xs` |
| 13px | `.btn-sm`, `.case-meta`, various | `meta-sm` |
| 12px | `.donut-legend strong`, `.chip` (alternate) | `mono-xs` |
| 10px | `.geo .label`, tag in ledger | `micro` |

**[P2] Inconsistent clamp ratios**
- `h1-display` ratio: 44→82 (~1.86x)
- `display` ratio: 34→56 (~1.65x)
- `imp-hero h1` ratio: 48→96 (2x)
- `vert-hero h1` ratio: 40→72 (1.8x)
- `dash-greet` ratio: 36→52 (~1.44x)

There is no coherent modular scale. The DESIGN.md claims "Hierarchy through scale + weight contrast (≥1.25 ratio between steps)" but doesn't enforce this — the actual ratios are arbitrary.

**[P3] Font loading inconsistency**
- `landing.html` loads `DM+Serif+Display:ital@0;1` (italics enabled).
- `supporter-dashboard.html` loads `DM+Serif+Display` (no italics parameter).
- If a user switches to the DM pair on the dashboard, italic display text will fail to render or fall back to synthetic italics. The DESIGN.md doesn't document this cross-page font-loading discrepancy.

---

## 3. Spacing — Tokenized Values Are Correct; Most Values Are Not Tokenized

### What's correct
The 9 spacing tokens (xs, sm, md, lg, xl, section, section-tight, container-pad, container-pad-mobile) all match.

### Issues found

**[P2] Missing spacing tokens**
Dozens of spacing values are hardcoded and not tokenized:
- `14px` — hero-ctas gap, photo-meta bottom position
- `20px` — summary-grid gap, panel+panel margin
- `28px` — eyebrow margin-bottom, card padding
- `36px` — strip-grid padding
- `48px` — section-head gap, footer-top gap, block-head gap
- `56px` — case-content padding
- `64px` — section-head margin-bottom, imp-hero-grid gap
- `96px` — cta-band padding

**[P3] No vertical rhythm system**
The DESIGN.md mentions "120px section padding on desktop" but doesn't define a base unit or grid. The code uses arbitrary padding values (64px, 80px, 96px, 100px, 120px) with no clear modular relationship.

---

## 4. Layout & Breakpoints — The Table Is Misleading

### What's documented
| Name | Width | Key change |
|------|-------|------------|
| sm | 560px | Single-column stacks, reduced padding |
| md | 720px | Container padding shrinks, touch targets min 44px |
| lg | 880px | Nav collapses to hamburger, grids switch to 2-col |
| xl | 980px | Hero grids stack vertically |
| xxl | 1080px | Dashboard sidebar collapses below |

### Issues found

**[P1] Breakpoint descriptions are often wrong**
- **md (720px):** Container padding does shrink (32px→20px), but touch targets are enforced at *all* sizes below 720px, not specifically at 720px. Also, 720px is used for `partners-row`, `doc-list`, and `supporter-grid` — none of which are mentioned.
- **lg (880px):** Nav does collapse here, but grids switch to 2-col at *980px* (`.verticals`), not 880px. At 880px, `.section-head`, `.case`, `.steps`, `.founder`, `.split`, `.big-stats`, `.dash-hero-grid`, and ~15 other grids collapse to 1-column. The description "grids switch to 2-col" is backwards — most grids go to 1-col at 880px.
- **xl (980px):** Hero grids *do* stack here, but `.verticals` also switches from 3-col to 2-col at 980px — not mentioned.
- **xxl (1080px):** The description says "Dashboard sidebar collapses below" but the code uses 1080px for `.bp-hero-grid` and `.dash-body` — these are beneficiary profile and dashboard body grids, not specifically a "sidebar." The description is imprecise.

**[P2] Missing breakpoints**
The codebase actively uses **600px** and **560px** breakpoints that aren't in the table:
- `600px`: `.verticals` → 1-col, `.footer-bottom` stacks, `.footer-top` grid adjusts.
- `560px`: `.bar-chart` → flex-col, `.big-stats` → 1-col, `.donut-wrap` stacks, `.bp-tabs` converts to pill grid, `.vert-stats` → 1-col, `.advisor-row` → 1-col, `.workflow` padding shrinks, `.case-photo` min-height reduces, `.case-stats` → 1-col, `.case-content` padding shrinks.

**[P3] No container query documentation**
All responsive behavior is viewport-based. The DESIGN.md doesn't acknowledge this limitation or suggest container queries for reusable components.

---

## 5. Components — Atomic OK; Composite Missing

### What's correct
All atomic components (button, nav, card, tag, chip, panel, photo, avatar, progress, field, table, toast, timeline, demo-tag, footer) are documented with accurate specs.

### Issues found

**[P1] Missing composite/page-level components (~20)**
The DESIGN.md documents the "atoms" but ignores the "molecules" and "organisms" that make up every page:

| Component | Files | Complexity |
|-----------|-------|------------|
| `vcard` (vertical service card) | landing.html, app.jsx | High — num, icon, title, desc, tags, hover arrow |
| `step` (how-it-works) | landing.html | Medium — num, title, desc |
| `stat` (impact strip) | landing.html | Medium — num, label |
| `case` (featured case story) | landing.html | High — photo + content + stats + CTA |
| `founder` | landing.html | High — photo + quote + credentials |
| `cta-band` | landing.html | Medium — dark band with centered CTAs |
| `case-row` (dashboard list item) | supporter-dashboard.html | High — avatar, meta, progress, tag, action |
| `sum-card` (dashboard summary) | supporter-dashboard.html | Medium — label, num, delta |
| `filter-bar` / `chip` filter | supporter-dashboard.html | Medium — active states, counts |
| `activity-item` | supporter-dashboard.html, beneficiary-profile.jsx | Low — timestamp + text |
| `panel` variants (activity, featured, suggested) | supporter-dashboard.jsx | Medium — multiple semantic panel types |
| `persona-pill` | supporter-dashboard.html | Low — avatar + name, active state |
| `mentor` card | education.css | Medium — avatar, name, role, bio, skills, foot |
| `cpd-track` | education.css | High — multi-step progress tracker |
| `vault-item` | education.css | Low — icon + name + sub |
| `student-row` | education.css | Medium — avatar, name, sub, progress |
| `takaful-card` | healthcare.css | High — featured/non-featured variants, pool stats, list |
| `urgency-bar` | healthcare.css | Medium — icon, title, desc, CTA |
| `partner-card` | healthcare.css | Low — logo, name, sub, desc |
| `sme-card` | sme-advisory.css | High — biz type, title, lede, stats grid |
| `svc` (service item) | sme-advisory.css | Low — icon, title, desc |
| `advisor` card | sme-advisory.css | Low — avatar, name, role |
| `workflow` band | sme-advisory.css | High — dark band, 4 steps |
| `bar-chart` | impact-dashboard.css | High — label, track, fill, value |
| `donut` + `donut-legend` | impact-dashboard.jsx | High — SVG segments, swatches, percentages |
| `geo` grid item | impact-dashboard.css | Low — num, label |
| `ledger-row` | impact-dashboard.css | High — date, id, desc, partner, amount, status |
| `audit-strip` | impact-dashboard.css | High — dark block, seal, CTAs |
| `bp-hero-grid` | beneficiary-profile.css | High — 3-column responsive layout |
| `bp-tabs` | beneficiary-profile.css | Medium — desktop tabs → mobile pills |
| `doc-list` / `doc` | beneficiary-profile.css | Medium — icon, name, sub, check |
| `timeline` / `tl-item` | beneficiary-profile.css | High — border, dots, states |
| `supporter-grid` / `supporter` | beneficiary-profile.css | Medium — avatar, name, loc, amount |

**[P2] Inaccurate hover states**
- `button-gold-hover` is documented as `#d8b86c`, but in the featured case (landing.html lines 142-143), the hover is `background:var(--cream)` — a **different color entirely**.
- `button-primary` in the CTA band (landing.html lines 168-169) uses `background:var(--gold);color:var(--ink)` — this is a **semantic override** of the primary button that isn't documented as a variant.

**[P2] Missing hover animations**
- `.vcard-arrow` has a `transform:translate(4px,-4px)` on hover — not documented.
- `.mentor:hover` and `.sme-card:hover` use `transform:translateY(-2px)` — not documented.
- `.case-row:hover` and `.student-row:hover` use background tints — not documented.

**[P3] Photo radius discrepancy**
- DESIGN.md says photos use `rounded.sm` (4px).
- `.bp-photo` in `beneficiary-profile.css` uses `border-radius:6px` (rounded.md).
- `.case-photo` in `landing.html` has no explicit radius (inherits from `.photo` = 4px) but its container `.case` has `border-radius:6px`.

---

## 6. Animation — Accurate but Incomplete

### What's correct
All 8 documented animation tokens exist in the code.

### Issues found

**[P2] Reveal threshold varies across files**
- `styles.css` / `shared.jsx`: `threshold: 0.12`
- `app.jsx` (landing): `threshold: 0.15`
- `Counter` component: `threshold: 0.4`

The DESIGN.md documents a single `reveal` token but doesn't note the threshold variation.

**[P3] No reduced-motion handling**
The code has **zero** `prefers-reduced-motion` media queries. The DESIGN.md doesn't mention this as a gap or requirement.

---

## 7. Accessibility — Mentioned in Code, Ignored in Design Doc

### What's in the code but not the DESIGN.md
- `aria-label` on hamburger buttons (`"Close menu"` / `"Open menu"`)
- `aria-expanded` on hamburger buttons
- `role="button"` on dashboard case rows
- `aria-checked` on tweak panel toggles
- `text-wrap:balance` on all major headings (improves readability)

### Issues found

**[P2] Focus management is undocumented and inconsistent**
- Form fields have `:focus{border-color:var(--green)}` — documented.
- Buttons have **no documented focus state** (no `:focus-visible` styles in the code).
- Links have **no focus state**.
- Cards are clickable but have **no focus indicator**.
- The toast is injected dynamically but has **no `aria-live` region**.

**[P2] Missing a11y tokens/patterns**
- No skip-link component.
- No documented heading hierarchy (the code uses `h1`→`h2`→`h3` correctly, but this isn't specified).
- No documented color contrast ratios. The green-on-cream combinations pass WCAG AA, but gold-on-green-2 (button-gold) and cream-on-green (panel-dark) should be explicitly verified and documented.

**[P3] `overflow-x:clip` on body**
- `styles.css` sets `overflow-x:clip` on `html,body`. This prevents horizontal scroll but can trap zoomed content. The DESIGN.md doesn't mention this as a deliberate choice or its a11y implications.

---

## 8. Structural / Meta Issues

**[P2] No version or changelog**
The doc has `version: alpha` but no date, no author, no "last updated," and no mechanism for tracking changes. Given that the codebase has evolved significantly beyond what's documented, there's no way to know which parts are current.

**[P2] No component usage map**
There's no indication of which components are used on which pages. For example, `table` is only used in the ledger (impact dashboard), but a reader might assume it's a global pattern.

**[P3] File organization not documented**
The DESIGN.md doesn't explain that styles are split across:
- `styles.css` (shared atomic components)
- `landing.html` <style> (landing-specific)
- `impact-dashboard.css`, `beneficiary-profile.css`, `education.css`, `healthcare.css`, `sme-advisory.css` (page-specific)
- Inline styles in JSX files

This fragmentation means the DESIGN.md can't be the single source of truth unless it acknowledges the architecture.

---

## Priority Issue Summary

| Severity | Count | Category |
|----------|-------|----------|
| P1 | 3 | Missing typography scale, missing composite components, breakpoint table inaccuracies |
| P2 | 14 | One-off colors, font loading inconsistency, missing spacing tokens, missing breakpoints, inaccurate hover states, hover animations, reveal thresholds, focus management, meta issues |
| P3 | 7 | Dead blue token, shadow inconsistency, clamp ratio inconsistency, photo radius discrepancy, reduced motion, overflow-x:clip, usage map |

---

## Recommendations

1. **Expand typography to a full 12+ step scale** with documented usage for each token. Map every `font-size` in the codebase to a token.
2. **Add all composite components** (vcard, case-row, mentor, takaful-card, workflow, audit-strip, etc.) with their specific variants, hover states, and responsive behavior.
3. **Correct the breakpoint table** to match actual code: add 560px and 600px, fix the descriptions for 880px and 980px, or remove the "Key change" column if it can't be kept accurate.
4. **Fix the 3 documented inaccuracies:**
   - Change `button-gold-hover` to match the featured case hover (`var(--cream)`) OR change the code to match the doc (`#d8b86c`).
   - Document `.bp-photo` as using `rounded.md` (6px) or change the code to 4px.
   - Remove `--blue` from `:root` or actually use it for the legal vertical.
5. **Tokenize one-off colors** (`#d4caac`, `#d8b86c`, hatch pattern values) or replace them with existing token combinations.
6. **Document accessibility patterns** explicitly: focus states, `aria-live`, `prefers-reduced-motion`, heading hierarchy, and contrast ratios.
7. **Add a "Component Usage" section** mapping each token/component to the pages/files where it appears.
8. **Consider OKLCH conversion** — the doc mentions OKLCH in the skill reference but the actual tokens are all hex. Converting to OKLCH would make the "tint every neutral toward the brand hue" rule enforceable.

---

*Assessment B complete. This critique can be reconciled with Assessment A to produce a unified action plan.*
