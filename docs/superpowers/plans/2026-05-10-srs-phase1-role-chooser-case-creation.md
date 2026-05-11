# Phase 1: Role Chooser + Case Creation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two new mock pages — role chooser and case creation wizard — built atop new atomic-design components in `shared.jsx`.

**Architecture:** Extend `shared.jsx` with atoms → molecules → organisms following atomic-design hierarchy, then build two pages on top. Match existing prototype pattern: static HTML + Babel-compiled JSX from CDN, hardcoded data, `showToast()` for all interactive stubs, no backend.

**Tech Stack:** React 18.3.1 + Babel standalone via unpkg CDN, vanilla CSS (custom properties + responsive media queries), no build step.

**Verification approach:** No test framework exists in this prototype. Each task ends with a manual browser verification step (open page, click interactive elements, confirm toast/state) and a console-clean check.

---

## Execution Options

Two ways to execute this plan task-by-task. Pick one before starting.

### Option 1 — Subagent-Driven (recommended)

**Skill:** `superpowers:subagent-driven-development`

A fresh subagent runs each task in isolation. The orchestrator reviews the diff between tasks before dispatching the next subagent.

- **Pros:** clean context per task, two-stage review catches drift early, fast iteration, easy to retry a single task without polluting state.
- **Cons:** more orchestration overhead, requires the user to remain available for review checkpoints.
- **Best when:** the plan has 8+ tasks (this one has 12), tasks are well-isolated, and code-quality bar is high.

### Option 2 — Inline Execution

**Skill:** `superpowers:executing-plans`

The current session executes tasks sequentially with batched checkpoints. Same context throughout.

- **Pros:** lower coordination cost, fewer hand-offs, faster end-to-end, single transcript to read.
- **Cons:** context grows over the session, drift between tasks is harder to catch, retrying a task means rewinding shared state.
- **Best when:** plan is short, tasks share a lot of context, or the user wants a single uninterrupted run.

### Recommendation for this plan

**Subagent-driven.** 12 tasks, each with discrete file scopes (component-by-component then page-by-page), and a high design-system bar from DESIGN.md grounding. Two-stage review per task catches token-mismatch drift before it compounds.

---

## Design System Grounding (DESIGN.md)

Every new component is pinned to DESIGN.md tokens — colors, typography roles, radius, spacing, accessibility. Below is the binding map. **Do not introduce new colors, fonts, radii, or shadows outside this map.**

### Color tokens (use CSS custom properties, never hex)
- Backgrounds: `var(--cream)` default canvas, `var(--cream-2)` for subtle elevation/disabled.
- Text: `var(--ink)` primary, `var(--ink-soft)` secondary, `var(--muted)` tertiary/labels.
- Lines/borders: `var(--line)`. Card hover border: `#d4caac` (existing hardcoded escape, retain).
- Action: `var(--green)` primary, `var(--green-2)` hover/dark.
- Accent: `var(--gold)` sparingly (active step indicator only); `var(--gold-2)` for secondary mono labels.
- Functional: `var(--red)` only for required-field asterisk and validation errors.

### Typography role mapping
| Element | DESIGN.md role | Spec |
|---|---|---|
| Page hero `h1` (role-chooser, case-creation) | `display` | `clamp(34px, 4vw, 56px)`, ff-display, weight 400, lh 1.05, tight tracking |
| Step section `h2` (`.step-header h2`) | `case-title` (down-scaled) | `clamp(22px, 2.4vw, 30px)`, ff-display, weight 400, lh 1.15 |
| `ChoiceCard` title | `h3` | 20–24px, ff-display, weight 400, lh 1.2, tight tracking |
| `ChoiceCard` description | `body-sm` | 14px, ff-body, weight 400, lh 1.55 |
| `ChoiceCard` CTA + Step indicator label | `body-sm` (13–14px) |  |
| Eyebrow ("Step 1 of registration", "Step 1") | `label` | JetBrains Mono, 11px, uppercase, letter-spacing 0.18em, color gold-2 |
| `FormField` label | `label` | JetBrains Mono, 11px, uppercase, letter-spacing 0.08em, color ink-soft |
| `StepIndicator` "Step N" sub-label | `mono-sm` | JetBrains Mono, 10.5px, uppercase, letter-spacing 0.08em, muted |
| Hint text | `utility-sm` | 12px ff-body, muted |
| Required `*` | `red` color, 11px |

### Component radius (DESIGN.md `rounded` scale)
- Form fields (`FormInput`, `FormTextarea`, `FormSelect`): `rounded.sm` = **4px** (per `field` token).
- Form radio rows (`FormRadioGroup` items): `rounded.md` = 6px (card-pattern wrapper, not a raw field).
- `ChoiceCard`: `rounded.md` = 6px (per `card` token).
- `UploadZone`: `rounded.lg` = 8px (signals dropzone, distinct from cards).
- `StatusDot`, avatar-like circles: 50%.
- Buttons (existing): pill / 999px.

### Component pattern grounding
| New component | DESIGN.md anchor | Inherited specs |
|---|---|---|
| `ChoiceCard` | `card` + `vcard` (services grid) | cream bg, 1px line border, rounded.md, 24px padding, hover border `#d4caac` + `card-hover` shadow, `card-focus` outline 2px green |
| `StatusDot` | new — uses `progress-fill` color logic + `timeline-dot` motif | idle: cream-2 bg / line border / muted; active: gold bg / gold-2 border / green-2 fg; done: green bg / green border / cream fg |
| `StepIndicator` | composition of `StatusDot` + `mono-sm` label, sized like `timeline-dot` siblings | gap 10px, label stack |
| `StepProgressBar` | follows `panel` style as the host strip | cream bg, line border, rounded.md, 24px padding, dashed-line conventions per `timeline` |
| `StepWizard` content panel | `panel` | cream bg, line border, rounded.md, 32px padding |
| `FormInput`/`FormTextarea`/`FormSelect` | `field` | 12px 14px padding, line border, rounded.sm (4px), `field-focus` border green |
| `FormRadioGroup` | `chip`-like pill rows but rectangular for clarity | cream bg, line border, hover green border, checked green border + 4% green tint |
| `UploadZone` | new dashed variant of `card` | cream-2 bg, 1.5px dashed line border, rounded.lg, hover green border + green text |
| `FormField` | label + slot wrapper using `label` typography token | gap 6px between label/control/hint |

### Spacing (DESIGN.md `spacing` scale)
- Card-internal gap: 12–14px (md/sm).
- Form-field gap: 20px (xl).
- Section heading → grid gap: 28–32px (xxxl/section-sm).
- Step wizard content padding: 32px (section-sm).
- Page top/bottom padding: 64px / 96px (section-xxl / section-hero).

### Accessibility (DESIGN.md §Accessibility — non-negotiable)
- **Focus states:** every interactive control (`ChoiceCard`, `FormInput`, `FormSelect`, `FormRadioGroup` label, `UploadZone`, wizard buttons) ships `outline: 2px solid var(--green); outline-offset: 2px;` on `:focus-visible`. Add to the CSS in each task — call this out explicitly in the verification step.
- **Touch targets:** every clickable element on mobile ≥ 44×44px. `ChoiceCard` already exceeds; ensure `.form-radio` min-height 44px on mobile (already met by 12px padding + 14px font line-height). Wizard back/next buttons inherit existing `.btn` 44px min-height rule.
- **Reduced motion:** `Reveal` already respects no-motion via being skip-able. Any new animation/transition added in this phase must include `@media (prefers-reduced-motion: reduce) { transition: none; transform: none; }` fallbacks. The `.choice-card.selected` and `.btn:disabled` have transitions — add a global reduced-motion guard at the bottom of the new CSS sections (single rule covers all).
- **Toast:** existing `showToast` already produces an inline element. Verify `role="status"` and `aria-live="polite"` are added on creation. **If missing, add it in Task 1 alongside StatusDot work** (existing `showToast` lives at `shared.jsx:91`).
- **Color contrast:** all text/background combos in this plan use DESIGN.md-validated pairs (green on cream AAA, ink on cream AAA, muted on cream AA). Never put gold text on cream — only on green-2 (per `button-gold` rule).

### Do / Don't (from DESIGN.md)
- ✅ Display weight stays **400** for all `.choice-card-title`, `.step-header h2`, `.case-creation-header h1`, `.confirm-panel h2`. Never use 700.
- ✅ JetBrains Mono only for labels, eyebrows, step nums, hints. Body in Manrope/`var(--ff-body)`.
- ✅ Use existing `Icon` SVG inline icons — no emoji, no icon libraries.
- ❌ No gradients on text, backgrounds, or decorative panels.
- ❌ No glassmorphism / translucent overlays on text.
- ❌ No new accent colors. No bold display.
- ❌ No drop shadows on flat surfaces — only `card-hover` and `button-hover` patterns from DESIGN.md.

### Global reduced-motion guard

Append to `styles.css` at the end of all new CSS additions (do this in **Task 5.3** — see updated step):

```css
@media (prefers-reduced-motion: reduce) {
  .choice-card,.choice-card-icon,.form-input,.form-textarea,.form-select,.form-radio,.upload-zone,.status-dot,.step-progress-line,.btn{transition:none !important}
}
```

### Toast a11y patch

Append to `Task 1.1` work — verify the `showToast` factory at `shared.jsx:91` sets `role="status"` and `aria-live="polite"` on the toast element. If absent, patch:

```jsx
// shared.jsx — inside showToast, after creating el:
el.setAttribute("role", "status");
el.setAttribute("aria-live", "polite");
```

---

## File Structure

### Modified
- `shared.jsx` — add new components. Existing `Object.assign(window, ...)` line extended each task.
- `styles.css` — append component styles. No existing rules touched.

### Created
- `role-chooser.html` + `role-chooser.jsx` + `role-chooser.css`
- `case-creation.html` + `case-creation.jsx` + `case-creation.css`

### File responsibilities
- `shared.jsx`: all reusable components. New atoms (`StatusDot`, `FormInput`, `FormTextarea`, `FormSelect`, `FormRadioGroup`, `UploadZone`), molecules (`ChoiceCard`, `StepIndicator`, `FormField`), organisms (`StepProgressBar`, `StepWizard`).
- `role-chooser.jsx`: page layout + 7 hardcoded role definitions, uses `ChoiceCard`. No multi-step state.
- `case-creation.jsx`: wizard host. Owns `useState` for current step + form values. 5 step panels rendered inline.
- Per-page CSS: page-specific layout only (grids, hero spacing). Component styles live in `styles.css`.

---

## Task 1 — Atom: `StatusDot`

**Files:**
- Modify: `shared.jsx` (insert after `Avatar` definition, before final `Object.assign`)
- Modify: `styles.css` (append at end)

- [ ] **Step 1.1: Add `StatusDot` to shared.jsx**

Insert after the `Avatar` component:

```jsx
const StatusDot = ({ status = "idle", size = 12, children }) => {
  const cls = `status-dot status-dot-${status}`;
  return (
    <span className={cls} style={{ width: size, height: size }} aria-hidden="true">
      {status === "done" ? <Icon name="check" size={Math.round(size * 0.7)} /> : children}
    </span>
  );
};
```

- [ ] **Step 1.2: Export StatusDot via window**

Replace the existing `Object.assign` line:

```jsx
Object.assign(window, { Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar, StatusDot });
```

- [ ] **Step 1.3: Append CSS to styles.css**

```css
/* status dot */
.status-dot{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;flex-shrink:0;transition:background .2s ease,border-color .2s ease,color .2s ease}
.status-dot-idle{background:var(--cream-2);border:1px solid var(--line);color:var(--muted)}
.status-dot-active{background:var(--gold);border:1px solid var(--gold-2);color:var(--green-2)}
.status-dot-done{background:var(--green);border:1px solid var(--green);color:var(--cream)}
```

- [ ] **Step 1.4: Patch `showToast` for screen-reader announcements**

In `shared.jsx`, locate the `showToast` function (~line 91). Inside the `if (!el)` branch, after `el.className = "toast";`, add:

```jsx
el.setAttribute("role", "status");
el.setAttribute("aria-live", "polite");
```

So the block becomes:

```jsx
if (!el) {
  el = document.createElement("div");
  el.id = "__toast";
  el.className = "toast";
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  document.body.appendChild(el);
}
```

- [ ] **Step 1.5: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add StatusDot atom and toast a11y attrs"
```

---

## Task 2 — Atoms: form primitives

`FormInput`, `FormTextarea`, `FormSelect`, `FormRadioGroup`, `UploadZone`. Wrap native elements with consistent classnames.

**Files:**
- Modify: `shared.jsx`
- Modify: `styles.css`

- [ ] **Step 2.1: Add atoms to shared.jsx**

Insert after `StatusDot`:

```jsx
const FormInput = ({ type = "text", placeholder = "", value, onChange, name, id, ...rest }) => (
  <input type={type} className="form-input" placeholder={placeholder} value={value} onChange={onChange} name={name} id={id} {...rest} />
);

const FormTextarea = ({ placeholder = "", rows = 5, value, onChange, name, id, ...rest }) => (
  <textarea className="form-textarea" rows={rows} placeholder={placeholder} value={value} onChange={onChange} name={name} id={id} {...rest} />
);

const FormSelect = ({ options = [], value, onChange, name, id, placeholder = "Select…" }) => (
  <select className="form-select" value={value || ""} onChange={onChange} name={name} id={id}>
    <option value="" disabled>{placeholder}</option>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const FormRadioGroup = ({ name, options = [], value, onChange }) => (
  <div className="form-radio-group" role="radiogroup">
    {options.map(o => (
      <label key={o.value} className={`form-radio ${value === o.value ? "checked" : ""}`}>
        <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={onChange} />
        <span>{o.label}</span>
      </label>
    ))}
  </div>
);

const UploadZone = ({ hint = "Drag files or click to upload", onClick }) => (
  <button type="button" className="upload-zone" onClick={onClick || (() => showToast("Upload — demo only"))}>
    <Icon name="doc" size={28} />
    <span className="upload-zone-hint">{hint}</span>
  </button>
);
```

- [ ] **Step 2.2: Update window export**

```jsx
Object.assign(window, { Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar, StatusDot, FormInput, FormTextarea, FormSelect, FormRadioGroup, UploadZone });
```

- [ ] **Step 2.3: Append CSS to styles.css**

```css
/* form atoms */
.form-input,.form-textarea,.form-select{width:100%;font-family:var(--ff-body);font-size:14px;color:var(--ink);background:var(--cream);border:1px solid var(--line);border-radius:4px;padding:12px 14px;transition:border-color .15s ease,box-shadow .15s ease}
.form-input:focus-visible,.form-textarea:focus-visible,.form-select:focus-visible{outline:2px solid var(--green);outline-offset:2px;border-color:var(--green)}
.form-input:disabled{background:var(--cream-2);color:var(--muted);cursor:not-allowed}
.form-textarea{resize:vertical;min-height:120px;font-family:var(--ff-body)}
.form-select{appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23141512' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}

.form-radio-group{display:flex;flex-direction:column;gap:8px}
.form-radio{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:6px;background:var(--cream);cursor:pointer;font-size:14px;transition:border-color .15s ease,background .15s ease}
.form-radio input{accent-color:var(--green)}
.form-radio:hover{border-color:var(--green)}
.form-radio.checked{border-color:var(--green);background:rgba(14,59,46,.04)}

.upload-zone{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:32px;width:100%;border:1.5px dashed var(--line);border-radius:8px;background:var(--cream-2);color:var(--muted);cursor:pointer;transition:border-color .15s ease,color .15s ease;font-family:inherit}
.upload-zone:hover{border-color:var(--green);color:var(--green)}
.upload-zone:focus-visible{outline:2px solid var(--green);outline-offset:2px}
.upload-zone-hint{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.04em}
```

- [ ] **Step 2.4: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add form atom primitives"
```

---

## Task 3 — Molecule: `ChoiceCard`

Shared molecule for both role-chooser and case-creation step 1.

**Files:**
- Modify: `shared.jsx`
- Modify: `styles.css`

- [ ] **Step 3.1: Add `ChoiceCard` to shared.jsx**

```jsx
const ChoiceCard = ({ icon, title, desc, selected = false, onSelect, ctaLabel = "Select" }) => (
  <button type="button" className={`choice-card ${selected ? "selected" : ""}`} onClick={onSelect}>
    <div className="choice-card-icon"><Icon name={icon} size={28} /></div>
    <h3 className="choice-card-title">{title}</h3>
    <p className="choice-card-desc">{desc}</p>
    <span className="choice-card-cta">
      {selected ? <><Icon name="check" size={16} /> Selected</> : <>{ctaLabel} <Icon name="arrow" size={16} /></>}
    </span>
  </button>
);
```

- [ ] **Step 3.2: Update window export**

Append `ChoiceCard` to the `Object.assign(window, ...)` call.

- [ ] **Step 3.3: Append CSS to styles.css**

```css
/* choice card */
.choice-card{display:flex;flex-direction:column;align-items:flex-start;gap:12px;width:100%;text-align:left;padding:24px;background:var(--cream);border:1px solid var(--line);border-radius:6px;cursor:pointer;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease;font-family:inherit;color:inherit}
.choice-card:hover{border-color:#d4caac;box-shadow:0 4px 16px -8px rgba(20,21,18,.1)}
.choice-card:focus-visible{outline:2px solid var(--green);outline-offset:2px}
.choice-card.selected{border-color:var(--green);background:rgba(14,59,46,.04);box-shadow:0 6px 18px -10px rgba(14,59,46,.4)}
.choice-card-icon{width:48px;height:48px;border-radius:50%;background:var(--cream-2);color:var(--green);display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease}
.choice-card.selected .choice-card-icon{background:var(--green);color:var(--cream)}
.choice-card-title{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:20px;line-height:1.2;letter-spacing:var(--display-tracking);margin:4px 0 0}
.choice-card-desc{font-size:14px;line-height:1.55;color:var(--ink-soft);margin:0;flex:1}
.choice-card-cta{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--green);font-weight:500;margin-top:6px}
.choice-card.selected .choice-card-cta{color:var(--green-2)}
```

- [ ] **Step 3.4: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add ChoiceCard molecule"
```

---

## Task 4 — Molecules: `StepIndicator` and `FormField`

**Files:**
- Modify: `shared.jsx`
- Modify: `styles.css`

- [ ] **Step 4.1: Add `StepIndicator` and `FormField` to shared.jsx**

```jsx
const StepIndicator = ({ index, label, status = "idle" }) => (
  <div className={`step-indicator step-indicator-${status}`}>
    <StatusDot status={status} size={28}>
      {status !== "done" && <span className="step-indicator-num-inner">{index}</span>}
    </StatusDot>
    <span className="step-indicator-label">
      <span className="step-indicator-num">Step {index}</span>
      <span className="step-indicator-text">{label}</span>
    </span>
  </div>
);

const FormField = ({ label, htmlFor, hint, required = false, children }) => (
  <div className="form-field">
    {label && (
      <label htmlFor={htmlFor} className="form-field-label">
        {label}{required && <span className="form-field-required" aria-hidden="true"> *</span>}
      </label>
    )}
    {children}
    {hint && <span className="form-field-hint">{hint}</span>}
  </div>
);
```

- [ ] **Step 4.2: Update window export**

Append `StepIndicator, FormField` to the `Object.assign(window, ...)` call.

- [ ] **Step 4.3: Append CSS to styles.css**

```css
/* step indicator */
.step-indicator{display:flex;align-items:center;gap:10px;flex:1;min-width:0}
.step-indicator-num-inner{font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:600}
.step-indicator-label{display:flex;flex-direction:column;gap:2px;min-width:0}
.step-indicator-num{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.step-indicator-text{font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.step-indicator-active .step-indicator-text{color:var(--green-2)}
.step-indicator-done .step-indicator-num,.step-indicator-done .step-indicator-text{color:var(--muted)}

/* form field */
.form-field{display:flex;flex-direction:column;gap:6px}
.form-field-label{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft)}
.form-field-required{color:var(--red)}
.form-field-hint{font-size:12.5px;color:var(--muted)}
```

- [ ] **Step 4.4: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add StepIndicator and FormField molecules"
```

---

## Task 5 — Organisms: `StepProgressBar` and `StepWizard`

`StepWizard` is a controlled host: parent owns `currentStep` state, passes step content via the `steps` prop.

**Files:**
- Modify: `shared.jsx`
- Modify: `styles.css`

- [ ] **Step 5.1: Add organisms to shared.jsx**

```jsx
const StepProgressBar = ({ steps = [], currentStep = 0 }) => (
  <div className="step-progress">
    {steps.map((s, i) => {
      const status = i < currentStep ? "done" : i === currentStep ? "active" : "idle";
      return (
        <React.Fragment key={i}>
          <StepIndicator index={i + 1} label={s.label} status={status} />
          {i < steps.length - 1 && <span className={`step-progress-line ${i < currentStep ? "done" : ""}`} />}
        </React.Fragment>
      );
    })}
  </div>
);

const StepWizard = ({ steps = [], currentStep = 0, onStepChange, onSubmit, canAdvance = true, submitLabel = "Submit" }) => {
  const isLast = currentStep === steps.length - 1;
  const back = () => onStepChange && currentStep > 0 && onStepChange(currentStep - 1);
  const next = () => {
    if (!canAdvance) return;
    if (isLast) onSubmit && onSubmit();
    else onStepChange && onStepChange(currentStep + 1);
  };
  return (
    <div className="step-wizard">
      <StepProgressBar steps={steps} currentStep={currentStep} />
      <div className="step-wizard-content">{steps[currentStep] && steps[currentStep].content}</div>
      <div className="step-wizard-actions">
        <button type="button" className="btn btn-soft" onClick={back} disabled={currentStep === 0}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={next} disabled={!canAdvance}>
          {isLast ? submitLabel : <>Next <Icon name="arrow" size={16} /></>}
        </button>
      </div>
    </div>
  );
};
```

- [ ] **Step 5.2: Final window export**

```jsx
Object.assign(window, { Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar, StatusDot, FormInput, FormTextarea, FormSelect, FormRadioGroup, UploadZone, ChoiceCard, StepIndicator, FormField, StepProgressBar, StepWizard });
```

- [ ] **Step 5.3: Append CSS to styles.css**

```css
/* step progress */
.step-progress{display:flex;align-items:center;gap:14px;padding:24px;background:var(--cream);border:1px solid var(--line);border-radius:6px}
.step-progress-line{flex:0 0 auto;width:24px;height:1px;background:var(--line);transition:background .2s ease}
.step-progress-line.done{background:var(--green)}
@media(max-width:720px){
  .step-progress{flex-wrap:wrap;gap:10px}
  .step-progress-line{display:none}
  .step-indicator{flex:1 1 calc(50% - 6px)}
}

/* step wizard */
.step-wizard{display:flex;flex-direction:column;gap:24px}
.step-wizard-content{padding:32px;background:var(--cream);border:1px solid var(--line);border-radius:6px;min-height:280px}
.step-wizard-actions{display:flex;justify-content:space-between;gap:12px}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}

/* reduced motion */
@media (prefers-reduced-motion: reduce){
  .choice-card,.choice-card-icon,.form-input,.form-textarea,.form-select,.form-radio,.upload-zone,.status-dot,.step-progress-line{transition:none !important}
}
```

- [ ] **Step 5.4: Smoke test in browser**

```
open showcase.html
```

Manual checks: page renders without console errors. (Showcase doesn't use the new components yet — pure smoke test that nothing existing is broken.)

- [ ] **Step 5.5: Commit**

```bash
git add shared.jsx styles.css
git commit -m "feat(components): add StepProgressBar and StepWizard organisms"
```

---

## Task 6 — Page: `role-chooser`

**Files:**
- Create: `role-chooser.html`
- Create: `role-chooser.jsx`
- Create: `role-chooser.css`

- [ ] **Step 6.1: Create role-chooser.html**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Choose Your Role — Ethos Community™</title>
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="role-chooser.css" />
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  <script type="text/babel" src="shared.jsx"></script>
  <script type="text/babel" src="role-chooser.jsx"></script>
</body>
</html>
```

- [ ] **Step 6.2: Create role-chooser.jsx**

```jsx
const ROLES = [
  { id: "supporter", icon: "heart", title: "Diaspora Supporter", desc: "Support your family and community with verified, purpose-linked pathways." },
  { id: "beneficiary", icon: "user", title: "Beneficiary", desc: "Register yourself or a family member for verified support access." },
  { id: "mentor", icon: "users", title: "Mentor / Service Provider", desc: "Offer your professional skills, mentorship, or services to the community." },
  { id: "sme", icon: "sme", title: "SME / Business Owner", desc: "Access recovery support, finance-readiness, and advisory services." },
  { id: "ambassador", icon: "shield", title: "Community Ambassador", desc: "Help verify needs, onboard users, and build local trust." },
  { id: "finance", icon: "trend", title: "Finance / Takaful Partner", desc: "Provide regulated financial, health, and risk-protection pathways." },
  { id: "development", icon: "globe", title: "Development Partner", desc: "NGOs, foundations, and public-sector stakeholders." }
];

const RoleChooserPage = () => {
  const [selected, setSelected] = useState(null);
  const handleSelect = (id, title) => {
    setSelected(id);
    showToast(`Role selected: ${title} — Registration coming next`);
  };
  const handleContinue = () => {
    if (!selected) return;
    showToast("Continue to sign-up — demo only");
  };
  return (
    <>
      <Nav />
      <DemoTag />
      <main className="role-chooser">
        <div className="container">
          <Reveal as="header" className="role-chooser-header">
            <span className="section-eyebrow">Step 1 of registration</span>
            <h1>How would you like to engage with Ethos Community?</h1>
            <p>Select the role that best describes how you'll use the platform. You can change this later from your account settings.</p>
          </Reveal>
          <div className="role-grid">
            {ROLES.map(r => (
              <ChoiceCard key={r.id} icon={r.icon} title={r.title} desc={r.desc} selected={selected === r.id} onSelect={() => handleSelect(r.id, r.title)} ctaLabel="Select Role" />
            ))}
          </div>
          <div className="role-chooser-footer">
            <a href="landing.html" className="btn-text">Skip — continue as guest <Icon name="arrow" size={16} /></a>
            <button type="button" className="btn btn-primary" onClick={handleContinue} disabled={!selected}>
              Continue <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RoleChooserPage />);
```

- [ ] **Step 6.3: Create role-chooser.css**

```css
/* role chooser page */
.role-chooser{padding:64px 0 96px}
@media(max-width:880px){.role-chooser{padding:40px 0 64px}}

.role-chooser-header{max-width:720px;margin:0 0 48px}
.role-chooser-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(32px,4vw,48px);line-height:1.1;letter-spacing:var(--display-tracking);margin:14px 0 16px}
.role-chooser-header p{font-size:16px;line-height:1.55;color:var(--ink-soft);margin:0;max-width:560px}

.role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:1024px){.role-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.role-grid{grid-template-columns:1fr}}

.role-chooser-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:48px;padding-top:32px;border-top:1px solid var(--line)}
@media(max-width:640px){.role-chooser-footer{flex-direction:column-reverse;align-items:stretch}}
```

- [ ] **Step 6.4: Verify in browser**

```
open role-chooser.html
```

Manual checks:
- Page loads, no console errors.
- 7 cards render in 3-column grid (desktop) / 2-col (tablet) / 1-col (mobile).
- Clicking a card highlights it (green border, icon swap), fires toast `"Role selected: <name> — Registration coming next"`.
- Selecting a different card moves selection (only one selected at a time).
- "Continue" disabled until a card is selected; clicking enabled button fires toast.
- "Skip — continue as guest" navigates to `landing.html`.
- Nav and Footer render. Resize to ~640px: layout stacks without overflow.

- [ ] **Step 6.5: Commit**

```bash
git add role-chooser.html role-chooser.jsx role-chooser.css
git commit -m "feat(role-chooser): mock role selection page with 7 roles"
```

---

## Task 7 — Page scaffold: `case-creation` + step 1

Build the wizard incrementally — one step per task — to keep tasks bite-sized.

**Files:**
- Create: `case-creation.html`
- Create: `case-creation.jsx`
- Create: `case-creation.css`

- [ ] **Step 7.1: Create case-creation.html**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Create Support Case — Ethos Community™</title>
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="case-creation.css" />
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  <script type="text/babel" src="shared.jsx"></script>
  <script type="text/babel" src="case-creation.jsx"></script>
</body>
</html>
```

- [ ] **Step 7.2: Create case-creation.jsx with shell + step 1**

```jsx
const SUPPORT_TYPES = [
  { id: "health", icon: "health", title: "Healthcare", desc: "Clinic referrals, telemedicine, hospitalization and Takaful pathways." },
  { id: "education", icon: "education", title: "Education & CPD", desc: "Student support, credential preservation, mentorship and training." },
  { id: "legal", icon: "legal", title: "Legal & Documentation", desc: "Residency, inheritance, immigration and compliance support." },
  { id: "women", icon: "women", title: "Women Empowerment", desc: "Widows support, women-led SMEs, CPD and family resilience." },
  { id: "family", icon: "family", title: "Family Support", desc: "Living costs, rent, emergency support and family stability." },
  { id: "sme", icon: "sme", title: "SME Recovery", desc: "Business diagnostics, finance-readiness and licensing support." }
];

const Step1Support = ({ value, onSelect }) => (
  <div>
    <div className="step-header">
      <span className="section-eyebrow">Step 1</span>
      <h2>What kind of support is this case for?</h2>
      <p>Choose the category that best matches the need. You can refine details in the next steps.</p>
    </div>
    <div className="support-type-grid">
      {SUPPORT_TYPES.map(s => (
        <ChoiceCard key={s.id} icon={s.icon} title={s.title} desc={s.desc} selected={value === s.id} onSelect={() => onSelect(s.id)} ctaLabel="Choose" />
      ))}
    </div>
  </div>
);

const CaseCreationPage = () => {
  const [step, setStep] = useState(0);
  const [supportType, setSupportType] = useState(null);

  const steps = [
    { label: "Support Type", content: <Step1Support value={supportType} onSelect={setSupportType} /> },
    { label: "Beneficiary", content: <div className="step-placeholder">Step 2 — coming next</div> },
    { label: "Need", content: <div className="step-placeholder">Step 3 — coming next</div> },
    { label: "Funding", content: <div className="step-placeholder">Step 4 — coming next</div> },
    { label: "Confirm", content: <div className="step-placeholder">Step 5 — coming next</div> }
  ];

  const canAdvance = step === 0 ? !!supportType : true;
  const handleSubmit = () => showToast("Case submitted — demo only");

  return (
    <>
      <Nav />
      <DemoTag />
      <main className="case-creation">
        <div className="container">
          <header className="case-creation-header">
            <span className="section-eyebrow">Create a support case</span>
            <h1>Set up a verified, purpose-linked support pathway</h1>
          </header>
          <StepWizard steps={steps} currentStep={step} onStepChange={setStep} onSubmit={handleSubmit} canAdvance={canAdvance} submitLabel="Submit case" />
          <div className="case-creation-cancel">
            <a href="supporter-dashboard.html" className="btn-text">Cancel and return to dashboard</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<CaseCreationPage />);
```

- [ ] **Step 7.3: Create case-creation.css**

```css
/* case creation page */
.case-creation{padding:48px 0 96px}
@media(max-width:880px){.case-creation{padding:32px 0 64px}}

.case-creation-header{max-width:720px;margin:0 0 32px}
.case-creation-header h1{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(28px,3.4vw,40px);line-height:1.1;letter-spacing:var(--display-tracking);margin:12px 0 0}

.step-header{margin-bottom:28px}
.step-header h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:clamp(22px,2.4vw,30px);line-height:1.15;letter-spacing:var(--display-tracking);margin:10px 0 8px}
.step-header p{font-size:14.5px;line-height:1.55;color:var(--ink-soft);margin:0;max-width:560px}

.support-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:1024px){.support-type-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.support-type-grid{grid-template-columns:1fr}}

.step-placeholder{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--muted);padding:40px;text-align:center}

.case-creation-cancel{margin-top:24px;text-align:center}
```

- [ ] **Step 7.4: Verify in browser**

```
open case-creation.html
```

Manual checks:
- Page loads, no console errors.
- Step progress bar shows 5 steps; step 1 active (gold dot), others idle.
- 6 support-type cards render in 3-col grid.
- Clicking a card highlights it.
- "Next" disabled until a card is selected.
- "Back" disabled on step 1.
- Clicking "Next" advances to step 2 (placeholder text).
- Clicking "Back" returns to step 1 with selection preserved.

- [ ] **Step 7.5: Commit**

```bash
git add case-creation.html case-creation.jsx case-creation.css
git commit -m "feat(case-creation): scaffold wizard with step 1 support type"
```

---

## Task 8 — Step 2: Beneficiary details

**Files:**
- Modify: `case-creation.jsx`
- Modify: `case-creation.css`

- [ ] **Step 8.1: Add `Step2Beneficiary` component**

In `case-creation.jsx`, before `CaseCreationPage`, add the constants and component:

```jsx
const LOCATIONS = [
  { value: "sudan", label: "Sudan" },
  { value: "egypt", label: "Egypt" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "ksa", label: "Saudi Arabia" },
  { value: "qatar", label: "Qatar" },
  { value: "uganda", label: "Uganda" },
  { value: "uk", label: "United Kingdom" },
  { value: "other", label: "Other" }
];

const BENEFICIARY_CATEGORIES = [
  { value: "family", label: "Family Member" },
  { value: "student", label: "Student" },
  { value: "patient", label: "Patient" },
  { value: "professional", label: "Professional" },
  { value: "sme", label: "SME / Business" },
  { value: "other", label: "Other" }
];

const Step2Beneficiary = ({ value, onChange }) => (
  <div>
    <div className="step-header">
      <span className="section-eyebrow">Step 2</span>
      <h2>Who is this case for?</h2>
      <p>Provide basic details about the beneficiary. A community ambassador will verify these in the next stage.</p>
    </div>
    <div className="form-grid">
      <FormField label="Beneficiary name" htmlFor="bn-name" required>
        <FormInput id="bn-name" placeholder="e.g. Halima Mohammed" value={value.name} onChange={e => onChange({ ...value, name: e.target.value })} />
      </FormField>
      <FormField label="Location" htmlFor="bn-loc" required>
        <FormSelect id="bn-loc" options={LOCATIONS} value={value.location} onChange={e => onChange({ ...value, location: e.target.value })} placeholder="Select country" />
      </FormField>
      <FormField label="Category" hint="Determines which verification template applies." required>
        <FormRadioGroup name="bn-category" options={BENEFICIARY_CATEGORIES} value={value.category} onChange={e => onChange({ ...value, category: e.target.value })} />
      </FormField>
    </div>
  </div>
);
```

- [ ] **Step 8.2: Wire Step 2 into `CaseCreationPage`**

Update the state block at the top of `CaseCreationPage`:

```jsx
const [step, setStep] = useState(0);
const [supportType, setSupportType] = useState(null);
const [beneficiary, setBeneficiary] = useState({ name: "", location: "", category: "" });
```

Replace the Beneficiary entry in the `steps` array with:

```jsx
{ label: "Beneficiary", content: <Step2Beneficiary value={beneficiary} onChange={setBeneficiary} /> },
```

Replace the `canAdvance` line with:

```jsx
const canAdvance =
  step === 0 ? !!supportType :
  step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
  true;
```

- [ ] **Step 8.3: Append CSS to case-creation.css**

```css
.form-grid{display:flex;flex-direction:column;gap:20px;max-width:560px}
```

- [ ] **Step 8.4: Verify**

```
open case-creation.html
```

Manual checks:
- Step 1 → choose type → Next.
- Step 2 renders form: name input, location select, 6 radio options.
- "Next" disabled until name + location + category all filled.
- Selecting a radio highlights it (green border, light tint).
- "Back" returns to step 1 with previous selection intact.

- [ ] **Step 8.5: Commit**

```bash
git add case-creation.jsx case-creation.css
git commit -m "feat(case-creation): step 2 beneficiary form"
```

---

## Task 9 — Step 3: Need description + documents

**Files:**
- Modify: `case-creation.jsx`
- Modify: `case-creation.css`

- [ ] **Step 9.1: Add `Step3Need` component**

```jsx
const SUGGESTED_DOCS = [
  "Government-issued ID",
  "Proof of need (medical letter, school enrolment, etc.)",
  "Proof of relationship (where applicable)"
];

const Step3Need = ({ value, onChange }) => (
  <div>
    <div className="step-header">
      <span className="section-eyebrow">Step 3</span>
      <h2>Describe the need</h2>
      <p>Give enough context that a verifier and a supporter can understand the case. Documents help speed verification.</p>
    </div>
    <div className="form-grid">
      <FormField label="Need description" required hint="Minimum 20 characters.">
        <FormTextarea placeholder="e.g. Surgical follow-up costs for displaced parent currently in Cairo. Initial assessment completed at Cleopatra Hospital on 12 March." value={value.description} onChange={e => onChange({ ...value, description: e.target.value })} />
      </FormField>
      <FormField label="Supporting documents" hint="Demo only — uploads are not stored.">
        <UploadZone />
      </FormField>
      <div className="suggested-docs">
        <span className="form-field-label">Suggested documents</span>
        <ul>
          {SUGGESTED_DOCS.map((d, i) => (
            <li key={i}><Icon name="doc" size={14} /> {d}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
```

- [ ] **Step 9.2: Wire Step 3 into `CaseCreationPage`**

Add new state alongside others:

```jsx
const [need, setNeed] = useState({ description: "" });
```

Replace the Need entry in `steps`:

```jsx
{ label: "Need", content: <Step3Need value={need} onChange={setNeed} /> },
```

Replace `canAdvance`:

```jsx
const canAdvance =
  step === 0 ? !!supportType :
  step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
  step === 2 ? need.description.trim().length >= 20 :
  true;
```

- [ ] **Step 9.3: Append CSS to case-creation.css**

```css
.suggested-docs ul{list-style:none;padding:0;margin:8px 0 0;display:flex;flex-direction:column;gap:6px}
.suggested-docs li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-soft)}
```

- [ ] **Step 9.4: Verify**

```
open case-creation.html
```

Manual checks:
- Walk steps 1–2 to reach step 3.
- Textarea, upload zone, suggested docs render.
- Clicking upload zone fires toast `"Upload — demo only"`.
- "Next" disabled until description ≥ 20 chars.

- [ ] **Step 9.5: Commit**

```bash
git add case-creation.jsx case-creation.css
git commit -m "feat(case-creation): step 3 need description and documents"
```

---

## Task 10 — Step 4: Funding

**Files:**
- Modify: `case-creation.jsx`

- [ ] **Step 10.1: Add `Step4Funding` component**

```jsx
const FREQUENCIES = [
  { value: "one-time", label: "One-time pledge" },
  { value: "monthly", label: "Recurring monthly" }
];

const Step4Funding = ({ value, onChange }) => (
  <div>
    <div className="step-header">
      <span className="section-eyebrow">Step 4</span>
      <h2>Funding pathway</h2>
      <p>Set an initial pledge target. Supporters can contribute any amount up to the target.</p>
    </div>
    <div className="form-grid">
      <FormField label="Pledge target (USD)" required>
        <FormInput type="number" placeholder="0" value={value.amount} onChange={e => onChange({ ...value, amount: e.target.value })} min="0" />
      </FormField>
      <FormField label="Frequency" required>
        <FormRadioGroup name="frequency" options={FREQUENCIES} value={value.frequency} onChange={e => onChange({ ...value, frequency: e.target.value })} />
      </FormField>
      <FormField label="Wallet / payment account" hint="Bank or wallet details will be collected after community ambassador verification.">
        <FormInput placeholder="Will be collected after verification" disabled />
      </FormField>
    </div>
  </div>
);
```

- [ ] **Step 10.2: Wire Step 4 into `CaseCreationPage`**

Add state:

```jsx
const [funding, setFunding] = useState({ amount: "", frequency: "" });
```

Replace the Funding entry in `steps`:

```jsx
{ label: "Funding", content: <Step4Funding value={funding} onChange={setFunding} /> },
```

Replace `canAdvance`:

```jsx
const canAdvance =
  step === 0 ? !!supportType :
  step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
  step === 2 ? need.description.trim().length >= 20 :
  step === 3 ? !!(Number(funding.amount) > 0 && funding.frequency) :
  true;
```

- [ ] **Step 10.3: Verify**

```
open case-creation.html
```

Manual checks:
- Reach step 4. Enter amount + select frequency → Next becomes enabled.
- Wallet field is disabled (grey background, not editable).

- [ ] **Step 10.4: Commit**

```bash
git add case-creation.jsx
git commit -m "feat(case-creation): step 4 funding pathway"
```

---

## Task 11 — Step 5: Confirmation + submit

**Files:**
- Modify: `case-creation.jsx`
- Modify: `case-creation.css`

- [ ] **Step 11.1: Add `Step5Confirm` component and helpers**

```jsx
const generateCaseId = () => `K-${3500 + Math.floor(Math.random() * 500)}`;

const SUPPORT_TYPE_LABELS = Object.fromEntries(SUPPORT_TYPES.map(s => [s.id, s.title]));
const LOCATION_LABELS = Object.fromEntries(LOCATIONS.map(l => [l.value, l.label]));
const CATEGORY_LABELS = Object.fromEntries(BENEFICIARY_CATEGORIES.map(c => [c.value, c.label]));
const FREQUENCY_LABELS = Object.fromEntries(FREQUENCIES.map(f => [f.value, f.label]));

const Step5Confirm = ({ caseId, supportType, beneficiary, need, funding }) => (
  <div className="confirm-panel">
    <div className="confirm-icon"><Icon name="check" size={28} /></div>
    <span className="section-eyebrow">Step 5 — review</span>
    <h2>Case ready for verification</h2>
    <p>Your case has been assigned ID <strong>{caseId}</strong>. A community ambassador will review the details within 48 hours.</p>
    <dl className="confirm-summary">
      <div><dt>Support type</dt><dd>{SUPPORT_TYPE_LABELS[supportType] || "—"}</dd></div>
      <div><dt>Beneficiary</dt><dd>{beneficiary.name} · {LOCATION_LABELS[beneficiary.location] || "—"} · {CATEGORY_LABELS[beneficiary.category] || "—"}</dd></div>
      <div><dt>Need</dt><dd>{need.description.slice(0, 140)}{need.description.length > 140 ? "…" : ""}</dd></div>
      <div><dt>Funding</dt><dd>${Number(funding.amount).toLocaleString()} · {FREQUENCY_LABELS[funding.frequency] || "—"}</dd></div>
    </dl>
  </div>
);
```

- [ ] **Step 11.2: Wire Step 5 into `CaseCreationPage`**

Add caseId state at top of `CaseCreationPage` (next to other state):

```jsx
const [caseId] = useState(generateCaseId);
```

Replace the Confirm entry in `steps`:

```jsx
{ label: "Confirm", content: <Step5Confirm caseId={caseId} supportType={supportType} beneficiary={beneficiary} need={need} funding={funding} /> }
```

Replace `handleSubmit`:

```jsx
const handleSubmit = () => {
  showToast(`Case ${caseId} submitted for verification`);
  setTimeout(() => { window.location.href = "supporter-dashboard.html"; }, 1200);
};
```

- [ ] **Step 11.3: Append CSS to case-creation.css**

```css
.confirm-panel{max-width:560px}
.confirm-icon{width:56px;height:56px;border-radius:50%;background:var(--green);color:var(--cream);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.confirm-panel h2{font-family:var(--ff-display);font-weight:var(--display-weight);font-size:28px;line-height:1.15;letter-spacing:var(--display-tracking);margin:8px 0 10px}
.confirm-panel p{font-size:14.5px;line-height:1.55;color:var(--ink-soft);margin:0 0 24px}
.confirm-summary{display:flex;flex-direction:column;gap:14px;margin:0;padding:20px;background:var(--cream-2);border-radius:6px}
.confirm-summary>div{display:flex;flex-direction:column;gap:2px}
.confirm-summary dt{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0}
.confirm-summary dd{margin:0;font-size:14px;color:var(--ink)}
```

- [ ] **Step 11.4: Verify full wizard end-to-end**

```
open case-creation.html
```

Manual checks:
- Walk through all 5 steps with valid inputs.
- Step 5 shows assigned case ID, summary list with all selections.
- Submit button label is "Submit case" on step 5.
- Click Submit → toast fires (`"Case K-XXXX submitted for verification"`), page redirects to `supporter-dashboard.html` after ~1.2s.
- Step indicators show as `done` (green check) once advanced past them.

- [ ] **Step 11.5: Commit**

```bash
git add case-creation.jsx case-creation.css
git commit -m "feat(case-creation): step 5 confirmation and submit"
```

---

## Task 12 — Wire entry-points via Nav

Phase 1 must be reachable. Update the shared `Nav` component so role-chooser and case-creation are linked from every existing page. Deeper per-page CTA rewiring (every "Pledge now"/"Support this case" button) is out of scope — that lands in a later phase.

**Files:**
- Modify: `shared.jsx` (Nav component only)

- [ ] **Step 12.1: Add "Get Started" link and update primary CTA**

In `shared.jsx`, replace the `links` array inside `Nav`:

```jsx
const links = [
  { href: "supporter-dashboard.html", label: "Dashboard", key: "dashboard" },
  { href: "education.html", label: "Education", key: "education" },
  { href: "healthcare.html", label: "Healthcare", key: "healthcare" },
  { href: "sme-advisory.html", label: "SME Advisory", key: "sme" },
  { href: "impact-dashboard.html", label: "Impact", key: "impact" },
  { href: "role-chooser.html", label: "Get Started", key: "role" }
];
```

Update the primary CTA (desktop) to point to case-creation. Replace:

```jsx
<a href="supporter-dashboard.html" className="btn btn-primary sm nav-cta-btn">Support a Case <Icon name="arrow"/></a>
```

with:

```jsx
<a href="case-creation.html" className="btn btn-primary sm nav-cta-btn">Create Case <Icon name="arrow"/></a>
```

Apply the same `href` and label change to the mobile CTA inside `nav-mobile-ctas`.

- [ ] **Step 12.2: Verify across pages**

```
open landing.html
open supporter-dashboard.html
open showcase.html
```

Manual checks:
- Each page's nav shows "Get Started" link → routes to `role-chooser.html`.
- Each page's nav primary CTA "Create Case" → routes to `case-creation.html`.
- No console errors on any existing page.
- Active link highlight still works for the page you're on.

- [ ] **Step 12.3: Commit**

```bash
git add shared.jsx
git commit -m "feat(nav): wire role-chooser and case-creation entry points"
```

---

## Phase 1 Done — Final Validation Checklist

Before declaring phase 1 complete, walk through:

- [ ] `role-chooser.html` loads, all 7 cards render, selection works, toast fires
- [ ] `case-creation.html` loads, all 5 steps progress correctly with validation gates
- [ ] No console errors on either new page
- [ ] No console errors on any existing page after `shared.jsx` and `Nav` changes
- [ ] Mobile/tablet responsive at 360px, 768px, 1024px, 1440px on both new pages
- [ ] All interactive controls fire `showToast()` (no silent clicks)
- [ ] Typography matches existing pages (Newsreader display + Manrope body)
- [ ] Color palette uses only existing CSS custom properties
- [ ] All commits use conventional-commit prefixes

---

## Out of Scope (deferred)

- Per-page CTA rewiring (every "Support this case" / "Pledge now" → `case-creation.html` on profile and dashboard pages)
- 4 remaining new pages: provider-marketplace, women-empowerment, legal-services, product-traders
- Existing-page modifications: landing partner strip, impact dashboard new metrics, SME finance-readiness, supporter-dashboard purpose badges, profile similar-cases rows
- Kushian™ branding badges (`KushianBadge` component + nav placement)
- Other shared components in spec: `ProviderCard`, `Checklist`, `PurposeBadge`, `PartnershipStrip`
