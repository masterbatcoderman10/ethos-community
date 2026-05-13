import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Icon from '../components/Icon.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Footer from '../components/Footer.jsx';
import '../../beneficiary/my-cases.css';

const ALL_BENE_CASES = [
  {
    id: "K-2890",
    title: "Women's CPD Finance Returnship",
    category: "Women CPD",
    raised: 4200,
    target: 8000,
    status: "verified",
    supporters: 12,
    updated: "2 days ago"
  },
  {
    id: "K-3120",
    title: "Children's Education Support",
    category: "Education",
    raised: 900,
    target: 3600,
    status: "pending",
    supporters: 5,
    updated: "5 days ago"
  },
  {
    id: "K-2700",
    title: "Family Living Support Cairo Relocation",
    category: "Family Support",
    raised: 6000,
    target: 6000,
    status: "funded",
    supporters: 21,
    updated: "3 weeks ago"
  },
  {
    id: "K-2410",
    title: "Medical Follow-up Mother",
    category: "Healthcare",
    raised: 1800,
    target: 1800,
    status: "completed",
    supporters: 9,
    updated: "2 months ago"
  }
];

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "funded", label: "Funded" },
  { value: "completed", label: "Completed" }
];

const formatAmount = (amount) => `$${Number(amount).toLocaleString()}`;

export default function BeneficiaryMyCases() {
  const [filter, setFilter] = useState("all");
  const filteredCases = filter === "all"
    ? ALL_BENE_CASES
    : ALL_BENE_CASES.filter((c) => c.status === filter);

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
            <Link to="/create" className="btn btn-primary bene-new-case">
              <Icon name="plus" size={16} />
              New case
            </Link>
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
                      <span className="bene-case-id">{c.id}</span>
                      <span className="bene-case-category">{c.category}</span>
                    </div>
                    <h2>{c.title}</h2>
                    <div className="bene-case-progress">
                      <CaseProgressBar raised={c.raised} target={c.target} compact />
                      <span className="bene-case-amounts">
                        {formatAmount(c.raised)} raised of {formatAmount(c.target)}
                      </span>
                    </div>
                  </div>
                  <div className="bene-case-row-meta">
                    <StatusPill status={c.status} />
                    <span className="bene-case-row-supporters">{c.supporters} supporters</span>
                    <span className="bene-case-row-updated">Updated {c.updated}</span>
                  </div>
                  <Link
                    to={`/beneficiary/case/${c.id}`}
                    className="bene-case-row-link"
                    aria-label={`View case ${c.id}: ${c.title}`}
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
