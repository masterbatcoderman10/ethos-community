const SMES = [
  { biz: "Healthcare clinic", name: "Dr Afaf Osman", lede: "Dental clinic relocated from Khartoum to Sharjah. Equipment financing, lease structuring and CDR licensing.", raised: 12400, target: 18000, jobs: 6, status: "verified" },
  { biz: "Food & beverage", name: "Beit Karkadeh Co.", lede: "Sudanese restaurant chain expanding from Doha to Riyadh. Working capital and supplier reactivation.", raised: 24000, target: 32000, jobs: 14, status: "verified" },
  { biz: "Logistics", name: "Wadi Halfa Freight", lede: "Cross-border trucking firm rebuilding fleet after asset loss. Equipment leasing and SME advisory.", raised: 9600, target: 14000, jobs: 9, status: "verified" },
  { biz: "Textiles & retail", name: "Khartoum Heritage Atelier", lede: "Women-led textile workshop relocating Cairo. Production line, working capital and e-commerce.", raised: 6400, target: 8800, jobs: 22, status: "urgent" },
  { biz: "Tech services", name: "Nile Code Studio", lede: "Software dev shop returning team to Sudan with hybrid model. Equipment, hosting and bridge funding.", raised: 18200, target: 22000, jobs: 11, status: "verified" },
  { biz: "Education services", name: "Manarat Academy", lede: "Private nursery & primary school re-opening Wad Madani. Premises, payroll bridge and accreditation.", raised: 14800, target: 26000, jobs: 18, status: "pending" }
];

const SERVICES = [
  { ic: "doc", title: "Sharia-compliant capital structuring", desc: "Murabaha, ijara, musharaka and salam structures for working capital, equipment and bridge funding." },
  { ic: "shield", title: "Licensing & relocation advisory", desc: "Host-country licensing — UAE, Saudi, Egypt, Qatar — and re-licensing in Sudan post-recovery." },
  { ic: "growth", title: "Financial recovery diagnostics", desc: "Six-week diagnostic covering balance sheet repair, asset recovery, and 18-month operational plan." },
  { ic: "users", title: "Mentor & advisor matching", desc: "Pairing with diaspora professionals — finance, ops, legal — for a structured 90-day engagement." },
  { ic: "globe", title: "Cross-border supplier reactivation", desc: "Re-establishing supplier relationships, trade credit and freight forwarding across borders." },
  { ic: "calendar", title: "12-month milestone tracking", desc: "Quarterly attestation of jobs created, revenue rebuilt, and Sharia-compliance review." }
];

const ADVISORS = [
  { initials: "HE", name: "Dr Hatim El Tahir", role: "Founder · Sharia & Strategy" },
  { initials: "OB", name: "Omar Bashir", role: "Senior Partner · Deloitte ME" },
  { initials: "RS", name: "Rasha Salim", role: "MD · Emirates NBD Islamic" },
  { initials: "MA", name: "Mohamed Abdalla", role: "Founder · Lattice Capital" },
  { initials: "FK", name: "Fatima Khalid", role: "GC · Riyadh Equity Partners" },
  { initials: "AM", name: "Ahmed Mukhtar", role: "Director · McKinsey GCC" },
  { initials: "NE", name: "Nour El-Bashir", role: "VP · Mubadala Ventures" },
  { initials: "TI", name: "Tarek Ibrahim", role: "Partner · Allen & Overy" }
];

const FINANCE_CHECKLIST = [
  { label: "Business Registered",       status: "complete" },
  { label: "Licensed & Permitted",      status: "complete" },
  { label: "Tax Compliant",             status: "in_progress" },
  { label: "Audited Financials",        status: "in_progress" },
  { label: "Cash-Flow Statement Ready", status: "pending" },
  { label: "Finance Partner Matched",   status: "pending" }
];

const FINANCE_PARTNERS = [
  { icon: "shield", title: "Islamic Murabaha Financing", desc: "Asset-backed, Sharia-compliant working capital for registered SMEs." },
  { icon: "trend",  title: "Microfinance",               desc: "Small-scale working capital from verified microfinance partners." },
  { icon: "globe",  title: "Development Finance",        desc: "IsDB member-country facilities for displacement-affected SMEs." },
  { icon: "sme",    title: "Trade Finance",              desc: "Export/import credit lines and documentary collections." }
];

function App() {
  return (
    <>
      <Nav active="sme" side="supporter" depth={1} />

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 03 · SME Recovery & Advisory</div>
              <h1>Rebuilding livelihoods, <em>one balance sheet at a time</em>.</h1>
              <p>Sharia-compliant working capital, licensing advisory, mentor pairing and 12-month milestone tracking — for Sudanese SMEs displaced or rebuilding in Sudan, the GCC and East Africa.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Browse SMEs — coming next")}>Browse 38 SMEs <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Apply for advisory — coming next")}>Apply for advisory</button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Photo caption="SME RECOVERY · ADVISORY" overlay="Dr Afaf Osman's clinic, Sharjah relocation" img="../images/sme-hero.jpg"/>
            </Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={38}/></div><div className="label">Active SMEs</div></div>
            <div><div className="num"><Counter to={284}/></div><div className="label">Jobs supported</div></div>
            <div><div className="num"><Counter to={1.2} suffix="m" prefix="$"/></div><div className="label">Capital structured</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Active SMEs</div>
              <h2>Six businesses, currently raising.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Each SME has been through diagnostic review and is partnered with a Kushian™ advisor. Pledges are structured as Sharia-compliant capital — not donations.</p>
          </Reveal>
          <div className="sme-grid">
            {SMES.map((s, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="sme-card" onClick={() => showToast(`${s.name} profile — coming next`)}>
                  <div>
                    <div className="biz">{s.biz}</div>
                    <h3>{s.name}</h3>
                    <p className="lede">{s.lede}</p>
                    <span className={`tag ${s.status}`}><span className="dot"></span>{s.status === "verified" ? "Diagnostic complete" : s.status === "urgent" ? "Urgent · 14 days" : "Pending review"}</span>
                  </div>
                  <div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--ink-soft)",display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span>${s.raised.toLocaleString()} structured</span>
                      <span>{Math.round(s.raised/s.target*100)}%</span>
                    </div>
                    <div className="progress"><div className="progress-fill" style={{width:`${s.raised/s.target*100}%`}}></div></div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:10.5,color:"var(--muted)",marginTop:6}}>OF ${s.target.toLocaleString()} TARGET</div>
                    <div className="stats">
                      <div><strong>{s.jobs}</strong>Jobs supported</div>
                      <div><strong>12mo</strong>Milestone track</div>
                    </div>
                  </div>
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
              <div className="section-num">§ Workflow</div>
              <h2>From diagnostic to deployment in 90 days.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Every SME follows the same four-stage recovery track. Independent Sharia review and milestone attestations published quarterly.</p>
          </Reveal>
          <Reveal>
            <div className="workflow">
              {[
                { num: "01", title: "Diagnostic", desc: "Six-week intake. Balance sheet, asset position, jurisdictional analysis." },
                { num: "02", title: "Structuring", desc: "Sharia-compliant capital plan with diaspora advisors and pool committee." },
                { num: "03", title: "Pledge & deploy", desc: "Capital pledged, structured and deployed. Diaspora supporters onboarded." },
                { num: "04", title: "Track 12 months", desc: "Quarterly attestations. Jobs, revenue, Sharia-compliance review." }
              ].map((s, i) => (
                <div key={i} className="wf-step">
                  <div className="num">STAGE {s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Services</div>
              <h2>What advisory looks like.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Six core service lines, delivered by diaspora professionals and Kushian™ partners.</p>
          </Reveal>
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="svc">
                  <div className="ic"><Icon name={s.ic} size={18}/></div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{borderBottom:0}}>
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Advisory bench</div>
              <h2>Senior diaspora professionals, on call.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>26 advisors — finance, legal, ops, strategy — across the GCC, UK and North America. Average 18 years of seniority.</p>
          </Reveal>
          <div className="advisor-row">
            {ADVISORS.map((a, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="advisor">
                  <div className="ava">{a.initials}</div>
                  <h4>{a.name}</h4>
                  <div className="role">{a.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal className="block-head">
            <div><div className="section-num">§ Finance Readiness</div><h2>Know where you stand before you apply.</h2></div>
            <p style={{fontSize:16,lineHeight:1.65,color:"var(--ink-soft)",maxWidth:480}}>Structured checklist to assess your SME's readiness for Sharia-compliant financing. Ambassadors use this to prepare a tailored referral.</p>
          </Reveal>
          <div className="sme-finance-grid">
            <Reveal>
              <div className="sme-checklist-panel">
                <h3>Finance-Readiness Checklist</h3>
                <Checklist items={FINANCE_CHECKLIST}/>
                <button className="btn btn-ghost" style={{marginTop:24}} onClick={() => showToast("Download readiness guide — coming next")}>Download Readiness Guide <Icon name="download" size={16}/></button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="sme-cashflow-panel">
                <h3>Cash-Flow Snapshot</h3>
                <div className="sme-cashflow-table">
                  <div className="sme-cf-row header"><span>Item</span><span>Month 1</span><span>Month 3</span><span>Month 6</span></div>
                  <div className="sme-cf-row"><span>Revenue</span><span>$4,200</span><span>$8,600</span><span>$14,800</span></div>
                  <div className="sme-cf-row"><span>Operating Costs</span><span>$3,100</span><span>$5,800</span><span>$9,200</span></div>
                  <div className="sme-cf-row positive"><span>Net Cash Flow</span><span>$1,100</span><span>$2,800</span><span>$5,600</span></div>
                </div>
                <p style={{fontSize:13,color:"var(--muted)",marginTop:12}}>Sample projection — Sudanese grocery SME, Riyadh · Pre-financing baseline</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Finance Partners</div><h2>Sharia-compliant finance referrals.</h2></div></Reveal>
          <div className="sme-finance-partners">
            {FINANCE_PARTNERS.map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="sme-finance-partner-card">
                  <div className="sme-fp-icon"><Icon name={p.icon} size={28}/></div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <button className="btn btn-ghost sm" onClick={() => showToast(`${p.title} referral sent`)}>Apply for Referral <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer depth={1} />
      <DemoTag/>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
