import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import { getActiveUser, getCasesForReceiver } from '../data/mockQueries.js';
import { getUserById } from '../data/mockDb.js';
import { clearActiveUser } from '../data/mockSession.js';
import '../../beneficiary/case-detail.css';

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "funding", label: "Funding" },
  { id: "documents", label: "Documents" },
  { id: "updates", label: "Updates" }
];

const money = (value) => `$${Number(value).toLocaleString()}`;

const docStatusMap = { verified: 'complete', pending: 'pending' };

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

function OverviewPanel({ caseData }) {
  return (
    <div className="cd-panel cd-overview-panel" role="tabpanel">
      <div>
        <p className="cd-lede">{caseData.desc}</p>
        {(caseData.milestones || []).length > 0 && (
          <p>Progress through {caseData.milestones.filter(m => m.status === 'complete').length} of {caseData.milestones.length} milestones.</p>
        )}
      </div>
      <div className="cd-verification-note">
        <div className="cd-note-icon"><Icon name="shield" size={20} /></div>
        <div>
          <span className="cd-kicker">Case status</span>
          <p>This case is currently <strong>{caseData.status}</strong>{caseData.location && <> · {caseData.location}</>}.</p>
        </div>
      </div>
    </div>
  );
}

function FundingPanel({ caseData }) {
  const supporters = (caseData.supporterUserIds || []).map(id => getUserById(id)).filter(Boolean);
  const perSupporter = caseData.target && supporters.length
    ? Math.round(caseData.raised / supporters.length)
    : 0;

  return (
    <div className="cd-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Supporter ledger</span>
          <h2>Committed funding</h2>
        </div>
        <span className="cd-mini-stat">{supporters.length} supporters</span>
      </div>
      {supporters.length === 0 ? (
        <p>No supporters yet.</p>
      ) : (
        <div className="cd-supporter-list">
          {supporters.map((supporter) => (
            <div className="cd-supporter-row" key={supporter.id}>
              <Avatar initials={supporter.initials} green />
              <div>
                <strong>{supporter.name}</strong>
                <span>{supporter.title}</span>
              </div>
              <b>{money(perSupporter)}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DocumentsPanel({ caseData }) {
  const documents = caseData.documents || [];

  return (
    <div className="cd-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Evidence vault</span>
          <h2>Case documents</h2>
        </div>
        <span className="cd-mini-stat">{documents.length} files</span>
      </div>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <div className="cd-doc-list">
          {documents.map((doc) => {
            const displayStatus = docStatusMap[doc.status] || doc.status;
            return (
              <div className="cd-doc-row" key={doc.id}>
                <StatusDot status={displayStatus} size={24} />
                <div>
                  <strong>{doc.name}</strong>
                  <span>{doc.date || ''}</span>
                </div>
                <button type="button" className="cd-action cd-action-small" onClick={() => showToast(`${displayStatus === 'complete' ? 'Replace' : 'Upload'} ${doc.name} - demo only`)}>
                  {displayStatus === 'complete' ? 'Replace' : 'Upload'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UpdatesPanel({ caseData, activeUser }) {
  const messages = caseData.messages || [];

  return (
    <div className="cd-panel cd-updates-panel" role="tabpanel">
      <div className="cd-section-head">
        <div>
          <span className="cd-kicker">Case messages</span>
          <h2>Latest updates</h2>
        </div>
      </div>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="cd-message-list">
          {messages.map((msg) => {
            const isMe = msg.from === activeUser.id;
            const senderUser = getUserById(msg.from);
            return (
              <MessageBubble
                key={msg.id}
                sender={isMe ? 'me' : 'ambassador'}
                name={isMe ? 'Me' : (senderUser?.name || msg.from)}
                timestamp={msg.date}
              >
                {msg.text}
              </MessageBubble>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ActivePanel({ tab, caseData, activeUser }) {
  if (tab === "funding") return <FundingPanel caseData={caseData} />;
  if (tab === "documents") return <DocumentsPanel caseData={caseData} />;
  if (tab === "updates") return <UpdatesPanel caseData={caseData} activeUser={activeUser} />;
  return <OverviewPanel caseData={caseData} />;
}

export default function BeneficiaryCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const user = getActiveUser();

  if (!user) {
    return (
      <>
        <Nav side="beneficiary" depth={1} />
        <DemoTag />
        <div className="cd-page">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <div className="bene-empty-state">
              <h2>No active receiver profile</h2>
              <p>Choose a beneficiary profile to view case details.</p>
              <Link to="/role" className="btn btn-primary">Choose profile</Link>
            </div>
          </div>
        </div>
        <Footer depth={1} />
      </>
    );
  }

  const cases = getCasesForReceiver(user.id);
  const caseData = cases.find(c => c.id === id);

  if (!caseData) {
    return (
      <>
        <Nav side="beneficiary" depth={1} />
        <DemoTag />
        <div className="cd-page">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <h1>Case not found</h1>
            <p>The case "{id}" does not exist or is not associated with your profile.</p>
            <Link to="/beneficiary/cases" className="btn btn-primary">Back to my cases</Link>
          </div>
        </div>
        <Footer depth={1} />
      </>
    );
  }

  const switchProfile = () => {
    clearActiveUser();
    navigate('/role');
  };

  return (
    <>
      <Nav side="beneficiary" depth={1} />

      <main className="cd-page">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/beneficiary/cases" className="cd-back-link">
              <Icon name="arrow-left" size={15} />
              Back to my cases
            </Link>
            <button type="button" className="btn btn-soft sm" onClick={switchProfile}>Switch profile</button>
          </div>

          <section className="cd-hero" aria-labelledby="case-title">
            <div className="cd-hero-main">
              <div className="cd-case-meta">
                <span>{caseData.id}</span>
                <span>{caseData.vertical || caseData.category}</span>
                {caseData.isDraft && <StatusPill status="draft" />}
              </div>
              <div className="cd-title-row">
                <h1 id="case-title">{caseData.name || caseData.desc}</h1>
                <StatusPill status={caseData.status} />
              </div>
              <p className="cd-summary">
                {caseData.isDraft
                  ? 'This draft case is pending review. An ambassador will verify your submission.'
                  : `Case record for ${caseData.name || 'this recipient'}, with funding status, evidence checklist, and update history.`
                }
              </p>
              <div className="cd-actions">
                {!caseData.isDraft && (
                  <>
                    <button type="button" className="cd-action cd-action-primary" onClick={() => showToast("Edit case - demo only")}>
                      Edit case
                    </button>
                    <button type="button" className="cd-action" onClick={() => showToast("Share case - demo only")}>
                      Share case
                    </button>
                  </>
                )}
                {caseData.isDraft && (
                  <button type="button" className="cd-action cd-action-primary" onClick={() => showToast("Edit draft - demo only")}>
                    Edit draft
                  </button>
                )}
              </div>
            </div>

            <aside className="cd-funding-band" aria-label="Funding summary">
              <div className="cd-funding-top">
                <span className="cd-kicker">Funding band</span>
                <strong>{money(caseData.raised || 0)} / {money(caseData.target || 0)}</strong>
              </div>
              <CaseProgressBar raised={caseData.raised || 0} target={caseData.target || 0} />
              <div className="cd-funding-foot">
                <span>{(caseData.supporterUserIds || []).length} supporters</span>
                <span>Since {caseData.since || 'recently'}</span>
              </div>
            </aside>
          </section>

          <section className="cd-layout">
            <aside className="cd-sidebar" aria-label="Case facts">
              <DetailRow label="Case number" value={caseData.id} />
              <DetailRow label="Category" value={caseData.vertical || caseData.category} />
              <DetailRow label="Status" value={caseData.isDraft ? 'Draft' : caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)} />
              <DetailRow label="Target" value={money(caseData.target || 0)} />
              <DetailRow label="Raised" value={money(caseData.raised || 0)} />
              {caseData.location && <DetailRow label="Location" value={caseData.location} />}
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
              <ActivePanel tab={activeTab} caseData={caseData} activeUser={user} />
            </div>
          </section>
        </div>
      </main>

      <Footer depth={1} />
      <DemoTag />
    </>
  );
}
