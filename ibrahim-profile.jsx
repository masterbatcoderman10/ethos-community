const { useState } = React;

const DOCS = [
  { name: "Engineering degrees · 12 recipients", sub: "Verified · Bachelor of Science", check: true },
  { name: "Graduation attestation", sub: "Riyadh Engineering Institute · May 2026", check: true },
  { name: "Employment letters", sub: "12 of 12 placed in engineering roles", check: true },
  { name: "Displacement certificates", sub: "UNHCR · Sudan-based cohort", check: true },
  { name: "CPD completion certificates", sub: "Professional development track", check: true },
  { name: "Employer attestation", sub: "Saudi Aramco, SABIC, Saudi Binladin Group", check: true }
];

const TIMELINE = [
  { when: "Aug 2024", title: "Cohort formation", desc: "12 displaced Sudanese engineering graduates assembled in Riyadh.", state: "done" },
  { when: "Sept 2024", title: "Onboarded to Education pool", desc: "CPD program and placement support launched by Riyadh Engineering Institute.", state: "done" },
  { when: "Dec 2024", title: "CPD modules complete", desc: "Professional development, Saudi standards, workplace Arabic training.", state: "done" },
  { when: "Mar 2026", title: "Placement interviews begin", desc: "Interviews conducted with 8 major Saudi engineering firms.", state: "done" },
  { when: "May 2026", title: "Graduation ceremony", desc: "12 of 12 cohort members placed. Placement bonus paid and ceremonies held.", state: "done" },
  { when: "Sept 2026", title: "6-month employment review", desc: "Onboarding attestation and salary progression tracking.", state: "current" }
];

const SUPPORTERS = [
  { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 600 },
  { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 900 },
  { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 600 },
  { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 600 },
  { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 600 },
  { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 600 },
  { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 600 },
  { initials: "MA", name: "Mohamed A.", loc: "Cairo, EG", amt: 600 },
  { initials: "RM", name: "Rasha M.", loc: "Dubai, AE", amt: 500 },
  { initials: "+12", name: "12 more supporters", loc: "GCC + Global", amt: 3900 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav active="dashboard"/>

      <div className="container bp-back">
        <a href="supporter-dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-2102</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(images/education-cpd.jpg) center/cover"}}>
              <div className="photo-meta"><span>COHORT · ENGINEERING GRADUATES</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">Education vertical · Graduate CPD & placement</div>
              <h1 className="bp-name">Ibrahim Engineering Cohort<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>12 graduates · Sudan → Riyadh</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Riyadh, Saudi Arabia · Engineering firms</span>
                <span><Icon name="calendar" size={14}/> Program start Aug 2024</span>
                <span><Icon name="shield" size={14}/> Verified by institute partner</span>
              </div>
              <p className="bp-story">Twelve displaced Sudanese engineering graduates converged in Riyadh seeking employment in the Gulf's booming infrastructure and energy sector. Through Kushian™'s Education pool, twenty-two diaspora supporters funded a 9-month CPD and placement program — professional development, Saudi technical standards, workplace Arabic and employer interviews coordinated by a verified Riyadh engineering institute. All 12 secured engineering roles at major Saudi firms.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge support — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message cohort — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Campaign status</div>
                <div className="num-big">$14,400</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $14,400 GOAL · 100%</div>
                <div className="progress"><div className="progress-fill" style={{width:"100%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Supporters</span>
                  <strong>22</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Graduates placed</span>
                  <strong>12 of 12</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Status</span>
                  <strong>COMPLETE</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Completion status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully placed</strong></div>
                <p>All 12 cohort members employed in engineering roles. Final attestation: 28 May 2026.</p>
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
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>In August 2024, a cohort of twelve engineering graduates from Sudan converged in Riyadh seeking employment. All held Bachelor of Science degrees in civil, mechanical or electrical engineering from leading Sudanese universities. Displacement and border restrictions prevented direct entry into Saudi job markets without local credentialling and professional network alignment.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The group faced a common challenge: expertise in engineering was not matched by knowledge of Saudi technical standards, employer expectations, or workplace Arabic proficiency — a gap that required structured 6-8 month bridging before placement could succeed.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ Education pool funded a comprehensive 9-month CPD and placement program: technical standards and Saudi codes ($3,600), workplace Arabic immersion ($2,400), professional certifications ($2,400), employer interview prep ($2,400), placement bonus ($2,800), and program management ($900). The Riyadh Engineering Institute managed recruitment, training and employer introductions across Saudi Aramco, SABIC, Saudi Binladin and other major firms.</p>
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
                <h3>22 diaspora supporters</h3>
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
              <h4>Riyadh Engineering Institute</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>Riyadh, Saudi Arabia · CPD & placement · Established 1998.</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Partner profile — coming next")}>Partner profile <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Employment outcomes</div>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">Saudi Aramco</span><span>4 engineers placed</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">SABIC</span><span>3 engineers placed</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">Saudi Binladin</span><span>5 engineers placed</span></a>
            </div>
          </aside>
        </div>
      </div>

      <Footer/>
      <DemoTag/>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
