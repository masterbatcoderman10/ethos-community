import { Link, useNavigate } from 'react-router-dom';
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
import { getActiveUser, getCasesForReceiver, getBeneficiarySummary, getActivityFeed } from '../data/mockQueries.js';
import { clearActiveUser } from '../data/mockSession.js';
import { getUserById } from '../data/mockDb.js';
import '../../beneficiary/dashboard.css';

function FallbackState() {
  return (
    <div className="bene-empty-state">
      <h2>No active receiver profile</h2>
      <p>Choose a beneficiary profile to view your dashboard.</p>
      <Link to="/role" className="btn btn-primary">Choose profile</Link>
    </div>
  );
}

export default function BeneficiaryDashboard() {
  const navigate = useNavigate();
  const user = getActiveUser();

  if (!user) {
    return (
      <>
        <Nav active="dashboard" side="beneficiary" depth={1} />
        <DemoTag />
        <main className="bene-dashboard">
          <div className="container" style={{ padding: '80px 32px', textAlign: 'center' }}>
            <FallbackState />
          </div>
        </main>
        <Footer depth={1} />
      </>
    );
  }

  const cases = getCasesForReceiver(user.id);
  const summary = getBeneficiarySummary(user.id);
  const activity = getActivityFeed('beneficiary');

  const nextSteps = cases
    .flatMap(c => (c.milestones || []).map(m => ({ ...m, caseName: c.name, caseId: c.id })))
    .filter(m => m.status === 'active' || m.status === 'complete')
    .slice(0, 4)
    .map(m => ({ label: m.label, status: m.status === 'complete' ? 'done' : 'active' }));

  const firstSupporter = [...new Set(cases.flatMap(c => c.supporterUserIds || []))]
    .map(id => getUserById(id))
    .filter(Boolean)[0];

  const switchProfile = () => {
    clearActiveUser();
    navigate('/role');
  };

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
                <h1>Welcome back, {user.name}</h1>
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
              <strong className="bene-stat-value"><Counter to={summary.activeCases} /></strong>
              <span className="bene-stat-note">Across your portfolio</span>
            </article>
            <article className="bene-stat">
              <span className="bene-stat-label">Funds raised</span>
              <strong className="bene-stat-value"><Counter to={summary.fundsRaised} prefix="$" /></strong>
              <span className="bene-stat-note">Of ${summary.targetTotal.toLocaleString()} target</span>
            </article>
            <article className="bene-stat">
              <span className="bene-stat-label">Supporters</span>
              <strong className="bene-stat-value"><Counter to={summary.supporterCount} /></strong>
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
                {cases.length === 0 ? (
                  <div className="bene-empty">
                    <Icon name="doc" size={28} />
                    <h2>No cases yet</h2>
                    <p>Create your first case to get started.</p>
                    <Link to="/create" className="btn btn-primary">New case</Link>
                  </div>
                ) : (
                  cases.map((c, index) => (
                    <Reveal key={c.id} delay={index * 80}>
                      <Link to={`/beneficiary/case/${c.id}`} className="bene-case-card" aria-label={`View case ${c.id}: ${c.name || c.desc}`}>
                        <div className="bene-case-head">
                          <div>
                            <span className="bene-case-id">
                              {c.id}
                              {c.isDraft && <StatusPill status="draft" />}
                            </span>
                            <h3>{c.name || c.desc}</h3>
                            <p>{c.vertical || c.category}</p>
                          </div>
                          <StatusPill status={c.status} />
                        </div>
                        <CaseProgressBar raised={c.raised || 0} target={c.target || 0} />
                        <div className="bene-case-foot">
                          <div className="bene-supporters" aria-label={`${(c.supporterUserIds || []).length} supporters`}>
                            {(c.supporterUserIds || []).slice(0, 4).map((uid) => {
                              const u = getUserById(uid);
                              return <Avatar key={uid} initials={u?.initials || '??'} size="sm" />;
                            })}
                            {(c.supporterUserIds || []).length > 4 && <span className="bene-supporter-more">+{(c.supporterUserIds || []).length - 4}</span>}
                            <span className="bene-updated">Since {c.since || 'recently'}</span>
                          </div>
                          <span className="bene-card-action">View case <Icon name="arrow" size={14} /></span>
                        </div>
                      </Link>
                    </Reveal>
                  ))
                )}
              </div>
            </section>

            <aside className="bene-rail" aria-label="Next actions and ambassador">
              <section className="bene-panel bene-next" aria-labelledby="bene-next-title">
                <span className="bene-section-kicker">Priority</span>
                <h2 id="bene-next-title">Next steps</h2>
                {nextSteps.length === 0 ? (
                  <p>No pending steps</p>
                ) : (
                  <ul>
                    {nextSteps.map((step) => (
                      <li key={step.label}>
                        <StatusDot status={step.status} size={18} />
                        <span>{step.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {firstSupporter && (
                <section className="bene-panel bene-ambassador" aria-labelledby="bene-ambassador-title">
                  <span className="bene-section-kicker">Your supporter</span>
                  <div className="bene-ambassador-head">
                    <Avatar initials={firstSupporter.initials} green />
                    <div>
                      <h2 id="bene-ambassador-title">{firstSupporter.name}</h2>
                      <p>{firstSupporter.title}</p>
                    </div>
                  </div>
                  <p>Your primary supporter contact for case updates and verification questions.</p>
                  <Link to="/beneficiary/messages" className="btn btn-primary sm" aria-label={`Open conversation with ${firstSupporter.name}`}>
                    Open conversation <Icon name="arrow" size={14} />
                  </Link>
                </section>
              )}

              <div style={{ marginTop: 16 }}>
                <button type="button" className="btn btn-soft sm" onClick={switchProfile}>Switch profile</button>
              </div>
            </aside>
          </div>

          <section className="bene-panel bene-activity" aria-labelledby="bene-activity-title">
            <div className="bene-section-head">
              <div>
                <span className="bene-section-kicker">Explore</span>
                <h2 id="bene-activity-title">Pathways</h2>
              </div>
            </div>
            <div className='bene-pathway-grid'>
              {[
                { to: '/beneficiary/pathways/healthcare', label: 'Healthcare', icon: 'health' },
                { to: '/beneficiary/pathways/education', label: 'Education', icon: 'education' },
                { to: '/beneficiary/pathways/women', label: 'Women', icon: 'heart' },
                { to: '/beneficiary/pathways/legal', label: 'Legal', icon: 'legal' },
                { to: '/beneficiary/pathways/sme', label: 'SME', icon: 'sme' },
                { to: '/beneficiary/pathways/traders', label: 'Trade', icon: 'globe' },
                { to: '/beneficiary/pathways/marketplace', label: 'Marketplace', icon: 'search' }
              ].map(p => (
                <Link key={p.to} to={p.to} className='bene-pathway-link'>
                  <Icon name={p.icon} size={18} />
                  <span className='bene-pathway-label'>{p.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="bene-panel bene-activity" aria-labelledby="bene-activity-feed-title">
            <div className="bene-section-head">
              <div>
                <span className="bene-section-kicker">Latest movement</span>
                <h2 id="bene-activity-feed-title">Recent activity</h2>
              </div>
            </div>
            <ul>
              {activity.map((item) => (
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
