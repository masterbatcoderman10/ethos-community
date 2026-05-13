import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import StatusPill from '../components/StatusPill.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import Avatar from '../components/Avatar.jsx';
import StatusDot from '../components/StatusDot.jsx';
import MessageBubble from '../components/MessageBubble.jsx';
import Footer from '../components/Footer.jsx';
import { showToast } from '../components/Toast.jsx';
import '../styles/beneficiary/case-detail.css';

const CASE = {
  id: "K-2890",
  category: "Women CPD",
  title: "Women's CPD - Finance Returnship",
  status: "verified",
  created: "2026-04-18",
  raised: 4200,
  target: 8000,
  supporters: 6,
  lastActivity: "Updated 2026-05-08",
  narrative: [
    "This case funds a finance returnship for a Sudanese professional rebuilding her career pathway after displacement. The request covers CPD tuition, assessment fees, interview coaching, and a monitored placement bridge into a GCC finance team.",
    "The applicant has prior credit-analysis experience and a current conditional returnship track. What is missing is the verified training budget that allows her to complete the CPD sequence without pausing paid caregiving responsibilities."
  ],
  verification: "Fatima O., ambassador verifier, reviewed the applicant's identity file, prior finance credentials, training invoice, and returnship letter on 2026-04-22. Her note confirms the pathway is realistic, costed, and aligned to the Women CPD vertical."
};

const SUPPORTERS = [
  { initials: "FO", name: "Fatima O.", location: "Doha, QA", amount: 950, note: "Ambassador pledge" },
  { initials: "RM", name: "Rania M.", location: "Dubai, AE", amount: 800, note: "Professional circle" },
  { initials: "YA", name: "Yousra A.", location: "Riyadh, SA", amount: 700, note: "Monthly pool" },
  { initials: "HK", name: "Hiba K.", location: "London, UK", amount: 650, note: "CPD sponsor" },
  { initials: "NO", name: "Noura O.", location: "Manama, BH", amount: 600, note: "Returnship grant" },
  { initials: "LA", name: "Lina A.", location: "Jeddah, SA", amount: 500, note: "Diaspora circle" }
];

const DOCUMENTS = [
  { title: "Identity and residency bundle", status: "complete", meta: "Passport, Qatar residency, contact attestation", action: "Replace" },
  { title: "Finance credential record", status: "complete", meta: "Diploma, employment letter, reference check", action: "Replace" },
  { title: "CPD provider invoice", status: "in_progress", meta: "Awaiting final stamped invoice from provider", action: "Upload" },
  { title: "Returnship placement letter", status: "complete", meta: "Conditional acceptance, start-window verified", action: "Replace" },
  { title: "Monthly progress evidence", status: "pending", meta: "First learning log due after module one", action: "Upload" }
];

const UPDATES = [
  { sender: "system", body: "Case K-2890 moved to verified status after ambassador review." },
  { sender: "ambassador", name: "Fatima O.", timestamp: "2026-04-22", body: "I verified the CPD cost sheet and returnship letter. The applicant has a credible pathway back into finance work if this training budget clears." },
  { sender: "me", name: "Recipient", timestamp: "2026-04-29", body: "Uploaded the provider invoice draft and confirmed the May training cohort seat remains reserved." },
  { sender: "ambassador", name: "Fatima O.", timestamp: "2026-05-08", body: "Supporter questions answered. Remaining evidence is the final provider stamp and the first module attendance note." }
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "funding", label: "Funding" },
  { id: "documents", label: "Documents" },
  { id: "updates", label: "Updates" }
];

const money = (value) => `$${Number(value).toLocaleString()}`;

function DetailRow({ label, value }) {
  return (
    <div className="cd-detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TabButton({ tab, active, onClick }) {
  return (
    <button
      type="button"
      className={`cd-tab ${active ? "active" : ""}`}
      onClick={onClick}
      aria-selected={active}
      role="tab"
    >
      {tab.label}
    </button>
  );
}

function OverviewPanel() {
  return (
    <div className="cd-panel cd-overview-panel" role="tabpanel">
      <div>
        <p className="cd-lede">{CASE.narrative[0]}</p>
        <p>{CASE.narrative[1]}</p>
      </div>
      <div className="cd-verification-note">
        <div className="cd-note-icon"><Icon name="shield" size={20} /></div>
        <div>
          <span className="cd-kicker">Ambassador verification</span>
          <p>{CASE.verification}</p>
        </div>
      </div>
    </div>
  );
}

function FundingPanel() {
  return (
    <div className="cd-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Supporter ledger</span>
          <h2>Committed funding</h2>
        </div>
        <span className="cd-mini-stat">{CASE.supporters} supporters</span>
      </div>
      <div className="cd-supporter-list">
        {SUPPORTERS.map((supporter) => (
          <div className="cd-supporter-row" key={supporter.name}>
            <Avatar initials={supporter.initials} green />
            <div>
              <strong>{supporter.name}</strong>
              <span>{supporter.location} / {supporter.note}</span>
            </div>
            <b>{money(supporter.amount)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsPanel() {
  return (
    <div className="cd-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Evidence vault</span>
          <h2>Recipient documents</h2>
        </div>
        <span className="cd-mini-stat">5 files</span>
      </div>
      <div className="cd-doc-list">
        {DOCUMENTS.map((doc) => (
          <div className="cd-doc-row" key={doc.title}>
            <StatusDot status={doc.status} size={24} />
            <div>
              <strong>{doc.title}</strong>
              <span>{doc.meta}</span>
            </div>
            <button type="button" className="cd-action cd-action-small" onClick={() => showToast(`${doc.action} ${doc.title} - demo only`)}>
              {doc.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpdatesPanel() {
  return (
    <div className="cd-panel cd-updates-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Case messages</span>
          <h2>Latest updates</h2>
        </div>
      </div>
      <div className="cd-message-list">
        {UPDATES.map((update, index) => (
          <MessageBubble key={index} sender={update.sender} name={update.name} timestamp={update.timestamp}>
            {update.body}
          </MessageBubble>
        ))}
      </div>
    </div>
  );
}

function ActivePanel({ tab }) {
  if (tab === "funding") return <FundingPanel />;
  if (tab === "documents") return <DocumentsPanel />;
  if (tab === "updates") return <UpdatesPanel />;
  return <OverviewPanel />;
}

export default function BeneficiaryCaseDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Nav side="beneficiary" depth={1} />

      <main className="cd-page">
        <div className="container">
          <Link to="/beneficiary/cases" className="cd-back-link">
            <Icon name="arrow-left" size={15} />
            Back to my cases
          </Link>

          <section className="cd-hero" aria-labelledby="case-title">
            <div className="cd-hero-main">
              <div className="cd-case-meta">
                <span>{CASE.id}</span>
                <span>{CASE.category}</span>
              </div>
              <div className="cd-title-row">
                <h1 id="case-title">{CASE.title}</h1>
                <StatusPill status={CASE.status} />
              </div>
              <p className="cd-summary">
                Recipient view of the verified case record, funding position, evidence checklist, and ambassador notes for this returnship pathway.
              </p>
              <div className="cd-actions">
                <button type="button" className="cd-action cd-action-primary" onClick={() => showToast("Edit case - demo only")}>
                  Edit case
                </button>
                <button type="button" className="cd-action" onClick={() => showToast("Share case - demo only")}>
                  Share case
                </button>
              </div>
            </div>

            <aside className="cd-funding-band" aria-label="Funding summary">
              <div className="cd-funding-top">
                <span className="cd-kicker">Funding band</span>
                <strong>{money(CASE.raised)} / {money(CASE.target)}</strong>
              </div>
              <CaseProgressBar raised={CASE.raised} target={CASE.target} />
              <div className="cd-funding-foot">
                <span>{CASE.supporters} supporters</span>
                <span>Created {CASE.created}</span>
                <span>{CASE.lastActivity}</span>
              </div>
            </aside>
          </section>

          <section className="cd-layout">
            <aside className="cd-sidebar" aria-label="Case facts">
              <DetailRow label="Case number" value={CASE.id} />
              <DetailRow label="Category" value={CASE.category} />
              <DetailRow label="Status" value="Verified" />
              <DetailRow label="Target" value={money(CASE.target)} />
              <DetailRow label="Raised" value={money(CASE.raised)} />
            </aside>

            <div className="cd-content">
              <div className="cd-tabs" role="tablist" aria-label="Case detail sections">
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
              <ActivePanel tab={activeTab} />
            </div>
          </section>
        </div>
      </main>

      <Footer depth={1} />
      <DemoTag />
    </>
  );
}
