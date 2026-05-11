const PRODUCTS = [
  { name: "Sesame",     icon: "sme",     volume: "520,000 MT/yr", demand: "high",   desc: "Sudan's largest agricultural export. Key global input for tahini, oil and food manufacturing. Supply disrupted." },
  { name: "Arabic Gum", icon: "globe",   volume: "80,000 MT/yr",  demand: "high",   desc: "Sudan produces 70% of the world's gum arabic. Critical for confectionery, beverages, pharma and printing." },
  { name: "Karkadi",    icon: "heart",   volume: "12,000 MT/yr",  demand: "medium", desc: "Premium dried hibiscus. Growing demand for specialty beverages, health drinks and natural dyes." },
  { name: "Baobab",     icon: "trend",   volume: "4,000 MT/yr",   demand: "medium", desc: "Emerging superfood with growing European and US demand. Rich in vitamin C, fibre and antioxidants." }
];

const CORRIDORS = ["Cairo, Egypt","Dubai & Abu Dhabi, UAE","Riyadh, KSA","London, UK","Rotterdam, Netherlands","Singapore"];

const TRADERS = [
  { name: "Nile Agro Export Ltd",    product: "Sesame",     loc: "Khartoum → Dubai",       status: "export_ready", raised: 8400,  target: 20000 },
  { name: "Sahel Gum Trading Co.",   product: "Arabic Gum", loc: "Kordofan → Rotterdam",   status: "doc_pending",  raised: 2100,  target: 15000 },
  { name: "Eastern Karkadi Guild",   product: "Karkadi",    loc: "Kassala → London",       status: "early_stage",  raised: 600,   target: 8000 },
  { name: "Baobab Heritage Foods",   product: "Baobab",     loc: "Darfur → Amsterdam",     status: "export_ready", raised: 3200,  target: 10000 },
  { name: "Red Sea Grain Alliance",  product: "Sesame",     loc: "Port Sudan → Singapore", status: "doc_pending",  raised: 5600,  target: 25000 },
  { name: "Omdurman Naturals",       product: "Karkadi",    loc: "Omdurman → Paris",       status: "early_stage",  raised: 400,   target: 6000 }
];

const STATUS_LABEL = { export_ready: "Export Ready", doc_pending: "Docs Pending", early_stage: "Early Stage" };
const STATUS_CLS   = { export_ready: "status-ready", doc_pending: "status-pending", early_stage: "status-early" };

const TRADER_CHECKLIST = (status) => [
  { label: "Business registered",    status: "complete" },
  { label: "Export documentation",   status: status === "export_ready" ? "complete" : status === "doc_pending" ? "in_progress" : "pending" },
  { label: "Finance partner matched", status: status === "export_ready" ? "in_progress" : "pending" }
];

const DOC_CHECKLIST = [
  { label: "Export Licence",               status: "complete" },
  { label: "Phytosanitary Certificate",    status: "complete" },
  { label: "Certificate of Origin",        status: "complete" },
  { label: "Commercial Invoice",           status: "in_progress" },
  { label: "Packing List",                 status: "in_progress" },
  { label: "Bill of Lading",               status: "pending" }
];

const FINANCE_OPTIONS = [
  { icon: "shield", title: "Islamic Murabaha",  desc: "Asset-backed, Sharia-compliant trade finance for export working capital." },
  { icon: "trend",  title: "Export Credit",     desc: "Pre-shipment and post-shipment credit from development finance partners." },
  { icon: "users",  title: "Microfinance",      desc: "Small-scale working capital for early-stage traders and cooperatives." },
  { icon: "globe",  title: "Trade Finance",     desc: "Letters of credit, documentary collections and supply chain financing." }
];

function App() {
  return (
    <>
      <Nav active="trade" side="supporter" depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 07 · Trade Corridor Recovery</div>
              <h1>Protecting Sudanese export <em>livelihoods</em>.</h1>
              <p>From sesame to baobab — product profiling, export-readiness, buyer introductions and Islamic trade finance referrals for displaced Sudanese traders.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast("Profile your business — coming next")}>Profile Your Business <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast("Trade finance options — coming next")}>Trade Finance Options</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="TRADE · EXPORT · RECOVERY" overlay="Sesame processing, Port Sudan 2026"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={6}/></div><div className="label">Trade corridors</div></div>
            <div><div className="num"><Counter to={4}/></div><div className="label">Export products</div></div>
            <div><div className="num"><Counter to={38}/></div><div className="label">Traders profiled</div></div>
            <div><div className="num"><Counter to={2.4} suffix="M"/></div><div className="label">USD facilitated</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Products</div><h2>Four strategic Sudanese exports.</h2></div></Reveal>
          <div className="pt-products">
            {PRODUCTS.map((p,i) => (
              <Reveal key={i} delay={i*60}>
                <div className="pt-product-card">
                  <Photo caption={p.name.toUpperCase()} overlay={p.name}/>
                  <div className="pt-product-body">
                    <div className="pt-product-top">
                      <h3>{p.name}</h3>
                      <span className={`pt-demand pt-demand-${p.demand}`}>{p.demand === "high" ? "High Demand" : "Medium Demand"}</span>
                    </div>
                    <div className="pt-product-vol">{p.volume}</div>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-corridors-section">
        <div className="container">
          <Reveal>
            <div className="section-num">§ Trade Corridors</div>
            <h2>Sudan's export network, rebuilt.</h2>
            <div className="pt-corridor-map">
              <div className="pt-corridor-origin">
                <div className="pt-corridor-dot origin"></div>
                <div className="pt-corridor-origin-label">Sudan / Port Sudan</div>
              </div>
              <div className="pt-corridor-lines">
                {CORRIDORS.map((c,i) => (
                  <div key={i} className="pt-corridor-row">
                    <div className="pt-corridor-line"></div>
                    <div className="pt-corridor-dest"><div className="pt-corridor-dot"></div><span>{c}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Traders</div><h2>Active trader profiles.</h2></div></Reveal>
          <div className="pt-traders">
            {TRADERS.map((t,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="pt-trader-card">
                  <div className="pt-trader-top">
                    <div><h4>{t.name}</h4><div className="pt-trader-meta"><Icon name="pin" size={12}/> {t.loc}</div></div>
                    <span className={`pt-status ${STATUS_CLS[t.status]}`}>{STATUS_LABEL[t.status]}</span>
                  </div>
                  <div className="pt-trader-product"><PurposeBadge category="sme"/> {t.product}</div>
                  <Checklist items={TRADER_CHECKLIST(t.status)}/>
                  <CaseProgressBar raised={t.raised} target={t.target}/>
                  <button className="btn btn-ghost sm" style={{marginTop:12}} onClick={() => showToast(`Support request sent for ${t.name}`)}>Request Support <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div className="pt-doc-finance-grid">
            <Reveal>
              <div className="section-num">§ Documentation</div>
              <h2>Export documentation checklist.</h2>
              <p style={{color:"var(--ink-soft)",marginBottom:24,lineHeight:1.65}}>Required documents for standard Sudanese agricultural exports. Platform assists with authentication and submission.</p>
              <Checklist items={DOC_CHECKLIST}/>
              <button className="btn btn-ghost" style={{marginTop:24}} onClick={() => showToast("Download documentation guide — coming next")}>Download Guide <Icon name="download" size={16}/></button>
            </Reveal>
            <Reveal delay={120}>
              <div className="section-num">§ Finance</div>
              <h2>Finance-readiness referrals.</h2>
              <p style={{color:"var(--ink-soft)",marginBottom:24,lineHeight:1.65}}>Connect with Sharia-compliant and development finance partners for export working capital.</p>
              <div className="pt-finance-options">
                {FINANCE_OPTIONS.map((f,i) => (
                  <div key={i} className="pt-finance-card">
                    <div className="pt-finance-icon"><Icon name={f.icon} size={22}/></div>
                    <div><strong>{f.title}</strong><p>{f.desc}</p></div>
                    <button className="btn btn-ghost sm" onClick={() => showToast(`${f.title} referral sent`)}>Apply <Icon name="arrow" size={14}/></button>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
