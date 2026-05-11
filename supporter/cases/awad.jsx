const { useState } = React;

const DOCS = [
  { name: "National ID · Family", sub: "Verified · Kampala Partner", check: true },
  { name: "UNHCR displacement certificate", sub: "Issued Feb 2026 · Family of 5", check: true },
  { name: "Household income declaration", sub: "Self-attested · Witnessed", check: true },
  { name: "Rental agreement", sub: "Housing in Kampala, UG", check: true },
  { name: "Employment seeking status", sub: "Father · Labour permit application", check: true },
  { name: "Child welfare attestation", sub: "3 dependents · Health screening passed", check: true }
];

const TIMELINE = [
  { when: "Feb 2026", title: "Family displaced from Wad Madani", desc: "Awad M., spouse and 3 children relocate to Kampala via Kenya corridor.", state: "done" },
  { when: "Mar 2026", title: "Onboarded to Family Support pool", desc: "Verified through Kampala partner. Income assessment completed.", state: "done" },
  { when: "Apr 2026", title: "Monthly stipend begins", desc: "First payment deployed: $800/month for 6 months covering rent, food, utilities.", state: "done" },
  { when: "May 2026", title: "Employment support initiated", desc: "Father pursuing manufacturing sector work. Skills audit and job placement support.", state: "current" },
  { when: "Aug 2026", title: "Mid-term progress review", desc: "Family stabilization milestone check. Employment progress assessment.", state: "future" },
  { when: "Sept 2026", title: "Loan transition planning", desc: "Move from stipend to microcredit for skills training and business restart.", state: "future" }
];

const SUPPORTERS = [
  { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 800 },
  { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 800 },
  { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 800 },
  { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 800 },
  { initials: "RM", name: "Rasha M.", loc: "Dubai, AE", amt: 800 },
  { initials: "MA", name: "Mohamed A.", loc: "Toronto, CA", amt: 800 },
  { initials: "SH", name: "Serag H.", loc: "Cairo, EG", amt: 400 },
  { initials: "+1", name: "1 more supporter", loc: "GCC + Africa", amt: 400 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav active="dashboard" side="supporter" depth={2} />

      <div className="container bp-back">
        <a href="../dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-1908</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(../../images/case-family.jpg) center/cover"}}>
              <div className="photo-meta"><span>BENEFICIARY · AWAD FAMILY</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">Family Support vertical · Household stabilization</div>
              <h1 className="bp-name">Awad M. Family<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>5 dependents · Wad Madani → Kampala</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Kampala, Uganda · Manufacturing sector</span>
                <span><Icon name="calendar" size={14}/> Onboarded Mar 2026</span>
                <span><Icon name="shield" size={14}/> Verified by Kampala partner</span>
              </div>
              <p className="bp-story">The Awad family — father seeking work, mother and three school-age children — was displaced from Wad Madani in February 2026. Through Kushian™'s Family Support pool, eight diaspora supporters across Riyadh, Jeddah, Cairo and London pledged monthly household stipends covering rent, food, utilities and children's education — coordinated by a verified Kampala partner with quarterly income assessments.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge support — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message family — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Active campaign</div>
                <div className="num-big">$6,240</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $9,600 GOAL · 65%</div>
                <div className="progress"><div className="progress-fill" style={{width:"65%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Supporters</span>
                  <strong>8</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Coverage</span>
                  <strong>6 months</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Partner</span>
                  <strong>Kampala CDO</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Verification status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully verified</strong></div>
                <p>Identity, displacement and income attested by Kampala partner. Last assessment: 22 Apr 2026.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="bp-tabs">
          {["story","documents","timeline","supporters"].map(t => (
            <button key={t} className={`bp-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="bp-body">
          <div>
            {tab === "story" && <Reveal>
              <div className="bp-section">
                <h3>Background</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Awad M. was a manufacturing supervisor at a Wad Madani textile factory before conflict displaced his family in February 2026. His family — a spouse, three children aged 6, 9 and 12, and an elderly dependent — relocated to Kampala via Kenya.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>With limited local language skills and no immediate employment prospects, the family faces acute income insecurity. The mother is unable to work due to childcare demands, leaving household stabilization dependent on monthly support.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ Family pool funds $800/month covering rent ($400), food and nutrition ($250), utilities and transport ($100), and children's school fees ($50) — a 6-month stabilization package while the father pursues employment in the manufacturing or construction sectors. Parallel job placement support connects him with verified employers.</p>
              </div>
            </Reveal>}
            {tab === "documents" && <Reveal>
              <div className="bp-section">
                <h3>Document checklist · 6 of 6 verified</h3>
                <div className="doc-list">
                  {DOCS.map((d, i) => (
                    <div key={i} className="doc">
                      <div className="doc-icon"><Icon name="doc" size={18}/></div>
                      <div>
                        <div className="name">{d.name}</div>
                        <div className="sub">{d.sub}</div>
                      </div>
                      <div className="check"><Icon name="check" size={18}/></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
            {tab === "timeline" && <Reveal>
              <div className="bp-section">
                <h3>Support journey</h3>
                <div className="timeline">
                  {TIMELINE.map((t, i) => (
                    <div key={i} className={`tl-item ${t.state}`}>
                      <div className="tl-when">{t.when}</div>
                      <div className="tl-title">{t.title}</div>
                      <div className="tl-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
            {tab === "supporters" && <Reveal>
              <div className="bp-section">
                <h3>8 diaspora supporters</h3>
                <div className="supporter-grid">
                  {SUPPORTERS.map((s, i) => (
                    <div key={i} className="supporter">
                      <div className="ava">{s.initials}</div>
                      <div>
                        <div className="nm">{s.name}</div>
                        <div className="sub">{s.loc}</div>
                      </div>
                      <div className="amt">${s.amt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>}
          </div>
          <aside>
            <div className="panel">
              <div className="panel-eyebrow">Partner of record</div>
              <h4>Kampala Diaspora Organization</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>Kampala, Uganda · Family support & employment placement · 42 active cases.</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Partner profile — coming next")}>Partner profile <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="maryam.html" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2384</span><span>Maryam A. · Education · Cairo</span></a>
              <a href="halima.html" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2890</span><span>Halima M. · Women returnship · Doha</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-3102</span><span>Fatima H. · Family support · Nairobi</span></a>
            </div>
          </aside>
        </div>
      </div>

      <Footer depth={2} />
      <DemoTag/>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
