const { useState } = React;

const DOCS = [
  { name: "National ID · Mother", sub: "Verified · Cairo Partner", check: true },
  { name: "School enrolment letter", sub: "Al-Manarah School · Sept 2025", check: true },
  { name: "Displacement certificate", sub: "UNHCR · Issued Aug 2024", check: true },
  { name: "Term 1 attendance attestation", sub: "100% · Issued Dec 2025", check: true },
  { name: "Counselling intake form", sub: "Trauma-informed care · Verified", check: true },
  { name: "Household income declaration", sub: "Self-attested · Witnessed", check: true }
];

const TIMELINE = [
  { when: "Aug 2024", title: "Family displaced from Omdurman", desc: "Maryam, mother and 3 siblings relocate to Cairo via Aswan corridor.", state: "done" },
  { when: "May 2025", title: "Onboarded to Kushian™", desc: "Verified through Cairo partner. Documentation completed in 11 days.", state: "done" },
  { when: "Sept 2025", title: "Enrolment at Al-Manarah School", desc: "Year 9 placement secured. Tuition pledge campaign opened.", state: "done" },
  { when: "Dec 2025", title: "Term 1 milestone reached", desc: "100% attendance · Top quartile in maths and Arabic literature.", state: "done" },
  { when: "May 2026", title: "Term 2 attestation due", desc: "School partner submission expected by 15 May 2026.", state: "current" },
  { when: "Sept 2026", title: "Year 10 enrolment review", desc: "Eligibility for full-year continuation pledge.", state: "future" }
];

const SUPPORTERS = [
  { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 480 },
  { initials: "OI", name: "Prof. Osman I.", loc: "Jeddah, SA", amt: 600 },
  { initials: "KA", name: "Khalid A.", loc: "Dubai, AE", amt: 480 },
  { initials: "HY", name: "Hassan Y.", loc: "Toronto, CA", amt: 240 },
  { initials: "FE", name: "Fatima E.", loc: "London, UK", amt: 360 },
  { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 420 },
  { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 360 },
  { initials: "+5", name: "5 more supporters", loc: "GCC + Europe", amt: 900 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav active="dashboard"/>

      <div className="container bp-back">
        <a href="supporter-dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-2384</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(images/maryam-school.jpg) center/cover"}}>
              <div className="photo-meta"><span>BENEFICIARY · MARYAM A.</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">Education vertical · Year 9 Student</div>
              <h1 className="bp-name">Maryam A.<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>Age 14 · Omdurman → Cairo</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Cairo, Egypt · Al-Manarah School</span>
                <span><Icon name="calendar" size={14}/> Onboarded May 2025</span>
                <span><Icon name="shield" size={14}/> Verified by Cairo partner</span>
              </div>
              <p className="bp-story">When her family was displaced from Omdurman in August 2024, Maryam's secondary education stopped. Through Kushian™, twelve diaspora supporters across Riyadh, Doha, Manchester and Toronto pledged toward her tuition, books, transport and counselling for the academic year — coordinated by a verified Cairo school partner with monthly attestations.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge flow — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message family — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Active campaign</div>
                <div className="num-big">$3,840</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $4,200 GOAL · 91%</div>
                <div className="progress"><div className="progress-fill" style={{width:"91%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Supporters</span>
                  <strong>12</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Coverage</span>
                  <strong>9 months</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Partner</span>
                  <strong>Al-Manarah</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Verification status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully verified</strong></div>
                <p>Identity, displacement and enrolment attested by Cairo partner. Last attestation: 18 Apr 2026.</p>
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
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Maryam was a top-quartile Year 8 student at a public secondary school in Omdurman when conflict displaced her family in August 2024. Her father — a civil engineer at the city water authority — was unable to relocate with the family and remains in Wad Madani.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The family of five reached Cairo in September 2024 through the Aswan corridor. Maryam's mother, a trained nurse, was unable to secure local registration for nine months, during which time Maryam's secondary schooling lapsed.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ pledge funds tuition fees ($2,400/year), books and uniform ($600), daily transport ($480), school meals ($420) and weekly trauma-informed counselling ($300) at Al-Manarah School in Heliopolis — a verified partner with 14 displaced Sudanese students in their 2025/26 cohort.</p>
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
                <h3>12 diaspora supporters</h3>
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
              <h4>Al-Manarah School</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>Heliopolis, Cairo · Established 1998 · Currently hosts 14 displaced Sudanese students in 2025/26.</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Partner profile — coming next")}>Partner profile <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2401</span><span>Yousef A. · Year 7 · Cairo</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2419</span><span>Amira S. · Year 11 · Kampala</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2445</span><span>Tariq M. · University · Doha</span></a>
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
