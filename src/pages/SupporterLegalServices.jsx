import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DemoTag from '../components/DemoTag.jsx';
import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import Photo from '../components/Photo.jsx';
import Avatar from '../components/Avatar.jsx';
import PurposeBadge from '../components/PurposeBadge.jsx';
import '../../supporter/legal-services.css';

const SERVICE_CATS = [
  { icon: "legal",     title: "Legal Advisory",          count: 14, desc: "Litigation, documentation, contract review and family law across GCC, UK and East Africa." },
  { icon: "doc",       title: "Accounting & Audit",       count: 9,  desc: "Financial statements, IFRS compliance, external audit and bookkeeping for individuals and SMEs." },
  { icon: "trend",     title: "Tax Advisory",             count: 6,  desc: "Personal and corporate tax, Zakat, VAT registration and cross-border tax planning." },
  { icon: "globe",     title: "Immigration Support",      count: 11, desc: "Residency, work permits, asylum, UNHCR registration and citizenship applications." },
  { icon: "shield",    title: "Documentation Services",   count: 8,  desc: "Legalisation, notarisation, certified translation and embassy authentication." },
  { icon: "family",    title: "Property & Inheritance",   count: 5,  desc: "Cross-border estate planning, inheritance claims and property documentation." },
  { icon: "check",     title: "Compliance & Licensing",   count: 7,  desc: "Regulatory compliance, business licensing, AML and governance advisory." },
  { icon: "sme",       title: "Business Setup",           count: 10, desc: "Company formation, free-zone registration, partnership agreements and trade licensing." }
];

const PRACTITIONERS = [
  { initials: "AJ", name: "Ahmed Jalloul",     spec: "Immigration & Asylum",   loc: "London, UK",      juris: ["UK","EG"],   langs: ["Arabic","English"], verified: true },
  { initials: "SM", name: "Sara Mahmoud",       spec: "Corporate & Compliance", loc: "Dubai, UAE",      juris: ["UAE","KSA"], langs: ["Arabic","English"], verified: true },
  { initials: "TK", name: "Tariq Khalifa",      spec: "Property & Inheritance", loc: "Cairo, Egypt",    juris: ["EG","SD"],   langs: ["Arabic"],           verified: true },
  { initials: "RA", name: "Rasha Al-Amin",      spec: "Tax & Zakat Advisory",   loc: "Riyadh, KSA",     juris: ["KSA"],       langs: ["Arabic","English"], verified: false },
  { initials: "WO", name: "Walid Osman",        spec: "Legal Documentation",    loc: "Kampala, Uganda", juris: ["UG","SD"],   langs: ["Arabic","English"], verified: true },
  { initials: "NA", name: "Nadia Al-Rashid",    spec: "Family & Immigration",   loc: "Doha, Qatar",     juris: ["QA","UK"],   langs: ["Arabic","English","French"], verified: true },
  { initials: "MH", name: "Mohammed Hassan",    spec: "Business Setup",         loc: "Abu Dhabi, UAE",  juris: ["UAE"],       langs: ["Arabic","English"], verified: true },
  { initials: "FA", name: "Fatima Al-Nur",      spec: "Accounting & IFRS",      loc: "London, UK",      juris: ["UK","SD"],   langs: ["Arabic","English"], verified: true },
  { initials: "YB", name: "Youssef Bashir",     spec: "Corporate Litigation",   loc: "Jeddah, KSA",     juris: ["KSA"],       langs: ["Arabic"],           verified: false },
  { initials: "LE", name: "Layla El-Sayed",     spec: "Immigration & Asylum",   loc: "Cairo, Egypt",    juris: ["EG","UG"],   langs: ["Arabic","English"], verified: true },
  { initials: "HM", name: "Hamid Mirghani",     spec: "Commercial Law",         loc: "Dubai, UAE",      juris: ["UAE","KSA"], langs: ["Arabic","English"], verified: true },
  { initials: "AR", name: "Amira Rahhal",       spec: "Compliance & Licensing", loc: "Riyadh, KSA",     juris: ["KSA","QA"],  langs: ["Arabic","English"], verified: true }
];

export default function SupporterLegalServices({ viewerSide = 'supporter' }) {
  const isBen = viewerSide === 'beneficiary'
  return (
    <>
      <Nav active="legal" side={isBen ? 'beneficiary' : 'supporter'} depth={1}/>

      <section className="vert-hero">
        <div className="container">
          <div className="vert-grid">
            <Reveal>
              <div className="eyebrow">Vertical 06 · Professional & Legal Services</div>
              <h1>Trusted advisers for <em>documentation, residency</em> and compliance.</h1>
              <p>Verified lawyers, accountants, tax advisers and immigration specialists across GCC, UK and East Africa corridors.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast(isBen ? "View requirements — coming next" : "Browse practitioners — coming next")}>{isBen ? 'View requirements' : `Browse ${PRACTITIONERS.length} practitioners`} <Icon name="arrow"/></button>
                <button className="btn btn-ghost" onClick={() => showToast(isBen ? "Ask ambassador — coming next" : "List your practice — coming next")}>{isBen ? 'Ask ambassador' : 'List Your Practice'}</button>
              </div>
            </Reveal>
            <Reveal delay={120}><Photo caption="LEGAL · COMPLIANCE · ADVISORY" overlay="Professional advisory session, Dubai 2026" img="../images/legal-advisory.png"/></Reveal>
          </div>
          <div className="vert-stats">
            <div><div className="num"><Counter to={74}/></div><div className="label">Listed practitioners</div></div>
            <div><div className="num"><Counter to={8}/></div><div className="label">Service categories</div></div>
            <div><div className="num"><Counter to={12}/></div><div className="label">Jurisdictions covered</div></div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Services</div><h2>Eight categories of professional support.</h2></div></Reveal>
          <div className="ls-service-grid">
            {SERVICE_CATS.map((s,i) => (
              <Reveal key={i} delay={i*50}>
                <div className="ls-service-card">
                  <div className="ls-service-icon"><Icon name={s.icon} size={28}/></div>
                  <div>
                    <h3>{s.title}</h3>
                    <div className="ls-service-count">{s.count} practitioners</div>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{background:"var(--cream-2)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal className="block-head"><div><div className="section-num">§ Featured Case</div><h2>UC3 · Displaced parents in Uganda.</h2></div></Reveal>
          <Reveal>
            <div className="ls-featured-case">
              <div className="ls-featured-eyebrow"><PurposeBadge category="legal"/> <span className="case-id">Case K-3290</span></div>
              <h3>Supporting Displaced Parents in Uganda</h3>
              <p>A Sudanese legal professional based in Saudi Arabia used the platform to connect his parents — displaced to Kampala — with a verified local documentation and residency adviser. The adviser navigated Ugandan work permit requirements, UNHCR registration and authenticated family documents for an ongoing legal claim in Sudan.</p>
              <p style={{marginTop:12}}>Result: residency documentation secured within 6 weeks. Legal claim in progress through a verified Sudanese lawyer with East Africa jurisdiction.</p>
              <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={() => showToast(isBen ? "View requirements — coming next" : "Support this case — create a case first")}>{isBen ? 'View requirements' : 'Support this case'} <Icon name="arrow"/></button>
                <Link to={isBen ? "/beneficiary/documents" : "/create"} className="btn btn-ghost">{isBen ? 'Prepare documents' : 'Create similar case'}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <Reveal className="block-head ls-practitioner-header">
            <div><div className="section-num">§ Practitioners</div><h2>12 verified practitioners ready.</h2></div>
            <button className="btn btn-ghost sm" onClick={() => showToast("List your practice — coming next")}>List Your Practice <Icon name="arrow" size={14}/></button>
          </Reveal>
          <div className="ls-practitioner-list">
            {PRACTITIONERS.map((p,i) => (
              <Reveal key={i} delay={i*40}>
                <div className="ls-practitioner">
                  <Avatar initials={p.initials} size="lg" green={p.verified}/>
                  <div className="ls-practitioner-info">
                    <div className="ls-practitioner-top">
                      <strong>{p.name}</strong>
                      <span className={`provider-verified ${p.verified?"verified":"pending"}`}><Icon name="shield" size={13}/>{p.verified?"Verified":"Pending"}</span>
                    </div>
                    <div className="ls-practitioner-spec">{p.spec}</div>
                    <div className="ls-practitioner-meta">
                      <span><Icon name="pin" size={12}/> {p.loc}</span>
                      <span>{p.juris.map(j=><span key={j} className="ls-juris-pill">{j}</span>)}</span>
                      <span>{p.langs.join(" · ")}</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost sm" onClick={() => showToast(isBen ? `Ask ambassador about ${p.name}` : `Consultation request sent to ${p.name}`)}>{isBen ? 'Ask ambassador' : 'Request Consultation'} <Icon name="arrow" size={14}/></button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer depth={1}/><DemoTag/>
    </>
  );
}
