const { useState } = React;

const DOCS = [
  { name: "National ID · Woman", sub: "Verified · Qatar residency", check: true },
  { name: "Professional credentials", sub: "Finance diploma · CFA Level 1 passed", check: true },
  { name: "Displacement certificate", sub: "UNHCR · Issued Feb 2026", check: true },
  { name: "CPD program enrollment", sub: "AAOIFI Pathway · Scholarship approved", check: true },
  { name: "Employment commitment letter", sub: "Host employer · Conditional offer", check: true },
  { name: "Mentor assignment", sub: "Rasha Salim, Emirates NBD Islamic", check: true }
];

const TIMELINE = [
  { when: "Feb 2026", title: "Displacement from Sudan", desc: "Halima M. relocates to Doha following workplace closure in Khartoum.", state: "done" },
  { when: "Feb 2026", title: "Onboarded to Women & Workforce pool", desc: "Professional background assessed. Returnship and upskilling pathway designed.", state: "done" },
  { when: "Mar 2026", title: "CPD program begins", desc: "AAOIFI Sharia-compliant finance pathway. 12-week intensive modules.", state: "done" },
  { when: "Apr 2026", title: "Mentor pairing completed", desc: "Matched with Rasha Salim (Emirates NBD Islamic). Weekly coaching sessions.", state: "current" },
  { when: "May 2026", title: "Employer interviews", desc: "3 Islamic banking firms conduct interviews. Conditional offers extended.", state: "current" },
  { when: "Sept 2026", title: "Employment placement", desc: "Transition to full-time finance role. Ongoing mentor support.", state: "future" }
];

const SUPPORTERS = [
  { initials: "RS", name: "Rasha Salim", loc: "Emirates NBD Islamic", amt: 600 },
  { initials: "SM", name: "Dr Sarah M.", loc: "Manchester, UK", amt: 400 },
  { initials: "AH", name: "Ahmed H.", loc: "Doha, QA", amt: 400 },
  { initials: "NK", name: "Nouf K.", loc: "Riyadh, SA", amt: 400 }
];

function App() {
  const [tab, setTab] = useState("story");
  return (
    <>
      <Nav side="supporter" depth={2} />

      <div className="container bp-back">
        <a href="../dashboard.html" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="arrow-left" size={14}/> Back to dashboard</a>
        <span style={{color:"var(--line)"}}>·</span>
        <span style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em"}}>CASE K-2890</span>
      </div>

      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <Reveal><div className="bp-photo" style={{background:"url(../../images/case-workforce.jpg) center/cover"}}>
              <div className="photo-meta"><span>PROFESSIONAL · HALIMA M.</span><span>4 : 5</span></div>
            </div></Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">Women & Workforce vertical · Returnship</div>
              <h1 className="bp-name">Halima M.<br/><em style={{fontStyle:"italic",color:"var(--green)"}}>Finance professional · Khartoum → Doha</em></h1>
              <div className="bp-meta">
                <span><Icon name="pin" size={14}/> Doha, Qatar · Islamic finance</span>
                <span><Icon name="calendar" size={14}/> Onboarded Feb 2026</span>
                <span><Icon name="shield" size={14}/> Verified by program partner</span>
              </div>
              <p className="bp-story">Halima, a mid-career finance professional with 6 years' banking experience in Khartoum, was displaced in February 2026. Through Kushian™'s Women & Workforce pool, four diaspora supporters funded a 12-week CPD returnship in Sharia-compliant finance — professional upskilling, mentor coaching from a senior Islamic banker, and employer placement support — positioning her for re-entry into banking across the GCC.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Pledge support — coming next")}>Pledge support <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Message professional — coming next")}>Send a message</button>
                <button className="btn btn-text" onClick={() => showToast("Share case — coming next")}>Share case <Icon name="external" size={14}/></button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="panel">
                <div className="panel-eyebrow">Active campaign</div>
                <div className="num-big">$1,800</div>
                <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",marginTop:6,marginBottom:14}}>OF $3,600 GOAL · 50%</div>
                <div className="progress"><div className="progress-fill" style={{width:"50%"}}></div></div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:18,paddingTop:18,borderTop:"1px dashed var(--line)"}}>
                  <span style={{color:"var(--muted)"}}>Supporters</span>
                  <strong>4</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Program</span>
                  <strong>AAOIFI CPD</strong>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:8}}>
                  <span style={{color:"var(--muted)"}}>Mentor</span>
                  <strong>Rasha Salim</strong>
                </div>
              </div>
              <div className="panel verification">
                <div className="panel-eyebrow">Verification status</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><Icon name="check" size={18}/> <strong>Fully verified</strong></div>
                <p>Credentials and professional background attested by program partner. Last update: 20 Apr 2026.</p>
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
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>Halima is a mid-career finance professional with 6 years' experience as a credit analyst at a major Sudanese bank in Khartoum. She holds a diploma in finance and completed Level 1 of the CFA exam. Her career was disrupted when her employer closed operations in the conflict, forcing her to relocate to Doha in February 2026.</p>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>While she has strong technical skills and banking experience, she faces two barriers: knowledge gaps in Sharia-compliant finance (unfamiliar in her prior role) and a 3-month employment gap that requires confidence-building and credentials refreshment before GCC banks will hire her.</p>
              </div>
              <div className="bp-section">
                <h3>Support requested</h3>
                <p style={{fontSize:16,lineHeight:1.7,color:"var(--ink-soft)"}}>The Kushian™ Women & Workforce pool funds a targeted 12-week returnship: AAOIFI Sharia-compliant finance modules ($1,200), professional certification exam fee ($400), one-on-one mentor coaching with a senior Islamic banker ($800), and employer interview preparation ($400). Rasha Salim, MD of Emirates NBD Islamic, provides weekly guidance and employer introductions at 3 leading Islamic banks in the region.</p>
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
                <h3>4 diaspora supporters</h3>
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
              <div className="panel-eyebrow">Mentor of record</div>
              <h4>Rasha Salim</h4>
              <p style={{fontSize:13,lineHeight:1.6,color:"var(--ink-soft)",margin:"6px 0 12px"}}>MD, Emirates NBD Islamic · 15 years' Islamic banking · Senior Counsel.</p>
              <button className="btn btn-soft sm" onClick={() => showToast("Mentor profile — coming next")}>Mentor profile <Icon name="arrow-up-right" size={14}/></button>
            </div>
            <div className="panel">
              <div className="panel-eyebrow">Similar cases</div>
              <a href="maryam.html" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2384</span><span>Maryam A. · Education · Cairo</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2903</span><span>Layla F. · Women returnship · Riyadh</span></a>
              <a href="#" className="activity-item" style={{color:"var(--ink)",display:"flex"}}><span className="when">K-2915</span><span>Nadia H. · Tech retraining · Dubai</span></a>
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
