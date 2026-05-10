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

const CaseCreationPage = () => {
  const [step, setStep] = useState(0);
  const [supportType, setSupportType] = useState(null);
  const [beneficiary, setBeneficiary] = useState({ name: "", location: "", category: "" });
  const [need, setNeed] = useState({ description: "" });
  const [funding, setFunding] = useState({ amount: "", frequency: "" });
  const [caseId] = useState(generateCaseId);

  const steps = [
    { label: "Support Type", content: <Step1Support value={supportType} onSelect={setSupportType} /> },
    { label: "Beneficiary", content: <Step2Beneficiary value={beneficiary} onChange={setBeneficiary} /> },
    { label: "Need", content: <Step3Need value={need} onChange={setNeed} /> },
    { label: "Funding", content: <Step4Funding value={funding} onChange={setFunding} /> },
    { label: "Confirm", content: <Step5Confirm caseId={caseId} supportType={supportType} beneficiary={beneficiary} need={need} funding={funding} /> }
  ];

  const canAdvance =
    step === 0 ? !!supportType :
    step === 1 ? !!(beneficiary.name && beneficiary.location && beneficiary.category) :
    step === 2 ? need.description.trim().length >= 20 :
    step === 3 ? !!(Number(funding.amount) > 0 && funding.frequency) :
    true;
  const handleSubmit = () => {
    showToast(`Case ${caseId} submitted for verification`);
    setTimeout(() => { window.location.href = "supporter-dashboard.html"; }, 1200);
  };

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
