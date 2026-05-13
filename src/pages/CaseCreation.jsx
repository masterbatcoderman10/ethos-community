import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import { getActiveUser, getActiveUserId, addDraftCase } from '../data/mockSession.js';
import './CaseCreation.css';

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

const RECEIVER_SUGGESTED_DOCS = [
  "Government-issued ID or passport",
  "Medical records or referral letters",
  "School or university enrolment documents",
  "Business registration or licence",
  "Proof of displacement or residency status"
];

const FREQUENCIES = [
  { value: "one-time", label: "One-time pledge" },
  { value: "monthly", label: "Recurring monthly" }
];

const URGENCY_OPTIONS = [
  { value: "critical", label: "Critical — immediate danger or hardship" },
  { value: "within-week", label: "Within a week" },
  { value: "within-month", label: "Within a month" },
  { value: "flexible", label: "Flexible — no immediate deadline" }
];

const VERTICAL_OPTIONS = [
  { value: "", label: "Select a support pathway" },
  { value: "health", label: "Healthcare" },
  { value: "education", label: "Education & CPD" },
  { value: "legal", label: "Legal & Documentation" },
  { value: "women", label: "Women Empowerment" },
  { value: "family", label: "Family Support" },
  { value: "sme", label: "SME Recovery" }
];

const SUPPORTER_STEPS = ["Support type", "Beneficiary", "Need", "Funding", "Confirm"];
const RECEIVER_STEPS = ["Situation", "Outcome", "Documents", "Funding", "Confirm"];

const generateCaseId = () => `K-${3500 + Math.floor(Math.random() * 500)}`;
const SUPPORT_TYPE_LABELS = Object.fromEntries(SUPPORT_TYPES.map(s => [s.id, s.title]));
const LOCATION_LABELS = Object.fromEntries(LOCATIONS.map(l => [l.value, l.label]));
const CATEGORY_LABELS = Object.fromEntries(BENEFICIARY_CATEGORIES.map(c => [c.value, c.label]));
const FREQUENCY_LABELS = Object.fromEntries(FREQUENCIES.map(f => [f.value, f.label]));
const URGENCY_LABELS = Object.fromEntries(URGENCY_OPTIONS.map(u => [u.value, u.label]));
const VERTICAL_LABELS = Object.fromEntries(VERTICAL_OPTIONS.filter(v => v.value).map(v => [v.value, v.label]));

const StepRail = ({ current, labels, onJump }) => (
  <ol className="cc-rail" aria-label="Wizard progress">
    {labels.map((label, i) => {
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
          {i < labels.length - 1 && <span className="cc-rail-line" aria-hidden="true" />}
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

const RStep1Situation = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 01 of 05</span>
      <h2>What is your current situation?</h2>
      <p>I need support / I am registering my situation. Describe what you are going through so ambassadors and supporters understand how to help.</p>
    </header>
    <div className="cc-form">
      <FormField label="Current situation" htmlFor="situation-desc" required hint="Minimum 20 characters.">
        <FormTextarea id="situation-desc" placeholder="e.g. Displaced from Khartoum with 3 children, currently in Cairo. Need urgent medical care for youngest child and school placement for the others." value={value.description} onChange={e => onChange({ ...value, description: e.target.value })} />
      </FormField>
      <FormField label="Urgency" required>
        <FormRadioGroup name="urgency" options={URGENCY_OPTIONS} value={value.urgency} onChange={e => onChange({ ...value, urgency: e.target.value })} />
      </FormField>
    </div>
  </div>
);

const RStep2Outcome = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 02 of 05</span>
      <h2>What outcome are you seeking?</h2>
      <p>Tell us what success looks like for you and choose the type of support that best fits your needs.</p>
    </header>
    <div className="cc-form">
      <FormField label="Desired outcome" htmlFor="outcome-desc" required>
        <FormTextarea id="outcome-desc" placeholder="e.g. Enrol children in school and cover 6 months of rent while I look for work." value={value.desiredOutcome} onChange={e => onChange({ ...value, desiredOutcome: e.target.value })} />
      </FormField>
      <FormField label="Support pathway" htmlFor="outcome-pathway" required>
        <FormSelect id="outcome-pathway" options={VERTICAL_OPTIONS} value={value.pathway} onChange={e => onChange({ ...value, pathway: e.target.value })} placeholder="Select a support pathway" />
      </FormField>
      <FormField label="Ambassador or verifier contact" htmlFor="outcome-ambassador" hint="Optional — if you are already working with someone.">
        <FormInput id="outcome-ambassador" placeholder="e.g. Fatima O. or ambassador name" value={value.ambassadorContact} onChange={e => onChange({ ...value, ambassadorContact: e.target.value })} />
      </FormField>
    </div>
  </div>
);

const RStep3Documents = () => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 03 of 05</span>
      <h2>What documents do you have available?</h2>
      <p>Upload any supporting documents you have. These help verify your situation faster.</p>
    </header>
    <div className="cc-form">
      <div className="cc-form-split">
        <FormField label="Upload documents" hint="Demo only — uploads are not stored.">
          <UploadZone />
        </FormField>
        <aside className="cc-suggested-docs" aria-label="Suggested documents">
          <span className="form-field-label">Suggested documents</span>
          <ul>
            {RECEIVER_SUGGESTED_DOCS.map((d, i) => (
              <li key={i}><Icon name="doc" size={14} /> {d}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  </div>
);

const RStep4Funding = ({ value, onChange }) => (
  <div className="cc-step">
    <header className="cc-step-header">
      <span className="cc-step-eyebrow">Step 04 of 05</span>
      <h2>Funding target.</h2>
      <p>Set an initial funding target if you have one in mind. This is optional.</p>
    </header>
    <div className="cc-form">
      <FormField label="Funding amount (USD)" htmlFor="r-funding-amount">
        <FormInput id="r-funding-amount" type="number" placeholder="0" value={value.amount} onChange={e => onChange({ ...value, amount: e.target.value })} min="0" />
      </FormField>
      <p className="cc-optional-hint">Leave blank if unsure. An ambassador can help determine the right amount.</p>
    </div>
  </div>
);

const RStep5Confirm = ({ caseId, situation, outcome, funding }) => {
  const rows = [
    ["Situation", situation.description.slice(0, 220) + (situation.description.length > 220 ? "…" : "")],
    ["Urgency", URGENCY_LABELS[situation.urgency] || "—"],
    ["Desired outcome", outcome.desiredOutcome.slice(0, 220) + (outcome.desiredOutcome.length > 220 ? "…" : "")],
    ["Support pathway", VERTICAL_LABELS[outcome.pathway] || "—"]
  ];
  if (outcome.ambassadorContact) {
    rows.push(["Ambassador contact", outcome.ambassadorContact]);
  }
  rows.push(["Funding target", funding.amount ? `$${Number(funding.amount).toLocaleString()}` : "Not specified"]);
  return (
    <div className="cc-step cc-confirm">
      <header className="cc-step-header">
        <span className="cc-step-eyebrow">Step 05 of 05 · review</span>
        <h2>Your support request is ready for review.</h2>
        <p>A community ambassador will review your submission and match you with supporters. You will be notified as your case progresses.</p>
      </header>
      <article className="cc-dossier" aria-label="Case dossier summary">
        <header className="cc-dossier-head">
          <span className="cc-dossier-tag">Pending review</span>
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
          <span><Icon name="shield" size={14} /> Reviewed by community ambassador</span>
          <span><Icon name="clock" size={14} /> You will be notified of updates</span>
        </footer>
      </article>
    </div>
  );
};

export default function CaseCreation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = (() => {
    if (searchParams.get('mode') === 'receiver') return 'receiver';
    const user = getActiveUser();
    if (user?.side === 'beneficiary') return 'receiver';
    return 'supporter';
  })();

  const isReceiver = mode === 'receiver';
  const stepLabels = isReceiver ? RECEIVER_STEPS : SUPPORTER_STEPS;

  const [step, setStep] = useState(0);
  const [supportType, setSupportType] = useState(null);
  const [beneficiary, setBeneficiary] = useState({ name: "", location: "", category: "" });
  const [need, setNeed] = useState({ description: "" });
  const [funding, setFunding] = useState({ amount: "", frequency: "" });
  const [situation, setSituation] = useState({ description: "", urgency: "" });
  const [outcome, setOutcome] = useState({ desiredOutcome: "", pathway: "", ambassadorContact: "" });
  const [receiverFunding, setReceiverFunding] = useState({ amount: "" });
  const [caseId] = useState(generateCaseId);

  const supporterContent = [
    <Step1Support value={supportType} onSelect={setSupportType} />,
    <Step2Beneficiary value={beneficiary} onChange={setBeneficiary} />,
    <Step3Need value={need} onChange={setNeed} />,
    <Step4Funding value={funding} onChange={setFunding} />,
    <Step5Confirm caseId={caseId} supportType={supportType} beneficiary={beneficiary} need={need} funding={funding} />
  ];

  const receiverContent = [
    <RStep1Situation value={situation} onChange={setSituation} />,
    <RStep2Outcome value={outcome} onChange={setOutcome} />,
    <RStep3Documents />,
    <RStep4Funding value={receiverFunding} onChange={setReceiverFunding} />,
    <RStep5Confirm caseId={caseId} situation={situation} outcome={outcome} funding={receiverFunding} />
  ];

  const steps = isReceiver ? receiverContent : supporterContent;
  const isLast = step === steps.length - 1;

  const canAdvance = isReceiver
    ? (
      step === 0 ? !!(situation.description.trim().length >= 20 && situation.urgency) :
      step === 1 ? !!(outcome.desiredOutcome.trim().length > 0 && outcome.pathway) :
      step === 2 ? true :
      step === 3 ? true :
      true
    )
    : (
      step === 0 ? !!supportType :
      step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
      step === 2 ? need.description.trim().length >= 20 :
      step === 3 ? !!(Number(funding.amount) > 0 && funding.frequency) :
      true
    );

  const advanceLabel = isReceiver
    ? (
      isLast ? "Submit request" :
      step === 0 ? "Continue to outcome" :
      step === 1 ? "Continue to documents" :
      step === 2 ? "Continue to funding" :
      step === 3 ? "Continue to review" :
      "Continue"
    )
    : (
      isLast ? "Submit case" :
      step === 0 ? "Continue to beneficiary" :
      step === 1 ? "Continue to need" :
      step === 2 ? "Continue to funding" :
      step === 3 ? "Continue to review" :
      "Continue"
    );

  const advanceHint = (() => {
    if (canAdvance || isLast) return null;
    if (isReceiver) {
      if (step === 0) return "Describe your situation (min 20 characters) and select urgency.";
      if (step === 1) return "Desired outcome and support pathway required.";
      return null;
    }
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

  const dashboardHref = isReceiver ? '/beneficiary' : sideDashboardUrl(getEthosSide() || "supporter", 0);

  const submit = () => {
    const userId = getActiveUserId();
    if (isReceiver) {
      addDraftCase({
        id: caseId,
        name: getActiveUser()?.name || 'Receiver',
        desc: situation.description,
        vertical: VERTICAL_LABELS[outcome.pathway] || 'General',
        verticalKey: outcome.pathway || 'general',
        category: 'receiver',
        location: '',
        status: 'pending',
        ownerUserId: userId,
        supporterUserIds: [],
        raised: 0,
        target: Number(receiverFunding.amount) || 0,
        isDraft: true
      });
      showToast(`Case ${caseId} submitted for review`);
      setTimeout(() => { navigate('/beneficiary'); }, 1200);
    } else {
      addDraftCase({
        id: caseId,
        name: beneficiary.name,
        desc: need.description,
        vertical: SUPPORT_TYPE_LABELS[supportType],
        verticalKey: supportType,
        category: beneficiary.category,
        location: LOCATION_LABELS[beneficiary.location],
        status: 'pending',
        ownerUserId: null,
        supporterUserIds: userId ? [userId] : [],
        raised: 0,
        target: Number(funding.amount) || 0,
        isDraft: true
      });
      showToast(`Case ${caseId} submitted for verification`);
      setTimeout(() => { navigate(sideDashboardUrl(getEthosSide() || 'supporter', 0)); }, 1200);
    }
  };

  const headerTag = isReceiver ? "Support request" : "Registration ticket";
  const headerTitle = isReceiver ? "Register your situation for support." : "Open a verified support case.";
  const headerDesc = isReceiver
    ? "Five short stages — situation, outcome, documents, funding, then review. An ambassador will review your submission."
    : "Five short stages — support type, beneficiary, need, funding, then review. Every field becomes part of the case audit trail.";

  return (
    <>
      <Nav side="neutral" depth={0} />
      <DemoTag />
      <main className="case-creation">
        <div className="container">
          <header className="cc-header">
            <div className="cc-header-meta">
              <span className="cc-header-tag">{headerTag}</span>
              <span className="cc-header-id">{caseId}</span>
            </div>
            <h1>{headerTitle}</h1>
            <p>{headerDesc}</p>
          </header>

          <StepRail current={step} labels={stepLabels} onJump={setStep} />

          <section className="cc-panel" aria-live="polite">
            {steps[step]}
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
            <Link to={dashboardHref} className="btn-text">Cancel and return to dashboard</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
