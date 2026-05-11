# DESIGN.md Critique — Assessment A
## Ethos Community™ Design System Spec Review
**Assessor:** independent sub-agent  
**Target:** `/Users/mali/Documents/Projects/ethos-community/DESIGN.md`  
**Scope:** accuracy, completeness, consistency with actual codebase, missing components, wrong colors/fonts, broken token references, taste-rule violations  
**Date:** 2026-05-10

---

## Executive Summary

The DESIGN.md is a **well-intentioned but incomplete and partially self-contradictory** spec. The color palette and core component tokens are accurate, but the spec omits roughly 20 real components, documents 3 components/tokens that do not exist in code, and contains direct contradictions with its own "Don't" list. Typography enforcement is weak — the pitch-deck composition and several dashboard surfaces deviate from the declared 400-weight-only rule. The spec also fails to document major layout primitives (hero, strip, steps, vcard, case-row, etc.) that are heavily used across the prototype.

**Overall verdict:** The DESIGN.md is a decent *reverse-engineered snapshot* but not a rigorous design-system contract. It would fail a design-ops audit.

---

## Design Health Score (Spec Fidelity)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Color accuracy | 4 | All 12 tokens map 1:1 to CSS custom properties |
| 2 | Typography enforcement | 2 | Pitch deck uses 300; dashboard uses untokenized sizes; h3 missing token |
| 3 | Component completeness | 1 | ~20 real components undocumented; 3 spec'd components unused |
| 4 | Token reference integrity | 3 | No broken `{colors.foo}` refs, but dead tokens exist |
| 5 | Self-consistency | 1 | Spec bans glassmorphism then specifies it for nav + demo-tag |
| 6 | Taste-rule compliance | 2 | Identical card grids and hero-metric templates exist in actual UI |
| 7 | Spacing / layout tokens | 4 | Breakpoints and spacing values match code exactly |
| 8 | Elevation / motion | 3 | Animation tokens match, but some easing values are inline in code |
| 9 | Coverage of exceptions | 1 | CTA-band button overrides, `.panel.verification`, persona-pill all undocumented |
| 10 | Register alignment | 3 | Warm editorial tone is correct, but pitch deck breaks it |
| **Total** | | **24/40** | **Moderate — usable as reference, not as source of truth** |

---

## Anti-Patterns & AI Slop Verdict

The DESIGN.md itself is not "AI slop" — it shows clear authorial intent. However, the **actual codebase it governs** contains patterns that the spec explicitly bans:

- **Identical card grids** (`vcard` ×6, `step` ×3, `takaful-card` ×3) — each is icon/num + heading + text, repeated endlessly. DESIGN.md "Don't" list forbids this.
- **Hero-metric templates** (`sum-card`, `big-stats`, `geo-grid`, `vert-stats`) — big number + small label + delta. DESIGN.md explicitly bans "The hero-metric template."
- **Glassmorphism** — DESIGN.md bans it, then specifies `backdrop-filter: blur(14px)` on `nav` and `blur(8px)` on `demo-tag`.
- **Generic pitch-deck weight** — `isdb-pitch/index.html` uses `font-weight: 300` throughout, giving it a cold, default-tech-deck feel that clashes with the warm editorial register.

---

## Priority Issues

### [P0] Self-contradiction: glassmorphism banned but specified
- **What:** DESIGN.md "Don't" list says "Don't use glassmorphism or translucent overlays on text." Yet the `nav` component spec includes `backdropFilter: "{elevation.nav-blur}"` (`blur(14px)`), and the `demo-tag` spec includes `backdropFilter: "blur(8px)"`.
- **Why it matters:** A spec that contradicts itself cannot be enforced. Developers will ignore the ban because the canonical components require it.
- **Fix:** Either remove the glassmorphism ban (and document it as a restricted pattern), or remove blur from nav/demo-tag and replace with solid semi-transparent backgrounds.
- **Command:** `$impeccable distill`

### [P0] Identical card grids in actual UI violate spec's own "Don't" list
- **What:** `vcard` grid (6 cards: icon + h3 + p + tags), `step` grid (3 cards: num + h4 + p), and `takaful-card` grid all match the banned "Identical card grids. Same-sized cards with icon + heading + text, repeated endlessly."
- **Why it matters:** The spec is supposed to prevent generic SaaS patterns. If the live UI contains them, the spec is either ignored or incomplete.
- **Fix:** Redesign verticals as a flow/list or vary card sizes/aspect ratios. Add imagery or asymmetric layouts to steps.
- **Command:** `$impeccable layout`

### [P0] Hero-metric templates present in dashboard surfaces
- **What:** `sum-card` (big num + label + delta), `big-stats` (4-up large numbers), `geo-grid` (14 small metric cards), and `vert-stats` (3-up numbers) all replicate the banned "hero-metric template."
- **Why it matters:** These are the exact cliché the spec calls out as "SaaS cliché." Their presence undermines the editorial positioning.
- **Fix:** Replace sum-cards with narrative sentence structures or progress visuals. Vary geo-grid cell sizes by magnitude.
- **Command:** `$impeccable layout`

### [P1] Typography token gaps and weight violations
- **What:**
  1. `h3 / card title` is listed in the Scale table (24px / 1.15) but has **no frontmatter typography token**.
  2. `.lede` in `landing.html` is `19px` — not tokenized anywhere.
  3. `imp-hero h1` in `impact-dashboard.css` uses `clamp(48px,6vw,96px)`, exceeding the `h1-display` token of `clamp(44px,6vw,82px)`.
  4. `isdb-pitch/index.html` uses `font-weight: 300` on 27 declarations, violating the "Display weight: 400 (never bold — hierarchy through size and space, not weight)" rule.
- **Why it matters:** Untokenized sizes create drift. The 300-weight pitch deck feels cold and corporate, breaking the warm editorial register.
- **Fix:** Add `h3` token. Normalize `.lede` to `body-md` (17px) or tokenize it. Cap impact hero to 82px. Lock pitch deck to 400.
- **Command:** `$impeccable typeset`

### [P1] Dead spec components — documented but unused in codebase
- **What:** Three components are fully spec'd in DESIGN.md but have **zero implementations**:
  - `panel-dark` — no `.panel-dark` class found anywhere.
  - `credential-pill` — no `.credential-pill` class found anywhere.
  - `colors.blue` / `--blue` — defined in CSS but never used (legal vertical icon uses `currentColor`, not blue).
- **Why it matters:** Dead tokens bloat the spec and confuse implementers.
- **Fix:** Remove `panel-dark` and `credential-pill` from spec, or implement them. Remove `--blue` if legal vertical icons won't use it.
- **Command:** `$impeccable document`

### [P1] ~20 real components missing from DESIGN.md
- **What:** The following components exist in code but are not documented:
  - Layout: `hero`, `hero-grid`, `hero-ctas`, `hero-meta`, `strip`, `strip-grid`, `stat`, `section-head`, `founder`, `steps`, `step`, `cta-band`
  - Cards: `vcard`, `case-row`, `sum-card`, `mentor`, `sme-card`, `takaful-card`
  - Data: `geo`, `geo-grid`, `donut` (legend/swatch missing), `bar-chart` (only track/fill tokenized), `ledger-row`
  - UI: `panel` (`.verification` variant), `bp-tab`, `doc`, `supporter`, `persona-pill`, `filter-bar`
  - Blocks: `audit-strip`, `seal`, `urgency-bar` (present but only in healthcare.css, not in main spec section)
- **Why it matters:** A design system spec that doesn't describe the majority of its components is incomplete.
- **Fix:** Run `$impeccable document` to regenerate from the full codebase, then prune.
- **Command:** `$impeccable document`

### [P2] Undocumented button override in CTA band
- **What:** DESIGN.md says `button-gold` hover is `#d8b86c`. In `landing.html`, `.cta-band .btn-primary` is `background:var(--gold);color:var(--ink)` and hover is `background:var(--cream);color:var(--ink)` — a completely different behavior.
- **Why it matters:** Unspecified overrides create inconsistency across pages.
- **Fix:** Document the CTA-band button as a distinct variant (`button-gold-on-dark`?) or align it with the standard gold button.
- **Command:** `$impeccable document`

### [P2] `btn-sm` class naming inconsistency
- **What:** DESIGN.md tokens use `button-sm` (kebab-case in the YAML frontmatter). Code uses `.btn-sm` and `.btn.sm` interchangeably. The `styles.css` mobile query groups `.btn,.btn.sm,.btn-sm,.chip,.persona-pill`.
- **Why it matters:** Token naming should map 1:1 to CSS classes.
- **Fix:** Standardize on `.btn-sm` everywhere; remove `.btn.sm` variant.
- **Command:** `$impeccable harden`

### [P2] Minor character concern
- **What:** `tweaks-panel.jsx` uses `✕` (U+2715, heavy multiplication x) as a close icon. This is technically a dingbat, not an emoji, but sits close to the "no emojis" taste rule.
- **Why it matters:** Low risk, but in a system that bans generic icons, a bespoke SVG close mark would be more consistent.
- **Fix:** Replace with an inline SVG close path matching the 1.4px stroke system.
- **Command:** `$impeccable polish`

### [P3] `activity-item strong` uses weight 600
- **What:** `supporter-dashboard.html` line 62: `.activity-item strong{font-weight:600}`. DESIGN.md "Don't" says "Don't use bold weights (700) for display text" — but the spirit is "hierarchy through size and space, not weight." 600 is still weight-driven hierarchy.
- **Fix:** Remove the strong override or use color/size instead.
- **Command:** `$impeccable typeset`

---

## What's Working (Keep These)

1. **Color palette fidelity** — All 12 colors are defined identically in DESIGN.md, styles.css, landing.html, and pitch deck. The warm paper/cream ground with forest green + gold accent is distinctive and consistently applied.
2. **Font-pair switching** — The `body[data-pair]` runtime switch (Newsreader / DM / Instrument) is well-documented and correctly implemented across all entry points.
3. **Monospace label system** — JetBrains Mono is applied consistently to labels, stats, tags, footer metadata, and table headers. The contrast between serif display and monospace meta is the project's strongest signature.
4. **Animation tokens** — Reveal, counter easing, menu-slide, and progress-fill transitions match the spec exactly in both CSS and JSX.

---

## Minor Observations

- **Break-token naming:** `xl` breakpoint is `980px` but `xxl` is `1080px` — a narrow 100px gap. Most design systems use `xl: 1280px` or larger. This is intentional for the prototype's compact layout but worth noting.
- **Photo aspect ratio:** DESIGN.md says `4/5`, but `case-photo` in landing.html sets `aspect-ratio:auto` with `min-height:480px`. This is an undocumented exception.
- **Tweaks panel colors:** The tweaks panel (`twk-panel`) uses its own neutral palette (`#29261b`, `#fafafa`) rather than the Ethos tokens. This is acceptable since it's a dev-only tool, but it's visually jarring if left visible in screenshots.
- **Donut chart colors:** The donut in `impact-dashboard.jsx` hardcodes `#7a8c5c` and `#c46243` — colors not in the DESIGN.md palette. These should map to existing tokens or be added.

---

## Questions to Consider

1. **Is the pitch deck (`isdb-pitch/index.html`) in scope for this design system?** It uses the same color tokens but a completely different weight and spacing logic. If it is in scope, the spec needs a separate "Presentation" register. If not, it should be excluded from the design-system folder.
2. **Should the "Don't" list be downgraded to "Avoid"?** Several banned patterns (glassmorphism, hero metrics, identical card grids) exist in the live UI. Either the UI needs fixing or the spec is overly aspirational.
3. **Is there a dark theme planned?** The spec defines `--green-2` as a dark surface color but only uses it for the footer and pitch-deck background. A formal dark-theme token set might be needed if the dashboard expands.

---

## Recommended Actions

1. **`$impeccable document`** — Regenerate DESIGN.md from the full codebase to capture missing components (`vcard`, `case-row`, `sum-card`, `mentor`, `audit-strip`, `seal`, etc.) and remove dead tokens (`panel-dark`, `credential-pill`, `--blue`).
2. **`$impeccable typeset`** — Fix typography drift: add `h3` token, normalize `.lede` to a tokenized size, lock pitch deck to 400 weight, cap impact hero to 82px.
3. **`$impeccable layout`** — Address identical card grids (`vcard`, `step`, `takaful-card`) and hero-metric templates (`sum-card`, `big-stats`, `geo-grid`). Vary sizes, add imagery, or convert to flow layouts.
4. **`$impeccable distill`** — Resolve the glassmorphism contradiction: either remove the ban and document restricted usage, or replace nav/demo-tag blurs with solid fills.
5. **`$impeccable polish`** — Final pass on edge cases (`btn-sm` naming, `✕` dingbat, activity-item strong weight).

> Re-run `$impeccable critique` after fixes to see the score improve.
