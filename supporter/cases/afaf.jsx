const { useState } = React;

const DOCS = [
  { name: "Business license · Sudan", sub: "Verified · Original archived", check: true },
  { name: "UAE business establishment permit", sub: "Dubai DED · In progress", check: true },
  { name: "Clinic lease agreement", sub: "Sharjah · 36-month term", check: true },
  { name: "Equipment manifest", sub: "Dental chairs, autoclave, tools", check: true },
  { name: "Professional credentials", sub: "DDS degree · UAE licensing pending", check: true },
  { name: "Financial audit", sub: "2024 clinic accounts · Verified", check: true }
];

const TIMELINE = [
  { when: "Jan 2026", title: "Clinic relocation decision", desc: "Dr Afaf decides to relocate dental practice from Khartoum to Sharjah, UAE.", state: "done" },
  { when: "Feb 2026", title: "Onboarded to SME Recovery pool", desc: "Diagnostic completed. 18-month business restart plan approved.", state: "done" },
  { when: "Mar 2026", title: "Lease secured", desc: "Prime location clinic space signed for 36 months in Sharjah CBD.", state: "done" },
  { when: "Apr 2026", title: "Capital structuring completed", desc: "Murabaha financing for equipment approved. Pledge campaign opened.", state: "done" },
  { when: "May 2026", title: "Fit-out begins", desc: "Clinic renovation and equipment installation. Target opening: June 2026.", state: "current" },
  { when: "Sept 2026", title: "6-month operational review", desc: "Patient acquisition, revenue, team hiring and compliance attestation.", state: "future" }
];

const SUPPORTERS = [
  { initials: "OB", name: "Omar Bashir", loc: "Deloitte ME", amt: 4800 },
  { initials: "RS", name: "Rasha Salim", loc: "Emirates NBD", amt: 4000 },
  { initials: "MA", name: "Mohamed Abdalla", loc: "Lattice Capital", amt: 3600 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav side="supporter" depth={2} />

      <div className="container bp-back">
        <a href="../dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-3014</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(../../images/sme-hero.jpg) center/cover"}}>
              <div className="photo-meta"><span>ENTREPRENEUR · DR AFAF OSMAN</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">SME Recovery vertical · Healthcare clinic</div>
              <h1 className="bp-name">Dr Afaf Osman<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>Dentist · Khartoum → Sharjah</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Sharjah, UAE · Clinic relocation</span>
                <span><Icon name="calendar" size={14}/> Project start Jan 2026</span>
                <span><Icon name="shield" size={14}/> Verified by advisor board</span>
              </div>
              <p className="bp-story">Dr Afaf Osman, a licensed dentist with 12 years' practice in Khartoum, is relocating her dental clinic to Sharjah following displacement. Through Kushian™'s SME Recovery pool, three diaspora advisors and financial partners structured Sharia-compliant Murabaha financing for equipment, clinic setup and working capital — supporting both business restart and job creation for 6 displaced dental hygienists.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge support — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message entrepreneur — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Active campaign</div>
                <div className="num-big">$12,400</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $18,000 GOAL · 69%</div>
                <div className="progress"><div className="progress-fill" style={{width:"69%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Financiers</span>
                  <strong>3</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Jobs created</span>
                  <strong>6</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Structure</span>
                  <strong>Murabaha</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Verification status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully verified</strong></div>
                <p>Credentials, business plan and Sharia compliance attested by advisor board. Last review: 18 Apr 2026.</p>
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
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Dr Afaf Osman is a licensed dentist with a private practice in Khartoum's Al-Riyadh district since 2014. She employs six dental hygienists and operates as a primary care provider for underserved neighborhoods. Conflict in 2024 forced her to close operations and relocate to Sharjah in January 2026.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>With 12 years' experience and an established patient base among Sudanese diaspora in the GCC, she has immediate demand for services. The primary barrier is capital for clinic setup — equipment, lease deposit and working capital.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ SME pool structures $18,000 of Sharia-compliant Murabaha financing: equipment and autoclave ($8,000), clinic lease deposit and fit-out ($6,000), working capital ($3,000), and professional licensing ($1,000). The clinic targets revenue breakeven by month 8 and profitability by month 12, with quarterly milestones tracked by the advisor board.</p>
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
                <h3>3 diaspora financiers</h3>
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
              <div className="panel-eyebrow">Advisor of record</div>
              <h4>Sharia & Strategy Board</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>Dr Hatim El Tahir (founder), Omar Bashir (Deloitte), Rasha Salim (Emirates NBD)</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Advisor profiles — coming next")}>Advisor profiles <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-3008</span><span>Beit Karkadeh · F&B · Doha</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-3022</span><span>Nile Code Studio · Tech · Khartoum</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-3045</span><span>Wadi Halfa Freight · Logistics · EAC</span></a>
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
