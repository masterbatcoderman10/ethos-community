const POOLS = [
  { eyebrow: "POOL · TIER I", title: "Acute & Hospitalization", price: 18, period: "/month", desc: "Pooled supporter contributions covering verified hospitalization, surgery and acute care for displaced families.", bullets: ["Average payout $4,200 per case","Verified by clinical partner","48-hour review SLA","Quarterly impact attestation"], featured: false, supporters: 142 },
  { eyebrow: "POOL · TIER II · MOST CHOSEN", title: "Family Wellbeing & Maternal", desc: "Maternal health, paediatric care, chronic disease management and trauma-informed counselling for families.", price: 32, period: "/month", bullets: ["Maternal & paediatric primary care","Chronic disease management","Counselling included","Diaspora-co-funded pool"], featured: true, supporters: 486 },
  { eyebrow: "POOL · TIER III", title: "Speciality & Long-term Care", desc: "Cardiac, oncology, paediatric specialist and long-term rehabilitation cases. Higher pledge, longer commitment.", price: 64, period: "/month", bullets: ["Cardiac & oncology cases","12-month minimum commitment","Specialist clinical attestation","Concierge case management"], featured: false, supporters: 86 }
];

const HEALTH_CASES = [
  { id: "K-2756", name: "Yasmin H.", desc: "Cardiac surgery — paediatric ASD repair", vert: "Hospitalization", verticalKey: "health", location: "Khartoum, SD → Cairo, EG", since: "Mar 2026", pledged: 4200, target: 8400, progress: 50, status: "urgent", supporters: 6, urgency: "48h remaining" },
  { id: "K-2812", name: "Awad M.", desc: "Hypertension & diabetes management", vert: "Chronic care", verticalKey: "health", location: "Wad Madani, SD", since: "Feb 2026", pledged: 2160, target: 2400, progress: 90, status: "verified", supporters: 9, urgency: null },
  { id: "K-2901", name: "Mariam K.", desc: "Maternal care · third trimester", vert: "Maternal", verticalKey: "health", location: "Kampala, UG", since: "Apr 2026", pledged: 1800, target: 1800, progress: 100, status: "complete", supporters: 7, urgency: null },
  { id: "K-2944", name: "Ahmed S.", desc: "Paediatric oncology · year 2 of treatment", vert: "Oncology", verticalKey: "health", location: "Doha, QA", since: "Aug 2024", pledged: 38400, target: 48000, progress: 80, status: "verified", supporters: 22, urgency: null }
];

const PARTNERS = [
  { letter: "C", name: "Cleopatra Hospital, Cairo", sub: "Tier-I clinical partner", desc: "Surgery, hospitalization and post-acute rehabilitation. 38 cases attested 2025." },
  { letter: "S", name: "Sudan Doctors Network", sub: "Diaspora medical board", desc: "Clinical case review by 240 Sudanese physicians across UK, Canada, GCC." },
  { letter: "M", name: "Mubadala Health, Abu Dhabi", sub: "Specialist referral partner", desc: "Cardiology, oncology and paediatric speciality referrals for displaced families." },
  { letter: "T", name: "Takaful Re-insurance Co.", sub: "Sharia compliance auditor", desc: "Quarterly review of pool structure for Sharia-compliance and donor protection." }
];

function App() {
  return (
    <>
      <Nav active="healthcare"/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 02 · Healthcare & Takaful Pools</div>
              <h1><em>Sharia-compliant</em> pooled care for displaced families.</h1>
              <p>Three tiered Takaful pools covering hospitalization, family wellbeing and specialist long-term care. Every payout is partner-attested, every supporter sees the case files, every quarter is independently audited.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Join pool — coming next")}>Join a pool <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Sharia framework — coming next")}>Read Sharia framework</button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Photo caption="HEALTHCARE · TAKAFUL" overlay="Cleopatra Hospital partner ward, Cairo" img="images/case-healthcare.jpg"/>
            </Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={714}/></div><div className="label">Active members</div></div>
            <div><div className="num"><Counter to={68} prefix="$" suffix="k"/></div><div className="label">Disbursed YTD</div></div>
            <div><div className="num"><Counter to={48} suffix="h"/></div><div className="label">Avg review SLA</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal>
            <div className="urgency-bar">
              <div className="ic"><Icon name="alert" size={16}/></div>
              <div>
                <h4>Yasmin H. · Paediatric cardiac surgery — 48 hours remaining</h4>
                <p>$4,200 pledged of $8,400 needed. Surgery scheduled 12 May 2026 at Cleopatra Hospital.</p>
              </div>
              <a className="btn btn-primary sm" href="beneficiary-profile.html">View case <Icon name="arrow"/></a>
            </div>
          </Reveal>

          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Three Takaful tiers</div>
              <h2>Pick a pool. Or build a pledge.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Each pool is structured as a Sharia-compliant donation arrangement (tabarru'). Funds are not refundable; surplus rolls to the next quarter and is published in the Impact Ledger.</p>
          </Reveal>

          <div className="takaful-grid">
            {POOLS.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`takaful-card ${p.featured ? "featured" : ""}`}>
                  <div className="pool-eyebrow">{p.eyebrow}</div>
                  <h4>{p.title}</h4>
                  <div className="num">${p.price}<small>{p.period}</small></div>
                  <p>{p.desc}</p>
                  <ul>{p.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  <button className={`btn ${p.featured ? "btn-gold" : "btn-soft"} sm`} onClick={() => showToast(`Join ${p.title} — coming next`)}>Join this pool <Icon name="arrow"/></button>
                  <div className="takaful-foot">
                    <span>{p.supporters} supporters</span>
                    <span>Verified · Sharia-audited</span>
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
              <div className="section-num">§ Active cases</div>
              <h2>Real beneficiaries, traceable pledges.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Every healthcare case has clinical attestation, identity verification and an audit trail. Click through to see source documents.</p>
          </Reveal>
          <div className="case-stack">
            {HEALTH_CASES.map((c, i) => (
              <Reveal key={c.id} delay={i * 50}>
                <a href="beneficiary-profile.html" className="case-row" style={{display:"grid",gridTemplateColumns:"80px 1fr 220px 200px 120px",gap:20,alignItems:"center",padding:"20px 0",borderBottom:"1px solid var(--line)",cursor:"pointer"}}>
                  <div style={{width:64,height:64,borderRadius:6,background:"repeating-linear-gradient(135deg,#d8cfba 0,#d8cfba 2px,#cdc3ad 2px,#cdc3ad 8px)"}}></div>
                  <div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--gold-2)",letterSpacing:".1em",textTransform:"uppercase"}}><Icon name="health" size={14} style={{verticalAlign:"-3px"}}/> {c.vert}</div>
                    <h4 style={{fontFamily:"var(--ff-display)",fontSize:20,margin:"4px 0",lineHeight:1.2}}>{c.name}</h4>
                    <div style={{fontSize:14,color:"var(--ink-soft)"}}>{c.desc}</div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--muted)",letterSpacing:".06em",display:"flex",gap:14,flexWrap:"wrap",marginTop:6}}>
                      <span><Icon name="pin" size={12} style={{verticalAlign:"-2px"}}/> {c.location}</span>
                      <span>Case {c.id}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:11,color:"var(--ink-soft)",display:"flex",justifyContent:"space-between"}}><span>${c.pledged.toLocaleString()} / ${c.target.toLocaleString()}</span><span>{c.progress}%</span></div>
                    <div className="progress"><div className="progress-fill" style={{width:`${c.progress}%`}}></div></div>
                    <div style={{fontFamily:"JetBrains Mono, monospace",fontSize:10.5,color:"var(--muted)"}}>{c.supporters} supporters</div>
                  </div>
                  <div>
                    <span className={`tag ${c.status}`}><span className="dot"></span> {c.status === "complete" ? "Complete" : c.status === "verified" ? "Active" : c.status === "urgent" ? c.urgency : "Pending"}</span>
                  </div>
                  <div style={{textAlign:"right",color:"var(--green)"}}><Icon name="arrow-up-right" size={20}/></div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{borderBottom:0}}>
        <div className="container">
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Clinical partners</div>
              <h2>Verification, end-to-end.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Hospitals, diaspora physician boards and re-insurance partners review every case. No pledge moves without clinical attestation.</p>
          </Reveal>
          <div className="partners-row">
            {PARTNERS.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="partner-card">
                  <div className="partner-logo">{p.letter}</div>
                  <div className="sub">{p.sub}</div>
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
      <DemoTag/>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
