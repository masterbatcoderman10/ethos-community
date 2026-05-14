import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon.jsx';
import Counter from '../components/Counter.jsx';
import Reveal from '../components/Reveal.jsx';
import KushianBadge from '../components/KushianBadge.jsx';
import PartnershipStrip from '../components/PartnershipStrip.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import { showToast } from '../components/Toast.jsx';
import { Link } from 'react-router-dom';
import './Landing.css';
import { getEthosRole, roleToSide, sideDashboardUrl } from '../utils/role.js';

// ─────── Hero variants ───────────────────────────────────────────────────
const HeroMission = () => (
  <>
    <div className="eyebrow">Kushian™ &nbsp;·&nbsp; Powered by Ethos Community™</div>
    <div className="hero-eyebrow-kushian"><KushianBadge variant="full"/></div>
    <h1 className="display">A diaspora<br/>rebuilding Sudan,<br/><em>one family at a time.</em></h1>
    <p className="lede">Kushian™ is powered by Ethos Community™, a Connection-as-a-Service platform linking Sudanese diaspora supporters in the GCC, UK, Europe and USA with displaced families, students, women professionals and SMEs through partner-enabled support.</p>
  </>
);
const HeroProposition = () => (
  <>
    <div className="eyebrow">Connection-as-a-Service · CaaS</div>
    <div className="hero-eyebrow-kushian"><KushianBadge variant="full"/></div>
    <h1 className="display">Six verticals.<br/>One <em>trusted</em><br/>support network.</h1>
    <p className="lede">Education and mentorship, healthcare and Takaful, purpose-linked family support, women empowerment, SME recovery, and legal services — coordinated end-to-end by Kushian™ for displaced Sudanese communities.</p>
  </>
);
const HeroCase = () => (
  <>
    <div className="eyebrow">Featured Beneficiary · Khartoum → Cairo</div>
    <div className="hero-eyebrow-kushian"><KushianBadge variant="full"/></div>
    <h1 className="display">Maryam, 14,<br/>is back in school<br/><em>because of you.</em></h1>
    <p className="lede">After her family was displaced from Omdurman, twelve diaspora supporters across Riyadh, Doha and Manchester pledged to cover Maryam's tuition, books and counselling for the academic year. Her story is one of thousands.</p>
  </>
);
const HeroImpact = () => (
  <>
    <div className="eyebrow">Live Impact · Demo Cohort</div>
    <div className="hero-eyebrow-kushian"><KushianBadge variant="full"/></div>
    <h1 className="display"><em>1,247</em> supporters.<br/><em>3,892</em> lives changed.<br/>14 countries.</h1>
    <p className="lede">Every pledge through Kushian™ is verified, traceable and partner-delivered. Powered by Ethos Community™, the platform demonstrates how diaspora capital and expertise scale into measurable outcomes for displaced Sudanese communities.</p>
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
  { num: "01", icon: "education", title: "Education, CPD & Mentorship", desc: "Credential vault, mentor matching, employability training and graduate support — pathways back to study and work for displaced students.", tags: ["CPD", "Mentorship", "Vault"], href: "/supporter/education" },
  { num: "02", icon: "health", title: "Healthcare & Takaful Access", desc: "Partner-enabled medical referrals, clinic directory, hospitalization support, and cooperative Takaful workflows for vulnerable cases.", tags: ["Clinics", "Takaful", "Referrals"], href: "/supporter/healthcare" },
  { num: "03", icon: "family", title: "Purpose-Linked Family Support", desc: "Verified family and student profiles with document checklists, supporter pledges and transparent purpose-linked status updates.", tags: ["Pledges", "Verified", "Transparent"], href: "/supporter/cases/awad" },
  { num: "04", icon: "women", title: "Women Empowerment & Workforce", desc: "Skills bridges, returnship tracks and CPD circles for women professionals and graduates seeking remote and relocated employment.", tags: ["Skills", "Returnship", "CPD"], href: "/supporter/women" },
  { num: "05", icon: "sme", title: "SME Recovery Finance & Advisory", desc: "Advisory journeys for relocated Sudanese businesses — Ibrahim's audit practice, Ali's restaurant, Atif's grocery, Dr Afaf's clinic.", tags: ["Advisory", "Recovery", "Diaspora"], href: "/supporter/sme" },
  { num: "06", icon: "legal", title: "Legal & Professional Services", desc: "Notarised documents, residency and licensing referrals, Sharia-compliance reviews and pro-bono legal support across host countries.", tags: ["Legal", "Sharia", "Pro-bono"], href: "/supporter/legal" }
];


const readStoredEthosRole = () => {
  if (typeof getEthosRole === "function") return getEthosRole();
  try { return localStorage.getItem("ethos.role"); } catch (e) { return null; }
};

const getStoredRoleSide = (role) => {
  if (typeof roleToSide === "function") return roleToSide(role);
  return {
    supporter: "supporter",
    mentor: "supporter",
    ambassador: "supporter",
    finance: "supporter",
    development: "supporter",
    beneficiary: "beneficiary",
    sme: "beneficiary"
  }[role] || null;
};

const getStoredSideDashboardUrl = (side) => {
  if (typeof sideDashboardUrl === "function") return sideDashboardUrl(side, 0);
  if (side === "beneficiary") return "/beneficiary";
  if (side === "supporter") return "/supporter";
  return "/";
};

const ROLE_LABELS = {
  supporter: "Supporter", mentor: "Mentor", ambassador: "Ambassador",
  finance: "Finance Partner", development: "Development Partner",
  beneficiary: "Beneficiary", sme: "SME Member",
};

const ReturningRibbon = () => {
  const [role, setRole] = useState(null);
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    setRole(readStoredEthosRole());
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Welcome back");
  }, []);

  if (!role) return null;
  const side = getStoredRoleSide(role);
  if (!side) return null;
  const roleLabel = ROLE_LABELS[role] || (side === "supporter" ? "Supporter" : "Beneficiary");
  const subMessage = side === "supporter" ? "Your cases are waiting." : "Your support network is here.";
  const href = getStoredSideDashboardUrl(side);

  return (
    <div className="returning-ribbon">
      <div className="container returning-ribbon-inner">
        <div className="returning-ribbon-left">
          <span className="returning-dot" aria-hidden="true" />
          <span className="returning-greeting">{greeting}, {roleLabel}.</span>
          <span className="returning-sub">{subMessage}</span>
        </div>
        <Link to={href} className="returning-ribbon-link">
          Open dashboard <Icon name="arrow" size={13} />
        </Link>
      </div>
    </div>
  );
};

const LandingFallbackNav = ({ menuOpen, setMenuOpen, onCTA }) => (
  <nav className="nav">
    <div className="container nav-inner">
      <a href="#" className="logo"><span className="logo-mark"></span><span className="logo-text"> Kushian™</span></a>
      <KushianBadge variant="powered" />
      <div className="nav-links">
        <a href="#verticals">Services</a>
        <a href="#impact">Impact</a>
        <a href="#how">How it works</a>
        <a href="#ecosystem">Ecosystem</a>
      </div>
      <div className="nav-cta">
        <Link to="/role" className="btn btn-ghost nav-cta-btn">Get Started</Link>
        <button className="btn btn-primary nav-cta-btn" onClick={onCTA("Support a Case")}>Support a Case <Icon name="arrow"/></button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <Icon name={menuOpen ? "close" : "hamburger"}/>
        </button>
      </div>
    </div>
    {menuOpen && (
      <div className="nav-mobile-menu">
        <a href="#verticals" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#impact" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Impact</a>
        <a href="#how" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#ecosystem" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Ecosystem</a>
      </div>
    )}
  </nav>
);

const LandingFallbackFooter = () => (
  <footer>
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="logo"><span className="logo-mark"></span> Kushian™</a>
          <p>Powered by Ethos Community™, Kushian™ connects Sudanese diaspora supporters with displaced families, students, women professionals and SMEs through verified partner-enabled services.</p>
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
        <span>© 2026 Kushian™</span>
        <span>Demo · v0.1 · MVP Prototype</span>
      </div>
    </div>
  </footer>
);

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.pair = "newsreader";
  }, []);

  const HeroContent = HeroMission;
  const photo = HERO_PHOTOS.mission;

  const onCTA = (label) => () => showToast(`${label} — coming next in the prototype`);

  return (
    <>
      <Nav side="neutral" depth={0} />
      <DemoTag />
      <ReturningRibbon />

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
        <div className="container">
          <div className="strip-grid">
          <div className="stat"><div className="num"><Counter to={1247}/></div><div className="label">Diaspora Supporters</div></div>
          <div className="stat"><div className="num"><Counter to={3892}/></div><div className="label">Lives Reached</div></div>
          <div className="stat"><div className="num"><Counter to={486}/></div><div className="label">Women Onboarded</div></div>
          <div className="stat"><div className="num"><Counter to={142}/></div><div className="label">SMEs Advised</div></div>
          <div className="stat"><div className="num"><Counter to={14}/></div><div className="label">Countries Served</div></div>
          </div>
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
              <Reveal key={v.num} delay={i * 60} as={Link} to={v.href} className="vcard" aria-label={`Open ${v.title}`}>
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
              <p>Allocate a pledge against a defined purpose — tuition, hospitalization, working capital advisory, mentorship hours. Pledges are routed through licensed partners, never held by Kushian™ or Ethos Community™.</p>
            </Reveal>
            <Reveal delay={240} className="step">
              <div className="step-num">03</div>
              <h4>Track outcomes, not outputs</h4>
              <p>Receive milestone updates, partner attestations and impact metrics. Your supporter dashboard rolls into the Kushian™ portfolio view for diaspora circles and family offices.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="partner-section" id="ecosystem">
        <div className="container">
          <Reveal className="partner-head">
            <div>
              <div className="section-num">§ 04 / Ecosystem</div>
              <h2 className="partner-section-title">Our Partner Network</h2>
            </div>
            <p className="partner-section-lede">Seven partner categories — technology, payment, healthcare, education, finance, professional services, and community — coordinated by Ethos Community™ governance and delivered on the ground.</p>
          </Reveal>
        </div>
        <PartnershipStrip />
      </section>

      <div className="scalability-band">
        <div className="container">
          <Reveal>
            <h3>Scalable across 57 OIC member countries</h3>
            <div className="scalability-pills">
              {["Sudan","Yemen","Palestine","Syria","Somalia","Iraq","Libya","Pakistan","Bangladesh","Indonesia","Nigeria","Mali"].map(c => (
                <span key={c} className="scalability-pill">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container">
          <Reveal>
            <h2>The diaspora is ready. Are you?</h2>
            <p>Join the Kushian™ pilot cohort. Pledge to a verified case in under three minutes, or request the Kushian™ pitch deck for the IsDB Group Innovation and Startups review.</p>
            <div className="hero-ctas" style={{justifyContent:"center"}}>
              <button className="btn btn-primary" onClick={onCTA("Support a Case")}>Support a Case <Icon name="arrow"/></button>
              <button className="btn btn-ghost" onClick={onCTA("Request pitch deck")}>Request pitch deck</button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer depth={0} />
    </>
  );
}
