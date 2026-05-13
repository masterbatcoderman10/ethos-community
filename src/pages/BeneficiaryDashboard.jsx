import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Reveal from '../components/Reveal.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Counter from '../components/Counter.jsx';
import CaseProgressBar from '../components/CaseProgressBar.jsx';
import Avatar from '../components/Avatar.jsx';
import StatusDot from '../components/StatusDot.jsx';
import Icon from '../components/Icon.jsx';
import Footer from '../components/Footer.jsx';
import '../../beneficiary/dashboard.css';

const CASES = [
  {
    id: "K-2890",
    title: "Women's CPD Finance Returnship",
    category: "Women & Workforce",
    raised: 5100,
    target: 8000,
    status: "verified",
    supporters: ["RS", "KM", "AA", "YO", "BN"],
    updated: "Updated 2 hours ago"
  },
  {
    id: "K-3120",
    title: "Children's Education Support",
    category: "Education",
    raised: 2400,
    target: 3600,
    status: "pending",
    supporters: ["MA", "HO", "LT"],
    updated: "Updated 5 days ago"
  }
];

const NEXT_STEPS = [
  { label: "Upload finance returnship acceptance letter", status: "done" },
  { label: "Reply to ambassador question on K-3120", status: "active" },
  { label: "Share K-2890 case link with extended family", status: "idle" },
  { label: "Confirm bank details for first disbursement", status: "idle" }
];

const ACTIVITY = [
  { icon: "heart", who: "Rasha S.", text: "pledged $400 to K-2890", when: "2h ago" },
  { icon: "shield", who: "Fatima O.", text: "verified your government ID", when: "Yesterday" },
  { icon: "heart", who: "Khalid M.", text: "pledged $250 to K-2890", when: "Yesterday" },
  { icon: "doc", who: "System", text: "opened K-3120 for review", when: "5 days ago" },
  { icon: "mail", who: "Fatima O.", text: "requested an education invoice", when: "1 week ago" }
];

const totals = CASES.reduce((acc, c) => {
  acc.raised += c.raised;
  acc.target += c.target;
  acc.supporters += c.supporters.length;
  return acc;
}, { raised: 0, target: 0, supporters: 0 });

export default function BeneficiaryDashboard() {
  return (
    <>
      <Nav active="dashboard" side="beneficiary" depth={1} />
      <DemoTag />
      <main className="bene-dashboard">
        <section className="bene-hero">
          <div className="container">
            <Reveal as="div" className="bene-hero-inner">
              <div className="bene-hero-copy">
                <span className="bene-eyebrow">Beneficiary dashboard</span>
                <h1>Welcome back, Halima</h1>
                <p>Track your cases, verification steps, supporter activity, and ambassador guidance from one calm workspace.</p>
              </div>
              <StatusPill status="verified" />
            </Reveal>
          </div>
        </section>

        <section className="container bene-dashboard-main" aria-label="Beneficiary dashboard overview">
          <div className="bene-stats" aria-label="Case summary">
            <article className="bene-stat">
              <span className="bene-stat-label">Active cases</span>
              <strong className="bene-stat-value"><Counter to={CASES.length} /></strong>
              <span className="bene-stat-note">Across workforce and education</span>
            </article>
            <article className="bene-stat">
              <span className="bene-stat-label">Funds raised</span>
              <strong className="bene-stat-value"><Counter to={totals.raised} prefix="$" /></strong>
              <span className="bene-stat-note">Of ${totals.target.toLocaleString()} target</span>
            </article>
            <article className="bene-stat">
              <span className="bene-stat-label">Supporters</span>
              <strong className="bene-stat-value"><Counter to={totals.supporters} /></strong>
              <span className="bene-stat-note">Verified diaspora contributors</span>
            </article>
          </div>

          <div className="bene-layout">
            <section className="bene-cases" aria-labelledby="bene-cases-title">
              <div className="bene-section-head">
                <div>
                  <span className="bene-section-kicker">Case portfolio</span>
                  <h2 id="bene-cases-title">Your cases</h2>
                </div>
                <Link to="/beneficiary/cases" className="bene-text-link" aria-label="View all my cases">
                  My Cases <Icon name="arrow" size={14} />
                </Link>
              </div>

              <div className="bene-case-list">
                {CASES.map((c, index) => (
                  <Reveal key={c.id} delay={index * 80}>
                    <Link to={`/beneficiary/case/${c.id}`} className="bene-case-card" aria-label={`View case ${c.id}: ${c.title}`}>
                      <div className="bene-case-head">
                        <div>
                          <span className="bene-case-id">{c.id}</span>
                          <h3>{c.title}</h3>
                          <p>{c.category}</p>
                        </div>
                        <StatusPill status={c.status} />
                      </div>
                      <CaseProgressBar raised={c.raised} target={c.target} />
                      <div className="bene-case-foot">
                        <div className="bene-supporters" aria-label={`${c.supporters.length} supporters`}>
                          {c.supporters.slice(0, 4).map((initials) => (
                            <Avatar key={initials} initials={initials} size="sm" />
                          ))}
                          {c.supporters.length > 4 && <span className="bene-supporter-more">+{c.supporters.length - 4}</span>}
                          <span className="bene-updated">{c.updated}</span>
                        </div>
                        <span className="bene-card-action">View case <Icon name="arrow" size={14} /></span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>

            <aside className="bene-rail" aria-label="Next actions and ambassador">
              <section className="bene-panel bene-next" aria-labelledby="bene-next-title">
                <span className="bene-section-kicker">Priority</span>
                <h2 id="bene-next-title">Next steps</h2>
                <ul>
                  {NEXT_STEPS.map((step) => (
                    <li key={step.label}>
                      <StatusDot status={step.status} size={18} />
                      <span>{step.label}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bene-panel bene-ambassador" aria-labelledby="bene-ambassador-title">
                <span className="bene-section-kicker">Your ambassador</span>
                <div className="bene-ambassador-head">
                  <Avatar initials="FO" green />
                  <div>
                    <h2 id="bene-ambassador-title">Fatima O.</h2>
                    <p>Khartoum coordinator · 47 cases verified</p>
                  </div>
                </div>
                <p>Fatima is reviewing your education documents and can help unblock both active cases.</p>
                <Link to="/beneficiary/messages" className="btn btn-primary sm" aria-label="Open conversation with Fatima O.">
                  Open conversation <Icon name="arrow" size={14} />
                </Link>
              </section>
            </aside>
          </div>

          <section className="bene-panel bene-activity" aria-labelledby="bene-activity-title">
            <div className="bene-section-head">
              <div>
                <span className="bene-section-kicker">Latest movement</span>
                <h2 id="bene-activity-title">Recent activity</h2>
              </div>
            </div>
            <ul>
              {ACTIVITY.map((item) => (
                <li key={`${item.who}-${item.text}`}>
                  <span className="bene-activity-icon" aria-hidden="true"><Icon name={item.icon} size={18} /></span>
                  <span><strong>{item.who}</strong> {item.text}</span>
                  <time>{item.when}</time>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
      <Footer depth={1} />
    </>
  );
}
