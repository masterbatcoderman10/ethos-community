import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import StatusDot from '../components/StatusDot.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import Footer from '../components/Footer.jsx';
import { showToast } from '../components/Toast.jsx';
import { getActiveUser, getDocumentsForReceiver } from '../data/mockQueries.js';
import { clearActiveUser } from '../data/mockSession.js';
import '../../beneficiary/documents.css';

const STATUS_MAP = { verified: 'complete', pending: 'pending' };

const STATUS_LABELS = {
  complete: "Complete",
  in_progress: "In progress",
  pending: "Pending"
};

const getDisplayStatus = (status) => STATUS_MAP[status] || status;

const getDoneCount = (docs) => docs.filter((doc) => getDisplayStatus(doc.status) === 'complete').length;

const summary = (docs) => {
  const done = getDoneCount(docs);
  return `${done} of ${docs.length} verified`;
};

function FallbackState() {
  return (
    <div className="bene-empty-state">
      <h2>No active receiver profile</h2>
      <p>Choose a beneficiary profile to view your documents.</p>
      <Link to="/role" className="btn btn-primary">Choose profile</Link>
    </div>
  );
}

export default function BeneficiaryDocuments() {
  const navigate = useNavigate();
  const user = getActiveUser();

  if (!user) {
    return (
      <>
        <Nav active="documents" side="beneficiary" depth={1} />
        <DemoTag />
        <main className="bene-documents">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <FallbackState />
          </div>
        </main>
        <Footer depth={1} />
      </>
    );
  }

  const docs = getDocumentsForReceiver(user.id);
  const doneCount = getDoneCount(docs);
  const totalCount = docs.length;

  const switchProfile = () => {
    clearActiveUser();
    navigate('/role');
  };

  return (
    <>
      <Nav active="documents" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-documents">
        <div className="container">
          <header className="bene-documents-header">
            <div className="bene-documents-copy">
              <span className="section-eyebrow">Verification documents</span>
              <h1>Keep your verification current</h1>
              <p>Documents power supporter trust, verifier confidence, and the disbursement steps that follow each approved case.</p>
            </div>
            <div className="bene-documents-summary" aria-label={summary(docs)}>
              <span className="bene-documents-summary-num">{summary(docs)}</span>
              <CaseProgressBar raised={doneCount} target={totalCount} compact />
            </div>
          </header>

          {docs.length === 0 ? (
            <div className="bene-empty" style={{ textAlign: 'center', padding: '40px' }}>
              <Icon name="doc" size={28} />
              <h2>No documents yet</h2>
              <p>Documents will appear here once uploaded to your cases.</p>
              <Link to="/beneficiary/cases" className="btn btn-primary">View cases</Link>
            </div>
          ) : (
            <ul className="bene-doc-grid" aria-label="Verification document status">
              {docs.map((doc) => {
                const displayStatus = getDisplayStatus(doc.status);
                return (
                  <li key={doc.id} className={`bene-doc-card bene-doc-card-${displayStatus}`}>
                    <div className="bene-doc-card-head">
                      <StatusDot status={displayStatus} size={22} />
                      <div className="bene-doc-card-title">
                        <span className="bene-doc-status">{STATUS_LABELS[displayStatus] || displayStatus}</span>
                        <h2>{doc.name}</h2>
                        <p>Case: {doc.caseName || doc.caseId}</p>
                      </div>
                    </div>

                    <div className="bene-doc-card-foot">
                      <span className="bene-doc-card-updated">{doc.date || ''}</span>
                      <button
                        type="button"
                        className="btn btn-soft sm"
                        onClick={() => showToast(`${displayStatus === 'complete' ? 'Replace' : 'Upload'} requested: ${doc.name}`)}
                      >
                        {displayStatus === 'complete' ? 'Replace' : 'Upload'}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="bene-documents-cta" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => showToast("Submitted for re-verification (demo only)")}>
              Submit for re-verification <Icon name="arrow" size={14} />
            </button>
            <button type="button" className="btn btn-soft sm" onClick={switchProfile}>Switch profile</button>
          </div>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
}
