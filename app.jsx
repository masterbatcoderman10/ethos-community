// Ethos Community™ landing page

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "mission",
  "typePair": "newsreader"
}/*EDITMODE-END*/;

// ─────── Icons (simple line icons, original) ──────────────────────────────
const Icon = ({ name }) => {
  const props = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "education":
      return <svg {...props}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c2 2 8 2 10 0v-5"/><path d="M21 9v5"/></svg>;
    case "health":
      return <svg {...props}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 12h2v-2h2v2h2"/></svg>;
    case "family":
      return <svg {...props}><circle cx="8" cy="8" r="2.6"/><circle cx="16" cy="8" r="2.6"/><path d="M3 19c0-2.6 2.4-4.6 5-4.6s5 2 5 4.6"/><path d="M11 19c0-2.6 2.4-4.6 5-4.6s5 2 5 4.6"/></svg>;
    case "women":
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M12 12v9"/><path d="M9 18h6"/></svg>;
    case "sme":
      return <svg {...props}><path d="M3 21V9l9-5 9 5v12"/><path d="M9 21v-7h6v7"/><path d="M3 21h18"/></svg>;
    case "legal":
      return <svg {...props}><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-2 6a3 3 0 0 0 6 0l-2-6"/><path d="M19 7l-2 6a3 3 0 0 0 6 0l-2-6"/></svg>;
    case "arrow":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>;
    default: return null;
  }
};

// ─────── Counter ─────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "" }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const dur = 1400, start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * ease));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="counting">{n.toLocaleString()}{suffix}</span>;
};

// ─────── Reveal on scroll ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
};

// ─────── Toast ───────────────────────────────────────────────────────────
let toastTimer;
const showToast = (msg) => {
  let el = document.getElementById("__toast");
  if (!el) { el = document.createElement("div"); el.id = "__toast"; el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
};

// ─────── Hero variants ───────────────────────────────────────────────────
const HeroMission = () => (
  <>
    <div className="eyebrow">Ethos Community™ &nbsp;·&nbsp; Kushian™ Sudan Pilot</div>
    <h1 className="display">A diaspora<br/>rebuilding Sudan,<br/><em>one family at a time.</em></h1>
    <p className="lede">Ethos Community™ is a Connection-as-a-Service platform linking Sudanese diaspora supporters in the GCC, UK, Europe and USA with displaced families, students, women professionals and SMEs through partner-enabled support — under the Kushian™ pilot.</p>
  </>
);
const HeroProposition = () => (
  <>
    <div className="eyebrow">Connection-as-a-Service · CaaS</div>
    <h1 className="display">Six verticals.<br/>One <em>trusted</em><br/>support network.</h1>
    <p className="lede">Education and mentorship, healthcare and Takaful, purpose-linked family support, women empowerment, SME recovery, and legal services — coordinated end-to-end by Kushian™ for displaced Sudanese communities.</p>
  </>
);
const HeroCase = () => (
  <>
    <div className="eyebrow">Featured Beneficiary · Khartoum → Cairo</div>
    <h1 className="display">Maryam, 14,<br/>is back in school<br/><em>because of you.</em></h1>
    <p className="lede">After her family was displaced from Omdurman, twelve diaspora supporters across Riyadh, Doha and Manchester pledged to cover Maryam's tuition, books and counselling for the academic year. Her story is one of thousands.</p>
  </>
);
const HeroImpact = () => (
  <>
    <div className="eyebrow">Live Impact · Demo Cohort</div>
    <h1 className="display"><em>1,247</em> supporters.<br/><em>3,892</em> lives changed.<br/>14 countries.</h1>
    <p className="lede">Every pledge through Ethos Community™ is verified, traceable and partner-delivered. The Kushian™ pilot demonstrates how diaspora capital and expertise scale into measurable outcomes for displaced Sudanese communities.</p>
  </>
);

const HERO_PHOTOS = {
  mission: { caption: "DIASPORA · GCC + EUROPE + UK", overlay: "Diaspora gathering, Riyadh — November 2025", img: "images/hero-mission.jpg" },
  proposition: { caption: "PARTNER NETWORK · 6 VERTICALS", overlay: "Service directory, Kushian™ partner clinic", img: "images/hero-proposition.jpg" },
  case: { caption: "BENEFICIARY · MARYAM, 14", overlay: "Maryam returning to school, Cairo — March 2026", img: "images/maryam-school.jpg" },
  impact: { caption: "PORTFOLIO · 14 COUNTRIES", overlay: "Live impact map · Q2 2026 demo cohort", img: "images/hero-impact.jpg" }
};

// ─────── Verticals ───────────────────────────────────────────────────────
const VERTICALS = [
  { num: "01", icon: "education", title: "Education, CPD & Mentorship", desc: "Credential vault, mentor matching, employability training and graduate support — pathways back to study and work for displaced students.", tags: ["CPD", "Mentorship", "Vault"] },
  { num: "02", icon: "health", title: "Healthcare & Takaful Access", desc: "Partner-enabled medical referrals, clinic directory, hospitalization support, and cooperative Takaful workflows for vulnerable cases.", tags: ["Clinics", "Takaful", "Referrals"] },
  { num: "03", icon: "family", title: "Purpose-Linked Family Support", desc: "Verified family and student profiles with document checklists, supporter pledges and transparent purpose-linked status updates.", tags: ["Pledges", "Verified", "Transparent"] },
  { num: "04", icon: "women", title: "Women Empowerment & Workforce", desc: "Skills bridges, returnship tracks and CPD circles for women professionals and graduates seeking remote and relocated employment.", tags: ["Skills", "Returnship", "CPD"] },
  { num: "05", icon: "sme", title: "SME Recovery Finance & Advisory", desc: "Advisory journeys for relocated Sudanese businesses — Ibrahim's audit practice, Ali's restaurant, Atif's grocery, Dr Afaf's clinic.", tags: ["Advisory", "Recovery", "Diaspora"] },
  { num: "06", icon: "legal", title: "Legal & Professional Services", desc: "Notarised documents, residency and licensing referrals, Sharia-compliance reviews and pro-bono legal support across host countries.", tags: ["Legal", "Sharia", "Pro-bono"] }
];

// ─────── App ─────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.dataset.pair = t.typePair;
  }, [t.typePair]);

  const HeroContent = {
    mission: HeroMission, proposition: HeroProposition, case: HeroCase, impact: HeroImpact
  }[t.heroVariant] || HeroMission;
  const photo = HERO_PHOTOS[t.heroVariant] || HERO_PHOTOS.mission;

  const onCTA = (label) => () => showToast(`${label} — coming next in the prototype`);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo"><span className="logo-mark"></span> Ethos Community™</a>
          <div className="nav-links">
            <a href="#verticals">Services</a>
            <a href="#impact">Impact</a>
            <a href="#how">How it works</a>
            <a href="#founder">About</a>
          </div>
          <div className="nav-cta">
            <a href="supporter-dashboard.html" className="btn btn-ghost">Dashboard</a>
            <button className="btn btn-primary" onClick={onCTA("Support a Case")}>Support a Case <Icon name="arrow"/></button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <Reveal>
            <HeroContent/>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onCTA("Support a Case")}>Support a Case <Icon name="arrow"/></button>
              <button className="btn btn-ghost" onClick={onCTA("Find Services")}>Find Services</button>
              <button className="btn btn-text" onClick={onCTA("View Impact")}>View Impact <span className="arrow">→</span></button>
            </div>
            <div className="hero-meta">
              <div><span>14</span>countries served</div>
              <div><span>6</span>service verticals</div>
              <div><span>2026</span>pilot cohort</div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="photo" style={photo.img ? { background: `url(${photo.img}) center/cover` } : {}}>
              <div className="photo-overlay">{photo.overlay}</div>
              <div className="photo-meta"><span>{photo.caption}</span><span>4 : 5</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section className="strip" id="impact">
        <div className="container strip-grid">
          <div className="stat"><div className="num"><Counter to={1247}/></div><div className="label">Diaspora Supporters</div></div>
          <div className="stat"><div className="num"><Counter to={3892}/></div><div className="label">Lives Reached</div></div>
          <div className="stat"><div className="num"><Counter to={486}/></div><div className="label">Women Onboarded</div></div>
          <div className="stat"><div className="num"><Counter to={142}/></div><div className="label">SMEs Advised</div></div>
          <div className="stat"><div className="num"><Counter to={14}/></div><div className="label">Countries Served</div></div>
        </div>
      </section>

      {/* VERTICALS */}
      <section className="section" id="verticals">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num">§ 01 / Services</div>
              <h2 className="section-title">Six verticals, partner-delivered.</h2>
            </div>
            <p className="section-lede">Each vertical is operated through verified partners — clinics, universities, advisory firms, Takaful operators and legal counsel — coordinated by the Kushian™ platform under a single beneficiary identity.</p>
          </Reveal>

          <div className="verticals">
            {VERTICALS.map((v, i) => (
              <Reveal key={v.num} delay={i * 60} className="vcard" onClick={onCTA(v.title)}>
                <div className="vcard-top">
                  <span className="vcard-num">{v.num}</span>
                  <span className="vcard-arrow"><Icon name="arrow"/></span>
                </div>
                <div className="vcard-icon"><Icon name={v.icon}/></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="tags">{v.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE */}
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num">§ 02 / Featured Case</div>
              <h2 className="section-title">A single pledge, traced end-to-end.</h2>
            </div>
            <p className="section-lede">Every supporter sees the verification trail behind their pledge — beneficiary identity, partner delivery, milestone updates and outcome data. No black boxes.</p>
          </Reveal>
          <Reveal className="case">
            <div className="case-photo" style={{background:"url(images/maryam-school.jpg) center/cover"}}>
              <div className="photo-overlay" style={{color:"#f7f4ee"}}>Maryam, 14 — Omdurman → Cairo</div>
              <div className="photo-meta" style={{color:"rgba(247,244,238,.6)"}}><span>BENEFICIARY · CASE #K-2384</span><span>VERIFIED</span></div>
            </div>
            <div className="case-content">
              <div className="case-eyebrow">Case Study · Education vertical</div>
              <h3>"Maryam was one of 200,000 Sudanese girls out of school. Twelve diaspora supporters changed that."</h3>
              <p>When her family was displaced from Omdurman, Maryam's secondary education stopped. Through Kushian™, twelve supporters across Riyadh, Doha, Manchester and Toronto pledged toward her tuition, books, transport and counselling — coordinated by a verified Cairo school partner.</p>
              <div className="case-stats">
                <div className="case-stat"><div className="num">12</div><div className="label">Supporters</div></div>
                <div className="case-stat"><div className="num">$3,840</div><div className="label">Pledged · Demo</div></div>
                <div className="case-stat"><div className="num">9 mo</div><div className="label">Coverage</div></div>
              </div>
              <div className="case-cta">
                <button className="btn btn-primary" onClick={onCTA("Support a similar case")}>Support a similar case <Icon name="arrow"/></button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" style={{paddingTop:0}}>
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="section-num">§ 03 / How it works</div>
              <h2 className="section-title">Three steps, fully traceable.</h2>
            </div>
            <p className="section-lede">A development-finance grade workflow — KYC-verified beneficiaries, partner-delivered services, and reporting your audit committee can defend.</p>
          </Reveal>
          <div className="steps">
            <Reveal className="step">
              <div className="step-num">01</div>
              <h4>Discover a verified case</h4>
              <p>Browse displaced families, students, women in transition and SMEs in recovery — each with documented identity, location and need, verified by a Kushian™ partner on the ground.</p>
            </Reveal>
            <Reveal delay={120} className="step">
              <div className="step-num">02</div>
              <h4>Pledge purpose-linked support</h4>
              <p>Allocate a pledge against a defined purpose — tuition, hospitalization, working capital advisory, mentorship hours. Pledges are routed through licensed partners, never held by Ethos.</p>
            </Reveal>
            <Reveal delay={240} className="step">
              <div className="step-num">03</div>
              <h4>Track outcomes, not outputs</h4>
              <p>Receive milestone updates, partner attestations and impact metrics. Your supporter dashboard rolls into the Kushian™ portfolio view for diaspora circles and family offices.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section" id="founder" style={{paddingTop:0}}>
        <div className="container">
          <Reveal className="founder">
            <div className="founder-photo" style={{background:"url(images/true_founder_hq.webp) center top/cover"}}>
              <div className="photo-meta"><span>FOUNDER</span><span>4 : 5</span></div>
            </div>
            <div>
              <div className="section-num" style={{marginBottom:14}}>§ 04 / Founder</div>
              <blockquote>Ethos Community™ exists because the Sudanese diaspora has both the capital and the conviction to rebuild — what was missing was the trusted infrastructure to channel it.</blockquote>
              <div className="founder-name">Dr Hatim El Tahir</div>
              <div className="founder-title">Founder · Ethos Community™ · Kushian™ Sudan Pilot</div>
              <div className="credentials">
                <span className="cred">Former Deloitte · Islamic Finance leadership</span>
                <span className="cred">AAOIFI Ethics & Governance Committee</span>
                <span className="cred">IIFM Sukuk Working Group</span>
                <span className="cred">CISI IFQ accredited training</span>
                <span className="cred">Curriculum-development · Takaful</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container">
          <Reveal>
            <h2>The diaspora is ready. Are you?</h2>
            <p>Join the Kushian™ pilot cohort. Pledge to a verified case in under three minutes, or request the Ethos Community™ pitch deck for the IsDB Group Innovation and Startups review.</p>
            <div className="hero-ctas" style={{justifyContent:"center"}}>
              <button className="btn btn-primary" onClick={onCTA("Support a Case")}>Support a Case <Icon name="arrow"/></button>
              <button className="btn btn-ghost" onClick={onCTA("Request pitch deck")}>Request pitch deck</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo"><span className="logo-mark"></span> Ethos Community™</a>
              <p>A Connection-as-a-Service platform connecting Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
            </div>
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#">Support a Case</a></li>
                <li><a href="#">Find Services</a></li>
                <li><a href="#">Impact Dashboard</a></li>
                <li><a href="#">Partner Directory</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Verticals</h5>
              <ul>
                <li><a href="#">Education & CPD</a></li>
                <li><a href="#">Healthcare & Takaful</a></li>
                <li><a href="#">SME Advisory</a></li>
                <li><a href="#">Women & Workforce</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Organisation</h5>
              <ul>
                <li><a href="#">About Kushian™</a></li>
                <li><a href="#">Founder</a></li>
                <li><a href="#">Press & Media</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <p className="compliance">Prototype for demonstration only. Future financial, insurance, healthcare and payment services will be delivered through licensed partners subject to applicable laws and approvals. Ethos Community™ and Kushian™ are demonstration marks shown for the IsDB Group Innovation and Startups Pitch Competition.</p>
          <div className="footer-bottom">
            <span>© 2026 Ethos Community™</span>
            <span>Demo · v0.1 · MVP Prototype</span>
          </div>
        </div>
      </footer>

      {/* Demo watermark */}
      <div className="demo-tag">Prototype · Demo Only</div>

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Hero variant"/>
        <TweakRadio
          label="Focus" value={t.heroVariant}
          options={["mission","proposition","case","impact"]}
          onChange={(v) => setTweak("heroVariant", v)}
        />
        <TweakSection label="Typography"/>
        <TweakRadio
          label="Pairing" value={t.typePair}
          options={[
            { value: "newsreader", label: "Newsreader / Manrope" },
            { value: "dm", label: "DM Serif / DM Sans" },
            { value: "instrument", label: "Instrument / Inter Tight" }
          ]}
          onChange={(v) => setTweak("typePair", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
