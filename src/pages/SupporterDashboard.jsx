import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SupporterDashboard.css'
import Icon from '../components/Icon.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import DemoTag from '../components/DemoTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import PurposeBadge from '../components/PurposeBadge.jsx'
import { showToast } from '../components/Toast.jsx'
import {
  getActiveUser,
  getCasesForSupporter,
  getSupporterSummary,
  getActivityFeed
} from '../data/mockQueries.js'
import { clearActiveUser } from '../data/mockSession.js'

const VERT_ICON = { education: 'education', family: 'family', sme: 'sme', health: 'health', women: 'women' }

const CASE_ROUTE = {
  'K-2384': '/supporter/cases/maryam',
  'K-1908': '/supporter/cases/awad',
  'K-3014': '/supporter/cases/afaf',
  'K-2756': '/supporter/cases/yasmin',
  'K-2102': '/supporter/cases/ibrahim',
  'K-2890': '/supporter/cases/halima',
  'K-3120': '/supporter/cases/halima'
}

const VERTICAL_SUGGEST = {
  sarah: { label: 'Healthcare verticals', desc: 'Based on your medical background, 3 hospitalization cases are seeking clinical attestation from a consultant cardiologist.', href: '/supporter/healthcare' },
  osman: { label: 'SME Recovery & Education', desc: 'Based on your finance expertise, 2 SME recovery cases and 1 education cohort need advisory support from a Professor of Finance.', href: '/supporter/sme-advisory' },
  khalid: { label: 'Family Support & SME', desc: 'Based on your development focus, 2 family support cases and 2 SME recovery cases align with your family office priorities.', href: '/supporter/sme-advisory' },
  hassan: { label: 'Education & Mentorship', desc: 'Based on your engineering background, 2 education cases and 1 workforce returnship need technical mentorship.', href: '/supporter/education' }
}

export default function SupporterDashboard() {
  const [filter, setFilter] = useState('all')
  const [showEmpty, setShowEmpty] = useState(() => new URLSearchParams(window.location.search).get('empty') === '1')
  const navigate = useNavigate()

  const user = getActiveUser()

  if (!user) {
    return (
      <>
        <Nav active='dashboard' side='supporter' depth={1} />
        <section className='dash-hero'>
          <div className='container'>
            <div className='dash-empty-state' style={{ padding: '80px 0', textAlign: 'center' }}>
              <div className='dash-empty-icon'><Icon name='users' size={48} /></div>
              <h3>Choose a supporter profile to continue</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 420, margin: '12px auto 24px' }}>Sign in as a supporter to view your dashboard, track cases, and manage pledges.</p>
              <Link to='/role' className='btn btn-primary'>Choose Profile <Icon name='arrow' /></Link>
            </div>
          </div>
        </section>
        <Footer depth={1} />
        <DemoTag />
      </>
    )
  }

  const cases = getCasesForSupporter(user.id)
  const summary = getSupporterSummary(user.id)
  const activity = getActivityFeed('supporter', user.id)
  const suggest = VERTICAL_SUGGEST[user.id] || VERTICAL_SUGGEST.sarah

  const greetingName = (user.greeting || user.name || '').replace('Welcome back, ', '').replace('.', '')
  const filtered = filter === 'all' ? cases : cases.filter(c => c.status === filter)

  const handleLogout = () => {
    clearActiveUser()
    navigate('/role')
  }

  return (
    <>
      <Nav active='dashboard' side='supporter' depth={1} />

      <section className='dash-hero'>
        <div className='container'>
          <div className='dash-hero-grid'>
            <div>
              <div className='eyebrow'>Supporter Dashboard · Live Cohort</div>
              <h1 className='dash-greet'>Welcome back,<br /><em>{greetingName}.</em></h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className='section-num'>Active session</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 24, marginTop: 8 }}>{user.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '.08em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 4 }}>{user.title}</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                <button className='btn btn-soft sm' onClick={handleLogout}>Switch profile</button>
                <Link to='/create' className='btn btn-primary sm'><Icon name='plus' size={14} /> New pledge</Link>
              </div>
            </div>
          </div>

          <div className='summary-grid'>
            <div className='sum-card'>
              <div className='label'>Total Pledged · YTD</div>
              <div className='num'><Counter to={summary.totalPledged} prefix='$' /></div>
              <div className='delta'>↑ 24% vs last quarter</div>
            </div>
            <div className='sum-card'>
              <div className='label'>Active Cases</div>
              <div className='num'><Counter to={summary.activeCases} /></div>
              <div className='delta'>2 awaiting verification</div>
            </div>
            <div className='sum-card'>
              <div className='label'>Lives Reached</div>
              <div className='num'><Counter to={summary.livesReached} /></div>
              <div className='delta'>↑ 6 this month</div>
            </div>
            <div className='sum-card'>
              <div className='label'>Partner Verifications</div>
              <div className='num'><Counter to={summary.verifications} /></div>
              <div className='delta'>All up to date</div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='dash-body'>
          <div>
            <div className='filter-bar'>
              {['all', 'verified', 'urgent', 'pending', 'complete'].map(f => (
                <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All cases' : f.charAt(0).toUpperCase() + f.slice(1)} {f === 'all' ? `· ${cases.length}` : `· ${cases.filter(c => c.status === f).length}`}
                </button>
              ))}
              <span className='spacer'></span>
              <button className='chip' onClick={() => showToast('Export — coming next')}><Icon name='download' size={12} /> Export</button>
              <button className='chip' onClick={() => showToast('Filter sheet — coming next')}><Icon name='filter' size={12} /> More filters</button>
            </div>

            {showEmpty ? (
              <div className='dash-empty-state'>
                <div className='dash-empty-icon'><Icon name='users' size={48} /></div>
                <h3>Get started with Kushian™</h3>
                <div className='dash-empty-steps'>
                  <div className='dash-empty-step'><span className='dash-empty-num'>1</span><p>Choose your role and join the platform</p></div>
                  <div className='dash-empty-step'><span className='dash-empty-num'>2</span><p>Create your first verified support case</p></div>
                  <div className='dash-empty-step'><span className='dash-empty-num'>3</span><p>Track verified outcomes on the impact dashboard</p></div>
                </div>
                <Link to='/role' className='btn btn-primary'>Get Started <Icon name='arrow' /></Link>
                <button className='btn btn-text sm' style={{ marginTop: 12 }} onClick={() => setShowEmpty(false)}>View available cases</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className='dash-empty-state'>
                <div className='dash-empty-icon'><Icon name='search' size={48} /></div>
                <h3>No cases match this filter</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 8 }}>Try a different filter or <button className='btn btn-text sm' onClick={() => setFilter('all')}>view all cases</button></p>
              </div>
            ) : (
              filtered.map((c, i) => {
                const profileUrl = CASE_ROUTE[c.id]
                const supporterCount = c.supporterUserIds?.length || 0
                return (
                  <Reveal key={c.id} delay={i * 50}>
                    <div
                      className='case-row'
                      style={{ display: 'grid', cursor: 'pointer' }}
                      onClick={() => profileUrl ? navigate(profileUrl) : showToast('Full case profiles — coming next')}
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter' && e.key !== ' ') return
                        e.preventDefault()
                        profileUrl ? navigate(profileUrl) : showToast('Full case profiles — coming next')
                      }}
                      role='button'
                      tabIndex={0}
                    >
                      <div className='ava-wrap' style={c.img ? { background: `url(${c.img}) center/cover` } : {}}></div>
                      <div>
                        <div className='vert'><Icon name={VERT_ICON[c.verticalKey]} size={14} style={{ verticalAlign: '-3px' }} /> {c.vertical}</div>
                        <h4>{c.name}</h4>
                        <div style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{c.desc}</div>
                        <div className='case-meta'>
                          <span><Icon name='pin' size={12} style={{ verticalAlign: '-2px' }} /> {c.location}</span>
                          <span><Icon name='calendar' size={12} style={{ verticalAlign: '-2px' }} /> Since {c.since}</span>
                          <span>Case {c.id} <PurposeBadge category={c.category} /></span>
                        </div>
                      </div>
                      <div className='progress-cell'>
                        <div className='pct'><span>${(c.raised || 0).toLocaleString()} / ${(c.target || 0).toLocaleString()}</span><span>{c.progress}%</span></div>
                        <div className='progress'><div className='progress-fill' style={{ width: `${c.progress}%` }}></div></div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--muted)', letterSpacing: '.06em' }}>{supporterCount} supporters</div>
                      </div>
                      <div>
                        <span className={`tag ${c.status}`}><span className='dot'></span> {c.status === 'complete' ? 'Complete' : c.status === 'verified' ? 'Verified · Active' : c.status === 'urgent' ? `Urgent · ${c.urgency}` : 'Pending verification'}</span>
                      </div>
                      <div style={{ textAlign: 'right', color: 'var(--green)' }}><Icon name='arrow-up-right' size={20} /></div>
                    </div>
                  </Reveal>
                )
              })
            )}
          </div>

          <aside>
            <div className='panel'>
              <div className='panel-eyebrow'>Activity feed</div>
              {activity.map((a, i) => (
                <div key={i} className='activity-item'>
                  <span className='when'>{a.when}</span>
                  <span style={{ color: 'var(--ink-soft)' }}>{a.text}</span>
                </div>
              ))}
            </div>

            <div className='panel' style={{ background: 'var(--green)', color: 'var(--cream)', borderColor: 'var(--green)' }}>
              <div className='panel-eyebrow' style={{ color: 'var(--gold)' }}>Featured this month</div>
              <h4 style={{ color: 'var(--cream)' }}>Manchester diaspora circle</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(247,244,238,.78)', margin: '8px 0 16px' }}>32 supporters from the NHS Sudanese physicians network are co-funding 4 hospitalization cases this quarter. Join their pledge.</p>
              <button className='btn btn-gold sm' onClick={() => showToast('Join Manchester circle — coming next')}>Join the circle <Icon name='arrow' /></button>
            </div>

            <div className='panel'>
              <div className='panel-eyebrow'>Suggested for you</div>
              <h4>{suggest.label}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '8px 0 16px' }}>{suggest.desc}</p>
              <Link className='btn btn-soft sm' to={suggest.href}>View cases <Icon name='arrow' /></Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer depth={1} />
      <DemoTag />
    </>
  )
}
