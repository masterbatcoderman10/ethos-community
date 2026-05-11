# Phase 2: SRS Gap Fill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the SRS gap fill — add 4 new vertical pages, 5 new shared components, Nav Phase 2 links, Kushian™ branding, and enhance 6 existing pages to hit full SRS coverage.

**Architecture:** Static HTML + JSX + CSS, React 18.3.1 + Babel 7.29 from CDN, all data hardcoded, all interactions via `showToast()`. New pages under `/supporter/`, shared components added to `shared.jsx`, existing pages modified in place.

**Tech Stack:** React 18 (CDN), Babel Standalone (CDN), vanilla CSS (custom properties), JetBrains Mono labels, Newsreader/Manrope typography pair.

**Impeccable rule (from CLAUDE.md):** After every major new page/section, dispatch a subagent running the `impeccable` skill (craft/critique/polish/delight) before declaring that page complete. See Wave D.

---

## Wave A — Shared Components (must complete before B/C) ⬜

### Task 1: New shared components + Nav Phase 2 links

**Files:**
- Modify: `shared.jsx` (append before `Object.assign(window,...)` at line 475)
- Modify: `styles.css` (append new component styles)

- [ ] **Step 1: Add 5 new components to `shared.jsx`**

Append just before the `Object.assign(window, {...})` call at line 475:

```jsx
const ProviderCard = ({ name, category, verified = false, location, rating = 4.5, desc }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? "★" : i < rating ? "½" : "☆").join("");
  return (
    <div className="provider-card">
      <div className="provider-card-top">
        <span className="tag">{category}</span>
        <span className={`provider-verified ${verified ? "verified" : "pending"}`}>
          <Icon name="shield" size={14} />
          {verified ? "Verified" : "Pending"}
        </span>
      </div>
      <h3 className="provider-card-name">{name}</h3>
      <div className="provider-card-loc"><Icon name="pin" size={13}/> {location}</div>
      <div className="provider-card-stars" aria-label={`Rating: ${rating} out of 5`}>{stars} <span className="provider-card-rating">{rating}</span></div>
      <p className="provider-card-desc">{desc}</p>
      <button className="btn btn-ghost sm provider-card-cta" onClick={() => showToast(`Introduction request sent for ${name}`)}>
        Request Introduction <Icon name="arrow" size={14}/>
      </button>
    </div>
  );
};

const CHECKLIST_ICONS = {
  complete: <Icon name="check" size={15}/>,
  in_progress: <Icon name="clock" size={15}/>,
  pending: null
};

const Checklist = ({ items = [] }) => (
  <ul className="checklist">
    {items.map((item, i) => (
      <li key={i} className={`checklist-item checklist-item-${item.status}`}>
        <span className="checklist-icon">{CHECKLIST_ICONS[item.status]}</span>
        <span className="checklist-label">{item.label}</span>
      </li>
    ))}
  </ul>
);

const PURPOSE_BADGE_MAP = {
  health:     { label: "Health",     cls: "purpose-health" },
  education:  { label: "Education",  cls: "purpose-education" },
  family:     { label: "Family",     cls: "purpose-family" },
  legal:      { label: "Legal",      cls: "purpose-legal" },
  emergency:  { label: "Emergency",  cls: "purpose-emergency" },
  training:   { label: "Training",   cls: "purpose-training" },
  sme:        { label: "SME",        cls: "purpose-sme" },
  women:      { label: "Women",      cls: "purpose-women" }
};

const PurposeBadge = ({ category }) => {
  const cfg = PURPOSE_BADGE_MAP[category] || { label: category, cls: "" };
  return <span className={`purpose-badge ${cfg.cls}`}>{cfg.label}</span>;
};

const PartnershipStrip = ({ partners = [] }) => (
  <div className="partnership-strip">
    {partners.map((p, i) => (
      <div key={i} className="partnership-card">
        <div className="partnership-icon"><Icon name={p.icon} size={28}/></div>
        <h4 className="partnership-name">{p.name}</h4>
        <p className="partnership-desc">{p.desc}</p>
      </div>
    ))}
  </div>
);

const KushianBadge = ({ variant = "pilot" }) => {
  if (variant === "powered") return <span className="kushian-badge kushian-badge-powered">Powered by Ethos Community™</span>;
  if (variant === "full") return <span className="kushian-badge kushian-badge-full">Kushian™ · Sudan Pilot</span>;
  return <span className="kushian-badge kushian-badge-pilot">Kushian™</span>;
};
```

- [ ] **Step 2: Update `Object.assign(window, {...})` to export new components**

Replace the block at line 475:

```jsx
Object.assign(window, {
  Icon, Counter, Reveal, showToast, Nav, Footer, DemoTag, Photo, Avatar,
  StatusDot, FormInput, FormTextarea, FormSelect, FormRadioGroup, UploadZone,
  ChoiceCard, StepIndicator, FormField, StepProgressBar, StepWizard,
  CaseProgressBar, StatusPill, MessageBubble,
  ProviderCard, Checklist, PurposeBadge, PartnershipStrip, KushianBadge,
  roleToSide, getEthosRole, getEthosSide, setEthosRole, clearEthosRole,
  sideDashboardUrl
});
```

- [ ] **Step 3: Expand `NAV_LINKS_SUPPORTER` in `shared.jsx`**

Replace lines 146–155:

```jsx
const NAV_LINKS_SUPPORTER = (depth) => {
  const p = "../".repeat(depth);
  return [
    { href: `${p}supporter/dashboard.html`,            label: "Dashboard",   key: "dashboard" },
    { href: `${p}supporter/education.html`,            label: "Education",   key: "education" },
    { href: `${p}supporter/healthcare.html`,           label: "Healthcare",  key: "healthcare" },
    { href: `${p}supporter/sme-advisory.html`,         label: "SME",         key: "sme" },
    { href: `${p}supporter/women-empowerment.html`,    label: "Women",       key: "women" },
    { href: `${p}supporter/legal-services.html`,       label: "Legal",       key: "legal" },
    { href: `${p}supporter/product-traders.html`,      label: "Trade",       key: "trade" },
    { href: `${p}supporter/provider-marketplace.html`, label: "Marketplace", key: "marketplace" },
    { href: `${p}supporter/impact.html`,               label: "Impact",      key: "impact" }
  ];
};
```

- [ ] **Step 4: Add `KushianBadge` to Nav logo area**

In `Nav` component (~line 190), update logo line:

```jsx
<a href={logoHref} className="logo"><span className="logo-mark"></span><span className="logo-text"> Ethos Community™</span></a>
<KushianBadge variant="pilot" />
```

- [ ] **Step 5: Append component styles to `styles.css`**

```css
/* ── ProviderCard ───────────────────────────────────── */
.provider-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 10px; transition: border-color .18s, box-shadow .18s; }
.provider-card:hover { border-color: #d4caac; box-shadow: 0 4px 20px -8px rgba(20,21,18,.12); }
.provider-card-top { display: flex; align-items: center; justify-content: space-between; }
.provider-verified { display: flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; }
.provider-verified.verified { color: var(--green); }
.provider-verified.pending { color: var(--gold); }
.provider-card-name { font-size: 17px; font-weight: 400; color: var(--ink); margin: 0; }
.provider-card-loc { font-family: var(--mono); font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.provider-card-stars { font-family: var(--mono); font-size: 13px; color: var(--gold); }
.provider-card-rating { color: var(--muted); font-size: 11px; margin-left: 4px; }
.provider-card-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.55; margin: 0; flex: 1; }
.provider-card-cta { margin-top: auto; }

/* ── Checklist ───────────────────────────────────────── */
.checklist { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.checklist-item { display: flex; align-items: center; gap: 12px; font-size: 15px; }
.checklist-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.checklist-item-complete .checklist-icon { background: var(--green); color: #fff; }
.checklist-item-in_progress .checklist-icon { background: var(--gold); color: #fff; }
.checklist-item-pending .checklist-icon { background: var(--cream-2); border: 1px solid var(--line); }
.checklist-label { color: var(--ink); }
.checklist-item-pending .checklist-label { color: var(--muted); }

/* ── PurposeBadge ────────────────────────────────────── */
.purpose-badge { display: inline-block; font-family: var(--mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 20px; font-weight: 500; }
.purpose-health    { background: #dce8f5; color: #1c3a5c; }
.purpose-education { background: #d4ebe1; color: var(--green); }
.purpose-family    { background: #f5edcc; color: #7a5c14; }
.purpose-legal     { background: #ece0f5; color: #4a1c7a; }
.purpose-emergency { background: #f5dcd8; color: var(--red); }
.purpose-training  { background: #d4eee8; color: #0a5c50; }
.purpose-sme       { background: #f5e8d4; color: #7a4a0a; }
.purpose-women     { background: #f5d8ee; color: #7a0a5c; }

/* ── PartnershipStrip ────────────────────────────────── */
.partnership-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 720px) { .partnership-strip { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .partnership-strip { grid-template-columns: 1fr; } }
.partnership-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.partnership-icon { color: var(--green); }
.partnership-name { font-size: 16px; font-weight: 400; color: var(--ink); margin: 0; }
.partnership-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.55; margin: 0; }

/* ── KushianBadge ────────────────────────────────────── */
.kushian-badge { display: inline-block; font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; vertical-align: middle; margin-left: 8px; }
.kushian-badge-pilot   { background: var(--green); color: var(--cream); }
.kushian-badge-full    { background: var(--green); color: var(--cream); }
.kushian-badge-powered { background: transparent; color: var(--green); border: 1px solid var(--green); }

/* ── Nav overflow at 9 links ─────────────────────────── */
@media (max-width: 1100px) { .nav-links { gap: 16px; } .nav-links a { font-size: 13px; } }

/* ── Revenue pills ───────────────────────────────────── */
.revenue-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.revenue-pill { font-family: var(--mono); font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; border: 1px solid var(--line); color: var(--ink-soft); background: transparent; }

/* ── Scalability band ────────────────────────────────── */
.scalability-band { background: var(--green-2); color: var(--cream); padding: 48px 0; text-align: center; }
.scalability-band h3 { font-size: clamp(22px,3vw,30px); font-weight: 400; margin-bottom: 20px; }
.scalability-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.scalability-pill { font-family: var(--mono); font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(247,244,238,.3); color: rgba(247,244,238,.85); }

/* ── Returning-user ribbon ───────────────────────────── */
.returning-ribbon { background: var(--green); color: var(--cream); padding: 10px 32px; display: flex; align-items: center; justify-content: center; gap: 20px; font-size: 13px; flex-wrap: wrap; }
.returning-ribbon a { color: var(--gold); }

/* ── Landing revenue strip ───────────────────────────── */
.hero-eyebrow-kushian { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-family: var(--mono); font-size: 11px; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; }
.landing-revenue-inner { max-width: 680px; }
.landing-revenue-headline { font-size: clamp(18px,2.5vw,24px); font-weight: 400; line-height: 1.55; color: var(--ink); margin-bottom: 20px; }

/* ── Supporter dashboard empty state ─────────────────── */
.dash-empty-state { text-align: center; padding: 80px 32px; }
.dash-empty-icon { color: var(--green); opacity: .4; margin-bottom: 24px; }
.dash-empty-state h3 { font-size: 24px; font-weight: 400; margin-bottom: 32px; }
.dash-empty-steps { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
.dash-empty-step { max-width: 180px; text-align: center; }
.dash-empty-num { display: inline-block; width: 32px; height: 32px; border-radius: 50%; background: var(--green); color: var(--cream); font-family: var(--mono); font-size: 14px; line-height: 32px; text-align: center; margin-bottom: 10px; }
.dash-empty-step p { font-size: 14px; color: var(--ink-soft); line-height: 1.55; }

/* ── Similar cases row (profile pages) ───────────────── */
.similar-case-link { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 16px 20px; display: flex; flex-direction: column; gap: 4px; text-decoration: none; color: var(--ink); transition: border-color .18s; min-width: 220px; }
.similar-case-link:hover { border-color: #d4caac; }
.similar-case-id { font-family: var(--mono); font-size: 10px; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; }
.similar-case-name { font-size: 14px; color: var(--green); display: flex; align-items: center; gap: 6px; }

/* ── Impact verticals section ────────────────────────── */
.impact-verticals { display: grid; grid-template-columns: repeat(6,1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 880px) { .impact-verticals { grid-template-columns: repeat(3,1fr); } }
@media (max-width: 560px) { .impact-verticals { grid-template-columns: repeat(2,1fr); } }
.impact-vertical-tile { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px 16px; text-align: center; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.impact-vertical-count { font-size: 32px; font-weight: 400; color: var(--ink); }
.impact-vertical-label { font-family: var(--mono); font-size: 11px; color: var(--muted); letter-spacing: .06em; text-transform: uppercase; }
```

- [ ] **Step 6: Verify — open `supporter/education.html`, check console clean, KushianBadge visible in nav**

- [ ] **Step 7: Commit Wave A**

```bash
git add shared.jsx styles.css
git commit -m "feat(phase2): add ProviderCard, Checklist, PurposeBadge, PartnershipStrip, KushianBadge; expand Nav to 9 links"
```

---

## Wave B — New Vertical Pages (tasks 2–5 in parallel) ⬜

### HTML shell template (all 4 pages use this pattern)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>PAGE TITLE — Ethos Community™</title>
<link rel="icon" type="image/svg+xml" href="../favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,400&family=Manrope:wght@300;400;500;600;700&family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,300..700&family=Instrument+Serif&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../styles.css" />
<link rel="stylesheet" href="PAGE.css" />
</head>
<body data-pair="newsreader">
<div id="root"></div>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script type="text/babel" src="../shared.jsx"></script>
<script type="text/babel" src="PAGE.jsx"></script>
</body>
</html>
```

---

### Task 2: Provider Marketplace

**Files:**
- Create: `supporter/provider-marketplace.html`
- Create: `supporter/provider-marketplace.jsx`
- Create: `supporter/provider-marketplace.css`

- [ ] **Step 1: Create HTML shell** — title `Provider Marketplace — Ethos Community™`, CSS `provider-marketplace.css`, JSX `provider-marketplace.jsx`

- [ ] **Step 2: Create `supporter/provider-marketplace.jsx`**

```jsx
const { useState } = React;

const PROVIDERS = [
  { name: "Cleopatra Hospital",          category: "Clinics & Hospitals",         location: "Cairo, Egypt",     verified: true,  rating: 4.8, desc: "500-bed multi-specialty hospital serving Sudanese diaspora families. Telehealth available." },
  { name: "Sudan Doctors Network",        category: "Clinics & Hospitals",         location: "Dubai, UAE",       verified: true,  rating: 4.6, desc: "Network of 40+ Sudanese physicians in the GCC — consultations, referrals, specialist triage." },
  { name: "Al-Salam Medical Centre",      category: "Clinics & Hospitals",         location: "Riyadh, KSA",      verified: true,  rating: 4.5, desc: "Primary care and specialist services for Arabic-speaking communities in central Riyadh." },
  { name: "Dr Rasha Salim",               category: "Mentors & Coaches",           location: "London, UK",       verified: true,  rating: 5.0, desc: "Consultant cardiologist. Mentors Sudanese medical graduates entering UK foundation programmes." },
  { name: "Prof Khalid Mahmoud",          category: "Mentors & Coaches",           location: "Doha, Qatar",      verified: true,  rating: 4.9, desc: "Professor of Economics, Qatar University. Mentors post-graduate researchers and CPD candidates." },
  { name: "Nile Learning Institute",      category: "Universities & Training",     location: "Cairo, Egypt",     verified: true,  rating: 4.7, desc: "ACCA, CMA, PMP and digital skills certification — Arabic-medium available." },
  { name: "Gulf Skills Academy",          category: "Universities & Training",     location: "Abu Dhabi, UAE",   verified: true,  rating: 4.6, desc: "CPD aligned to UAE CBUAE and KHDA licensing requirements. Finance and law specialisms." },
  { name: "Omdurman CPD Institute",       category: "Universities & Training",     location: "Cairo, Egypt",     verified: true,  rating: 4.4, desc: "AAOIFI-accredited Islamic finance CPD. Credential preservation for displaced professionals." },
  { name: "Al-Neel Legal Consultancy",    category: "Lawyers",                     location: "Riyadh, KSA",      verified: true,  rating: 4.7, desc: "Documentation, residency permits, corporate formation and real-estate advisory." },
  { name: "Diaspora Law Group",           category: "Lawyers",                     location: "London, UK",       verified: true,  rating: 4.8, desc: "Immigration, asylum, nationality and family law for Arabic-speaking clients in the UK." },
  { name: "Nile Accounting Group",        category: "Accountants & Auditors",      location: "Dubai, UAE",       verified: true,  rating: 4.5, desc: "Accounting, VAT compliance, IFRS reporting and external audit for Sudanese-owned SMEs." },
  { name: "Heritage Tax Advisory",        category: "Tax Advisers",                location: "London, UK",       verified: true,  rating: 4.6, desc: "UK and cross-border tax for diaspora professionals, non-doms and business owners." },
  { name: "Ibn Khaldun Tax Advisory",     category: "Tax Advisers",                location: "Jeddah, KSA",      verified: false, rating: 4.2, desc: "Zakat, Saudi VAT and corporate tax advisory for family businesses and SMEs." },
  { name: "Dar Immigration Services",     category: "Immigration & Documentation", location: "Cairo, Egypt",     verified: true,  rating: 4.3, desc: "Egyptian residency, UNHCR registration, document legalisation and translation services." },
  { name: "Sudan Bridge Documentation",   category: "Immigration & Documentation", location: "Kampala, Uganda",  verified: false, rating: 4.1, desc: "Ugandan work permits, UNHCR processes and embassy documentation for Sudanese nationals." },
  { name: "Heritage Property Law",        category: "Property & Inheritance",      location: "London, UK",       verified: true,  rating: 4.6, desc: "Cross-border inheritance, Sudanese property claims, UK probate and estate planning." },
  { name: "Desert Rose Advisory",         category: "Business Consultants",        location: "Dubai, UAE",       verified: true,  rating: 4.7, desc: "Business setup, free-zone licensing, SME strategy for Sudanese entrepreneurs." },
  { name: "Khartoum Capital Advisers",    category: "Finance Partners",            location: "Doha, Qatar",      verified: true,  rating: 4.8, desc: "Islamic finance structuring, Murabaha facilities and development finance advisory." },
  { name: "Nile Takaful Cooperative",     category: "Takaful & Insurance",         location: "Riyadh, KSA",      verified: true,  rating: 4.5, desc: "Family Takaful, medical cover and group protection for Sudanese diaspora communities." },
  { name: "Gulf Solidarity Insurance",    category: "Takaful & Insurance",         location: "Abu Dhabi, UAE",   verified: false, rating: 4.0, desc: "Cooperative health and life cover for migrant workers and displaced professionals." }
];

const CATEGORIES = ["All","Clinics & Hospitals","Mentors & Coaches","Universities & Training","Lawyers","Accountants & Auditors","Tax Advisers","Immigration & Documentation","Property & Inheritance","Business Consultants","Finance Partners","Takaful & Insurance"];

function App() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = PROVIDERS.filter(p => active === "All" || p.category === active);

  return (
    <>
      <Nav active="marketplace" side="supporter" depth={1} />

      <section className="mp-hero">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Provider Directory · Verified Network</div>
            <h1>Provider <em>Marketplace</em></h1>
            <p>Verified professionals, clinics, institutions, and advisers serving Sudanese diaspora and displaced communities across 12 corridors.</p>
            <div className="mp-search-wrap">
              <Icon name="search" size={18}/>
              <input
                className="mp-search"
                type="search"
                placeholder="Search by name, specialty, or location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && showToast(`Search: ${search}`)}
              />
              <button className="btn btn-primary sm" onClick={() => showToast(`Search: ${search}`)}>Search</button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <div className="mp-filter-bar" role="tablist" aria-label="Provider categories">
          {CATEGORIES.map(c => (
            <button key={c} role="tab" aria-selected={active === c} className={`chip ${active === c ? "active" : ""}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
      </div>

      <section className="section-block">
        <div className="container">
          <div className="mp-grid">
            {filtered.map((p, i) => (
              <Reveal key={i} delay={i * 40}><ProviderCard {...p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block mp-join">
        <div className="container">
          <Reveal>
            <div className="mp-join-inner">
              <div>
                <div className="eyebrow">For Professionals</div>
                <h2>Join our verified provider network</h2>
                <p>Connect with Sudanese diaspora clients seeking your expertise. Verified listings, structured introductions, community trust.</p>
              </div>
              <button className="btn btn-primary" onClick={() => showToast("Provider application — coming next")}>Become a Listed Provider <Icon name="arrow"/></button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

- [ ] **Step 3: Create `supporter/provider-marketplace.css`**

```css
.mp-hero { padding: 80px 0 48px; background: var(--cream); border-bottom: 1px solid var(--line); }
.mp-hero h1 { font-size: clamp(36px,5vw,60px); font-weight: 400; margin: 16px 0 20px; }
.mp-hero p { max-width: 520px; font-size: 17px; color: var(--ink-soft); line-height: 1.65; margin-bottom: 32px; }
.mp-search-wrap { display: flex; align-items: center; gap: 10px; background: var(--cream-2); border: 1px solid var(--line); border-radius: 6px; padding: 10px 16px; max-width: 560px; }
.mp-search { flex: 1; border: none; background: transparent; outline: none; font-size: 15px; color: var(--ink); font-family: inherit; }
.mp-search::placeholder { color: var(--muted); }
.mp-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; padding: 24px 0; }
.mp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
@media (max-width: 880px) { .mp-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .mp-grid { grid-template-columns: 1fr; } }
.mp-join { background: var(--cream-2); border-top: 1px solid var(--line); }
.mp-join-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.mp-join-inner h2 { font-size: clamp(22px,3vw,30px); font-weight: 400; margin: 8px 0 12px; }
.mp-join-inner p { font-size: 15px; color: var(--ink-soft); max-width: 480px; line-height: 1.65; }
```

- [ ] **Step 4: Open `supporter/provider-marketplace.html` — verify 20 cards, filter works, no console errors**

- [ ] **Step 5: Dispatch impeccable subagent in `critique` mode → apply findings**

- [ ] **Step 6: Commit**

```bash
git add supporter/provider-marketplace.html supporter/provider-marketplace.jsx supporter/provider-marketplace.css
git commit -m "feat(phase2): add provider marketplace — 20 verified providers, category filter, search stub"
```

---

### Task 3: Women Empowerment Page

**Files:**
- Create: `supporter/women-empowerment.html`
- Create: `supporter/women-empowerment.jsx`
- Create: `supporter/women-empowerment.css`

- [ ] **Step 1: Create HTML shell** — title `Women Empowerment & Family Resilience — Ethos Community™`

- [ ] **Step 2: Create `supporter/women-empowerment.jsx`**

```jsx
const { useState } = React;

const PATHWAYS = [
  { icon: "heart",     title: "Widows Support",                     desc: "Living support, legal documentation, residency guidance and family stability for widowed women in Sudan and displacement corridors." },
  { icon: "family",    title: "Female-Headed Household Resilience", desc: "Income generation, children's education support, rent assistance and ambassador-verified need tracking." },
  { icon: "education", title: "Women CPD & Certification",          desc: "Professional development, AAOIFI/industry credential preservation, employability training and mentor matching." },
  { icon: "sme",       title: "Women-Led SME Support",              desc: "Business setup, licensing guidance, finance-readiness and marketplace access for women entrepreneurs." },
  { icon: "users",     title: "Family Resilience",                  desc: "Combined health, education and living support for vulnerable families through a single verified case." }
];

const CASES = [
  { id: "K-2890", name: "Halima M.", loc: "Dubai → Riyadh",  tag: "women",  desc: "Finance returnship · AAOIFI CPD pathway · Mentor-matched",           raised: 6200, target: 9000,  href: "../cases/halima.html" },
  { id: "K-3120", name: "Fatima A.", loc: "Kassala, Sudan",  tag: "family", desc: "Widowed mother of 3 · Living + children's education support",         raised: 2800, target: 8000,  href: null },
  { id: "K-3275", name: "Amira A.",  loc: "Cairo, Egypt",    tag: "women",  desc: "Displaced nurse · CPD recertification pathway · CCHM target",         raised: 1400, target: 5000,  href: null },
  { id: "K-3401", name: "Nour H.",   loc: "Omdurman, Sudan", tag: "sme",    desc: "Women-led textile cooperative · Export-readiness + market access",    raised: 3600, target: 12000, href: null },
  { id: "K-3580", name: "Samira K.", loc: "Port Sudan",      tag: "family", desc: "Female-headed household · Combined health + education support",       raised: 900,  target: 6500,  href: null }
];

const MENTORS = [
  { initials: "NA", name: "Dr Nadia Ahmed",    role: "Consultant Physician · London",   skills: ["Medicine","CPD","UK Pathways"],    match: "97% match" },
  { initials: "LH", name: "Lina Hassan",       role: "Senior Partner · Deloitte Dubai", skills: ["Finance","Audit","GCC"],           match: "93% match" },
  { initials: "RO", name: "Rawan Osman",       role: "Corporate Lawyer · Riyadh",       skills: ["Legal","Immigration","Contracts"], match: "89% match" },
  { initials: "SK", name: "Prof Samia Khalil", role: "Economics · Georgetown Doha",     skills: ["Economics","Research","Mentoring"],match: "85% match" }
];

function App() {
  return (
    <>
      <Nav active="women" side="supporter" depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 04 · Women Empowerment & Family Resilience</div>
              <h1>Dignified pathways for <em>women</em> and families.</h1>
              <p>From widows in Kassala to women professionals rebuilding careers in Dubai — verified, purpose-linked support with measurable outcomes.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <a href="../case-creation.html" className="btn btn-primary">Start a Women's Case <Icon name="arrow"/></a>
                <button className="btn btn-ghost" onClick={() => showToast("View all cases — coming next")}>View all cases</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="WOMEN · EMPOWERMENT · RESILIENCE" overlay="Women CPD circle, Riyadh 2026"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={312}/></div><div className="label">Women supported</div></div>
            <div><div className="num"><Counter to={74}/></div><div className="label">Widows reached</div></div>
            <div><div className="num"><Counter to={28}/></div><div className="label">Women-led SMEs</div></div>
            <div><div className="num"><Counter to={91} suffix="%"/></div><div className="label">Case verification rate</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Pathways</div><h2>Five pathways for women-centred support.</h2></div>
          </Reveal>
          <div className="we-pathways">
            {PATHWAYS.map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="we-pathway-card">
                  <div className="we-pathway-icon"><Icon name={p.icon} size={32}/></div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <button className="btn btn-text sm" onClick={() => showToast(`${p.title} — learn more`)}>Learn more <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Active Cases</div><h2>Women supported right now.</h2></div>
            <a href="../cases/halima.html" className="btn btn-ghost sm">View Halima's profile <Icon name="arrow" size={14}/></a>
          </Reveal>
          <div className="we-cases">
            {CASES.map((c,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="we-case-card">
                  <div className="we-case-top"><span className="case-id">{c.id}</span><PurposeBadge category={c.tag}/></div>
                  <h4>{c.name}</h4>
                  <div className="we-case-loc"><Icon name="pin" size={12}/> {c.loc}</div>
                  <p>{c.desc}</p>
                  <CaseProgressBar raised={c.raised} target={c.target}/>
                  {c.href
                    ? <a href={c.href} className="btn btn-ghost sm" style={{marginTop:12}}>View profile <Icon name="arrow" size={14}/></a>
                    : <button className="btn btn-ghost sm" style={{marginTop:12}} onClick={() => showToast(`Support ${c.name} — create a case`)}>Support this case <Icon name="arrow" size={14}/></button>
                  }
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Mentor Matching</div><h2>Women mentors, diaspora-matched.</h2></div>
          </Reveal>
          <div className="mentor-grid">
            {MENTORS.map((m,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="mentor" onClick={() => showToast(`Connect with ${m.name} — coming next`)}>
                  <div className="top">
                    <Avatar initials={m.initials} size="lg" green/>
                    <div><strong>{m.name}</strong><div className="sub">{m.role}</div></div>
                  </div>
                  <div className="skills">{m.skills.map(s => <span key={s} className="tag sm">{s}</span>)}</div>
                  <div className="match-row"><span className="match">{m.match}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block we-takaful">
        <div className="container">
          <Reveal>
            <div className="we-takaful-inner">
              <div className="we-takaful-icon"><Icon name="health" size={36}/></div>
              <div>
                <div className="eyebrow">Healthcare & Protection</div>
                <h3>Takaful coverage for women and families</h3>
                <p>Cooperative health and family protection plans for widows and female-headed households — through our Takaful partner network.</p>
              </div>
              <a href="healthcare.html" className="btn btn-ghost">View Takaful Pools <Icon name="arrow"/></a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

- [ ] **Step 3: Create `supporter/women-empowerment.css`**

```css
.we-pathways { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 40px; }
@media (max-width: 880px) { .we-pathways { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .we-pathways { grid-template-columns: 1fr; } }
.we-pathway-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 28px; display: flex; flex-direction: column; gap: 10px; transition: border-color .18s, box-shadow .18s; }
.we-pathway-card:hover { border-color: #d4caac; box-shadow: 0 4px 20px -8px rgba(20,21,18,.1); }
.we-pathway-icon { color: var(--green); }
.we-pathway-card h3 { font-size: 18px; font-weight: 400; margin: 0; }
.we-pathway-card p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin: 0; flex: 1; }
.we-cases { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 40px; }
@media (max-width: 880px) { .we-cases { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .we-cases { grid-template-columns: 1fr; } }
.we-case-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.we-case-top { display: flex; align-items: center; justify-content: space-between; }
.case-id { font-family: var(--mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.we-case-card h4 { font-size: 17px; font-weight: 400; margin: 0; }
.we-case-loc { font-family: var(--mono); font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.we-case-card p { font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin: 0; }
.we-takaful { background: var(--cream-2); border-top: 1px solid var(--line); }
.we-takaful-inner { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 40px; }
.we-takaful-icon { color: var(--green); flex-shrink: 0; }
.we-takaful-inner > div { flex: 1; }
.we-takaful-inner h3 { font-size: 22px; font-weight: 400; margin: 8px 0 12px; }
.we-takaful-inner p { font-size: 15px; color: var(--ink-soft); max-width: 420px; line-height: 1.65; }
```

- [ ] **Step 4: Verify — 5 pathway cards, 5 case cards with PurposeBadge, 4 mentors, Takaful panel**

- [ ] **Step 5: Dispatch impeccable subagent in `craft` mode → apply findings**

- [ ] **Step 6: Commit**

```bash
git add supporter/women-empowerment.html supporter/women-empowerment.jsx supporter/women-empowerment.css
git commit -m "feat(phase2): add women empowerment vertical — 5 pathways, 5 active cases, mentor grid, Takaful panel"
```

---

### Task 4: Legal Services Page

**Files:**
- Create: `supporter/legal-services.html`
- Create: `supporter/legal-services.jsx`
- Create: `supporter/legal-services.css`

- [ ] **Step 1: Create HTML shell** — title `Professional & Legal Services — Ethos Community™`

- [ ] **Step 2: Create `supporter/legal-services.jsx`**

```jsx
const SERVICE_CATS = [
  { icon: "legal",     title: "Legal Advisory",          count: 14, desc: "Litigation, documentation, contract review and family law across GCC, UK and East Africa." },
  { icon: "doc",       title: "Accounting & Audit",       count: 9,  desc: "Financial statements, IFRS compliance, external audit and bookkeeping for individuals and SMEs." },
  { icon: "trend",     title: "Tax Advisory",             count: 6,  desc: "Personal and corporate tax, Zakat, VAT registration and cross-border tax planning." },
  { icon: "globe",     title: "Immigration Support",      count: 11, desc: "Residency, work permits, asylum, UNHCR registration and citizenship applications." },
  { icon: "shield",    title: "Documentation Services",   count: 8,  desc: "Legalisation, notarisation, certified translation and embassy authentication." },
  { icon: "family",    title: "Property & Inheritance",   count: 5,  desc: "Cross-border estate planning, inheritance claims and property documentation." },
  { icon: "check",     title: "Compliance & Licensing",   count: 7,  desc: "Regulatory compliance, business licensing, AML and governance advisory." },
  { icon: "sme",       title: "Business Setup",           count: 10, desc: "Company formation, free-zone registration, partnership agreements and trade licensing." }
];

const PRACTITIONERS = [
  { initials: "AJ", name: "Ahmed Jalloul",     spec: "Immigration & Asylum",   loc: "London, UK",      juris: ["UK","EG"],   langs: ["Arabic","English"], verified: true },
  { initials: "SM", name: "Sara Mahmoud",       spec: "Corporate & Compliance", loc: "Dubai, UAE",      juris: ["UAE","KSA"], langs: ["Arabic","English"], verified: true },
  { initials: "TK", name: "Tariq Khalifa",      spec: "Property & Inheritance", loc: "Cairo, Egypt",    juris: ["EG","SD"],   langs: ["Arabic"],           verified: true },
  { initials: "RA", name: "Rasha Al-Amin",      spec: "Tax & Zakat Advisory",   loc: "Riyadh, KSA",     juris: ["KSA"],       langs: ["Arabic","English"], verified: false },
  { initials: "WO", name: "Walid Osman",        spec: "Legal Documentation",    loc: "Kampala, Uganda", juris: ["UG","SD"],   langs: ["Arabic","English"], verified: true },
  { initials: "NA", name: "Nadia Al-Rashid",    spec: "Family & Immigration",   loc: "Doha, Qatar",     juris: ["QA","UK"],   langs: ["Arabic","English","French"], verified: true },
  { initials: "MH", name: "Mohammed Hassan",    spec: "Business Setup",         loc: "Abu Dhabi, UAE",  juris: ["UAE"],       langs: ["Arabic","English"], verified: true },
  { initials: "FA", name: "Fatima Al-Nur",      spec: "Accounting & IFRS",      loc: "London, UK",      juris: ["UK","SD"],   langs: ["Arabic","English"], verified: true },
  { initials: "YB", name: "Youssef Bashir",     spec: "Corporate Litigation",   loc: "Jeddah, KSA",     juris: ["KSA"],       langs: ["Arabic"],           verified: false },
  { initials: "LE", name: "Layla El-Sayed",     spec: "Immigration & Asylum",   loc: "Cairo, Egypt",    juris: ["EG","UG"],   langs: ["Arabic","English"], verified: true },
  { initials: "HM", name: "Hamid Mirghani",     spec: "Commercial Law",         loc: "Dubai, UAE",      juris: ["UAE","KSA"], langs: ["Arabic","English"], verified: true },
  { initials: "AR", name: "Amira Rahhal",       spec: "Compliance & Licensing", loc: "Riyadh, KSA",     juris: ["KSA","QA"],  langs: ["Arabic","English"], verified: true }
];

function App() {
  return (
    <>
      <Nav active="legal" side="supporter" depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 06 · Professional & Legal Services</div>
              <h1>Trusted advisers for <em>documentation, residency</em> and compliance.</h1>
              <p>Verified lawyers, accountants, tax advisers and immigration specialists across GCC, UK and East Africa corridors.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Browse practitioners — coming next")}>Browse {PRACTITIONERS.length} practitioners <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("List your practice — coming next")}>List Your Practice</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="LEGAL · COMPLIANCE · ADVISORY" overlay="Professional advisory session, Dubai 2026"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={74}/></div><div className="label">Listed practitioners</div></div>
            <div><div className="num"><Counter to={8}/></div><div className="label">Service categories</div></div>
            <div><div className="num"><Counter to={12}/></div><div className="label">Jurisdictions covered</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Services</div><h2>Eight categories of professional support.</h2></div></Reveal>
          <div className="ls-service-grid">
            {SERVICE_CATS.map((s,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="ls-service-card">
                  <div className="ls-service-icon"><Icon name={s.icon} size={28}/></div>
                  <div>
                    <h3>{s.title}</h3>
                    <div className="ls-service-count">{s.count} practitioners</div>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Featured Case</div><h2>UC3 · Displaced parents in Uganda.</h2></div></Reveal>
          <Reveal>
            <div className="ls-featured-case">
              <div className="ls-featured-eyebrow"><PurposeBadge category="legal"/> <span className="case-id">Case K-3290</span></div>
              <h3>Supporting Displaced Parents in Uganda</h3>
              <p>A Sudanese legal professional based in Saudi Arabia used the platform to connect his parents — displaced to Kampala — with a verified local documentation and residency adviser. The adviser navigated Ugandan work permit requirements, UNHCR registration and authenticated family documents for an ongoing legal claim in Sudan.</p>
              <p style={{marginTop:12}}>Result: residency documentation secured within 6 weeks. Legal claim in progress through a verified Sudanese lawyer with East Africa jurisdiction.</p>
              <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Support this case — create a case first")}>Support this case <Icon name="arrow"/></button>
                <a href="../case-creation.html" className="btn btn-ghost">Create similar case</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Practitioners</div><h2>12 verified practitioners ready.</h2></div>
            <button className="btn btn-ghost sm" onClick={() => showToast("List your practice — coming next")}>List Your Practice <Icon name="arrow" size={14}/></button>
          </Reveal>
          <div className="ls-practitioner-list">
            {PRACTITIONERS.map((p,i) => (
              <Reveal key={i} delay={i*40}>
                <div className="ls-practitioner">
                  <Avatar initials={p.initials} size="lg" green={p.verified}/>
                  <div className="ls-practitioner-info">
                    <div className="ls-practitioner-top">
                      <strong>{p.name}</strong>
                      <span className={`provider-verified ${p.verified?"verified":"pending"}`}><Icon name="shield" size={13}/>{p.verified?"Verified":"Pending"}</span>
                    </div>
                    <div className="ls-practitioner-spec">{p.spec}</div>
                    <div className="ls-practitioner-meta">
                      <span><Icon name="pin" size={12}/> {p.loc}</span>
                      <span>{p.juris.map(j=><span key={j} className="ls-juris-pill">{j}</span>)}</span>
                      <span>{p.langs.join(" · ")}</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost sm" onClick={() => showToast(`Consultation request sent to ${p.name}`)}>Request Consultation <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

- [ ] **Step 3: Create `supporter/legal-services.css`**

```css
.ls-service-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 720px) { .ls-service-grid { grid-template-columns: 1fr; } }
.ls-service-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; gap: 20px; align-items: flex-start; transition: border-color .18s; }
.ls-service-card:hover { border-color: #d4caac; }
.ls-service-icon { color: var(--green); flex-shrink: 0; margin-top: 2px; }
.ls-service-card h3 { font-size: 16px; font-weight: 400; margin: 0 0 4px; }
.ls-service-count { font-family: var(--mono); font-size: 10.5px; color: var(--muted); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; }
.ls-service-card p { font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin: 0; }
.ls-featured-case { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 40px; max-width: 720px; }
.ls-featured-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.ls-featured-case h3 { font-size: 24px; font-weight: 400; margin: 0 0 16px; }
.ls-featured-case p { font-size: 15px; color: var(--ink-soft); line-height: 1.65; margin: 0; }
.ls-practitioner-list { display: flex; flex-direction: column; gap: 12px; margin-top: 40px; }
.ls-practitioner { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 20px 24px; display: flex; align-items: center; gap: 20px; transition: border-color .18s; }
.ls-practitioner:hover { border-color: #d4caac; }
.ls-practitioner-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.ls-practitioner-top { display: flex; align-items: center; gap: 12px; }
.ls-practitioner-top strong { font-size: 16px; font-weight: 500; }
.ls-practitioner-spec { font-size: 13px; color: var(--ink-soft); }
.ls-practitioner-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-family: var(--mono); font-size: 10.5px; color: var(--muted); letter-spacing: .04em; }
.ls-practitioner-meta > span { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.ls-juris-pill { background: var(--cream-2); border: 1px solid var(--line); border-radius: 4px; padding: 2px 6px; margin-right: 4px; display: inline-block; }
@media (max-width: 720px) { .ls-practitioner { flex-wrap: wrap; } }
```

- [ ] **Step 4: Verify — 8 service cards, UC3 featured case, 12 practitioners, no console errors**

- [ ] **Step 5: Dispatch impeccable subagent in `critique` mode → apply findings**

- [ ] **Step 6: Commit**

```bash
git add supporter/legal-services.html supporter/legal-services.jsx supporter/legal-services.css
git commit -m "feat(phase2): add legal services page — 8 service categories, 12 practitioners, UC3 featured case"
```

---

### Task 5: Product Traders Page

**Files:**
- Create: `supporter/product-traders.html`
- Create: `supporter/product-traders.jsx`
- Create: `supporter/product-traders.css`

- [ ] **Step 1: Create HTML shell** — title `Trade Corridor Recovery — Ethos Community™`

- [ ] **Step 2: Create `supporter/product-traders.jsx`**

```jsx
const PRODUCTS = [
  { name: "Sesame",     icon: "sme",     volume: "520,000 MT/yr", demand: "high",   desc: "Sudan's largest agricultural export. Key global input for tahini, oil and food manufacturing. Supply disrupted." },
  { name: "Arabic Gum", icon: "globe",   volume: "80,000 MT/yr",  demand: "high",   desc: "Sudan produces 70% of the world's gum arabic. Critical for confectionery, beverages, pharma and printing." },
  { name: "Karkadi",    icon: "heart",   volume: "12,000 MT/yr",  demand: "medium", desc: "Premium dried hibiscus. Growing demand for specialty beverages, health drinks and natural dyes." },
  { name: "Baobab",     icon: "trend",   volume: "4,000 MT/yr",   demand: "medium", desc: "Emerging superfood with growing European and US demand. Rich in vitamin C, fibre and antioxidants." }
];

const CORRIDORS = ["Cairo, Egypt","Dubai & Abu Dhabi, UAE","Riyadh, KSA","London, UK","Rotterdam, Netherlands","Singapore"];

const TRADERS = [
  { name: "Nile Agro Export Ltd",    product: "Sesame",     loc: "Khartoum → Dubai",       status: "export_ready", raised: 8400,  target: 20000 },
  { name: "Sahel Gum Trading Co.",   product: "Arabic Gum", loc: "Kordofan → Rotterdam",   status: "doc_pending",  raised: 2100,  target: 15000 },
  { name: "Eastern Karkadi Guild",   product: "Karkadi",    loc: "Kassala → London",       status: "early_stage",  raised: 600,   target: 8000 },
  { name: "Baobab Heritage Foods",   product: "Baobab",     loc: "Darfur → Amsterdam",     status: "export_ready", raised: 3200,  target: 10000 },
  { name: "Red Sea Grain Alliance",  product: "Sesame",     loc: "Port Sudan → Singapore", status: "doc_pending",  raised: 5600,  target: 25000 },
  { name: "Omdurman Naturals",       product: "Karkadi",    loc: "Omdurman → Paris",       status: "early_stage",  raised: 400,   target: 6000 }
];

const STATUS_LABEL = { export_ready: "Export Ready", doc_pending: "Docs Pending", early_stage: "Early Stage" };
const STATUS_CLS   = { export_ready: "status-ready", doc_pending: "status-pending", early_stage: "status-early" };

const TRADER_CHECKLIST = (status) => [
  { label: "Business registered",    status: "complete" },
  { label: "Export documentation",   status: status === "export_ready" ? "complete" : status === "doc_pending" ? "in_progress" : "pending" },
  { label: "Finance partner matched", status: status === "export_ready" ? "in_progress" : "pending" }
];

const DOC_CHECKLIST = [
  { label: "Export Licence",               status: "complete" },
  { label: "Phytosanitary Certificate",    status: "complete" },
  { label: "Certificate of Origin",        status: "complete" },
  { label: "Commercial Invoice",           status: "in_progress" },
  { label: "Packing List",                 status: "in_progress" },
  { label: "Bill of Lading",               status: "pending" }
];

const FINANCE_OPTIONS = [
  { icon: "shield", title: "Islamic Murabaha",  desc: "Asset-backed, Sharia-compliant trade finance for export working capital." },
  { icon: "trend",  title: "Export Credit",     desc: "Pre-shipment and post-shipment credit from development finance partners." },
  { icon: "users",  title: "Microfinance",      desc: "Small-scale working capital for early-stage traders and cooperatives." },
  { icon: "globe",  title: "Trade Finance",     desc: "Letters of credit, documentary collections and supply chain financing." }
];

function App() {
  return (
    <>
      <Nav active="trade" side="supporter" depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 07 · Trade Corridor Recovery</div>
              <h1>Protecting Sudanese export <em>livelihoods</em>.</h1>
              <p>From sesame to baobab — product profiling, export-readiness, buyer introductions and Islamic trade finance referrals for displaced Sudanese traders.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Profile your business — coming next")}>Profile Your Business <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Trade finance options — coming next")}>Trade Finance Options</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="TRADE · EXPORT · RECOVERY" overlay="Sesame processing, Port Sudan 2026"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={6}/></div><div className="label">Trade corridors</div></div>
            <div><div className="num"><Counter to={4}/></div><div className="label">Export products</div></div>
            <div><div className="num"><Counter to={38}/></div><div className="label">Traders profiled</div></div>
            <div><div className="num"><Counter to={2.4} suffix="M"/></div><div className="label">USD facilitated</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Products</div><h2>Four strategic Sudanese exports.</h2></div></Reveal>
          <div className="pt-products">
            {PRODUCTS.map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="pt-product-card">
                  <Photo caption={p.name.toUpperCase()} overlay={p.name}/>
                  <div className="pt-product-body">
                    <div className="pt-product-top">
                      <h3>{p.name}</h3>
                      <span className={`pt-demand pt-demand-${p.demand}`}>{p.demand === "high" ? "High Demand" : "Medium Demand"}</span>
                    </div>
                    <div className="pt-product-vol">{p.volume}</div>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-corridors-section">
        <div className="container">
          <Reveal>
            <div className="section-num" style={{color:"rgba(247,244,238,.6)"}}>§ Trade Corridors</div>
            <h2 style={{color:"var(--cream)",marginBottom:32}}>Sudan's export network, rebuilt.</h2>
            <div className="pt-corridor-map">
              <div className="pt-corridor-origin">
                <div className="pt-corridor-dot origin"></div>
                <div className="pt-corridor-origin-label">Sudan / Port Sudan</div>
              </div>
              <div className="pt-corridor-lines">
                {CORRIDORS.map((c,i) => (
                  <div key={i} className="pt-corridor-row">
                    <div className="pt-corridor-line"></div>
                    <div className="pt-corridor-dest"><div className="pt-corridor-dot"></div><span>{c}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Traders</div><h2>Active trader profiles.</h2></div></Reveal>
          <div className="pt-traders">
            {TRADERS.map((t,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="pt-trader-card">
                  <div className="pt-trader-top">
                    <div><h4>{t.name}</h4><div className="pt-trader-meta"><Icon name="pin" size={12}/> {t.loc}</div></div>
                    <span className={`pt-status ${STATUS_CLS[t.status]}`}>{STATUS_LABEL[t.status]}</span>
                  </div>
                  <div className="pt-trader-product"><PurposeBadge category="sme"/> {t.product}</div>
                  <Checklist items={TRADER_CHECKLIST(t.status)}/>
                  <CaseProgressBar raised={t.raised} target={t.target}/>
                  <button className="btn btn-ghost sm" style={{marginTop:12}} onClick={() => showToast(`Support request sent for ${t.name}`)}>Request Support <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
            <Reveal>
              <div className="section-num">§ Documentation</div>
              <h2>Export documentation checklist.</h2>
              <p style={{color:"var(--ink-soft)",marginBottom:24,lineHeight:1.65}}>Required documents for standard Sudanese agricultural exports. Platform assists with authentication and submission.</p>
              <Checklist items={DOC_CHECKLIST}/>
              <button className="btn btn-ghost" style={{marginTop:24}} onClick={() => showToast("Download documentation guide — coming next")}>Download Guide <Icon name="download" size={16}/></button>
            </Reveal>
            <Reveal delay={120}>
              <div className="section-num">§ Finance</div>
              <h2>Finance-readiness referrals.</h2>
              <p style={{color:"var(--ink-soft)",marginBottom:24,lineHeight:1.65}}>Connect with Sharia-compliant and development finance partners for export working capital.</p>
              <div className="pt-finance-options">
                {FINANCE_OPTIONS.map((f,i) => (
                  <div key={i} className="pt-finance-card">
                    <div className="pt-finance-icon"><Icon name={f.icon} size={22}/></div>
                    <div><strong>{f.title}</strong><p>{f.desc}</p></div>
                    <button className="btn btn-ghost sm" onClick={() => showToast(`${f.title} referral sent`)}>Apply <Icon name="arrow" size={14}/></button>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
```

- [ ] **Step 3: Create `supporter/product-traders.css`**

```css
.pt-products { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-top: 40px; }
@media (max-width: 720px) { .pt-products { grid-template-columns: 1fr; } }
.pt-product-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; overflow: hidden; transition: border-color .18s; }
.pt-product-card:hover { border-color: #d4caac; }
.pt-product-body { padding: 24px; }
.pt-product-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.pt-product-top h3 { font-size: 20px; font-weight: 400; margin: 0; }
.pt-product-vol { font-family: var(--mono); font-size: 11px; color: var(--muted); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 12px; }
.pt-product-body p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin: 0; }
.pt-demand { font-family: var(--mono); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
.pt-demand-high   { background: #d4ebe1; color: var(--green); }
.pt-demand-medium { background: #f5edcc; color: #7a5c14; }
.pt-corridors-section { background: var(--green-2); color: var(--cream); padding: 80px 0; }
.pt-corridor-map { display: grid; grid-template-columns: 180px 1fr; gap: 32px; align-items: start; }
@media (max-width: 560px) { .pt-corridor-map { grid-template-columns: 1fr; } }
.pt-corridor-origin { display: flex; flex-direction: column; align-items: center; gap: 8px; padding-top: 8px; }
.pt-corridor-origin-label { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: rgba(247,244,238,.7); text-align: center; }
.pt-corridor-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--gold); }
.pt-corridor-dot.origin { width: 18px; height: 18px; background: var(--cream); }
.pt-corridor-lines { display: flex; flex-direction: column; gap: 14px; }
.pt-corridor-row { display: flex; align-items: center; gap: 16px; }
.pt-corridor-line { flex: 0 0 60px; height: 1px; background: rgba(247,244,238,.25); }
.pt-corridor-dest { display: flex; align-items: center; gap: 10px; }
.pt-corridor-dest span { font-size: 14px; color: rgba(247,244,238,.85); }
.pt-traders { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 40px; }
@media (max-width: 880px) { .pt-traders { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .pt-traders { grid-template-columns: 1fr; } }
.pt-trader-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.pt-trader-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.pt-trader-card h4 { font-size: 15px; font-weight: 500; margin: 0 0 4px; }
.pt-trader-meta { font-family: var(--mono); font-size: 10.5px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.pt-trader-product { font-size: 13px; color: var(--ink-soft); display: flex; align-items: center; gap: 8px; }
.pt-status { font-family: var(--mono); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
.status-ready   { background: #d4ebe1; color: var(--green); }
.status-pending { background: #f5edcc; color: #7a5c14; }
.status-early   { background: var(--cream-2); color: var(--muted); border: 1px solid var(--line); }
.pt-finance-options { display: flex; flex-direction: column; gap: 12px; }
.pt-finance-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; }
.pt-finance-icon { color: var(--green); flex-shrink: 0; }
.pt-finance-card > div { flex: 1; }
.pt-finance-card strong { font-size: 14px; font-weight: 500; display: block; margin-bottom: 3px; }
.pt-finance-card p { font-size: 12px; color: var(--ink-soft); line-height: 1.5; margin: 0; }
```

- [ ] **Step 4: Verify — 4 product cards, corridor map, 6 trader profiles with Checklist, doc checklist, 4 finance cards**

- [ ] **Step 5: Dispatch impeccable subagent in `craft` mode → apply findings**

- [ ] **Step 6: Commit**

```bash
git add supporter/product-traders.html supporter/product-traders.jsx supporter/product-traders.css
git commit -m "feat(phase2): add product traders page — 4 exports, corridor map, 6 trader profiles, doc checklist, finance referrals"
```

---

## Wave C — Existing Page Modifications (tasks 6–9 in parallel) ⬜

### Task 6: Landing Page Enhancements

**Files:** Modify `app.jsx`

- [ ] **Step 1: Add PARTNERS data and PartnershipStrip section to `app.jsx`**

```jsx
// Add data near top of app.jsx:
const PARTNERS = [
  { icon: "sme",       name: "Technology Partner",           desc: "iWire — web, mobile, dashboard and integration development." },
  { icon: "trend",     name: "Payment & Fintech Partners",    desc: "Regulated payment flows, wallets, cards and remittance integration." },
  { icon: "health",    name: "Healthcare & Takaful Partners", desc: "Clinics, hospitals, telemedicine providers and cooperative insurance operators." },
  { icon: "education", name: "Education & CPD Partners",      desc: "Universities, online learning providers and professional certification bodies." },
  { icon: "legal",     name: "Professional Service Partners", desc: "Lawyers, accountants, auditors, tax advisers and immigration specialists." },
  { icon: "users",     name: "Community Partners",            desc: "Diaspora associations, women networks, student groups, NGOs and community ambassadors." }
];
```

Insert between How-It-Works and Founder Bio sections:

```jsx
<section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
  <div className="container">
    <Reveal className="block-head">
      <div><div className="section-num">§ Ecosystem</div><h2>An Ecosystem of Trusted Partners</h2></div>
      <p style={{fontSize:16,lineHeight:1.65,color:"var(--ink-soft)",maxWidth:480}}>Ethos Community connects diaspora supporters with verified providers, finance partners and community institutions — a governed ecosystem, not a single service.</p>
    </Reveal>
    <PartnershipStrip partners={PARTNERS}/>
  </div>
</section>
```

- [ ] **Step 2: Add Revenue Model strip before the dark CTA band**

```jsx
<section className="section-block">
  <div className="container">
    <Reveal>
      <div className="landing-revenue-inner">
        <div className="section-num">§ Business Model</div>
        <p className="landing-revenue-headline">This is not a charity app — it is <em>scalable human-development infrastructure</em> that converts informal diaspora support into verified, purpose-linked and measurable outcomes.</p>
        <div className="revenue-pills">
          {["Platform Fees","Subscriptions","Referral Commissions","Training & CPD","SME Advisory","White-Label Licensing"].map(r => (
            <span key={r} className="revenue-pill">{r}</span>
          ))}
        </div>
        <button className="btn btn-text" style={{marginTop:20}} onClick={() => showToast("Business model — learn more coming next")}>Learn about our model <Icon name="arrow"/></button>
      </div>
    </Reveal>
  </div>
</section>

<div className="scalability-band">
  <div className="container">
    <Reveal>
      <h3>Scalable across 57 OIC member countries</h3>
      <div className="scalability-pills">
        {["Sudan","Yemen","Palestine","Syria","Somalia","Iraq","Libya","Pakistan","Bangladesh","Indonesia","Nigeria","Mali"].map(c => (
          <span key={c} className="scalability-pill">{c}</span>
        ))}
      </div>
    </Reveal>
  </div>
</div>
```

- [ ] **Step 3: Add KushianBadge eyebrow in hero and returning-user ribbon**

In the hero section, add above the `<h1>`:
```jsx
<div className="hero-eyebrow-kushian"><KushianBadge variant="full"/> Sudan Pilot</div>
```

Add returning-user ribbon immediately after `<Nav side="neutral"/>`:
```jsx
{(() => {
  const role = typeof getEthosRole === "function" ? getEthosRole() : null;
  if (!role) return null;
  const side = typeof roleToSide === "function" ? roleToSide(role) : null;
  const dash = side === "beneficiary" ? "beneficiary/dashboard.html" : "supporter/dashboard.html";
  return (
    <div className="returning-ribbon">
      <span>Welcome back · You're registered as <strong>{role}</strong></span>
      <a href={dash} className="btn btn-text sm">Go to your dashboard <Icon name="arrow" size={14}/></a>
    </div>
  );
})()}
```

- [ ] **Step 4: Verify landing page — all 3 new sections present, KushianBadge in nav + hero, ribbon shows when localStorage set**

- [ ] **Step 5: Commit**

```bash
git add app.jsx
git commit -m "feat(phase2): landing — partner ecosystem, revenue strip, scalability band, Kushian eyebrow, returning-user ribbon"
```

---

### Task 7: Impact Dashboard New Metrics

**Files:** Modify `supporter/impact.jsx`, `supporter/impact.css`

- [ ] **Step 1: Add aggregate card + 3 new Counter items to stats strip in `supporter/impact.jsx`**

In the `.big-stats` grid, add these before the existing counters:

```jsx
// Full-width aggregate card at top of grid:
<div style={{gridColumn:"1/-1",background:"var(--green)",color:"var(--cream)",borderRadius:6,padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
  <div>
    <div style={{fontFamily:"var(--mono)",fontSize:11,letterSpacing:".08em",textTransform:"uppercase",opacity:.7,marginBottom:8}}>Verified Support Facilitated</div>
    <div style={{fontSize:"clamp(36px,5vw,56px)",fontWeight:400}}><Counter prefix="$" to={2400000}/></div>
  </div>
  <div style={{fontFamily:"var(--mono)",fontSize:12,opacity:.6,maxWidth:320,lineHeight:1.6}}>Across all verified cases, verticals and corridors · Updated monthly</div>
</div>

// New counter items alongside existing ones:
<div><div className="num"><Counter to={312}/></div><div className="label">Women Reached</div></div>
<div><div className="num"><Counter to={529}/></div><div className="label">Students Supported</div></div>
<div><div className="num"><Counter to={184}/></div><div className="label">Healthcare Cases</div></div>
```

- [ ] **Step 2: Add Verticals Impacted section to `supporter/impact.jsx`**

```jsx
// Add data:
const VERTICALS = [
  { category: "education", count: 142, label: "Education" },
  { category: "health",    count: 184, label: "Healthcare" },
  { category: "family",    count: 97,  label: "Family Support" },
  { category: "women",     count: 312, label: "Women" },
  { category: "sme",       count: 63,  label: "SME Recovery" },
  { category: "legal",     count: 44,  label: "Legal" }
];

// JSX section (append after geo grid):
<section className="section-block">
  <div className="container">
    <Reveal className="block-head"><div><div className="section-num">§ Verticals</div><h2>Six verticals impacted.</h2></div></Reveal>
    <div className="impact-verticals">
      {VERTICALS.map((v,i) => (
        <Reveal key={i} delay={i*60}>
          <div className="impact-vertical-tile">
            <PurposeBadge category={v.category}/>
            <div className="impact-vertical-count"><Counter to={v.count}/></div>
            <div className="impact-vertical-label">{v.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify — new metric cards in stats strip, Verticals Impacted section renders**

- [ ] **Step 4: Commit**

```bash
git add supporter/impact.jsx supporter/impact.css
git commit -m "feat(phase2): impact dashboard — Women/Students/Healthcare counters, Verified Support total, Verticals Impacted"
```

---

### Task 8: SME Advisory Finance Additions

**Files:** Modify `supporter/sme-advisory.jsx`, `supporter/sme-advisory.css`

- [ ] **Step 1: Add data + 3 new sections to `supporter/sme-advisory.jsx`**

Add near top of file:

```jsx
const FINANCE_CHECKLIST = [
  { label: "Business Registered",       status: "complete" },
  { label: "Licensed & Permitted",      status: "complete" },
  { label: "Tax Compliant",             status: "in_progress" },
  { label: "Audited Financials",        status: "in_progress" },
  { label: "Cash-Flow Statement Ready", status: "pending" },
  { label: "Finance Partner Matched",   status: "pending" }
];

const FINANCE_PARTNERS = [
  { icon: "shield", title: "Islamic Murabaha Financing", desc: "Asset-backed, Sharia-compliant working capital for registered SMEs." },
  { icon: "trend",  title: "Microfinance",               desc: "Small-scale working capital from verified microfinance partners." },
  { icon: "globe",  title: "Development Finance",        desc: "IsDB member-country facilities for displacement-affected SMEs." },
  { icon: "sme",    title: "Trade Finance",              desc: "Export/import credit lines and documentary collections." }
];
```

Append to App return (after existing sections):

```jsx
<section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
  <div className="container">
    <Reveal className="block-head">
      <div><div className="section-num">§ Finance Readiness</div><h2>Know where you stand before you apply.</h2></div>
      <p style={{fontSize:16,lineHeight:1.65,color:"var(--ink-soft)",maxWidth:480}}>Structured checklist to assess your SME's readiness for Sharia-compliant financing. Ambassadors use this to prepare a tailored referral.</p>
    </Reveal>
    <div className="sme-finance-grid">
      <Reveal>
        <div className="sme-checklist-panel">
          <h3>Finance-Readiness Checklist</h3>
          <Checklist items={FINANCE_CHECKLIST}/>
          <button className="btn btn-ghost" style={{marginTop:24}} onClick={() => showToast("Download readiness guide — coming next")}>Download Readiness Guide <Icon name="download" size={16}/></button>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="sme-cashflow-panel">
          <h3>Cash-Flow Snapshot</h3>
          <div className="sme-cashflow-table">
            <div className="sme-cf-row header"><span>Item</span><span>Month 1</span><span>Month 3</span><span>Month 6</span></div>
            <div className="sme-cf-row"><span>Revenue</span><span>$4,200</span><span>$8,600</span><span>$14,800</span></div>
            <div className="sme-cf-row"><span>Operating Costs</span><span>$3,100</span><span>$5,800</span><span>$9,200</span></div>
            <div className="sme-cf-row positive"><span>Net Cash Flow</span><span>$1,100</span><span>$2,800</span><span>$5,600</span></div>
          </div>
          <p style={{fontSize:13,color:"var(--muted)",marginTop:12}}>Sample projection — Sudanese grocery SME, Riyadh · Pre-financing baseline</p>
        </div>
      </Reveal>
    </div>
  </div>
</section>

<section className="section-block">
  <div className="container">
    <Reveal className="block-head"><div><div className="section-num">§ Finance Partners</div><h2>Sharia-compliant finance referrals.</h2></div></Reveal>
    <div className="sme-finance-partners">
      {FINANCE_PARTNERS.map((p,i) => (
        <Reveal key={i} delay={i*60}>
          <div className="sme-finance-partner-card">
            <div className="sme-fp-icon"><Icon name={p.icon} size={28}/></div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
            <button className="btn btn-ghost sm" onClick={() => showToast(`${p.title} referral sent`)}>Apply for Referral <Icon name="arrow" size={14}/></button>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS to `supporter/sme-advisory.css`**

```css
.sme-finance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 40px; align-items: start; }
@media (max-width: 720px) { .sme-finance-grid { grid-template-columns: 1fr; } }
.sme-checklist-panel, .sme-cashflow-panel { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 32px; }
.sme-checklist-panel h3, .sme-cashflow-panel h3 { font-size: 20px; font-weight: 400; margin: 0 0 24px; }
.sme-cashflow-table { border: 1px solid var(--line); border-radius: 6px; overflow: hidden; }
.sme-cf-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 12px 16px; border-bottom: 1px solid var(--line); font-family: var(--mono); font-size: 12px; }
.sme-cf-row:last-child { border-bottom: none; }
.sme-cf-row.header { background: var(--cream-2); color: var(--muted); text-transform: uppercase; letter-spacing: .06em; font-size: 10.5px; }
.sme-cf-row.positive { color: var(--green); font-weight: 500; }
.sme-finance-partners { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 40px; }
@media (max-width: 880px) { .sme-finance-partners { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .sme-finance-partners { grid-template-columns: 1fr; } }
.sme-finance-partner-card { background: var(--cream); border: 1px solid var(--line); border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 10px; transition: border-color .18s; }
.sme-finance-partner-card:hover { border-color: #d4caac; }
.sme-fp-icon { color: var(--green); }
.sme-finance-partner-card h4 { font-size: 15px; font-weight: 400; margin: 0; }
.sme-finance-partner-card p { font-size: 13px; color: var(--ink-soft); line-height: 1.55; margin: 0; flex: 1; }
```

- [ ] **Step 3: Verify — checklist 3 statuses correct, cash-flow table renders, 4 finance partner cards**

- [ ] **Step 4: Commit**

```bash
git add supporter/sme-advisory.jsx supporter/sme-advisory.css
git commit -m "feat(phase2): SME advisory — finance-readiness checklist, cash-flow snapshot, finance referral panel"
```

---

### Task 9: Supporter Dashboard + All 6 Profile Pages

**Files:** Modify `supporter/dashboard.jsx`, `supporter/cases/maryam.jsx`, `awad.jsx`, `yasmin.jsx`, `afaf.jsx`, `ibrahim.jsx`, `halima.jsx`

- [ ] **Step 1: Add `category` field to cases array in `supporter/dashboard.jsx`**

Find the cases data array. Add `category` to each case:
- Maryam K-2384 → `category: "family"`
- Awad K-1908 → `category: "family"`
- Yasmin K-2756 → `category: "health"`
- Dr Afaf K-3014 → `category: "sme"`
- Ibrahim K-2102 → `category: "education"`
- Halima K-2890 → `category: "women"`

- [ ] **Step 2: Add `<PurposeBadge>` in each case card JSX in `supporter/dashboard.jsx`**

In the case card template, add alongside the case ID:
```jsx
<PurposeBadge category={c.category}/>
```

- [ ] **Step 3: Add "Create New Case" button to dashboard header**

```jsx
<a href="../case-creation.html" className="btn btn-primary"><Icon name="plus" size={16}/> Create New Case</a>
```

- [ ] **Step 4: Add empty state toggle to `supporter/dashboard.jsx`**

```jsx
// At top of App component:
const [showEmpty, setShowEmpty] = useState(() => new URLSearchParams(window.location.search).get("empty") === "1");

// Wrap case list:
{showEmpty ? (
  <div className="dash-empty-state">
    <div className="dash-empty-icon"><Icon name="users" size={48}/></div>
    <h3>Get started with Ethos Community</h3>
    <div className="dash-empty-steps">
      <div className="dash-empty-step"><span className="dash-empty-num">1</span><p>Choose your role and join the platform</p></div>
      <div className="dash-empty-step"><span className="dash-empty-num">2</span><p>Create your first verified support case</p></div>
      <div className="dash-empty-step"><span className="dash-empty-num">3</span><p>Track verified outcomes on the impact dashboard</p></div>
    </div>
    <a href="../role-chooser.html" className="btn btn-primary">Get Started <Icon name="arrow"/></a>
    <button className="btn btn-text sm" style={{marginTop:12}} onClick={() => setShowEmpty(false)}>View demo cases</button>
  </div>
) : (
  /* existing case list JSX unchanged */
)}
```

- [ ] **Step 5: Add Similar Cases section to all 6 profile JSX files**

For each profile, add before `<Footer/>`:

```jsx
// maryam.jsx:
const SIMILAR_CASES = [
  { id: "K-1908", name: "Awad T. — Family Support", href: "awad.html" },
  { id: "K-3120", name: "Fatima A. — Widows Support", href: "../women-empowerment.html" },
  { id: "K-3580", name: "Samira K. — Family Resilience", href: "../women-empowerment.html" }
];

// awad.jsx:
const SIMILAR_CASES = [
  { id: "K-2384", name: "Maryam R. — Family Support", href: "maryam.html" },
  { id: "K-3120", name: "Fatima A. — Widows Support", href: "../women-empowerment.html" },
  { id: "K-2890", name: "Halima M. — Women CPD", href: "halima.html" }
];

// yasmin.jsx:
const SIMILAR_CASES = [
  { id: "Healthcare", name: "Browse all healthcare cases", href: "../healthcare.html" },
  { id: "K-3275",    name: "Amira A. — Displaced nurse", href: "../women-empowerment.html" },
  { id: "Takaful",   name: "View Takaful coverage options", href: "../healthcare.html" }
];

// afaf.jsx:
const SIMILAR_CASES = [
  { id: "SME Advisory",  name: "SME Recovery & Finance-Readiness", href: "../sme-advisory.html" },
  { id: "K-2890",        name: "Halima M. — Women CPD", href: "halima.html" },
  { id: "K-3401",        name: "Nour H. — Women-Led SME", href: "../women-empowerment.html" }
];

// ibrahim.jsx:
const SIMILAR_CASES = [
  { id: "Education",  name: "Browse all education cases", href: "../education.html" },
  { id: "K-2384",     name: "Maryam R. — Student support", href: "maryam.html" },
  { id: "Mentors",    name: "View diaspora mentor network", href: "../education.html" }
];

// halima.jsx:
const SIMILAR_CASES = [
  { id: "Women",      name: "Browse women's support pathways", href: "../women-empowerment.html" },
  { id: "K-3275",     name: "Amira A. — Women CPD", href: "../women-empowerment.html" },
  { id: "K-3401",     name: "Nour H. — Women-Led SME", href: "../women-empowerment.html" }
];
```

Add this JSX section to each profile (before `<Footer/>`):

```jsx
<section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)"}}>
  <div className="container">
    <Reveal>
      <div className="section-num">§ Similar Cases</div>
      <h3 style={{fontSize:20,fontWeight:400,marginBottom:24}}>Other cases you might support</h3>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        {SIMILAR_CASES.map((s,i) => (
          <a key={i} href={s.href} className="similar-case-link">
            <span className="similar-case-id">{s.id}</span>
            <span className="similar-case-name">{s.name} <Icon name="arrow" size={14}/></span>
          </a>
        ))}
      </div>
    </Reveal>
  </div>
</section>
```

- [ ] **Step 6: Update toast copy on all 6 profiles**

Find `showToast("Support this case...")` / `showToast("Pledge now...")` / `showToast("Become a supporter...")` calls in each profile JSX. Replace with:
```jsx
showToast("To support this case, create a support case → case-creation.html")
```

- [ ] **Step 7: Dispatch impeccable subagent in `polish` mode against `supporter/dashboard.html` → apply findings**

- [ ] **Step 8: Commit**

```bash
git add supporter/dashboard.jsx supporter/cases/maryam.jsx supporter/cases/awad.jsx supporter/cases/yasmin.jsx supporter/cases/afaf.jsx supporter/cases/ibrahim.jsx supporter/cases/halima.jsx
git commit -m "feat(phase2): dashboard purpose badges + empty state; all 6 profiles get similar-cases rows + updated CTA copy"
```

---

## Wave D — Final Impeccable Review Pass ⬜

### Task 10: Holistic Design Audit

- [ ] **Step 1:** Dispatch impeccable subagent in `critique` mode against the 4 new pages — checking design consistency, visual hierarchy, mobile responsiveness. Apply critical findings.

- [ ] **Step 2:** Dispatch impeccable subagent in `delight` mode against `landing.html` with all Phase 2 additions.

- [ ] **Step 3: Commit fixes**

```bash
git add -u
git commit -m "design: apply impeccable Phase 2 holistic audit findings"
```

---

## Wave E — QA & Serve ⬜

### Task 11: Validation & Server

- [ ] **Step 1: Verify new components exported from shared.jsx**

Open browser console on any page, run:
```js
typeof ProviderCard      // → "function"
typeof Checklist         // → "function"
typeof PurposeBadge      // → "function"
typeof KushianBadge      // → "function"
typeof PartnershipStrip  // → "function"
```

- [ ] **Step 2: Full journey smoke test**

1. `landing.html` → KushianBadge in nav + hero, partner ecosystem, revenue strip, scalability band
2. `role-chooser.html` → select Diaspora Supporter → redirects to `supporter/dashboard.html`
3. `supporter/dashboard.html` → PurposeBadge on cases, Create New Case button; `?empty=1` shows empty state
4. Nav → Women → `supporter/women-empowerment.html` → 5 pathways, 5 cases
5. Nav → Legal → `supporter/legal-services.html` → UC3 featured case, 12 practitioners
6. Nav → Trade → `supporter/product-traders.html` → corridor map, 6 traders
7. Nav → Marketplace → `supporter/provider-marketplace.html` → filter works
8. Nav → Impact → `supporter/impact.html` → new metric cards + Verticals Impacted
9. `supporter/sme-advisory.html` → checklist + cash-flow table + 4 finance cards
10. `supporter/cases/maryam.html` → Similar Cases row at bottom

- [ ] **Step 3: Find free port and serve**

```bash
for port in 3000 3001 4000 5000 5001 7000; do
  lsof -i :$port >/dev/null 2>&1 || { echo "Free port: $port"; python3 -m http.server $port; break; }
done
```

---

## File Manifest

| File | Action |
|------|--------|
| `shared.jsx` | Modify — add 5 components, expand Nav, KushianBadge in logo |
| `styles.css` | Modify — all new component + utility styles |
| `app.jsx` | Modify — 3 new sections + Kushian eyebrow + returning ribbon |
| `supporter/provider-marketplace.{html,jsx,css}` | Create |
| `supporter/women-empowerment.{html,jsx,css}` | Create |
| `supporter/legal-services.{html,jsx,css}` | Create |
| `supporter/product-traders.{html,jsx,css}` | Create |
| `supporter/impact.jsx` + `impact.css` | Modify — metrics + verticals |
| `supporter/sme-advisory.jsx` + `sme-advisory.css` | Modify — 3 finance sections |
| `supporter/dashboard.jsx` | Modify — PurposeBadge + CTA + empty state |
| `supporter/cases/{maryam,awad,yasmin,afaf,ibrahim,halima}.jsx` | Modify — Similar Cases + toast copy |
