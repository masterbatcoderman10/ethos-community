import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Footer from '../components/Footer.jsx';
import { getActiveUser, getCasesForReceiver } from '../data/mockQueries.js';
import { clearActiveUser } from '../data/mockSession.js';
import '../../beneficiary/my-cases.css';

const FILTERS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "funded", label: "Funded" },
  { value: "completed", label: "Completed" }
];

const formatAmount = (amount) => `$${Number(amount).toLocaleString()}`;

function FallbackState() {
  return (
    <div className="bene-empty-state">
      <h2>No active receiver profile</h2>
      <p>Choose a beneficiary profile to view your cases.</p>
      <Link to="/role" className="btn btn-primary">Choose profile</Link>
    </div>
  );
}

export default function BeneficiaryMyCases() {
  const navigate = useNavigate();
  const user = getActiveUser();
  const [filter, setFilter] = useState("all");

  if (!user) {
    return (
      <>
        <Nav active="my-cases" side="beneficiary" depth={1} />
        <DemoTag />
        <main className="bene-my-cases">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <FallbackState />
          </div>
        </main>
        <Footer depth={1} />
      </>
    );
  }

  const allCases = getCasesForReceiver(user.id);

  const filteredCases = filter === "all"
    ? allCases
    : filter === "draft"
      ? allCases.filter(c => c.isDraft)
      : allCases.filter(c => c.status === filter && !c.isDraft);

  const switchProfile = () => {
    clearActiveUser();
    navigate('/role');
  };

  return (
    <>
      <Nav active="my-cases" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-my-cases">
        <div className="container">
          <header className="bene-my-cases-header">
            <div>
              <span className="bene-section-eyebrow">My cases</span>
              <h1>All your support cases</h1>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Link to="/create" className="btn btn-primary bene-new-case">
                <Icon name="plus" size={16} />
                New case
              </Link>
              <button type="button" className="btn btn-soft sm" onClick={switchProfile}>Switch profile</button>
            </div>
          </header>

          <div className="bene-filter-row" role="group" aria-label="Filter support cases by status">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`bene-filter-chip ${filter === f.value ? "active" : ""}`}
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <section className="bene-case-list" aria-label="Support cases">
            {filteredCases.length === 0 ? (
              <div className="bene-empty" role="status" aria-live="polite">
                <Icon name="doc" size={28} />
                <h2>No cases match this filter</h2>
                <p>Clear the filter to return to your full case list.</p>
                <button type="button" className="btn-text" onClick={() => setFilter("all")}>
                  Clear filter
                </button>
              </div>
            ) : (
              filteredCases.map((c) => (
                <article key={c.id} className="bene-case-row">
                  <div className="bene-case-row-main">
                    <div className="bene-case-row-head">
                      <span className="bene-case-id">
                        {c.id}
                        {c.isDraft && <StatusPill status="draft" />}
                      </span>
                      <span className="bene-case-category">{c.vertical || c.category}</span>
                    </div>
                    <h2>{c.name || c.desc}</h2>
                    <div className="bene-case-progress">
                      <CaseProgressBar raised={c.raised || 0} target={c.target || 0} compact />
                      <span className="bene-case-amounts">
                        {formatAmount(c.raised || 0)} raised of {formatAmount(c.target || 0)}
                      </span>
                    </div>
                  </div>
                  <div className="bene-case-row-meta">
                    <StatusPill status={c.status} />
                    <span className="bene-case-row-supporters">{(c.supporterUserIds || []).length} supporters</span>
                    <span className="bene-case-row-updated">Since {c.since || 'recently'}</span>
                  </div>
                  <Link
                    to={`/beneficiary/case/${c.id}`}
                    className="bene-case-row-link"
                    aria-label={`View case ${c.id}: ${c.name || c.desc}`}
                  >
                    <Icon name="arrow" size={16} />
                  </Link>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
      <Footer depth={1} />
    </>
  );
}
