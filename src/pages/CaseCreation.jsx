import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import FormField from '../components/FormField.jsx';
import FormInput from '../components/FormInput.jsx';
import FormSelect from '../components/FormSelect.jsx';
import FormRadioGroup from '../components/FormRadioGroup.jsx';
import FormTextarea from '../components/FormTextarea.jsx';
import UploadZone from '../components/UploadZone.jsx';
import { showToast } from '../components/Toast.jsx';
import { getEthosSide, sideDashboardUrl } from '../utils/role.js';
import '../case-creation.css';

const SUPPORT_TYPES = [
  { id: "health", icon: "health", title: "Healthcare", desc: "Clinic referrals, telemedicine, hospitalization, and Takaful pathways." },
  { id: "education", icon: "education", title: "Education & CPD", desc: "Student support, credential preservation, mentorship, and training." },
  { id: "legal", icon: "legal", title: "Legal & Documentation", desc: "Residency, inheritance, immigration, and compliance support." },
  { id: "women", icon: "women", title: "Women Empowerment", desc: "Widows support, women-led SMEs, CPD, and family resilience." },
  { id: "family", icon: "family", title: "Family Support", desc: "Living costs, rent, emergency support, and family stability." },
  { id: "sme", icon: "sme", title: "SME Recovery", desc: "Business diagnostics, finance-readiness, and licensing support." }
];

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

const SUGGESTED_DOCS = [
  "Government-issued ID",
  "Proof of need (medical letter, school enrolment, etc.)",
  "Proof of relationship (where applicable)"
];

const FREQUENCIES = [
  { value: "one-time", label: "One-time pledge" },
  { value: "monthly", label: "Recurring monthly" }
];

const STEP_LABELS = ["Support type", "Beneficiary", "Need", "Funding", "Confirm"];

const generateCaseId = () => `K-${3500 + Math.floor(Math.random() * 500)}`;
const SUPPORT_TYPE_LABELS = Object.fromEntries(SUPPORT_TYPES.map(s => [s.id, s.title]));
const LOCATION_LABELS = Object.fromEntries(LOCATIONS.map(l => [l.value, l.label]));
const CATEGORY_LABELS = Object.fromEntries(BENEFICIARY_CATEGORIES.map(c => [c.value, c.label]));
const FREQUENCY_LABELS = Object.fromEntries(FREQUENCIES.map(f => [f.value, f.label]));

const StepRail = ({ current, onJump }) => (
  <ol className="cc-rail" aria-label="Wizard progress">
    {STEP_LABELS.map((label, i) => {
      const status = i < current ? "done" : i === current ? "active" : "idle";
      const num = String(i + 1).padStart(2, "0");
      const reachable = i <= current;
      return (
        <li key={i} className={`cc-rail-step cc-rail-${status}`}>
          <button
            type="button"
            className="cc-rail-trigger"
            onClick={() => reachable && onJump(i)}
            disabled={!reachable}
            aria-current={status === "active" ? "step" : undefined}
          >
            <span className="cc-rail-num">{status === "done" ? <Icon name="check" size={18} /> : num}</span>
            <span className="cc-rail-label">{label}</span>
          </button>
          {i < STEP_LABELS.length - 1 && <span className="cc-rail-line" aria-hidden="true" />}
        </li>
      );
    })}
  </ol>
);

const SupportRow = ({ index, item, isSelected, onSelect }) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li className={`cc-pick ${isSelected ? "is-selected" : ""}`}>
      <button type="button" className="cc-pick-trigger" onClick={onSelect} aria-pressed={isSelected}>
        <span className="cc-pick-num">{num}</span>
        <span className="cc-pick-icon"><Icon name={item.icon} size={22} /></span>
        <span className="cc-pick-body">
          <span className="cc-pick-title">{item.title}</span>
          <span className="cc-pick-desc">{item.desc}</span>
        </span>
        <span className="cc-pick-meta">
          {isSelected ? <span className="cc-pick-pill">Chosen</span> : <Icon name="arrow" size={18} />}
        </span>
      </button>
    </li>
  );
};

const Step1Support = ({ value, onSelect }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 01 of 05</span>
      <h2>What kind of support is this case for?</h2>
      <p>Choose the vertical that best matches the underlying need. You can refine specifics in the next steps.</p>
    </header>
    <ol className="cc-pick-list">
      {SUPPORT_TYPES.map((s, i) => (
        <SupportRow key={s.id} index={i} item={s} isSelected={value === s.id} onSelect={() => onSelect(s.id)} />
      ))}
    </ol>
  </div>
);

const Step2Beneficiary = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 02 of 05</span>
      <h2>Who is this case for?</h2>
      <p>Provide basic details about the beneficiary. A community ambassador will verify these in the next stage.</p>
    </header>
    <div className="cc-form">
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

const Step3Need = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 03 of 05</span>
      <h2>Describe the need.</h2>
      <p>Give a verifier and a supporter enough context to understand the case. Documents speed verification.</p>
    </header>
    <div className="cc-form">
      <FormField label="Need description" htmlFor="need-desc" required hint="Minimum 20 characters.">
        <FormTextarea id="need-desc" placeholder="e.g. Surgical follow-up costs for displaced parent currently in Cairo. Initial assessment completed at Cleopatra Hospital on 12 March." value={value.description} onChange={e => onChange({ ...value, description: e.target.value })} />
      </FormField>
      <div className="cc-form-split">
        <FormField label="Supporting documents" hint="Demo only — uploads are not stored.">
          <UploadZone />
        </FormField>
        <aside className="cc-suggested-docs" aria-label="Suggested documents">
          <span className="form-field-label">Suggested documents</span>
          <ul>
            {SUGGESTED_DOCS.map((d, i) => (
              <li key={i}><Icon name="doc" size={14} /> {d}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  </div>
);

const Step4Funding = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 04 of 05</span>
      <h2>Funding pathway.</h2>
      <p>Set an initial pledge target. Supporters can contribute any amount up to the target.</p>
    </header>
    <div className="cc-form">
      <div className="cc-form-row">
        <FormField label="Pledge target (USD)" htmlFor="funding-amount" required>
          <FormInput id="funding-amount" type="number" placeholder="0" value={value.amount} onChange={e => onChange({ ...value, amount: e.target.value })} min="0" />
        </FormField>
        <FormField label="Frequency" required>
          <FormRadioGroup name="frequency" options={FREQUENCIES} value={value.frequency} onChange={e => onChange({ ...value, frequency: e.target.value })} />
        </FormField>
      </div>
      <FormField label="Wallet / payment account" hint="Bank or wallet details will be collected after community ambassador verification.">
        <FormInput placeholder="Collected after verification" disabled />
      </FormField>
    </div>
  </div>
);

const Step5Confirm = ({ caseId, supportType, beneficiary, need, funding }) => {
  const rows = [
    ["Support type", SUPPORT_TYPE_LABELS[supportType] || "—"],
    ["Beneficiary", `${beneficiary.name} · ${LOCATION_LABELS[beneficiary.location] || "—"} · ${CATEGORY_LABELS[beneficiary.category] || "—"}`],
    ["Need", need.description.slice(0, 220) + (need.description.length > 220 ? "…" : "")],
    ["Funding", `$${Number(funding.amount).toLocaleString()} · ${FREQUENCY_LABELS[funding.frequency] || "—"}`]
  ];
  return (
    <div className="cc-step cc-confirm">
      <header className="cc-step-header">
        <span className="cc-step-eyebrow">Step 05 of 05 · review</span>
        <h2>Case dossier ready for verification.</h2>
        <p>A community ambassador reviews this dossier within 48 hours. You will receive milestone updates as it progresses through the audit trail.</p>
      </header>
      <article className="cc-dossier" aria-label="Case dossier summary">
        <header className="cc-dossier-head">
          <span className="cc-dossier-tag">Pending verification</span>
          <span className="cc-dossier-id">
            <span className="cc-dossier-id-label">Case ID</span>
            <span className="cc-dossier-id-value">{caseId}</span>
          </span>
        </header>
        <dl className="cc-dossier-grid">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <footer className="cc-dossier-foot">
          <span><Icon name="shield" size={14} /> Verification by community ambassador</span>
          <span><Icon name="clock" size={14} /> Expected within 48 hours</span>
        </footer>
      </article>
    </div>
  );
};

export default function CaseCreation() {
  const [step, setStep] = useState(0);
  const [supportType, setSupportType] = useState(null);
  const [beneficiary, setBeneficiary] = useState({ name: "", location: "", category: "" });
  const [need, setNeed] = useState({ description: "" });
  const [funding, setFunding] = useState({ amount: "", frequency: "" });
  const [caseId] = useState(generateCaseId);

  const stepContent = [
    <Step1Support value={supportType} onSelect={setSupportType} />,
    <Step2Beneficiary value={beneficiary} onChange={setBeneficiary} />,
    <Step3Need value={need} onChange={setNeed} />,
    <Step4Funding value={funding} onChange={setFunding} />,
    <Step5Confirm caseId={caseId} supportType={supportType} beneficiary={beneficiary} need={need} funding={funding} />
  ];

  const isLast = step === stepContent.length - 1;
  const canAdvance =
    step === 0 ? !!supportType :
    step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
    step === 2 ? need.description.trim().length >= 20 :
    step === 3 ? !!(Number(funding.amount) > 0 && funding.frequency) :
    true;

  const advanceLabel = (() => {
    if (isLast) return "Submit case";
    if (step === 0) return "Continue to beneficiary";
    if (step === 1) return "Continue to need";
    if (step === 2) return "Continue to funding";
    if (step === 3) return "Continue to review";
    return "Continue";
  })();

  const advanceHint = (() => {
    if (canAdvance || isLast) return null;
    if (step === 0) return "Pick a support vertical to continue.";
    if (step === 1) return "Name, location, and category required.";
    if (step === 2) return "Need description must be at least 20 characters.";
    if (step === 3) return "Set a pledge target greater than zero and choose frequency.";
    return null;
  })();

  const back = () => step > 0 && setStep(step - 1);
  const next = () => {
    if (!canAdvance) return;
    if (isLast) submit();
    else setStep(step + 1);
  };
  const dashboardHref = sideDashboardUrl(getEthosSide() || "supporter", 0);
  const submit = () => {
    const side = getEthosSide() || "supporter";
    const target = sideDashboardUrl(side, 0);
    showToast(`Case ${caseId} submitted for verification`);
    setTimeout(() => { window.location.href = target; }, 1200);
  };

  return (
    <>
      <Nav side="neutral" depth={0} />
      <DemoTag />
      <main className="case-creation">
        <div className="container">
          <header className="cc-header">
            <div className="cc-header-meta">
              <span className="cc-header-tag">Registration ticket</span>
              <span className="cc-header-id">{caseId}</span>
            </div>
            <h1>Open a verified support case.</h1>
            <p>Five short stages — support type, beneficiary, need, funding, then review. Every field becomes part of the case audit trail.</p>
          </header>

          <StepRail current={step} onJump={setStep} />

          <section className="cc-panel" aria-live="polite">
            {stepContent[step]}
          </section>

          <footer className="cc-actions">
            <button type="button" className="btn btn-soft" onClick={back} disabled={step === 0}>
              <Icon name="arrow-left" size={16} /> Back
            </button>
            <div className="cc-actions-status">
              {advanceHint
                ? <span className="cc-actions-hint">{advanceHint}</span>
                : <span className="cc-actions-meta">Step {String(step + 1).padStart(2, "0")} / 05</span>}
            </div>
            <button type="button" className="btn btn-primary" onClick={next} disabled={!canAdvance}>
              {advanceLabel} <Icon name="arrow" size={16} />
            </button>
          </footer>

          <div className="cc-cancel">
            <a href={dashboardHref} className="btn-text">Cancel and return to dashboard</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
