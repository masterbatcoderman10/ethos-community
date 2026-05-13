import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import StatusDot from '../components/StatusDot.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import Footer from '../components/Footer.jsx';
import { showToast } from '../components/Toast.jsx';
import '../beneficiary/documents.css';

const DOCS = [
  {
    id: "id",
    name: "Government-issued ID",
    desc: "National ID, passport, or driver's licence.",
    status: "complete",
    note: null,
    updated: "Verified on 2026-04-19"
  },
  {
    id: "career",
    name: "Proof of finance career",
    desc: "CV and last employer letter for Case K-2890.",
    status: "complete",
    note: null,
    updated: "Verified on 2026-04-19"
  },
  {
    id: "enrolment",
    name: "AAOIFI CPD enrolment",
    desc: "Confirmation of programme enrolment.",
    status: "complete",
    note: null,
    updated: "Verified on 2026-04-21"
  },
  {
    id: "sponsor",
    name: "Sponsor letter of intent",
    desc: "Signed letter from the sponsoring employer.",
    status: "in_progress",
    note: "Ambassador requested a signed copy by Friday.",
    updated: "Awaiting upload"
  },
  {
    id: "bank",
    name: "Bank/wallet details",
    desc: "For first disbursement after verification.",
    status: "pending",
    note: null,
    updated: "Required after sponsor letter"
  }
];

const STATUS_LABELS = {
  complete: "Complete",
  in_progress: "In progress",
  pending: "Pending"
};

const getDoneCount = (docs) => docs.filter((doc) => doc.status === "complete").length;

const summary = (docs) => {
  const done = getDoneCount(docs);
  return `${done} of ${docs.length} verified`;
};

export default function BeneficiaryDocuments() {
  const doneCount = getDoneCount(DOCS);
  const totalCount = DOCS.length;

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
            <div className="bene-documents-summary" aria-label={summary(DOCS)}>
              <span className="bene-documents-summary-num">{summary(DOCS)}</span>
              <CaseProgressBar raised={doneCount} target={totalCount} compact />
            </div>
          </header>

          <ul className="bene-doc-grid" aria-label="Verification document status">
            {DOCS.map((doc) => (
              <li key={doc.id} className={`bene-doc-card bene-doc-card-${doc.status}`}>
                <div className="bene-doc-card-head">
                  <StatusDot status={doc.status} size={22} />
                  <div className="bene-doc-card-title">
                    <span className="bene-doc-status">{STATUS_LABELS[doc.status]}</span>
                    <h2>{doc.name}</h2>
                    <p>{doc.desc}</p>
                  </div>
                </div>

                {doc.note && (
                  <div className="bene-doc-card-note">
                    <Icon name="bell" size={14} />
                    <span>{doc.note}</span>
                  </div>
                )}

                <div className="bene-doc-card-foot">
                  <span className="bene-doc-card-updated">{doc.updated}</span>
                  <button
                    type="button"
                    className="btn btn-soft sm"
                    onClick={() => showToast(`${doc.status === "complete" ? "Replace" : "Upload"} requested: ${doc.name}`)}
                  >
                    {doc.status === "complete" ? "Replace" : "Upload"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="bene-documents-cta">
            <button type="button" className="btn btn-primary" onClick={() => showToast("Submitted for re-verification (demo only)")}>
              Submit for re-verification <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
}
