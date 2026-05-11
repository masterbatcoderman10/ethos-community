const { useEffect, useRef, useState } = React;

const VERT_BREAKDOWN = [
  { lab: "Education & Mentorship", val: 142, of: 500, color: "" },
  { lab: "Family Support", val: 96, of: 500, color: "" },
  { lab: "SME Recovery", val: 38, of: 500, color: "gold" },
  { lab: "Healthcare & Takaful", val: 124, of: 500, color: "" },
  { lab: "Women & Workforce", val: 68, of: 500, color: "" },
  { lab: "Hospitalization", val: 18, of: 500, color: "red" }
];

const LEDGER = [
  { dt: "08 May", id: "K-2384", desc: "Maryam A. · Term 2 tuition disbursement", partner: "Al-Manarah School", amount: 480, status: "settled" },
  { dt: "07 May", id: "K-2812", desc: "Awad M. · Quarterly chronic-care payout", partner: "Cleopatra Hospital", amount: 540, status: "settled" },
  { dt: "06 May", id: "K-1908", desc: "Awad family · May household stipend", partner: "Kampala Diaspora Org", amount: 800, status: "settled" },
  { dt: "06 May", id: "K-3014", desc: "Dr Afaf O. · Equipment financing tranche 2", partner: "Sharjah CDR", amount: 4800, status: "settled" },
  { dt: "05 May", id: "K-2756", desc: "Yasmin H. · Surgery deposit", partner: "Cleopatra Hospital", amount: 2100, status: "pending" },
  { dt: "04 May", id: "K-2102", desc: "Ibrahim cohort · Final placement bonus", partner: "Riyadh Eng. Institute", amount: 6000, status: "settled" },
  { dt: "03 May", id: "K-2890", desc: "Halima M. · CPD module 3 fees", partner: "AAOIFI Pathway", amount: 360, status: "settled" }
];

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

function App() {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Nav active="impact" side="supporter" depth={1} />

      <section className="imp-hero">
        <div className="container">
          <div className="imp-hero-grid">
            <Reveal>
              <div className="eyebrow">§ Impact dashboard · Live ledger · Q2 2026</div>
              <h1>3,892 lives.<br/><em>Every payout, traceable.</em></h1>
              <p>The Kushian™ Impact Ledger publishes every disbursement, every partner attestation and every Sharia audit — in real time. Independent quarterly review by the Sudan Doctors Network and Takaful Re-insurance Co.</p>
            </Reveal>
            <Reveal delay={120}>
              <Photo caption="BENEFICIARIES · 14 COUNTRIES" overlay="Kushian™ beneficiary community, Q2 2026" img="../images/impact-hero.jpg" dark={true}/>
            </Reveal>
          </div>
          <div className="big-stats">
            <div><div className="num"><Counter to={3892}/></div><div className="label">Lives reached</div><div className="delta">↑ 412 this quarter</div></div>
            <div><div className="num"><Counter to={1.2} prefix="$" suffix="m"/></div><div className="label">Capital structured</div><div className="delta">↑ 18% YoY</div></div>
            <div><div className="num"><Counter to={284}/></div><div className="label">Jobs supported</div><div className="delta">↑ 64 this quarter</div></div>
            <div><div className="num"><Counter to={94} suffix="%"/></div><div className="label">Year-1 retention</div><div className="delta">Stable</div></div>
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
          <Reveal className="block-head">
            <div>
              <div className="section-num">§ Live ledger · Last 7 days</div>
              <h2>Every disbursement, on the record.</h2>
            </div>
            <p style={{fontSize:16,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:480}}>Public, immutable record of all Kushian™ payouts. Click any case to see partner attestation and Sharia review.</p>
          </Reveal>
          <Reveal>
            <div style={{border:"1px solid var(--line)",borderRadius:6,overflow:"hidden",background:"var(--cream)"}}>
              <div className="ledger-row head">
                <div>Date</div><div>Disbursement</div><div>Partner of record</div><div style={{textAlign:"right"}}>Amount</div><div style={{textAlign:"right"}}>Status</div>
              </div>
              {LEDGER.map((l, i) => (
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
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
