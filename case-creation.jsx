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
