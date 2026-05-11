const { useState } = React;

const DOCS = [
  { name: "Cardiac assessment", sub: "Cleopatra Hospital · Verified", check: true },
  { name: "Surgical consultation report", sub: "Dr Hassan Karim, Pediatric cardiologist", check: true },
  { name: "Displacement certificate", sub: "UNHCR · Issued Mar 2026", check: true },
  { name: "Family health insurance", sub: "Takaful pool coverage · Active", check: true },
  { name: "Parental consent form", sub: "Surgery authorization · Notarized", check: true },
  { name: "Post-operative care plan", sub: "12-week rehabilitation protocol", check: true }
];

const TIMELINE = [
  { when: "Mar 2026", title: "Cardiac condition identified", desc: "Routine screening at Cleopatra Hospital identified pediatric ASD (atrial septal defect).", state: "done" },
  { when: "Apr 2026", title: "Onboarded to Healthcare pool", desc: "Verified through clinical partner. Surgical consultation completed.", state: "done" },
  { when: "May 2026", title: "Surgery scheduled", desc: "Surgical date set for 12 May 2026. Pledge campaign opened for $8,400.", state: "current" },
  { when: "May 2026", title: "48-hour milestone alert", desc: "$4,200 pledged of $8,400. Final push for pre-operative funds.", state: "current" },
  { when: "Jun 2026", title: "Post-operative monitoring", desc: "6-week clinic visits and rehabilitation milestones tracked.", state: "future" },
  { when: "Sept 2026", title: "Health recovery review", desc: "Cardiologist attestation and outcome assessment.", state: "future" }
];

const SUPPORTERS = [
  { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 1200 },
  { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 1000 },
  { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 800 },
  { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 600 },
  { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 600 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav side="supporter" depth={2} />

      <div className="container bp-back">
        <a href="../dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-2756</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(../../images/case-healthcare.jpg) center/cover"}}>
              <div className="photo-meta"><span>BENEFICIARY · YASMIN H.</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">Healthcare vertical · Pediatric cardiology</div>
              <h1 className="bp-name">Yasmin H.<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>Age 8 · Khartoum → Cairo</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Cairo, Egypt · Cleopatra Hospital</span>
                <span><Icon name="calendar" size={14}/> Surgery scheduled 12 May 2026</span>
                <span><Icon name="shield" size={14}/> Verified by clinical partner</span>
              </div>
              <p className="bp-story">Yasmin, an 8-year-old displaced from Khartoum, requires pediatric cardiac surgery to repair an atrial septal defect (ASD). Through Kushian™'s Healthcare pool, six diaspora supporters across the GCC and Europe pledged toward the $8,400 surgical cost at Cleopatra Hospital — coordinated by a Sharia-compliant Takaful pool with clinical attestation and 48-hour review SLA.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge support — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message family — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Active campaign</div>
                <div className="num-big">$4,200</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $8,400 GOAL · 50%</div>
                <div className="progress"><div className="progress-fill" style={{width:"50%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Supporters</span>
                  <strong>6</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Timeline</span>
                  <strong>48 hours</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Partner</span>
                  <strong>Cleopatra</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Verification status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully verified</strong></div>
                <p>Cardiac assessment and clinical case attested by Cleopatra Hospital. Takaful pool reviewed 3 May 2026.</p>
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
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Yasmin is an 8-year-old who was identified during routine health screening to have a moderate atrial septal defect (ASD) — a congenital heart condition that allows blood to flow abnormally between heart chambers. Her family was displaced from Khartoum in March 2026.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Without surgical intervention, the condition will worsen and limit her physical activity and quality of life. The surgical window is narrow; delaying repair increases both clinical and financial risk.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ Healthcare pool funds the complete surgical package: cardiac surgeon fees ($3,200), anesthesia and operating theatre ($2,400), post-operative monitoring ($1,800), and 12-week rehabilitation ($1,000) at Cleopatra Hospital — a Tier-I clinical partner with 38 verified cases in 2025.</p>
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
                <h3>6 diaspora supporters</h3>
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
              <h4>Cleopatra Hospital</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>Cairo, Egypt · Tier-I clinical partner · 38 verified cases attested 2025.</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Partner profile — coming next")}>Partner profile <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="maryam.html" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2901</span><span>Mariam K. · Maternal care · Kampala</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2944</span><span>Ahmed S. · Pediatric oncology · Doha</span></a>
              <a href="awad.html" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2812</span><span>Awad M. · Chronic care · Wad Madani</span></a>
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
