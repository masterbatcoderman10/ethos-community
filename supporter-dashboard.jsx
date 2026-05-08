const { useState } = React;

const PERSONAS = [
  { id: "sarah", name: "Dr Sarah Mahmoud", role: "Consultant Cardiologist · Manchester, UK", initials: "SM", greeting: "Welcome back, Dr Sarah." },
  { id: "osman", name: "Prof. Osman Idris", role: "Professor of Finance · KAUST, Saudi Arabia", initials: "OI", greeting: "Welcome back, Professor Osman." },
  { id: "khalid", name: "Khalid Abdelrahman", role: "Family Office Principal · Dubai, UAE", initials: "KA", greeting: "Welcome back, Khalid." },
  { id: "hassan", name: "Hassan Yousif", role: "Software Engineer · Toronto, Canada", initials: "HY", greeting: "Welcome back, Hassan." }
];

const CASES = [
  { id: "K-2384", name: "Maryam A.", desc: "Year 9 student, displaced from Omdurman", vert: "Education", verticalKey: "education", location: "Cairo, EG", since: "Sept 2025", pledged: 3840, target: 4200, progress: 91, status: "verified", supporters: 12, urgency: null, img: "images/maryam-school.jpg" },
  { id: "K-1908", name: "Awad Family", desc: "5 dependents, father seeking work", vert: "Family Support", verticalKey: "family", location: "Kampala, UG", since: "Jul 2025", pledged: 6240, target: 9600, progress: 65, status: "verified", supporters: 8, urgency: null, img: "images/case-family.jpg" },
  { id: "K-3014", name: "Dr Afaf O.", desc: "Dental clinic relocation advisory", vert: "SME Recovery", verticalKey: "sme", location: "Sharjah, AE", since: "Jan 2026", pledged: 12400, target: 18000, progress: 69, status: "verified", supporters: 4, urgency: null, img: "images/sme-hero.jpg" },
  { id: "K-2756", name: "Yasmin H.", desc: "Hospitalization · cardiac surgery", vert: "Healthcare", verticalKey: "health", location: "Khartoum, SD", since: "Mar 2026", pledged: 4200, target: 8400, progress: 50, status: "urgent", supporters: 6, urgency: "48h remaining", img: "images/case-healthcare.jpg" },
  { id: "K-2102", name: "Ibrahim Engineering Cohort", desc: "12 graduate engineers · CPD return-track", vert: "Education", verticalKey: "education", location: "Riyadh, SA", since: "Aug 2025", pledged: 14400, target: 14400, progress: 100, status: "complete", supporters: 22, urgency: null, img: "images/education-cpd.jpg" },
  { id: "K-2890", name: "Halima M.", desc: "Women's returnship programme · finance", vert: "Women & Workforce", verticalKey: "women", location: "Doha, QA", since: "Feb 2026", pledged: 1800, target: 3600, progress: 50, status: "pending", supporters: 3, urgency: null, img: "images/case-workforce.jpg" }
];

const VERT_ICON = { education:"education", family:"family", sme:"sme", health:"health", women:"women" };

const ACTIVITY = [
  { when: "2h", text: "Cairo school partner posted Term 2 attendance attestation for Maryam A. · 100% present" },
  { when: "1d", text: "Hospitalization milestone reached for Yasmin H. · Surgery scheduled 12 May 2026" },
  { when: "2d", text: "Dr Afaf O. lease signed · clinic fit-out begins 15 May 2026" },
  { when: "4d", text: "8 new diaspora supporters joined the Manchester chapter" },
  { when: "1w", text: "Ibrahim cohort graduation ceremony · 12 of 12 placed" }
];

function App() {
  const [persona, setPersona] = useState(PERSONAS[0]);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? CASES : CASES.filter(c => c.status === filter);
  const totalPledged = CASES.reduce((s, c) => s + c.pledged, 0);
  const livesReached = CASES.reduce((s, c) => s + (c.id.includes("Cohort") ? 12 : 1) * (c.status !== "pending" ? 1 : 0), 0) + 28;

  return (
    <>
      <Nav active="dashboard"/>

      <section className="dash-hero">
        <div className="container">
          <div className="dash-hero-grid">
            <div>
              <div className="eyebrow">Supporter Dashboard · Live Cohort</div>
              <h1 className="dash-greet">{persona.greeting.split("Welcome back, ")[1] ? <>Welcome back,<br/><em>{persona.greeting.split("Welcome back, ")[1].replace(".","")}.</em></> : persona.greeting}</h1>
              <div className="persona-strip">
                {PERSONAS.map(p => (
                  <button key={p.id} className={`persona-pill ${persona.id === p.id ? "active" : ""}`} onClick={() => setPersona(p)}>
                    <span className="ava">{p.initials}</span>
                    {p.name.replace("Dr ","").replace("Prof. ","").split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="section-num">Active session</div>
              <div style={{fontFamily:"var(--ff-display)",fontSize:24,marginTop:8}}>{persona.name}</div>
              <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,letterSpacing:".08em",color:"var(--muted)",textTransform:"uppercase",marginTop:4}}>{persona.role}</div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
                <button className="btn btn-soft sm" onClick={() => showToast("Profile settings — coming next")}>Settings</button>
                <button className="btn btn-primary sm" onClick={() => showToast("New pledge flow — coming next")}><Icon name="plus" size={14}/> New pledge</button>
              </div>
            </div>
          </div>

          <div className="summary-grid">
            <div className="sum-card">
              <div className="label">Total Pledged · YTD</div>
              <div className="num"><Counter to={totalPledged} prefix="$"/></div>
              <div className="delta">↑ 24% vs last quarter</div>
            </div>
            <div className="sum-card">
              <div className="label">Active Cases</div>
              <div className="num"><Counter to={CASES.filter(c => c.status !== "complete").length}/></div>
              <div className="delta">2 awaiting verification</div>
            </div>
            <div className="sum-card">
              <div className="label">Lives Reached</div>
              <div className="num"><Counter to={livesReached}/></div>
              <div className="delta">↑ 6 this month</div>
            </div>
            <div className="sum-card">
              <div className="label">Partner Verifications</div>
              <div className="num"><Counter to={18}/></div>
              <div className="delta">All up to date</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="dash-body">
          <div>
            <div className="filter-bar">
              {["all","verified","urgent","pending","complete"].map(f => (
                <button key={f} className={`chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                  {f === "all" ? "All cases" : f.charAt(0).toUpperCase() + f.slice(1)} {f === "all" ? `· ${CASES.length}` : `· ${CASES.filter(c=>c.status===f).length}`}
                </button>
              ))}
              <span className="spacer"></span>
              <button className="chip" onClick={() => showToast("Export — coming next")}><Icon name="download" size={12}/> Export</button>
              <button className="chip" onClick={() => showToast("Filter sheet — coming next")}><Icon name="filter" size={12}/> More filters</button>
            </div>

            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={i * 50}>
                <a href="beneficiary-profile.html" className="case-row" style={{display:"grid"}}>
                  <div className="ava-wrap" style={c.img ? {background:`url(${c.img}) center/cover`} : {}}></div>
                  <div>
                    <div className="vert"><Icon name={VERT_ICON[c.verticalKey]} size={14} style={{verticalAlign:"-3px"}}/> {c.vert}</div>
                    <h4>{c.name}</h4>
                    <div style={{fontSize:14,color:"var(--ink-soft)",lineHeight:1.5}}>{c.desc}</div>
                    <div className="case-meta">
                      <span><Icon name="pin" size={12} style={{verticalAlign:"-2px"}}/> {c.location}</span>
                      <span><Icon name="calendar" size={12} style={{verticalAlign:"-2px"}}/> Since {c.since}</span>
                      <span>Case {c.id}</span>
                    </div>
                  </div>
                  <div className="progress-cell">
                    <div className="pct"><span>${c.pledged.toLocaleString()} / ${c.target.toLocaleString()}</span><span>{c.progress}%</span></div>
                    <div className="progress"><div className="progress-fill" style={{width:`${c.progress}%`}}></div></div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:10.5,color:"var(--muted)",letterSpacing:".06em"}}>{c.supporters} supporters</div>
                  </div>
                  <div>
                    <span className={`tag ${c.status}`}><span className="dot"></span> {c.status === "complete" ? "Complete" : c.status === "verified" ? "Verified · Active" : c.status === "urgent" ? `Urgent · ${c.urgency}` : "Pending verification"}</span>
                  </div>
                  <div style={{textAlign:"right",color:"var(--green)"}}><Icon name="arrow-up-right" size={20}/></div>
                </a>
              </Reveal>
            ))}
          </div>

          <aside>
            <div className="panel">
              <div className="panel-eyebrow">Activity feed</div>
              {ACTIVITY.map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="when">{a.when}</span>
                  <span style={{color:"var(--ink-soft)"}}>{a.text}</span>
                </div>
              ))}
            </div>

            <div className="panel" style={{background:"var(--green)",color:"var(--cream)",borderColor:"var(--green)"}}>
              <div className="panel-eyebrow" style={{color:"var(--gold)"}}>Featured this month</div>
              <h4 style={{color:"var(--cream)"}}>Manchester diaspora circle</h4>
              <p style={{fontSize:13.5,lineHeight:1.6,color:"rgba(247,244,238,.78)",margin:"8px 0 16px"}}>32 supporters from the NHS Sudanese physicians network are co-funding 4 hospitalization cases this quarter. Join their pledge.</p>
              <button className="btn btn-gold sm" onClick={() => showToast("Join Manchester circle — coming next")}>Join the circle <Icon name="arrow"/></button>
            </div>

            <div className="panel">
              <div className="panel-eyebrow">Suggested for you</div>
              <h4>Healthcare verticals</h4>
              <p style={{fontSize:13.5,lineHeight:1.6,color:"var(--ink-soft)",margin:"8px 0 16px"}}>Based on your medical background, 3 hospitalization cases are seeking clinical attestation from a consultant cardiologist.</p>
              <a className="btn btn-soft sm" href="healthcare.html">View healthcare cases <Icon name="arrow"/></a>
            </div>
          </aside>
        </div>
      </section>

      <Footer/>
      <DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
