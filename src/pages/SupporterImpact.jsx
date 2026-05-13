import React, { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import DemoTag from '../components/DemoTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import Photo from '../components/Photo.jsx'
import PurposeBadge from '../components/PurposeBadge.jsx'
import { showToast } from '../components/Toast.jsx'
import { getActiveUser, getImpactRowsForUser } from '../data/mockQueries.js'
import { LEDGER, VERT_BREAKDOWN, VERTICALS } from '../data/mockDb.js'
import '../../supporter/impact.css'

function Donut() {
  const segs = [
    { val: 39, color: "var(--green)", lab: "Direct beneficiary" },
    { val: 22, color: "var(--gold-2)", lab: "Partner verification" },
    { val: 18, color: "#7a8c5c", lab: "SME deployment" },
    { val: 12, color: "var(--ink-soft)", lab: "Programme operations" },
    { val: 9, color: "#c46243", lab: "Sharia & audit reserve" }
  ];
  const total = segs.reduce((s, x) => s + x.val, 0);
  let offset = 0;
  const C = 2 * Math.PI * 70;
  return (
    <div className="donut-wrap" style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:32,alignItems:"center"}}>
      <svg viewBox="0 0 180 180" style={{width:180,height:180,transform:"rotate(-90deg)"}}>
        <circle cx="90" cy="90" r="70" fill="none" stroke="var(--cream-2)" strokeWidth="22"/>
        {segs.map((s, i) => {
          const len = (s.val / total) * C;
          const el = <circle key={i} cx="90" cy="90" r="70" fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} style={{transition:"stroke-dasharray 1.4s cubic-bezier(.2,.65,.3,1)"}}/>;
          offset += len;
          return el;
        })}
      </svg>
      <div className="donut-legend">
        {segs.map((s, i) => (
          <div key={i} className="row">
            <div className="swatch" style={{background:s.color}}></div>
            <span>{s.lab}</span>
            <strong>{s.val}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

const GEO = [
  { num: 142, label: "Sudan" }, { num: 86, label: "Egypt" }, { num: 78, label: "UAE" },
  { num: 64, label: "Saudi" }, { num: 48, label: "Qatar" }, { num: 42, label: "Uganda" },
  { num: 26, label: "Kenya" }, { num: 22, label: "UK" }, { num: 18, label: "Canada" },
  { num: 14, label: "USA" }, { num: 12, label: "Germany" }, { num: 8, label: "Australia" },
  { num: 6, label: "France" }, { num: 4, label: "Other" }
];

export default function SupporterImpact() {
  const [filled, setFilled] = useState(false)
  const [mode, setMode] = useState('global')
  const activeUser = getActiveUser()

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200)
    return () => clearTimeout(t)
  }, [])

  const rows = useMemo(() => {
    if (mode === 'my' && activeUser) return getImpactRowsForUser(activeUser.id)
    return LEDGER
  }, [mode, activeUser])

  const myTotal = useMemo(() => rows.reduce((s, r) => s + r.amount, 0), [rows])
  const myCases = useMemo(() => new Set(rows.map(r => r.id)).size, [rows])

  return (
    <>
      <Nav active="impact" side="supporter" depth={1} />

      <section className="imp-hero">
        <div className="container">
          <div className="imp-hero-grid">
            <Reveal>
              <div className="eyebrow">§ Impact dashboard · Live ledger · Q2 2026</div>
              <h1>{mode === 'my' ? `${myCases} cases.` : '3,892 lives.'}<br/><em>{mode === 'my' ? 'Your direct impact.' : 'Every payout, traceable.'}</em></h1>
              <p>{mode === 'my'
                ? `Your supported cases through the Kushian™ Impact Ledger — ${myCases} active case${myCases !== 1 ? 's' : ''}, $${myTotal.toLocaleString()} disbursed.`
                : 'The Kushian™ Impact Ledger publishes every disbursement, every partner attestation and every Sharia audit — in real time. Independent quarterly review by the Sudan Doctors Network and Takaful Re-insurance Co.'
              }</p>
              {activeUser && (
                <div style={{display:'flex',gap:8,marginTop:16}}>
                  <button className={`chip ${mode==='global'?'active':''}`} onClick={()=>setMode('global')}>Global impact</button>
                  <button className={`chip ${mode==='my'?'active':''}`} onClick={()=>setMode('my')}>My impact</button>
                </div>
              )}
            </Reveal>
            <Reveal delay={120}>
              <Photo caption={mode === 'my' ? `YOUR CASES · ${myCases} ACTIVE` : 'BENEFICIARIES · 14 COUNTRIES'} overlay={mode === 'my' ? 'Your supported beneficiaries, Q2 2026' : 'Kushian™ beneficiary community, Q2 2026'} img="../images/impact-hero.jpg" dark={true}/>
            </Reveal>
          </div>
          <div className="big-stats">
            {mode === 'my' ? (
              <>
                <div style={{gridColumn:'1/-1',background:'var(--green)',color:'var(--cream)',borderRadius:6,padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
                  <div>
                    <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',opacity:.7,marginBottom:8}}>Your Verified Support</div>
                    <div style={{fontSize:'clamp(36px,5vw,56px)',fontWeight:400}}><Counter prefix='$' to={myTotal}/></div>
                  </div>
                  <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:12,opacity:.6,maxWidth:320,lineHeight:1.6}}>{myCases} case{myCases !== 1 ? 's' : ''} across your portfolio · Updated monthly</div>
                </div>
                <div><div className='num'><Counter to={myCases}/></div><div className='label'>Active cases</div></div>
                <div><div className='num'><Counter to={myTotal} prefix='$'/></div><div className='label'>Total disbursed</div></div>
                <div><div className='num'><Counter to={rows.filter(r=>r.status==='settled').length}/></div><div className='label'>Settled payouts</div></div>
                <div><div className='num'><Counter to={rows.filter(r=>r.status==='pending').length}/></div><div className='label'>Pending</div></div>
              </>
            ) : (
              <>
                <div style={{gridColumn:'1/-1',background:'var(--green)',color:'var(--cream)',borderRadius:6,padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
                  <div>
                    <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:11,letterSpacing:'.08em',textTransform:'uppercase',opacity:.7,marginBottom:8}}>Verified Support Facilitated</div>
                    <div style={{fontSize:'clamp(36px,5vw,56px)',fontWeight:400}}><Counter prefix='$' to={2400000}/></div>
                  </div>
                  <div style={{fontFamily:'"JetBrains Mono",monospace',fontSize:12,opacity:.6,maxWidth:320,lineHeight:1.6}}>Across all verified cases, verticals and corridors · Updated monthly</div>
                </div>
                <div><div className='num'><Counter to={3892}/></div><div className='label'>Lives reached</div><div className='delta'>↑ 412 this quarter</div></div>
                <div><div className='num'><Counter to={1.2} prefix='$' suffix='m'/></div><div className='label'>Capital structured</div><div className='delta'>↑ 18% YoY</div></div>
                <div><div className='num'><Counter to={284}/></div><div className='label'>Jobs supported</div><div className='delta'>↑ 64 this quarter</div></div>
                <div><div className='num'><Counter to={94} suffix="%"/></div><div className='label'>Year-1 retention</div><div className='delta'>Stable</div></div>
                <div><div className='num'><Counter to={312}/></div><div className='label'>Women Reached</div></div>
                <div><div className='num'><Counter to={529}/></div><div className='label'>Students Supported</div></div>
                <div><div className='num'><Counter to={184}/></div><div className='label'>Healthcare Cases</div></div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Vertical breakdown</div>
              <h2>Where pledges land.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Active beneficiaries by Kushian™ vertical, Q2 2026. Most cases are co-funded across two or more verticals — the totals reflect lead vertical only.</p>
          </Reveal>

          <div className="split">
            <Reveal>
              <div className="bar-chart">
                {VERT_BREAKDOWN.map((b, i) => (
                  <React.Fragment key={i}>
                    <div className="lab">{b.lab}</div>
                    <div className="track"><div className={`fill ${b.color}`} style={{width: filled ? `${(b.val/200)*100}%` : "0%"}}></div></div>
                    <div className="val">{b.val} cases</div>
                  </React.Fragment>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:10.5,letterSpacing:".14em",textTransform:"uppercase",color:"var(--gold-2)",marginBottom:14}}>$ Allocation by use</div>
                <Donut/>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Geographic reach</div>
              <h2>14 countries, one network.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Active beneficiaries by host country — including those still inside Sudan with reinforcement support.</p>
          </Reveal>
          <div className="geo-grid">
            {GEO.map((g, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="geo">
                  <div className="num"><Counter to={g.num}/></div>
                  <div className="label">{g.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Verticals</div><h2>Six verticals impacted.</h2></div></Reveal>
          <div className="impact-verticals">
            {VERTICALS.map((v,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="impact-vertical-tile">
                  <PurposeBadge category={v.category}/>
                  <div className="impact-vertical-count"><Counter to={v.count}/></div>
                  <div className="impact-vertical-label">{v.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ {mode === 'my' ? 'Your ledger' : 'Live ledger'} · Last 7 days</div>
              <h2>Every disbursement, on the record.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>{mode === 'my' ? 'Disbursements for cases you support.' : 'Public, immutable record of all Kushian™ payouts. Click any case to see partner attestation and Sharia review.'}</p>
          </Reveal>
          <Reveal>
            <div style={{border:"1px solid var(--line)",borderRadius:6,overflow:"hidden",background:"var(--cream)"}}>
              <div className="ledger-row head">
                <div>Date</div><div>Disbursement</div><div>Partner of record</div><div style={{textAlign:"right"}}>Amount</div><div style={{textAlign:"right"}}>Status</div>
              </div>
              {rows.map((l, i) => (
                <div key={i} className="ledger-row">
                  <div className="dt">{l.dt} · 2026</div>
                  <div>
                    <span className="id">{l.id}</span> · {l.desc}
                  </div>
                  <div style={{fontSize:13,color:"var(--ink-soft)"}}>{l.partner}</div>
                  <div className="amt">${l.amount.toLocaleString()}</div>
                  <div style={{textAlign:"right"}}>
                    <span className={`tag ${l.status === "settled" ? "verified" : "pending"}`} style={{fontSize:10}}><span className="dot"></span>{l.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:24}}>
              <button className="btn btn-soft" onClick={() => showToast("Full ledger — coming next")}>View full ledger <Icon name="arrow"/></button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block" style={{borderBottom:0}}>
        <div className="container">
          <Reveal>
            <div className="audit-strip">
              <div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:10.5,letterSpacing:".14em",textTransform:"uppercase",color:"var(--gold)",marginBottom:14}}>§ Quarterly audit · Q1 2026</div>
                <h3>Independent Sharia compliance + impact attestation.</h3>
                <p>Reviewed by Takaful Re-insurance Co. (Sharia framework) and the Sudan Doctors Network (clinical attestation). Q1 2026 report covers 1,847 disbursements totalling $384,000 across 6 verticals.</p>
                <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
                  <button className="btn btn-gold" onClick={() => showToast("Audit report — coming next")}>Download Q1 2026 report <Icon name="download" size={14}/></button>
                  <button className="btn btn-text" style={{color:"var(--cream)"}} onClick={() => showToast("Sharia framework — coming next")}>Sharia framework <Icon name="arrow" size={14}/></button>
                </div>
              </div>
              <div className="seal">
                <div className="seal-inner">
                  <div className="nm">Q1<br/>2026</div>
                  <div className="sub">Audited<br/>· Sharia ·<br/>Compliant</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={1} />
      <DemoTag/>
    </>
  );
}
