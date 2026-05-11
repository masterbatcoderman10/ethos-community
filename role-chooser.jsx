const ROLES = [
  { id: "supporter", title: "Diaspora Supporter", lede: "Direct, traceable support to your family and community.", detail: "Pledge to verified beneficiaries across six service verticals. Receive milestone updates, audited disbursement records, and impact statements you can share with family or employer." },
  { id: "beneficiary", title: "Beneficiary", lede: "Register yourself or a family member for verified access.", detail: "Submit a profile, link partner-issued documents, and receive support from diaspora pledgers through Ethos-managed disbursement. Verification is led by a community ambassador in your locality." },
  { id: "mentor", title: "Mentor / Service Provider", lede: "Offer professional skills, mentorship, or services.", detail: "Match with students, women in transition, or SME operators. Log sessions, milestones, and outcomes through the partner portal. Suitable for individual practitioners and consultancies." },
  { id: "sme", title: "SME / Business Owner", lede: "Recovery support, finance-readiness, and advisory.", detail: "Diagnostic intake, restart capital pathways, licensing assistance, and access to advisor cohorts. For Sudanese-owned businesses operating in Sudan or relocated regionally." },
  { id: "ambassador", title: "Community Ambassador", lede: "Verify needs, onboard users, and build local trust.", detail: "Trained volunteer or partner staff who confirm beneficiary identity, document local need, and act as the first point of contact. Includes a stipend or honorarium where applicable." },
  { id: "finance", title: "Finance / Takaful Partner", lede: "Regulated financial and risk-protection pathways.", detail: "Banks, payment institutions, Takaful operators, and Islamic-finance providers. Plug regulated rails into Ethos disbursement, education savings, and family-protection products." },
  { id: "development", title: "Development Partner", lede: "NGOs, foundations, and public-sector stakeholders.", detail: "Co-fund verticals, share programme infrastructure, and consume the audit feed for monitoring and evaluation. Includes IsDB, bilateral donors, and humanitarian agencies." }
];

const RoleRow = ({ index, role, isSelected, onSelect }) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li className={`role-row ${isSelected ? "is-selected" : ""}`}>
      <button type="button" className="role-row-trigger" onClick={onSelect} aria-pressed={isSelected}>
        <span className="role-row-num">{num}</span>
        <span className="role-row-body">
          <span className="role-row-title">{role.title}</span>
          <span className="role-row-lede">{role.lede}</span>
        </span>
        <span className="role-row-meta">
          {isSelected ? <span className="role-row-pill">Selected</span> : <Icon name="arrow" size={18} />}
        </span>
      </button>
      {isSelected && (
        <div className="role-row-detail">
          <p>{role.detail}</p>
        </div>
      )}
    </li>
  );
};

const RoleChooserPage = () => {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const stored = getEthosRole();
    if (stored && ROLES.some(r => r.id === stored)) setSelected(stored);
  }, []);

  const handleSelect = (id, title) => {
    setSelected(prev => (prev === id ? null : id));
    if (selected !== id) showToast(`Role selected: ${title}`);
  };
  const handleContinue = () => {
    if (!selected) return;
    setEthosRole(selected);
    const side = roleToSide(selected);
    const target = side === "beneficiary" ? "beneficiary/dashboard.html" : "supporter/dashboard.html";
    const title = ROLES.find(r => r.id === selected)?.title || "selected role";
    showToast(`Continuing as ${title}...`);
    setTimeout(() => { window.location.href = target; }, 600);
  };
  const selectedRole = ROLES.find(r => r.id === selected);
  return (
    <>
      <Nav side="neutral" depth={0} active="role" />
      <DemoTag />
      <main className="role-chooser">
        <div className="container">
          <div className="role-chooser-grid">
            <Reveal as="header" className="role-chooser-hero">
              <span className="eyebrow">Registration · Step 01</span>
              <h1>Choose how you'll show up.</h1>
              <p className="role-chooser-lede">Ethos Community serves seven kinds of people. Pick the role that fits your starting point. Switching is easy from your account settings.</p>
              <dl className="role-chooser-meta">
                <div><dt>Roster</dt><dd>{String(ROLES.length).padStart(2, "0")} roles</dd></div>
                <div><dt>Avg. setup time</dt><dd>~ 3 min</dd></div>
                <div><dt>Verification</dt><dd>Partner-led</dd></div>
              </dl>
            </Reveal>
            <section className="role-chooser-list-wrap" aria-label="Available roles">
              <ol className="role-list">
                {ROLES.map((r, i) => (
                  <RoleRow key={r.id} index={i} role={r} isSelected={selected === r.id} onSelect={() => handleSelect(r.id, r.title)} />
                ))}
              </ol>
            </section>
          </div>
          <footer className="role-chooser-footer">
            <a href="landing.html" className="btn-text">Skip — continue as guest <span className="material-symbols-rounded arrow">arrow_forward</span></a>
            <div className="role-chooser-footer-action">
              <span className="role-chooser-status" aria-live="polite">
                {selectedRole ? <><span className="role-chooser-status-dot" aria-hidden="true" /> {selectedRole.title}</> : "No role selected"}
              </span>
              <button type="button" className="btn btn-primary" onClick={handleContinue} disabled={!selected}>
                Continue <span className="material-symbols-rounded" style={{fontSize:18}}>arrow_forward</span>
              </button>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<RoleChooserPage />);
