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
      <Nav active="role" />
      <DemoTag />
      <main className="role-chooser">
        <div className="container">
          <Reveal as="header" className="role-chooser-header">
            <span className="eyebrow">Step 1 of registration</span>
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
